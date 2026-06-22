import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { ArrowUpRight, Spinner } from '@/components/icons'

type Variant = 'accent' | 'outline' | 'white'
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
  accent: 'bg-accent text-white hover:bg-[#E85F00] active:bg-[#D65800]',
  white: 'bg-white text-primary hover:bg-bg-subtle active:bg-border',
  outline: 'border border-white text-white hover:bg-white hover:text-primary active:bg-bg-subtle',
}

// 28px arrow circle. Its text color drives the arrow color.
const circleClasses: Record<Variant, string> = {
  accent: 'bg-white text-primary',
  white: 'bg-primary text-white',
  outline: 'bg-white text-primary group-hover:bg-primary group-hover:text-white',
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
