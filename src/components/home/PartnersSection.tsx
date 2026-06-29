import { Container } from '@/components/Container'
import { useTranslation } from '@/i18n'

const logos = [
  { src: '/assets/partner-1.svg', width: 199 },
  { src: '/assets/partner-2.svg', width: 199 },
  { src: '/assets/partner-3.svg', width: 202 },
  { src: '/assets/partner-4.svg', width: 240 },
  { src: '/assets/partner-4.svg', width: 240 },
]

// «Партнёры в архитектурном совершенстве» (Figma 7778:3869)
export default function PartnersSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-[100px] max-md:!py-[56px]">
      <Container>
        <div className="flex flex-col gap-16">

          {/* Header: badge+heading left, description right */}
          <div data-reveal="left" className="flex items-start justify-between max-md:!flex-col max-md:!gap-6">
            <div className="flex flex-col gap-5 w-[961px] max-md:!w-full shrink min-w-0">
              <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.partners.tag')}</span>
            </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
                {t('home.partners.title')}
              </h2>
            </div>
            <p className="font-body text-[20px] max-md:!text-[16px] leading-[1.6] text-ink w-[666px] max-md:!w-full shrink min-w-0 pt-2">
              {t('home.partners.desc')}
            </p>
          </div>

          {/* Logo marquee — scrolls in an infinite loop (two identical groups,
              shifted by exactly one group width). Pauses on hover; edges fade. */}
          <div
            data-reveal
            className="relative w-full overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
          >
            <div className="flex w-max animate-marquee">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
                  {logos.map((logo, i) => (
                    <div key={i} className="flex h-[112px] items-center justify-center px-[36px] 2xl:px-[56px]">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={logo.src}
                        alt={group === 0 ? `${t('home.partners.alt')} ${i + 1}` : ''}
                        style={{ width: logo.width, height: 48 }}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
