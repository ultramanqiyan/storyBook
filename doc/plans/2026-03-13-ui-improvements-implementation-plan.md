# UI Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Implement five UI improvements: chapter pagination, card drop modal fix, remove Preset Stories section, allow non-login preset book viewing, and apply 3D book card styles.

**Architecture:** 
- Chapter pagination: Implement client-side pagination with dual-page display, content splitting by fixed height
- Card drop modal: Add missing CSS import
- Preset Stories removal: Modify bookshelf.html to remove section
- Non-login preset viewing: Modify auth checks in book.html and chapter.html
- 3D book cards: Apply demo styles to library.html

**Tech Stack:** HTML, CSS, JavaScript, Playwright E2E testing

---

## Task 1: Fix Card Drop Modal - Add Missing CSS Import

**Files:**
- Modify: `src/frontend/chapter.html:7-13`

**Step 1: Add style.css import to chapter.html**

Add the following line after line 12 in the `<head>` section:

```html
<link rel="stylesheet" href="css/style.css">
```

**Step 2: Verify the change**

Check that the import is added correctly after other CSS imports.

**Step 3: Commit**

```bash
git add src/frontend/chapter.html
git commit -m "fix: add missing style.css import for card drop modal"
```

---

## Task 2: Remove Preset Stories Section from Bookshelf

**Files:**
- Modify: `src/frontend/bookshelf.html:232-235`
- Modify: `src/frontend/bookshelf.html:242-244`
- Modify: `src/frontend/bookshelf.html:256-272`

**Step 1: Remove Preset Stories HTML section**

Remove lines 232-235:
```html
<div class="books-section">
  <h2 class="section-title"><span data-i18n="bookshelf.presetStories">Preset Stories</span> <span class="count">(3 <span data-i18n="bookshelf.stories">stories</span>)</span></h2>
  <div class="books-grid" id="presetBooks"></div>
</div>
```

**Step 2: Remove presetBooks variable and related code**

In the JavaScript section, remove:
- Line 243: `let allPresetBooks = [];`
- Lines 258-261: presetBooksResult API call
- Lines 263-264: allPresetBooks assignment
- Line 267: `renderPresetBooks(allPresetBooks);`
- Lines 283-291: `updateBookCounts()` function preset-related code
- Lines 304-312: `renderPresetBooks()` function

**Step 3: Update loadBooks function**

Modify the `loadBooks` function to only load user books:

```javascript
async function loadBooks(userId) {
  try {
    const userBooksResult = await API.getBooks(userId);
    allUserBooks = userBooksResult.success ? (userBooksResult.data || []) : [];
    renderMyBooks(allUserBooks);
    updateBookCounts();
  } catch (error) {
    showNotification('Failed to load books: ' + error.message, 'error');
  }
}
```

**Step 4: Update updateBookCounts function**

```javascript
function updateBookCounts() {
  const myCount = document.querySelector('.books-section .count');
  if (myCount) {
    myCount.textContent = `(${allUserBooks.length} stories)`;
  }
}
```

**Step 5: Commit**

```bash
git add src/frontend/bookshelf.html
git commit -m "feat: remove Preset Stories section from bookshelf"
```

---

## Task 3: Allow Non-Login Users to View Preset Books

**Files:**
- Modify: `src/frontend/book.html:467-482`
- Modify: `src/frontend/chapter.html` (auth check)

**Step 1: Modify book.html auth check**

Replace lines 467-482 with:

```javascript
document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  
  const bookId = getUrlParam('id');
  isPresetBook = getUrlParam('is_preset') === '1';
  
  if (!bookId) {
    window.location.href = 'bookshelf.html';
    return;
  }
  
  // Only require login for non-preset books
  if (!isPresetBook) {
    const userId = checkAuth();
    if (!userId) return;
  }
  
  await loadBook(bookId);
});
```

**Step 2: Modify import button behavior in book.html**

Find the import button click handler and modify to redirect to login if not logged in:

```javascript
async function handleImport() {
  const userId = getUserId();
  if (!userId) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
    return;
  }
  // existing import logic...
}
```

**Step 3: Modify chapter.html auth check**

Find and modify the auth check to allow preset book viewing:

