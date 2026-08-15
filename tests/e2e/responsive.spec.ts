import { test, expect } from '@playwright/test';

test.describe('V4 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation is intentionally hidden at desktop breakpoints.');

    await page.goto('./');
    const menu = page.getByRole('button', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await menu.click();

    const storiesLink = page.getByRole('link', { name: 'Stories' }).last();
    await expect(storiesLink).toBeVisible();
    await storiesLink.click();
    await expect(page).toHaveURL(/\/MAJANGMEJENG\/stories\/?$/);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('story cards remain visible after scrolling', async ({ page }) => {
    await page.goto('./stories');
    await expect(page.locator('main')).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await expect(page.getByRole('link', { name: /Buka cerita/i }).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
});
