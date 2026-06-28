import { useMemo } from 'react'
import { useTranslation } from '@/i18n'
import type { Service } from '@/data/services'

// UZ/EN overlay for services. RU lives in src/data/services.ts (source + images).

type Lang = 'ru' | 'uz' | 'en'

type ServiceTr = {
  title?: string
  category?: string
  description?: string
  longDescription?: string
  stats?: { value?: string; label?: string }[]
  features?: string[]
}

const en: Record<string, ServiceTr> = {
  'zhilye-kompleksy': {
    title: 'Residential complexes',
    category: 'Residential real estate',
    description: 'Design and construction of comfort- and business-class residential buildings in Tashkent.',
    longDescription: 'We build residential complexes with a monolithic concrete frame, a brick façade and developed infrastructure. Every project means a thoughtful layout, high ceilings, dedicated parking and a landscaped territory.',
    stats: [
      { label: 'Completed projects' },
      { label: 'Under construction' },
      { label: 'Year founded' },
      { label: 'Own materials' },
    ],
    features: ['Monolithic concrete frame', 'Brick façade', 'In-house aerated blocks', '3.10 m ceilings', 'Parking for residents', 'Playgrounds and recreation areas'],
  },
  'kommercheskaya-nedvizhimost': {
    title: 'Commercial real estate',
    category: 'Commercial',
    description: 'Turnkey construction of retail and office spaces.',
    longDescription: 'We design and build commercial properties — office buildings, retail spaces, warehouses. We apply modern structural solutions and our own building materials to reduce cost and timelines.',
    stats: [
      { label: 'Commercial properties' },
      { label: 'm² leased' },
      { label: 'UTB plant' },
      { label: 'Quality control' },
    ],
    features: ['Turnkey construction', 'Flexible layouts', 'Own UTB materials', 'Compliance with fire-safety standards', 'Energy-efficient solutions', 'Fast construction timelines'],
  },
  'sobstvennoe-proizvodstvo': {
    title: 'In-house production',
    category: 'B2B / Production',
    description: 'Sale of building materials: concrete, reinforced-concrete products, aerated blocks, ventilation shafts.',
    longDescription: 'The Universal Temir Beton plant produces a full range of building materials for residential and industrial construction. We supply developers with quality materials, with control at every stage.',
    stats: [
      { label: 'Plant launch year' },
      { label: 'Product types' },
      { label: 'Units of machinery' },
      { label: 'Factory control' },
    ],
    features: ['Ready-mix concrete of all grades', 'Reinforced-concrete products', 'Aerated concrete blocks', 'Ventilation shafts', 'Thermal frames', 'Delivery to the site'],
  },
  proektirovanie: {
    title: 'Design',
    category: 'Design',
    description: 'A full cycle of architectural and structural design.',
    longDescription: 'Our design team develops architectural concepts, structural solutions and working documentation. We work in accordance with the standards of the Republic of Uzbekistan and international standards.',
    stats: [
      { label: 'Projects' },
      { label: 'Years of team experience' },
      { label: 'Standards compliance' },
      { label: 'First project' },
    ],
    features: ['Architectural design', 'Structural solutions', 'Engineering systems', 'Working documentation', 'Author supervision', 'BIM modeling'],
  },
}

