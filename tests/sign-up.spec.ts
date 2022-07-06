import { test } from './fixtures/BaseTest';
import { expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('should load CloudApp homepage', async ({ homePage }) => {
    await homePage.goto();
    await homePage.verifyPageTitle();
});

test('should create a new CloudApp account', async ({ homePage, loginPage, signupPage, onboardingPage}) => {
    await homePage.goto();
    await homePage.loginLnk.click();

    loginPage.verifyWelcomeMsg();
    await loginPage.signUpLnk.click();
    
    await signupPage.waitForUrlChange(); 
    await signupPage.verifyGetStartedMsg();
    
    // 'xatiw91450@weepm.com'
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    // at least 8 characters long, contain uppercase letters and a number.
    const pwd = `cloudAppTestPwd${(new Date()).getMilliseconds()}`;
    await signupPage.signUp(email, pwd);
    
    await onboardingPage.waitForUrlChange();
    await onboardingPage.verifySuccessMsg();
    await onboardingPage.verifyDownloadBtns();
});

test('should error when signing up with existing CloudApp account', async ({ signupPage } ) => {
    await signupPage.goto();
    await signupPage.signUp('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await expect(signupPage.errorMsg).toHaveText('Validation failed: Email has already been taken');
});

test('should error when signing up with invalid email format', async ({ signupPage } ) => {
    await signupPage.goto();
    await signupPage.signUp('notanemail', 'cloudAppTestPwd01');
    await expect(signupPage.emailInput, 'Email format validation is expected to be handled by default\'s <input type=email/> element').toHaveAttribute('type', 'email');
});

test('should error when signing up with a password less than 8 characters', async ({ signupPage } ) => {
    await signupPage.goto();
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    const shortPwd = 'lU34567'
    await signupPage.signUp(email, shortPwd);
    await expect(signupPage.errorMsg).toHaveText('Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number.');
});

test('should error when signing up with a password missing lowercase', async ({ signupPage } ) => {
    await signupPage.goto();
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    const missLowerPwd = 'LU345678'
    await signupPage.signUp(email, missLowerPwd);
    await expect(signupPage.errorMsg).toHaveText('Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number.');
});

test('should error when signing up with a password missing uppercase', async ({ signupPage } ) => {
    await signupPage.goto();
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    const missUpperPwd = 'lu345678'
    await signupPage.signUp(email, missUpperPwd);
    await expect(signupPage.errorMsg).toHaveText('Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number.');
});

test('should error when signing up with a password missing a number', async ({ signupPage } ) => {
    await signupPage.goto();
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    const missNumPwd = 'lUlUlUlU'
    await signupPage.signUp(email, missNumPwd);
    await expect(signupPage.errorMsg).toHaveText('Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number.');
});

test('should error when signing up with empty email', async ({ signupPage } ) => {
    await signupPage.goto();
    await signupPage.signUp('', 'cloudAppTestPwd01');
    await expect(signupPage.emailInput, 'Email required validation is expected to be handled by default\'s <input required=required/> element').toHaveAttribute('required', 'required');
});

test('should error when signing up in with empty password', async ({ signupPage } ) => {
    await signupPage.goto();
    await signupPage.signUp('xatiw91450@weepm.com', '');
    await expect(signupPage.pwdInput, 'Password required validation is expected to be handled by default\'s <input required=required/> element').toHaveAttribute('required', 'required');
});