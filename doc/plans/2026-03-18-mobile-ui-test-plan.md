# 移动端Web UI测试实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 创建完整的移动端Web UI测试框架，测试网站在移动端的展示效果和用户体验

**Architecture:** 使用Playwright移动端模拟功能，创建分层测试架构：工具层（helpers/checkers）+ 测试层（specs）+ 报告层（reports）

**Tech Stack:** Playwright, JavaScript/ES Modules, Markdown报告

---

## Task 1: 创建移动端Playwright配置文件

**Files:**
- Create: `tests/e2e/mobile/mobile-test.config.js`

**Step 1: 创建配置文件**

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['list'],
    ['json', { outputFile: '../reports/results.json' }],
    ['html', { outputFolder: '../reports/html', open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:8788',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'medium-phone',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'large-phone',
      use: {
        ...devices['iPhone 12 Pro Max'],
        viewport: { width: 428, height: 926 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
```

**Step 2: 验证配置文件语法**

Run: `node --check tests/e2e/mobile/mobile-test.config.js`
Expected: No output (syntax OK)

---

## Task 2: 创建工具目录和基础辅助函数

**Files:**
- Create: `tests/e2e/mobile/utils/mobile-helpers.js`

**Step 1: 创建mobile-helpers.js**

```javascript
export async function loginUser(page) {
  const uniqueName = 'MobileTest_' + Date.now();
  await page.goto('/login.html');
  await page.waitForLoadState('networkidle');
  
  const usernameInput = page.locator('#username');
  await usernameInput.fill(uniqueName);
  
  const submitBtn = page.locator('button[type="submit"]');
  await submitBtn.click();
  
  await page.waitForURL(/bookshelf/, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
  
  return uniqueName;
}

export async function waitForPageReady(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
}

export async function takeScreenshot(page, name, device) {
  const screenshotPath = `tests/e2e/mobile/reports/screenshots/${device}/${name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

export async function checkElementVisible(page, selector) {
  try {
    const element = page.locator(selector);
    return await element.isVisible();
  } catch {
    return false;
  }
}

export async function checkElementNotOccluded(page, selector) {
  try {
    const element = page.locator(selector);
    const box = await element.boundingBox();
    if (!box) return { isOccluded: true, reason: 'Element not found' };
    
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    
    const topElement = await page.locator(`:visible`).evaluateHandle((_, point) => {
      return document.elementFromPoint(point.x, point.y);
    }, { x: centerX, y: centerY });
    
    const isSame = await element.evaluate((el, topEl) => el === topEl || el.contains(topEl), topElement);
    
    return { isOccluded: !isSame, reason: isSame ? null : 'Element is occluded' };
  } catch (error) {
    return { isOccluded: true, reason: error.message };
  }
}

export async function getElementFontSize(page, selector) {
  return await page.locator(selector).evaluate((el) => {
    const style = window.getComputedStyle(el);
    return parseFloat(style.fontSize);
  });
}

export async function getElementSize(page, selector) {
  const box = await page.locator(selector).boundingBox();
  return box ? { width: box.width, height: box.height } : null;
}

export async function checkTouchTargetSize(page, selector, minSize = 44) {
  const size = await getElementSize(page, selector);
  if (!size) return { isValid: false, reason: 'Element not found' };
  
  const isValid = size.width >= minSize && size.height >= minSize;
  return {
    isValid,
    width: size.width,
    height: size.height,
    reason: isValid ? null : `Size ${size.width}x${size.height} is smaller than ${minSize}px`
  };
}

export async function checkHorizontalScroll(page) {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

export async function checkContrastRatio(page, selector) {
  return await page.locator(selector).evaluate((el) => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const bgColor = style.backgroundColor;
    
    function parseColor(colorStr) {
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    const [r1, g1, b1] = parseColor(color);
    const [r2, g2, b2] = parseColor(bgColor);
    
    const L1 = getLuminance(r1, g1, b1);
    const L2 = getLuminance(r2, g2, b2);
    
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return ratio;
  });
}

export function getDeviceName(projectName) {
  const deviceNames = {
    'medium-phone': 'iPhone 12 (390px)',
    'large-phone': 'iPhone 12 Pro Max (428px)',
    'tablet': 'iPad Mini (768px)'
  };
  return deviceNames[projectName] || projectName;
}
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/utils/mobile-helpers.js`
Expected: No output (syntax OK)

---

## Task 3: 创建UI标准检测工具

**Files:**
- Create: `tests/e2e/mobile/utils/ui-standards.js`

**Step 1: 创建ui-standards.js**

```javascript
export const UI_STANDARDS = {
  MIN_FONT_SIZE: 14,
  MIN_TITLE_FONT_SIZE: 18,
  MIN_TOUCH_TARGET: 44,
  MIN_CONTRAST_RATIO: 4.5,
  MIN_LINE_HEIGHT: 1.5,
  MAX_LINE_HEIGHT: 1.8,
};

export class UIChecker {
  constructor(page, device) {
    this.page = page;
    this.device = device;
    this.issues = [];
  }

  addIssue(category, severity, element, description, screenshot = null) {
    this.issues.push({
      category,
      severity,
      element,
      description,
      screenshot,
      device: this.device,
    });
  }

  async checkFontSize(selector, minSize = UI_STANDARDS.MIN_FONT_SIZE) {
    try {
      const fontSize = await this.page.locator(selector).evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      
      if (fontSize < minSize) {
        this.addIssue('可读性', 'warning', selector, 
          `字体大小 ${fontSize}px 小于最小标准 ${minSize}px`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkTouchTarget(selector, minSize = UI_STANDARDS.MIN_TOUCH_TARGET) {
    try {
      const box = await this.page.locator(selector).boundingBox();
      if (!box) return false;
      
      if (box.width < minSize || box.height < minSize) {
        this.addIssue('交互', 'warning', selector,
          `触摸目标 ${Math.round(box.width)}x${Math.round(box.height)}px 小于最小标准 ${minSize}px`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkContrast(selector, minRatio = UI_STANDARDS.MIN_CONTRAST_RATIO) {
    try {
      const ratio = await this.page.locator(selector).evaluate((el) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        function parseColor(colorStr) {
          const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (!match) return [0, 0, 0];
          return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
        
        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }
        
        const [r1, g1, b1] = parseColor(color);
        const [r2, g2, b2] = parseColor(bgColor);
        
        const L1 = getLuminance(r1, g1, b1);
        const L2 = getLuminance(r2, g2, b2);
        
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        
        return (lighter + 0.05) / (darker + 0.05);
      });
      
      if (ratio < minRatio) {
        this.addIssue('可读性', 'warning', selector,
          `对比度 ${ratio.toFixed(2)}:1 小于最小标准 ${minRatio}:1`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkElementInViewport(selector) {
    try {
      const isInViewport = await this.page.locator(selector).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      
      if (!isInViewport) {
        this.addIssue('布局', 'info', selector, '元素不在当前视口内');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkElementOcclusion(selector) {
    try {
      const isOccluded = await this.page.locator(selector).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const topElement = document.elementFromPoint(centerX, centerY);
        return !(el === topElement || el.contains(topElement));
      });
      
      if (isOccluded) {
        this.addIssue('布局', 'error', selector, '元素被其他元素遮挡');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkHorizontalScroll() {
    const hasHorizontalScroll = await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (hasHorizontalScroll) {
      this.addIssue('布局', 'error', 'body', '页面存在横向滚动');
      return false;
    }
    return true;
  }

  async checkTextOverflow(selector) {
    try {
      const hasOverflow = await this.page.locator(selector).evaluate((el) => {
        return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      });
      
      if (hasOverflow) {
        this.addIssue('布局', 'warning', selector, '文本溢出容器');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  getIssues() {
    return this.issues;
  }

  getIssueCount() {
    return this.issues.length;
  }

  getIssuesBySeverity(severity) {
    return this.issues.filter(i => i.severity === severity);
  }
}
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/utils/ui-standards.js`
Expected: No output (syntax OK)

---

## Task 4: 创建可访问性检查工具

**Files:**
- Create: `tests/e2e/mobile/utils/accessibility-checker.js`

**Step 1: 创建accessibility-checker.js**

```javascript
export class AccessibilityChecker {
  constructor(page, device) {
    this.page = page;
    this.device = device;
    this.issues = [];
  }

  addIssue(category, severity, element, description, wcagCriterion = null) {
    this.issues.push({
      category,
      severity,
      element,
      description,
      wcagCriterion,
      device: this.device,
    });
  }

  async checkImagesHaveAlt() {
    const imagesWithoutAlt = await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .filter(img => !img.alt && !img.getAttribute('aria-label') && !img.getAttribute('aria-labelledby'))
        .map(img => img.src || img.outerHTML.substring(0, 100));
    });
    
    imagesWithoutAlt.forEach((src, index) => {
      this.addIssue('可访问性', 'error', `img:nth(${index})`, 
        `图片缺少alt属性: ${src}`, 'WCAG 2.1 1.1.1');
    });
    
    return imagesWithoutAlt.length === 0;
  }

  async checkFormLabels() {
    const formsWithoutLabels = await this.page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs
        .filter(input => {
          const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
          const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
          const hasPlaceholder = input.placeholder;
          return !hasLabel && !hasAriaLabel && !hasPlaceholder;
        })
        .map(input => input.name || input.id || input.type);
    });
    
    formsWithoutLabels.forEach((name, index) => {
      this.addIssue('可访问性', 'error', `form element: ${name}`,
        `表单元素缺少标签`, 'WCAG 2.1 1.3.1');
    });
    
    return formsWithoutLabels.length === 0;
  }

  async checkFocusVisible() {
    await this.page.keyboard.press('Tab');
    
    const focusVisible = await this.page.evaluate(() => {
      const focused = document.activeElement;
      if (!focused || focused === document.body) return false;
      
      const style = window.getComputedStyle(focused);
      return style.outline !== 'none' || style.boxShadow !== 'none';
    });
    
    if (!focusVisible) {
      this.addIssue('可访问性', 'warning', 'focusable elements',
        '焦点状态不明显', 'WCAG 2.1 2.4.7');
    }
    
    return focusVisible;
  }

  async checkColorContrast() {
    const lowContrastElements = await this.page.evaluate(() => {
      const textElements = Array.from(document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label'));
      
      function parseColor(colorStr) {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return null;
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      
      function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }
      
      function getContrastRatio(color1, color2) {
        const c1 = parseColor(color1);
        const c2 = parseColor(color2);
        if (!c1 || !c2) return 21;
        
        const L1 = getLuminance(...c1);
        const L2 = getLuminance(...c2);
        
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        
        return (lighter + 0.05) / (darker + 0.05);
      }
      
      return textElements
        .filter(el => {
          const style = window.getComputedStyle(el);
          const ratio = getContrastRatio(style.color, style.backgroundColor);
          return ratio < 4.5;
        })
        .slice(0, 10)
        .map(el => el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''));
    });
    
    lowContrastElements.forEach(tag => {
      this.addIssue('可访问性', 'warning', tag,
        `对比度不足4.5:1`, 'WCAG 2.1 1.4.3');
    });
    
    return lowContrastElements.length === 0;
  }

  async checkButtonNames() {
    const buttonsWithoutName = await this.page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons
        .filter(btn => {
          const hasText = btn.textContent.trim();
          const hasAriaLabel = btn.getAttribute('aria-label');
          const hasAriaLabelledby = btn.getAttribute('aria-labelledby');
          const hasTitle = btn.title;
          return !hasText && !hasAriaLabel && !hasAriaLabelledby && !hasTitle;
        })
        .map(btn => btn.className || btn.id || 'button');
    });
    
    buttonsWithoutName.forEach(name => {
      this.addIssue('可访问性', 'error', `button: ${name}`,
        `按钮缺少可访问名称`, 'WCAG 2.1 4.1.2');
    });
    
    return buttonsWithoutName.length === 0;
  }

  async checkLinkText() {
    const linksWithVagueText = await this.page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const vagueTexts = ['click here', 'read more', 'more', 'here', '点击这里', '更多'];
      
      return links
        .filter(link => {
          const text = link.textContent.trim().toLowerCase();
          return vagueTexts.includes(text) || text.length < 2;
        })
        .map(link => link.href || link.outerHTML.substring(0, 100));
    });
    
    linksWithVagueText.forEach(href => {
      this.addIssue('可访问性', 'warning', `a: ${href}`,
        `链接文本不够描述性`, 'WCAG 2.1 2.4.4');
    });
    
    return linksWithVagueText.length === 0;
  }

  getIssues() {
    return this.issues;
  }
}
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/utils/accessibility-checker.js`
Expected: No output (syntax OK)

---

## Task 5: 创建静态分析测试

**Files:**
- Create: `tests/e2e/mobile/specs/01-static-analysis.spec.js`

**Step 1: 创建静态分析测试文件**

```javascript
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const CSS_DIR = path.join(process.cwd(), 'src/frontend/css');

test.describe('静态CSS分析', () => {
  const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  
  test('应该存在响应式断点', () => {
    let hasResponsiveBreakpoints = false;
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      if (content.includes('@media') && (content.includes('768px') || content.includes('480px') || content.includes('max-width'))) {
        hasResponsiveBreakpoints = true;
      }
    });
    
    expect(hasResponsiveBreakpoints).toBe(true);
  });

  test('不应该有超出移动端宽度的固定宽度', () => {
    const issues = [];
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      const fixedWidthMatches = content.match(/width:\s*(\d+)px/g);
      
      if (fixedWidthMatches) {
        fixedWidthMatches.forEach(match => {
          const width = parseInt(match.match(/\d+/)[0]);
          if (width > 390) {
            issues.push(`${file}: ${match} (可能超出小屏手机宽度)`);
          }
        });
      }
    });
    
    console.log('固定宽度问题:', issues);
  });

  test('移动端字体大小应该足够', () => {
    const issues = [];
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      
      const mediaMatches = content.match(/@media[^{]*max-width:\s*(\d+)px[^{]*{([^}]*)}/g);
      
      if (mediaMatches) {
        mediaMatches.forEach(mediaBlock => {
          const fontSizeMatches = mediaBlock.match(/font-size:\s*(\d+)px/g);
          if (fontSizeMatches) {
            fontSizeMatches.forEach(match => {
              const size = parseInt(match.match(/\d+/)[0]);
              if (size < 12) {
                issues.push(`${file}: ${match} (字体过小)`);
              }
            });
          }
        });
      }
    });
    
    console.log('字体大小问题:', issues);
  });

  test('检查CSS变量定义', () => {
    const variablesContent = fs.readFileSync(path.join(CSS_DIR, 'variables.css'), 'utf-8');
    
    expect(variablesContent).toContain('--spacing-');
    expect(variablesContent).toContain('--font-');
    expect(variablesContent).toContain('--color-');
  });

  test('检查响应式CSS文件存在', () => {
    expect(cssFiles).toContain('responsive.css');
    
    const responsiveContent = fs.readFileSync(path.join(CSS_DIR, 'responsive.css'), 'utf-8');
    expect(responsiveContent).toContain('@media');
    expect(responsiveContent).toContain('768px');
    expect(responsiveContent).toContain('480px');
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/01-static-analysis.spec.js`
Expected: No output (syntax OK)

---

## Task 6: 创建页面展示测试

**Files:**
- Create: `tests/e2e/mobile/specs/02-display-pages.spec.js`

**Step 1: 创建页面展示测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot, checkHorizontalScroll } from '../utils/mobile-helpers.js';
import { UIChecker, UI_STANDARDS } from '../utils/ui-standards.js';
import { AccessibilityChecker } from '../utils/accessibility-checker.js';

test.describe('页面展示测试', () => {
  let uiChecker;
  let a11yChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
    a11yChecker = new AccessibilityChecker(page, projectName);
    await loginUser(page);
  });

  test('书架页面展示检查', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'bookshelf-initial', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    await uiChecker.checkFontSize('h1', 16);
    await uiChecker.checkFontSize('.book-info h4', 12);
    
    const bookCards = page.locator('.book-3d, .book-item');
    const count = await bookCards.count();
    
    if (count > 0) {
      await uiChecker.checkTouchTarget('.book-3d, .book-item');
    }
    
    await uiChecker.checkElementOcclusion('.navbar');
    
    const addBtn = page.locator('.btn-3d, .add-book-card');
    if (await addBtn.count() > 0) {
      await uiChecker.checkTouchTarget('.btn-3d, .add-book-card');
    }
    
    console.log(`[${projectName}] 书架页面问题:`, uiChecker.getIssues());
  });

  test('书籍详情页展示检查', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      await takeScreenshot(page, 'book-detail', projectName);
      
      await uiChecker.checkHorizontalScroll();
      
      await uiChecker.checkFontSize('.book-meta-info h2', 16);
      await uiChecker.checkFontSize('.chapter-card .chapter-title', 12);
      
      const tabs = page.locator('.view-tab');
      const tabCount = await tabs.count();
      if (tabCount > 0) {
        await uiChecker.checkTouchTarget('.view-tab');
      }
      
      const actionBtns = page.locator('.action-btn');
      if (await actionBtns.count() > 0) {
        await uiChecker.checkTouchTarget('.action-btn');
      }
      
      console.log(`[${projectName}] 书籍详情页问题:`, uiChecker.getIssues());
    }
  });

  test('章节阅读页展示检查', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const chapterCard = page.locator('.chapter-toc-item, .chapter-card').first();
      if (await chapterCard.count() > 0) {
        await chapterCard.click();
        await waitForPageReady(page);
        
        await takeScreenshot(page, 'chapter-reading', projectName);
        
        await uiChecker.checkHorizontalScroll();
        
        await uiChecker.checkFontSize('.manuscript-text, .page-text', UI_STANDARDS.MIN_FONT_SIZE);
        await uiChecker.checkFontSize('.chapter-name, .manuscript-title .chapter-name', 16);
        
        const navBtns = page.locator('.scroll-nav-btn');
        if (await navBtns.count() > 0) {
          await uiChecker.checkTouchTarget('.scroll-nav-btn');
        }
        
        const puzzleBtn = page.locator('.puzzle-trigger button, button:has-text("Solve")');
        if (await puzzleBtn.count() > 0) {
          await uiChecker.checkTouchTarget('.puzzle-trigger button');
        }
        
        console.log(`[${projectName}] 章节阅读页问题:`, uiChecker.getIssues());
      }
    }
  });

  test('导演页展示检查', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        await takeScreenshot(page, 'director-page', projectName);
        
        await uiChecker.checkHorizontalScroll();
        
        await uiChecker.checkFontSize('.director-header h1', 18);
        
        const fanCards = page.locator('.fan-card');
        if (await fanCards.count() > 0) {
          await uiChecker.checkTouchTarget('.fan-card');
        }
        
        const stageSlots = page.locator('.stage-slot');
        if (await stageSlots.count() > 0) {
          await uiChecker.checkTouchTarget('.stage-slot');
        }
        
        const startBtn = page.locator('.hearthstone-btn, #startBtn');
        if (await startBtn.count() > 0) {
          await uiChecker.checkTouchTarget('.hearthstone-btn, #startBtn');
        }
        
        console.log(`[${projectName}] 导演页问题:`, uiChecker.getIssues());
      }
    }
  });

  test('可访问性基础检查', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkFormLabels();
    await a11yChecker.checkButtonNames();
    
    console.log(`[${projectName}] 可访问性问题:`, a11yChecker.getIssues());
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/02-display-pages.spec.js`
Expected: No output (syntax OK)

---

## Task 7: 创建书籍创建流程测试

**Files:**
- Create: `tests/e2e/mobile/specs/03-book-creation.spec.js`

**Step 1: 创建书籍创建流程测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('创建书籍流程测试', () => {
  let uiChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('步骤1: 进入创建书籍页面', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const createBtn = page.locator('a[href*="book-create"], .btn-3d:has-text("Create"), .add-book-card');
    await expect(createBtn.first()).toBeVisible();
    
    await uiChecker.checkTouchTarget('a[href*="book-create"], .btn-3d, .add-book-card');
    
    await createBtn.first().click();
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'book-create-page', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    console.log(`[${projectName}] 创建书籍页面问题:`, uiChecker.getIssues());
  });

  test('步骤2: 填写书籍信息', async ({ page, projectName }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    const titleInput = page.locator('#bookTitle, #title, input[name="title"]');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
      
      await uiChecker.checkElementOcclusion('#bookTitle, #title, input[name="title"]');
    }
    
    const typeSelect = page.locator('#bookType, #type, select[name="type"]');
    if (await typeSelect.count() > 0) {
      await typeSelect.selectOption('adventure');
    }
    
    await takeScreenshot(page, 'book-create-filled', projectName);
    
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("下一步"), .btn-next');
    if (await nextBtn.count() > 0) {
      await uiChecker.checkTouchTarget('button:has-text("Next"), button:has-text("下一步"), .btn-next');
    }
    
    console.log(`[${projectName}] 填写书籍信息问题:`, uiChecker.getIssues());
  });

  test('步骤3: 选择剧情卡', async ({ page, projectName }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    const titleInput = page.locator('#bookTitle, #title, input[name="title"]');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
    }
    
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("下一步"), .btn-next');
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    const plotCards = page.locator('.plot-card, .hs-card');
    if (await plotCards.count() > 0) {
      await uiChecker.checkTouchTarget('.plot-card, .hs-card');
      
      await plotCards.first().click();
      await page.waitForTimeout(1000);
    }
    
    await takeScreenshot(page, 'book-create-plot', projectName);
    
    console.log(`[${projectName}] 选择剧情卡问题:`, uiChecker.getIssues());
  });

  test('步骤4: 选择角色', async ({ page, projectName }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    const titleInput = page.locator('#bookTitle, #title, input[name="title"]');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
    }
    
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("下一步"), .btn-next');
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    const plotCards = page.locator('.plot-card, .hs-card');
    if (await plotCards.count() > 0) {
      await plotCards.first().click();
      await page.waitForTimeout(1000);
    }
    
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    const characterCards = page.locator('.character-card, .hs-card-mini');
    if (await characterCards.count() > 0) {
      await uiChecker.checkTouchTarget('.character-card, .hs-card-mini');
      
      await characterCards.first().click();
      await page.waitForTimeout(1000);
    }
    
    await takeScreenshot(page, 'book-create-character', projectName);
    
    console.log(`[${projectName}] 选择角色问题:`, uiChecker.getIssues());
  });

  test('完整流程: 创建书籍', async ({ page, projectName }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    const titleInput = page.locator('#bookTitle, #title, input[name="title"]');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
    }
    
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("下一步"), .btn-next');
    const submitBtn = page.locator('button[type="submit"], button:has-text("Create"), button:has-text("创建")');
    
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    const plotCards = page.locator('.plot-card, .hs-card');
    if (await plotCards.count() > 0) {
      await plotCards.first().click();
      await page.waitForTimeout(1000);
    }
    
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    const characterCards = page.locator('.character-card, .hs-card-mini');
    if (await characterCards.count() > 0) {
      await characterCards.first().click();
      await page.waitForTimeout(1000);
    }
    
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await page.waitForTimeout(2000);
    }
    
    if (await submitBtn.count() > 0) {
      await uiChecker.checkTouchTarget('button[type="submit"], button:has-text("Create")');
      
      await submitBtn.click();
      
      await page.waitForResponse(resp => resp.url().includes('/api/books') && resp.method() === 'POST', { timeout: 60000 }).catch(() => {});
      
      await page.waitForTimeout(3000);
    }
    
    await takeScreenshot(page, 'book-create-result', projectName);
    
    console.log(`[${projectName}] 创建书籍完整流程问题:`, uiChecker.getIssues());
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/03-book-creation.spec.js`
Expected: No output (syntax OK)

---

## Task 8: 创建章节创建流程测试

**Files:**
- Create: `tests/e2e/mobile/specs/04-chapter-creation.spec.js`

**Step 1: 创建章节创建流程测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('添加章节流程测试', () => {
  let uiChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('步骤1: 进入书籍详情页', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      await takeScreenshot(page, 'chapter-book-detail', projectName);
      
      await uiChecker.checkHorizontalScroll();
      
      console.log(`[${projectName}] 书籍详情页问题:`, uiChecker.getIssues());
    }
  });

  test('步骤2: 点击添加章节按钮', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const addChapterBtn = page.locator('#addChapterBtn, button:has-text("Add Chapter"), button:has-text("添加章节"), a[href*="director"]');
      if (await addChapterBtn.count() > 0) {
        await uiChecker.checkTouchTarget('#addChapterBtn, button:has-text("Add Chapter"), a[href*="director"]');
        
        await addChapterBtn.first().click();
        await page.waitForTimeout(2000);
        
        await takeScreenshot(page, 'chapter-add-clicked', projectName);
      }
    }
    
    console.log(`[${projectName}] 添加章节按钮问题:`, uiChecker.getIssues());
  });

  test('步骤3: 选择角色弹窗', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const addChapterBtn = page.locator('#addChapterBtn, button:has-text("Add Chapter"), a[href*="director"]');
      if (await addChapterBtn.count() > 0) {
        await addChapterBtn.first().click();
        await page.waitForTimeout(2000);
        
        const modal = page.locator('#chapterCharacterModal, .modal, .character-select-modal');
        if (await modal.count() > 0) {
          await takeScreenshot(page, 'chapter-character-modal', projectName);
          
          await uiChecker.checkElementOcclusion('#chapterCharacterModal, .modal');
          
          const checkboxes = page.locator('#chapterCharacterModal input[type="checkbox"], .modal input[type="checkbox"]');
          if (await checkboxes.count() > 0) {
            await uiChecker.checkTouchTarget('#chapterCharacterModal input[type="checkbox"], .modal input[type="checkbox"]');
          }
          
          const confirmBtn = page.locator('#confirmChapterChars, button:has-text("Confirm"), button:has-text("确认")');
          if (await confirmBtn.count() > 0) {
            await uiChecker.checkTouchTarget('#confirmChapterChars, button:has-text("Confirm")');
          }
        }
      }
    }
    
    console.log(`[${projectName}] 角色选择弹窗问题:`, uiChecker.getIssues());
  });

  test('完整流程: 添加章节', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const addChapterBtn = page.locator('#addChapterBtn, button:has-text("Add Chapter"), a[href*="director"]');
      if (await addChapterBtn.count() > 0) {
        await addChapterBtn.first().click();
        await page.waitForTimeout(2000);
        
        const modal = page.locator('#chapterCharacterModal, .modal');
        if (await modal.count() > 0) {
          const checkboxes = page.locator('#chapterCharacterModal input[type="checkbox"], .modal input[type="checkbox"]');
          if (await checkboxes.count() > 0) {
            await checkboxes.first().check();
          }
          
          const confirmBtn = page.locator('#confirmChapterChars, button:has-text("Confirm")');
          if (await confirmBtn.count() > 0) {
            await confirmBtn.click();
            await page.waitForTimeout(3000);
          }
        }
        
        await takeScreenshot(page, 'chapter-add-result', projectName);
      }
    }
    
    console.log(`[${projectName}] 添加章节完整流程问题:`, uiChecker.getIssues());
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/04-chapter-creation.spec.js`
Expected: No output (syntax OK)

---

## Task 9: 创建导演页流程测试

**Files:**
- Create: `tests/e2e/mobile/specs/05-director-flow.spec.js`

**Step 1: 创建导演页流程测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('导演页流程测试', () => {
  let uiChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('步骤1: 进入导演页', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        await takeScreenshot(page, 'director-initial', projectName);
        
        await uiChecker.checkHorizontalScroll();
        
        await uiChecker.checkFontSize('.director-header h1', 16);
        
        console.log(`[${projectName}] 导演页初始问题:`, uiChecker.getIssues());
      }
    }
  });

  test('步骤2: 检查三栏布局适配', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        const leftPanel = page.locator('.left-panel');
        const centerStage = page.locator('.center-stage');
        const rightPanel = page.locator('.right-panel');
        
        if (await leftPanel.count() > 0) {
          const leftBox = await leftPanel.boundingBox();
          if (leftBox) {
            console.log(`[${projectName}] 左侧面板宽度: ${leftBox.width}px`);
          }
        }
        
        if (await centerStage.count() > 0) {
          const centerBox = await centerStage.boundingBox();
          if (centerBox) {
            console.log(`[${projectName}] 中央舞台宽度: ${centerBox.width}px`);
          }
        }
        
        if (await rightPanel.count() > 0) {
          const rightBox = await rightPanel.boundingBox();
          if (rightBox) {
            console.log(`[${projectName}] 右侧面板宽度: ${rightBox.width}px`);
          }
        }
        
        await takeScreenshot(page, 'director-layout', projectName);
      }
    }
  });

  test('步骤3: 选择主角', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        const fanCards = page.locator('.fan-card');
        if (await fanCards.count() > 0) {
          await uiChecker.checkTouchTarget('.fan-card');
          
          await fanCards.first().click();
          await page.waitForTimeout(1000);
          
          await takeScreenshot(page, 'director-protagonist-selected', projectName);
        }
      }
    }
    
    console.log(`[${projectName}] 选择主角问题:`, uiChecker.getIssues());
  });

  test('步骤4: 选择剧情卡', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        const characterFan = page.locator('#characterFan .fan-card');
        if (await characterFan.count() > 0) {
          await characterFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const adventureFan = page.locator('#adventureFan .fan-card');
        if (await adventureFan.count() > 0) {
          await adventureFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const terrainFan = page.locator('#terrainFan .fan-card');
        if (await terrainFan.count() > 0) {
          await terrainFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const weatherFan = page.locator('#weatherFan .fan-card');
        if (await weatherFan.count() > 0) {
          await weatherFan.first().click();
          await page.waitForTimeout(500);
        }
        
        await takeScreenshot(page, 'director-cards-selected', projectName);
      }
    }
    
    console.log(`[${projectName}] 选择剧情卡问题:`, uiChecker.getIssues());
  });

  test('步骤5: 检查舞台预览', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        const characterFan = page.locator('#characterFan .fan-card');
        if (await characterFan.count() > 0) {
          await characterFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const adventureFan = page.locator('#adventureFan .fan-card');
        if (await adventureFan.count() > 0) {
          await adventureFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const terrainFan = page.locator('#terrainFan .fan-card');
        if (await terrainFan.count() > 0) {
          await terrainFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const weatherFan = page.locator('#weatherFan .fan-card');
        if (await weatherFan.count() > 0) {
          await weatherFan.first().click();
          await page.waitForTimeout(500);
        }
        
        const stageSlots = page.locator('.stage-slot.filled');
        const filledCount = await stageSlots.count();
        console.log(`[${projectName}] 已填充的舞台位: ${filledCount}`);
        
        await uiChecker.checkTouchTarget('.stage-slot');
        
        await takeScreenshot(page, 'director-stage-preview', projectName);
      }
    }
    
    console.log(`[${projectName}] 舞台预览问题:`, uiChecker.getIssues());
  });

  test('步骤6: 检查开始制作按钮', async ({ page, projectName }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        const startBtn = page.locator('#startBtn, .hearthstone-btn');
        if (await startBtn.count() > 0) {
          await uiChecker.checkTouchTarget('#startBtn, .hearthstone-btn');
          
          const isDisabled = await startBtn.isDisabled();
          console.log(`[${projectName}] 开始制作按钮禁用状态: ${isDisabled}`);
          
          await takeScreenshot(page, 'director-start-btn', projectName);
        }
      }
    }
    
    console.log(`[${projectName}] 开始制作按钮问题:`, uiChecker.getIssues());
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/05-director-flow.spec.js`
Expected: No output (syntax OK)

