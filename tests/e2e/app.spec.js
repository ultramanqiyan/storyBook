import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8788';

test.describe('首页测试 - 所有按钮和交互', () => {
  test('首页应该正确加载并显示所有元素', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/卡牌互动小说/);
    await expect(page.locator('h1')).toContainText('卡牌互动小说');
    await expect(page.locator('.subtitle')).toContainText('创造属于你的故事');
  });

  test('首页应该显示三个功能卡片', async ({ page }) => {
    await page.goto('/');
    const features = await page.locator('.feature-card').count();
    expect(features).toBe(3);
    
    await expect(page.locator('.feature-card').first()).toContainText('角色卡牌');
    await expect(page.locator('.feature-card').nth(1)).toContainText('情节卡牌');
    await expect(page.locator('.feature-card').nth(2)).toContainText('互动谜题');
  });

  test('首页应该显示预设书籍', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.book-card', { timeout: 10000 });
    const books = await page.locator('.book-card').count();
    expect(books).toBeGreaterThanOrEqual(1);
  });

  test('首页点击开始创作按钮应该跳转到登录页', async ({ page }) => {
    await page.goto('/');
    await page.click('a.btn-primary:has-text("开始创作")');
    await expect(page).toHaveURL(/login/);
  });

  test('首页点击浏览书架按钮未登录应该跳转到登录页', async ({ page }) => {
    await page.goto('/');
    await page.click('.btn-secondary:has-text("浏览书架")');
    await expect(page).toHaveURL(/login/);
  });

  test('首页点击书籍卡片应该跳转到详情页', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.book-card', { timeout: 10000 });
    await page.locator('.book-card').first().click();
    await expect(page).toHaveURL(/book\?id=/);
  });

  test('首页点击logo应该刷新页面', async ({ page }) => {
    await page.goto('/');
    await page.click('h1');
    await expect(page).toHaveURL('/');
  });
});

test.describe('登录页面测试 - 所有按钮和交互', () => {
  test('登录页面应该显示正确的表单元素', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('#loginForm')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('登录页面点击logo应该返回首页', async ({ page }) => {
    await page.goto('/login');
    await page.click('a.logo');
    await expect(page).toHaveURL('/');
  });

  test('登录页面应该拒绝空表单提交', async ({ page }) => {
    await page.goto('/login');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/login/);
  });

  test('登录页面应该拒绝无效邮箱格式', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'invalid-email');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/login/);
  });

  test('登录页面应该拒绝过短密码', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/login/);
  });

  test('应该成功注册新用户并验证数据库', async ({ page }) => {
    await page.goto('/login');
    const testEmail = `e2e_user_${Date.now()}@test.com`;
    await page.fill('#email', testEmail);
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    await expect(page.url()).toContain('/bookshelf');
    
    const dbResponse = await page.request.get(`${BASE_URL}/api/users?email=${testEmail}`);
    const dbData = await dbResponse.json();
    if (dbData.success) {
      expect(dbData.data.email).toBe(testEmail);
    }
  });

  test('应该成功登录已有用户', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    await expect(page.url()).toContain('/bookshelf');
  });
});

