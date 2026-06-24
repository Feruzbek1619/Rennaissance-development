import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reveals elements marked with `data-reveal` as they enter the viewport.
 * Progressive enhancement: the hidden styles only apply once `.reveal-ready` is
 * on <html>, so without JS the content stays fully visible.
 *
 * Uses scroll/resize listeners + a MutationObserver (not IntersectionObserver)
 * so it works reliably even when route content mounts after this effect runs
 * (React Router's startTransition defers it) and in environments where IO/rAF
 * are throttled.
 */
export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const SELECTOR = '[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible)'

    const reveal = () => {
      const vh = window.innerHeight || root.clientHeight || 800
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-visible')
      })
    }

    // Time-based throttle (no rAF, so it also runs in throttled/headless envs).
    let scheduled = false
    const onScroll = () => {
      if (scheduled) return
      scheduled = true
      window.setTimeout(() => {
        scheduled = false
        reveal()
      }, 100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Catch route content that mounts after this effect (deferred render).
    const mo = new MutationObserver(onScroll)
    mo.observe(document.body, { childList: true, subtree: true })

    // Initial passes: a slight delay lets the first paint happen at opacity 0
    // so above-the-fold elements actually animate in; later passes are safety.
    const timers = [60, 250, 700, 1500].map((d) => window.setTimeout(reveal, d))

    // Absolute safety net: whatever happens (broken viewport metrics, no scroll
    // events, etc.), never leave content stuck hidden — reveal everything.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(SELECTOR)
        .forEach((el) => el.classList.add('is-visible'))
    }, 2500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mo.disconnect()
      timers.forEach(clearTimeout)
      clearTimeout(safety)
    }
  }, [pathname])
}
