import { Container } from '@/components/Container'
import { useTranslation } from '@/i18n'

function OfficeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <rect x="6" y="8" width="24" height="34" rx="1" stroke="#3A4754" strokeWidth="2" />
      <rect x="30" y="20" width="12" height="22" rx="1" stroke="#3A4754" strokeWidth="2" />
      <line x1="12" y1="16" x2="18" y2="16" stroke="#3A4754" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="22" x2="18" y2="22" stroke="#3A4754" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="28" x2="18" y2="28" stroke="#3A4754" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="34" width="8" height="8" rx="1" stroke="#3A4754" strokeWidth="2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <path
        d="M9 6h7.5l3.5 9-4.5 2.5A24 24 0 0 0 24 27l2.5-4.5 9 3.5V34a2 2 0 0 1-2 2C16.5 36 12 19.5 12 8a2 2 0 0 1-3-2Z"
        stroke="#3A4754"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.19 7.88A28 28 0 0 0 9 10c0 15.46 12.54 28 28 28h2.12"
        stroke="#3A4754"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="#3A4754" strokeWidth="2" />
      <polyline points="6,10 24,26 42,10" stroke="#3A4754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12">
      <circle cx="24" cy="24" r="18" stroke="#3A4754" strokeWidth="2" />
      <polyline points="24,12 24,24 32,28" stroke="#3A4754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// «Свяжитесь с нами» — контакты (Figma 7781:2372).
export default function ContactSection() {
  const { t } = useTranslation()

  const cards = [
    { icon: <OfficeIcon />, title: t('home.contact.office'), lines: [t('footer.addr1'), t('footer.addr2')] },
    { icon: <PhoneIcon />, title: t('home.contact.phone'), lines: ['78-333-33-31'] },
    { icon: <MessengerIcon />, title: t('home.contact.messengers'), lines: ['Telegram: @rbcompanyuzchat', 'Instagram: @rbcompany.uz'] },
    { icon: <ClockIcon />, title: t('home.contact.hours'), lines: [t('home.contact.hoursValue')] },
  ]

  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-[64px]">

          {/* Header */}
          <div data-reveal="left" className="flex items-start justify-between max-lg:!flex-col max-lg:gap-6">
            <div className="flex flex-col gap-5 w-[850px] max-lg:!w-full shrink min-w-0">
              <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('nav.contacts')}</span>
            </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
                {t('home.contact.title')}
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-ink w-[692px] max-lg:!w-full shrink min-w-0 pt-2">
              {t('home.contact.desc')}
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
                  <div className="shrink-0">
                    {card.icon}
                  </div>
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
