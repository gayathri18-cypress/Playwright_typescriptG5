import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TransactionsPage } from '../pages/TransactionsPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  transactionsPage: TransactionsPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  transactionsPage: async ({ page }, use) => {
    await use(new TransactionsPage(page));
  },
});

export { expect } from '@playwright/test';