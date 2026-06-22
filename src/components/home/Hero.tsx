import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ChevronLeft, ChevronRight } from '@/components/icons'

// Home hero (Figma 332:5981). Project showcase: huge name + description + CTAs,
// then the building photo with carousel controls.
export default function Hero() {
  return (
    <section className="bg-bg pt-[82px]">
      <Container>
        <div className="flex flex-col gap-20">
          <div className="flex w-full items-start justify-between gap-10">
            <h1 className="whitespace-nowrap font-heading text-[134.702px] font-bold uppercase leading-[1.3] text-ink">
              ALANDALUS
            </h1>

            <div className="flex w-[574px] shrink min-w-0 flex-col gap-12">
              <p className="font-body text-[20px] leading-[1.6] text-primary">
                Кирпич и монолит, потолки 3 метра, закрытый двор и паркинг под домом - в спокойном
                зелёном квартале Яшнабада.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/projects/alandalus" variant="primary" size="lg" className="!px-8">
                  Выбрать квартиру
                </Button>
                <Button to="/quote" variant="outlineLight" size="lg" className="!px-8">
                  Заказать звонок
                </Button>
              </div>
            </div>
          </div>

          <div className="relative h-[800px] w-full overflow-hidden">
            <img src="/assets/hero-alandalus.png" alt="ЖК ALANDALUS" className="size-full object-cover" />
            <div className="absolute bottom-9 right-9 flex items-center gap-[13.333px]">
              <button
                type="button"
                aria-label="Предыдущий проект"
                className="flex size-[53.333px] items-center justify-center rounded-full bg-white/50 text-ink transition-colors hover:bg-white"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Следующий проект"
                className="flex size-[53.333px] items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-bg-subtle"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
