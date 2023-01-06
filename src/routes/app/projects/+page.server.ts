import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const { session, supabaseClient } = await getSupabase(event)
  if (!session) {
    throw redirect(303, "/")
  }

  const { data, error: err } = await supabaseClient.from('projects').select().eq('user_id', session.user.id);
  if (data) {
    const pinned = data.filter(value => value.pinned)
    return { all: data, pinned }
  }

  throw error(404, err.message)
}) satisfies PageServerLoad
