import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import WhyUsSection from '@/components/home/WhyUsSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import ProductionSection from '@/components/home/ProductionSection'
import FAQSection from '@/components/home/FAQSection'
import StatsSection from '@/components/home/StatsSection'
import PartnersSection from '@/components/home/PartnersSection'
import ProjectsMapSection from '@/components/home/ProjectsMapSection'
import { useTranslation } from '@/i18n'

export default function About() {
  const { t } = useTranslation()
  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary to-primary/80 py-[72px]">
        <Container>
          <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.3] text-bg-subtle">
            {t('nav.about')}
          </h1>
        </Container>
      </section>

      {/* ── 2. Company description ──────────────────────────── */}
      <section className="bg-bg-subtle py-[84px]">
        <Container>
          <h2 className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.1] text-ink mb-[32px]">
            Renaissance Development
          </h2>
          <div className="flex flex-col gap-[20px] font-body text-[22px] 2xl:text-[26px] leading-[1.6] text-ink">
            <p>{t('pages.about.companyP1')}</p>
            <p>{t('pages.about.companyP2')}</p>
            <p>{t('pages.about.companyP3')}</p>
            <p>{t('pages.about.companyP4')}</p>
          </div>
        </Container>
      </section>

      {/* ── 3. Team section ────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-end justify-between gap-16 mb-[60px]">
            <div className="flex flex-col gap-5 max-w-[820px]">
              <SectionTag>{t('pages.about.teamTag')}</SectionTag>
              <h2 className="font-heading text-[44px] max-md:text-[27px] 2xl:text-[56px] font-bold uppercase leading-[1.15] text-ink">
                {t('pages.about.teamTitle')}
              </h2>
            </div>
            <p className="font-body text-[20px] leading-[1.6] text-secondary w-[520px] shrink-0">
              {t('pages.about.teamDesc')}
            </p>
          </div>

          {/* CEO photo — centered, with name card overlapping bottom (Figma 7801:3087) */}
          <div className="flex justify-center">
            <div className="relative w-[406px]">
              <div className="h-[495px] overflow-hidden">
                <img loading="lazy" decoding="async"
                  src="/assets/director-photo.webp"
                  alt={t('pages.about.ceoPhotoAlt')}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute left-4 right-4 bottom-4 bg-white/95 backdrop-blur-md px-[24px] py-[16px]">
                <p className="font-heading text-[20px] font-bold text-ink">{t('pages.about.ceoName')}</p>
                <p className="font-body text-[16px] text-secondary mt-1">{t('pages.about.ceoRole')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Stats — shared section (animated count-up) ── */}
      <StatsSection />

      {/* ── 5. Production — shared carousel (same slides as Home) ── */}
      <ProductionSection />

      {/* ── 6. Partners — shared section (looping logo marquee) ── */}
      <PartnersSection />

      {/* ── 7. Why us — shared section (identical to Home) ──── */}
      <WhyUsSection />

      {/* ── 8. Need Help ───────────────────────────────────── */}
      <NeedHelpSection />

      {/* ── 9. FAQ ─────────────────────────────────────────── */}
      <FAQSection />

      {/* ── 9.5. Projects map — shared section ──────────────── */}
      <ProjectsMapSection />

      {/* ── 10. Projects — shared section (filter: жилые / бизнес-центры) ── */}
      <ProjectsSection />
    </main>
  )
}
