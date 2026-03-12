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
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('添加章节并验证数据库', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试书籍_章节测试',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const createBookData = await createBookResponse.json();
    expect(createBookData.success).toBe(true);
    testBookId = createBookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
    
    weatherCardId = weatherCards[0].card_id;
    terrainCardId = terrainCards[0].card_id;
    adventureCardId = adventureCards[0].card_id;
    equipmentCardId = equipmentCards[0].card_id;

    await page.goto(`/director.html?book_id=${testBookId}`);

    await expect(page.locator('.director-header h1')).toContainText('Story Director');

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="protagonist"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="weather"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="terrain"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="adventure"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${equipmentCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="equipment"].filled')).toBeVisible();

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeEnabled();

    await startBtn.click();

    await expect(page).toHaveURL(/chapter/, { timeout: 15000 });

    const chaptersResponse = await request.get(`/api/chapters?book_id=${testBookId}`);
    const chaptersData = await chaptersResponse.json();
    expect(chaptersData.success).toBe(true);
    expect(chaptersData.data.length).toBe(1);

    const chapter = chaptersData.data[0];
    expect(chapter.book_id).toBe(testBookId);
    expect(chapter.title).toBeDefined();
    expect(chapter.content).toBeDefined();
    expect(chapter.order_num).toBe(1);

    const selectedCards = JSON.parse(chapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(protagonistId);
    
    const selectedWeatherCard = cards.find(c => c.card_id === selectedCards.weather_id);
    expect(selectedWeatherCard).toBeDefined();
    expect(selectedWeatherCard.sub_type).toBe('weather');
    
    const selectedTerrainCard = cards.find(c => c.card_id === selectedCards.terrain_id);
    expect(selectedTerrainCard).toBeDefined();
    expect(selectedTerrainCard.sub_type).toBe('terrain');
    
    const selectedAdventureCard = cards.find(c => c.card_id === selectedCards.adventure_id);
    expect(selectedAdventureCard).toBeDefined();
    expect(selectedAdventureCard.sub_type).toBe('adventure');
    
    const selectedEquipmentCard = cards.find(c => c.card_id === selectedCards.equipment_id);
    expect(selectedEquipmentCard).toBeDefined();
    expect(selectedEquipmentCard.sub_type).toBe('equipment');
  });

  test('未选择必需卡牌时按钮应禁用', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试书籍_按钮禁用测试',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const createBookData = await createBookResponse.json();
    const bookId = createBookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistIdLocal = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCardIdLocal = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainCardIdLocal = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureCardIdLocal = cards.find(c => c.sub_type === 'adventure').card_id;

    await page.goto(`/director.html?book_id=${bookId}`);

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${protagonistIdLocal}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${weatherCardIdLocal}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${terrainCardIdLocal}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${adventureCardIdLocal}"]`).click({ force: true });
    await expect(startBtn).toBeEnabled();
  });
});
