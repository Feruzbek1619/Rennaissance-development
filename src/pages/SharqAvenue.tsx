'use client'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import ProductionSection from '@/components/home/ProductionSection'
import FAQSection from '@/components/home/FAQSection'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useLeadModalOptional } from '@/components/LeadModal'
import { CountUp } from '@/components/CountUp'
import { SkeletonImage } from '@/components/SkeletonImage'
import { projects } from '@/data/projects'

/* ─── SHARQ AVENUE — dedicated page, built on the BOTANIKA LUXURY template ─── */

const SUPPORT_TEL = 'tel:+998783333331'

const gallery = [
  '/assets/sharq-1.webp',
  '/assets/sharq-5.webp',
  '/assets/sharq-6.webp',
  '/assets/sharq-2.webp',
  '/assets/sharq-3.webp',
  '/assets/sharq-4.webp',
]

/* ПРЕИМУЩЕСТВА mosaic — image + text card per cell */
const advantages = [
  {
    image: '/assets/sharq-1.webp',
    title: 'Закрытая охраняемая территория',
    desc: 'Контролируемый въезд и видеонаблюдение по всей территории — спокойная и безопасная среда для всей семьи.',
  },
  {
    image: '/assets/sharq-4.webp',
    title: '547 квартир',
    desc: '547 функционально спланированных квартир с рациональной геометрией и продуманным использованием пространства.',
  },
  {
    image: '/assets/sharq-5.webp',
    title: '12 блоков по 5 этажей',
    desc: 'Малоэтажная застройка комфорт-класса: 12 жилых блоков высотой 5 этажей на территории в 3 гектара.',
  },
  {
    image: '/assets/sharq-6.webp',
    title: 'Подземный паркинг',
    desc: 'Просторный подземный паркинг — автомобили под домом, а двор остаётся свободным и безопасным.',
  },
  {
    image: '/assets/sharq-2.webp',
    title: 'Благоустроенные дворы',
    desc: 'Озеленённые дворы, прогулочные аллеи и зоны отдыха для семейного досуга на свежем воздухе.',
  },
  {
    image: '/assets/sharq-3.webp',
    title: 'Современный образ жизни',
    desc: 'Приватная и уютная среда, где гармонично сочетаются безопасность, комфорт и качество жизни.',
  },
]

/* Navy specs card — exact values */
const specRows: { label: string; value: string; icon: JSX.Element }[] = [
  { label: 'Название', value: 'SHARQ AVENUE', icon: <HomeIcon /> },
  { label: 'Адрес', value: 'Ташкент, Мирзо-Улугбекский район', icon: <PinIcon /> },
  { label: 'Застройка', value: '3 гектара', icon: <RulerIcon /> },
  { label: 'Блоки', value: '12 блоков · 5 этажей', icon: <LayersIcon /> },
  { label: 'Квартир', value: '547', icon: <LayersIcon /> },
  { label: 'Жилая площадь', value: '58 728 м²', icon: <RulerIcon /> },
  { label: 'Коммерция', value: '3 237 м²', icon: <TagIcon /> },
  { label: 'Паркинг', value: '1 900 м²', icon: <CarIcon /> },
]

/* Interior features panel */
const interior = [
  { label: 'Скоростные лифты', Icon: ElevatorIcon },
  { label: 'Витражные окна', Icon: WindowIcon },
  { label: 'Металлические двери', Icon: DoorIcon },
  { label: 'Мягкое освещение', Icon: LightIcon },
]

const stats = [
  { value: '12+', label: 'проектов реализовано и строится' },
  { value: '5+', label: 'проектов в продаже сейчас' },
  { value: '2021', label: 'собственный бетонный завод' },
  { value: '2019', label: 'год основания' },
]

