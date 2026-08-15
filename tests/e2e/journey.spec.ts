import { test, expect } from '@playwright/test';

test.describe('V8 user journeys', () => {
  test('story journey and search work', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Search' }).click();
    const input = page.getByPlaceholder('Cari cerita, orang, tempat, ide...');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('riuhnya');
    const result = page.locator('.v8-result').filter({ hasText: /Di balik riuhnya pasar, ada kota yang sedang belajar mendengar/i }).first();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page).toHaveURL(/\/MAJANGMEJENG\/stories\//);
    await expect(page.getByRole('article')).toBeVisible();
    await expect(page.getByRole('button', { name: /Share/i })).toBeVisible();
  });

  test('social current exposes Instagram and TikTok', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByText('SOCIAL CURRENT')).toBeVisible();
    await expect(page.locator('a[href="https://www.instagram.com/majangmejeng_/"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tiktok.com/@majangmejeng_"]').first()).toBeVisible();
  });

  test('collaboration form validates and completes', async ({ page }) => {
    await page.goto('./collaborate');
    const submit = page.getByRole('button', { name: /Kirim brief/i });
    await expect(submit).toBeVisible();
    await submit.click();
    await expect(page.locator('input:invalid').first()).toBeVisible();
    await page.getByRole('textbox', { name: 'Nama' }).fill('Majang Mejeng Test');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('combobox', { name: 'Kebutuhan' }).selectOption('Campaign');
    await page.getByRole('textbox', { name: 'Brief' }).fill('V8 E2E test');
    await submit.click();
    await expect(page.getByText(/Brief sudah masuk/i)).toBeVisible();
  });
});
