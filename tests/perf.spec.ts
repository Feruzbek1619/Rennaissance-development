import { test } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 900 } })

test('perf breakdown of the live site', async ({ page }) => {
  const started = Date.now()
  await page.goto('https://rnd-vatan.vercel.app/', { waitUntil: 'load', timeout: 60000 })
  const loadMs = Date.now() - started

  // let lazy stuff (IG embeds) kick in
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(9000)

  const data = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const res = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const byDomain: Record<string, { count: number; kb: number }> = {}
    let total = 0
    for (const r of res) {
      const d = new URL(r.name).hostname
      const kb = (r.transferSize || r.encodedBodySize || 0) / 1024
      byDomain[d] = byDomain[d] || { count: 0, kb: 0 }
      byDomain[d].count++
      byDomain[d].kb += kb
      total += kb
    }
    const domains = Object.entries(byDomain)
      .map(([d, v]) => ({ domain: d, count: v.count, kb: Math.round(v.kb) }))
      .sort((a, b) => b.kb - a.kb)
    const heaviest = res
      .map((r) => ({ url: r.name.split('/').slice(2).join('/').slice(0, 60), kb: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024), ms: Math.round(r.duration) }))
      .sort((a, b) => b.kb - a.kb)
      .slice(0, 12)
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      loadEvent: Math.round(nav.loadEventEnd),
      requests: res.length,
      totalKB: Math.round(total),
      domains,
      heaviest,
    }
  })

  console.log('goto→load wall ms:', loadMs)
  console.log('DOMContentLoaded ms:', data.domContentLoaded, '| load ms:', data.loadEvent)
  console.log('total requests:', data.requests, '| total transferred KB:', data.totalKB)
  console.log('BY DOMAIN:', JSON.stringify(data.domains, null, 1))
  console.log('HEAVIEST:', JSON.stringify(data.heaviest, null, 1))
})
