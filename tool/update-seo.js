import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');
const CHAPTERS_DIR = path.join(__dirname, '../src/frontend/chapters');

const SEO_CONFIG = {
  adventure: {
    en: {
      keywords: 'adventure story cards, space exploration game, puzzle adventure, interactive adventure, card collection, character cards',
      descriptionPrefix: 'An exciting adventure story with card collection and puzzles. '
    },
    zh: {
      keywords: '冒险故事卡牌, 太空探险游戏, 解谜冒险, 互动冒险, 卡牌收集, 角色卡牌',
      descriptionPrefix: '一个充满卡牌收集和解谜的冒险故事。'
    }
  },
  fantasy: {
    en: {
      keywords: 'fantasy story cards, magic academy, wizard adventure, interactive fantasy, spell cards, character cards',
      descriptionPrefix: 'A magical fantasy story with card collection and puzzles. '
    },
    zh: {
      keywords: '奇幻故事卡牌, 魔法学院, 巫师冒险, 互动奇幻, 魔法卡牌, 角色卡牌',
      descriptionPrefix: '一个充满卡牌收集和解谜的奇幻故事。'
    }
  },
  romance: {
    en: {
      keywords: 'romance story game, interactive love story, AI romance, dating simulation, romance cards, character cards',
      descriptionPrefix: 'A romantic interactive story with card collection and puzzles. '
    },
    zh: {
      keywords: '言情故事游戏, 互动爱情故事, AI言情, 恋爱模拟, 言情卡牌, 角色卡牌',
      descriptionPrefix: '一个充满卡牌收集和解谜的言情故事。'
    }
  },
  business: {
    en: {
      keywords: 'business story game, career adventure, workplace puzzle, interactive drama, strategy cards, character cards',
      descriptionPrefix: 'A workplace drama story with card collection and puzzles. '
    },
    zh: {
      keywords: '职场故事游戏, 职业冒险, 职场解谜, 互动剧情, 策略卡牌, 角色卡牌',
      descriptionPrefix: '一个充满卡牌收集和解谜的职场故事。'
    }
  }
};

function getBookType(filename) {
  if (filename.includes('adventure') || filename.includes('-adv')) return 'adventure';
  if (filename.includes('fantasy') || filename.includes('-fan')) return 'fantasy';
  if (filename.includes('romance') || filename.includes('-rom')) return 'romance';
  if (filename.includes('business') || filename.includes('-bus')) return 'business';
  return 'adventure';
}

function isEnglishFile(filename) {
  return filename.endsWith('-en.html');
}

function extractBookName(content) {
  const titleMatch = content.match(/<title>([^-]+)\s*-\s*StoryBook<\/title>/);
  return titleMatch ? titleMatch[1].trim() : '';
}

function extractChapterInfo(content) {
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const keywordsMatch = content.match(/<meta name="keywords" content="([^"]+)">/);
  const descriptionMatch = content.match(/<meta name="description" content="([^"]+)">/);
  
  let chapterNames = [];
  const chapterNameMatches = content.matchAll(/<div class="chapter-name">([^<]+)<\/div>/g);
  for (const match of chapterNameMatches) {
    chapterNames.push(match[1].trim());
  }
  
  return {
    title: titleMatch ? titleMatch[1] : '',
    keywords: keywordsMatch ? keywordsMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : '',
    chapterNames
  };
}

function extractContentKeywords(content) {
  const keywords = new Set();
  
  const textMatch = content.match(/<div class="manuscript-text">([\s\S]*?)<\/div>\s*<\/div>/g);
  if (textMatch) {
    const text = textMatch.join(' ');
    
    const characterPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
    const characters = text.match(characterPattern) || [];
    characters.slice(0, 3).forEach(c => {
      if (c.length > 2 && !['The', 'This', 'That', 'When', 'What', 'Where', 'Chapter'].includes(c)) {
        keywords.add(c);
      }
    });
    
    const locationPatterns = [
      /\b(island|academy|forest|jungle|ocean|sea|mountain|castle|city|village|base|office|lab)\b/gi,
      /\b(beach|space|underwater|underground|tower|palace|garden|river)\b/gi
    ];
    locationPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      matches.slice(0, 2).forEach(m => keywords.add(m.toLowerCase()));
    });
    
    const itemPatterns = [
      /\b(wand|telescope|map|key|sword|spell|potion|artifact|treasure)\b/gi,
      /\b(code|AI|program|computer|phone|device)\b/gi
    ];
    itemPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      matches.slice(0, 2).forEach(m => keywords.add(m.toLowerCase()));
    });
  }
  
  return Array.from(keywords).slice(0, 5);
}

