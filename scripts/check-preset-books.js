import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIN_CHAPTERS = 8;
const MIN_CONTENT_LENGTH = 1500;
const REQUIRED_CARD_TYPES = ['weather', 'terrain', 'adventure', 'equipment'];

function parseSQLSimple(sql, tableName, columnCount) {
  const results = [];
  const pattern = new RegExp(`INSERT\\s+INTO\\s+"${tableName}"\\s+VALUES\\s*`, 'gi');
  
  let match;
  while ((match = pattern.exec(sql)) !== null) {
    const startIdx = match.index + match[0].length;
    
    let depth = 0;
    let idx = startIdx;
    let rowStart = -1;
    
    while (idx < sql.length) {
      const char = sql[idx];
      
      if (char === '(' && depth === 0) {
        rowStart = idx + 1;
      }
      
      if (char === '(') depth++;
      if (char === ')') depth--;
      
      if (char === ')' && depth === 0) {
        const rowContent = sql.substring(rowStart, idx);
        const fields = parseRowFields(rowContent, columnCount);
        if (fields.length >= columnCount) {
          results.push(fields.slice(0, columnCount));
        }
        rowStart = -1;
      }
      
      if (char === ';' && depth === 0) {
        break;
      }
      idx++;
    }
  }
  
  return results;
}

function parseRowFields(content, expectedCount) {
  const fields = [];
  let current = '';
  let inString = false;
  let parenDepth = 0;
  let i = 0;
  
  while (i < content.length) {
    const char = content[i];
    
    if (char === "'" && !inString) {
      inString = true;
      i++;
      continue;
    }
    
    if (char === "'" && inString) {
      if (i + 1 < content.length && content[i + 1] === "'") {
        current += "'";
        i += 2;
        continue;
      }
      inString = false;
      i++;
      continue;
    }
    
    if (inString) {
      if (char === '(') parenDepth++;
      if (char === ')') parenDepth--;
      current += char;
      i++;
      continue;
    }
    
    if (char === ',' && parenDepth === 0) {
      fields.push(current.trim());
      current = '';
      i++;
      continue;
    }
    
    current += char;
    i++;
  }
  
  if (current.trim()) {
    fields.push(current.trim());
  }
  
  return fields;
}

function extractBooks(rawData) {
  return rawData.map(b => ({
    bookId: b[0],
    userId: b[1],
    title: b[2],
    type: b[3],
    isPreset: b[4] === 1 || b[4] === '1',
    language: b[5] || 'zh'
  }));
}

function extractCharacters(rawData) {
  return rawData.map(c => ({
    charId: c[0],
    bookId: c[1],
    name: c[2],
    roleType: c[3],
    personality: c[4],
    speechStyle: c[5],
    avatar: c[6],
    intimacy: c[7],
    relationship: c[8],
    isProtagonist: c[9] === 1 || c[9] === '1'
  }));
}

function extractPlotCards(rawData) {
  return rawData.map(p => ({
    cardId: p[0],
    bookId: p[1],
    type: p[2],
    subType: p[3],
    name: p[4],
    icon: p[5],
    description: p[6]
  }));
}

function extractChapters(rawData) {
  return rawData.map(ch => ({
    chapterId: ch[0],
    bookId: ch[1],
    title: ch[2],
    content: ch[3],
    selectedCards: ch[4],
    orderNum: parseInt(ch[5], 10) || 0
  }));
}

function extractPuzzles(rawData) {
  return rawData.map(p => ({
    puzzleId: p[0],
    chapterId: p[1],
    question: p[2],
    answer: p[3],
    puzzleType: p[4],
    options: p[5],
    isSolved: p[8] === 1 || p[8] === '1'
  }));
}

function scanStaticFiles(booksDir, chaptersDir) {
  const bookFiles = new Map();
  const chapterFiles = new Map();
  
  if (fs.existsSync(booksDir)) {
    const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
      const bookId = f.replace('.html', '');
      bookFiles.set(bookId, path.join(booksDir, f));
    });
  }
  
  if (fs.existsSync(chaptersDir)) {
    const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
      const chapterId = f.replace('.html', '');
      chapterFiles.set(chapterId, path.join(chaptersDir, f));
    });
  }
  
  return { bookFiles, chapterFiles };
}

