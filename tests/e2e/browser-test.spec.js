import { test, expect, chromium } from '@playwright/test';

test('简单浏览器测试', async ({ page }) => {
  test.setTimeout(10000);
  
  console.log('=== 测试开始 ===');
  
  await page.goto('https://example.com');
  
  const title = await page.title();
  console.log('页面标题:', title);
  
  await page.screenshot({ path: 'test-screenshot.png' });
  
  expect(title).toBeTruthy();
  
  console.log('=== 测试完成 ===');
});
