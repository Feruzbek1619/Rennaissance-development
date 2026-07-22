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
      '«Western Housing» is a modern residential complex in the Sergeli district of Tashkent, located in the Khalkabad mahalla (Kuyluk-5). The project is fully completed and put into operation, confirming the high build quality and the developer’s reliability.',
      'The complex is located on a 0.61-hectare territory and includes 3 residential blocks, 6 entrances and 198 apartments with functional layouts. The building footprint is 1,840 m², and the total floor area of the buildings is 22,300 m².',
      'The total usable area of the complex is 14,440 m². Residents have a landscaped gated courtyard, a playground and parking of 1,320 m² for 50 parking spaces. Schools, kindergartens, pharmacies, a market and a metro station are within walking distance.',
    ],
    specs: [
      { label: 'Floors', value: '9 floors + attic' },
      { label: 'Apartments', value: '198' },
      { label: 'Territory', value: '0.61 hectares' },
      { label: 'Apartments area', value: '14,440 m²' },
      { label: 'Parking', value: '1,320 m²' },
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
      '«Renaissance» is a modern residential complex in a national style, located in the Mirzo-Ulugbek district of Tashkent, next to «Yangi Uzbekiston» Park. The project’s architecture combines modern construction technologies with national motifs, creating a unique and recognisable look. The complex is fully put into operation.',
      'The project is built on a 1.3-hectare territory and includes 10 residential blocks, 13 entrances and 333 apartments with thoughtful layouts. The building footprint is 5,720 m², and the total floor area of the buildings is 27,610 m².',
      'The total usable area of the complex is 19,190 m², including 20,160 m² of residential area and 968 m² of commercial premises. Parking of 5,654 m² for 110 parking spaces is provided for residents.',
    ],
    specs: [
      { label: 'Floors', value: '5 floors' },
      { label: 'Apartments', value: '333' },
      { label: 'Territory', value: '1.3 hectares' },
      { label: 'Apartments area', value: '20,160 m²' },
      { label: 'Parking', value: '5,654 m²' },
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
      '«Yakkasaroy» is a multifunctional complex in the very center of Tashkent, located in the Yakkasaray district on Kushbegi street. The project combines modern architecture with national elements in the façade design and is fully put into operation.',
      'The complex is built on a 0.65-hectare territory and includes two residential buildings — a 6-storey one with 36 apartments and a 10-storey one with 72 apartments — as well as a modern business center. The total building footprint is 2,322 m², and the total floor area of the buildings is 18,565 m².',
      'The total usable area of the complex is 11,535 m². For residents and visitors, parking zones with a total area of 3,842 m² for 106 parking spaces are provided. The convenient location ensures quick access to the capital’s business, retail and cultural facilities.',
    ],
    specs: [
      { label: 'Floors', value: '6 and 10 floors' },
      { label: 'Apartments', value: '108' },
      { label: 'Territory', value: '0.65 hectares' },
      { label: 'Apartments area', value: '11,535 m²' },
      { label: 'Parking', value: '3,842 m²' },
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
      '«Botanika» is a modern residential complex in the Mirzo-Ulugbek district of Tashkent, located in an ecologically clean green area. The project combines modern architecture, a landscaped territory and a comfortable living environment. The complex is fully put into operation.',
      'The project is built on a 0.33-hectare territory and includes 3 residential blocks, 4 entrances and 209 apartments. The building footprint is 2,445 m², and the total floor area of the buildings is 26,900 m².',
      'The total usable area of the complex is 15,968 m². Parking of 2,431 m² for 50 parking spaces is provided for residents. Depending on the section, each floor has 4 or 6 apartments, ensuring comfort and privacy.',
    ],
    specs: [
      { label: 'Floors', value: '10 floors + terrace' },
      { label: 'Apartments', value: '209' },
      { label: 'Territory', value: '0.33 hectares' },
      { label: 'Apartments area', value: '15,968 m²' },
      { label: 'Parking', value: '2,431 m²' },
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
      '«Poytaxt Residence» is a modern residential complex in a minimalist style, located in the Yashnabad district of Tashkent on Makhtumkuli street. The project combines concise architecture, quality materials and a convenient location in a developed part of the city. The complex is fully put into operation, and all apartments have been successfully sold.',
      'The project is located on a 1-hectare territory and includes 5 residential blocks, 11 entrances and 361 apartments. The building footprint is 4,905 m², and the total floor area of the buildings is 44,800 m².',
      'The total usable area of the complex is 25,701 m², of which 23,066 m² is residential apartments and 2,635 m² is commercial premises. Parking of 2,505 m² for 300 parking spaces is provided for residents.',
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
      "«Western Housing» — Toshkentning Sergeli tumanida, Xalqobod mahallasida (Quyluq-5) joylashgan zamonaviy turar-joy majmuasi. Loyiha to‘liq amalga oshirilgan va foydalanishga topshirilgan, bu qurilishning yuqori sifati va quruvchining ishonchliligini tasdiqlaydi.",
      "Majmua 0,61 gektar hududda joylashgan bo‘lib, 3 ta turar-joy bloki, 6 ta kirish va funksional tartibdagi 198 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 1 840 m², binolarning umumiy maydoni — 22 300 m².",
      "Majmuaning umumiy foydali maydoni — 14 440 m². Aholi uchun obod yopiq hovli, bolalar maydonchasi va 50 mashina-o‘ringa mo‘ljallangan 1 320 m² avtoturargoh mavjud. Maktablar, bolalar bog‘chalari, dorixonalar, bozor va metro bekati piyoda yetib boriladigan masofada.",
    ],
    specs: [
      { label: 'Qavatlar', value: '9 qavat + mansarda' },
      { label: 'Kvartiralar', value: '198' },
      { label: 'Loyiha maydoni', value: '0,61 gektar' },
      { label: 'Xonadonlar maydoni', value: '14 440 m²' },
      { label: 'Avtoturargoh maydoni', value: '1 320 m²' },
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
      "«Renaissance» — Toshkentning Mirzo Ulug‘bek tumanida, «Yangi O‘zbekiston» bog‘i yonida joylashgan milliy uslubdagi zamonaviy turar-joy majmuasi. Loyiha meʼmorchiligi zamonaviy qurilish texnologiyalarini milliy naqshlar bilan uyg‘unlashtirib, o‘ziga xos va tanilarli qiyofa yaratadi. Majmua to‘liq foydalanishga topshirilgan.",
      "Loyiha 1,3 gektar hududda barpo etilgan va 10 ta turar-joy bloki, 13 ta kirish hamda puxta rejalashtirilgan 333 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 5 720 m², binolarning umumiy maydoni — 27 610 m².",
      "Majmuaning umumiy foydali maydoni — 19 190 m², shu jumladan 20 160 m² turar-joy va 968 m² tijorat binolari. Aholi uchun 110 mashina-o‘ringa mo‘ljallangan 5 654 m² avtoturargoh ko‘zda tutilgan.",
    ],
    specs: [
      { label: 'Qavatlar', value: '5 qavat' },
      { label: 'Kvartiralar', value: '333' },
      { label: 'Loyiha maydoni', value: '1,3 gektar' },
      { label: 'Xonadonlar maydoni', value: '20 160 m²' },
      { label: 'Avtoturargoh maydoni', value: '5 654 m²' },
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
      "«Yakkasaroy» — Toshkentning aynan markazida, Yakkasaroy tumanida, Qo‘shbegi ko‘chasida joylashgan ko‘p funksiyali majmua. Loyiha zamonaviy meʼmorchilikni fasadlar bezagidagi milliy elementlar bilan uyg‘unlashtiradi va to‘liq foydalanishga topshirilgan.",
      "Majmua 0,65 gektar hududda barpo etilgan bo‘lib, ikkita turar-joy binosi — 36 kvartirali 6 qavatli va 72 kvartirali 10 qavatli — hamda zamonaviy biznes-markazni o‘z ichiga oladi. Umumiy qurilish maydoni — 2 322 m², binolarning umumiy maydoni — 18 565 m².",
      "Majmuaning umumiy foydali maydoni — 11 535 m². Aholi va tashrif buyuruvchilar uchun 106 mashina-o‘ringa mo‘ljallangan, umumiy maydoni 3 842 m² bo‘lgan avtoturargoh zonalari ko‘zda tutilgan. Qulay joylashuv poytaxtning ishbilarmonlik, savdo va madaniy obyektlariga tez yetib borishni taʼminlaydi.",
    ],
    specs: [
      { label: 'Qavatlar', value: '6 va 10 qavat' },
      { label: 'Kvartiralar', value: '108' },
      { label: 'Loyiha maydoni', value: '0,65 gektar' },
      { label: 'Xonadonlar maydoni', value: '11 535 m²' },
      { label: 'Avtoturargoh maydoni', value: '3 842 m²' },
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
      "«Botanika» — Toshkentning Mirzo Ulug‘bek tumanida, ekologik toza yashil hududda joylashgan zamonaviy turar-joy majmuasi. Loyiha zamonaviy meʼmorchilik, obod hudud va yashash uchun qulay muhitni uyg‘unlashtiradi. Majmua to‘liq foydalanishga topshirilgan.",
      "Loyiha 0,33 gektar hududda barpo etilgan va 3 ta turar-joy bloki, 4 ta kirish hamda 209 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 2 445 m², binolarning umumiy maydoni — 26 900 m².",
      "Majmuaning umumiy foydali maydoni — 15 968 m². Aholi uchun 50 mashina-o‘ringa mo‘ljallangan 2 431 m² avtoturargoh ko‘zda tutilgan. Seksiyaga qarab, har bir qavatda 4 yoki 6 ta kvartira joylashgan bo‘lib, bu qulaylik va shaxsiylikni taʼminlaydi.",
    ],
    specs: [
      { label: 'Qavatlar', value: '10 qavat + terrasa' },
      { label: 'Kvartiralar', value: '209' },
      { label: 'Loyiha maydoni', value: '0,33 gektar' },
      { label: 'Xonadonlar maydoni', value: '15 968 m²' },
      { label: 'Avtoturargoh maydoni', value: '2 431 m²' },
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
      "«Poytaxt Residence» — Toshkentning Yashnobod tumanida, Maxtumquli ko‘chasida joylashgan minimalistik uslubdagi zamonaviy turar-joy majmuasi. Loyiha ixcham meʼmorchilik, sifatli materiallar va shaharning rivojlangan hududidagi qulay joylashuvni uyg‘unlashtiradi. Majmua to‘liq foydalanishga topshirilgan, barcha kvartiralar muvaffaqiyatli sotilgan.",
      "Loyiha 1 gektar hududda joylashgan va 5 ta turar-joy bloki, 11 ta kirish hamda 361 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 4 905 m², binolarning umumiy maydoni — 44 800 m².",
      "Majmuaning umumiy foydali maydoni — 25 701 m², shundan 23 066 m² turar-joy kvartiralari, 2 635 m² esa tijorat binolari. Aholi uchun 300 mashina-o‘ringa mo‘ljallangan 2 505 m² avtoturargoh ko‘zda tutilgan.",
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
