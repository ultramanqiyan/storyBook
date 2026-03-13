import { test, expect } from '@playwright/test';

test('诊断测试 - 检查本地服务器', async ({ page }) => {
  test.setTimeout(15000);
  
  console.log('=== 开始诊断测试 ===');
  console.log('尝试访问 http://127.0.0.1:8789');
  
  const response = await page.goto('http://127.0.0.1:8789', { 
    timeout: 10000,
    waitUntil: 'domcontentloaded'
  });
  
  console.log('响应状态:', response?.status());
  
  const title = await page.title();
  console.log('页面标题:', title);
  
  expect(response?.status()).toBe(200);
});
