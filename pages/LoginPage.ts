import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
      { waitUntil: 'domcontentloaded' }
    );

    // Wait for Angular to bootstrap and render the button
    await this.page.getByRole('button', { name: 'Customer Login' }).waitFor({
      state: 'visible',
      timeout: 15000,
    });
  }

  async login(user: string) {
    await this.goto();

    await this.page.getByRole('button', { name: 'Customer Login' }).click();

    await this.page.locator('#userSelect').waitFor({ state: 'visible' });

    await this.page.locator('#userSelect').selectOption({ label: user });

    await this.page.getByRole('button', { name: 'Login' }).click();

    await this.page.getByRole('button', { name: 'Logout' }).waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }
}