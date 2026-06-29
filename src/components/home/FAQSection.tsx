'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { useTranslation } from '@/i18n'

const COUNT = 6

// FAQ accordion (Figma 314:3272).
// Left: badge + h2 + description. Right (flex-1): 6 accordion items with dividers.
export default function FAQSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-white py-[100px] max-md:!py-[56px]">
      <Container>
        <div className="flex items-start gap-[105px] max-lg:!flex-col max-lg:gap-10">

          {/* Left column */}
          <div data-reveal="left" className="flex flex-col gap-5 w-[665px] max-lg:!w-full shrink-0">
            <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.faq.tag')}</span>
            </div>
            <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
              {t('home.faq.title')}
            </h2>
            <p className="font-body text-[20px] leading-[1.6] text-secondary w-[575px] max-w-full">
              {t('home.faq.desc')}
            </p>
          </div>

          {/* Right column: accordion */}
          <div data-reveal="right" className="flex-1 min-w-0 flex flex-col">
            {Array.from({ length: COUNT }, (_, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-[30px] text-left gap-4"
                >
                  <span className="font-heading font-medium text-[25px] leading-[1.3] text-ink flex-1 min-w-0 max-w-[700px]">
                    {t(`home.faq.items.${i}.q`)}
                  </span>
                  <span className="text-[32px] leading-none text-ink shrink-0">
                    {open === i ? '×' : '+'}
                  </span>
                </button>

                {open === i && (
                  <p className="font-body text-[16px] leading-[1.6] text-secondary pb-[30px]">
                    {t(`home.faq.items.${i}.a`)}
                  </p>
                )}

                <div className="h-px bg-border" />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
