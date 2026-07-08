/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, TeamMember, NewsItem, Adhesion } from '@/types';

export const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Caravane MÃ©dicale Mobile - Gafsa Nord & Sened',
    description: 'Une unitÃ© mÃ©dicale pluridisciplinaire mobile offrant des consultations gratuites, des mÃ©dicaments et un suivi pÃ©diatrique/gynÃ©cologique pour les communautÃ©s rurales isolÃ©es.',
    category: 'SantÃ© et PrÃ©vention',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2026-06-15',
    location: 'Sened, Gafsa',
    targetAmount: 15000,
    raisedAmount: 12450,
    beneficiaries: 1200,
    status: 'active',
    details: 'Ce projet a pour but de briser l\'isolement mÃ©dical des habitants des montagnes de Sened et de Gafsa Nord. GrÃ¢ce Ã  l\'engagement de mÃ©decins bÃ©nÃ©voles du Croissant-Rouge et de partenaires locaux, nous fournissons des soins en pÃ©diatrie, cardiologie et mÃ©decine gÃ©nÃ©rale directement sur le terrain.'
  },
  {
    id: 'act-2',
    title: 'OpÃ©ration Chaleur Hivernale - Bassin Minier',
    description: 'Distribution de couvertures, vÃªtements chauds et chauffages d\'appoint pour les familles nÃ©cessiteuses de Redeyef, Moulares et Mdhilla durant les vagues de grand froid.',
    category: 'Aide Humanitaire',
    image: 'https://images.unsplash.com/photo-1481143179273-c47e22686a4c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1481143179273-c47e22686a4c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2026-12-05',
    location: 'Redeyef, Moulares, Mdhilla',
    targetAmount: 20000,
    raisedAmount: 20000,
    beneficiaries: 850,
    status: 'completed',
    details: 'Chaque hiver, les tempÃ©ratures chutent drastiquement dans les zones montagneuses du bassin minier. L\'OpÃ©ration Chaleur Hivernale mobilise nos Ã©quipes pour empaqueter et distribuer des kits de survie thermique pour rÃ©chauffer les foyers vulnÃ©rables.'
  },
  {
    id: 'act-3',
    title: 'Soutien Alimentaire - SolidaritÃ© Ramadan 2026',
    description: 'Distribution de paniers de denrÃ©es alimentaires de base aux familles nÃ©cessiteuses et organisation de tables de rupture du jeÃ»ne solidaires dans toute la rÃ©gion de Gafsa.',
    category: 'Aide Sociale',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1541802645635-11f2286a74fb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2026-03-10',
    location: 'Toute la rÃ©gion de Gafsa',
    targetAmount: 30000,
    raisedAmount: 26800,
    beneficiaries: 2300,
    status: 'active',
    details: 'La campagne de solidaritÃ© Ramadan est un pilier annuel de notre action sociale. Nos bÃ©nÃ©voles prÃ©parent des paniers contenant de la semoule, de l\'huile, des dattes, des pÃ¢tes et du lait pour assurer la sÃ©curitÃ© alimentaire des familles touchÃ©es par la prÃ©caritÃ© Ã©conomique.'
  },
  {
    id: 'act-4',
    title: 'Formations d\'Urgence aux Premiers Secours',
    description: 'Sessions de formation intensive destinÃ©es au grand public, aux lycÃ©ens et aux ouvriers des usines de phosphate pour maÃ®triser les gestes de premiers secours face aux accidents.',
    category: 'Formation & Jeunesse',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502740479091-6398b19dc09f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2026-05-20',
    location: 'Centre de Formation CRM Gafsa',
    targetAmount: 5000,
    raisedAmount: 5200,
    beneficiaries: 450,
    status: 'completed',
    details: 'Former le citoyen d\'aujourd\'hui pour sauver des vies demain. Nos moniteurs certifiÃ©s animent des ateliers interactifs avec mannequins de rÃ©animation et dÃ©fibrillateurs d\'entraÃ®nement pour enseigner la PLS, le massage cardiaque et l\'obstruction des voies aÃ©riennes.'
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Dr. Ahmed Belkacem',
    role: 'PrÃ©sident du ComitÃ© RÃ©gional',
    category: 'board',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    email: 'a.belkacem@croissantrouge-gafsa.org.tn',
    phone: '+216 76 225 101'
  },
  {
    id: 'tm-2',
    name: 'Sonia Mansour',
    role: 'SecrÃ©taire GÃ©nÃ©rale',
    category: 'board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    email: 's.mansour@croissantrouge-gafsa.org.tn',
    phone: '+216 76 225 102'
  },
  {
    id: 'tm-3',
    name: 'Fethi Bouazzi',
    role: 'TrÃ©sorier GÃ©nÃ©ral',
    category: 'board',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    email: 'f.bouazzi@croissantrouge-gafsa.org.tn'
  },
  {
    id: 'tm-4',
    name: 'Ramzi Guesmi',
    role: 'Directeur rÃ©gional des Secouristes',
    category: 'coordination',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    email: 'r.guesmi@croissantrouge-gafsa.org.tn',
    phone: '+216 98 456 123'
  },
  {
    id: 'tm-5',
    name: 'Amira Jallouli',
    role: 'Responsable Jeunesse & Volontariat',
    category: 'coordination',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    email: 'a.jallouli@croissantrouge-gafsa.org.tn'
  },
  {
    id: 'tm-6',
    name: 'Dr. Yassine Cherif',
    role: 'Coordonnateur MÃ©dical Urgentiste',
    category: 'medical',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'y.cherif@croissantrouge-gafsa.org.tn'
  },
  {
    id: 'tm-7',
    name: 'Leila Amdouni',
    role: 'InfirmiÃ¨re Major Volontaire',
    category: 'medical',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tm-8',
    name: 'Mounir Rtibi',
    role: 'Chef d\'Ã‰quipe d\'Intervention Rapide',
    category: 'field',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tm-9',
    name: 'Mariem Dhahri',
    role: 'Logistienne de Distribution',
    category: 'field',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
  }
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Inondations Ã  Metlaoui : Nos Ã©quipes de secourisme mobilisÃ©es d\'urgence',
    summary: 'Suite aux fortes pluies torrentielles qui ont frappÃ© le bassin minier de Metlaoui, nos volontaires sont intervenus pour secourir les familles bloquÃ©es et distribuer des repas chauds.',
    content: 'Les intempÃ©ries exceptionnelles de ces derniers jours ont provoquÃ© la crue de l\'Oued de Metlaoui, inondant plusieurs habitations de la pÃ©riphÃ©rie. Alerte donnÃ©e Ã  2h du matin, le ComitÃ© de Gafsa du Croissant-Rouge a dÃ©pÃªchÃ© trois Ã©quipes d\'intervention rapide Ã©quipÃ©es de vÃ©hicules 4x4. En coordination avec la Protection Civile, plus de 45 familles ont Ã©tÃ© Ã©vacuÃ©es temporairement vers des centres d\'hÃ©bergement d\'urgence. Nos secouristes ont Ã©galement mis en place un point d\'aide sociale distribuant couvertures, produits d\'hygiÃ¨ne et repas chauds.',
    date: '2026-06-28',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
    views: 345
  },
  {
    id: 'news-2',
    title: 'SuccÃ¨s de la Caravane de Don de Sang Ã  l\'Institut SupÃ©rieur des Sciences AppliquÃ©es',
    summary: 'Plus de 150 poches de sang collectÃ©es grÃ¢ce Ã  la mobilisation des Ã©tudiants et enseignants de l\'ISSAT Gafsa en partenariat avec le Centre National de Transfusion Sanguine.',
    content: 'Face aux besoins cruciaux en produits sanguins signalÃ©s par l\'HÃ´pital RÃ©gional de Gafsa, la commission de jeunesse du Croissant-Rouge a organisÃ© une grande caravane de don de sang Ã  l\'ISSAT Gafsa. Une campagne de sensibilisation intense menÃ©e sur le campus a permis d\'attirer de nombreux primo-donneurs. "C\'est un geste d\'humanitÃ© pur qui sauve des vies dans notre rÃ©gion", tÃ©moigne Sonia, Ã©tudiante en gÃ©nie civil. Un grand merci Ã  tous les donateurs et Ã  l\'Ã©quipe mÃ©dicale mobilisÃ©e.',
    date: '2026-05-14',
    image: 'https://images.unsplash.com/photo-1615461066841-6116ecdccd04?auto=format&fit=crop&q=80&w=1200',
    views: 218
  },
  {
    id: 'news-3',
    title: 'JournÃ©e Mondiale du Croissant-Rouge et de la Croix-Rouge Ã  Gafsa',
    summary: 'Ateliers de sensibilisation, dÃ©monstrations publiques de secourisme au centre-ville et distinction des bÃ©nÃ©voles d\'exception pour l\'annÃ©e 2025.',
    content: 'Le 8 mai, le comitÃ© rÃ©gional a cÃ©lÃ©brÃ© la JournÃ©e mondiale sous le thÃ¨me "Tout ce que nous faisons vient du cÅ“ur". La place centrale de Gafsa s\'est transformÃ©e en un village humanitaire Ã©phÃ©mÃ¨re. Les citoyens ont pu participer Ã  des simulations d\'accidents domestiques pour apprendre Ã  rÃ©agir, tandis que nos jeunes volontaires animaient des ateliers crÃ©atifs pour les enfants. La journÃ©e s\'est clÃ´turÃ©e par une cÃ©rÃ©monie Ã©mouvante rendant hommage Ã  15 bÃ©nÃ©voles historiques de la rÃ©gion.',
    date: '2026-05-08',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
    views: 412
  }
];

