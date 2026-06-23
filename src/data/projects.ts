export type ProjectFeature = {
  icon: string
  title: string
  description: string
}

export type ProjectNearby = {
  icon: string
  title: string
  description: string
}

export type FloorPlan = {
  title: string
  image: string
  rooms: { name: string; area: string }[]
}

export type ProjectDetails = {
  description: string[]
  specs: {
    address: string
    area: string
    floors: string
    category: string
    year: string
    status: string
  }
  features: ProjectFeature[]
  nearby: ProjectNearby[]
  advantage: string
  floorPlans?: FloorPlan[]
}

export type Project = {
  slug: string
  title: string
  category: string
  area: string
  location: string
  image: string
  status: 'active' | 'sold'
  details?: ProjectDetails
}

const alandalusDetails: ProjectDetails = {
  description: [
    'Alandalus — жилой комплекс компании Renaissance development, возведённый в спокойном и обжитом Мирзо-Улугбекском районе Ташкента. Название отсылает к Аль-Андалусу — цивилизации, которая умела сочетать архитектурную точность с человеческим теплом. Именно этот принцип лежит в основе каждого решения проекта.',
    'Конструкция дома рассчитана на десятилетия: монолитно-бетонный каркас и кирпичный фасад — классическая схема, которая держит тепло зимой, прохладу летом и не требует капитального ремонта через пятнадцать лет.',
  ],
  specs: {
    address: 'Ташкент, Мирзо-Улугбекский район',
    area: '0,75 гектар',
    floors: '10 этажей',
    category: 'Комфорт',
    year: '2027',
    status: 'Строится',
  },
  advantage: 'Тихий дом в большом городе',
  features: [
    { icon: 'home', title: 'Дом из газоблока', description: 'Современный строительный материал с хорошими теплоизоляционными свойствами. Помогает удерживать тёплую температуру в доме в течение всего года.' },
    { icon: 'car', title: 'Парковка', description: 'Для жителей нашего комплекса удобная парковка в наружной части территории. Это обеспечивает «безопасность» для автомобилей в ночное время.' },
    { icon: 'tree', title: 'Детская площадка', description: 'Специальное игровое пространство для детей разных возрастов. Безопасное и интересное место для игр на свежем воздухе.' },
    { icon: 'ceiling', title: 'Потолки 3,10 метра', description: 'Просторные помещения с большим количеством света и воздуха.' },
    { icon: 'leaf', title: 'Озеленение и аллеи', description: 'Территория комплекса украшена аллеями и зелёными насаждениями. Здесь можно отдохнуть от городской суеты и насладиться природой.' },
    { icon: 'sun', title: 'Зоны отдыха', description: 'Зелёные пространства для совместного проживания жителей. Здесь всегда приятно погулять, побеседовать с соседями или провести время на свежем воздухе.' },
  ],
  nearby: [
    { icon: 'sparkles', title: 'ПАРКИ', description: 'Ашхабад парк, Eco Park, Янги Узбекистон парк' },
    { icon: 'graduation', title: 'ОБРАЗОВАНИЕ', description: 'Детские сады. Учебные центры, Частные школы. Школы 340' },
    { icon: 'bus', title: 'ТРАНСПОРТ', description: 'Близость к центру города. Метро и остановки в доступности. Удобный выезд на основные дороги' },
    { icon: 'cart', title: 'ТОРГОВЫЕ ЦЕНТРЫ', description: 'Магазины у дома. Супермаркеты, Торговые зоны (Янгиабад базар, РАБАД базар, КАРАСУ базар)' },
    { icon: 'moon', title: 'МЕЧЕТЫ', description: 'Абдурахмон ибн Авф жоме масжиди' },
    { icon: 'star', title: 'КОМФОРТ ЖИЗНИ', description: 'Зеленая зона. Тихий район. Удобно для семьи' },
  ],
}

