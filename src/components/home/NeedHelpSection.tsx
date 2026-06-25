import { Container } from '@/components/Container'
import { useLeadModalOptional } from '@/components/LeadModal'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 30.0946 30.0946" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[38px]">
      <path
        d="M4.59459 1.37838H11.027L14.2432 9.41892L10.223 11.8311C11.9452 15.3231 14.7715 18.1494 18.2635 19.8716L20.6757 15.8514L28.7162 19.0676V25.5C28.7162 26.353 28.3774 27.1711 27.7742 27.7742C27.1711 28.3774 26.353 28.7162 25.5 28.7162C19.2272 28.335 13.3108 25.6713 8.86706 21.2275C4.42334 16.7838 1.75958 10.8674 1.37838 4.59459C1.37838 3.7416 1.71723 2.92354 2.32039 2.32039C2.92354 1.71723 3.7416 1.37838 4.59459 1.37838Z"
        stroke="white"
        strokeWidth="2.75676"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// «Вам нужна помощь?» CTA + form (Figma 7828:3982).
export default function NeedHelpSection() {
  const modal = useLeadModalOptional()
  return (
    <section className="bg-primary py-[80px]">
      <Container>
        <div className="flex items-center justify-between gap-8">

          {/* Left: heading + description + phone */}
          <div data-reveal="left" className="flex flex-col gap-[45px] w-[723px] shrink min-w-0">
            <div className="flex flex-col text-bg-subtle">
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3]">
                Вам нужна помощь?
              </h2>
              <p className="font-body text-[20px] leading-[1.6] w-[628px]">
                Обращайтесь к нам с любым вопросом или предложением через службу поддержки
              </p>
            </div>

            {/* Phone chip */}
            <div className="flex items-center gap-[22px]">
              <div className="flex items-center justify-center size-[66px] rounded-full bg-white/[0.06] border border-white/[0.12] shadow-[0_8px_33px_rgba(98,173,90,0.08)] shrink-0">
                <PhoneIcon />
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="font-vela text-[19px] leading-[1.3] text-white/60">Телефон для поддержки</p>
                <p className="font-vela text-[22px] font-semibold leading-[1.3] text-white">78-333-33-31</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div data-reveal="right" className="flex flex-col gap-5 w-[515px] shrink-0 min-w-0">

            {/* Name field */}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="needhelp-name" className="font-body font-medium text-[20px] text-bg-subtle leading-[1.6]">ФИО</label>
              <input
                id="needhelp-name"
                name="name"
                type="text"
                placeholder="Введите имя"
                className="h-[67px] bg-[#f8f8f8] border border-secondary rounded-[5px] px-6 font-body text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:border-primary/50"
              />
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="needhelp-phone" className="font-body font-medium text-[20px] text-bg-subtle leading-[1.6]">Номер телефона</label>
              <input
                id="needhelp-phone"
                name="phone"
                type="tel"
                placeholder="+998"
                className="h-[67px] bg-[#f8f8f8] border border-border rounded-[5px] px-6 font-body text-[18px] text-secondary/50 placeholder:text-secondary/50 outline-none focus:border-primary/50"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={() => modal?.openSuccess()}
              className="h-[56px] w-full bg-accent rounded-[5px] font-body font-medium text-[20px] text-white text-center leading-[1.6] hover:bg-[#A2814E] transition-colors"
            >
              Заказать звонок
            </button>

            {/* Privacy */}
            <p className="font-vela text-[14px] text-white leading-[1.3]">
              Отправляя этот запрос, вы соглашаетесь с{' '}
              <span className="font-semibold text-green">условиями обработки данных</span>
            </p>

          </div>
        </div>
      </Container>
    </section>
  )
}
