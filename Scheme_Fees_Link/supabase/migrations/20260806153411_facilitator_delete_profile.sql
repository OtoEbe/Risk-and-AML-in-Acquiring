-- Facilitator observe + delete (replica of the Risk & AML v0.5.5 control).
-- Applied to project wskjrcgdhgolahrrmpvs as migration 20260806153411.
-- Server-side code check; cascades events -> sessions -> enrollments -> profile.
-- Rotating the console code means updating this function AND FAC.code in the
-- engine file, then redeploying both.

create or replace function public.facilitator_delete_profile(p_id text, p_code text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_code is distinct from 'CATALYST' then
    return false;
  end if;
  if p_id is null or p_id not like 'prf\_%' then
    return false;
  end if;
  delete from public.events where profile_id = p_id;
  delete from public.sessions where profile_id = p_id;
  delete from public.enrollments where profile_id = p_id;
  delete from public.profiles where id = p_id;
  return true;
end
$$;

revoke all on function public.facilitator_delete_profile(text, text) from public;
grant execute on function public.facilitator_delete_profile(text, text) to anon, authenticated;
