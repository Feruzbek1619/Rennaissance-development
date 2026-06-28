'use client'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ChevronDown, Phone } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useTranslation, LANGS } from '@/i18n'
import { useLeadModalOptional } from '@/components/LeadModal'
import { projects as allProjects } from '@/data/projects'
import { completedProjects } from '@/data/completed'

const PHONE = '78-333-33-31'

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// Derived from data so the menu stays in sync with the catalog.
const activeNav = allProjects.filter((p) => p.status === 'active' && !p.cardOnly).map((p) => ({ label: p.title, to: `/projects/${p.slug}` }))
const completedNav = completedProjects.map((c) => ({ label: c.title, to: `/completed/${c.slug}` }))

// Compact below 2xl (1280–1535) so the bar fits the 1080 content floor at 1280;
// full size at 2xl (≥1536, incl. 1920) keeps the Figma look pixel-perfect.
// Compact below 2xl (1280–1535) so the bar fits the content floor at 1280;
// full size at 2xl (≥1536, incl. 1920) keeps the Figma look pixel-perfect.
const linkBase =
  'flex items-center justify-center rounded-lg px-2.5 2xl:px-4 py-2 font-body text-[14px] 2xl:text-body-md transition-all duration-300 whitespace-nowrap'
// Refined active pill: translucent champagne tint + hairline gold ring (instead
// of a flat beige block). Inactive: soft gold-tinted hover.
const linkActive = 'bg-accent/[0.12] text-accent-dark font-medium ring-1 ring-inset ring-accent/30 shadow-[0_1px_6px_rgba(190,156,104,0.15)]'
const linkIdle = 'text-ink hover:bg-accent/[0.07]'

const simpleLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
] as const

const trailingLinks = [
  { key: 'nav.production', to: '/b2b' },
  { key: 'nav.contacts', to: '/contacts' },
] as const

