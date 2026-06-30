import { useMemo } from 'react'
import { useTranslation } from '@/i18n'
import type { Project, ProjectDetails } from '@/data/projects'

// ─────────────────────────────────────────────────────────────────────────────
// Project content localization.
//
// The RU strings live in `src/data/projects.ts` (single source of truth + icons,
// images, coords). Here we add UZ/EN overlays keyed by slug and merge them onto
// the RU data BY INDEX, so the icon/image/structure always come from the data
// and only the human text is swapped per language. RU returns the data as-is.
// ─────────────────────────────────────────────────────────────────────────────

type Lang = 'ru' | 'uz' | 'en'

type TextPair = { title: string; description: string }

type FloorPlanTr = {
  title?: string
  rooms?: { name?: string; area?: string }[]
}

type DetailsTr = {
  description?: string[]
  advantage?: string
  specs?: Partial<ProjectDetails['specs']>
  features?: TextPair[]
  nearby?: TextPair[]
  floorPlans?: FloorPlanTr[]
}

type ProjectTr = {
  category?: string
  area?: string
  location?: string
  details?: DetailsTr
}

// ── English ──────────────────────────────────────────────────────────────────
const en: Record<string, ProjectTr> = {
  alandalus: {
    category: 'Residential complex · Comfort+',
    area: 'from 26.44 to 30.81 m²',
    location: 'Yukorichirchik district, Yangi Uzbekiston street',
    details: {
      description: [
        'The «Alandalus» residential complex is a 10-storey project with modern architecture and a comfortable living environment. Located in a quiet, ecologically clean district, it features underground parking, a children’s playground and 24/7 video surveillance. The surrounding infrastructure is well developed — all services needed for daily life are within walking distance.',
        'The total development area of the project is 0.75 hectares. The total area of residential apartments is 27,325 m², and the underground floor is 5,720 m². The apartments have 3-metre ceilings, interior walls of aerated concrete, and high-quality entrance doors and windows. The monolithic concrete structure ensures the building’s strength and long service life.',
      ],
      advantage: 'A quiet home in a big city',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '0.75 hectares',
        floors: '10 floors',
        category: 'Comfort',
        status: 'Under construction',
      },
      features: [
        { title: 'Aerated-concrete building', description: 'A modern building material with good thermal-insulation properties. It helps keep a warm temperature inside the home throughout the year.' },
        { title: 'Parking', description: 'Convenient parking in the outer part of the territory for residents of our complex. This ensures the safety of cars at night.' },
        { title: 'Children’s playground', description: 'A special play space for children of different ages. A safe and engaging place for outdoor games.' },
        { title: '3.10-metre ceilings', description: 'Spacious rooms with plenty of light and air.' },
        { title: 'Landscaping and alleys', description: 'The complex grounds are decorated with alleys and greenery. Here you can rest from the city bustle and enjoy nature.' },
        { title: 'Recreation areas', description: 'Green spaces for residents to spend time together. It is always pleasant to take a walk, chat with neighbours or spend time outdoors here.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Ashgabat Park, Eco Park, Yangi Uzbekiston Park' },
        { title: 'EDUCATION', description: 'Kindergartens, learning centers, private schools, school No. 340' },
        { title: 'TRANSPORT', description: 'Close to the city center, metro and stops nearby, convenient access to main roads' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (Yangiabad bazaar, RABAD bazaar, KARASU bazaar)' },
        { title: 'MOSQUES', description: 'Abdurahman ibn Awf Friday Mosque' },
        { title: 'QUALITY OF LIFE', description: 'Green area, quiet neighborhood, family-friendly' },
      ],
    },
  },
  'sharq-avenue': {
    category: 'Residential complex · Comfort',
    area: '3 hectares',
    location: 'Tashkent, Mirzo-Ulugbek district',
    details: {
      description: [
        '«Sharq Avenue» is a modern space created for those who value comfort, safety and a quality standard of living. The complex is located on a 3-hectare territory and includes 12 residential blocks 5 storeys high and 547 thoughtfully designed apartments.',
        'The gated guarded territory, underground parking, landscaped courtyards and recreation areas create a private and cosy environment. The total area of residential apartments is 58,728 m², commercial premises 3,237 m², and parking spaces 1,900 m².',
      ],
      advantage: 'Safety and comfort',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '3 hectares',
        floors: '5 floors · 12 blocks',
        category: 'Comfort',
        status: 'On sale',
      },
      features: [
        { title: 'Gated guarded territory', description: 'Controlled entry and video surveillance across the entire territory — a calm and safe environment for the whole family.' },
        { title: '547 apartments', description: '547 functionally planned apartments with rational geometry and a thoughtful use of space.' },
        { title: '12 blocks of 5 floors', description: 'Low-rise comfort-class development: 12 residential blocks 5 storeys high on 3 hectares.' },
        { title: 'Underground parking', description: 'A spacious underground parking — cars are kept under the building, while the courtyard stays free and safe.' },
        { title: 'Landscaped courtyards', description: 'Green courtyards, walking alleys and recreation areas for family leisure outdoors.' },
        { title: 'A modern lifestyle', description: 'A private and cosy environment that harmoniously combines safety, comfort and quality of life.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Ashgabat Park, Eco Park, Yangi Uzbekiston Park' },
        { title: 'EDUCATION', description: 'Schools No. 338, No. 171, private schools, kindergartens, learning centers' },
        { title: 'TRANSPORT', description: 'Convenient access to main roads, close to the city center, metro and stops nearby' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (TTZ bazaar, AVAYKHON bazaar, KARASU bazaar)' },
        { title: 'MOSQUES', description: 'Oltin Tepa Mosque, Mulla Kholmirza Friday Mosque' },
        { title: 'QUALITY OF LIFE', description: 'Quiet neighborhood, green area, family-friendly' },
      ],
    },
  },
  'anor-gardens': {
    category: 'Residential complex · Comfort',
    area: '3 hectares',
    location: 'Tashkent, Mirzo-Ulugbek district',
    details: {
      description: [
        '«Anor Gardens» is a modern space created for those who value comfort, safety and a quality standard of living. The complex is located on a 3-hectare territory and includes 12 residential blocks 5 storeys high and 547 thoughtfully designed apartments.',
        'The gated guarded territory, underground parking, landscaped courtyards and recreation areas create a private and cosy environment. The total area of residential apartments is 58,728 m², commercial premises 3,237 m², and parking spaces 1,900 m².',
      ],
      advantage: 'Safety and comfort',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '3 hectares',
        floors: '5 floors · 12 blocks',
        category: 'Comfort',
        status: 'On sale',
      },
      features: [
        { title: 'Gated guarded territory', description: 'Controlled entry and video surveillance across the entire territory — a calm and safe environment for the whole family.' },
        { title: '547 apartments', description: '547 functionally planned apartments with rational geometry and a thoughtful use of space.' },
        { title: '12 blocks of 5 floors', description: 'Low-rise comfort-class development: 12 residential blocks 5 storeys high on 3 hectares.' },
        { title: 'Underground parking', description: 'A spacious underground parking — cars are kept under the building, while the courtyard stays free and safe.' },
        { title: 'Landscaped courtyards', description: 'Green courtyards, walking alleys and recreation areas for family leisure outdoors.' },
        { title: 'A modern lifestyle', description: 'A private and cosy environment that harmoniously combines safety, comfort and quality of life.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Ashgabat Park, Eco Park, Yangi Uzbekiston Park' },
        { title: 'EDUCATION', description: 'Schools No. 338, No. 171, private schools, kindergartens, learning centers' },
        { title: 'TRANSPORT', description: 'Convenient access to main roads, close to the city center, metro and stops nearby' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (TTZ bazaar, AVAYKHON bazaar, KARASU bazaar)' },
        { title: 'MOSQUES', description: 'Oltin Tepa Mosque, Mulla Kholmirza Friday Mosque' },
        { title: 'QUALITY OF LIFE', description: 'Quiet neighborhood, green area, family-friendly' },
      ],
    },
  },
  'botanika-luxury': {
    category: 'Residential complex · Comfort',
    area: '0.3 hectares',
    location: 'Mirzo-Ulugbek district, Nemat dead end 197, Tashkent',
    details: {
      description: [
        'The «Botanika» residential complex is located in the Mirzo-Ulugbek district, opposite the Botanical Garden. The upper floors feature penthouses with private terraces and open balconies that let you enjoy the picturesque views of the Botanical Garden.',
        'The complex consists of 3 blocks and 4 entrances and is built in an ecologically clean and green area. The underground part of the 11-storey building includes a modern parking of 15,968 m². The total development area of the project is 0.3 hectares, and the total area of residential apartments is 19,960 m².',
      ],
      advantage: 'Terraces overlooking the Botanical Garden',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '0.3 hectares',
        floors: '10–11 floors',
        category: 'Comfort',
        status: 'Under construction',
      },
      features: [
        { title: 'Aerated-concrete building', description: 'A modern building material with good thermal-insulation properties. It helps maintain a comfortable temperature inside the home all year round.' },
        { title: 'Apartments with terraces on floors 10–11', description: 'Exclusive apartments with a spacious private terrace and panoramic city views. The ideal place for relaxing, family evenings and morning coffee under the open sky.' },
        { title: 'High 3.10 m ceilings', description: 'All floors have 3.10-metre ceilings — spacious, bright rooms with plenty of air.' },
        { title: 'Above-ground and underground parking', description: 'Convenient parking solutions are provided for residents. This ensures comfort and safety for cars in any season.' },
        { title: 'Children’s playground', description: 'A modern and safe playground for the games and development of children of different ages. The space is designed for active and engaging recreation.' },
        { title: 'Landscaping and alleys', description: 'The complex grounds are decorated with trees and greenery. Walking alleys create a pleasant atmosphere for daily strolls.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Zoo, Yashnaa Park, Mirzo Ulugbek Park' },
        { title: 'EDUCATION', description: 'Schools No. 27, No. 99, Westminster International School, private schools, kindergartens' },
        { title: 'TRANSPORT', description: 'Convenient access to main roads, close to the city center, metro and stops nearby' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (Buz bazaar, Parkent market)' },
        { title: 'MOSQUES', description: 'Okkurgan Mosque, Tepamasjid' },
        { title: 'QUALITY OF LIFE', description: 'Quiet neighborhood, green area, family-friendly' },
      ],
    },
  },
  'vatan-village': {
    category: 'Cottage village · Comfort+',
    area: 'plots from 3 to 7 sotka',
    location: 'Mirzo-Ulugbek district, Yangi Uzbekiston street',
    details: {
      description: [
        '«Vatan Village» is a modern cottage village built on a 460-sotka territory. The complex brings together around 90 cottages; each house has its own land plot ranging from 3 to 7 sotka. The total development area is 24,375 m², and the parking space is 1,100 m².',
        'The territory includes children’s playgrounds, a mini-stadium, recreation areas and numerous green spaces for family leisure. The gated and guarded territory provides residents with a safe and comfortable living environment.',
      ],
      advantage: 'A home for a big family',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '460 sotka',
        floors: '3 floors',
        category: 'Comfort+',
        status: 'Under construction',
      },
      features: [
        { title: 'Brick house', description: 'Reliable brick walls: strength for decades, good thermal and sound insulation in any season.' },
        { title: 'Gated guarded territory', description: 'A fenced courtyard with round-the-clock security and video surveillance — peace and safety for the whole family.' },
        { title: 'Monolithic frame', description: 'A monolithic concrete frame made from our own plant’s materials — structural stability and freedom of layouts.' },
        { title: 'Close to the center', description: 'Convenient location in the Mirzo-Ulugbek district: just a few minutes to the city center and main roads.' },
        { title: 'Barbecue area', description: 'A dedicated space for family dinners and outdoor relaxation in the complex’s courtyard.' },
        { title: 'Car parking', description: 'A convenient parking space on the plot’s territory — for residents and their guests.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Ashgabat Park, Eco Park, Yangi Uzbekiston Park' },
        { title: 'EDUCATION', description: 'Kindergartens, learning centers, private schools, school No. 340' },
        { title: 'TRANSPORT', description: 'Close to the city center, metro and stops nearby, convenient access to main roads' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (Yangiabad bazaar, RABAD bazaar, KARASU bazaar)' },
        { title: 'MOSQUES', description: 'Abdurahman ibn Awf Friday Mosque' },
        { title: 'QUALITY OF LIFE', description: 'Green area, quiet neighborhood, family-friendly' },
      ],
      floorPlans: [
        {
          title: 'Basement floor plan',
          rooms: [
            { name: 'Utility room', area: '76.5 m²' },
            { name: 'Hall', area: '19.6 m²' },
            { name: 'Corridor', area: '4.7 m²' },
            { name: 'Room', area: '23.5 m²' },
            { name: 'Room', area: '10.2 m²' },
            { name: 'Vestibule', area: '4.8 m²' },
          ],
        },
        {
          title: '1st floor plan',
          rooms: [
            { name: 'Corridor', area: '24.0 m²' },
            { name: 'Kitchen', area: '34.7 m²' },
            { name: 'Shared bathroom', area: '4.5 m²' },
            { name: 'Bathroom', area: '4.0 m²' },
            { name: 'Bedroom', area: '27.0 m²' },
            { name: 'Living room', area: '41.4 m²' },
          ],
        },
        {
          title: '2nd floor plan',
          rooms: [
            { name: 'Hall', area: '24.0 m²' },
            { name: 'Bedroom', area: '34.7 m²' },
            { name: 'Shared bathroom', area: '4.5 m²' },
            { name: 'Bathroom', area: '4.0 m²' },
            { name: 'Living room', area: '27.0 m²' },
            { name: 'Bedroom', area: '24.0 m²' },
            { name: 'Bedroom', area: '16.7 m²' },
          ],
        },
      ],
    },
  },
  turon: {
    category: 'Residential complex · Comfort',
    area: '2.5 hectares',
    location: 'Mirzo-Ulugbek district, Yangi Uzbekiston street',
    details: {
      description: [
        'The «Turon» residential complex is located in Tashkent, in the Mirzo-Ulugbek district. The project consists of buildings 5, 6 and 7 storeys high and includes 12 blocks located in the front and rear parts of the territory. Turon combines modern urban life with a calm atmosphere: low-rise comfort-class development, favourable climatic conditions and a quiet setting.',
        'The total development area of the project is 2.5 hectares. The total area of residential apartments is 39,331.25 m², the underground floor area is 10,550 m², and the total area of commercial premises is 14,407.5 m². Shops, cafés and services are located on the ground floor — everything you need within walking distance.',
      ],
      advantage: 'A quiet comfort-class neighborhood',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '2.5 hectares',
        floors: '5, 6 and 7 floors',
        category: 'Comfort',
        status: 'Under construction',
      },
      features: [
        { title: 'Aerated-concrete building', description: 'A modern building material with good thermal-insulation properties. It helps maintain a comfortable temperature inside the home all year round.' },
        { title: 'High 3.10 m ceilings', description: 'All floors have 3.10-metre ceilings — spacious rooms with plenty of light and air.' },
        { title: 'Above-ground and underground parking', description: 'Convenient parking solutions are provided for residents. This ensures comfort and safety for cars in any season.' },
        { title: 'Commercial premises', description: 'Shops, cafés and services are located on the ground floor. Everything you need is right next to home, within walking distance.' },
        { title: 'Children’s playground', description: 'A modern and safe playground for the games and development of children of different ages. The space is designed for active and engaging recreation.' },
        { title: 'Landscaping and alleys', description: 'The complex grounds are decorated with trees and greenery. Walking alleys create a pleasant atmosphere for daily strolls.' },
      ],
      nearby: [
        { title: 'PARKS', description: 'Ashgabat Park, Eco Park, Yangi Uzbekiston Park' },
        { title: 'EDUCATION', description: 'Schools No. 338, No. 171, private schools, kindergartens, learning centers' },
        { title: 'TRANSPORT', description: 'Convenient access to main roads, close to the city center, metro and stops nearby' },
        { title: 'SHOPPING', description: 'Convenience stores, supermarkets, shopping areas (TTZ bazaar, AVAYKHON bazaar, KARASU bazaar)' },
        { title: 'MOSQUES', description: 'Oltin Tepa Mosque, Mulla Kholmirza Friday Mosque' },
        { title: 'QUALITY OF LIFE', description: 'Quiet neighborhood, green area, family-friendly' },
      ],
    },
  },
  'challet-resort': {
    category: 'Residential complex · Comfort',
    area: 'from 26.44 to 30.81 m²',
    location: 'Yusufkhona, 60 minutes from Tashkent',
    details: {
      description: [
        '«Challet Resort» is a countryside complex in a resort format in the picturesque Yusufkhona area, just an hour’s drive from Tashkent. Modern houses with panoramic glazing and finishes of natural stone and wood blend harmoniously into the surrounding natural landscape.',
        'The complex grounds feature its own swimming pool with a recreation area, a restaurant and landscaped walking alleys. The gated guarded territory, clean air and silence create the atmosphere of a true resort for year-round living.',
      ],
      advantage: 'A resort for year-round living',
      specs: {
        address: 'Yusufkhona, 60 minutes from Tashkent',
        area: 'from 90 to 220 m²',
        floors: '2 floors',
        category: 'Countryside · Comfort',
        status: 'Under construction',
      },
      features: [
        { title: 'Natural stone and wood', description: 'Façades made of natural stone and wood — durability, prestige and unity with the surrounding nature.' },
        { title: 'Swimming pool and recreation area', description: 'Your own swimming pool with a recreation area and sun loungers — outdoor relaxation without leaving the territory.' },
        { title: 'Restaurant on site', description: 'A restaurant within the complex: a place for meetings, dinners and relaxation — within walking distance of home.' },
        { title: 'Panoramic glazing', description: 'Large stained-glass windows fill the houses with light and open up views of nature and the mountains.' },
        { title: 'Gated territory', description: 'A fenced guarded territory with round-the-clock video surveillance — peace of mind for the whole family.' },
        { title: 'Parking by the house', description: 'Private parking spaces by each house — convenient for residents and guests.' },
      ],
      nearby: [
        { title: 'NATURE', description: 'Mountains, forest and clean air outside the city' },
        { title: 'QUALITY OF LIFE', description: 'Silence, privacy and recreation all year round' },
        { title: 'TRANSPORT', description: 'About 60 minutes to the center of Tashkent, convenient access to the highway' },
        { title: 'INFRASTRUCTURE', description: 'A restaurant, shops and services on the complex grounds' },
        { title: 'RECREATION', description: 'A swimming pool, barbecue areas and walking alleys' },
        { title: 'FAMILY & KIDS', description: 'Playgrounds and a safe gated environment' },
      ],
    },
  },
  'western-housing': {
    category: 'Residential complex · Comfort',
    area: 'from 26.44 to 30.81 m²',
    location: 'Tashkent, Sergeli district, Kuyluk-5, Khalkabad mahalla',
  },
  chulpon: {
    category: 'Business center',
    area: '625 m² · 5 floors',
    location: 'Tashkent, Yunusabad district',
  },
  aviasozlar: {
    category: 'Business center',
    area: '5 floors',
    location: 'Tashkent',
  },
  'bogi-shamol': {
    category: 'Business center',
    area: '625 m² · 5 floors',
    location: 'Tashkent, Yunusabad district',
  },
  'yakkasaroy-bc': {
    category: 'Business center',
    area: '5 floors',
    location: 'Tashkent',
  },
}

