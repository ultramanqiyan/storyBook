import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');
const MIGRATION_FILE = path.join(__dirname, '..', 'migrations', '0700_add_23_ai_preset_books.sql');

console.log('=== 本地数据库与迁移脚本对比验证 ===\n');

if (!fs.existsSync(DB_PATH)) {
    console.error('错误: 本地数据库文件不存在');
    console.log('数据库路径:', DB_PATH);
    process.exit(1);
}

const db = new Database(DB_PATH);
const migrationContent = fs.readFileSync(MIGRATION_FILE, 'utf-8');

const dbBooks = db.prepare("SELECT * FROM books WHERE book_id LIKE 'preset-ai-%' AND language = 'en' ORDER BY book_id").all();
const dbCharacters = db.prepare("SELECT * FROM characters WHERE book_id LIKE 'preset-ai-%' ORDER BY char_id").all();
const dbPlotCards = db.prepare("SELECT * FROM plot_cards WHERE book_id LIKE 'preset-ai-%' ORDER BY card_id").all();
const dbChapters = db.prepare("SELECT * FROM chapters WHERE book_id LIKE 'preset-ai-%' ORDER BY chapter_id").all();

console.log('=== 数据库数据统计 ===');
console.log(`书籍: ${dbBooks.length}`);
console.log(`角色: ${dbCharacters.length}`);
console.log(`情节卡牌: ${dbPlotCards.length}`);
console.log(`章节: ${dbChapters.length}`);

const migBooks = migrationContent.match(/INSERT INTO "books".*?VALUES\('preset-ai-\d+'.*?'en'\);/g) || [];
const migCharacters = migrationContent.match(/INSERT INTO "characters".*?preset-ai-\d+.*?/g) || [];
const migPlotCards = migrationContent.match(/INSERT INTO "plot_cards".*?preset-ai-\d+.*?/g) || [];
const migChapters = migrationContent.match(/INSERT INTO "chapters".*?preset-ai-\d+.*?/g) || [];

console.log('\n=== 迁移脚本数据统计 ===');
console.log(`书籍: ${migBooks.length}`);
console.log(`角色: ${migCharacters.length}`);
console.log(`情节卡牌: ${migPlotCards.length}`);
console.log(`章节: ${migChapters.length}`);

console.log('\n=== 详细对比 ===');

const dbBookIds = dbBooks.map(b => b.book_id).sort();
const migBookIds = migBooks.map(m => {
    const match = m.match(/'preset-ai-\d+'/);
    return match ? match[0].replace(/'/g, '') : null;
}).filter(Boolean).sort();

console.log('\n书籍ID对比:');
console.log(`  数据库: ${dbBookIds.length} 个`);
console.log(`  迁移脚本: ${migBookIds.length} 个`);

const missingBooks = dbBookIds.filter(id => !migBookIds.includes(id));
const extraBooks = migBookIds.filter(id => !dbBookIds.includes(id));

if (missingBooks.length > 0) console.log(`  缺失: ${missingBooks.join(', ')}`);
if (extraBooks.length > 0) console.log(`  多余: ${extraBooks.join(', ')}`);
if (missingBooks.length === 0 && extraBooks.length === 0) console.log('  状态: OK');

const dbCharIds = dbCharacters.map(c => c.char_id).sort();
const migCharIds = migCharacters.map(m => {
    const match = m.match(/'char-ai\d+-\d+'/);
    return match ? match[0].replace(/'/g, '') : null;
}).filter(Boolean).sort();

console.log('\n角色ID对比:');
console.log(`  数据库: ${dbCharIds.length} 个`);
console.log(`  迁移脚本: ${migCharIds.length} 个`);

const missingChars = dbCharIds.filter(id => !migCharIds.includes(id));
const extraChars = migCharIds.filter(id => !dbCharIds.includes(id));

if (missingChars.length > 0) console.log(`  缺失: ${missingChars.slice(0, 5).join(', ')}${missingChars.length > 5 ? '...' : ''}`);
if (extraChars.length > 0) console.log(`  多余: ${extraChars.slice(0, 5).join(', ')}${extraChars.length > 5 ? '...' : ''}`);
if (missingChars.length === 0 && extraChars.length === 0) console.log('  状态: OK');

const dbCardIds = dbPlotCards.map(c => c.card_id).sort();
const migCardIds = migPlotCards.map(m => {
    const match = m.match(/'card-ai\d+-\w+'/);
    return match ? match[0].replace(/'/g, '') : null;
}).filter(Boolean).sort();

console.log('\n情节卡牌ID对比:');
console.log(`  数据库: ${dbCardIds.length} 个`);
console.log(`  迁移脚本: ${migCardIds.length} 个`);

const missingCards = dbCardIds.filter(id => !migCardIds.includes(id));
const extraCards = migCardIds.filter(id => !dbCardIds.includes(id));

if (missingCards.length > 0) console.log(`  缺失: ${missingCards.slice(0, 5).join(', ')}${missingCards.length > 5 ? '...' : ''}`);
if (extraCards.length > 0) console.log(`  多余: ${extraCards.slice(0, 5).join(', ')}${extraCards.length > 5 ? '...' : ''}`);
if (missingCards.length === 0 && extraCards.length === 0) console.log('  状态: OK');

const dbChapterIds = dbChapters.map(c => c.chapter_id).sort();
const migChapterIds = migChapters.map(m => {
    const match = m.match(/'chapter-ai\d+-\d+'/);
    return match ? match[0].replace(/'/g, '') : null;
}).filter(Boolean).sort();

console.log('\n章节ID对比:');
console.log(`  数据库: ${dbChapterIds.length} 个`);
console.log(`  迁移脚本: ${migChapterIds.length} 个`);

const missingChapters = dbChapterIds.filter(id => !migChapterIds.includes(id));
const extraChapters = migChapterIds.filter(id => !dbChapterIds.includes(id));

if (missingChapters.length > 0) console.log(`  缺失: ${missingChapters.slice(0, 5).join(', ')}${missingChapters.length > 5 ? '...' : ''}`);
if (extraChapters.length > 0) console.log(`  多余: ${extraChapters.slice(0, 5).join(', ')}${extraChapters.length > 5 ? '...' : ''}`);
if (missingChapters.length === 0 && extraChapters.length === 0) console.log('  状态: OK');

const allOk = missingBooks.length === 0 && extraBooks.length === 0 &&
              missingChars.length === 0 && extraChars.length === 0 &&
              missingCards.length === 0 && extraCards.length === 0 &&
              missingChapters.length === 0 && extraChapters.length === 0;

console.log('\n=== 最终结果 ===');
if (allOk) {
    console.log('全部通过! 迁移脚本与本地数据库完全一致');
} else {
    console.log('存在差异! 请检查上述错误');
}

db.close();