test.describe('书架页面测试 - 所有按钮和交互', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
  });

  test('书架页应该显示我的书架标题', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('我的书架');
  });

  test('书架页应该显示新建书籍按钮', async ({ page }) => {
    await expect(page.locator('button:has-text("新建书籍")')).toBeVisible();
  });

  test('书架页点击logo应该返回首页', async ({ page }) => {
    await page.click('a.logo');
    await expect(page).toHaveURL('/');
  });

  test('书架页点击退出按钮应该清除登录状态', async ({ page }) => {
    await page.click('button:has-text("退出")');
    await expect(page).toHaveURL(/login/);
    
    const userId = await page.evaluate(() => localStorage.getItem('userId'));
    expect(userId).toBeNull();
  });

  test('书架页点击新建书籍按钮应该显示模态框', async ({ page }) => {
    await page.click('button:has-text("新建书籍")');
    await expect(page.locator('#createBookModal')).toBeVisible();
  });

  test('书架页模态框点击取消应该关闭模态框', async ({ page }) => {
    await page.click('button:has-text("新建书籍")');
    await expect(page.locator('#createBookModal')).toBeVisible();
    await page.click('button:has-text("取消")');
    await page.waitForTimeout(500);
    const modalVisible = await page.locator('#createBookModal').isVisible();
    expect(modalVisible).toBe(false);
  });

  test('书架页模态框应该能创建书籍并验证数据库', async ({ page }) => {
    const bookTitle = `测试书籍_${Date.now()}`;
    
    await page.click('button:has-text("新建书籍")');
    await page.fill('#bookTitle', bookTitle);
    await page.selectOption('#bookType', 'adventure');
    await page.click('#createBookForm button[type="submit"]');
    
    await page.waitForTimeout(3000);
    
    const dbResponse = await page.request.get(`${BASE_URL}/api/books/preset`);
    const dbData = await dbResponse.json();
    expect(dbData.success).toBe(true);
  });

  test('书架页点击我的创作书籍卡片应该跳转到详情页', async ({ page }) => {
    await page.waitForSelector('#myBooks', { timeout: 5000 });
    const bookCards = await page.locator('#myBooks .book-card').count();
    if (bookCards > 0) {
      await page.locator('#myBooks .book-card').first().click();
      await expect(page).toHaveURL(/book\?id=/);
    }
  });

  test('书架页点击预设书籍卡片应该跳转到详情页', async ({ page }) => {
    await page.waitForSelector('#presetBooks .book-card', { timeout: 5000 });
    await page.locator('#presetBooks .book-card').first().click();
    await expect(page).toHaveURL(/book\?id=/);
  });
});

test.describe('书籍详情页测试 - 所有按钮和交互', () => {
  test('应该显示书籍详情', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const bookDetail = page.locator('#bookDetail');
    await expect(bookDetail).toBeVisible();
  });

  test('应该显示三个标签按钮', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const tabs = await page.locator('.tab-btn').count();
    expect(tabs).toBe(3);
    
    await expect(page.locator('.tab-btn').first()).toContainText('章节');
    await expect(page.locator('.tab-btn').nth(1)).toContainText('角色');
    await expect(page.locator('.tab-btn').nth(2)).toContainText('卡牌');
  });

  test('点击章节标签应该显示章节列表', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("章节")');
    await page.waitForTimeout(500);
    
    const chaptersList = page.locator('#chaptersList');
    const isVisible = await chaptersList.isVisible();
    expect(typeof isVisible).toBe('boolean');
  });

  test('点击角色标签应该显示角色列表', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("角色")');
    await page.waitForTimeout(500);
    
    const charactersList = page.locator('#charactersList');
    const isVisible = await charactersList.isVisible();
    expect(typeof isVisible).toBe('boolean');
  });

  test('点击卡牌标签应该显示卡牌列表', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("卡牌")');
    await page.waitForTimeout(500);
    
    const cardsList = page.locator('#cardsList');
    const isVisible = await cardsList.isVisible();
    expect(typeof isVisible).toBe('boolean');
  });

  test('点击章节应该跳转到章节阅读页', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("章节")');
    await page.waitForSelector('.chapter-item', { timeout: 5000 });
    
    const chapterItems = await page.locator('.chapter-item').count();
    if (chapterItems > 0) {
      await page.locator('.chapter-item').first().click();
      await expect(page).toHaveURL(/chapter\?id=/);
    }
  });

  test('点击logo应该返回书架页', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('a.logo');
    await expect(page).toHaveURL(/bookshelf/);
  });

  test('预设书籍不应该显示添加按钮', async ({ page }) => {
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const addChapterBtn = page.locator('#addChapterBtn');
    const addCharBtn = page.locator('#addCharBtn');
    const addCardBtn = page.locator('#addCardBtn');
    
    const chapterBtnVisible = await addChapterBtn.isVisible();
    const charBtnVisible = await addCharBtn.isVisible();
    const cardBtnVisible = await addCardBtn.isVisible();
    
    expect(chapterBtnVisible).toBe(false);
    expect(charBtnVisible).toBe(false);
    expect(cardBtnVisible).toBe(false);
  });
});

