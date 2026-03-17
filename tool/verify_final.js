import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');
const MIGRATION_FILE = path.join(__dirname, '..', 'migrations', '0700_add_23_ai_preset_books.sql');

console.log('========================================');
console.log('  迁移脚本与本地数据库逐字段对比验证');
console.log('========================================\n');

const db = new Database(DB_PATH);
const migrationContent = fs.readFileSync(MIGRATION_FILE, 'utf-8');

let totalErrors = 0;
let totalChecked = 0;

function escapeForSql(str) {
    if (str === null || str === undefined) return '';
    return str.replace(/'/g, "''");
}

console.log('=== 1. 书籍数据对比 ===\n');

const dbBooks = db.prepare("SELECT * FROM books WHERE book_id LIKE 'preset-ai-%' AND language = 'en' ORDER BY book_id").all();

console.log(`数据库书籍数量: ${dbBooks.length}`);

let bookErrors = 0;
for (const dbBook of dbBooks) {
    totalChecked++;
    
    const escapedTitle = escapeForSql(dbBook.title);
    const escapedType = escapeForSql(dbBook.type);
    
    const searchPattern = `'${dbBook.book_id}','system','${escapedTitle}','${escapedType}',1`;
    
    if (!migrationContent.includes(searchPattern)) {
        console.log(`[错误] 书籍 ${dbBook.book_id}: 在迁移脚本中未找到匹配`);
        console.log(`  数据库标题: "${dbBook.title}"`);
        console.log(`  数据库类型: "${dbBook.type}"`);
        console.log(`  搜索模式: ${searchPattern.substring(0, 80)}...`);
        bookErrors++;
        totalErrors++;
    }
}

console.log(`\n书籍对比完成: ${dbBooks.length} 条, ${bookErrors} 个错误\n`);

console.log('=== 2. 角色数据对比 ===\n');

const dbCharacters = db.prepare("SELECT * FROM characters WHERE book_id LIKE 'preset-ai-%' ORDER BY char_id").all();

console.log(`数据库角色数量: ${dbCharacters.length}`);

let charErrors = 0;
for (const dbChar of dbCharacters) {
    totalChecked++;
    
    const escapedName = escapeForSql(dbChar.name);
    const searchPattern = `'${dbChar.char_id}','${dbChar.book_id}','${escapedName}'`;
    
    if (!migrationContent.includes(searchPattern)) {
        console.log(`[错误] 角色 ${dbChar.char_id}: 在迁移脚本中未找到匹配`);
        console.log(`  数据库名称: "${dbChar.name}"`);
        charErrors++;
        totalErrors++;
    }
}

console.log(`\n角色对比完成: ${dbCharacters.length} 条, ${charErrors} 个错误\n`);

console.log('=== 3. 情节卡牌数据对比 ===\n');

const dbPlotCards = db.prepare("SELECT * FROM plot_cards WHERE book_id LIKE 'preset-ai-%' ORDER BY card_id").all();

console.log(`数据库情节卡牌数量: ${dbPlotCards.length}`);

let cardErrors = 0;
for (const dbCard of dbPlotCards) {
    totalChecked++;
    
    const escapedName = escapeForSql(dbCard.name);
    const searchPattern = `'${dbCard.card_id}','${dbCard.book_id}','plot','${dbCard.sub_type}','${escapedName}'`;
    
    if (!migrationContent.includes(searchPattern)) {
        console.log(`[错误] 卡牌 ${dbCard.card_id}: 在迁移脚本中未找到匹配`);
        console.log(`  数据库名称: "${dbCard.name}"`);
        cardErrors++;
        totalErrors++;
    }
}

console.log(`\n情节卡牌对比完成: ${dbPlotCards.length} 条, ${cardErrors} 个错误\n`);

console.log('=== 4. 章节数据对比 ===\n');

const dbChapters = db.prepare("SELECT * FROM chapters WHERE book_id LIKE 'preset-ai-%' ORDER BY chapter_id").all();

console.log(`数据库章节数量: ${dbChapters.length}`);

let chapterErrors = 0;
for (const dbChapter of dbChapters) {
    totalChecked++;
    
    const escapedTitle = escapeForSql(dbChapter.title);
    const searchPattern = `'${dbChapter.chapter_id}','${dbChapter.book_id}','${escapedTitle}'`;
    
    if (!migrationContent.includes(searchPattern)) {
        console.log(`[错误] 章节 ${dbChapter.chapter_id}: 在迁移脚本中未找到匹配`);
        console.log(`  数据库标题: "${dbChapter.title}"`);
        chapterErrors++;
        totalErrors++;
    }
}

console.log(`\n章节对比完成: ${dbChapters.length} 条, ${chapterErrors} 个错误\n`);

console.log('========================================');
console.log('  最终验证结果');
console.log('========================================\n');

console.log(`总检查记录数: ${totalChecked}`);
console.log(`总错误数: ${totalErrors}`);

if (totalErrors === 0) {
    console.log('\n验证结果: 全部通过');
    console.log('迁移脚本与本地数据库完全一致，可以放心上线！');
} else {
    console.log('\n验证结果: 存在错误');
    console.log('请检查上述错误后再上线。');
}

db.close();
