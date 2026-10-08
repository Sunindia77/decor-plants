import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("[auth/me] Supabase URL or public key is not configured.");
    return Response.json(
      { success: false, message: "Sign-in is not configured yet." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.auth.getUser();
  if (error && error.status !== 400 && error.status !== 401) {
    console.error("[auth/me] Supabase could not validate the session.", {
      code: error.code,
      status: error.status,
    });
    return Response.json(
      { success: false, message: "We could not check your sign-in right now." },
      { status: 503 },
    );
  }

  if (!data.user) {
    return Response.json({ success: true, user: null });
  }

  return Response.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email ?? null,
      name:
        typeof data.user.user_metadata.full_name === "string"
          ? data.user.user_metadata.full_name
          : typeof data.user.user_metadata.name === "string"
            ? data.user.user_metadata.name
            : null,
      avatarUrl:
        typeof data.user.user_metadata.avatar_url === "string"
          ? data.user.user_metadata.avatar_url
          : typeof data.user.user_metadata.picture === "string"
            ? data.user.user_metadata.picture
            : null,
    },
  });
}
