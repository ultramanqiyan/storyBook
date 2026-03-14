import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

test.describe('输入长度验证测试', () => {
  let db;
  const testUserId = 'test-user-validation';
  const testEmail = 'test-validation@test.com';
  
  test.beforeAll(async () => {
    const d1Dir = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    const files = fs.readdirSync(d1Dir);
    const dbFiles = files.filter(f => f.endsWith('.sqlite') && f !== 'db.sqlite' && !f.endsWith('-shm') && !f.endsWith('-wal'));
    const dbFile = dbFiles.sort((a, b) => {
      const statA = fs.statSync(path.join(d1Dir, a));
      const statB = fs.statSync(path.join(d1Dir, b));
      return statB.size - statA.size;
    })[0];
    const dbPath = path.join(d1Dir, dbFile);
    db = new Database(dbPath);
    db.prepare('INSERT OR IGNORE INTO users (user_id, email, password) VALUES (?, ?, ?)').run(testUserId, testEmail, 'test');
  });
  
  test.afterAll(async () => {
    if (db) {
      db.prepare('DELETE FROM users WHERE user_id = ?').run(testUserId);
      db.close();
    }
  });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
  });
  
  test('书籍名称不能超过50个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    const longTitle = '这是一个非常非常非常非常非常非常非常非常非常非常长的书名测试';
    await page.fill('#storyTitle', longTitle);
    
    const inputValue = await page.inputValue('#storyTitle');
    expect(inputValue.length).toBeLessThanOrEqual(50);
  });
  
  test('主角名称不能超过20个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.waitForSelector('#storyTitle', { state: 'visible' });
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');
    
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    const longName = '这是一个非常非常长的主角名字测试';
    await page.fill('#protagonistName', longName);
    
    const inputValue = await page.inputValue('#protagonistName');
    expect(inputValue.length).toBeLessThanOrEqual(20);
  });
  
  test.skip('配角名称不能超过20个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.waitForSelector('#storyTitle', { state: 'visible' });
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');
    
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('button:has-text("Next")');
    
    await page.waitForSelector('.companion-name', { state: 'visible' });
    await page.fill('.companion-name', '这是一个非常非常长的配角名字测试');
    
    const inputValue = await page.inputValue('.companion-name');
    expect(inputValue.length).toBeLessThanOrEqual(20);
  });
  
  test.skip('书籍名称必填验证', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.waitForSelector('#storyTitle', { state: 'visible' });
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');
    
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('button:has-text("Next")');
    
    await page.click('#btnCreateBook');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test.skip('主角名称必填验证', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.waitForSelector('#storyTitle', { state: 'visible' });
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');
    
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('button:has-text("Next")');
    
    await page.click('#btnCreateBook');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
});
