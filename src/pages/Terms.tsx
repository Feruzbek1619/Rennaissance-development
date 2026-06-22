import { Container } from '@/components/Container'

const sections = [
  {
    title: 'Принятие условий',
    body: 'Используя наш сайт и обращаясь за нашими услугами, вы соглашаетесь соблюдать настоящие условия и все применимые законы и нормативные акты.',
  },
  {
    title: 'Интеллектуальная собственность',
    body: 'Все архитектурные проекты, планы, схемы и цифровые материалы на данной платформе защищены законодательством об интеллектуальной собственности. Использование, воспроизведение или распространение материалов без письменного разрешения Rennaissance development запрещено.',
  },
  {
    title: 'Обращение и оплата',
    body: 'При подаче заявки или оформлении договора действуют следующие условия:',
    items: [
      'Предварительные условия: информация о стоимости и сроках является предварительной и может быть изменена по результатам переговоров.',
      'Оплата: вы соглашаетесь оплатить применимые суммы в соответствии с условиями заключённого договора.',
    ],
  },
  {
    title: 'Обязанности клиента',
    body: 'Как клиент, вы несёте ответственность за предоставление точных данных о своих требованиях. Вы обязаны сохранять конфиденциальность переданных вам документов и не раскрывать их третьим лицам без согласия компании.',
  },
  {
    title: 'Ограничение ответственности',
    body: 'Rennaissance development не несёт ответственности за косвенные или случайные убытки, возникшие в результате использования сайта или наших услуг. Все материалы сайта предоставляются «как есть» без каких-либо гарантий.',
  },
  {
    title: 'Применимое право',
    body: 'Настоящие условия регулируются законодательством Республики Узбекистан. Все споры решаются путём переговоров, а при невозможности — в судебном порядке по месту нахождения компании.',
  },
  {
    title: 'Контакты',
    body: 'По юридическим вопросам обращайтесь:',
    items: [
      'Телефон: 78-333-33-31',
      'Адрес: г. Ташкент, Махтумкули, 100116, Республика Узбекистан',
    ],
  },
]

export default function Terms() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/80 py-[72px]">
        <Container>
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-5">
              <div className="border border-white/20 px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-white/60">Правовое</span>
              </div>
              <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.1] text-bg-subtle">
                Terms &amp; Conditions
              </h1>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-white/70 w-[580px] self-end">
              Ваше соглашение с Rennaissance development. Пожалуйста, ознакомьтесь с условиями
              использования наших услуг.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="max-w-[820px] mx-auto flex flex-col gap-[60px]">
            {sections.map((s) => (
              <div key={s.title} className="flex flex-col gap-4">
                <h2 className="font-heading text-[31px] font-bold leading-[1.3] text-ink">
                  {s.title}
                </h2>
                <p className="font-body text-[18px] leading-[1.75] text-secondary">{s.body}</p>
                {s.items && (
                  <ul className="flex flex-col gap-2 mt-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 font-body text-[18px] leading-[1.75] text-secondary">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
