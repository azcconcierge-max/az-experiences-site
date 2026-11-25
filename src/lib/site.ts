/**
 * Configuration centrale du site, tout ce qui change souvent est ici.
 * Modifier ce fichier suffit pour mettre à jour WhatsApp, email, adresse, etc.
 */
/** Nom de marque officiel, orthographe validée par Noam. */
export const BRAND_NAME = "AZ Experiences";

export const site = {
  name: BRAND_NAME,
  legalName: "AZ Management",
  baseUrl: "https://azexperiences.com",
  email: "contact@azexperiences.com",
  // Numéro WhatsApp au format international sans "+".
  whatsapp: "33651733987" as string | null,
  // Adresse affichée sur le site (pied de page, contact, données structurées).
  address: {
    street: "30 N. Gould St. #69254",
    city: "Sheridan",
    region: "Wyoming",
    postalCode: "82801",
    country: "US",
  },
  /** Siège social de l'entité juridique citée dans les pages légales (AZ Management, SIRET). */
  registeredOffice: "11 avenue Myron Herrick, 75008 Paris, France",
  foundingYear: 2024,
  instagram: null as string | null, // ex: "https://instagram.com/azconciergerie"
  linkedin: "https://www.linkedin.com/company/146265280/" as string | null,
} as const;

/** « 30 N. Gould St. #69254, Sheridan, Wyoming 82801 » */
export const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/**
 * Numéro WhatsApp de la maison, format international sans « + ».
 * À COMPLÉTER dès que le numéro est actif (ex. "33612345678").
 * Tant qu'il est vide, tous les liens WhatsApp retombent sur l'email.
 */
export const WHATSAPP_NUMBER = site.whatsapp ?? "";

/** L'unique URL WhatsApp du site : footer, section demande, barre mobile, contact. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappHref(message?: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}

/** Lien de contact direct : WhatsApp si le numéro est renseigné, sinon email. */
export function contactHref(message?: string): string {
  return whatsappHref(message) ?? `mailto:${site.email}`;
}
