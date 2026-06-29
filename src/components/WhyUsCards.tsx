// Shared «Почему выбирают нас» card row — used on Home and About.
// White by default, navy on hover; thematic icon per card (recolours on hover).
import { useTranslation } from '@/i18n'

function FactoryIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M4 42h40M8 42V22l11 7V22l11 7V14l10 6v22M15 42v-9h7v9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M4 33V13h23v20M27 21h8l7 7v5h-6M4 33h26M12 38a3.5 3.5 0 100-7 3.5 3.5 0 000 7Zm22 0a3.5 3.5 0 100-7 3.5 3.5 0 000 7Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CycleIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M9 24a15 15 0 0125-11.2L40 17M40 7v10H30M39 24a15 15 0 01-25 11.2L8 31M8 41V31h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LeaderIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M9 41c0-7.2 6.7-12 15-12s15 4.8 15 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const icons = [FactoryIcon, TruckIcon, CycleIcon, LeaderIcon]

export function WhyUsCards() {
  const { t } = useTranslation()
  return (
    <div data-reveal-stagger className="flex gap-4 w-full items-stretch max-md:flex-col">
      {icons.map((Icon, i) => (
        <div
          key={i}
          className="card-lift group flex-1 min-w-0 min-h-[286px] border border-border px-[26px] py-[46px] flex flex-col gap-12 bg-white hover:bg-primary transition-colors duration-300"
        >
          <div className="text-ink transition-colors duration-300 group-hover:text-bg-subtle">
            <Icon />
          </div>
          <div className="flex flex-col gap-[11px]">
            <p className="font-heading text-[22px] font-bold uppercase leading-[1.17] text-ink transition-colors duration-300 group-hover:text-bg-subtle">
              {t(`home.whyus.cards.${i}.title`)}
            </p>
            <p className="font-body text-[18px] leading-[1.37] text-secondary transition-colors duration-300 group-hover:text-border">
              {t(`home.whyus.cards.${i}.desc`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
