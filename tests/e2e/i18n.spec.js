import { test, expect } from '@playwright/test';

test.describe('i18n - Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
  });

  test('should display language switcher in navbar', async ({ page }) => {
    const langSwitcher = page.locator('.navbar-language');
    await expect(langSwitcher).toBeVisible({ timeout: 10000 });
    
    const enBtn = page.locator('.lang-btn:has-text("EN")');
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    
    await expect(enBtn).toBeVisible();
    await expect(zhBtn).toBeVisible();
  });

  test('should switch to Chinese when clicking 中文 button', async ({ page }) => {
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    await zhBtn.click();
    
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
    
    const activeBtn = page.locator('.lang-btn.active');
    await expect(activeBtn).toContainText('中文');
  });

  test('should switch to English when clicking EN button', async ({ page }) => {
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    await zhBtn.click();
    await page.waitForTimeout(500);
    
    const enBtn = page.locator('.lang-btn:has-text("EN")');
    await enBtn.click();
    
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    const activeBtn = page.locator('.lang-btn.active');
    await expect(activeBtn).toContainText('EN');
  });

  test('should persist language preference in localStorage', async ({ page }) => {
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    await zhBtn.click();
    await page.waitForTimeout(500);
    
    const lang = await page.evaluate(() => localStorage.getItem('storybook-language'));
    expect(lang).toBe('zh');
  });

  test('should translate nav links', async ({ page }) => {
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    await zhBtn.click();
    await page.waitForTimeout(500);
    
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('zh');
  });
});

test.describe('i18n - SEO Tags', () => {
  test('should have meta description', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('should have hreflang tags', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const hreflangEn = page.locator('link[hreflang="en"]');
    const hreflangZh = page.locator('link[hreflang="zh"]');
    
    await expect(hreflangEn).toHaveCount(1);
    await expect(hreflangZh).toHaveCount(1);
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDesc = page.locator('meta[property="og:description"]');
    
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    await expect(ogDesc).toHaveAttribute('content', /.+/);
  });
});

test.describe('i18n - Value Attributes Migration', () => {
  test('should use English keys for personality values', async ({ page }) => {
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    
    const personalitySelect = page.locator('#protagonistPersonality');
    const options = await personalitySelect.locator('option[value!=""]').all();
    
    for (const option of options) {
      const value = await option.getAttribute('value');
      expect(value).toMatch(/^[a-z_]+$/);
    }
  });

  test('should use English keys for speech style values', async ({ page }) => {
    await page.goto('/book-create.html');
    await page.waitForLoadState('networkidle');
    
    const speechSelect = page.locator('#protagonistSpeechStyle');
    const options = await speechSelect.locator('option[value!=""]').all();
    
    for (const option of options) {
      const value = await option.getAttribute('value');
      expect(value).toMatch(/^[a-z_]+$/);
    }
  });
});

test.describe('i18n - Translation Function', () => {
  test('should have translations object', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const hasTranslations = await page.evaluate(() => {
      return typeof window.translations !== 'undefined';
    });
    
    expect(hasTranslations).toBe(true);
  });

  test('should have t() function', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const hasTFunction = await page.evaluate(() => {
      return typeof window.t === 'function';
    });
    
    expect(hasTFunction).toBe(true);
  });

  test('should have getOptionTranslation() function', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
    
    const hasFunction = await page.evaluate(() => {
      return typeof window.getOptionTranslation === 'function';
    });
    
    expect(hasFunction).toBe(true);
  });
});