```javascript
document.addEventListener('DOMContentLoaded', async function() {
  // ... existing particle code ...
  
  const chapterId = getUrlParam('id');
  const isPresetBook = getUrlParam('is_preset') === '1';
  
  // Only require login for non-preset books
  if (!isPresetBook) {
    const userId = checkAuth();
    if (!userId) return;
  }
  
  // ... rest of initialization ...
});
```

**Step 4: Commit**

```bash
git add src/frontend/book.html src/frontend/chapter.html
git commit -m "feat: allow non-login users to view preset books"
```

---

## Task 4: Apply 3D Book Card Styles to Library

**Files:**
- Modify: `src/frontend/library.html`
- Modify: `src/frontend/css/library.css`
- Modify: `src/frontend/js/library.js`

**Step 1: Update library.html book card structure**

Modify the `createBookCard` function in library.js to use 3D book structure:

```javascript
function createBookCard(book, index) {
  const div = document.createElement('div');
  div.className = 'book-3d';
  div.dataset.type = book.type;
  div.dataset.link = `book.html?id=${book.book_id}&is_preset=1`;
  div.style.animationDelay = `${index * 0.1}s`;
  
  const typeColors = {
    adventure: 'linear-gradient(135deg, #2a1a0a 0%, #1a0a00 100%)',
    fantasy: 'linear-gradient(135deg, #2a1a4a 0%, #1a0a2e 100%)',
    romance: 'linear-gradient(135deg, #4a1a2a 0%, #2a0a1e 100%)',
    business: 'linear-gradient(135deg, #1a2a3a 0%, #0a1a2e 100%)'
  };
  
  const typeIcons = {
    adventure: '🗺️',
    fantasy: '🧙',
    romance: '💕',
    business: '💼'
  };
  
  div.innerHTML = `
    <div class="book-cover" style="background: ${typeColors[book.type] || typeColors.adventure};">
      <span style="font-size: 48px;">${typeIcons[book.type] || '📖'}</span>
    </div>
    <div class="book-spine"></div>
    <div class="book-pages"></div>
    <div class="book-title">${book.title}</div>
    <div class="book-tag">${typeNames[book.type] || book.type}</div>
  `;
  
  div.addEventListener('click', () => {
    window.location.href = `book.html?id=${book.book_id}&is_preset=1`;
  });
  
  return div;
}
```

**Step 2: Add 3D book styles to library.css**

Add the following styles:

```css
.book-3d {
  position: relative;
  width: 150px;
  height: 200px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.book-3d:hover {
  transform: rotateY(-20deg) translateY(-10px);
}

.book-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px 10px 10px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  width: 15px;
  height: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 100%);
  border-radius: 5px 0 0 5px;
}

.book-pages {
  position: absolute;
  right: -5px;
  top: 5px;
  width: 5px;
  height: calc(100% - 10px);
  background: repeating-linear-gradient(
    180deg,
    #f4e4bc 0px,
    #f4e4bc 2px,
    #e8d4a8 2px,
    #e8d4a8 4px
  );
  border-radius: 0 3px 3px 0;
}

.book-title {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #ffd700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-tag {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
```

**Step 3: Update books grid container**

Modify the books grid to use the new layout:

```css
.books-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 60px 40px;
  justify-content: center;
  padding: 40px 20px;
  perspective: 1000px;
}
```

**Step 4: Commit**

```bash
git add src/frontend/library.html src/frontend/css/library.css src/frontend/js/library.js
git commit -m "feat: apply 3D book card styles to library"
```

---

## Task 5: Implement Chapter Pagination with Dual-Page Display

**Files:**
- Modify: `src/frontend/chapter.html` (CSS and JavaScript)

**Step 1: Add pagination CSS styles**

Add the following styles to chapter.html:

```css
.reading-content {
  position: relative;
  height: 100%;
  padding: 40px 35px;
  overflow: hidden;
  color: #1a1008;
  z-index: 1;
}

.page-content {
  height: 100%;
  overflow: hidden;
}

.page-text {
  height: calc(100% - 80px);
  overflow: hidden;
  line-height: 1.8;
  font-size: 18px;
}

.page-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #8B4513;
  opacity: 0.7;
}

.chapter-divider {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(139, 90, 43, 0.3);
  border-bottom: 1px solid rgba(139, 90, 43, 0.3);
  margin: 20px 0;
  font-style: italic;
  color: #8B4513;
}
```

