import { test, expect } from '@playwright/test';

test.describe('V4 homepage', () => {
  test('loads and exposes the editorial flow', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { name: /Yang menarik/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore stories/i })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('Lihat creators')).toBeVisible();
    await expect(page.getByText('Lihat di social.')).toBeVisible();
    await expect(page.getByText('Punya sesuatu')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('navigation reaches core V4 routes', async ({ page }) => {
    for (const route of ['/stories', '/originals', '/creators', '/community', '/work-with-us']) {
      await page.goto(route);
      await expect(page.locator('body')).not.toContainText('Application error');
      expect(page.url()).toContain(route);
    }
  });
});
