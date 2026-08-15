import { test, expect } from '@playwright/test';

test.describe('V9 homepage', () => {
  test('loads the complete editorial journey', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { level: 1, name: /FOLLOW WHAT IS MOVING/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Explore stories/i })).toBeVisible();
    await expect(page.getByText('A NOTE FROM MM')).toBeVisible();
    await expect(page.getByText('01 / STORIES')).toBeVisible();
    await expect(page.getByText('02 / WORLDS')).toBeVisible();
    await expect(page.getByText('03 / SOCIAL CURRENT')).toBeVisible();
    await expect(page.getByText('04 / COLLABORATE')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('link', { name: /Start a conversation/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('story controls change editorial content', async ({ page }) => {
    await page.goto('./');
    const first = page.locator('.v9-story-copy h2').innerText();
    await page.getByRole('button', { name: 'Story 2' }).click();
    await expect(page.locator('.v9-story-copy h2')).not.toHaveText(first);
  });
});
