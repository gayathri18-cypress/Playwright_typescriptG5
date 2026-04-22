import {Page} from "@playwright/test"; //class file

export class loginpage
{

 constructor(private page: Page)//special method inside class which initialize the obj which maps page/browser
 {

 }

 async login()
 {
      await this.page.getByRole('button', { name: 'Customer Login' }).click();//this -> current instance of the class
 }
}