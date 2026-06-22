import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextFieldProps = {
  label: string
  /** Static prefix inside the field, e.g. "+998". */
  prefix?: string
  error?: string | boolean
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

/**
 * Dark-form text input (Figma 7768:2836). Vela font, translucent white fill.
 * States: default · focus (border white/30) · filled · error · disabled.
 */
export function TextField({ label, prefix, error, disabled, className, ...input }: TextFieldProps) {
  const hasError = Boolean(error)
  return (
    <div className={cn('flex min-w-0 flex-1 flex-col gap-2', className)}>
      <label className="font-vela text-sm font-semibold leading-[1.3] text-white">{label}</label>
      <div
        className={cn(
          'flex h-10 items-center rounded-lg border bg-white/10 transition-colors',
          hasError ? 'border-[#EF4444]' : 'border-white/10 focus-within:border-white/30',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {prefix && <span className="pl-[15px] font-vela text-sm leading-[1.4] text-white">{prefix}</span>}
        <input
          disabled={disabled}
          className={cn(
            'h-full w-full bg-transparent font-vela text-sm leading-[1.4] text-white outline-none placeholder:text-muted-field disabled:cursor-not-allowed',
            prefix ? 'pl-2 pr-[15px]' : 'px-[15px]',
          )}
          {...input}
        />
      </div>
      {typeof error === 'string' && error && <span className="font-vela text-xs text-[#EF4444]">{error}</span>}
    </div>
  )
}
