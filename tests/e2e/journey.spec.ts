import { test, expect } from '@playwright/test';

test.describe('V9 user journeys', () => {
  test('editorial story journey works', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Explore stories/i }).click();
    await expect(page).toHaveURL(/#stories$/);
    await expect(page.getByText('01 / STORIES')).toBeVisible();
    await page.getByRole('button', { name: 'Story 3' }).click();
    await expect(page.locator('.v9-story-copy')).toContainText('CULTURE');
  });

  test('social current exposes official channels', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByText('03 / SOCIAL CURRENT')).toBeVisible();
    const instagram = page.locator('a[href="https://www.instagram.com/majangmejeng_/"]').first();
    const tiktok = page.locator('a[href*="tiktok.com/@majangmejeng_"]').first();
    await expect(instagram).toBeVisible();
    await expect(tiktok).toBeVisible();
  });

  test('mobile menu navigates without route assumptions', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only journey.');
    await page.goto('./');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('.v9-overlay')).toBeVisible();
    await page.locator('.v9-overlay').getByRole('button', { name: /stories/i }).click();
    await expect(page.getByText('01 / STORIES')).toBeVisible();
  });
});
