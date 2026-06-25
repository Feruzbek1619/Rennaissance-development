import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import FAQSection from '@/components/home/FAQSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'

const stages = [
  {
    num: '01',
    title: 'Проектирование',
    subtitle: 'Концепция → рабочая документация',
    body: 'Начинаем с детального анализа участка и требований. Проектная команда разрабатывает архитектурную концепцию, конструктивные решения и полную рабочую документацию. Все проекты соответствуют нормам Республики Узбекистан.',
    details: [
      'Архитектурная концепция',
      'Конструктивные решения',
      'Инженерные системы (ВК, ОВ, ЭС)',
      'Рабочая документация',
      'BIM-моделирование',
      'Авторский надзор',
    ],
  },
  {
    num: '02',
    title: 'Производство',
    subtitle: 'Завод UTB → стройплощадка',
    body: 'Завод Universal Temir Beton производит все ключевые материалы: товарный бетон, железобетонные изделия, газоблок, вентиляционные шахты и термо-рамы. Собственное производство — это прямой контроль качества и сроков поставки.',
    details: [
      'Товарный бетон всех марок',
      'Железобетонные изделия (ЖБИ)',
      'Газобетонные блоки',
      'Вентиляционные шахты',
      'Термо-рамы',
      'Логистика на объект',
    ],
  },
  {
    num: '03',
    title: 'Строительство',
    subtitle: 'Каркас → ключи',
    body: 'Монолитно-бетонный каркас, кирпичный фасад, инженерные системы и чистовая отделка. Каждый этап фиксируется в системе контроля качества. Объект сдаётся в установленный срок с полным пакетом документации.',
    details: [
      'Монолитный каркас',
      'Кирпичный фасад',
      'Инженерные системы',
      'Отделочные работы',
      'Благоустройство территории',
      'Сдача и документация',
    ],
  },
]

export default function Process() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary py-[100px]">
        <Container>
          <div className="flex items-end justify-between gap-8">
            <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.1] text-bg-subtle max-w-[800px]">
              Strategic Execution.
            </h1>
            <div className="flex flex-col gap-5 items-end w-[460px] shrink-0">
              <p className="font-body text-[18px] leading-[1.7] text-white/70 text-right">
                Три этапа — один стандарт качества. Полный цикл от проектирования до передачи объекта.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center h-[56px] px-10 bg-accent rounded-[5px] font-body font-medium text-[18px] text-white hover:bg-[#A2814E] transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3-Step process ───────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col gap-[80px]">

            {stages.map((stage, idx) => (
              <div
                key={stage.num}
                className={`flex items-start gap-[80px] ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Image side */}
                <div className="w-[620px] shrink-0 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/assets/about-company.webp"
                    alt={stage.title}
                    className="w-full aspect-[620/440] object-cover"
                  />
                </div>

                {/* Content side */}
                <div className="flex-1 min-w-0 flex flex-col gap-6 pt-4">
                  <span className="font-heading text-[120px] font-bold leading-none text-accent/10 select-none -mt-6">
                    {stage.num}
                  </span>
                  <div className="flex flex-col gap-2 -mt-10">
                    <span className="font-body text-[13px] uppercase tracking-[0.12em] text-secondary/60">
                      {stage.subtitle}
                    </span>
                    <h2 className="font-heading text-[49px] font-bold uppercase leading-[1.2] text-ink">
                      {stage.title}
                    </h2>
                  </div>
                  <p className="font-body text-[18px] leading-[1.7] text-secondary">
                    {stage.body}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mt-2">
                    {stage.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 font-body text-[16px] leading-[1.6] text-ink">
                        <span className="text-accent mt-[3px] shrink-0">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </Container>
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section className="bg-primary py-[80px]">
        <Container>
          <div className="grid grid-cols-4 gap-6">
            {[
              { value: '12+', label: 'Реализованных проектов' },
              { value: '2019', label: 'Год основания' },
              { value: '2021', label: 'Запуск завода UTB' },
              { value: '100%', label: 'Собственные материалы' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="font-heading text-[61px] font-bold leading-none text-white">
                  {s.value}
                </span>
                <span className="font-body text-[16px] leading-[1.5] text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection />
      <NeedHelpSection />
    </main>
  )
}
