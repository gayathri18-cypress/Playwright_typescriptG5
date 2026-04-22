import { test, expect, chromium } from '@playwright/test';
import { login } from '../pages/login';
import { Account } from '../pages/account';
import { user1 } from '../Users/user1';
import { user2 } from '../Users/user2';

test('Account level data isolation across users', async () => {
  test.setTimeout(60000);

  const browser = await chromium.launch({ headless: false });

  //user1
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();

  const login1 = new login(page1);
  const account1 = new Account(page1);

  await login1.open();
  await login1.customerLogin(user1.name);

  await account1.deposit('1000');

  const balance1 = await account1.getBalance();

  await account1.openTransactions();
  const transactions1 = await account1.getTransactions();

  // user2
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();

  const login2 = new login(page2);
  const account2 = new Account(page2);

  await login2.open();
  await login2.customerLogin(user2.name);

  const balance2 = await account2.getBalance();

  await account2.openTransactions();
  const transactions2 = await account2.getTransactions();

  // assertions: user2 should NOT see user1's data
  expect(balance2).not.toEqual(balance1);
  expect(transactions2).not.toEqual(transactions1);

  await browser.close();
});