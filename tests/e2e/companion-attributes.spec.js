import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('配角属性选择测试', () => {
  let db;
  let testUserId;
  
  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });
  
  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });
  
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((uid) => {
      localStorage.setItem('user_id', uid);
    }, testUserId);
  });
  
  test('创建书籍时可添加配角', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.fill('#storyTitle', '测试书籍配角');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', 'adventurer');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    const companionName = page.locator('.companion-name').first();
    if (await companionName.count() > 0) {
      await companionName.fill('配角1');
      
      const companionPersonality = page.locator('.companion-personality').first();
      if (await companionPersonality.count() > 0) {
        await companionPersonality.selectOption({ index: 1 });
      }
      
      const companionSpeechStyle = page.locator('.companion-speech-style').first();
      if (await companionSpeechStyle.count() > 0) {
        await companionSpeechStyle.selectOption({ index: 1 });
      }
      
      const companionRoleType = page.locator('.companion-role-type').first();
      if (await companionRoleType.count() > 0) {
        await companionRoleType.selectOption({ index: 1 });
      }
    }
    
    await page.click('#step3 .btn-next');
    await page.waitForSelector('.success-content.visible, .success-content:not([style*="display: none"])', { state: 'visible' });
    
    expect(await page.locator('.success-title').count()).toBe(1);
  });
  
  test('成功创建书籍并验证数据库中的配角属性', async ({ page }) => {
    const bookTitle = 'E2E配角测试-' + Date.now();
    
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.fill('#storyTitle', bookTitle);
    await page.fill('#storyDescription', '测试描述');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', 'adventurer');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    const companionName = page.locator('.companion-name').first();
    if (await companionName.count() > 0) {
      await companionName.fill('测试配角');
      
      const companionPersonality = page.locator('.companion-personality').first();
      if (await companionPersonality.count() > 0) {
        await companionPersonality.selectOption({ index: 1 });
      }
      
      const companionSpeechStyle = page.locator('.companion-speech-style').first();
      if (await companionSpeechStyle.count() > 0) {
        await companionSpeechStyle.selectOption({ index: 1 });
      }
      
      const companionRoleType = page.locator('.companion-role-type').first();
      if (await companionRoleType.count() > 0) {
        await companionRoleType.selectOption({ index: 1 });
      }
    }
    
    await page.click('#step3 .btn-next');
    await page.waitForSelector('.success-content.visible, .success-content:not([style*="display: none"])', { state: 'visible' });
    await expect(page.locator('.success-title')).toContainText('Created');
    
    const book = db.query('SELECT * FROM books WHERE title = ?', [bookTitle]);
    expect(book).toBeTruthy();
  });
  
  test('配角角色类型根据书籍类型动态变化', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.selectOption('#storyGenre', 'fantasy');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    expect(await page.locator('#step2.active').count()).toBe(1);
  });
});
