import {test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { SignupPage } from '../pages/SignupPage';

type CloudAppFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    onboardingPage: OnboardingPage;
    signupPage: SignupPage;
};

export const test = base.extend<CloudAppFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    onboardingPage: async ({ page }, use) => {
        await use(new OnboardingPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    }
});