import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the "X-Powered-By: Next.js" fingerprinting header
  poweredByHeader: false,

  // Enable gzip/brotli compression on all responses
  compress: true,

  // Image optimisation: auto-convert to WebP/AVIF, aggressive caching
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000, // cache optimised images for 1 year
  },

  async redirects() {
    return [
      {
        source: "/terms-conditions",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // ── Long-term cache for public images ───────────────────────────────────
      // Next.js already handles _next/static immutable caching automatically.
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      // ── Security headers for all routes ────────────────────────────────────
      {
        // Applied to ALL routes including static files (_next/static, images, etc.)
        // These act as a fallback safety net — middleware sets them on dynamic routes.
        source: "/:path*",
        headers: [
          // HSTS: enforce HTTPS for 1 year, all sub-domains, preload list eligible
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Prevent MIME-type sniffing attacks
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Block clickjacking via iframes
          { key: "X-Frame-Options", value: "DENY" },
          // Legacy XSS filter for older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Limit referrer information sent to third parties
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser feature access
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // Cross-Origin isolation prevents cross-origin attacks
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          // X-Robots-Tag: tells crawlers at the HTTP header level to index & follow
          // This complements the <meta name="robots"> tag for audit tools that
          // check headers rather than (or in addition to) the HTML meta tag.
          { key: "X-Robots-Tag", value: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        ],
      },
    ];
  },
};

export default nextConfig;
