import { expect } from '@playwright/test';
import { test } from './fixtures/BaseTest';

test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await page.locator('#main-menu').click();
    await page.locator('text=Settings').click();
    await page.locator('text="Profile"').click();
});

test('should update avatar when uploading a valid jpeg image', async ({ page, profilePage }) => {
    await profilePage.updateAvatar('valid-200x200.jpeg');
    await profilePage.verifyAvatarUpdated('avatar.jpeg');
});

test('should update avatar when uploading a valid png image', async ({ page, profilePage }) => {
    await profilePage.updateAvatar('valid-500x500.png');
    await profilePage.verifyAvatarUpdated('avatar.png');
});

test('should error when uploading an image greater than 500x500px', async ({ page, profilePage }) => {
    await profilePage.updateAvatar('invalid-large-501x501.jpeg');
    await profilePage.verifyAvatarError('Avatar Max size is 500x500px');
});

test('should error when uploading a file that is not an image', async ({ page, profilePage }) => {
    await profilePage.updateAvatar('test.txt');
    await profilePage.verifyAvatarError('Avatar must be an image');
});
