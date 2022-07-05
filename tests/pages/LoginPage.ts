import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signUpLnk: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpLnk = page.locator('text=Sign up for free');
    }

    async goto() {
        await this.page.goto('https://share.getcloudapp.com/login');
    }

    async verifyWelcomeMsg(): Promise<void> {
        await expect(this.page.locator('text=Welcome back')).toBeVisible();
    }
}