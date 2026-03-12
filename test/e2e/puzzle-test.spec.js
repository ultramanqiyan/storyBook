import { test, expect } from '@playwright/test';

test.describe('谜题测试', () => {
  test.slow();
  
  test('测试谜题选择题功能', async ({ page }) => {
    test.setTimeout(180000);
    
    page.on('console', msg => {
      console.log(`[浏览器日志] ${msg.type()}: ${msg.text()}`);
    });

    page.on('response', async response => {
      if (response.url().includes('/api/') && response.status() === 200) {
        try {
          const json = await response.json();
          console.log(`[响应] ${response.url()}:`, JSON.stringify(json).substring(0, 300));
        } catch (e) {}
      }
    });

    await page.addInitScript(() => {
      localStorage.setItem('user_id', 'test-user-001');
    });

    console.log('=== 步骤1: 访问导演页面 ===');
    await page.goto('http://127.0.0.1:8788/director.html?book_id=id-mmng9fby-nqfkdjkes');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => typeof window.selections !== 'undefined', { timeout: 10000 });
    await page.waitForTimeout(2000);

    console.log('=== 步骤2: 选择卡牌 ===');
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.fan-card');
      cards.forEach(card => {
        const type = card.dataset.type;
        const selections = window.selections;
        if ((type === 'protagonist' && !selections.protagonist) ||
            (type === 'adventure' && !selections.adventure) ||
            (type === 'weather' && !selections.weather) ||
            (type === 'terrain' && !selections.terrain)) {
          card.click();
        }
      });
    });
    await page.waitForTimeout(2000);

    console.log('=== 步骤3: 点击开始按钮 ===');
    const startBtn = page.locator('#startBtn');
    await page.waitForFunction(() => !document.getElementById('startBtn').disabled, { timeout: 10000 });
    await startBtn.click();
    await page.waitForURL(/chapter(\.html)?\?id=/, { timeout: 60000 });
    console.log('跳转到章节页面');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // 获取谜题数据
    const currentPuzzle = await page.evaluate(() => window.currentPuzzle);
    console.log('当前谜题:', JSON.stringify(currentPuzzle));
    
    // 点击谜题按钮
    const puzzleBtn = page.locator('.riddle-btn, .puzzle-btn, button:has-text("Riddle")');
    await puzzleBtn.first().click();
    await page.waitForTimeout(2000);
    console.log('点击了谜题按钮');

    // 检查选项
    const options = page.locator('.puzzle-option');
    const optionCount = await options.count();
    console.log(`选项数量: ${optionCount}`);

    // 获取正确答案
    const correctAnswer = currentPuzzle.answer;
    console.log(`正确答案: ${correctAnswer}`);

    // 找到正确答案的选项索引
    let correctOptionIndex = -1;
    for (let i = 0; i < optionCount; i++) {
      const optText = await options.nth(i).textContent();
      console.log(`选项${i}: ${optText}`);
      if (optText.includes(correctAnswer)) {
        correctOptionIndex = i;
      }
    }
    console.log(`正确答案索引: ${correctOptionIndex}`);

    // 点击正确答案
    if (correctOptionIndex >= 0) {
      await options.nth(correctOptionIndex).click();
      await page.waitForTimeout(1000);
      console.log(`点击了正确答案选项（索引${correctOptionIndex}）`);

      // 点击提交按钮
      const submitBtn = page.locator('.puzzle-submit');
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await page.waitForTimeout(5000);
        console.log('点击了提交按钮');
        
        // 检查谜题弹窗是否关闭（表示答案正确）
        const puzzleOverlay = page.locator('#puzzleOverlay.active');
        const isStillVisible = await puzzleOverlay.isVisible().catch(() => false);
        console.log(`谜题弹窗是否仍然显示: ${isStillVisible}`);
        
        if (!isStillVisible) {
          console.log('✅ 谜题解答成功！弹窗已关闭');
        } else {
          console.log('❌ 谜题解答失败，弹窗仍然显示');
        }
      }
    }

    await page.waitForTimeout(3000);
  });
});
