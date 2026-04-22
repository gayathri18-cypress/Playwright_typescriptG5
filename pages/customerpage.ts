import {Page} from "@playwright/test"; //class file

export class customerpage
{

 constructor(private page: Page)//special method inside class which initialize the obj which maps page/browser
 {

 }

 async customer()
 {
  await this.page.getByRole('combobox').selectOption('Harry Potter');
  await this.page.getByRole('button', { name: 'Login' }).click();//this -> current instance of the class
 }
}