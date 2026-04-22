import { Page, expect } from '@playwright/test';

export class Account {
  constructor(private page: Page) {}
  async getBalance() {
    const textBlock = this.page.locator('.center').first();

    await textBlock.waitFor({ state: 'visible' });

    const text = await textBlock.textContent();

    const match = text?.match(/Balance\s*:\s*(\d+)/);

    return match ? match[1] : null;
  }

  async deposit(amount: string) {
    await this.page.getByRole('button', { name: 'Deposit' }).first().click();

    const input = this.page.locator('input[ng-model="amount"]');
    await input.waitFor();

    await input.fill(amount);

    await this.page.locator('button[type="submit"]').click();

    await expect(this.page.locator('.error')).toContainText('Successful');
  }

  async openTransactions() {
    await this.page.getByRole('button', { name: 'Transactions' }).click();

    // Wait for table only
    await this.page.locator('table').waitFor({ state: 'visible' });
  }

  async getTransactions() {
    const rows = this.page.locator('table tbody tr');
    const count = await rows.count();

    if (count === 0) {
      return [];
    }

    return await rows.allTextContents();
  }
}