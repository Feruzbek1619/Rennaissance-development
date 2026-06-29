'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { sendLead, objectFromPath } from '@/lib/lead'
import { useTranslation } from '@/i18n'

// ── Global lead-capture modal (Figma 7810:4938 form + 7807:2027 success) ──
// Opened by every "Заказать звонок" / "Оставить заявку" CTA across the site.
// On submit the lead is sent to the Telegram group with the project (object) it
// came from, so the team knows which object the client is interested in.

type Mode = 'closed' | 'form' | 'success'

type LeadModalCtx = {
  /**
   * Open the form. `object` is the canonical (Russian) name sent to Telegram so
   * the sales team sees stable object names; `displayObject` is the localized
   * label shown to the user in the modal (defaults to `object`). Omit both to
   * derive the object from the URL.
   */
  openLead: (object?: string, displayObject?: string) => void
  openSuccess: () => void
  close: () => void
}

const Ctx = createContext<LeadModalCtx | null>(null)

/** Returns the modal controls, or null when rendered outside the provider. */
export function useLeadModalOptional() {
  return useContext(Ctx)
}

export function useLeadModal() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLeadModal must be used within <LeadModalProvider>')
  return ctx
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[64px]" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#BE9C68" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const labelCls = 'font-vela text-[16px] font-semibold text-white leading-[1.3]'
const fieldCls =
  'w-full bg-[#ededed] border border-white/10 rounded-[6px] px-4 font-vela text-[16px] text-secondary placeholder:text-[#77797b] outline-none focus:ring-2 focus:ring-accent'

function ModalShell({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('lead.close')}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-default motion-safe:animate-[fadeIn_.2s_ease-out]"
      />
      {/* Card */}
      <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[10px] bg-primary p-7 sm:p-9 motion-safe:animate-[modalIn_.25s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label={t('lead.close')}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}

function LeadForm({ object, displayObject, onSuccess }: { object?: string; displayObject?: string; onSuccess: () => void }) {
  const { t } = useTranslation()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '')
    const phone = String(fd.get('phone') ?? '')
    const question = String(fd.get('question') ?? '')
    setError(false)
    setSending(true)
    const ok = await sendLead({ name, phone, question, object })
    setSending(false)
    if (ok) onSuccess()
    else setError(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5 pr-8">
        <h2 className="font-heading text-[30px] sm:text-[34px] font-bold uppercase leading-none text-bg-subtle">
          {t('common.leaveRequest')}
        </h2>
        {object ? (
          <p className="font-vela text-[15px] leading-[1.4] text-[#c7c7c7]">
            {t('lead.objectLabel')} <span className="font-semibold text-accent">{displayObject || object}</span>
          </p>
        ) : null}
        <p className="font-vela text-[15px] leading-[1.4] text-[#c7c7c7]">
          {t('lead.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="lead-name" className={labelCls}>{t('lead.name')}</label>
            <input id="lead-name" name="name" type="text" placeholder={t('lead.namePlaceholder')} className={`${fieldCls} h-[48px]`} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lead-phone" className={labelCls}>{t('lead.phone')}</label>
            <input id="lead-phone" name="phone" type="tel" required placeholder={t('lead.phonePlaceholder')} className={`${fieldCls} h-[48px]`} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lead-q" className={labelCls}>{t('lead.question')}</label>
            <textarea id="lead-q" name="question" rows={3} placeholder={t('lead.questionPlaceholder')} className={`${fieldCls} py-3 resize-none`} />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="submit"
            disabled={sending}
            className="h-[52px] w-full rounded-[6px] bg-accent font-vela text-[19px] font-semibold text-white hover:bg-[#A2814E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? t('lead.sending') : t('common.leaveRequest')}
          </button>
          {error ? (
            <p className="font-vela text-[13px] text-[#ff9b9b] leading-[1.3]">
              {t('lead.error')}
            </p>
          ) : null}
          <p className="font-vela text-[13px] text-secondary leading-[1.3]">
            {t('lead.privacyPrefix')}
            <span className="font-semibold">{t('lead.privacyLink')}</span>
          </p>
        </div>
      </div>
    </form>
  )
}

function SuccessBody({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center text-center gap-5 py-3">
      <CheckIcon />
      <div className="flex flex-col gap-2.5">
        <h2 className="font-heading text-[28px] sm:text-[32px] font-bold uppercase leading-[1.1] text-bg-subtle">
          {t('lead.successTitle')}
        </h2>
        <p className="font-vela text-[15px] leading-[1.4] text-[#c7c7c7] max-w-[440px]">
          {t('lead.successText')}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-1 h-[52px] w-full max-w-[360px] rounded-[6px] bg-accent font-vela text-[19px] font-semibold text-white hover:bg-[#A2814E] transition-colors"
      >
        {t('lead.ok')}
      </button>
    </div>
  )
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('closed')
  const [object, setObject] = useState<string>('')
  const [display, setDisplay] = useState<string>('')

  const openLead = useCallback((obj?: string, displayObject?: string) => {
    const o = obj ?? objectFromPath()
    setObject(o)
    setDisplay(displayObject ?? o)
    setMode('form')
  }, [])
  const openSuccess = useCallback(() => setMode('success'), [])
  const close = useCallback(() => setMode('closed'), [])

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (mode === 'closed') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mode, close])

  return (
    <Ctx.Provider value={{ openLead, openSuccess, close }}>
      {children}
      {mode !== 'closed' && (
        <ModalShell onClose={close}>
          {mode === 'form' ? <LeadForm object={object} displayObject={display} onSuccess={openSuccess} /> : <SuccessBody onClose={close} />}
        </ModalShell>
      )}
    </Ctx.Provider>
  )
}
