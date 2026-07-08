require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL || ''),
});

const activities = [
  {
    id: 'act-1',
    title: 'Caravane medicale mobile - Gafsa Nord & Sened',
    description:
      'Une unite medicale mobile offre des consultations gratuites, des medicaments et un suivi pediatrique et gynecologique pour les communautes rurales isolees.',
    category: 'Sante et Prevention',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200',
    ],
    date: '2026-06-15',
    location: 'Sened, Gafsa',
    targetAmount: 15000,
    raisedAmount: 12450,
    beneficiaries: 1200,
    status: 'active',
    details:
      'Ce projet aide a briser l’isolement medical des habitants de Sened et de Gafsa Nord grace a des consultations en pediatrie, cardiologie et medecine generale.',
  },
  {
    id: 'act-2',
    title: 'Operation chaleur hivernale - bassin minier',
    description:
      'Distribution de couvertures, vetements chauds et chauffages d’appoint pour les familles necessiteuses de Redeyef, Moulares et Mdhilla.',
    category: 'Aide Humanitaire',
    image:
      'https://images.unsplash.com/photo-1481143179273-c47e22686a4c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1481143179273-c47e22686a4c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200',
    ],
    date: '2026-12-05',
    location: 'Redeyef, Moulares, Mdhilla',
    targetAmount: 20000,
    raisedAmount: 20000,
    beneficiaries: 850,
    status: 'completed',
    details:
      'L’operation mobilise nos equipes pour distribuer des kits de survie thermique pendant les vagues de grand froid.',
  },
  {
    id: 'act-3',
    title: 'Soutien alimentaire - solidarite Ramadan 2026',
    description:
      'Distribution de paniers alimentaires de base et organisation de tables de rupture du jeun solidaires dans la region de Gafsa.',
    category: 'Aide Sociale',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1541802645635-11f2286a74fb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    ],
    date: '2026-03-10',
    location: 'Toute la region de Gafsa',
    targetAmount: 30000,
    raisedAmount: 26800,
    beneficiaries: 2300,
    status: 'active',
    details:
      'La campagne de solidarite Ramadan soutient chaque annee les familles touchees par la precarite economique.',
  },
  {
    id: 'act-4',
    title: 'Formations d’urgence aux premiers secours',
    description:
      'Sessions de formation pour le grand public, les lyceens et les ouvriers afin de maitriser les gestes qui sauvent.',
    category: 'Formation et Jeunesse',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502740479091-6398b19dc09f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    ],
    date: '2026-05-20',
    location: 'Centre de formation CRM Gafsa',
    targetAmount: 5000,
    raisedAmount: 5200,
    beneficiaries: 450,
    status: 'completed',
    details:
      'Les ateliers couvrent la PLS, le massage cardiaque et les gestes de premiere urgence avec du materiel pedagogique.',
  },
];

const news = [
  {
    id: 'news-1',
    title: 'Inondations a Metlaoui : nos equipes mobilisees d’urgence',
    summary:
      'Apres les fortes pluies, nos volontaires sont intervenus pour secourir les familles bloquees et distribuer des repas chauds.',
    content:
      'Les intemperies ont provoque la crue de plusieurs oueds. Nos equipes ont ete deployees avec la Protection Civile pour evacuer des familles et distribuer des couvertures, des produits d’hygiene et des repas chauds.',
    date: '2026-06-28',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
    views: 345,
  },
  {
    id: 'news-2',
    title: 'Succes de la caravane de don de sang a l’ISSAT Gafsa',
    summary:
      'Plus de 150 poches de sang ont ete collectees grace a la mobilisation des etudiants et enseignants.',
    content:
      'La commission jeunesse a organise une grande caravane de don de sang avec une sensibilisation sur le campus et un appui medical sur place.',
    date: '2026-05-14',
    image:
      'https://images.unsplash.com/photo-1615461066841-6116ecdccd04?auto=format&fit=crop&q=80&w=1200',
    views: 218,
  },
  {
    id: 'news-3',
    title: 'Journee mondiale du Croissant-Rouge a Gafsa',
    summary:
      'Ateliers, demonstrations de secourisme et hommage aux benevoles historiques de la region.',
    content:
      'La journee a reuni citoyens, jeunes volontaires et equipe medicale autour d’animations de sensibilisation et d’une ceremonie de reconnaissance.',
    date: '2026-05-08',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
    views: 412,
  },
];

