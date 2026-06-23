import { Container } from '@/components/Container'

const steps = [
  {
    num: 'Шаг 01',
    title: 'Выбираете квартиру',
    desc: 'Подбираете на сайте или звоните менеджеру — покажем свободные квартиры, планировки и цены по этажам. Приезжайте на объект или смотрите онлайн.',
  },
  {
    num: 'Шаг 02',
    title: 'Подписываете договор',
    desc: 'Фиксируем цену и условия рассрочки. Вносите первый взнос от 30% — квартира ваша. Без банка, без скрытых комиссий.',
  },
  {
    num: 'Шаг 03',
    title: 'Получаете ключи',
    desc: 'Выплачиваете остаток по графику и принимаете готовую квартиру. Мы сдаём в срок — потому что строим своими материалами и своей техникой.',
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
              Покупка квартиры не должна быть сложной. Мы выстроили процесс так, чтобы вы тратили
              минимум времени и получали максимум ясности на каждом этапе.
            </p>
          </div>

          {/* Content */}
          <div className="flex items-center gap-[72px]">

            {/* Left: photo */}
            <div className="w-[698px] h-[678px] shrink-0 rounded-[5px] overflow-hidden">
              <img
                src="/assets/home-process.png"
                alt="Команда Renaissance Development за работой"
                className="size-full object-cover"
              />
            </div>

            {/* Right: 3 steps — «Шаг 0X» + title stacked left, description right */}
            <div className="flex-1 min-w-0 flex flex-col">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className="py-[40px] flex items-center gap-[53px]">
                    {/* Step number + title */}
                    <div className="flex flex-col gap-[26px] shrink-0 w-[256px]">
                      <span className="font-body text-[22px] leading-[1.4] text-ink">{step.num}</span>
                      <p className="font-heading font-bold text-[34px] leading-[1.4] text-ink">
                        {step.title}
                      </p>
                    </div>
                    {/* Step description */}
                    <p className="font-body text-[20px] leading-[1.6] text-secondary flex-1 min-w-0">
                      {step.desc}
                    </p>
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
