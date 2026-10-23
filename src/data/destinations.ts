import type { L, Locale } from "@/i18n";

/**
 * LES DESTINATIONS · les territoires où la maison a ses habitudes.
 * Chaque destination = storytelling + guide en 4 rubriques :
 * vivre (expériences), tables (restaurants), verres (bars), nuit (clubs).
 * Toutes les adresses se réservent via la maison. Visuel : src/lib/univers.ts
 */
export type GuideCategory = "vivre" | "tables" | "verres" | "nuit";

export type Destination = {
  slug: string;
  name: string;
  region: L;
  tagline: L;
  intro: L;
  guide: Record<GuideCategory, { name: string; text: L }[]>;
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
    guide: {
      vivre: [
        {
          name: "Casino de Monte-Carlo",
          text: {
            fr: "Les salons privés du plus célèbre casino du monde, après la fermeture des salles publiques.",
            en: "The private rooms of the world's most famous casino, after the public halls close.",
            es: "Los salones privados del casino más famoso del mundo, tras el cierre de las salas públicas.",
            pt: "Os salões privados do casino mais famoso do mundo, após o fecho das salas públicas.",
          },
        },
        {
          name: "Thermes Marins",
          text: {
            fr: "Une journée suspendue entre mer et marbre, le spa des habitués du Rocher.",
            en: "A day suspended between sea and marble, the spa of the Rock's regulars.",
            es: "Un día suspendido entre mar y mármol, el spa de los habituales del Peñón.",
            pt: "Um dia suspenso entre mar e mármore, o spa dos habitués do Rochedo.",
          },
        },
        {
          name: "Journée en mer",
          text: {
            fr: "Tender au départ du Yacht Club, déjeuner au mouillage face à Roquebrune.",
            en: "Tender from the Yacht Club, lunch at anchor facing Roquebrune.",
            es: "Lancha desde el Yacht Club, almuerzo fondeado frente a Roquebrune.",
            pt: "Lancha a partir do Yacht Club, almoço fundeado em frente a Roquebrune.",
          },
        },
      ],
      tables: [
        {
          name: "Le Louis XV",
          text: {
            fr: "Ducasse à l'Hôtel de Paris : la grande table de la Méditerranée.",
            en: "Ducasse at the Hôtel de Paris: the Mediterranean's great table.",
            es: "Ducasse en el Hôtel de Paris: la gran mesa del Mediterráneo.",
            pt: "Ducasse no Hôtel de Paris: a grande mesa do Mediterrâneo.",
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
        {
          name: "La Vigie",
          text: {
            fr: "Déjeuner les pieds au-dessus de l'eau, la Riviera comme en 1930.",
            en: "Lunch with your feet above the water, the Riviera as in 1930.",
            es: "Almuerzo con los pies sobre el agua, la Riviera como en 1930.",
            pt: "Almoço com os pés sobre a água, a Riviera como em 1930.",
          },
        },
      ],
      verres: [
        {
          name: "Bar Américain",
          text: {
            fr: "Jazz, boiseries et cocktails d'avant-guerre à l'Hôtel de Paris.",
            en: "Jazz, wood panelling and pre-war cocktails at the Hôtel de Paris.",
            es: "Jazz, maderas nobles y cócteles de antes de la guerra en el Hôtel de Paris.",
            pt: "Jazz, madeiras nobres e cocktails de antes da guerra no Hôtel de Paris.",
          },
        },
        {
          name: "Amazónico",
          text: {
            fr: "Jungle chic et terrasse dorée au-dessus du Casino.",
            en: "Jungle chic and a golden terrace above the Casino.",
            es: "Jungla chic y terraza dorada sobre el Casino.",
            pt: "Selva chique e terraço dourado sobre o Casino.",
          },
        },
        {
          name: "Sass Café",
          text: {
            fr: "Piano-bar où la Principauté chante jusqu'à tard, institution absolue.",
            en: "Piano bar where the Principality sings late into the night, an absolute institution.",
            es: "Piano-bar donde el Principado canta hasta tarde, institución absoluta.",
            pt: "Piano-bar onde o Principado canta até tarde, instituição absoluta.",
          },
        },
      ],
      nuit: [
        {
          name: "Jimmy'z",
          text: {
            fr: "L'institution des nuits monégasques : les tables s'attribuent, ne s'achètent pas.",
            en: "The institution of Monegasque nights: tables are granted, not bought.",
            es: "La institución de las noches monegascas: las mesas se otorgan, no se compran.",
            pt: "A instituição das noites monegascas: as mesas atribuem-se, não se compram.",
          },
        },
        {
          name: "Twiga",
          text: {
            fr: "Dîner-spectacle puis club, la nuit italienne du Rocher.",
            en: "Dinner show then club, the Rock's Italian night.",
            es: "Cena-espectáculo y luego club, la noche italiana del Peñón.",
            pt: "Jantar-espetáculo e depois clube, a noite italiana do Rochedo.",
          },
        },
        {
          name: "La Rascasse",
          text: {
            fr: "Sur le virage mythique du circuit, la fête jusqu'au matin les soirs de Grand Prix.",
            en: "On the circuit's mythical corner, partying until morning on Grand Prix nights.",
            es: "En la curva mítica del circuito, fiesta hasta la mañana las noches de Gran Premio.",
            pt: "Na curva mítica do circuito, festa até de manhã nas noites de Grande Prémio.",
          },
        },
      ],
    },
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
    guide: {
      vivre: [
        {
          name: "Îles de Lérins",
          text: {
            fr: "Traversée privée depuis Cannes, baignade dans une eau de lagon face à l'abbaye.",
            en: "Private crossing from Cannes, a swim in lagoon water facing the abbey.",
            es: "Travesía privada desde Cannes, baño en agua de laguna frente a la abadía.",
            pt: "Travessia privada desde Cannes, banho em água de lagoa em frente à abadia.",
          },
        },
        {
          name: "Pampelonne en tender",
          text: {
            fr: "Arriver à la plage par la mer, comme il se doit à Saint-Tropez.",
            en: "Arriving at the beach by sea, as one should in Saint-Tropez.",
            es: "Llegar a la playa por el mar, como debe ser en Saint-Tropez.",
            pt: "Chegar à praia pelo mar, como deve ser em Saint-Tropez.",
          },
        },
        {
          name: "Cap d'Antibes",
          text: {
            fr: "Le sentier des douaniers au lever du jour, puis la piscine de l'Eden-Roc.",
            en: "The coastal path at daybreak, then the Eden-Roc pool.",
            es: "El sendero costero al amanecer, luego la piscina del Eden-Roc.",
            pt: "O caminho costeiro ao amanhecer, depois a piscina do Eden-Roc.",
          },
        },
      ],
      tables: [
        {
          name: "Club 55",
          text: {
            fr: "Le déjeuner mythique de Pampelonne, inchangé depuis 1955.",
            en: "The mythical Pampelonne lunch, unchanged since 1955.",
            es: "El almuerzo mítico de Pampelonne, sin cambios desde 1955.",
            pt: "O almoço mítico de Pampelonne, inalterado desde 1955.",
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
          name: "Loulou Ramatuelle",
          text: {
            fr: "L'élégance parisienne posée sur le sable, entre vignes et Méditerranée.",
            en: "Parisian elegance set on the sand, between vineyards and the Mediterranean.",
            es: "La elegancia parisina posada en la arena, entre viñas y Mediterráneo.",
            pt: "A elegância parisiense pousada na areia, entre vinhas e Mediterrâneo.",
          },
        },
      ],
      verres: [
        {
          name: "Bar de l'Eden-Roc",
          text: {
            fr: "Le coucher de soleil le plus célèbre du cinéma mondial, à Antibes.",
            en: "World cinema's most famous sunset, in Antibes.",
            es: "La puesta de sol más célebre del cine mundial, en Antibes.",
            pt: "O pôr do sol mais célebre do cinema mundial, em Antibes.",
          },
        },
        {
          name: "Sube",
          text: {
            fr: "Le balcon au-dessus du port de Saint-Tropez, rituel de fin de journée.",
            en: "The balcony above the port of Saint-Tropez, an end-of-day ritual.",
            es: "El balcón sobre el puerto de Saint-Tropez, ritual de fin de jornada.",
            pt: "A varanda sobre o porto de Saint-Tropez, ritual de fim de dia.",
          },
        },
        {
          name: "La Môme",
          text: {
            fr: "La terrasse où Cannes dîne, boit et se montre pendant le Festival.",
            en: "The terrace where Cannes dines, drinks and shows itself during the Festival.",
            es: "La terraza donde Cannes cena, bebe y se deja ver durante el Festival.",
            pt: "O terraço onde Cannes janta, bebe e se mostra durante o Festival.",
          },
        },
      ],
      nuit: [
        {
          name: "Les Caves du Roy",
          text: {
            fr: "La nuit tropézienne dans sa forme la plus pure, sous les étoiles du Byblos.",
            en: "The Saint-Tropez night in its purest form, under the stars of the Byblos.",
            es: "La noche de Saint-Tropez en su forma más pura, bajo las estrellas del Byblos.",
            pt: "A noite de Saint-Tropez na sua forma mais pura, sob as estrelas do Byblos.",
          },
        },
        {
          name: "Gotha Club",
          text: {
            fr: "Le grand club de la Croisette, têtes d'affiche mondiales tout l'été.",
            en: "The Croisette's grand club, world headliners all summer long.",
            es: "El gran club de la Croisette, cabezas de cartel mundiales todo el verano.",
            pt: "O grande clube da Croisette, cabeças de cartaz mundiais todo o verão.",
          },
        },
        {
          name: "Bagatelle",
          text: {
            fr: "Le déjeuner qui devient fête, champagne et sabrage au coucher du soleil.",
            en: "The lunch that becomes a party, champagne and sabrage at sunset.",
            es: "El almuerzo que se convierte en fiesta, champán y sable al atardecer.",
            pt: "O almoço que se torna festa, champanhe e sabrage ao pôr do sol.",
          },
        },
      ],
    },
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
    guide: {
      vivre: [
        {
          name: "Le Louvre à huis clos",
          text: {
            fr: "La Joconde sans personne devant : visites privées avant l'ouverture.",
            en: "The Mona Lisa with no one in front: private visits before opening.",
            es: "La Gioconda sin nadie delante: visitas privadas antes de la apertura.",
            pt: "A Mona Lisa sem ninguém à frente: visitas privadas antes da abertura.",
          },
        },
        {
          name: "Montaigne & Vendôme",
          text: {
            fr: "Shopping en salons privés, les maisons ouvertes rien que pour vous.",
            en: "Shopping in private salons, the houses open just for you.",
            es: "Compras en salones privados, las casas abiertas solo para usted.",
            pt: "Compras em salões privados, as casas abertas só para si.",
          },
        },
        {
          name: "Paris vu du ciel",
          text: {
            fr: "Hélicoptère au départ d'Issy, la Tour Eiffel sous vos pieds.",
            en: "Helicopter from Issy, the Eiffel Tower beneath your feet.",
            es: "Helicóptero desde Issy, la Torre Eiffel bajo sus pies.",
            pt: "Helicóptero a partir de Issy, a Torre Eiffel debaixo dos seus pés.",
          },
        },
      ],
      tables: [
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
          name: "CoCo",
          text: {
            fr: "Dîner-spectacle dans les ors de l'Opéra Garnier, le Paris qui s'amuse.",
            en: "Dinner and show amid the gold of the Opéra Garnier, Paris at play.",
            es: "Cena-espectáculo entre los oros de la Ópera Garnier, el París que se divierte.",
            pt: "Jantar-espetáculo entre os ouros da Ópera Garnier, a Paris que se diverte.",
          },
        },
        {
          name: "Loulou",
          text: {
            fr: "Terrasse sur les Tuileries, la table italienne du Tout-Paris de la mode.",
            en: "A terrace over the Tuileries, the Italian table of fashion's Tout-Paris.",
            es: "Terraza sobre las Tullerías, la mesa italiana del Tout-Paris de la moda.",
            pt: "Terraço sobre as Tulherias, a mesa italiana do Tout-Paris da moda.",
          },
        },
      ],
      verres: [
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
          name: "Bar Hemingway",
          text: {
            fr: "Au fond du Ritz, le bar le plus littéraire du monde.",
            en: "At the back of the Ritz, the most literary bar in the world.",
            es: "Al fondo del Ritz, el bar más literario del mundo.",
            pt: "Ao fundo do Ritz, o bar mais literário do mundo.",
          },
        },
        {
          name: "Cravan",
          text: {
            fr: "Cocktails d'orfèvre sur plusieurs étages, le nouveau salon du Tout-Paris.",
            en: "Master-crafted cocktails over several floors, the new salon of le Tout-Paris.",
            es: "Cócteles de orfebre en varias plantas, el nuevo salón del Tout-Paris.",
            pt: "Cocktails de ourives em vários andares, o novo salão do Tout-Paris.",
          },
        },
      ],
      nuit: [
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
          name: "Raspoutine",
          text: {
            fr: "Velours rouge et nuits sans fin, le cabaret russe de l'Étoile.",
            en: "Red velvet and endless nights, the Russian cabaret by the Étoile.",
            es: "Terciopelo rojo y noches sin fin, el cabaret ruso de l'Étoile.",
            pt: "Veludo vermelho e noites sem fim, o cabaré russo da Étoile.",
          },
        },
        {
          name: "Chez Moune",
          text: {
            fr: "Le petit club noir des nuits de la mode, là où finissent les défilés.",
            en: "The little black club of fashion nights, where the shows end up.",
            es: "El pequeño club negro de las noches de la moda, donde terminan los desfiles.",
            pt: "O pequeno clube negro das noites da moda, onde acabam os desfiles.",
          },
        },
      ],
    },
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
    guide: {
      vivre: [
        {
          name: "Délos à l'aube",
          text: {
            fr: "L'île sacrée privatisée avant les ferries : mille ans d'histoire pour vous seuls.",
            en: "The sacred island privatised before the ferries: a thousand years of history for you alone.",
            es: "La isla sagrada privatizada antes de los ferris: mil años de historia solo para usted.",
            pt: "A ilha sagrada privatizada antes dos ferries: mil anos de história só para si.",
          },
        },
        {
          name: "Rhénée en yacht",
          text: {
            fr: "Journée de criques désertes et d'eau translucide, à vingt minutes du monde.",
            en: "A day of empty coves and translucent water, twenty minutes from the world.",
            es: "Un día de calas desiertas y agua translúcida, a veinte minutos del mundo.",
            pt: "Um dia de enseadas desertas e água translúcida, a vinte minutos do mundo.",
          },
        },
        {
          name: "Chora au petit matin",
          text: {
            fr: "Little Venice et les moulins avant la foule, avec un photographe si vous voulez.",
            en: "Little Venice and the windmills before the crowds, with a photographer if you wish.",
            es: "Little Venice y los molinos antes de la multitud, con fotógrafo si lo desea.",
            pt: "Little Venice e os moinhos antes da multidão, com fotógrafo se quiser.",
          },
        },
      ],
      tables: [
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
          name: "Spilia",
          text: {
            fr: "Dîner dans une grotte marine, les oursins cueillis sous vos yeux.",
            en: "Dinner in a sea cave, urchins gathered before your eyes.",
            es: "Cena en una cueva marina, los erizos recogidos ante sus ojos.",
            pt: "Jantar numa gruta marinha, os ouriços colhidos à sua frente.",
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
      ],
      verres: [
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
          name: "180° Sunset Bar",
          text: {
            fr: "Le point culminant de Chora, l'Égée entière dans votre verre.",
            en: "Chora's highest point, the whole Aegean in your glass.",
            es: "El punto más alto de Chora, todo el Egeo en su copa.",
            pt: "O ponto mais alto de Chora, todo o Egeu no seu copo.",
          },
        },
        {
          name: "Caprice",
          text: {
            fr: "Little Venice au ras de l'eau, les vagues qui éclaboussent le comptoir.",
            en: "Little Venice at water level, waves splashing the bar.",
            es: "Little Venice a ras de agua, las olas salpicando la barra.",
            pt: "Little Venice à beira de água, as ondas a salpicar o balcão.",
          },
        },
      ],
      nuit: [
        {
          name: "Cavo Paradiso",
          text: {
            fr: "Le club-falaise au-dessus de Paradise Beach, line-up mondial jusqu'au lever du soleil.",
            en: "The cliff-top club above Paradise Beach, world line-ups until sunrise.",
            es: "El club del acantilado sobre Paradise Beach, line-up mundial hasta el amanecer.",
            pt: "O clube na falésia sobre Paradise Beach, line-up mundial até ao nascer do sol.",
          },
        },
        {
          name: "Void",
          text: {
            fr: "Le grand club de Chora, techno pointue et tables convoitées.",
            en: "Chora's big club, sharp techno and coveted tables.",
            es: "El gran club de Chora, techno afilado y mesas codiciadas.",
            pt: "O grande clube de Chora, techno apurado e mesas cobiçadas.",
          },
        },
        {
          name: "SantAnna",
          text: {
            fr: "La plus grande piscine d'Europe, journées qui basculent en nuits blanches.",
            en: "Europe's largest pool, days that tip into white nights.",
            es: "La piscina más grande de Europa, días que se convierten en noches en blanco.",
            pt: "A maior piscina da Europa, dias que se transformam em noites em branco.",
          },
        },
      ],
    },
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
    guide: {
      vivre: [
        {
          name: "Formentera en yacht",
          text: {
            fr: "Ses Illetes et ses eaux des Caraïbes, mouillage au milieu de nulle part.",
            en: "Ses Illetes and its Caribbean waters, anchored in the middle of nowhere.",
            es: "Ses Illetes y sus aguas caribeñas, fondeados en medio de la nada.",
            pt: "Ses Illetes e as suas águas das Caraíbas, fundeados no meio do nada.",
          },
        },
        {
          name: "Es Vedrà au couchant",
          text: {
            fr: "Le rocher magnétique de l'île, champagne au coucher du soleil.",
            en: "The island's magnetic rock, champagne at sunset.",
            es: "La roca magnética de la isla, champán al atardecer.",
            pt: "A rocha magnética da ilha, champanhe ao pôr do sol.",
          },
        },
        {
          name: "Dalt Vila privée",
          text: {
            fr: "La vieille ville fortifiée hors des heures, guide et dîner dans les remparts.",
            en: "The fortified old town after hours, guide and dinner within the ramparts.",
            es: "La ciudad vieja fortificada fuera de horas, guía y cena en las murallas.",
            pt: "A cidade velha fortificada fora de horas, guia e jantar nas muralhas.",
          },
        },
      ],
      tables: [
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
          name: "Es Torrent",
          text: {
            fr: "La paillote secrète des habitués, dans une crique hors du temps.",
            en: "The regulars' secret beach hut, in a cove outside of time.",
            es: "El chiringuito secreto de los habituales, en una cala fuera del tiempo.",
            pt: "A cabana secreta dos habitués, numa enseada fora do tempo.",
          },
        },
        {
          name: "La Paloma",
          text: {
            fr: "Jardin d'orangers et cuisine méditerranéenne, le secret le mieux gardé du nord.",
            en: "Orange grove and Mediterranean cooking, the north's best-kept secret.",
            es: "Jardín de naranjos y cocina mediterránea, el secreto mejor guardado del norte.",
            pt: "Jardim de laranjeiras e cozinha mediterrânica, o segredo mais bem guardado do norte.",
          },
        },
      ],
      verres: [
        {
          name: "Experimental Beach",
          text: {
            fr: "Cocktails parisiens au bout des salines, face au soleil qui tombe.",
            en: "Parisian cocktails at the end of the salt flats, facing the falling sun.",
            es: "Cócteles parisinos al final de las salinas, frente al sol que cae.",
            pt: "Cocktails parisienses ao fundo das salinas, em frente ao sol que cai.",
          },
        },
        {
          name: "Hostal La Torre",
          text: {
            fr: "Le sunset mythique de San Antonio, ambient music et ciel en feu.",
            en: "San Antonio's mythical sunset, ambient music and a sky on fire.",
            es: "El sunset mítico de San Antonio, música ambient y cielo en llamas.",
            pt: "O sunset mítico de San Antonio, música ambiente e céu em chamas.",
          },
        },
        {
          name: "Blue Marlin",
          text: {
            fr: "Cala Jondal en mode jour : rosé, DJ sets et tenders qui vont et viennent.",
            en: "Cala Jondal by day: rosé, DJ sets and tenders coming and going.",
            es: "Cala Jondal de día: rosado, DJ sets y lanchas que van y vienen.",
            pt: "Cala Jondal de dia: rosé, DJ sets e lanchas que vão e vêm.",
          },
        },
      ],
      nuit: [
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
          name: "Hï Ibiza",
          text: {
            fr: "Le club le mieux classé du monde, cabines et tables près du DJ.",
            en: "The world's top-ranked club, booths and tables by the DJ.",
            es: "El club mejor clasificado del mundo, cabinas y mesas junto al DJ.",
            pt: "O clube mais bem classificado do mundo, cabines e mesas junto ao DJ.",
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
      ],
    },
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
    guide: {
      vivre: [
        {
          name: "Manhattan en hélicoptère",
          text: {
            fr: "Downtown, la Statue, Central Park : quinze minutes qui valent le voyage.",
            en: "Downtown, the Statue, Central Park: fifteen minutes worth the whole trip.",
            es: "Downtown, la Estatua, Central Park: quince minutos que valen el viaje.",
            pt: "Downtown, a Estátua, Central Park: quinze minutos que valem a viagem.",
          },
        },
        {
          name: "Courtside au Garden",
          text: {
            fr: "Les Knicks à hauteur de parquet, là où s'assoit le cinéma.",
            en: "The Knicks at floor level, where the film stars sit.",
            es: "Los Knicks a pie de pista, donde se sienta el cine.",
            pt: "Os Knicks à beira do parquet, onde se senta o cinema.",
          },
        },
        {
          name: "SoHo en privé",
          text: {
            fr: "Showrooms et arrière-boutiques des créateurs, portes ouvertes pour vous.",
            en: "Designers' showrooms and back rooms, doors open for you.",
            es: "Showrooms y trastiendas de los creadores, puertas abiertas para usted.",
            pt: "Showrooms e bastidores dos criadores, portas abertas para si.",
          },
        },
      ],
      tables: [
        {
          name: "Carbone",
          text: {
            fr: "La table italo-américaine la plus convoitée du monde, à Greenwich Village.",
            en: "The most coveted Italian-American table in the world, in Greenwich Village.",
            es: "La mesa italoamericana más codiciada del mundo, en Greenwich Village.",
            pt: "A mesa ítalo-americana mais cobiçada do mundo, em Greenwich Village.",
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
        {
          name: "4 Charles Prime Rib",
          text: {
            fr: "Vingt tables dans un sous-sol du Village : le steakhouse le plus fermé de la ville.",
            en: "Twenty tables in a Village basement: the most closed steakhouse in the city.",
            es: "Veinte mesas en un sótano del Village: el steakhouse más cerrado de la ciudad.",
            pt: "Vinte mesas numa cave do Village: o steakhouse mais fechado da cidade.",
          },
        },
      ],
      verres: [
        {
          name: "Bemelmans Bar",
          text: {
            fr: "Fresques, piano et martinis au Carlyle : l'Upper East Side éternel.",
            en: "Murals, piano and martinis at the Carlyle: the eternal Upper East Side.",
            es: "Frescos, piano y martinis en el Carlyle: el eterno Upper East Side.",
            pt: "Frescos, piano e martinis no Carlyle: o eterno Upper East Side.",
          },
        },
        {
          name: "Overstory",
          text: {
            fr: "Cocktails au 64e étage, Manhattan à 360 degrés.",
            en: "Cocktails on the 64th floor, Manhattan in 360 degrees.",
            es: "Cócteles en el piso 64, Manhattan en 360 grados.",
            pt: "Cocktails no 64.º andar, Manhattan em 360 graus.",
          },
        },
        {
          name: "Dante",
          text: {
            fr: "Le meilleur bar du monde plusieurs années de suite, négronis à toute heure.",
            en: "The world's best bar several years running, negronis at any hour.",
            es: "El mejor bar del mundo varios años seguidos, negronis a cualquier hora.",
            pt: "O melhor bar do mundo vários anos seguidos, negronis a qualquer hora.",
          },
        },
      ],
      nuit: [
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
            fr: "Jazz au salon, Statue de la Liberté en toile de fond : membres seulement.",
            en: "Jazz in the lounge, the Statue of Liberty as a backdrop: members only.",
            es: "Jazz en el salón, la Estatua de la Libertad de fondo: solo socios.",
            pt: "Jazz no salão, a Estátua da Liberdade como pano de fundo: só membros.",
          },
        },
        {
          name: "Paul's Baby Grand",
          text: {
            fr: "Minuscule, tamisé, introuvable : la nuit préférée des initiés de SoHo.",
            en: "Tiny, dim, unfindable: the favourite night of SoHo insiders.",
            es: "Minúsculo, tenue, imposible de encontrar: la noche favorita de los iniciados de SoHo.",
            pt: "Minúsculo, ténue, impossível de encontrar: a noite favorita dos iniciados de SoHo.",
          },
        },
      ],
    },
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