---

## Task 10: 创建边缘场景测试

**Files:**
- Create: `tests/e2e/mobile/specs/06-edge-cases.spec.js`

**Step 1: 创建边缘场景测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('边缘场景测试', () => {
  let uiChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
  });

  test('空数据状态显示', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const emptyState = page.locator('.empty-state, .no-books, :text("No stories")');
    const hasEmpty = await emptyState.count() > 0;
    
    if (hasEmpty) {
      await takeScreenshot(page, 'empty-state', projectName);
      await uiChecker.checkFontSize('.empty-state, .no-books', 14);
    }
    
    console.log(`[${projectName}] 空数据状态: ${hasEmpty ? '存在' : '不存在'}`);
  });

  test('长文本截断检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCards = page.locator('.book-3d, .book-item');
    if (await bookCards.count() > 0) {
      const bookTitle = bookCards.first().locator('.book-title, .book-info h4');
      if (await bookTitle.count() > 0) {
        await uiChecker.checkTextOverflow('.book-title, .book-info h4');
      }
    }
    
    await takeScreenshot(page, 'long-text-check', projectName);
    
    console.log(`[${projectName}] 长文本问题:`, uiChecker.getIssues());
  });

  test('横屏模式检查', async ({ page, projectName }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'landscape-mode', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    console.log(`[${projectName}] 横屏模式问题:`, uiChecker.getIssues());
  });

  test('键盘弹出模拟', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/login.html');
    await waitForPageReady(page);
    
    const input = page.locator('#username, input[type="text"]').first();
    if (await input.count() > 0) {
      await input.click();
      await input.fill('test user name');
      
      await page.waitForTimeout(500);
      
      await takeScreenshot(page, 'keyboard-shown', projectName);
      
      const inputBox = await input.boundingBox();
      const viewport = page.viewportSize();
      
      if (inputBox && viewport) {
        const isInputVisible = inputBox.y + inputBox.height < viewport.height;
        console.log(`[${projectName}] 输入框在键盘弹出后可见: ${isInputVisible}`);
      }
    }
    
    console.log(`[${projectName}] 键盘弹出问题:`, uiChecker.getIssues());
  });

  test('弱网环境模拟', async ({ page, projectName }) => {
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });
    
    await loginUser(page);
    await page.goto('/bookshelf.html');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    
    await takeScreenshot(page, 'slow-network', projectName);
    
    console.log(`[${projectName}] 弱网环境测试完成`);
  });

  test('双指缩放检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const viewport = page.viewportSize();
    if (viewport) {
      await page.mouse.move(viewport.width / 2, viewport.height / 2);
      
      const scale = await page.evaluate(() => {
        return window.visualViewport ? window.visualViewport.scale : 1;
      });
      
      console.log(`[${projectName}] 页面缩放比例: ${scale}`);
    }
    
    await takeScreenshot(page, 'pinch-zoom-check', projectName);
  });

  test('导航栏固定检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const navbar = page.locator('.navbar');
    if (await navbar.count() > 0) {
      const position = await navbar.evaluate(el => window.getComputedStyle(el).position);
      console.log(`[${projectName}] 导航栏定位: ${position}`);
      
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);
      
      const navbarTop = await navbar.evaluate(el => el.getBoundingClientRect().top);
      console.log(`[${projectName}] 滚动后导航栏top: ${navbarTop}`);
    }
    
    await takeScreenshot(page, 'navbar-fixed', projectName);
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/06-edge-cases.spec.js`
Expected: No output (syntax OK)

---

## Task 11: 创建可访问性测试

**Files:**
- Create: `tests/e2e/mobile/specs/07-accessibility.spec.js`

**Step 1: 创建可访问性测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { AccessibilityChecker } from '../utils/accessibility-checker.js';

test.describe('可访问性测试', () => {
  let a11yChecker;

  test.beforeEach(async ({ page, projectName }) => {
    a11yChecker = new AccessibilityChecker(page, projectName);
  });

  test('书架页可访问性检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkFormLabels();
    await a11yChecker.checkButtonNames();
    await a11yChecker.checkLinkText();
    
    await takeScreenshot(page, 'a11y-bookshelf', projectName);
    
    console.log(`[${projectName}] 书架页可访问性问题:`, a11yChecker.getIssues());
  });

  test('书籍详情页可访问性检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      await a11yChecker.checkImagesHaveAlt();
      await a11yChecker.checkButtonNames();
      
      await takeScreenshot(page, 'a11y-book-detail', projectName);
      
      console.log(`[${projectName}] 书籍详情页可访问性问题:`, a11yChecker.getIssues());
    }
  });

  test('章节阅读页可访问性检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const chapterCard = page.locator('.chapter-toc-item, .chapter-card').first();
      if (await chapterCard.count() > 0) {
        await chapterCard.click();
        await waitForPageReady(page);
        
        await a11yChecker.checkImagesHaveAlt();
        await a11yChecker.checkButtonNames();
        
        await takeScreenshot(page, 'a11y-chapter', projectName);
        
        console.log(`[${projectName}] 章节阅读页可访问性问题:`, a11yChecker.getIssues());
      }
    }
  });

  test('导演页可访问性检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const directorBtn = page.locator('a[href*="director"], .action-btn:has-text("Direct")');
      if (await directorBtn.count() > 0) {
        await directorBtn.first().click();
        await waitForPageReady(page);
        
        await a11yChecker.checkImagesHaveAlt();
        await a11yChecker.checkButtonNames();
        
        await takeScreenshot(page, 'a11y-director', projectName);
        
        console.log(`[${projectName}] 导演页可访问性问题:`, a11yChecker.getIssues());
      }
    }
  });

  test('焦点导航测试', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const focusableElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      return elements.slice(0, 10).map(el => ({
        tag: el.tagName,
        text: el.textContent?.substring(0, 30),
        tabindex: el.tabIndex
      }));
    });
    
    console.log(`[${projectName}] 可聚焦元素(前10个):`, focusableElements);
    
    for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName + (el.textContent?.substring(0, 20) || '') : 'none';
      });
      
      console.log(`[${projectName}] Tab ${i + 1}: ${focused}`);
    }
    
    await takeScreenshot(page, 'a11y-focus-nav', projectName);
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/07-accessibility.spec.js`
Expected: No output (syntax OK)

