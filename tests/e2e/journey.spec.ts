import { test, expect } from '@playwright/test';

test.describe('V12 user journeys', () => {
  test('navigation preserves canonical URL', async ({ page }) => {
    await page.goto('./');
    const canonical = await page.evaluate(() => location.href);
    await page.getByRole('button', { name: 'MENU' }).click();
    const drawer = page.locator('.v12-drawer');
    await expect(drawer.getByText('NAVIGATION / 001')).toBeVisible();
    await drawer.getByRole('button', { name: /PEOPLE/i }).click();
    await expect(page.locator('#people')).toBeVisible();
    expect(await page.evaluate(() => location.href)).toBe(canonical);
    expect(await page.evaluate(() => location.hash)).toBe('');
  });

  test('search opens a story reader', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Search' }).click();
    const layer = page.locator('.v12-search');
    const input = layer.getByPlaceholder(/People, places, culture/i);
    await expect(input).toBeVisible();
    await input.fill('people');
    await layer.getByRole('button', { name: /The people behind the everyday/i }).click();
    await expect(page.locator('.v12-reader')).toBeVisible();
    await expect(page.locator('.v12-reader').getByText(/Portraits, makers/i)).toBeVisible();
  });

  test('official social channels are reachable', async ({ page }) => {
    await page.goto('./');
    await page.locator('#current').scrollIntoViewIfNeeded();
    await expect(page.locator('a[href="https://www.instagram.com/majangmejeng_/"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tiktok.com/@majangmejeng_"]').first()).toBeVisible();
  });

  test('mobile menu navigates without route assumptions', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only journey.');
    await page.goto('./');
    await page.getByRole('button', { name: 'MENU' }).click();
    const drawer = page.locator('.v12-drawer');
    await expect(drawer.getByText('NAVIGATION / 001')).toBeVisible();
    await drawer.getByRole('button', { name: /PEOPLE/i }).click();
    await expect(page.locator('#people')).toBeVisible();
    expect(await page.evaluate(() => location.hash)).toBe('');
  });
});
