import { useState } from 'react'
import { Container } from '@/components/Container'
import { useLeadModalOptional } from '@/components/LeadModal'
import { useTranslation } from '@/i18n'

const COUNT = 6

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
        <span className="font-heading text-[25px] font-medium leading-[1.4] text-ink w-[700px] max-lg:!w-full">
          {question}
        </span>
        <PlusIcon open={open} />
      </button>
      {open && (
        <p className="font-body text-[16px] leading-[1.6] text-secondary pb-[24px] w-[882px] max-w-full">
          {answer}
        </p>
      )}
      <div className="h-px bg-border" />
    </div>
  )
}

export default function FAQ() {
  const modal = useLeadModalOptional()
  const { t } = useTranslation()
  const field =
    'h-[59px] bg-[#ededed] border border-white/10 rounded-[5px] px-5 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent'
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/70 py-[72px] max-md:!py-[44px]">
        <Container>
          <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.3] text-bg-subtle">
            {t('home.faq.title')}
          </h1>
        </Container>
      </section>

      {/* ── FAQ accordion ────────────────────────────────── */}
      <section className="bg-white py-[100px] max-md:!py-[56px]">
        <Container>
          <div className="max-w-[950px]">
            {Array.from({ length: COUNT }, (_, i) => (
              <FAQItem key={i} question={t(`home.faq.items.${i}.q`)} answer={t(`home.faq.items.${i}.a`)} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Need Help (extended form + image) ────────────── */}
      <section className="bg-primary py-[52px]">
        <Container>
          <div className="flex items-stretch gap-[56px] max-lg:!flex-col max-lg:gap-10">
            {/* Left: form */}
            <div className="flex flex-col gap-[27px] w-[730px] max-lg:!w-full shrink-0">
              <div className="flex flex-col gap-[15px]">
                <h2 className="font-heading text-[59px] font-bold uppercase leading-none text-bg-subtle">
                  {t('home.needhelp.title')}
                </h2>
                <p className="font-vela text-[24px] leading-[1.3] text-white/70">
                  {t('home.needhelp.desc')}
                </p>
              </div>

              <div className="flex flex-col gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="faq-name" className="font-vela text-[21px] font-semibold text-white leading-[1.3]">{t('lead.name')}</label>
                  <input id="faq-name" name="name" type="text" placeholder={t('lead.namePlaceholder')} className={field} />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="faq-phone" className="font-vela text-[21px] font-semibold text-white leading-[1.3]">{t('lead.phone')}</label>
                  <input id="faq-phone" name="phone" type="tel" placeholder={t('lead.phonePlaceholder')} className={field} />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="faq-question" className="font-vela text-[21px] font-semibold text-white leading-[1.3]">{t('lead.question')}</label>
                  <textarea
                    id="faq-question"
                    name="question"
                    placeholder={t('lead.questionPlaceholder')}
                    rows={4}
                    className="bg-[#ededed] border border-white/10 rounded-[5px] px-5 py-3 font-vela text-[18px] text-secondary placeholder:text-secondary/50 outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[13px]">
                <button
                  type="button"
                  onClick={() => modal?.openSuccess()}
                  className="w-full h-[62px] bg-accent rounded-[5px] font-vela text-[22px] font-semibold text-white hover:bg-[#A2814E] transition-colors"
                >
                  {t('common.leaveRequest')}
                </button>
                <p className="font-vela text-[17px] text-secondary leading-[1.3]">
                  {t('lead.privacyPrefix')}
                  <span className="font-semibold text-secondary">{t('lead.privacyLink')}</span>
                </p>
              </div>
            </div>

            {/* Right: image */}
            <div className="flex-1 min-h-[500px] overflow-hidden relative">
              <img loading="lazy" decoding="async"
                src="/assets/project-alandalus.webp"
                alt="Renaissance Development"
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
