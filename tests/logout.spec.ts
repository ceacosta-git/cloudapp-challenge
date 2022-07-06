import { test } from './fixtures/BaseTest';

test('should log out user when clicking sign out', async ({ page, loginPage}) => {
    await loginPage.goto();
    await loginPage.login('xatiw91450@weepm.com', 'cloudAppTestPwd01');
    await page.locator('#main-menu').click();
    await page.locator('text=Sign out').click();
    await page.waitForURL('**\/login');
    await loginPage.verifySignedOut();
});
