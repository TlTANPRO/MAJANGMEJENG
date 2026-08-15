import { test, expect } from '@playwright/test';

test.describe('V10 user journeys', () => {
  test('immersive journey and story controls work', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Enter the world/i }).click();
    await expect(page).toHaveURL(/#world$/);
    await expect(page.getByText('ENTER THE WORLD', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: '02' }).last().click();
    await expect(page.locator('.v10-feature h3')).toContainText('places');
  });

  test('official social channels are reachable', async ({ page }) => {
    await page.goto('./');
    await page.locator('#current').scrollIntoViewIfNeeded();
    const instagram = page.locator('a[href="https://www.instagram.com/majangmejeng_/"]').first();
    const tiktok = page.locator('a[href*="tiktok.com/@majangmejeng_"]').first();
    await expect(instagram).toBeVisible();
    await expect(tiktok).toBeVisible();
  });

  test('mobile menu navigates without route assumptions', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only journey.');
    await page.goto('./');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const panel = page.locator('.v10-menu-panel');
    await expect(panel).toBeVisible();
    await panel.getByRole('button', { name: /PEOPLE MAKE THE PLACE/i }).click();
    await expect(page.locator('#people')).toBeVisible();
  });
});
