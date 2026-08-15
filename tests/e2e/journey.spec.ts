import { test, expect } from '@playwright/test';

test.describe('V5.1 user journeys', () => {
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

  test('social entry routes preserve context', async ({ page }) => {
    for (const platform of ['instagram', 'tiktok']) {
      await page.goto(`./go/${platform}`);
      await expect(page.getByText(new RegExp(`From ${platform}`, 'i'))).toBeVisible();
      await expect(page.getByRole('link', { name: /Continue the story/i })).toBeVisible();
    }
  });

  test('collaboration form validates and completes', async ({ page }) => {
    await page.goto('./collaborate');
    const submit = page.getByRole('button', { name: /Kirim brief/i });
    await expect(submit).toBeVisible();
    await submit.click();
    await expect(page.locator('input:invalid').first()).toBeVisible();
    await page.getByPlaceholder('Nama lengkap').fill('Majang Mejeng Test');
    await page.getByPlaceholder('email@contoh.com').fill('test@example.com');
    await page.getByPlaceholder(/Tulis konteks/i).fill('V5.1 E2E test');
    await submit.click();
    await expect(page.getByText(/Terima kasih\. Ceritanya sudah masuk/i)).toBeVisible();
  });
});
