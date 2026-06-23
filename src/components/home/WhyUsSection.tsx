import { Container } from '@/components/Container'

const services = [
  {
    title: 'Собственное производство',
    description: 'Собственный завод строительных материалов с 2021 года. Полный контроль качества и сроков.',
    dark: false,
  },
  {
    title: 'Своя спецтехника',
    description: '9 видов собственной техники на объектах. Строительство идет без простоев и зависимости от подрядчиков.',
    dark: true,
  },
  {
    title: 'Полный цикл работ',
    description: 'От проекта до передачи ключей - все этапы реализует одна компания. Единая ответственность и контроль качества.',
    dark: false,
  },
  {
    title: 'Опытное руководство',
    description: 'Компанию возглавляет инженер-строитель с 12-летним опытом реализации государственных и частных проектов.',
    dark: false,
  },
]

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 45 37.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[48px]"
    >
      <path
        d="M1.5 36H43.5M40.4989 36V15C40.4989 14.6022 40.3409 14.2206 40.0596 13.9393C39.7783 13.658 39.3967 13.5 38.9989 13.5H25.4989M31.4989 28.5H34.4989M25.4989 36V3C25.4989 2.60217 25.3409 2.22064 25.0596 1.93934C24.7783 1.65804 24.3967 1.5 23.9989 1.5H5.9989C5.60108 1.5 5.21955 1.65804 4.93824 1.93934C4.65694 2.22064 4.4989 2.60217 4.4989 3V36M10.4989 28.5H16.4989M31.4989 21H34.4989M13.4989 21H19.4989M10.4989 9H16.4989"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <path d="M8 5.14v14l11-7-11-7z" fill="white" />
    </svg>
  )
}

// «Почему выбирают нас» (Figma 314:2944)
export default function WhyUsSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-16 items-center">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 w-[1295px] max-w-full">
            <div className="border border-border px-6 py-[6px]">
              <span className="font-body text-body-sm text-ink">ПОЧЕМУ МЫ</span>
            </div>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink text-center">
              Почему выбирают нас
            </h2>
          </div>

          {/* Service cards row — flex + even padding so the bottom always breathes */}
          <div className="flex gap-4 w-full items-stretch">
            {services.map((s) => (
              <div
                key={s.title}
                className="group flex-1 min-w-0 min-h-[286px] border border-border px-[26px] py-[46px] flex flex-col gap-12 bg-white hover:bg-primary transition-colors duration-300"
              >
                <div className="text-ink transition-colors duration-300 group-hover:text-bg-subtle">
                  <BuildingIcon />
                </div>
                <div className="flex flex-col gap-[11px]">
                  <p className="font-heading text-[22px] font-bold uppercase leading-[1.17] text-ink transition-colors duration-300 group-hover:text-bg-subtle">
                    {s.title}
                  </p>
                  <p className="font-body text-[18px] leading-[1.37] text-secondary transition-colors duration-300 group-hover:text-border">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Video thumbnails */}
          <div className="flex gap-16 items-start justify-center">
            {[0, 1].map((i) => (
              <div key={i} className="relative w-[448px] h-[740px] overflow-hidden shrink-0">
                <img
                  src="/assets/why-us-video.png"
                  alt={`Видео о компании ${i + 1}`}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center size-[76px] rounded-full backdrop-blur-[3px] bg-[rgba(72,66,66,0.2)] border border-[rgba(248,248,248,0.6)]">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
