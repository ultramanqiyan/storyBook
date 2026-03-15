import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('单章节添加和解谜卡牌掉落测试', () => {
  let db;
  let testUserId;
  let testBookId;

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

  test('完整流程: 登录→创建书籍→导演页添加章节→解谜→验证卡牌掉落', async ({ page, request }) => {
    // ==================== 步骤1: 登录 ====================
    await page.goto('/login.html');
    await page.waitForTimeout(500);
    
    const testEmail = `single_chapter_test_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';
    
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.click('.wax-seal-btn');
    
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    await page.waitForTimeout(1000);

    // 获取登录后的用户ID
    testUserId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(testUserId).toBeDefined();
    console.log('登录成功，用户ID:', testUserId);

    // ==================== 步骤2: 创建书籍 ====================
    await page.goto('/book-create.html');
    await page.waitForTimeout(500);
    
    const bookTitle = `单章节测试书籍 ${Date.now()}`;
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', { index: 1 });
    
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.success-title')).toBeVisible({ timeout: 15000 });

    // 验证书籍创建成功
    const newBook = db.query(
      'SELECT * FROM books WHERE title = ?',
      [bookTitle]
    );
    expect(newBook).toBeDefined();
    testBookId = newBook.book_id;
    console.log('书籍创建成功，书籍ID:', testBookId);

    // 验证初始卡牌数量
    const initialCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    console.log('初始卡牌数量:', initialCards.length);
    expect(initialCards.length).toBe(16);

    // ==================== 步骤3: 访问导演页 ====================
    await page.goto(`/director.html?book_id=${testBookId}`);
    await page.waitForTimeout(1500);

    // 验证导演页加载成功
    const directorTitle = page.locator('.director-header h1, h1');
    const directorText = await directorTitle.first().textContent();
    expect(directorText.toLowerCase()).toContain('director');
    console.log('导演页加载成功');

    // ==================== 步骤4: 选择卡牌 ====================
    // 选择主角卡牌
    const characterFan = page.locator('#characterFan .fan-card');
    const characterCount = await characterFan.count();
    expect(characterCount).toBeGreaterThan(0);
    await characterFan.first().click({ force: true });
    await page.waitForTimeout(500);
    console.log('选择主角卡牌成功');

    // 选择冒险卡牌
    const adventureFan = page.locator('#adventureFan .fan-card');
    const adventureCount = await adventureFan.count();
    expect(adventureCount).toBeGreaterThan(0);
    await adventureFan.first().click({ force: true });
    await page.waitForTimeout(500);
    console.log('选择冒险卡牌成功');

    // 选择天气卡牌
    const weatherFan = page.locator('#weatherFan .fan-card');
    const weatherCount = await weatherFan.count();
    expect(weatherCount).toBeGreaterThan(0);
    await weatherFan.first().click({ force: true });
    await page.waitForTimeout(500);
    console.log('选择天气卡牌成功');

    // 选择地形卡牌
    const terrainFan = page.locator('#terrainFan .fan-card');
    const terrainCount = await terrainFan.count();
    expect(terrainCount).toBeGreaterThan(0);
    await terrainFan.first().click({ force: true });
    await page.waitForTimeout(500);
    console.log('选择地形卡牌成功');

    // ==================== 步骤5: 点击开始按钮 ====================
    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeEnabled({ timeout: 10000 });
    await startBtn.click();
    await page.waitForTimeout(2000);
    console.log('点击开始按钮');

    // ==================== 步骤6: 验证章节创建成功 ====================
    await expect(page).toHaveURL(/chapter/, { timeout: 15000 });

    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [testBookId]
    );
    expect(chapters.length).toBe(1);
    
    const newChapter = chapters[0];
    expect(newChapter.title).toBeDefined();
    expect(newChapter.content).toBeDefined();
    expect(newChapter.content.length).toBeGreaterThan(100);
    console.log('章节创建成功，章节ID:', newChapter.chapter_id);
    console.log('章节标题:', newChapter.title);

    // ==================== 步骤7: 验证谜题创建 ====================
    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [newChapter.chapter_id]
    );
    expect(puzzle).toBeDefined();
    expect(puzzle.question).toBeDefined();
    expect(puzzle.answer).toBeDefined();
    expect(puzzle.is_solved).toBe(0);
    console.log('谜题创建成功，谜题ID:', puzzle.puzzle_id);
    console.log('谜题问题:', puzzle.question);
    console.log('谜题答案:', puzzle.answer);

    // ==================== 步骤8: 解谜（通过网页UI操作） ====================
    // 等待页面加载完成
    await page.waitForTimeout(2000);
    
    // 点击谜题按钮来显示谜题弹窗
    const puzzleTriggerBtn = page.locator('button:has-text("Riddle"), button:has-text("谜题")');
    const triggerCount = await puzzleTriggerBtn.count();
    console.log('谜题触发按钮数量:', triggerCount);
    expect(triggerCount).toBeGreaterThan(0);
    
    await puzzleTriggerBtn.first().click();
    await page.waitForTimeout(500);
    console.log('点击谜题触发按钮');
    
    // 等待谜题弹窗出现
    const puzzleOverlay = page.locator('.puzzle-overlay, .modal, .puzzle-modal');
    await puzzleOverlay.first().waitFor({ state: 'visible', timeout: 10000 });
    console.log('谜题弹窗已显示');
    
    // 验证弹窗可见
    const isVisible = await puzzleOverlay.first().isVisible();
    expect(isVisible).toBe(true);
    
    // 查找选项
    const options = page.locator('.puzzle-option, .option-btn');
    const optionCount = await options.count();
    console.log('选项数量:', optionCount);
    expect(optionCount).toBeGreaterThan(0);
    
    // 打印所有选项
    for (let i = 0; i < optionCount; i++) {
      const optionText = await options.nth(i).textContent();
      console.log(`选项${i}:`, optionText?.trim());
    }
    
    // 找到正确答案并点击
    let clickedCorrect = false;
    for (let i = 0; i < optionCount; i++) {
      const optionText = await options.nth(i).textContent();
      // 模糊匹配：去除空格和特殊字符，只比较核心内容
      const cleanOptionText = optionText?.replace(/\s+/g, '').trim();
      const cleanAnswer = puzzle.answer?.replace(/\s+/g, '').trim();
      
      if (cleanOptionText === cleanAnswer || optionText?.includes(puzzle.answer)) {
        await options.nth(i).click();
        console.log('点击正确答案:', puzzle.answer);
        clickedCorrect = true;
        break;
      }
    }
    
    // 如果没找到匹配的答案，点击第一个选项
    if (!clickedCorrect) {
      console.log('未找到匹配答案，点击第一个选项');
      await options.first().click();
    }
    
    // 点击提交按钮
    const submitBtn = page.locator('.submit-btn, button:has-text("Submit"), button:has-text("提交")');
    const submitCount = await submitBtn.count();
    console.log('提交按钮数量:', submitCount);
    expect(submitCount).toBeGreaterThan(0);
    
    await submitBtn.first().click();
    await page.waitForTimeout(500);
    
    // 等待成功提示或弹窗关闭
    await page.waitForTimeout(1000);
    
    // ==================== 步骤9: 验证谜题已解决 ====================
    const puzzleAfter = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );
    expect(puzzleAfter.is_solved).toBe(1);
    console.log('谜题已解决');
    
    // ==================== 步骤10: 验证卡牌掉落 ====================
    const finalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    console.log('最终卡牌数量:', finalCards.length);
    console.log('初始卡牌数量:', initialCards.length);
    
    // 检查是否有新卡牌掉落
    const newCards = finalCards.filter(c => !initialCards.some(ic => ic.card_id === c.card_id));
    console.log('新掉落的卡牌数量:', newCards.length);
    
    if (newCards.length > 0) {
      for (const card of newCards) {
        console.log('新卡牌:', {
          card_id: card.card_id,
          name: card.name,
          sub_type: card.sub_type,
          is_custom: card.is_custom
        });
      }
    }
    
    // ==================== 步骤10.5: 验证角色掉落 ====================
    const initialCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [testBookId]
    );
    console.log('初始角色数量:', initialCharacters.length);
    
    const finalCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [testBookId]
    );
    console.log('最终角色数量:', finalCharacters.length);
    
    // 检查是否有新角色掉落
    const newCharacters = finalCharacters.filter(c => !initialCharacters.some(ic => ic.char_id === c.char_id));
    console.log('新掉落的角色数量:', newCharacters.length);
    
    if (newCharacters.length > 0) {
      for (const char of newCharacters) {
        console.log('新角色:', {
          char_id: char.char_id,
          avatar: char.avatar,
          role_type: char.role_type,
          personality: char.personality,
          is_custom: char.is_custom
        });
      }
    }
    
    // 验证：解谜成功后应该掉落卡牌或角色
    const hasNewCards = newCards.length > 0;
    const hasNewCharacters = newCharacters.length > 0;
    console.log('有新卡牌掉落:', hasNewCards);
    console.log('有新角色掉落:', hasNewCharacters);
    
    // 至少应该有卡牌或角色掉落
    expect(hasNewCards || hasNewCharacters).toBe(true);
    console.log('卡牌/角色掉落验证成功');

    // ==================== 步骤11: 验证书籍详情页显示章节 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(1500);

    const chapterList = page.locator('.chapter-toc-item');
    const chapterCount = await chapterList.count();
    expect(chapterCount).toBe(1);
    console.log('书籍详情页显示1个章节');

    // ==================== 步骤12: 输出测试报告 ====================
    const report = {
      bookId: testBookId,
      userId: testUserId,
      chapterId: newChapter.chapter_id,
      puzzleId: puzzle.puzzle_id,
      initialCardCount: initialCards.length,
      finalCardCount: finalCards.length,
      newCardsDropped: newCards.length,
      customCards: finalCards.filter(c => c.is_custom === 1).length
    };
    
    console.log('\n========== 测试报告 ==========');
    console.log(JSON.stringify(report, null, 2));
    console.log('==============================\n');

    expect(report.finalCardCount).toBeGreaterThan(report.initialCardCount);
  });
});