// ── Uzbek (Latin) ────────────────────────────────────────────────────────────
const uz: Record<string, ProjectTr> = {
  alandalus: {
    category: 'Turar-joy majmuasi · Komfort+',
    area: '26,44 dan 30,81 m² gacha',
    location: 'Yuqori Chirchiq tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Alandalus» turar-joy majmuasi — zamonaviy meʼmorchilik va qulay yashash muhitiga ega 10 qavatli loyiha. Tinch, ekologik toza hududda joylashgan bo‘lib, yerto‘la avtoturargohi, bolalar maydonchasi va 24/7 videokuzatuv tizimi bilan jihozlangan. Atrofdagi infratuzilma rivojlangan — kundalik hayot uchun zarur barcha xizmatlar piyoda yetib boriladigan masofada.',
        'Loyihaning umumiy qurilish maydoni — 0,75 gektar. Turar-joy kvartiralarining umumiy maydoni — 27 325 m², yerto‘la qavati — 5 720 m². Kvartiralarda shift balandligi 3 metr, ichki devorlar gazobetondan, sifatli kirish eshiklari va derazalar o‘rnatilgan. Monolit-beton konstruksiya bino mustahkamligini va uzoq muddat xizmat qilishini taʼminlaydi.',
      ],
      advantage: 'Katta shaharda tinch uy',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '0,75 gektar',
        floors: '10 qavat',
        category: 'Komfort',
        status: 'Qurilmoqda',
      },
      features: [
        { title: 'Gazoblokli uy', description: 'Yaxshi issiqlik izolyatsiyasi xususiyatlariga ega zamonaviy qurilish materiali. Uyda yil davomida iliq haroratni saqlashga yordam beradi.' },
        { title: 'Avtoturargoh', description: 'Majmuamiz aholisi uchun hududning tashqi qismida qulay avtoturargoh. Bu tunda avtomobillar xavfsizligini taʼminlaydi.' },
        { title: 'Bolalar maydonchasi', description: 'Turli yoshdagi bolalar uchun maxsus o‘yin maydoni. Ochiq havoda o‘ynash uchun xavfsiz va qiziqarli joy.' },
        { title: '3,10 metrli shiftlar', description: 'Yorug‘lik va havoga boy keng xonalar.' },
        { title: 'Ko‘kalamzorlashtirish va xiyobonlar', description: 'Majmua hududi xiyobonlar va yashil o‘simliklar bilan bezatilgan. Bu yerda shahar shovqinidan dam olib, tabiatdan bahramand bo‘lishingiz mumkin.' },
        { title: 'Dam olish zonalari', description: 'Aholining birgalikda vaqt o‘tkazishi uchun yashil maydonlar. Bu yerda sayr qilish, qo‘shnilar bilan suhbatlashish yoki ochiq havoda vaqt o‘tkazish doimo yoqimli.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Ashxabad park, Eco Park, Yangi O‘zbekiston park' },
        { title: 'TAʼLIM', description: 'Bolalar bog‘chalari, o‘quv markazlari, xususiy maktablar, 340-maktab' },
        { title: 'TRANSPORT', description: 'Shahar markaziga yaqin, metro va bekatlar yaqin, asosiy yo‘llarga qulay chiqish' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (Yangiobod bozori, RABAD bozori, Qorasuv bozori)' },
        { title: 'MASJIDLAR', description: 'Abdurahmon ibn Avf jome masjidi' },
        { title: 'YASHASH QULAYLIGI', description: 'Yashil hudud, tinch mahalla, oila uchun qulay' },
      ],
    },
  },
  'sharq-avenue': {
    category: 'Turar-joy majmuasi · Komfort',
    area: '3 gektar',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    details: {
      description: [
        '«Sharq Avenue» — komfort, xavfsizlik va sifatli hayot darajasini qadrlovchilar uchun yaratilgan zamonaviy makon. Majmua 3 gektar hududda joylashgan bo‘lib, 5 qavatli 12 ta turar-joy bloki va puxta loyihalashtirilgan 547 ta kvartirani o‘z ichiga oladi.',
        'Yopiq qo‘riqlanadigan hudud, yerosti avtoturargohi, obod hovlilar va dam olish zonalari shaxsiy va shinam muhit yaratadi. Turar-joy kvartiralarining umumiy maydoni — 58 728 m², tijorat binolari — 3 237 m², avtoturargoh joylari — 1 900 m².',
      ],
      advantage: 'Xavfsizlik va komfort',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '3 gektar',
        floors: '5 qavat · 12 blok',
        category: 'Komfort',
        status: 'Sotuvda',
      },
      features: [
        { title: 'Yopiq qo‘riqlanadigan hudud', description: 'Nazorat ostidagi kirish va butun hudud bo‘ylab videokuzatuv — butun oila uchun tinch va xavfsiz muhit.' },
        { title: '547 ta kvartira', description: 'Ratsional geometriya va makondan oqilona foydalanishga ega 547 ta funksional rejalashtirilgan kvartira.' },
        { title: '5 qavatli 12 ta blok', description: 'Komfort darajasidagi past qavatli qurilish: 3 gektarda 5 qavatli 12 ta turar-joy bloki.' },
        { title: 'Yerosti avtoturargohi', description: 'Keng yerosti avtoturargohi — avtomobillar bino ostida, hovli esa bo‘sh va xavfsiz qoladi.' },
        { title: 'Obod hovlilar', description: 'Ko‘kalamzorlashtirilgan hovlilar, sayr xiyobonlari va ochiq havoda oilaviy hordiq uchun dam olish zonalari.' },
        { title: 'Zamonaviy turmush tarzi', description: 'Xavfsizlik, komfort va hayot sifati uyg‘un birlashgan shaxsiy va shinam muhit.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Ashxabad park, Eco Park, Yangi O‘zbekiston park' },
        { title: 'TAʼLIM', description: '338-, 171-maktablar, xususiy maktablar, bolalar bog‘chalari, o‘quv markazlari' },
        { title: 'TRANSPORT', description: 'Asosiy yo‘llarga qulay chiqish, shahar markaziga yaqin, metro va bekatlar yaqin' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (TTZ bozori, AVAYXON bozori, Qorasuv bozori)' },
        { title: 'MASJIDLAR', description: 'Oltin Tepa masjidi, Mulla Xolmirza jome masjidi' },
        { title: 'YASHASH QULAYLIGI', description: 'Tinch mahalla, yashil hudud, oila uchun qulay' },
      ],
    },
  },
  'anor-gardens': {
    category: 'Turar-joy majmuasi · Komfort',
    area: '3 gektar',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    details: {
      description: [
        '«Anor Gardens» — komfort, xavfsizlik va sifatli hayot darajasini qadrlovchilar uchun yaratilgan zamonaviy makon. Majmua 3 gektar hududda joylashgan bo‘lib, 5 qavatli 12 ta turar-joy bloki va puxta loyihalashtirilgan 547 ta kvartirani o‘z ichiga oladi.',
        'Yopiq qo‘riqlanadigan hudud, yerosti avtoturargohi, obod hovlilar va dam olish zonalari shaxsiy va shinam muhit yaratadi. Turar-joy kvartiralarining umumiy maydoni — 58 728 m², tijorat binolari — 3 237 m², avtoturargoh joylari — 1 900 m².',
      ],
      advantage: 'Xavfsizlik va komfort',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '3 gektar',
        floors: '5 qavat · 12 blok',
        category: 'Komfort',
        status: 'Sotuvda',
      },
      features: [
        { title: 'Yopiq qo‘riqlanadigan hudud', description: 'Nazorat ostidagi kirish va butun hudud bo‘ylab videokuzatuv — butun oila uchun tinch va xavfsiz muhit.' },
        { title: '547 ta kvartira', description: 'Ratsional geometriya va makondan oqilona foydalanishga ega 547 ta funksional rejalashtirilgan kvartira.' },
        { title: '5 qavatli 12 ta blok', description: 'Komfort darajasidagi past qavatli qurilish: 3 gektarda 5 qavatli 12 ta turar-joy bloki.' },
        { title: 'Yerosti avtoturargohi', description: 'Keng yerosti avtoturargohi — avtomobillar bino ostida, hovli esa bo‘sh va xavfsiz qoladi.' },
        { title: 'Obod hovlilar', description: 'Ko‘kalamzorlashtirilgan hovlilar, sayr xiyobonlari va ochiq havoda oilaviy hordiq uchun dam olish zonalari.' },
        { title: 'Zamonaviy turmush tarzi', description: 'Xavfsizlik, komfort va hayot sifati uyg‘un birlashgan shaxsiy va shinam muhit.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Ashxabad park, Eco Park, Yangi O‘zbekiston park' },
        { title: 'TAʼLIM', description: '338-, 171-maktablar, xususiy maktablar, bolalar bog‘chalari, o‘quv markazlari' },
        { title: 'TRANSPORT', description: 'Asosiy yo‘llarga qulay chiqish, shahar markaziga yaqin, metro va bekatlar yaqin' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (TTZ bozori, AVAYXON bozori, Qorasuv bozori)' },
        { title: 'MASJIDLAR', description: 'Oltin Tepa masjidi, Mulla Xolmirza jome masjidi' },
        { title: 'YASHASH QULAYLIGI', description: 'Tinch mahalla, yashil hudud, oila uchun qulay' },
      ],
    },
  },
  'botanika-luxury': {
    category: 'Turar-joy majmuasi · Komfort',
    area: '0,3 gektar',
    location: 'Mirzo Ulug‘bek tumani, Nemat berk ko‘chasi 197, Toshkent',
    details: {
      description: [
        '«Botanika» turar-joy majmuasi Mirzo Ulug‘bek tumanida, Botanika bog‘i ro‘parasida joylashgan. Yuqori qavatlarda shaxsiy terrasalar va ochiq balkonlarga ega pentxauslar joylashgan bo‘lib, ular Botanika bog‘ining go‘zal manzaralaridan bahramand bo‘lish imkonini beradi.',
        'Majmua 3 ta blok va 4 ta kirishdan iborat bo‘lib, ekologik toza va yashil hududda barpo etilgan. 11 qavatli binoning yerosti qismida 15 968 m² maydonli zamonaviy avtoturargoh mavjud. Loyihaning umumiy qurilish maydoni — 0,3 gektar, turar-joy kvartiralarining umumiy maydoni — 19 960 m².',
      ],
      advantage: 'Botanika bog‘iga qaragan terrasalar',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '0,3 gektar',
        floors: '10–11 qavat',
        category: 'Komfort',
        status: 'Qurilmoqda',
      },
      features: [
        { title: 'Gazoblokli uy', description: 'Yaxshi issiqlik izolyatsiyasi xususiyatlariga ega zamonaviy qurilish materiali. Uyda yil davomida qulay haroratni saqlashga yordam beradi.' },
        { title: '10–11-qavatlarda terrasali kvartiralar', description: 'Keng shaxsiy terrasa va shaharning panoramali manzarasiga ega eksklyuziv kvartiralar. Dam olish, oilaviy kechalar va ochiq osmon ostida ertalabki qahva uchun ideal joy.' },
        { title: 'Baland shiftlar 3,10 m', description: 'Barcha qavatlar 3,10 metrli shiftlarga ega — havoga boy keng va yorug‘ xonalar.' },
        { title: 'Yer usti va yerosti avtoturargohlari', description: 'Aholi uchun qulay avtoturargoh yechimlari ko‘zda tutilgan. Bu yilning istalgan faslida avtomobillar uchun qulaylik va xavfsizlikni taʼminlaydi.' },
        { title: 'Bolalar maydonchasi', description: 'Turli yoshdagi bolalarning o‘yinlari va rivojlanishi uchun zamonaviy va xavfsiz bolalar maydonchasi. Makon faol va qiziqarli dam olish uchun puxta o‘ylangan.' },
        { title: 'Ko‘kalamzorlashtirish va xiyobonlar', description: 'Majmua hududi daraxtlar va yashil o‘simliklar bilan bezatilgan. Sayr xiyobonlari kundalik sayrlar uchun yoqimli muhit yaratadi.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Hayvonot bog‘i, Yashnaa Park, Mirzo Ulug‘bek bog‘i' },
        { title: 'TAʼLIM', description: '27-, 99-maktablar, Westminster International School, xususiy maktablar, bolalar bog‘chalari' },
        { title: 'TRANSPORT', description: 'Asosiy yo‘llarga qulay chiqish, shahar markaziga yaqin, metro va bekatlar yaqin' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (Buz bozori, Parkent bozori)' },
        { title: 'MASJIDLAR', description: 'Oqqo‘rg‘on masjidi, Tepamasjid' },
        { title: 'YASHASH QULAYLIGI', description: 'Tinch mahalla, yashil hudud, oila uchun qulay' },
      ],
    },
  },
  'vatan-village': {
    category: 'Kottedj shaharchasi · Komfort+',
    area: '3 dan 7 sotixgacha uchastkalar',
    location: 'Mirzo Ulug‘bek tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Vatan Village» — 460 sotix hududda qurilgan zamonaviy kottedj shaharchasi. Majmua qariyb 90 ta kottedjni birlashtiradi; har bir uy 3 dan 7 sotixgacha bo‘lgan o‘z yer uchastkasiga ega. Umumiy qurilish maydoni — 24 375 m², avtoturargoh maydoni — 1 100 m².',
        'Hududda bolalar maydonchalari, mini-stadion, dam olish zonalari va oilaviy hordiq uchun ko‘plab yashil maydonlar mavjud. Yopiq va qo‘riqlanadigan hudud aholiga xavfsiz va qulay yashash muhitini taʼminlaydi.',
      ],
      advantage: 'Katta oila uchun uy',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '460 sotix',
        floors: '3 qavat',
        category: 'Komfort+',
        status: 'Qurilmoqda',
      },
      features: [
        { title: 'G‘ishtli uy', description: 'Ishonchli g‘isht devorlar: o‘nlab yillarga mo‘ljallangan mustahkamlik, yilning istalgan faslida yaxshi issiqlik va tovush izolyatsiyasi.' },
        { title: 'Yopiq qo‘riqlanadigan hudud', description: 'Kechayu kunduz qo‘riqlash va videokuzatuvga ega o‘ralgan hovli — butun oila uchun xotirjamlik va xavfsizlik.' },
        { title: 'Monolit karkas', description: 'O‘z zavodimiz materiallaridan tayyorlangan monolit-beton karkas — konstruksiya barqarorligi va rejalashtirish erkinligi.' },
        { title: 'Markazga yaqinlik', description: 'Mirzo Ulug‘bek tumanidagi qulay joylashuv: shahar markazi va asosiy yo‘llargacha — bir necha daqiqa.' },
        { title: 'Barbekyu zonasi', description: 'Majmua hovlisida oilaviy kechki ovqatlar va ochiq havoda dam olish uchun maxsus maydon.' },
        { title: 'Avtomobil uchun avtoturargoh', description: 'Uchastka hududidagi qulay avtoturargoh joyi — aholi va ularning mehmonlari uchun.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Ashxabad park, Eco Park, Yangi O‘zbekiston park' },
        { title: 'TAʼLIM', description: 'Bolalar bog‘chalari, o‘quv markazlari, xususiy maktablar, 340-maktab' },
        { title: 'TRANSPORT', description: 'Shahar markaziga yaqin, metro va bekatlar yaqin, asosiy yo‘llarga qulay chiqish' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (Yangiobod bozori, RABAD bozori, Qorasuv bozori)' },
        { title: 'MASJIDLAR', description: 'Abdurahmon ibn Avf jome masjidi' },
        { title: 'YASHASH QULAYLIGI', description: 'Yashil hudud, tinch mahalla, oila uchun qulay' },
      ],
      floorPlans: [
        {
          title: 'Yerto‘la qavati rejasi',
          rooms: [
            { name: 'Xo‘jalik xonasi', area: '76.5 m²' },
            { name: 'Xoll', area: '19.6 m²' },
            { name: 'Yo‘lak', area: '4.7 m²' },
            { name: 'Xona', area: '23.5 m²' },
            { name: 'Xona', area: '10.2 m²' },
            { name: 'Tambur', area: '4.8 m²' },
          ],
        },
        {
          title: '1-qavat rejasi',
          rooms: [
            { name: 'Yo‘lak', area: '24.0 m²' },
            { name: 'Oshxona', area: '34.7 m²' },
            { name: 'Umumiy hojatxona', area: '4.5 m²' },
            { name: 'Hojatxona', area: '4.0 m²' },
            { name: 'Yotoqxona', area: '27.0 m²' },
            { name: 'Mehmonxona', area: '41.4 m²' },
          ],
        },
        {
          title: '2-qavat rejasi',
          rooms: [
            { name: 'Xoll', area: '24.0 m²' },
            { name: 'Yotoqxona', area: '34.7 m²' },
            { name: 'Umumiy hojatxona', area: '4.5 m²' },
            { name: 'Hojatxona', area: '4.0 m²' },
            { name: 'Mehmonxona', area: '27.0 m²' },
            { name: 'Yotoqxona', area: '24.0 m²' },
            { name: 'Yotoqxona', area: '16.7 m²' },
          ],
        },
      ],
    },
  },
  turon: {
    category: 'Turar-joy majmuasi · Komfort',
    area: '2,5 gektar',
    location: 'Mirzo Ulug‘bek tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Turon» turar-joy majmuasi Toshkentda, Mirzo Ulug‘bek tumanida joylashgan. Loyiha 5, 6 va 7 qavatli binolardan iborat bo‘lib, hududning old va orqa qismlarida joylashgan 12 ta blokni o‘z ichiga oladi. Turon zamonaviy shahar hayotini xotirjamlik muhiti bilan uyg‘unlashtiradi: komfort darajasidagi past qavatli qurilish, qulay iqlim sharoiti va tinch muhit.',
        'Loyihaning umumiy qurilish maydoni — 2,5 gektar. Turar-joy kvartiralarining umumiy maydoni 39 331,25 m², yerto‘la qavati maydoni — 10 550 m², tijorat binolarining umumiy maydoni esa — 14 407,5 m². Birinchi qavatda do‘konlar, kafelar va xizmatlar joylashgan — zarur bo‘lgan hamma narsa piyoda yetib boriladigan masofada.',
      ],
      advantage: 'Komfort darajasidagi tinch hudud',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '2,5 gektar',
        floors: '5, 6 va 7 qavat',
        category: 'Komfort',
        status: 'Qurilmoqda',
      },
      features: [
        { title: 'Gazoblokli uy', description: 'Yaxshi issiqlik izolyatsiyasi xususiyatlariga ega zamonaviy qurilish materiali. Uyda yil davomida qulay haroratni saqlashga yordam beradi.' },
        { title: 'Baland shiftlar 3,10 m', description: 'Barcha qavatlar 3,10 metrli shiftlarga ega — yorug‘lik va havoga boy keng xonalar.' },
        { title: 'Yer usti va yerosti avtoturargohlari', description: 'Aholi uchun qulay avtoturargoh yechimlari ko‘zda tutilgan. Bu yilning istalgan faslida avtomobillar uchun qulaylik va xavfsizlikni taʼminlaydi.' },
        { title: 'Tijorat binolari', description: 'Birinchi qavatda do‘konlar, kafelar va xizmatlar joylashgan. Zarur bo‘lgan hamma narsa — uy yonida, piyoda yetib boriladigan masofada.' },
        { title: 'Bolalar maydonchasi', description: 'Turli yoshdagi bolalarning o‘yinlari va rivojlanishi uchun zamonaviy va xavfsiz bolalar maydonchasi. Makon faol va qiziqarli dam olish uchun puxta o‘ylangan.' },
        { title: 'Ko‘kalamzorlashtirish va xiyobonlar', description: 'Majmua hududi daraxtlar va yashil o‘simliklar bilan bezatilgan. Sayr xiyobonlari kundalik sayrlar uchun yoqimli muhit yaratadi.' },
      ],
      nearby: [
        { title: 'PARKLAR', description: 'Ashxabad park, Eco Park, Yangi O‘zbekiston park' },
        { title: 'TAʼLIM', description: '338-, 171-maktablar, xususiy maktablar, bolalar bog‘chalari, o‘quv markazlari' },
        { title: 'TRANSPORT', description: 'Asosiy yo‘llarga qulay chiqish, shahar markaziga yaqin, metro va bekatlar yaqin' },
        { title: 'SAVDO MARKAZLARI', description: 'Uy yonidagi do‘konlar, supermarketlar, savdo hududlari (TTZ bozori, AVAYXON bozori, Qorasuv bozori)' },
        { title: 'MASJIDLAR', description: 'Oltin Tepa masjidi, Mulla Xolmirza jome masjidi' },
        { title: 'YASHASH QULAYLIGI', description: 'Tinch mahalla, yashil hudud, oila uchun qulay' },
      ],
    },
  },
  'challet-resort': {
    category: 'Turar-joy majmuasi · Komfort',
    area: '26,44 dan 30,81 m² gacha',
    location: 'Yusufxona, Toshkentdan 60 daqiqa',
    details: {
      description: [
        '«Challet Resort» — Toshkentdan atigi bir soatlik masofada, go‘zal Yusufxona hududidagi kurort formatidagi shahar tashqarisi majmuasi. Panoramali oynavand va tabiiy tosh hamda yog‘ochdan pardozlangan zamonaviy uylar atrofdagi tabiiy landshaftga uyg‘un tarzda mujassam.',
        'Majmua hududida dam olish zonasiga ega o‘z basseyni, restoran va obod sayr yo‘laklari mavjud. Yopiq qo‘riqlanadigan hudud, toza havo va sukunat yil davomida yashash uchun haqiqiy kurort muhitini yaratadi.',
      ],
      advantage: 'Yil davomida yashash uchun kurort',
      specs: {
        address: 'Yusufxona, Toshkentdan 60 daqiqa',
        area: '90 dan 220 m² gacha',
        floors: '2 qavat',
        category: 'Shahar tashqarisi · Komfort',
        status: 'Qurilmoqda',
      },
      features: [
        { title: 'Tabiiy tosh va yog‘och', description: 'Tabiiy tosh va yog‘ochdan tayyorlangan fasadlar — uzoq umrlilik, nufuz va atrofdagi tabiat bilan uyg‘unlik.' },
        { title: 'Basseyn va dam olish zonasi', description: 'Dam olish zonasi va shezlonglarga ega o‘z basseyni — hududdan chiqmasdan ochiq havoda dam olish.' },
        { title: 'Hududda restoran', description: 'Majmua tarkibidagi restoran: uchrashuvlar, kechki ovqatlar va dam olish uchun joy — uydan piyoda yetib boriladigan masofada.' },
        { title: 'Panoramali oynavandlik', description: 'Katta vitraj oynalar uylarni yorug‘likka to‘ldiradi va tabiat hamda tog‘lar manzarasini ochadi.' },
        { title: 'Yopiq hudud', description: 'Kechayu kunduz videokuzatuvga ega o‘ralgan qo‘riqlanadigan hudud — butun oila uchun xotirjamlik.' },
        { title: 'Uy yonida avtoturargoh', description: 'Har bir uy yonida shaxsiy avtoturargoh joylari — aholi va mehmonlar uchun qulay.' },
      ],
      nearby: [
        { title: 'TABIAT', description: 'Tog‘lar, o‘rmon va shahar tashqarisidagi toza havo' },
        { title: 'YASHASH QULAYLIGI', description: 'Sukunat, shaxsiylik va yil davomida dam olish' },
        { title: 'TRANSPORT', description: 'Toshkent markazigacha taxminan 60 daqiqa, trassaga qulay chiqish' },
        { title: 'INFRATUZILMA', description: 'Majmua hududida restoran, do‘konlar va xizmatlar' },
        { title: 'DAM OLISH', description: 'Basseyn, barbekyu zonalari va sayr xiyobonlari' },
        { title: 'OILA VA BOLALAR', description: 'Bolalar maydonchalari va xavfsiz yopiq muhit' },
      ],
    },
  },
  'western-housing': {
    category: 'Turar-joy majmuasi · Komfort',
    area: '26,44 dan 30,81 m² gacha',
    location: 'Toshkent sh., Sergeli tumani, Quyluq-5, Xalqobod mahallasi',
  },
  chulpon: {
    category: 'Biznes-markaz',
    area: '625 m² · 5 qavat',
    location: 'Toshkent sh., Yunusobod tumani',
  },
  aviasozlar: {
    category: 'Biznes-markaz',
    area: '5 qavat',
    location: 'Toshkent sh.',
  },
  'bogi-shamol': {
    category: 'Biznes-markaz',
    area: '625 m² · 5 qavat',
    location: 'Toshkent sh., Yunusobod tumani',
  },
  'yakkasaroy-bc': {
    category: 'Biznes-markaz',
    area: '5 qavat',
    location: 'Toshkent sh.',
  },
}

