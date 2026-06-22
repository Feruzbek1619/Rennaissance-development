import { test } from '@playwright/test'

test('найти секцию с кнопкой right=1600', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const info = await page.evaluate(() => {
    const vw = window.innerWidth
    const items: any[] = []
    for (const el of document.querySelectorAll('a, button, span, div, p, section')) {
      const rect = el.getBoundingClientRect()
      if (rect.right >= 1595 && rect.right <= 1605) {
        // найти ближайшую section
        let sec: string | null = null
        let p: Element | null = el
        while (p) {
          if (p.tagName === 'SECTION') { sec = (p as HTMLElement).className?.slice(0, 60); break }
          p = p.parentElement
        }
        items.push({
          tag: el.tagName,
          text: el.textContent?.trim().slice(0, 40),
          y: Math.round(rect.top),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          section: sec,
        })
      }
    }
    return items
  })

  for (const e of info) {
    console.log(`${e.tag} y=${e.y} right=${e.right} w=${e.width}`)
    console.log(`  txt: ${e.text}`)
    console.log(`  sec: ${e.section}`)
  }
})
