import { test, expect } from '@playwright/test';
import { getPresetBooks, getCharacters, getPlotCards, getChapters, closeDb } from './helpers/db-queries.cjs';
import { loadPlotConfig, findCardInConfig, staticBookExists } from './helpers/preset-test-helpers.js';
import fs from 'fs';
import path from 'path';

const books = getPresetBooks();
const config = loadPlotConfig();

test.describe('阶段8：生成测试报告', () => {
  test('生成预设书籍测试报告', async () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalBooks: books.length,
        englishBooks: books.filter(b => b.language === 'en').length,
        chineseBooks: books.filter(b => b.language === 'zh').length
      },
      books: []
    };
    
    const issues = [];
    
    for (const book of books) {
      const bookReport = {
        bookId: book.book_id,
        title: book.title,
        type: book.type,
        language: book.language,
        checks: {}
      };
      
      bookReport.checks.staticFileExists = staticBookExists(book.book_id);
      if (!bookReport.checks.staticFileExists) {
        issues.push({
          bookId: book.book_id,
          issue: '静态HTML文件不存在',
          severity: 'high'
        });
      }
      
      const chapters = getChapters(book.book_id);
      bookReport.chapterCount = chapters.length;
      if (chapters.length === 0) {
        issues.push({
          bookId: book.book_id,
          issue: '无章节数据',
          severity: 'high'
        });
      }
      
      const characters = getCharacters(book.book_id);
      bookReport.characterCount = characters.length;
      bookReport.checks.hasProtagonist = characters.some(c => c.is_protagonist === 1);
      if (!bookReport.checks.hasProtagonist) {
        issues.push({
          bookId: book.book_id,
          issue: '缺少主角角色',
          severity: 'high'
        });
      }
      
      const plotCards = getPlotCards(book.book_id);
      bookReport.plotCardCount = plotCards.length;
      
      const missingCards = [];
      const mismatchedEmojis = [];
      
      for (const card of plotCards) {
        const result = findCardInConfig(card.name, card.icon, book.type, book.language, config);
        if (!result.found) {
          missingCards.push({
            name: card.name,
            icon: card.icon,
            sub_type: card.sub_type
          });
        } else if (!result.iconMatch) {
          mismatchedEmojis.push({
            name: card.name,
            expected: result.expectedIcon,
            actual: result.actualIcon
          });
        }
      }
      
      bookReport.checks.allCardsInConfig = missingCards.length === 0;
      bookReport.checks.allEmojisMatch = mismatchedEmojis.length === 0;
      
      if (missingCards.length > 0) {
        issues.push({
          bookId: book.book_id,
          issue: `卡牌配置缺失: ${missingCards.map(c => c.name).join(', ')}`,
          severity: 'medium',
          details: missingCards
        });
      }
      
      if (mismatchedEmojis.length > 0) {
        issues.push({
          bookId: book.book_id,
          issue: `卡牌emoji不匹配: ${mismatchedEmojis.map(c => `${c.name}(${c.actual}->${c.expected})`).join(', ')}`,
          severity: 'medium',
          details: mismatchedEmojis
        });
      }
      
      report.books.push(bookReport);
    }
    
    report.issues = issues;
    report.summary.totalIssues = issues.length;
    report.summary.highSeverityIssues = issues.filter(i => i.severity === 'high').length;
    report.summary.mediumSeverityIssues = issues.filter(i => i.severity === 'medium').length;
    
    const reportPath = path.join(process.cwd(), 'doc', 'preset-books-e2e-test-report.md');
    const content = generateMarkdownReport(report);
    fs.writeFileSync(reportPath, content);
    
    console.log('\n========================================');
    console.log('预设书籍端到端测试报告已生成');
    console.log(`报告路径: ${reportPath}`);
    console.log(`总书籍数: ${report.summary.totalBooks}`);
    console.log(`发现问题: ${report.summary.totalIssues}`);
    console.log(`高严重性问题: ${report.summary.highSeverityIssues}`);
    console.log(`中严重性问题: ${report.summary.mediumSeverityIssues}`);
    console.log('========================================\n');
    
    expect(fs.existsSync(reportPath)).toBe(true);
  });
});

