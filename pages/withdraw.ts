import {Page} from "@playwright/test"; //class file

export class withdrawpage
{

 constructor(private page: Page)//special method inside class which initialize the obj which maps page/browser
 {

 }

 async withdraw()
 {
    await this.page.getByRole('button', { name: 'Withdrawl' }).click();
    await this.page.getByPlaceholder('amount').fill('100000');
    await this.page.getByRole('button', { name: 'Withdraw', exact: true }).click();
  
 }
}