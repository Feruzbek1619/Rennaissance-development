import { test } from '@playwright/test'

test('найти источник scrollWidth=1600', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const info = await page.evaluate(() => {
    const vw = window.innerWidth
    const over: any[] = []
    for (const el of document.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect()
      if (rect.right > vw + 5) {
        // ищем ближайший overflow:hidden предок (кроме html/body)
        let hiddenAncestor = ''
        let p = el.parentElement
        while (p && p !== document.documentElement && p !== document.body) {
          const s = getComputedStyle(p)
          if (s.overflow === 'hidden' || s.overflowX === 'hidden') {
            hiddenAncestor = (p as HTMLElement).className?.toString().slice(0, 50) ?? p.tagName
            break
          }
          p = p.parentElement
        }
        over.push({
          tag: el.tagName,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: el.textContent?.trim().slice(0, 40) ?? '',
          cls: (el as HTMLElement).className?.toString().slice(0, 60),
          hiddenBy: hiddenAncestor,
        })
      }
    }
    // найти элемент с максимальным right
    const maxRight = Math.max(...over.map(e => e.right))
    return { vw, maxRight, over: over.filter(e => e.right >= maxRight - 5) }
  })

  console.log(`\nvp=${info.vw} maxRight=${info.maxRight} overflow=${info.maxRight - info.vw}px`)
  for (const el of info.over) {
    console.log(`  ${el.tag} right=${el.right} w=${el.width}`)
    console.log(`    cls: ${el.cls}`)
    console.log(`    txt: ${el.text}`)
    console.log(`    hiddenBy: ${el.hiddenBy || 'нет (открытый overflow!)'} `)
  }
})