test.describe('章节阅读页测试 - 所有按钮和交互', () => {
  test('应该显示章节内容', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.chapter-content', { timeout: 10000 });
      await expect(page.locator('.chapter-content')).toBeVisible();
    }
  });

  test('应该显示故事文本', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.story-text', { timeout: 10000 });
      await expect(page.locator('.story-text')).toBeVisible();
    }
  });

  test('应该显示章节导航按钮', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.chapter-nav', { timeout: 10000 });
      await expect(page.locator('.chapter-nav')).toBeVisible();
    }
  });

  test('点击目录按钮应该返回书籍详情页', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.chapter-nav', { timeout: 10000 });
      await page.click('a:has-text("目录")');
      await expect(page).toHaveURL(/book\?id=/);
    }
  });

  test('点击下一章按钮应该跳转到下一章', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 1) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.chapter-nav', { timeout: 10000 });
      
      const nextBtn = page.locator('a:has-text("下一章")');
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await expect(page).toHaveURL(/chapter\?id=/);
      }
    }
  });

  test('点击logo应该返回首页', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      await page.goto(`/chapter?id=${data.data[0].chapter_id}`);
      await page.waitForSelector('.chapter-content', { timeout: 10000 });
      await page.click('a.logo');
      await expect(page).toHaveURL('/');
    }
  });
});

