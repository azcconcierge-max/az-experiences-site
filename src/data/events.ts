import type { Locale } from "@/i18n";

/**
 * ÉVÉNEMENTS D'EXEMPLE — à remplacer par les vrais événements.
 * Ajouter un événement = ajouter un objet à ce tableau, rien d'autre.
 * `image` : mettre le chemin d'une photo dans /public (ex: "/events/monaco.jpg").
 * Tant qu'il n'y a pas de photo, un visuel abstrait est généré automatiquement.
 */

type Localized = Record<Locale, string>;

export type EventItem = {
  slug: string;
  category: "sport" | "musique" | "mode" | "festival";
  name: string;
  city: string;
  country: string;
  venue: string;
  startDate: string; // ISO — utilisé pour Schema.org
  endDate?: string;
  dateLabel: Localized;
  tagline: Localized;
  description: Localized;
  offers: { fr: string[]; en: string[] };
  faq: { q: Localized; a: Localized }[];
  image?: string;
  /** teinte du visuel abstrait de secours (0-360) */
  hue: number;
};

export const events: EventItem[] = [
  {
    slug: "finale-coupe-du-monde-2026",
    category: "sport",
    name: "Finale de la Coupe du Monde FIFA 2026",
    city: "New York / New Jersey",
    country: "US",
    venue: "MetLife Stadium",
    startDate: "2026-07-19",
    dateLabel: { fr: "19 juillet 2026", en: "July 19, 2026" },
    tagline: {
      fr: "Le match que le monde entier regardera.",
      en: "The match the whole world will watch.",
    },
    description: {
      fr: "La finale de la Coupe du Monde FIFA 2026 se joue au MetLife Stadium, aux portes de New York. AZ Conciergerie propose des billets premium et des packages hospitality officiels pour vivre la finale dans des conditions d'exception : placement optimal, lounges privés, accompagnement complet sur place.",
      en: "The FIFA World Cup 2026 final takes place at MetLife Stadium, at the gates of New York. AZ Conciergerie offers premium tickets and official hospitality packages to experience the final in exceptional conditions: prime seating, private lounges, full on-site assistance.",
    },
    offers: {
      fr: [
        "Billets catégorie 1 & placements premium",
        "Packages hospitality officiels (lounges, restauration signature)",
        "Transferts privés stade ↔ Manhattan",
        "Conciergerie sur place pendant tout le séjour",
      ],
      en: [
        "Category 1 tickets & premium seating",
        "Official hospitality packages (lounges, signature dining)",
        "Private transfers stadium ↔ Manhattan",
        "On-site concierge throughout your stay",
      ],
    },
    faq: [
      {
        q: {
          fr: "Peut-on encore obtenir des billets pour la finale ?",
          en: "Can tickets for the final still be secured?",
        },
        a: {
          fr: "Oui. Même à l'approche du match, notre réseau de détenteurs officiels et de partenaires hospitality nous permet de proposer des billets et des packages, avec confirmation écrite avant tout engagement.",
          en: "Yes. Even close to the match, our network of official holders and hospitality partners allows us to offer tickets and packages, with written confirmation before any commitment.",
        },
      },
    ],
    hue: 145,
  },
  {
    slug: "paris-fashion-week",
    category: "mode",
    name: "Paris Fashion Week",
    city: "Paris",
    country: "FR",
    venue: "Paris",
    startDate: "2026-09-28",
    endDate: "2026-10-06",
    dateLabel: { fr: "28 septembre – 6 octobre 2026", en: "September 28 – October 6, 2026" },
    tagline: {
      fr: "Au premier rang de la mode mondiale.",
      en: "Front row at world fashion.",
    },
    description: {
      fr: "Défilés des grandes maisons, présentations privées, soirées confidentielles : la Paris Fashion Week est l'un des rendez-vous les plus fermés au monde. AZ Conciergerie ouvre les portes — invitations défilés, accès aux événements off, tables dans les adresses du moment.",
      en: "Major maison shows, private presentations, confidential parties: Paris Fashion Week is one of the most closed events in the world. AZ Conciergerie opens the doors — show invitations, off-schedule access, tables at the addresses of the moment.",
    },
    offers: {
      fr: [
        "Invitations défilés & présentations",
        "Accès soirées et événements off",
        "Chauffeur dédié pendant la semaine",
        "Conciergerie mode (stylisme, shopping privé)",
      ],
      en: [
        "Show & presentation invitations",
        "Access to parties and off-schedule events",
        "Dedicated chauffeur for the week",
        "Fashion concierge (styling, private shopping)",
      ],
    },
    faq: [],
    hue: 330,
  },
  {
    slug: "grand-prix-monaco-2027",
    category: "sport",
    name: "Grand Prix de Monaco F1",
    city: "Monaco",
    country: "MC",
    venue: "Circuit de Monaco",
    startDate: "2027-05-27",
    endDate: "2027-05-30",
    dateLabel: { fr: "27 – 30 mai 2027", en: "May 27 – 30, 2027" },
    tagline: {
      fr: "Le joyau du calendrier, vu d'en haut.",
      en: "The jewel of the calendar, seen from above.",
    },
    description: {
      fr: "Terrasses au-dessus du circuit, yachts en bord de piste, Paddock Club : le Grand Prix de Monaco se vit à plusieurs hauteurs — toutes exceptionnelles. AZ Conciergerie construit votre week-end sur-mesure, de l'hélicoptère Nice–Monaco à la table du dimanche soir.",
      en: "Terraces above the track, trackside yachts, the Paddock Club: the Monaco Grand Prix is lived at several altitudes — all exceptional. AZ Conciergerie builds your bespoke weekend, from the Nice–Monaco helicopter to Sunday night's dinner table.",
    },
    offers: {
      fr: [
        "Paddock Club & terrasses privées",
        "Places sur yacht en bord de circuit",
        "Hélicoptère Nice ↔ Monaco",
        "Hôtels & dîners de la Principauté",
      ],
      en: [
        "Paddock Club & private terraces",
        "Trackside yacht placements",
        "Nice ↔ Monaco helicopter",
        "Hotels & dinners in the Principality",
      ],
    },
    faq: [],
    hue: 210,
  },
  {
    slug: "roland-garros-2027",
    category: "sport",
    name: "Roland-Garros",
    city: "Paris",
    country: "FR",
    venue: "Stade Roland-Garros",
    startDate: "2027-05-23",
    endDate: "2027-06-06",
    dateLabel: { fr: "23 mai – 6 juin 2027", en: "May 23 – June 6, 2027" },
    tagline: {
      fr: "La terre battue, côté loges.",
      en: "Clay season, from the boxes.",
    },
    description: {
      fr: "Quarts, demi-finales, finales : les plus belles sessions de Roland-Garros, en catégorie Or ou en loge. AZ Conciergerie propose billets premium, hospitalités officielles du Village et accompagnement complet — jusqu'à la coupe de champagne à l'ombre du Chatrier.",
      en: "Quarter-finals, semi-finals, finals: the finest sessions of Roland-Garros, in Gold category or private boxes. AZ Conciergerie offers premium tickets, official Village hospitality and full assistance — down to the glass of champagne in the shade of the Chatrier.",
    },
    offers: {
      fr: [
        "Catégorie Or & loges Philippe-Chatrier",
        "Village Roland-Garros (hospitalité officielle)",
        "Sessions finales week-end",
        "Transport & conciergerie parisienne",
      ],
      en: [
        "Gold category & Philippe-Chatrier boxes",
        "Roland-Garros Village (official hospitality)",
        "Finals weekend sessions",
        "Transport & Paris concierge",
      ],
    },
    faq: [],
    hue: 25,
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
