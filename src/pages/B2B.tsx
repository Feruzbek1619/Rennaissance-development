'use client'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { SectionTag } from '@/components/SectionTag'
import { useLeadModalOptional } from '@/components/LeadModal'
import { sendLead } from '@/lib/lead'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import FAQSection from '@/components/home/FAQSection'
import { useTranslation } from '@/i18n'

/* ─── Производственные направления Renaissance Building Company ───
   Text comes from i18n (pages.b2b.directions[i]); ruTitle is the canonical
   value sent to Telegram so the team always sees a stable Russian name. ─── */

type Direction = { id: string; num: string; image: string; ruTitle: string }

const directions: Direction[] = [
  { id: 'concrete', num: '01', image: '/assets/prod-concrete.webp', ruTitle: 'Бетонный завод' },
  { id: 'travertine', num: '02', image: '/assets/prod-travertine.webp', ruTitle: 'Жидкий травертин' },
  { id: 'ventilation', num: '03', image: '/assets/prod-ventilation.webp', ruTitle: 'Вентиляционные системы' },
  { id: 'aluminum', num: '04', image: '/assets/prod-aluminum.webp', ruTitle: 'Алюминиевые профили' },
  { id: 'cranes', num: '05', image: '/assets/prod-cranes.webp', ruTitle: 'Башенные краны и спецтехника' },
]

/* ─── Contact cards ─── */
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
      <path d="M8 6h32a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H14l-8 8V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

