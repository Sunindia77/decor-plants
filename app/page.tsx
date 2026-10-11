import type { Metadata } from "next";
import { headers } from "next/headers";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import StorefrontHome from "@/components/StorefrontHome";

export const metadata: Metadata = {
  title: "Indoor Plants, Planters & Garden Care | Decor-Plants",
  description:
    "Discover thoughtfully chosen indoor plants, planters and garden care from Decor-Plants. Shop online or get a hand with your home garden in Pune.",
  keywords: [
    "indoor plants online India",
    "buy plants online India",
    "indoor plants Pune",
    "plant pots and planters",
    "easy care house plants",
    "garden care Pune",
    "Decor-Plants",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bring a little more life indoors | Decor-Plants",
    description: "Thoughtfully picked plants, considered pots and garden care for the places you call home.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/garden/indoor-tropical-garden.png",
        width: 1200,
        height: 630,
        alt: "A bright, plant-filled living room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indoor Plants, Planters & Garden Care | Decor-Plants",
    description: "Thoughtfully picked plants and pots for a home that grows with you.",
    images: ["/images/garden/indoor-tropical-garden.png"],
  },
};

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.decor-plants.com/#business",
    name: "Decor-Plants",
    description:
      "Indoor plants, planters, garden design and plant care services in Pune, Maharashtra.",
    url: "https://www.decor-plants.com",
    telephone: "+91-8788159687",
    email: "info@decor-plants.com",
    image: "https://www.decor-plants.com/images/garden/logo-decor-plants.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Pune" },
  };

  return (
    <main className="storefront-page">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <StorefrontHome />
      <SiteFooter />
    </main>
  );
}