test.describe('i18n - API Language Support', () => {
  test('should return English book types when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/config/book-types?lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.types).toBeDefined();
    expect(data.data.types.length).toBeGreaterThan(0);
    
    const firstType = data.data.types[0];
    expect(firstType.name).toBe("Children's Adventure");
  });

  test('should return Chinese book types when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/config/book-types?lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.types).toBeDefined();
    expect(data.data.types.length).toBeGreaterThan(0);
    
    const firstType = data.data.types[0];
    expect(firstType.name).toBe('儿童冒险');
  });

  test('should return English personality options when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/config/personality?lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.personality).toBeDefined();
    expect(data.data.personality.length).toBeGreaterThan(0);
    expect(data.data.personality).toContain('Brave');
    expect(data.data.personality).not.toContain('勇敢');
  });

  test('should return Chinese personality options when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/config/personality?lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.personality).toBeDefined();
    expect(data.data.personality.length).toBeGreaterThan(0);
    expect(data.data.personality).toContain('勇敢');
    expect(data.data.personality).not.toContain('Brave');
  });

  test('should return English speech styles when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/config/speech-style?lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.speech_styles).toBeDefined();
    expect(data.data.speech_styles).toContain('Formal');
    expect(data.data.speech_styles).not.toContain('正式');
  });

  test('should return Chinese speech styles when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/config/speech-style?lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.speech_styles).toBeDefined();
    expect(data.data.speech_styles).toContain('正式');
    expect(data.data.speech_styles).not.toContain('Formal');
  });

  test('should return English character types when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=adventure&lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.character_types).toBeDefined();
    expect(data.data.character_types).toContain('Explorer');
    expect(data.data.character_types).not.toContain('探险家');
  });

  test('should return Chinese character types when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=adventure&lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.character_types).toBeDefined();
    expect(data.data.character_types).toContain('探险家');
    expect(data.data.character_types).not.toContain('Explorer');
  });

  test('should return English plot options when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=adventure&sub_type=weather&lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.options).toBeDefined();
    expect(data.data.options).toContain('Sunny');
    expect(data.data.options).not.toContain('晴天');
  });

  test('should return Chinese plot options when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=adventure&sub_type=weather&lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.options).toBeDefined();
    expect(data.data.options).toContain('晴天');
    expect(data.data.options).not.toContain('Sunny');
  });

  test('should default to English when no lang parameter', async ({ page }) => {
    const response = await page.request.get('/api/config/book-types');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    
    const firstType = data.data.types[0];
    expect(firstType.name).toBe("Children's Adventure");
  });
});

test.describe('i18n - Preset Books Language Filtering', () => {
  test('should return only English preset books when lang=en', async ({ page }) => {
    const response = await page.request.get('/api/books/preset?lang=en');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    
    for (const book of data.data) {
      expect(book.language).toBe('en');
      expect(book.book_id).toMatch(/-en$/);
    }
  });

  test('should return only Chinese preset books when lang=zh', async ({ page }) => {
    const response = await page.request.get('/api/books/preset?lang=zh');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    
    for (const book of data.data) {
      expect(book.language).toBe('zh');
      expect(book.book_id).not.toMatch(/-en$/);
    }
  });

  test('should return correct number of preset books per language', async ({ page }) => {
    const enResponse = await page.request.get('/api/books/preset?lang=en');
    const zhResponse = await page.request.get('/api/books/preset?lang=zh');
    
    const enData = await enResponse.json();
    const zhData = await zhResponse.json();
    
    expect(enData.data.length).toBe(8);
    expect(zhData.data.length).toBe(8);
  });
});

test.describe('i18n - All Book Types', () => {
  test('should return correct English names for all book types', async ({ page }) => {
    const response = await page.request.get('/api/config/book-types?lang=en');
    const data = await response.json();
    
    const typeNames = data.data.types.map(t => t.name);
    expect(typeNames).toContain("Children's Adventure");
    expect(typeNames).toContain('Fantasy Legend');
    expect(typeNames).toContain('Urban Romance');
    expect(typeNames).toContain('Corporate Drama');
  });

  test('should return correct Chinese names for all book types', async ({ page }) => {
    const response = await page.request.get('/api/config/book-types?lang=zh');
    const data = await response.json();
    
    const typeNames = data.data.types.map(t => t.name);
    expect(typeNames).toContain('儿童冒险');
    expect(typeNames).toContain('魔幻传说');
    expect(typeNames).toContain('都市言情');
    expect(typeNames).toContain('职场风云');
  });
});