const PROJECT_I18N: Record<'uz' | 'en', Record<string, ProjectTr>> = { uz, en }

function mergeDetails(base: ProjectDetails, tr: DetailsTr): ProjectDetails {
  return {
    ...base,
    description: tr.description ?? base.description,
    advantage: tr.advantage ?? base.advantage,
    specs: { ...base.specs, ...(tr.specs ?? {}) },
    features: base.features.map((f, i) => ({ ...f, ...(tr.features?.[i] ?? {}) })),
    nearby: base.nearby.map((n, i) => ({ ...n, ...(tr.nearby?.[i] ?? {}) })),
    floorPlans: base.floorPlans?.map((fp, i) => {
      const t = tr.floorPlans?.[i]
      if (!t) return fp
      return {
        ...fp,
        title: t.title ?? fp.title,
        rooms: fp.rooms.map((r, j) => ({ ...r, ...(t.rooms?.[j] ?? {}) })),
      }
    }),
  }
}

/** Returns a copy of the project with category/area/location/details localized. */
export function localizeProject(p: Project, lang: Lang): Project {
  if (lang === 'ru') return p
  const tr = PROJECT_I18N[lang]?.[p.slug]
  if (!tr) return p
  return {
    ...p,
    category: tr.category ?? p.category,
    area: tr.area ?? p.area,
    location: tr.location ?? p.location,
    details: p.details && tr.details ? mergeDetails(p.details, tr.details) : p.details,
  }
}

/** Hook: localize a single project (or null) for the active language. */
export function useLocalizedProject(p: Project | null | undefined): Project | null | undefined {
  const { lang } = useTranslation()
  return useMemo(() => (p ? localizeProject(p, lang as Lang) : p), [p, lang])
}

/** Hook: localize a list of projects for the active language. */
export function useLocalizedProjects(list: Project[]): Project[] {
  const { lang } = useTranslation()
  return useMemo(() => list.map((p) => localizeProject(p, lang as Lang)), [list, lang])
}
