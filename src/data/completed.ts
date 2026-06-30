// Completed / handed-over projects — showcase only (no sales CTAs). Data and
// photos sourced from the client's site renaissancebuildingcompany.uz.

export type CompletedSpec = { label: string; value: string }
export type CompletedNearby = { label: string; time: string }

export type CompletedProject = {
  slug: string
  title: string
  /** Short eyebrow above the title, e.g. district / type. */
  eyebrow: string
  location: string
  hero: string
  gallery: string[]
  description: string[]
  specs: CompletedSpec[]
  nearby: CompletedNearby[]
  /** Map position [lat, lng]. */
  coords?: [number, number]
}

export const completedProjects: CompletedProject[] = [
  {
    slug: 'western-housing',
    title: 'WESTERN HOUSING',
    eyebrow: 'Жилой комплекс · Сергелийский район',
    location: 'Ташкент, Сергелийский район, Куйлюк-5, махалля Халкабод',
    hero: '/assets/western-6.webp',
    gallery: [
      '/assets/western-1.webp',
      '/assets/western-4.webp',
      '/assets/western-3.webp',
      '/assets/western-5.webp',
      '/assets/western-7.webp',
      '/assets/western-8.webp',
    ],
    description: [
      'Western Housing — современный жилой комплекс в Сергелийском районе Ташкента, в махалле Халкабод (Куйлюк-5). Девять этажей плюс мансардный уровень и 300 квартир. Объект полностью сдан и заселён.',
      'Продуманные планировки, качественная отделка, благоустроенный закрытый двор с парковкой и детской площадкой. Вся необходимая инфраструктура — школы, детские сады, аптеки, рынок и метро — в шаговой доступности.',
    ],
    specs: [
      { label: 'Этажность', value: '9 этажей + мансарда' },
      { label: 'Квартир', value: '300' },
      { label: 'Территория', value: '0,61 гектара' },
      { label: 'Площадь квартир', value: '16 425 м²' },
      { label: 'Паркинг', value: '500 м²' },
      { label: 'Район', value: 'Сергелийский · Куйлюк-5' },
      { label: 'Статус', value: 'Сдан' },
    ],
    nearby: [
      { label: 'Мечеть', time: '10 минут' },
      { label: 'Школа', time: '10 минут' },
      { label: 'Детский сад', time: '5 минут' },
      { label: 'Аптека', time: '7 минут' },
      { label: 'Метро', time: '6 минут' },
      { label: 'Базар', time: '5 минут' },
    ],
    coords: [41.245, 69.228],
  },
  {
    slug: 'renaissance',
    title: 'RENAISSANCE',
    eyebrow: 'Жилой комплекс · Национальный стиль',
    location: 'Ташкент, Мирзо-Улугбекский район, махалля Ижодкор — рядом с парком Янги Узбекистон',
    hero: '/assets/renaissance-1.webp',
    gallery: [
      '/assets/renaissance-2.webp',
      '/assets/renaissance-3.webp',
      '/assets/renaissance-4.webp',
      '/assets/renaissance-5.webp',
      '/assets/renaissance-6.webp',
      '/assets/renaissance-1.webp',
    ],
    description: [
      'Renaissance — современный жилой дом в национальном стиле в Мирзо-Улугбекском районе Ташкента, в махалле Ижодкор, рядом с парком «Янги Узбекистон». Пять этажей и 306 квартир с продуманными планировками.',
      'Архитектура объединяет современные технологии строительства и узнаваемые национальные мотивы. Проект полностью сдан в эксплуатацию.',
    ],
    specs: [
      { label: 'Этажность', value: '5 этажей' },
      { label: 'Квартир', value: '306' },
      { label: 'Территория', value: '1,3 гектара' },
      { label: 'Площадь квартир', value: '22 883 м²' },
      { label: 'Паркинг', value: '3 292 м²' },
      { label: 'Стиль', value: 'Национальный · современный' },
      { label: 'Район', value: 'Мирзо-Улугбекский · Ижодкор' },
      { label: 'Статус', value: 'Сдан' },
    ],
    nearby: [
      { label: 'Мечеть', time: '6 минут' },
      { label: 'Парк Янги Узбекистон', time: '15 минут' },
    ],
    coords: [41.323675, 69.441727],
  },
  {
    slug: 'yakkasaroy',
    title: 'YAKKASAROY',
    eyebrow: 'Жилой комплекс · Яккасарайский район',
    location: 'Ташкент, Яккасарайский район, улица Кушбеги',
    hero: '/assets/yakkasaroy-1.webp',
    gallery: [
      '/assets/yakkasaroy-2.webp',
      '/assets/yakkasaroy-3.webp',
      '/assets/yakkasaroy-4.webp',
      '/assets/yakkasaroy-5.webp',
      '/assets/yakkasaroy-6.webp',
      '/assets/yakkasaroy-7.webp',
    ],
    description: [
      'Yakkasaroy — жилой комплекс в самом центре Ташкента, в Яккасарайском районе на улице Кушбеги. Шесть этажей и 250 квартир. Фасад с золотыми акцентами и национальными узорами, продуманное благоустройство.',
      'Расположение в центре города даёт удобный доступ ко всей городской инфраструктуре. Объект полностью сдан в эксплуатацию.',
    ],
    specs: [
      { label: 'Этажность', value: '6 этажей' },
      { label: 'Квартир', value: '250' },
      { label: 'Территория', value: '0,15 гектара' },
      { label: 'Площадь квартир', value: '6 373,75 м²' },
      { label: 'Паркинг', value: '300 м²' },
      { label: 'Район', value: 'Яккасарайский · ул. Кушбеги' },
      { label: 'Статус', value: 'Сдан' },
    ],
    nearby: [
      { label: 'Агентство госуслуг', time: '5 минут' },
      { label: 'Продуктовый магазин', time: '5 минут' },
    ],
    coords: [41.270028, 69.2585],
  },
  {
    slug: 'botanika',
    title: 'BOTANIKA',
    eyebrow: 'Жилой комплекс · Эко-среда',
    location: 'Ташкент, Мирзо-Улугбекский район',
    hero: '/assets/botc-1.webp',
    gallery: [
      '/assets/botc-2.webp',
      '/assets/botc-3.webp',
      '/assets/botc-4.webp',
      '/assets/botc-5.webp',
      '/assets/botc-6.webp',
      '/assets/botc-7.webp',
    ],
    description: [
      'Botanika — жилой комплекс в Мирзо-Улугбекском районе Ташкента, построенный в экологически чистой зелёной зоне. Десять этажей с террасным уровнем и 210 квартир.',
      'Озеленённая территория, современная архитектура и продуманная среда для комфортной жизни. Объект полностью сдан в эксплуатацию.',
    ],
    specs: [
      { label: 'Этажность', value: '10 этажей + терраса' },
      { label: 'Квартир', value: '210' },
      { label: 'Территория', value: '0,3 гектара' },
      { label: 'Площадь квартир', value: '19 960 м²' },
      { label: 'Паркинг', value: '15 968 м²' },
      { label: 'Среда', value: 'Эко · зелёная зона' },
      { label: 'Район', value: 'Мирзо-Улугбекский' },
      { label: 'Статус', value: 'Сдан' },
    ],
    nearby: [
      { label: 'Школа', time: '3 минуты' },
      { label: 'Детский сад', time: '3 минуты' },
    ],
    coords: [41.338694, 69.317611],
  },
  {
    slug: 'poytaxt',
    title: 'POYTAXT',
    eyebrow: 'Жилой комплекс · Минимализм',
    location: 'Ташкент, Яшнабадский район, улица Махтумкули',
    hero: '/assets/poytaxt-1.webp',
    gallery: [
      '/assets/poytaxt-2.webp',
      '/assets/poytaxt-3.webp',
      '/assets/poytaxt-4.webp',
      '/assets/poytaxt-5.webp',
      '/assets/poytaxt-6.webp',
      '/assets/poytaxt-7.webp',
    ],
    description: [
      'Poytaxt Residence — жилой комплекс в минималистичном современном стиле в Яшнабадском районе Ташкента, на улице Махтумкули. Девять этажей с террасным уровнем.',
      'Лаконичная архитектура, качественные материалы и удобное расположение в обжитом районе города. Объект полностью сдан — квартиры распроданы.',
    ],
    specs: [
      { label: 'Этажность', value: '9 этажей + терраса' },
      { label: 'Стиль', value: 'Минимализм · современный' },
      { label: 'Район', value: 'Яшнабадский · ул. Махтумкули' },
      { label: 'Статус', value: 'Сдан' },
    ],
    nearby: [
      { label: 'Школа', time: '15 минут' },
      { label: 'Детский сад', time: '7 минут' },
    ],
    coords: [41.304667, 69.322444],
  },
]
