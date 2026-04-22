import { test, expect, chromium } from '@playwright/test';
import { login } from '../pages/login';
import { account } from '../pages/account';
import { user1 } from '../users/user1';

test('Financial data integrity - balance consistency', async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new login(page);
  const accountPage = new account(page);

  await loginPage.open();
  await loginPage.customerLogin(user1.name);

  const initialBalance = Number(await accountPage.getBalance());
  console.log('Initial Balance:', initialBalance);

  const depositAmount = 500;
  await accountPage.deposit(depositAmount.toString());

  const afterDepositBalance = Number(await accountPage.getBalance());
  console.log('After Deposit:', afterDepositBalance);

  expect(afterDepositBalance).toBe(initialBalance + depositAmount);

  const withdrawAmount = 200;
  await accountPage.withdraw(withdrawAmount.toString());

  const afterWithdrawBalance = Number(await accountPage.getBalance());
  console.log('After Withdraw:', afterWithdrawBalance);

  expect(afterWithdrawBalance).toBe(
    afterDepositBalance - withdrawAmount
  );

  await browser.close();
});