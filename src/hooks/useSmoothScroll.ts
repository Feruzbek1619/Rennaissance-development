import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Premium inertia / smooth scrolling (à la newport.uz / apexdev.uz).
 *
 * Safety: Lenis drives scrolling from a requestAnimationFrame loop. We only
 * start it AFTER confirming one rAF tick actually fires — so in environments
 * where rAF is throttled/dead (background tabs, some headless setups) native
 * scrolling is left fully intact and never freezes. Disabled for users who
 * prefer reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let lenis: Lenis | null = null
    let rafId = 0

    // Probe: if this rAF never runs, we never start Lenis (native scroll stays).
    const probe = requestAnimationFrame(() => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      })
      const loop = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(probe)
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
