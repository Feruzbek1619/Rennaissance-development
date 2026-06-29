import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import { WhyUsCards } from '@/components/WhyUsCards'
import { useTranslation } from '@/i18n'

// Instagram reels shown under the why-us cards (5 across, reel-sized 9:16).
const reels = ['DZpAXTcKF-O', 'DZCCGtOimnV', 'DYWhU01igXe', 'DYHg1XgDbAx', 'DX1fZI9o6My']

// «Почему выбирают нас» (Figma 314:2944)
export default function WhyUsSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-[100px] max-md:!py-[56px]">
      <Container>
        <div className="flex flex-col gap-16 items-center">

          {/* Header */}
          <div data-reveal className="flex flex-col items-center gap-4 w-[1295px] max-w-full">
            <SectionTag>{t('home.whyus.tag')}</SectionTag>
            <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink text-center">
              {t('home.whyus.title')}
            </h2>
          </div>

          {/* Service cards */}
          <WhyUsCards />

          {/* Instagram reels — 5 across, reel-sized 9:16. The embed renders the
              vertical video at full width, so a 9:16 tile + a header-height pull-up
              shows ONLY the video; the IG header (top) and the likes / "View more"
              / comments footer (bottom) fall outside the tile and are clipped. */}
          <div className="flex flex-col gap-10 w-full">
            <div className="grid grid-cols-5 max-lg:!grid-cols-2 max-sm:!grid-cols-1 gap-4 w-full">
              {reels.map((id, i) => (
                <div
                  key={id}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="relative aspect-[9/16] overflow-hidden rounded-[12px] bg-black"
                >
                  {/* iframe is scaled wider than the tile so the embed's video
                      fills the full 9:16 frame; the header (top), footer (likes /
                      View more / comments, bottom) and side gutters all fall
                      outside the tile and are clipped — only the reel shows. */}
                  <iframe
                    src={`https://www.instagram.com/reel/${id}/embed/`}
                    title={`Renaissance Development — reel ${id}`}
                    className="absolute left-1/2 -translate-x-1/2 top-[-78px] w-[145%] h-[1300px] border-0"
                    loading="lazy"
                    scrolling="no"
                    allow="encrypted-media; clipboard-write; picture-in-picture; web-share; autoplay; fullscreen"
                  />
                </div>
              ))}
            </div>

            <div data-reveal className="flex justify-center">
              <a
                href="https://www.instagram.com/rbcompany.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 h-[56px] px-9 rounded-full bg-accent font-body font-medium text-[18px] text-white hover:bg-[#A2814E] transition-colors"
              >
                {t('home.whyus.instagram')}
                <svg viewBox="0 0 24 24" fill="none" className="size-5">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
