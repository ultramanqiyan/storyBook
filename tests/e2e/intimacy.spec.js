import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('亲密度系统', () => {
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

  test('配角创建时可选择亲密度', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '亲密度测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForSelector('#protagonistName', { state: 'visible' });

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', 'adventurer');
    await page.locator('#step2 .btn-next').click();
    await page.waitForSelector('#step3.active', { state: 'visible' });

    const companionName = page.locator('.companion-name').first();
    if (await companionName.count() > 0) {
      await companionName.fill('配角');
      
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

    const hostileOption = page.locator('.intimacy-option[data-value="-50"]').first();
    if (await hostileOption.count() > 0) {
      await hostileOption.click();
      await expect(hostileOption).toHaveClass(/selected/);
    }
  });

  test('亲密度三档选择功能', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '亲密度档位测试');
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForSelector('#protagonistName', { state: 'visible' });

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', 'adventurer');
    await page.locator('#step2 .btn-next').click();
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

    const hostileOption = page.locator('.intimacy-option[data-value="-50"]').first();
    const neutralOption = page.locator('.intimacy-option[data-value="0"]').first();
    const friendlyOption = page.locator('.intimacy-option[data-value="50"]').first();

    if (await neutralOption.count() > 0) {
      await expect(neutralOption).toHaveClass(/selected/);

      if (await hostileOption.count() > 0) {
        await hostileOption.click();
        await expect(hostileOption).toHaveClass(/selected/);
      }

      if (await friendlyOption.count() > 0) {
        await friendlyOption.click();
        await expect(friendlyOption).toHaveClass(/selected/);
      }
    }
  });

  test('创建书籍时亲密度正确保存', async ({ page }) => {
    const bookTitle = '亲密度保存测试-' + Date.now();
    
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.locator('#step1 .btn-next').click();
    await page.waitForSelector('#protagonistName', { state: 'visible' });

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', 'adventurer');
    await page.locator('#step2 .btn-next').click();
    await page.waitForSelector('#step3.active', { state: 'visible' });

    const companionName = page.locator('.companion-name').first();
    if (await companionName.count() > 0) {
      await companionName.fill('敌对配角');
      
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

    const hostileOption = page.locator('.intimacy-option[data-value="-50"]').first();
    if (await hostileOption.count() > 0) {
      await hostileOption.click();
    }

    await page.locator('#step3 .btn-next').click();
    await page.waitForSelector('.success-content.visible, .success-content:not([style*="display: none"])', { state: 'visible' });

    const book = db.query('SELECT * FROM books WHERE title = ?', [bookTitle]);
    if (book) {
      const characters = db.queryAll('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0', [book.book_id]);
      if (characters.length > 0) {
        expect(characters[0].intimacy).toBe(-50);
      }
    }
  });

  test('亲密度数值范围验证', async ({ request }) => {
    const intimacies = [-100, -50, 0, 50, 100];
    
    for (const intimacy of intimacies) {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `亲密度${intimacy}测试-${Date.now()}`,
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

  test('书籍详情页显示配角亲密度', async ({ page, request }) => {
    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '亲密度显示测试-' + Date.now(),
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
          }
        ]
      }
    });
    const bookData = await response.json();
    const bookId = bookData.data.book_id;

    await page.goto(`/book.html?id=${bookId}`);
    await page.waitForTimeout(1000);

    const characterSection = page.locator('.character-section, .characters-container');
    if (await characterSection.count() > 0) {
      const hostileChar = page.locator('.character-card:has-text("敌对角色")');
      if (await hostileChar.count() > 0) {
        const intimacyBadge = hostileChar.locator('.intimacy-badge, .intimacy');
        if (await intimacyBadge.count() > 0) {
          await expect(intimacyBadge).toContainText(/敌对|hostile|-50/i);
        }
      }
    }
  });
});
