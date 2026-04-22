import { Page, expect } from '@playwright/test';

export class login {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
      { waitUntil: 'domcontentloaded' }
    );

    await this.page.getByRole('button', { name: 'Customer Login' }).waitFor();
  }

  async customerLogin(customerName: string) {
    await this.page.getByRole('button', { name: 'Customer Login' }).click();

    const dropdown = this.page.locator('#userSelect');
    await dropdown.waitFor();

    await dropdown.selectOption({ label: customerName });

    await this.page.getByRole('button', { name: 'Login' }).click();

    await this.page.getByText('Account Number').waitFor();

    await expect(this.page.getByText(customerName)).toBeVisible();
  }
}