import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useTranslation } from '@/i18n'

// «О компании» (Figma 7782:3017).
// Left column: badge + heading (top), then company name + text + buttons (offset down).
// Right column: photo offset 194px down (Figma: photo at top-259, section pt-65 → 259-65=194).
export default function AboutSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white pt-[65px] pb-[100px]">
      <Container>
        <div className="flex items-start gap-[69px]">

          {/* Left column */}
          <div data-reveal="left" className="w-[782px] shrink-0 flex flex-col">
            {/* Header: badge + heading */}
            <div className="flex flex-col gap-5">
              <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.about.tag')}</span>
            </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                {t('home.about.title')}
              </h2>
            </div>

            {/* Spacer between heading and company content */}
            <div className="h-[161px]" />

            {/* Company content */}
            <div className="flex flex-col gap-8">
              <p className="font-heading text-[50px] font-bold uppercase leading-[1.3] text-ink">
                Renaissance Development
              </p>
              <div className="flex flex-col gap-0 font-body text-[20px] leading-[1.6] text-ink">
                <p>{t('home.about.p1')}</p>
                <p className="mt-[1.6em]">{t('home.about.p2')}</p>
              </div>
              <div className="flex items-center gap-6">
                <Button to="/about" variant="primary" size="lg">
                  {t('common.learnMore')}
                </Button>
                <Button to="/quote" variant="outlineLight" size="lg">
                  {t('common.leaveRequest')}
                </Button>
              </div>
            </div>
          </div>

          {/* Right column: photo offset 194px from column top */}
          <div data-reveal="right" className="mt-[194px] flex-1">
            <div className="h-[754px] rounded-[5px] overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/assets/about-company.webp"
                alt={t('home.about.imageAlt')}
                className="reveal-zoom size-full object-cover"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
