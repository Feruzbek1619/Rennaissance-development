import { useParams, Link, Navigate } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import FAQSection from '@/components/home/FAQSection'
import { projects } from '@/data/projects'
import { ChevronLeft, ChevronRight } from '@/components/icons'

/* ─── Icon helpers ───────────────────────────────────── */
function ArrowIcon({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25"
        stroke={light ? 'white' : '#0D2B45'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12c0 8-8 13-8 13S4 20 4 12a8 8 0 0 1 16 0Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CraneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M2 20h20M4 20V8l8-4 8 4v12M9 20v-5h6v5M12 8v4M8 12h8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ResizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M21 3l-6 6M3 21l6-6M21 3H15M21 3V9M3 21h6M3 21v-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M12 3v1M12 20v1M3 12H2M22 12h-1M5.636 5.636l-.707-.707M19.071 19.071l-.707-.707M5.636 18.364l-.707.707M19.071 4.929l-.707.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

function GradCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeLinecap="round" />
      <path d="M3 10h18M7 17v2M17 17v2" stroke="currentColor" strokeLinecap="round" />
      <circle cx="7.5" cy="13.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="13.5" r="1" fill="currentColor" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-ink">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NearbyIconFor({ icon }: { icon: string }) {
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

function FeatureIconFor({ icon }: { icon: string }) {
  const map: Record<string, JSX.Element> = {
    home: <HomeFeatureIcon />,
    car: <CarIcon />,
    tree: <SparklesIcon />,
    ceiling: <ResizeIcon />,
    leaf: <MoonIcon />,
    sun: <StarIcon />,
  }
  return map[icon] ?? <HomeFeatureIcon />
}

/* ─── InfoChip ───────────────────────────────────────── */
function InfoChip({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="bg-white/25 border border-white/10 rounded-[5px] h-[72px] w-[379px] flex items-center px-[15px] gap-3 shadow-[0_20px_40px_rgba(19,22,18,0.1)]">
      <div className="flex items-center justify-center size-10 rounded-[8px] bg-white/10 border border-white/10 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="font-vela text-[16px] font-bold text-white leading-none whitespace-nowrap">{label}</p>
        <p className="font-vela text-[12px] font-medium text-white/60 leading-none">{sub}</p>
      </div>
    </div>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3)
  const details = project.details

  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="relative h-[888px] overflow-hidden bg-primary">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        {/* Carousel arrows */}
        <div className="absolute inset-x-[116px] top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
          <button type="button" className="pointer-events-auto flex size-[53px] items-center justify-center rounded-full bg-white/25 text-white hover:bg-white/40 transition-colors">
            <ChevronLeft className="size-6" />
          </button>
          <button type="button" className="pointer-events-auto flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors">
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <Container>
            <div className="pb-[40px]">
              {/* Title */}
              <p className="font-heading text-[80px] font-bold uppercase leading-none text-bg-subtle mb-[40px]">
                {project.title}
              </p>

              {/* Info chips: 2 rows × 2 cols */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px]">
                  <InfoChip
                    icon={<MapPinIcon />}
                    label={details?.specs.address ?? project.location}
                    sub="Адрес объекта"
                  />
                  <InfoChip
                    icon={<ResizeIcon />}
                    label={details?.specs.area ?? project.area}
                    sub="Площадь квартир"
                  />
                </div>
                <div className="flex gap-[10px]">
                  <InfoChip
                    icon={<CraneIcon />}
                    label={project.category}
                    sub="Тип объекта"
                  />
                  <InfoChip
                    icon={<SparklesIcon />}
                    label={details?.advantage ?? 'Современный комплекс'}
                    sub="Преимущество"
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-4 mt-[20px]">
                <button
                  type="button"
                  className="flex items-center gap-3 bg-primary text-white rounded-full px-[21px] py-[16px] font-vela text-[20px] font-medium leading-[1.6] hover:bg-primary/80 transition-colors"
                >
                  Заказать звонок
                  <span className="flex size-7 items-center justify-center rounded-full bg-white shrink-0">
                    <ArrowIcon />
                  </span>
                </button>
                <Button variant="accent" size="lg" to="/quote">
                  Позвонить
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── 2. About project ────────────────────────────── */}
      {details && (
        <section className="bg-white pt-[80px] pb-[60px]">
          <Container>
            <div className="flex flex-col gap-8 max-w-[1390px]">
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                О проекте {project.title}
              </h2>
              <div className="flex flex-col gap-6">
                {details.description.map((para, i) => (
                  <p key={i} className="font-body text-[20px] leading-[1.6] text-ink">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── 3. Large gallery photo ───────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="h-[600px] rounded-[5px] overflow-hidden">
            <img src={project.image} alt={project.title} className="size-full object-cover" />
          </div>
        </Container>
      </section>

      {/* ── 4. Stats tagline ─────────────────────────────── */}
      <section className="bg-bg-subtle py-[60px]">
        <Container>
          <p className="text-center font-heading text-[45px] font-semibold leading-[1.4] mb-10">
            <span className="text-ink">Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений. </span>
            <span className="text-accent">Renaissance development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.</span>
          </p>
          <div className="flex items-center gap-4">
            {[
              { value: '12+', label: 'проектов реализовано и строится' },
              { value: '5+', label: 'проектов в продаже сейчас' },
              { value: '2021', label: 'собственный бетонный завод' },
              { value: '2019', label: 'год основания' },
            ].map((s) => (
              <div key={s.label} className="flex flex-1 flex-col items-start gap-2 bg-white px-8 py-6">
                <p className="font-heading text-[75px] font-bold uppercase leading-none text-ink">{s.value}</p>
                <p className="font-body text-body-sm font-medium text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Features (outdoor) ────────────────────────── */}
      {details && (
        <section className="bg-white py-[100px]">
          <Container>
            <div className="flex items-start gap-16">
              {/* Left: photo + text */}
              <div className="flex flex-col gap-8 w-[698px] shrink-0">
                <div className="h-[450px] rounded-[5px] overflow-hidden">
                  <img src={project.image} alt="" className="size-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink mb-4">ПРЕИМУЩЕСТВА</h2>
                  <p className="font-body text-[20px] leading-[1.6] text-ink">
                    Во дворе слышно детей, а не машины: автомобили уходят под землю,
                    поэтому остаётся закрытый двор с детской площадкой и зелёными
                    деревьями. Видеонаблюдение работает круглосуточно по всей территории.
                  </p>
                </div>
              </div>

              {/* Right: 2×3 feature grid */}
              <div className="flex-1 min-w-0 grid grid-cols-2 gap-4">
                {details.features.map((feature, i) => (
                  <div key={i} className="flex flex-col gap-3 p-6 border border-border rounded-[5px]">
                    <div className="flex size-10 items-center justify-center rounded-full bg-bg-subtle text-ink">
                      <FeatureIconFor icon={feature.icon} />
                    </div>
                    <h3 className="font-vela text-[18px] font-semibold text-ink leading-[1.3]">{feature.title}</h3>
                    <p className="font-body text-[16px] leading-[1.6] text-secondary">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── 6. Features (interior) ───────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-stretch gap-0 rounded-[5px] overflow-hidden">
            {/* Left: photo */}
            <div className="w-[698px] shrink-0 min-h-[500px]">
              <img src={project.image} alt="" className="size-full object-cover" />
            </div>
            {/* Right: dark panel */}
            <div className="flex-1 bg-primary p-[60px] flex flex-col gap-8">
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-bg-subtle">ПРЕИМУЩЕСТВА</h2>
              <p className="font-body text-[20px] leading-[1.6] text-white/80">
                Это просторные помещения с огромными витражными окнами. В каждом из
                них предусмотрен лифт для подъема на территорию приватного двора
                нажатием ступеней, в полном соответствии с концепцией безбарьерной среды.
                А для получения посылок будут установлены постаматы.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { label: 'Скоростные лифты' },
                  { label: 'Витражные окна' },
                  { label: 'Металлические двери' },
                  { label: 'Мягкое освещение' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-white/10 rounded-[5px] px-4 py-3">
                    <div className="size-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <SparklesIcon />
                    </div>
                    <span className="font-vela text-[16px] font-medium text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 7. Photo strip ───────────────────────────────── */}
      <section className="bg-white pb-[80px]">
        <Container>
          <div className="flex gap-4 h-[300px]">
            {[project.image, project.image, project.image].map((src, i) => (
              <div key={i} className="flex-1 rounded-[5px] overflow-hidden">
                <img src={src} alt="" className="size-full object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 8. Address / Map ─────────────────────────────── */}
      {details && (
        <section className="bg-bg-subtle py-[80px]">
          <Container>
            <div className="flex items-stretch gap-8">
              {/* Left: spec table */}
              <div className="w-[500px] shrink-0">
                <h2 className="font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink mb-6">Адрес объекта</h2>
                <div className="flex flex-col">
                  {[
                    { label: 'Название', value: project.title },
                    { label: 'Адрес', value: details.specs.address },
                    { label: 'Площадь', value: details.specs.area },
                    { label: 'Этажность', value: details.specs.floors },
                    { label: 'Категория', value: details.specs.category },
                    { label: 'Год', value: details.specs.year },
                    { label: 'Статус', value: details.specs.status },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-8 py-[14px] border-b border-border last:border-0">
                      <span className="font-vela text-[16px] text-secondary w-[130px] shrink-0">{row.label}</span>
                      <span className="font-vela text-[16px] font-semibold text-ink">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: map placeholder */}
              <div className="flex-1 rounded-[5px] overflow-hidden bg-[#e8eaec] min-h-[400px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon />
                    <p className="font-vela text-[14px] text-secondary mt-2">{details.specs.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── 9. Nearby places ─────────────────────────────── */}
      {details && (
        <section className="bg-white py-[100px]">
          <Container>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink mb-[60px]">
              Места поблизости
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {details.nearby.map((place) => (
                <div key={place.title} className="flex flex-col gap-4 p-8 border border-border rounded-[5px]">
                  <div className="size-10 flex items-center justify-center rounded-full bg-bg-subtle text-ink">
                    <NearbyIconFor icon={place.icon} />
                  </div>
                  <h3 className="font-heading text-[22px] font-bold uppercase leading-[1.3] text-ink">{place.title}</h3>
                  <p className="font-body text-[16px] leading-[1.6] text-secondary">{place.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 10. Other projects carousel ──────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <h2 className="font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink mb-[40px]">
            Смотрите также наши другие проекты
          </h2>
          <div className="flex gap-8 overflow-hidden">
            {others.map((p) => (
              <div key={p.slug} className="w-[520px] shrink-0">
                <Link to={`/projects/${p.slug}`}>
                  <div className="relative h-[320px] rounded-[5px] overflow-hidden">
                    <img src={p.image} alt={p.title} className="size-full object-cover transition-transform hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-[#FF9500] px-6 py-2 rounded-full">
                      <span className="font-vela text-[16px] font-medium text-white">Идут продажи</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-heading text-[14px] font-semibold text-ink">{p.category}</p>
                    <p className="font-heading text-[34px] font-bold uppercase leading-none text-ink mt-1">{p.title}</p>
                    <div className="flex gap-4 mt-4">
                      <button type="button" className="flex-1 flex items-center justify-between bg-primary text-white rounded-full px-5 py-3">
                        <span className="font-vela text-[16px] font-medium">Выбрать квартиру</span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-white shrink-0">
                          <ArrowIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 11. NeedHelp ─────────────────────────────────── */}
      <NeedHelpSection />

      {/* ── 12. Production section ───────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-5 mb-8">
            <div className="border border-border px-[18px] py-[6px] self-start">
              <span className="font-body text-body-sm text-ink">Завод</span>
            </div>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">ПРОИЗВОДСТВО</h2>
          </div>
          <div className="flex items-center gap-[60px]">
            <div className="w-[698px] h-[420px] shrink-0 rounded-[5px] overflow-hidden">
              <img src="/assets/production.png" alt="Universal Temir Beton" className="size-full object-cover" />
            </div>
            <div className="flex flex-col gap-6 flex-1">
              <h3 className="font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink">UNIVERSAL TEMIR BETON</h3>
              <p className="font-body text-[20px] leading-[1.6] text-secondary">
                С 2021 года завод обеспечивает все объекты компании товарным бетоном, железобетонными изделиями,
                газоблоком, вентиляционными шахтами и термо-рамами. Строим из своих материалов — контролируем качество на каждом этапе.
              </p>
              <div className="flex items-center gap-4">
                <Button to="/b2b" variant="primary" size="lg">Подробнее</Button>
                <Button to="/quote" variant="outlineLight" size="lg">Оставить заявку</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 13. FAQ ──────────────────────────────────────── */}
      <FAQSection />
    </main>
  )
}
