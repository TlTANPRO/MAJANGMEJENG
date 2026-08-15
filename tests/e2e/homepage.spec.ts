import { test, expect } from '@playwright/test';

test.describe('V11 homepage', () => {
  test('loads the complete editorial journey', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { level: 1, name: /LOOK.*CLOSER/i })).toBeVisible();
    for (const id of ['signal','proposition','index','proof','people','places','culture','creators','current','geo','stories','community','collaborate']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.getByRole('button', { name: /ENTER THE CURRENT/i })).toBeVisible();
    await page.locator('#geo').scrollIntoViewIfNeeded();
    const geo = page.locator('#geo');
    await expect(geo).toBeVisible();
    await expect(geo.locator('.geo-copy')).toContainText('INDONESIA');
    await expect(geo.locator('iframe[title="Peta Kabupaten Lumajang"]')).toBeAttached();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('HAVE SOMETHING', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    expect(await page.evaluate(() => location.hash)).toBe('');
  });

  test('story reader opens and save state changes', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /OPEN FEATURE/i }).first().click();
    const reader = page.locator('.story-reader');
    await expect(reader).toBeVisible();
    const save = reader.getByRole('button', { name: 'SAVE STORY', exact: true });
    await expect(save).toBeVisible();
    await save.click();
    await expect(reader.getByRole('button', { name: 'SAVED', exact: true })).toBeVisible();
  });
});
