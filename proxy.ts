import { NextRequest, NextResponse } from "next/server";

// ─── Rate limiting (in-memory, per IP) ────────────────────────────────────────
// Limits each IP to RATE_LIMIT_MAX requests per RATE_LIMIT_WINDOW_MS on /api/*
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30;           // max requests per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ─── CSP nonce + policy ────────────────────────────────────────────────────────
function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function buildCSP(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",

    // ── Scripts: nonce-based (strict XSS protection) ──────────────────────────
    // 'unsafe-inline' is intentionally absent — the nonce is the authority.
    // 'strict-dynamic' lets nonce-approved scripts load further scripts.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,

    // ── Styles: 'unsafe-inline' without a nonce ───────────────────────────────
    // IMPORTANT: Per CSP3 spec, if a nonce IS present in style-src, the browser
    // silently IGNORES 'unsafe-inline'. This means having both nonce + unsafe-inline
    // gives you the nonce restriction BUT NOT the unsafe-inline allowance —
    // the opposite of what's intended. To actually allow inline styles (required
    // for React 19 style hoisting, Next.js font tags, webpack HMR CSS injection,
    // and JS element.style.xxx assignments which Chrome enforces CSP on), the
    // nonce must be ABSENT from style-src. CSS injection is far less dangerous
    // than JS injection, so keeping the nonce only on script-src is the correct
    // security trade-off for a Next.js / React 19 application.
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,

    // WhatsApp link; Instagram, Facebook & LinkedIn profile links
    "connect-src 'self' https://wa.me https://api.whatsapp.com https://www.instagram.com https://www.facebook.com https://www.linkedin.com",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// ─── Paths to block immediately (hacker probe patterns) ───────────────────────
const BLOCKED_PATH_PATTERNS = [
  /^\/wp-/i,                        // WordPress probes
  /\/\.env(?:$|\.)/i,               // .env file leaks
  /\/\.git(?:$|\/)/i,               // git directory exposure
  /\/phpmy/i,                       // phpMyAdmin
  /\/config\.(php|xml|yml|yaml)$/i, // config file leaks
  /\.(php|asp|aspx|jsp|cgi)$/i,     // server-side script extensions
  /\/xmlrpc\.php/i,                 // WordPress XML-RPC attack vector
  /\/eval\-stdin\.php/i,            // remote code execution probe
  /\/_?profiler/i,                  // framework profiler exposure
];

// ─── Main proxy function ───────────────────────────────────────────────────────
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Block obvious hacker probes — return a clean 404 (reveal nothing)
  if (BLOCKED_PATH_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. Rate-limit API routes
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  // 3. Generate per-request CSP nonce
  const isDev = process.env.NODE_ENV === "development";
  const nonce = generateNonce();
  const csp = buildCSP(nonce, isDev);

  // Forward nonce to the page via request header (read in page.tsx via headers())
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // 4. Set all security response headers
  response.headers.set("Content-Security-Policy", csp);

  // HSTS: enforce HTTPS for 1 year, all sub-domains, opt into preload list
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Block clickjacking (belt-and-suspenders with CSP frame-ancestors)
  response.headers.set("X-Frame-Options", "DENY");
  // Legacy XSS filter for older browsers
  response.headers.set("X-XSS-Protection", "1; mode=block");
  // Limit referrer information sent to third parties
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Restrict browser feature access
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
  );
  // Cross-Origin isolation
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  // Remove server fingerprinting (belt-and-suspenders — also set in next.config.ts)
  response.headers.delete("X-Powered-By");

  // 5. Prevent caching of API responses
  if (pathname.startsWith("/api/")) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

// Skip static files and images so the proxy doesn't add overhead to assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)",
  ],
};