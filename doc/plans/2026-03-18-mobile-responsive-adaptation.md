# 移动端响应式适配实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修复移动端Web版本的6个UI问题，实现整体缩小的响应式适配方案

**Architecture:** 使用CSS媒体查询实现移动端适配，章节页采用"滚动定位+页面跳转"混合方案，保持静态页面结构不变，通过CSS和JS实现单章节全屏显示效果

**Tech Stack:** CSS Media Queries, JavaScript, Playwright E2E Testing

---

## 问题清单

| 序号 | 问题 | 解决方案 |
|------|------|----------|
| 1 | 章节内容页双面展示 | 移动端单章节全屏，滚动定位+页面跳转 |
| 2 | 导航栏拥挤 | 缩小字体，精简导航项 |
| 3 | 按钮过大 | 缩小按钮尺寸，保持44px最小触摸区域 |
| 4 | 顶部内容被遮挡 | 调整padding-top |
| 5 | 导演页横向滚动条 | 整体缩小元素 |
| 6 | 公共图书馆一行一本 | 改为一行两本 |

---

## Task 1: 创建全局移动端CSS样式文件

**Files:**
- Modify: `src/frontend/css/responsive.css`

**Step 1: 添加移动端基础样式**

```css
/* 移动端全局适配 - 中度缩小方案 */
@media (max-width: 768px) {
  html {
    font-size: 12px;
  }
  
  body {
    font-size: 12px;
    line-height: 1.5;
  }
  
  h1 { font-size: 20px; }
  h2 { font-size: 18px; }
  h3 { font-size: 16px; }
  h4 { font-size: 14px; }
  
  p {
    font-size: 12px;
    line-height: 1.6;
  }
}
```

**Step 2: 验证语法**

Run: `node --check src/frontend/css/responsive.css` (或直接检查CSS语法)

---

## Task 2: 修改导航栏移动端样式

**Files:**
- Modify: `src/frontend/css/main.css` 或 `src/frontend/css/components.css`

**Step 1: 添加导航栏移动端样式**

```css
@media (max-width: 768px) {
  .navbar {
    padding: 8px 12px;
    font-size: 11px;
  }
  
  .navbar-brand {
    font-size: 14px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .navbar-nav {
    gap: 4px;
  }
  
  .navbar-link {
    padding: 4px 8px;
    font-size: 10px;
  }
  
  .navbar-language .lang-btn {
    padding: 3px 6px;
    font-size: 10px;
  }
}
```

**Step 2: 验证效果**

Run: 启动移动端仿真器测试导航栏

---

## Task 3: 修改按钮移动端样式

**Files:**
- Modify: `src/frontend/css/components.css`

**Step 1: 添加按钮移动端样式**

```css
@media (max-width: 768px) {
  .btn,
  .btn-action,
  .btn-3d,
  .hearthstone-btn,
  .scroll-nav-btn {
    padding: 8px 16px;
    font-size: 12px;
    min-height: 44px;
    min-width: 44px;
  }
  
  .btn-large {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .btn-small {
    padding: 6px 12px;
    font-size: 10px;
  }
}
```

---

## Task 4: 修改图书馆页面移动端布局

**Files:**
- Modify: `src/frontend/library.html`

**Step 1: 添加图书馆移动端样式**

```css
@media (max-width: 768px) {
  .library-grid,
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }
  
  .book-card,
  .book-item {
    width: 100%;
    min-width: 0;
  }
  
  .book-cover {
    height: 120px;
  }
  
  .book-info {
    padding: 8px;
  }
  
  .book-info h4 {
    font-size: 11px;
  }
  
  .book-info p {
    font-size: 10px;
  }
}
```

---

## Task 5: 修改章节页移动端样式（预设书籍静态页面）

**Files:**
- Modify: `src/frontend/chapter.html` (CSS部分)
- Modify: `scripts/generate-from-db.js` (CSS模板部分)

**Step 1: 修改chapter.html的移动端CSS**

