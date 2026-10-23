import type { L } from "@/i18n";

/**
 * LES IMAGES DU BRAND BOOK (03-Image-Direction).
 * Les huit portes (01-Catalog), les rendez-vous et les destinations
 * (04-Events-and-Destinations), 1080 × 1080, sans texte.
 * Une image = un sujet, un ton. Le ton vit dans l'image seulement : jamais
 * pour un texte, un bouton, un fond d'interface ou le monogramme.
 * Ajouter une image = la déposer dans /public/az/ et ajouter une entrée ici.
 */
export type Visual = {
  /** chemin de l'image dans /public */
  image: string;
  /** ton de l'image (brand book p.16), sert seulement de fond d'attente */
  tone: string;
  name: L;
};

const door = (file: string, tone: string, fr: string, en = fr, es = en, pt = es): Visual => ({
  image: `/az/doors/${file}.jpg`,
  tone,
  name: { fr, en, es, pt },
});

const place = (file: string, name: string): Visual => ({
  image: `/az/events-destinations/${file}.jpg`,
  tone: "#1C1B19",
  name: { fr: name, en: name, es: name, pt: name },
});

/** Images des rendez-vous et destinations (03-Image-Direction/04-Events-and-Destinations). */
const scene = (file: string, tone: string, fr: string, en = fr, es = en, pt = es): Visual => ({
  image: `/az/events-destinations/${file}.jpg`,
  tone,
  name: { fr, en, es, pt },
});

export const visuals = {
  palaces: door("AZ-01-palaces", "#C98A4B", "Palaces", "Palaces", "Palacios", "Palácios"),
  jet: door("AZ-02-jet-chauffeur", "#E8A066", "Jets", "Jets", "Jets", "Jatos"),
  festivals: door("AZ-03-film-festivals", "#A3161B", "Festivals", "Festivals", "Festivales", "Festivais"),
  restaurants: door("AZ-04-restaurants", "#C98A4B", "Tables", "Tables", "Mesas", "Mesas"),
  football: door("AZ-05-champions-league", "#17301F", "Football", "Football", "Fútbol", "Futebol"),
  tennis: door("AZ-06-tennis", "#B2563A", "Tennis", "Tennis", "Tenis", "Ténis"),
  concerts: door("AZ-07-concerts", "#13256B", "Concerts", "Concerts", "Conciertos", "Concertos"),
  formulaOne: door("AZ-08-formula-one", "#2C302E", "Formule 1", "Formula One", "Fórmula 1", "Fórmula 1"),
  monaco: place("AZ-05-monaco", "Monaco"),
  saintTropez: place("AZ-06-saint-tropez", "Saint-Tropez"),
  mykonos: place("AZ-07-mykonos", "Mykonos"),
  paris: place("AZ-10-paris", "Paris"),
  ibiza: place("AZ-08-ibiza", "Ibiza"),
  newYork: place("AZ-09-new-york", "New York"),
  usOpen: scene("AZ-01-us-open-court", "#13256B", "US Open"),
  superBowl: scene("AZ-02-super-bowl", "#17301F", "Super Bowl"),
  monacoGrandPrix: scene("AZ-03-monaco-grand-prix", "#2C302E", "Grand Prix de Monaco", "Monaco Grand Prix", "Gran Premio de Mónaco", "Grande Prémio do Mónaco"),
  fashionWeek: scene("AZ-04-paris-fashion-week", "#1C1B19", "Paris Fashion Week"),
  cannes: scene("AZ-11-festival-de-cannes", "#A3161B", "Festival de Cannes", "Cannes Film Festival", "Festival de Cannes", "Festival de Cannes"),
  wimbledon: scene("AZ-12-wimbledon-court", "#17301F", "Wimbledon"),
  ballonDor: scene("AZ-13-ballon-d-or", "#C98A4B", "Ballon d'Or"),
  celineDion: scene("AZ-14-concert-celine-dion", "#13256B", "Céline Dion"),
} satisfies Record<string, Visual>;

