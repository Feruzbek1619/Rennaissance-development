'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

// ── Global lead-capture modal (Figma 7810:4938 form + 7807:2027 success) ──
// Opened by every "Заказать звонок" / "Оставить заявку" CTA across the site.

type Mode = 'closed' | 'form' | 'success'

type LeadModalCtx = {
  openLead: () => void
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
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF6701" />
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

const labelCls = 'font-vela text-[20px] font-semibold text-white leading-[1.3]'
const fieldCls =
  'w-full bg-[#ededed] border border-white/10 rounded-[6px] px-5 font-vela text-[18px] text-secondary placeholder:text-[#77797b] outline-none focus:ring-2 focus:ring-accent'

function ModalShell({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-default motion-safe:animate-[fadeIn_.2s_ease-out]"
      />
      {/* Card */}
      <div className="relative w-full max-w-[823px] max-h-[90vh] overflow-y-auto rounded-[10px] bg-primary p-6 sm:p-10 2xl:p-[52px] motion-safe:animate-[modalIn_.25s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}

function LeadForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex flex-col gap-[40px]"
    >
      <div className="flex flex-col gap-[15px] pr-10">
        <h2 className="font-heading text-[40px] sm:text-[52px] font-bold uppercase leading-none text-bg-subtle">
          Оставить заявку
        </h2>
        <p className="font-vela text-[18px] sm:text-[22px] leading-[1.3] text-[#c7c7c7]">
          Мы свяжемся с вами через 5 минут. Сообщите нам свой номер телефона, чтобы мы могли вам перезвонить
        </p>
      </div>

      <div className="flex flex-col gap-[25px]">
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="lead-name" className={labelCls}>Ваше имя</label>
            <input id="lead-name" name="name" type="text" placeholder="Введите имя" className={`${fieldCls} h-[59px]`} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="lead-phone" className={labelCls}>Номер телефона</label>
            <input id="lead-phone" name="phone" type="tel" placeholder="Введите номер" className={`${fieldCls} h-[59px]`} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="lead-q" className={labelCls}>Опишите свой вопрос</label>
            <textarea id="lead-q" name="question" rows={4} placeholder="Введите свой вопрос" className={`${fieldCls} py-4 resize-none`} />
          </div>
        </div>

        <div className="flex flex-col gap-[13px]">
          <button
            type="submit"
            className="h-[72px] w-full rounded-[6px] bg-accent font-vela text-[28px] font-semibold text-white hover:bg-[#E85F00] transition-colors"
          >
            Оставить заявку
          </button>
          <p className="font-vela text-[16px] text-secondary leading-[1.3]">
            Отправляя этот запрос, вы соглашаетесь с{' '}
            <span className="font-semibold">условиями обработки данных</span>
          </p>
        </div>
      </div>
    </form>
  )
}

function SuccessBody({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-6">
      <CheckIcon />
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-[34px] sm:text-[44px] font-bold uppercase leading-[1.1] text-bg-subtle">
          Ваша заявка принята
        </h2>
        <p className="font-vela text-[18px] leading-[1.4] text-[#c7c7c7] max-w-[560px]">
          Наши заботливые администраторы свяжутся с вами в ближайшее время
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 h-[64px] w-full max-w-[420px] rounded-[6px] bg-accent font-vela text-[24px] font-semibold text-white hover:bg-[#E85F00] transition-colors"
      >
        Хорошо
      </button>
    </div>
  )
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('closed')

  const openLead = useCallback(() => setMode('form'), [])
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
          {mode === 'form' ? <LeadForm onSubmit={openSuccess} /> : <SuccessBody onClose={close} />}
        </ModalShell>
      )}
    </Ctx.Provider>
  )
}
