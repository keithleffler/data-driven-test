import { test, expect } from '@playwright/test';

test('placeholder: the-internet landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/The Internet/);
  await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
});
