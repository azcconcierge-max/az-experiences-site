import type { L, Locale } from "@/i18n";
import type { EventItem } from "@/data/events";

const all = (s: string): L => ({ fr: s, en: s, es: s, pt: s });

/** Event names as people say them, in each language. */
export const EVENT_NAMES: Record<string, L> = {
  "champions-league": { fr: "Finale de la Ligue des champions", en: "Champions League Final", es: "Final de la Champions League", pt: "Final da Liga dos Campeões" },
  "super-bowl": all("Super Bowl LXI"),
  "f1-monaco": { fr: "Grand Prix de Monaco", en: "Monaco Grand Prix", es: "Gran Premio de Mónaco", pt: "Grande Prémio do Mónaco" },
  "tennis-tour": { fr: "Tennis, toute la saison", en: "Tennis, all season", es: "Tenis, toda la temporada", pt: "Ténis, toda a temporada" },
  "fashion-week-paris": all("Paris Fashion Week"),
  "festival-cannes": { fr: "Festival de Cannes", en: "Cannes Film Festival", es: "Festival de Cannes", pt: "Festival de Cannes" },
  "met-gala": all("Met Gala"),
  oscars: { fr: "Les Oscars", en: "The Oscars", es: "Los Óscar", pt: "Os Óscares" },
  "celine-dion": { fr: "Céline Dion, tournée mondiale", en: "Céline Dion, world tour", es: "Céline Dion, gira mundial", pt: "Céline Dion, digressão mundial" },
};
export const EVENT_CITIES: Record<string, L> = {
  "tennis-tour": { fr: "Monde", en: "Worldwide", es: "Mundo", pt: "Mundo" },
  "celine-dion": { fr: "Monde", en: "Worldwide", es: "Mundo", pt: "Mundo" },
};
/** City names that change between languages. */
const CITY_WORDS: Record<string, L> = {
  London: { fr: "Londres", en: "London", es: "Londres", pt: "Londres" },
  "New York": { fr: "New York", en: "New York", es: "Nueva York", pt: "Nova Iorque" },
  Dubai: { fr: "Dubaï", en: "Dubai", es: "Dubái", pt: "Dubai" },
  Monaco: { fr: "Monaco", en: "Monaco", es: "Mónaco", pt: "Mónaco" },
  "Côte d'Azur": { fr: "Côte d'Azur", en: "French Riviera", es: "Costa Azul", pt: "Côte d'Azur" },
  Mykonos: { fr: "Mykonos", en: "Mykonos", es: "Mykonos", pt: "Míconos" },
  "Los Angeles": all("Los Angeles"),
};
export const GROUP: Record<EventItem["category"], "sport" | "culture" | "music"> = {
  sport: "sport", musique: "music", mode: "culture", festival: "culture", ceremonie: "culture",
};

export const eventName = (e: Pick<EventItem, "slug" | "name">, locale: Locale) => EVENT_NAMES[e.slug]?.[locale] ?? e.name;
export const eventCity = (e: Pick<EventItem, "slug" | "city">, locale: Locale) =>
  EVENT_CITIES[e.slug]?.[locale] ?? CITY_WORDS[e.city]?.[locale] ?? e.city;
export const cityName = (name: string, locale: Locale) => CITY_WORDS[name]?.[locale] ?? name;
/** "Final on June 5, 2027 · Madrid" → "Final on June 5, 2027" */
export const when = (label: string) => label.split(" · ")[0];
