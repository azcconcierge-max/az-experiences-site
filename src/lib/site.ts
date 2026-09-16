/**
 * Configuration centrale du site, tout ce qui change souvent est ici.
 * Modifier ce fichier suffit pour mettre à jour WhatsApp, email, adresse, etc.
 */
export const site = {
  name: "AZ Conciergerie",
  legalName: "AZ Management",
  baseUrl: "https://azconciergerie.com", // à remplacer par le vrai domaine
  email: "azcconcierge@gmail.com",
  // Numéro WhatsApp au format international sans "+" (ex: "33612345678").
  // Laisser null tant que le numéro n'est pas disponible : les boutons
  // WhatsApp basculent automatiquement vers l'email.
  whatsapp: null as string | null,
  address: {
    street: "11 Avenue Myron Herrick",
    postalCode: "75008",
    city: "Paris",
    country: "FR",
  },
  foundingYear: 2024,
  instagram: null as string | null, // ex: "https://instagram.com/azconciergerie"
} as const;

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