const team = [
  {
    id: 'tm-1',
    name: 'Dr. Ahmed Belkacem',
    role: 'President du Comite Regional',
    category: 'board',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    email: 'a.belkacem@croissantrouge-gafsa.org.tn',
    phone: '+216 76 225 101',
  },
  {
    id: 'tm-2',
    name: 'Sonia Mansour',
    role: 'Secretaire Generale',
    category: 'board',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    email: 's.mansour@croissantrouge-gafsa.org.tn',
    phone: '+216 76 225 102',
  },
  {
    id: 'tm-3',
    name: 'Fethi Bouazzi',
    role: 'Tresorier General',
    category: 'board',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    email: 'f.bouazzi@croissantrouge-gafsa.org.tn',
  },
  {
    id: 'tm-4',
    name: 'Ramzi Guesmi',
    role: 'Directeur regional des Secouristes',
    category: 'coordination',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    email: 'r.guesmi@croissantrouge-gafsa.org.tn',
    phone: '+216 98 456 123',
  },
  {
    id: 'tm-5',
    name: 'Amira Jallouli',
    role: 'Responsable Jeunesse et Volontariat',
    category: 'coordination',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    email: 'a.jallouli@croissantrouge-gafsa.org.tn',
  },
  {
    id: 'tm-6',
    name: 'Dr. Yassine Cherif',
    role: 'Coordonnateur Medical Urgentiste',
    category: 'medical',
    avatar:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'y.cherif@croissantrouge-gafsa.org.tn',
  },
  {
    id: 'tm-7',
    name: 'Leila Amdouni',
    role: 'Infirmiere Major Volontaire',
    category: 'medical',
    avatar:
      'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'tm-8',
    name: 'Mounir Rtibi',
    role: "Chef d’equipe d’intervention rapide",
    category: 'field',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'tm-9',
    name: 'Mariem Dhahri',
    role: 'Logistienne de distribution',
    category: 'field',
    avatar:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
  },
];

const homeHero = {
  id: 'hero',
  badge: 'Établi à Gafsa',
  title: 'Mission Hiver Solidaire',
  location: 'Djebel el Ank, Gafsa',
  description:
    "Chaque hiver, l'Opération Chaleur Hivernale à Djebel el Ank apporte chaleur et réconfort aux familles isolées des montagnes de Gafsa. Grâce à votre générosité, nous distribuons des couvertures épaisses, des vêtements chauds, des chauffages et du matériel d'isolation thermique pour affronter les températures extrêmes.",
  image:
    'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=80',
};

async function seedIfMissing(checkFn, createFn, data) {
  for (const item of data) {
    const exists = await checkFn(item.id);
    if (!exists) {
      await createFn(item);
    }
  }
}

async function ensureActivityGalleries(data) {
  for (const item of data) {
    const existing = await prisma.activity.findUnique({ where: { id: item.id } });
    if (existing && (!Array.isArray(existing.gallery) || existing.gallery.length === 0)) {
      await prisma.activity.update({
        where: { id: item.id },
        data: { gallery: item.gallery || [item.image] },
      });
    }
  }
}

async function main() {
  const homeHeroModel = prisma.homeHeroSetting || prisma.homeHeroSettings;
  if (homeHeroModel) {
    await homeHeroModel.upsert({
      where: { id: homeHero.id },
      create: homeHero,
      update: homeHero,
    });
  }

  await ensureActivityGalleries(activities);

  await seedIfMissing(
    (id) => prisma.activity.findUnique({ where: { id } }),
    (item) => prisma.activity.create({ data: item }),
    activities,
  );

  await seedIfMissing(
    (id) => prisma.newsItem.findUnique({ where: { id } }),
    (item) => prisma.newsItem.create({ data: item }),
    news,
  );

  await seedIfMissing(
    (id) => prisma.teamMember.findUnique({ where: { id } }),
    (item) => prisma.teamMember.create({ data: item }),
    team,
  );

  const admin = await prisma.adminUser.findUnique({ where: { username: 'admin' } });
  if (!admin) {
    const password = await bcrypt.hash('croissantrouge', 10);
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        password,
        name: 'Dr. Ahmed Belkacem',
        role: 'President du Comite Regional',
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
