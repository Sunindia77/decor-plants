"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginForm({
  redirectTo,
  errorMessage,
}: {
  redirectTo: string;
  errorMessage?: string;
}) {
  const [signingIn, setSigningIn] = useState(false);
  const googleSignInUrl = `/api/auth/google?next=${encodeURIComponent(redirectTo)}`;

  return (
    <section className="shop-auth-card" aria-labelledby="shop-auth-title">
      <span className="shop-eyebrow">A LITTLE MORE PERSONAL</span>
      <h1 id="shop-auth-title">Welcome to Decor-Plants</h1>
      <p>Sign in or create your account securely with Google.</p>

      {errorMessage && (
        <p className="shop-auth-message is-error" role="alert">
          {errorMessage}
        </p>
      )}

      <Link
        className="shop-checkout-button shop-google-signin"
        href={googleSignInUrl}
        aria-disabled={signingIn}
        onClick={(event) => {
          if (signingIn) {
            event.preventDefault();
            return;
          }
          setSigningIn(true);
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.04 46.98 31.84 46.98 24.55Z" />
          <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
        </svg>
        {signingIn ? "Redirecting to Google..." : "Continue with Google"}
      </Link>

      <p className="shop-google-signin-note">
        New here? Your account will be created automatically after Google verifies you.
      </p>
      <Link className="shop-auth-back-link" href="/shop">
        Continue browsing as a guest
      </Link>
    </section>
  );
}
