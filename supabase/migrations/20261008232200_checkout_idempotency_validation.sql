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
  item_count integer;
  stored_item_count integer;
begin
  if p_user_id is null or p_checkout_request_id is null
    or p_items is null
    or pg_catalog.jsonb_typeof(p_items) <> 'array'
    or pg_catalog.jsonb_array_length(p_items) = 0
    or pg_catalog.jsonb_array_length(p_items) > 500
  then
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
    if existing_order.total is distinct from p_total
      or existing_order.subtotal is distinct from p_subtotal
      or existing_order.discount is distinct from p_discount
      or existing_order.delivery is distinct from p_delivery
      or existing_order.customer_name is distinct from pg_catalog.btrim(p_customer_name)
      or existing_order.customer_email is distinct from pg_catalog.lower(pg_catalog.btrim(p_customer_email))
      or existing_order.customer_phone is distinct from pg_catalog.btrim(p_customer_phone)
      or existing_order.delivery_address is distinct from pg_catalog.btrim(p_delivery_address)
      or existing_order.delivery_city is distinct from pg_catalog.btrim(p_delivery_city)
      or existing_order.delivery_state is distinct from pg_catalog.btrim(p_delivery_state)
      or existing_order.delivery_pincode is distinct from p_delivery_pincode
    then
      raise exception 'Checkout idempotency key was reused with different contents'
        using errcode = '22023';
    end if;

    select pg_catalog.count(*)
    into item_count
    from pg_catalog.jsonb_to_recordset(p_items) as item(
      product_id text,
      product_name text,
      product_image text,
      quantity integer,
      unit_price numeric,
      original_price numeric,
      line_total numeric
    );

    select pg_catalog.count(*)
    into stored_item_count
    from public.customer_order_items
    where order_id = existing_order.id;

    if item_count <> stored_item_count or exists (
      select 1
      from pg_catalog.jsonb_to_recordset(p_items) as item(
        product_id text,
        product_name text,
        product_image text,
        quantity integer,
        unit_price numeric,
        original_price numeric,
        line_total numeric
      )
      where not exists (
        select 1
        from public.customer_order_items as saved
        where saved.order_id = existing_order.id
          and saved.product_id is not distinct from item.product_id
          and saved.product_name is not distinct from item.product_name
          and saved.product_image is not distinct from item.product_image
          and saved.quantity is not distinct from item.quantity
          and saved.unit_price is not distinct from item.unit_price
          and saved.original_price is not distinct from item.original_price
          and saved.line_total is not distinct from item.line_total
      )
    ) then
      raise exception 'Checkout idempotency key was reused with different items'
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