function checkBook(book, characters, plotCards, chapters, puzzles, bookFiles, chapterFiles) {
  const issues = [];
  const bookId = book.bookId;
  
  const bookCharacters = characters.filter(c => c.bookId === bookId);
  const bookPlotCards = plotCards.filter(p => p.bookId === bookId);
  const bookChapters = chapters.filter(ch => ch.bookId === bookId).sort((a, b) => a.orderNum - b.orderNum);
  
  const protagonists = bookCharacters.filter(c => c.isProtagonist);
  if (protagonists.length === 0) {
    issues.push({
      level: 'CRITICAL',
      type: 'NO_PROTAGONIST',
      message: `无主角角色 - 用户导入后无法生成新章节`
    });
  }
  
  if (bookCharacters.length === 0) {
    issues.push({
      level: 'CRITICAL',
      type: 'NO_CHARACTERS',
      message: `无角色卡牌 - 用户导入后无角色可用`
    });
  }
  
  if (bookPlotCards.length === 0) {
    issues.push({
      level: 'CRITICAL',
      type: 'NO_PLOT_CARDS',
      message: `无情节卡牌 - 用户导入后无卡牌可用`
    });
  } else {
    const cardTypes = new Set(bookPlotCards.map(c => c.subType));
    const missingTypes = REQUIRED_CARD_TYPES.filter(t => !cardTypes.has(t));
    if (missingTypes.length > 0) {
      issues.push({
        level: 'CRITICAL',
        type: 'INCOMPLETE_CARD_TYPES',
        message: `缺少卡牌类型: ${missingTypes.join(', ')} - 用户导入后无法生成新章节`
      });
    }
  }
  
  if (bookChapters.length === 0) {
    issues.push({
      level: 'WARNING',
      type: 'NO_CHAPTERS',
      message: `无章节 - 书籍内容为空`
    });
  } else if (bookChapters.length < MIN_CHAPTERS) {
    issues.push({
      level: 'WARNING',
      type: 'INSUFFICIENT_CHAPTERS',
      message: `章节数量不足: ${bookChapters.length}/${MIN_CHAPTERS}`
    });
  }
  
  const emptyChapters = bookChapters.filter(ch => !ch.content || ch.content.trim().length === 0);
  if (emptyChapters.length > 0) {
    issues.push({
      level: 'WARNING',
      type: 'EMPTY_CHAPTER_CONTENT',
      message: `${emptyChapters.length}个章节内容为空: ${emptyChapters.map(ch => `第${ch.orderNum}章`).join(', ')}`
    });
  }
  
  const shortChapters = bookChapters.filter(ch => ch.content && ch.content.length > 0 && ch.content.length < MIN_CONTENT_LENGTH);
  if (shortChapters.length > 0) {
    issues.push({
      level: 'INFO',
      type: 'SHORT_CHAPTER_CONTENT',
      message: `${shortChapters.length}个章节内容过短(<${MIN_CONTENT_LENGTH}字): ${shortChapters.map(ch => `第${ch.orderNum}章(${ch.content.length}字)`).join(', ')}`
    });
  }
  
  const chapterOrderNums = bookChapters.map(ch => ch.orderNum);
  const maxOrder = Math.max(...chapterOrderNums, 0);
  const expectedOrders = Array.from({length: maxOrder}, (_, i) => i + 1);
  const missingOrders = expectedOrders.filter(o => !chapterOrderNums.includes(o) && o <= bookChapters.length);
  
  if (missingOrders.length > 0 && bookChapters.length > 0) {
    const actualOrders = chapterOrderNums.sort((a, b) => a - b);
    const hasSequential = actualOrders.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
    
    if (!hasSequential && bookChapters.length >= MIN_CHAPTERS) {
      issues.push({
        level: 'INFO',
        type: 'CHAPTER_ORDER_INFO',
        message: `章节序号范围: ${Math.min(...chapterOrderNums)} - ${Math.max(...chapterOrderNums)}`
      });
    }
  }
  
  if (!bookFiles.has(bookId)) {
    issues.push({
      level: 'WARNING',
      type: 'MISSING_STATIC_BOOK',
      message: `缺少静态书籍页面: ${bookId}.html`
    });
  }
  
  const missingChapterFiles = bookChapters.filter(ch => !chapterFiles.has(ch.chapterId));
  if (missingChapterFiles.length > 0) {
    issues.push({
      level: 'WARNING',
      type: 'MISSING_STATIC_CHAPTERS',
      message: `缺少${missingChapterFiles.length}个静态章节页面: ${missingChapterFiles.slice(0, 5).map(ch => ch.chapterId).join(', ')}${missingChapterFiles.length > 5 ? '...' : ''}`
    });
  }
  
  return {
    bookId,
    title: book.title,
    type: book.type,
    language: book.language,
    stats: {
      characters: bookCharacters.length,
      protagonists: protagonists.length,
      plotCards: bookPlotCards.length,
      cardTypes: [...new Set(bookPlotCards.map(c => c.subType))],
      chapters: bookChapters.length,
      puzzles: puzzles.filter(p => bookChapters.some(ch => ch.chapterId === p.chapterId)).length
    },
    issues,
    valid: issues.filter(i => i.level === 'CRITICAL').length === 0
  };
}

