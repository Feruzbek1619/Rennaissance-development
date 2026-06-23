import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

// Consistent bordered section label chip (Figma: ~px24 / py16, 56px tall).
// w-fit so it left-aligns in items-start columns and centers in items-center.
export function SectionTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('w-fit border border-border px-[24px] py-[16px]', className)}>
      <span className="font-body text-body-sm text-ink leading-none">{children}</span>
    </div>
  )
}
