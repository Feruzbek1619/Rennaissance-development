import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionTag } from '@/components/SectionTag'
import { WhyUsCards } from '@/components/WhyUsCards'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import ProductionSection from '@/components/home/ProductionSection'
import FAQSection from '@/components/home/FAQSection'
import StatsSection from '@/components/home/StatsSection'
import PartnersSection from '@/components/home/PartnersSection'
import { projects } from '@/data/projects'

const activeProjects = projects.filter((p) => p.status === 'active').slice(0, 4)

export default function About() {
  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/80 py-[72px]">
        <Container>
          <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.3] text-bg-subtle">
            О компании
          </h1>
        </Container>
      </section>

      {/* ── 2. Company description ──────────────────────────── */}
      <section className="bg-bg-subtle py-[84px]">
        <Container>
          <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.1] text-ink mb-[32px]">
            Renaissance Development
          </h2>
          <div className="flex flex-col gap-[20px] font-body text-[22px] 2xl:text-[26px] leading-[1.6] text-ink">
            <p>
              Renaissance Development — ташкентская строительная компания полного цикла, основанная в 2019 году
              с одной целью: строить дома, которые остаются надёжными на десятилетия вперёд. За пять лет компания
              прошла путь от одного из заметных застройщиков столицы — с портфелем из 12 реализованных и
              строящихся объектов, собственным производством и полным контролем качества на каждом этапе.
            </p>
            <p>
              Название Renaissance — Возрождение — выбрано не случайно. Эта эпоха, когда архитектура перестала
              быть просто строительством и стала искусством: точным, выверенным, рассчитанным на века. Именно
              этот принцип лежит в основе каждого решения компании.
            </p>
            <p>
              Большинство застройщиков зависят от десятков подрядчиков и поставщиков. Renaissance Development
              выбрал другой путь: контроль на каждом шаге. В 2021 году компания запустила собственный завод
              Universal Temir Beton в Янгиабадском районе Ташкента. Завод производит товарный бетон,
              железобетонные изделия, газоблок, вентиляционные шахты и термо-рамки. Строим из своих материалов —
              контролируем качество на каждом этапе.
            </p>
            <p>
              На площадках работает собственный парк из девяти видов спецтехники: башенные краны, экскаваторы,
              бульдозеры, самосвалы, бетономешатели, бетононасосы, грузовые машины, подъёмные краны и автовышки.
              Стройка не останавливается в ожидании арендованной техники — она идёт по графику.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 3. Team section ────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-start justify-between mb-[60px]">
            <div className="flex flex-col gap-5 w-[877px] shrink-0">
              <SectionTag>Наша команда</SectionTag>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.2] text-ink">
                Профессионалы,<br />которые строят Ташкент
              </h2>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-secondary w-[651px] self-end">
              За каждым проектом Renaissance Development стоит команда инженеров и строителей с многолетним
              опытом на государственных и частных объектах столицы.
            </p>
          </div>

          {/* CEO photo — centered, with name card overlapping bottom (Figma 7801:3087) */}
          <div className="flex justify-center">
            <div className="relative w-[406px]">
              <div className="h-[495px] overflow-hidden">
                <img loading="lazy" decoding="async"
                  src="/assets/director-photo.webp"
                  alt="Джабборов Руфат Узакович — основатель и CEO"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur-md px-[24px] py-[16px]">
                <p className="font-heading text-[20px] font-bold text-ink">Джабборов Руфат Узакович</p>
                <p className="font-body text-[16px] text-secondary mt-1">Основатель и CEO</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Stats — shared section (animated count-up) ── */}
      <StatsSection />

      {/* ── 5. Production — shared carousel (same slides as Home) ── */}
      <ProductionSection />

      {/* ── 6. Partners — shared section (looping logo marquee) ── */}
      <PartnersSection />

      {/* ── 7. Why us section ──────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col items-center gap-5 mb-[60px]">
            <SectionTag>Почему мы</SectionTag>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-none text-ink text-center">
              Почему выбирают нас
            </h2>
          </div>

          <div className="mb-[16px]">
            <WhyUsCards />
          </div>

          {/* Video / big image */}
          <div className="relative w-full h-[740px] overflow-hidden">
            <img loading="lazy" decoding="async"
              src="/assets/why-us-video.webp"
              alt="Наши проекты"
              className="w-full h-full object-cover"
            />
            {/* play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="size-8 ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8. Need Help ───────────────────────────────────── */}
      <NeedHelpSection />

      {/* ── 9. FAQ ─────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 10. Projects section ───────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <div className="flex items-end justify-between gap-8 mb-[52px]">
            <div className="flex flex-col gap-5 min-w-0">
              <SectionTag>Проекты</SectionTag>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-none text-ink max-w-[764px]">
                Наши проекты
              </h2>
            </div>
            <div className="flex flex-col items-end gap-6 min-w-0 shrink">
              <p className="font-body text-[20px] leading-[1.6] text-secondary max-w-[698px] text-right">
                5 объектов в продаже — от квартир в рассрочку до загородных вилл
              </p>
              <div className="flex gap-4 flex-wrap justify-end">
                <Button variant="primary" size="lg" to="/projects">
                  Все проекты
                </Button>
                <Button variant="accent" size="lg" to="/quote">
                  Заказать звонок
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {activeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="flex justify-center mt-[52px]">
            <Button variant="primary" size="lg" to="/projects">
              Все проекты
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
