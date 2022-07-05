import { expect, Locator, Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly pwdInput: Locator;
    readonly signupBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.pwdInput = page.locator('#password');
        this.signupBtn = page.locator('data-testid=regular-signup-submit');
    }

    async goto() {
        await this.page.goto('https://share.getcloudapp.com/signup');
    }

    async waitForUrlChange(): Promise<void> {
        await this.page.waitForURL('**\/signup');
    }
    
    async verifyGetStartedMsg(): Promise<void> {
        await expect(this.page.locator('text=Get started')).toBeVisible();
    }

    async signUp(email:string, password:string): Promise<void> {
        await this.emailInput.fill(email);
        await this.pwdInput.fill(password);
        await this.signupBtn.click();
    }
}