import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { ArrowUpRight } from '@/components/icons'
import { useTranslation } from '@/i18n'

// Error page (Figma 7802:9441): white hero with the "Under construction"
// isometric illustration + a single "back home" pill. Footer comes from RootLayout.
export default function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="bg-white">
      <Container>
        <div className="flex flex-col items-center justify-center gap-[40px] pt-[90px] max-md:!pt-[48px] pb-[120px] max-md:!pb-[56px] text-center">
          <img loading="lazy" decoding="async"
            src="/assets/error-illustration.webp"
            alt={t('common.notFoundAlt')}
            className="w-full max-w-[620px] h-auto select-none"
          />
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink pl-8 pr-4 py-4 font-body font-medium text-[20px] leading-[1.4] text-white transition-colors duration-200 hover:bg-ink/85"
          >
            {t('common.notFoundBack')}
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-ink">
              <ArrowUpRight className="size-[18px]" />
            </span>
          </Link>
        </div>
      </Container>
    </main>
  )
}
