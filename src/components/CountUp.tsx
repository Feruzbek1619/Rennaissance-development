import { useEffect, useRef, useState } from 'react'

/**
 * Animated number that counts up from 0 to its target the first time it scrolls
 * into view. Accepts a display string like "12+", "5+", "2021" — it animates the
 * leading number and keeps any suffix ("+"). Falls back to the raw string for
 * non-numeric values. Uses setInterval (not rAF) so it also runs in throttled
 * environments; a safety timer guarantees the final value is shown.
 */
export function CountUp({
  value,
  duration = 1700,
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

    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      if (el.getBoundingClientRect().top < vh * 0.9) {
        run()
        cleanup()
      }
    }
    const cleanup = () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    const t1 = window.setTimeout(check, 200)
    // Safety: count anyway so the value is never stuck at 0.
    const t2 = window.setTimeout(() => {
      run()
      cleanup()
    }, 2600)

    return () => {
      cleanup()
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearInterval(intervalId)
    }
  }, [value, target, suffix, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
