import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('章节添加流程', () => {
  let db;
  let testBookId;
  let testUserId;
  let protagonistId;
  let weatherCardId;
  let terrainCardId;
  let adventureCardId;
  let equipmentCardId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();

    const result = createTestBook(db, testUserId);
    testBookId = result.bookId;
    protagonistId = result.protagonistId;
    weatherCardId = result.weatherCardId;
    terrainCardId = result.terrainCardId;
    adventureCardId = result.adventureCardId;
    equipmentCardId = result.equipmentCardId;
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('添加章节并验证数据库', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/director.html?book_id=${testBookId}`);

    await expect(page.locator('.director-header h1')).toContainText('Story Director');

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click();
    await expect(page.locator('[data-slot="protagonist"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click();
    await expect(page.locator('[data-slot="weather"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click();
    await expect(page.locator('[data-slot="terrain"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click();
    await expect(page.locator('[data-slot="adventure"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${equipmentCardId}"]`).click();
    await expect(page.locator('[data-slot="equipment"].filled')).toBeVisible();

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeEnabled();

    await startBtn.click();

    await expect(page).toHaveURL(/chapter\.html/, { timeout: 15000 });

    const chapters = db.getChaptersByBookId(testBookId);
    expect(chapters.length).toBe(1);

    const chapter = chapters[0];
    expect(chapter.book_id).toBe(testBookId);
    expect(chapter.title).toBeDefined();
    expect(chapter.content).toBeDefined();
    expect(chapter.order_num).toBe(1);

    const selectedCards = JSON.parse(chapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(protagonistId);
    expect(selectedCards.weather_id).toBe(weatherCardId);
    expect(selectedCards.terrain_id).toBe(terrainCardId);
    expect(selectedCards.adventure_id).toBe(adventureCardId);
    expect(selectedCards.equipment_id).toBe(equipmentCardId);

    const puzzles = db.getPuzzlesByChapterId(chapter.chapter_id);
    expect(puzzles.length).toBe(1);

    const puzzle = puzzles[0];
    expect(puzzle.question).toBeDefined();
    expect(puzzle.answer).toBeDefined();
    expect(puzzle.puzzle_type).toBe('text');
    expect(puzzle.is_solved).toBe(0);
    expect(puzzle.max_attempts).toBe(3);
  });

  test('未选择必需卡牌时按钮应禁用', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/director.html?book_id=${testBookId}`);

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click();
    await expect(startBtn).toBeEnabled();
  });
});

function createTestBook(db, userId) {
  const bookId = 'test-book-' + Date.now();
  db.run(
    'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)',
    [bookId, userId, '测试书籍', 'adventure']
  );

  const protagonistId = 'test-protagonist-' + Date.now();
  db.run(
    'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)',
    [protagonistId, bookId, '测试主角', '🧙‍♂️', '', '', '', 1, 0]
  );

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const icons = { weather: '☀️', terrain: '🌲', adventure: '🗺️', equipment: '🎒' };
  const cardIds = {};
  
  for (const subType of subTypes) {
    for (let i = 0; i < 4; i++) {
      const cardId = `test-card-${subType}-${i}-${Date.now()}`;
      db.run(
        'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
        [cardId, bookId, 'plot', subType, `测试${subType}${i}`, icons[subType], `测试描述`]
      );
      if (i === 0) {
        cardIds[subType] = cardId;
      }
    }
  }

  return {
    bookId,
    protagonistId,
    weatherCardId: cardIds.weather,
    terrainCardId: cardIds.terrain,
    adventureCardId: cardIds.adventure,
    equipmentCardId: cardIds.equipment
  };
}
