import { test, expect } from '@playwright/test';

test.describe('首页和版本测试', () => {
  test('首页应该正常加载', async ({ page }) => {
    await page.goto('/index.html');

    await expect(page.locator('.hero-title')).toBeVisible({ timeout: 10000 });
  });

  test('登录页面应该正常加载', async ({ page }) => {
    await page.goto('/login.html');

    await expect(page.locator('.login-title').first()).toBeVisible({ timeout: 10000 });
  });

  test('静态资源应该正确加载', async ({ page }) => {
    await page.goto('/login.html');

    const cssResponse = await page.evaluate(() => {
      return fetch('/css/variables.css').then(r => r.status);
    });
    expect(cssResponse).toBe(200);

    const jsResponse = await page.evaluate(() => {
      return fetch('/js/api.js').then(r => r.status);
    });
    expect(jsResponse).toBe(200);
  });
});