```css
@media (max-width: 768px) {
  .book-reader-page {
    height: auto;
    min-height: 100vh;
    padding-top: 60px;
  }
  
  .reading-book-container {
    width: 100%;
    height: auto;
    min-height: auto;
    flex-direction: column;
  }
  
  .reading-spine {
    display: none;
  }
  
  .reading-page {
    position: relative;
    width: 100%;
    min-height: 70vh;
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: none;
  }
  
  .reading-page.left {
    display: block;
  }
  
  .reading-page.right {
    display: none;
  }
  
  .reading-page.right.active {
    display: block;
  }
  
  .reading-content {
    padding: 20px 16px;
    font-size: 14px;
  }
  
  .manuscript-title .chapter-name {
    font-size: 20px;
  }
  
  .manuscript-text {
    font-size: 14px;
    line-height: 1.8;
  }
  
  .reading-nav-bar {
    padding: 10px 12px;
  }
  
  .scroll-nav-btn {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .nav-info {
    font-size: 11px;
  }
}
```

**Step 2: 修改generate-from-db.js中的CSS模板**

在 `generateChapterHTML` 函数的 `<style>` 部分添加相同的移动端样式。

---

## Task 6: 添加章节页移动端翻页逻辑（用户创建书籍）

**Files:**
- Modify: `src/frontend/chapter.html` (JavaScript部分)

**Step 1: 添加移动端检测函数**

```javascript
function isMobile() {
  return window.innerWidth <= 768;
}
```

**Step 2: 修改nextChapter函数**

```javascript
function nextChapter() {
  const totalPages = calculateTotalPages();
  
  if (isMobile()) {
    // 移动端：检查右页是否可见
    const rightPage = document.getElementById('rightPage');
    const isRightVisible = rightPage && rightPage.classList.contains('active');
    
    if (isRightVisible) {
      // 当前看右页，跳转到下一页的左页
      if (currentPageIndex + 2 < totalPages) {
        currentPageIndex += 2;
        renderCurrentPages();
        // 隐藏右页，只显示左页
        document.getElementById('rightPage').classList.remove('active');
        window.scrollTo(0, 0);
      } else {
        showNotification(t('messages.lastPage'), 'info');
      }
    } else {
      // 当前看左页，显示右页
      if (currentPageIndex + 1 < totalPages) {
        document.getElementById('rightPage').classList.add('active');
        document.getElementById('rightPage').scrollIntoView({ behavior: 'smooth' });
      } else {
        showNotification(t('messages.lastPage'), 'info');
      }
    }
  } else {
    // 桌面端：每次翻两页
    if (currentPageIndex + 2 < totalPages) {
      currentPageIndex += 2;
      renderCurrentPages();
    } else {
      showNotification(t('messages.lastPage'), 'info');
    }
  }
}
```

**Step 3: 修改prevChapter函数**

```javascript
function prevChapter() {
  if (isMobile()) {
    const rightPage = document.getElementById('rightPage');
    const isRightVisible = rightPage && rightPage.classList.contains('active');
    
    if (isRightVisible) {
      // 当前看右页，滚动到左页
      rightPage.classList.remove('active');
      document.getElementById('leftPage').scrollIntoView({ behavior: 'smooth' });
    } else {
      // 当前看左页，跳转到上一页的右页
      if (currentPageIndex > 0) {
        currentPageIndex = Math.max(0, currentPageIndex - 2);
        renderCurrentPages();
        // 显示右页
        document.getElementById('rightPage').classList.add('active');
        window.scrollTo(0, 0);
      } else {
        showNotification(t('messages.firstPage'), 'info');
      }
    }
  } else {
    // 桌面端
    if (currentPageIndex > 0) {
      currentPageIndex = Math.max(0, currentPageIndex - 2);
      renderCurrentPages();
    } else {
      showNotification(t('messages.firstPage'), 'info');
    }
  }
}
```

**Step 4: 修改renderCurrentPages函数**

```javascript
function renderCurrentPages() {
  const leftPage = document.querySelector('#leftPage .reading-content');
  const rightPage = document.querySelector('#rightPage .reading-content');
  
  const leftContent = getPageContent(currentPageIndex);
  const rightContent = getPageContent(currentPageIndex + 1);
  
  leftPage.innerHTML = leftContent;
  rightPage.innerHTML = rightContent;
  
  // 移动端重置右页状态
  if (isMobile()) {
    document.getElementById('rightPage').classList.remove('active');
  }
  
  updateNavigationButtons();
  updatePageIndicator();
  initCharacterHighlights();
  initPuzzleScrollHint();
  
  loadPuzzleForCurrentPage();
}
```

---

## Task 7: 添加章节页移动端翻页逻辑（预设书籍静态页面）

**Files:**
- Modify: `scripts/generate-from-db.js` (JavaScript模板部分)

**Step 1: 在生成脚本的JavaScript中添加移动端翻页逻辑**