test.describe('i18n - Plot Options by Book Type', () => {
  test('should return English fantasy plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=fantasy&lang=en');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('Magic Storm');
    expect(data.data.plot_options.terrain).toContain('Magic Forest');
    expect(data.data.plot_options.adventure).toContain('Magic Trial');
    expect(data.data.plot_options.equipment).toContain('Magic Wand');
  });

  test('should return Chinese fantasy plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=fantasy&lang=zh');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('魔法风暴');
    expect(data.data.plot_options.terrain).toContain('魔法森林');
    expect(data.data.plot_options.adventure).toContain('魔法试炼');
    expect(data.data.plot_options.equipment).toContain('魔法杖');
  });

  test('should return English romance plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=romance&lang=en');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('Bright Sunshine');
    expect(data.data.plot_options.terrain).toContain('Cafe');
    expect(data.data.plot_options.adventure).toContain('Chance Meeting');
    expect(data.data.plot_options.equipment).toContain('Flowers');
  });

  test('should return Chinese romance plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=romance&lang=zh');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('阳光明媚');
    expect(data.data.plot_options.terrain).toContain('咖啡馆');
    expect(data.data.plot_options.adventure).toContain('偶遇');
    expect(data.data.plot_options.equipment).toContain('鲜花');
  });

  test('should return English business plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=business&lang=en');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('Market Boom');
    expect(data.data.plot_options.terrain).toContain('Office');
    expect(data.data.plot_options.adventure).toContain('Project Launch');
    expect(data.data.plot_options.equipment).toContain('Laptop');
  });

  test('should return Chinese business plot options', async ({ page }) => {
    const response = await page.request.get('/api/config/plot-options?book_type=business&lang=zh');
    const data = await response.json();
    
    expect(data.data.plot_options.weather).toContain('市场繁荣');
    expect(data.data.plot_options.terrain).toContain('办公室');
    expect(data.data.plot_options.adventure).toContain('项目启动');
    expect(data.data.plot_options.equipment).toContain('笔记本电脑');
  });
});

test.describe('i18n - Character Types by Book Type', () => {
  test('should return English fantasy character types', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=fantasy&lang=en');
    const data = await response.json();
    
    expect(data.data.character_types).toContain('Wizard');
    expect(data.data.character_types).toContain('Knight');
    expect(data.data.character_types).toContain('Elf');
    expect(data.data.character_types).toContain('Dragon Rider');
  });

  test('should return Chinese fantasy character types', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=fantasy&lang=zh');
    const data = await response.json();
    
    expect(data.data.character_types).toContain('魔法师');
    expect(data.data.character_types).toContain('骑士');
    expect(data.data.character_types).toContain('精灵');
    expect(data.data.character_types).toContain('龙骑士');
  });

  test('should return English romance character types', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=romance&lang=en');
    const data = await response.json();
    
    expect(data.data.character_types).toContain('Entrepreneur');
    expect(data.data.character_types).toContain('Doctor');
    expect(data.data.character_types).toContain('Artist');
  });

  test('should return Chinese romance character types', async ({ page }) => {
    const response = await page.request.get('/api/config/character-types?book_type=romance&lang=zh');
    const data = await response.json();
    
    expect(data.data.character_types).toContain('企业家');
    expect(data.data.character_types).toContain('医生');
    expect(data.data.character_types).toContain('艺术家');
  });
});

test.describe('i18n - Data Consistency', () => {
  test('should have same number of personality options in both languages', async ({ page }) => {
    const enResponse = await page.request.get('/api/config/personality?lang=en');
    const zhResponse = await page.request.get('/api/config/personality?lang=zh');
    
    const enData = await enResponse.json();
    const zhData = await zhResponse.json();
    
    expect(enData.data.personality.length).toBe(zhData.data.personality.length);
  });

  test('should have same number of speech styles in both languages', async ({ page }) => {
    const enResponse = await page.request.get('/api/config/speech-style?lang=en');
    const zhResponse = await page.request.get('/api/config/speech-style?lang=zh');
    
    const enData = await enResponse.json();
    const zhData = await zhResponse.json();
    
    expect(enData.data.speech_styles.length).toBe(zhData.data.speech_styles.length);
  });

  test('should have same number of character types per book type in both languages', async ({ page }) => {
    const bookTypes = ['adventure', 'fantasy', 'romance', 'business'];
    
    for (const bookType of bookTypes) {
      const enResponse = await page.request.get(`/api/config/character-types?book_type=${bookType}&lang=en`);
      const zhResponse = await page.request.get(`/api/config/character-types?book_type=${bookType}&lang=zh`);
      
      const enData = await enResponse.json();
      const zhData = await zhResponse.json();
      
      expect(enData.data.character_types.length).toBe(zhData.data.character_types.length);
    }
  });

  test('should have same number of plot options per category in both languages', async ({ page }) => {
    const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
    
    for (const subType of subTypes) {
      const enResponse = await page.request.get(`/api/config/plot-options?book_type=adventure&sub_type=${subType}&lang=en`);
      const zhResponse = await page.request.get(`/api/config/plot-options?book_type=adventure&sub_type=${subType}&lang=zh`);
      
      const enData = await enResponse.json();
      const zhData = await zhResponse.json();
      
      expect(enData.data.options.length).toBe(zhData.data.options.length);
    }
  });
});
