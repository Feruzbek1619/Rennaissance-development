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
]
