import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ChevronDown, Phone } from '@/components/icons'
import { cn } from '@/lib/cn'

const PHONE = '78-333-33-31'

const linkBase =
  'flex items-center justify-center rounded-md px-4 py-2 font-body text-body-md text-ink transition-colors whitespace-nowrap'

const projects = [
  { label: 'ALANDALUS', to: '/projects/alandalus' },
  { label: 'BOTANIKA LUXURY', to: '/projects/botanika-luxury' },
  { label: 'VATAN VILLAGE', to: '/projects/vatan-village' },
  { label: 'TURON', to: '/projects/turon' },
]

const simpleLinks = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/about' },
] as const

const trailingLinks = [
  { label: 'Производство (B2B)', to: '/b2b' },
  { label: 'Контакты', to: '/contacts' },
] as const

// Main navigation bar (Figma 129:4743).
export default function Navigation() {
  const { pathname } = useLocation()
  const catalogActive = pathname.startsWith('/projects')

  return (
    <nav className="bg-white overflow-x-hidden">
      <Container>
        <div className="flex h-[108px] items-center justify-between gap-8">
          <Link to="/" aria-label="Renaissance Development — на главную">
            <img src="/logo.svg" alt="Renaissance Development" className="h-[76px] w-[303.922px]" />
          </Link>

          {/* Link pill */}
          <ul className="flex items-center gap-2 rounded-lg bg-white/30 p-1.5">
            {simpleLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => cn(linkBase, isActive ? 'bg-bg-active' : 'hover:bg-bg-subtle')}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

            {/* Catalog dropdown */}
            <li className="group relative">
              <button
                type="button"
                aria-haspopup="menu"
                className={cn(linkBase, 'gap-2', catalogActive ? 'bg-bg-active' : 'hover:bg-bg-subtle')}
              >
                Каталог объектов
                <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="w-[264px] overflow-hidden rounded-xl border border-border bg-white py-2 shadow-xl">
                  {projects.map((p) => (
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
                    Все проекты
                  </NavLink>
                </div>
              </div>
            </li>

            {trailingLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => cn(linkBase, isActive ? 'bg-bg-active' : 'hover:bg-bg-subtle')}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Contact + CTA */}
          <div className="flex shrink-0 items-center gap-4">
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-center gap-4">
              <Phone className="size-6 text-primary" />
              <span className="font-body text-body-sm text-primary whitespace-nowrap">{PHONE}</span>
            </a>
            <span className="h-[27px] w-px bg-border" />
            <Button to="/quote" variant="accent" size="lg">
              Заказать звонок
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  )
}
