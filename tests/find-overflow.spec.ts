import { test } from '@playwright/test'

test('найти переполняющие элементы', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const result = await page.evaluate(() => {
    const overflowing: Array<{tag: string, cls: string, right: number, width: number, text: string}> = []
    for (const el of document.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect()
      if (rect.right > window.innerWidth + 5) {
        overflowing.push({
          tag: el.tagName,
          cls: (el as HTMLElement).className?.toString().slice(0, 100),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: el.textContent?.trim().slice(0, 70) ?? '',
        })
      }
    }
    return overflowing.slice(0, 30)
  })

  console.log('\n=== OVERFLOW ELEMENTS ===')
  for (const el of result) {
    console.log(`${el.tag} right=${el.right}px width=${el.width}px`)
    console.log(`  cls: ${el.cls}`)
    console.log(`  txt: ${el.text}`)
    console.log()
  }
})
