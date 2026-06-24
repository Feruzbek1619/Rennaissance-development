import { test, expect } from '@playwright/test'
test.use({ viewport: { width: 1440, height: 900 } })
test('vatan gallery: arrow + thumbnail switch the main image', async ({ page }) => {
  await page.goto('/projects/vatan-village', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1500)
  const mainSrc = () => page.locator('img[alt="VATAN VILLAGE — общий вид"]').first().getAttribute('src')
  const a = await mainSrc()
  await page.getByRole('button', { name: 'Следующее фото' }).first().click()
  await page.waitForTimeout(200)
  const b = await mainSrc()
  // click 4th thumbnail
  await page.getByRole('button', { name: 'Фото 4' }).first().click()
  await page.waitForTimeout(200)
  const c = await mainSrc()
  console.log('main src: start', a?.split('/').pop(), '| after next', b?.split('/').pop(), '| after thumb4', c?.split('/').pop())
  expect(b).not.toBe(a)
  expect(c).toContain('vatan-strip-3') // 4th thumbnail (index 3) = strip-3
})
