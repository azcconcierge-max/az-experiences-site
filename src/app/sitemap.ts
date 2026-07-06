import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/i18n";
import { events } from "@/data/events";
import { articles } from "@/data/articles";
import { services } from "@/data/services";
import { destinations } from "@/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/qui-sommes-nous",
    "/services",
    "/evenements",
    "/destinations",
    "/guide",
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

  const serviceEntries = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${site.baseUrl}/${locale}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const articleEntries = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: `${site.baseUrl}/${locale}/guide/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const destinationEntries = locales.flatMap((locale) =>
    destinations.map((dest) => ({
      url: `${site.baseUrl}/${locale}/destinations/${dest.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    ...staticEntries,
    ...eventEntries,
    ...serviceEntries,
    ...destinationEntries,
    ...articleEntries,
  ];
}
