import { test } from '@playwright/test'

test('scrollWidth и источники', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const info = await page.evaluate(() => {
    const sw = document.body.scrollWidth
    const vw = window.innerWidth
    const over: any[] = []
    for (const el of document.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect()
      if (rect.right > vw + 5) {
        // проверяем нет ли overflow:hidden у предков
        let hidden = false
        let p = el.parentElement
        while (p) {
          const s = getComputedStyle(p)
          if (s.overflow === 'hidden' || s.overflowX === 'hidden') { hidden = true; break }
          p = p.parentElement
        }
        if (!hidden) {
          over.push({
            tag: el.tagName,
            cls: (el as HTMLElement).className?.toString().slice(0, 80),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: el.textContent?.trim().slice(0, 50) ?? '',
            hidden,
          })
        }
      }
    }
    return { sw, vw, over: over.slice(0, 20) }
  })

  console.log(`\nscrollWidth=${info.sw} viewport=${info.vw} overflow=${info.sw - info.vw}px`)
  console.log('Элементы БЕЗ overflow:hidden предка:')
  for (const el of info.over) {
    console.log(`  ${el.tag} right=${el.right} width=${el.width} | ${el.text}`)
    console.log(`    ${el.cls}`)
  }
})
