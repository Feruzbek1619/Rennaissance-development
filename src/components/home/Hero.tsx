'use client'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { SkeletonImage } from '@/components/SkeletonImage'
import { ChevronLeft, ChevronRight } from '@/components/icons'

// Home hero — project showcase carousel. Each slide: gold eyebrow + serif name +
// description + CTAs, then the building photo. Arrows slide the whole panel.
const slides = [
  {
    slug: 'alandalus',
    title: 'ALANDALUS',
    eyebrow: 'Жилой комплекс · Комфорт+',
    desc: 'Кирпич и монолит, потолки 3 метра, закрытый двор и паркинг под домом — в спокойном зелёном квартале Яшнабада.',
    image: '/assets/hero-alandalus.webp',
  },
  {
    slug: 'botanika-luxury',
    title: 'BOTANIKA LUXURY',
    eyebrow: 'Жилой комплекс · Комфорт',
    desc: 'Монолитный комплекс комфорт-класса в Мирзо-Улугбекском районе: закрытая территория, подземный паркинг и развитая инфраструктура рядом.',
    image: '/assets/project-botanika.webp',
  },
  {
    slug: 'vatan-village',
    title: 'VATAN VILLAGE',
    eyebrow: 'Коттеджный городок · Комфорт+',
    desc: 'Просторные квартиры в тихом зелёном квартале Мирзо-Улугбекского района — собственный двор и всё необходимое в шаговой доступности.',
    image: '/assets/project-vatan.webp',
  },
  {
    slug: 'turon',
    title: 'TURON',
    eyebrow: 'Жилой комплекс · Комфорт',
    desc: 'Современный жилой комплекс на улице Янги Узбекистон: монолитный каркас, благоустроенная территория и продуманные планировки.',
    image: '/assets/project-turon.webp',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section className="bg-bg overflow-hidden h-[calc(100vh_-_151px)] min-h-[600px]">
      <Container className="h-full">
        <div className="overflow-hidden h-full">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.slug} className="w-full shrink-0 h-full flex flex-col gap-5 2xl:gap-7 py-4 2xl:py-5">
                {/* Title row — eyebrow + serif name (left), description + CTAs (right) */}
                <div className="flex w-full items-end justify-between gap-10 shrink-0">
                  <div className="flex shrink-0 flex-col gap-3">
                    <div data-reveal className="flex items-center gap-3">
                      <span className="rule-gold shrink-0" aria-hidden />
                      <span className="font-body text-[13px] 2xl:text-[14px] font-semibold uppercase tracking-[0.22em] text-accent-dark">
                        {slide.eyebrow}
                      </span>
                    </div>
                    <h1 data-reveal="clip" className="font-heading text-[60px] 2xl:text-[100px] font-bold uppercase leading-[0.98] tracking-[0.01em] text-ink whitespace-nowrap">
                      {slide.title}
                    </h1>
                  </div>
                  <div data-reveal style={{ transitionDelay: '120ms' }} className="flex w-[460px] 2xl:w-[574px] shrink min-w-0 flex-col gap-6 2xl:gap-7 pb-1">
                    <p className="font-body text-[19px] 2xl:text-[20px] leading-[1.6] text-primary">{slide.desc}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button to={`/projects/${slide.slug}`} variant="accent" size="lg" className="!px-8">
                        Выбрать квартиру
                      </Button>
                      <Button to="/quote" variant="outlineLight" size="lg" className="!px-8">
                        Заказать звонок
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Photo (skeleton until loaded) — fills the rest so title + photo
                    always fit one screen. Slide counter + arrows bottom-right. */}
                <div data-reveal="scale" className="relative flex-1 min-h-0 w-full overflow-hidden rounded-[8px]">
                  <SkeletonImage
                    eager={i === 0}
                    src={slide.image}
                    alt={`ЖК ${slide.title}`}
                    className="size-full"
                    imgClassName="size-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
                  <div className="absolute bottom-9 right-9 flex items-center gap-4">
                    <span className="font-heading text-[18px] font-semibold text-white tabular-nums">
                      {String(current + 1).padStart(2, '0')}
                      <span className="text-white/60"> / {String(slides.length).padStart(2, '0')}</span>
                    </span>
                    <div className="flex items-center gap-[13.333px]">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Предыдущий проект"
                        tabIndex={i === current ? 0 : -1}
                        className="flex size-[53.333px] items-center justify-center rounded-full bg-white/50 text-ink transition-colors hover:bg-white"
                      >
                        <ChevronLeft className="size-6" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Следующий проект"
                        tabIndex={i === current ? 0 : -1}
                        className="flex size-[53.333px] items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-bg-subtle"
                      >
                        <ChevronRight className="size-6" />
                      </button>
                    </div>
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
