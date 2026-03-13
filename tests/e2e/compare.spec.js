import { test, expect } from '@playwright/test';

test.describe('对比测试', () => {
  test('对比书架页和公共图书馆的书籍展示', async ({ page }) => {
    // 访问公共图书馆
    await page.goto('http://127.0.0.1:8788/library.html');
    await page.waitForTimeout(2000);
    
    // 获取公共图书馆的书籍卡片结构
    const libraryBooks = await page.locator('.book-item').first();
    if (await libraryBooks.count() > 0) {
      const libraryHTML = await libraryBooks.innerHTML();
      console.log('\n=== 公共图书馆书籍卡片结构 ===');
      console.log(libraryHTML.substring(0, 500));
      
      // 获取书籍卡片的所有类名
      const libraryClasses = await page.locator('.book-item').first().evaluate(el => {
        return {
          itemClasses: el.className,
          children: Array.from(el.children).map(child => ({
            tag: child.tagName,
            classes: child.className,
            text: child.textContent?.substring(0, 50)
          }))
        };
      });
      console.log('\n公共图书馆书籍卡片类名:', JSON.stringify(libraryClasses, null, 2));
    }
    
    // 获取公共图书馆的 .book-3d 样式
    const book3dStyles = await page.locator('.book-3d').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        width: styles.width,
        height: styles.height,
        marginBottom: styles.marginBottom,
        display: styles.display
      };
    });
    console.log('\n公共图书馆 .book-3d 样式:', JSON.stringify(book3dStyles, null, 2));
    
    // 获取 .book-title 的位置
    const bookTitleStyles = await page.locator('.book-3d .book-title').first().evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        bottom: styles.bottom,
        top: styles.top,
        left: styles.left,
        transform: styles.transform,
        color: styles.color,
        // 检查是否在书籍上面（bottom 应该是正值，如 20px 或 10%）
        isInCorrectPosition: parseFloat(styles.bottom) > 0
      };
    });
    console.log('\n公共图书馆 .book-title 样式:', JSON.stringify(bookTitleStyles, null, 2));
    
    // 验证 .book-title 应该在书籍上面（bottom 为正值）
    expect(parseFloat(bookTitleStyles.bottom)).toBeGreaterThan(0);
    expect(bookTitleStyles.isInCorrectPosition).toBe(true);
  });

  test('对比项目章节页和Demo章节页', async ({ page }) => {
    // 首先获取一个预设章节ID
    await page.goto('http://127.0.0.1:8788/library.html');
    await page.waitForTimeout(2000);
    
    // 点击第一本书
    const firstBook = page.locator('.book-3d').first();
    await firstBook.click();
    await page.waitForTimeout(1000);
    
    // 获取章节链接
    const chapterLink = page.locator('.chapter-toc-item').first();
    let projectChapterUrl = '';
    if (await chapterLink.count() > 0) {
      projectChapterUrl = await chapterLink.getAttribute('href') || '';
    }
    
    let projectPageInfo = null;
    
    if (projectChapterUrl) {
      // 访问项目章节页
      await page.goto(`http://127.0.0.1:8788/${projectChapterUrl}`);
      await page.waitForTimeout(2000);
      
      // 获取项目章节页的关键元素
      projectPageInfo = await page.evaluate(() => {
        const body = document.body;
        const bodyStyles = window.getComputedStyle(body);
        const readingContent = document.querySelector('.reading-content');
        const leftPage = document.querySelector('#leftPage');
        const rightPage = document.querySelector('#rightPage');
        
        return {
          bodyBackground: bodyStyles.background,
          bodyOverflow: bodyStyles.overflow,
          htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
          readingContentOverflow: readingContent ? window.getComputedStyle(readingContent).overflow : null,
          leftPageContent: leftPage ? leftPage.innerHTML.substring(0, 200) : null,
          rightPageContent: rightPage ? rightPage.innerHTML.substring(0, 200) : null,
          hasScrollbar: document.body.scrollHeight > window.innerHeight
        };
      });
      
      console.log('\n=== 项目章节页信息 ===');
      console.log(JSON.stringify(projectPageInfo, null, 2));
    }
    
    // 访问 Demo 章节页
    await page.goto('http://127.0.0.1:8788/demo/chapter.html');
    await page.waitForTimeout(2000);
    
    // 获取 Demo 章节页的关键元素
    const demoPageInfo = await page.evaluate(() => {
      const body = document.body;
      const bodyStyles = window.getComputedStyle(body);
      const readingContent = document.querySelector('.reading-content');
      const leftPage = document.querySelector('#leftPage');
      const rightPage = document.querySelector('#rightPage');
      
      return {
        bodyBackground: bodyStyles.background,
        bodyOverflow: bodyStyles.overflow,
        htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
        readingContentOverflow: readingContent ? window.getComputedStyle(readingContent).overflow : null,
        leftPageContent: leftPage ? leftPage.innerHTML.substring(0, 200) : null,
        rightPageContent: rightPage ? rightPage.innerHTML.substring(0, 200) : null,
        hasScrollbar: document.body.scrollHeight > window.innerHeight
      };
    });
    
    console.log('\n=== Demo 章节页信息 ===');
    console.log(JSON.stringify(demoPageInfo, null, 2));
    
    // 对比差异
    console.log('\n=== 差异对比 ===');
    if (projectPageInfo && demoPageInfo) {
      console.log('body背景相同:', projectPageInfo.bodyBackground === demoPageInfo.bodyBackground);
      console.log('body overflow相同:', projectPageInfo.bodyOverflow === demoPageInfo.bodyOverflow);
      console.log('reading-content overflow相同:', projectPageInfo.readingContentOverflow === demoPageInfo.readingContentOverflow);
    }
  });
});
