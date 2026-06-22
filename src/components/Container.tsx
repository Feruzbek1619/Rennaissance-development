import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Page content frame. Figma layouts are 1920-wide with the content column at
 * 1720 (100px gutters). max-w-[1920px] + xl:px-[100px] reproduces that exactly
 * at 1920 and keeps the column ≤1720, centered, on wider screens; smaller
 * breakpoints shrink the gutter so content never touches the edge.
 */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1920px] px-6 md:px-10 xl:px-[100px]', className)}>{children}</div>
}
