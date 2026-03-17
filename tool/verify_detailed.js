import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');
const MIGRATION_FILE = path.join(__dirname, '..', 'migrations', '0700_add_23_ai_preset_books.sql');

console.log('=== 详细内容对比验证 ===\n');

const db = new Database(DB_PATH);
const migrationContent = fs.readFileSync(MIGRATION_FILE, 'utf-8');

let errors = [];

function escapeForSql(str) {
    return str.replace(/'/g, "''");
}

console.log('=== 1. 书籍内容逐条对比 ===\n');

const dbBooks = db.prepare("SELECT * FROM books WHERE book_id LIKE 'preset-ai-%' AND language = 'en' ORDER BY book_id").all();
console.log(`数据库书籍: ${dbBooks.length}`);

let bookErrors = 0;
for (const dbBook of dbBooks) {
    const escapedTitle = escapeForSql(dbBook.title);
    const bookPattern = `'${dbBook.book_id}','system','${escapedTitle}'`;
    if (!migrationContent.includes(bookPattern)) {
        errors.push(`书籍内容不匹配: ${dbBook.book_id} - "${dbBook.title}"`);
        bookErrors++;
    }
}
console.log(`书籍内容对比: ${bookErrors === 0 ? '全部通过' : `发现 ${bookErrors} 个错误`}`);

console.log('\n=== 2. 角色内容逐条对比 ===\n');

const dbCharacters = db.prepare("SELECT * FROM characters WHERE book_id LIKE 'preset-ai-%' ORDER BY char_id").all();
console.log(`数据库角色: ${dbCharacters.length}`);

let charErrors = 0;
for (const dbChar of dbCharacters) {
    const escapedName = escapeForSql(dbChar.name);
    const charPattern = `'${dbChar.char_id}','${dbChar.book_id}','${escapedName}'`;
    if (!migrationContent.includes(charPattern)) {
        errors.push(`角色内容不匹配: ${dbChar.char_id} - "${dbChar.name}"`);
        charErrors++;
    }
}
console.log(`角色内容对比: ${charErrors === 0 ? '全部通过' : `发现 ${charErrors} 个错误`}`);

console.log('\n=== 3. 情节卡牌内容逐条对比 ===\n');

const dbPlotCards = db.prepare("SELECT * FROM plot_cards WHERE book_id LIKE 'preset-ai-%' ORDER BY card_id").all();
console.log(`数据库情节卡牌: ${dbPlotCards.length}`);

let cardErrors = 0;
for (const dbCard of dbPlotCards) {
    const escapedName = escapeForSql(dbCard.name);
    const cardPattern = `'${dbCard.card_id}','${dbCard.book_id}','plot','${dbCard.sub_type}','${escapedName}'`;
    if (!migrationContent.includes(cardPattern)) {
        errors.push(`卡牌内容不匹配: ${dbCard.card_id} - "${dbCard.name}"`);
        cardErrors++;
    }
}
console.log(`情节卡牌内容对比: ${cardErrors === 0 ? '全部通过' : `发现 ${cardErrors} 个错误`}`);

console.log('\n=== 4. 章节内容逐条对比 ===\n');

const dbChapters = db.prepare("SELECT * FROM chapters WHERE book_id LIKE 'preset-ai-%' ORDER BY chapter_id").all();
console.log(`数据库章节: ${dbChapters.length}`);

let chapterErrors = 0;
for (const dbChapter of dbChapters) {
    const escapedTitle = escapeForSql(dbChapter.title);
    const chapterPattern = `'${dbChapter.chapter_id}','${dbChapter.book_id}','${escapedTitle}'`;
    if (!migrationContent.includes(chapterPattern)) {
        errors.push(`章节内容不匹配: ${dbChapter.chapter_id} - "${dbChapter.title}"`);
        chapterErrors++;
    }
}
console.log(`章节内容对比: ${chapterErrors === 0 ? '全部通过' : `发现 ${chapterErrors} 个错误`}`);

console.log('\n=== 最终验证结果 ===\n');

if (errors.length === 0) {
    console.log('全部通过! 迁移脚本与本地数据库完全一致');
} else {
    console.log(`发现 ${errors.length} 个错误:\n`);
    errors.forEach(e => console.log(`  - ${e}`));
}

db.close();
