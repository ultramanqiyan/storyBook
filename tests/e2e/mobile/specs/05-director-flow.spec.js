import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('导演页流程测试', () => {
  let uiChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('步骤1: 进入导演页', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'director-initial', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    await uiChecker.checkFontSize('.director-header h1', 16);
    
    console.log(`[${projectName}] 导演页初始问题:`, uiChecker.getIssues());
  });

  test('步骤2: 检查三栏布局适配', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    const leftPanel = page.locator('.left-panel');
    const centerStage = page.locator('.center-stage');
    const rightPanel = page.locator('.right-panel');
    
    if (await leftPanel.count() > 0) {
      const leftBox = await leftPanel.boundingBox();
      if (leftBox) {
        console.log(`[${projectName}] 左侧面板宽度: ${leftBox.width}px`);
      }
    }
    
    if (await centerStage.count() > 0) {
      const centerBox = await centerStage.boundingBox();
      if (centerBox) {
        console.log(`[${projectName}] 中央舞台宽度: ${centerBox.width}px`);
      }
    }
    
    if (await rightPanel.count() > 0) {
      const rightBox = await rightPanel.boundingBox();
      if (rightBox) {
        console.log(`[${projectName}] 右侧面板宽度: ${rightBox.width}px`);
      }
    }
    
    await takeScreenshot(page, 'director-layout', projectName);
  });

  test('步骤3: 选择主角', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    const fanCards = page.locator('.fan-card');
    if (await fanCards.count() > 0) {
      await uiChecker.checkTouchTarget('.fan-card');
      
      await fanCards.first().click();
      await page.waitForTimeout(1000);
      
      await takeScreenshot(page, 'director-protagonist-selected', projectName);
    }
    
    console.log(`[${projectName}] 选择主角问题:`, uiChecker.getIssues());
  });

  test('步骤4: 选择剧情卡', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    const characterFan = page.locator('#characterFan .fan-card');
    if (await characterFan.count() > 0) {
      await characterFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const adventureFan = page.locator('#adventureFan .fan-card');
    if (await adventureFan.count() > 0) {
      await adventureFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const terrainFan = page.locator('#terrainFan .fan-card');
    if (await terrainFan.count() > 0) {
      await terrainFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const weatherFan = page.locator('#weatherFan .fan-card');
    if (await weatherFan.count() > 0) {
      await weatherFan.first().click();
      await page.waitForTimeout(500);
    }
    
    await takeScreenshot(page, 'director-cards-selected', projectName);
    
    console.log(`[${projectName}] 选择剧情卡问题:`, uiChecker.getIssues());
  });

  test('步骤5: 检查舞台预览', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    const characterFan = page.locator('#characterFan .fan-card');
    if (await characterFan.count() > 0) {
      await characterFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const adventureFan = page.locator('#adventureFan .fan-card');
    if (await adventureFan.count() > 0) {
      await adventureFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const terrainFan = page.locator('#terrainFan .fan-card');
    if (await terrainFan.count() > 0) {
      await terrainFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const weatherFan = page.locator('#weatherFan .fan-card');
    if (await weatherFan.count() > 0) {
      await weatherFan.first().click();
      await page.waitForTimeout(500);
    }
    
    const stageSlots = page.locator('.stage-slot.filled');
    const filledCount = await stageSlots.count();
    console.log(`[${projectName}] 已填充的舞台位: ${filledCount}`);
    
    await uiChecker.checkTouchTarget('.stage-slot');
    
    await takeScreenshot(page, 'director-stage-preview', projectName);
    
    console.log(`[${projectName}] 舞台预览问题:`, uiChecker.getIssues());
  });

  test('步骤6: 检查开始制作按钮', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    const startBtn = page.locator('#startBtn, .hearthstone-btn');
    if (await startBtn.count() > 0) {
      await uiChecker.checkTouchTarget('#startBtn, .hearthstone-btn');
      
      const isDisabled = await startBtn.isDisabled();
      console.log(`[${projectName}] 开始制作按钮禁用状态: ${isDisabled}`);
      
      await takeScreenshot(page, 'director-start-btn', projectName);
    }
    
    console.log(`[${projectName}] 开始制作按钮问题:`, uiChecker.getIssues());
  });
});
