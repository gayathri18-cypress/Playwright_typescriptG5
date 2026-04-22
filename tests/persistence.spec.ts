import { test, expect } from '../fixtures/baseTest';
import { users, amounts } from '../utils/testData';

test('Persistence of financial data across sessions', async ({
  loginPage,
  dashboardPage,
}) => {

  // ---- First Session ----
  await loginPage.goto();
  await loginPage.login(users.userA);

  await dashboardPage.deposit(amounts.deposit);
  const balanceAfterDeposit = await dashboardPage.getBalance();

  await dashboardPage.logout();

  // ---- New Session ----
  await loginPage.goto();
  await loginPage.login(users.userA);

  const balanceAfterRelogin = await dashboardPage.getBalance();

  // Assertion: Balance should persist
  expect(balanceAfterRelogin).toBe(balanceAfterDeposit);
});