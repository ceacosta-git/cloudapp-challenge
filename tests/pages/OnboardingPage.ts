import { expect, Locator, Page } from '@playwright/test';

export class OnboardingPage {
    readonly page: Page;
    readonly downloadAppBtn: Locator;
    readonly installChromeExtBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.downloadAppBtn = page.locator('data-test-id=onboarding-downloads-app-cta');
        this.installChromeExtBtn = page.locator('data-test-id=onboarding-downloads-chrome-cta');
    }

    async goto() {
        await this.page.goto('https://share.getcloudapp.com/signup');
    }

    async waitForUrlChange(): Promise<void> {
        await this.page.waitForURL('**\/onboarding\/**');
    }
    
    async verifyDownloadBtns(): Promise<void> {
        await expect(this.downloadAppBtn).toBeVisible();
        await expect(this.installChromeExtBtn).toBeVisible();
    }
}