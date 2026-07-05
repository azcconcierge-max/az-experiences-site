import type { L } from "@/i18n";

/**
 * Les services de la maison, structure standardisée :
 * numéro, titre, phrase signature (italique), description, 3 points concrets.
 */
export type Service = {
  slug: string;
  title: L;
  phrase: L;
  text: L;
  points: Record<keyof L, string[]>;
};

export const services: Service[] = [
  {
    slug: "evenements",
    title: {
      fr: "Événements & spectacles",
      en: "Events & shows",
      es: "Eventos y espectáculos",
      pt: "Eventos e espetáculos",
    },
    phrase: {
      fr: "Le sold out n'existe pas pour tout le monde.",
      en: "Sold out does not apply to everyone.",
      es: "El sold out no existe para todos.",
      pt: "O sold out não existe para todos.",
    },
    text: {
      fr: "Notre signature. Finales, Grands Prix, concerts, cérémonies : nous obtenons billets premium, loges et packages hospitality pour les événements affichés complets, dans le monde entier.",
      en: "Our signature. Finals, Grands Prix, concerts, ceremonies: we secure premium tickets, boxes and hospitality packages for sold-out events, worldwide.",
      es: "Nuestra firma. Finales, Grandes Premios, conciertos, ceremonias: conseguimos entradas premium, palcos y paquetes de hospitality para eventos agotados, en todo el mundo.",
      pt: "A nossa assinatura. Finais, Grandes Prémios, concertos, cerimónias: obtemos bilhetes premium, camarotes e pacotes de hospitality para eventos esgotados, no mundo inteiro.",
    },
    points: {
      fr: ["Billets premium & loges privées", "Hospitality officielle", "Accompagnement jour J"],
      en: ["Premium tickets & private boxes", "Official hospitality", "Event-day assistance"],
      es: ["Entradas premium y palcos privados", "Hospitality oficial", "Acompañamiento el día D"],
      pt: ["Bilhetes premium e camarotes privados", "Hospitality oficial", "Acompanhamento no dia"],
    },
  },
  {
    slug: "gastronomie",
    title: {
      fr: "Gastronomie & restauration",
      en: "Gastronomy & dining",
      es: "Gastronomía y restauración",
      pt: "Gastronomia e restauração",
    },
    phrase: {
      fr: "La table comme une expérience inattendue.",
      en: "The table as an unexpected experience.",
      es: "La mesa como una experiencia inesperada.",
      pt: "A mesa como uma experiência inesperada.",
    },
    text: {
      fr: "Restaurants affichés complets, comptoirs confidentiels, chefs étoilés à domicile : nous réservons ce qui ne se réserve pas, à Paris comme à l'étranger.",
      en: "Fully-booked restaurants, confidential counters, starred chefs at home: we book what cannot be booked, in Paris and abroad.",
      es: "Restaurantes completos, barras confidenciales, chefs con estrella a domicilio: reservamos lo que no se reserva, en París y en el extranjero.",
      pt: "Restaurantes esgotados, balcões confidenciais, chefs estrelados em casa: reservamos o que não se reserva, em Paris e no estrangeiro.",
    },
    points: {
      fr: ["Tables impossibles", "Chefs privés à domicile", "Privatisations"],
      en: ["Impossible tables", "Private chefs at home", "Full privatisations"],
      es: ["Mesas imposibles", "Chefs privados a domicilio", "Privatizaciones"],
      pt: ["Mesas impossíveis", "Chefs privados em casa", "Privatizações"],
    },
  },
  {
    slug: "jet-prive",
    title: {
      fr: "Jet privé & aviation",
      en: "Private jet & aviation",
      es: "Jet privado y aviación",
      pt: "Jato privado e aviação",
    },
    phrase: {
      fr: "Le ciel, à votre heure.",
      en: "The sky, on your schedule.",
      es: "El cielo, a su hora.",
      pt: "O céu, à sua hora.",
    },
    text: {
      fr: "Vols à la demande via nos partenaires certifiés : jet privé, hélicoptère, aviation commerciale premium. Pour un Grand Prix, une finale ou un aller-retour dans la journée.",
      en: "On-demand flights through our certified partners: private jet, helicopter, premium commercial aviation. For a Grand Prix, a final, or a same-day return.",
      es: "Vuelos a la demanda con nuestros socios certificados: jet privado, helicóptero, aviación comercial premium. Para un Gran Premio, una final o una ida y vuelta en el día.",
      pt: "Voos a pedido através dos nossos parceiros certificados: jato privado, helicóptero, aviação comercial premium. Para um Grande Prémio, uma final ou uma ida e volta no dia.",
    },
    points: {
      fr: ["Jet privé à la demande", "Transferts hélicoptère", "Salons privés aéroport"],
      en: ["On-demand private jet", "Helicopter transfers", "Private airport lounges"],
      es: ["Jet privado a la demanda", "Traslados en helicóptero", "Salones privados de aeropuerto"],
      pt: ["Jato privado a pedido", "Transferes de helicóptero", "Salas privadas de aeroporto"],
    },
  },
  {
    slug: "yachts",
    title: {
      fr: "Yachts",
      en: "Yachts",
      es: "Yates",
      pt: "Iates",
    },
    phrase: {
      fr: "La mer, en privé.",
      en: "The sea, in private.",
      es: "El mar, en privado.",
      pt: "O mar, em privado.",
    },
    text: {
      fr: "Location de yachts avec équipage, journées en mer, positions privilégiées lors des grands événements, Grand Prix de Monaco, Festival de Cannes, Saint-Tropez.",
      en: "Crewed yacht charters, days at sea, privileged positions at the great events, Monaco Grand Prix, Cannes Film Festival, Saint-Tropez.",
      es: "Alquiler de yates con tripulación, jornadas en el mar, posiciones privilegiadas en los grandes eventos, Gran Premio de Mónaco, Festival de Cannes, Saint-Tropez.",
      pt: "Aluguer de iates com tripulação, dias no mar, posições privilegiadas nos grandes eventos, Grande Prémio do Mónaco, Festival de Cannes, Saint-Tropez.",
    },
    points: {
      fr: ["Location avec équipage", "Yacht en bord de circuit à Monaco", "Journées & croisières privées"],
      en: ["Crewed charters", "Trackside yacht in Monaco", "Private days & cruises"],
      es: ["Alquiler con tripulación", "Yate junto al circuito en Mónaco", "Jornadas y cruceros privados"],
      pt: ["Aluguer com tripulação", "Iate junto ao circuito no Mónaco", "Dias e cruzeiros privados"],
    },
  },
  {
    slug: "hotels",
    title: {
      fr: "Hôtels & séjours",
      en: "Hotels & stays",
      es: "Hoteles y estancias",
      pt: "Hotéis e estadias",
    },
    phrase: {
      fr: "Les adresses qui ne se réservent pas en ligne.",
      en: "The addresses you cannot book online.",
      es: "Las direcciones que no se reservan en línea.",
      pt: "As moradas que não se reservam online.",
    },
    text: {
      fr: "Suites signature, palaces complets, surclassements et attentions à l'arrivée : nous orchestrons vos séjours dans les plus belles maisons du monde.",
      en: "Signature suites, fully-booked palaces, upgrades and welcome touches: we orchestrate your stays in the world's finest houses.",
      es: "Suites signature, palacios completos, mejoras de categoría y atenciones a la llegada: orquestamos sus estancias en las mejores casas del mundo.",
      pt: "Suites signature, palácios esgotados, upgrades e atenções à chegada: orquestramos as suas estadias nas mais belas casas do mundo.",
    },
    points: {
      fr: ["Palaces & maisons rares", "Surclassements", "Arrivées orchestrées"],
      en: ["Palaces & rare houses", "Upgrades", "Orchestrated arrivals"],
      es: ["Palacios y casas excepcionales", "Mejoras de categoría", "Llegadas orquestadas"],
      pt: ["Palácios e casas raras", "Upgrades", "Chegadas orquestradas"],
    },
  },
  {
    slug: "transport",
    title: {
      fr: "Transport & chauffeurs",
      en: "Transport & chauffeurs",
      es: "Transporte y chóferes",
      pt: "Transporte e motoristas",
    },
    phrase: {
      fr: "Chaque trajet, orchestré.",
      en: "Every journey, orchestrated.",
      es: "Cada trayecto, orquestado.",
      pt: "Cada trajeto, orquestrado.",
    },
    text: {
      fr: "Berlines et vans premium avec chauffeur, transferts aéroport, logistique complète les jours d'événement : dépose au plus près des accès VIP, retour sécurisé quelle que soit l'heure.",
      en: "Premium chauffeured sedans and vans, airport transfers, full event-day logistics: drop-off at the closest VIP entrance, safe return whatever the hour.",
      es: "Berlinas y vans premium con chófer, traslados al aeropuerto, logística completa los días de evento: llegada junto a los accesos VIP, regreso seguro a cualquier hora.",
      pt: "Berlinas e vans premium com motorista, transferes de aeroporto, logística completa nos dias de evento: chegada junto aos acessos VIP, regresso seguro a qualquer hora.",
    },
    points: {
      fr: ["Chauffeur à l'heure ou à la journée", "Transferts aéroport", "Logistique jour d'événement"],
      en: ["Chauffeur by the hour or day", "Airport transfers", "Event-day logistics"],
      es: ["Chófer por horas o por día", "Traslados al aeropuerto", "Logística el día del evento"],
      pt: ["Motorista à hora ou ao dia", "Transferes de aeroporto", "Logística no dia do evento"],
    },
  },
  {
    slug: "securite",
    title: {
      fr: "Sécurité & protection",
      en: "Security & protection",
      es: "Seguridad y protección",
      pt: "Segurança e proteção",
    },
    phrase: {
      fr: "La sérénité, discrètement.",
      en: "Peace of mind, discreetly.",
      es: "La serenidad, discretamente.",
      pt: "A serenidade, discretamente.",
    },
    text: {
      fr: "Gardes du corps, chauffeurs de sécurité, accompagnement rapproché lors des événements et déplacements : des professionnels aguerris, invisibles quand il le faut.",
      en: "Bodyguards, security drivers, close protection during events and travel: seasoned professionals, invisible when they need to be.",
      es: "Guardaespaldas, conductores de seguridad, protección cercana durante eventos y desplazamientos: profesionales experimentados, invisibles cuando hace falta.",
      pt: "Guarda-costas, motoristas de segurança, proteção próxima durante eventos e deslocações: profissionais experientes, invisíveis quando é preciso.",
    },
    points: {
      fr: ["Gardes du corps", "Chauffeurs de sécurité", "Protection événementielle"],
      en: ["Bodyguards", "Security drivers", "Event protection"],
      es: ["Guardaespaldas", "Conductores de seguridad", "Protección en eventos"],
      pt: ["Guarda-costas", "Motoristas de segurança", "Proteção em eventos"],
    },
  },
  {
    slug: "voyages",
    title: {
      fr: "Voyages & vacances sur mesure",
      en: "Bespoke travel & holidays",
      es: "Viajes y vacaciones a medida",
      pt: "Viagens e férias à medida",
    },
    phrase: {
      fr: "Des vacances dessinées pour vous.",
      en: "Holidays drawn for you.",
      es: "Vacaciones diseñadas para usted.",
      pt: "Férias desenhadas para si.",
    },
    text: {
      fr: "De l'itinéraire au dernier dîner : nous concevons et organisons vos voyages de bout en bout, villas, vols, expériences, réservations, autour de vos envies.",
      en: "From the itinerary to the last dinner: we design and organise your trips end to end, villas, flights, experiences, reservations, around your wishes.",
      es: "Del itinerario a la última cena: diseñamos y organizamos sus viajes de principio a fin, villas, vuelos, experiencias, reservas, en torno a sus deseos.",
      pt: "Do itinerário ao último jantar: desenhamos e organizamos as suas viagens de ponta a ponta, villas, voos, experiências, reservas, em torno dos seus desejos.",
    },
    points: {
      fr: ["Itinéraires sur mesure", "Villas & locations d'exception", "Conciergerie pendant le séjour"],
      en: ["Bespoke itineraries", "Exceptional villas & rentals", "Concierge throughout the stay"],
      es: ["Itinerarios a medida", "Villas y alquileres excepcionales", "Conserjería durante la estancia"],
      pt: ["Itinerários à medida", "Villas e alugueres excecionais", "Concierge durante a estadia"],
    },
  },
  {
    slug: "sur-mesure",
    title: {
      fr: "Accès sur mesure",
      en: "Bespoke access",
      es: "Accesos a medida",
      pt: "Acessos à medida",
    },
    phrase: {
      fr: "Ce qui ne se demande nulle part ailleurs.",
      en: "What cannot be asked anywhere else.",
      es: "Lo que no se pide en ningún otro sitio.",
      pt: "O que não se pede em mais lado nenhum.",
    },
    text: {
      fr: "Cadeaux introuvables, rencontres exceptionnelles, demandes de dernière minute, projets inclassables : dites-nous quoi, nous trouvons comment.",
      en: "Unfindable gifts, exceptional encounters, last-minute requests, unclassifiable projects: tell us what, we will find how.",
      es: "Regalos imposibles de encontrar, encuentros excepcionales, peticiones de última hora, proyectos inclasificables: díganos qué, nosotros encontramos cómo.",
      pt: "Presentes impossíveis de encontrar, encontros excecionais, pedidos de última hora, projetos inclassificáveis: diga-nos o quê, nós encontramos o como.",
    },
    points: {
      fr: ["Demandes spéciales", "Urgences dernière minute", "Un interlocuteur unique, 7j/7"],
      en: ["Special requests", "Last-minute emergencies", "One dedicated contact, 7/7"],
      es: ["Peticiones especiales", "Urgencias de última hora", "Un interlocutor único, 7/7"],
      pt: ["Pedidos especiais", "Urgências de última hora", "Um interlocutor único, 7/7"],
    },
  },
];
