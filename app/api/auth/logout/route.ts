import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("[auth/logout] Supabase URL or public key is not configured.");
    return Response.json(
      { success: false, message: "Sign-in is not available right now." },
      { status: 503 },
    );
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[auth/logout] Supabase could not end the session.", {
      code: error.code,
      status: error.status,
    });
    return Response.json(
      { success: false, message: "We could not sign you out. Please try again." },
      { status: 503 },
    );
  }

  return Response.json({ success: true });
}