/** Les huit portes, dans l'ordre du brand book (p.22). */
export const universes: { visual: Visual; href: string }[] = [
  { visual: visuals.palaces, href: "/services/hotels" },
  { visual: visuals.jet, href: "/services/jet-prive" },
  { visual: visuals.festivals, href: "/evenements/festival-cannes" },
  { visual: visuals.restaurants, href: "/services/gastronomie" },
  { visual: visuals.football, href: "/evenements/champions-league" },
  { visual: visuals.tennis, href: "/evenements/roland-garros" },
  { visual: visuals.concerts, href: "/evenements/celine-dion" },
  { visual: visuals.formulaOne, href: "/evenements/f1-monaco" },
];

/** Numéro de porte à deux chiffres (« 06 »), ou null hors des huit. */
export function universeNumber(visual: Visual): string | null {
  const i = universes.findIndex((u) => u.visual.image === visual.image);
  return i < 0 ? null : String(i + 1).padStart(2, "0");
}

const byService: Record<string, Visual> = {
  evenements: visuals.concerts,
  gastronomie: visuals.restaurants,
  "jet-prive": visuals.jet,
  yachts: visuals.saintTropez,
  hotels: visuals.palaces,
  transport: visuals.jet,
  securite: visuals.formulaOne,
  voyages: visuals.ibiza,
  "sur-mesure": visuals.festivals,
};

const byEvent: Record<string, Visual> = {
  "champions-league": visuals.football,
  "super-bowl": visuals.superBowl,
  "f1-monaco": visuals.monacoGrandPrix,
  wimbledon: visuals.wimbledon,
  "us-open": visuals.usOpen,
  "roland-garros": visuals.tennis,
  "ballon-dor": visuals.ballonDor,
  "fashion-week-paris": visuals.fashionWeek,
  "festival-cannes": visuals.cannes,
  "celine-dion": visuals.celineDion,
};

const byDestination: Record<string, Visual> = {
  monaco: visuals.monaco,
  "cote-d-azur": visuals.saintTropez,
  paris: visuals.paris,
  mykonos: visuals.mykonos,
  ibiza: visuals.ibiza,
  "new-york": visuals.newYork,
};

const byGuide: Record<string, Visual> = {
  vivre: visuals.saintTropez,
  tables: visuals.restaurants,
  verres: visuals.palaces,
  nuit: visuals.concerts,
};

const byArticle: Record<string, Visual> = {
  "obtenir-billets-evenement-sold-out": visuals.concerts,
  "grand-prix-monaco-vip": visuals.formulaOne,
  "monaco-adresses": visuals.monaco,
};

export const serviceVisual = (slug: string) => byService[slug] ?? visuals.palaces;
export const eventVisual = (slug: string) => byEvent[slug] ?? visuals.festivals;
export const destinationVisual = (slug: string) => byDestination[slug] ?? visuals.paris;
export const guideVisual = (cat: string) => byGuide[cat] ?? visuals.saintTropez;
export const articleVisual = (slug: string) => byArticle[slug] ?? visuals.palaces;

export const imageSrc = (visual: Visual) => visual.image;

/** Mots d'interface propres au brand book (labels). */
export const universeWords = {
  word: { fr: "Porte", en: "Door", es: "Puerta", pt: "Porta" } as L,
  doors: { fr: "Les huit portes", en: "The eight doors", es: "Las ocho puertas", pt: "As oito portas" } as L,
  destinations: { fr: "Destinations", en: "Destinations", es: "Destinos", pt: "Destinos" } as L,
  chapter: { fr: "Chapitre", en: "Chapter", es: "Capítulo", pt: "Capítulo" } as L,
  onRequest: { fr: "Sur demande", en: "On request", es: "Bajo petición", pt: "Sob pedido" } as L,
};
