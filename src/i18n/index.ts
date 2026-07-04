import { fr, type Dict } from "./fr";
import { en } from "./en";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const dicts: Record<Locale, Dict> = { fr, en };

export function getDict(locale: string): Dict {
  return dicts[(locale as Locale) in dicts ? (locale as Locale) : defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type { Dict };
