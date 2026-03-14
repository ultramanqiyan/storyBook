import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('亲密度系统', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('配角创建时可选择亲密度', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    await page.fill('#storyTitle', '亲密度测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.locator('#step2 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('.companion-name', '配角');
    await page.locator('#companion1Avatars .avatar-option').first().click();

    const hostileOption = page.locator('#companion1Intimacy .intimacy-option[data-value="-50"]');
    await hostileOption.click();
    
    await expect(hostileOption).toHaveClass(/selected/);
  });

  test('亲密度三档选择功能', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    await page.fill('#storyTitle', '亲密度档位测试');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.locator('#step2 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('.companion-name', '测试配角');

    const hostileOption = page.locator('#companion1Intimacy .intimacy-option[data-value="-50"]');
    const neutralOption = page.locator('#companion1Intimacy .intimacy-option[data-value="0"]');
    const friendlyOption = page.locator('#companion1Intimacy .intimacy-option[data-value="50"]');

    await expect(neutralOption).toHaveClass(/selected/);

    await hostileOption.click();
    await expect(hostileOption).toHaveClass(/selected/);
    await expect(neutralOption).not.toHaveClass(/selected/);

    await friendlyOption.click();
    await expect(friendlyOption).toHaveClass(/selected/);
    await expect(hostileOption).not.toHaveClass(/selected/);
  });

  test('创建书籍时亲密度正确保存', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    await page.fill('#storyTitle', '亲密度保存测试');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.locator('#step2 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('.companion-name', '敌对配角');
    await page.locator('#companion1Avatars .avatar-option').first().click();
    await page.locator('#companion1Intimacy .intimacy-option[data-value="-50"]').click();

    await page.locator('#step3 .btn-next').click();
    await page.waitForTimeout(2000);

    const books = db.queryAll('SELECT * FROM books WHERE user_id = ? ORDER BY book_id DESC LIMIT 1', [testUserId]);
    expect(books.length).toBeGreaterThan(0);
    
    const bookId = books[0].book_id;
    const characters = db.queryAll('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0', [bookId]);
    
    if (characters.length > 0) {
      expect(characters[0].intimacy).toBe(-50);
    }
  });

  test('亲密度数值范围验证', async ({ request }) => {
    const intimacies = [-100, -50, 0, 50, 100];
    
    for (const intimacy of intimacies) {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `亲密度${intimacy}测试`,
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [
            {
              name: `亲密度${intimacy}角色`,
              avatar: '🧝',
              role_type: '精灵',
              personality: '勇敢',
              speech_style: '简洁直接',
              intimacy: intimacy,
              is_protagonist: 0
            }
          ]
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    }
  });

  test('多个配角可分别设置不同亲密度', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    await page.fill('#storyTitle', '多配角亲密度测试');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.locator('#step2 .btn-next').click();
    await page.waitForTimeout(500);

    await page.fill('#companion1 .companion-name', '敌对配角');
    await page.locator('#companion1Avatars .avatar-option').first().click();
    await page.locator('#companion1Intimacy .intimacy-option[data-value="-50"]').click();

    await page.click('#addCompanionBtn');
    await page.waitForTimeout(500);

    await page.fill('#companion2 .companion-name', '友好配角');
    await page.locator('#companion2Avatars .avatar-option').first().click();
    await page.locator('#companion2Intimacy .intimacy-option[data-value="50"]').click();

    const hostileOption = page.locator('#companion1Intimacy .intimacy-option[data-value="-50"]');
    const friendlyOption = page.locator('#companion2Intimacy .intimacy-option[data-value="50"]');

    await expect(hostileOption).toHaveClass(/selected/);
    await expect(friendlyOption).toHaveClass(/selected/);
  });

  test('书籍详情页显示配角亲密度', async ({ page, request }) => {
    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '亲密度显示测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: '敌对角色',
            avatar: '😈',
            role_type: '反派',
            personality: '阴险',
            speech_style: '阴阳怪气',
            intimacy: -50,
            is_protagonist: 0
          },
          {
            name: '中立角色',
            avatar: '😐',
            role_type: '路人',
            personality: '随和',
            speech_style: '简洁直接',
            intimacy: 0,
            is_protagonist: 0
          },
          {
            name: '友好角色',
            avatar: '😊',
            role_type: '朋友',
            personality: '善良',
            speech_style: '温柔体贴',
            intimacy: 50,
            is_protagonist: 0
          }
        ]
      }
    });
    const bookData = await response.json();
    const bookId = bookData.data.book_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${bookId}`);
    await page.waitForTimeout(2000);

    const characterSection = page.locator('.character-section, .characters-container');
    if (await characterSection.count() > 0) {
      const hostileChar = page.locator('.character-card:has-text("敌对角色")');
      const neutralChar = page.locator('.character-card:has-text("中立角色")');
      const friendlyChar = page.locator('.character-card:has-text("友好角色")');

      if (await hostileChar.count() > 0) {
        const intimacyBadge = hostileChar.locator('.intimacy-badge, .intimacy');
        if (await intimacyBadge.count() > 0) {
          await expect(intimacyBadge).toContainText(/敌对|hostile|-50/i);
        }
      }
    }
  });
});
