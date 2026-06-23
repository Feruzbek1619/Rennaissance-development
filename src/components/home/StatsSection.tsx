import { Container } from '@/components/Container'

const stats = [
  { value: '12+', label: 'Реализованные проекты' },
  { value: '5+', label: 'Проекты в строительстве' },
  { value: '2021', label: 'собственный бетонный завод' },
  { value: '2019', label: 'год основания' },
]

const images = [
  { src: '/assets/stat-1.webp', alt: 'Жилой комплекс' },
  { src: '/assets/stat-2.webp', alt: 'Малоэтажный квартал' },
  { src: '/assets/stat-3.webp', alt: 'Бетонный завод' },
  { src: '/assets/stat-4.webp', alt: 'Производство бетона' },
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
              Renaissance development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.
            </span>
          </p>

          <div className="flex items-center gap-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="card-lift flex flex-1 items-center justify-center bg-white px-[26px] py-6 backdrop-blur-[7px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-[75px] font-bold uppercase leading-none text-ink">{s.value}</p>
                  <p className="text-center font-body text-body-sm font-medium text-secondary">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {images.map((img, i) => (
              <div key={img.src} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="h-[432px] flex-1 overflow-hidden">
                <img loading="lazy" decoding="async" src={img.src} alt={img.alt} className="size-full object-cover transition-transform duration-[600ms] ease-out hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
