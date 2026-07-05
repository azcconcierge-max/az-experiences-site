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

export function whatsappHref(message?: string): string | null {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
