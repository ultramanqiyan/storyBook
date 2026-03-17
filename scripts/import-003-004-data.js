import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

const booksData = [
  { book_id: 'preset-adventure-003', user_id: 'system', title: '丛林奇遇记', type: 'adventure', is_preset: 1, language: 'zh' },
  { book_id: 'preset-adventure-004', user_id: 'system', title: '极地探险队', type: 'adventure', is_preset: 1, language: 'zh' },
  { book_id: 'preset-adventure-003-en', user_id: 'system', title: 'Jungle Adventures', type: 'adventure', is_preset: 1, language: 'en' },
  { book_id: 'preset-adventure-004-en', user_id: 'system', title: 'Polar Expedition', type: 'adventure', is_preset: 1, language: 'en' },
  { book_id: 'preset-fantasy-003', user_id: 'system', title: '龙族守护者', type: 'fantasy', is_preset: 1, language: 'zh' },
  { book_id: 'preset-fantasy-004', user_id: 'system', title: '魔法学院大逃亡', type: 'fantasy', is_preset: 1, language: 'zh' },
  { book_id: 'preset-fantasy-003-en', user_id: 'system', title: 'Dragon Guardian', type: 'fantasy', is_preset: 1, language: 'en' },
  { book_id: 'preset-fantasy-004-en', user_id: 'system', title: 'Magic Academy Escape', type: 'fantasy', is_preset: 1, language: 'en' },
  { book_id: 'preset-romance-003', user_id: 'system', title: '咖啡店的邂逅', type: 'romance', is_preset: 1, language: 'zh' },
  { book_id: 'preset-romance-004', user_id: 'system', title: '青梅竹马的重逢', type: 'romance', is_preset: 1, language: 'zh' },
  { book_id: 'preset-romance-003-en', user_id: 'system', title: 'Cafe Encounter', type: 'romance', is_preset: 1, language: 'en' },
  { book_id: 'preset-romance-004-en', user_id: 'system', title: 'Childhood Sweethearts', type: 'romance', is_preset: 1, language: 'en' },
  { book_id: 'preset-business-003', user_id: 'system', title: '创业合伙人', type: 'business', is_preset: 1, language: 'zh' },
  { book_id: 'preset-business-004', user_id: 'system', title: '职场新人逆袭记', type: 'business', is_preset: 1, language: 'zh' },
  { book_id: 'preset-business-003-en', user_id: 'system', title: 'Startup Partners', type: 'business', is_preset: 1, language: 'en' },
  { book_id: 'preset-business-004-en', user_id: 'system', title: 'Rookie Rising', type: 'business', is_preset: 1, language: 'en' },
];

