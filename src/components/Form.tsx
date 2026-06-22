import { useState, type FormEvent } from 'react'
import { Facebook, Instagram, Spinner, Telegram } from '@/components/icons'
import { TextField } from '@/components/form/TextField'
import { TextArea } from '@/components/form/TextArea'
import { cn } from '@/lib/cn'

const INSTAGRAM = 'rbcompany.uz'

function SocialChip({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex rounded-3xl border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
    >
      {children}
    </a>
  )
}

function Divider() {
  return <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
}

export type FormProps = {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  loading?: boolean
  className?: string
}

/**
 * Director-appeal form card (Figma 7768:2830). Vela font + green action color +
 * translucent-white fields on a dark surface. Decorative illustration/glows from
 * the full section (7768:2671) are added where the section is placed on a page.
 */
export function Form({ onSubmit, loading = false, className }: FormProps) {
  const [submitting, setSubmitting] = useState(false)
  const busy = loading || submitting

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (onSubmit) return onSubmit(e)
    // No backend yet — stub the busy state so the loading state is exercisable.
    setSubmitting(true)
    window.setTimeout(() => setSubmitting(false), 1200)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col items-center gap-16 rounded-2xl bg-white/10 p-6', className)}
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex w-[532px] gap-4">
            <TextField label="Как к вам обращаться?" name="name" placeholder="Введите своё имя" />
            <TextField label="Телефон номер" name="phone" type="tel" prefix="+998" placeholder="00 000-00-00" />
          </div>
          <TextArea label="Опишите свой вопрос" name="message" placeholder="Введите своё имя" className="w-[532px]" />
        </div>

        <div className="flex w-[532px] items-center justify-between gap-4">
          <p className="max-w-[313px] font-vela text-sm leading-[1.3] text-white">
            Отправляя этот запрос, вы соглашаетесь с{' '}
            <a href="/privacy" className="font-semibold text-green hover:underline">
              условиями обработки данных
            </a>
          </p>
          <button
            type="submit"
            disabled={busy}
            aria-busy={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-green px-7 py-3 font-vela text-sm font-bold leading-[20px] text-white transition-colors hover:bg-[#559b4e] active:bg-[#4c8a46] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy && <Spinner className="size-4 animate-spin" />}
            Отправить
          </button>
        </div>
      </div>

      <div className="flex w-[532px] items-center gap-6">
        <Divider />
        <div className="flex gap-4">
          <SocialChip href={`https://${INSTAGRAM}`} label="Telegram">
            <Telegram className="size-4" />
          </SocialChip>
          <SocialChip href={`https://${INSTAGRAM}`} label="Instagram">
            <Instagram className="size-4" />
          </SocialChip>
          <SocialChip href={`https://${INSTAGRAM}`} label="Facebook">
            <Facebook className="size-4" />
          </SocialChip>
        </div>
        <Divider />
      </div>
    </form>
  )
}
