import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { services } from '@/data/services'
import FAQSection from '@/components/home/FAQSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'

const steps = [
  {
    num: '01',
    title: 'Анализ и проектирование',
    body: 'Изучаем требования, формируем концепцию и разрабатываем полную проектную документацию.',
  },
  {
    num: '02',
    title: 'Производство материалов',
    body: 'Завод UTB производит бетон, ЖБИ и газоблок под конкретный объект с полным контролем качества.',
  },
  {
    num: '03',
    title: 'Строительство и сдача',
    body: 'Монолитный каркас, инженерные системы, отделка и передача объекта в установленный срок.',
  },
]

function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      {services.map((s, i) => (
        <div key={s.slug}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-[32px] text-left gap-6"
          >
            <div className="flex items-center gap-8 flex-1 min-w-0">
              <span className="font-heading text-[14px] font-medium text-secondary/60 w-[40px] shrink-0">
                0{i + 1}
              </span>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="font-body text-[13px] uppercase tracking-[0.1em] text-secondary/60">
                  {s.category}
                </span>
                <span className="font-heading text-[31px] font-bold leading-[1.2] text-ink">
                  {s.title}
                </span>
              </div>
            </div>
            <span className="text-[32px] leading-none text-ink shrink-0 w-8 text-center">
              {open === i ? '×' : '+'}
            </span>
          </button>

          {open === i && (
            <div className="pb-[40px] pl-[88px] flex items-start gap-10">
              <div className="flex flex-col gap-6 flex-1">
                <p className="font-body text-[18px] leading-[1.7] text-secondary">
                  {s.longDescription}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-[16px] leading-[1.6] text-ink">
                      <span className="text-accent mt-[3px] shrink-0">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 font-body font-medium text-[16px] text-accent hover:text-accent/80 transition-colors self-start"
                >
                  Подробнее →
                </Link>
              </div>
              <div className="w-[360px] shrink-0 aspect-[4/3] overflow-hidden">
                <img loading="lazy" decoding="async" src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="h-px bg-border" />
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary py-[100px]">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex items-end justify-between gap-8">
              <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.1] text-bg-subtle max-w-[900px]">
                Mastering the Art of Structural Precision.
              </h1>
              <div className="flex flex-col gap-5 items-end w-[460px] shrink-0">
                <p className="font-body text-[18px] leading-[1.7] text-white/70 text-right">
                  От проектирования до передачи ключей — полный цикл строительства с собственным производством.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center h-[56px] px-10 bg-accent rounded-[5px] font-body font-medium text-[18px] text-white hover:bg-[#E85F00] transition-colors"
                >
                  Получить консультацию
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Services accordion ───────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-[60px]">
            <div className="flex items-end justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="border border-border px-[24px] py-[16px] self-start">
                  <span className="font-body text-body-sm text-ink">УСЛУГИ</span>
                </div>
                <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.2] text-ink">
                  Что мы делаем
                </h2>
              </div>
              <p className="font-body text-[18px] leading-[1.7] text-secondary max-w-[480px] self-end">
                Комплекс строительных услуг от жилых комплексов до производства строительных материалов.
              </p>
            </div>
            <ServiceAccordion />
          </div>
        </Container>
      </section>

      {/* ── Process preview ──────────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <div className="flex flex-col gap-[60px]">
            <div className="flex items-center justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="border border-border px-[24px] py-[16px] self-start">
                  <span className="font-body text-body-sm text-ink">ПРОЦЕСС</span>
                </div>
                <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.2] text-ink">
                  Как мы работаем
                </h2>
              </div>
              <Link
                to="/process"
                className="inline-flex items-center justify-center h-[56px] px-10 bg-primary rounded-[5px] font-body font-medium text-[18px] text-white hover:bg-primary/90 transition-colors"
              >
                Подробнее о процессе
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="bg-white p-[40px] flex flex-col gap-5">
                  <span className="font-heading text-[61px] font-bold leading-none text-accent/20">
                    {step.num}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading text-[25px] font-bold leading-[1.3] text-ink">
                      {step.title}
                    </h3>
                    <p className="font-body text-[16px] leading-[1.7] text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
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
