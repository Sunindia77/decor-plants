import type { Metadata } from "next";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { safeRedirectPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[]; error?: string | string[] }>;
}) {
  const params = await searchParams;
  const errorMessage =
    params.error === "google"
      ? "Google sign-in could not be completed. Please try again."
      : params.error === "unavailable"
        ? "Sign-in is temporarily unavailable. Please try again later."
        : undefined;

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-auth-page">
        <LoginForm
          redirectTo={safeRedirectPath(typeof params.next === "string" ? params.next : null)}
          errorMessage={errorMessage}
        />
      </section>
    </main>
  );
}