export default function SharqAvenue() {
  const modal = useLeadModalOptional()
  const navigate = useNavigate()

  const project = projects.find((p) => p.slug === 'sharq-avenue')!
  const details = project.details!
  const others = projects.filter((p) => p.slug !== 'sharq-avenue').slice(0, 3)

  const idx = projects.findIndex((p) => p.slug === 'sharq-avenue')
  const prevProject = projects[(idx - 1 + projects.length) % projects.length]
  const nextProject = projects[(idx + 1) % projects.length]

  const [active, setActive] = useState(0)
  const galleryPrev = () => setActive((c) => (c - 1 + gallery.length) % gallery.length)
  const galleryNext = () => setActive((c) => (c + 1) % gallery.length)

  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="relative h-[720px] 2xl:h-[888px] overflow-hidden bg-primary">
        <img loading="eager" decoding="async" src="/assets/sharq-4.webp" alt="SHARQ AVENUE" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

        <div className="absolute inset-x-[60px] 2xl:inset-x-[116px] top-[42%] flex items-center justify-between z-10">
          <button type="button" aria-label={`Проект ${prevProject.title}`} onClick={() => navigate(`/projects/${prevProject.slug}`)} className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors">
            <ChevronLeft className="size-6" />
          </button>
          <button type="button" aria-label={`Проект ${nextProject.title}`} onClick={() => navigate(`/projects/${nextProject.slug}`)} className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors">
            <ChevronRight className="size-6" />
          </button>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[28px] px-6 text-center">
          <h1 className="font-heading text-[56px] 2xl:text-[80px] font-bold uppercase leading-none text-bg-subtle">
            SHARQ AVENUE
          </h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => modal?.openLead()}
              className="flex w-[268px] items-center justify-between gap-3 rounded-[90px] bg-primary px-[21px] py-[16px] font-body text-[20px] font-medium leading-[1.6] text-white hover:bg-[#2F3A45] transition-colors"
            >
              Заказать звонок
              <span className="flex size-7 items-center justify-center rounded-full bg-white shrink-0">
                <ArrowIcon />
              </span>
            </button>
            <a href={SUPPORT_TEL} className="flex items-center justify-center rounded-[90px] bg-accent px-[32px] py-[16px] font-body text-[20px] font-medium leading-[1.6] text-bg-subtle hover:bg-[#A2814E] transition-colors">
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. О проекте ─────────────────────────────────── */}
      <section className="bg-white pt-[80px] pb-[40px]">
        <Container>
          <div data-reveal className="flex flex-col gap-8">
            <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink">
              О проекте SHARQ AVENUE
            </h2>
            <div className="flex flex-col gap-6 max-w-[1730px]">
              {details.description.map((para, i) => (
                <p key={i} className="font-vela text-[22px] 2xl:text-[30px] leading-[1.4] text-ink">{para}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Gallery ───────────────────────────────────── */}
      <section className="bg-white py-[24px]">
        <Container>
          <div data-reveal="scale" className="relative h-[460px] 2xl:h-[700px] w-full overflow-hidden rounded-[5px] bg-black">
            <SkeletonImage key={gallery[active]} src={gallery[active]} alt="SHARQ AVENUE — общий вид" className="absolute inset-0" imgClassName="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-[224px] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-[40px] right-[40px] flex items-center gap-3">
              <button type="button" onClick={galleryPrev} aria-label="Предыдущее фото" className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" onClick={galleryNext} aria-label="Следующее фото" className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors">
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>

          <div className="mt-[17px] grid gap-[12px] 2xl:gap-[17px]" style={{ gridTemplateColumns: `repeat(${gallery.length}, minmax(0, 1fr))` }}>
            {gallery.map((src, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Фото ${i + 1}`} aria-current={i === active} className={`h-[100px] 2xl:h-[140px] overflow-hidden rounded-[4px] bg-white transition-all duration-300 ${i === active ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                <img loading="lazy" decoding="async" src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Location map + specs card ─────────────────── */}
      <section className="bg-white pt-[40px] pb-[80px]">
        <Container>
          <div className="relative">
            <div className="h-[460px] 2xl:h-[560px] w-full overflow-hidden rounded-[5px]">
              <iframe title="SHARQ AVENUE на карте" src="https://yandex.ru/map-widget/v1/?ll=69.30%2C41.34&z=14&pt=69.30%2C41.34%2Cpm2rdm" className="size-full border-0" loading="lazy" />
            </div>
            <div data-reveal className="relative z-10 mx-auto -mt-[96px] w-[92%] max-w-[1312px] rounded-[5px] border border-primary/30 bg-primary px-[40px] py-[44px] 2xl:px-[80px] 2xl:py-[56px] shadow-[0_30px_60px_rgba(10,15,40,0.25)]">
              <div className="grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-2">
                {specRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <div className="flex w-[190px] shrink-0 items-center gap-2 pt-[2px] text-white">
                      <span className="text-white/90 shrink-0">{row.icon}</span>
                      <span className="font-body text-[16px] leading-[1.6] text-white whitespace-nowrap">{row.label}:</span>
                    </div>
                    <span className="font-vela text-[18px] 2xl:text-[20px] font-medium leading-[1.4] text-[#afbaca]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. ПРЕИМУЩЕСТВА mosaic ───────────────────────── */}
      <section className="bg-white py-[71px]">
        <Container>
          <div data-reveal className="flex flex-col gap-10 2xl:flex-row 2xl:items-start 2xl:justify-between">
            <div className="flex flex-col gap-5">
              <SectionTag>Почему Sharq Avenue</SectionTag>
              <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Преимущества
              </h2>
            </div>
            <p className="font-vela text-[18px] 2xl:text-[20px] leading-[1.3] text-ink 2xl:w-[735px] 2xl:shrink-0">
              «Sharq Avenue» — закрытый комплекс комфорт-класса на 3 гектарах: 12 малоэтажных блоков, 547 квартир,
              подземный паркинг и благоустроенные дворы. Приватная и уютная среда, где безопасность сочетается с
              современным комфортом.
            </p>
          </div>

          <div className="mt-[40px] grid grid-cols-2 gap-[20px] 2xl:gap-[32px]">
            {advantages.map((a, i) => (
              <div key={a.title} data-reveal style={{ transitionDelay: `${(i % 2) * 90}ms` }} className="group flex flex-col overflow-hidden">
                <div className="h-[340px] 2xl:h-[498px] w-full overflow-hidden">
                  <img loading="lazy" decoding="async" src={a.image} alt={a.title} className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                </div>
                <div className="flex min-h-[200px] 2xl:h-[241px] items-center gap-6 border border-[#c4c4c4] bg-[#f8f8f8] px-[32px] py-[28px] 2xl:px-[48px]">
                  <h3 className="font-heading text-[24px] 2xl:text-[31px] font-bold leading-[1.4] text-black w-[230px] 2xl:w-[275px] shrink-0">{a.title}</h3>
                  <p className="font-vela text-[19px] 2xl:text-[24px] leading-[1.3] text-secondary">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5.5 Interior features (navy panel) ───────────── */}
      <section className="bg-white pb-[100px]">
        <Container>
          <div className="flex items-stretch gap-0 rounded-[5px] overflow-hidden">
            <div className="w-[698px] shrink-0 min-h-[500px]">
              <img loading="lazy" decoding="async" src="/assets/sharq-2.webp" alt="" className="size-full object-cover" />
            </div>
            <div className="flex-1 bg-primary p-[60px] flex flex-col gap-8">
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-bg-subtle">ПРЕИМУЩЕСТВА</h2>
              <p className="font-body text-[20px] leading-[1.6] text-white/80">
                Это просторные помещения с огромными витражными окнами. В каждом из них предусмотрен лифт для подъёма
                на территорию приватного двора, в полном соответствии с концепцией безбарьерной среды. А для получения
                посылок будут установлены постаматы.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {interior.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/10 rounded-[5px] px-4 py-3">
                    <div className="size-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-white">
                      <Icon />
                    </div>
                    <span className="font-vela text-[16px] font-medium text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Statement + stats ─────────────────────────── */}
      <section className="bg-bg-subtle py-[64px]">
        <Container>
          <p data-reveal className="text-center font-heading text-[34px] 2xl:text-[45px] font-semibold leading-[1.4] mb-[40px] 2xl:mb-[64px]">
            <span className="text-black">Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений. </span>
            <span className="text-accent">Renaissance Development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.</span>
          </p>
          <div className="flex items-stretch gap-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="stat-card card-lift flex flex-1 flex-col items-center justify-center gap-2 px-[26px] py-[24px] text-center">
                <p className="font-heading text-[56px] 2xl:text-[75px] font-bold uppercase leading-none text-black"><CountUp value={s.value} /></p>
                <p className="font-body text-[16px] leading-[1.6] font-medium text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. Места поблизости ──────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <h2 data-reveal className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink mb-[60px]">
            Места поблизости
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {details.nearby.map((place, i) => (
              <div key={place.title} data-reveal style={{ transitionDelay: `${(i % 3) * 90}ms` }} className="card-lift flex flex-col gap-4 p-8 bg-bg-subtle rounded-[5px]">
                <div className="text-ink">
                  <NearbyIcon icon={place.icon} />
                </div>
                <h3 className="font-heading text-[22px] font-bold uppercase leading-[1.3] text-ink">{place.title}</h3>
                <p className="font-body text-[16px] leading-[1.6] text-secondary">{place.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 8. Смотрите также ────────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <h2 data-reveal className="font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink mb-[40px]">
            Смотрите также наши другие проекты
          </h2>
          <div className="flex gap-8 overflow-hidden">
            {others.map((p, i) => (
              <div key={p.slug} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className="w-[520px] shrink-0">
                <Link to={`/projects/${p.slug}`}>
                  <div className="relative h-[320px] rounded-[5px] overflow-hidden">
                    <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="size-full object-cover transition-transform hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-[#BE9C68] px-6 py-2 rounded-full">
                      <span className="font-vela text-[16px] font-medium text-white">{p.status === 'active' ? 'Идут продажи' : 'Распродан'}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <p className="font-heading text-[14px] font-semibold text-ink">{p.category}</p>
                      <p className="font-heading text-[34px] font-bold uppercase leading-none text-ink mt-1">{p.title}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-vela text-[14px] text-secondary">Площадь</span>
                        <span className="font-vela text-[14px] font-semibold text-secondary text-right">{p.area}</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-vela text-[14px] text-secondary shrink-0">Локация</span>
                        <span className="font-vela text-[14px] font-semibold text-secondary text-right">{p.location}</span>
                      </div>
                      <div className="h-px bg-border" />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <span className="flex-auto flex items-center justify-between bg-primary text-white rounded-full px-5 py-3">
                        <span className="font-vela text-[16px] font-medium whitespace-nowrap">Выбрать квартиру</span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-white shrink-0">
                          <ArrowIcon />
                        </span>
                      </span>
                      <span className="flex-auto flex items-center justify-between border border-primary text-primary rounded-full px-5 py-3">
                        <span className="font-vela text-[16px] font-medium whitespace-nowrap">Заказать звонок</span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-primary shrink-0">
                          <ArrowIcon light />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <NeedHelpSection />
      <ProductionSection />
      <FAQSection />
    </main>
  )
}

/* ─── Icons ───────────────────────────────────────────── */
function ArrowIcon({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke={light ? 'white' : '#3A4754'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11c0 7-8 11-8 11s-8-4-8-11a8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function RulerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M3 16.5 16.5 3 21 7.5 7.5 21 3 16.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9l1.5 1.5M12 6l1.5 1.5M15 9l1.5 1.5M6 12l1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5M3 18l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" />
    </svg>
  )
}
function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Interior-feature icons (white on the navy panel) */
function ElevatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9l-1.5 2h3L9 9ZM15 15l1.5-2h-3l1.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function WindowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v18M4 12h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function DoorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M5 21h14M7 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1 1 1.7v.4h5v-.4c0-.7.4-1.3 1-1.7A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Nearby icons */
function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 14l.9 2.4 2.6.9-2.6.9-.9 2.4-.9-2.4-2.6-.9 2.6-.9.9-2.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function GradCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11.5V17c0 1.2 2.7 3 6 3s6-1.8 6-3v-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9.5v5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function BusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M2.5 3h2l2.2 11.4a1.2 1.2 0 0 0 1.2 1h9a1.2 1.2 0 0 0 1.2-1L21 6.5H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function NearbyIcon({ icon }: { icon: string }) {
  const map: Record<string, JSX.Element> = {
    sparkles: <SparklesIcon />,
    graduation: <GradCapIcon />,
    bus: <BusIcon />,
    cart: <CartIcon />,
    moon: <MoonIcon />,
    star: <StarIcon />,
  }
  return map[icon] ?? <SparklesIcon />
}
