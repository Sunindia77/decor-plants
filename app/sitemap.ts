import type { MetadataRoute } from "next";
import { getPlantLandingPath, plantLandingPages } from "@/src/data/plantLandingPages";
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
    ...plantLandingPages.map((page) => ({
      url: `${siteUrl}/${getPlantLandingPath(page)}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: page.type === "hub" || page.type === "local" ? 0.8 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      // Service pages target high-intent transactional keywords — higher priority
      priority: 0.9,
    })),
  ];
}
