import { test, expect } from '@playwright/test';

test.describe('V4 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('link', { name: 'Stories' }).last()).toBeVisible();
    await page.getByRole('link', { name: 'Stories' }).last().click();
    await expect(page).toHaveURL(/\/stories$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('mobile story cards remain visible after scrolling', async ({ page }) => {
    await page.goto('/stories');
    await page.locator('main').scrollIntoViewIfNeeded();
    await expect(page.getByRole('link', { name: /Buka cerita/i }).first()).toBeVisible();
  });
});
