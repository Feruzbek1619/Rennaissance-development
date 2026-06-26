import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { CountUp } from '@/components/CountUp'
import { ArrowUpRight } from '@/components/icons'

const stats = [
  { value: '12+', label: 'Реализованные проекты' },
  { value: '5+', label: 'Проекты в строительстве' },
  { value: '2021', label: 'собственный бетонный завод' },
  { value: '2019', label: 'год основания' },
]

// Image strip — each tile links to a main section.
const images = [
  { src: '/assets/stat-1.webp', alt: 'Жилой комплекс', label: 'О компании', to: '/about' },
  { src: '/assets/stat-2.webp', alt: 'Малоэтажный квартал', label: 'Проекты', to: '/projects' },
  { src: '/assets/stat-3.webp', alt: 'Бетонный завод', label: 'Производство', to: '/b2b' },
  { src: '/assets/stat-4.webp', alt: 'Производство бетона', label: 'Контакты', to: '/contacts' },
]

// Stats / intro section (Figma 7778:4882).
export default function StatsSection() {
  return (
    <section className="bg-bg-subtle pb-[145px] pt-[90px]">
      <Container>
        <div className="flex flex-col gap-16">
          <p data-reveal className="text-center font-heading text-[45px] font-semibold leading-[1.4]">
            <span className="text-ink">
              Мы не просто строим здания - мы создаём надёжное пространство для будущих поколений.{' '}
            </span>
            <span className="text-muted-text">
              Renaissance Development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.
            </span>
          </p>

          <div className="flex items-center gap-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="stat-card card-lift flex flex-1 items-center justify-center px-[26px] py-6">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-[75px] font-bold uppercase leading-none text-ink"><CountUp value={s.value} /></p>
                  <p className="text-center font-body text-body-sm font-medium text-secondary">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {images.map((img, i) => (
              <Link
                key={img.src}
                to={img.to}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="group relative h-[432px] flex-1 overflow-hidden rounded-[8px]"
              >
                <img loading="lazy" decoding="async" src={img.src} alt={img.alt} className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 2xl:p-6">
                  <span className="font-heading text-[22px] 2xl:text-[28px] font-bold uppercase leading-[1.1] text-white">
                    {img.label}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-[18px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
