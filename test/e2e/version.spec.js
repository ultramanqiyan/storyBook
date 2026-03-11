import { test, expect } from '@playwright/test';

const BASE_URL = 'https://storybook-d4u.pages.dev';

test.describe('StoryBook HelloWorld E2E Tests', () => {
  
  test('首页应该正常加载', async ({ page }) => {
    await page.goto(BASE_URL);
    
    await expect(page).toHaveTitle(/StoryBook/);
    
    await expect(page.locator('h1')).toContainText('StoryBook');
    
    await expect(page.locator('body')).toContainText('HelloWorld');
  });

  test('版本信息应该正确显示', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const versionElement = page.locator('#version');
    await expect(versionElement).toBeVisible({ timeout: 10000 });
    
    await expect(versionElement).toContainText('V0.1', { timeout: 10000 });
    
    const versionText = await versionElement.textContent();
    expect(versionText).toContain('V0.1');
  });

  test('API应该返回正确的版本数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/version`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(data.data.version).toBe('V0.1');
    expect(data.data.description).toContain('HelloWorld');
  });

  test('页面应该有正确的样式', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    const versionInfo = page.locator('.version-info');
    await expect(versionInfo).toBeVisible();
  });
});
