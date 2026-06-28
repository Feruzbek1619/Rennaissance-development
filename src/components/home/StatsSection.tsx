import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { CountUp } from '@/components/CountUp'
import { ArrowUpRight } from '@/components/icons'
import { useTranslation } from '@/i18n'

const stats = [
  { value: '12+', labelKey: 'home.stats.l1' },
  { value: '5+', labelKey: 'home.stats.l2' },
  { value: '2021', labelKey: 'home.stats.l3' },
  { value: '2019', labelKey: 'home.stats.l4' },
]

// Image strip — each tile links to a main section.
const images = [
  { src: '/assets/stat-1.webp', labelKey: 'nav.about', to: '/about' },
  { src: '/assets/stat-2.webp', labelKey: 'common.projects', to: '/projects' },
  { src: '/assets/stat-3.webp', labelKey: 'nav.production', to: '/b2b' },
  { src: '/assets/stat-4.webp', labelKey: 'nav.contacts', to: '/contacts' },
]

// Stats / intro section (Figma 7778:4882).
export default function StatsSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-bg-subtle pb-[145px] pt-[90px]">
      <Container>
        <div className="flex flex-col gap-16">
          <p data-reveal className="text-center font-heading text-[45px] font-semibold leading-[1.4]">
            <span className="text-ink">{t('home.stats.s1')}</span>
            <span className="text-muted-text">{t('home.stats.s2')}</span>
          </p>

          <div className="flex items-center gap-4">
            {stats.map((s, i) => (
              <div key={s.labelKey} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="stat-card card-lift flex flex-1 items-center justify-center px-[26px] py-6">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-[75px] font-bold uppercase leading-none text-ink"><CountUp value={s.value} /></p>
                  <p className="text-center font-body text-body-sm font-medium text-secondary">{t(s.labelKey)}</p>
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
                <img loading="lazy" decoding="async" src={img.src} alt={t(img.labelKey)} className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 2xl:p-6">
                  <span className="font-heading text-[22px] 2xl:text-[28px] font-bold uppercase leading-[1.1] text-white">
                    {t(img.labelKey)}
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
