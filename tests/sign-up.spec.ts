import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SignupPage } from './pages/SignupPage';


let homepage: HomePage;
let loginpage: LoginPage;
let signuppage: SignupPage;
let onboardingpage: OnboardingPage;

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
    signuppage = new SignupPage(page);
    await signuppage.waitForUrlChange(); 
    await signuppage.verifyGetStartedMsg();
    // 'xatiw91450@weepm.com'
    const email = `cloudAppTestEmail${(new Date()).getMilliseconds()}@weepm.com`;
    // at least 8 characters long, contain uppercase letters and a number.
    const pwd = `cloudAppTestPwd${(new Date()).getMilliseconds()}`;
    await signuppage.signUp(email, pwd);
    onboardingpage = new OnboardingPage(page);
    await onboardingpage.waitForUrlChange();
    await onboardingpage.verifyDownloadBtns();
});