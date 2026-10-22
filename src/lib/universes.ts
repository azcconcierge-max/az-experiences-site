/**
 * La bibliothèque d'images V1.2 : huit univers, une teinte chacun.
 * « One image, several frames » : la même image sert plusieurs sujets
 * grâce à des cadrages différents (object-position + zoom).
 * Yachts et Sécurité n'ont pas d'image dans la Version 1 : champ graphite.
 */
export type Universe = {
  file: string; // base sans suffixe, dans /images/universes/
  tone: string; // hex de la teinte associée
  toneName: string;
};

export const UNIVERSES: Record<string, Universe> = {
  palaces: { file: "AZ-01-palaces_amber", tone: "#C98A4B", toneName: "amber" },
  jet: { file: "AZ-02-private-jet-chauffeur_dusk", tone: "#E8A066", toneName: "dusk" },
  festivals: { file: "AZ-03-film-festivals_ember", tone: "#A3161B", toneName: "ember" },
  restaurants: { file: "AZ-04-restaurants_amber", tone: "#C98A4B", toneName: "amber" },
  football: { file: "AZ-05-football_pitch", tone: "#17301F", toneName: "pitch" },
  tennis: { file: "AZ-06-tennis_clay", tone: "#B2563A", toneName: "clay" },
  concerts: { file: "AZ-07-concerts_stage", tone: "#13256B", toneName: "stage" },
  f1: { file: "AZ-08-formula-one_asphalt", tone: "#2C302E", toneName: "asphalt" },
};

export function universeSrc(u: Universe, size: "1080" | "540" | "banner" = "1080") {
  const suffix = size === "banner" ? "banner-1080x608" : size;
  return `/images/universes/${u.file}-${suffix}.webp`;
}

/** Cadrage : position + zoom pour différencier deux sujets d'un même univers. */
export type Frame = { universe: keyof typeof UNIVERSES; position?: string; zoom?: number };

/** Événements du site → univers + cadrage. */
export const EVENT_FRAMES: Record<string, Frame> = {
  "coupe-du-monde-2026": { universe: "football", position: "50% 70%" },
  "super-bowl": { universe: "football", position: "50% 10%", zoom: 1.6 },
  "f1-monaco": { universe: "f1", position: "70% 30%" },
  wimbledon: { universe: "tennis", position: "15% 15%", zoom: 1.5 },
  "us-open": { universe: "tennis", position: "85% 60%", zoom: 1.4 },
  "roland-garros": { universe: "tennis", position: "50% 50%" },
  "ballon-dor": { universe: "festivals", position: "30% 20%", zoom: 1.3 },
  "fashion-week-paris": { universe: "festivals", position: "75% 75%", zoom: 1.5 },
  "festival-cannes": { universe: "festivals", position: "50% 55%" },
  "celine-dion": { universe: "concerts", position: "50% 40%" },
};

/** Services du site → univers (null = pas d'image Version 1 : champ graphite). */
export const SERVICE_FRAMES: Record<string, Frame | null> = {
  evenements: { universe: "concerts", position: "50% 75%" },
  gastronomie: { universe: "restaurants", position: "50% 60%" },
  "jet-prive": { universe: "jet", position: "50% 35%" },
  yachts: null,
  hotels: { universe: "palaces", position: "50% 50%" },
  transport: { universe: "jet", position: "50% 85%", zoom: 1.5 },
  securite: null,
  voyages: { universe: "jet", position: "20% 20%", zoom: 1.3 },
  "sur-mesure": { universe: "palaces", position: "50% 85%", zoom: 1.6 },
};

export function frameUniverse(frame: Frame): Universe {
  return UNIVERSES[frame.universe];
}
