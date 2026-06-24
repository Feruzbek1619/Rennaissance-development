import { test, expect } from '@playwright/test'

test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } })

test('partner logos scroll in an infinite loop', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 }).catch(() => {})

  // bring the marquee into view without Playwright's stability wait (it never
  // stops moving), then read its translateX directly over time.
  await page.evaluate(() => {
    document.querySelector('.animate-marquee')?.scrollIntoView({ block: 'center' })
  })

  const tx = () =>
    page.evaluate(() => {
      const el = document.querySelector('.animate-marquee')!
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform)
      return Math.round(m.m41)
    })

  const a = await tx()
  await page.waitForTimeout(700)
  const b = await tx()
  await page.waitForTimeout(700)
  const c = await tx()
  console.log('marquee translateX over time →', a, b, c)

  expect(b).toBeLessThan(a) // moving left
  expect(c).toBeLessThan(b) // keeps moving (loops)
})