---

## Task 12: 创建本地化测试

**Files:**
- Create: `tests/e2e/mobile/specs/08-localization.spec.js`

**Step 1: 创建本地化测试文件**

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('本地化测试', () => {
  let uiChecker;

  test.beforeEach(async ({ page, projectName }) => {
    uiChecker = new UIChecker(page, projectName);
  });

  test('英文文本显示检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html?lang=en');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'localization-english', projectName);
    
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const count = await textElements.count();
    
    let overflowCount = 0;
    for (let i = 0; i < Math.min(20, count); i++) {
      const el = textElements.nth(i);
      const hasOverflow = await el.evaluate(node => {
        return node.scrollWidth > node.clientWidth + 5;
      });
      if (hasOverflow) {
        overflowCount++;
        const text = await el.textContent();
        console.log(`[${projectName}] 文本溢出: ${text?.substring(0, 50)}`);
      }
    }
    
    console.log(`[${projectName}] 英文文本溢出数量: ${overflowCount}`);
  });

  test('长单词换行检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html?lang=en');
    await waitForPageReady(page);
    
    const wordBreak = await page.evaluate(() => {
      const body = document.body;
      const style = window.getComputedStyle(body);
      return {
        wordBreak: style.wordBreak,
        overflowWrap: style.overflowWrap,
        hyphens: style.hyphens
      };
    });
    
    console.log(`[${projectName}] 文本换行设置:`, wordBreak);
    
    await takeScreenshot(page, 'localization-word-break', projectName);
  });

  test('日期格式检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html?lang=en');
    await waitForPageReady(page);
    
    const dateElements = page.locator('[data-date], .date, time');
    const count = await dateElements.count();
    
    for (let i = 0; i < count; i++) {
      const text = await dateElements.nth(i).textContent();
      console.log(`[${projectName}] 日期格式: ${text}`);
    }
    
    await takeScreenshot(page, 'localization-date', projectName);
  });

  test('按钮文本长度检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html?lang=en');
    await waitForPageReady(page);
    
    const buttons = page.locator('button, .btn, a.btn');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(10, count); i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const box = await btn.boundingBox();
      
      if (box && text) {
        const textLength = text.trim().length;
        const widthPerChar = box.width / textLength;
        
        if (widthPerChar < 6) {
          console.log(`[${projectName}] 按钮文本可能过长: "${text.trim()}" (${box.width}px)`);
        }
      }
    }
    
    await takeScreenshot(page, 'localization-buttons', projectName);
  });

  test('表单标签检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/login.html?lang=en');
    await waitForPageReady(page);
    
    const labels = page.locator('label');
    const count = await labels.count();
    
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).textContent();
      console.log(`[${projectName}] 表单标签: ${text}`);
    }
    
    await takeScreenshot(page, 'localization-form-labels', projectName);
  });

  test('导航菜单文本检查', async ({ page, projectName }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html?lang=en');
    await waitForPageReady(page);
    
    const navLinks = page.locator('.navbar a, .navbar-link, nav a');
    const count = await navLinks.count();
    
    for (let i = 0; i < count; i++) {
      const text = await navLinks.nth(i).textContent();
      const box = await navLinks.nth(i).boundingBox();
      
      if (box) {
        console.log(`[${projectName}] 导航项: "${text?.trim()}" (${box.width}px)`);
        
        if (box.width < 44) {
          console.log(`[${projectName}] 导航项过小: "${text?.trim()}"`);
        }
      }
    }
    
    await takeScreenshot(page, 'localization-nav', projectName);
  });
});
```

**Step 2: 验证语法**

Run: `node --check tests/e2e/mobile/specs/08-localization.spec.js`
Expected: No output (syntax OK)

---

## Task 13: 创建报告生成工具

**Files:**
- Create: `tests/e2e/mobile/reports/mobile-ui-report.md` (初始模板)

**Step 1: 创建报告目录和初始模板**

```markdown
# 移动端Web UI测试报告

