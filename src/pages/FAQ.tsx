import { useState } from 'react'
import { Container } from '@/components/Container'
import { useLeadModalOptional } from '@/components/LeadModal'

const faqs = [
  {
    question: 'Когда основана компания?',
    answer:
      'Rennaissance development работает с 2019 года. За это время реализовано и строится 12+ проектов в Ташкенте. С 2021 года работает завод Universal Temir Beton — производим товарный бетон, железобетонные изделия, газоблок, вентиляционные шахты и термо-рамы. Все наши объекты строятся из собственных материалов.',
  },
  {
    question: 'Как купить квартиру?',
    answer:
      'Оставьте заявку на сайте или позвоните нам по номеру 78-333-33-31. Менеджер свяжется с вами, проведёт показ объекта, поможет выбрать подходящую квартиру и оформить договор.',
  },
  {
    question: 'Есть ли рассрочка?',
    answer:
      'Да, мы предлагаем рассрочку на приобретение квартир. Условия рассрочки зависят от конкретного объекта и индивидуальной ситуации покупателя. Свяжитесь с нашим менеджером для уточнения актуальных условий.',
  },
  {
    question: 'От чего зависит цена квадратного метра?',
    answer:
      'Цена формируется исходя из расположения объекта, этажа, площади квартиры, видовых характеристик и стадии строительства. Как правило, на ранних стадиях цена ниже.',
  },
  {
    question: 'Какие квартиры есть в продаже?',
    answer:
      'В продаже находятся квартиры в нескольких жилых комплексах: Alandalus, Botanika Luxury, Vatan Village и Turon. Площади от 26 до 80 м². Актуальный список доступных квартир уточняйте у менеджера.',
  },
  {
    question: 'Какие материалы используются?',
    answer:
      'Конструктив — монолитно-бетонный каркас из нашего собственного завода Universal Temir Beton. Стены — газоблок собственного производства. Фасад — кирпич. Перекрытия — железобетонные плиты. Всё производится на нашем заводе с полным контролем качества.',
  },
]

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div className={`relative size-8 shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
      <img loading="lazy" decoding="async" src="/assets/faq-plus.svg" alt="" className="size-8" />
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-[24px] text-left gap-4"
      >
        <span className="font-heading text-[25px] font-medium leading-[1.4] text-ink w-[700px]">
          {question}
        </span>
        <PlusIcon open={open} />
      </button>
      {open && (
        <p className="font-body text-[16px] leading-[1.6] text-secondary pb-[24px] w-[882px]">
          {answer}
        </p>
      )}
      <div className="h-px bg-border" />
    </div>
  )
}

export default function FAQ() {
  const modal = useLeadModalOptional()
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/70 py-[72px]">
        <Container>
          <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.3] text-bg-subtle">
            Часто задаваемые вопросы
          </h1>
        </Container>
      </section>

      {/* ── FAQ accordion ────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="max-w-[950px]">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Need Help (extended form + image) ────────────── */}
      <section className="bg-primary py-[52px]">
        <Container>
          <div className="flex items-stretch gap-[56px]">
            {/* Left: form */}
            <div className="flex flex-col gap-[27px] w-[730px] shrink-0">
              <div className="flex flex-col gap-[15px]">
                <h2 className="font-heading text-[59px] font-bold uppercase leading-none text-bg-subtle">
                  Вам нужна помощь?
                </h2>
                <p className="font-vela text-[24px] leading-[1.3] text-white/70">
                  Обращайтесь к нам с любым вопросом или предложением через службу поддержки
                </p>
              </div>

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
                <div className="flex flex-col gap-[10px]">
                  <label className="font-vela text-[21px] font-semibold text-white leading-[1.3]">Опишите свой вопрос</label>
                  <textarea
                    placeholder="Введите свой вопрос"
                    rows={4}
                    className="bg-[#ededed] border border-white/10 rounded-[5px] px-5 py-3 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[13px]">
                <button
                  type="button"
                  onClick={() => modal?.openSuccess()}
                  className="w-full h-[62px] bg-accent rounded-[5px] font-vela text-[22px] font-semibold text-white hover:bg-[#E85F00] transition-colors"
                >
                  Оставить заявку
                </button>
                <p className="font-vela text-[17px] text-secondary leading-[1.3]">
                  Отправляя этот запрос, вы соглашаетесь с{' '}
                  <span className="font-semibold text-secondary">условиями обработки данных</span>
                </p>
              </div>
            </div>

            {/* Right: image */}
            <div className="flex-1 min-h-[500px] overflow-hidden relative">
              <img loading="lazy" decoding="async"
                src="/assets/project-alandalus.webp"
                alt="Жилой комплекс Renaissance Development"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
