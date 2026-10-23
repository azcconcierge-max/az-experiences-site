import type { L, Locale } from "@/i18n";

/**
 * LE GUIDE, les articles SEO de la maison, à publier régulièrement.
 * Ajouter un article = copier un bloc. `body` = suite de blocs {h} (sous-titre)
 * ou {p} (paragraphe), dans chaque langue.
 */
export type ArticleBlock = { h?: string; p?: string };

export type Article = {
  slug: string;
  date: string; // ISO
  readingMinutes: number;
  /** Photo de couverture (liste magazine), chemin sous /public. */
  title: L;
  excerpt: L;
  body: Record<Locale, ArticleBlock[]>;
};

export const articles: Article[] = [
  {
    slug: "obtenir-billets-evenement-sold-out",
    date: "2026-07-01",
    readingMinutes: 4,
    title: {
      fr: "Comment obtenir des billets pour un événement sold out ?",
      en: "How to get tickets for a sold-out event?",
      es: "¿Cómo conseguir entradas para un evento agotado?",
      pt: "Como conseguir bilhetes para um evento esgotado?",
    },
    excerpt: {
      fr: "Finale affichée complète, concert épuisé en dix minutes : « complet » ne veut pas dire inaccessible. Voici comment fonctionne réellement l'accès aux événements sold out.",
      en: "A final marked sold out, a concert gone in ten minutes: sold out does not mean out of reach. Here is how access to sold-out events really works.",
      es: "Una final agotada, un concierto vendido en diez minutos: «agotado» no significa inaccesible. Así funciona realmente el acceso a los eventos sold out.",
      pt: "Uma final esgotada, um concerto vendido em dez minutos: «esgotado» não significa inacessível. Eis como funciona realmente o acesso aos eventos sold out.",
    },
    body: {
      fr: [
        { p: "Chaque année, les mêmes scènes : la billetterie de la finale ouvre à 10h, tout est vendu à 10h09. Pourtant, le jour J, les loges sont pleines d'invités qui n'ont jamais fait la queue en ligne. La raison est simple : sur les grands événements, une part importante des places ne passe jamais par la billetterie publique." },
        { h: "Où vont les places que le public ne voit pas" },
        { p: "Fédérations, sponsors, partenaires hospitality, détenteurs de loges à l'année : les grands événements réservent une partie de leur capacité à des circuits officiels parallèles. Ces places existent, elles sont légales et souvent de meilleure qualité que celles de la vente publique, mais elles ne s'achètent pas en ligne. Elles s'obtiennent par relation." },
        { h: "Le rôle d'une conciergerie spécialisée" },
        { p: "C'est exactement le métier d'AZ Experiences : des années passées sur ce marché nous ont construit un réseau de détenteurs officiels et de partenaires hospitality sur les grands rendez-vous, Ligue des champions, Grand Prix de Monaco, Wimbledon, Super Bowl, Fashion Week. Quand un client nous écrit, nous savons qui appeler, à quel prix, et ce qui est réellement livrable." },
        { h: "Les bons réflexes" },
        { p: "Premier réflexe : anticiper quand c'est possible, plus la demande arrive tôt, plus les options sont larges. Deuxième réflexe : exiger une confirmation écrite avant tout paiement, avec catégorie et conditions précises ; une maison sérieuse ne confirme que ce qu'elle sait livrer. Troisième réflexe : se méfier des places « trop belles » sur les plateformes de revente anonymes, où les billets invalides sont fréquents sur les très grands événements." },
        { p: "Un événement complet vous fait envie ? Écrivez-nous par WhatsApp ou via notre formulaire privé : nous répondons en quelques heures avec les options réelles du moment." },
      ],
      en: [
        { p: "Every year, the same scene: ticketing for the final opens at 10am, everything is gone by 10:09. Yet on the day, the boxes are full of guests who never queued online. The reason is simple: at major events, a significant share of seats never goes through public ticketing." },
        { h: "Where the seats the public never sees actually go" },
        { p: "Federations, sponsors, hospitality partners, year-round box holders: major events reserve part of their capacity for parallel official channels. These seats exist, they are legitimate and often better than what public sales offer, but they cannot be bought online. They are obtained through relationships." },
        { h: "The role of a specialised concierge" },
        { p: "That is precisely AZ Experiences's craft: years on this market have built us a network of official holders and hospitality partners at the great occasions, Champions League, Monaco Grand Prix, Wimbledon, Super Bowl, Fashion Week. When a client writes to us, we know who to call, at what price, and what is genuinely deliverable." },
        { h: "The right reflexes" },
        { p: "First: anticipate when possible, the earlier the request, the wider the options. Second: demand written confirmation before any payment, with precise category and conditions; a serious house only confirms what it knows it can deliver. Third: beware of deals that look too good on anonymous resale platforms, where invalid tickets are common at the biggest events." },
        { p: "Tempted by a sold-out event? Write to us on WhatsApp or through our private form: we answer within hours with the real options of the moment." },
      ],
      es: [
        { p: "Cada año, la misma escena: la venta de entradas para la final abre a las 10h y a las 10h09 no queda nada. Sin embargo, el día del evento, los palcos están llenos de invitados que nunca hicieron cola en línea. La razón es simple: en los grandes eventos, una parte importante de las plazas nunca pasa por la venta pública." },
        { h: "A dónde van las plazas que el público no ve" },
        { p: "Federaciones, patrocinadores, socios de hospitality, titulares de palcos anuales: los grandes eventos reservan parte de su capacidad a circuitos oficiales paralelos. Esas plazas existen, son legítimas y a menudo mejores que las de la venta pública, pero no se compran en línea. Se obtienen por relación." },
        { h: "El papel de una conserjería especializada" },
        { p: "Ese es exactamente el oficio de AZ Experiences: años en este mercado nos han construido una red de titulares oficiales y socios de hospitality en las grandes citas, Champions League, Gran Premio de Mónaco, Wimbledon, Super Bowl, Fashion Week. Cuando un cliente nos escribe, sabemos a quién llamar, a qué precio y qué es realmente entregable." },
        { h: "Los buenos reflejos" },
        { p: "Primero: anticipar cuando sea posible, cuanto antes llega la solicitud, más amplias son las opciones. Segundo: exigir una confirmación escrita antes de cualquier pago, con categoría y condiciones precisas; una casa seria solo confirma lo que sabe entregar. Tercero: desconfiar de las gangas en plataformas de reventa anónimas, donde las entradas inválidas son frecuentes en los grandes eventos." },
        { p: "¿Le tienta un evento agotado? Escríbanos por WhatsApp o mediante nuestro formulario privado: respondemos en pocas horas con las opciones reales del momento." },
      ],
      pt: [
        { p: "Todos os anos, a mesma cena: a bilheteira da final abre às 10h, tudo vendido às 10h09. No entanto, no dia, os camarotes estão cheios de convidados que nunca fizeram fila online. A razão é simples: nos grandes eventos, uma parte importante dos lugares nunca passa pela venda pública." },
        { h: "Para onde vão os lugares que o público não vê" },
        { p: "Federações, patrocinadores, parceiros de hospitality, detentores de camarotes anuais: os grandes eventos reservam parte da sua capacidade a circuitos oficiais paralelos. Esses lugares existem, são legítimos e muitas vezes melhores do que os da venda pública, mas não se compram online. Obtêm-se por relação." },
        { h: "O papel de um concierge especializado" },
        { p: "É exatamente o ofício da AZ Experiences: anos neste mercado construíram-nos uma rede de detentores oficiais e parceiros de hospitality nos grandes encontros, Liga dos Campeões, Grande Prémio do Mónaco, Wimbledon, Super Bowl, Fashion Week. Quando um cliente nos escreve, sabemos a quem ligar, a que preço, e o que é realmente entregável." },
        { h: "Os bons reflexos" },
        { p: "Primeiro: antecipar quando possível, quanto mais cedo chega o pedido, mais amplas são as opções. Segundo: exigir uma confirmação escrita antes de qualquer pagamento, com categoria e condições precisas; uma casa séria só confirma o que sabe entregar. Terceiro: desconfiar das pechinchas em plataformas de revenda anónimas, onde os bilhetes inválidos são frequentes nos grandes eventos." },
        { p: "Tentado por um evento esgotado? Escreva-nos por WhatsApp ou através do nosso formulário privado: respondemos em poucas horas com as opções reais do momento." },
      ],
    },
  },
  {
    slug: "grand-prix-monaco-vip",
    date: "2026-06-15",
    readingMinutes: 5,
    title: {
      fr: "Vivre le Grand Prix de Monaco en VIP : le guide",
      en: "Experiencing the Monaco Grand Prix as a VIP: the guide",
      es: "Vivir el Gran Premio de Mónaco en VIP: la guía",
      pt: "Viver o Grande Prémio do Mónaco em VIP: o guia",
    },
    excerpt: {
      fr: "Paddock Club, terrasses privées, yachts en bord de piste : à Monaco, tout est une question de hauteur. Le guide des accès qui font vraiment la différence.",
      en: "Paddock Club, private terraces, trackside yachts: in Monaco, everything is a matter of altitude. The guide to the access that truly makes the difference.",
      es: "Paddock Club, terrazas privadas, yates junto a la pista: en Mónaco, todo es cuestión de altura. La guía de los accesos que realmente marcan la diferencia.",
      pt: "Paddock Club, terraços privados, iates junto à pista: no Mónaco, tudo é uma questão de altura. O guia dos acessos que fazem realmente a diferença.",
    },
    body: {
      fr: [
        { p: "Le Grand Prix de Monaco est le seul rendez-vous du calendrier où la course se regarde depuis un salon, une terrasse ou le pont d'un yacht. La question n'est pas d'avoir une place, c'est d'avoir la bonne hauteur." },
        { h: "Les trois façons de vivre Monaco" },
        { p: "Le Paddock Club, au-dessus des stands, reste l'expérience de référence : vue plongeante sur la pit lane, gastronomie, pilotes qui passent entre les sessions. Les terrasses privées, Fairmont, immeubles du Rocher, appartements au-dessus de Sainte-Dévote, offrent les virages les plus spectaculaires dans une atmosphère plus confidentielle. Enfin, les yachts amarrés au port : la course d'un côté, la Méditerranée de l'autre, et une soirée qui commence quand les moteurs se taisent." },
        { h: "Ce qui fait vraiment la différence" },
        { p: "L'erreur classique est de ne penser que billet. À Monaco, la logistique est reine : l'hélicoptère Nice–Monaco évite deux heures d'embouteillage, l'hôtel doit être réservé des mois à l'avance, et les tables du dimanche soir, quand toute la F1 dîne en Principauté, ne s'obtiennent que par relation." },
        { p: "Notre conseil : construire le week-end comme un tout, accès, hébergement, transferts, dîners, plutôt que d'empiler des réservations. C'est exactement ce que nous faisons pour nos clients, chaque année, depuis les essais du jeudi jusqu'au dîner du dimanche." },
      ],
      en: [
        { p: "The Monaco Grand Prix is the only date on the calendar where the race is watched from a lounge, a terrace or the deck of a yacht. The question is not having a seat, it is having the right altitude." },
        { h: "The three ways to live Monaco" },
        { p: "The Paddock Club, above the garages, remains the reference experience: a plunging view over the pit lane, fine dining, drivers passing between sessions. Private terraces, the Fairmont, buildings on the Rock, apartments above Sainte-Dévote, offer the most spectacular corners in a more confidential atmosphere. Finally, the yachts moored in the harbour: the race on one side, the Mediterranean on the other, and a party that starts when the engines go quiet." },
        { h: "What truly makes the difference" },
        { p: "The classic mistake is to think only about the ticket. In Monaco, logistics is queen: the Nice–Monaco helicopter avoids two hours of traffic, hotels must be booked months ahead, and Sunday-night tables, when all of F1 dines in the Principality, are only obtained through relationships." },
        { p: "Our advice: build the weekend as a whole, access, accommodation, transfers, dinners, rather than stacking bookings. That is exactly what we do for our clients, every year, from Thursday practice to Sunday dinner." },
      ],
      es: [
        { p: "El Gran Premio de Mónaco es la única cita del calendario donde la carrera se ve desde un salón, una terraza o la cubierta de un yate. La cuestión no es tener un asiento, es tener la altura correcta." },
        { h: "Las tres maneras de vivir Mónaco" },
        { p: "El Paddock Club, sobre los garajes, sigue siendo la experiencia de referencia: vista sobre el pit lane, gastronomía, pilotos que pasan entre sesiones. Las terrazas privadas, Fairmont, edificios de la Roca, apartamentos sobre Sainte-Dévote, ofrecen las curvas más espectaculares en un ambiente más confidencial. Y los yates amarrados en el puerto: la carrera a un lado, el Mediterráneo al otro, y una fiesta que empieza cuando los motores callan." },
        { h: "Lo que realmente marca la diferencia" },
        { p: "El error clásico es pensar solo en la entrada. En Mónaco, la logística es reina: el helicóptero Niza–Mónaco evita dos horas de atasco, el hotel debe reservarse con meses de antelación, y las mesas del domingo por la noche, cuando toda la F1 cena en el Principado, solo se consiguen por relación." },
        { p: "Nuestro consejo: construir el fin de semana como un todo, accesos, alojamiento, traslados, cenas, en lugar de acumular reservas. Es exactamente lo que hacemos para nuestros clientes, cada año, de los libres del jueves a la cena del domingo." },
      ],
      pt: [
        { p: "O Grande Prémio do Mónaco é o único encontro do calendário onde a corrida se vê de um salão, de um terraço ou do convés de um iate. A questão não é ter um lugar, é ter a altura certa." },
        { h: "As três formas de viver o Mónaco" },
        { p: "O Paddock Club, por cima das boxes, continua a ser a experiência de referência: vista sobre a pit lane, gastronomia, pilotos a passar entre sessões. Os terraços privados, Fairmont, edifícios do Rochedo, apartamentos sobre Sainte-Dévote, oferecem as curvas mais espetaculares numa atmosfera mais confidencial. E os iates atracados no porto: a corrida de um lado, o Mediterrâneo do outro, e uma festa que começa quando os motores se calam." },
        { h: "O que faz realmente a diferença" },
        { p: "O erro clássico é pensar apenas no bilhete. No Mónaco, a logística é rainha: o helicóptero Nice–Mónaco evita duas horas de trânsito, o hotel deve ser reservado com meses de antecedência, e as mesas de domingo à noite, quando toda a F1 janta no Principado, só se obtêm por relação." },
        { p: "O nosso conselho: construir o fim de semana como um todo, acessos, alojamento, transferes, jantares, em vez de empilhar reservas. É exatamente o que fazemos para os nossos clientes, todos os anos, dos treinos de quinta ao jantar de domingo." },
      ],
    },
  },
  {
    slug: "monaco-adresses",
    date: "2026-05-20",
    readingMinutes: 4,
    title: {
      fr: "Monaco : les adresses à connaître",
      en: "Monaco: the addresses worth knowing",
      es: "Mónaco: las direcciones que hay que conocer",
      pt: "Mónaco: as moradas a conhecer",
    },
    excerpt: {
      fr: "Où dîner, où sortir, où dormir en Principauté, les adresses que nos clients nous demandent le plus, et comment y entrer quand tout est complet.",
      en: "Where to dine, go out and stay in the Principality, the addresses our clients ask about most, and how to get in when everything is full.",
      es: "Dónde cenar, salir y dormir en el Principado, las direcciones que más nos piden nuestros clientes, y cómo entrar cuando todo está completo.",
      pt: "Onde jantar, sair e dormir no Principado, as moradas que os nossos clientes mais nos pedem, e como entrar quando tudo está cheio.",
    },
    body: {
      fr: [
        { p: "Monaco tient sur deux kilomètres carrés, mais concentre plus d'adresses mythiques que bien des capitales. Le paradoxe : tout est proche, et pourtant rien n'est accessible sans la bonne introduction, surtout les soirs de Grand Prix, de gala ou de Rolex Masters." },
        { h: "Dîner" },
        { p: "Les tables du Louis XV et du Blue Bay se réservent des semaines à l'avance en saison ; le Maya Bay et la salle du Cipriani offrent l'énergie des grands soirs. Pour un déjeuner face à la mer, la Vigie ou le deck du Monte-Carlo Beach restent des valeurs sûres, à condition d'avoir la table, pas seulement la réservation." },
        { h: "Sortir" },
        { p: "Le Jimmy'z reste l'institution des nuits monégasques, avec ses tables qui ne s'achètent pas mais s'attribuent. En été, la Rascasse côté ambiance et les soirées privées des terrasses du port complètent le tableau. La règle est partout la même : l'entrée se joue avant d'arriver." },
        { h: "Dormir" },
        { p: "L'Hôtel de Paris et l'Hermitage pour le mythe, le Monte-Carlo Beach pour la Riviera, le Maybourne Riviera juste au-dessus de la frontière pour la vue la plus spectaculaire de la côte. Les semaines d'événement, ces maisons affichent complet des mois à l'avance, c'est précisément là que notre réseau fait la différence." },
        { p: "Une envie de Principauté ? Dites-nous les dates : nous construisons le séjour, tables et soirées comprises." },
      ],
      en: [
        { p: "Monaco fits within two square kilometres, yet concentrates more legendary addresses than many capitals. The paradox: everything is close, and yet nothing is accessible without the right introduction, especially on Grand Prix, gala or Rolex Masters nights." },
        { h: "Dining" },
        { p: "Tables at Louis XV and Blue Bay book out weeks ahead in season; Maya Bay and Cipriani carry the energy of the great evenings. For lunch facing the sea, La Vigie or the Monte-Carlo Beach deck remain safe bets, provided you have the table, not just the reservation." },
        { h: "Going out" },
        { p: "Jimmy'z remains the institution of Monegasque nights, with tables that are not bought but granted. In summer, La Rascasse for atmosphere and the private parties on the harbour terraces complete the picture. The rule is the same everywhere: entry is decided before you arrive." },
        { h: "Staying" },
        { p: "The Hôtel de Paris and the Hermitage for the myth, the Monte-Carlo Beach for the Riviera, the Maybourne Riviera just above the border for the most spectacular view on the coast. On event weeks, these houses are fully booked months ahead, which is precisely where our network makes the difference." },
        { p: "Tempted by the Principality? Give us the dates: we build the stay, tables and parties included." },
      ],
      es: [
        { p: "Mónaco cabe en dos kilómetros cuadrados, pero concentra más direcciones míticas que muchas capitales. La paradoja: todo está cerca y, sin embargo, nada es accesible sin la introducción adecuada, sobre todo las noches de Gran Premio, de gala o de Rolex Masters." },
        { h: "Cenar" },
        { p: "Las mesas del Louis XV y del Blue Bay se reservan con semanas de antelación en temporada; el Maya Bay y el Cipriani tienen la energía de las grandes noches. Para un almuerzo frente al mar, La Vigie o el deck del Monte-Carlo Beach siguen siendo valores seguros, siempre que se tenga la mesa, no solo la reserva." },
        { h: "Salir" },
        { p: "El Jimmy'z sigue siendo la institución de las noches monegascas, con mesas que no se compran sino que se otorgan. En verano, La Rascasse por el ambiente y las fiestas privadas de las terrazas del puerto completan el cuadro. La regla es la misma en todas partes: la entrada se decide antes de llegar." },
        { h: "Dormir" },
        { p: "El Hôtel de Paris y el Hermitage por el mito, el Monte-Carlo Beach por la Riviera, el Maybourne Riviera justo encima de la frontera por la vista más espectacular de la costa. En las semanas de evento, estas casas están completas con meses de antelación, y es precisamente ahí donde nuestra red marca la diferencia." },
        { p: "¿Ganas de Principado? Díganos las fechas: construimos la estancia, mesas y fiestas incluidas." },
      ],
      pt: [
        { p: "O Mónaco cabe em dois quilómetros quadrados, mas concentra mais moradas míticas do que muitas capitais. O paradoxo: tudo está perto e, no entanto, nada é acessível sem a introdução certa, sobretudo nas noites de Grande Prémio, de gala ou de Rolex Masters." },
        { h: "Jantar" },
        { p: "As mesas do Louis XV e do Blue Bay reservam-se com semanas de antecedência na época; o Maya Bay e o Cipriani têm a energia das grandes noites. Para um almoço frente ao mar, La Vigie ou o deck do Monte-Carlo Beach continuam a ser valores seguros, desde que se tenha a mesa, não apenas a reserva." },
        { h: "Sair" },
        { p: "O Jimmy'z continua a ser a instituição das noites monegascas, com mesas que não se compram, atribuem-se. No verão, La Rascasse pelo ambiente e as festas privadas dos terraços do porto completam o quadro. A regra é a mesma em todo o lado: a entrada decide-se antes de chegar." },
        { h: "Dormir" },
        { p: "O Hôtel de Paris e o Hermitage pelo mito, o Monte-Carlo Beach pela Riviera, o Maybourne Riviera logo acima da fronteira pela vista mais espetacular da costa. Nas semanas de evento, estas casas esgotam com meses de antecedência, é precisamente aí que a nossa rede faz a diferença." },
        { p: "Com vontade de Principado? Diga-nos as datas: construímos a estadia, mesas e festas incluídas." },
      ],
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
