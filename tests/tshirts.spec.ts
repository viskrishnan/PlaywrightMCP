import { test, expect } from '@playwright/test';

test('Navigate to T-shirts and verify Faded Short Sleeve T-shirts', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('http://www.automationpractice.pl/index.php');

  // Step 2: Click on the 'T-shirts' menu item
  await page.getByRole('link', { name: /T-shirts/i }).click();

  // Step 3: Verify 'Faded Short Sleeve T-shirts' is visible in the list
  await expect(page.getByText(/Faded Short Sleeve T-shirts/i)).toBeVisible();
});