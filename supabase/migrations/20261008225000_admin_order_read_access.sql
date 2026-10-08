drop policy if exists "Customers can read their own orders" on public.customer_orders;
drop policy if exists "Customers and admin can read orders" on public.customer_orders;
create policy "Customers and admin can read orders"
  on public.customer_orders
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or lower(coalesce((select auth.jwt() ->> 'email'), '')) = 'surajsatav1994@gmial.com'
  );

drop policy if exists "Customers can read their own order items" on public.customer_order_items;
drop policy if exists "Customers and admin can read order items" on public.customer_order_items;
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
