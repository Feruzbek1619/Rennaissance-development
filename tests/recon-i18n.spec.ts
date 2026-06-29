import { test } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'fs'

// Recon: on EN and UZ, scan every route for any visible Cyrillic text
// (= untranslated string that fell back to RU, or hardcoded RU).

const ROUTES = [
  '/', '/projects', '/about', '/b2b', '/contacts', '/faq', '/services', '/process', '/blog', '/privacy', '/terms',
  '/projects/alandalus', '/projects/sharq-avenue', '/projects/anor-gardens', '/projects/botanika-luxury',
  '/projects/vatan-village', '/projects/turon', '/projects/challet-resort',
  '/services/zhilye-kompleksy', '/services/kommercheskaya-nedvizhimost', '/services/sobstvennoe-proizvodstvo', '/services/proektirovanie',
  '/blog/budushchee-ustojchivogo-stroitelstva', '/blog/tochnost-v-smetnom-planirovanii', '/blog/bezopasnost-na-stroitelnoj-ploshchadke',
  '/blog/navigatsiya-plotnost-gorodskih-kvartir', '/blog/integratsiya-bim-modelirovaniya', '/blog/karbon-nejtralnoe-stroitelstvo',
  '/completed/western-housing', '/completed/renaissance', '/completed/yakkasaroy', '/completed/botanika', '/completed/poytaxt',
]

const LANGS = ['en', 'uz']
mkdirSync('tests/recon-out', { recursive: true })

for (const lang of LANGS) {
  for (const route of ROUTES) {
    test(`recon ${lang} ${route}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
      const page = await ctx.newPage()
      await page.addInitScript((l) => localStorage.setItem('rnd_lang', l), lang)
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.evaluate(() => (document as any).fonts.ready)
      // scroll to trigger lazy content
      await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(300)

      const hits = await page.evaluate(() => {
        const CYR = /[А-Яа-яЁё]/
        const out: { tag: string; text: string }[] = []
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        const seen = new Set<string>()
        let n: Node | null
        while ((n = walker.nextNode())) {
          const t = (n.nodeValue || '').trim()
          if (!t || !CYR.test(t)) continue
          const el = n.parentElement
          if (!el) continue
          const tag = el.tagName
          if (tag === 'SCRIPT' || tag === 'STYLE') continue
          // visible?
          const r = el.getBoundingClientRect()
          if (r.width === 0 && r.height === 0) continue
          const key = t.slice(0, 60)
          if (seen.has(key)) continue
          seen.add(key)
          out.push({ tag, text: t.slice(0, 80) })
        }
        // attributes + <option> text + <select> value
        document.querySelectorAll('[placeholder],[aria-label],[title],img[alt],option,select').forEach((el) => {
          const checks: [string, string | null][] = [
            ['placeholder', el.getAttribute('placeholder')],
            ['aria-label', el.getAttribute('aria-label')],
            ['title', el.getAttribute('title')],
            ['alt', el.getAttribute('alt')],
          ]
          if (el.tagName === 'OPTION') checks.push(['option', el.textContent])
          for (const [attr, val] of checks) {
            if (val && CYR.test(val)) {
              const key = attr + ':' + val.slice(0, 50)
              if (seen.has(key)) continue
              seen.add(key)
              out.push({ tag: el.tagName + '[' + attr + ']', text: val.slice(0, 80) })
            }
          }
        })
        return out
      })

      await ctx.close()
      if (hits.length) {
        const slug = (lang + route).replace(/[^a-z0-9]+/gi, '_')
        writeFileSync(`tests/recon-out/${slug}.json`, JSON.stringify({ lang, route, hits }, null, 2))
      }
    })
  }
}
