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
  /** texte alternatif : la scène décrite, sans marque ni logo */
  alt?: L;
  /** image claire : le texte posé dessus reçoit une ombre plus dense */
  light?: boolean;
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
  dubai: place("AZ-23-dubai", "Dubai"),
  london: place("AZ-24-london", "London"),
  miami: place("AZ-25-miami", "Miami"),
  usOpen: scene("AZ-01-us-open-court", "#13256B", "US Open"),
  superBowl: scene("AZ-02-super-bowl", "#17301F", "Super Bowl"),
  monacoGrandPrix: scene("AZ-03-monaco-grand-prix", "#2C302E", "Grand Prix de Monaco", "Monaco Grand Prix", "Gran Premio de Mónaco", "Grande Prémio do Mónaco"),
  fashionWeek: scene("AZ-04-paris-fashion-week", "#1C1B19", "Paris Fashion Week"),
  cannes: scene("AZ-11-festival-de-cannes", "#A3161B", "Festival de Cannes", "Cannes Film Festival", "Festival de Cannes", "Festival de Cannes"),
  wimbledon: scene("AZ-12-wimbledon-court", "#17301F", "Wimbledon"),
  ballonDor: scene("AZ-13-ballon-d-or", "#C98A4B", "Ballon d'Or"),
  celineDion: scene("AZ-14-concert-celine-dion", "#13256B", "Céline Dion"),
  metGala: scene("AZ-15-met-gala", "#A3161B", "Met Gala"),
  oscars: scene("AZ-16-oscars", "#A3161B", "Oscars"),
  destinationsHero: scene("AZ-17-destinations", "#1C1B19", "Destinations", "Destinations", "Destinos", "Destinos"),
  chauffeur: scene("AZ-18-transport-chauffeur", "#C98A4B", "Transport & chauffeur", "Transport & Chauffeur", "Transporte y chófer", "Transporte e motorista"),
  yacht: scene("AZ-19-yacht", "#E8A066", "Yachts", "Yachts", "Yates", "Iates"),
  security: scene("AZ-20-security", "#1C1B19", "Sécurité", "Security", "Seguridad", "Segurança"),
  bespokeAccess: scene("AZ-21-bespoke-access", "#E8A066", "Accès sur mesure", "Bespoke Access", "Acceso a medida", "Acesso à medida"),
  bespokeTravel: scene("AZ-22-bespoke-travel", "#E8A066", "Voyages sur mesure", "Bespoke Travel", "Viajes a medida", "Viagens à medida"),
} satisfies Record<string, Visual>;

const alt = (fr: string, en: string, es: string, pt: string): L => ({ fr, en, es, pt });

