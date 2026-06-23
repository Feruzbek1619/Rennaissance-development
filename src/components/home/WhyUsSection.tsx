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

          {/* Instagram reels — 4 across */}
          <div className="grid grid-cols-4 gap-6 w-full">
            {reels.map((id) => (
              <div key={id} className="relative w-full h-[720px] overflow-hidden rounded-[8px] bg-black">
                <iframe
                  src={`https://www.instagram.com/reel/${id}/embed/`}
                  title={`Renaissance Development — reel ${id}`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  scrolling="no"
                  allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
