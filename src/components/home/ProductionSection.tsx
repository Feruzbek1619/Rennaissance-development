'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useTranslation } from '@/i18n'

const slides = [
  { image: '/assets/prod-concrete.webp', to: '/b2b#concrete' },
  { image: '/assets/prod-travertine.webp', to: '/b2b#travertine' },
  { image: '/assets/prod-ventilation.webp', to: '/b2b#ventilation' },
  { image: '/assets/prod-aluminum.webp', to: '/b2b#aluminum' },
  { image: '/assets/prod-cranes.webp', to: '/b2b#cranes' },
]

// «Производство» (Figma 7769:3522 + 7827:2226-2307).
export default function ProductionSection() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  const go = (next: number) => setCurrent(next)
  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = () => go((current + 1) % slides.length)

  return (
    <section className="bg-bg-subtle pt-[76px] pb-[60px]">
      <Container>
        <div className="flex flex-col gap-8">

          {/* Header */}
          <div data-reveal className="flex flex-col gap-5">
            <div className="flex w-fit items-center gap-3 self-start">
              <span className="rule-gold shrink-0" aria-hidden></span>
              <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.production.tag')}</span>
            </div>
            <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
              {t('home.production.title')}
            </h2>
          </div>

          {/* Slider viewport — the whole white panel slides as one unit */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div
                  key={slide.to}
                  className="w-full shrink-0 bg-white min-h-[759px] flex items-center gap-8 2xl:gap-[57px] px-9 py-[46px]"
                >
                  {/* Photo */}
                  <div className="w-[52%] max-w-[940px] h-[667px] shrink-0 min-w-0 overflow-hidden">
                    <img loading="lazy" decoding="async" src={slide.image} alt={t(`home.production.slides.${i}.title`)} className="size-full object-cover" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col gap-[60px]">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-[5px]">
                        <p className="font-heading text-[51px] max-md:text-[30px] font-bold uppercase leading-[1.3] text-ink">
                          {t(`home.production.slides.${i}.title`)}
                        </p>
                        <p className="font-heading text-[20px] font-bold uppercase leading-[1.3] text-ink">
                          {t(`home.production.slides.${i}.subtitle`)}
                        </p>
                      </div>
                      <p className="font-body text-[22px] leading-[1.6] text-secondary">
                        {t(`home.production.slides.${i}.desc`)}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                      <Button to={slide.to} variant="primary" size="lg">
                        {t('common.learnMore')}
                      </Button>
                      <Button to="/quote" variant="outlineLight" size="lg">
                        {t('common.leaveRequest')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel navigation */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label={t('common.prev')}
              className="flex size-[65px] items-center justify-center rounded-full bg-primary/50 text-white transition-colors hover:bg-primary"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t('common.next')}
              className="flex size-[65px] items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-[#2F3A45]"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

        </div>
      </Container>
    </section>
  )
}
