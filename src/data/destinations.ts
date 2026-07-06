import type { L, Locale } from "@/i18n";

/**
 * LES DESTINATIONS · les territoires où la maison a ses habitudes.
 * Chaque destination = storytelling + guide des lieux les plus prisés.
 * Photo : /public/images/dest-<slug>.jpg
 */
export type Destination = {
  slug: string;
  name: string;
  region: L;
  tagline: L;
  intro: L;
  spots: { name: string; text: L }[];
  offers: Record<Locale, string[]>;
};

export const destinations: Destination[] = [
  {
    slug: "monaco",
    name: "Monaco",
    region: { fr: "Principauté", en: "Principality", es: "Principado", pt: "Principado" },
    tagline: {
      fr: "Deux kilomètres carrés, toutes les portes du monde.",
      en: "Two square kilometres, every door in the world.",
      es: "Dos kilómetros cuadrados, todas las puertas del mundo.",
      pt: "Dois quilómetros quadrados, todas as portas do mundo.",
    },
    intro: {
      fr: "Sur le Rocher, tout est proche et rien n'est accessible sans la bonne introduction. Les soirs de Grand Prix ou de gala, la Principauté devient le centre du monde. Nous y avons nos habitudes, nos tables et nos terrasses.",
      en: "On the Rock, everything is close and nothing is accessible without the right introduction. On Grand Prix or gala nights, the Principality becomes the centre of the world. We have our habits there, our tables and our terraces.",
      es: "En el Peñón, todo está cerca y nada es accesible sin la introducción adecuada. Las noches de Gran Premio o de gala, el Principado se convierte en el centro del mundo. Allí tenemos nuestras costumbres, nuestras mesas y nuestras terrazas.",
      pt: "No Rochedo, tudo está perto e nada é acessível sem a introdução certa. Nas noites de Grande Prémio ou de gala, o Principado torna-se o centro do mundo. Lá temos os nossos hábitos, as nossas mesas e os nossos terraços.",
    },
    spots: [
      {
        name: "Jimmy'z",
        text: {
          fr: "L'institution des nuits monégasques : les tables ne s'achètent pas, elles s'attribuent.",
          en: "The institution of Monegasque nights: tables are not bought, they are granted.",
          es: "La institución de las noches monegascas: las mesas no se compran, se otorgan.",
          pt: "A instituição das noites monegascas: as mesas não se compram, atribuem-se.",
        },
      },
      {
        name: "Le Louis XV",
        text: {
          fr: "Ducasse à l'Hôtel de Paris : la grande table de la Méditerranée, trois étoiles au firmament.",
          en: "Ducasse at the Hôtel de Paris: the Mediterranean's great table, three stars in the firmament.",
          es: "Ducasse en el Hôtel de Paris: la gran mesa del Mediterráneo, tres estrellas en el firmamento.",
          pt: "Ducasse no Hôtel de Paris: a grande mesa do Mediterrâneo, três estrelas no firmamento.",
        },
      },
      {
        name: "Monte-Carlo Beach",
        text: {
          fr: "La Riviera dans sa version la plus élégante, à flanc de mer depuis 1929.",
          en: "The Riviera at its most elegant, clinging to the sea since 1929.",
          es: "La Riviera en su versión más elegante, junto al mar desde 1929.",
          pt: "A Riviera na sua versão mais elegante, à beira-mar desde 1929.",
        },
      },
      {
        name: "Maya Bay",
        text: {
          fr: "L'énergie des grands soirs, quelque part entre Tokyo et Monte-Carlo.",
          en: "The energy of the great nights, somewhere between Tokyo and Monte-Carlo.",
          es: "La energía de las grandes noches, entre Tokio y Montecarlo.",
          pt: "A energia das grandes noites, algures entre Tóquio e Monte-Carlo.",
        },
      },
    ],
    offers: {
      fr: ["Grand Prix : terrasses, Paddock Club, yachts", "Suites dans les palaces affichés complets", "Tables et nuits par introduction"],
      en: ["Grand Prix: terraces, Paddock Club, yachts", "Suites in fully-booked palaces", "Tables and nights by introduction"],
      es: ["Gran Premio: terrazas, Paddock Club, yates", "Suites en palacios completos", "Mesas y noches por introducción"],
      pt: ["Grande Prémio: terraços, Paddock Club, iates", "Suites em palácios esgotados", "Mesas e noites por introdução"],
    },
  },
  {
    slug: "cote-d-azur",
    name: "Côte d'Azur",
    region: {
      fr: "Cannes · Saint-Tropez",
      en: "Cannes · Saint-Tropez",
      es: "Cannes · Saint-Tropez",
      pt: "Cannes · Saint-Tropez",
    },
    tagline: {
      fr: "La lumière qui a inventé le glamour.",
      en: "The light that invented glamour.",
      es: "La luz que inventó el glamour.",
      pt: "A luz que inventou o glamour.",
    },
    intro: {
      fr: "De la Croisette aux vignes de Ramatuelle, la Côte d'Azur reste le décor originel du luxe à la française. L'été y est une saison entière de déjeuners qui s'étirent jusqu'à 18 heures et de soirées qui s'achèvent au petit matin.",
      en: "From the Croisette to the vineyards of Ramatuelle, the Côte d'Azur remains the original setting of French luxury. Summer there is a whole season of lunches stretching to 6pm and evenings ending at dawn.",
      es: "De la Croisette a las viñas de Ramatuelle, la Costa Azul sigue siendo el decorado original del lujo a la francesa. El verano es una temporada entera de almuerzos que se alargan hasta las 18h y de veladas que acaban al amanecer.",
      pt: "Da Croisette às vinhas de Ramatuelle, a Côte d'Azur continua a ser o cenário original do luxo à francesa. O verão é uma estação inteira de almoços que se estendem até às 18h e de noites que acabam de madrugada.",
    },
    spots: [
      {
        name: "Club 55",
        text: {
          fr: "Le déjeuner mythique de Pampelonne, inchangé depuis 1955. C'est cela, le vrai luxe.",
          en: "The mythical Pampelonne lunch, unchanged since 1955. That is what true luxury is.",
          es: "El almuerzo mítico de Pampelonne, sin cambios desde 1955. Eso es el verdadero lujo.",
          pt: "O almoço mítico de Pampelonne, inalterado desde 1955. O verdadeiro luxo é isto.",
        },
      },
      {
        name: "La Guérite",
        text: {
          fr: "Une île en face de Cannes, un feu de bois, une fête qui monte avec le soleil.",
          en: "An island facing Cannes, a wood fire, a party that rises with the sun.",
          es: "Una isla frente a Cannes, un fuego de leña, una fiesta que sube con el sol.",
          pt: "Uma ilha em frente a Cannes, um fogo de lenha, uma festa que sobe com o sol.",
        },
      },
      {
        name: "Hôtel du Cap-Eden-Roc",
        text: {
          fr: "La légende d'Antibes, là où le cinéma dort pendant le Festival.",
          en: "The legend of Antibes, where cinema sleeps during the Festival.",
          es: "La leyenda de Antibes, donde duerme el cine durante el Festival.",
          pt: "A lenda de Antibes, onde o cinema dorme durante o Festival.",
        },
      },
      {
        name: "Les Caves du Roy",
        text: {
          fr: "La nuit tropézienne dans sa forme la plus pure, sous les étoiles du Byblos.",
          en: "The Saint-Tropez night in its purest form, under the stars of the Byblos.",
          es: "La noche de Saint-Tropez en su forma más pura, bajo las estrellas del Byblos.",
          pt: "A noite de Saint-Tropez na sua forma mais pura, sob as estrelas do Byblos.",
        },
      },
    ],
    offers: {
      fr: ["Villas à Pampelonne et au Cap d'Antibes", "Tables et transats des beach clubs", "Yacht à la journée, Festival de Cannes"],
      en: ["Villas in Pampelonne and Cap d'Antibes", "Beach club tables and sunbeds", "Day charters, Cannes Film Festival"],
      es: ["Villas en Pampelonne y Cap d'Antibes", "Mesas y hamacas de los beach clubs", "Yate por día, Festival de Cannes"],
      pt: ["Villas em Pampelonne e no Cap d'Antibes", "Mesas e espreguiçadeiras dos beach clubs", "Iate ao dia, Festival de Cannes"],
    },
  },
  {
    slug: "paris",
    name: "Paris",
    region: { fr: "France", en: "France", es: "Francia", pt: "França" },
    tagline: {
      fr: "La ville qui n'a besoin de personne, sauf des bonnes clés.",
      en: "The city that needs no one, except the right keys.",
      es: "La ciudad que no necesita a nadie, salvo las llaves correctas.",
      pt: "A cidade que não precisa de ninguém, exceto das chaves certas.",
    },
    intro: {
      fr: "Paris ne s'ouvre qu'à ceux qui savent à quelle porte frapper : la table du fond, la suite avec vue sur la Tour, la soirée dont on ne parle pas. C'est notre ville. Nous en avons les clés.",
      en: "Paris only opens to those who know which door to knock on: the table at the back, the suite overlooking the Tower, the party no one talks about. It is our city. We hold its keys.",
      es: "París solo se abre a quienes saben a qué puerta llamar: la mesa del fondo, la suite con vistas a la Torre, la fiesta de la que no se habla. Es nuestra ciudad. Tenemos sus llaves.",
      pt: "Paris só se abre a quem sabe a que porta bater: a mesa do fundo, a suite com vista para a Torre, a festa de que não se fala. É a nossa cidade. Temos as suas chaves.",
    },
    spots: [
      {
        name: "Girafe",
        text: {
          fr: "Dîner face à la Tour Eiffel, sur la plus convoitée des terrasses parisiennes.",
          en: "Dinner facing the Eiffel Tower, on the most coveted terrace in Paris.",
          es: "Cenar frente a la Torre Eiffel, en la terraza más codiciada de París.",
          pt: "Jantar em frente à Torre Eiffel, no terraço mais cobiçado de Paris.",
        },
      },
      {
        name: "Hôtel Costes",
        text: {
          fr: "Le patio le plus demandé de la rue Saint-Honoré, depuis trente ans.",
          en: "The most requested patio on rue Saint-Honoré, for thirty years.",
          es: "El patio más solicitado de la rue Saint-Honoré, desde hace treinta años.",
          pt: "O pátio mais requisitado da rue Saint-Honoré, há trinta anos.",
        },
      },
      {
        name: "Silencio",
        text: {
          fr: "Le club imaginé par David Lynch : membres, artistes et initiés seulement.",
          en: "The club imagined by David Lynch: members, artists and insiders only.",
          es: "El club imaginado por David Lynch: solo socios, artistas e iniciados.",
          pt: "O clube imaginado por David Lynch: apenas membros, artistas e iniciados.",
        },
      },
      {
        name: "CoCo",
        text: {
          fr: "Dîner-spectacle dans les ors de l'Opéra Garnier, le Paris qui s'amuse.",
          en: "Dinner and show amid the gold of the Opéra Garnier, Paris at play.",
          es: "Cena-espectáculo entre los oros de la Ópera Garnier, el París que se divierte.",
          pt: "Jantar-espetáculo entre os ouros da Ópera Garnier, a Paris que se diverte.",
        },
      },
    ],
    offers: {
      fr: ["Suites et palaces de la Place Vendôme au Trocadéro", "Tables introuvables, soirées privées", "Fashion Week, Roland-Garros, grands soirs"],
      en: ["Suites and palaces from Place Vendôme to Trocadéro", "Unbookable tables, private parties", "Fashion Week, Roland-Garros, great nights"],
      es: ["Suites y palacios de la Place Vendôme al Trocadéro", "Mesas imposibles, fiestas privadas", "Fashion Week, Roland-Garros, grandes noches"],
      pt: ["Suites e palácios da Place Vendôme ao Trocadéro", "Mesas impossíveis, festas privadas", "Fashion Week, Roland-Garros, grandes noites"],
    },
  },
  {
    slug: "mykonos",
    name: "Mykonos",
    region: { fr: "Cyclades, Grèce", en: "Cyclades, Greece", es: "Cícladas, Grecia", pt: "Cíclades, Grécia" },
    tagline: {
      fr: "L'île où le soleil se couche en musique.",
      en: "The island where the sun sets to music.",
      es: "La isla donde el sol se pone con música.",
      pt: "A ilha onde o sol se põe em música.",
    },
    intro: {
      fr: "Des ruelles blanches qui aveuglent à midi, des criques qui se méritent, et ce moment, vers dix-neuf heures, où toute l'île se tourne vers la mer. Mykonos ne se visite pas : elle se vit entre initiés, de plage privée en table les pieds dans l'eau.",
      en: "White lanes that dazzle at noon, coves that must be earned, and that moment, around seven in the evening, when the whole island turns towards the sea. Mykonos is not visited: it is lived among insiders, from private beach to table at the water's edge.",
      es: "Callejuelas blancas que deslumbran al mediodía, calas que hay que merecer, y ese momento, hacia las siete de la tarde, en que toda la isla se vuelve hacia el mar. Mykonos no se visita: se vive entre iniciados, de playa privada en mesa a pie de agua.",
      pt: "Ruelas brancas que deslumbram ao meio-dia, enseadas que se merecem, e aquele momento, por volta das sete da tarde, em que toda a ilha se vira para o mar. Mykonos não se visita: vive-se entre iniciados, de praia privada em mesa à beira de água.",
    },
    spots: [
      {
        name: "Nammos",
        text: {
          fr: "La plage de Psarou, où les transats se réservent comme des loges d'opéra.",
          en: "Psarou beach, where sunbeds are booked like opera boxes.",
          es: "La playa de Psarou, donde las hamacas se reservan como palcos de ópera.",
          pt: "A praia de Psarou, onde as espreguiçadeiras se reservam como camarotes de ópera.",
        },
      },
      {
        name: "Scorpios",
        text: {
          fr: "Percussions, encens et coucher de soleil : le rituel païen de l'île.",
          en: "Drums, incense and sunset: the island's pagan ritual.",
          es: "Percusiones, incienso y puesta de sol: el ritual pagano de la isla.",
          pt: "Percussões, incenso e pôr do sol: o ritual pagão da ilha.",
        },
      },
      {
        name: "Alemagou",
        text: {
          fr: "Bohème chic sur la plage de Ftelia, loin du bruit, près du vent.",
          en: "Boho chic on Ftelia beach, far from the noise, close to the wind.",
          es: "Bohemia chic en la playa de Ftelia, lejos del ruido, cerca del viento.",
          pt: "Boémia chique na praia de Ftelia, longe do ruído, perto do vento.",
        },
      },
      {
        name: "Cavo Tagoo",
        text: {
          fr: "L'hôtel-icône aux piscines suspendues au-dessus de la mer Égée.",
          en: "The icon hotel with pools suspended above the Aegean.",
          es: "El hotel icono con piscinas suspendidas sobre el Egeo.",
          pt: "O hotel-ícone com piscinas suspensas sobre o Egeu.",
        },
      },
    ],
    offers: {
      fr: ["Villas avec staff au-dessus des criques", "Transats et tables des beach clubs", "Hélicoptère, yacht vers Délos et Rhénée"],
      en: ["Staffed villas above the coves", "Beach club sunbeds and tables", "Helicopter, yacht to Delos and Rhenia"],
      es: ["Villas con personal sobre las calas", "Hamacas y mesas de los beach clubs", "Helicóptero, yate a Delos y Renea"],
      pt: ["Villas com staff sobre as enseadas", "Espreguiçadeiras e mesas dos beach clubs", "Helicóptero, iate para Delos e Rineia"],
    },
  },
  {
    slug: "ibiza",
    name: "Ibiza",
    region: { fr: "Baléares, Espagne", en: "Balearics, Spain", es: "Baleares, España", pt: "Baleares, Espanha" },
    tagline: {
      fr: "L'île électrique qui sait aussi chuchoter.",
      en: "The electric island that also knows how to whisper.",
      es: "La isla eléctrica que también sabe susurrar.",
      pt: "A ilha elétrica que também sabe sussurrar.",
    },
    intro: {
      fr: "Il y a deux Ibiza : celle qui danse jusqu'au lever du jour, et celle qui déjeune pieds nus face à Formentera. Les deux affichent complet tout l'été. Nous avons les clés des deux.",
      en: "There are two Ibizas: the one that dances until sunrise, and the one that lunches barefoot facing Formentera. Both are fully booked all summer. We hold the keys to both.",
      es: "Hay dos Ibizas: la que baila hasta el amanecer y la que almuerza descalza frente a Formentera. Las dos están completas todo el verano. Tenemos las llaves de ambas.",
      pt: "Há duas Ibizas: a que dança até ao nascer do dia e a que almoça descalça em frente a Formentera. As duas esgotam todo o verão. Temos as chaves das duas.",
    },
    spots: [
      {
        name: "Casa Jondal",
        text: {
          fr: "Le déjeuner le plus élégant de l'île : caviar et poisson grillé face à la baie.",
          en: "The island's most elegant lunch: caviar and grilled fish facing the bay.",
          es: "El almuerzo más elegante de la isla: caviar y pescado a la brasa frente a la bahía.",
          pt: "O almoço mais elegante da ilha: caviar e peixe grelhado em frente à baía.",
        },
      },
      {
        name: "Ushuaïa",
        text: {
          fr: "Le temple de l'électro à ciel ouvert, tables VIP au pied de la scène.",
          en: "The open-air temple of electronic music, VIP tables at the foot of the stage.",
          es: "El templo de la electrónica al aire libre, mesas VIP al pie del escenario.",
          pt: "O templo da eletrónica ao ar livre, mesas VIP ao pé do palco.",
        },
      },
      {
        name: "Lío",
        text: {
          fr: "Cabaret, dîner et club face à Dalt Vila illuminée : la nuit totale.",
          en: "Cabaret, dinner and club facing the illuminated Dalt Vila: the total night.",
          es: "Cabaret, cena y club frente a Dalt Vila iluminada: la noche total.",
          pt: "Cabaré, jantar e clube em frente à Dalt Vila iluminada: a noite total.",
        },
      },
      {
        name: "Es Torrent",
        text: {
          fr: "La paillote secrète des habitués, dans une crique hors du temps.",
          en: "The regulars' secret beach hut, in a cove outside of time.",
          es: "El chiringuito secreto de los habituales, en una cala fuera del tiempo.",
          pt: "A cabana secreta dos habitués, numa enseada fora do tempo.",
        },
      },
    ],
    offers: {
      fr: ["Villas avec staff, yacht vers Formentera", "Tables VIP des clubs et beach clubs", "Nuits privées, artistes et backstage"],
      en: ["Staffed villas, yacht to Formentera", "VIP tables at clubs and beach clubs", "Private nights, artists and backstage"],
      es: ["Villas con personal, yate a Formentera", "Mesas VIP de clubs y beach clubs", "Noches privadas, artistas y backstage"],
      pt: ["Villas com staff, iate para Formentera", "Mesas VIP de clubes e beach clubs", "Noites privadas, artistas e backstage"],
    },
  },
  {
    slug: "new-york",
    name: "New York",
    region: { fr: "États-Unis", en: "United States", es: "Estados Unidos", pt: "Estados Unidos" },
    tagline: {
      fr: "La ville où tout est complet. Sauf pour vous.",
      en: "The city where everything is booked. Except for you.",
      es: "La ciudad donde todo está completo. Salvo para usted.",
      pt: "A cidade onde tudo está esgotado. Exceto para si.",
    },
    intro: {
      fr: "À New York, la liste d'attente est un sport local : trois mois pour une table, une saison pour un club, une vie pour certains courts. C'est précisément notre terrain de jeu préféré.",
      en: "In New York, the waiting list is a local sport: three months for a table, a season for a club, a lifetime for certain courts. Which is precisely why it is our favourite playground.",
      es: "En Nueva York, la lista de espera es un deporte local: tres meses para una mesa, una temporada para un club, una vida para ciertas pistas. Precisamente por eso es nuestro terreno de juego favorito.",
      pt: "Em Nova Iorque, a lista de espera é um desporto local: três meses para uma mesa, uma época para um clube, uma vida para certos courts. É precisamente por isso que é o nosso terreno de jogo favorito.",
    },
    spots: [
      {
        name: "Carbone",
        text: {
          fr: "La table italo-américaine la plus convoitée du monde, au cœur de Greenwich Village.",
          en: "The most coveted Italian-American table in the world, in the heart of Greenwich Village.",
          es: "La mesa italoamericana más codiciada del mundo, en pleno Greenwich Village.",
          pt: "A mesa ítalo-americana mais cobiçada do mundo, no coração de Greenwich Village.",
        },
      },
      {
        name: "Zero Bond",
        text: {
          fr: "Le club privé où Manhattan se retrouve quand les portes se ferment ailleurs.",
          en: "The private club where Manhattan gathers when doors close elsewhere.",
          es: "El club privado donde Manhattan se reúne cuando las puertas se cierran en otros sitios.",
          pt: "O clube privado onde Manhattan se reúne quando as portas se fecham noutros lugares.",
        },
      },
      {
        name: "Casa Cipriani",
        text: {
          fr: "Le club-hôtel au bord de l'eau, jazz au salon et Statue de la Liberté en toile de fond.",
          en: "The waterfront club-hotel, jazz in the lounge and the Statue of Liberty as a backdrop.",
          es: "El club-hotel junto al agua, jazz en el salón y la Estatua de la Libertad de fondo.",
          pt: "O clube-hotel à beira de água, jazz no salão e a Estátua da Liberdade como pano de fundo.",
        },
      },
      {
        name: "Polo Bar",
        text: {
          fr: "Chez Ralph Lauren : l'Amérique idéale, sur réservation introuvable.",
          en: "Ralph Lauren's own: the ideal America, on an unfindable reservation.",
          es: "En casa de Ralph Lauren: la América ideal, con una reserva imposible.",
          pt: "Na casa de Ralph Lauren: a América ideal, com uma reserva impossível.",
        },
      },
    ],
    offers: {
      fr: ["Tables et clubs privés de Manhattan", "US Open, NBA et Broadway au premier rang", "Suites avec vue sur Central Park"],
      en: ["Manhattan's private tables and clubs", "US Open, NBA and Broadway from the front row", "Suites overlooking Central Park"],
      es: ["Mesas y clubes privados de Manhattan", "US Open, NBA y Broadway en primera fila", "Suites con vistas a Central Park"],
      pt: ["Mesas e clubes privados de Manhattan", "US Open, NBA e Broadway na primeira fila", "Suites com vista para o Central Park"],
    },
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
