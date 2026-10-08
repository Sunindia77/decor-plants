import { NextRequest, NextResponse } from "next/server";
import { safeRedirectPath } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("[auth/google] Supabase URL or public key is not configured.");
    return NextResponse.redirect(new URL("/login?error=unavailable", request.url));
  }

  const redirectTo = safeRedirectPath(request.nextUrl.searchParams.get("next"));
  const siteOrigin =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin
      : request.nextUrl.origin;
  let callbackUrl: URL;

  try {
    callbackUrl = new URL("/api/auth/callback", siteOrigin);
    if (process.env.NODE_ENV === "production" && callbackUrl.protocol !== "https:") {
      throw new Error("The production auth callback must use HTTPS.");
    }
  } catch (error) {
    console.error("[auth/google] The configured site URL is invalid.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.redirect(new URL("/login?error=unavailable", request.url));
  }

  callbackUrl.searchParams.set("next", redirectTo);

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl.toString(), queryParams: { prompt: "select_account" } },
    });

    if (error || !data.url) {
      console.error("[auth/google] Supabase could not start Google sign-in.", {
        code: error?.code,
        status: error?.status,
      });
      return NextResponse.redirect(new URL("/login?error=unavailable", request.url));
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error("[auth/google] Supabase OAuth request failed.", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.redirect(new URL("/login?error=unavailable", request.url));
  }
}
