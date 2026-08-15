import { test, expect } from '@playwright/test';

test.describe('V6 user journeys', () => {
  test('story journey and search work', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByPlaceholder(/Cari cerita/i).fill('riuhnya');
    const result = page.getByRole('link', { name: /Di balik riuhnya pasar, ada kota yang sedang belajar mendengar/i }).last();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page).toHaveURL(/\/MAJANGMEJENG\/stories\//);
    await expect(page.getByRole('article')).toBeVisible();
    await expect(page.getByRole('button', { name: /Share/i })).toBeVisible();
  });

  test('social current exposes Instagram and TikTok', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByText('THE SOCIAL CURRENT')).toBeVisible();
    await expect(page.locator('a[href="https://www.instagram.com/majangmejeng_/"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tiktok.com/@majangmejeng_"]').first()).toBeVisible();
  });

  test('collaboration form validates and completes', async ({ page }) => {
    await page.goto('./collaborate');
    const submit = page.getByRole('button', { name: /Kirim brief/i });
    await expect(submit).toBeVisible();
    await submit.click();
    await expect(page.locator('input:invalid').first()).toBeVisible();
    await page.getByPlaceholder('Nama lengkap').fill('Majang Mejeng Test');
    await page.getByPlaceholder('email@contoh.com').fill('test@example.com');
    await page.getByPlaceholder(/Tulis konteks/i).fill('V6 E2E test');
    await page.locator('select').selectOption('Campaign');
    await submit.click();
    await expect(page.getByText(/Terima kasih\. Ceritanya sudah masuk/i)).toBeVisible();
  });
});
