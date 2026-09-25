-- Orders placed through the storefront checkout flow.
create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  customer jsonb not null,
  items jsonb not null,
  subtotal numeric not null,
  gst numeric not null,
  courier numeric not null,
  total numeric not null,
  status text not null default 'Pending Verification',
  screenshot_path text
);

alter table public.orders enable row level security;

-- The storefront has no customer accounts, so checkout writes with the
-- anon key. Orders are never read back through this key (the app builds
-- the confirmation screen from the data it already has before sending
-- the insert) — reviewing orders happens from the Supabase dashboard,
-- or later from an authenticated admin role.
create policy "Anyone can create an order"
  on public.orders
  for insert
  to anon
  with check (true);

-- Payment screenshots uploaded at checkout for manual verification.
insert into storage.buckets (id, name, public)
values ('payment-screenshots', 'payment-screenshots', false)
on conflict (id) do nothing;

create policy "Anyone can upload a payment screenshot"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'payment-screenshots');
