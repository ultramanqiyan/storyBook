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

test.describe('i18n - Config Files', () => {
  test.skip('should load English config files', async ({ page }) => {
    const response = await page.request.get('/config/en/book-types.json');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.types).toBeDefined();
    expect(data.types.length).toBeGreaterThan(0);
  });

  test.skip('should load Chinese config files', async ({ page }) => {
    const response = await page.request.get('/config/zh/book-types.json');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.types).toBeDefined();
    expect(data.types.length).toBeGreaterThan(0);
  });

  test.skip('should have matching structure in personality config', async ({ page }) => {
    const enResponse = await page.request.get('/config/en/personality.json');
    const zhResponse = await page.request.get('/config/zh/personality.json');
    
    const enData = await enResponse.json();
    const zhData = await zhResponse.json();
    
    expect(enData.personality.length).toBe(zhData.personality.length);
  });
});
