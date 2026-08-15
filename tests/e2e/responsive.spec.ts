import { test, expect } from '@playwright/test';

test.describe('V4 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page }) => {
    await page.goto('./');
    const menu = page.getByRole('button', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(page.getByRole('link', { name: 'Stories' }).last()).toBeVisible();
    await page.getByRole('link', { name: 'Stories' }).last().click();
    await expect(page).toHaveURL(/\/MAJANGMEJENG\/stories$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('mobile story cards remain visible after scrolling', async ({ page }) => {
    await page.goto('./stories');
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('link', { name: /Buka cerita/i }).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
});
