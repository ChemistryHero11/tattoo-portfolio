import { test, expect } from '@playwright/test'

test.describe('Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/booking')
  })

  test('should display booking form', async ({ page }) => {
    // Check form elements
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('select[name="preferredStyle"]')).toBeVisible()
    await expect(page.locator('textarea[name="idea"]')).toBeVisible()
    await expect(page.locator('input[type="file"]')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Check HTML5 validation (browser dependent)
    const nameInput = page.locator('input[name="name"]')
    const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
    expect(validationMessage).toBeTruthy()
  })

  test('should submit form with valid data', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '(555) 123-4567')
    await page.selectOption('select[name="preferredStyle"]', 'blackwork')
    await page.fill('textarea[name="idea"]', 'I want a geometric wolf design on my forearm')
    
    // Mock form submission response
    await page.route('**/formspree.io/**', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true })
      })
    })
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for success message
    await expect(page.locator('text=Thank you!')).toBeVisible({ timeout: 10000 })
  })

  test('should handle submission errors', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '(555) 123-4567')
    await page.fill('textarea[name="idea"]', 'Test idea')
    
    // Mock error response
    await page.route('**/formspree.io/**', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      })
    })
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for error message
    await expect(page.locator('text=Sorry, there was an error')).toBeVisible({ timeout: 10000 })
  })
})
