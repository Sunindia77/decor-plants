import { NextRequest, NextResponse } from "next/server";
import { safeRedirectPath } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectTo = safeRedirectPath(request.nextUrl.searchParams.get("next"));
  const callbackError =
    request.nextUrl.searchParams.has("error") ||
    request.nextUrl.searchParams.has("error_description");

  if (callbackError || !code) {
    return NextResponse.redirect(new URL("/login?error=google", request.url));
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("[auth/callback] Supabase URL or public key is not configured.");
    return NextResponse.redirect(new URL("/login?error=unavailable", request.url));
  }

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] Supabase could not complete Google sign-in.", {
        code: error.code,
        status: error.status,
      });
      return NextResponse.redirect(new URL("/login?error=google", request.url));
    }

    return NextResponse.redirect(new URL(redirectTo, request.url));
  } catch (error) {
    console.error("[auth/callback] Supabase OAuth callback failed.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.redirect(new URL("/login?error=google", request.url));
  }
}
