import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly avatarFileInput: string;
    readonly submitBtn: Locator;
    readonly errorMsg: Locator;
    readonly successBubbleMsg: Locator;
    readonly successBarMsg: Locator;
    readonly topMenuAvatar: Locator;
    readonly avatar: Locator;

    

    constructor(page: Page) {
        this.page = page;
        this.avatarFileInput = '#user_avatar';
        this.submitBtn = page.locator('data-testid=onboarding-submit-about-you-form');
        this.errorMsg = page.locator('.alert-danger');
        this.successBarMsg = page.locator('div[role="alert"] >> text=Account updated successfully');
        this.successBubbleMsg = page.locator('#content >> text=Account updated successfully');
        this.topMenuAvatar = page.locator('a[role="button"] >> #avatar');
        this.avatar = page.locator('#avatar:below(:text("Avatar"))');
    }

    async updateAvatar(filename:string): Promise<void> {
        await this.page.setInputFiles(this.avatarFileInput, `./tests/avatars/${filename}`);
        await this.submitBtn.click();
    }

    async verifyAvatarUpdated(expectedAvatarName:string): Promise<void> {
        await expect(this.successBarMsg).toBeVisible();
        await expect(this.successBubbleMsg).toBeVisible();
        await expect(this.successBarMsg).not.toBeVisible();
        await expect(this.successBubbleMsg).not.toBeVisible();

        const avatarStylePattern = new RegExp(`.*\/${expectedAvatarName}.*`);
        await expect(this.topMenuAvatar).toHaveAttribute('style', avatarStylePattern);
        await expect(this.avatar).toHaveAttribute('style', avatarStylePattern);
    }

    async verifyAvatarError(errorMsg:string): Promise<void> {
        await expect(this.errorMsg).toBeVisible();
        await expect(this.errorMsg).toHaveText(errorMsg);
    }

}