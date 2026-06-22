'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ChevronLeft, ChevronRight } from '@/components/icons'

const slides = [
  {
    image: '/assets/production.png',
    title: 'Universal Temir Beton',
    subtitle: 'Бетонный завод — основа каждого нашего объекта',
    desc: 'Завод основан в 2021 году и входит в число современных и ведущих предприятий республики по производству железобетонных изделий и товарного бетона. Обеспечивает все объекты компании качественным материалом в сжатые сроки — без посредников и задержек.',
    primary: { label: 'Подробно', to: '/production' },
  },
  {
    image: '/assets/production-spectehnika.png',
    title: 'Спецтехника',
    subtitle: 'Собственный парк техники — стройка без простоев',
    desc: 'На каждой площадке Renaissance Building работает собственная техника: башенные краны, экскаваторы, бульдозеры, самосвалы, гидравлические молоты, грузовые машины, бетоносмесители, бетононасосы, подъёмные краны и автовышки. Стройка идёт по графику — независимо от внешних подрядчиков.',
    primary: null,
  },
  {
    image: '/assets/production-ventilation.png',
    title: 'Вентиляционные шахты',
    subtitle: 'Производим по современным строительным стандартам',
    desc: 'Производим вентиляционные блоки и шахты для жилых и коммерческих объектов. Продукция изготавливается по проектной документации с соблюдением современных строительных норм. Используется на всех объектах компании — и доступна для внешних заказчиков.',
    primary: null,
  },
  {
    image: '/assets/production-gazoblok.png',
    title: 'Газоблок',
    subtitle: 'Лёгкий, тёплый, экологичный',
    desc: 'Производим газобетонные блоки для внутренних перегородок и несущих конструкций. Снижает нагрузку на фундамент, сохраняет тепло зимой и прохладу летом, не горит и не выделяет вредных веществ. Применяется во всех жилых комплексах Renaissance Building.',
    primary: null,
  },
  {
    image: '/assets/production-termo.png',
    title: 'Термо-рамы',
    subtitle: 'Энергосберегающие окна и двери собственного производства',
    desc: 'Производим оконные и дверные рамы с улучшенными теплоизоляционными характеристиками. Современное оборудование, контроль качества на каждом этапе. Устанавливаются во всех объектах компании — снижают расходы на отопление и кондиционирование с первого дня заселения.',
    primary: null,
  },
]

// «Производство» (Figma 7769:3522 + 7827:2226-2307).
export default function ProductionSection() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next: number) => {
    setDir(next > current ? 1 : -1)
    setCurrent(next)
  }
  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = () => go((current + 1) % slides.length)

  const slide = slides[current]

  return (
    <section className="bg-bg-subtle pt-[76px] pb-[60px]">
      <Container>
        <div className="flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col gap-5">
            <div className="border border-border px-[18px] py-[6px] self-start">
              <span className="font-body text-body-sm text-ink">Завод</span>
            </div>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
              Производство
            </h2>
          </div>

          {/* White card with animated slide */}
          <div className="bg-white h-[759px] w-full overflow-hidden flex items-center relative">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex items-center w-full h-full absolute inset-0"
              >
                {/* Photo */}
                <div className="ml-9 w-[940px] h-[667px] shrink min-w-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="size-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="ml-[57px] w-[640px] shrink min-w-0 flex flex-col gap-[60px]">
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

                  <div className="flex items-center gap-6">
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
              </motion.div>
            </AnimatePresence>
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
              className="flex size-[65px] items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-[#0A2236]"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 ml-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-primary'
                      : 'size-2 bg-primary/30 hover:bg-primary/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