在 `generateChapterHTML` 函数的 `<script>` 部分，添加与Task 6相同的移动端翻页逻辑。

---

## Task 8: 修改导演页移动端样式

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 增强导演页移动端样式**

```css
@media (max-width: 768px) {
  .director-page {
    padding: 60px 8px 20px;
    overflow-x: hidden;
  }
  
  .three-column-layout {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .left-panel,
  .right-panel,
  .center-stage {
    width: 100%;
    max-width: 100%;
    position: static;
    padding: 12px;
  }
  
  .center-stage {
    min-height: auto;
    padding: 12px;
  }
  
  .stage-area {
    min-height: 250px;
    padding: 8px;
  }
  
  .stage-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    max-width: 100%;
  }
  
  .stage-slot {
    min-height: 60px;
    font-size: 9px;
  }
  
  .stage-slot .slot-name {
    font-size: 7px;
  }
  
  .fan-card {
    width: 50px;
    height: 70px;
  }
  
  .fan-avatar {
    font-size: 14px;
  }
  
  .fan-name {
    font-size: 6px;
  }
  
  .hearthstone-btn {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  .director-header h1 {
    font-size: 18px;
  }
  
  .director-header p {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .stage-grid {
    gap: 4px;
  }
  
  .stage-slot {
    min-height: 50px;
  }
  
  .fan-card {
    width: 45px;
    height: 65px;
  }
}
```

---

## Task 9: 修复顶部内容被遮挡问题

**Files:**
- Modify: `src/frontend/css/main.css`

**Step 1: 添加移动端顶部padding**

```css
@media (max-width: 768px) {
  body {
    padding-top: 50px;
  }
  
  .navbar {
    height: 50px;
  }
  
  .page-content,
  .main-content {
    padding-top: 60px;
  }
}
```

---

## Task 10: 创建端到端测试 - 章节页翻页测试

**Files:**
- Create: `tests/e2e/mobile/specs/09-chapter-navigation.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

test.describe('章节页移动端翻页测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('预设书籍：初始只显示左页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const leftPage = page.locator('#leftPage');
    const rightPage = page.locator('#rightPage');
    
    await expect(leftPage).toBeVisible();
    await expect(rightPage).not.toBeVisible();
  });

  test('预设书籍：点击下一章显示右页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    const rightPage = page.locator('#rightPage');
    await expect(rightPage).toBeVisible();
  });

  test('预设书籍：右页状态点击下一章跳转页面', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    // 第一次点击显示右页
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    // 第二次点击应该跳转
    await nextBtn.click();
    await page.waitForTimeout(1000);
    
    // 验证URL变化或页面内容变化
    const url = page.url();
    expect(url).not.toContain('chapter-ai001-01.html');
  });

  test('预设书籍：右页状态点击上一章返回左页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    // 先显示右页
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    const rightPage = page.locator('#rightPage');
    await expect(rightPage).toBeVisible();
    
    // 点击上一章
    const prevBtn = page.locator('.scroll-nav-btn:has-text("Previous")');
    await prevBtn.click();
    await page.waitForTimeout(500);
    
    // 右页应该隐藏
    await expect(rightPage).not.toBeVisible();
  });

  test('用户创建书籍：移动端单页翻页', async ({ page }) => {
    // 先登录
    await page.goto('http://127.0.0.1:8080/login.html');
    await page.fill('#username', 'MobileTest_' + Date.now());
    await page.click('button[type="submit"]');
    await page.waitForURL(/bookshelf/, { timeout: 15000 });
    
    // 进入书籍详情
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await page.waitForLoadState('networkidle');
      
      // 进入章节
      const chapterLink = page.locator('.chapter-toc-item, .chapter-card').first();
      if (await chapterLink.count() > 0) {
        await chapterLink.click();
        await page.waitForLoadState('networkidle');
        
        // 验证单页显示
        const leftPage = page.locator('#leftPage');
        const rightPage = page.locator('#rightPage');
        
        await expect(leftPage).toBeVisible();
        
        // 点击下一章
        const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
        if (await nextBtn.count() > 0) {
          await nextBtn.click();
          await page.waitForTimeout(500);
        }
      }
    }
  });
});
```

---

## Task 11: 创建端到端测试 - 导航栏测试

