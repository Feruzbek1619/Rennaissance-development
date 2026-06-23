import { Container } from '@/components/Container'

const sections = [
  {
    title: 'Сбор информации',
    body: 'Мы собираем персональные данные, которые вы добровольно предоставляете при обращении к нам или заполнении форм на сайте:',
    items: [
      'Личные данные: имя, номер телефона, адрес электронной почты.',
      'Данные о запросе: параметры интересующего объекта, бюджет, предпочтения.',
      'Технические данные: IP-адрес и информация о браузере, собираемые через cookies для улучшения работы сайта.',
    ],
  },
  {
    title: 'Использование информации',
    body: 'Ваши данные используются для обработки обращений и улучшения наших услуг:',
    items: [
      'Для ответа на ваши запросы и заявки по объектам.',
      'Для предоставления информации о проектах, рассрочке и условиях покупки.',
      'Для улучшения качества обслуживания и работы сайта.',
    ],
  },
  {
    title: 'Защита данных',
    body: 'Мы применяем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или распространения. Ваши данные хранятся на защищённых серверах.',
  },
  {
    title: 'Передача третьим лицам',
    body: 'Renaissance Development не продаёт ваши данные третьим лицам. Информация может передаваться только доверенным партнёрам, непосредственно участвующим в реализации вашего запроса, и только в объёме, необходимом для этого.',
  },
  {
    title: 'Ваши права',
    body: 'В соответствии с применимым законодательством вы вправе:',
    items: [
      'Получить доступ к хранящимся у нас данным о вас.',
      'Запросить исправление или удаление вашей информации.',
      'Отозвать согласие на обработку данных в любое время.',
    ],
  },
  {
    title: 'Контакты',
    body: 'По вопросам, связанным с обработкой персональных данных, обращайтесь:',
    items: [
      'Телефон: 78-333-33-31',
      'Адрес: г. Ташкент, Махтумкули, 100116, Республика Узбекистан',
    ],
  },
]

export default function Privacy() {
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
                Privacy Policy
              </h1>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-white/70 w-[580px] self-end">
              Настоящая политика описывает, как Renaissance Development собирает, использует и защищает
              ваши персональные данные при взаимодействии с нашими сервисами.
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
