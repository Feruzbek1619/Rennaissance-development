import { useParams, Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import FAQSection from '@/components/home/FAQSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import NotFound from './NotFound'

const processSteps = [
  {
    num: '01',
    title: 'Первичная консультация',
    body: 'Обсуждаем требования, сроки и бюджет. Формируем техническое задание.',
  },
  {
    num: '02',
    title: 'Проектирование',
    body: 'Разрабатываем архитектурную концепцию и полную рабочую документацию.',
  },
  {
    num: '03',
    title: 'Производство и поставка',
    body: 'Завод UTB производит все необходимые материалы с контролем качества.',
  },
  {
    num: '04',
    title: 'Строительство',
    body: 'Ведём строительство в соответствии с проектом и установленным графиком.',
  },
]

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <NotFound />

  const relatedProjects = projects.slice(0, 3)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary py-[100px]">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-5">
              <Link
                to="/services"
                className="font-body text-[14px] text-white/50 hover:text-white/80 transition-colors mt-2"
              >
                ← Услуги
              </Link>
              <div className="border border-white/20 px-[18px] py-[8px]">
                <span className="font-body text-body-sm text-white/60">{service.category}</span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-8">
              <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.1] text-bg-subtle max-w-[780px]">
                {service.title}
              </h1>
              <p className="font-body text-[18px] leading-[1.7] text-white/70 w-[460px] shrink-0 self-end">
                {service.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats row ────────────────────────────────────── */}
      <section className="bg-ink py-[60px]">
        <Container>
          <div className="grid grid-cols-4 gap-0 divide-x divide-white/10">
            {service.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 px-8 first:pl-0 last:pr-0">
                <span className="font-heading text-[49px] font-bold leading-none text-white">
                  {s.value}
                </span>
                <span className="font-body text-[15px] leading-[1.5] text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Description + features ───────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-start gap-[80px]">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-8">
                <div className="border border-border px-[24px] py-[16px] self-start">
                  <span className="font-body text-body-sm text-ink">ОБ УСЛУГЕ</span>
                </div>
                <h2 className="font-heading text-[49px] font-bold uppercase leading-[1.2] text-ink">
                  Что входит в услугу
                </h2>
                <p className="font-body text-[18px] leading-[1.7] text-secondary max-w-[640px]">
                  {service.longDescription}
                </p>
                <ul className="grid grid-cols-2 gap-4 mt-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-[16px] leading-[1.6] text-ink">
                      <span className="text-accent mt-[3px] shrink-0 text-[20px]">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center h-[56px] px-10 bg-primary rounded-[5px] font-body font-medium text-[18px] text-white hover:bg-primary/90 transition-colors"
                  >
                    Получить консультацию
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[520px] shrink-0 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full aspect-[520/420] object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Process steps ────────────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-col gap-4">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">ПРОЦЕСС</span>
              </div>
              <h2 className="font-heading text-[49px] font-bold uppercase leading-[1.2] text-ink">
                Как мы работаем
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div key={step.num} className="bg-white p-[36px] flex flex-col gap-5">
                  <span className="font-heading text-[49px] font-bold leading-none text-accent/20">
                    {step.num}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading text-[20px] font-bold leading-[1.3] text-ink">
                      {step.title}
                    </h3>
                    <p className="font-body text-[15px] leading-[1.7] text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related projects ─────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-[60px]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[49px] font-bold uppercase leading-[1.2] text-ink">
                Похожие проекты
              </h2>
              <Link
                to="/projects"
                className="font-body font-medium text-[16px] text-primary hover:text-accent transition-colors"
              >
                Все проекты →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FAQSection />
      <NeedHelpSection />
    </main>
  )
}