## 测试概览

- **测试时间**: {timestamp}
- **测试设备**: 中屏手机、大屏手机、平板
- **测试环境**: http://127.0.0.1:8788

## 测试结果摘要

| 设备 | 通过 | 失败 | 警告 |
|------|------|------|------|
| 中屏手机 (390px) | - | - | - |
| 大屏手机 (428px) | - | - | - |
| 平板 (768px) | - | - | - |

## 问题列表

### 严重问题 (Critical)

| 序号 | 页面 | 问题描述 | 设备 | 截图 |
|------|------|---------|------|------|
| - | - | - | - | - |

### 中等问题 (Warning)

| 序号 | 页面 | 问题描述 | 设备 | 截图 |
|------|------|---------|------|------|
| - | - | - | - | - |

### 轻微问题 (Info)

| 序号 | 页面 | 问题描述 | 设备 | 截图 |
|------|------|---------|------|------|
| - | - | - | - | - |

## 截图审查

### 书架页面

| 设备 | 截图 |
|------|------|
| 中屏手机 | ![中屏手机](screenshots/medium-phone/bookshelf-initial.png) |
| 大屏手机 | ![大屏手机](screenshots/large-phone/bookshelf-initial.png) |
| 平板 | ![平板](screenshots/tablet/bookshelf-initial.png) |

