import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reveals elements marked with `data-reveal` / `data-reveal-stagger` as they
 * actually scroll into view — each one animates in only when it reaches the
 * viewport (NOT pre-revealed), so the scroll feels alive.
 *
 * Progressive enhancement: the hidden styles only apply once `.reveal-ready` is
 * on <html>, so without JS the content stays fully visible. IntersectionObserver
 * is the primary trigger; a throttled scroll/resize pass is a viewport-aware
 * backup. Both only reveal elements at/above the viewport — nothing below the
 * fold is revealed early, which is what was killing the on-scroll animations.
 */
export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const SELECTOR = '[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible)'
    const show = (el: Element) => el.classList.add('is-visible')

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  show(e.target)
                  obs.unobserve(e.target)
                }
              })
            },
            { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
          )
        : null

    // Viewport-aware pass (backup for envs where IO is throttled). Only reveals
    // what's already at/above the fold — never anything still below it.
    const revealInView = () => {
      const vh = window.innerHeight || root.clientHeight || 800
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) show(el)
      })
    }

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => io?.observe(el))
    }

    let scheduled = false
    const onScroll = () => {
      if (scheduled) return
      scheduled = true
      window.setTimeout(() => {
        scheduled = false
        revealInView()
      }, 80)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Re-scan when route content mounts after this effect (deferred render).
    const mo = new MutationObserver(() => {
      observeAll()
      revealInView()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Initial passes catch above-the-fold + late-mounting content.
    observeAll()
    const timers = [60, 300, 900].map((d) =>
      window.setTimeout(() => {
        observeAll()
        revealInView()
      }, d),
    )

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mo.disconnect()
      io?.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [pathname])
}
