import { Page } from '@playwright/test';

export class TransactionsPage {
  constructor(private page: Page) {}

  async openTransactions() {
    await this.page.getByRole('button', { name: 'Transactions' }).click();
  }

  async getTransactionCount(): Promise<number> {
    return await this.page.locator('table tbody tr').count();
  }
}