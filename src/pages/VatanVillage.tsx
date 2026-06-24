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
import { projects } from '@/data/projects'

/* ─── VATAN VILLAGE — dedicated page, pixel-perfect per Figma 7872:3250 ─── */

const SUPPORT_TEL = 'tel:+998783333331'

/* Gallery — big view + thumbnail strip (Figma 7872:3655 / 4228). Arrows and
   thumbnails switch the main image. */
const gallery = [
  '/assets/vatan-render.webp',
  '/assets/vatan-strip-1.webp',
  '/assets/vatan-strip-2.webp',
  '/assets/vatan-strip-3.webp',
  '/assets/vatan-strip-4.webp',
  '/assets/vatan-strip-5.webp',
]

/* ПРЕИМУЩЕСТВА mosaic (Figma 7875:6378) — image + text card per cell */
const advantages = [
  {
    image: '/assets/vatan-adv-1.webp',
    title: 'Кирпичный дом',
    desc: 'Натуральный и долговечный материал, который обеспечивает хорошую теплоизоляцию, прочность и комфортный микроклимат в доме.',
  },
  {
    image: '/assets/vatan-adv-2.webp',
    title: 'Закрытая охраняемая территория',
    desc: 'Контролируемый въезд, видеонаблюдение и благоустроенная территория создают спокойную и безопасную среду для всей семьи.',
  },
  {
    image: '/assets/vatan-adv-3.webp',
    title: 'Железобетонные межэтажные перекрытия',
    desc: 'Надежные плиты перекрытия обеспечивают прочность конструкции и дополнительную шумоизоляцию между этажами.',
  },
  {
    image: '/assets/vatan-adv-4.webp',
    title: 'Близость к аэропорту',
    desc: 'Удобное расположение позволяет быстро добраться до аэропорта, экономя ваше время и обеспечивая комфорт для частых поездок.',
  },
  {
    image: '/assets/vatan-adv-5.webp',
    title: 'Барбекю-зона',
    desc: 'Собственное пространство для семейных ужинов и отдыха на свежем воздухе.',
  },
  {
    image: '/assets/vatan-adv-6.webp',
    title: 'Парковка для автомобиля',
    desc: 'Удобное парковочное место на территории вашего участка.',
  },
]

/* Navy specs card (Figma 7872:3504) — exact values */
const specRows: { label: string; value: string; icon: JSX.Element }[] = [
  { label: 'Название', value: 'VATAN VILLAGE', icon: <HomeIcon /> },
  { label: 'Адрес', value: 'Ташкент, Мирзо-Улугбекский район', icon: <PinIcon /> },
  { label: 'Категория', value: 'Комфорт+', icon: <TagIcon /> },
  { label: 'Территория', value: '460 соток', icon: <RulerIcon /> },
  { label: 'Коттеджей', value: 'около 90', icon: <LayersIcon /> },
  { label: 'Участки', value: 'от 3 до 7 соток', icon: <RulerIcon /> },
  { label: 'Застройка', value: '24 375 м²', icon: <LayersIcon /> },
  { label: 'Парковка', value: '1 100 м²', icon: <CarIcon /> },
]

const stats = [
  { value: '12+', label: 'проектов реализовано и строится' },
  { value: '5+', label: 'проектов в продаже сейчас' },
  { value: '2021', label: 'собственный бетонный завод' },
  { value: '2019', label: 'год основания' },
]

