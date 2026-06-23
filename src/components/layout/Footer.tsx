import { Link } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Instagram, MapPin, Phone } from '@/components/icons'
import { cn } from '@/lib/cn'

const PHONE = '78-333-33-31'
const INSTAGRAM = 'rbcompany.uz'
const INSTAGRAM_URL = 'https://www.instagram.com/rbcompany.uz/'

const navLinks = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/about' },
  { label: 'Каталог объектов', to: '/projects' },
  { label: 'Производство (B2B)', to: '/b2b' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'Политика конфиденциальности', to: '/privacy' },
  { label: 'Вопросы и ответы', to: '/faq' },
]

const projectLinks = [
  { label: 'ALANDALUS', to: '/projects/alandalus' },
  { label: 'BOTANIKA LUXURY', to: '/projects/botanika-luxury' },
  { label: 'TURON', to: '/projects/turon' },
  { label: 'VATAN VILLAGE', to: '/projects/vatan-village' },
  { label: 'CHALLET RESORT', to: '/projects/challet-resort' },
  { label: 'ВСЕ ПРОЕКТЫ', to: '/projects' },
]

function ColumnTitle({ children, uppercase }: { children: string; uppercase?: boolean }) {
  return (
    <h3 className={cn('font-heading text-[20px] font-semibold leading-[1.4] text-white', uppercase && 'uppercase')}>
      {children}
    </h3>
  )
}

function LinkColumn({
  title,
  uppercase,
  links,
  className,
}: {
  title: string
  uppercase?: boolean
  links: { label: string; to: string }[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <ColumnTitle uppercase={uppercase}>{title}</ColumnTitle>
      <ul className="flex flex-col gap-4">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="font-body text-body-sm text-secondary transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Site footer (Figma 7802:10788). bg black; column heads Instrument Sans SemiBold.
// NOTE: hero head uses MTS Compact (proprietary) → substituted with font-heading;
// credits use Inter → substituted with font-body. Both flagged in BUILD.md.
export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="pb-10 pt-[97px]">
          {/* CTA */}
          <div className="flex items-center justify-between gap-10">
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-bg-subtle shrink min-w-0">
              Начните жизнь в доме своей мечты
            </h2>
            <Button to="/quote" variant="white" size="lg" className="shrink-0">
              Оставить заявку
            </Button>
          </div>

          <hr className="mt-[94px] border-t border-white/10" />

          {/* Columns */}
          <div className="mt-[74px] flex items-start justify-between">
            {/* Brand + tagline */}
            <div className="flex w-[523px] flex-col items-center gap-[57px]">
              <img loading="lazy" decoding="async" src="/logo-stacked.svg" alt="Renaissance Development" className="h-[253px] w-[256px]" />
              <p className="w-[469px] text-center font-body text-body-md text-secondary">
                Создаём дома, в которых растут семьи, рождаются воспоминания и остаются поколения.
              </p>
            </div>

            <LinkColumn title="Навигация" links={navLinks} className="border-l border-white/10 pl-[60px]" />
            <LinkColumn title="проекты" uppercase links={projectLinks} className="border-l border-white/10 pl-[60px]" />

            {/* Contacts */}
            <div className="flex flex-col gap-8 border-l border-white/10 pl-[60px]">
              <ColumnTitle>Контакты</ColumnTitle>
              <div className="flex flex-col gap-4 font-body text-body-sm text-secondary">
                <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-start gap-4 transition-colors hover:text-white">
                  <Phone className="size-6 shrink-0" />
                  <span>{PHONE}</span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="size-6 shrink-0" />
                  <span>
                    г. Ташкент, Махтумкули, 100116,
                    <br />
                    Республика Узбекистан
                  </span>
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 transition-colors hover:text-white"
                >
                  <Instagram className="size-6 shrink-0" />
                  <span>{INSTAGRAM}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-[60px]">
            <hr className="border-t border-white/10" />
            <div className="mt-6 flex items-center justify-between">
              <p className="font-body text-body-sm text-secondary">
                © "Renaissance Development" Все права защищены, 2026
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex rounded-full bg-white/[0.08] p-1.5 transition-colors hover:bg-white/20"
                >
                  <Instagram className="size-4 text-white" />
                </a>
              </div>

              <div className="flex items-center gap-[26px]">
                <span className="font-body text-body-sm text-white/60">Created by “Dasta Creative”</span>
                <span className="flex items-center gap-2">
                  <img loading="lazy" decoding="async" src="/assets/dasta-icon.svg" alt="" className="h-[35px] w-[35px]" />
                  <img loading="lazy" decoding="async" src="/assets/dasta-word.svg" alt="Dasta Creative" className="h-4 w-[58px]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
