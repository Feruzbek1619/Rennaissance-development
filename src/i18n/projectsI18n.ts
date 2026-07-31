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
  breakdown?: { label?: string; value?: string }[]
}

type ProjectTr = {
  category?: string
  area?: string
  location?: string
  details?: DetailsTr
}

// ── English ──────────────────────────────────────────────────────────────────
const en: Record<string, ProjectTr> = {
  botanika: {
    category: 'Residential complex · Comfort',
    area: '0.33 hectares',
    location: 'Tashkent, Mirzo-Ulugbek district',
    details: {
      description: [
        '«Botanika» is a modern residential complex in the Mirzo-Ulugbek district of Tashkent, located in an ecologically clean green area. The project combines modern architecture, a landscaped territory and a comfortable living environment. The complex is completed and ready to move in.',
        'The project is built on a 0.33-hectare territory and includes 3 residential blocks, 4 entrances and 209 apartments. The building footprint is 2,445 m², and the total floor area of the buildings is 26,900 m².',
        'The total usable area of the complex is 15,968 m². Parking of 2,431 m² for 50 parking spaces is provided for residents. Depending on the section, each floor has 4 or 6 apartments, ensuring comfort and privacy.',
      ],
      advantage: 'Move-in-ready apartments in a green area',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '0.33 hectares',
        floors: '10 floors + terrace',
        category: 'Comfort',
        status: 'On sale',
      },
      breakdown: [
        { label: 'Apartments', value: '209' },
        { label: 'Apartments area', value: '15,968 m²' },
        { label: 'Parking', value: '2,431 m²' },
      ],
      features: [
        { title: 'Aerated-concrete building', description: 'A modern building material with good thermal-insulation properties. It helps maintain a comfortable temperature inside the home all year round.' },
        { title: 'Apartments with terraces on floors 10–11', description: 'Exclusive apartments with a spacious private terrace and panoramic city views. The ideal place for relaxing, family evenings and morning coffee under the open sky.' },
        { title: 'High 3.10 m ceilings', description: 'All floors have 3.10-metre ceilings — spacious, bright rooms with plenty of air.' },
        { title: 'Above-ground and underground parking', description: 'Convenient parking solutions are provided for residents. This ensures comfort and safety for cars in any season.' },
        { title: 'Children’s playground', description: 'A modern and safe playground for the games and development of children of different ages. The space is designed for active and engaging recreation.' },
        { title: 'Landscaping and alleys', description: 'The complex grounds are decorated with trees and greenery. Walking alleys create a pleasant atmosphere for daily strolls.' },
      ],
    },
  },
  alandalus: {
    category: 'Residential complex · Comfort+',
    area: '0.75 hectares',
    location: 'Yukorichirchik district, Yangi Uzbekiston street',
    details: {
      description: [
        'The «Alandalus» residential complex is a modern 10-storey project where thoughtful architecture is combined with comfort and safety. The complex is located in a quiet, ecologically clean district and features underground parking, a landscaped territory, a children’s playground and round-the-clock video surveillance. All the necessary infrastructure is nearby.',
        'The project is built on a 0.75-hectare plot. The building footprint is 2,825 m², and the total floor area of the buildings is 30,140 m². The complex has 3 blocks, 5 entrances and 298 apartments with convenient layouts.',
        'The total usable area is 21,990 m², of which 21,860 m² is residential and 130 m² is commercial premises. An underground parking of 5,870 m² for 140 parking spaces is provided for residents.',
        'The ceiling height is 3 metres. Monolithic reinforced-concrete construction technology, aerated-concrete walls, quality doors and energy-efficient windows ensure a high level of comfort, reliability and durability.',
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
        '«Sharq Avenue» is a modern residential complex created for those who value comfort, safety and a high quality of life. The project is located on a 3-hectare territory and brings together 12 residential blocks, 21 entrances and 547 apartments with thoughtful layouts.',
        'The building footprint is 11,360 m², and the total floor area of the buildings is 58,242 m². The complex has a gated guarded territory, landscaped courtyards, recreation areas and underground parking of 18,424 m² designed for 540 parking spaces.',
        'The total usable area of the complex is 49,573 m², of which 46,983 m² is residential apartments and 2,590 m² is commercial premises. Each floor has 5, 6 or 7 apartments, providing a comfortable number of neighbours and a cosy atmosphere.',
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
    area: '1.4 hectares',
    location: 'Tashkent, Mirzo-Ulugbek district',
    details: {
      description: [
        '«Anor Gardens» is a cosy club residential complex created for those who value calm, safety and comfort. The project is located on a 1.4-hectare territory and includes 3 residential blocks, 7 entrances and 189 apartments with thoughtful layouts.',
        'The building footprint is 2,718 m², and the total floor area of the buildings is 13,198 m². A gated guarded territory, landscaped courtyards, recreation areas and underground parking of 7,244 m² for 190 parking spaces create a comfortable living environment.',
        'The total usable area of the complex is 10,483 m². Each floor has only 5 apartments, ensuring privacy, quiet and the atmosphere of a club-format residence.',
      ],
      advantage: 'Safety and comfort',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '1.4 hectares',
        floors: '5 floors · 3 blocks',
        category: 'Comfort',
        status: 'On sale',
      },
      features: [
        { title: 'Gated guarded territory', description: 'Controlled entry and video surveillance across the entire territory — a calm and safe environment for the whole family.' },
        { title: 'Club format — 137 apartments', description: 'Just 137 functionally planned apartments: privacy, quiet and a thoughtful use of space.' },
        { title: '5 blocks of 5 floors', description: 'Low-rise comfort-class club development: 5 residential blocks 5 storeys high on 1.4 hectares.' },
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
    area: '2.5 hectares',
    location: 'Tashkent, Mirzo-Ulugbek district',
    details: {
      description: [
        'The premium «Botanika Luxury» residential complex is located in the Mirzo-Ulugbek district, opposite the Botanical Garden. Modern architecture, spacious layouts and penthouses with private terraces and open balconies let you enjoy panoramic views of one of the greenest locations in the city.',
        'The project is being built on a 2.5-hectare territory and includes 7 residential blocks, 11 entrances and 227 apartments. The building footprint is 8,199 m², and the total floor area of the buildings is 42,211 m².',
        'The total usable area of the complex is 32,489 m², of which 30,390 m² is residential apartments and 2,099 m² is commercial premises. An underground parking of 20,765 m² designed for 305 parking spaces is provided for residents.',
      ],
      advantage: 'Terraces overlooking the Botanical Garden',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '2.5 hectares',
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
    area: '4.5 hectares',
    location: 'Mirzo-Ulugbek district, Yangi Uzbekiston street',
    details: {
      description: [
        '«Vatan Village» is a modern cottage town created for comfortable countryside living surrounded by nature. The project is located on a 4.5-hectare territory and includes 90 cottages with their own land plots, combining privacy, safety and a well-developed internal infrastructure.',
        'The building footprint is 19,500 m², and the total floor area of the buildings is 45,873 m². The territory features children’s playgrounds, recreation areas, sports spaces and landscaped green alleys for the whole family.',
        'The gated guarded territory ensures a calm living atmosphere, while parking is designed for 110 spaces, creating additional comfort for residents and guests of the complex.',
      ],
      advantage: 'A home for a big family',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '4.5 hectares',
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
    area: '1.8 hectares',
    location: 'Mirzo-Ulugbek district, Yangi Uzbekiston street',
    details: {
      description: [
        'The «Turon» residential complex is located in the Mirzo-Ulugbek district of Tashkent and combines the advantages of modern urban life with the cosiness of low-rise comfort-class development. The project is built on a 1.8-hectare territory and includes 12 residential blocks, 21 entrances and 542 apartments with thoughtful layouts.',
        'The building footprint is 8,049 m², and the total floor area of the buildings is 49,300 m². An underground parking of 10,550 m² designed for 500 parking spaces is provided for residents.',
        'The total usable area of the complex is 42,991 m², of which 31,465 m² is residential apartments and 11,526 m² is commercial premises. Shops, cafés and services are located on the ground floors, so everything you need is within walking distance.',
      ],
      advantage: 'A quiet comfort-class neighborhood',
      specs: {
        address: 'Tashkent, Mirzo-Ulugbek district',
        area: '1.8 hectares',
        floors: '5, 6 and 7 floors',
        category: 'Comfort',
        status: 'Under construction',
      },
      breakdown: [
        { label: 'Apartments area', value: '31,465 m²' },
        { label: 'Underground floor', value: '10,550 m²' },
        { label: 'Commercial areas', value: '11,526 m²' },
      ],
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
    area: '8.5 hectares',
    location: 'Yusufkhona, 60 minutes from Tashkent',
    details: {
      description: [
        '«Challet Resort» is a countryside complex in a resort format in the picturesque Yusufkhona area, just an hour’s drive from Tashkent. Modern cottages with panoramic glazing and natural-material finishes blend harmoniously into the natural landscape, creating an atmosphere of relaxation and seclusion all year round.',
        'The project is located on an 8.5-hectare territory. The building footprint is 14,308 m², and the total floor area of the buildings is 27,656 m². The complex includes 64 cottages with thoughtful layouts and spacious plots.',
        'Residents have a restaurant, a swimming pool with a recreation area, walking alleys and a gated guarded territory. Parking is designed for 100 spaces, providing comfort for both owners and guests of the complex.',
      ],
      advantage: 'A resort for year-round living',
      specs: {
        address: 'Yusufkhona, 60 minutes from Tashkent',
        area: '8.5 hectares',
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
    area: '0.61 hectares',
    location: 'Tashkent, Sergeli district, Kuyluk-5, Khalkabad mahalla',
  },
  chulpon: {
    category: 'Business center',
    area: '500 m² · 6 floors',
    location: 'Tashkent, Yashnabad district',
  },
  aviasozlar: {
    category: 'Business center',
    area: '500 m² · 4 floors',
    location: 'Tashkent',
  },
  'bogi-shamol': {
    category: 'Business center',
    area: '500 m² · 5 floors',
    location: 'Tashkent, Yunusabad district',
  },
  'yakkasaroy-bc': {
    category: 'Business center',
    area: '500 m² · 5 floors',
    location: 'Tashkent',
  },
}

// ── Uzbek (Latin) ────────────────────────────────────────────────────────────
const uz: Record<string, ProjectTr> = {
  botanika: {
    category: 'Turar-joy majmuasi · Komfort',
    area: '0,33 gektar',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    details: {
      description: [
        '«Botanika» — Toshkentning Mirzo Ulug‘bek tumanida, ekologik toza yashil hududda joylashgan zamonaviy turar-joy majmuasi. Loyiha zamonaviy meʼmorchilik, obod hudud va yashash uchun qulay muhitni uyg‘unlashtiradi. Majmua topshirilgan va yashashga tayyor.',
        'Loyiha 0,33 gektar hududda barpo etilgan va 3 ta turar-joy bloki, 4 ta kirish hamda 209 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 2 445 m², binolarning umumiy maydoni — 26 900 m².',
        'Majmuaning umumiy foydali maydoni — 15 968 m². Aholi uchun 50 mashina-o‘ringa mo‘ljallangan 2 431 m² avtoturargoh ko‘zda tutilgan. Seksiyaga qarab, har bir qavatda 4 yoki 6 ta kvartira joylashgan bo‘lib, bu qulaylik va shaxsiylikni taʼminlaydi.',
      ],
      advantage: 'Yashil hududda tayyor kvartiralar',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '0,33 gektar',
        floors: '10 qavat + terrasa',
        category: 'Komfort',
        status: 'Sotuvda',
      },
      breakdown: [
        { label: 'Kvartiralar', value: '209' },
        { label: 'Xonadonlar maydoni', value: '15 968 m²' },
        { label: 'Avtoturargoh maydoni', value: '2 431 m²' },
      ],
      features: [
        { title: 'Gazoblokli uy', description: 'Yaxshi issiqlik izolyatsiyasi xususiyatlariga ega zamonaviy qurilish materiali. Uyda yil davomida qulay haroratni saqlashga yordam beradi.' },
        { title: '10–11-qavatlarda terrasali kvartiralar', description: 'Keng shaxsiy terrasa va shaharning panoramali manzarasiga ega eksklyuziv kvartiralar. Dam olish, oilaviy kechalar va ochiq osmon ostida ertalabki qahva uchun ideal joy.' },
        { title: 'Baland shiftlar 3,10 m', description: 'Barcha qavatlar 3,10 metrli shiftlarga ega — havoga boy keng va yorug‘ xonalar.' },
        { title: 'Yer usti va yerosti avtoturargohlari', description: 'Aholi uchun qulay avtoturargoh yechimlari ko‘zda tutilgan. Bu yilning istalgan faslida avtomobillar uchun qulaylik va xavfsizlikni taʼminlaydi.' },
        { title: 'Bolalar maydonchasi', description: 'Turli yoshdagi bolalarning o‘yinlari va rivojlanishi uchun zamonaviy va xavfsiz bolalar maydonchasi. Makon faol va qiziqarli dam olish uchun puxta o‘ylangan.' },
        { title: 'Ko‘kalamzorlashtirish va xiyobonlar', description: 'Majmua hududi daraxtlar va yashil o‘simliklar bilan bezatilgan. Sayr xiyobonlari kundalik sayrlar uchun yoqimli muhit yaratadi.' },
      ],
    },
  },
  alandalus: {
    category: 'Turar-joy majmuasi · Komfort+',
    area: '0,75 gektar',
    location: 'Yuqori Chirchiq tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Alandalus» turar-joy majmuasi — puxta meʼmorchilik komfort va xavfsizlik bilan uyg‘unlashgan zamonaviy 10 qavatli loyiha. Majmua tinch, ekologik toza hududda joylashgan bo‘lib, yerto‘la avtoturargohi, obod hudud, bolalar maydonchasi va kechayu kunduz videokuzatuv tizimi bilan jihozlangan. Barcha zarur infratuzilma yaqin atrofda.',
        'Loyiha 0,75 ga uchastkada barpo etilgan. Qurilish maydoni — 2 825 m², binolarning umumiy maydoni — 30 140 m². Majmuada 3 blok, 5 kirish va qulay tartibdagi 298 kvartira mavjud.',
        'Umumiy foydali maydon — 21 990 m², shundan 21 860 m² turar-joy, 130 m² esa tijorat binolari. Aholi uchun 140 mashina-o‘ringa mo‘ljallangan 5 870 m² maydonli yerto‘la avtoturargohi ko‘zda tutilgan.',
        'Shift balandligi — 3 metr. Monolit-temirbeton qurilish texnologiyasi, gazobetondan devorlar, sifatli eshiklar va energiya tejamkor derazalar yuqori darajadagi qulaylik, ishonchlilik va uzoq umrlilikni taʼminlaydi.',
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
        '«Sharq Avenue» — komfort, xavfsizlik va yuqori hayot sifatini qadrlovchilar uchun yaratilgan zamonaviy turar-joy majmuasi. Loyiha 3 gektar hududda joylashgan bo‘lib, 12 ta turar-joy bloki, 21 ta kirish va puxta rejalashtirilgan 547 ta kvartirani birlashtiradi.',
        'Qurilish maydoni — 11 360 m², binolarning umumiy maydoni — 58 242 m². Majmua yopiq qo‘riqlanadigan hudud, obod hovlilar, dam olish zonalari va 540 mashina-o‘ringa mo‘ljallangan 18 424 m² maydonli yerosti avtoturargohiga ega.',
        'Majmuaning umumiy foydali maydoni — 49 573 m², shundan 46 983 m² turar-joy kvartiralari, 2 590 m² esa tijorat binolari. Har bir qavatda 5, 6 yoki 7 ta kvartira joylashgan bo‘lib, bu qo‘shnilarning qulay soni va shinam muhitni taʼminlaydi.',
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
    area: '1,4 gektar',
    location: 'Toshkent, Mirzo Ulug‘bek tumani',
    details: {
      description: [
        '«Anor Gardens» — osoyishtalik, xavfsizlik va komfortni qadrlovchilar uchun yaratilgan shinam klub turar-joy majmuasi. Loyiha 1,4 gektar hududda joylashgan bo‘lib, 3 ta turar-joy bloki, 7 ta kirish va puxta rejalashtirilgan 189 ta kvartirani o‘z ichiga oladi.',
        'Qurilish maydoni — 2 718 m², binolarning umumiy maydoni — 13 198 m². Yopiq qo‘riqlanadigan hudud, obod hovlilar, dam olish zonalari va 190 mashina-o‘ringa mo‘ljallangan 7 244 m² maydonli yerosti avtoturargohi yashash uchun qulay muhit yaratadi.',
        'Majmuaning umumiy foydali maydoni — 10 483 m². Har bir qavatda atigi 5 ta kvartira joylashgan bo‘lib, bu shaxsiylik, osoyishtalik va klub formatidagi yashash muhitini taʼminlaydi.',
      ],
      advantage: 'Xavfsizlik va komfort',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '1,4 gektar',
        floors: '5 qavat · 3 blok',
        category: 'Komfort',
        status: 'Sotuvda',
      },
      features: [
        { title: 'Yopiq qo‘riqlanadigan hudud', description: 'Nazorat ostidagi kirish va butun hudud bo‘ylab videokuzatuv — butun oila uchun tinch va xavfsiz muhit.' },
        { title: 'Klub format — 137 ta kvartira', description: 'Jami 137 ta funksional rejalashtirilgan kvartira: shaxsiylik, osoyishtalik va makondan oqilona foydalanish.' },
        { title: '5 qavatli 5 ta blok', description: 'Komfort darajasidagi past qavatli klub qurilish: 1,4 gektarda 5 qavatli 5 ta turar-joy bloki.' },
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
    area: '2,5 gektar',
    location: 'Toshkent shahar, Mirzo Ulug‘bek tumani',
    details: {
      description: [
        'Premium «Botanika Luxury» turar-joy majmuasi Mirzo Ulug‘bek tumanida, Botanika bog‘i ro‘parasida joylashgan. Zamonaviy meʼmorchilik, keng planirovkalar va shaxsiy terrasalar hamda ochiq balkonlarga ega pentxauslar shaharning eng yashil hududlaridan birining panoramali manzaralaridan bahramand bo‘lish imkonini beradi.',
        'Loyiha 2,5 gektar hududda barpo etilmoqda va 7 ta turar-joy bloki, 11 ta kirish hamda 227 ta kvartirani o‘z ichiga oladi. Qurilish maydoni — 8 199 m², binolarning umumiy maydoni — 42 211 m².',
        'Majmuaning umumiy foydali maydoni — 32 489 m², shundan 30 390 m² turar-joy kvartiralari, 2 099 m² esa tijorat binolari. Aholi uchun 305 mashina-o‘ringa mo‘ljallangan 20 765 m² maydonli yerosti avtoturargohi ko‘zda tutilgan.',
      ],
      advantage: 'Botanika bog‘iga qaragan terrasalar',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '2,5 gektar',
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
    area: '4,5 gektar',
    location: 'Mirzo Ulug‘bek tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Vatan Village» — tabiat qo‘ynida qulay shahar tashqarisi hayoti uchun yaratilgan zamonaviy kottedj shaharchasi. Loyiha 4,5 gektar hududda joylashgan bo‘lib, shaxsiy yer uchastkalariga ega 90 ta kottedjni o‘z ichiga oladi, shaxsiylik, xavfsizlik va rivojlangan ichki infratuzilmani uyg‘unlashtiradi.',
        'Qurilish maydoni — 19 500 m², binolarning umumiy maydoni — 45 873 m². Hududda butun oila uchun bolalar maydonchalari, dam olish zonalari, sport maydonlari va obod yashil xiyobonlar mavjud.',
        'Yopiq qo‘riqlanadigan hudud osoyishta yashash muhitini taʼminlaydi, avtoturargoh esa 110 mashina-o‘ringa mo‘ljallangan bo‘lib, aholi va mehmonlar uchun qo‘shimcha qulaylik yaratadi.',
      ],
      advantage: 'Katta oila uchun uy',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '4,5 gektar',
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
    area: '1,8 gektar',
    location: 'Mirzo Ulug‘bek tumani, Yangi O‘zbekiston ko‘chasi',
    details: {
      description: [
        '«Turon» turar-joy majmuasi Toshkentning Mirzo Ulug‘bek tumanida joylashgan bo‘lib, zamonaviy shahar hayoti afzalliklarini komfort darajasidagi past qavatli qurilish shinamligi bilan uyg‘unlashtiradi. Loyiha 1,8 gektar hududda barpo etilgan va 12 ta turar-joy bloki, 21 ta kirish hamda puxta rejalashtirilgan 542 ta kvartirani o‘z ichiga oladi.',
        'Qurilish maydoni — 8 049 m², binolarning umumiy maydoni — 49 300 m². Aholi uchun 500 mashina-o‘ringa mo‘ljallangan 10 550 m² maydonli yerosti avtoturargohi ko‘zda tutilgan.',
        'Majmuaning umumiy foydali maydoni — 42 991 m², shundan 31 465 m² turar-joy kvartiralari, 11 526 m² esa tijorat binolari. Birinchi qavatlarda do‘konlar, kafelar va xizmatlar joylashgan, shu tufayli zarur bo‘lgan hamma narsa piyoda yetib boriladigan masofada.',
      ],
      advantage: 'Komfort darajasidagi tinch hudud',
      specs: {
        address: 'Toshkent, Mirzo Ulug‘bek tumani',
        area: '1,8 gektar',
        floors: '5, 6 va 7 qavat',
        category: 'Komfort',
        status: 'Qurilmoqda',
      },
      breakdown: [
        { label: 'Xonadonlar maydoni', value: '31 465 m²' },
        { label: 'Yerosti qavati', value: '10 550 m²' },
        { label: 'Savdo maydonlari', value: '11 526 m²' },
      ],
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
    area: '8,5 gektar',
    location: 'Yusufxona, Toshkentdan 60 daqiqa',
    details: {
      description: [
        '«Challet Resort» — Toshkentdan atigi bir soatlik masofada, go‘zal Yusufxona hududidagi kurort formatidagi shahar tashqarisi majmuasi. Panoramali oynavand va tabiiy materiallar bilan pardozlangan zamonaviy kottedjlar tabiiy landshaftga uyg‘un tarzda mujassam bo‘lib, yil davomida dam olish va yakkalik muhitini yaratadi.',
        'Loyiha 8,5 gektar hududda joylashgan. Qurilish maydoni — 14 308 m², binolarning umumiy maydoni — 27 656 m². Majmua puxta rejalashtirilgan va keng uchastkalarga ega 64 ta kottedjni o‘z ichiga oladi.',
        'Aholi uchun restoran, dam olish zonasiga ega basseyn, sayr xiyobonlari va yopiq qo‘riqlanadigan hudud ko‘zda tutilgan. Avtoturargoh 100 mashina-o‘ringa mo‘ljallangan bo‘lib, ham egalar, ham mehmonlar uchun qulaylik taʼminlaydi.',
      ],
      advantage: 'Yil davomida yashash uchun kurort',
      specs: {
        address: 'Yusufxona, Toshkentdan 60 daqiqa',
        area: '8,5 gektar',
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
    area: '0,61 gektar',
    location: 'Toshkent sh., Sergeli tumani, Quyluq-5, Xalqobod mahallasi',
  },
  chulpon: {
    category: 'Biznes-markaz',
    area: '500 m² · 6 qavat',
    location: 'Toshkent sh., Yashnobod tumani',
  },
  aviasozlar: {
    category: 'Biznes-markaz',
    area: '500 m² · 4 qavat',
    location: 'Toshkent sh.',
  },
  'bogi-shamol': {
    category: 'Biznes-markaz',
    area: '500 m² · 5 qavat',
    location: 'Toshkent sh., Yunusobod tumani',
  },
  'yakkasaroy-bc': {
    category: 'Biznes-markaz',
    area: '500 m² · 5 qavat',
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
    breakdown: base.breakdown?.map((b, i) => ({ ...b, ...(tr.breakdown?.[i] ?? {}) })),
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
