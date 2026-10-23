import type { L, Locale } from "@/i18n";

/**
 * LES ÉVÉNEMENTS · la vitrine principale du site, à actualiser en continu.
 * Ajouter un événement = copier un bloc. Jamais de prix : les demandes
 * se font par email ou WhatsApp.
 * Visuel et couleur : l'univers du rendez-vous, dans src/lib/univers.ts.
 * `startDate` : ISO (YYYY-MM-DD ou YYYY-MM) · laisser undefined si dates sur demande.
 */
export type EventItem = {
  slug: string;
  category: "sport" | "musique" | "mode" | "festival" | "ceremonie";
  name: string;
  city: string;
  country: string;
  venue: string;
  startDate?: string;
  endDate?: string;
  dateLabel: L;
  tagline: L;
  description: L;
  offers: Record<Locale, string[]>;
  image?: string;
  hue: number;
  /** soirée sur invitation : nous orchestrons autour, sans vendre de billet */
  invitationOnly?: boolean;
};

export const events: EventItem[] = [
  {
    slug: "champions-league",
    category: "sport",
    name: "UEFA Champions League",
    city: "Madrid",
    country: "ES",
    venue: "Estadio Metropolitano",
    startDate: "2027-06-05",
    dateLabel: {
      fr: "Finale le 5 juin 2027 · Madrid",
      en: "Final on June 5, 2027 · Madrid",
      es: "Final el 5 de junio de 2027 · Madrid",
      pt: "Final a 5 de junho de 2027 · Madrid",
    },
    tagline: {
      fr: "Les grandes nuits européennes.",
      en: "The great European nights.",
      es: "Las grandes noches europeas.",
      pt: "As grandes noites europeias.",
    },
    description: {
      fr: "Les plus grands matchs de la saison, de la phase de ligue à la finale du 5 juin 2027 à l'Estadio Metropolitano de Madrid : billets premium, loges privées et hospitality officielle. Placement optimal, accompagnement complet sur place.",
      en: "The biggest matches of the season, from the league phase to the final on June 5, 2027 at the Estadio Metropolitano in Madrid: premium tickets, private boxes and official hospitality. Prime seating, full on-site assistance.",
      es: "Los mayores partidos de la temporada, de la fase liga a la final del 5 de junio de 2027 en el Estadio Metropolitano de Madrid: entradas premium, palcos privados y hospitality oficial. Ubicación óptima, acompañamiento completo.",
      pt: "Os maiores jogos da temporada, da fase de liga à final de 5 de junho de 2027 no Estadio Metropolitano de Madrid: bilhetes premium, camarotes privados e hospitality oficial. Lugar de excelência, acompanhamento completo.",
    },
    offers: {
      fr: ["Billets catégorie 1 & premium", "Loges privées et hospitality officielle", "Transferts privés aéroport ↔ stade"],
      en: ["Category 1 & premium tickets", "Private boxes and official hospitality", "Private transfers airport ↔ stadium"],
      es: ["Entradas categoría 1 y premium", "Palcos privados y hospitality oficial", "Traslados privados aeropuerto ↔ estadio"],
      pt: ["Bilhetes categoria 1 e premium", "Camarotes privados e hospitality oficial", "Transferes privados aeroporto ↔ estádio"],
    },
    hue: 145,
  },
  {
    slug: "super-bowl",
    category: "sport",
    name: "Super Bowl LXI",
    city: "Los Angeles",
    country: "US",
    venue: "SoFi Stadium",
    startDate: "2027-02",
    dateLabel: {
      fr: "Février 2027 · Los Angeles",
      en: "February 2027 · Los Angeles",
      es: "Febrero de 2027 · Los Ángeles",
      pt: "Fevereiro de 2027 · Los Angeles",
    },
    tagline: {
      fr: "Le plus grand show du sport américain.",
      en: "The greatest show in American sport.",
      es: "El mayor espectáculo del deporte americano.",
      pt: "O maior espetáculo do desporto americano.",
    },
    description: {
      fr: "Le Super Bowl, son halftime show et son atmosphère unique : billets premium, suites privées et expériences hospitality au SoFi Stadium, avec toute la logistique orchestrée depuis votre hôtel.",
      en: "The Super Bowl, its halftime show and its unique atmosphere: premium tickets, private suites and hospitality experiences at SoFi Stadium, with all logistics orchestrated from your hotel.",
      es: "El Super Bowl, su halftime show y su atmósfera única: entradas premium, suites privadas y experiencias de hospitality en el SoFi Stadium, con toda la logística orquestada desde su hotel.",
      pt: "O Super Bowl, o seu halftime show e a sua atmosfera única: bilhetes premium, suites privadas e experiências de hospitality no SoFi Stadium, com toda a logística orquestrada desde o seu hotel.",
    },
    offers: {
      fr: ["Billets premium & club seats", "Suites privées", "Week-end complet à Los Angeles"],
      en: ["Premium tickets & club seats", "Private suites", "Full Los Angeles weekend"],
      es: ["Entradas premium y club seats", "Suites privadas", "Fin de semana completo en Los Ángeles"],
      pt: ["Bilhetes premium e club seats", "Suites privadas", "Fim de semana completo em Los Angeles"],
    },
    hue: 265,
  },
  {
    slug: "f1-monaco",
    category: "sport",
    name: "Grand Prix de Monaco F1",
    city: "Monaco",
    country: "MC",
    venue: "Circuit de Monaco",
    startDate: "2027-05-27",
    endDate: "2027-05-30",
    dateLabel: {
      fr: "Mai 2027 · Monte-Carlo",
      en: "May 2027 · Monte-Carlo",
      es: "Mayo de 2027 · Montecarlo",
      pt: "Maio de 2027 · Monte-Carlo",
    },
    tagline: {
      fr: "Le joyau du calendrier, vu d'en haut.",
      en: "The jewel of the calendar, seen from above.",
      es: "La joya del calendario, vista desde arriba.",
      pt: "A joia do calendário, vista de cima.",
    },
    description: {
      fr: "Terrasses au-dessus du circuit, yachts en bord de piste, Paddock Club : le Grand Prix de Monaco se vit à plusieurs hauteurs, toutes exceptionnelles. Nous construisons votre week-end de bout en bout, hélicoptère Nice–Monaco compris.",
      en: "Terraces above the track, trackside yachts, the Paddock Club: the Monaco Grand Prix is lived at several altitudes, all exceptional. We build your weekend end to end, Nice–Monaco helicopter included.",
      es: "Terrazas sobre el circuito, yates junto a la pista, Paddock Club: el Gran Premio de Mónaco se vive a varias alturas, todas excepcionales. Construimos su fin de semana de principio a fin, helicóptero Niza–Mónaco incluido.",
      pt: "Terraços sobre o circuito, iates junto à pista, Paddock Club: o Grande Prémio do Mónaco vive-se a várias alturas, todas excecionais. Construímos o seu fim de semana de ponta a ponta, helicóptero Nice–Mónaco incluído.",
    },
    offers: {
      fr: ["Paddock Club & terrasses privées", "Yacht en bord de circuit", "Hélicoptère Nice ↔ Monaco"],
      en: ["Paddock Club & private terraces", "Trackside yacht", "Nice ↔ Monaco helicopter"],
      es: ["Paddock Club y terrazas privadas", "Yate junto al circuito", "Helicóptero Niza ↔ Mónaco"],
      pt: ["Paddock Club e terraços privados", "Iate junto à pista", "Helicóptero Nice ↔ Mónaco"],
    },
    hue: 210,
  },
  {
    slug: "tennis-tour",
    category: "sport",
    name: "Tennis Tour",
    city: "Grand Slam · Masters",
    country: "INT",
    venue: "Grand Slam & Masters",
    dateLabel: {
      fr: "Toute la saison · Dates sur demande",
      en: "All season · Dates on request",
      es: "Toda la temporada · Fechas bajo petición",
      pt: "Toda a temporada · Datas sob pedido",
    },
    tagline: {
      fr: "Le court central, toute la saison.",
      en: "Centre court, all season long.",
      es: "La pista central, toda la temporada.",
      pt: "O court central, toda a temporada.",
    },
    description: {
      fr: "Des quatre tournois du Grand Chelem aux Masters de la saison : places premium, loges et hospitality officielle, des premiers tours aux finales. Sur demande, selon les dates et les tournois qui vous conviennent.",
      en: "From the four Grand Slams to the season's Masters: premium seats, boxes and official hospitality, from the early rounds to the finals. On request, for the dates and tournaments that suit you.",
      es: "De los cuatro torneos de Grand Slam a los Masters de la temporada: asientos premium, palcos y hospitality oficial, de las primeras rondas a las finales. Bajo petición, según las fechas y los torneos que le convengan.",
      pt: "Dos quatro torneios do Grand Slam aos Masters da temporada: lugares premium, camarotes e hospitality oficial, das primeiras rondas às finais. Sob pedido, conforme as datas e os torneios que lhe convenham.",
    },
    offers: {
      fr: ["Places premium et loges", "Hospitality officielle des tournois", "Séjour, chauffeur et conciergerie"],
      en: ["Premium seats and boxes", "Official tournament hospitality", "Stay, chauffeur and concierge"],
      es: ["Asientos premium y palcos", "Hospitality oficial de los torneos", "Estancia, chófer y conserjería"],
      pt: ["Lugares premium e camarotes", "Hospitality oficial dos torneios", "Estadia, motorista e concierge"],
    },
    hue: 20,
  },
  {
    slug: "ballon-dor",
    category: "ceremonie",
    name: "Ballon d'Or",
    city: "Londres",
    country: "GB",
    venue: "London",
    startDate: "2026-10-26",
    dateLabel: {
      fr: "26 octobre 2026 · Londres",
      en: "26 October 2026 · London",
      es: "26 de octubre de 2026 · Londres",
      pt: "26 de outubro de 2026 · Londres",
    },
    tagline: {
      fr: "La soirée où le football couronne son roi.",
      en: "The night football crowns its king.",
      es: "La noche en que el fútbol corona a su rey.",
      pt: "A noite em que o futebol coroa o seu rei.",
    },
    description: {
      fr: "La cérémonie la plus fermée du football mondial, à Londres le 26 octobre 2026 : places en salle au plus près des légendes, tapis rouge et soirées attenantes. Un accès que très peu peuvent proposer.",
      en: "World football's most closed ceremony, in London on 26 October 2026: seats close to the legends, red carpet and adjoining parties. An access very few can offer.",
      es: "La ceremonia más cerrada del fútbol mundial, en Londres el 26 de octubre de 2026: asientos cerca de las leyendas, alfombra roja y fiestas anexas. Un acceso que muy pocos pueden ofrecer.",
      pt: "A cerimónia mais fechada do futebol mundial, em Londres a 26 de outubro de 2026: lugares perto das lendas, passadeira vermelha e festas anexas. Um acesso que muito poucos podem oferecer.",
    },
    offers: {
      fr: ["Places en salle", "Approche tapis rouge", "Soirées attenantes"],
      en: ["In-theatre seats", "Red carpet approach", "Adjoining parties"],
      es: ["Asientos en sala", "Acceso a la alfombra roja", "Fiestas anexas"],
      pt: ["Lugares na sala", "Aproximação à passadeira vermelha", "Festas anexas"],
    },
    hue: 45,
  },
  {
    slug: "fashion-week-paris",
    category: "mode",
    name: "Paris Fashion Week",
    city: "Paris",
    country: "FR",
    venue: "Paris",
    startDate: "2027-01-19",
    endDate: "2027-01-24",
    dateLabel: {
      fr: "19 – 24 janvier 2027 · Paris",
      en: "19 – 24 January 2027 · Paris",
      es: "19 – 24 de enero de 2027 · París",
      pt: "19 – 24 de janeiro de 2027 · Paris",
    },
    tagline: {
      fr: "Au premier rang de la mode mondiale.",
      en: "Front row at world fashion.",
      es: "En primera fila de la moda mundial.",
      pt: "Na primeira fila da moda mundial.",
    },
    description: {
      fr: "Défilés des grandes maisons, présentations privées, soirées confidentielles : la Fashion Week de Paris est l'un des rendez-vous les plus fermés au monde. Prochaine édition : collections homme du 19 au 24 janvier 2027, puis collections femme du 1er au 9 mars 2027. Invitations, accès off et chauffeur dédié pendant la semaine.",
      en: "Major maison shows, private presentations, confidential parties: Paris Fashion Week is one of the most closed events in the world. Next edition: menswear from 19 to 24 January 2027, then womenswear from 1 to 9 March 2027. Invitations, off-schedule access and a dedicated chauffeur for the week.",
      es: "Desfiles de las grandes maisons, presentaciones privadas, fiestas confidenciales: la Fashion Week de París es una de las citas más cerradas del mundo. Próxima edición: moda masculina del 19 al 24 de enero de 2027 y moda femenina del 1 al 9 de marzo de 2027. Invitaciones, accesos off y chófer dedicado durante la semana.",
      pt: "Desfiles das grandes maisons, apresentações privadas, festas confidenciais: a Fashion Week de Paris é um dos encontros mais fechados do mundo. Próxima edição: moda masculina de 19 a 24 de janeiro de 2027 e moda feminina de 1 a 9 de março de 2027. Convites, acessos off e motorista dedicado durante a semana.",
    },
    offers: {
      fr: ["Invitations défilés", "Soirées & événements off", "Chauffeur dédié"],
      en: ["Show invitations", "Parties & off-schedule events", "Dedicated chauffeur"],
      es: ["Invitaciones a desfiles", "Fiestas y eventos off", "Chófer dedicado"],
      pt: ["Convites para desfiles", "Festas e eventos off", "Motorista dedicado"],
    },
    hue: 330,
  },
  {
    slug: "festival-cannes",
    category: "festival",
    name: "Festival de Cannes",
    city: "Cannes",
    country: "FR",
    venue: "Palais des Festivals",
    startDate: "2027-05",
    dateLabel: {
      fr: "Mai 2027 · Croisette",
      en: "May 2027 · The Croisette",
      es: "Mayo de 2027 · La Croisette",
      pt: "Maio de 2027 · Croisette",
    },
    tagline: {
      fr: "Les marches les plus célèbres du monde.",
      en: "The most famous steps in the world.",
      es: "Las escaleras más célebres del mundo.",
      pt: "Os degraus mais célebres do mundo.",
    },
    description: {
      fr: "Montée des marches, projections officielles, soirées de la Croisette et villas cannoises : le Festival de Cannes se vit sur invitation. Nous en avons.",
      en: "Climbing the steps, official screenings, Croisette parties and Cannes villas: the Cannes Film Festival is invitation-only. We have them.",
      es: "Subida de las escaleras, proyecciones oficiales, fiestas de la Croisette y villas de Cannes: el Festival de Cannes se vive por invitación. Nosotros las tenemos.",
      pt: "Subida dos degraus, projeções oficiais, festas da Croisette e villas de Cannes: o Festival de Cannes vive-se por convite. Nós temo-los.",
    },
    offers: {
      fr: ["Montée des marches", "Projections officielles", "Soirées & yachts de la Croisette"],
      en: ["Red steps access", "Official screenings", "Croisette parties & yachts"],
      es: ["Subida de las escaleras", "Proyecciones oficiales", "Fiestas y yates de la Croisette"],
      pt: ["Subida dos degraus", "Projeções oficiais", "Festas e iates da Croisette"],
    },
    hue: 0,
  },
  {
    slug: "met-gala",
    category: "mode",
    name: "Met Gala",
    city: "New York",
    country: "US",
    venue: "Metropolitan Museum of Art",
    dateLabel: {
      fr: "Dates sur demande · New York",
      en: "Dates on request · New York",
      es: "Fechas bajo petición · Nueva York",
      pt: "Datas sob pedido · Nova Iorque",
    },
    tagline: {
      fr: "La soirée la plus regardée de la mode.",
      en: "Fashion's most watched night.",
      es: "La noche más observada de la moda.",
      pt: "A noite mais vista da moda.",
    },
    description: {
      fr: "Le Met Gala se vit sur invitation. Autour de la soirée, nous orchestrons tout ce qui se réserve : suites à Manhattan, chauffeur et protection, tables et soirées de la semaine new-yorkaise. Sur demande, en toute discrétion.",
      en: "The Met Gala is invitation-only. Around the night, we arrange everything that can be booked: Manhattan suites, chauffeur and protection, tables and parties during New York's week. On request, with complete discretion.",
      es: "La Met Gala se vive por invitación. En torno a la noche, organizamos todo lo que se reserva: suites en Manhattan, chófer y protección, mesas y fiestas de la semana neoyorquina. Bajo petición, con total discreción.",
      pt: "A Met Gala vive-se por convite. Em torno da noite, organizamos tudo o que se reserva: suites em Manhattan, motorista e proteção, mesas e festas da semana nova-iorquina. Sob pedido, com total discrição.",
    },
    offers: {
      fr: ["Suites et séjours à Manhattan", "Chauffeur et protection pour la soirée", "Tables et soirées de la semaine"],
      en: ["Manhattan suites and stays", "Chauffeur and protection for the night", "Tables and parties during the week"],
      es: ["Suites y estancias en Manhattan", "Chófer y protección para la noche", "Mesas y fiestas de la semana"],
      pt: ["Suites e estadias em Manhattan", "Motorista e proteção para a noite", "Mesas e festas da semana"],
    },
    hue: 350,
    invitationOnly: true,
  },
  {
    slug: "oscars",
    category: "ceremonie",
    name: "Oscars",
    city: "Los Angeles",
    country: "US",
    venue: "Hollywood",
    dateLabel: {
      fr: "Dates sur demande · Los Angeles",
      en: "Dates on request · Los Angeles",
      es: "Fechas bajo petición · Los Ángeles",
      pt: "Datas sob pedido · Los Angeles",
    },
    tagline: {
      fr: "La nuit d'Hollywood.",
      en: "Hollywood's night.",
      es: "La noche de Hollywood.",
      pt: "A noite de Hollywood.",
    },
    description: {
      fr: "La cérémonie des Oscars se vit sur invitation. Autour d'elle, nous orchestrons la semaine à Los Angeles : villas et hôtels, chauffeur et protection, dîners et soirées qui suivent la cérémonie. Sur demande, en toute discrétion.",
      en: "The Oscars ceremony is invitation-only. Around it, we arrange your week in Los Angeles: villas and hotels, chauffeur and protection, dinners and the parties that follow the ceremony. On request, with complete discretion.",
      es: "La ceremonia de los Oscar se vive por invitación. En torno a ella, organizamos la semana en Los Ángeles: villas y hoteles, chófer y protección, cenas y fiestas posteriores a la ceremonia. Bajo petición, con total discreción.",
      pt: "A cerimónia dos Óscares vive-se por convite. Em torno dela, organizamos a semana em Los Angeles: villas e hotéis, motorista e proteção, jantares e festas que se seguem à cerimónia. Sob pedido, com total discrição.",
    },
    offers: {
      fr: ["Villas et hôtels à Los Angeles", "Chauffeur et protection", "Dîners et soirées d'après-cérémonie"],
      en: ["Villas and hotels in Los Angeles", "Chauffeur and protection", "Dinners and after-ceremony parties"],
      es: ["Villas y hoteles en Los Ángeles", "Chófer y protección", "Cenas y fiestas posteriores a la ceremonia"],
      pt: ["Villas e hotéis em Los Angeles", "Motorista e proteção", "Jantares e festas pós-cerimónia"],
    },
    hue: 0,
    invitationOnly: true,
  },
  {
    slug: "celine-dion",
    category: "musique",
    name: "Céline Dion",
    city: "Tournée mondiale",
    country: "FR",
    venue: "Dates sur demande",
    dateLabel: {
      fr: "Tournée · dates sur demande",
      en: "Tour · dates upon request",
      es: "Gira · fechas bajo petición",
      pt: "Digressão · datas a pedido",
    },
    tagline: {
      fr: "Une voix, une fois dans une vie.",
      en: "A voice, once in a lifetime.",
      es: "Una voz, una vez en la vida.",
      pt: "Uma voz, uma vez na vida.",
    },
    description: {
      fr: "Les retours de Céline Dion sur scène s'arrachent en quelques minutes. Premiers rangs, carrés or, loges VIP et packages avec hôtel : nous suivons chaque annonce de date pour nos clients.",
      en: "Céline Dion's returns to the stage sell out in minutes. Front rows, golden circle, VIP boxes and hotel packages: we track every date announcement for our clients.",
      es: "Los regresos de Céline Dion a los escenarios se agotan en minutos. Primeras filas, golden circle, palcos VIP y paquetes con hotel: seguimos cada anuncio de fecha para nuestros clientes.",
      pt: "Os regressos de Céline Dion ao palco esgotam em minutos. Primeiras filas, golden circle, camarotes VIP e pacotes com hotel: seguimos cada anúncio de data para os nossos clientes.",
    },
    offers: {
      fr: ["Premiers rangs & carré or", "Loges VIP", "Packages concert + hôtel"],
      en: ["Front rows & golden circle", "VIP boxes", "Concert + hotel packages"],
      es: ["Primeras filas y golden circle", "Palcos VIP", "Paquetes concierto + hotel"],
      pt: ["Primeiras filas e golden circle", "Camarotes VIP", "Pacotes concerto + hotel"],
    },
    hue: 290,
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

/** Organisateurs officiels, affichés dans les faits clés des pages événements. */
export const organizers: Record<string, string> = {
  "champions-league": "UEFA",
  "super-bowl": "NFL",
  "f1-monaco": "Automobile Club de Monaco",
  "ballon-dor": "France Football & UEFA",
  "fashion-week-paris": "FHCM",
  "festival-cannes": "Festival de Cannes",
  "celine-dion": "Production officielle",
};
