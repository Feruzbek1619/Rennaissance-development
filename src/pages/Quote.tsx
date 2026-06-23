import { Container } from '@/components/Container'
import FAQSection from '@/components/home/FAQSection'
import { useLeadModalOptional } from '@/components/LeadModal'

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
      <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12l17 13L41 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  {
    icon: <OfficeIcon />,
    title: 'Офис продаж',
    content: 'г. Ташкент, Махтумкули, 100116,\nРеспублика Узбекистан',
  },
  {
    icon: <PhoneIcon />,
    title: 'Телефон',
    content: '78-333-33-31',
  },
  {
    icon: <MessengerIcon />,
    title: 'Мессенджеры',
    content: 'Telegram: @rbcompanyuz\nInstagram: @rbcompanyuz',
  },
  {
    icon: <ClockIcon />,
    title: 'Часы работы',
    content: 'Пн-Пт: 9:00–18:00.',
  },
]

export default function Quote() {
  const modal = useLeadModalOptional()
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/70 py-[100px]">
        <Container>
          <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.3] text-bg-subtle">
            Наши контакты
          </h1>
        </Container>
      </section>

      {/* ── Quote form + image (Figma 7802:9343 — inset navy card on white) ── */}
      <section className="bg-white py-[60px]">
        <Container>
          <div className="bg-primary p-8 2xl:p-[52px] flex items-stretch gap-8 2xl:gap-[56px]">
            {/* Left: form */}
            <div className="flex flex-col gap-[40px] 2xl:gap-[59px] flex-1 min-w-0 2xl:max-w-[730px]">
              <div className="flex flex-col gap-[15px]">
                <h2 className="font-heading text-[61px] font-bold uppercase leading-none text-bg-subtle">
                  Оставить заявку
                </h2>
                <p className="font-vela text-[24px] leading-[1.3] text-white/70">
                  Мы свяжемся с вами через 5 минут. Сообщите нам свой номер телефона, чтобы мы могли вам перезвонить
                </p>
              </div>

              <div className="flex flex-col gap-[25px]">
                <div className="flex flex-col gap-[22px]">
                  <div className="flex flex-col gap-[10px]">
                    <label className="font-vela text-[21px] font-semibold text-white leading-[1.3]">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Введите имя"
                      className="h-[59px] bg-[#ededed] border border-white/10 rounded-[5px] px-5 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label className="font-vela text-[21px] font-semibold text-white leading-[1.3]">Номер телефона</label>
                    <input
                      type="tel"
                      placeholder="Введите номер"
                      className="h-[59px] bg-[#ededed] border border-white/10 rounded-[5px] px-5 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[13px]">
                  <button
                    type="button"
                    onClick={() => modal?.openSuccess()}
                    className="w-full h-[79px] bg-accent rounded-[5px] font-vela text-[34px] font-semibold text-white hover:bg-[#E85F00] transition-colors"
                  >
                    Оставить заявку
                  </button>
                  <p className="font-vela text-[17px] text-secondary leading-[1.3]">
                    Отправляя этот запрос, вы соглашаетесь с{' '}
                    <span className="font-semibold text-secondary">условиями обработки данных</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: building image (Figma 7802:9364) */}
            <div className="flex-1 min-w-0 min-h-[600px] overflow-hidden relative">
              <img
                src="/assets/contacts-form.jpg"
                alt="Жилой комплекс Renaissance Development"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#00040b]/80 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Map (Figma 7802:8515) — content-width, white frame, chip + zoom ── */}
      <section className="bg-white pb-[30px]">
        <Container>
          <div className="bg-white p-[30px]">
            <div className="relative h-[607px] overflow-hidden">
              <img
                src="/assets/contacts-map.jpg"
                alt="Карта — г. Ташкент, Махтумкули"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Address chip */}
              <div className="absolute bottom-[18px] left-[18px] bg-white rounded-[15px] flex items-center gap-[15px] p-[15px] shadow-[0_12px_15px_rgba(0,0,0,0.12)]">
                <div className="bg-[#e3eee2] rounded-[10px] p-3 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="size-[30px]">
                    <circle cx="12" cy="12" r="3" stroke="#131612" strokeWidth="1.5" />
                    <path d="M20 12c0 8-8 13-8 13S4 20 4 12a8 8 0 0 1 16 0Z" stroke="#131612" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-vela text-[15px] text-[#8a8c8a] leading-[1.4]">Адрес объекта</p>
                  <p className="font-vela text-[15px] font-bold text-[#131612] leading-[1.4]">г. Ташкент, Махтумкули, 100116,</p>
                  <p className="font-vela text-[15px] font-bold text-[#131612] leading-[1.4]">Республика Узбекистан</p>
                </div>
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-[25px] right-[25px] flex flex-col gap-[15px]">
                {[
                  { label: 'Приблизить', path: 'M12 5v14M5 12h14' },
                  { label: 'Отдалить', path: 'M5 12h14' },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    aria-label={b.label}
                    className="size-10 bg-white rounded-[10px] shadow-[0_12px_15px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#131612] hover:bg-bg-subtle transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
                      <path d={b.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Моё местоположение"
                  className="size-10 bg-white rounded-[10px] shadow-[0_12px_15px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#131612] hover:bg-bg-subtle transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact cards ─────────────────────────────────── */}
      <section className="bg-white py-[100px]">
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

      {/* ── Stats tagline ─────────────────────────────────── */}
      <section className="bg-bg-subtle py-[80px]">
        <Container>
          <p className="text-center font-heading text-[45px] font-semibold leading-[1.4] mb-10">
            <span className="text-ink">Мы не просто строим здания — мы создаём надёжное пространство для будущих поколений. </span>
            <span className="text-secondary">Renaissance development — застройщик полного цикла. С 2019 года — 12 проектов в Ташкенте.</span>
          </p>
          <div className="flex items-center gap-4">
            {[
              { value: '12+', label: 'Реализованные проекты' },
              { value: '5+', label: 'Проекты в строительстве' },
              { value: '2021', label: 'Собственный бетонный завод' },
              { value: '2019', label: 'год основания' },
            ].map((s) => (
              <div key={s.label} className="flex flex-1 items-center justify-center bg-white px-[26px] py-6 backdrop-blur-[7px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-[75px] font-bold uppercase leading-none text-ink">{s.value}</p>
                  <p className="text-center font-body text-body-sm font-medium text-secondary">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <FAQSection />
    </main>
  )
}