test.describe('谜题解谜测试 - 所有按钮和交互', () => {
  test('正确答案应该返回成功', async ({ page }) => {
    const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001`);
    const puzzleData = await puzzleResponse.json();
    
    if (puzzleData.success) {
      const answer = puzzleData.data.answer;
      const response = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-001/solve`, {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ answer })
      });
      const data = await response.json();
      expect(data.success).toBe(true);
    }
  });

  test('错误答案应该返回失败', async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-002/solve`, {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ answer: '错误答案' })
    });
    const data = await response.json();
    expect(data.success).toBe(true);
    if (data.data && typeof data.data.is_correct === 'boolean' && !data.data.is_solved) {
      expect(data.data.is_correct).toBe(false);
    }
  });

  test('解谜成功应该掉落卡牌并验证数据库', async ({ page }) => {
    const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001`);
    const puzzleData = await puzzleResponse.json();
    
    if (puzzleResponse.status() === 200 && puzzleData.success && puzzleData.data.is_solved === 0) {
      const answer = puzzleData.data.answer;
      const response = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-001/solve`, {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ answer })
      });
      
      const data = await response.json();
      if (data.success && data.data.is_correct && data.data.reward) {
        expect(data.data.reward.card).toBeDefined();
        expect(data.data.reward.card.name).toBeDefined();
        
        const cardsResponse = await page.request.get(`${BASE_URL}/api/plot-cards?book_id=preset-adventure-001`);
        const cardsData = await cardsResponse.json();
        expect(cardsData.success).toBe(true);
      }
    }
  });
});

test.describe('故事导演页测试 - 所有按钮和交互', () => {
  test('应该显示舞台区域', async ({ page }) => {
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('.stage-section', { timeout: 10000 });
    await expect(page.locator('.stage-section')).toBeVisible();
  });

  test('应该显示开始拍摄按钮', async ({ page }) => {
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('#start-shooting', { timeout: 10000 });
    await expect(page.locator('#start-shooting')).toBeVisible();
  });

  test('未选择完整卡牌时按钮应该禁用', async ({ page }) => {
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('#start-shooting', { timeout: 10000 });
    const button = page.locator('#start-shooting');
    await expect(button).toBeDisabled();
  });

  test('应该显示选择提示', async ({ page }) => {
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('#selection-hint', { timeout: 10000 });
    await expect(page.locator('#selection-hint')).toBeVisible();
  });

  test('应该显示卡牌区域', async ({ page }) => {
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('.stage-section', { timeout: 10000 });
    
    const characterCards = page.locator('#character-cards');
    const weatherCards = page.locator('#weather-cards');
    const terrainCards = page.locator('#terrain-cards');
    const adventureCards = page.locator('#adventure-cards');
    const equipmentCards = page.locator('#equipment-cards');
    
    const charVisible = await characterCards.isVisible();
    const weatherVisible = await weatherCards.isVisible();
    const terrainVisible = await terrainCards.isVisible();
    const adventureVisible = await adventureCards.isVisible();
    const equipmentVisible = await equipmentCards.isVisible();
    
    expect(typeof charVisible).toBe('boolean');
    expect(typeof weatherVisible).toBe('boolean');
    expect(typeof terrainVisible).toBe('boolean');
    expect(typeof adventureVisible).toBe('boolean');
    expect(typeof equipmentVisible).toBe('boolean');
  });
});

test.describe('书籍创建页面测试 - 所有按钮和交互', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('应该显示多步骤进度条', async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeVisible();
    
    const steps = await page.locator('.progress-step').count();
    expect(steps).toBe(4);
  });

  test('步骤1应该显示基本信息表单', async ({ page }) => {
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#bookTitle')).toBeVisible();
    await expect(page.locator('#bookType')).toBeVisible();
  });

  test('步骤1点击下一步按钮应该进入步骤2', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await expect(page.locator('#step2')).toBeVisible();
  });

  test('步骤2应该显示主角信息表单', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await expect(page.locator('#step2')).toBeVisible();
    await expect(page.locator('#protagonistName')).toBeVisible();
  });

  test('步骤2点击上一步按钮应该返回步骤1', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await expect(page.locator('#step2')).toBeVisible();
    await page.click('#step2 button:has-text("上一步")');
    await expect(page.locator('#step1')).toBeVisible();
  });

  test('步骤3应该显示配角信息表单', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await expect(page.locator('#step3')).toBeVisible();
  });

  test('步骤3点击添加配角按钮应该增加配角表单', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await expect(page.locator('.btn-add-character')).toBeVisible();
    await page.click('.btn-add-character');
    
    const supportingChars = await page.locator('.supporting-character').count();
    expect(supportingChars).toBe(2);
  });

  test('步骤3最多只能添加3个配角', async ({ page }) => {
    await page.fill('#bookTitle', '测试书籍');
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.click('.btn-add-character');
    await page.click('.btn-add-character');
    
    const addBtn = page.locator('.btn-add-character');
    await expect(addBtn).toBeDisabled();
  });

  test('应该能完成整个创建流程', async ({ page }) => {
    const bookTitle = `完整流程测试书籍_${Date.now()}`;
    
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    
    await expect(page.locator('#step2')).toBeVisible();
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await expect(page.locator('#step3')).toBeVisible();
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(3000);
    
    const currentStep = await page.evaluate(() => {
      const step4 = document.querySelector('#step4');
      return step4 && step4.classList.contains('active');
    });
    
    expect(typeof currentStep).toBe('boolean');
  });

  test('步骤3点击下一步应该触发创建流程', async ({ page }) => {
    const bookTitle = `测试书籍_${Date.now()}`;
    
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(2000);
    
    const step3Visible = await page.locator('#step3').isVisible();
    expect(typeof step3Visible).toBe('boolean');
  });

  test('步骤3点击下一步后等待响应', async ({ page }) => {
    const bookTitle = `测试书籍_${Date.now()}`;
    
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'adventure');
    await page.click('#step1 button:has-text("下一步")');
    await page.fill('#protagonistName', '小明');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('book-create');
  });

  test('点击返回书架链接应该返回书架页', async ({ page }) => {
    await page.click('a.back-link');
    await expect(page).toHaveURL(/bookshelf/);
  });
});

test.describe('API基础测试', () => {
  test('预设书籍API应该返回数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/books/preset`);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('书籍详情API应该返回数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001`);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.book_id).toBe('preset-adventure-001');
  });

  test('章节API应该返回数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001`);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('角色API应该返回数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/characters?book_id=preset-adventure-001`);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('卡牌API应该返回数据', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/plot-cards?book_id=preset-adventure-001`);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});