function generateReport(results) {
  const lines = [];
  const now = new Date().toISOString();
  
  lines.push(`# 预设书籍检查报告`);
  lines.push(``);
  lines.push(`**生成时间:** ${now}`);
  lines.push(``);
  
  const total = results.length;
  const valid = results.filter(r => r.valid).length;
  const invalid = total - valid;
  
  const criticalIssues = results.flatMap(r => r.issues.filter(i => i.level === 'CRITICAL'));
  const warningIssues = results.flatMap(r => r.issues.filter(i => i.level === 'WARNING'));
  const infoIssues = results.flatMap(r => r.issues.filter(i => i.level === 'INFO'));
  
  lines.push(`## 汇总统计`);
  lines.push(``);
  lines.push(`| 指标 | 数量 |`);
  lines.push(`|------|------|`);
  lines.push(`| 总书籍数 | ${total} |`);
  lines.push(`| ✅ 通过检查 | ${valid} |`);
  lines.push(`| ❌ 存在问题 | ${invalid} |`);
  lines.push(`| 🔴 严重问题 | ${criticalIssues.length} |`);
  lines.push(`| 🟡 警告问题 | ${warningIssues.length} |`);
  lines.push(`| 🟢 信息提示 | ${infoIssues.length} |`);
  lines.push(``);
  
  if (criticalIssues.length > 0) {
    lines.push(`## 🔴 严重问题 (影响核心功能)`);
    lines.push(``);
    lines.push(`| 书籍ID | 书籍名称 | 问题类型 | 详细描述 |`);
    lines.push(`|--------|----------|----------|----------|`);
    
    results.filter(r => r.issues.some(i => i.level === 'CRITICAL')).forEach(r => {
      r.issues.filter(i => i.level === 'CRITICAL').forEach(i => {
        lines.push(`| ${r.bookId} | ${r.title} | ${i.type} | ${i.message} |`);
      });
    });
    lines.push(``);
  }
  
  if (warningIssues.length > 0) {
    lines.push(`## 🟡 警告问题 (影响用户体验)`);
    lines.push(``);
    lines.push(`| 书籍ID | 书籍名称 | 问题类型 | 详细描述 |`);
    lines.push(`|--------|----------|----------|----------|`);
    
    results.filter(r => r.issues.some(i => i.level === 'WARNING')).forEach(r => {
      r.issues.filter(i => i.level === 'WARNING').forEach(i => {
        lines.push(`| ${r.bookId} | ${r.title} | ${i.type} | ${i.message} |`);
      });
    });
    lines.push(``);
  }
  
  if (infoIssues.length > 0) {
    lines.push(`## 🟢 信息提示 (数据差异)`);
    lines.push(``);
    lines.push(`| 书籍ID | 书籍名称 | 问题类型 | 详细描述 |`);
    lines.push(`|--------|----------|----------|----------|`);
    
    results.filter(r => r.issues.some(i => i.level === 'INFO')).forEach(r => {
      r.issues.filter(i => i.level === 'INFO').forEach(i => {
        lines.push(`| ${r.bookId} | ${r.title} | ${i.type} | ${i.message} |`);
      });
    });
    lines.push(``);
  }
  
  lines.push(`## 详细检查结果`);
  lines.push(``);
  lines.push(`| 书籍ID | 书籍名称 | 类型 | 语言 | 角色 | 卡牌 | 章节 | 状态 |`);
  lines.push(`|--------|----------|------|------|------|------|------|------|`);
  
  results.sort((a, b) => {
    if (a.valid !== b.valid) return a.valid ? 1 : -1;
    return a.bookId.localeCompare(b.bookId);
  }).forEach(r => {
    const status = r.valid ? '✅' : '❌';
    lines.push(`| ${r.bookId} | ${r.title} | ${r.type} | ${r.language} | ${r.stats.characters} | ${r.stats.plotCards} | ${r.stats.chapters} | ${status} |`);
  });
  lines.push(``);
  
  lines.push(`## 问题类型说明`);
  lines.push(``);
  lines.push(`| 问题类型 | 级别 | 说明 | 影响 |`);
  lines.push(`|----------|------|------|------|`);
  lines.push(`| NO_PROTAGONIST | 🔴严重 | 无主角角色 | 用户导入后无法生成新章节 |`);
  lines.push(`| NO_CHARACTERS | 🔴严重 | 无角色卡牌 | 用户导入后无角色可用 |`);
  lines.push(`| NO_PLOT_CARDS | 🔴严重 | 无情节卡牌 | 用户导入后无卡牌可用 |`);
  lines.push(`| INCOMPLETE_CARD_TYPES | 🔴严重 | 缺少必要卡牌类型 | 用户导入后无法生成新章节 |`);
  lines.push(`| NO_CHAPTERS | 🟡警告 | 无章节 | 书籍内容为空 |`);
  lines.push(`| INSUFFICIENT_CHAPTERS | 🟡警告 | 章节数量不足 | 阅读体验不完整 |`);
  lines.push(`| EMPTY_CHAPTER_CONTENT | 🟡警告 | 章节内容为空 | 阅读体验受损 |`);
  lines.push(`| MISSING_STATIC_BOOK | 🟡警告 | 缺少静态书籍页面 | SEO/访问受影响 |`);
  lines.push(`| MISSING_STATIC_CHAPTERS | 🟡警告 | 缺少静态章节页面 | SEO/访问受影响 |`);
  lines.push(`| SHORT_CHAPTER_CONTENT | 🟢信息 | 章节内容过短 | 阅读体验一般 |`);
  lines.push(``);
  
  return lines.join('\n');
}