function generateMarkdownReport(report) {
  const typeLabels = {
    adventure: '冒险',
    fantasy: '魔幻',
    romance: '言情',
    business: '职场'
  };
  
  let md = `# 预设书籍端到端测试报告

**生成时间:** ${report.generatedAt}

## 测试摘要

| 指标 | 数量 |
|------|------|
| 总书籍数 | ${report.summary.totalBooks} |
| 英文书籍 | ${report.summary.englishBooks} |
| 中文书籍 | ${report.summary.chineseBooks} |
| 发现问题 | ${report.summary.totalIssues} |
| 高严重性问题 | ${report.summary.highSeverityIssues} |
| 中严重性问题 | ${report.summary.mediumSeverityIssues} |

## 详细结果

### 英文书籍

| 书籍ID | 标题 | 类型 | 静态文件 | 章节 | 角色 | 主角 | 卡牌 | 配置存在 | Emoji匹配 |
|--------|------|------|----------|------|------|------|------|----------|-----------|
`;
  
  const englishBooks = report.books.filter(b => b.language === 'en');
  for (const book of englishBooks) {
    const staticIcon = book.checks.staticFileExists ? '✅' : '❌';
    const protagonistIcon = book.checks.hasProtagonist ? '✅' : '❌';
    const configIcon = book.checks.allCardsInConfig ? '✅' : '❌';
    const emojiIcon = book.checks.allEmojisMatch ? '✅' : '❌';
    
    md += `| ${book.bookId} | ${book.title} | ${typeLabels[book.type] || book.type} | ${staticIcon} | ${book.chapterCount} | ${book.characterCount} | ${protagonistIcon} | ${book.plotCardCount} | ${configIcon} | ${emojiIcon} |\n`;
  }
  
  md += `
### 中文书籍

| 书籍ID | 标题 | 类型 | 静态文件 | 章节 | 角色 | 主角 | 卡牌 | 配置存在 | Emoji匹配 |
|--------|------|------|----------|------|------|------|------|----------|-----------|
`;
  
  const chineseBooks = report.books.filter(b => b.language === 'zh');
  for (const book of chineseBooks) {
    const staticIcon = book.checks.staticFileExists ? '✅' : '❌';
    const protagonistIcon = book.checks.hasProtagonist ? '✅' : '❌';
    const configIcon = book.checks.allCardsInConfig ? '✅' : '❌';
    const emojiIcon = book.checks.allEmojisMatch ? '✅' : '❌';
    
    md += `| ${book.bookId} | ${book.title} | ${typeLabels[book.type] || book.type} | ${staticIcon} | ${book.chapterCount} | ${book.characterCount} | ${protagonistIcon} | ${book.plotCardCount} | ${configIcon} | ${emojiIcon} |\n`;
  }
  
  if (report.issues.length > 0) {
    md += `
## 问题列表

### 高严重性问题

| 书籍ID | 问题描述 |
|--------|----------|
`;
    const highIssues = report.issues.filter(i => i.severity === 'high');
    for (const issue of highIssues) {
      md += `| ${issue.bookId} | ${issue.issue} |\n`;
    }
    
    md += `
### 中严重性问题

| 书籍ID | 问题描述 | 详情 |
|--------|----------|------|
`;
    const mediumIssues = report.issues.filter(i => i.severity === 'medium');
    for (const issue of mediumIssues) {
      const details = issue.details ? JSON.stringify(issue.details) : '';
      md += `| ${issue.bookId} | ${issue.issue} | ${details.substring(0, 100)} |\n`;
    }
  } else {
    md += `
## 问题列表

✅ 未发现问题
`;
  }
  
  md += `
## 测试说明

本测试报告由Playwright端到端测试自动生成，测试内容包括：

1. **静态文件存在性检查** - 确认每本书的静态HTML文件存在
2. **章节数据验证** - 确认每本书有章节数据
3. **角色数据验证** - 确认每本书有角色数据且包含主角
4. **情节卡牌验证** - 确认每本书有情节卡牌数据
5. **卡牌配置验证** - 确认每张卡牌在项目配置中存在
6. **Emoji一致性验证** - 确认卡牌emoji与项目配置一致

**注意：本测试仅生成报告，不修复任何问题。**
`;
  
  return md;
}
