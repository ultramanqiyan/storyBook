import { chromium, devices } from 'playwright';

async function main() {
  const device = devices['iPhone 12'];
  
  console.log('🚀 启动移动端仿真器...');
  console.log('📱 设备: iPhone 12 (390px)');
  console.log('🔗 URL: http://127.0.0.1:8081/library.html');
  console.log('\n按 Ctrl+C 关闭浏览器\n');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    ...device,
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8081/library.html');
  
  console.log('✅ 浏览器已启动');
  console.log('📌 测试页面:');
  console.log('   - Library: http://127.0.0.1:8081/library.html');
  console.log('   - Director: http://127.0.0.1:8081/director.html');
  console.log('   - Book: http://127.0.0.1:8081/books/preset-ai-001.html');
  console.log('   - Chapter: http://127.0.0.1:8081/chapters/chapter-ai001-01.html');
  console.log('\n📌 按 Ctrl+C 关闭浏览器\n');
  
  await page.waitForEvent('close', { timeout: 0 }).catch(() => {});
  
  await browser.close();
}

main().catch(console.error);
