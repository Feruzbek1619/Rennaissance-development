import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextAreaProps = {
  label: string
  error?: string | boolean
  className?: string
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

/** Dark-form textarea (Figma 7768:2845). Matches TextField styling, h-20. */
export function TextArea({ label, error, disabled, className, ...textarea }: TextAreaProps) {
  const hasError = Boolean(error)
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="font-vela text-sm font-semibold leading-[1.3] text-white">{label}</label>
      <div
        className={cn(
          'h-20 rounded-lg border bg-white/10 transition-colors',
          hasError ? 'border-[#EF4444]' : 'border-white/10 focus-within:border-white/30',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <textarea
          disabled={disabled}
          className="size-full resize-none bg-transparent px-[15px] py-2 font-vela text-sm leading-[1.4] text-white outline-none placeholder:text-muted-field disabled:cursor-not-allowed"
          {...textarea}
        />
      </div>
      {typeof error === 'string' && error && <span className="font-vela text-xs text-[#EF4444]">{error}</span>}
    </div>
  )
}
