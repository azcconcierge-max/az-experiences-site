import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/i18n";
import { events } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/maison",
    "/conciergerie",
    "/transport",
    "/hospitality",
    "/evenements",
    "/contact",
  ];

  const staticEntries = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${site.baseUrl}/${locale}${page}`,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const eventEntries = locales.flatMap((locale) =>
    events.map((event) => ({
      url: `${site.baseUrl}/${locale}/evenements/${event.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticEntries, ...eventEntries];
}
