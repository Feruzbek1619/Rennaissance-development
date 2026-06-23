'use client'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ChevronLeft, ChevronRight } from '@/components/icons'

// Home hero (Figma 332:5981) — project showcase carousel. Each slide: huge name
// + description + CTAs, then the building photo. Arrows slide the whole panel.
const slides = [
  {
    slug: 'alandalus',
    title: 'ALANDALUS',
    desc: 'Кирпич и монолит, потолки 3 метра, закрытый двор и паркинг под домом — в спокойном зелёном квартале Яшнабада.',
    image: '/assets/hero-alandalus.png',
  },
  {
    slug: 'botanika-luxury',
    title: 'BOTANIKA LUXURY',
    desc: 'Монолитный комплекс комфорт-класса в Мирзо-Улугбекском районе: закрытая территория, подземный паркинг и развитая инфраструктура рядом.',
    image: '/assets/project-botanika.png',
  },
  {
    slug: 'vatan-village',
    title: 'VATAN VILLAGE',
    desc: 'Просторные квартиры в тихом зелёном квартале Мирзо-Улугбекского района — собственный двор и всё необходимое в шаговой доступности.',
    image: '/assets/project-vatan.png',
  },
  {
    slug: 'turon',
    title: 'TURON',
    desc: 'Современный жилой комплекс на улице Янги Узбекистон: монолитный каркас, благоустроенная территория и продуманные планировки.',
    image: '/assets/project-turon.png',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section className="bg-bg pt-[82px] overflow-hidden">
      <Container>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.slug} className="w-full shrink-0 flex flex-col gap-20">
                {/* Title row */}
                <div className="flex w-full items-start justify-between gap-10">
                  <h1 className="font-heading text-[64px] 2xl:text-[110px] font-bold uppercase leading-[1.1] text-ink whitespace-nowrap shrink-0">
                    {slide.title}
                  </h1>
                  <div className="flex w-[460px] 2xl:w-[574px] shrink min-w-0 flex-col gap-12">
                    <p className="font-body text-[20px] leading-[1.6] text-primary">{slide.desc}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button to={`/projects/${slide.slug}`} variant="primary" size="lg" className="!px-8">
                        Выбрать квартиру
                      </Button>
                      <Button to="/quote" variant="outlineLight" size="lg" className="!px-8">
                        Заказать звонок
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Photo with carousel controls */}
                <div className="relative h-[800px] w-full overflow-hidden rounded-[5px]">
                  <img src={slide.image} alt={`ЖК ${slide.title}`} className="size-full object-cover" />
                  <div className="absolute bottom-9 right-9 flex items-center gap-[13.333px]">
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
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
