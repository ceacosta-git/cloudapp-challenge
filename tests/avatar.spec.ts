import { expect } from '@playwright/test';
import { test } from './fixtures/BaseTest';

test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await page.locator('#main-menu').click();
    await page.locator('text=Settings').click();
    await page.locator('text="Profile"').click();
});

test('should update avatar when uploading a valid jpeg image', async ({ page }) => {
    await page.setInputFiles('#user_avatar', './tests/avatars/valid-200x200.jpeg');
    await page.locator('data-testid=onboarding-submit-about-you-form').click();
    await expect(page.locator('div[role="alert"] >> text=Account updated successfully')).toBeVisible();
    await expect(page.locator('#content >> text=Account updated successfully')).toBeVisible();
    await expect(page.locator('div[role="alert"] >> text=Account updated successfully')).not.toBeVisible();
    await expect(page.locator('#content >> text=Account updated successfully')).not.toBeVisible();
    await expect(page.locator('a[role="button"] >> #avatar')).toHaveAttribute('style', /.*\/avatar.jpeg.*/);
    await expect(page.locator('#avatar:below(:text("Avatar"))')).toHaveAttribute('style', /.*\/avatar.jpeg.*/);
});

test('should update avatar when uploading a valid png image', async ({ page }) => {
    await page.setInputFiles('#user_avatar', './tests/avatars/valid-500x500.png');
    await page.locator('data-testid=onboarding-submit-about-you-form').click();
    await expect(page.locator('div[role="alert"] >> text=Account updated successfully')).toBeVisible();
    await expect(page.locator('#content >> text=Account updated successfully')).toBeVisible();
    await expect(page.locator('div[role="alert"] >> text=Account updated successfully')).not.toBeVisible();
    await expect(page.locator('#content >> text=Account updated successfully')).not.toBeVisible();
    await expect(page.locator('a[role="button"] >> #avatar')).toHaveAttribute('style', /.*\/avatar.png.*/);
    await expect(page.locator('#avatar:below(:text("Avatar"))')).toHaveAttribute('style', /.*\/avatar.png.*/);
});
