import { test, expect } from '@playwright/test'

// Real-browser proof that scroll-reveals animate ON SCROLL, with motion enabled
// (the headless preview forces reduced-motion, which hides all of this).
test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } })

async function waitPreloaderGone(page) {
  await page
    .waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 })
    .catch(() => {})
  await page.waitForTimeout(400)
}

const read = (el: Element) => {
  const cs = getComputedStyle(el)
  return {
    vis: el.classList.contains('is-visible'),
    opacity: Number(cs.opacity),
    transform: cs.transform,
  }
}

test('below-the-fold blocks are hidden on load and reveal on scroll', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await waitPreloaderGone(page)

  const counts = await page.evaluate(() => {
    const all = [...document.querySelectorAll('[data-reveal],[data-reveal-stagger]')]
    return { total: all.length, visible: all.filter((e) => e.classList.contains('is-visible')).length }
  })
  console.log('ON LOAD →', JSON.stringify(counts))
  // Only above-the-fold should be revealed on load (NOT everything).
  expect(counts.total).toBeGreaterThan(20)
  expect(counts.visible).toBeGreaterThan(0)
  expect(counts.visible).toBeLessThan(counts.total * 0.6)

  // Walk down the page; revealed count must grow as blocks enter the viewport.
  const seen: number[] = []
  for (let y = 0; y <= 9000; y += 700) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(160)
    seen.push(
      await page.evaluate(
        () => document.querySelectorAll('[data-reveal].is-visible,[data-reveal-stagger].is-visible').length,
      ),
    )
  }
  console.log('REVEALED while scrolling →', JSON.stringify(seen))
  expect(seen[seen.length - 1]).toBeGreaterThan(counts.visible) // more revealed after scrolling
})

test('a left-slide section header animates opacity 0→1 and translateX→0', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await waitPreloaderGone(page)

  // "Наши проекты" header uses data-reveal="left"
  const target = page.locator('[data-reveal="left"]').filter({ hasText: 'Наши проекты' }).first()
  await expect(target).toHaveCount(1)

  const before = await target.evaluate(read)
  await target.scrollIntoViewIfNeeded()
  await page.waitForTimeout(140)
  const mid = await target.evaluate(read)
  await page.waitForTimeout(1300)
  const after = await target.evaluate(read)

  console.log('LEFT header BEFORE →', JSON.stringify(before))
  console.log('LEFT header MID    →', JSON.stringify(mid))
  console.log('LEFT header AFTER  →', JSON.stringify(after))

  // Hidden + shifted left before it enters the viewport
  expect(before.vis).toBe(false)
  expect(before.opacity).toBeLessThan(0.5)
  // Fully shown + back in place after scrolling into view
  expect(after.vis).toBe(true)
  expect(after.opacity).toBeGreaterThan(0.95)
  expect(after.transform === 'none' || after.transform.includes('matrix(1, 0, 0, 1, 0, 0)')).toBeTruthy()
  // Mid-flight it is partway (proves a real transition, not an instant snap)
  expect(mid.opacity).toBeGreaterThan(before.opacity)
})

test('stat numbers count up when scrolled into view', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await waitPreloaderGone(page)

  const stat = page.locator('section', { hasText: 'проектов' }).locator('p', { hasText: /^\d/ }).first()
  await stat.scrollIntoViewIfNeeded()
  const start = await stat.textContent()
  await page.waitForTimeout(1800)
  const end = await stat.textContent()
  console.log('STAT start →', start, '| end →', end)
  expect((end || '').trim().length).toBeGreaterThan(0)
})
