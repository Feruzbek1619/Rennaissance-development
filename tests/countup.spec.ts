import { test, expect } from '@playwright/test'

test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } })

// The stats live below the hero. They must NOT count until scrolled into view,
// then count up to their target.
test('stat numbers stay at 0 until in view, then count up', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 }).catch(() => {})

  const firstStat = () =>
    page.evaluate(() => {
      const sec = [...document.querySelectorAll('section')].find((s) => /проектов реализовано|Реализованные/.test(s.textContent || ''))
      const p = sec?.querySelector('p')
      // find the big number paragraph
      const nums = [...(sec?.querySelectorAll('p') || [])].map((n) => (n.textContent || '').trim())
      return nums.find((t) => /^\d|^0/.test(t)) || nums[0] || ''
    })

  // Stay on the hero for >3s (past the OLD 2.6s safety) WITHOUT scrolling.
  await page.waitForTimeout(3200)
  const beforeScroll = await firstStat()

  // Now scroll the stats into view and let them count.
  await page.evaluate(() => {
    const sec = [...document.querySelectorAll('section')].find((s) => /проектов реализовано|Реализованные/.test(s.textContent || ''))
    sec?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(2200)
  const afterScroll = await firstStat()

  console.log('stat BEFORE scroll (waited 3.2s on hero) →', JSON.stringify(beforeScroll))
  console.log('stat AFTER scrolling into view        →', JSON.stringify(afterScroll))

  // Did NOT pre-count while off-screen
  expect(beforeScroll.startsWith('0')).toBeTruthy()
  // Counted to the real value after entering the viewport
  expect(afterScroll).toBe('12+')
})
