import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import { WhyUsCards } from '@/components/WhyUsCards'

// Instagram reels shown under the why-us cards.
const reels = ['DZpAXTcKF-O', 'DZCCGtOimnV', 'DYWhU01igXe', 'DYHg1XgDbAx']

// «Почему выбирают нас» (Figma 314:2944)
export default function WhyUsSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex flex-col gap-16 items-center">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 w-[1295px] max-w-full">
            <SectionTag>ПОЧЕМУ МЫ</SectionTag>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink text-center">
              Почему выбирают нас
            </h2>
          </div>

          {/* Service cards */}
          <WhyUsCards />

          {/* Instagram reels — 4 across. The embed's header/footer chrome is
              cropped out (offset iframe + overflow-hidden) so only the video
              shows; one button below opens the IG profile. */}
          <div className="flex flex-col gap-10 w-full">
            <div className="grid grid-cols-4 gap-6 w-full">
              {reels.map((id) => (
                <div key={id} className="relative h-[480px] overflow-hidden rounded-[10px] bg-black">
                  {/* iframe is taller than the tile and pulled up so the IG header
                      (top) and the likes/comments footer (bottom) are clipped —
                      only the video stays. Play works via the embed's own button. */}
                  <iframe
                    src={`https://www.instagram.com/reel/${id}/embed/`}
                    title={`Renaissance Development — reel ${id}`}
                    className="absolute left-1/2 -translate-x-1/2 top-[-58px] w-full h-[760px] border-0"
                    loading="lazy"
                    scrolling="no"
                    allow="encrypted-media; clipboard-write; picture-in-picture; web-share; autoplay; fullscreen"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/rbcompany.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 h-[56px] px-9 rounded-full bg-accent font-body font-medium text-[18px] text-white hover:bg-[#E85F00] transition-colors"
              >
                Открыть Instagram
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
