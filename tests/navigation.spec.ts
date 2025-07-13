import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')
    
    // Check homepage loads
    await expect(page).toHaveTitle(/Ink Master Portfolio/)
    await expect(page.locator('h1')).toContainText('Where Art Meets')

    // Navigate to Gallery
    await page.click('text=Gallery')
    await expect(page).toHaveURL('/gallery')
    await expect(page.locator('h1')).toContainText('Gallery')

    // Navigate to About
    await page.click('text=About')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About the Artist')

    // Navigate to Booking
    await page.click('text=Booking')
    await expect(page).toHaveURL('/booking')
    await expect(page.locator('h1')).toContainText('Book a Session')
  })

  test('mobile menu should work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    const menuButton = page.locator('[aria-label="Toggle menu"]')
    await menuButton.click()

    // Check menu items are visible
    await expect(page.locator('nav a[href="/gallery"]')).toBeVisible()
    
    // Navigate via mobile menu
    await page.click('text=Gallery')
    await expect(page).toHaveURL('/gallery')
  })
})