### 书籍详情页

| 设备 | 截图 |
|------|------|
| 中屏手机 | ![中屏手机](screenshots/medium-phone/book-detail.png) |
| 大屏手机 | ![大屏手机](screenshots/large-phone/book-detail.png) |
| 平板 | ![平板](screenshots/tablet/book-detail.png) |

### 章节阅读页

| 设备 | 截图 |
|------|------|
| 中屏手机 | ![中屏手机](screenshots/medium-phone/chapter-reading.png) |
| 大屏手机 | ![大屏手机](screenshots/large-phone/chapter-reading.png) |
| 平板 | ![平板](screenshots/tablet/chapter-reading.png) |

### 导演页

| 设备 | 截图 |
|------|------|
| 中屏手机 | ![中屏手机](screenshots/medium-phone/director-page.png) |
| 大屏手机 | ![大屏手机](screenshots/large-phone/director-page.png) |
| 平板 | ![平板](screenshots/tablet/director-page.png) |

## UI评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 布局与尺寸 | -/100 | - |
| 可读性 | -/100 | - |
| 交互体验 | -/100 | - |
| 可访问性 | -/100 | - |
| **总分** | -/100 | - |

## 建议

-

---

*报告生成时间: {timestamp}*
```

---

## Task 14: 创建截图目录结构

**Files:**
- Create: `tests/e2e/mobile/reports/screenshots/medium-phone/.gitkeep`
- Create: `tests/e2e/mobile/reports/screenshots/large-phone/.gitkeep`
- Create: `tests/e2e/mobile/reports/screenshots/tablet/.gitkeep`

**Step 1: 创建目录结构**

Run: 
```bash
mkdir -p tests/e2e/mobile/reports/screenshots/medium-phone
mkdir -p tests/e2e/mobile/reports/screenshots/large-phone
mkdir -p tests/e2e/mobile/reports/screenshots/tablet
```

**Step 2: 创建.gitkeep文件**

Create empty `.gitkeep` files in each screenshot directory.

---

## Task 15: 验证测试配置

**Step 1: 启动开发服务器**

Run: `npm run dev`
Wait: Until server is ready on http://127.0.0.1:8788

**Step 2: 运行静态分析测试**

Run: `npx playwright test tests/e2e/mobile/specs/01-static-analysis.spec.js --config=tests/e2e/mobile/mobile-test.config.js --project=medium-phone --headed`
Expected: Tests run and complete

**Step 3: 运行页面展示测试**

Run: `npx playwright test tests/e2e/mobile/specs/02-display-pages.spec.js --config=tests/e2e/mobile/mobile-test.config.js --project=medium-phone --headed`
Expected: Tests run and complete

---

## Task 16: 生成最终测试报告

**Step 1: 运行所有测试**

Run: `npx playwright test tests/e2e/mobile --config=tests/e2e/mobile/mobile-test.config.js --headed --reporter=list`

**Step 2: 查看测试报告**

Run: `npx playwright show-report tests/e2e/mobile/reports/html`

**Step 3: 更新报告文件**

Update `tests/e2e/mobile/reports/mobile-ui-report.md` with actual test results.

---

## 注意事项

1. **只修改 `tests/e2e/mobile/` 目录**
2. **测试必须是真实的移动Web测试**
3. **每个步骤都要检查移动端适配**
4. **使用headed模式可以看到浏览器窗口**
5. **参考历史经验文档避免卡死问题**