/* ─── Inline lead form (sends to Telegram, object = direction) ─── */
function ProductionLeadForm() {
  const { t } = useTranslation()
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '')
    const phone = String(fd.get('phone') ?? '')
    const dir = String(fd.get('direction') ?? '')
    const question = String(fd.get('question') ?? '')
    setError(false)
    setSending(true)
    const ok = await sendLead({
      name,
      phone,
      question,
      object: dir ? `Производство — ${dir}` : 'Производство',
    })
    setSending(false)
    if (ok) setDone(true)
    else setError(true)
  }

  const fieldCls =
    'w-full h-[56px] bg-white/95 border border-white/10 rounded-[6px] px-4 font-vela text-[16px] text-ink placeholder:text-[#8a8d90] outline-none focus:ring-2 focus:ring-accent'

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-accent">
          <svg viewBox="0 0 24 24" fill="none" className="size-9">
            <path d="M5 12.5l4 4L19 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading text-[34px] font-bold uppercase text-white">{t('pages.b2b.formSent')}</h3>
        <p className="font-vela text-[18px] text-white/80 max-w-[520px]">
          {t('pages.b2b.formSentText')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-vela text-[15px] font-semibold text-white/90">{t('lead.name')}</label>
          <input name="name" required placeholder={t('pages.b2b.formNamePh')} className={fieldCls} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-vela text-[15px] font-semibold text-white/90">{t('home.contact.phone')}</label>
          <input name="phone" required type="tel" placeholder="+998 __ ___ __ __" className={fieldCls} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-vela text-[15px] font-semibold text-white/90">{t('pages.b2b.formDirection')}</label>
        <select name="direction" defaultValue="" className={fieldCls + ' appearance-none cursor-pointer'}>
          <option value="">{t('pages.b2b.formAnyDirection')}</option>
          {directions.map((d, i) => (
            <option key={d.id} value={d.ruTitle}>{t(`pages.b2b.directions.${i}.title`)}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-vela text-[15px] font-semibold text-white/90">{t('pages.b2b.formComment')}</label>
        <textarea name="question" rows={3} placeholder={t('pages.b2b.formCommentPh')} className={fieldCls + ' h-auto py-3 resize-none'} />
      </div>
      {error && (
        <p className="font-vela text-[15px] text-[#ffb4a8]">{t('lead.error')}</p>
      )}
      <div className="flex items-center gap-4 flex-wrap pt-1">
        <Button type="submit" variant="accent" size="lg" loading={sending}>
          {t('pages.b2b.formSubmit')}
        </Button>
        <a
          href="tel:+998783333331"
          className="flex items-center justify-center h-[56px] px-8 rounded-full border border-white/40 font-body text-[20px] font-medium text-white hover:bg-white/10 transition-colors"
        >
          {t('common.call')}
        </a>
      </div>
    </form>
  )
}

export default function B2B() {
  const modal = useLeadModalOptional()
  const { t } = useTranslation()
  const { hash } = useLocation()
  const contactCards = [
    { icon: <OfficeIcon />, title: t('home.contact.office'), content: `${t('footer.addr1')}\n${t('footer.addr2')}` },
    { icon: <PhoneIcon />, title: t('home.contact.phone'), content: '78-333-33-31' },
    { icon: <MessengerIcon />, title: t('home.contact.messengers'), content: 'Telegram: @rbcompanyuzchat\nInstagram: @rbcompany.uz' },
    { icon: <ClockIcon />, title: t('home.contact.hours'), content: t('home.contact.hoursValue') },
  ]

  // Scroll to a direction block. Uses instant scrollIntoView (respects the
  // block's scroll-mt offset) — reliable across browsers, where smooth is not.
  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [])

  // Deep-link support: /b2b#concrete scrolls to that direction. Retries while the
  // page is still laying out after a cross-page navigation (images shifting it).
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    let tries = 0
    let timer = 0
    const tick = () => {
      if (document.getElementById(id)) {
        scrollToId(id)
        if (++tries < 3) timer = window.setTimeout(tick, 260)
      } else if (++tries < 8) {
        timer = window.setTimeout(tick, 120)
      }
    }
    timer = window.setTimeout(tick, 80)
    return () => window.clearTimeout(timer)
  }, [hash, scrollToId])

  return (
    <main>
      {/* ── 1. Hero — premium dark gradient (no stock photo) ──── */}
      <section className="relative h-[660px] 2xl:h-[760px] overflow-hidden bg-[#0e1013]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#262b32] via-[#181b20] to-[#0d0f12]" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_80%_6%,rgba(198,163,108,0.32),transparent_56%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_62%_at_36%_30%,rgba(225,210,185,0.10),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="flex max-w-[1100px] flex-col gap-7">
              <SectionTag className="[&_span:last-child]:text-accent">Renaissance Building Company</SectionTag>
              <h1 className="font-heading text-[64px] max-lg:text-[44px] max-sm:text-[34px] 2xl:text-[92px] font-bold uppercase leading-[1.02] text-bg-subtle">
                {t('home.production.title')}
              </h1>
              <p className="font-vela text-[22px] 2xl:text-[26px] leading-[1.5] text-white/80 max-w-[840px]">
                {t('pages.b2b.heroSubtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="accent" size="lg" onClick={() => modal?.openLead('Производство', t('nav.production'))}>
                  {t('common.leaveRequest')}
                </Button>
                <button
                  type="button"
                  onClick={() => scrollToId('concrete')}
                  className="flex items-center justify-center h-[56px] px-8 rounded-full border border-white/40 font-body text-[20px] font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {t('pages.b2b.heroNav')}
                </button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-10 2xl:gap-x-14 gap-y-3 border-t border-white/10 pt-6">
                {[
                  ['5', t('pages.b2b.meta1')],
                  ['2021', t('pages.b2b.meta2')],
                  ['100%', t('pages.b2b.meta3')],
                ].map(([v, l]) => (
                  <div key={l} className="flex items-baseline gap-2.5">
                    <span className="font-heading text-[30px] 2xl:text-[34px] font-bold leading-none text-accent">{v}</span>
                    <span className="font-vela text-[15px] 2xl:text-[16px] text-white/60">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── 2. Intro ────────────────────────────────────────── */}
      <section className="bg-white py-[80px] max-md:!py-[48px] 2xl:py-[100px]">
        <Container>
          <div data-reveal className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex flex-col gap-5 xl:w-[520px] 2xl:w-[640px] xl:shrink-0">
              <SectionTag>{t('pages.b2b.introTag')}</SectionTag>
              <h2 className="font-heading text-[40px] max-md:text-[27px] 2xl:text-[56px] font-bold uppercase leading-[1.2] text-ink">
                {t('pages.b2b.introTitle')}
              </h2>
            </div>
            <div className="flex flex-col gap-6 xl:w-[720px] 2xl:w-[900px]">
              <p className="font-vela text-[20px] 2xl:text-[24px] leading-[1.5] text-ink">
                {t('pages.b2b.introP1')}
              </p>
              <p className="font-vela text-[20px] 2xl:text-[24px] leading-[1.5] text-secondary">
                {t('pages.b2b.introP2')}
              </p>
            </div>
          </div>

          {/* Direction quick-nav */}
          <div className="mt-[48px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {directions.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => scrollToId(d.id)}
                className="card-lift group flex items-center gap-3 rounded-[6px] border border-border bg-bg-subtle px-5 py-4 text-left transition-colors hover:border-accent"
              >
                <span className="font-heading text-[20px] font-bold text-accent">{d.num}</span>
                <span className="font-vela text-[16px] font-semibold leading-[1.2] text-ink group-hover:text-accent-dark">{t(`pages.b2b.directions.${i}.title`)}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Direction blocks ─────────────────────────────── */}
      <section className="bg-bg-subtle">
        {directions.map((d, i) => (
          <div
            key={d.id}
            id={d.id}
            className={`scroll-mt-[110px] border-b border-border ${i % 2 === 1 ? 'bg-white' : 'bg-bg-subtle'}`}
          >
            <Container>
              <div className={`flex flex-col gap-8 py-[60px] 2xl:py-[84px] xl:flex-row xl:items-stretch xl:gap-[56px] 2xl:gap-[72px] xl:min-h-[560px] ${i % 2 === 1 ? 'xl:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div data-reveal="scale" className="xl:w-1/2 xl:shrink-0">
                  <div className="h-[320px] xl:h-full overflow-hidden rounded-[10px] border border-border shadow-[0_24px_60px_rgba(40,35,28,0.12)]">
                    <img loading="lazy" decoding="async" src={d.image} alt={t(`pages.b2b.directions.${i}.title`)} className="size-full object-cover" />
                  </div>
                </div>

                {/* Text — matched height with the image, calm rhythm */}
                <div data-reveal className="flex xl:w-1/2 flex-col justify-center gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-[34px] 2xl:text-[40px] font-bold leading-none text-accent">{d.num}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-heading text-[34px] 2xl:text-[46px] font-bold uppercase leading-[1.1] text-ink">{t(`pages.b2b.directions.${i}.title`)}</h3>
                    <p className="font-heading text-[16px] 2xl:text-[19px] font-semibold uppercase tracking-wide text-accent-dark">{t(`pages.b2b.directions.${i}.subtitle`)}</p>
                  </div>
                  <p className="font-vela text-[18px] 2xl:text-[21px] leading-[1.55] text-secondary">{t(`pages.b2b.directions.${i}.description`)}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                    {[0, 1, 2, 3].map((j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                          <svg viewBox="0 0 24 24" fill="none" className="size-3">
                            <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="font-vela text-[16px] font-medium text-ink">{t(`pages.b2b.directions.${i}.features.${j}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3">
                    <Button variant="primary" size="lg" onClick={() => modal?.openLead(`Производство — ${d.ruTitle}`, `${t('nav.production')} — ${t(`pages.b2b.directions.${i}.title`)}`)}>
                      {t('common.leaveRequest')}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </section>

      {/* ── 4. Inline lead form ─────────────────────────────── */}
      <section id="lead" className="scroll-mt-[110px] bg-white py-[90px] max-md:!py-[52px] 2xl:py-[110px]">
        <Container>
          <div className="overflow-hidden rounded-[12px] bg-primary">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: copy */}
              <div className="flex flex-col gap-5 p-[44px] 2xl:p-[64px]">
                <SectionTag className="[&_span:last-child]:text-accent">{t('pages.b2b.formTag')}</SectionTag>
                <h2 className="font-heading text-[38px] max-md:text-[26px] 2xl:text-[50px] font-bold uppercase leading-[1.1] text-white">
                  {t('pages.b2b.formTitle')}
                </h2>
                <p className="font-vela text-[19px] 2xl:text-[22px] leading-[1.5] text-white/80">
                  {t('pages.b2b.formDesc')}
                </p>
                <div className="mt-2 flex flex-col gap-3">
                  <a href="tel:+998783333331" className="font-heading text-[28px] 2xl:text-[34px] font-bold text-white hover:text-accent transition-colors">
                    78-333-33-31
                  </a>
                  <p className="font-vela text-[16px] text-white/60">{t('pages.b2b.formHours')}</p>
                </div>
              </div>
              {/* Right: form */}
              <div className="bg-[#2F3A45] p-[44px] 2xl:p-[64px]">
                <ProductionLeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. FAQ ──────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 6. Contact cards ────────────────────────────────── */}
      <section className="bg-white py-[100px] max-md:!py-[56px] border-t border-border">
        <Container>
          <div className="flex flex-col gap-8 2xl:flex-row 2xl:items-start 2xl:justify-between mb-[64px]">
            <div className="flex flex-col gap-5">
              <SectionTag>{t('nav.contacts')}</SectionTag>
              <h2 className="font-heading text-[44px] max-md:text-[27px] 2xl:text-[61px] font-bold uppercase leading-[1.3] text-ink 2xl:w-[850px]">
                {t('home.contact.title')}
              </h2>
            </div>
            <p className="font-body text-[20px] 2xl:text-[24px] leading-[1.6] text-ink 2xl:w-[692px] 2xl:self-end">
              {t('pages.b2b.contactsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

      {/* ── 7. Need Help ────────────────────────────────────── */}
      <NeedHelpSection />
    </main>
  )
}