const charactersData = [
  { char_id: 'char-adv003-001', book_id: 'preset-adventure-003', name: '小森', role_type: '丛林探险家', personality: '勇敢善良、热爱自然、善于观察', speech_style: '温和亲切，喜欢用自然比喻', avatar: '👦', intimacy: null, relationship: null, is_protagonist: 1 },
  { char_id: 'char-adv003-002', book_id: 'preset-adventure-003', name: '小叶', role_type: '森林精灵', personality: '活泼可爱、知识丰富、守护森林', speech_style: '俏皮灵动，喜欢用植物比喻', avatar: '🍃', intimacy: 65, relationship: '向导', is_protagonist: 0 },
  { char_id: 'char-adv003-003', book_id: 'preset-adventure-003', name: '林爷爷', role_type: '森林护林员', personality: '慈祥智慧、了解丛林秘密', speech_style: '讲故事般娓娓道来', avatar: '👴', intimacy: 45, relationship: '导师', is_protagonist: 0 },
  { char_id: 'char-adv003-001-en', book_id: 'preset-adventure-003-en', name: 'Forest', role_type: 'Jungle Explorer', personality: 'brave, kind, nature lover, observant', speech_style: 'gentle, uses nature metaphors', avatar: '👦', intimacy: null, relationship: null, is_protagonist: 1 },
  { char_id: 'char-adv003-002-en', book_id: 'preset-adventure-003-en', name: 'Leaf', role_type: 'Forest Spirit', personality: 'playful, knowledgeable, forest guardian', speech_style: 'cheerful, plant puns', avatar: '🍃', intimacy: 65, relationship: 'guide', is_protagonist: 0 },
  { char_id: 'char-adv003-003-en', book_id: 'preset-adventure-003-en', name: 'Grandpa Wood', role_type: 'Forest Ranger', personality: 'wise, knows jungle secrets', speech_style: 'storytelling style', avatar: '👴', intimacy: 45, relationship: 'mentor', is_protagonist: 0 },
  { char_id: 'char-adv004-001', book_id: 'preset-adventure-004', name: '小雪', role_type: '极地探险家', personality: '冷静沉稳、善于分析、热爱冰雪', speech_style: '简洁有力，喜欢用冰雪比喻', avatar: '👧', intimacy: null, relationship: null, is_protagonist: 1 },
  { char_id: 'char-adv004-002', book_id: 'preset-adventure-004', name: '小冰', role_type: '北极熊精灵', personality: '憨厚可爱、力量强大、保护朋友', speech_style: '憨憨的，说话慢吞吞', avatar: '🐻‍❄️', intimacy: 60, relationship: '向导', is_protagonist: 0 },
  { char_id: 'char-adv004-003', book_id: 'preset-adventure-004', name: '陈博士', role_type: '极地科学家', personality: '严谨认真、热爱科研、关心环境', speech_style: '专业术语，喜欢解释', avatar: '👨‍🔬', intimacy: 40, relationship: '导师', is_protagonist: 0 },
  { char_id: 'char-adv004-001-en', book_id: 'preset-adventure-004-en', name: 'Crystal', role_type: 'Polar Explorer', personality: 'calm, analytical, loves ice and snow', speech_style: 'concise, ice metaphors', avatar: '👧', intimacy: null, relationship: null, is_protagonist: 1 },
  { char_id: 'char-adv004-002-en', book_id: 'preset-adventure-004-en', name: 'Frost', role_type: 'Polar Bear Spirit', personality: 'gentle giant, powerful, protective', speech_style: 'slow, warm-hearted', avatar: '🐻‍❄️', intimacy: 60, relationship: 'guide', is_protagonist: 0 },
  { char_id: 'char-adv004-003-en', book_id: 'preset-adventure-004-en', name: 'Dr. Chen', role_type: 'Polar Scientist', personality: 'serious, passionate, environmentalist', speech_style: 'scientific, explanatory', avatar: '👨‍🔬', intimacy: 40, relationship: 'mentor', is_protagonist: 0 },
];

console.log('📦 导入003和004系列数据到本地数据库');
console.log('数据库路径:', DB_PATH);

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ 数据库文件不存在');
  process.exit(1);
}

const db = new Database(DB_PATH);

console.log('\n📊 导入前检查...');
const beforeBooks = db.prepare("SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
console.log('导入前书籍数量:', beforeBooks.count);

console.log('\n📝 插入书籍数据...');
const insertBook = db.prepare(`
  INSERT OR REPLACE INTO books (book_id, user_id, title, type, is_preset, created_at, updated_at, language)
  VALUES (@book_id, @user_id, @title, @type, @is_preset, datetime('now'), datetime('now'), @language)
`);

const insertBooks = db.transaction((books) => {
  for (const book of books) {
    insertBook.run(book);
  }
});

insertBooks(booksData);
console.log('✅ 插入', booksData.length, '本书籍');

console.log('\n📝 插入角色数据...');
const insertChar = db.prepare(`
  INSERT OR REPLACE INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist, created_at, updated_at)
  VALUES (@char_id, @book_id, @name, @role_type, @personality, @speech_style, @avatar, @intimacy, @relationship, @is_protagonist, datetime('now'), datetime('now'))
`);

const insertChars = db.transaction((chars) => {
  for (const char of chars) {
    insertChar.run(char);
  }
});

insertChars(charactersData);
console.log('✅ 插入', charactersData.length, '个角色');

console.log('\n📊 导入后验证...');
const afterBooks = db.prepare("SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
const afterChars = db.prepare("SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%'").get();
console.log('导入后书籍数量:', afterBooks.count);
console.log('导入后角色数量:', afterChars.count);

const bookList = db.prepare("SELECT book_id, title, language FROM books WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%' ORDER BY book_id").all();
console.log('\n📚 导入的书籍列表:');
bookList.forEach(book => {
  console.log(`  - ${book.book_id}: ${book.title} (${book.language})`);
});

db.close();
console.log('\n✅ 导入完成！');
