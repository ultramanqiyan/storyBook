import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function findDatabasePath() {
  const wranglerPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1');
  
  if (!fs.existsSync(wranglerPath)) {
    throw new Error('Wrangler state directory not found');
  }

  const miniflarePath = path.join(wranglerPath, 'miniflare-D1DatabaseObject');
  
  if (!fs.existsSync(miniflarePath)) {
    throw new Error('Miniflare D1 directory not found');
  }

  const files = fs.readdirSync(miniflarePath);
  const sqliteFiles = files.filter(f => f.endsWith('.sqlite'));
  
  if (sqliteFiles.length === 0) {
    throw new Error('No SQLite database files found');
  }

  const filesWithStats = sqliteFiles.map(f => ({
    name: f,
    path: path.join(miniflarePath, f),
    mtime: fs.statSync(path.join(miniflarePath, f)).mtime.getTime()
  }));

  filesWithStats.sort((a, b) => b.mtime - a.mtime);
  
  return filesWithStats[0].path;
}

function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

function selectCards(cards, count, seed) {
  const random = seededRandom(seed);
  const shuffled = [...cards].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}

function loadConfig(language) {
  const configPath = path.join(process.cwd(), 'config', language, 'plot-options.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function getCardsForBookType(config, bookType, subType) {
  return config[bookType]?.[subType] || [];
}

function getPresetBooks(db) {
  return db.prepare('SELECT book_id, title, type, language FROM books WHERE is_preset = 1 ORDER BY book_id').all();
}

function getCharacters(db, bookId) {
  return db.prepare('SELECT char_id, name, is_protagonist FROM characters WHERE book_id = ?').all(bookId);
}

function deletePlotCards(db, bookId) {
  return db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
}

function insertPlotCard(db, card) {
  return db.prepare(`
    INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(card.card_id, card.book_id, 'plot', card.sub_type, card.name, card.icon, card.description);
}

function generateNewCards(book, config) {
  const newCards = [];
  const bookType = book.type;
  
  for (const subType of ['weather', 'terrain', 'adventure', 'equipment']) {
    const availableCards = getCardsForBookType(config, bookType, subType);
    const seed = `${book.book_id}-${subType}`;
    const selectedCards = selectCards(availableCards, 8, seed);
    
    for (const card of selectedCards) {
      newCards.push({
        card_id: `${book.book_id}-${subType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        book_id: book.book_id,
        sub_type: subType,
        name: card.name,
        icon: card.icon,
        description: card.description
      });
    }
  }
  
  return newCards;
}

function generateReportMarkdown(report) {
  return `# 预设书籍情节卡牌修复报告

**修复时间:** ${new Date().toISOString()}

## 修复摘要

| 指标 | 数量 |
|------|------|
| 总书籍数 | ${report.totalBooks} |
| 已更新书籍 | ${report.updatedBooks} |
| 更新卡牌总数 | ${report.totalCardsUpdated} |

## 问题列表

${report.missingCharacters.length > 0 ? `
### 角色卡牌缺失

| 书籍ID | 角色数量 |
|--------|----------|
${report.missingCharacters.map(c => `| ${c.bookId} | ${c.characterCount} |`).join('\n')}
` : '### 角色卡牌缺失\n\n无'}

${report.errors.length > 0 ? `
### 错误列表

| 书籍ID | 错误信息 |
|--------|----------|
${report.errors.map(e => `| ${e.bookId} | ${e.error} |`).join('\n')}
` : '### 错误列表\n\n无'}
`;
}

async function regenerateStaticFiles() {
  console.log('\n=== Regenerating Static Files ===');
  
  const scriptPath = path.join(process.cwd(), 'scripts', 'generate-preset-pages.js');
  
  if (!fs.existsSync(scriptPath)) {
    console.log('Static file generation script not found, skipping...');
    return false;
  }
  
  try {
    execSync('node scripts/generate-preset-pages.js', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('Static files regenerated successfully');
    return true;
  } catch (error) {
    console.error('Failed to regenerate static files:', error.message);
    return false;
  }
}

async function main() {
  console.log('=== Preset Books Plot Cards Fix Script ===\n');
  
  const dbPath = findDatabasePath();
  console.log('Database path:', dbPath);
  
  const db = new Database(dbPath);
  
  const report = {
    totalBooks: 0,
    updatedBooks: 0,
    totalCardsUpdated: 0,
    missingCharacters: [],
    errors: []
  };
  
  try {
    const books = getPresetBooks(db);
    report.totalBooks = books.length;
    console.log(`Found ${books.length} preset books\n`);
    
    const enConfig = loadConfig('en');
    const zhConfig = loadConfig('zh');
    console.log('Loaded plot configurations');
    console.log('  - English: adventure, fantasy, romance, business');
    console.log('  - Chinese: adventure, fantasy, romance, business\n');
    
    for (const book of books) {
      try {
        console.log(`Processing: ${book.book_id} (${book.title})`);
        
        const characters = getCharacters(db, book.book_id);
        if (characters.length < 3) {
          report.missingCharacters.push({
            bookId: book.book_id,
            characterCount: characters.length
          });
          console.log(`  Warning: Only ${characters.length} characters found`);
        }
        
        const deleteResult = deletePlotCards(db, book.book_id);
        console.log(`  Deleted ${deleteResult.changes} old plot cards`);
        
        const config = book.language === 'en' ? enConfig : zhConfig;
        const newCards = generateNewCards(book, config);
        
        for (const card of newCards) {
          insertPlotCard(db, card);
        }
        
        console.log(`  Inserted ${newCards.length} new plot cards`);
        
        report.updatedBooks++;
        report.totalCardsUpdated += newCards.length;
        
      } catch (error) {
        report.errors.push({
          bookId: book.book_id,
          error: error.message
        });
        console.error(`  Error: ${error.message}`);
      }
    }
    
    console.log('\n=== Database Update Complete ===');
    console.log(`Updated ${report.updatedBooks}/${report.totalBooks} books`);
    console.log(`Total cards updated: ${report.totalCardsUpdated}`);
    
    await regenerateStaticFiles();
    
    const reportPath = path.join(process.cwd(), 'doc', 'preset-books-fix-report.md');
    fs.writeFileSync(reportPath, generateReportMarkdown(report));
    console.log(`\nReport saved to: ${reportPath}`);
    
    console.log('\n=== Fix Report ===');
    console.log(JSON.stringify(report, null, 2));
    
  } finally {
    db.close();
  }
}

main().catch(console.error);
