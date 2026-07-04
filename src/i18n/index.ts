import { fr, type Dict } from "./fr";
import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";

export const locales = ["fr", "en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

const dicts: Record<Locale, Dict> = { fr, en, es, pt };

export function getDict(locale: string): Dict {
  return dicts[(locale as Locale) in dicts ? (locale as Locale) : defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Chaîne localisée : un texte par langue. */
export type L = Record<Locale, string>;

export type { Dict };
