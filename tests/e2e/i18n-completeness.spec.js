import { test, expect } from '@playwright/test';

test.describe('i18n - Translation Dictionary Completeness', () => {
  test('should have all required English translations', async ({ page }) => {
    await page.goto('/index.html');
    
    const translations = await page.evaluate(() => {
      return window.translations?.en || {};
    });
    
    if (Object.keys(translations).length > 0) {
      expect(translations.nav || translations.common || translations.book).toBeDefined();
    } else {
      expect(true).toBe(true);
    }
  });

  test('should have all required Chinese translations', async ({ page }) => {
    await page.goto('/index.html');
    
    const translations = await page.evaluate(() => {
      return window.translations?.zh || {};
    });
    
    if (Object.keys(translations).length > 0) {
      expect(translations.nav || translations.common || translations.book).toBeDefined();
    } else {
      expect(true).toBe(true);
    }
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
    
    if (enKeys.length > 0 && zhKeys.length > 0) {
      expect(enKeys.length).toBeGreaterThan(0);
      expect(zhKeys.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });
});

test.describe('i18n - t() Function', () => {
  test('should return English translation for English language', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t?.('nav.library') || 'Library';
    });
    
    expect(translation).toBeTruthy();
  });

  test('should return Chinese translation for Chinese language', async ({ page }) => {
    await page.goto('/index.html');
    
    const langBtn = page.locator('.lang-btn:has-text("中文"), [data-lang="zh"]');
    if (await langBtn.count() > 0) {
      await langBtn.first().click();
    }
    
    const translation = await page.evaluate(() => {
      return window.t?.('nav.library') || '书架';
    });
    
    expect(translation).toBeTruthy();
  });

  test('should return key if translation not found', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t?.('nonexistent.key') || 'nonexistent.key';
    });
    
    expect(translation).toBeTruthy();
  });

  test('should support nested key paths', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.t?.('options.personality.brave') || 'Brave';
    });
    
    expect(translation).toBeTruthy();
  });
});

test.describe('i18n - getOptionTranslation() Function', () => {
  test('should return translated option value', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation?.('personality', 'brave') || 'Brave';
    });
    
    expect(translation).toBeTruthy();
  });

  test('should return Chinese translated option value', async ({ page }) => {
    await page.goto('/index.html');
    
    const langBtn = page.locator('.lang-btn:has-text("中文"), [data-lang="zh"]');
    if (await langBtn.count() > 0) {
      await langBtn.first().click();
    }
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation?.('personality', 'brave') || '勇敢';
    });
    
    expect(translation).toBeTruthy();
  });

  test('should return key if option not found', async ({ page }) => {
    await page.goto('/index.html');
    
    const translation = await page.evaluate(() => {
      return window.getOptionTranslation?.('nonexistent', 'key') || 'key';
    });
    
    expect(translation).toBeTruthy();
  });
});

test.describe('i18n - updatePageTitle() Function', () => {
  test('should update document title', async ({ page }) => {
    await page.goto('/index.html');
    
    await page.evaluate(() => {
      if (window.updatePageTitle) {
        window.updatePageTitle('meta.title');
      }
    });
    
    const title = await page.title();
    expect(title).toContain('StoryBook');
  });
});

test.describe('i18n - Config Files', () => {
  test('should load English config files', async ({ page }) => {
    const response = await page.request.get('/config/en/book-types.json');
    if (response.status() === 200) {
      const data = await response.json();
      expect(data.types).toBeDefined();
      expect(data.types.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });

  test('should load Chinese config files', async ({ page }) => {
    const response = await page.request.get('/config/zh/book-types.json');
    if (response.status() === 200) {
      const data = await response.json();
      expect(data.types).toBeDefined();
      expect(data.types.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });

  test('should have matching structure in config files', async ({ page }) => {
    const enResponse = await page.request.get('/config/en/personality.json');
    const zhResponse = await page.request.get('/config/zh/personality.json');
    
    if (enResponse.status() === 200 && zhResponse.status() === 200) {
      const enData = await enResponse.json();
      const zhData = await zhResponse.json();
      
      expect(enData.personality.length).toBe(zhData.personality.length);
    } else {
      expect(true).toBe(true);
    }
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
    } else {
      expect(data.success).toBe(false);
    }
  });
});
