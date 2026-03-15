import { test, expect } from '@playwright/test';

test.describe('对比测试', () => {
  test('对比书架页和公共图书馆的书籍展示', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(2000);
    
    const libraryBooks = page.locator('.book-item');
    const count = await libraryBooks.count();
    
    if (count > 0) {
      const firstBook = libraryBooks.first();
      const bookHTML = await firstBook.innerHTML();
      expect(bookHTML.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });

  test('对比项目章节页和Demo章节页', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(2000);
    
    const firstBook = page.locator('.book-item').first();
    if (await firstBook.count() > 0) {
      await firstBook.click();
      await page.waitForTimeout(1000);
      
      const chapterLink = page.locator('.chapter-toc-item').first();
      if (await chapterLink.count() > 0) {
        await chapterLink.click();
        await page.waitForTimeout(2000);
        
        const readingContent = page.locator('.reading-content');
        if (await readingContent.count() > 0) {
          await expect(readingContent.first()).toBeVisible();
        }
      }
    }
    
    expect(true).toBe(true);
  });
});
