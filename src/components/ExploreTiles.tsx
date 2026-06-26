import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { ArrowUpRight } from '@/components/icons'

/* ─── Reusable 4-tile navigation block (О компании / Проекты / Производство /
   Контакты). One component — drop <ExploreTiles /> on any page. Swap `image`
   values to change the photos. ─── */

type Tile = { label: string; to: string; image: string }

const tiles: Tile[] = [
  { label: 'О компании', to: '/about', image: '/assets/tile-about.webp' },
  { label: 'Проекты', to: '/projects', image: '/assets/tile-projects.webp' },
  { label: 'Производство', to: '/b2b', image: '/assets/tile-production.webp' },
  { label: 'Контакты', to: '/contacts', image: '/assets/tile-contacts.webp' },
]

export default function ExploreTiles() {
  return (
    <section className="bg-bg-subtle py-[80px] 2xl:py-[100px]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6">
          {tiles.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-[10px] bg-primary"
            >
              <img
                loading="lazy"
                decoding="async"
                src={t.image}
                alt={t.label}
                className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-6 2xl:p-7">
                <span className="font-heading text-[24px] 2xl:text-[30px] font-bold uppercase leading-[1.1] text-white">
                  {t.label}
                </span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
