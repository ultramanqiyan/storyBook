import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const LOGS_PATH = path.join(__dirname, '..', 'logs');
const SQL_OUTPUT_PATH = path.join(__dirname, '..', 'sql');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function escapeSql(str) {
  if (!str) return "''";
  return "'" + str.replace(/'/g, "''").replace(/\n/g, ' ').replace(/\r/g, '') + "'";
}

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function generateBookId(bookData, config) {
  return `${config.defaults.book_id_prefix}${bookData.dirName}`;
}

function generateChapterId(bookData, orderNum, config) {
  return `${config.defaults.chapter_id_prefix}${bookData.dirName}-${String(orderNum).padStart(2, '0')}`;
}

function generateCharId(bookData, index, config) {
  return `${config.defaults.char_id_prefix}${bookData.dirName}-${String(index + 1).padStart(3, '0')}`;
}

function generateCardId(bookData, index, config) {
  return `${config.defaults.card_id_prefix}${bookData.dirName}-${String(index + 1).padStart(2, '0')}`;
}

function getRoleIcon(roleType, config) {
  if (!roleType) return config.roleTypeIcons.default || '👤';
  if (config.roleTypeIcons[roleType]) return config.roleTypeIcons[roleType];
  
  const lowerRole = roleType.toLowerCase();
  for (const [key, icon] of Object.entries(config.roleTypeIcons)) {
    if (key.toLowerCase().includes(lowerRole) || lowerRole.includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  return config.roleTypeIcons.default || '👤';
}

function generateBookSQL(bookData, config) {
  const bookId = generateBookId(bookData, config);
  const now = formatDate();
  const title = escapeSql(bookData.title);
  const type = bookData.type || 'fantasy';
  
  return `-- Book: ${bookData.title}
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at)
VALUES ('${bookId}', '${config.defaults.user_id}', ${title}, '${type}', ${config.defaults.is_preset}, '${config.defaults.language}', '${now}', '${now}');
`;
}

function generateCharactersSQL(bookData, config) {
  const bookId = generateBookId(bookData, config);
  const now = formatDate();
  
  if (!bookData.characters || bookData.characters.length === 0) {
    return `-- No characters defined for ${bookData.title}\n`;
  }
  
  const statements = bookData.characters.map((char, index) => {
    const charId = generateCharId(bookData, index, config);
    const name = escapeSql(char.name);
    const roleType = escapeSql(char.roleType || 'Character');
    const personality = escapeSql(char.personality || '');
    const speechStyle = escapeSql(char.speechStyle || '');
    const avatar = escapeSql(getRoleIcon(char.roleType, config));
    const isProtagonist = index === 0 ? 1 : 0;
    
    return `INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist, created_at, updated_at)
VALUES ('${charId}', '${bookId}', ${name}, ${roleType}, ${personality}, ${speechStyle}, ${avatar}, NULL, NULL, ${isProtagonist}, '${now}', '${now}');`;
  });
  
  return `-- Characters for ${bookData.title}
${statements.join('\n')}
`;
}

function generatePlotCardsSQL(bookData, config) {
  const bookId = generateBookId(bookData, config);
  const now = formatDate();
  
  if (!bookData.plotCards || bookData.plotCards.length === 0) {
    return `-- No plot cards defined for ${bookData.title}\n`;
  }
  
  const statements = bookData.plotCards.map((card, index) => {
    const cardId = card.cardId || generateCardId(bookData, index, config);
    const name = escapeSql(card.name);
    const subType = escapeSql(card.subType || 'adventure');
    const icon = escapeSql(card.icon || '🎭');
    const description = escapeSql(card.description || '');
    
    return `INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom, created_at)
VALUES ('${cardId}', '${bookId}', 'plot', ${subType}, ${name}, ${icon}, ${description}, 0, '${now}');`;
  });
  
  return `-- Plot Cards for ${bookData.title}
${statements.join('\n')}
`;
}

function generateChaptersSQL(bookData, config) {
  const bookId = generateBookId(bookData, config);
  const now = formatDate();
  
  if (!bookData.chapters || bookData.chapters.length === 0) {
    return `-- No chapters defined for ${bookData.title}\n`;
  }
  
  const statements = bookData.chapters.map((chapter) => {
    const chapterId = generateChapterId(bookData, chapter.orderNum, config);
    const title = escapeSql(chapter.title);
    const content = escapeSql(chapter.content);
    
    return `INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num, created_at)
VALUES ('${chapterId}', '${bookId}', ${title}, ${content}, NULL, ${chapter.orderNum}, '${now}');`;
  });
  
  return `-- Chapters for ${bookData.title}
${statements.join('\n')}
`;
}

function generateCompleteSQL(bookData, config) {
  const header = `-- ============================================
-- Book: ${bookData.title}
-- Book ID: ${generateBookId(bookData, config)}
-- Type: ${bookData.typeName || bookData.type}
-- Generated: ${formatDate()}
-- ============================================

`;

  return header +
    generateBookSQL(bookData, config) + '\n' +
    generateCharactersSQL(bookData, config) + '\n' +
    generatePlotCardsSQL(bookData, config) + '\n' +
    generateChaptersSQL(bookData, config);
}

async function main() {
  const args = process.argv.slice(2);
  const config = loadConfig();
  
  let analyzedDataPath = path.join(LOGS_PATH, 'analyzed-data.json');
  
  if (args.length > 0 && args[0].endsWith('.json')) {
    analyzedDataPath = args[0];
  }
  
  if (!fs.existsSync(analyzedDataPath)) {
    console.error('❌ 请先运行 02-analyze-type.js 生成分析数据');
    process.exit(1);
  }
  
  console.log('📝 生成SQL文件...\n');
  
  const booksData = JSON.parse(fs.readFileSync(analyzedDataPath, 'utf-8'));
  
  for (const bookData of booksData) {
    const bookId = generateBookId(bookData, config);
    const outputDir = path.join(SQL_OUTPUT_PATH, bookId);
    
    fs.mkdirSync(outputDir, { recursive: true });
    
    console.log(`📖 生成: ${bookData.title}`);
    console.log(`   目录: ${outputDir}`);
    
    const bookSQL = generateBookSQL(bookData, config);
    fs.writeFileSync(path.join(outputDir, 'book.sql'), bookSQL);
    console.log('   ✓ book.sql');
    
    const charsSQL = generateCharactersSQL(bookData, config);
    fs.writeFileSync(path.join(outputDir, 'characters.sql'), charsSQL);
    console.log('   ✓ characters.sql');
    
    const cardsSQL = generatePlotCardsSQL(bookData, config);
    fs.writeFileSync(path.join(outputDir, 'plot-cards.sql'), cardsSQL);
    console.log('   ✓ plot-cards.sql');
    
    const chaptersSQL = generateChaptersSQL(bookData, config);
    fs.writeFileSync(path.join(outputDir, 'chapters.sql'), chaptersSQL);
    console.log('   ✓ chapters.sql');
    
    const completeSQL = generateCompleteSQL(bookData, config);
    fs.writeFileSync(path.join(outputDir, 'complete.sql'), completeSQL);
    console.log('   ✓ complete.sql');
    
    console.log('');
  }
  
  console.log(`✅ 完成！SQL文件已生成到: ${SQL_OUTPUT_PATH}`);
}

main().catch(console.error);