const vatanDetails: ProjectDetails = {
  description: [
    'VATAN VILLAGE — жилой комплекс Renaissance development в Мирзо-Улугбекском районе Ташкента, на улице Янги Узбекистон. Малоэтажная застройка с собственным двором, охраняемой территорией и продуманными планировками — пространство для комфортной жизни большой семьи.',
    'Дома возведены по монолитно-кирпичной технологии: прочный каркас, тёплый фасад и материалы собственного производства. Закрытая территория, зоны отдыха, барбекю-зона и парковка — всё для спокойной жизни в зелёном квартале рядом с центром.',
  ],
  specs: {
    address: 'Ташкент, Мирзо-Улугбекский район, ул. Янги Узбекистон',
    area: 'от 26 м²',
    floors: '2 этажа + подвал',
    category: 'Комфорт+',
    year: '2026',
    status: 'В продаже',
  },
  advantage: 'Дом для большой семьи',
  features: [
    { icon: 'home', title: 'Кирпичный дом', description: 'Надёжные кирпичные стены: прочность на десятилетия, хорошая тепло- и звукоизоляция в любое время года.' },
    { icon: 'tree', title: 'Закрытая охраняемая территория', description: 'Огороженный двор с круглосуточной охраной и видеонаблюдением — спокойствие и безопасность для всей семьи.' },
    { icon: 'ceiling', title: 'Монолитный каркас', description: 'Монолитно-бетонный каркас из материалов собственного завода — устойчивость конструкции и свобода планировок.' },
    { icon: 'sun', title: 'Близость к центру', description: 'Удобное расположение в Мирзо-Улугбекском районе: до центра города и основных дорог — считанные минуты.' },
    { icon: 'leaf', title: 'Барбекю-зона', description: 'Собственное пространство для семейных ужинов и отдыха на свежем воздухе во дворе комплекса.' },
    { icon: 'car', title: 'Парковка для автомобиля', description: 'Удобное парковочное место на территории участка — для жителей и их гостей.' },
  ],
  nearby: [
    { icon: 'sparkles', title: 'ПАРКИ', description: 'Ашхабад парк, Eco Park, Янги Узбекистон парк' },
    { icon: 'graduation', title: 'ОБРАЗОВАНИЕ', description: 'Детские сады, учебные центры, частные школы, школа №340' },
    { icon: 'bus', title: 'ТРАНСПОРТ', description: 'Близость к центру города, метро и остановки в доступности, удобный выезд на основные дороги' },
    { icon: 'cart', title: 'ТОРГОВЫЕ ЦЕНТРЫ', description: 'Магазины у дома, супермаркеты, торговые зоны (Янгиабад базар, РАБАД базар, КАРАСУ базар)' },
    { icon: 'moon', title: 'МЕЧЕТИ', description: 'Абдурахмон ибн Авф жоме масжиди' },
    { icon: 'star', title: 'КОМФОРТ ЖИЗНИ', description: 'Зелёная зона, тихий район, удобно для семьи' },
  ],
  floorPlans: [
    {
      title: 'План подвального этажа на отм',
      image: '/assets/vatan-plan-1.png',
      rooms: [
        { name: 'Подсобное помещение', area: '76.5 м2' },
        { name: 'Холл', area: '19.6 м2' },
        { name: 'Коридор', area: '4.7 м2' },
        { name: 'Комната', area: '23.5 м2' },
        { name: 'Комната', area: '10.2 м2' },
        { name: 'Тамбур', area: '4.8 м2' },
      ],
    },
    {
      title: 'План 1-го этажа на отм.',
      image: '/assets/vatan-plan-2.png',
      rooms: [
        { name: 'Коридор', area: '24.0 м2' },
        { name: 'Кухня', area: '34.7 м2' },
        { name: 'Общий санузел', area: '4.5 м2' },
        { name: 'С/у', area: '4.0 м2' },
        { name: 'Спальня', area: '27.0 м2' },
        { name: 'Гостиная', area: '41.4 м2' },
      ],
    },
    {
      title: 'План 2-го этажа на отм.',
      image: '/assets/vatan-plan-3.png',
      rooms: [
        { name: 'Холл', area: '24.0 м2' },
        { name: 'Спальня', area: '34.7 м2' },
        { name: 'Общий санузел', area: '4.5 м2' },
        { name: 'С/у', area: '4.0 м2' },
        { name: 'Гостиная', area: '27.0 м2' },
        { name: 'Спальня', area: '24.0 м2' },
        { name: 'Спальня', area: '16.7 м2' },
      ],
    },
  ],
}

export const projects: Project[] = [
  {
    slug: 'alandalus',
    title: 'ALANDALUS',
    category: 'Жилой комплекс · Комфорт+',
    area: 'от 26.44 до 30,81 м²',
    location: 'Юкоричирчикский район, улица Янги Узбекистон',
    image: '/assets/project-alandalus.png',
    status: 'active',
    details: alandalusDetails,
  },
  {
    slug: 'botanika-luxury',
    title: 'BOTANIKA LUXURY',
    category: 'Жилой комплекс · Комфорт+',
    area: 'от 26.44 до 30,81 м²',
    location: 'Мирзо-Улугбекский район, тупик Немат, 197, Ташкент',
    image: '/assets/project-botanika.png',
    status: 'active',
  },
  {
    slug: 'vatan-village',
    title: 'VATAN VILLAGE',
    category: 'Жилой комплекс · Комфорт+',
    area: 'от 26.44 до 30,81 м²',
    location: 'Мирзо-Улугбекский район, улица Янги Узбекистон',
    image: '/assets/project-vatan.png',
    status: 'active',
    details: vatanDetails,
  },
  {
    slug: 'turon',
    title: 'TURON',
    category: 'Жилой комплекс · Комфорт+',
    area: 'от 26.44 до 30,81 м²',
    location: 'Мирзо-Улугбекский район, улица Янги Узбекистон',
    image: '/assets/project-turon.png',
    status: 'active',
  },
  {
    slug: 'challet-resort',
    title: 'CHALLET RESORT',
    category: 'Жилой комплекс · Комфорт',
    area: 'от 26.44 до 30,81 м²',
    location: 'Юсуфхона, 60 минут от Ташкента',
    image: '/assets/project-chalet.png',
    status: 'sold',
  },
  {
    slug: 'western-housing',
    title: 'WESTERN HOUSING',
    category: 'Жилой комплекс · Комфорт',
    area: 'от 26.44 до 30,81 м²',
    location: 'г. Ташкент, Сергелийский р-н, м-в Куйлюк-5, махалля Халкабод',
    image: '/assets/project-western.png',
    status: 'sold',
  },
]
