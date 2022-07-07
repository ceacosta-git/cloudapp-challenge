import { expect, Locator, Page } from '@playwright/test';

export class Navigation {
    readonly page: Page;
    readonly mainMenu: Locator;
    readonly settingsOpt: Locator;
    readonly profileSideMenuOpt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainMenu = page.locator('#main-menu');
        this.settingsOpt = page.locator('text=Settings');
        this.profileSideMenuOpt = page.locator('data-testid=profile-settings');
    }

    async gotoMyProfile(): Promise<void> {
        await this.mainMenu.click();
        await this.settingsOpt.click();
        await this.profileSideMenuOpt.click();
    }

}