**Step 2: Implement pagination JavaScript**

Add pagination logic:

```javascript
let currentPageIndex = 0;
let allPages = [];
let currentChapterIndex = 0;
let allChapters = [];

const LINES_PER_PAGE = 25;

function splitContentIntoPages(content) {
  const paragraphs = content.split('\n\n');
  const pages = [];
  let currentPage = '';
  let currentLines = 0;
  
  for (const para of paragraphs) {
    const lines = Math.ceil(para.length / 60);
    
    if (currentLines + lines > LINES_PER_PAGE && currentPage) {
      pages.push(currentPage);
      currentPage = para;
      currentLines = lines;
    } else {
      currentPage += (currentPage ? '\n\n' : '') + para;
      currentLines += lines;
    }
  }
  
  if (currentPage) {
    pages.push(currentPage);
  }
  
  return pages;
}

async function loadAllChapters(bookId) {
  try {
    const response = await API.getChapters(bookId);
    if (response.success) {
      allChapters = response.data || [];
    }
  } catch (error) {
    console.error('Failed to load chapters:', error);
  }
}

function renderCurrentPages() {
  const leftPage = document.querySelector('#leftPage .manuscript-text');
  const rightPage = document.querySelector('#rightPage .manuscript-text');
  
  const leftContent = getPageContent(currentPageIndex);
  const rightContent = getPageContent(currentPageIndex + 1);
  
  leftPage.innerHTML = leftContent;
  rightPage.innerHTML = rightContent;
  
  updateNavigationButtons();
  updatePageIndicator();
}

function getPageContent(pageIndex) {
  let content = '';
  let currentIdx = 0;
  
  for (let i = 0; i < allChapters.length; i++) {
    const chapter = allChapters[i];
    const chapterPages = splitContentIntoPages(chapter.content);
    
    if (currentIdx + chapterPages.length > pageIndex) {
      const pageInChapter = pageIndex - currentIdx;
      if (pageInChapter >= 0 && pageInChapter < chapterPages.length) {
        content = `<div class="chapter-header">
          <div class="chapter-num">CHAPTER ${romanNumerals[chapter.order_num - 1] || chapter.order_num}</div>
          <div class="chapter-name">${chapter.title}</div>
        </div>` + formatChapterContent(chapterPages[pageInChapter]);
        return content;
      }
    }
    
    currentIdx += chapterPages.length;
  }
  
  return '<p class="empty-page">No more content</p>';
}

function nextPage() {
  const totalPages = calculateTotalPages();
  if (currentPageIndex + 2 < totalPages) {
    currentPageIndex += 2;
    renderCurrentPages();
  }
}

function prevPage() {
  if (currentPageIndex > 0) {
    currentPageIndex = Math.max(0, currentPageIndex - 2);
    renderCurrentPages();
  }
}

function calculateTotalPages() {
  let total = 0;
  for (const chapter of allChapters) {
    total += splitContentIntoPages(chapter.content).length;
  }
  return total;
}

function updateNavigationButtons() {
  const prevBtn = document.querySelector('.scroll-nav-btn[onclick*="prev"]');
  const nextBtn = document.querySelector('.scroll-nav-btn[onclick*="next"]');
  const totalPages = calculateTotalPages();
  
  if (prevBtn) {
    prevBtn.disabled = currentPageIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentPageIndex + 2 >= totalPages;
  }
}
```

**Step 3: Update initialization**

Modify the chapter loading to use pagination:

```javascript
async function loadChapter(chapterId) {
  try {
    const response = await API.getChapter(chapterId);
    if (response.success) {
      currentChapter = response.data;
      
      // Load all chapters for pagination
      await loadAllChapters(currentChapter.book_id);
      
      // Find current chapter index
      currentChapterIndex = allChapters.findIndex(c => c.chapter_id === chapterId);
      
      // Calculate page index for current chapter
      currentPageIndex = 0;
      for (let i = 0; i < currentChapterIndex; i++) {
        currentPageIndex += splitContentIntoPages(allChapters[i].content).length;
      }
      
      renderCurrentPages();
      renderSidebarCards(currentChapter);
    }
  } catch (error) {
    showNotification('Failed to load chapter: ' + error.message, 'error');
  }
}
```

