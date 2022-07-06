import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly pwdInput: Locator;
    readonly signInBtn: Locator;
    readonly signUpLnk: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpLnk = page.locator('text=Sign up for free');
        this.emailInput = page.locator('data-testid=regular-login-email');
        this.pwdInput = page.locator('data-testid=regular-login-password');
        this.signInBtn = page.locator('data-testid=regular-login-submit');
    }

    async goto() {
        await this.page.goto('https://share.getcloudapp.com/login');
    }

    async verifyWelcomeMsg(): Promise<void> {
        await expect(this.page.locator('text=Welcome back')).toBeVisible();
    }

    async login(email:string, password:string): Promise<void> {
        await this.emailInput.fill(email);
        await this.pwdInput.fill(password);
        await this.signInBtn.click();
    }
}