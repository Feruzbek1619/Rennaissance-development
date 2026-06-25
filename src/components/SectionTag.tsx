import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

// Elegant section label: a hairline gold rule + letter-spaced caps (no boxy
// border). w-fit so it left-aligns in items-start columns and centers in
// items-center.
export function SectionTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex w-fit items-center gap-3', className)}>
      <span className="rule-gold shrink-0" aria-hidden />
      <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">
        {children}
      </span>
    </div>
  )
}