// Main navigation bar (Figma 129:4743).
export default function Navigation() {
  const { pathname } = useLocation()
  const { t, lang, setLang } = useTranslation()
  const modal = useLeadModalOptional()
  const catalogActive = pathname.startsWith('/projects') || pathname.startsWith('/completed')
  const [open, setOpen] = useState(false)

  // Close the mobile panel on route change; lock body scroll while it's open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-border/60">
      <Container>
        <div className="flex h-[72px] lg:h-[108px] items-center justify-between gap-4 2xl:gap-8">
          <Link to="/" aria-label={t('nav.homeAria')} className="shrink-0">
            <img loading="lazy" decoding="async" src="/logo.svg" alt="Renaissance Development" className="h-[34px] w-[136px] 2xl:h-[53.2px] 2xl:w-[212.7px]" />
          </Link>

          {/* Link pill (desktop) */}
          <ul className="hidden lg:flex items-center gap-1 2xl:gap-2 rounded-lg bg-white/30 p-1.5">
            {simpleLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}

            {/* Catalog dropdown */}
            <li className="group relative">
              <button
                type="button"
                aria-haspopup="menu"
                className={cn(linkBase, 'gap-2', catalogActive ? linkActive : linkIdle)}
              >
                {t('nav.catalog')}
                <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="max-h-[70vh] w-[280px] overflow-y-auto rounded-xl border border-border bg-white py-2 shadow-xl">
                  <p className="px-5 pb-1 pt-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-secondary">{t('catalog.onSale')}</p>
                  {activeNav.map((p) => (
                    <NavLink
                      key={p.to}
                      to={p.to}
                      className="block px-5 py-2.5 font-body text-body-sm text-ink transition-colors hover:bg-bg-subtle"
                    >
                      {p.label}
                    </NavLink>
                  ))}
                  <p className="mt-1 border-t border-border px-5 pb-1 pt-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-secondary">{t('catalog.completed')}</p>
                  {completedNav.map((p) => (
                    <NavLink
                      key={p.to}
                      to={p.to}
                      className="block px-5 py-2.5 font-body text-body-sm text-ink transition-colors hover:bg-bg-subtle"
                    >
                      {p.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/projects"
                    className="mt-1 block border-t border-border px-5 pb-1 pt-3 font-body text-body-sm font-medium text-accent transition-colors hover:bg-bg-subtle"
                  >
                    {t('catalog.all')}
                  </NavLink>
                </div>
              </div>
            </li>

            {trailingLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Contact + CTA (desktop) */}
          <div className="hidden lg:flex shrink-0 items-center gap-3 2xl:gap-4">
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-center gap-2 2xl:gap-4" aria-label={`${t('proj.callNow')} ${PHONE}`}>
              <Phone className="size-6 text-primary shrink-0" />
              {/* Number hidden 1280–1535 to fit the bar; icon stays callable. */}
              <span className="hidden 2xl:inline font-body text-body-sm text-primary whitespace-nowrap">{PHONE}</span>
            </a>
            <span className="hidden 2xl:block h-[27px] w-px bg-border" />
            <Button to="/quote" variant="accent" size="lg">
              {t('common.orderCall')}
            </Button>
          </div>

          {/* Burger (mobile) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden flex size-11 items-center justify-center rounded-lg text-ink hover:bg-accent/[0.07] transition-colors"
          >
            <BurgerIcon />
          </button>
        </div>
      </Container>

      {/* ── Mobile slide-out panel ─────────────────────────── */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t('lead.close')}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] motion-safe:animate-[fadeIn_.2s_ease-out]"
          />
          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[380px] bg-white shadow-2xl flex flex-col motion-safe:animate-[slideInRight_.25s_ease-out] overflow-y-auto">
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-6">
              <img src="/logo.svg" alt="Renaissance Development" className="h-[30px] w-auto max-w-[150px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('lead.close')}
                className="flex size-11 items-center justify-center rounded-lg text-ink hover:bg-accent/[0.07] transition-colors -mr-2"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-4 py-5">
              {simpleLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => cn('rounded-lg px-4 py-3 font-body text-[18px]', isActive ? linkActive : linkIdle)}
                >
                  {t(l.key)}
                </NavLink>
              ))}

              {/* Catalog — native disclosure */}
              <details className="group">
                <summary className={cn('flex cursor-pointer list-none items-center justify-between rounded-lg px-4 py-3 font-body text-[18px]', catalogActive ? linkActive : linkIdle)}>
                  {t('nav.catalog')}
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-1 flex flex-col border-l border-border/70 pl-3 ml-4">
                  <p className="px-2 pb-1 pt-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-secondary">{t('catalog.onSale')}</p>
                  {activeNav.map((p) => (
                    <NavLink key={p.to} to={p.to} className="rounded-md px-2 py-2 font-body text-[16px] text-ink hover:bg-bg-subtle">{p.label}</NavLink>
                  ))}
                  <p className="px-2 pb-1 pt-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-secondary">{t('catalog.completed')}</p>
                  {completedNav.map((p) => (
                    <NavLink key={p.to} to={p.to} className="rounded-md px-2 py-2 font-body text-[16px] text-ink hover:bg-bg-subtle">{p.label}</NavLink>
                  ))}
                  <NavLink to="/projects" className="rounded-md px-2 py-2.5 font-body text-[16px] font-medium text-accent hover:bg-bg-subtle">{t('catalog.all')}</NavLink>
                </div>
              </details>

              {trailingLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => cn('rounded-lg px-4 py-3 font-body text-[18px]', isActive ? linkActive : linkIdle)}
                >
                  {t(l.key)}
                </NavLink>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-auto flex flex-col gap-4 border-t border-border px-6 py-5">
              <div className="flex items-center gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={cn(
                      'flex-1 rounded-lg border px-3 py-2 font-body text-[15px] transition-colors',
                      lang === l.code ? 'border-accent bg-accent/[0.12] text-accent-dark font-medium' : 'border-border text-ink hover:border-accent',
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-center gap-3 font-body text-[17px] text-primary">
                <Phone className="size-5 shrink-0" />
                {PHONE}
              </a>
              <Button onClick={() => { setOpen(false); modal?.openLead() }} variant="accent" size="lg" className="w-full justify-center">
                {t('common.orderCall')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
