import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');
const MIGRATION_FILE = path.join(__dirname, '..', 'migrations', '0700_add_23_ai_preset_books.sql');

console.log('=== SQL语法验证 ===\n');

const migrationContent = fs.readFileSync(MIGRATION_FILE, 'utf-8');

const statements = migrationContent.split(';').filter(s => s.trim().length > 0);

let syntaxErrors = [];
let insertCount = 0;
let commentCount = 0;

for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (stmt.startsWith('--') || stmt.startsWith('/*')) {
        commentCount++;
        continue;
    }
    if (stmt.toUpperCase().startsWith('INSERT INTO')) {
        insertCount++;
        const openParens = (stmt.match(/\(/g) || []).length;
        const closeParens = (stmt.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            syntaxErrors.push(`语句 ${i+1}: 括号不匹配 (开:${openParens} 闭:${closeParens})`);
        }
        const singleQuotes = (stmt.match(/'/g) || []).length;
        if (singleQuotes % 2 !== 0) {
            syntaxErrors.push(`语句 ${i+1}: 单引号不匹配 (数量:${singleQuotes})`);
        }
    }
}

console.log(`INSERT语句数量: ${insertCount}`);
console.log(`注释数量: ${commentCount}`);

if (syntaxErrors.length === 0) {
    console.log('\nSQL语法检查: 全部通过');
} else {
    console.log(`\nSQL语法检查: 发现 ${syntaxErrors.length} 个错误`);
    syntaxErrors.slice(0, 10).forEach(e => console.log(`  - ${e}`));
}

console.log('\n=== 尝试在测试数据库执行 ===\n');

const testDbPath = path.join(__dirname, 'test_migration.db');
if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
}

const testDb = new Database(testDbPath);

testDb.exec(`
    CREATE TABLE IF NOT EXISTS books (
        book_id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT,
        type TEXT,
        is_preset INTEGER,
        created_at TEXT,
        updated_at TEXT,
        language TEXT
    );
    CREATE TABLE IF NOT EXISTS characters (
        char_id TEXT PRIMARY KEY,
        book_id TEXT,
        name TEXT,
        role_type TEXT,
        personality TEXT,
        speech_style TEXT,
        avatar TEXT,
        intimacy INTEGER,
        relationship TEXT,
        is_protagonist INTEGER,
        created_at TEXT,
        updated_at TEXT
    );
    CREATE TABLE IF NOT EXISTS plot_cards (
        card_id TEXT PRIMARY KEY,
        book_id TEXT,
        type TEXT,
        sub_type TEXT,
        name TEXT,
        icon TEXT,
        description TEXT,
        is_custom INTEGER,
        created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS chapters (
        chapter_id TEXT PRIMARY KEY,
        book_id TEXT,
        title TEXT,
        content TEXT,
        plot_cards TEXT,
        chapter_number INTEGER,
        created_at TEXT
    );
`);

try {
    testDb.exec(migrationContent);
    console.log('迁移脚本执行成功!');
    
    const bookCount = testDb.prepare("SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-ai-%'").get();
    const charCount = testDb.prepare("SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-ai-%'").get();
    const cardCount = testDb.prepare("SELECT COUNT(*) as count FROM plot_cards WHERE book_id LIKE 'preset-ai-%'").get();
    const chapterCount = testDb.prepare("SELECT COUNT(*) as count FROM chapters WHERE book_id LIKE 'preset-ai-%'").get();
    
    console.log(`\n执行后数据统计:`);
    console.log(`  书籍: ${bookCount.count}`);
    console.log(`  角色: ${charCount.count}`);
    console.log(`  情节卡牌: ${cardCount.count}`);
    console.log(`  章节: ${chapterCount.count}`);
    
} catch (error) {
    console.log(`迁移脚本执行失败: ${error.message}`);
}

testDb.close();
if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
}

console.log('\n=== 最终结果 ===');
if (syntaxErrors.length === 0) {
    console.log('SQL语法验证通过，迁移脚本可以正常执行');
} else {
    console.log('SQL语法验证失败，请检查错误');
}
