'use client'
import { useState } from 'react'
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { CountUp } from '@/components/CountUp'
import { SkeletonImage } from '@/components/SkeletonImage'
import { completedProjects } from '@/data/completed'

/* ─── Completed / handed-over project — showcase only, no sale CTAs ─── */

const stats = [
  { value: '12+', label: 'проектов реализовано и строится' },
  { value: '5+', label: 'проектов в продаже сейчас' },
  { value: '2021', label: 'собственный бетонный завод' },
  { value: '2019', label: 'год основания' },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden>
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CompletedProject() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = completedProjects.find((p) => p.slug === slug)
  const [active, setActive] = useState(0)

  if (!project) return <Navigate to="/projects" replace />

  const gal = project.gallery
  const galPrev = () => setActive((c) => (c - 1 + gal.length) % gal.length)
  const galNext = () => setActive((c) => (c + 1) % gal.length)

  const others = completedProjects.filter((p) => p.slug !== slug).slice(0, 3)
  const idx = completedProjects.findIndex((p) => p.slug === slug)
  const single = completedProjects.length <= 1
  const prevP = completedProjects[(idx - 1 + completedProjects.length) % completedProjects.length]
  const nextP = completedProjects[(idx + 1) % completedProjects.length]

  const [mLat, mLng] = project.coords ?? [41.311, 69.28]
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${mLng}%2C${mLat}&z=15&pt=${mLng}%2C${mLat}%2Cpm2rdm`

  return (
    <main>
      {/* ── 1. Hero (no CTAs — finished project) ─────────── */}
      <section className="relative h-[600px] 2xl:h-[760px] overflow-hidden bg-primary">
        <SkeletonImage eager src={project.hero} alt={project.title} className="absolute inset-0" imgClassName="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/85" />

        {!single && (
          <div className="absolute inset-x-[60px] 2xl:inset-x-[116px] top-[44%] flex items-center justify-between z-10">
            <button type="button" aria-label={`Проект ${prevP.title}`} onClick={() => navigate(`/completed/${prevP.slug}`)} className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" aria-label={`Проект ${nextP.title}`} onClick={() => navigate(`/completed/${nextP.slug}`)} className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors">
              <ChevronRight className="size-6" />
            </button>
          </div>
        )}

        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-accent" />
            <span className="font-body text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">{project.eyebrow}</span>
            <span className="h-px w-9 bg-accent" />
          </div>
          <h1 className="font-heading text-[52px] 2xl:text-[80px] font-bold uppercase leading-none text-bg-subtle">{project.title}</h1>
          <p className="font-body text-[18px] leading-[1.5] text-white/80 max-w-[680px]">{project.location}</p>
          <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-5 py-2 font-vela text-[15px] font-medium uppercase tracking-[0.1em] text-accent backdrop-blur-sm">
            <CheckIcon />
            Сдан в эксплуатацию
          </span>
        </div>
      </section>

      {/* ── 2. About ─────────────────────────────────────── */}
      <section className="bg-white pt-[80px] pb-[40px]">
        <Container>
          <div data-reveal className="flex flex-col gap-8">
            <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink">
              О проекте {project.title}
            </h2>
            <div className="flex flex-col gap-6 max-w-[1500px]">
              {project.description.map((para, i) => (
                <p key={i} className="font-vela text-[22px] 2xl:text-[30px] leading-[1.4] text-ink">{para}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Gallery ───────────────────────────────────── */}
      <section className="bg-white py-[24px]">
        <Container>
          <div data-reveal="scale" className="relative h-[460px] 2xl:h-[700px] w-full overflow-hidden rounded-[8px] bg-black">
            <SkeletonImage key={gal[active]} src={gal[active]} alt={`${project.title} — фото`} className="absolute inset-0" imgClassName="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            {gal.length > 1 && (
              <div className="absolute bottom-[36px] right-[36px] flex items-center gap-3">
                <button type="button" onClick={galPrev} aria-label="Предыдущее фото" className="flex size-[53px] items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors">
                  <ChevronLeft className="size-6" />
                </button>
                <button type="button" onClick={galNext} aria-label="Следующее фото" className="flex size-[53px] items-center justify-center rounded-full bg-white/40 text-white hover:bg-white/60 transition-colors">
                  <ChevronRight className="size-6" />
                </button>
              </div>
            )}
          </div>

          {gal.length > 1 && (
            <div className="mt-[16px] grid gap-[12px] 2xl:gap-[16px]" style={{ gridTemplateColumns: `repeat(${gal.length}, minmax(0, 1fr))` }}>
              {gal.map((src, i) => (
                <button key={src} type="button" onClick={() => setActive(i)} aria-label={`Фото ${i + 1}`} aria-current={i === active} className={`h-[88px] 2xl:h-[120px] overflow-hidden rounded-[5px] bg-white transition-all duration-300 ${i === active ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                  <SkeletonImage src={src} alt="" className="size-full" imgClassName="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── 4. Map + specs card ──────────────────────────── */}
      <section className="bg-white pt-[40px] pb-[80px]">
        <Container>
          <div className="relative">
            <div className="h-[440px] 2xl:h-[540px] w-full overflow-hidden rounded-[8px]">
              <iframe title={`${project.title} на карте`} src={mapSrc} className="size-full border-0" loading="lazy" />
            </div>
            <div data-reveal className="relative z-10 mx-auto -mt-[88px] w-[92%] max-w-[1312px] rounded-[8px] border border-primary/30 bg-primary px-[40px] py-[44px] 2xl:px-[72px] 2xl:py-[52px] shadow-[0_30px_60px_rgba(10,15,40,0.25)]">
              <div className="grid grid-cols-1 gap-x-[60px] gap-y-[22px] md:grid-cols-2">
                <div className="flex items-start gap-3 md:col-span-2">
                  <span className="mt-[9px] size-[6px] shrink-0 rounded-full bg-accent" />
                  <span className="font-body text-[16px] leading-[1.6] text-white/60 w-[150px] shrink-0">Название:</span>
                  <span className="font-vela text-[18px] 2xl:text-[20px] font-medium leading-[1.4] text-[#cbd2dc]">{project.title}</span>
                </div>
                {project.specs.map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="mt-[9px] size-[6px] shrink-0 rounded-full bg-accent" />
                    <span className="font-body text-[16px] leading-[1.6] text-white/60 w-[150px] shrink-0">{row.label}:</span>
                    <span className="font-vela text-[18px] 2xl:text-[20px] font-medium leading-[1.4] text-[#cbd2dc]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. Nearby places ─────────────────────────────── */}
      <section className="bg-bg-subtle py-[80px]">
        <Container>
          <div data-reveal className="mb-[48px] flex flex-col gap-5">
            <SectionTag>Инфраструктура</SectionTag>
            <h2 className="font-heading text-[44px] 2xl:text-[61px] font-bold uppercase leading-[1.2] text-ink">Места поблизости</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {project.nearby.map((place, i) => (
              <div key={place.label} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }} className="card-lift flex items-center gap-5 rounded-[8px] bg-white p-7">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bg-subtle text-accent-dark">
                  <ClockIcon />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-[22px] font-bold leading-tight text-ink">{place.time}</span>
                  <span className="font-body text-[16px] text-secondary">{place.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Statement + stats ─────────────────────────── */}
      <section className="bg-white py-[64px]">
        <Container>
          <p data-reveal className="mb-[40px] 2xl:mb-[56px] text-center font-heading text-[34px] 2xl:text-[45px] font-semibold leading-[1.4]">
            <span className="text-ink">Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений. </span>
            <span className="text-accent">Renaissance Development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.</span>
          </p>
          <div className="flex items-stretch gap-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="card-lift flex flex-1 flex-col items-center justify-center gap-2 bg-bg-subtle px-[26px] py-[24px] text-center">
                <p className="font-heading text-[56px] 2xl:text-[75px] font-bold uppercase leading-none text-ink"><CountUp value={s.value} /></p>
                <p className="font-body text-[16px] font-medium leading-[1.6] text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. Other completed projects (no CTA) ─────────── */}
      {others.length > 0 && (
        <section className="bg-bg-subtle py-[100px]">
          <Container>
            <h2 data-reveal className="mb-[40px] font-heading text-[34px] font-bold uppercase leading-[1.3] text-ink">
              Другие реализованные проекты
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {others.map((p, i) => (
                <Link key={p.slug} to={`/completed/${p.slug}`} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className="group flex flex-col gap-4">
                  <div className="relative h-[320px] overflow-hidden rounded-[8px]">
                    <SkeletonImage src={p.hero} alt={p.title} className="absolute inset-0" imgClassName="size-full object-cover transition-transform duration-[600ms] group-hover:scale-105" />
                    <div className="absolute left-4 top-4 rounded-full bg-stone px-5 py-2">
                      <span className="font-vela text-[15px] font-medium text-white">Сдан</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-heading text-[28px] font-bold uppercase leading-none text-ink">{p.title}</p>
                    <p className="mt-2 font-body text-[15px] text-secondary">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
