import { Page, expect } from '@playwright/test';

export class account {
  constructor(private page: Page) {}

  //Get Balance
  async getBalance() {
    const text = await this.page.locator('.center').first().textContent();
    const match = text?.match(/Balance\s*:\s*(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  // Deposit
  async deposit(amount: string) {
    // Open Deposit tab
    await this.page.getByRole('button', { name: 'Deposit' }).click();

    // Target Deposit form
    const depositForm = this.page.locator('form[ng-submit="deposit()"]');

    await depositForm.locator('input[ng-model="amount"]').fill(amount);
    await depositForm.locator('button[type="submit"]').click();

    // Optional validation
    await expect(this.page.locator('.error')).toContainText('Successful');
  }

  // Withdraw
  async withdraw(amount: string) {
    // Open Withdraw tab
    await this.page.getByRole('button', { name: 'Withdrawl' }).click();

    // Target correct Withdraw form
    const withdrawForm = this.page.locator('form[ng-submit="withdrawl()"]');

    await withdrawForm.locator('input[ng-model="amount"]').fill(amount);
    await withdrawForm.locator('button[type="submit"]').click();
  }

  // Transactions
  async openTransactions() {
    await this.page.getByRole('button', { name: 'Transactions' }).click();
  }

  async getTransactions() {
    return await this.page.locator('table tbody tr').allTextContents();
  }
}