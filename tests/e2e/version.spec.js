import { test, expect } from '@playwright/test';

test.describe('首页和版本测试', () => {
  test('首页应该正常加载', async ({ page }) => {
    const response = await page.goto('/index.html');
    expect(response.status()).toBe(200);
    
    const title = await page.title();
    expect(title).toContain('StoryBook');
  });

  test('登录页面应该正常加载', async ({ page }) => {
    const response = await page.goto('/login.html');
    expect(response.status()).toBe(200);
    
    const loginForm = page.locator('#loginForm, form, .login-container, .login-page');
    const hasLoginForm = await loginForm.count() > 0;
    expect(hasLoginForm).toBe(true);
  });

  test('静态资源应该正确加载', async ({ page }) => {
    await page.goto('/login.html');

    const cssResponse = await page.request.get('/css/variables.css');
    expect(cssResponse.status()).toBe(200);

    const jsResponse = await page.request.get('/js/api.js');
    expect(jsResponse.status()).toBe(200);
  });
});
