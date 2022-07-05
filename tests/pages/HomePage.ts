import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginLnk: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLnk = page.locator('a:visible', {hasText:'Log in'});
    }

    async goto() {
        await this.page.goto('https://getcloudapp.com');
    }

    async verifyPageTitle(): Promise<void> {
        expect(await this.page.title(), 'CloudApp homepage title').toBe('Screen Recording Software for Mac & PC | CloudApp');
    }
}