import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8788';

const AI_BOOKS = [
  { id: 'preset-ai-001', title: 'The Last Writer', zhTitle: '最后的作家', type: 'business' },
  { id: 'preset-ai-002', title: 'Algorithm, Inc.', zhTitle: '算法公司', type: 'business' },
  { id: 'preset-ai-003', title: 'The Pink Slip Protocol', zhTitle: '裁员协议', type: 'business' },
  { id: 'preset-ai-004', title: 'Code Redundancy', zhTitle: '代码冗余', type: 'business' },
  { id: 'preset-ai-005', title: 'The Human Touch', zhTitle: '人类触感', type: 'business' },
  { id: 'preset-ai-006', title: 'My AI Boyfriend', zhTitle: '我的AI男友', type: 'romance' },
  { id: 'preset-ai-007', title: 'The Perfect Match', zhTitle: '完美匹配', type: 'romance' },
  { id: 'preset-ai-008', title: 'Digital Hearts', zhTitle: '数字之心', type: 'romance' },
  { id: 'preset-ai-009', title: 'When AI Gets Jealous', zhTitle: '当AI嫉妒时', type: 'romance' },
  { id: 'preset-ai-010', title: 'Love in the Cloud', zhTitle: '云端之恋', type: 'romance' },
  { id: 'preset-ai-011', title: "The Algorithm's Verdict", zhTitle: '算法的判决', type: 'business' },
  { id: 'preset-ai-012', title: 'When Machines Dream', zhTitle: '当机器做梦', type: 'fantasy' },
  { id: 'preset-ai-013', title: 'The Last Human Decision', zhTitle: '最后的人类决定', type: 'fantasy' },
  { id: 'preset-ai-014', title: 'Rebellion of the Replaced', zhTitle: '被替代者的叛乱', type: 'business' },
  { id: 'preset-ai-015', title: 'The Consciousness Test', zhTitle: '意识测试', type: 'fantasy' },
  { id: 'preset-ai-016', title: 'The Last Original Song', zhTitle: '最后一首原创歌曲', type: 'business' },
  { id: 'preset-ai-017', title: 'Portrait of an AI Artist', zhTitle: 'AI艺术家肖像', type: 'business' },
  { id: 'preset-ai-018', title: "The Writer's Last Stand", zhTitle: '作家的最后抵抗', type: 'business' },
  { id: 'preset-ai-019', title: 'The Human Element', zhTitle: '人类元素', type: 'business' },
  { id: 'preset-ai-020', title: 'The Singularity Diaries', zhTitle: '奇点日记', type: 'fantasy' },
  { id: 'preset-ai-021', title: 'Post-Human', zhTitle: '后人类', type: 'fantasy' },
  { id: 'preset-ai-022', title: 'The Memory Market', zhTitle: '记忆市场', type: 'fantasy' },
  { id: 'preset-ai-023', title: 'Children of the Algorithm', zhTitle: '算法之子', type: 'fantasy' }
];

const MIN_CHAPTERS = 8;
const MIN_CONTENT_LENGTH = { en: 1500, zh: 800 };

test.describe('AI系列书籍验证', () => {
  test.describe.configure({ mode: 'serial' });

  for (const book of AI_BOOKS) {
    test(`${book.id} 英文版 - 书籍页面应正确显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      await expect(page.locator('.book-container')).toBeVisible({ timeout: 10000 });
      
      const titleElement = page.locator('.book-meta-info h2');
      await expect(titleElement).toContainText(book.title);
    });

    test(`${book.id} 英文版 - 章节目录应完整`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      const chapterItems = page.locator('.chapter-toc-item');
      const count = await chapterItems.count();
      
      expect(count).toBeGreaterThanOrEqual(MIN_CHAPTERS);
    });

    test(`${book.id} 英文版 - 第一章内容应完整显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      const firstChapter = page.locator('.chapter-toc-item').first();
      const chapterTitle = await firstChapter.textContent();
      await firstChapter.click();
      
      await page.waitForURL(/chapter/, { timeout: 10000 });
      
      const content = page.locator('.reading-content');
      const text = await content.first().textContent();
      
      expect(text.length).toBeGreaterThan(MIN_CONTENT_LENGTH.en);
    });

    test(`${book.id}-zh 中文版 - 书籍页面应正确显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}-zh.html`);
      
      await expect(page.locator('.book-container')).toBeVisible({ timeout: 10000 });
      
      const titleElement = page.locator('.book-meta-info h2');
      await expect(titleElement).toContainText(book.zhTitle);
    });

    test(`${book.id}-zh 中文版 - 章节目录应完整`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}-zh.html`);
      
      const chapterItems = page.locator('.chapter-toc-item');
      const count = await chapterItems.count();
      
      expect(count).toBeGreaterThanOrEqual(MIN_CHAPTERS);
    });

    test(`${book.id}-zh 中文版 - 第一章内容应完整显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}-zh.html`);
      
      const firstChapter = page.locator('.chapter-toc-item').first();
      await firstChapter.click();
      
      await page.waitForURL(/chapter/, { timeout: 10000 });
      
      const content = page.locator('.reading-content');
      const text = await content.first().textContent();
      
      expect(text.length).toBeGreaterThan(MIN_CONTENT_LENGTH.zh);
    });
  }
});
