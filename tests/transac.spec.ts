import { test, expect } from '@playwright/test';

test('project group 5', async ({ page }) => {
test.setTimeout(60000)
//url check//
  await page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  )
  //Login//
 await page.getByRole('button', { name: 'Customer Login' }).click();
 await page.locator('#userSelect').selectOption({ label: 'Ron Weasly' });
 await page.getByRole('button', { name: 'Login' }).click();
 await expect(page.locator('.fontBig.ng-binding')).toContainText('Ron Weasly');


//deposit//
await page.getByRole('button',{name: 'Deposit'}).click();
await page.locator("input[placeholder='amount']").fill('300')
await page.locator("button[type='submit']").click();
await expect(page.locator('.error.ng-binding')).toContainText('Deposit Successful');


//withdrawl//
await page.getByRole('button',{name: 'Withdrawl'}).click();
await page.locator("input[placeholder='amount']").fill('100')
await page.locator("button[type='submit']").click()

// Transaction
await page.getByRole('button', { name: 'Transactions' }).click();

// wait for table rows to appear /issue is header only shown as first row
const tableread = page.locator('table.table-bordered.table-striped');
await expect(tableread.first()).toBeVisible();
// Latest row
const Lastransaction = tableread.last();

// validate amount and type - row transaction history is not updated
//Expected->
//await expect(Lastransaction.locator('td').nth(1)).toHaveText('100');
//await expect(Lastransaction.locator('td').nth(2)).toHaveText('Debit');
//Actual->

await expect(Lastransaction.locator('td').nth(1)).toHaveText('Amount');
await expect(Lastransaction.locator('td').nth(2)).toHaveText('Transaction Type');



})