export const DEFAULT_ADHESIONS: Adhesion[] = [
  {
    id: 'adh-1',
    firstName: 'Mohamed',
    lastName: 'Mansouri',
    email: 'm.mansouri@gmail.com',
    phone: '+216 97 884 551',
    birthDate: '2001-08-12',
    city: 'Gafsa Ville',
    profession: 'Ã‰tudiant en Sciences InfirmiÃ¨res',
    interests: ['Secourisme', 'MÃ©dical'],
    preferredSlots: ['Week-end'],
    status: 'pending',
    createdAt: '2026-07-01T14:22:10.000Z'
  },
  {
    id: 'adh-2',
    firstName: 'Yasmine',
    lastName: 'Trabelsi',
    email: 'yasmine.trab@outlook.com',
    phone: '+216 55 412 990',
    birthDate: '1995-11-23',
    city: 'Metlaoui',
    profession: 'Enseignante du secondaire',
    interests: ['Aide sociale', 'Sensibilisation'],
    preferredSlots: ['AprÃ¨s-midis en semaine'],
    status: 'approved',
    createdAt: '2026-06-25T09:15:30.000Z'
  },
  {
    id: 'adh-3',
    firstName: 'Ahmed',
    lastName: 'Gharbi',
    email: 'ahmed.gharbi@yahoo.fr',
    phone: '+216 22 103 448',
    birthDate: '1989-04-30',
    city: 'Redeyef',
    profession: 'Technicien SupÃ©rieur Compagnie des Phosphates de Gafsa (CPG)',
    interests: ['Logistique', 'Secourisme'],
    preferredSlots: ['Matins en semaine', 'Week-end'],
    status: 'approved',
    createdAt: '2026-06-20T17:40:00.000Z'
  },
  {
    id: 'adh-4',
    firstName: 'Faten',
    lastName: 'Nefzi',
    email: 'faten.nefzi99@gmail.com',
    phone: '+216 94 332 110',
    birthDate: '1999-01-15',
    city: 'Mdhilla',
    profession: 'Psychologue clinicienne (DiplÃ´mÃ©e)',
    interests: ['Soutien psychologique', 'Aide sociale'],
    preferredSlots: ['AprÃ¨s-midis en semaine'],
    status: 'pending',
    createdAt: '2026-07-02T11:05:00.000Z'
  }
];
