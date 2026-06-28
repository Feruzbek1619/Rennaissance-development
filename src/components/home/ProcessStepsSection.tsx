import { Container } from '@/components/Container'
import { useTranslation } from '@/i18n'

const COUNT = 3

// «Три простых шага» (Figma 7782:2938).
export default function ProcessStepsSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-[64px]">

          {/* Header */}
          <div data-reveal="left" className="flex items-start justify-between max-lg:flex-col max-lg:gap-6">
            <div className="flex flex-col gap-5 w-[850px] max-lg:w-full shrink min-w-0">
              <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.process.tag')}</span>
            </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
                {t('home.process.title')}
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-secondary w-[692px] max-lg:w-full shrink min-w-0 pt-2">
              {t('home.process.desc')}
            </p>
          </div>

          {/* Content */}
          <div data-reveal="right" className="flex items-center gap-[72px] max-lg:flex-col max-lg:gap-8">

            {/* Left: photo */}
            <div className="w-[698px] h-[678px] max-lg:w-full max-lg:h-[340px] shrink-0 rounded-[5px] overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/assets/home-process.webp"
                alt="Renaissance Development"
                className="size-full object-cover"
              />
            </div>

            {/* Right: 3 steps */}
            <div className="flex-1 min-w-0 flex flex-col">
              {Array.from({ length: COUNT }, (_, i) => (
                <div key={i}>
                  <div className="py-[40px] flex items-center gap-[53px] max-md:flex-col max-md:items-start max-md:gap-5">
                    <div className="flex flex-col gap-[26px] shrink-0 w-[256px] max-md:w-full">
                      <span className="font-body text-[22px] leading-[1.4] text-ink">{t(`home.process.steps.${i}.num`)}</span>
                      <p className="font-heading font-bold text-[34px] leading-[1.4] text-ink">
                        {t(`home.process.steps.${i}.title`)}
                      </p>
                    </div>
                    <p className="font-body text-[20px] leading-[1.6] text-secondary flex-1 min-w-0">
                      {t(`home.process.steps.${i}.desc`)}
                    </p>
                  </div>
                  {i < COUNT - 1 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
