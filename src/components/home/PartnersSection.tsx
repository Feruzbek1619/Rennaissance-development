import { Container } from '@/components/Container'

const logos = [
  { src: '/assets/partner-1.svg', alt: 'Партнёр 1', width: 199 },
  { src: '/assets/partner-2.svg', alt: 'Партнёр 2', width: 199 },
  { src: '/assets/partner-3.svg', alt: 'Партнёр 3', width: 202 },
  { src: '/assets/partner-4.svg', alt: 'Партнёр 4', width: 240 },
  { src: '/assets/partner-4.svg', alt: 'Партнёр 5', width: 240 },
]

// «Партнёры в архитектурном совершенстве» (Figma 7778:3869)
export default function PartnersSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-16">

          {/* Header: badge+heading left, description right */}
          <div data-reveal="left" className="flex items-start justify-between">
            <div className="flex flex-col gap-5 w-[961px] shrink min-w-0">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">НАШИ КЛИЕНТЫ</span>
              </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Партнеры в архитектурном совершенстве.
              </h2>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-ink w-[666px] shrink min-w-0 pt-2">
              Наша команда экспертов гарантирует, что каждый проект будет реализован точно в срок,
              в рамках бюджета и с бескомпромиссным качеством.
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
                        alt={group === 0 ? logo.alt : ''}
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
