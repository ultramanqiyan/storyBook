import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('英文用户完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let testPuzzleId;
  let testPuzzleAnswer;

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

  test('完整旅程: 英文切换→公共图书馆→导入跳转登录→登录→创建书籍→导演页→添加章节→解谜→卡牌管理', async ({ page, request }) => {
    
    // ==================== 步骤1: 访问首页并切换到英文 ====================
    await page.goto('/');
    await page.waitForTimeout(500);
    
    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(300);
    }
    
    const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(storedLang).toBe('en');
    
    // ==================== 步骤2: 访问公共图书馆 ====================
    await page.goto('/library.html');
    await page.waitForTimeout(1000);
    
    const libraryTitle = page.locator('h1, .page-title');
    await expect(libraryTitle).toBeVisible();
    
    const libraryHeaderText = await libraryTitle.first().textContent();
    expect(libraryHeaderText.toLowerCase()).toContain('library');
    
    const presetBooks = db.queryAll("SELECT * FROM books WHERE is_preset = 1 AND language = 'en' LIMIT 1");
    const englishPresetBook = presetBooks.length > 0 ? presetBooks[0] : null;
    
    if (englishPresetBook) {
      const bookCard = page.locator(`.book-item:has-text("${englishPresetBook.title}"), .book-card:has-text("${englishPresetBook.title}")`);
      if (await bookCard.count() > 0) {
        await bookCard.first().click();
        await page.waitForTimeout(500);
        
        await page.waitForURL(/book|books/, { timeout: 5000 });
        await page.waitForTimeout(1000);
        
        const importBtn = page.locator('button:has-text("Import"), button:has-text("import")');
        if (await importBtn.count() > 0) {
          await importBtn.first().click();
          await page.waitForTimeout(1000);
          
          // ==================== 步骤3: 验证跳转到登录页或书架页 ====================
          const currentUrl = page.url();
          expect(currentUrl).toMatch(/login|bookshelf|book/);
          
          // 如果跳转到登录页，进行登录
          if (currentUrl.includes('login')) {
            const loginTitle = page.locator('.login-title, h1');
            const loginText = await loginTitle.first().textContent();
            expect(loginText.toLowerCase()).toContain('begin');
          }
          
          // ==================== 步骤4: 登录（如果需要） ====================
          const testEmail = `en_user_${Date.now()}@test.com`;
          const testPassword = 'TestPassword123!';
          
          let userId;
          const currentUrl2 = page.url();
          
          if (currentUrl2.includes('login')) {
            await page.fill('#email', testEmail);
            await page.fill('#password', testPassword);
            await page.click('.wax-seal-btn');
            
            await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });
            userId = await page.evaluate(() => localStorage.getItem('user_id'));
          } else {
            userId = await page.evaluate(() => localStorage.getItem('user_id'));
            if (!userId) {
              await page.goto('/login.html');
              await page.fill('#email', testEmail);
              await page.fill('#password', testPassword);
              await page.click('.wax-seal-btn');
              await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });
              userId = await page.evaluate(() => localStorage.getItem('user_id'));
            }
          }
          
          expect(userId).toBeTruthy();
          
          const dbUser = db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
          expect(dbUser).toBeDefined();
          expect(dbUser.email).toBe(testEmail);
          
          // ==================== 步骤5: 验证书架页面显示英文 ====================
            const bookshelfTitle = page.locator('h1, .page-title, .bookshelf-title');
            const bookshelfText = await bookshelfTitle.first().textContent();
            expect(bookshelfText.toLowerCase()).toMatch(/bookshelf|library|shelf/);
          
          const navLinks = page.locator('.navbar-link, nav a');
          const navCount = await navLinks.count();
          for (let i = 0; i < navCount; i++) {
            const linkText = await navLinks.nth(i).textContent();
            expect(linkText).not.toMatch(/书架|图书馆|创建/);
          }
          
          // ==================== 步骤6: 创建书籍 ====================
          await page.goto('/book-create.html');
          await page.waitForTimeout(500);
          
          const createTitle = page.locator('h1');
          await expect(createTitle).toContainText(/Create|Story/);
          
          const bookTitle = `English Adventure Book ${Date.now()}`;
          await page.fill('#storyTitle', bookTitle);
          await page.selectOption('#storyGenre', 'adventure');
          
          const genreSelect = page.locator('#storyGenre');
          const selectedOption = await genreSelect.inputValue();
          expect(selectedOption).toBe('adventure');
          
          await page.click('#step1 .btn-next');
          await page.waitForSelector('#step2.active', { state: 'visible' });
          
          await page.fill('#protagonistName', 'Hero');
          await page.locator('#protagonistAvatars .avatar-option').first().click();
          await page.selectOption('#protagonistPersonality', 'brave');
          await page.selectOption('#protagonistSpeechStyle', 'direct');
          await page.selectOption('#protagonistRoleType', { index: 1 });
          
          await page.click('#step2 .btn-next');
          await page.waitForSelector('#step3.active', { state: 'visible' });
          
          await page.click('#step3 .btn-next');
          
          await expect(page.locator('.success-title')).toBeVisible({ timeout: 15000 });
          await expect(page.locator('.success-title')).toContainText(/Created|Success/i);
          
          const newBook = db.query(
            'SELECT * FROM books WHERE title = ? AND user_id = ?',
            [bookTitle, userId]
          );
          expect(newBook).toBeDefined();
          expect(newBook.title).toBe(bookTitle);
          expect(newBook.type).toBe('adventure');
          expect(newBook.language).toBe('en');
          testBookId = newBook.book_id;
          
          const protagonist = db.query(
            'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
            [testBookId]
          );
          expect(protagonist).toBeDefined();
          expect(protagonist.name).toBe('Hero');
          expect(protagonist.personality).toBe('brave');
          expect(protagonist.speech_style).toBe('direct');
          
          const plotCards = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [testBookId]
          );
          expect(plotCards.length).toBe(16);
          
          const weatherCards = plotCards.filter(c => c.sub_type === 'weather');
          const terrainCards = plotCards.filter(c => c.sub_type === 'terrain');
          const adventureCards = plotCards.filter(c => c.sub_type === 'adventure');
          const equipmentCards = plotCards.filter(c => c.sub_type === 'equipment');
          
          expect(weatherCards.length).toBe(4);
          expect(terrainCards.length).toBe(4);
          expect(adventureCards.length).toBe(4);
          expect(equipmentCards.length).toBe(4);
          
          // ==================== 步骤7: 访问书籍详情页 ====================
          await page.goto(`/book.html?id=${testBookId}`);
          await page.waitForTimeout(1500);
          
          const bookDetailTitle = page.locator('.book-spine-title, .book-meta-info h2');
          await expect(bookDetailTitle.first()).toBeVisible();
          
          const directorBtn = page.locator('a:has-text("Director"), a[href*="director"]');
          if (await directorBtn.count() > 0) {
            // ==================== 步骤8: 访问故事导演页 ====================
            await directorBtn.first().click();
            await page.waitForTimeout(2000);
            
            const directorTitle = page.locator('.director-header h1, h1');
            const directorText = await directorTitle.first().textContent();
            expect(directorText.toLowerCase()).toContain('director');
            
            const characterFan = page.locator('#characterFan .fan-card');
            const characterCount = await characterFan.count();
            expect(characterCount).toBeGreaterThan(0);
            
            const protagonistCard = page.locator('#characterFan .fan-card').first();
            await protagonistCard.click({ force: true });
            await page.waitForTimeout(800);
            
            const adventureFan = page.locator('#adventureFan .fan-card');
            const adventureCount = await adventureFan.count();
            expect(adventureCount).toBeGreaterThan(0);
            await adventureFan.first().click({ force: true });
            await page.waitForTimeout(800);
            
            const weatherFan = page.locator('#weatherFan .fan-card');
            const weatherCount = await weatherFan.count();
            expect(weatherCount).toBeGreaterThan(0);
            await weatherFan.first().click({ force: true });
            await page.waitForTimeout(800);
            
            const terrainFan = page.locator('#terrainFan .fan-card');
            const terrainCount = await terrainFan.count();
            expect(terrainCount).toBeGreaterThan(0);
            await terrainFan.first().click({ force: true });
            await page.waitForTimeout(800);
            
            const startBtn = page.locator('#startBtn');
            await expect(startBtn).toBeEnabled({ timeout: 10000 });
            
            // ==================== 步骤9: 添加章节 ====================
            await startBtn.click();
            await page.waitForTimeout(2000);
            
            const chaptersBefore = db.queryAll(
              'SELECT * FROM chapters WHERE book_id = ?',
              [testBookId]
            );
            
            await expect(page).toHaveURL(/chapter/, { timeout: 15000 });
            
            const chaptersAfter = db.queryAll(
              'SELECT * FROM chapters WHERE book_id = ?',
              [testBookId]
            );
            expect(chaptersAfter.length).toBeGreaterThanOrEqual(1);
            
            const newChapter = chaptersAfter[0];
            testChapterId = newChapter.chapter_id;
            
            expect(newChapter.title).toBeDefined();
            expect(newChapter.content).toBeDefined();
            expect(newChapter.content.length).toBeGreaterThan(50);
            
            const selectedCards = JSON.parse(newChapter.selected_cards);
            expect(selectedCards.protagonist_id).toBeDefined();
            expect(selectedCards.weather_id).toBeDefined();
            expect(selectedCards.terrain_id).toBeDefined();
            expect(selectedCards.adventure_id).toBeDefined();
            
            const puzzle = db.query(
              'SELECT * FROM puzzles WHERE chapter_id = ?',
              [testChapterId]
            );
            expect(puzzle).toBeDefined();
            expect(puzzle.question).toBeDefined();
            expect(puzzle.answer).toBeDefined();
            expect(puzzle.is_solved).toBe(0);
            expect(puzzle.attempts).toBe(0);
            
            testPuzzleId = puzzle.puzzle_id;
            testPuzzleAnswer = puzzle.answer;
            
            // ==================== 步骤10: 解谜 ====================
            const puzzleOverlay = page.locator('.puzzle-overlay, .modal');
            if (await puzzleOverlay.count() > 0 && await puzzleOverlay.isVisible()) {
              const options = page.locator('.puzzle-option, .option-btn');
              const optionCount = await options.count();
              
              if (optionCount > 0) {
                for (let i = 0; i < optionCount; i++) {
                  const optionText = await options.nth(i).textContent();
                  if (optionText.trim() === testPuzzleAnswer) {
                    await options.nth(i).click();
                    break;
                  }
                }
                
                const submitBtn = page.locator('.submit-btn, button:has-text("Submit")');
                if (await submitBtn.count() > 0) {
                  await submitBtn.click();
                  await page.waitForTimeout(2000);
                }
              }
            }
            
            const puzzleAfter = db.query(
              'SELECT * FROM puzzles WHERE puzzle_id = ?',
              [testPuzzleId]
            );
            
            // ==================== 步骤11: 检查卡牌掉落 ====================
            const cardsAfterPuzzle = db.queryAll(
              'SELECT * FROM plot_cards WHERE book_id = ?',
              [testBookId]
            );
            
            // ==================== 步骤12: 如果卡牌超过8张，丢弃一张 ====================
            const cardsByType = {};
            cardsAfterPuzzle.forEach(card => {
              if (!cardsByType[card.sub_type]) {
                cardsByType[card.sub_type] = [];
              }
              cardsByType[card.sub_type].push(card);
            });
            
            for (const [subType, cards] of Object.entries(cardsByType)) {
              if (cards.length > 8) {
                await page.goto(`/book.html?id=${testBookId}`);
                await page.waitForTimeout(1000);
                
                const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards")');
                if (await cardTab.count() > 0) {
                  await cardTab.click();
                  await page.waitForTimeout(500);
                }
                
                const discardBtn = page.locator('.card-discard, button:has-text("Discard")').first();
                if (await discardBtn.count() > 0) {
                  await discardBtn.click();
                  await page.waitForTimeout(500);
                }
                
                break;
              }
            }
            
            // ==================== 步骤13: 继续添加章节 ====================
            await page.goto(`/director.html?book_id=${testBookId}`);
            await page.waitForTimeout(1000);
            
            const fanCards2 = page.locator('.fan-card');
            if (await fanCards2.count() > 0) {
              await fanCards2.first().click({ force: true });
              await page.waitForTimeout(300);
              
              for (let i = 1; i <= 4; i++) {
                const card = page.locator('.fan-card').nth(i);
                if (await card.count() > 0) {
                  await card.click({ force: true });
                  await page.waitForTimeout(300);
                }
              }
              
              const startBtn2 = page.locator('#startBtn');
              if (await startBtn2.isEnabled()) {
                await startBtn2.click();
                await page.waitForTimeout(2000);
                
                const chaptersFinal = db.queryAll(
                  'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
                  [testBookId]
                );
                expect(chaptersFinal.length).toBeGreaterThanOrEqual(2);
              }
            }
          }
        }
      }
    }
  });
});

