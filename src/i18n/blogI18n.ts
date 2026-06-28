import { useMemo } from 'react'
import { useTranslation } from '@/i18n'
import type { BlogPost } from '@/data/blog'

// UZ/EN overlay for blog posts. RU lives in src/data/blog.ts (source + images).

type Lang = 'ru' | 'uz' | 'en'

type PostTr = {
  title?: string
  category?: string
  date?: string
  readTime?: string
  excerpt?: string
  content?: string
}

const en: Record<string, PostTr> = {
  'budushchee-ustojchivogo-stroitelstva': {
    title: 'The future of sustainable commercial construction',
    category: 'Trends',
    date: 'January 12, 2026',
    readTime: '5 min',
    excerpt: 'How modern construction technologies are changing the approach to creating the urban environment.',
    content: 'The construction industry is undergoing a transformation. Using your own materials, control at every stage and long-term thinking — that is what distinguishes the developers of the future from the developers of the past.\n\nRenaissance Development builds on a full-cycle principle: from design to keys. This is not just a marketing slogan — it is a business architecture in which every stage is under the direct control of the team.\n\nA monolithic frame, a brick façade, aerated blocks and concrete from our own Universal Temir Beton plant — every material is inspected before it reaches the construction site.',
  },
  'tochnost-v-smetnom-planirovanii': {
    title: 'Precision in cost estimation',
    category: 'Construction',
    date: 'January 5, 2026',
    readTime: '4 min',
    excerpt: 'Why accurate budget planning is critical to completing a project on time.',
    content: 'A construction budget is not a number in a spreadsheet. It is a living document that reflects the real state of the project. Overspending at the foundation stage means saving on finishing — and residents notice it.\n\nAt Renaissance Development, cost estimation begins at the design stage and is revised at every stage of construction. In-house production makes it possible to control the cost of materials without dependence on external suppliers.',
  },
  'bezopasnost-na-stroitelnoj-ploshchadke': {
    title: 'A zero-injury approach',
    category: 'Safety',
    date: 'December 28, 2025',
    readTime: '3 min',
    excerpt: 'How a systematic approach to occupational safety protects people and reputation.',
    content: 'Safety is not a poster on a fence. It is daily work: briefings, equipment checks, incident logging. Zero injuries are achieved not by luck but by a system.\n\nRenaissance Development sites operate internal occupational-safety standards that are mandatory for all contractors and subcontractors. Our own machinery is serviced according to regulations, and operators undergo regular certification.',
  },
  'navigatsiya-plotnost-gorodskih-kvartir': {
    title: 'Urban density: a balance of comfort',
    category: 'Urbanism',
    date: 'December 20, 2025',
    readTime: '6 min',
    excerpt: 'How to build densely without sacrificing quality of life in a residential neighborhood.',
    content: 'Urban density is a given. Tashkent is growing, and demand for housing in good districts outpaces supply. The question is not whether to build densely, but how to do it right.\n\nAlandalus in the Mirzo-Ulugbek district is an example of how, on 0.75 hectares, you can create a comfortable living environment: with alleys, playgrounds, underground parking and a 10-storey building that does not overwhelm its neighbors.',
  },
  'integratsiya-bim-modelirovaniya': {
    title: 'BIM modeling in construction',
    category: 'Technology',
    date: 'December 14, 2025',
    readTime: '5 min',
    excerpt: 'Digital twins of buildings as a quality-control tool.',
    content: 'BIM is not just a 3D model. It is a building information model that contains data on every structural element: material, size, cost, installation time.\n\nWhen the concrete for a column is produced at your own plant and its parameters are recorded in the BIM model, quality control ceases to be an inspection process — it is built into the construction process itself.',
  },
  'karbon-nejtralnoe-stroitelstvo': {
    title: 'Carbon-neutral construction in Uzbekistan',
    category: 'Ecology',
    date: 'December 5, 2025',
    readTime: '4 min',
    excerpt: 'Steps toward reducing the carbon footprint in residential construction.',
    content: 'Aerated blocks instead of brick reduce heat loss. A monolithic frame — the building’s service life. An in-house plant — transport emissions. Each of these decisions contributes to reducing the project’s carbon footprint.\n\nSustainable construction in Uzbekistan is not yet regulated by strict standards, but the market is moving in this direction. Renaissance Development is building these principles into projects today — not because it is required, but because it is the right thing to do.',
  },
}

