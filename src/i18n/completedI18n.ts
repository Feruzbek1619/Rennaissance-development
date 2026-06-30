import { useMemo } from 'react'
import { useTranslation } from '@/i18n'
import type { CompletedProject } from '@/data/completed'

// UZ/EN overlay for completed (handed-over) projects. RU lives in
// src/data/completed.ts (source of truth + coords/images). Merged by index.

type Lang = 'ru' | 'uz' | 'en'

type CompletedTr = {
  eyebrow?: string
  location?: string
  description?: string[]
  specs?: { label: string; value: string }[]
  nearby?: { label: string; time: string }[]
}

const en: Record<string, CompletedTr> = {
  'western-housing': {
    eyebrow: 'Residential complex · Sergeli district',
    location: 'Tashkent, Sergeli district, Kuyluk-5, Khalkabad mahalla',
    description: [
      'Western Housing is a modern residential complex in the Sergeli district of Tashkent, in the Khalkabad mahalla (Kuyluk-5). Nine floors plus an attic level and 300 apartments. The project is fully completed and occupied.',
      'Thoughtful layouts, quality finishes, a landscaped gated courtyard with parking and a playground. All the necessary infrastructure — schools, kindergartens, pharmacies, a market and the metro — is within walking distance.',
    ],
    specs: [
      { label: 'Floors', value: '9 floors + attic' },
      { label: 'Apartments', value: '300' },
      { label: 'Territory', value: '0.61 hectares' },
      { label: 'Apartments area', value: '16,425 m²' },
      { label: 'Parking', value: '500 m²' },
      { label: 'District', value: 'Sergeli · Kuyluk-5' },
      { label: 'Status', value: 'Completed' },
    ],
    nearby: [
      { label: 'Mosque', time: '10 min' },
      { label: 'School', time: '10 min' },
      { label: 'Kindergarten', time: '5 min' },
      { label: 'Pharmacy', time: '7 min' },
      { label: 'Metro', time: '6 min' },
      { label: 'Bazaar', time: '5 min' },
    ],
  },
  renaissance: {
    eyebrow: 'Residential complex · National style',
    location: 'Tashkent, Mirzo-Ulugbek district, Ijodkor mahalla — next to Yangi Uzbekiston Park',
    description: [
      'Renaissance is a modern residential building in a national style in the Mirzo-Ulugbek district of Tashkent, in the Ijodkor mahalla, next to «Yangi Uzbekiston» Park. Five floors and 306 apartments with thoughtful layouts.',
      'The architecture combines modern construction technologies with recognisable national motifs. The project is fully completed and handed over.',
    ],
    specs: [
      { label: 'Floors', value: '5 floors' },
      { label: 'Apartments', value: '306' },
      { label: 'Territory', value: '1.3 hectares' },
      { label: 'Apartments area', value: '22,883 m²' },
      { label: 'Parking', value: '3,292 m²' },
      { label: 'Style', value: 'National · modern' },
      { label: 'District', value: 'Mirzo-Ulugbek · Ijodkor' },
      { label: 'Status', value: 'Completed' },
    ],
    nearby: [
      { label: 'Mosque', time: '6 min' },
      { label: 'Yangi Uzbekiston Park', time: '15 min' },
    ],
  },
  yakkasaroy: {
    eyebrow: 'Residential complex · Yakkasaray district',
    location: 'Tashkent, Yakkasaray district, Kushbegi street',
    description: [
      'Yakkasaroy is a residential complex in the very center of Tashkent, in the Yakkasaray district on Kushbegi street. Six floors and 250 apartments. A façade with golden accents and national patterns, thoughtful landscaping.',
      'The central location provides convenient access to all city infrastructure. The project is fully completed and handed over.',
    ],
    specs: [
      { label: 'Floors', value: '6 floors' },
      { label: 'Apartments', value: '250' },
      { label: 'Territory', value: '0.15 hectares' },
      { label: 'Apartments area', value: '6,373.75 m²' },
      { label: 'Parking', value: '300 m²' },
      { label: 'District', value: 'Yakkasaray · Kushbegi st.' },
      { label: 'Status', value: 'Completed' },
    ],
    nearby: [
      { label: 'Public services agency', time: '5 min' },
      { label: 'Grocery store', time: '5 min' },
    ],
  },
  botanika: {
    eyebrow: 'Residential complex · Eco-environment',
    location: 'Tashkent, Mirzo-Ulugbek district',
    description: [
      'Botanika is a residential complex in the Mirzo-Ulugbek district of Tashkent, built in an ecologically clean green area. Ten floors with a terrace level and 210 apartments.',
      'A landscaped territory, modern architecture and a thoughtful environment for comfortable living. The project is fully completed and handed over.',
    ],
    specs: [
      { label: 'Floors', value: '10 floors + terrace' },
      { label: 'Apartments', value: '210' },
      { label: 'Territory', value: '0.3 hectares' },
      { label: 'Apartments area', value: '19,960 m²' },
      { label: 'Parking', value: '15,968 m²' },
      { label: 'Environment', value: 'Eco · green area' },
      { label: 'District', value: 'Mirzo-Ulugbek' },
      { label: 'Status', value: 'Completed' },
    ],
    nearby: [
      { label: 'School', time: '3 min' },
      { label: 'Kindergarten', time: '3 min' },
    ],
  },
  poytaxt: {
    eyebrow: 'Residential complex · Minimalism',
    location: 'Tashkent, Yashnabad district, Makhtumkuli street',
    description: [
      'Poytaxt Residence is a residential complex in a minimalist modern style in the Yashnabad district of Tashkent, on Makhtumkuli street. Nine floors with a terrace level.',
      'Concise architecture, quality materials and a convenient location in an established part of the city. The project is fully completed — the apartments are sold out.',
    ],
    specs: [
      { label: 'Floors', value: '9 floors + terrace' },
      { label: 'Style', value: 'Minimalism · modern' },
      { label: 'District', value: 'Yashnabad · Makhtumkuli st.' },
      { label: 'Status', value: 'Completed' },
    ],
    nearby: [
      { label: 'School', time: '15 min' },
      { label: 'Kindergarten', time: '7 min' },
    ],
  },
}

