import { useState } from 'react'
import { Container } from '@/components/Container'
import FAQSection from '@/components/home/FAQSection'
import StatsSection from '@/components/home/StatsSection'
import ProjectsMap, { type MapPoint } from '@/components/ProjectsMap'
import { useLeadModalOptional } from '@/components/LeadModal'
import { sendLead } from '@/lib/lead'
import { useTranslation } from '@/i18n'

function OfficeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M6 42h36M10 42V14l14-8 14 8v28M20 42V30h8v12M18 24h4M26 24h4M18 18h4M26 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M40 33.5v4.2a3 3 0 0 1-3.27 3 30 30 0 0 1-13-4.62 29.5 29.5 0 0 1-9-9 30 30 0 0 1-4.62-13.05A3 3 0 0 1 13.1 10.5h4.2a3 3 0 0 1 3 2.58c.19 1.4.54 2.78 1.05 4.1a3 3 0 0 1-.68 3.16l-1.78 1.78a24 24 0 0 0 9 9l1.78-1.78a3 3 0 0 1 3.16-.68c1.32.51 2.7.86 4.1 1.05a3 3 0 0 1 2.58 3.04Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12l17 13L41 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 13v11l7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Quote() {
  const modal = useLeadModalOptional()
  const { t } = useTranslation()
  const officePoint: MapPoint[] = [
    {
      coords: [41.304621, 69.31018],
      title: 'RENAISSANCE DEVELOPMENT',
      location: `${t('footer.addr1')} ${t('footer.addr2')}`,
    },
  ]
  const contactCards = [
    { icon: <OfficeIcon />, title: t('home.contact.office'), content: `${t('footer.addr1')}\n${t('footer.addr2')}` },
    { icon: <PhoneIcon />, title: t('home.contact.phone'), content: '78-333-33-31' },
    { icon: <MessengerIcon />, title: t('home.contact.messengers'), content: 'Telegram: @rbcompanyuzchat\nInstagram: @rbcompany.uz' },
    { icon: <ClockIcon />, title: t('home.contact.hours'), content: t('home.contact.hoursValue') },
  ]
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    const fd = new FormData(e.currentTarget)
    setError(false)
    setSending(true)
    const ok = await sendLead({
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      object: '', // contacts page = general lead, no specific object
    })
    setSending(false)
    if (ok) {
      e.currentTarget.reset()
      modal?.openSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/70 py-[100px]">
        <Container>
          <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.3] text-bg-subtle">
            {t('pages.contacts.heroTitle')}
          </h1>
        </Container>
      </section>

      {/* ── Quote form + image (Figma 7802:9343 — inset navy card on white) ── */}
      <section className="bg-white py-[60px]">
        <Container>
          <div className="bg-primary p-8 2xl:p-[52px] flex items-stretch gap-8 2xl:gap-[56px] max-lg:!flex-col">
            {/* Left: form */}
            <div className="flex flex-col gap-[40px] 2xl:gap-[59px] flex-1 min-w-0 2xl:max-w-[730px]">
              <div className="flex flex-col gap-[15px]">
                <h2 className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-none text-bg-subtle">
                  {t('common.leaveRequest')}
                </h2>
                <p className="font-vela text-[24px] leading-[1.3] text-white/70">
                  {t('lead.subtitle')}
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-[25px]">
                <div className="flex flex-col gap-[22px]">
                  <div className="flex flex-col gap-[10px]">
                    <label htmlFor="quote-name" className="font-vela text-[21px] font-semibold text-white leading-[1.3]">{t('lead.name')}</label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      placeholder={t('lead.namePlaceholder')}
                      className="h-[59px] bg-[#ededed] border border-white/10 rounded-[5px] px-5 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label htmlFor="quote-phone" className="font-vela text-[21px] font-semibold text-white leading-[1.3]">{t('lead.phone')}</label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t('lead.phonePlaceholder')}
                      className="h-[59px] bg-[#ededed] border border-white/10 rounded-[5px] px-5 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[13px]">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full h-[62px] bg-accent rounded-[5px] font-vela text-[22px] font-semibold text-white hover:bg-[#A2814E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? t('lead.sending') : t('common.leaveRequest')}
                  </button>
                  {error ? (
                    <p className="font-vela text-[17px] text-[#ffb4b4] leading-[1.3]">
                      {t('lead.error')}
                    </p>
                  ) : null}
                  <p className="font-vela text-[17px] text-secondary leading-[1.3]">
                    {t('lead.privacyPrefix')}
                    <span className="font-semibold text-secondary">{t('lead.privacyLink')}</span>
                  </p>
                </div>
              </form>
            </div>

            {/* Right: building image (Figma 7802:9364) */}
            <div className="flex-1 min-w-0 min-h-[600px] max-lg:min-h-[300px] overflow-hidden relative">
              <img loading="lazy" decoding="async"
                src="/assets/contacts-form.webp"
                alt={t('pages.contacts.imageAlt')}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#00040b]/80 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Map (Figma 7802:8515) — content-width, white frame, chip + zoom ── */}
      <section className="bg-white pb-[30px]">
        <Container>
          <div className="bg-white p-[30px]">
            <div className="relative isolate h-[607px] overflow-hidden rounded-[5px]">
              <ProjectsMap
                points={officePoint}
                zoom={15}
                className="absolute inset-0 h-full w-full"
              />

              {/* Address chip — overlay (z above Leaflet panes; pointer-events-none keeps the map interactive) */}
              <div className="pointer-events-none absolute top-[18px] left-[18px] z-[1100] bg-white rounded-[15px] flex items-center gap-[15px] p-[15px] shadow-[0_12px_15px_rgba(0,0,0,0.12)]">
                <div className="bg-[#e3eee2] rounded-[10px] p-3 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="size-[30px]">
                    <circle cx="12" cy="12" r="3" stroke="#2A323B" strokeWidth="1.5" />
                    <path d="M20 12c0 8-8 13-8 13S4 20 4 12a8 8 0 0 1 16 0Z" stroke="#2A323B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-vela text-[15px] text-[#8a8c8a] leading-[1.4]">{t('pages.contacts.addressLabel')}</p>
                  <p className="font-vela text-[15px] font-bold text-[#2A323B] leading-[1.4]">{t('footer.addr1')}</p>
                  <p className="font-vela text-[15px] font-bold text-[#2A323B] leading-[1.4]">{t('footer.addr2')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact cards ─────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-start justify-between mb-[64px] max-lg:!flex-col max-lg:gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('nav.contacts')}</span>
            </div>
              <h2 className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink w-[850px] max-lg:!w-full">
                {t('home.contact.title')}
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-ink w-[692px] max-lg:!w-full self-end">
              {t('home.contact.desc')}
            </p>
          </div>

          <div className="flex gap-4 max-md:!flex-col">
            {contactCards.map((card) => (
              <div key={card.title} className="flex-1 border border-[#c4c4c4] p-10 flex flex-col gap-12">
                <div className="text-ink">{card.icon}</div>
                <div className="flex flex-col gap-6">
                  <h3 className="font-heading text-[31px] font-bold leading-[1.4] text-ink">{card.title}</h3>
                  <p className="font-body text-[20px] leading-[1.6] text-secondary whitespace-pre-line">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stats — shared section (animated count-up) ── */}
      <StatsSection />

      {/* ── FAQ ───────────────────────────────────────────── */}
      <FAQSection />
    </main>
  )
}
