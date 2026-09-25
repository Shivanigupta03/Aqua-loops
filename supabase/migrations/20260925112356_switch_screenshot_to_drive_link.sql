-- Payment proof is now a customer-supplied Google Drive link (pasted at
-- checkout) rather than a file uploaded to Supabase Storage, so the
-- table can just show a clickable URL directly.
alter table public.orders rename column screenshot_path to screenshot_url;