export default function VatanVillage() {
  const modal = useLeadModalOptional()
  const navigate = useNavigate()

  const project = projects.find((p) => p.slug === 'vatan-village')!
  const details = project.details!
  const others = projects.filter((p) => p.slug !== 'vatan-village').slice(0, 3)

  // Hero arrows browse to the adjacent project page.
  const idx = projects.findIndex((p) => p.slug === 'vatan-village')
  const prevProject = projects[(idx - 1 + projects.length) % projects.length]
  const nextProject = projects[(idx + 1) % projects.length]

  const [active, setActive] = useState(0)
  const galleryPrev = () => setActive((c) => (c - 1 + gallery.length) % gallery.length)
  const galleryNext = () => setActive((c) => (c + 1) % gallery.length)

  return (
    <main>
      {/* ── 1. Hero (Figma 7872:3278) ───────────────────── */}
      <section className="relative h-[720px] 2xl:h-[888px] overflow-hidden bg-primary">
        <img loading="lazy" decoding="async" src="/assets/vatan-hero.webp" alt="VATAN VILLAGE" className="absolute inset-0 size-full object-cover" />
        {/* fog haze */}
        <img loading="lazy" decoding="async"
          src="/assets/vatan-fog.webp"
          alt=""
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[75%] w-full object-cover opacity-70 mix-blend-screen pointer-events-none"
        />
        {/* dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        {/* Browse arrows */}
        <div className="absolute inset-x-[60px] 2xl:inset-x-[116px] top-[42%] flex items-center justify-between z-10">
          <button
            type="button"
            aria-label={`Проект ${prevProject.title}`}
            onClick={() => navigate(`/projects/${prevProject.slug}`)}
            className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label={`Проект ${nextProject.title}`}
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
            className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Title + CTAs, centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[28px] px-6 text-center">
          <h1 className="font-heading text-[56px] 2xl:text-[80px] font-bold uppercase leading-none text-bg-subtle">
            VATAN VILLAGE
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
            <a
              href={SUPPORT_TEL}
              className="flex items-center justify-center rounded-[90px] bg-accent px-[32px] py-[16px] font-body text-[20px] font-medium leading-[1.6] text-bg-subtle hover:bg-[#9C8050] transition-colors"
            >
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. О проекте VATAN VILLAGE (Figma 7872:3581) ── */}
      <section className="bg-white pt-[80px] pb-[40px]">
        <Container>
          <div data-reveal className="flex flex-col gap-8">
            <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink">
              О проекте VATAN VILLAGE
            </h2>
            <div className="flex flex-col gap-6 max-w-[1730px]">
              {details.description.map((para, i) => (
                <p key={i} className="font-vela text-[22px] 2xl:text-[30px] leading-[1.4] text-ink">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Render gallery + photo strip (Figma 7872:3655 / 4228) ── */}
      <section className="bg-white py-[24px]">
        <Container>
          {/* Big view with bottom gradient + arrows (switches the main image) */}
          <div data-reveal="scale" className="relative h-[460px] 2xl:h-[700px] w-full overflow-hidden rounded-[5px] bg-black">
            <img loading="lazy" decoding="async" src={gallery[active]} alt="VATAN VILLAGE — общий вид" className="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-[224px] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-[40px] right-[40px] flex items-center gap-3">
              <button
                type="button"
                onClick={galleryPrev}
                aria-label="Предыдущее фото"
                className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={galleryNext}
                aria-label="Следующее фото"
                className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>

          {/* Thumbnail strip — click to switch the big view; active is ringed */}
          <div className="mt-[17px] grid grid-cols-6 gap-[12px] 2xl:gap-[17px]">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Фото ${i + 1}`}
                aria-current={i === active}
                className={`h-[100px] 2xl:h-[140px] overflow-hidden rounded-[4px] bg-white transition-all duration-300 ${
                  i === active ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img loading="lazy" decoding="async" src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Location map + specs card (Figma 7872:3503 / 3504) ── */}
      <section className="bg-white pt-[40px] pb-[80px]">
        <Container>
          <div className="relative">
            <div className="h-[460px] 2xl:h-[560px] w-full overflow-hidden rounded-[5px]">
              <iframe
                title="VATAN VILLAGE на карте"
                src="https://yandex.ru/map-widget/v1/?ll=69.310180%2C41.304621&z=14&pt=69.310180%2C41.304621%2Cpm2rdm"
                className="size-full border-0"
                loading="lazy"
              />
            </div>
            {/* Navy specs card overlapping the lower part of the map */}
            <div data-reveal className="relative z-10 mx-auto -mt-[96px] w-[92%] max-w-[1312px] rounded-[5px] border border-primary/30 bg-primary px-[40px] py-[44px] 2xl:px-[80px] 2xl:py-[56px] shadow-[0_30px_60px_rgba(10,15,40,0.25)]">
              <div className="grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-2">
                {specRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <div className="flex w-[190px] shrink-0 items-center gap-2 pt-[2px] text-white">
                      <span className="text-white/90 shrink-0">{row.icon}</span>
                      <span className="font-body text-[16px] leading-[1.6] text-white whitespace-nowrap">{row.label}:</span>
                    </div>
                    <span className="font-vela text-[18px] 2xl:text-[20px] font-medium leading-[1.4] text-[#afbaca]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. ПРЕИМУЩЕСТВА mosaic (Figma 7872:3584) ─────── */}
      <section className="bg-white py-[71px]">
        <Container>
          {/* Header: tag + heading (left) · description (right) */}
          <div data-reveal className="flex flex-col gap-10 2xl:flex-row 2xl:items-start 2xl:justify-between">
            <div className="flex flex-col gap-5">
              <SectionTag>Почему Vatan Village</SectionTag>
              <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Преимущества
              </h2>
            </div>
            <p className="font-vela text-[18px] 2xl:text-[20px] leading-[1.3] text-ink 2xl:w-[735px] 2xl:shrink-0">
              Квартал устроен как маленький город внутри города: передняя линия домов образует живую улицу с кофейнями,
              магазинами и сервисами на первых этажах, задняя — обращена тихими дворами с детскими площадками вглубь
              квартала. Здесь не нужно выезжать за кофе или продуктами — всё в шаговой доступности.
            </p>
          </div>

          {/* Grid of 6 cells */}
          <div className="mt-[40px] grid grid-cols-2 gap-[20px] 2xl:gap-[32px]">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                data-reveal
                style={{ transitionDelay: `${(i % 2) * 90}ms` }}
                className="group flex flex-col overflow-hidden"
              >
                <div className="h-[340px] 2xl:h-[498px] w-full overflow-hidden">
                  <img loading="lazy" decoding="async" src={a.image} alt={a.title} className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                </div>
                <div className="flex min-h-[200px] 2xl:h-[241px] items-center gap-6 border border-[#c4c4c4] bg-[#f8f8f8] px-[32px] py-[28px] 2xl:px-[48px]">
                  <h3 className="font-heading text-[24px] 2xl:text-[31px] font-bold leading-[1.4] text-black w-[230px] 2xl:w-[275px] shrink-0">
                    {a.title}
                  </h3>
                  <p className="font-vela text-[19px] 2xl:text-[24px] leading-[1.3] text-secondary">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Statement + stats (Figma 7872:3631) ───────── */}
      <section className="bg-bg-subtle py-[64px]">
        <Container>
          <p data-reveal className="text-center font-heading text-[34px] 2xl:text-[45px] font-semibold leading-[1.4] mb-[40px] 2xl:mb-[64px]">
            <span className="text-black">
              Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений.{' '}
            </span>
            <span className="text-accent">
              Renaissance Development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.
            </span>
          </p>
          <div className="flex items-stretch gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="card-lift flex flex-1 flex-col items-center justify-center gap-2 bg-white px-[26px] py-[24px] text-center"
              >
                <p className="font-heading text-[56px] 2xl:text-[75px] font-bold uppercase leading-none text-black"><CountUp value={s.value} /></p>
                <p className="font-body text-[16px] leading-[1.6] font-medium text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. План этажа на отм. (navy) ─────────────────── */}
      {details.floorPlans && (
        <section className="bg-primary py-[80px]">
          <Container>
            <h2 data-reveal className="font-heading text-[49px] 2xl:text-[61px] font-bold uppercase leading-[1.2] text-bg-subtle text-center mb-[48px]">
              План этажа на отм.
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {details.floorPlans.map((plan, i) => (
                <div
                  key={plan.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 110}ms` }}
                  className="card-lift bg-white rounded-[5px] shadow-[0_27px_40px_rgba(10,15,40,0.12)] p-[24px] flex flex-col gap-5"
                >
                  <div className="h-[300px] overflow-hidden flex items-center justify-center">
                    <img loading="lazy" decoding="async" src={plan.image} alt={plan.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-heading text-[24px] font-bold leading-[1.4] text-ink text-center">{plan.title}</h3>
                  <div className="flex flex-col gap-3">
                    {plan.rooms.map((room, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-vela text-[16px] text-[#8694b1] whitespace-nowrap">{room.name}</span>
                        <span className="flex-1 border-b border-dashed border-[#cdd5e3] min-w-2" />
                        <span className="font-vela text-[16px] text-[#344162] whitespace-nowrap">{room.area}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => modal?.openLead()}
                    className="mt-auto h-[56px] w-full bg-accent rounded-full flex items-center justify-center gap-3 font-body font-medium text-[20px] text-white hover:bg-[#9C8050] transition-colors"
                  >
                    Заказать звонок
                    <span className="flex size-7 items-center justify-center rounded-full bg-white shrink-0">
                      <ArrowIcon />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 8. Места поблизости ──────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <h2 data-reveal className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink mb-[60px]">
            Места поблизости
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {details.nearby.map((place, i) => (
              <div
                key={place.title}
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                className="card-lift flex flex-col gap-4 p-8 bg-bg-subtle rounded-[5px]"
              >
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

      {/* ── 9. Смотрите также наши другие проекты ────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <h2 data-reveal className="font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink mb-[40px]">
            Смотрите также наши другие проекты
          </h2>
          <div className="flex gap-8 overflow-hidden">
            {others.map((p, i) => (
              <div
                key={p.slug}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className="w-[520px] shrink-0"
              >
                <Link to={`/projects/${p.slug}`}>
                  <div className="relative h-[320px] rounded-[5px] overflow-hidden">
                    <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="size-full object-cover transition-transform hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-[#B0925E] px-6 py-2 rounded-full">
                      <span className="font-vela text-[16px] font-medium text-white">
                        {p.status === 'active' ? 'Идут продажи' : 'Распродан'}
                      </span>
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

      {/* ── 10. Вам нужна помощь? ────────────────────────── */}
      <NeedHelpSection />

      {/* ── 11. Производство ─────────────────────────────── */}
      <ProductionSection />

      {/* ── 12. FAQ ──────────────────────────────────────── */}
      <FAQSection />
    </main>
  )
}

/* ─── Icons ───────────────────────────────────────────── */
function ArrowIcon({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
      <path
        d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25"
        stroke={light ? 'white' : '#3A4754'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

/* Nearby icons (match ProjectDetails set) */
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
function CarIcon() {
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
    bus: <CarIcon />,
    cart: <CartIcon />,
    moon: <MoonIcon />,
    star: <StarIcon />,
  }
  return map[icon] ?? <SparklesIcon />
}