/** Textes alternatifs : ce que montre l'image, en quatre langues. */
const ALTS: Record<keyof typeof visuals, L> = {
  palaces: alt("Couloir de palace éclairé par une lumière au bout", "Palace corridor lit by a glow at the far end", "Pasillo de palacio iluminado por una luz al fondo", "Corredor de palácio iluminado por uma luz ao fundo"),
  jet: alt("Jet privé au-dessus d'une piste balisée au crépuscule", "Private jet over a lit runway at dusk", "Jet privado sobre una pista iluminada al atardecer", "Jato privado sobre uma pista iluminada ao entardecer"),
  festivals: alt("Étoffe rouge traversée de reflets et de points lumineux", "Red fabric crossed by light streaks and sparkles", "Tela roja atravesada por reflejos y destellos", "Tecido vermelho atravessado por reflexos e brilhos"),
  restaurants: alt("Rangée de bougies sur une table dans la pénombre", "A row of candles on a table in the dark", "Hilera de velas sobre una mesa en penumbra", "Fila de velas sobre uma mesa na penumbra"),
  football: alt("Terrain de football la nuit, rond central sous les projecteurs", "Football pitch at night, centre circle under floodlights", "Campo de fútbol de noche, círculo central bajo los focos", "Campo de futebol à noite, círculo central sob os holofotes"),
  tennis: alt("Lignes d'un court en terre battue et balle en mouvement", "Clay court lines and a ball in motion", "Líneas de una pista de tierra batida y bola en movimiento", "Linhas de um court de terra batida e bola em movimento"),
  concerts: alt("Faisceaux de projecteurs au-dessus de la foule d'un concert", "Stage spotlights sweeping over a concert crowd", "Haces de focos sobre el público de un concierto", "Feixes de holofotes sobre o público de um concerto"),
  formulaOne: alt("Monoplace en mouvement le long de vibreurs rouges et blancs", "Race car in motion along red and white kerbs", "Monoplaza en movimiento junto a pianos rojos y blancos", "Monolugar em movimento junto a corretores vermelhos e brancos"),
  monaco: alt("Monte-Carlo sur sa colline au crépuscule, yachts au mouillage", "Monte-Carlo on its hillside at dusk, yachts at anchor", "Montecarlo en su colina al atardecer, yates fondeados", "Monte-Carlo na sua colina ao entardecer, iates ancorados"),
  saintTropez: alt("Phare et voile blanche au coucher du soleil", "Lighthouse and a white sail at sunset", "Faro y vela blanca al atardecer", "Farol e vela branca ao pôr do sol"),
  mykonos: alt("Village blanc des Cyclades au-dessus de la mer bleue", "White Cycladic village above the blue sea", "Pueblo blanco de las Cícladas sobre el mar azul", "Aldeia branca das Cíclades sobre o mar azul"),
  paris: alt("La Seine à l'heure bleue, toits haussmanniens et tour illuminée", "The Seine at blue hour, Haussmann rooftops and the lit tower", "El Sena a la hora azul, tejados haussmannianos y la torre iluminada", "O Sena à hora azul, telhados haussmannianos e a torre iluminada"),
  ibiza: alt("Soleil couchant sur la mer à côté d'un îlot rocheux", "Sun setting over the sea beside a rocky islet", "Sol poniente sobre el mar junto a un islote rocoso", "Sol poente sobre o mar junto a um ilhéu rochoso"),
  dubai: alt("Skyline de Dubaï au crépuscule au-dessus du désert", "Dubai skyline at dusk above the desert", "Skyline de Dubái al atardecer sobre el desierto", "Skyline do Dubai ao entardecer sobre o deserto"),
  london: alt("La Tamise à la nuit tombée, ponts illuminés", "The Thames at nightfall, bridges lit up", "El Támesis al anochecer, puentes iluminados", "O Tamisa ao anoitecer, pontes iluminadas"),
  miami: alt("Front de mer de Miami Beach au coucher du soleil", "Miami Beach waterfront at sunset", "Frente marítimo de Miami Beach al atardecer", "Frente marítima de Miami Beach ao pôr do sol"),
  newYork: alt("Skyline de Manhattan se reflétant dans le fleuve au crépuscule", "Manhattan skyline reflected in the river at dusk", "Skyline de Manhattan reflejado en el río al atardecer", "Skyline de Manhattan refletido no rio ao entardecer"),
  usOpen: alt("Court de tennis bleu la nuit, lignes et balle en mouvement", "Blue tennis court at night, lines and a ball in motion", "Pista de tenis azul de noche, líneas y bola en movimiento", "Court de ténis azul à noite, linhas e bola em movimento"),
  superBowl: alt("Poteaux jaunes devant le terrain, feux d'artifice au-dessus du stade", "Yellow goalposts before the field, fireworks above the stadium", "Postes amarillos ante el campo, fuegos artificiales sobre el estadio", "Postes amarelos diante do campo, fogo de artifício sobre o estádio"),
  monacoGrandPrix: alt("Monoplace rouge lancée le long du port, Monte-Carlo illuminé", "Red race car speeding along the harbour, Monte-Carlo lit up", "Monoplaza rojo a toda velocidad junto al puerto, Montecarlo iluminado", "Monolugar vermelho a toda a velocidade junto ao porto, Monte-Carlo iluminado"),
  fashionWeek: alt("Mannequin sur le podium, la tour illuminée au fond", "Model on the runway, the lit tower in the background", "Modelo en la pasarela, la torre iluminada al fondo", "Modelo na passerelle, a torre iluminada ao fundo"),
  cannes: alt("Tapis rouge et marches bordés de flashs de photographes", "Red carpet steps lined with photographers' flashes", "Escalinata con alfombra roja entre flashes de fotógrafos", "Degraus com passadeira vermelha entre flashes de fotógrafos"),
  wimbledon: alt("Court en gazon rayé, lignes blanches et balle en mouvement", "Striped grass court, white lines and a ball in motion", "Pista de hierba a rayas, líneas blancas y bola en movimiento", "Court de relva às riscas, linhas brancas e bola em movimento"),
  ballonDor: alt("Trophée doré sous un projecteur, face à une salle", "Golden trophy under a spotlight, facing an audience", "Trofeo dorado bajo un foco, frente al público", "Troféu dourado sob um holofote, diante do público"),
  celineDion: alt("Silhouette d'une chanteuse dans une lumière bleue de scène", "Silhouette of a singer in blue stage light", "Silueta de una cantante bajo una luz azul de escenario", "Silhueta de uma cantora sob uma luz azul de palco"),
  metGala: alt("Robe blanche sur le tapis rouge d'un grand escalier, entre les flashs", "White gown on the red carpet of a grand staircase, amid flashes", "Vestido blanco sobre la alfombra roja de una gran escalinata, entre flashes", "Vestido branco na passadeira vermelha de uma grande escadaria, entre flashes"),
  oscars: alt("Scène vide aux rideaux rouges, un micro sous le projecteur", "Empty stage with red curtains, a microphone under the spotlight", "Escenario vacío con telón rojo, un micrófono bajo el foco", "Palco vazio com cortinas vermelhas, um microfone sob o holofote"),
  destinationsHero: alt("Hublot d'avion au-dessus d'une île turquoise", "Aircraft window above a turquoise island", "Ventanilla de avión sobre una isla turquesa", "Janela de avião sobre uma ilha turquesa"),
  chauffeur: alt("Chauffeur debout près d'une berline, la nuit", "Chauffeur standing by a sedan at night", "Chófer de pie junto a una berlina, de noche", "Motorista de pé junto a uma berlina, à noite"),
  yacht: alt("Superyacht au crépuscule au large de la Riviera", "Superyacht at dusk off the Riviera", "Superyate al atardecer frente a la Riviera", "Superiate ao entardecer ao largo da Riviera"),
  security: alt("Silhouette d'un agent de protection face aux flashs", "Silhouette of a protection officer facing the flashes", "Silueta de un escolta frente a los flashes", "Silhueta de um agente de proteção diante dos flashes"),
  bespokeAccess: alt("Jet privé sur le tarmac au coucher du soleil, passerelle ouverte", "Private jet on the tarmac at sunset, stairs lowered", "Jet privado en la pista al atardecer, escalerilla abierta", "Jato privado na pista ao pôr do sol, escada aberta"),
  bespokeTravel: alt("Hélicoptère au-dessus d'une falaise et de la mer au crépuscule", "Helicopter over a cliff and the sea at dusk", "Helicóptero sobre un acantilado y el mar al atardecer", "Helicóptero sobre uma falésia e o mar ao entardecer"),
};
for (const key of Object.keys(ALTS) as (keyof typeof visuals)[]) {
  (visuals[key] as Visual).alt = ALTS[key];
}

