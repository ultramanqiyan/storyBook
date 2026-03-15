import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('Debug Puzzle Button', () => {
  
  test('检查API返回的章节数据是否包含puzzle_id', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001-en`);
    const data = await response.json();
    
    console.log('API Response:', JSON.stringify(data.data, null, 2));
    
    const chaptersWithPuzzle = data.data.filter(c => c.puzzle_id);
    console.log(`\n章节总数: ${data.data.length}`);
    console.log(`有puzzle的章节数: ${chaptersWithPuzzle.length}`);
    
    for (const chapter of data.data) {
      console.log(`Chapter ${chapter.order_num}: puzzle_id = ${chapter.puzzle_id || 'null'}`);
    }
    
    expect(chaptersWithPuzzle.length).toBeGreaterThan(0);
  });

  test('检查章节内容长度和分页', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001-en`);
    const data = await response.json();
    
    const CHARS_PER_PAGE = 1500;
    
    for (const chapter of data.data.slice(0, 3)) {
      const contentLength = chapter.content?.length || 0;
      const pageCount = Math.ceil(contentLength / CHARS_PER_PAGE);
      console.log(`Chapter ${chapter.order_num}: content length = ${contentLength}, estimated pages = ${pageCount || 1}`);
      console.log(`  puzzle_id = ${chapter.puzzle_id || 'null'}`);
    }
  });

  test('直接访问有puzzle的章节页面', async ({ page }) => {
    await page.goto(`${BASE_URL}/chapter.html?id=chapter-adv001-03-en`);
    await page.waitForTimeout(3000);
    
    const url = page.url();
    console.log('URL:', url);
    console.log('is_preset param:', url.includes('is_preset'));
    
    const pageContent = await page.content();
    const hasPuzzleTrigger = pageContent.includes('puzzle-trigger');
    const hasPuzzleButton = pageContent.includes('Solve the Guardian');
    
    console.log('Has puzzle-trigger class:', hasPuzzleTrigger);
    console.log('Has puzzle button:', hasPuzzleButton);
    
    const readingContent = await page.$('.reading-content');
    if (readingContent) {
      const html = await readingContent.innerHTML();
      console.log('Reading content length:', html.length);
      console.log('Reading content (last 500 chars):', html.slice(-500));
    }
  });

  test('访问非预设章节页面（模拟用户创建）', async ({ page }) => {
    await page.goto(`${BASE_URL}/chapter.html?id=chapter-adv001-03-en`);
    await page.waitForTimeout(3000);
    
    const pageContent = await page.content();
    
    const isPresetChapter = pageContent.includes('is_preset=1') || page.url().includes('is_preset=1');
    console.log('isPresetChapter:', isPresetChapter);
    
    const hasPuzzleTrigger = pageContent.includes('puzzle-trigger');
    console.log('Has puzzle-trigger:', hasPuzzleTrigger);
    
    const readingContent = await page.$('.reading-content');
    if (readingContent) {
      const html = await readingContent.innerHTML();
      console.log('Content includes puzzle-trigger:', html.includes('puzzle-trigger'));
    }
  });
});
