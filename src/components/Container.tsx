import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Page content frame. Figma layouts are 1920-wide with the content column at
 * 1720 (100px gutters). At 2xl (≥1536, incl. 1920) gutters are the exact 100px
 * → 1720 column, pixel-perfect. Below 2xl (desktop-only floor 1280–1440) gutters
 * shrink to 60px to reclaim ~80px of content width so fixed-width sections fit.
 */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1920px] px-6 md:px-10 xl:px-[60px] 2xl:px-[100px]', className)}>{children}</div>
}
