import { test, expect } from '@playwright/test';

test('should load CloudApp homepage', async ({page}) => {
    await page.goto('https://getcloudapp.com');
    expect(await page.title(), 'CloudApp homepage title').toBe('Screen Recording Software for Mac & PC | CloudApp');
});