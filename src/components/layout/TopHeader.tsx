import { Container } from '@/components/Container'
import { ChevronDown, FlagRU, Instagram, Phone } from '@/components/icons'
import { useLeadModalOptional } from '@/components/LeadModal'

const PHONE = '78-333-33-31'
const INSTAGRAM = 'rbcompany.uz'
const INSTAGRAM_URL = 'https://www.instagram.com/rbcompany.uz/'

// Thin dark utility bar above the main navigation (Figma 7803:24664).
// Uses the Vela-Sans subsystem (font-vela) + green contact icons.
export default function TopHeader() {
  const modal = useLeadModalOptional()
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
              className="flex items-center gap-2"
            >
              <Instagram className="size-4 text-green" />
              <span className="font-vela text-xs font-medium leading-[1.3]">{INSTAGRAM}</span>
            </a>
          </div>

          {/* Links + language */}
          <div className="flex items-start gap-[63px]">
            <div className="flex gap-4 font-vela text-xs font-medium leading-[1.3] text-white/60">
              <button type="button" onClick={() => modal?.openLead()} className="transition-colors hover:text-white">
                Скачать каталог
              </button>
              <button type="button" onClick={() => modal?.openLead()} className="transition-colors hover:text-white">
                Обращение к директору
              </button>
            </div>
            <div className="flex items-center gap-2">
              <FlagRU className="size-[18px]" />
              <button type="button" className="flex items-center gap-1 text-white/60 transition-colors hover:text-white">
                <span className="font-vela text-sm font-medium leading-[1.3]">Русский</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
