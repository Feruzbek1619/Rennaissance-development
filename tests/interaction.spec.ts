import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 900 } })

test('nav catalog dropdown opens on hover', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: /Каталог объектов/ })
  const item = page.getByRole('link', { name: 'ALANDALUS' }).first()
  // hidden initially (opacity/visibility)
  await page.waitForTimeout(200)
  await trigger.hover()
  await page.waitForTimeout(300)
  await expect(item).toBeVisible()
  const opacity = await item.evaluate((el) => {
    let p: HTMLElement | null = el as HTMLElement
    while (p) { if (getComputedStyle(p).opacity === '0') return '0'; p = p.parentElement }
    return 'visible'
  })
  console.log('DROPDOWN opacity chain:', opacity)
  expect(opacity).not.toBe('0')
})

test('FAQ accordion toggles', async ({ page }) => {
  await page.goto('/faq')
  await page.waitForTimeout(300)
  const q = page.getByRole('button', { name: /Как купить квартиру/ })
  const answerText = 'Оставьте заявку'
  await expect(page.getByText(answerText, { exact: false })).toHaveCount(0)
  await q.click()
  await page.waitForTimeout(300)
  await expect(page.getByText(answerText, { exact: false })).toBeVisible()
  console.log('FAQ toggle: OK')
})

test('keyboard focus visibility on nav CTA', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(200)
  const cta = page.getByRole('link', { name: 'Заказать звонок' }).first()
  await cta.focus()
  const fx = await cta.evaluate((el) => {
    const s = getComputedStyle(el)
    return { outlineWidth: s.outlineWidth, outlineStyle: s.outlineStyle, boxShadow: s.boxShadow }
  })
  console.log('CTA focus styles:', JSON.stringify(fx))
})
