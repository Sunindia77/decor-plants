import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.decor-plants.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Brand & default title ──────────────────────────────────────────────────
  title: {
    default: "Decor-Plants | Garden & Plant Care Services in Pune",
    template: "%s | Decor-Plants",
  },
  description:
    "Decor-Plants offers professional garden maintenance, balcony gardens, terrace gardens, vertical green walls and office plant care in Pune, Maharashtra. Call +91-8788159687 for a free site visit.",
  authors: [{ name: "Decor-Plants" }],
  publisher: "Decor-Plants",

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/images/garden/decor-plants-favicon.png",
    apple: "/images/garden/decor-plants-favicon.png",
  },

  // ── Search keywords (supplementary signal) ────────────────────────────────
  keywords: [
    "garden maintenance services Pune",
    "gardening services Pune",
    "plant care services Pune",
    "balcony garden service Pune",
    "terrace garden service Pune",
    "vertical garden installation Pune",
    "indoor plants Pune",
    "bonsai plants Pune",
    "fern plants Pune",
    "succulent plants Pune",
    "flowering plants Pune",
    "ornamental plants Pune",
    "cactus plants Pune",
    "climber and creeper plants Pune",
    "shrub plants Pune",
    "water plants Pune",
    "plant pots Pune",
    "ceramic pots Pune",
    "decorative pebbles Pune",
    "landscaping services Pune",
    "office plant maintenance Pune",
    "garden design services Pune",
    "Decor-Plants",
  ],

  // ── Open Graph (Facebook / LinkedIn / WhatsApp preview) ───────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Decor-Plants",
    title: "Decor-Plants | Garden & Plant Care Services in Pune",
    description:
      "Professional garden maintenance, balcony, terrace & vertical gardens, and office plant care in Pune. 500+ happy clients. Free site visit.",
    url: SITE_URL,
    images: [
      {
        url: "/images/garden/Luxury%20Terrace%20Garden.png",
        width: 1200,
        height: 630,
        alt: "Luxury Terrace Garden by Decor-Plants, Pune",
      },
    ],
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Decor-Plants | Garden & Plant Care Services in Pune",
    description:
      "Professional garden maintenance, balcony, terrace & vertical gardens in Pune. 500+ happy clients. Free site visit.",
    images: ["/images/garden/Luxury%20Terrace%20Garden.png"],
  },

  // ── Canonical & alternates ────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Crawling ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to image/font origins to eliminate DNS + TLS round trips */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Tell the browser the viewport width immediately — prevents extra reflow */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}