import { test, expect } from '@playwright/test'

test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } })

test('reels: 5 across, 9:16, IG chrome cropped', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 }).catch(() => {})

  const grid = page.locator('.grid.grid-cols-5').first()
  await grid.scrollIntoViewIfNeeded()

  const frames = page.locator('.grid.grid-cols-5 iframe')
  await expect(frames).toHaveCount(5)

  const dims = await page.locator('.grid.grid-cols-5 > div').evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect()
      return { w: Math.round(r.width), h: Math.round(r.height), ratio: +(r.height / r.width).toFixed(3) }
    }),
  )
  console.log('TILE dims →', JSON.stringify(dims))
  // each tile is portrait, ~9:16 (ratio ≈ 1.778)
  for (const d of dims) expect(d.ratio).toBeGreaterThan(1.7)

  // give the IG embeds time to render their video, then capture
  await page.waitForTimeout(9000)
  await grid.screenshot({ path: 'tests/shots/reels-1440.png' })
  console.log('saved tests/shots/reels-1440.png')
})