const uz: Record<string, PostTr> = {
  'budushchee-ustojchivogo-stroitelstva': {
    title: 'Barqaror tijorat qurilishining kelajagi',
    category: 'Trendlar',
    date: '2026-yil 12-yanvar',
    readTime: '5 daqiqa',
    excerpt: 'Zamonaviy qurilish texnologiyalari shahar muhitini yaratishga yondashuvni qanday o‘zgartirmoqda.',
    content: 'Qurilish sohasi transformatsiyani boshdan kechirmoqda. O‘z materiallaridan foydalanish, har bosqichdagi nazorat va uzoq muddatli fikrlash — kelajak quruvchilarini o‘tmish quruvchilaridan ajratib turadigan narsa shu.\n\nRenaissance Development to‘liq tsikl tamoyili asosida quradi: loyihadan kalitlargacha. Bu shunchaki marketing shiori emas — bu har bir bosqich jamoaning bevosita nazoratida bo‘lgan biznes arxitekturasi.\n\nMonolit karkas, g‘isht fasad, gazoblok va o‘z Universal Temir Beton zavodimizdan beton — har bir material qurilish maydoniga tushishidan oldin tekshiruvdan o‘tadi.',
  },
  'tochnost-v-smetnom-planirovanii': {
    title: 'Smeta rejalashtirishdagi aniqlik',
    category: 'Qurilish',
    date: '2026-yil 5-yanvar',
    readTime: '4 daqiqa',
    excerpt: 'Nega aniq budjet rejalashtirish loyihani o‘z vaqtida yakunlash uchun muhim.',
    content: "Qurilish budjeti — jadvaldagi raqam emas. Bu loyihaning haqiqiy holatini aks ettiruvchi tirik hujjat. Poydevor bosqichidagi ortiqcha xarajat pardozlashda tejashni anglatadi — va buni aholi sezadi.\n\nRenaissance Development da smeta rejalashtirish loyiha bosqichida boshlanadi va qurilishning har bosqichida qayta ko‘rib chiqiladi. O‘z ishlab chiqarishimiz tashqi yetkazib beruvchilarga bog‘liq bo‘lmasdan materiallar tannarxini nazorat qilish imkonini beradi.",
  },
  'bezopasnost-na-stroitelnoj-ploshchadke': {
    title: 'Nol jarohatga yondashuv',
    category: 'Xavfsizlik',
    date: '2025-yil 28-dekabr',
    readTime: '3 daqiqa',
    excerpt: 'Mehnat muhofazasiga tizimli yondashuv odamlarni va obro‘ni qanday himoya qiladi.',
    content: "Xavfsizlik — devordagi plakat emas. Bu kundalik ish: yo‘riqnomalar, jihozlarni tekshirish, hodisalarni hisobga olish. Nol jarohat omad bilan emas, tizim bilan erishiladi.\n\nRenaissance Development obyektlarida barcha pudratchilar va subpudratchilar uchun majburiy bo‘lgan ichki mehnat muhofazasi standartlari amal qiladi. O‘z maxsus texnikamiz reglament bo‘yicha xizmat ko‘rsatiladi, operatorlar esa muntazam attestatsiyadan o‘tadi.",
  },
  'navigatsiya-plotnost-gorodskih-kvartir': {
    title: 'Shahar zichligi: komfort muvozanati',
    category: 'Urbanistika',
    date: '2025-yil 20-dekabr',
    readTime: '6 daqiqa',
    excerpt: 'Turar-joy mahallasida hayot sifatini qurbon qilmasdan zich qurish qanday amalga oshiriladi.',
    content: 'Shahar zichligi — bu berilgan haqiqat. Toshkent o‘smoqda va yaxshi hududlarda uy-joyga talab taklifdan oshib bormoqda. Savol zich qurish-qurmaslikda emas, balki buni qanday to‘g‘ri qilishdadir.\n\nMirzo Ulug‘bek tumanidagi Alandalus — 0,75 gektarda qulay yashash muhitini yaratish mumkinligiga misol: xiyobonlar, bolalar maydonchalari, yerosti avtoturargohi va qo‘shnilarga bosim o‘tkazmaydigan 10 qavatli bino bilan.',
  },
  'integratsiya-bim-modelirovaniya': {
    title: 'Qurilishda BIM modellashtirish',
    category: 'Texnologiyalar',
    date: '2025-yil 14-dekabr',
    readTime: '5 daqiqa',
    excerpt: 'Binolarning raqamli egizaklari sifat nazorati vositasi sifatida.',
    content: "BIM — shunchaki 3D model emas. Bu binoning har bir konstruktiv elementi haqida ma'lumotni o‘z ichiga olgan axborot modeli: material, o‘lcham, narx, montaj muddati.\n\nUstun uchun beton o‘z zavodingizda ishlab chiqarilganda va uning parametrlari BIM modelida qayd etilganda, sifat nazorati tekshirish jarayoni bo‘lishdan to‘xtaydi — u qurilish jarayonining o‘ziga o‘rnatilgan.",
  },
  'karbon-nejtralnoe-stroitelstvo': {
    title: 'O‘zbekistonda uglerod-neytral qurilish',
    category: 'Ekologiya',
    date: '2025-yil 5-dekabr',
    readTime: '4 daqiqa',
    excerpt: 'Turar-joy qurilishida uglerod izini kamaytirish yo‘lidagi qadamlar.',
    content: "G‘isht o‘rniga gazoblok issiqlik yo‘qotishini kamaytiradi. Monolit karkas — binoning xizmat muddati. O‘z zavod — transport chiqindilari. Ushbu yechimlarning har biri obyekt uglerod izini kamaytirishga hissa qo‘shadi.\n\nO‘zbekistonda barqaror qurilish hozircha qat'iy standartlar bilan tartibga solinmaydi, lekin bozor shu yo‘nalishda harakatlanmoqda. Renaissance Development bu tamoyillarni bugun loyihalarga joriy etmoqda — majbur bo‘lgani uchun emas, balki bu to‘g‘ri bo‘lgani uchun.",
  },
}

const BLOG_I18N: Record<'uz' | 'en', Record<string, PostTr>> = { uz, en }

export function localizePost(p: BlogPost, lang: Lang): BlogPost {
  if (lang === 'ru') return p
  const tr = BLOG_I18N[lang]?.[p.slug]
  if (!tr) return p
  return { ...p, ...tr }
}

export function useLocalizedPost(p: BlogPost | undefined): BlogPost | undefined {
  const { lang } = useTranslation()
  return useMemo(() => (p ? localizePost(p, lang as Lang) : p), [p, lang])
}

export function useLocalizedPosts(list: BlogPost[]): BlogPost[] {
  const { lang } = useTranslation()
  return useMemo(() => list.map((p) => localizePost(p, lang as Lang)), [list, lang])
}
