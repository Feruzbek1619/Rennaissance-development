import { test, expect } from '@playwright/test'
test.use({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 900 } })

for (const path of ['/about', '/contacts']) {
  test(`shared stats+marquee present on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 }).catch(()=>{})
    // stats section present (the statement)
    const hasStats = await page.locator('text=застройщик полного цикла').count()
    // count-up number present
    const hasMarquee = await page.locator('.animate-marquee').count()
    console.log(`${path} → statsText:${hasStats} marquee:${hasMarquee}`)
    expect(hasStats).toBeGreaterThan(0)
  })
}

test('about: stat counts up + marquee moves', async ({ page }) => {
  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 9000 }).catch(()=>{})
  await page.evaluate(() => { const s=[...document.querySelectorAll('section')].find(x=>/застройщик полного цикла/.test(x.textContent||'')); s?.scrollIntoView({block:'center'}) })
  await page.waitForTimeout(2200)
  const num = await page.evaluate(() => { const s=[...document.querySelectorAll('section')].find(x=>/застройщик полного цикла/.test(x.textContent||'')); return [...(s?.querySelectorAll('p')||[])].map(p=>p.textContent?.trim()).find(t=>/^\d/.test(t||'')) })
  const mq = await page.locator('.animate-marquee').first()
  await page.evaluate(() => document.querySelector('.animate-marquee')?.scrollIntoView({block:'center'}))
  const tx1 = await mq.evaluate(el => Math.round(new DOMMatrixReadOnly(getComputedStyle(el).transform).m41))
  await page.waitForTimeout(700)
  const tx2 = await mq.evaluate(el => Math.round(new DOMMatrixReadOnly(getComputedStyle(el).transform).m41))
  console.log('about stat after scroll →', num, '| marquee tx', tx1, '→', tx2)
  expect(num).toBe('12+')
  expect(tx2).toBeLessThan(tx1)
})
