import { test, expect } from '@playwright/test';

test.describe('V8 homepage', () => {
  test('loads and exposes the living signal journey', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { level: 1, name: /FOLLOW WHAT IS MOVING/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore stories/i }).first()).toBeVisible();
    await expect(page.getByText('Different worlds.', { exact: false })).toBeVisible();
    await expect(page.getByText('SOCIAL CURRENT')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/FROM SOCIAL/i)).toBeVisible();
    await expect(page.getByText('Punya sesuatu', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('navigation reaches core V8 routes', async ({ page }) => {
    for (const route of ['/stories', '/originals', '/creators', '/community', '/collaborate']) {
      await page.goto(`.${route}`);
      await expect(page.locator('body')).not.toContainText('Application error');
      await expect(page.locator('main')).toBeVisible();
      expect(page.url()).toContain(route);
    }
  });
});
