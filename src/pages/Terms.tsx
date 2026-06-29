import { Container } from '@/components/Container'
import { useTranslation } from '@/i18n'

type Section = { title: string; body: string; items?: string[] }

export default function Terms() {
  const { t, tx } = useTranslation()
  const sections = tx<Section[]>('pages.terms.sections')
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/80 py-[72px] max-md:!py-[44px]">
        <Container>
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-5">
              <div className="border border-white/20 px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-white/60">{t('pages.terms.heroTag')}</span>
              </div>
              <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.1] text-bg-subtle">
                {t('pages.terms.heroTitle')}
              </h1>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-white/70 w-[580px] self-end">
              {t('pages.terms.heroDesc')}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="bg-white py-[100px] max-md:!py-[56px]">
        <Container>
          <div className="max-w-[820px] mx-auto flex flex-col gap-[60px]">
            {sections.map((s) => (
              <div key={s.title} className="flex flex-col gap-4">
                <h2 className="font-heading text-[31px] font-bold leading-[1.3] text-ink">
                  {s.title}
                </h2>
                <p className="font-body text-[18px] leading-[1.75] text-secondary">{s.body}</p>
                {s.items && (
                  <ul className="flex flex-col gap-2 mt-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 font-body text-[18px] leading-[1.75] text-secondary">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
