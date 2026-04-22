import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async deposit(amount: string) {
    await this.page.getByRole('button', { name: 'Deposit' }).click();
    await this.page.locator('input[ng-model="amount"]').waitFor({ state: 'visible' });
    await this.page.locator('input[ng-model="amount"]').fill(amount);
    await this.page.locator('form').getByRole('button', { name: 'Deposit' }).click();
    await this.page.locator('span.error.ng-binding').waitFor({ state: 'visible' });
  }

  async withdraw(amount: string) {
    await this.page.getByRole('button', { name: 'Withdrawl' }).click();
    await this.page.locator('input[ng-model="amount"]').waitFor({ state: 'visible' });
    await this.page.locator('input[ng-model="amount"]').fill(amount);
    await this.page.getByRole('button', { name: 'Withdraw' }).click();
    await this.page.locator('span.error.ng-binding').waitFor({ state: 'visible' });
  }

  async getBalance(): Promise<number> {
    const balanceText = await this.page
      .locator('strong.ng-binding')
      .nth(1)
      .textContent();
    return Number(balanceText);
  }

  async getAccountNumber(): Promise<string> {
    const accountText = await this.page
      .locator('strong.ng-binding')
      .nth(0)
      .textContent();
    return accountText?.trim() ?? '';
  }

  async getCurrency(): Promise<string> {
    const currencyText = await this.page
      .locator('strong.ng-binding')
      .nth(2)
      .textContent();
    return currencyText?.trim() ?? '';
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
    await this.page.waitForURL('**/login', { timeout: 10000 });
    await this.page.getByRole('button', { name: 'Customer Login' }).waitFor({
      state: 'visible',
    });
  }
}