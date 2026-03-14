import { test, expect } from '@playwright/test';

test.describe('i18n - Translation Dictionary Completeness', () => {
  test('should have all required English translations', async ({ page }) => {
    await page.goto('/index.html');
    
    const translations = await page.evaluate(() => {
      return window.translations?.en || {};
    });
    
    expect(translations.nav).toBeDefined();
    expect(translations.common).toBeDefined();
    expect(translations.book).toBeDefined();
    expect(translations.chapter).toBeDefined();
    expect(translations.director).toBeDefined();
    expect(translations.create).toBeDefined();
    expect(translations.messages).toBeDefined();
    expect(translations.errors).toBeDefined();
    expect(translations.options).toBeDefined();
  });

  test('should have all required Chinese translations', async ({ page }) => {
    await page.goto('/index.html');
    
    const translations = await page.evaluate(() => {
      return window.translations?.zh || {};
    });
    
    expect(translations.nav).toBeDefined();
    expect(translations.common).toBeDefined();
    expect(translations.book).toBeDefined();
    expect(translations.chapter).toBeDefined();
    expect(translations.director).toBeDefined();
    expect(translations.create).toBeDefined();
    expect(translations.messages).toBeDefined();
    expect(translations.errors).toBeDefined();
    expect(translations.options).toBeDefined();
  });

  test('should have matching keys in both languages', async ({ page }) => {
    await page.goto('/index.html');
    
    const { enKeys, zhKeys } = await page.evaluate(() => {
      const getKeys = (obj, prefix = '') => {
        let keys = [];
        for (const key in obj) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            keys = keys.concat(getKeys(obj[key], fullKey));
          } else {
            keys.push(fullKey);
          }
        }
        return keys;
      };
      
      return {
        enKeys: getKeys(window.translations?.en || {}),
        zhKeys: getKeys(window.translations?.zh || {})
      };
    });
    
    const missingInZh = enKeys.filter(k => !zhKeys.includes(k));
    const missingInEn = zhKeys.filter(k => !enKeys.includes(k));
    
    expect(missingInZh).toEqual([]);
    expect(missingInEn).toEqual([]);
  });
});

test.describe('i18n - t() Function', () => {
  test('should return English translation for English language', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t('nav.library');
    });
    
    expect(translation).toBe('Library');
  });

  test('should return Chinese translation for Chinese language', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.lang-btn:has-text("中文")').click();
    
    const translation = await page.evaluate(() => {
      return window.t('nav.library');
    });
    
    expect(translation).toBe('书架');
  });

  test('should return key if translation not found', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t('nonexistent.key');
    });
    
    expect(translation).toBe('nonexistent.key');
  });

  test('should support nested key paths', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t('options.personality.brave');
    });
    
    expect(translation).toBe('Brave');
  });
});

test.describe('i18n - getOptionTranslation() Function', () => {
  test('should return translated option value', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation('personality', 'brave');
    });
    
    expect(translation).toBe('Brave');
  });

  test('should return Chinese translated option value', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.lang-btn:has-text("中文")').click();
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation('personality', 'brave');
    });
    
    expect(translation).toBe('勇敢');
  });

  test('should return key if option not found', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation('nonexistent', 'key');
    });
    
    expect(translation).toBe('key');
  });
});

test.describe('i18n - updatePageTitle() Function', () => {
  test('should update document title', async ({ page }) => {
    await page.goto('/index.html');
    
    await page.evaluate(() => {
      window.updatePageTitle('meta.title');
    });
    
    const title = await page.title();
    expect(title).toContain('StoryBook');
  });
});

test.describe('i18n - Config Files', () => {
  test('should load English config files', async ({ page }) => {
    const response = await page.request.get('/config/en/book-types.json');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.types).toBeDefined();
    expect(data.types.length).toBeGreaterThan(0);
  });

  test('should load Chinese config files', async ({ page }) => {
    const response = await page.request.get('/config/zh/book-types.json');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.types).toBeDefined();
    expect(data.types.length).toBeGreaterThan(0);
  });

  test('should have matching structure in config files', async ({ page }) => {
    const enResponse = await page.request.get('/config/en/personality.json');
    const zhResponse = await page.request.get('/config/zh/personality.json');
    
    const enData = await enResponse.json();
    const zhData = await zhResponse.json();
    
    expect(enData.personality.length).toBe(zhData.personality.length);
  });
});

test.describe('i18n - API Message Codes', () => {
  test('should return message codes instead of Chinese text', async ({ page, request }) => {
    const response = await request.post('/api/books', {
      data: {}
    });
    
    const data = await response.json();
    
    if (!data.success && data.error) {
      expect(data.error).toMatch(/^[A-Z_]+$/);
    }
  });
});
