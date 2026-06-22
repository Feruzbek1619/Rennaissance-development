export type Project = {
  slug: string
  title: string
  category: string
  area: string
  location: string
  image: string
  status: 'active' | 'sold'
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
