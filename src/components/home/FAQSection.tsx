'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'

const faqs = [
  {
    question: 'Когда основана компания?',
    answer:
      'Rennaissance development работает с 2019 года. За это время реализовано и строится 12+ проектов в Ташкенте. С 2021 года работает собственный завод Universal Temir Beton — все объекты строятся из своих материалов с контролем качества на каждом этапе.',
  },
  {
    question: 'Как купить квартиру?',
    answer:
      'Оставьте заявку на сайте или позвоните по номеру 78-333-33-31. Менеджер свяжется с вами, проведёт показ объекта, поможет выбрать подходящую квартиру и оформить договор.',
  },
  {
    question: 'Есть ли рассрочка?',
    answer:
      'Да, мы предлагаем рассрочку на приобретение квартир. Условия зависят от конкретного объекта и индивидуальной ситуации покупателя — уточняйте у менеджера актуальные предложения.',
  },
  {
    question: 'От чего зависит цена квадратного метра?',
    answer:
      'Цена формируется исходя из расположения объекта, этажа, площади квартиры, видовых характеристик и стадии строительства. Как правило, на ранних стадиях цена ниже.',
  },
  {
    question: 'Какие квартиры есть в продаже?',
    answer:
      'В продаже квартиры в нескольких жилых комплексах: Alandalus, Botanika Luxury, Vatan Village и Turon. Площади от 26 до 80 м². Актуальный список доступных квартир уточняйте у менеджера.',
  },
  {
    question: 'Какие материалы используются?',
    answer:
      'Конструктив — монолитно-бетонный каркас из материалов собственного завода Universal Temir Beton. Стены — газоблок собственного производства, фасад — кирпич, перекрытия — железобетонные плиты. Всё с полным контролем качества.',
  },
]

// FAQ accordion (Figma 314:3272).
// Left: badge + h2 + description. Right (flex-1): 6 accordion items with dividers.
export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex items-start gap-[105px]">

          {/* Left column */}
          <div className="flex flex-col gap-5 w-[665px] shrink-0">
            <div className="border border-border px-[24px] py-[16px] self-start">
              <span className="font-body text-body-sm text-ink">FAQ</span>
            </div>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
              Часто задаваемые вопросы
            </h2>
            <p className="font-body text-[20px] leading-[1.6] text-secondary w-[575px]">
              Если у вас есть вопросы, которых нет в этом списке, вы всегда можете связаться с нами напрямую.
            </p>
          </div>

          {/* Right column: accordion (w-950px implied by flex-1 in 1720px container) */}
          <div className="flex-1 min-w-0 flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i}>
                {/* Item header */}
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-[30px] text-left gap-4"
                >
                  <span className="font-heading font-medium text-[25px] leading-[1.3] text-ink flex-1 min-w-0 max-w-[700px]">
                    {faq.question}
                  </span>
                  <span className="text-[32px] leading-none text-ink shrink-0">
                    {open === i ? '×' : '+'}
                  </span>
                </button>

                {/* Answer */}
                {open === i && faq.answer && (
                  <p className="font-body text-[16px] leading-[1.6] text-secondary pb-[30px]">
                    {faq.answer}
                  </p>
                )}

                {/* Divider */}
                <div className="h-px bg-border" />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
