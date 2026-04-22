//run header - npx playwright test or npx playwright test example.spec.ts
//run headless -  npx playwright test --headed
//to get html report -  npx playwright show-report
//to run on specific browser - npx playwright test --project=chromium
//to run in specific browser using headed - npx playwright test --project=chromium --headed
//locator identifies the element
//DOM - document object module, dom is a api interface provided by browser


import {test,expect} from "@playwright/test"; //from playwright/test model importing test and expect
import { loginpage } from "../pages/Loginpage1";
import { BASE_URL } from "../utils/env";
import { customerpage } from "../pages/customerpage";
import { withdrawpage } from "../pages/withdraw";
import { defineConfig } from "@playwright/test";

//fixture -> global variable = page, browswer etc
test("verify overdraft prevention", async ({page})=>{
  const LP = new loginpage(page);
  const CM = new customerpage(page);
  const WD = new withdrawpage(page);
  await page.goto(BASE_URL);

  let title: string = await page.title();
  console.log("Tile:", title);
  
  await expect(page).toHaveTitle("XYZ Bank");
  
  //login
  await LP.login();
  //await page.getByRole('button', { name: 'Customer Login' }).click();

  await CM.customer();
  //select customer name
  //await page.getByRole('combobox').selectOption('Harry Potter');
  //await page.getByRole('button', { name: 'Login' }).click();

  //Withdraw
  await WD.withdraw();
  //await page.getByRole('button', { name: 'Withdrawl' }).click();
  //await page.getByPlaceholder('amount').fill('100000');
  //await page.waitForTimeout(500);
  //await page.getByRole('button', { name: 'Withdraw', exact: true }).click();
  
  //validation
  await expect(page.getByText('Transaction Failed. You can not withdraw amount more than the balance.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  //await page.pause();
})

