import { test } from './fixtures/BaseTest';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
});

test('should load CloudApp homepage', async ({ homePage }) => {
    await homePage.verifyPageTitle();
});

test('should create a new CloudApp account', async ({ homePage, loginPage, signupPage, onboardingPage}) => {
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
    await onboardingPage.verifyDownloadBtns();
});