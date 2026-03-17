import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIN_CHAPTERS = 8;
const MIN_CONTENT_LENGTH = 1500;

function runQuery(query) {
  const result = execSync(
    `npx wrangler d1 execute storybook_database --local --command "${query.replace(/"/g, '\\"')}" --json`,
    { cwd: path.join(__dirname, '..'), encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  try {
    return JSON.parse(result);
  } catch {
    return null;
  }
}

function parseResult(jsonResult) {
  if (!jsonResult || !jsonResult[0] || !jsonResult[0].results) return [];
  return jsonResult[0].results;
}

async function main() {
  console.log('=== 验证所有AI系列英文书籍 ===\n');
  
  const booksResult = runQuery(`SELECT book_id, title, type FROM books WHERE book_id LIKE 'preset-ai-%' AND book_id NOT LIKE '%-zh' ORDER BY book_id`);
  const books = parseResult(booksResult);
  
  const results = [];
  
  for (const book of books) {
    const bookId = book.book_id;
    
    const chaptersResult = runQuery(`SELECT chapter_id, title, LENGTH(content) as len FROM chapters WHERE book_id = '${bookId}' ORDER BY order_num`);
    const chapters = parseResult(chaptersResult);
    
    const charsResult = runQuery(`SELECT COUNT(*) as count FROM characters WHERE book_id = '${bookId}'`);
    const charCount = parseResult(charsResult)[0]?.count || 0;
    
    const cardsResult = runQuery(`SELECT COUNT(*) as count FROM plot_cards WHERE book_id = '${bookId}'`);
    const cardCount = parseResult(cardsResult)[0]?.count || 0;
    
    const chapterCount = chapters.length;
    const shortChapters = chapters.filter(ch => ch.len < MIN_CONTENT_LENGTH);
    
    const status = {
      bookId,
      title: book.title,
      type: book.type,
      chapterCount,
      charCount,
      cardCount,
      shortChapters: shortChapters.length,
      valid: chapterCount >= MIN_CHAPTERS && shortChapters.length === 0 && charCount > 0 && cardCount > 0
    };
    
    results.push(status);
    
    const icon = status.valid ? '✅' : '❌';
    console.log(`${icon} ${bookId}: ${chapters.length}章, ${charCount}角色, ${cardCount}卡牌, 短章节:${shortChapters.length}`);
  }
  
  console.log('\n=== 验证结果汇总 ===');
  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);
  
  console.log(`✅ 通过: ${valid.length}本`);
  console.log(`❌ 失败: ${invalid.length}本`);
  
  if (invalid.length > 0) {
    console.log('\n需要修复的书籍:');
    invalid.forEach(r => {
      const issues = [];
      if (r.chapterCount < MIN_CHAPTERS) issues.push(`章节不足(${r.chapterCount}/${MIN_CHAPTERS})`);
      if (r.shortChapters > 0) issues.push(`短章节(${r.shortChapters})`);
      if (r.charCount === 0) issues.push('无角色');
      if (r.cardCount === 0) issues.push('无卡牌');
      console.log(`  - ${r.bookId}: ${issues.join(', ')}`);
    });
  }
}

main().catch(console.error);
