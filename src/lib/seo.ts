import { locales } from "@/i18n";

/** Canonical + hreflang pour une page, dans les 4 langues. */
export function pageAlternates(path: string, locale: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  };
}
