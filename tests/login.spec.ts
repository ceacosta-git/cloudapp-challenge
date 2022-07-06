import { test } from './fixtures/BaseTest';
import { expect } from '@playwright/test';

test('should login with existing CloudApp account', async ({ page, homePage, loginPage}) => {
    await homePage.goto();
    await homePage.loginLnk.click();
    loginPage.login('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await page.waitForURL('**\/dashboard');
    //@toDo: an 'upgrade to pro' modal shows up sometimes. Try to replicate so we can handle closing modal when it shows up. 
    await expect(page.locator('text=Welcome back!')).toBeVisible();
    await page.locator('#main-menu').click();
    await expect(page.locator('text=xatiw91450@weepm.com')).toBeVisible();
});

