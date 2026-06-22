import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('логотип отображается и ссылается на главную', async ({ page }) => {
    const logo = page.locator('nav img[alt="Renaissance Development"]')
    await expect(logo).toBeVisible()
    const logoLink = page.locator('nav a[aria-label*="главную"]')
    await expect(logoLink).toHaveAttribute('href', '/')
  })

  test('все ссылки навигации видны', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav.getByText('Главная')).toBeVisible()
    await expect(nav.getByText('О компании')).toBeVisible()
    await expect(nav.getByText('Каталог объектов')).toBeVisible()
    await expect(nav.getByText('Производство (B2B)')).toBeVisible()
    await expect(nav.getByText('Контакты')).toBeVisible()
  })

  test('телефон виден и кликабелен', async ({ page }) => {
    const phone = page.locator('nav a[href^="tel:"]')
    await expect(phone).toBeVisible()
    await expect(phone).toHaveAttribute('href', 'tel:783333331')
    await expect(page.locator('nav').getByText('78-333-33-31')).toBeVisible()
  })

  test('кнопка «Заказать звонок» видна', async ({ page }) => {
    const cta = page.locator('nav').getByRole('link', { name: 'Заказать звонок' })
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', '/quote')
  })

  test('дропдаун «Каталог объектов» показывает проекты при hover', async ({ page }) => {
    const catalogBtn = page.locator('nav button', { hasText: 'Каталог объектов' })
    await catalogBtn.hover()

    const dropdown = page.locator('nav .group .invisible, nav [aria-haspopup] + div')
    // проверяем что проекты появляются
    await expect(page.locator('nav').getByRole('link', { name: 'ALANDALUS' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'BOTANIKA LUXURY' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'VATAN VILLAGE' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'TURON' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'Все проекты' })).toBeVisible()
  })

  test('активная ссылка «Главная» подсвечивается на главной странице', async ({ page }) => {
    const homeLink = page.locator('nav a[href="/"]', { hasText: 'Главная' })
    await expect(homeLink).toHaveClass(/bg-bg-active/)
  })

  test('нет горизонтального скролла', async ({ page }) => {
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 1)
  })

  test('навигация не обрезается на 1512px', async ({ page }) => {
    const logo = page.locator('nav img[alt="Renaissance Development"]')
    const ctaBtn = page.locator('nav').getByRole('link', { name: 'Заказать звонок' })
    const logoBox = await logo.boundingBox()
    const ctaBox = await ctaBtn.boundingBox()

    expect(logoBox).not.toBeNull()
    expect(ctaBox).not.toBeNull()

    // и логотип и кнопка видны внутри вьюпорта
    expect(logoBox!.x).toBeGreaterThanOrEqual(0)
    expect(ctaBox!.x + ctaBox!.width).toBeLessThanOrEqual(1512 + 5)
  })

  test('скриншот навигации при 1512px', async ({ page }, testInfo) => {
    await page.screenshot({ path: 'tests/screenshots/nav-1512.png', clip: { x: 0, y: 0, width: 1512, height: 120 } })
    await testInfo.attach('nav-1512', { path: 'tests/screenshots/nav-1512.png', contentType: 'image/png' })
  })

  test('скриншот навигации при 1920px', async ({ page, browserName }, testInfo) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.screenshot({ path: 'tests/screenshots/nav-1920.png', clip: { x: 0, y: 0, width: 1920, height: 120 } })
    await testInfo.attach('nav-1920', { path: 'tests/screenshots/nav-1920.png', contentType: 'image/png' })
  })
})
