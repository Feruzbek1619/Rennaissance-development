import { Container } from '@/components/Container'

const steps = [
  {
    num: '01',
    title: 'Консультация',
    desc: 'Менеджер выслушает ваши пожелания, подберёт подходящие варианты квартир и ответит на все вопросы по условиям покупки и рассрочки.',
  },
  {
    num: '02',
    title: 'Оформление договора',
    desc: 'Подписываем договор купли-продажи или рассрочки, помогаем с оформлением документов и согласуем удобный для вас график платежей.',
  },
  {
    num: '03',
    title: 'Передача ключей',
    desc: 'После завершения строительства и ввода в эксплуатацию вы получаете ключи от квартиры и всю необходимую документацию.',
  },
]

// «Три простых шага» (Figma 7782:2938).
// Header: badge + h2 LEFT, description RIGHT.
// Content: placeholder image LEFT, 3 steps with dividers RIGHT.
export default function ProcessStepsSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-[64px]">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-5 w-[850px] shrink min-w-0">
              <div className="border border-border px-[18px] py-[6px] self-start">
                <span className="font-body text-body-sm text-ink">Как мы работаем</span>
              </div>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                От первого звонка до ключей — три простых шага
              </h2>
            </div>
            <p className="font-body text-[24px] leading-[1.6] text-secondary w-[692px] shrink min-w-0 pt-2">
              Мы сделали процесс покупки квартиры максимально простым: без лишней бюрократии,
              с поддержкой на каждом этапе.
            </p>
          </div>

          {/* Content */}
          <div className="flex items-start justify-between">

            {/* Left: photo */}
            <div className="w-[698px] h-[678px] shrink-0 rounded-[5px] overflow-hidden">
              <img
                src="/assets/about-company.png"
                alt="Как мы работаем"
                className="size-full object-cover"
              />
            </div>

            {/* Right: 3 steps — flex-1 with left offset matching Figma gap */}
            <div className="flex-1 min-w-0 flex flex-col ml-[57px]">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className="py-[40px] flex items-start gap-10">
                    {/* Step number */}
                    <span className="font-heading text-[22px] leading-[1.3] text-secondary shrink-0 mt-1">
                      {step.num}
                    </span>
                    {/* Step content */}
                    <div className="flex flex-col gap-4 min-w-0">
                      <p className="font-heading font-bold text-[34px] leading-[1.3] text-ink max-w-[256px]">
                        {step.title}
                      </p>
                      <p className="font-body text-[20px] leading-[1.6] text-secondary max-w-[651px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {i < steps.length - 1 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
