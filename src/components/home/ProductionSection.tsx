'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ChevronLeft, ChevronRight } from '@/components/icons'

const slides = [
  {
    image: '/assets/production.webp',
    title: 'Universal Temir Beton',
    subtitle: 'Бетонный завод — основа каждого нашего объекта',
    desc: 'Завод основан в 2021 году и входит в число современных и ведущих предприятий республики по производству железобетонных изделий и товарного бетона. Обеспечивает все объекты компании качественным материалом в сжатые сроки — без посредников и задержек.',
    primary: { label: 'Подробно', to: '/production' },
  },
  {
    image: '/assets/production-spectehnika.webp',
    title: 'Спецтехника',
    subtitle: 'Собственный парк техники — стройка без простоев',
    desc: 'На каждой площадке Renaissance Development работает собственная техника: башенные краны, экскаваторы, бульдозеры, самосвалы, гидравлические молоты, грузовые машины, бетоносмесители, бетононасосы, подъёмные краны и автовышки. Стройка идёт по графику — независимо от внешних подрядчиков.',
    primary: null,
  },
  {
    image: '/assets/production-ventilation.webp',
    title: 'Вентиляционные шахты',
    subtitle: 'Производим по современным строительным стандартам',
    desc: 'Производим вентиляционные блоки и шахты для жилых и коммерческих объектов. Продукция изготавливается по проектной документации с соблюдением современных строительных норм. Используется на всех объектах компании — и доступна для внешних заказчиков.',
    primary: null,
  },
  {
    image: '/assets/production-gazoblok.webp',
    title: 'Газоблок',
    subtitle: 'Лёгкий, тёплый, экологичный',
    desc: 'Производим газобетонные блоки для внутренних перегородок и несущих конструкций. Снижает нагрузку на фундамент, сохраняет тепло зимой и прохладу летом, не горит и не выделяет вредных веществ. Применяется во всех жилых комплексах Renaissance Development.',
    primary: null,
  },
  {
    image: '/assets/production-termo.webp',
    title: 'Термо-рамы',
    subtitle: 'Энергосберегающие окна и двери собственного производства',
    desc: 'Производим оконные и дверные рамы с улучшенными теплоизоляционными характеристиками. Современное оборудование, контроль качества на каждом этапе. Устанавливаются во всех объектах компании — снижают расходы на отопление и кондиционирование с первого дня заселения.',
    primary: null,
  },
]

// «Производство» (Figma 7769:3522 + 7827:2226-2307).
export default function ProductionSection() {
  const [current, setCurrent] = useState(0)

  const go = (next: number) => setCurrent(next)
  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = () => go((current + 1) % slides.length)

  return (
    <section className="bg-bg-subtle pt-[76px] pb-[60px]">
      <Container>
        <div className="flex flex-col gap-8">

          {/* Header */}
          <div data-reveal className="flex flex-col gap-5">
            <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">Завод</span>
            </div>
            <h2 data-reveal="clip" className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
              Производство
            </h2>
          </div>

          {/* Slider viewport — the whole white panel slides as one unit */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.title}
                  className="w-full shrink-0 bg-white min-h-[759px] flex items-center gap-8 2xl:gap-[57px] px-9 py-[46px]"
                >
                  {/* Photo */}
                  <div className="w-[52%] max-w-[940px] h-[667px] shrink-0 min-w-0 overflow-hidden">
                    <img loading="lazy" decoding="async" src={slide.image} alt={slide.title} className="size-full object-cover" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col gap-[60px]">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-[5px]">
                        <p className="font-heading text-[51px] font-bold uppercase leading-[1.3] text-ink">
                          {slide.title}
                        </p>
                        <p className="font-heading text-[20px] font-bold uppercase leading-[1.3] text-ink">
                          {slide.subtitle}
                        </p>
                      </div>
                      <p className="font-body text-[22px] leading-[1.6] text-secondary">
                        {slide.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                      {slide.primary && (
                        <Button to={slide.primary.to} variant="primary" size="lg">
                          {slide.primary.label}
                        </Button>
                      )}
                      <Button to="/quote" variant="outlineLight" size="lg">
                        Оставить заявку
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel navigation */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущий"
              className="flex size-[65px] items-center justify-center rounded-full bg-primary/50 text-white transition-colors hover:bg-primary"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующий"
              className="flex size-[65px] items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-[#2F3A45]"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

        </div>
      </Container>
    </section>
  )
}
