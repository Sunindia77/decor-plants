create table if not exists public.customer_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete restrict,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_address text not null,
  delivery_city text not null,
  delivery_state text not null,
  delivery_pincode text not null,
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  discount numeric(12, 2) not null check (discount >= 0),
  delivery numeric(12, 2) not null check (delivery >= 0),
  total numeric(12, 2) not null check (total >= 0),
  currency text not null default 'INR' check (currency = 'INR'),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  tracking_number text,
  tracking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (discount <= subtotal),
  check (total = subtotal - discount + delivery)
);

create index if not exists customer_orders_user_created_idx
  on public.customer_orders (user_id, created_at desc);

create table if not exists public.customer_order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.customer_orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  original_price numeric(12, 2) not null check (original_price >= unit_price),
  line_total numeric(12, 2) not null check (line_total = unit_price * quantity),
  created_at timestamptz not null default now()
);

create index if not exists customer_order_items_order_idx
  on public.customer_order_items (order_id);

alter table public.customer_orders enable row level security;
alter table public.customer_order_items enable row level security;

drop policy if exists "Customers can read their own orders" on public.customer_orders;
create policy "Customers and admin can read orders"
  on public.customer_orders
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or lower(coalesce((select auth.jwt() ->> 'email'), '')) = 'surajsatav1994@gmial.com'
  );

drop policy if exists "Customers can read their own order items" on public.customer_order_items;
create policy "Customers and admin can read order items"
  on public.customer_order_items
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.customer_orders
      where customer_orders.id = customer_order_items.order_id
        and (
          customer_orders.user_id = (select auth.uid())
          or lower(coalesce((select auth.jwt() ->> 'email'), '')) = 'surajsatav1994@gmial.com'
        )
    )
  );

grant select on public.customer_orders, public.customer_order_items to authenticated;

create or replace function public.set_customer_order_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists customer_orders_updated_at on public.customer_orders;
create trigger customer_orders_updated_at
  before update on public.customer_orders
  for each row execute function public.set_customer_order_updated_at();

create or replace function public.create_customer_order(
  p_user_id uuid,
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
returns table (id uuid, order_number text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_order_id uuid;
  new_order_number text;
  expected_subtotal numeric;
  expected_discount numeric;
begin
  if p_user_id is null
    or p_customer_name is null or pg_catalog.length(pg_catalog.btrim(p_customer_name)) not between 1 and 100
    or p_customer_email is null or pg_catalog.length(pg_catalog.btrim(p_customer_email)) not between 1 and 254
    or p_customer_phone is null or pg_catalog.length(pg_catalog.btrim(p_customer_phone)) not between 1 and 20
    or p_delivery_address is null or pg_catalog.length(pg_catalog.btrim(p_delivery_address)) not between 1 and 300
    or p_delivery_city is null or pg_catalog.length(pg_catalog.btrim(p_delivery_city)) not between 1 and 80
    or p_delivery_state is null or pg_catalog.length(pg_catalog.btrim(p_delivery_state)) not between 1 and 80
    or p_delivery_pincode is null or p_delivery_pincode !~ '^[0-9]{6}$'
    or p_subtotal is null or p_subtotal < 0
    or p_discount is null or p_discount < 0
    or p_delivery is null or p_delivery < 0
    or p_total is null or p_total <> p_subtotal - p_discount + p_delivery
  then
    raise exception 'Invalid customer order data' using errcode = '22023';
  end if;

  if p_items is null or pg_catalog.jsonb_typeof(p_items) <> 'array' then
    raise exception 'Invalid customer order items' using errcode = '22023';
  end if;

  if pg_catalog.jsonb_array_length(p_items) = 0 or pg_catalog.jsonb_array_length(p_items) > 500 then
    raise exception 'Invalid customer order items' using errcode = '22023';
  end if;

  if exists (
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
    where item.product_id is null
      or pg_catalog.length(pg_catalog.btrim(item.product_id)) = 0
      or item.product_name is null
      or pg_catalog.length(pg_catalog.btrim(item.product_name)) = 0
      or item.product_image is null
      or pg_catalog.length(pg_catalog.btrim(item.product_image)) = 0
      or item.quantity is null or item.quantity <= 0
      or item.unit_price is null or item.unit_price < 0
      or item.original_price is null or item.original_price < item.unit_price
      or item.line_total is null or item.line_total <> item.unit_price * item.quantity
  ) then
    raise exception 'Invalid customer order item details' using errcode = '22023';
  end if;

  select
    coalesce(pg_catalog.sum(item.original_price * item.quantity), 0),
    coalesce(pg_catalog.sum((item.original_price - item.unit_price) * item.quantity), 0)
  into expected_subtotal, expected_discount
  from pg_catalog.jsonb_to_recordset(p_items) as item(
    product_id text,
    product_name text,
    product_image text,
    quantity integer,
    unit_price numeric,
    original_price numeric,
    line_total numeric
  );

  if expected_subtotal <> p_subtotal or expected_discount <> p_discount then
    raise exception 'Order totals do not match line items' using errcode = '22023';
  end if;

  new_order_id := pg_catalog.gen_random_uuid();
  new_order_number := 'DP-' || pg_catalog.upper(pg_catalog.substr(pg_catalog.replace(new_order_id::text, '-', ''), 1, 10));

  insert into public.customer_orders (
    id, order_number, user_id, customer_name, customer_email, customer_phone,
    delivery_address, delivery_city, delivery_state, delivery_pincode,
    subtotal, discount, delivery, total
  ) values (
    new_order_id, new_order_number, p_user_id, pg_catalog.btrim(p_customer_name),
    pg_catalog.lower(pg_catalog.btrim(p_customer_email)), pg_catalog.btrim(p_customer_phone),
    pg_catalog.btrim(p_delivery_address), pg_catalog.btrim(p_delivery_city),
    pg_catalog.btrim(p_delivery_state), p_delivery_pincode,
    p_subtotal, p_discount, p_delivery, p_total
  );

  insert into public.customer_order_items (
    order_id, product_id, product_name, product_image, quantity,
    unit_price, original_price, line_total
  )
  select
    new_order_id, item.product_id, item.product_name, item.product_image,
    item.quantity, item.unit_price, item.original_price, item.line_total
  from pg_catalog.jsonb_to_recordset(p_items) as item(
    product_id text,
    product_name text,
    product_image text,
    quantity integer,
    unit_price numeric,
    original_price numeric,
    line_total numeric
  );

  if not found then
    raise exception 'Customer order must include items' using errcode = '22023';
  end if;

  return query select new_order_id, new_order_number;
end;
$$;

revoke all on function public.create_customer_order(
  uuid, text, text, text, text, text, text, text, numeric, numeric, numeric, numeric, jsonb
) from public, anon, authenticated;
grant execute on function public.create_customer_order(
  uuid, text, text, text, text, text, text, text, numeric, numeric, numeric, numeric, jsonb
) to service_role;

revoke all on function public.set_customer_order_updated_at() from public, anon, authenticated;