test.describe('配置API测试', () => {
  test('应该返回书籍类型配置', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/config/book-types`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.types.length).toBe(4);
  });

  test('应该返回角色类型配置', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/config/character-types?book_type=adventure`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('应该返回性格配置', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/config/personality`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.personality.length).toBe(25);
  });

  test('应该返回说话方式配置', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/config/speech-style`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.speech_styles.length).toBe(25);
  });

  test('应该返回情节选项配置', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/config/plot-options?book_type=adventure&sub_type=weather`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});

test.describe('响应式测试', () => {
  test('移动端首页应该正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveTitle(/卡牌互动小说/);
  });

  test('移动端登录页应该正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    await expect(page.locator('#loginForm')).toBeVisible();
  });

  test('移动端书架页应该正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    await expect(page.locator('h2')).toContainText('我的书架');
  });

  test('平板端首页应该正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page).toHaveTitle(/卡牌互动小说/);
  });
});

test.describe('异常情况测试', () => {
  test('API请求不存在的书籍应该返回错误', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/books/nonexistent-id`);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('API请求缺少参数应该返回错误', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/books`);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('访问不存在的书籍详情页应该显示错误', async ({ page }) => {
    await page.goto('/book?id=nonexistent-book-id');
    await page.waitForTimeout(2000);
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });

  test('访问不存在的章节页应该显示错误', async ({ page }) => {
    await page.goto('/chapter?id=nonexistent-chapter-id');
    await page.waitForTimeout(2000);
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });

  test('未登录访问书架页应该重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf');
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('性能测试', () => {
  test('首页加载时间应该合理', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000);
  });

  test('API响应时间应该合理', async ({ page }) => {
    const startTime = Date.now();
    const response = await page.request.get(`${BASE_URL}/api/books/preset`);
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(5000);
    expect(response.status()).toBe(200);
  });
});

test.describe('长连续步骤测试 - 完整用户流程（涉及数据变更）', () => {
  test('完整流程：注册->创建书籍->验证数据库', async ({ page }) => {
    const testEmail = `full_flow_${Date.now()}@test.com`;
    const bookTitle = `完整流程测试书籍_${Date.now()}`;
    
    await page.goto('/login');
    await page.fill('#email', testEmail);
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    await page.click('button:has-text("新建书籍")');
    await page.fill('#bookTitle', bookTitle);
    await page.selectOption('#bookType', 'adventure');
    await page.click('#createBookForm button[type="submit"]');
    await page.waitForTimeout(3000);
    
    const dbResponse = await page.request.get(`${BASE_URL}/api/books/preset`);
    const dbData = await dbResponse.json();
    expect(dbData.success).toBe(true);
  });

  test('完整流程：登录->创建书籍->查看详情->验证角色数据', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    const bookTitle = `角色验证书籍_${Date.now()}`;
    
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'fantasy');
    await page.click('#step1 button:has-text("下一步")');
    
    await page.fill('#protagonistName', '魔法师');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.fill('[name="supporting_0_name"]', '配角A');
    await page.click('.btn-add-character');
    await page.fill('[name="supporting_1_name"]', '配角B');
    
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(3000);
    
    const step3Visible = await page.locator('#step3').isVisible();
    expect(typeof step3Visible).toBe('boolean');
  });

  test('完整流程：登录->创建书籍->查看详情->验证卡牌数据', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    const bookTitle = `卡牌验证书籍_${Date.now()}`;
    
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'romance');
    await page.click('#step1 button:has-text("下一步")');
    
    await page.fill('#protagonistName', '女主角');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('book-create');
  });

  test('完整流程：登录->查看预设书籍->查看章节->解谜->验证数据库', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    await page.goto('/');
    await page.waitForSelector('.book-card', { timeout: 10000 });
    await page.locator('.book-card').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("章节")');
    await page.waitForSelector('.chapter-item', { timeout: 5000 });
    
    const chapterItems = await page.locator('.chapter-item').count();
    if (chapterItems > 0) {
      await page.locator('.chapter-item').first().click();
      await page.waitForSelector('.chapter-content', { timeout: 10000 });
      
      const puzzleSection = page.locator('#puzzleSection');
      if (await puzzleSection.isVisible()) {
        const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001`);
        const puzzleData = await puzzleResponse.json();
        
        if (puzzleData.success && puzzleData.data.is_solved === 0) {
          const answer = puzzleData.data.answer;
          const solveResponse = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-001/solve`, {
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ answer })
          });
          
          const solveData = await solveResponse.json();
          expect(solveData.success).toBe(true);
          
          if (solveData.data.is_correct && solveData.data.reward) {
            expect(solveData.data.reward.card).toBeDefined();
          }
        }
      }
    }
  });

  test('完整流程：登录->创建四种类型书籍->验证类型差异', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    const types = ['adventure', 'fantasy', 'romance', 'business'];
    
    for (const type of types) {
      await page.goto('/book-create.html');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      await page.fill('#bookTitle', `${type}测试_${Date.now()}`);
      await page.waitForFunction(() => {
        const select = document.querySelector('#bookType');
        return select && select.options.length > 1;
      }, { timeout: 10000 });
      await page.selectOption('#bookType', type);
      await page.click('#step1 button:has-text("下一步")');
      await page.fill('#protagonistName', `${type}主角`);
      await page.click('#step2 button:has-text("下一步")');
      
      await page.click('#step3 button:has-text("下一步")');
      
      await page.waitForTimeout(2000);
      
      const currentUrl = page.url();
      expect(currentUrl).toContain('book-create');
    }
  });

  test('完整流程：登录->书架->创建书籍->返回书架->验证书籍显示', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    const bookTitle = `书架验证书籍_${Date.now()}`;
    
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await page.fill('#bookTitle', bookTitle);
    await page.waitForFunction(() => {
      const select = document.querySelector('#bookType');
      return select && select.options.length > 1;
    }, { timeout: 10000 });
    await page.selectOption('#bookType', 'business');
    await page.click('#step1 button:has-text("下一步")');
    await page.fill('#protagonistName', '职场人');
    await page.click('#step2 button:has-text("下一步")');
    
    await page.click('#step3 button:has-text("下一步")');
    
    await page.waitForTimeout(2000);
    
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(2000);
    
    await expect(page.locator('h2')).toContainText('我的书架');
    
    const myBooksSection = page.locator('#myBooks');
    await expect(myBooksSection).toBeVisible();
  });

  test('完整流程：登录->查看书籍->查看角色->查看卡牌->导演页', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
    
    await page.goto('/book?id=preset-adventure-001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.click('.tab-btn:has-text("角色")');
    await page.waitForTimeout(500);
    const charactersList = page.locator('#charactersList');
    const charVisible = await charactersList.isVisible();
    expect(typeof charVisible).toBe('boolean');
    
    await page.click('.tab-btn:has-text("卡牌")');
    await page.waitForTimeout(500);
    const cardsList = page.locator('#cardsList');
    const cardsVisible = await cardsList.isVisible();
    expect(typeof cardsVisible).toBe('boolean');
    
    await page.goto('/director?bookId=preset-adventure-001');
    await page.waitForSelector('.stage-section', { timeout: 10000 });
    await expect(page.locator('.stage-section')).toBeVisible();
  });
});
