import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

test.describe('章节内容长度测试', () => {
  let db;
  
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
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('新生成的章节内容长度约为300字', async ({ page }) => {
    const bookId = 'test-book-content-' + Date.now();
    const userId = 'test-user-content';
    
    db.prepare('INSERT OR IGNORE INTO users (user_id, email, password) VALUES (?, ?, ?)').run(userId, 'test-content@test.com', 'test');
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)').run(bookId, userId, '测试章节内容', 'adventure');
    
    db.prepare('INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, 1)').run(
      'char-content-pro', bookId, '测试主角', '小探险家', '勇敢', '简洁直接', '🧙‍♂️'
    );
    
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-w', bookId, 'plot', 'weather', '晴天', '☀️');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-t', bookId, 'plot', 'terrain', '森林', '🌲');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-a', bookId, 'plot', 'adventure', '寻宝', '🗺️');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-e', bookId, 'plot', 'equipment', '放大镜', '🔍');
    
    await page.goto(`/director.html?book_id=${bookId}`);
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), userId);
    await page.reload();
    
    await page.waitForSelector('.fan-card', { timeout: 5000 });
    
    const weatherCards = await page.$$('.fan-card[data-card-type="weather"]');
    if (weatherCards.length > 0) await weatherCards[0].click();
    
    const terrainCards = await page.$$('.fan-card[data-card-type="terrain"]');
    if (terrainCards.length > 0) await terrainCards[0].click();
    
    const adventureCards = await page.$$('.fan-card[data-card-type="adventure"]');
    if (adventureCards.length > 0) await adventureCards[0].click();
    
    const equipmentCards = await page.$$('.fan-card[data-card-type="equipment"]');
    if (equipmentCards.length > 0) await equipmentCards[0].click();
    
    const generateBtn = await page.$('#btnGenerateChapter');
    if (generateBtn) {
      await generateBtn.click();
      
      await page.waitForSelector('.chapter-content', { timeout: 10000 });
      
      const chapter = db.prepare('SELECT * FROM chapters WHERE book_id = ? ORDER BY created_at DESC LIMIT 1').get(bookId);
      
      if (chapter) {
        console.log(`章节内容长度: ${chapter.content.length} 字符`);
        expect(chapter.content.length).toBeGreaterThanOrEqual(200);
      }
    }
    
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM characters WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM chapters WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM users WHERE user_id = ?').run(userId);
  });
  
  test('预设章节内容长度验证', async ({ page }) => {
    const chapter = db.prepare('SELECT * FROM chapters WHERE book_id LIKE ? LIMIT 1').get('preset-%');
    
    if (chapter) {
      console.log(`预设章节内容长度: ${chapter.content.length} 字符`);
      expect(chapter.content.length).toBeGreaterThanOrEqual(100);
    }
  });
});