// la nouvelle Mykonos (village blanc) est la seule image claire du site
(visuals.mykonos as Visual).light = true;

/** Les huit portes, dans l'ordre du brand book (p.22). */
export const universes: { visual: Visual; href: string }[] = [
  { visual: visuals.palaces, href: "/services/hotels" },
  { visual: visuals.jet, href: "/services/jet-prive" },
  { visual: visuals.festivals, href: "/evenements/festival-cannes" },
  { visual: visuals.restaurants, href: "/services/gastronomie" },
  { visual: visuals.football, href: "/evenements/champions-league" },
  { visual: visuals.tennis, href: "/evenements/tennis-tour" },
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
  yachts: visuals.yacht,
  hotels: visuals.palaces,
  transport: visuals.chauffeur,
  securite: visuals.security,
  voyages: visuals.bespokeTravel,
  "sur-mesure": visuals.bespokeAccess,
};

const byEvent: Record<string, Visual> = {
  "champions-league": visuals.football,
  "super-bowl": visuals.superBowl,
  "f1-monaco": visuals.monacoGrandPrix,
  "tennis-tour": visuals.tennis,
  "ballon-dor": visuals.ballonDor,
  "fashion-week-paris": visuals.fashionWeek,
  "festival-cannes": visuals.cannes,
  "celine-dion": visuals.celineDion,
  "met-gala": visuals.metGala,
  oscars: visuals.oscars,
};

const byDestination: Record<string, Visual> = {
  monaco: visuals.monaco,
  "cote-d-azur": visuals.saintTropez,
  paris: visuals.paris,
  mykonos: visuals.mykonos,
  ibiza: visuals.ibiza,
  "new-york": visuals.newYork,
  // TODO : brancher visuals.dubai, visuals.london et visuals.miami quand
  // AZ-23-dubai.jpg, AZ-24-london.jpg et AZ-25-miami.jpg seront déposés
  // dans public/az/events-destinations/ (en attendant, l'image du hublot)
  dubai: visuals.destinationsHero,
  london: visuals.destinationsHero,
  miami: visuals.destinationsHero,
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
