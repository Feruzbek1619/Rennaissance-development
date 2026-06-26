'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ChevronLeft, ChevronRight } from '@/components/icons'

const slides = [
  {
    image: '/assets/prod-concrete.webp',
    title: 'Бетонный завод',
    subtitle: 'Universal Temir Beton — основа каждого объекта',
    desc: 'Современный бетонный завод обеспечивает объекты компании высококачественными материалами: товарным бетоном для монолитного строительства, газобетонными блоками и железобетонными изделиями. Собственные мощности позволяют оптимизировать сроки и поддерживать стабильное качество на всех объектах.',
    primary: { label: 'Подробнее', to: '/b2b#concrete' },
  },
  {
    image: '/assets/prod-travertine.webp',
    title: 'Жидкий травертин',
    subtitle: 'Декоративные покрытия для фасадов',
    desc: 'Производим современные покрытия из жидкого травертина, которые используются в собственных проектах — в частности, для отделки фасадов зданий. Материал обеспечивает эстетичный внешний вид, высокую прочность и длительный срок службы, придавая объектам уникальный архитектурный стиль.',
    primary: { label: 'Подробнее', to: '/b2b#travertine' },
  },
  {
    image: '/assets/prod-ventilation.webp',
    title: 'Вентиляционные системы',
    subtitle: 'Эффективный воздухообмен для жилья и коммерции',
    desc: 'Для жилых и коммерческих проектов компании производятся современные вентиляционные системы. Продукция изготавливается по проектной документации с соблюдением строительных норм, обеспечивает высокое качество и эффективный воздухообмен. Доступна и для внешних заказчиков.',
    primary: { label: 'Подробнее', to: '/b2b#ventilation' },
  },
  {
    image: '/assets/prod-aluminum.webp',
    title: 'Алюминиевые профили',
    subtitle: 'Оконные, дверные и фасадные конструкции',
    desc: 'Производим алюминиевые профили, используемые в оконных, дверных и фасадных конструкциях. Продукция отличается прочностью и современным дизайном, применяется на всех объектах компании и доступна для внешних заказчиков.',
    primary: { label: 'Подробнее', to: '/b2b#aluminum' },
  },
  {
    image: '/assets/prod-cranes.webp',
    title: 'Башенные краны и спецтехника',
    subtitle: 'Собственный парк техники — стройка без простоев',
    desc: 'Компания располагает современными башенными кранами и подъёмной техникой для своих площадок. Техника применяется в реализации жилых и коммерческих проектов, обеспечивая непрерывность строительства и выполнение работ в установленные сроки. Стройка идёт по графику — независимо от внешних подрядчиков.',
    primary: { label: 'Подробнее', to: '/b2b#cranes' },
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