async function main() {
  console.log('=== 预设书籍全面检查 ===\n');
  
  const sqlPath = path.join(__dirname, '../backups/local_storybook_database_backup.sql');
  
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ 数据库备份文件不存在:', sqlPath);
    process.exit(1);
  }
  
  console.log('📖 读取数据库备份文件...');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  console.log('📊 解析数据...');
  const booksRaw = parseSQLSimple(sql, 'books', 8);
  const charactersRaw = parseSQLSimple(sql, 'characters', 12);
  const plotCardsRaw = parseSQLSimple(sql, 'plot_cards', 9);
  const chaptersRaw = parseSQLSimple(sql, 'chapters', 7);
  const puzzlesRaw = parseSQLSimple(sql, 'puzzles', 9);
  
  const books = extractBooks(booksRaw);
  const characters = extractCharacters(charactersRaw);
  const plotCards = extractPlotCards(plotCardsRaw);
  const chapters = extractChapters(chaptersRaw);
  const puzzles = extractPuzzles(puzzlesRaw);
  
  console.log(`  - 书籍: ${books.length}`);
  console.log(`  - 角色: ${characters.length}`);
  console.log(`  - 情节卡牌: ${plotCards.length}`);
  console.log(`  - 章节: ${chapters.length}`);
  console.log(`  - 谜题: ${puzzles.length}`);
  
  const presetBooks = books.filter(b => b.isPreset);
  console.log(`\n📚 预设书籍数量: ${presetBooks.length}`);
  
  const booksDir = path.join(__dirname, '../src/frontend/books');
  const chaptersDir = path.join(__dirname, '../src/frontend/chapters');
  
  console.log('\n📁 扫描静态文件...');
  const { bookFiles, chapterFiles } = scanStaticFiles(booksDir, chaptersDir);
  console.log(`  - 书籍页面: ${bookFiles.size}`);
  console.log(`  - 章节页面: ${chapterFiles.size}`);
  
  console.log('\n🔍 检查每本书籍...');
  const results = presetBooks.map(book => {
    const result = checkBook(book, characters, plotCards, chapters, puzzles, bookFiles, chapterFiles);
    const icon = result.valid ? '✅' : '❌';
    console.log(`  ${icon} ${book.bookId}: ${result.issues.length}个问题`);
    return result;
  });
  
  console.log('\n📝 生成报告...');
  const report = generateReport(results);
  
  const reportPath = path.join(__dirname, '../doc/preset-books-check-report.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`\n✅ 报告已保存到: ${reportPath}`);
  
  const valid = results.filter(r => r.valid).length;
  const invalid = results.length - valid;
  
  console.log(`\n=== 检查完成 ===`);
  console.log(`✅ 通过: ${valid}本`);
  console.log(`❌ 问题: ${invalid}本`);
  
  if (invalid > 0) {
    console.log('\n需要修复的书籍:');
    results.filter(r => !r.valid).forEach(r => {
      console.log(`  - ${r.bookId} (${r.title}): ${r.issues.map(i => i.type).join(', ')}`);
    });
  }
}

main().catch(console.error);