**Step 4: Commit**

```bash
git add src/frontend/chapter.html
git commit -m "feat: implement chapter pagination with dual-page display"
```

---

## Task 6: Write E2E Tests for New Features

**Files:**
- Create: `tests/e2e/chapter-pagination.spec.js`
- Modify: `tests/e2e/library.spec.js`
- Modify: `tests/e2e/bookshelf.spec.js`

**Step 1: Create chapter pagination tests**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('章节分页功能', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;

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

  test('章节页面应显示双页布局', async ({ page, request }) => {
    // Setup test data...
    await page.goto(`/chapter.html?id=${testChapterId}`);
    
    const leftPage = page.locator('#leftPage');
    const rightPage = page.locator('#rightPage');
    
    await expect(leftPage).toBeVisible();
    await expect(rightPage).toBeVisible();
  });

  test('翻页按钮应正确工作', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}`);
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    const prevBtn = page.locator('.scroll-nav-btn:has-text("Prev")');
    
    // Test next page
    if (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
    
    // Test prev page
    if (await prevBtn.isEnabled()) {
      await prevBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('章节边界应正确跨章节显示', async ({ page }) => {
    // Test chapter boundary behavior...
  });
});
```

**Step 2: Add tests for non-login preset book viewing**

Add to `library.spec.js`:

```javascript
test('未登录用户应能查看预设书籍详情', async ({ page }) => {
  await page.goto('/library.html');
  await page.waitForTimeout(1000);
  
  const firstBook = page.locator('.book-3d, .magic-book-card').first();
  await firstBook.click();
  
  await page.waitForURL(/book/, { timeout: 5000 });
  await page.waitForTimeout(1000);
  
  // Should show book content without login
  const chapterList = page.locator('.chapter-toc-item');
  await expect(chapterList.first()).toBeVisible();
});

test('未登录用户点击导入应跳转登录页', async ({ page }) => {
  await page.goto('/library.html');
  await page.waitForTimeout(1000);
  
  const firstBook = page.locator('.book-3d, .magic-book-card').first();
  await firstBook.click();
  
  await page.waitForURL(/book/, { timeout: 5000 });
  await page.waitForTimeout(1000);
  
  const importBtn = page.locator('button:has-text("Import")');
  await importBtn.click();
  
  await page.waitForURL(/login/, { timeout: 5000 });
  expect(page.url()).toContain('login');
});
```

**Step 3: Add tests for bookshelf without Preset Stories**

Add to `bookshelf.spec.js`:

```javascript
test('书架页面不应显示Preset Stories区域', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);
  
  await page.goto('/bookshelf.html');
  await page.waitForTimeout(1000);
  
  const presetSection = page.locator('text=Preset Stories');
  await expect(presetSection).not.toBeVisible();
});
```

**Step 4: Commit**

```bash
git add tests/e2e/chapter-pagination.spec.js tests/e2e/library.spec.js tests/e2e/bookshelf.spec.js
git commit -m "test: add E2E tests for UI improvements"
```

---

## Task 7: Run All Tests and Verify

**Step 1: Run E2E tests**

```bash
npx playwright test tests/e2e/chapter-pagination.spec.js --headed
npx playwright test tests/e2e/library.spec.js --headed
npx playwright test tests/e2e/bookshelf.spec.js --headed
```

**Step 2: Verify all tests pass**

Expected: All tests should pass.

**Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete UI improvements implementation"
```

---

## Summary of Changes

| Feature | Files Modified | Description |
|---------|---------------|-------------|
| Card Drop Modal Fix | `chapter.html` | Add missing style.css import |
| Remove Preset Stories | `bookshelf.html` | Remove Preset Stories section |
| Non-login Preset Viewing | `book.html`, `chapter.html` | Allow viewing preset books without login |
| 3D Book Cards | `library.html`, `library.css`, `library.js` | Apply 3D book card styles |
| Chapter Pagination | `chapter.html` | Implement dual-page pagination |
| E2E Tests | `*.spec.js` | Add tests for all features |
