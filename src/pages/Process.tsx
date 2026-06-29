import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import FAQSection from '@/components/home/FAQSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import { useTranslation } from '@/i18n'

type Stage = { num: string; title: string; subtitle: string; body: string; details: string[] }
type Stat = { value: string; label: string }

export default function Process() {
  const { t, tx } = useTranslation()
  const stages = tx<Stage[]>('pages.process.stages')
  const stats = tx<Stat[]>('pages.process.stats')
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary py-[100px] max-md:!py-[56px]">
        <Container>
          <div className="flex items-end justify-between gap-8 max-lg:!flex-col max-lg:items-start max-lg:gap-6">
            <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.1] text-bg-subtle max-w-[800px]">
              {t('pages.process.heroTitle')}
            </h1>
            <div className="flex flex-col gap-5 items-end w-[460px] max-lg:!w-full max-lg:items-start shrink-0">
              <p className="font-body text-[18px] leading-[1.7] text-white/70 text-right">
                {t('pages.process.heroDesc')}
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center h-[56px] px-10 bg-accent rounded-[5px] font-body font-medium text-[18px] text-white hover:bg-[#A2814E] transition-colors"
              >
                {t('pages.process.heroCta')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3-Step process ───────────────────────────────── */}
      <section className="bg-white py-[100px] max-md:!py-[56px]">
        <Container>
          <div className="flex flex-col gap-[80px]">

            {stages.map((stage, idx) => (
              <div
                key={stage.num}
                className={`flex items-start gap-[80px] max-lg:!flex-col max-lg:gap-8 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Image side */}
                <div className="w-[620px] max-lg:!w-full shrink-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/assets/about-company.webp"
                    alt={stage.title}
                    className="w-full aspect-[620/440] object-cover"
                  />
                </div>

                {/* Content side */}
                <div className="flex-1 min-w-0 flex flex-col gap-6 pt-4">
                  <span className="font-heading text-[120px] font-bold leading-none text-accent/10 select-none -mt-6">
                    {stage.num}
                  </span>
                  <div className="flex flex-col gap-2 -mt-10">
                    <span className="font-body text-[13px] uppercase tracking-[0.12em] text-secondary/60">
                      {stage.subtitle}
                    </span>
                    <h2 className="font-heading text-[49px] max-md:text-[30px] font-bold uppercase leading-[1.2] text-ink">
                      {stage.title}
                    </h2>
                  </div>
                  <p className="font-body text-[18px] leading-[1.7] text-secondary">
                    {stage.body}
                  </p>
                  <ul className="grid grid-cols-2 max-sm:!grid-cols-1 gap-3 mt-2">
                    {stage.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 font-body text-[16px] leading-[1.6] text-ink">
                        <span className="text-accent mt-[3px] shrink-0">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </Container>
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section className="bg-primary py-[80px] max-md:!py-[48px]">
        <Container>
          <div className="grid grid-cols-4 max-md:!grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="font-heading text-[61px] max-md:text-[34px] font-bold leading-none text-white">
                  {s.value}
                </span>
                <span className="font-body text-[16px] leading-[1.5] text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection />
      <NeedHelpSection />
    </main>
  )
}
