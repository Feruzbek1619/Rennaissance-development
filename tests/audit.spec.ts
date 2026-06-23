import { test, expect } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'fs'

// ── Source of truth = real Chromium. Programmatic gates per the QA brief. ──

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'projects' },
  { path: '/projects/alandalus', name: 'project-details' },
  { path: '/quote', name: 'quote' },
  { path: '/about', name: 'about' },
  { path: '/faq', name: 'faq' },
  { path: '/b2b', name: 'b2b' },
  { path: '/services', name: 'services' },
  { path: '/services/zhilye-kompleksy', name: 'service-details' },
  { path: '/process', name: 'process' },
  { path: '/blog', name: 'blog' },
  { path: '/blog/budushchee-ustojchivogo-stroitelstva', name: 'blog-details' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
  { path: '/nonexistent-zzz', name: '404' },
]

// In-scope per desktop-only strategy: gates must be green at 1280/1440/1920.
// Below 1280 the page intentionally horizontal-scrolls (body min-width:1280).
const VIEWPORTS = [
  { w: 1920, h: 1080 },
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
]

type Finding = {
  route: string
  vw: number
  overflow?: { scrollWidth: number; clientWidth: number }
  offenders?: any[]
  brokenImages?: any[]
  childOverflow?: any[]
  consoleErrors?: string[]
  http404?: string[]
  fonts?: any
  cyrillic?: any
  cls?: number
}

const allFindings: Finding[] = []

mkdirSync('tests/audit-out', { recursive: true })

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`${route.name} @ ${vp.w}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } })
      const page = await context.newPage()

      const consoleErrors: string[] = []
      const http404: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300))
      })
      page.on('pageerror', (err) => consoleErrors.push('PAGEERROR: ' + err.message.slice(0, 300)))
      page.on('response', (resp) => {
        if (resp.status() >= 400) http404.push(`${resp.status()} ${resp.url()}`)
      })

      // CLS observer before any layout
      await page.addInitScript(() => {
        ;(window as any).__cls = 0
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries() as any[]) {
              if (!e.hadRecentInput) (window as any).__cls += e.value
            }
          }).observe({ type: 'layout-shift', buffered: true })
        } catch {}
      })

      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => (document as any).fonts.ready)
      await page.waitForTimeout(400)

      const audit = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const sw = document.documentElement.scrollWidth
        const offenders: any[] = []
        if (sw > vw + 1) {
          document.querySelectorAll('*').forEach((el) => {
            const r = el.getBoundingClientRect()
            if (r.width === 0 || r.height === 0) return
            const st = getComputedStyle(el)
            if (st.position === 'fixed') return
            if (r.right > vw + 1 || r.left < -1) {
              offenders.push({
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 90),
                left: Math.round(r.left),
                right: Math.round(r.right),
                w: Math.round(r.width),
                pos: st.position,
              })
            }
          })
          offenders.sort((a, b) => b.right - a.right)
        }

        const brokenImages: any[] = []
        document.querySelectorAll('img').forEach((img) => {
          if (!img.complete || img.naturalWidth === 0) {
            brokenImages.push({ src: img.getAttribute('src'), alt: img.alt })
          }
        })

        // child overflowing parent under overflow:visible (skip abs/fixed = false positives)
        const childOverflow: any[] = []
        document.querySelectorAll('section, main, div').forEach((el) => {
          const st = getComputedStyle(el)
          if (st.overflow !== 'visible' && st.overflowX !== 'visible') return
          const pr = el.getBoundingClientRect()
          if (pr.width === 0) return
          Array.from(el.children).forEach((c) => {
            const cs = getComputedStyle(c as Element)
            if (cs.position === 'absolute' || cs.position === 'fixed') return
            const cr = (c as Element).getBoundingClientRect()
            if (cr.width === 0) return
            if (cr.right > pr.right + 2 || cr.left < pr.left - 2) {
              childOverflow.push({
                parent: (el.className || '').toString().slice(0, 60),
                child: ((c as Element).className || '').toString().slice(0, 60),
                overflowRight: Math.round(cr.right - pr.right),
                overflowLeft: Math.round(pr.left - cr.left),
              })
            }
          })
        })

        // font load checks
        const fams = ['MTS Compact', 'Poppins', 'Manrope']
        const fonts: any = {}
        for (const f of fams) {
          fonts[f] = {
            w400: (document as any).fonts.check(`400 16px "${f}"`),
            w500: (document as any).fonts.check(`500 16px "${f}"`),
            w600: (document as any).fonts.check(`600 16px "${f}"`),
            w700: (document as any).fonts.check(`700 16px "${f}"`),
            cyr: (document as any).fonts.check(`400 16px "${f}"`, 'Привет'),
            cyr700: (document as any).fonts.check(`700 16px "${f}"`, 'Привет'),
          }
        }

        // canvas cyrillic probe: does requested family actually render Я, or fallback?
        const cnv = document.createElement('canvas')
        const ctx = cnv.getContext('2d')!
        const measure = (font: string, t: string) => {
          ctx.font = font
          return ctx.measureText(t).width
        }
        const bogus = measure('60px "NoSuchFontXYZ"', 'Я')
        const cyrillic: any = {}
        for (const f of fams) {
          const wf = measure(`60px "${f}", "NoSuchFontXYZ"`, 'Я')
          cyrillic[f] = { rendersCyr: Math.abs(wf - bogus) > 0.5 }
        }

        return {
          overflow: { scrollWidth: sw, clientWidth: vw },
          offenders: offenders.slice(0, 12),
          brokenImages,
          childOverflow: childOverflow.slice(0, 12),
          fonts,
          cyrillic,
        }
      })

      const cls = await page.evaluate(() => (window as any).__cls || 0)

      const finding: Finding = {
        route: route.path,
        vw: vp.w,
        overflow: audit.overflow,
        offenders: audit.offenders,
        brokenImages: audit.brokenImages,
        childOverflow: audit.childOverflow,
        consoleErrors,
        http404: http404.filter((u) => !u.includes('favicon')),
        fonts: audit.fonts,
        cyrillic: audit.cyrillic,
        cls: Math.round(cls * 1000) / 1000,
      }
      allFindings.push(finding)
      writeFileSync(`tests/audit-out/${route.name}-${vp.w}.json`, JSON.stringify(finding, null, 2))

      await context.close()

      // ── Programmatic gates (soft so we collect everything) ──
      expect.soft(audit.overflow.scrollWidth, `H-overflow ${route.path}@${vp.w}: ${JSON.stringify(audit.offenders)}`).toBeLessThanOrEqual(audit.overflow.clientWidth + 1)
      expect.soft(audit.brokenImages, `broken imgs ${route.path}@${vp.w}`).toEqual([])
      expect.soft(finding.http404, `404s ${route.path}@${vp.w}`).toEqual([])
      expect.soft(consoleErrors, `console ${route.path}@${vp.w}`).toEqual([])
    })
  }
}

test.afterAll(async () => {
  writeFileSync('tests/audit-out/_ALL.json', JSON.stringify(allFindings, null, 2))
})
