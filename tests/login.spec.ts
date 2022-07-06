import { test } from './fixtures/BaseTest';
import { expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('should login with existing CloudApp account', async ({ page, homePage, loginPage}) => {
    await homePage.goto();
    await homePage.loginLnk.click();
    await loginPage.login('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await page.waitForURL('**\/dashboard');
    //@toDo: an 'upgrade to pro' modal shows up sometimes. Try to replicate so we can handle closing modal when it shows up. 
    await expect(page.locator('text=Welcome back!')).toBeVisible();
    await page.locator('#main-menu').click();
    await expect(page.locator('text=xatiw91450@weepm.com')).toBeVisible();
});

test('should error when login in with a non-existing CloudApp account', async ({ loginPage } ) => {
    await loginPage.goto();
    await loginPage.login('nonExisting@email.com', 'cloudAppTestPwd01');
    await expect(loginPage.errorMsg).toHaveText('Invalid email / password combination');
});

test('should error when login in with a wrong password', async ({ loginPage } ) => {
    await loginPage.goto();
    await loginPage.login('xatiw91450@weepm.com', 'wrongPwd');
    await expect(loginPage.errorMsg).toHaveText('Invalid email / password combination');
});

test('should error when login in with invalid email format', async ({ loginPage } ) => {
    await loginPage.goto();
    await loginPage.login('notanemail', 'cloudAppTestPwd01');
    await expect(loginPage.emailInput, 'Email format validation is expected to be handled by default\'s <input type=email/> element').toHaveAttribute('type', 'email');
});

test('should error when login in with empty email', async ({ loginPage } ) => {
    await loginPage.goto();
    await loginPage.login('', 'cloudAppTestPwd01');
    await expect(loginPage.emailInput, 'Email required validation is expected to be handled by default\'s <input required=required/> element').toHaveAttribute('required', 'required');
});

test('should error when login in with empty password', async ({ loginPage } ) => {
    await loginPage.goto();
    await loginPage.login('xatiw91450@weepm.com', '');
    await expect(loginPage.pwdInput, 'Password required validation is expected to be handled by default\'s <input required=required/> element').toHaveAttribute('required', 'required');
});