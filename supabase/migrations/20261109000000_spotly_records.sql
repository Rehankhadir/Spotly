begin;

create table public.spotly_records (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind text not null check (kind in ('spot', 'entry', 'category')),
  record_id text not null,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  primary key (user_id, kind, record_id)
);

alter table public.spotly_records enable row level security;
revoke all on public.spotly_records from public, anon, authenticated;
grant select, insert, update, delete on public.spotly_records to authenticated;

create policy "Read own Spotly records" on public.spotly_records
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own Spotly records" on public.spotly_records
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own Spotly records" on public.spotly_records
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own Spotly records" on public.spotly_records
  for delete to authenticated using ((select auth.uid()) = user_id);

create function public.spotly_write_record(
  p_user_id uuid,
  p_kind text,
  p_record_id text,
  p_data jsonb,
  p_revision integer,
  p_category_id text default null,
  p_category_data jsonb default null
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  next_revision integer;
begin
  if auth.uid() is null or auth.uid() is distinct from p_user_id then
    raise exception using errcode = '42501', message = 'Sign in to the selected Spotly account.';
  end if;

  if p_data is null then
    delete from public.spotly_records
    where user_id = p_user_id and kind = p_kind and record_id = p_record_id and revision = p_revision
    returning revision into next_revision;
  elsif p_revision is null then
    insert into public.spotly_records (user_id, kind, record_id, data)
    values (p_user_id, p_kind, p_record_id, p_data)
    on conflict (user_id, kind, record_id) do nothing
    returning revision into next_revision;
  else
    update public.spotly_records
    set data = p_data, revision = revision + 1
    where user_id = p_user_id and kind = p_kind and record_id = p_record_id and revision = p_revision
    returning revision into next_revision;
  end if;

  if next_revision is null then
    raise exception using errcode = '40001', message = 'This record changed on another device.';
  end if;

  if p_category_id is not null then
    insert into public.spotly_records (user_id, kind, record_id, data)
    values (p_user_id, 'category', p_category_id, p_category_data);
  end if;

  return next_revision;
end;
$$;

revoke all on function public.spotly_write_record(uuid, text, text, jsonb, integer, text, jsonb) from public, anon, authenticated;
grant execute on function public.spotly_write_record(uuid, text, text, jsonb, integer, text, jsonb) to authenticated;

commit;
