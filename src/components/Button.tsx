import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { ArrowUpRight, Spinner } from '@/components/icons'
import { useLeadModalOptional } from '@/components/LeadModal'

type Variant = 'accent' | 'primary' | 'outline' | 'outlineLight' | 'white'
type Size = 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  /** lg = nav/hero CTA (pl32 pr16 py16); md = card "Show Details" (pl24 pr12 py12). */
  size?: Size
  /** Trailing arrow-in-circle. On by default. */
  withIcon?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  /** Internal route → react-router Link. */
  to?: string
  /** External URL → <a>. */
  href?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler
  'aria-label'?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-body font-medium text-[20px] whitespace-nowrap transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-50'

const sizeClasses: Record<Size, string> = {
  md: 'pl-6 pr-3 py-3 leading-[1.6]',
  lg: 'pl-8 pr-4 py-4 leading-[1.4]',
}

const variantClasses: Record<Variant, string> = {
  accent: 'bg-gold text-white shadow-[0_8px_24px_rgba(168,133,79,0.28)]',
  primary: 'bg-primary text-white hover:bg-[#2F3A45] active:bg-[#28313B]',
  white: 'bg-white text-ink hover:bg-bg-subtle active:bg-border',
  outline: 'border border-white text-white hover:bg-white hover:text-primary active:bg-bg-subtle',
  outlineLight: 'border border-primary text-primary hover:bg-primary hover:text-white',
}

// 28px arrow circle. Its text color drives the arrow color.
const circleClasses: Record<Variant, string> = {
  accent: 'bg-white text-primary',
  primary: 'bg-white text-primary',
  white: 'bg-white text-primary',
  outline: 'bg-white text-primary group-hover:bg-primary group-hover:text-white',
  outlineLight: 'bg-primary text-white group-hover:bg-white group-hover:text-primary',
}

export function Button({
  children,
  variant = 'accent',
  size = 'lg',
  withIcon = true,
  loading = false,
  disabled = false,
  className,
  to,
  href,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizeClasses[size], variantClasses[variant], className)
  const modal = useLeadModalOptional()

  const content = (
    <>
      <span>{children}</span>
      {withIcon && (
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
            circleClasses[variant],
          )}
        >
          {loading ? <Spinner className="size-[18px] animate-spin" /> : <ArrowUpRight className="size-[18px]" />}
        </span>
      )}
    </>
  )

  // CTAs pointing at /quote open the global lead modal instead of navigating.
  if (to === '/quote' && modal) {
    return (
      <button type="button" onClick={() => modal.openLead()} className={classes} {...rest}>
        {content}
      </button>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} aria-busy={loading} className={classes} {...rest}>
      {content}
    </button>
  )
}
