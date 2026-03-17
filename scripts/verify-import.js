import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

const db = new Database(DB_PATH);

console.log('=== 验证16本预设书籍数据完整性 ===');

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

let allValid = true;
let totalBooks = 0, totalChars = 0, totalChapters = 0, totalCards = 0, totalPuzzles = 0;

for (const bookId of bookIds) {
  const book = db.prepare('SELECT * FROM books WHERE book_id = ?').get(bookId);
  const chars = db.prepare('SELECT COUNT(*) as c FROM characters WHERE book_id = ?').get(bookId);
  const chapters = db.prepare('SELECT COUNT(*) as c FROM chapters WHERE book_id = ?').get(bookId);
  const cards = db.prepare('SELECT COUNT(*) as c FROM plot_cards WHERE book_id = ?').get(bookId);
  
  if (!book) {
    console.log('❌ 书籍不存在: ' + bookId);
    allValid = false;
  } else {
    totalBooks++;
    totalChars += chars.c;
    totalChapters += chapters.c;
    totalCards += cards.c;
    console.log('✅ ' + bookId + ': 角色=' + chars.c + ', 章节=' + chapters.c + ', 卡牌=' + cards.c);
  }
}

const puzzles = db.prepare("SELECT COUNT(*) as c FROM puzzles WHERE chapter_id LIKE 'chapter-adv00%' OR chapter_id LIKE 'chapter-fan00%' OR chapter_id LIKE 'chapter-rom00%' OR chapter_id LIKE 'chapter-bus00%'").get();
totalPuzzles = puzzles.c;

console.log('');
console.log('=== 总计 ===');
console.log('书籍: ' + totalBooks + '/16');
console.log('角色: ' + totalChars + '/48');
console.log('章节: ' + totalChapters + '/159 (线上原始数据)');
console.log('卡牌: ' + totalCards + '/320');
console.log('谜题: ' + totalPuzzles + '/48');

if (allValid && totalBooks === 16 && totalChars === 48 && totalCards === 320 && totalPuzzles === 48) {
  console.log('');
  console.log('✅ 所有数据验证通过！');
} else {
  console.log('');
  console.log('⚠️ 数据验证存在问题');
}

db.close();
