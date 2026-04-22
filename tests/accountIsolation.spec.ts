import { test, expect } from '../fixtures/baseTest';
import { users, amounts } from '../utils/testData';

test('Account-level data isolation across users', async ({
  loginPage,
  dashboardPage,
}) => {

  // ---- User A ----
  await loginPage.login(users.userA);

  const userABalance = await dashboardPage.getBalance();
  const userAAccountNo = await dashboardPage.getAccountNumber();
  const userACurrency = await dashboardPage.getCurrency();

  console.log('User A Balance:', userABalance);
  console.log('User A Account No:', userAAccountNo);
  console.log('User A Currency:', userACurrency);

  await dashboardPage.logout();

  // ---- User B ----
  await loginPage.login(users.userB);

  const userBBalance = await dashboardPage.getBalance();
  const userBAccountNo = await dashboardPage.getAccountNumber();
  const userBCurrency = await dashboardPage.getCurrency();

  console.log('User B Balance:', userBBalance);
  console.log('User B Account No:', userBAccountNo);
  console.log('User B Currency:', userBCurrency);

  await dashboardPage.logout();

  // ---- Assertions ----
  // Accounts should be different
  expect(userAAccountNo).not.toBe(userBAccountNo);

  // Balances should be independent
  expect(userABalance).not.toBe(userBBalance);

  // Each user should have a valid currency
  expect(userACurrency).toBeTruthy();
  expect(userBCurrency).toBeTruthy();
});