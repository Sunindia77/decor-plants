import type { MetadataRoute } from "next";
import { services } from "@/src/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.decor-plants.com").replace(/\/$/, "");

  const today = new Date().toISOString();

  return [
    {
      url: siteUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      // Service pages target high-intent transactional keywords — higher priority
      priority: 0.9,
    })),
  ];
}