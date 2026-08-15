import { test, expect } from '@playwright/test';

test.describe('V11 user journeys', () => {
  test('navigation preserves canonical URL', async ({ page }) => {
    await page.goto('./');
    const canonical = await page.evaluate(() => location.href);
    await page.getByRole('button', { name: 'MENU' }).click();
    await expect(page.getByText('NAVIGATION / 001')).toBeVisible();
    await page.getByRole('button', { name: /PEOPLE/i }).click();
    await expect(page.locator('#people')).toBeVisible();
    expect(await page.evaluate(() => location.href)).toBe(canonical);
    expect(await page.evaluate(() => location.hash)).toBe('');
  });

  test('search opens a story reader', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder(/People, places, culture/i)).toBeVisible();
    await page.getByPlaceholder(/People, places, culture/i).fill('people');
    await page.getByRole('button', { name: /The people behind the everyday/i }).click();
    await expect(page.locator('.story-reader')).toBeVisible();
    await expect(page.getByText(/Portraits, makers/i)).toBeVisible();
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
    await expect(page.getByText('NAVIGATION / 001')).toBeVisible();
    await page.getByRole('button', { name: /PEOPLE/i }).click();
    await expect(page.locator('#people')).toBeVisible();
    expect(await page.evaluate(() => location.hash)).toBe('');
  });
});
