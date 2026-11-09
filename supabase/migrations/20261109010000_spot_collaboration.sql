begin;

create table public.spotly_spot_members (
  owner_id uuid not null,
  kind text not null default 'spot' check (kind = 'spot'),
  record_id text not null,
  member_id uuid not null references auth.users(id) on delete cascade,
  check (owner_id <> member_id),
  primary key (owner_id, record_id, member_id),
  foreign key (owner_id, kind, record_id) references public.spotly_records(user_id, kind, record_id) on delete cascade
);
create index spotly_spot_members_member_idx on public.spotly_spot_members(member_id);

create table public.spotly_spot_invites (
  owner_id uuid not null,
  kind text not null default 'spot' check (kind = 'spot'),
  record_id text not null,
  token uuid not null unique default gen_random_uuid(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_by uuid references auth.users(id) on delete cascade,
  primary key (owner_id, record_id),
  foreign key (owner_id, kind, record_id) references public.spotly_records(user_id, kind, record_id) on delete cascade
);

alter table public.spotly_spot_members enable row level security;
alter table public.spotly_spot_invites enable row level security;
revoke all on public.spotly_spot_members, public.spotly_spot_invites from public, anon, authenticated;

create function public.spotly_manage_sharing(p_record_id text, p_action text, p_member_id uuid default null)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if not exists (
    select 1 from public.spotly_records
    where user_id = actor and kind = 'spot' and record_id = p_record_id
  ) then
    raise exception using errcode = '42501', message = 'Only the spot owner can manage sharing.';
  end if;

  case p_action
    when 'create' then
      insert into public.spotly_spot_invites as current_invite (owner_id, record_id)
      values (actor, p_record_id)
      on conflict (owner_id, record_id) do update
      set token = excluded.token, expires_at = excluded.expires_at, accepted_by = null
      where current_invite.accepted_by is not null or current_invite.expires_at <= now();
    when 'cancel' then
      delete from public.spotly_spot_invites
      where owner_id = actor and record_id = p_record_id and accepted_by is null;
    when 'remove' then
      delete from public.spotly_spot_invites
      where owner_id = actor and record_id = p_record_id and accepted_by = p_member_id;
      delete from public.spotly_spot_members
      where owner_id = actor and record_id = p_record_id and member_id = p_member_id;
    when 'status' then null;
    else raise exception using errcode = '22023', message = 'Unknown sharing action.';
  end case;

  return jsonb_build_object(
    'invite', (
      select jsonb_build_object('token', token, 'expires_at', expires_at)
      from public.spotly_spot_invites
      where owner_id = actor and record_id = p_record_id and accepted_by is null and expires_at > now()
    ),
    'members', coalesce((
      select jsonb_agg(jsonb_build_object('id', member.member_id, 'email', account.email) order by account.email)
      from public.spotly_spot_members as member
      join auth.users as account on account.id = member.member_id
      where member.owner_id = actor and member.record_id = p_record_id
    ), '[]'::jsonb)
  );
end;
$$;

create function public.spotly_accept_invite(p_token uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  invitation public.spotly_spot_invites%rowtype;
begin
  select * into invitation from public.spotly_spot_invites
  where token = p_token for update;

  if actor is null or not found or invitation.owner_id = actor then
    raise exception using errcode = '22023', message = 'This invitation cannot be used.';
  end if;

  if invitation.accepted_by = actor and exists (
    select 1 from public.spotly_spot_members
    where owner_id = invitation.owner_id and record_id = invitation.record_id and member_id = actor
  ) then
    return;
  end if;

  if invitation.accepted_by is not null or invitation.expires_at <= now() then
    raise exception using errcode = '22023', message = 'This invitation has expired or already been used.';
  end if;

  insert into public.spotly_spot_members (owner_id, record_id, member_id)
  values (invitation.owner_id, invitation.record_id, actor)
  on conflict do nothing;
  update public.spotly_spot_invites set accepted_by = actor where token = p_token;
end;
$$;

create function public.spotly_list_shared_spots()
returns table (user_id uuid, record_id text, data jsonb, revision integer, category_choice jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select spot.user_id, spot.record_id, spot.data - 'favorite', spot.revision, category.data -> 'choice'
  from public.spotly_spot_members as member
  join public.spotly_records as spot
    on spot.user_id = member.owner_id and spot.kind = 'spot' and spot.record_id = member.record_id
  left join public.spotly_records as category
    on category.user_id = spot.user_id and category.kind = 'category' and category.record_id = spot.data ->> 'category'
  where member.member_id = (select auth.uid())
  order by spot.created_at desc, spot.user_id, spot.record_id;
$$;

create function public.spotly_update_shared_spot(p_owner_id uuid, p_record_id text, p_data jsonb, p_revision integer)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  next_revision integer;
  edits jsonb;
  item_list text;
begin
  perform 1 from public.spotly_spot_members
  where owner_id = p_owner_id and record_id = p_record_id and member_id = auth.uid()
  for share;
  if not found then
    raise exception using errcode = '42501', message = 'You no longer have access to this spot.';
  end if;

  if jsonb_typeof(p_data) is distinct from 'object'
     or jsonb_typeof(p_data -> 'name') is distinct from 'string'
     or jsonb_typeof(p_data -> 'city') is distinct from 'string'
     or jsonb_typeof(p_data -> 'location') is distinct from 'string'
     or jsonb_typeof(p_data -> 'description') is distinct from 'string'
     or jsonb_typeof(p_data -> 'photos') is distinct from 'array' then
    raise exception using errcode = '22023', message = 'Invalid shared spot details.';
  end if;
  if p_data -> 'coordinates' is distinct from 'null'::jsonb and (
    jsonb_typeof(p_data #> '{coordinates,latitude}') is distinct from 'number'
    or jsonb_typeof(p_data #> '{coordinates,longitude}') is distinct from 'number'
  ) then
    raise exception using errcode = '22023', message = 'Invalid coordinates.';
  end if;
  if jsonb_array_length(p_data -> 'photos') > 5 or exists (
    select 1 from jsonb_array_elements_text(p_data -> 'photos') as photo(url)
    where photo.url is null or photo.url !~* '^data:image/(jpeg|png|webp);base64,'
  ) then
    raise exception using errcode = '22023', message = 'Invalid spot photos.';
  end if;
  foreach item_list in array array['foodItems', 'stayPlaces', 'shoppingItems'] loop
    if jsonb_typeof(p_data -> item_list) is distinct from 'array' then
      raise exception using errcode = '22023', message = 'Invalid spot items.';
    end if;
    if exists (
      select 1 from jsonb_array_elements(p_data -> item_list) as item(value)
      where jsonb_typeof(item.value -> 'name') is distinct from 'string'
        or (item.value ? 'photo' and (
          jsonb_typeof(item.value -> 'photo') is distinct from 'string'
          or (item.value ->> 'photo') !~* '^data:image/(jpeg|png|webp);base64,'
        ))
    ) then
      raise exception using errcode = '22023', message = 'Invalid spot item or photo.';
    end if;
  end loop;

  select jsonb_object_agg(key, value) into edits
  from jsonb_each(p_data)
  where key in ('name', 'city', 'location', 'coordinates', 'description', 'foodItems', 'stayPlaces', 'shoppingItems', 'photos');
  if edits is null then
    raise exception using errcode = '22023', message = 'No spot details were supplied.';
  end if;

  update public.spotly_records as spot
  set data = spot.data || edits, revision = spot.revision + 1
  where spot.user_id = p_owner_id and spot.kind = 'spot' and spot.record_id = p_record_id and spot.revision = p_revision
  returning spot.revision into next_revision;
  if not found then
    raise exception using errcode = '40001', message = 'This spot changed on another device.';
  end if;
  return next_revision;
end;
$$;

revoke all on function public.spotly_manage_sharing(text, text, uuid), public.spotly_accept_invite(uuid),
  public.spotly_list_shared_spots(), public.spotly_update_shared_spot(uuid, text, jsonb, integer) from public, anon, authenticated;
grant execute on function public.spotly_manage_sharing(text, text, uuid), public.spotly_accept_invite(uuid),
  public.spotly_list_shared_spots(), public.spotly_update_shared_spot(uuid, text, jsonb, integer) to authenticated;

commit;
