import { test, expect } from '@playwright/test';

test.describe('V10 immersive homepage', () => {
  test('loads the complete scroll journey', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Majang Mejeng/i);
    await expect(page.getByRole('heading', { level: 1, name: /FOLLOW WHAT IS MOVING/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Enter the world/i })).toBeVisible();
    for (const text of ['ENTER THE WORLD','PEOPLE / 01—04','PLACES / FIELD NOTES','CULTURE / IN MOTION','CREATORS / NOW','SOCIAL CURRENT','FEATURED STORIES','COLLABORATE']) {
      await expect(page.getByText(text, { exact: true })).toBeVisible();
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('link', { name: /Start a conversation/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });

  test('featured story controls change editorial content', async ({ page }) => {
    await page.goto('./');
    const heading = page.locator('.v10-feature h3');
    const first = await heading.innerText();
    await page.getByRole('button', { name: '02' }).last().click();
    await expect(heading).not.toHaveText(first);
  });
});