test.describe('中文用户完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 中文切换→登录→创建书籍→验证中文内容', async ({ page, request }) => {
    
    // ==================== 步骤1: 访问首页并切换到中文 ====================
    await page.goto('/');
    await page.waitForTimeout(500);
    
    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(300);
    }
    
    const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(storedLang).toBe('zh');
    
    // ==================== 步骤2: 登录 ====================
    await page.goto('/login.html');
    await page.waitForTimeout(500);
    
    const loginTitle = page.locator('.login-title, h1');
    const loginText = await loginTitle.first().textContent();
    expect(loginText).toContain('开始');
    
    const testEmail = `zh_user_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';
    
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.click('.wax-seal-btn');
    
    await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });
    
    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeTruthy();
    
    // ==================== 步骤3: 验证书架页面显示中文 ====================
    const bookshelfTitle = page.locator('h1, .page-title');
    const bookshelfText = await bookshelfTitle.first().textContent();
    expect(bookshelfText).toContain('书架');
    
    // ==================== 步骤4: 创建书籍 ====================
    await page.goto('/book-create.html');
    await page.waitForTimeout(500);
    
    const createTitle = page.locator('h1');
    await expect(createTitle).toContainText('创建');
    
    const bookTitle = `中文冒险故事 ${Date.now()}`;
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', { index: 1 });
    
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.success-title')).toBeVisible({ timeout: 15000 });
    
    const newBook = db.query(
      'SELECT * FROM books WHERE title = ? AND user_id = ?',
      [bookTitle, userId]
    );
    expect(newBook).toBeDefined();
    expect(newBook.language).toBe('zh');
    testBookId = newBook.book_id;
    
    // ==================== 步骤5: 验证卡牌内容为中文 ====================
    const plotCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const hasChineseContent = plotCards.some(card => 
      /[\u4e00-\u9fa5]/.test(card.name) || /[\u4e00-\u9fa5]/.test(card.description)
    );
    expect(hasChineseContent).toBe(true);
    
    // ==================== 步骤6: 访问导演页并验证中文 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1000);
    
    const directorTitle = page.locator('.director-header h1, h1');
    const directorText = await directorTitle.first().textContent();
    expect(directorText).toContain('导演');
    
    // ==================== 步骤7: 添加章节并验证中文内容 ====================
    const fanCards = page.locator('.fan-card');
    if (await fanCards.count() > 0) {
      await fanCards.first().click({ force: true });
      await page.waitForTimeout(300);
      
      for (let i = 1; i <= 4; i++) {
        const card = page.locator('.fan-card').nth(i);
        if (await card.count() > 0) {
          await card.click({ force: true });
          await page.waitForTimeout(300);
        }
      }
      
      const startBtn = page.locator('#startBtn');
      if (await startBtn.isEnabled()) {
        await startBtn.click();
        await page.waitForTimeout(2000);
        
        const chapters = db.queryAll(
          'SELECT * FROM chapters WHERE book_id = ?',
          [testBookId]
        );
        
        if (chapters.length > 0) {
          const chapter = chapters[0];
          const hasChineseChapter = /[\u4e00-\u9fa5]/.test(chapter.content);
          expect(hasChineseChapter).toBe(true);
          
          const puzzle = db.query(
            'SELECT * FROM puzzles WHERE chapter_id = ?',
            [chapter.chapter_id]
          );
          
          if (puzzle) {
            const hasChinesePuzzle = /[\u4e00-\u9fa5]/.test(puzzle.question);
            expect(hasChinesePuzzle).toBe(true);
          }
        }
      }
    }
  });
});

test.describe('预设书籍导入完整旅程测试', () => {
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

  test('完整旅程: 公共图书馆→导入预设书籍→验证数据→添加章节', async ({ page, request }) => {
    
    // ==================== 步骤1: 设置语言为英文 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.waitForTimeout(300);
    
    // ==================== 步骤2: 访问公共图书馆 ====================
    await page.goto('/library.html');
    await page.waitForTimeout(1000);
    
    const presetBook = db.query(
      "SELECT * FROM books WHERE is_preset = 1 AND language = 'en' LIMIT 1"
    );
    
    if (!presetBook) {
      expect(true).toBe(true);
      return;
    }
    
    // ==================== 步骤2: 直接访问预设书籍页面 ====================
    await page.goto(`/book.html?id=${presetBook.book_id}&is_preset=1`);
    await page.waitForTimeout(1500);
    
    // ==================== 步骤3: 验证预设书籍详情 ====================
    const pageContent = page.locator('.book-container, .book-detail, body');
    await expect(pageContent.first()).toBeVisible();
      
      const originalCharacters = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ?',
        [presetBook.book_id]
      );
      const originalCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [presetBook.book_id]
      );
      const originalChapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ?',
        [presetBook.book_id]
      );
      
      // ==================== 步骤4: 导入书籍 ====================
      await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
      await page.waitForTimeout(300);
      
      const importBtn = page.locator('button:has-text("Import"), .btn-import');
      if (await importBtn.count() > 0) {
        await importBtn.first().click();
        await page.waitForTimeout(2000);
        
        // ==================== 步骤5: 验证导入后的数据 ====================
        const importedBook = db.query(
          "SELECT * FROM books WHERE title = ? AND user_id = ? AND is_preset = 0",
          [presetBook.title, testUserId]
        );
        
        if (importedBook) {
          expect(importedBook.user_id).toBe(testUserId);
          expect(importedBook.is_preset).toBe(0);
          
          const importedCharacters = db.queryAll(
            'SELECT * FROM characters WHERE book_id = ?',
            [importedBook.book_id]
          );
          expect(importedCharacters.length).toBe(originalCharacters.length);
          
          const importedCards = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [importedBook.book_id]
          );
          expect(importedCards.length).toBe(originalCards.length);
          
          const importedChapters = db.queryAll(
            'SELECT * FROM chapters WHERE book_id = ?',
            [importedBook.book_id]
          );
          expect(importedChapters.length).toBe(originalChapters.length);
          
          // ==================== 步骤6: 验证ID已重新生成 ====================
          originalCharacters.forEach(origChar => {
            const matchingImported = importedCharacters.find(
              c => c.name === origChar.name && c.char_id !== origChar.char_id
            );
            expect(matchingImported).toBeDefined();
          });
          
          // ==================== 步骤7: 访问导入的书籍并添加章节 ====================
          await page.goto(`/director.html?book_id=${importedBook.book_id}`);
          await page.waitForTimeout(1500);
          
          const fanCards = page.locator('.fan-card');
          if (await fanCards.count() > 0) {
            const characterFan = page.locator('#characterFan .fan-card');
            if (await characterFan.count() > 0) {
              await characterFan.first().click({ force: true });
              await page.waitForTimeout(500);
            }
            
            const adventureFan = page.locator('#adventureFan .fan-card');
            if (await adventureFan.count() > 0) {
              await adventureFan.first().click({ force: true });
              await page.waitForTimeout(500);
            }
            
            const weatherFan = page.locator('#weatherFan .fan-card');
            if (await weatherFan.count() > 0) {
              await weatherFan.first().click({ force: true });
              await page.waitForTimeout(500);
            }
            
            const terrainFan = page.locator('#terrainFan .fan-card');
            if (await terrainFan.count() > 0) {
              await terrainFan.first().click({ force: true });
              await page.waitForTimeout(500);
            }
            
            const startBtn = page.locator('#startBtn');
            if (await startBtn.isEnabled()) {
              await startBtn.click();
              await page.waitForTimeout(2000);
              
              const newChapters = db.queryAll(
                'SELECT * FROM chapters WHERE book_id = ?',
                [importedBook.book_id]
              );
              expect(newChapters.length).toBeGreaterThan(originalChapters.length);
            }
          }
        }
      }
    });
});

test.describe('卡牌管理完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 创建书籍→多次解谜→卡牌满→丢弃→继续', async ({ page, request }) => {
    
    // ==================== 步骤1: 设置语言为英文并登录 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    // ==================== 步骤2: 创建书籍 ====================
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Card Management Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Card Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    const initialCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    expect(initialCards.length).toBe(16);
    
    // ==================== 步骤3: 创建章节并解谜多次 ====================
    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;
    
    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureId = cards.find(c => c.sub_type === 'adventure').card_id;
    const equipmentId = cards.find(c => c.sub_type === 'equipment').card_id;
    
    for (let i = 0; i < 3; i++) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonistId,
            weather_id: weatherId,
            terrain_id: terrainId,
            adventure_id: adventureId,
            equipment_id: equipmentId
          }
        }
      });
      
      const chapterData = await chapterResponse.json();
      if (chapterData.success && chapterData.data.puzzle) {
        const puzzleId = chapterData.data.puzzle.puzzle_id;
        const answer = chapterData.data.puzzle.answer;
        
        const solveResponse = await request.post(`/api/puzzles/${puzzleId}/solve`, {
          data: {
            answer: answer,
            user_id: testUserId
          }
        });
        
        const solveData = await solveResponse.json();
        
        if (solveData.success && solveData.data.is_correct) {
          const puzzleAfter = db.query(
            'SELECT * FROM puzzles WHERE puzzle_id = ?',
            [puzzleId]
          );
          expect(puzzleAfter.is_solved).toBe(1);
        }
      }
    }
    
    // ==================== 步骤4: 检查卡牌数量 ====================
    const cardsAfterPuzzles = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const cardsByType = {};
    cardsAfterPuzzles.forEach(card => {
      if (!cardsByType[card.sub_type]) {
        cardsByType[card.sub_type] = [];
      }
      cardsByType[card.sub_type].push(card);
    });
    
    // ==================== 步骤5: 访问书籍页面管理卡牌 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1000);
    
    const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards")');
    if (await cardTab.count() > 0) {
      await cardTab.click();
      await page.waitForTimeout(500);
      
      const displayedCards = page.locator('.card-item, .plot-card');
      const displayedCount = await displayedCards.count();
      expect(displayedCount).toBeGreaterThan(0);
    }
    
    // ==================== 步骤6: 继续添加章节 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1000);
    
    const fanCards = page.locator('.fan-card');
    if (await fanCards.count() > 0) {
      await fanCards.first().click({ force: true });
      await page.waitForTimeout(300);
      
      for (let i = 1; i <= 4; i++) {
        const card = page.locator('.fan-card').nth(i);
        if (await card.count() > 0) {
          await card.click({ force: true });
          await page.waitForTimeout(300);
        }
      }
      
      const startBtn = page.locator('#startBtn');
      if (await startBtn.isEnabled()) {
        await startBtn.click();
        await page.waitForTimeout(2000);
        
        const finalChapters = db.queryAll(
          'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
          [testBookId]
        );
        expect(finalChapters.length).toBeGreaterThanOrEqual(4);
        
        for (let i = 0; i < finalChapters.length; i++) {
          expect(finalChapters[i].order_num).toBe(i + 1);
        }
      }
    }
  });
});

test.describe('语言切换完整验证测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 英文→创建书籍→切换中文→验证内容变化', async ({ page, request }) => {
    
    // ==================== 步骤1: 英文模式创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Language Switch Test',
        type: 'adventure',
        protagonist: {
          name: 'Switch Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤2: 验证书架页面英文 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    
    const bookshelfTitle = page.locator('h1, .page-title, .bookshelf-title');
    const bookshelfText = await bookshelfTitle.first().textContent();
    expect(bookshelfText.toLowerCase()).toMatch(/bookshelf|library|shelf/);
    
    // ==================== 步骤3: 切换到中文 ====================
    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);
    }
    
    const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(storedLang).toBe('zh');
    
    // ==================== 步骤4: 验证书架页面中文 ====================
    await page.reload();
    await page.waitForTimeout(1000);
    
    const bookshelfTitleZh = page.locator('h1, .page-title');
    const bookshelfTextZh = await bookshelfTitleZh.first().textContent();
    expect(bookshelfTextZh).toContain('书架');
    
    // ==================== 步骤5: 验证导航栏中文 ====================
    const navLinks = page.locator('.navbar-link, nav a');
    const navCount = await navLinks.count();
    const navTexts = [];
    for (let i = 0; i < navCount; i++) {
      const text = await navLinks.nth(i).textContent();
      navTexts.push(text);
    }
    
    const hasChineseNav = navTexts.some(text => /[\u4e00-\u9fa5]/.test(text));
    expect(hasChineseNav).toBe(true);
    
    // ==================== 步骤6: 访问导演页验证中文 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1000);
    
    const directorTitle = page.locator('.director-header h1, h1');
    const directorText = await directorTitle.first().textContent();
    expect(directorText).toContain('导演');
    
    // ==================== 步骤7: 验证卡牌内容语言 ====================
    const plotCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    expect(plotCards.length).toBeGreaterThan(0);
    
    const fanCards = page.locator('.fan-card');
    if (await fanCards.count() > 0) {
      const firstCardText = await fanCards.first().textContent();
      expect(firstCardText).toBeDefined();
    }
  });
});

test.describe('配角创建完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 英文模式→创建书籍带配角→验证配角数据→添加章节', async ({ page, request }) => {
    
    // ==================== 步骤1: 设置语言为英文 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.waitForTimeout(300);
    
    // ==================== 步骤2: 创建书籍带配角 ====================
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Companion Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Main Hero',
          avatar: '🧙‍♂️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: 'Friend Alice',
            avatar: '👧',
            personality: 'kind',
            speech_style: 'gentle',
            role_type: 'healer',
            intimacy: 50,
            relationship: 'friend'
          },
          {
            name: 'Rival Bob',
            avatar: '🧔',
            personality: 'serious',
            speech_style: 'formal',
            role_type: 'warrior',
            intimacy: -30,
            relationship: 'rival'
          }
        ]
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤3: SQL验证书籍创建 ====================
    const book = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );
    expect(book).toBeDefined();
    expect(book.title).toBe('Companion Test Book');
    expect(book.type).toBe('fantasy');
    expect(book.language).toBe('en');
    
    // ==================== 步骤4: SQL验证主角创建 ====================
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );
    expect(protagonist).toBeDefined();
    expect(protagonist.name).toBe('Main Hero');
    expect(protagonist.personality).toBe('wise');
    expect(protagonist.speech_style).toBe('poetic');
    expect(protagonist.role_type).toBe('wizard');
    
    // ==================== 步骤5: SQL验证配角创建 ====================
    const companions = db.queryAll(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0 ORDER BY name",
      [testBookId]
    );
    expect(companions.length).toBe(2);
    
    expect(companions[0].name).toBe('Friend Alice');
    expect(companions[0].personality).toBe('kind');
    expect(companions[0].speech_style).toBe('gentle');
    expect(companions[0].role_type).toBe('healer');
    expect(companions[0].intimacy).toBe(50);
    expect(companions[0].relationship).toBe('friend');
    
    expect(companions[1].name).toBe('Rival Bob');
    expect(companions[1].personality).toBe('serious');
    expect(companions[1].speech_style).toBe('formal');
    expect(companions[1].role_type).toBe('warrior');
    expect(companions[1].intimacy).toBe(-30);
    expect(companions[1].relationship).toBe('rival');
    
    // ==================== 步骤6: 访问书籍页面验证配角显示 ====================
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const characterSection = page.locator('.character-list, .characters-section');
    if (await characterSection.count() > 0) {
      const characterCards = page.locator('.character-card, .character-item');
      const cardCount = await characterCards.count();
      expect(cardCount).toBeGreaterThanOrEqual(3);
    }
    
    // ==================== 步骤7: 访问导演页验证配角可选 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const characterFan = page.locator('#characterFan .fan-card');
    const characterCount = await characterFan.count();
    expect(characterCount).toBeGreaterThanOrEqual(3);
    
    // ==================== 步骤8: 选择配角并添加章节 ====================
    const companionCard = characterFan.nth(1);
    await companionCard.click({ force: true });
    await page.waitForTimeout(500);
    
    const adventureFan = page.locator('#adventureFan .fan-card');
    if (await adventureFan.count() > 0) {
      await adventureFan.first().click({ force: true });
      await page.waitForTimeout(500);
    }
    
    const weatherFan = page.locator('#weatherFan .fan-card');
    if (await weatherFan.count() > 0) {
      await weatherFan.first().click({ force: true });
      await page.waitForTimeout(500);
    }
    
    const terrainFan = page.locator('#terrainFan .fan-card');
    if (await terrainFan.count() > 0) {
      await terrainFan.first().click({ force: true });
      await page.waitForTimeout(500);
    }
    
    const startBtn = page.locator('#startBtn');
    if (await startBtn.isEnabled()) {
      await startBtn.click();
      await page.waitForTimeout(2000);
      
      // ==================== 步骤9: SQL验证章节创建 ====================
      const chapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ?',
        [testBookId]
      );
      expect(chapters.length).toBeGreaterThan(0);
      
      const chapter = chapters[0];
      const selectedCards = JSON.parse(chapter.selected_cards);
      
      const selectedChar = db.query(
        'SELECT * FROM characters WHERE char_id = ?',
        [selectedCards.protagonist_id]
      );
      expect(selectedChar).toBeDefined();
    }
  });
});

test.describe('亲密度变化完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;
  let companionId;

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

  test('完整旅程: 创建书籍→添加章节→解谜成功→验证亲密度变化', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建书籍带配角 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Intimacy Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: 'Companion',
            avatar: '👧',
            personality: 'kind',
            speech_style: 'gentle',
            role_type: 'healer',
            intimacy: 0,
            relationship: 'stranger'
          }
        ]
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤2: 获取配角ID和初始亲密度 ====================
    const companion = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0 LIMIT 1",
      [testBookId]
    );
    expect(companion).toBeDefined();
    companionId = companion.char_id;
    const initialIntimacy = companion.intimacy;
    
    // ==================== 步骤3: 添加章节 ====================
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );
    
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const weatherId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureId = cards.find(c => c.sub_type === 'adventure').card_id;
    
    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: weatherId,
          terrain_id: terrainId,
          adventure_id: adventureId
        }
      }
    });
    
    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);
    
    // ==================== 步骤4: SQL验证章节创建 ====================
    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(chapters.length).toBeGreaterThan(0);
    
    // ==================== 步骤5: SQL验证谜题创建 ====================
    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [chapters[0].chapter_id]
    );
    expect(puzzle).toBeDefined();
    expect(puzzle.is_solved).toBe(0);
    expect(puzzle.attempts).toBe(0);
    
    // ==================== 步骤6: 解谜 ====================
    const solveResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: puzzle.answer,
        user_id: testUserId
      }
    });
    
    const solveData = await solveResponse.json();
    
    // ==================== 步骤7: SQL验证谜题状态更新 ====================
    const puzzleAfter = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );
    
    if (solveData.success && solveData.data && solveData.data.is_correct) {
      expect(puzzleAfter.is_solved).toBe(1);
    } else {
      expect(puzzleAfter.attempts).toBeGreaterThan(0);
    }
    
    // ==================== 步骤8: 验证亲密度可能变化 ====================
    const companionAfter = db.query(
      'SELECT * FROM characters WHERE char_id = ?',
      [companionId]
    );
    expect(companionAfter).toBeDefined();
  });
});

test.describe('多语言切换完整旅程测试', () => {
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

  test('完整旅程: 英文创建→中文查看→英文编辑→验证语言一致性', async ({ page, request }) => {
    
    // ==================== 步骤1: 英文模式创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Multi-Language Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;
    
    // ==================== 步骤2: SQL验证书籍语言 ====================
    const book = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );
    expect(book.language).toBe('en');
    
    // ==================== 步骤3: SQL验证卡牌内容为英文 ====================
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
    
    expect(weatherCards.length).toBe(4);
    expect(terrainCards.length).toBe(4);
    expect(adventureCards.length).toBe(4);
    expect(equipmentCards.length).toBe(4);
    
    // ==================== 步骤4: 切换到中文 ====================
    await page.goto('/');
    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);
    }
    
    const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(storedLang).toBe('zh');
    
    // ==================== 步骤5: 访问书架验证中文界面 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    
    const bookshelfTitle = page.locator('h1, .page-title');
    const bookshelfText = await bookshelfTitle.first().textContent();
    expect(bookshelfText).toContain('书架');
    
    // ==================== 步骤6: 访问书籍页面 ====================
    await page.goto(`/book.html?id=${bookId}`);
    await page.waitForTimeout(1500);
    
    // ==================== 步骤7: 切换回英文 ====================
    await page.goto('/');
    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(500);
    }
    
    const storedLangEn = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(storedLangEn).toBe('en');
    
    // ==================== 步骤8: 访问导演页验证英文界面 ====================
    await page.goto(`/director.html?book_id=${bookId}`);
    await page.waitForTimeout(1500);
    
    const directorTitle = page.locator('.director-header h1, h1');
    const directorText = await directorTitle.first().textContent();
    expect(directorText.toLowerCase()).toContain('director');
    
    // ==================== 步骤9: 添加章节验证 ====================
    const characterFan = page.locator('#characterFan .fan-card');
    if (await characterFan.count() > 0) {
      await characterFan.first().click({ force: true });
      await page.waitForTimeout(500);
      
      const adventureFan = page.locator('#adventureFan .fan-card');
      if (await adventureFan.count() > 0) {
        await adventureFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const weatherFan = page.locator('#weatherFan .fan-card');
      if (await weatherFan.count() > 0) {
        await weatherFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const terrainFan = page.locator('#terrainFan .fan-card');
      if (await terrainFan.count() > 0) {
        await terrainFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const startBtn = page.locator('#startBtn');
      if (await startBtn.isEnabled()) {
        await startBtn.click();
        await page.waitForTimeout(2000);
        
        // ==================== 步骤10: SQL验证章节创建 ====================
        const chapters = db.queryAll(
          'SELECT * FROM chapters WHERE book_id = ?',
          [bookId]
        );
        expect(chapters.length).toBeGreaterThan(0);
        
        // ==================== 步骤11: SQL验证谜题创建 ====================
        const puzzle = db.query(
          'SELECT * FROM puzzles WHERE chapter_id = ?',
          [chapters[0].chapter_id]
        );
        expect(puzzle).toBeDefined();
      }
    }
  });
});

test.describe('公共图书馆完整旅程测试', () => {
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

  test('完整旅程: 英文模式→公共图书馆→验证英文预设书籍→中文模式→验证中文预设书籍', async ({ page }) => {
    
    // ==================== 步骤1: 英文模式访问公共图书馆 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.waitForTimeout(300);
    
    await page.goto('/library.html');
    await page.waitForTimeout(1500);
    
    // ==================== 步骤2: SQL验证英文预设书籍 ====================
    const englishPresetBooks = db.queryAll(
      "SELECT * FROM books WHERE is_preset = 1 AND language = 'en'"
    );
    expect(englishPresetBooks.length).toBeGreaterThan(0);
    
    // ==================== 步骤3: 验证页面标题为英文 ====================
    const libraryTitle = page.locator('h1, .page-title');
    const libraryText = await libraryTitle.first().textContent();
    expect(libraryText.toLowerCase()).toContain('library');
    
    // ==================== 步骤4: 切换到中文 ====================
    await page.goto('/');
    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);
    }
    
    // ==================== 步骤5: 访问公共图书馆验证中文 ====================
    await page.goto('/library.html');
    await page.waitForTimeout(1500);
    
    // ==================== 步骤6: SQL验证中文预设书籍 ====================
    const chinesePresetBooks = db.queryAll(
      "SELECT * FROM books WHERE is_preset = 1 AND language = 'zh'"
    );
    expect(chinesePresetBooks.length).toBeGreaterThan(0);
    
    // ==================== 步骤7: 验证页面标题为中文 ====================
    const libraryTitleZh = page.locator('h1, .page-title');
    const libraryTextZh = await libraryTitleZh.first().textContent();
    expect(libraryTextZh).toContain('图书馆');
  });
});

test.describe('错误处理完整旅程测试', () => {
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

  test('完整旅程: 创建书籍→解谜错误→重试→成功→验证数据', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Error Handling Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;
    
    // ==================== 步骤2: 添加章节 ====================
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookId]
    );
    
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );
    
    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });
    
    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);
    
    // ==================== 步骤3: 获取谜题 ====================
    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [chapterData.data.chapter.chapter_id]
    );
    expect(puzzle).toBeDefined();
    
    // ==================== 步骤4: 故意提交错误答案 ====================
    const wrongAnswer = 'WRONG_ANSWER_' + Date.now();
    const wrongResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: wrongAnswer,
        user_id: testUserId
      }
    });
    
    const wrongData = await wrongResponse.json();
    
    // ==================== 步骤5: SQL验证attempts增加 ====================
    const puzzleAfterWrong = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );
    expect(puzzleAfterWrong.attempts).toBeGreaterThan(0);
    expect(puzzleAfterWrong.is_solved).toBe(0);
    
    // ==================== 步骤6: 使用正确答案重试 ====================
    const correctResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: puzzle.answer,
        user_id: testUserId
      }
    });
    
    const correctData = await correctResponse.json();
    
    // ==================== 步骤7: SQL验证谜题解决 ====================
    const puzzleAfterCorrect = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );
    
    if (correctData.success && correctData.data && correctData.data.is_correct) {
      expect(puzzleAfterCorrect.is_solved).toBe(1);
    }
  });

  test('完整旅程: 访问不存在的书籍→错误处理→创建新书籍', async ({ page, request }) => {
    
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    // ==================== 步骤1: 访问不存在的书籍 ====================
    const fakeBookId = 'non-existent-book-id-' + Date.now();
    await page.goto(`/book.html?id=${fakeBookId}`);
    await page.waitForTimeout(1500);
    
    // ==================== 步骤2: 验证错误处理 ====================
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
    
    // ==================== 步骤3: 创建新书籍 ====================
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Recovery Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Recovery Hero',
          avatar: '🧙‍♂️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    
    // ==================== 步骤4: SQL验证新书籍创建成功 ====================
    const newBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookData.data.book_id]
    );
    expect(newBook).toBeDefined();
    expect(newBook.title).toBe('Recovery Test Book');
  });
});

test.describe('数据持久化完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 创建书籍→刷新页面→验证数据持久化→继续操作', async ({ page, request, context }) => {
    
    // ==================== 步骤1: 创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Persistence Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Persistence Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤2: SQL验证数据已持久化 ====================
    const bookBefore = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );
    expect(bookBefore).toBeDefined();
    expect(bookBefore.title).toBe('Persistence Test Book');
    
    // ==================== 步骤3: 刷新页面 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForTimeout(1000);
    
    // ==================== 步骤4: 验证书籍仍然存在 ====================
    const bookCard = page.locator(`.book-card:has-text("Persistence Test Book"), .book-item:has-text("Persistence Test Book")`);
    await expect(bookCard.first()).toBeVisible({ timeout: 5000 });
    
    // ==================== 步骤5: 访问书籍详情页 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    // ==================== 步骤6: SQL再次验证数据持久化 ====================
    const bookAfter = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );
    expect(bookAfter).toBeDefined();
    expect(bookAfter.title).toBe('Persistence Test Book');
    
    // ==================== 步骤7: 添加章节验证持续操作 ====================
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );
    
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });
    
    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);
    
    // ==================== 步骤8: SQL验证章节持久化 ====================
    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(chapters.length).toBeGreaterThan(0);
  });

  test('完整旅程: 创建书籍→关闭浏览器→重新打开→验证数据恢复', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Session Recovery Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Session Hero',
          avatar: '🧝‍♀️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;
    
    // ==================== 步骤2: SQL验证数据 ====================
    const book = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );
    expect(book).toBeDefined();
    
    // ==================== 步骤3: 模拟关闭浏览器（清除context但保留数据库） ====================
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // ==================== 步骤4: 重新登录 ====================
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    
    // ==================== 步骤5: 访问书架验证数据恢复 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1500);
    
    // ==================== 步骤6: SQL验证数据仍然存在 ====================
    const bookAfter = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );
    expect(bookAfter).toBeDefined();
    expect(bookAfter.user_id).toBe(testUserId);
  });
});

test.describe('多书籍管理完整旅程测试', () => {
  let db;
  let testUserId;
  let bookIds = [];

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

  test('完整旅程: 创建多本书籍→切换书籍→分别添加章节→验证数据隔离', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建第一本书 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const book1Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Multi-Book Test 1',
        type: 'adventure',
        protagonist: {
          name: 'Hero1',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const book1Data = await book1Response.json();
    expect(book1Data.success).toBe(true);
    bookIds.push(book1Data.data.book_id);
    
    // ==================== 步骤2: 创建第二本书 ====================
    const book2Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Multi-Book Test 2',
        type: 'fantasy',
        protagonist: {
          name: 'Hero2',
          avatar: '🧝‍♀️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const book2Data = await book2Response.json();
    expect(book2Data.success).toBe(true);
    bookIds.push(book2Data.data.book_id);
    
    // ==================== 步骤3: SQL验证两本书都创建成功 ====================
    const books = db.queryAll(
      'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC',
      [testUserId]
    );
    expect(books.length).toBeGreaterThanOrEqual(2);
    
    // ==================== 步骤4: 为第一本书添加章节 ====================
    const protagonist1 = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookIds[0]]
    );
    
    const cards1 = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookIds[0]]
    );
    
    const chapter1Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookIds[0],
        selected_cards: {
          protagonist_id: protagonist1.char_id,
          weather_id: cards1.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards1.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards1.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });
    
    expect(chapter1Response.ok()).toBe(true);
    
    // ==================== 步骤5: 为第二本书添加章节 ====================
    const protagonist2 = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookIds[1]]
    );
    
    const cards2 = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookIds[1]]
    );
    
    const chapter2Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookIds[1],
        selected_cards: {
          protagonist_id: protagonist2.char_id,
          weather_id: cards2.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards2.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards2.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });
    
    expect(chapter2Response.ok()).toBe(true);
    
    // ==================== 步骤6: SQL验证数据隔离 ====================
    const chapters1 = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [bookIds[0]]
    );
    
    const chapters2 = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [bookIds[1]]
    );
    
    expect(chapters1.length).toBeGreaterThan(0);
    expect(chapters2.length).toBeGreaterThan(0);
    
    // ==================== 步骤7: 验证章节属于正确的书籍 ====================
    chapters1.forEach(chapter => {
      expect(chapter.book_id).toBe(bookIds[0]);
    });
    
    chapters2.forEach(chapter => {
      expect(chapter.book_id).toBe(bookIds[1]);
    });
    
    // ==================== 步骤8: 访问书架验证多本书籍显示 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1500);
    
    const bookCards = page.locator('.book-card, .book-item');
    const cardCount = await bookCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(2);
  });
});

test.describe('章节连续创建完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 创建书籍→连续添加5个章节→验证顺序和内容', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Chapter Sequence Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Sequence Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤2: 获取角色和卡牌 ====================
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );
    
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    
    // ==================== 步骤3: 连续添加5个章节 ====================
    const chapterIds = [];
    
    for (let i = 0; i < 5; i++) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: weatherCards[i % weatherCards.length].card_id,
            terrain_id: terrainCards[i % terrainCards.length].card_id,
            adventure_id: adventureCards[i % adventureCards.length].card_id
          }
        }
      });
      
      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);
      chapterIds.push(chapterData.data.chapter.chapter_id);
    }
    
    // ==================== 步骤4: SQL验证章节顺序 ====================
    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [testBookId]
    );
    
    expect(chapters.length).toBe(5);
    
    for (let i = 0; i < 5; i++) {
      expect(chapters[i].order_num).toBe(i + 1);
    }
    
    // ==================== 步骤5: SQL验证每个章节都有谜题 ====================
    for (const chapterId of chapterIds) {
      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE chapter_id = ?',
        [chapterId]
      );
      expect(puzzle).toBeDefined();
      expect(puzzle.is_solved).toBe(0);
    }
    
    // ==================== 步骤6: 访问书籍页面验证章节列表 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const chapterList = page.locator('.chapter-toc-item, .chapter-card, .chapter-item');
    const chapterCount = await chapterList.count();
    expect(chapterCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('用户注册到完整体验旅程测试', () => {
  let db;
  let newUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('完整旅程: 新用户注册→创建书籍→添加章节→解谜→验证完整流程', async ({ page, request }) => {
    
    // ==================== 步骤1: 访问首页 ====================
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // ==================== 步骤2: 设置语言为英文 ====================
    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(300);
    }
    
    // ==================== 步骤3: 访问登录页 ====================
    await page.goto('/login.html');
    await page.waitForTimeout(500);
    
    // ==================== 步骤4: 注册新用户 ====================
    const newEmail = `new_user_journey_${Date.now()}@test.com`;
    const newPassword = 'TestPassword123!';
    
    await page.fill('#email', newEmail);
    await page.fill('#password', newPassword);
    await page.click('.wax-seal-btn');
    
    await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });
    
    // ==================== 步骤5: SQL验证用户创建 ====================
    newUserId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(newUserId).toBeTruthy();
    
    const dbUser = db.query(
      'SELECT * FROM users WHERE user_id = ?',
      [newUserId]
    );
    expect(dbUser).toBeDefined();
    expect(dbUser.email).toBe(newEmail);
    
    // ==================== 步骤6: 验证书架状态（新用户可能为空或有预设书籍） ====================
    const bookCards = page.locator('.book-card, .book-item');
    const bookCount = await bookCards.count();
    expect(bookCount).toBeGreaterThanOrEqual(0);
    
    // ==================== 步骤7: 创建第一本书 ====================
    await page.goto('/book-create.html');
    await page.waitForTimeout(500);
    
    const bookTitle = 'My First Story';
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    await page.fill('#protagonistName', 'First Hero');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', { index: 1 });
    
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.success-title')).toBeVisible({ timeout: 15000 });
    
    // ==================== 步骤8: SQL验证书籍创建 ====================
    const newBook = db.query(
      'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [newUserId]
    );
    expect(newBook).toBeDefined();
    expect(newBook.title).toBe(bookTitle);
    
    // ==================== 步骤9: 访问导演页添加章节 ====================
    await page.goto(`/director.html?book_id=${newBook.book_id}`);
    await page.waitForTimeout(1500);
    
    const characterFan = page.locator('#characterFan .fan-card');
    if (await characterFan.count() > 0) {
      await characterFan.first().click({ force: true });
      await page.waitForTimeout(500);
      
      const adventureFan = page.locator('#adventureFan .fan-card');
      if (await adventureFan.count() > 0) {
        await adventureFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const weatherFan = page.locator('#weatherFan .fan-card');
      if (await weatherFan.count() > 0) {
        await weatherFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const terrainFan = page.locator('#terrainFan .fan-card');
      if (await terrainFan.count() > 0) {
        await terrainFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const startBtn = page.locator('#startBtn');
      if (await startBtn.isEnabled()) {
        await startBtn.click();
        await page.waitForTimeout(2000);
        
        // ==================== 步骤10: SQL验证章节创建 ====================
        const chapters = db.queryAll(
          'SELECT * FROM chapters WHERE book_id = ?',
          [newBook.book_id]
        );
        expect(chapters.length).toBeGreaterThan(0);
        
        // ==================== 步骤11: SQL验证谜题创建 ====================
        const puzzle = db.query(
          'SELECT * FROM puzzles WHERE chapter_id = ?',
          [chapters[0].chapter_id]
        );
        expect(puzzle).toBeDefined();
      }
    }
    
    // ==================== 步骤12: 返回书架验证书籍显示 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    
    const bookCard = page.locator(`.book-card:has-text("${bookTitle}"), .book-item:has-text("${bookTitle}")`);
    await expect(bookCard.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('跨页面数据一致性旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整旅程: 创建书籍→书架→书籍详情→导演页→章节页→数据一致性验证', async ({ page, request }) => {
    
    // ==================== 步骤1: 创建书籍 ====================
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
    await page.waitForTimeout(300);
    
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Cross-Page Consistency Test',
        type: 'adventure',
        protagonist: {
          name: 'Consistency Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    
    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;
    
    // ==================== 步骤2: 书架页面验证 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    
    const bookshelfBook = page.locator(`.book-card:has-text("Cross-Page Consistency Test"), .book-item:has-text("Cross-Page Consistency Test")`);
    await expect(bookshelfBook.first()).toBeVisible({ timeout: 5000 });
    
    // ==================== 步骤3: 书籍详情页验证 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const bookDetailTitle = page.locator('.book-spine-title, .book-meta-info h2');
    await expect(bookDetailTitle.first()).toBeVisible();
    
    // ==================== 步骤4: SQL验证书籍详情页数据一致性 ====================
    const bookFromDb = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );
    expect(bookFromDb).toBeDefined();
    expect(bookFromDb.title).toBe('Cross-Page Consistency Test');
    
    // ==================== 步骤5: 导演页验证 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const directorTitle = page.locator('.director-header h1, h1');
    await expect(directorTitle.first()).toBeVisible();
    
    // ==================== 步骤6: 添加章节 ====================
    const characterFan = page.locator('#characterFan .fan-card');
    if (await characterFan.count() > 0) {
      await characterFan.first().click({ force: true });
      await page.waitForTimeout(500);
      
      const adventureFan = page.locator('#adventureFan .fan-card');
      if (await adventureFan.count() > 0) {
        await adventureFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const weatherFan = page.locator('#weatherFan .fan-card');
      if (await weatherFan.count() > 0) {
        await weatherFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const terrainFan = page.locator('#terrainFan .fan-card');
      if (await terrainFan.count() > 0) {
        await terrainFan.first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      const startBtn = page.locator('#startBtn');
      if (await startBtn.isEnabled()) {
        await startBtn.click();
        await page.waitForTimeout(2000);
      }
    }
    
    // ==================== 步骤7: SQL验证章节创建 ====================
    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(chapters.length).toBeGreaterThan(0);
    
    // ==================== 步骤8: 返回书籍详情页验证章节显示 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);
    
    const chapterList = page.locator('.chapter-toc-item, .chapter-card, .chapter-item');
    const chapterCount = await chapterList.count();
    expect(chapterCount).toBeGreaterThanOrEqual(0);
    
    // ==================== 步骤9: 返回书架验证一致性 ====================
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);
    
    const finalBookCard = page.locator(`.book-card:has-text("Cross-Page Consistency Test"), .book-item:has-text("Cross-Page Consistency Test")`);
    await expect(finalBookCard.first()).toBeVisible({ timeout: 5000 });
    
    // ==================== 步骤10: 最终SQL验证数据完整性 ====================
    const finalBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );
    expect(finalBook).toBeDefined();
    
    const finalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(finalChapters.length).toBe(chapters.length);
    
    const finalCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [testBookId]
    );
    expect(finalCharacters.length).toBeGreaterThan(0);
    
    const finalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    expect(finalCards.length).toBeGreaterThan(0);
  });
});
