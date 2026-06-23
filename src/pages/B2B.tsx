import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import FAQSection from '@/components/home/FAQSection'

const products = [
  {
    title: 'Товарный бетон',
    description:
      'Производим бетон различных марок для монолитного строительства. Каждая партия проходит контроль качества перед отгрузкой на объект.',
  },
  {
    title: 'Железобетонные изделия (ЖБИ)',
    description:
      'Колонны, перекрытия, лестничные марши и другие элементы несущих конструкций — изготавливаем на заводе и доставляем на площадку в готовом виде.',
  },
  {
    title: 'Газоблок',
    description:
      'Лёгкие и прочные газобетонные блоки для внутренних перегородок: отличная звукоизоляция, высокая теплоэффективность, удобство монтажа.',
  },
  {
    title: 'Вентиляционные шахты',
    description:
      'Типовые и нестандартные вентиляционные блоки для жилых и коммерческих объектов. Производим по проектной документации.',
  },
  {
    title: 'Термо-рамы',
    description:
      'Энергоэффективные оконные и дверные рамы с термоизоляционным профилем для строительства — для комфорта жильцов и снижения расходов на отопление и кондиционирование.',
  },
]

function OfficeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M6 42h36M10 42V14l14-8 14 8v28M20 42V30h8v12M18 24h4M26 24h4M18 18h4M26 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M9 4.5h10l4 10-5 3a22 22 0 0 0 12.5 12.5l3-5 10 4V39a5 5 0 0 1-5.5 5C11.5 42 6.5 16.5 9 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function MessengerIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <path d="M8 6h32a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H14l-8 8V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 13v11l7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const contactCards = [
  { icon: <OfficeIcon />, title: 'Офис продаж', content: 'г. Ташкент, Махтумкули, 100116,\nРеспублика Узбекистан' },
  { icon: <PhoneIcon />, title: 'Телефон', content: '78-333-33-31' },
  { icon: <MessengerIcon />, title: 'Мессенджеры', content: 'Telegram: @rbcompanyuz\nInstagram: @rbcompanyuz' },
  { icon: <ClockIcon />, title: 'Часы работы', content: 'Пн-Пт: 9:00–18:00.' },
]

export default function B2B() {
  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative h-[888px] overflow-hidden">
        <img loading="lazy" decoding="async"
          src="/assets/production.webp"
          alt="Universal Temir Beton"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        <div className="absolute bottom-[52px] left-0 right-0">
          <Container>
            <div className="flex items-end justify-between">
              <h1 className="font-heading text-[80px] font-bold uppercase leading-none text-bg-subtle">
                Universal Temir Beton
              </h1>
              <div className="flex gap-4 pb-1">
                <Button variant="primary" size="lg" to="/quote">
                  Оставить заявку
                </Button>
                <a
                  href="tel:+998783333331"
                  className="flex items-center justify-center h-[56px] px-8 bg-accent rounded-full font-body text-[20px] font-medium text-white hover:bg-[#E85F00] transition-colors"
                >
                  Позвонить
                </a>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── 2. UTB Description ──────────────────────────────── */}
      <section className="bg-white py-[84px]">
        <Container>
          <div className="flex flex-col gap-8 max-w-[1721px]">
            <h2 className="font-heading uppercase leading-[1.35] text-ink">
              <span className="text-[61px] font-bold block">Universal Temir Beton</span>
              <span className="text-[35px] font-bold">наш собственный завод</span>
            </h2>
            <div className="flex flex-col gap-5 font-vela text-[28px] leading-[1.6] text-ink/80">
              <p>
                Большинство застройщиков покупают бетон у сторонних поставщиков. Это означает зависимость от чужих
                сроков, чужих стандартов и чужих ошибок. В 2021 году Rennaissance development выбрал другой путь —
                и запустил собственный завод Universal Temir Beton в Яшнабадском районе Ташкента.
              </p>
              <p>
                Сегодня завод обеспечивает все объекты компании товарным бетоном и железобетонными изделиями
                полного цикла. Газоблок для внутренних перегородок, вентиляционные шахты и термо-рамы — тоже с
                нашего завода. Когда бетон для вашей будущей квартиры производится в ста процентах под контролем
                застройщика, это не просто удобство — это гарантия качества, которую невозможно подделать.
              </p>
              <p>
                Собственное производство — это и преимущество в скорости: стройка не останавливается в ожидании
                поставки. График строительства держится не потому, что так написано в договоре, а потому что все
                ресурсы находятся в руках одной команды.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Products section ─────────────────────────────── */}
      <section className="bg-white py-[100px] border-t border-border">
        <Container>
          <div className="flex items-start justify-between mb-[64px]">
            <div className="flex flex-col gap-5">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">Продукция</span>
              </div>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink w-[951px]">
                Продукция
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-ink w-[692px] self-end">
              Строим из своих материалов. Контролируем качество на каждом этапе.
            </p>
          </div>

          <div className="flex gap-8 2xl:gap-[72px] items-start">
            {/* Left: factory image */}
            <div className="w-[40%] max-w-[698px] shrink-0 h-[840px] overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/assets/production.webp"
                alt="UTB Factory"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: product list */}
            <div className="flex-1 min-w-0 flex flex-col">
              {products.map((p, i) => (
                <div key={p.title}>
                  <div className="flex gap-6 2xl:gap-[53px] items-start py-[35px]">
                    <h3 className="font-heading text-[31px] font-bold leading-[1.3] text-ink w-[200px] 2xl:w-[280px] shrink-0">
                      {p.title}
                    </h3>
                    <p className="font-body text-[18px] leading-[1.6] text-secondary flex-1 min-w-0">
                      {p.description}
                    </p>
                  </div>
                  {i < products.length - 1 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. FAQ ──────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 5. Contact cards ────────────────────────────────── */}
      <section className="bg-white py-[100px] border-t border-border">
        <Container>
          <div className="flex items-start justify-between mb-[64px]">
            <div className="flex flex-col gap-5">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">Контакты</span>
              </div>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink w-[850px]">
                Свяжитесь с нами
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-ink w-[692px] self-end">
              Менеджер ответит на любые вопросы по квартирам, рассрочке и объектам. Работаем без выходных.
            </p>
          </div>

          <div className="flex gap-4">
            {contactCards.map((card) => (
              <div key={card.title} className="flex-1 border border-[#c4c4c4] p-10 flex flex-col gap-12">
                <div className="text-ink">{card.icon}</div>
                <div className="flex flex-col gap-6">
                  <h3 className="font-heading text-[31px] font-bold leading-[1.4] text-ink">{card.title}</h3>
                  <p className="font-body text-[20px] leading-[1.6] text-secondary whitespace-pre-line">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Need Help ────────────────────────────────────── */}
      <NeedHelpSection />
    </main>
  )
}
