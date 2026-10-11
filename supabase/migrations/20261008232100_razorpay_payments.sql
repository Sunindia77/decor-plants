alter table public.customer_orders
  add column if not exists payment_status text not null default 'pending',
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_mode text,
  add column if not exists razorpay_payment_id text,
  add column if not exists payment_paid_at timestamptz,
  add column if not exists checkout_request_id uuid;

do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_constraint
    where conname = 'customer_orders_payment_status_check'
      and conrelid = 'public.customer_orders'::pg_catalog.regclass
  ) then
    alter table public.customer_orders
      add constraint customer_orders_payment_status_check
      check (payment_status in ('pending', 'paid', 'failed'));
  end if;
  if not exists (
    select 1
    from pg_catalog.pg_constraint
    where conname = 'customer_orders_razorpay_mode_check'
      and conrelid = 'public.customer_orders'::pg_catalog.regclass
  ) then
    alter table public.customer_orders
      add constraint customer_orders_razorpay_mode_check
      check (razorpay_mode is null or razorpay_mode in ('test', 'live'));
  end if;
end;
$$;

create unique index if not exists customer_orders_razorpay_order_id_uidx
  on public.customer_orders (razorpay_order_id)
  where razorpay_order_id is not null;

create unique index if not exists customer_orders_razorpay_payment_id_uidx
  on public.customer_orders (razorpay_payment_id)
  where razorpay_payment_id is not null;

create unique index if not exists customer_orders_checkout_request_uidx
  on public.customer_orders (user_id, checkout_request_id)
  where checkout_request_id is not null;

create or replace function public.create_checkout_order(
  p_user_id uuid,
  p_checkout_request_id uuid,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_delivery_address text,
  p_delivery_city text,
  p_delivery_state text,
  p_delivery_pincode text,
  p_subtotal numeric,
  p_discount numeric,
  p_delivery numeric,
  p_total numeric,
  p_items jsonb
)
returns table (
  id uuid,
  order_number text,
  total numeric,
  payment_status text,
  razorpay_order_id text,
  razorpay_mode text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  existing_order public.customer_orders%rowtype;
  created_id uuid;
  created_number text;
begin
  if p_user_id is null or p_checkout_request_id is null then
    raise exception 'Invalid checkout request' using errcode = '22023';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(p_user_id::text),
    pg_catalog.hashtext(p_checkout_request_id::text)
  );

  select *
  into existing_order
  from public.customer_orders
  where user_id = p_user_id
    and checkout_request_id = p_checkout_request_id
  for update;

  if found then
    if existing_order.total <> p_total then
      raise exception 'Checkout idempotency key was reused with different contents'
        using errcode = '22023';
    end if;

    return query
      select existing_order.id, existing_order.order_number, existing_order.total,
        existing_order.payment_status, existing_order.razorpay_order_id, existing_order.razorpay_mode;
    return;
  end if;

  select order_result.id, order_result.order_number
  into created_id, created_number
  from public.create_customer_order(
    p_user_id,
    p_customer_name,
    p_customer_email,
    p_customer_phone,
    p_delivery_address,
    p_delivery_city,
    p_delivery_state,
    p_delivery_pincode,
    p_subtotal,
    p_discount,
    p_delivery,
    p_total,
    p_items
  ) as order_result;

  update public.customer_orders
  set checkout_request_id = p_checkout_request_id
  where customer_orders.id = created_id;

  return query
    select created_id, created_number, p_total, 'pending'::text, null::text, null::text;
end;
$$;

create or replace function public.complete_razorpay_payment(
  p_order_id uuid,
  p_user_id uuid,
  p_razorpay_order_id text,
  p_razorpay_payment_id text
)
returns table (id uuid, order_number text, payment_status text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_order public.customer_orders%rowtype;
begin
  if p_order_id is null
    or p_razorpay_order_id is null
    or p_razorpay_payment_id is null
    or pg_catalog.length(p_razorpay_order_id) > 100
    or pg_catalog.length(p_razorpay_payment_id) > 100
  then
    raise exception 'Invalid payment verification' using errcode = '22023';
  end if;

  select *
  into current_order
  from public.customer_orders
  where customer_orders.id = p_order_id
  for update;

  if not found
    or (p_user_id is not null and current_order.user_id <> p_user_id)
    or current_order.razorpay_order_id is distinct from p_razorpay_order_id
  then
    raise exception 'Payment does not match this order' using errcode = '42501';
  end if;

  if current_order.payment_status = 'paid' then
    if current_order.razorpay_payment_id <> p_razorpay_payment_id then
      raise exception 'Order has already been paid with a different payment'
        using errcode = '23505';
    end if;

    return query select current_order.id, current_order.order_number, current_order.payment_status;
    return;
  end if;

  update public.customer_orders
  set payment_status = 'paid',
      razorpay_payment_id = p_razorpay_payment_id,
      payment_paid_at = coalesce(payment_paid_at, pg_catalog.now()),
      status = case when status = 'pending' then 'confirmed' else status end
  where customer_orders.id = p_order_id;

  return query select current_order.id, current_order.order_number, 'paid'::text;
end;
$$;

create or replace function public.fail_razorpay_payment(
  p_order_id uuid,
  p_razorpay_order_id text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.customer_orders
  set payment_status = 'failed'
  where id = p_order_id
    and razorpay_order_id = p_razorpay_order_id
    and payment_status = 'pending';
end;
$$;

revoke all on function public.create_checkout_order(
  uuid, uuid, text, text, text, text, text, text, text, numeric, numeric, numeric, numeric, jsonb
) from public, anon, authenticated;
grant execute on function public.create_checkout_order(
  uuid, uuid, text, text, text, text, text, text, text, numeric, numeric, numeric, numeric, jsonb
) to service_role;

revoke all on function public.complete_razorpay_payment(uuid, uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.complete_razorpay_payment(uuid, uuid, text, text)
  to service_role;

revoke all on function public.fail_razorpay_payment(uuid, text)
  from public, anon, authenticated;
grant execute on function public.fail_razorpay_payment(uuid, text)
  to service_role;