const uz: Record<string, ServiceTr> = {
  'zhilye-kompleksy': {
    title: 'Turar-joy majmualari',
    category: 'Turar-joy ko‘chmas mulki',
    description: 'Toshkentda komfort va biznes darajasidagi turar-joy uylarini loyihalash va qurish.',
    longDescription: 'Biz monolit-beton karkas, g‘isht fasad va rivojlangan infratuzilmaga ega turar-joy majmualarini quramiz. Har bir loyiha — puxta rejalashtirish, baland shiftlar, shaxsiy avtoturargoh va obod hudud.',
    stats: [
      { label: 'Amalga oshirilgan loyihalar' },
      { label: 'Qurilishda' },
      { label: 'Tashkil etilgan yil' },
      { label: 'O‘z materiallari' },
    ],
    features: ['Monolit-beton karkas', 'G‘isht fasad', 'O‘z ishlab chiqarishimiz gazoblogi', '3,10 m shiftlar', 'Aholi uchun avtoturargoh', 'Bolalar maydonchalari va dam olish zonalari'],
  },
  'kommercheskaya-nedvizhimost': {
    title: 'Tijorat ko‘chmas mulki',
    category: 'Tijorat',
    description: 'Savdo va ofis binolarini kalit topshirish asosida qurish.',
    longDescription: "Biz tijorat obyektlarini — ofis binolari, savdo maydonlari, omborlarni loyihalaymiz va quramiz. Tannarx va muddatlarni kamaytirish uchun zamonaviy konstruktiv yechimlar va o‘z qurilish materiallarimizdan foydalanamiz.",
    stats: [
      { label: 'Tijorat obyektlari' },
      { label: 'm² ijaraga berilgan' },
      { label: 'UTB zavodi' },
      { label: 'Sifat nazorati' },
    ],
    features: ['Kalit topshirish asosida qurish', 'Moslashuvchan rejalar', 'O‘z UTB materiallari', "Yong‘in xavfsizligi me'yorlariga muvofiqlik", 'Energiya tejovchi yechimlar', 'Qisqa qurilish muddatlari'],
  },
  'sobstvennoe-proizvodstvo': {
    title: 'O‘z ishlab chiqarishimiz',
    category: 'B2B / Ishlab chiqarish',
    description: 'Qurilish materiallari sotuvi: beton, TBM, gazoblok, ventilyatsiya shaxtalari.',
    longDescription: "Universal Temir Beton zavodi turar-joy va sanoat qurilishi uchun qurilish materiallarining to‘liq assortimentini ishlab chiqaradi. Quruvchilarni har bosqichda nazorat ostida sifatli materiallar bilan ta'minlaymiz.",
    stats: [
      { label: 'Zavod ishga tushgan yil' },
      { label: 'Mahsulot turlari' },
      { label: 'Maxsus texnika birligi' },
      { label: 'Zavod nazorati' },
    ],
    features: ['Barcha markadagi tayyor beton', 'Temir-beton mahsulotlari', 'Gazobeton bloklar', 'Ventilyatsiya shaxtalari', 'Termo-romlar', 'Obyektga yetkazib berish'],
  },
  proektirovanie: {
    title: 'Loyihalash',
    category: 'Loyihalash',
    description: 'Arxitektura va konstruktiv loyihalashning to‘liq tsikli.',
    longDescription: "Loyiha jamoamiz arxitektura konsepsiyalari, konstruktiv yechimlar va ishchi hujjatlarni ishlab chiqadi. Biz O‘zbekiston Respublikasi me'yorlari va xalqaro standartlarga muvofiq ishlaymiz.",
    stats: [
      { label: 'Loyihalar' },
      { label: 'Jamoa tajribasi (yil)' },
      { label: "Me'yorlarga muvofiqlik" },
      { label: 'Birinchi loyiha' },
    ],
    features: ['Arxitektura loyihalash', 'Konstruktiv yechimlar', 'Muhandislik tizimlari', 'Ishchi hujjatlar', 'Mualliflik nazorati', 'BIM modellashtirish'],
  },
}

const SERVICES_I18N: Record<'uz' | 'en', Record<string, ServiceTr>> = { uz, en }

export function localizeService(s: Service, lang: Lang): Service {
  if (lang === 'ru') return s
  const tr = SERVICES_I18N[lang]?.[s.slug]
  if (!tr) return s
  return {
    ...s,
    title: tr.title ?? s.title,
    category: tr.category ?? s.category,
    description: tr.description ?? s.description,
    longDescription: tr.longDescription ?? s.longDescription,
    stats: s.stats.map((st, i) => ({ ...st, ...(tr.stats?.[i] ?? {}) })),
    features: tr.features ?? s.features,
  }
}

export function useLocalizedService(s: Service | undefined): Service | undefined {
  const { lang } = useTranslation()
  return useMemo(() => (s ? localizeService(s, lang as Lang) : s), [s, lang])
}

export function useLocalizedServices(list: Service[]): Service[] {
  const { lang } = useTranslation()
  return useMemo(() => list.map((s) => localizeService(s, lang as Lang)), [list, lang])
}
