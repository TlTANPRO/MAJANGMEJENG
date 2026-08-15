import { test, expect } from '@playwright/test';

test.describe('V11 responsive behavior', () => {
  test('mobile navigation opens and remains usable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only navigation.');
    await page.goto('./');
    const menu = page.getByRole('button', { name: 'MENU' });
    await expect(menu).toBeVisible();
    await menu.click();
    const drawer = page.locator('.drawer');
    await expect(drawer.getByText('NAVIGATION / 001')).toBeVisible();
    const people = drawer.getByRole('button', { name: /PEOPLE/i });
    await expect(people).toBeVisible();
    await people.click();
    await expect(page.locator('#people')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    expect(await page.evaluate(() => location.hash)).toBe('');
  });

  test('deep scroll preserves the end scene and horizontal bounds', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('HAVE SOMETHING', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('native scroll remains available after rapid scrolling', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => { for (let i=0;i<8;i++) window.scrollBy(0, window.innerHeight * 0.75); });
    const y = await page.evaluate(() => window.scrollY);
    expect(y).toBeGreaterThan(0);
    expect(await page.evaluate(() => location.hash)).toBe('');
  });
});
