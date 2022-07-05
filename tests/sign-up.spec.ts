import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';


let homepage: HomePage;
let loginpage: LoginPage;

test.beforeEach(async ({page}) => {
    homepage = new HomePage(page);
    await homepage.goto();
});

test('should load CloudApp homepage', async ({page}) => {
    await homepage.verifyPageTitle();
});

test('should create a new CloudApp account', async ({page}) => {
    await homepage.loginLnk.click();
    loginpage = new LoginPage(page);
    loginpage.verifyWelcomeMsg();
    await loginpage.signUpLnk.click();
    await page.waitForURL('**\/signup'); 
    await expect(page.locator('text=Get started')).toBeVisible();
    const emailInput = page.locator('#email');
    const pwdInput = page.locator('#password');
    // 'xatiw91450@weepm.com'
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    await emailInput.fill(email);
    // at least 8 characters long, contain uppercase letters and a number.
    const pwd = `cloudAppTestPwd${(new Date()).getMilliseconds()}`;
    await pwdInput.fill(pwd);
    const signUpBtn = page.locator('data-testid=regular-signup-submit');
    signUpBtn.click();
    await page.waitForURL('**\/onboarding\/**');
    await expect(page.locator('data-test-id=onboarding-downloads-app-cta')).toBeVisible();
    await expect(page.locator('data-test-id=onboarding-downloads-chrome-cta')).toBeVisible();

});