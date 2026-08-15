import { test, expect } from '@playwright/test';

test.describe('V4 user journeys', () => {
  test('story journey and search work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByPlaceholder(/Cari cerita/i).fill('pasar');
    await expect(page.getByText(/pasar santa/i)).toBeVisible();
    await page.getByText(/pasar santa/i).click();
    await expect(page).toHaveURL(/\/stories\//);
    await expect(page.getByRole('article')).toBeVisible();
  });

  test('social entry routes preserve context', async ({ page }) => {
    for (const platform of ['instagram', 'tiktok']) {
      await page.goto(`/go/${platform}`);
      await expect(page.getByText(new RegExp(`From ${platform}`, 'i'))).toBeVisible();
      await expect(page.getByRole('link', { name: /Lanjutkan cerita/i })).toBeVisible();
    }
  });

  test('collaboration form validates and completes', async ({ page }) => {
    await page.goto('/work-with-us');
    await page.getByRole('button', { name: /Kirim brief/i }).click();
    await expect(page.locator('input:invalid').first()).toBeVisible();
    await page.getByPlaceholder('Nama').fill('Majang Mejeng Test');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder(/Ceritakan project/i).fill('V4 E2E test');
    await page.getByRole('button', { name: /Kirim brief/i }).click();
    await expect(page.getByText(/Brief sudah masuk/i)).toBeVisible();
  });
});