function updateBookSEO(filePath) {
  const filename = path.basename(filePath);
  const bookType = getBookType(filename);
  const isEnglish = isEnglishFile(filename);
  const lang = isEnglish ? 'en' : 'zh';
  
  let content = fs.readFileSync(filePath, 'utf8');
  const bookName = extractBookName(content);
  const config = SEO_CONFIG[bookType][lang];
  
  const newKeywords = `${config.keywords}, ${bookName}`;
  const newDescription = `${config.descriptionPrefix}${bookName} - ${isEnglish ? 'AI Interactive Story with Card Collection' : 'AI互动故事，含卡牌收集'}`;
  
  content = content.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${newKeywords}">`
  );
  
  content = content.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${newDescription}">`
  );
  
  content = content.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${newDescription}">`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  return { filename, bookName, newKeywords };
}

function updateChapterSEO(filePath) {
  const filename = path.basename(filePath);
  const bookType = getBookType(filename);
  const isEnglish = isEnglishFile(filename);
  const lang = isEnglish ? 'en' : 'zh';
  
  let content = fs.readFileSync(filePath, 'utf8');
  const config = SEO_CONFIG[bookType][lang];
  
  const info = extractChapterInfo(content);
  const contentKeywords = extractContentKeywords(content);
  
  const chapterKeywords = info.chapterNames.join(', ');
  const contentKeywordsStr = contentKeywords.join(', ');
  
  let newKeywords = `${config.keywords.split(',')[0]}, ${chapterKeywords}`;
  if (contentKeywordsStr) {
    newKeywords += `, ${contentKeywordsStr}`;
  }
  
  const newDescription = isEnglish 
    ? `Read ${info.chapterNames.join(' / ')} - ${info.title.split(' - ')[0]}`
    : `阅读 ${info.chapterNames.join(' / ')} - ${info.title.split(' - ')[0]}`;
  
  content = content.replace(
    /<meta name="keywords" content="[^"]*">/,
    `<meta name="keywords" content="${newKeywords}">`
  );
  
  content = content.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${newDescription}">`
  );
  
  content = content.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${newDescription}">`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  return { filename, chapterNames: info.chapterNames, newKeywords };
}

function main() {
  console.log('=== Updating SEO for Books ===\n');
  
  const bookFiles = fs.readdirSync(BOOKS_DIR).filter(f => f.endsWith('.html'));
  let bookCount = 0;
  
  bookFiles.forEach(file => {
    const result = updateBookSEO(path.join(BOOKS_DIR, file));
    console.log(`✓ ${result.filename}`);
    console.log(`  Book: ${result.bookName}`);
    console.log(`  Keywords: ${result.newKeywords.substring(0, 80)}...\n`);
    bookCount++;
  });
  
  console.log(`\n=== Updating SEO for Chapters ===\n`);
  
  const chapterFiles = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.html'));
  let chapterCount = 0;
  
  chapterFiles.forEach(file => {
    const result = updateChapterSEO(path.join(CHAPTERS_DIR, file));
    chapterCount++;
    if (chapterCount % 20 === 0) {
      console.log(`✓ Processed ${chapterCount} chapters...`);
    }
  });
  
  console.log(`\n=== Summary ===`);
  console.log(`Books updated: ${bookCount}`);
  console.log(`Chapters updated: ${chapterCount}`);
  console.log(`Total files updated: ${bookCount + chapterCount}`);
}

main();