const uz: Record<string, CompletedTr> = {
  'western-housing': {
    eyebrow: 'Turar-joy majmuasi · Sergeli tumani',
    location: 'Toshkent, Sergeli tumani, Quyluq-5, Xalqobod mahallasi',
    description: [
      "Western Housing — Toshkentning Sergeli tumanida, Xalqobod mahallasida (Quyluq-5) joylashgan zamonaviy turar-joy majmuasi. To‘qqiz qavat va mansarda darajasi hamda 300 ta kvartira. Obyekt to‘liq topshirilgan va aholi joylashgan.",
      "Puxta rejalashtirilgan kvartiralar, sifatli pardoz, avtoturargoh va bolalar maydonchasiga ega obod yopiq hovli. Barcha zarur infratuzilma — maktablar, bolalar bog‘chalari, dorixonalar, bozor va metro — piyoda yetib boriladigan masofada.",
    ],
    specs: [
      { label: 'Qavatlar', value: '9 qavat + mansarda' },
      { label: 'Kvartiralar', value: '300' },
      { label: 'Hudud', value: '0,61 gektar' },
      { label: 'Kvartiralar maydoni', value: '16 425 m²' },
      { label: 'Avtoturargoh', value: '500 m²' },
      { label: 'Tuman', value: 'Sergeli · Quyluq-5' },
      { label: 'Holati', value: 'Topshirilgan' },
    ],
    nearby: [
      { label: 'Masjid', time: '10 daqiqa' },
      { label: 'Maktab', time: '10 daqiqa' },
      { label: 'Bolalar bog‘chasi', time: '5 daqiqa' },
      { label: 'Dorixona', time: '7 daqiqa' },
      { label: 'Metro', time: '6 daqiqa' },
      { label: 'Bozor', time: '5 daqiqa' },
    ],
  },
  renaissance: {
    eyebrow: 'Turar-joy majmuasi · Milliy uslub',
    location: 'Toshkent, Mirzo Ulug‘bek tumani, Ijodkor mahallasi — Yangi O‘zbekiston bog‘i yonida',
    description: [
      "Renaissance — Toshkentning Mirzo Ulug‘bek tumanida, Ijodkor mahallasida, «Yangi O‘zbekiston» bog‘i yonida joylashgan milliy uslubdagi zamonaviy turar-joy binosi. Besh qavat va puxta rejalashtirilgan 306 ta kvartira.",
      "Me'morchilik zamonaviy qurilish texnologiyalari va taniqli milliy naqshlarni birlashtiradi. Loyiha to‘liq foydalanishga topshirilgan.",
    ],
    specs: [
      { label: 'Qavatlar', value: '5 qavat' },
      { label: 'Kvartiralar', value: '306' },
      { label: 'Hudud', value: '1,3 gektar' },
      { label: 'Kvartiralar maydoni', value: '22 883 m²' },
      { label: 'Avtoturargoh', value: '3 292 m²' },
      { label: 'Uslub', value: 'Milliy · zamonaviy' },
      { label: 'Tuman', value: 'Mirzo Ulug‘bek · Ijodkor' },
      { label: 'Holati', value: 'Topshirilgan' },
    ],
    nearby: [
      { label: 'Masjid', time: '6 daqiqa' },
      { label: 'Yangi O‘zbekiston bog‘i', time: '15 daqiqa' },
    ],
  },
  yakkasaroy: {
    eyebrow: 'Turar-joy majmuasi · Yakkasaroy tumani',
    location: 'Toshkent, Yakkasaroy tumani, Qo‘shbegi ko‘chasi',
    description: [
      "Yakkasaroy — Toshkentning aynan markazida, Yakkasaroy tumanida, Qo‘shbegi ko‘chasida joylashgan turar-joy majmuasi. Olti qavat va 250 ta kvartira. Oltin ranglar va milliy naqshlarga ega fasad, puxta obodonlashtirish.",
      "Shahar markazidagi joylashuv barcha shahar infratuzilmasiga qulay kirishni ta'minlaydi. Obyekt to‘liq foydalanishga topshirilgan.",
    ],
    specs: [
      { label: 'Qavatlar', value: '6 qavat' },
      { label: 'Kvartiralar', value: '250' },
      { label: 'Hudud', value: '0,15 gektar' },
      { label: 'Kvartiralar maydoni', value: '6 373,75 m²' },
      { label: 'Avtoturargoh', value: '300 m²' },
      { label: 'Tuman', value: 'Yakkasaroy · Qo‘shbegi ko‘ch.' },
      { label: 'Holati', value: 'Topshirilgan' },
    ],
    nearby: [
      { label: 'Davlat xizmatlari agentligi', time: '5 daqiqa' },
      { label: 'Oziq-ovqat do‘koni', time: '5 daqiqa' },
    ],
  },
  botanika: {
    eyebrow: 'Turar-joy majmuasi · Eko-muhit',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    description: [
      "Botanika — Toshkentning Mirzo Ulug‘bek tumanida, ekologik toza yashil hududda qurilgan turar-joy majmuasi. Terrasa darajasiga ega o‘n qavat va 210 ta kvartira.",
      "Ko‘kalamzorlashtirilgan hudud, zamonaviy me'morchilik va qulay yashash uchun puxta muhit. Obyekt to‘liq foydalanishga topshirilgan.",
    ],
    specs: [
      { label: 'Qavatlar', value: '10 qavat + terrasa' },
      { label: 'Kvartiralar', value: '210' },
      { label: 'Hudud', value: '0,3 gektar' },
      { label: 'Kvartiralar maydoni', value: '19 960 m²' },
      { label: 'Avtoturargoh', value: '15 968 m²' },
      { label: 'Muhit', value: 'Eko · yashil hudud' },
      { label: 'Tuman', value: 'Mirzo Ulug‘bek' },
      { label: 'Holati', value: 'Topshirilgan' },
    ],
    nearby: [
      { label: 'Maktab', time: '3 daqiqa' },
      { label: 'Bolalar bog‘chasi', time: '3 daqiqa' },
    ],
  },
  poytaxt: {
    eyebrow: 'Turar-joy majmuasi · Minimalizm',
    location: 'Toshkent, Yashnobod tumani, Maxtumquli ko‘chasi',
    description: [
      "Poytaxt Residence — Toshkentning Yashnobod tumanida, Maxtumquli ko‘chasida joylashgan minimalistik zamonaviy uslubdagi turar-joy majmuasi. Terrasa darajasiga ega to‘qqiz qavat.",
      "Ixcham me'morchilik, sifatli materiallar va shaharning gavjum hududidagi qulay joylashuv. Obyekt to‘liq topshirilgan — kvartiralar sotib bo‘lingan.",
    ],
    specs: [
      { label: 'Qavatlar', value: '9 qavat + terrasa' },
      { label: 'Uslub', value: 'Minimalizm · zamonaviy' },
      { label: 'Tuman', value: 'Yashnobod · Maxtumquli ko‘ch.' },
      { label: 'Holati', value: 'Topshirilgan' },
    ],
    nearby: [
      { label: 'Maktab', time: '15 daqiqa' },
      { label: 'Bolalar bog‘chasi', time: '7 daqiqa' },
    ],
  },
}

const COMPLETED_I18N: Record<'uz' | 'en', Record<string, CompletedTr>> = { uz, en }

export function localizeCompleted(p: CompletedProject, lang: Lang): CompletedProject {
  if (lang === 'ru') return p
  const tr = COMPLETED_I18N[lang]?.[p.slug]
  if (!tr) return p
  return {
    ...p,
    eyebrow: tr.eyebrow ?? p.eyebrow,
    location: tr.location ?? p.location,
    description: tr.description ?? p.description,
    specs: p.specs.map((s, i) => ({ ...s, ...(tr.specs?.[i] ?? {}) })),
    nearby: p.nearby.map((n, i) => ({ ...n, ...(tr.nearby?.[i] ?? {}) })),
  }
}

export function useLocalizedCompleted(p: CompletedProject | undefined): CompletedProject | undefined {
  const { lang } = useTranslation()
  return useMemo(() => (p ? localizeCompleted(p, lang as Lang) : p), [p, lang])
}

export function useLocalizedCompletedList(list: CompletedProject[]): CompletedProject[] {
  const { lang } = useTranslation()
  return useMemo(() => list.map((p) => localizeCompleted(p, lang as Lang)), [list, lang])
}
