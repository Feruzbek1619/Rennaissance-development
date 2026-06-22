import { test } from '@playwright/test'
test('все элементы right>1512, без hidden-предков', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const items = await page.evaluate(() => {
    const vw = window.innerWidth
    const res: any[] = []
    for (const el of document.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect()
      if (rect.right > vw + 3) {
        let p: Element | null = el.parentElement
        while (p && p !== document.documentElement && p !== document.body) {
          const s = getComputedStyle(p)
          if (s.overflow === 'hidden' || s.overflowX === 'hidden') { p = null; break }
          p = p.parentElement
        }
        if (p !== null) { // нет hidden-предка
          res.push({ tag: el.tagName, right: Math.round(rect.right), w: Math.round(rect.width),
            txt: el.textContent?.trim().slice(0, 40), cls: (el as HTMLElement).className?.toString().slice(0, 70) })
        }
      }
    }
    return res.sort((a,b) => b.right - a.right).slice(0, 15)
  })
  const sw = await page.evaluate(() => document.body.scrollWidth)
  console.log(`\nbody.scrollWidth = ${sw}`)
  for (const e of items) console.log(`  ${e.tag} right=${e.right} w=${e.w} | ${e.txt}`)
})
