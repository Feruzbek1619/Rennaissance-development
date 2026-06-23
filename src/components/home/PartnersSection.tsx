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
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-5 w-[961px] shrink min-w-0">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">НАШИ КЛИЕНТЫ</span>
              </div>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Партнеры в архитектурном совершенстве.
              </h2>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-ink w-[666px] shrink min-w-0 pt-2">
              Наша команда экспертов гарантирует, что каждый проект будет реализован точно в срок,
              в рамках бюджета и с бескомпромиссным качеством.
            </p>
          </div>

          {/* Logo row */}
          <div className="flex items-center justify-center">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-[112px] flex-1 min-w-0"
              >
                <img loading="lazy" decoding="async"
                  src={logo.src}
                  alt={logo.alt}
                  style={{ width: logo.width, height: 48 }}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
