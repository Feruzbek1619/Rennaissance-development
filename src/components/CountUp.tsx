import { useEffect, useRef, useState } from 'react'

/**
 * Animated number that counts up from 0 to its target the first time it scrolls
 * into view (like a timer). Accepts a display string like "12+", "5+", "2021" —
 * it animates the leading number and keeps any suffix ("+"). Falls back to the
 * raw string for non-numeric values.
 *
 * Triggers via IntersectionObserver (so it fires exactly when the number enters
 * the viewport, never early), with a viewport-aware scroll backup. Uses
 * setInterval so it runs even where rAF is throttled.
 */
export function CountUp({
  value,
  duration = 1800,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const match = value.trim().match(/^(\d[\d\s.,]*)(.*)$/)
  const target = match ? parseInt(match[1].replace(/[\s.,]/g, ''), 10) : NaN
  const suffix = match ? match[2] : ''

  const [display, setDisplay] = useState(Number.isNaN(target) ? value : `0${suffix}`)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (Number.isNaN(target)) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return

    let intervalId = 0
    const run = () => {
      if (started.current) return
      started.current = true
      const startTime = Date.now()
      intervalId = window.setInterval(() => {
        const t = Math.min(1, (Date.now() - startTime) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setDisplay(`${Math.round(eased * target)}${suffix}`)
        if (t >= 1) {
          window.clearInterval(intervalId)
          setDisplay(`${target}${suffix}`)
        }
      }, 30)
    }

    // Primary trigger: fire only when the number actually enters the viewport.
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries, obs) => {
              if (entries.some((e) => e.isIntersecting)) {
                run()
                obs.disconnect()
              }
            },
            { threshold: 0.4 },
          )
        : null
    io?.observe(el)

    // Backup: viewport-aware scroll/resize check (only when at/above the fold).
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      if (el.getBoundingClientRect().top < vh * 0.85) {
        run()
        teardown()
      }
    }
    const teardown = () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    const t1 = window.setTimeout(check, 250) // catch already-visible (above-fold) numbers

    return () => {
      teardown()
      io?.disconnect()
      window.clearTimeout(t1)
      window.clearInterval(intervalId)
    }
  }, [value, target, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
