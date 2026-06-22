import { test } from '@playwright/test'
test('найти секцию с right=1521', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const items = await page.evaluate(() => {
    const vw = window.innerWidth
    const res: any[] = []
    for (const el of document.querySelectorAll('a, button')) {
      const rect = el.getBoundingClientRect()
      if (rect.right >= 1516 && el.textContent?.trim() === 'Заказать звонок') {
        let sec = 'нет section'
        let nav = false
        let p: Element | null = el
        while (p) {
          if (p.tagName === 'SECTION') { sec = (p as HTMLElement).className?.slice(0, 60) ?? 'section'; break }
          if (p.tagName === 'NAV') { nav = true; break }
          if (p.tagName === 'FOOTER') { sec = 'footer'; break }
          p = p.parentElement
        }
        res.push({ right: Math.round(rect.right), y: Math.round(rect.top), sec: nav ? 'NAV' : sec })
      }
    }
    return res
  })
  for (const e of items) console.log(`right=${e.right} y=${e.y} | ${e.sec}`)
})
