import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');
const SQL_BACKUP = path.join(__dirname, '..', 'backups', 'remote_storybook_database_backup.sql');

console.log('📦 从线上备份导入003和004系列数据');
console.log('数据库路径:', DB_PATH);
console.log('SQL备份路径:', SQL_BACKUP);

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ 数据库文件不存在');
  process.exit(1);
}

if (!fs.existsSync(SQL_BACKUP)) {
  console.error('❌ SQL备份文件不存在');
  process.exit(1);
}

const sqlContent = fs.readFileSync(SQL_BACKUP, 'utf-8');

const bookIds = [
  'preset-adventure-003', 'preset-adventure-004',
  'preset-adventure-003-en', 'preset-adventure-004-en',
  'preset-fantasy-003', 'preset-fantasy-004',
  'preset-fantasy-003-en', 'preset-fantasy-004-en',
  'preset-romance-003', 'preset-romance-004',
  'preset-romance-003-en', 'preset-romance-004-en',
  'preset-business-003', 'preset-business-004',
  'preset-business-003-en', 'preset-business-004-en'
];

const pattern = new RegExp(`INSERT INTO "books".*VALUES\\('.*?(?:${bookIds.join('|')}).*?'\\);`, 'g');
const booksMatches = sqlContent.match(pattern) || [];

const charPattern = new RegExp(`INSERT INTO "characters".*VALUES\\('.*?(?:${bookIds.join('|')}).*?'\\);`, 'g');
const charsMatches = sqlContent.match(charPattern) || [];

const chapterPattern = new RegExp(`INSERT INTO "chapters".*VALUES\\('.*?(?:${bookIds.join('|')}).*?'\\);`, 'g');
const chaptersMatches = sqlContent.match(chapterPattern) || [];

const plotCardPattern = new RegExp(`INSERT INTO "plot_cards".*VALUES\\('.*?(?:${bookIds.join('|')}).*?'\\);`, 'g');
const plotCardsMatches = sqlContent.match(plotCardPattern) || [];

console.log(`\n📊 找到数据:`);
console.log(`  书籍: ${booksMatches.length}`);
console.log(`  角色: ${charsMatches.length}`);
console.log(`  章节: ${chaptersMatches.length}`);
console.log(`  情节卡牌: ${plotCardsMatches.length}`);

const db = new Database(DB_PATH);

console.log('\n📝 导入数据...');

const importStatements = [
  ...booksMatches,
  ...charsMatches,
  ...chaptersMatches,
  ...plotCardsMatches
];

let successCount = 0;
let errorCount = 0;

const execMany = db.transaction((statements) => {
  for (const stmt of statements) {
    try {
      db.exec(stmt);
      successCount++;
    } catch (err) {
      errorCount++;
      if (errorCount <= 5) {
        console.error(`  错误: ${err.message.substring(0, 100)}`);
      }
    }
  }
});

execMany(importStatements);

console.log(`\n✅ 导入完成: 成功 ${successCount}, 失败 ${errorCount}`);

console.log('\n📊 验证导入结果...');
const bookCount = db.prepare("SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
const charCount = db.prepare("SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
const chapterCount = db.prepare("SELECT COUNT(*) as count FROM chapters WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
const plotCardCount = db.prepare("SELECT COUNT(*) as count FROM plot_cards WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();

console.log(`  书籍: ${bookCount.count}`);
console.log(`  角色: ${charCount.count}`);
console.log(`  章节: ${chapterCount.count}`);
console.log(`  情节卡牌: ${plotCardCount.count}`);

db.close();
console.log('\n✅ 导入完成！');
