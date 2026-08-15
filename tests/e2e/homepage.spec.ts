import { test, expect } from '@playwright/test';

test.describe('V11 homepage', () => {
  test('loads the complete editorial journey', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { level: 1, name: /LOOK.*CLOSER/i })).toBeVisible();
    for (const id of ['signal','proposition','index','proof','people','places','culture','creators','current','stories','community','collaborate']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.getByRole('button', { name: /ENTER THE CURRENT/i })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('HAVE SOMETHING', { exact: false })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    expect(await page.evaluate(() => location.hash)).toBe('');
  });

  test('story reader opens and save state changes', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /OPEN FEATURE/i }).first().click();
    await expect(page.locator('.story-reader')).toBeVisible();
    await expect(page.getByText(/SAVE STORY|SAVED/).last()).toBeVisible();
    await page.getByRole('button', { name: /SAVE STORY/i }).click();
    await expect(page.getByRole('button', { name: /SAVED/i })).toBeVisible();
  });
});
