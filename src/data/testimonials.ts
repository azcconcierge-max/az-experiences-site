import type { L } from "@/i18n";

/**
 * AVIS CLIENTS — exemples de démonstration à remplacer par de VRAIS avis
 * (Google, WhatsApp, emails clients) dès que possible.
 * Prénom + initiale uniquement : la discrétion fait partie de la promesse.
 */
export type Testimonial = {
  name: string;
  context: L;
  quote: L;
};

export const testimonials: Testimonial[] = [
  {
    name: "Alexandre R.",
    context: {
      fr: "Grand Prix de Monaco",
      en: "Monaco Grand Prix",
      es: "Gran Premio de Mónaco",
      pt: "Grande Prémio do Mónaco",
    },
    quote: {
      fr: "Demande envoyée un mardi soir, terrasse au-dessus du circuit confirmée le mercredi midi, hélicoptère compris. Une exécution que je n'avais jamais vue ailleurs.",
      en: "Request sent on a Tuesday evening, terrace above the track confirmed by Wednesday noon, helicopter included. An execution I had never seen anywhere else.",
      es: "Solicitud enviada un martes por la noche, terraza sobre el circuito confirmada el miércoles al mediodía, helicóptero incluido. Una ejecución que nunca había visto.",
      pt: "Pedido enviado numa terça à noite, terraço sobre o circuito confirmado na quarta ao meio-dia, helicóptero incluído. Uma execução que nunca tinha visto.",
    },
  },
  {
    name: "Karim B.",
    context: {
      fr: "Finale — billets sold out",
      en: "Final — sold-out tickets",
      es: "Final — entradas agotadas",
      pt: "Final — bilhetes esgotados",
    },
    quote: {
      fr: "Quatre places catégorie 1 pour une finale affichée complète depuis des mois. Billets nominatifs, accompagnement jusqu'au tourniquet. Sérieux absolu.",
      en: "Four category 1 seats for a final sold out for months. Named tickets, assistance all the way to the turnstile. Absolute professionalism.",
      es: "Cuatro entradas de categoría 1 para una final agotada desde hacía meses. Entradas nominativas, acompañamiento hasta el torno. Seriedad absoluta.",
      pt: "Quatro lugares de categoria 1 para uma final esgotada há meses. Bilhetes nominativos, acompanhamento até ao torniquete. Seriedade absoluta.",
    },
  },
  {
    name: "Sofia M.",
    context: {
      fr: "Paris Fashion Week",
      en: "Paris Fashion Week",
      es: "Paris Fashion Week",
      pt: "Paris Fashion Week",
    },
    quote: {
      fr: "Deux invitations pour un défilé auquel je ne croyais plus, un chauffeur toute la semaine, et une discrétion totale. Je ne passe plus par personne d'autre.",
      en: "Two invitations to a show I had given up on, a chauffeur all week, and total discretion. I no longer go through anyone else.",
      es: "Dos invitaciones para un desfile en el que ya no creía, un chófer toda la semana y una discreción total. Ya no paso por nadie más.",
      pt: "Dois convites para um desfile em que já não acreditava, um motorista toda a semana e uma discrição total. Já não passo por mais ninguém.",
    },
  },
];
