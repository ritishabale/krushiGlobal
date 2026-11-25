create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  category text not null,
  product_names text[] not null,
  quantity text not null,
  packaging text not null,
  destination_country text not null,
  message text not null,
  attachment_path text,
  status text not null default 'new' check (status in ('new', 'pending', 'completed')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon;
grant select, update, delete on public.inquiries to authenticated;
grant insert, select, update, delete on public.inquiries to service_role;

create policy "Admins can read inquiries"
on public.inquiries for select to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update inquiries"
on public.inquiries for update to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete inquiries"
on public.inquiries for delete to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'inquiry-attachments',
  'inquiry-attachments',
  false,
  5242880,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/png'];

create policy "Admins can read inquiry attachments"
on storage.objects for select to authenticated
using (
  bucket_id = 'inquiry-attachments'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
