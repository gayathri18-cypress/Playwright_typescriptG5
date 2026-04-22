import { test, expect } from '@playwright/test';

test('Account level data isolation across users', async ({ page }) => {

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

  // ---- Login as Harry Potter ----
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.locator('#userSelect').selectOption({ label: 'Harry Potter' });
  await page.getByRole('button', { name: 'Login' }).click();

  // Ensure login success
  await expect(page.locator('.fontBig')).toHaveText('Harry Potter');

  // Capture account & balance
  const harryAccount = await page.locator('#accountSelect').textContent();
  const harryBalance = await page.locator('strong').nth(1).textContent();

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();

  // ---- Login as Ron Weasley ----
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.locator('#userSelect').selectOption({ label: 'Ron Weasley' });
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.fontBig')).toHaveText('Ron Weasley');

  const ronAccount = await page.locator('#accountSelect').textContent();
  const ronBalance = await page.locator('strong').nth(1).textContent();

  // ---- Validation ----
  expect(ronAccount).not.toBe(harryAccount);
  expect(ronBalance).not.toBe(harryBalance);
});