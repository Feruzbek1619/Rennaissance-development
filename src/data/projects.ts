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
