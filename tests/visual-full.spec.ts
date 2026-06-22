import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { name: '1920', w: 1920, h: 1080 },
  { name: '1512', w: 1512, h: 900 },
]

const SECTIONS = [
  { name: 'nav',        sel: 'nav' },
  { name: 'hero',       sel: 'section:nth-of-type(1)' },
  { name: 'stats',      sel: 'section:nth-of-type(2)' },
  { name: 'whyus',      sel: 'section:nth-of-type(3)' },
  { name: 'projects',   sel: 'section:nth-of-type(4)' },
  { name: 'about',      sel: 'section:nth-of-type(5)' },
  { name: 'needhelp',   sel: 'section:nth-of-type(6)' },
  { name: 'partners',   sel: 'section:nth-of-type(7)' },
  { name: 'production', sel: 'section:nth-of-type(8)' },
  { name: 'faq',        sel: 'section:nth-of-type(9)' },
  { name: 'process',    sel: 'section:nth-of-type(10)' },
  { name: 'contact',    sel: 'section:nth-of-type(11)' },
  { name: 'footer',     sel: 'footer' },
]

for (const vp of VIEWPORTS) {
  test.describe(`@${vp.name}px`, () => {

    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.w, height: vp.h })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
    })

    test(`полный скриншот страницы`, async ({ page }, info) => {
      const path = `tests/screenshots/full-${vp.name}.png`
      await page.screenshot({ path, fullPage: true })
      await info.attach(`full-${vp.name}`, { path, contentType: 'image/png' })
    })

    test(`нет горизонтального скролла`, async ({ page }) => {
      const sw = await page.evaluate(() => document.body.scrollWidth)
      const vw = await page.evaluate(() => window.innerWidth)
      console.log(`  scrollWidth=${sw} viewport=${vw} delta=${sw - vw}`)
      expect(sw).toBeLessThanOrEqual(vw + 1)
    })

    test(`скриншоты всех секций`, async ({ page }, info) => {
      for (const sec of SECTIONS) {
        const el = page.locator(sec.sel).first()
        const exists = await el.count()
        if (!exists) { console.log(`  SKIP ${sec.name} — не найден`); continue }

        const box = await el.boundingBox()
        if (!box) { console.log(`  SKIP ${sec.name} — нет boundingBox`); continue }

        // overflow check
        const overflow = await page.evaluate(([selector]) => {
          const el = document.querySelector(selector as string)
          if (!el) return null
          const children = Array.from(el.querySelectorAll('*'))
          const vw = window.innerWidth
          const bad = children.filter(c => {
            const r = c.getBoundingClientRect()
            if (r.right <= vw + 3) return false
            let p: Element | null = c.parentElement
            while (p && p !== document.documentElement && p !== document.body) {
              const s = getComputedStyle(p)
              if (s.overflow === 'hidden' || s.overflowX === 'hidden') return false
              p = p.parentElement
            }
            return true
          })
          return bad.map(c => ({
            tag: c.tagName,
            right: Math.round(c.getBoundingClientRect().right),
            txt: c.textContent?.trim().slice(0, 30),
          })).slice(0, 3)
        }, [sec.sel])

        if (overflow && overflow.length > 0) {
          console.log(`  ⚠ OVERFLOW в ${sec.name}:`, JSON.stringify(overflow))
        } else {
          console.log(`  ✓ ${sec.name} — нет overflow`)
        }

        // Скроллим к секции, затем снимаем с учётом текущей позиции скролла
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), box.y)
        await page.waitForTimeout(100)
        const scrollY = await page.evaluate(() => window.scrollY)
        const clipY = box.y - scrollY
        const clipH = Math.min(box.height, vp.h)
        const path = `tests/screenshots/sec-${vp.name}-${sec.name}.png`
        await page.screenshot({
          path,
          clip: { x: 0, y: clipY, width: vp.w, height: clipH },
        })
        await info.attach(`${vp.name}-${sec.name}`, { path, contentType: 'image/png' })
      }
    })

  })
}