**Files:**
- Create: `tests/e2e/mobile/specs/10-navbar-mobile.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

test.describe('导航栏移动端测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('导航栏元素可见且不拥挤', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/bookshelf.html');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    const brand = page.locator('.navbar-brand');
    await expect(brand).toBeVisible();
    
    const links = page.locator('.navbar-link');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toBeVisible();
      
      const box = await link.boundingBox();
      expect(box.width).toBeGreaterThan(30);
    }
  });

  test('语言切换按钮可用', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/bookshelf.html');
    await page.waitForLoadState('networkidle');
    
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    await zhBtn.click();
    await page.waitForTimeout(500);
    
    // 验证语言切换
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text).toContain('书架');
  });
});
```

---

## Task 12: 创建端到端测试 - 图书馆布局测试

**Files:**
- Create: `tests/e2e/mobile/specs/11-library-mobile.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

test.describe('图书馆移动端布局测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('图书馆一行显示两本书', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/library.html');
    await page.waitForLoadState('networkidle');
    
    const books = page.locator('.book-card, .book-item');
    const count = await books.count();
    
    if (count >= 2) {
      const book1 = await books.nth(0).boundingBox();
      const book2 = await books.nth(1).boundingBox();
      
      // 两本书应该在同一行
      expect(Math.abs(book1.y - book2.y)).toBeLessThan(50);
      // 两本书应该并排
      expect(book2.x).toBeGreaterThan(book1.x);
    }
  });

  test('书籍卡片尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/library.html');
    await page.waitForLoadState('networkidle');
    
    const book = page.locator('.book-card, .book-item').first();
    const box = await book.boundingBox();
    
    // 宽度应该约为屏幕的一半
    expect(box.width).toBeGreaterThan(150);
    expect(box.width).toBeLessThan(220);
  });
});
```

---

## Task 13: 创建端到端测试 - 导演页测试

**Files:**
- Create: `tests/e2e/mobile/specs/12-director-mobile.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

test.describe('导演页移动端测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('导演页无横向滚动', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('舞台预览区域可见', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const stageGrid = page.locator('.stage-grid');
    await expect(stageGrid).toBeVisible();
    
    const stageSlots = page.locator('.stage-slot');
    const count = await stageSlots.count();
    expect(count).toBeGreaterThan(0);
    
    // 检查所有slot是否在视口内
    for (let i = 0; i < count; i++) {
      const slot = stageSlots.nth(i);
      const box = await slot.boundingBox();
      expect(box.x + box.width).toBeLessThanOrEqual(390);
    }
  });

  test('卡牌尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const fanCards = page.locator('.fan-card');
    const count = await fanCards.count();
    
    if (count > 0) {
      const card = fanCards.first();
      const box = await card.boundingBox();
      
      expect(box.width).toBeLessThanOrEqual(60);
      expect(box.height).toBeLessThanOrEqual(85);
    }
  });
});
```

---

## Task 14: 创建端到端测试 - 按钮尺寸测试

**Files:**
- Create: `tests/e2e/mobile/specs/13-button-size-mobile.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

test.describe('按钮移动端尺寸测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('按钮触摸区域足够大', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/bookshelf.html');
    await page.waitForLoadState('networkidle');
    
    const buttons = page.locator('button, .btn, .btn-action');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(10, count); i++) {
      const btn = buttons.nth(i);
      const box = await btn.boundingBox();
      
      if (box) {
        // 最小触摸区域44px
        expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('导航按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const navBtns = page.locator('.scroll-nav-btn');
    const count = await navBtns.count();
    
    for (let i = 0; i < count; i++) {
      const btn = navBtns.nth(i);
      const box = await btn.boundingBox();
      
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeLessThanOrEqual(60);
    }
  });
});
```

---

## Task 15: 运行所有测试并验证

**Step 1: 启动开发服务器**

Run: `npx http-server src/frontend -p 8080`

**Step 2: 运行移动端测试**

Run: `npx playwright test tests/e2e/mobile/specs --config=tests/e2e/mobile/mobile-test.config.js --headed`

**Step 3: 检查测试结果**

Expected: 所有测试通过

---

## 注意事项

1. 所有CSS修改都在 `@media (max-width: 768px)` 内，不影响桌面端
2. 章节页翻页逻辑需要同时处理预设书籍和用户创建书籍
3. 测试用例需要覆盖所有翻页场景
4. 保持最小触摸区域44px

---

## 回滚方案

如果出现问题，只需：
1. 注释掉 `@media (max-width: 768px)` 内的样式
2. 恢复原来的JavaScript翻页逻辑
