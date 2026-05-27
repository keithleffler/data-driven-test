import { test, expect } from '@playwright/test';

test('placeholder: example.com loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example Domain/);
});
