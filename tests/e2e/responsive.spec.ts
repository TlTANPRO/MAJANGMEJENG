import { test, expect } from '@playwright/test';

test.describe('V10 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only navigation.');
    await page.goto('./');
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await expect(menu).toBeVisible();
    await menu.click();
    const panel = page.locator('.v10-menu-panel');
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('button', { name: /PEOPLE MAKE THE PLACE/i })).toBeVisible();
    await page.getByRole('button', { name: 'Close navigation' }).click();
    await expect(panel).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('deep scroll preserves the end scene and horizontal bounds', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('HAVE SOMETHING', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
});
