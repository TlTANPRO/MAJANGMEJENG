import { test, expect } from '@playwright/test';

test.describe('V9 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only navigation.');
    await page.goto('./');
    const menu = page.getByRole('button', { name: 'Open menu' });
    await expect(menu).toBeVisible();
    await menu.click();
    const overlay = page.locator('.v9-overlay');
    await expect(overlay).toBeVisible();
    await expect(overlay.getByRole('button', { name: /stories/i })).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(overlay).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('editorial sections remain visible after deep scroll', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('04 / COLLABORATE')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
});
