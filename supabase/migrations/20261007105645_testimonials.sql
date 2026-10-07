-- Customer testimonials, submitted from the storefront and shown once approved.
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  quote text not null,
  status text not null default 'Pending Approval'
);

alter table public.testimonials enable row level security;

-- Anyone can submit a testimonial...
create policy "Anyone can submit a testimonial"
  on public.testimonials
  for insert
  to anon
  with check (status = 'Pending Approval');

-- ...but only approved ones are publicly visible. New submissions have to
-- be flipped to 'Approved' from the dashboard before they show on the site.
create policy "Anyone can read approved testimonials"
  on public.testimonials
  for select
  to anon
  using (status = 'Approved');
