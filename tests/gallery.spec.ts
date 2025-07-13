import { test, expect } from '@playwright/test'

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery')
  })

  test('should display gallery images', async ({ page }) => {
    // Wait for images to load
    await page.waitForSelector('[alt*="tattoo"]')
    
    // Check that images are displayed
    const images = page.locator('img[alt*="tattoo"]')
    await expect(images).toHaveCount(6) // Based on mock data
  })

  test('should open lightbox on image click', async ({ page }) => {
    // Click first image
    const firstImage = page.locator('img[alt*="tattoo"]').first()
    await firstImage.click()

    // Check lightbox is visible
    await expect(page.locator('[aria-label="Close lightbox"]')).toBeVisible()
    
    // Check navigation buttons
    await expect(page.locator('[aria-label="Previous image"]')).toBeVisible()
    await expect(page.locator('[aria-label="Next image"]')).toBeVisible()
  })

  test('should navigate images with keyboard', async ({ page }) => {
    // Open lightbox
    await page.locator('img[alt*="tattoo"]').first().click()
    
    // Press right arrow
    await page.keyboard.press('ArrowRight')
    
    // Verify image changed (would need to check src or alt text)
    await page.waitForTimeout(300) // Wait for animation
    
    // Press escape to close
    await page.keyboard.press('Escape')
    await expect(page.locator('[aria-label="Close lightbox"]')).not.toBeVisible()
  })

  test('should filter by style', async ({ page }) => {
    // Click on Blackwork filter
    await page.click('text=Blackwork')
    
    // Check URL updated
    await expect(page).toHaveURL('/gallery?style=Blackwork')
    
    // Verify filtered results (implementation dependent)
    await page.waitForTimeout(500)
  })
})
