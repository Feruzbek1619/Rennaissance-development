import { Container } from '@/components/Container'

function OfficeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <rect x="6" y="8" width="24" height="34" rx="1" stroke="#0D2B45" strokeWidth="2" />
      <rect x="30" y="20" width="12" height="22" rx="1" stroke="#0D2B45" strokeWidth="2" />
      <line x1="12" y1="16" x2="18" y2="16" stroke="#0D2B45" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="22" x2="18" y2="22" stroke="#0D2B45" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="28" x2="18" y2="28" stroke="#0D2B45" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="34" width="8" height="8" rx="1" stroke="#0D2B45" strokeWidth="2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <path
        d="M9 6h7.5l3.5 9-4.5 2.5A24 24 0 0 0 24 27l2.5-4.5 9 3.5V34a2 2 0 0 1-2 2C16.5 36 12 19.5 12 8a2 2 0 0 1-3-2Z"
        stroke="#0D2B45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.19 7.88A28 28 0 0 0 9 10c0 15.46 12.54 28 28 28h2.12"
        stroke="#0D2B45"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="#0D2B45" strokeWidth="2" />
      <polyline points="6,10 24,26 42,10" stroke="#0D2B45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <circle cx="24" cy="24" r="18" stroke="#0D2B45" strokeWidth="2" />
      <polyline points="24,12 24,24 32,28" stroke="#0D2B45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const cards = [
  {
    icon: <OfficeIcon />,
    title: 'Офис продаж',
    lines: ['г. Ташкент, Махтумкули, 100116,', 'Республика Узбекистан'],
  },
  {
    icon: <PhoneIcon />,
    title: 'Телефон',
    lines: ['78-333-33-31'],
  },
  {
    icon: <MessengerIcon />,
    title: 'Мессенджеры',
    lines: ['Telegram: @rbcompanyuz', 'Instagram: @rbcompany.uz'],
  },
  {
    icon: <ClockIcon />,
    title: 'Часы работы',
    lines: ['Пн-Пт: 9:00–18:00.'],
  },
]

// «Свяжитесь с нами» — контакты (Figma 7781:2372).
// Header: badge + h2 LEFT, description RIGHT. Then 4 equal-width contact cards.
export default function ContactSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-[64px]">

          {/* Header */}
          <div data-reveal="left" className="flex items-start justify-between">
            <div className="flex flex-col gap-5 w-[850px] shrink min-w-0">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">Контакты</span>
              </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Свяжитесь с нами
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-ink w-[692px] shrink min-w-0 pt-2">
              Менеджер ответит на любые вопросы по квартирам, рассрочке и объектам.
              Работаем без выходных.
            </p>
          </div>

          {/* 4 contact cards */}
          <div data-reveal-stagger className="flex gap-4 items-stretch">
            {cards.map((card, i) => (
              <div
                key={i}
                className="card-lift flex-1 border border-[#c4c4c4] h-[323px] overflow-hidden"
              >
                <div className="px-[26px] pt-[39px] flex flex-col gap-12">
                  {/* Icon */}
                  <div className="shrink-0">
                    {card.icon}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-6">
                    <p className="font-heading font-bold text-[31px] leading-[1.4] text-ink">
                      {card.title}
                    </p>
                    <div className="font-body text-[20px] leading-[1.6] text-secondary flex flex-col">
                      {card.lines.map((line, j) => (
                        <span key={j}>{line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
