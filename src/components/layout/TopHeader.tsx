import { Container } from '@/components/Container'
import { ChevronDown, Instagram, Phone } from '@/components/icons'
import { useLeadModalOptional } from '@/components/LeadModal'
import { useTranslation, LANGS } from '@/i18n'

const PHONE = '78-333-33-31'
const INSTAGRAM = 'rbcompany.uz'
const INSTAGRAM_URL = 'https://www.instagram.com/rbcompany.uz/'

// Thin dark utility bar above the main navigation (Figma 7803:24664).
// Uses the Vela-Sans subsystem (font-vela) + green contact icons.
export default function TopHeader() {
  const modal = useLeadModalOptional()
  const { t, lang, setLang } = useTranslation()
  return (
    <div className="bg-dark text-white">
      <Container>
        <div className="flex h-[42px] items-center justify-between">
          {/* Contact data */}
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-center gap-2">
              <Phone className="size-4 text-green" />
              <span className="font-vela text-xs font-medium leading-[1.3]">{PHONE}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 max-sm:hidden"
            >
              <Instagram className="size-4 text-green" />
              <span className="font-vela text-xs font-medium leading-[1.3]">{INSTAGRAM}</span>
            </a>
          </div>

          {/* Links + language */}
          <div className="flex items-center gap-[40px] max-lg:gap-0">
            <div className="flex gap-4 font-vela text-xs font-medium leading-[1.3] text-white/60 max-lg:hidden">
              <a
                href="/renaissance-catalog.pdf"
                download="Renaissance-Development-katalog.pdf"
                className="transition-colors hover:text-white"
              >
                {t('header.downloadCatalog')}
              </a>
              <button type="button" onClick={() => modal?.openLead('Обращение к директору')} className="transition-colors hover:text-white">
                {t('header.directorAppeal')}
              </button>
            </div>

            {/* Language switcher */}
            <div className="group relative">
              <button type="button" className="flex items-center gap-1 text-white/60 transition-colors hover:text-white">
                <span className="font-vela text-sm font-medium leading-[1.3]">{t(`lang.${lang}`)}</span>
                <ChevronDown className="size-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="min-w-[140px] overflow-hidden rounded-lg border border-white/10 bg-dark py-1 shadow-xl">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      className={`block w-full px-4 py-2 text-left font-vela text-sm transition-colors hover:bg-white/10 ${lang === l.code ? 'text-white' : 'text-white/60'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
