import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

// «О компании» (Figma 7782:3017).
// Left column: badge + heading (top), then company name + text + buttons (offset down).
// Right column: photo offset 194px down (Figma: photo at top-259, section pt-65 → 259-65=194).
export default function AboutSection() {
  return (
    <section className="bg-white pt-[65px] pb-[100px]">
      <Container>
        <div className="flex items-start gap-[69px]">

          {/* Left column */}
          <div data-reveal className="w-[782px] shrink-0 flex flex-col">
            {/* Header: badge + heading */}
            <div className="flex flex-col gap-5">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">О нас</span>
              </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                О компании
              </h2>
            </div>

            {/* Spacer between heading and company content */}
            <div className="h-[161px]" />

            {/* Company content */}
            <div className="flex flex-col gap-8">
              <p className="font-heading text-[50px] font-bold uppercase leading-[1.3] text-ink">
                Renaissance Development
              </p>
              <div className="flex flex-col gap-0 font-body text-[20px] leading-[1.6] text-ink">
                <p>
                  Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений.
                  Каждый проект Renaissance Development начинается не с котлована, а с ответа на
                  вопрос: каким этот дом будет через тридцать лет.
                </p>
                <p className="mt-[1.6em]">
                  Поэтому мы контролируем всё сами. Бетон — с собственного завода. Газоблок,
                  вентиляционные шахты, термо-рамы — собственного производства. Техника на площадке —
                  своя. Когда в цепочке нет случайных подрядчиков, в качестве нет случайностей.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Button to="/about" variant="primary" size="lg">
                  Подробно
                </Button>
                <Button to="/quote" variant="outlineLight" size="lg">
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>

          {/* Right column: photo offset 194px from column top */}
          <div data-reveal="right" className="mt-[194px] flex-1">
            <div className="h-[754px] rounded-[5px] overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/assets/about-company.webp"
                alt="Renaissance Development — строительство"
                className="reveal-zoom size-full object-cover"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
