import type { L, Locale } from "@/i18n";

/**
 * CONTENU DÉTAILLÉ DES PAGES SERVICES.
 * Pour chaque service : la promesse (intro), ce que nous orchestrons
 * (liste concrète) et la FAQ dédiée. Jamais de prix : devis sur demande.
 */
export type ServiceDetail = {
  intro: L;
  orchestrations: Record<Locale, string[]>;
  faq: Record<Locale, { q: string; a: string }[]>;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  evenements: {
    intro: {
      fr: "Les plus grandes soirées de sport et de musique n'ont pas de billetterie : elles ont un cercle. AZ Experiences vous y fait entrer, de l'ouverture du tournoi au rappel final.",
      en: "The greatest nights in sport and music have no box office: they have a circle. AZ Experiences brings you inside it, from the opening match to the final encore.",
      es: "Las mayores noches del deporte y de la música no tienen taquilla: tienen un círculo. AZ Experiences le hace entrar en él, de la apertura del torneo al último bis.",
      pt: "As maiores noites do desporto e da música não têm bilheteira: têm um círculo. A AZ Experiences fá-lo entrar nele, da abertura do torneio ao último encore.",
    },
    orchestrations: {
      fr: [
        "Billets premium pour les événements affichés complets",
        "Loges privées, carrés or et courtside",
        "Packages hospitality officiels, lounges et restauration",
        "Accès paddock, backstage ou tapis rouge selon l'événement",
        "Transport, hôtel et conciergerie du jour J",
        "Veille des mises en vente pour nos clients fidèles",
      ],
      en: [
        "Premium tickets for sold-out events",
        "Private boxes, golden circle and courtside seats",
        "Official hospitality packages, lounges and dining",
        "Paddock, backstage or red carpet access depending on the event",
        "Event-day transport, hotel and concierge",
        "On-sale monitoring for our regular clients",
      ],
      es: [
        "Entradas premium para eventos agotados",
        "Palcos privados, golden circle y courtside",
        "Paquetes de hospitality oficiales, lounges y restauración",
        "Acceso a paddock, backstage o alfombra roja según el evento",
        "Transporte, hotel y conserjería el día D",
        "Seguimiento de las salidas a la venta para nuestros clientes",
      ],
      pt: [
        "Bilhetes premium para eventos esgotados",
        "Camarotes privados, golden circle e courtside",
        "Pacotes de hospitality oficiais, lounges e restauração",
        "Acesso a paddock, backstage ou passadeira vermelha consoante o evento",
        "Transporte, hotel e concierge no dia do evento",
        "Vigilância das aberturas de venda para os nossos clientes",
      ],
    },
    faq: {
      fr: [
        {
          q: "Comment demander des billets pour un événement complet ?",
          a: "Écrivez-nous par WhatsApp, email ou formulaire privé en précisant l'événement, la date et le nombre de places. Nous répondons en quelques heures avec les options réelles et un devis précis.",
        },
        {
          q: "Les billets sont-ils garantis ?",
          a: "Nous ne confirmons que ce que nous savons livrer, et chaque confirmation fait l'objet d'un engagement écrit. Vous êtes accompagné jusqu'à votre place.",
        },
        {
          q: "À quel moment faut-il demander ?",
          a: "Le plus tôt donne les meilleures conditions, mais la dernière minute fait partie de notre métier : certaines de nos plus belles réussites se sont jouées la veille.",
        },
      ],
      en: [
        {
          q: "How do I request tickets for a sold-out event?",
          a: "Write to us by WhatsApp, email or private form with the event, date and number of seats. We reply within hours with the real options and a precise quote.",
        },
        {
          q: "Are tickets guaranteed?",
          a: "We only confirm what we know we can deliver, and every confirmation is backed in writing. You are assisted all the way to your seat.",
        },
        {
          q: "When should I ask?",
          a: "Earlier means better conditions, but last minute is part of our craft: some of our finest work happened the night before.",
        },
      ],
      es: [
        {
          q: "¿Cómo pido entradas para un evento agotado?",
          a: "Escríbanos por WhatsApp, email o formulario privado con el evento, la fecha y el número de plazas. Respondemos en pocas horas con las opciones reales y un presupuesto preciso.",
        },
        {
          q: "¿Las entradas están garantizadas?",
          a: "Solo confirmamos lo que sabemos entregar, y cada confirmación queda respaldada por escrito. Le acompañamos hasta su asiento.",
        },
        {
          q: "¿Cuándo hay que pedir?",
          a: "Cuanto antes, mejores condiciones, pero el último minuto es parte de nuestro oficio: algunos de nuestros mejores logros se decidieron la víspera.",
        },
      ],
      pt: [
        {
          q: "Como peço bilhetes para um evento esgotado?",
          a: "Escreva-nos por WhatsApp, email ou formulário privado com o evento, a data e o número de lugares. Respondemos em poucas horas com as opções reais e um orçamento preciso.",
        },
        {
          q: "Os bilhetes são garantidos?",
          a: "Só confirmamos o que sabemos entregar, e cada confirmação é apoiada por escrito. É acompanhado até ao seu lugar.",
        },
        {
          q: "Quando devo pedir?",
          a: "Quanto mais cedo, melhores condições, mas o último minuto faz parte do nosso ofício: alguns dos nossos melhores feitos decidiram-se na véspera.",
        },
      ],
    },
  },

  gastronomie: {
    intro: {
      fr: "Certaines tables n'ont pas de liste d'attente : elles se transmettent. AZ Experiences vous installe là où l'on ne réserve pas, à Paris comme à l'étranger, et fait venir les plus grands chefs jusqu'à votre table.",
      en: "Some tables have no waiting list: they are passed on. AZ Experiences seats you where one does not simply book, in Paris and abroad, and brings the greatest chefs to your own table.",
      es: "Algunas mesas no tienen lista de espera: se transmiten. AZ Experiences le sienta donde no se reserva, en París y en el extranjero, y lleva a los más grandes chefs hasta su mesa.",
      pt: "Algumas mesas não têm lista de espera: transmitem-se. A AZ Experiences senta-o onde não se reserva, em Paris e no estrangeiro, e leva os maiores chefs até à sua mesa.",
    },
    orchestrations: {
      fr: [
        "Tables dans les restaurants affichés complets",
        "Chefs étoilés à domicile, en villa ou à bord",
        "Privatisations de salles, rooftops et lieux confidentiels",
        "Dîners d'affaires et grandes occasions orchestrés de bout en bout",
        "Accords mets & vins, sommellerie et caves rares",
        "Attentions particulières : placement, menu personnalisé, fleurs",
      ],
      en: [
        "Tables at fully-booked restaurants",
        "Starred chefs at home, in a villa or on board",
        "Privatisation of dining rooms, rooftops and confidential venues",
        "Business dinners and great occasions orchestrated end to end",
        "Food & wine pairings, sommeliers and rare cellars",
        "Personal touches: seating, bespoke menu, flowers",
      ],
      es: [
        "Mesas en restaurantes completos",
        "Chefs con estrella a domicilio, en villa o a bordo",
        "Privatización de salas, rooftops y lugares confidenciales",
        "Cenas de negocios y grandes ocasiones orquestadas de principio a fin",
        "Maridajes, sumillería y bodegas excepcionales",
        "Atenciones especiales: ubicación, menú personalizado, flores",
      ],
      pt: [
        "Mesas em restaurantes esgotados",
        "Chefs estrelados em casa, em villa ou a bordo",
        "Privatização de salas, rooftops e lugares confidenciais",
        "Jantares de negócios e grandes ocasiões orquestrados de ponta a ponta",
        "Harmonizações, sommellerie e garrafeiras raras",
        "Atenções especiais: lugar, menu personalizado, flores",
      ],
    },
    faq: {
      fr: [
        {
          q: "Comment réserver une table ?",
          a: "Indiquez-nous le restaurant, ou simplement l'envie, la date, l'heure et le nombre de couverts. Nous confirmons la table et les attentions : placement, menu, occasion à célébrer.",
        },
        {
          q: "Pouvez-vous obtenir une table le soir même ?",
          a: "Souvent, oui. Nos relations avec les maisons permettent des miracles de dernière minute ; plus la demande arrive tôt dans la journée, plus les options sont larges.",
        },
        {
          q: "Organisez-vous des chefs à domicile ?",
          a: "Oui : chef étoilé, brigade complète, arts de la table et service. Vous recevez, nous orchestrons tout le reste.",
        },
      ],
      en: [
        {
          q: "How do I book a table?",
          a: "Tell us the restaurant, or simply the craving, the date, time and number of guests. We confirm the table and the details: seating, menu, occasion to celebrate.",
        },
        {
          q: "Can you get a table for tonight?",
          a: "Often, yes. Our relationships with the houses allow last-minute miracles; the earlier in the day you ask, the wider the options.",
        },
        {
          q: "Do you arrange private chefs?",
          a: "Yes: starred chef, full brigade, tableware and service. You host, we orchestrate everything else.",
        },
      ],
      es: [
        {
          q: "¿Cómo reservo una mesa?",
          a: "Indíquenos el restaurante, o simplemente el antojo, la fecha, la hora y el número de comensales. Confirmamos la mesa y los detalles: ubicación, menú, ocasión a celebrar.",
        },
        {
          q: "¿Pueden conseguir una mesa para esta noche?",
          a: "A menudo, sí. Nuestras relaciones con las casas permiten milagros de última hora; cuanto antes llegue la petición, más amplias son las opciones.",
        },
        {
          q: "¿Organizan chefs a domicilio?",
          a: "Sí: chef con estrella, brigada completa, artes de la mesa y servicio. Usted recibe, nosotros orquestamos todo lo demás.",
        },
      ],
      pt: [
        {
          q: "Como reservo uma mesa?",
          a: "Indique-nos o restaurante, ou simplesmente a vontade, a data, a hora e o número de pessoas. Confirmamos a mesa e os detalhes: lugar, menu, ocasião a celebrar.",
        },
        {
          q: "Conseguem uma mesa para esta noite?",
          a: "Muitas vezes, sim. As nossas relações com as casas permitem milagres de última hora; quanto mais cedo chegar o pedido, mais amplas são as opções.",
        },
        {
          q: "Organizam chefs em casa?",
          a: "Sim: chef estrelado, brigada completa, artes da mesa e serviço. Você recebe, nós orquestramos todo o resto.",
        },
      ],
    },
  },

  "jet-prive": {
    intro: {
      fr: "Un Grand Prix le dimanche, une réunion le lundi matin : le ciel s'organise. Nos partenaires certifiés affrètent l'appareil, nous orchestrons tout le reste, du tarmac à votre siège.",
      en: "A Grand Prix on Sunday, a meeting on Monday morning: the sky can be arranged. Our certified partners charter the aircraft, we orchestrate everything else, from tarmac to seat.",
      es: "Un Gran Premio el domingo, una reunión el lunes por la mañana: el cielo se organiza. Nuestros socios certificados fletan el avión, nosotros orquestamos todo lo demás, de la pista a su asiento.",
      pt: "Um Grande Prémio no domingo, uma reunião na segunda de manhã: o céu organiza-se. Os nossos parceiros certificados fretam o avião, nós orquestramos todo o resto, da pista ao seu lugar.",
    },
    orchestrations: {
      fr: [
        "Affrètement de jets privés, du light jet au long-courrier",
        "Hélicoptère : Nice · Monaco, transferts événements, panoramas",
        "Première et business sur vols commerciaux, dernière minute comprise",
        "Salons privés, fast-track et douane accélérée",
        "Catering signature et aménagements à bord",
        "Coordination chauffeur & bagages à l'arrivée",
      ],
      en: [
        "Private jet charter, from light jets to long haul",
        "Helicopter: Nice · Monaco, event transfers, scenic flights",
        "First and business class on commercial flights, last minute included",
        "Private lounges, fast-track and expedited customs",
        "Signature catering and cabin arrangements",
        "Chauffeur & luggage coordination on arrival",
      ],
      es: [
        "Flete de jets privados, del light jet al largo radio",
        "Helicóptero: Niza · Mónaco, traslados a eventos, vuelos panorámicos",
        "Primera y business en vuelos comerciales, último minuto incluido",
        "Salones privados, fast-track y aduana acelerada",
        "Catering de autor y configuración de cabina",
        "Coordinación de chófer y equipaje a la llegada",
      ],
      pt: [
        "Fretamento de jatos privados, do light jet ao longo curso",
        "Helicóptero: Nice · Mónaco, transferes para eventos, voos panorâmicos",
        "Primeira e business em voos comerciais, última hora incluída",
        "Salas privadas, fast-track e alfândega acelerada",
        "Catering de assinatura e configuração da cabina",
        "Coordenação de motorista e bagagem à chegada",
      ],
    },
    faq: {
      fr: [
        {
          q: "En combien de temps peut-on affréter un jet ?",
          a: "Sur les axes fréquents, un départ peut s'organiser en quelques heures. Donnez-nous la destination, la date et le nombre de passagers : le devis arrive très vite.",
        },
        {
          q: "Avec qui volez-vous ?",
          a: "Exclusivement avec des opérateurs certifiés, sélectionnés pour leur sécurité et leur régularité. Nous ne possédons pas d'appareils : nous choisissons les meilleurs pour chaque vol.",
        },
        {
          q: "Animaux, bagages volumineux, horaires décalés ?",
          a: "Vos contraintes font partie du vol. Dites-nous tout dès la demande : c'est précisément ce que le sur-mesure veut dire.",
        },
      ],
      en: [
        {
          q: "How fast can a jet be chartered?",
          a: "On frequent routes, a departure can be arranged within hours. Give us the destination, date and number of passengers: the quote comes back very quickly.",
        },
        {
          q: "Who do you fly with?",
          a: "Exclusively certified operators, selected for safety and reliability. We do not own aircraft: we choose the best one for each flight.",
        },
        {
          q: "Pets, oversized luggage, odd hours?",
          a: "Your constraints are part of the flight. Tell us everything upfront: that is exactly what bespoke means.",
        },
      ],
      es: [
        {
          q: "¿En cuánto tiempo se puede fletar un jet?",
          a: "En las rutas frecuentes, una salida puede organizarse en pocas horas. Dénos el destino, la fecha y el número de pasajeros: el presupuesto llega muy rápido.",
        },
        {
          q: "¿Con quién vuelan?",
          a: "Exclusivamente con operadores certificados, seleccionados por su seguridad y fiabilidad. No poseemos aviones: elegimos el mejor para cada vuelo.",
        },
        {
          q: "¿Mascotas, equipaje voluminoso, horarios especiales?",
          a: "Sus condiciones forman parte del vuelo. Cuéntenoslo todo desde la petición: eso es exactamente lo que significa a medida.",
        },
      ],
      pt: [
        {
          q: "Em quanto tempo se freta um jato?",
          a: "Nas rotas frequentes, uma partida pode organizar-se em poucas horas. Diga-nos o destino, a data e o número de passageiros: o orçamento chega muito depressa.",
        },
        {
          q: "Com quem voam?",
          a: "Exclusivamente com operadores certificados, selecionados pela segurança e fiabilidade. Não possuímos aviões: escolhemos o melhor para cada voo.",
        },
        {
          q: "Animais, bagagem volumosa, horários especiais?",
          a: "As suas condições fazem parte do voo. Diga-nos tudo no pedido: é exatamente isso que significa à medida.",
        },
      ],
    },
  },

  yachts: {
    intro: {
      fr: "La Méditerranée se vit depuis le pont. Journée entre amis, semaine en famille ou position privilégiée en bord de circuit : nous affrétons le bon bateau, avec le bon équipage, au bon endroit.",
      en: "The Mediterranean is best lived from the deck. A day with friends, a week with family or a privileged trackside position: we charter the right yacht, with the right crew, in the right place.",
      es: "El Mediterráneo se vive desde la cubierta. Un día entre amigos, una semana en familia o una posición privilegiada junto al circuito: fletamos el barco adecuado, con la tripulación adecuada, en el lugar adecuado.",
      pt: "O Mediterrâneo vive-se do convés. Um dia entre amigos, uma semana em família ou uma posição privilegiada junto à pista: fretamos o barco certo, com a tripulação certa, no lugar certo.",
    },
    orchestrations: {
      fr: [
        "Location à la journée ou à la semaine, avec équipage complet",
        "Positions bord de circuit pour le Grand Prix de Monaco",
        "Mouillages d'exception : Cannes pendant le Festival, Saint-Tropez, Capri",
        "Chef à bord, sommellerie et water toys",
        "Itinéraires sur mesure et escales privées",
        "Événements à bord : anniversaires, soirées, lancements",
      ],
      en: [
        "Day or week charters with full crew",
        "Trackside positions for the Monaco Grand Prix",
        "Exceptional moorings: Cannes during the Festival, Saint-Tropez, Capri",
        "Chef on board, sommelier service and water toys",
        "Bespoke itineraries and private stopovers",
        "Events on board: birthdays, parties, launches",
      ],
      es: [
        "Alquiler por día o por semana, con tripulación completa",
        "Posiciones junto al circuito para el Gran Premio de Mónaco",
        "Fondeos excepcionales: Cannes durante el Festival, Saint-Tropez, Capri",
        "Chef a bordo, sumillería y water toys",
        "Itinerarios a medida y escalas privadas",
        "Eventos a bordo: cumpleaños, fiestas, presentaciones",
      ],
      pt: [
        "Aluguer ao dia ou à semana, com tripulação completa",
        "Posições junto à pista para o Grande Prémio do Mónaco",
        "Fundeadouros excecionais: Cannes durante o Festival, Saint-Tropez, Capri",
        "Chef a bordo, sommellerie e water toys",
        "Itinerários à medida e escalas privadas",
        "Eventos a bordo: aniversários, festas, lançamentos",
      ],
    },
    faq: {
      fr: [
        {
          q: "Comment se passe une location ?",
          a: "Dites-nous les dates, la zone, le nombre d'invités et l'esprit recherché. Nous proposons une sélection de bateaux avec équipage, et le devis détaille tout : carburant, mouillages, extras.",
        },
        {
          q: "Peut-on organiser un événement à bord ?",
          a: "Oui : traiteur, DJ, décoration, photographe, navette pour les invités. Le bateau devient le lieu de réception le plus exclusif de la baie.",
        },
        {
          q: "Faut-il une expérience nautique ?",
          a: "Aucune. Capitaine et équipage s'occupent de tout ; vous n'avez qu'à choisir la crique du déjeuner.",
        },
      ],
      en: [
        {
          q: "How does a charter work?",
          a: "Tell us the dates, the area, the number of guests and the mood. We propose a selection of crewed yachts, and the quote details everything: fuel, moorings, extras.",
        },
        {
          q: "Can we host an event on board?",
          a: "Yes: catering, DJ, decoration, photographer, guest tender. The yacht becomes the most exclusive venue in the bay.",
        },
        {
          q: "Do we need sailing experience?",
          a: "None. Captain and crew handle everything; your only decision is which cove to choose for lunch.",
        },
      ],
      es: [
        {
          q: "¿Cómo funciona un alquiler?",
          a: "Díganos las fechas, la zona, el número de invitados y el ambiente buscado. Proponemos una selección de barcos con tripulación, y el presupuesto lo detalla todo: combustible, fondeos, extras.",
        },
        {
          q: "¿Se puede organizar un evento a bordo?",
          a: "Sí: catering, DJ, decoración, fotógrafo, lancha para los invitados. El barco se convierte en el lugar más exclusivo de la bahía.",
        },
        {
          q: "¿Hace falta experiencia náutica?",
          a: "Ninguna. Capitán y tripulación se ocupan de todo; su única decisión es la cala del almuerzo.",
        },
      ],
      pt: [
        {
          q: "Como funciona um aluguer?",
          a: "Diga-nos as datas, a zona, o número de convidados e o espírito procurado. Propomos uma seleção de barcos com tripulação, e o orçamento detalha tudo: combustível, fundeadouros, extras.",
        },
        {
          q: "Pode organizar-se um evento a bordo?",
          a: "Sim: catering, DJ, decoração, fotógrafo, lancha para os convidados. O barco torna-se o lugar mais exclusivo da baía.",
        },
        {
          q: "É precisa experiência náutica?",
          a: "Nenhuma. Capitão e tripulação tratam de tudo; a sua única decisão é a enseada do almoço.",
        },
      ],
    },
  },

  hotels: {
    intro: {
      fr: "Les plus belles maisons du monde affichent complet des mois à l'avance. Pas pour tout le monde. Suites signature, palaces, adresses confidentielles : nous réservons, surclassons et faisons précéder votre arrivée.",
      en: "The world's finest houses are fully booked months ahead. Not for everyone. Signature suites, palaces, confidential addresses: we book, upgrade and make sure your arrival is expected.",
      es: "Las mejores casas del mundo están completas con meses de antelación. No para todos. Suites signature, palacios, direcciones confidenciales: reservamos, mejoramos la categoría y hacemos que su llegada sea esperada.",
      pt: "As mais belas casas do mundo esgotam com meses de antecedência. Não para todos. Suites signature, palácios, moradas confidenciais: reservamos, fazemos upgrade e garantimos que a sua chegada é esperada.",
    },
    orchestrations: {
      fr: [
        "Chambres et suites dans les palaces affichés complets",
        "Surclassements, early check-in et late check-out",
        "Semaines d'événement : GP de Monaco, Festival de Cannes, Fashion Week",
        "Maisons rares et adresses qui ne se réservent pas en ligne",
        "Attentions à l'arrivée : champagne, fleurs, mot de la maison",
        "Conciergerie coordonnée avec l'hôtel pendant tout le séjour",
      ],
      en: [
        "Rooms and suites at fully-booked palaces",
        "Upgrades, early check-in and late check-out",
        "Event weeks: Monaco GP, Cannes Festival, Fashion Week",
        "Rare houses and addresses that cannot be booked online",
        "Arrival touches: champagne, flowers, a word from the house",
        "Concierge coordinated with the hotel throughout your stay",
      ],
      es: [
        "Habitaciones y suites en palacios completos",
        "Mejoras de categoría, early check-in y late check-out",
        "Semanas de evento: GP de Mónaco, Festival de Cannes, Fashion Week",
        "Casas excepcionales y direcciones que no se reservan en línea",
        "Atenciones a la llegada: champán, flores, una nota de la casa",
        "Conserjería coordinada con el hotel durante toda la estancia",
      ],
      pt: [
        "Quartos e suites em palácios esgotados",
        "Upgrades, early check-in e late check-out",
        "Semanas de evento: GP do Mónaco, Festival de Cannes, Fashion Week",
        "Casas raras e moradas que não se reservam online",
        "Atenções à chegada: champanhe, flores, uma nota da casa",
        "Concierge coordenado com o hotel durante toda a estadia",
      ],
    },
    faq: {
      fr: [
        {
          q: "Pouvez-vous obtenir une chambre dans un hôtel complet ?",
          a: "C'est notre spécialité, en particulier les semaines d'événement. Nos relations directes avec les maisons débloquent ce que les plateformes affichent comme impossible.",
        },
        {
          q: "Quel avantage par rapport à réserver moi-même ?",
          a: "Mêmes tarifs, mais avec les attentions : surclassement quand c'est possible, arrivée préparée, accès prioritaire aux services de l'hôtel, et un seul interlocuteur avant, pendant et après.",
        },
        {
          q: "Gérez-vous les demandes particulières ?",
          a: "Étage précis, vue, lit supplémentaire, régime alimentaire, cadeau dans la chambre : dites-le une fois, c'est appliqué partout.",
        },
      ],
      en: [
        {
          q: "Can you get a room in a fully-booked hotel?",
          a: "It is our speciality, especially on event weeks. Our direct relationships with the houses unlock what platforms display as impossible.",
        },
        {
          q: "Why not book myself?",
          a: "Same rates, but with the touches: upgrades when possible, a prepared arrival, priority access to hotel services, and a single point of contact before, during and after.",
        },
        {
          q: "Do you handle special requests?",
          a: "A specific floor, a view, an extra bed, dietary needs, a gift in the room: say it once, it is applied everywhere.",
        },
      ],
      es: [
        {
          q: "¿Pueden conseguir una habitación en un hotel completo?",
          a: "Es nuestra especialidad, sobre todo en semanas de evento. Nuestras relaciones directas con las casas desbloquean lo que las plataformas muestran como imposible.",
        },
        {
          q: "¿Qué ventaja frente a reservar yo mismo?",
          a: "Mismas tarifas, pero con las atenciones: mejora de categoría cuando es posible, llegada preparada, acceso prioritario a los servicios del hotel y un único interlocutor antes, durante y después.",
        },
        {
          q: "¿Gestionan peticiones especiales?",
          a: "Piso concreto, vistas, cama supletoria, dieta, regalo en la habitación: dígalo una vez y se aplica en todas partes.",
        },
      ],
      pt: [
        {
          q: "Conseguem um quarto num hotel esgotado?",
          a: "É a nossa especialidade, sobretudo nas semanas de evento. As nossas relações diretas com as casas desbloqueiam o que as plataformas mostram como impossível.",
        },
        {
          q: "Que vantagem em relação a reservar eu mesmo?",
          a: "Mesmas tarifas, mas com as atenções: upgrade quando possível, chegada preparada, acesso prioritário aos serviços do hotel e um único interlocutor antes, durante e depois.",
        },
        {
          q: "Tratam de pedidos especiais?",
          a: "Andar específico, vista, cama extra, dieta, presente no quarto: diga uma vez e é aplicado em todo o lado.",
        },
      ],
    },
  },

  transport: {
    intro: {
      fr: "Le luxe, c'est de ne jamais penser au trajet. Berlines et vans premium, chauffeurs formés aux grands événements, logistique millimétrée : vous descendez de voiture au plus près de l'entrée VIP, et elle vous attend à la sortie.",
      en: "Luxury means never thinking about the journey. Premium sedans and vans, chauffeurs trained on major events, precise logistics: you step out right by the VIP entrance, and the car is waiting when you leave.",
      es: "El lujo es no pensar nunca en el trayecto. Berlinas y vans premium, chóferes formados en grandes eventos, logística milimétrica: baja del coche junto a la entrada VIP y le espera a la salida.",
      pt: "O luxo é nunca pensar no trajeto. Berlinas e vans premium, motoristas treinados nos grandes eventos, logística milimétrica: sai do carro junto à entrada VIP e ele espera-o à saída.",
    },
    orchestrations: {
      fr: [
        "Chauffeur à l'heure, à la journée ou à la semaine",
        "Berlines, vans et véhicules blindés sur demande",
        "Transferts aéroport avec suivi de vol en temps réel",
        "Logistique jour d'événement : dépose VIP, attente, retour sécurisé",
        "Chauffeurs multilingues et discrétion absolue",
        "Coordination multi-villes et multi-véhicules",
      ],
      en: [
        "Chauffeur by the hour, day or week",
        "Sedans, vans and armoured vehicles on request",
        "Airport transfers with real-time flight tracking",
        "Event-day logistics: VIP drop-off, standby, safe return",
        "Multilingual chauffeurs and absolute discretion",
        "Multi-city and multi-vehicle coordination",
      ],
      es: [
        "Chófer por horas, por día o por semana",
        "Berlinas, vans y vehículos blindados bajo petición",
        "Traslados al aeropuerto con seguimiento de vuelo en tiempo real",
        "Logística el día del evento: llegada VIP, espera, regreso seguro",
        "Chóferes multilingües y discreción absoluta",
        "Coordinación multiciudad y multivehículo",
      ],
      pt: [
        "Motorista à hora, ao dia ou à semana",
        "Berlinas, vans e veículos blindados a pedido",
        "Transferes de aeroporto com seguimento de voo em tempo real",
        "Logística no dia do evento: chegada VIP, espera, regresso seguro",
        "Motoristas multilingues e discrição absoluta",
        "Coordenação multicidade e multiveículo",
      ],
    },
    faq: {
      fr: [
        {
          q: "Comment réserver un chauffeur ?",
          a: "Envoyez-nous les trajets, les horaires et le nombre de passagers. Confirmation rapide avec le nom du chauffeur, le véhicule et le point de rencontre exact.",
        },
        {
          q: "Comment ça se passe un jour d'événement ?",
          a: "Le chauffeur connaît les accès, dépose au plus près de l'entrée VIP et reste en zone d'attente. À la sortie, la voiture est déjà là, quelle que soit l'heure.",
        },
        {
          q: "Quels véhicules proposez-vous ?",
          a: "Classe S, Classe V et équivalents premium, jusqu'aux véhicules blindés avec chauffeur de sécurité pour les dispositifs particuliers.",
        },
      ],
      en: [
        {
          q: "How do I book a chauffeur?",
          a: "Send us the journeys, times and number of passengers. Quick confirmation with the chauffeur's name, the vehicle and the exact meeting point.",
        },
        {
          q: "What happens on event day?",
          a: "The chauffeur knows the access routes, drops you right by the VIP entrance and stays on standby. When you come out, the car is already there, whatever the hour.",
        },
        {
          q: "Which vehicles do you offer?",
          a: "S-Class, V-Class and premium equivalents, up to armoured vehicles with security drivers for special arrangements.",
        },
      ],
      es: [
        {
          q: "¿Cómo reservo un chófer?",
          a: "Envíenos los trayectos, los horarios y el número de pasajeros. Confirmación rápida con el nombre del chófer, el vehículo y el punto de encuentro exacto.",
        },
        {
          q: "¿Cómo funciona un día de evento?",
          a: "El chófer conoce los accesos, le deja junto a la entrada VIP y permanece en zona de espera. A la salida, el coche ya está allí, sea la hora que sea.",
        },
        {
          q: "¿Qué vehículos ofrecen?",
          a: "Clase S, Clase V y equivalentes premium, hasta vehículos blindados con conductor de seguridad para dispositivos especiales.",
        },
      ],
      pt: [
        {
          q: "Como reservo um motorista?",
          a: "Envie-nos os trajetos, os horários e o número de passageiros. Confirmação rápida com o nome do motorista, o veículo e o ponto de encontro exato.",
        },
        {
          q: "Como funciona num dia de evento?",
          a: "O motorista conhece os acessos, deixa-o junto à entrada VIP e fica em zona de espera. À saída, o carro já lá está, seja a que horas for.",
        },
        {
          q: "Que veículos propõem?",
          a: "Classe S, Classe V e equivalentes premium, até veículos blindados com motorista de segurança para dispositivos especiais.",
        },
      ],
    },
  },

  securite: {
    intro: {
      fr: "La vraie protection ne se remarque pas. Gardes du corps expérimentés, chauffeurs de sécurité, dispositifs discrets : vous vivez votre soirée, quelqu'un veille sur le reste.",
      en: "Real protection goes unnoticed. Experienced bodyguards, security drivers, discreet arrangements: you live your evening, someone watches over the rest.",
      es: "La verdadera protección no se nota. Guardaespaldas experimentados, conductores de seguridad, dispositivos discretos: usted vive su velada, alguien vela por lo demás.",
      pt: "A verdadeira proteção não se nota. Guarda-costas experientes, motoristas de segurança, dispositivos discretos: você vive a sua noite, alguém vela pelo resto.",
    },
    orchestrations: {
      fr: [
        "Gardes du corps professionnels, en tenue civile",
        "Chauffeurs de sécurité et véhicules adaptés",
        "Protection lors des événements, soirées et déplacements",
        "Dispositifs pour familles et personnalités exposées",
        "Coordination avec la sécurité des lieux et des organisateurs",
        "Accompagnements ponctuels : shopping, transferts sensibles",
      ],
      en: [
        "Professional bodyguards in plain clothes",
        "Security drivers and suitable vehicles",
        "Protection at events, parties and during travel",
        "Arrangements for families and exposed personalities",
        "Coordination with venue and organiser security",
        "One-off escorts: shopping, sensitive transfers",
      ],
      es: [
        "Guardaespaldas profesionales, de paisano",
        "Conductores de seguridad y vehículos adaptados",
        "Protección en eventos, fiestas y desplazamientos",
        "Dispositivos para familias y personalidades expuestas",
        "Coordinación con la seguridad de los recintos y organizadores",
        "Acompañamientos puntuales: compras, traslados sensibles",
      ],
      pt: [
        "Guarda-costas profissionais, à civil",
        "Motoristas de segurança e veículos adequados",
        "Proteção em eventos, festas e deslocações",
        "Dispositivos para famílias e personalidades expostas",
        "Coordenação com a segurança dos locais e organizadores",
        "Acompanhamentos pontuais: compras, transferes sensíveis",
      ],
    },
    faq: {
      fr: [
        {
          q: "Pour qui est ce service ?",
          a: "Dirigeants, personnalités, familles, invités de marque : toute personne qui souhaite profiter d'un événement ou d'un séjour l'esprit libre.",
        },
        {
          q: "La protection est-elle visible ?",
          a: "Seulement si vous le souhaitez. Par défaut, nos professionnels opèrent en tenue civile, à la bonne distance : présents pour vous, invisibles pour les autres.",
        },
        {
          q: "En combien de temps un dispositif se met-il en place ?",
          a: "Un accompagnement simple s'organise souvent en 24 à 48 heures. Les dispositifs plus complets demandent quelques jours de préparation.",
        },
      ],
      en: [
        {
          q: "Who is this service for?",
          a: "Executives, public figures, families, distinguished guests: anyone who wants to enjoy an event or a stay with complete peace of mind.",
        },
        {
          q: "Is the protection visible?",
          a: "Only if you want it to be. By default, our professionals operate in plain clothes, at the right distance: present for you, invisible to others.",
        },
        {
          q: "How quickly can protection be arranged?",
          a: "A simple escort is often arranged within 24 to 48 hours. Fuller arrangements take a few days of preparation.",
        },
      ],
      es: [
        {
          q: "¿Para quién es este servicio?",
          a: "Directivos, personalidades, familias, invitados de honor: cualquier persona que quiera disfrutar de un evento o una estancia con total tranquilidad.",
        },
        {
          q: "¿La protección es visible?",
          a: "Solo si usted lo desea. Por defecto, nuestros profesionales operan de paisano, a la distancia justa: presentes para usted, invisibles para los demás.",
        },
        {
          q: "¿En cuánto tiempo se organiza un dispositivo?",
          a: "Un acompañamiento sencillo se organiza a menudo en 24 a 48 horas. Los dispositivos más completos requieren unos días de preparación.",
        },
      ],
      pt: [
        {
          q: "Para quem é este serviço?",
          a: "Executivos, personalidades, famílias, convidados de honra: qualquer pessoa que queira desfrutar de um evento ou estadia de espírito livre.",
        },
        {
          q: "A proteção é visível?",
          a: "Só se assim o desejar. Por defeito, os nossos profissionais operam à civil, à distância certa: presentes para si, invisíveis para os outros.",
        },
        {
          q: "Em quanto tempo se monta um dispositivo?",
          a: "Um acompanhamento simples organiza-se muitas vezes em 24 a 48 horas. Dispositivos mais completos pedem alguns dias de preparação.",
        },
      ],
    },
  },

  voyages: {
    intro: {
      fr: "Dites la destination, ou simplement l'envie. Nous dessinons l'itinéraire, réservons les maisons, plaçons les expériences et restons joignables à chaque instant du voyage.",
      en: "Name the destination, or simply the desire. We draw the itinerary, book the houses, place the experiences and remain reachable at every moment of the journey.",
      es: "Diga el destino, o simplemente el deseo. Dibujamos el itinerario, reservamos las casas, colocamos las experiencias y seguimos localizables en cada instante del viaje.",
      pt: "Diga o destino, ou simplesmente o desejo. Desenhamos o itinerário, reservamos as casas, colocamos as experiências e ficamos contactáveis em cada instante da viagem.",
    },
    orchestrations: {
      fr: [
        "Itinéraires complets, dessinés autour de vos envies",
        "Villas d'exception avec staff : chef, majordome, ménage",
        "Vols, transferts et logistique de bout en bout",
        "Expériences privées : guides, visites à huis clos, sorties en mer",
        "Conciergerie 24/7 pendant tout le séjour",
        "Voyages de groupe, familles et occasions spéciales",
      ],
      en: [
        "Complete itineraries drawn around your wishes",
        "Exceptional villas with staff: chef, butler, housekeeping",
        "Flights, transfers and end-to-end logistics",
        "Private experiences: guides, closed-door visits, days at sea",
        "24/7 concierge throughout the stay",
        "Group trips, families and special occasions",
      ],
      es: [
        "Itinerarios completos, dibujados en torno a sus deseos",
        "Villas excepcionales con personal: chef, mayordomo, limpieza",
        "Vuelos, traslados y logística de principio a fin",
        "Experiencias privadas: guías, visitas a puerta cerrada, salidas al mar",
        "Conserjería 24/7 durante toda la estancia",
        "Viajes de grupo, familias y ocasiones especiales",
      ],
      pt: [
        "Itinerários completos, desenhados em torno dos seus desejos",
        "Villas excecionais com staff: chef, mordomo, limpeza",
        "Voos, transferes e logística de ponta a ponta",
        "Experiências privadas: guias, visitas à porta fechada, saídas ao mar",
        "Concierge 24/7 durante toda a estadia",
        "Viagens de grupo, famílias e ocasiões especiais",
      ],
    },
    faq: {
      fr: [
        {
          q: "Comment commence un voyage sur mesure ?",
          a: "Par une conversation : vos dates, vos envies, votre rythme. Une proposition détaillée arrive sous 48 heures, que nous affinons ensemble jusqu'à ce qu'elle soit exactement vous.",
        },
        {
          q: "Que se passe-t-il si quelque chose change en cours de séjour ?",
          a: "Vous nous écrivez, nous réorganisons. Restaurant, bateau, horaire de vol : la conciergerie reste active 24/7 pendant tout le voyage.",
        },
        {
          q: "Organisez-vous des voyages de groupe ?",
          a: "Oui, des anniversaires entre amis aux voyages multi-générations, avec une logistique pensée pour que chacun vive le séjour à son rythme.",
        },
      ],
      en: [
        {
          q: "How does a bespoke trip start?",
          a: "With a conversation: your dates, your wishes, your pace. A detailed proposal arrives within 48 hours, refined together until it is exactly you.",
        },
        {
          q: "What if something changes during the stay?",
          a: "You write to us, we rearrange. Restaurant, boat, flight time: the concierge stays active 24/7 throughout the journey.",
        },
        {
          q: "Do you organise group trips?",
          a: "Yes, from birthdays with friends to multi-generation journeys, with logistics designed so everyone lives the trip at their own pace.",
        },
      ],
      es: [
        {
          q: "¿Cómo empieza un viaje a medida?",
          a: "Con una conversación: sus fechas, sus deseos, su ritmo. Una propuesta detallada llega en 48 horas, y la afinamos juntos hasta que sea exactamente usted.",
        },
        {
          q: "¿Y si algo cambia durante la estancia?",
          a: "Nos escribe y lo reorganizamos. Restaurante, barco, horario de vuelo: la conserjería sigue activa 24/7 durante todo el viaje.",
        },
        {
          q: "¿Organizan viajes de grupo?",
          a: "Sí, de cumpleaños entre amigos a viajes multigeneracionales, con una logística pensada para que cada uno viva el viaje a su ritmo.",
        },
      ],
      pt: [
        {
          q: "Como começa uma viagem à medida?",
          a: "Com uma conversa: as suas datas, os seus desejos, o seu ritmo. Uma proposta detalhada chega em 48 horas, afinada em conjunto até ser exatamente você.",
        },
        {
          q: "E se algo mudar durante a estadia?",
          a: "Escreve-nos e nós reorganizamos. Restaurante, barco, horário de voo: o concierge fica ativo 24/7 durante toda a viagem.",
        },
        {
          q: "Organizam viagens de grupo?",
          a: "Sim, de aniversários entre amigos a viagens multigeracionais, com uma logística pensada para que cada um viva a viagem ao seu ritmo.",
        },
      ],
    },
  },

};
