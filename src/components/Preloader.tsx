'use client'
import { useEffect, useState } from 'react'

/**
 * First-load preloader with the company wordmark + a progress bar / counter,
 * then a curtain that slides up to reveal the site. Shows once per page load
 * (RootLayout mounts once). Uses setInterval + Date.now so it runs reliably in
 * any environment; honours prefers-reduced-motion by skipping the long hold.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const HOLD = reduce ? 350 : 1600
    const EXIT = reduce ? 0 : 850

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const start = Date.now()
    const tick = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / HOLD)
      const eased = 1 - Math.pow(1 - t, 2) // easeOutQuad
      setProgress(Math.round(eased * 100))
      if (t >= 1) {
        window.clearInterval(tick)
        setLeaving(true)
        window.setTimeout(() => {
          setHidden(true)
          document.body.style.overflow = prevOverflow
        }, EXIT)
      }
    }, 24)

    return () => {
      window.clearInterval(tick)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <img src="/assets/logo-wordmark.svg" alt="" className="preloader__logo" />
        <div className="preloader__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <span className="preloader__pct">{progress}%</span>
    </div>
  )
}
