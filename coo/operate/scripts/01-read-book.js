import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const COO_ROOT = path.join(__dirname, '..', '..');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function extractTitleFromChapter(content) {
  const firstLine = content.split('\n')[0];
  const match = firstLine.match(/^#\s+(.+)$/);
  return match ? match[1].trim() : 'Untitled Chapter';
}

function extractKeywordsFromSEO(seoContent) {
  const keywords = [];
  
  const primaryMatch = seoContent.match(/### Primary Keywords\s+([\s\S]*?)(?=###|$)/i);
  if (primaryMatch) {
    const lines = primaryMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const kw = line.replace(/^-\s*/, '').split(' - ')[0].trim();
      if (kw) keywords.push(kw);
    });
  }
  
  const secondaryMatch = seoContent.match(/### Secondary Keywords\s+([\s\S]*?)(?=###|$)/i);
  if (secondaryMatch) {
    const lines = secondaryMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const kw = line.replace(/^-\s*/, '').trim();
      if (kw) keywords.push(kw);
    });
  }
  
  return [...new Set(keywords)];
}

function extractCharactersFromSEO(seoContent) {
  const characters = [];
  
  const characterSection = seoContent.match(/## Characters[\s\S]*?(?=##|$)/i);
  if (characterSection) {
    const charMatches = characterSection[0].matchAll(/###\s+(.+?)\n([\s\S]*?)(?=###|$)/g);
    for (const match of charMatches) {
      const name = match[1].trim();
      const details = match[2];
      
      let roleType = 'Character';
      let personality = '';
      let speechStyle = '';
      
      const roleMatch = details.match(/\*\*Role:\*\*\s*(.+)/i);
      if (roleMatch) roleType = roleMatch[1].trim();
      
      const personalityMatch = details.match(/\*\*Personality:\*\*\s*(.+)/i);
      if (personalityMatch) personality = personalityMatch[1].trim();
      
      const speechMatch = details.match(/\*\*Speech Style:\*\*\s*(.+)/i);
      if (speechMatch) speechStyle = speechMatch[1].trim();
      
      characters.push({ name, roleType, personality, speechStyle });
    }
  }
  
  return characters;
}

function extractMetaDescription(seoContent) {
  const match = seoContent.match(/### Meta Description[^*]*\n\n(.+)/i);
  return match ? match[1].trim() : '';
}

function extractMetaTitle(seoContent) {
  const match = seoContent.match(/### Meta Title[^*]*\n\n(.+)/i);
  return match ? match[1].trim() : '';
}

function extractPhilosophicalThemes(seoContent) {
  const themes = [];
  const match = seoContent.match(/### Philosophical Themes\s+([\s\S]*?)(?=###|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const theme = line.replace(/^-\s*/, '').trim();
      if (theme) themes.push(theme);
    });
  }
  return themes;
}

function extractTargetAudience(seoContent) {
  const audiences = [];
  const match = seoContent.match(/### Target Audience\s+([\s\S]*?)(?=---|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const audience = line.replace(/^-\s*/, '').trim();
      if (audience) audiences.push(audience);
    });
  }
  return audiences;
}

function extractCategories(seoContent) {
  const categories = [];
  const match = seoContent.match(/### Categories\s+([\s\S]*?)(?=###|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const cat = line.replace(/^-\s*/, '').trim();
      if (cat) categories.push(cat);
    });
  }
  return categories;
}

function extractChapterSEO(seoContent) {
  const chapters = {};
  const chapterMatches = seoContent.matchAll(/### Chapter (\d+): (.+?)\n([\s\S]*?)(?=### Chapter|---|$)/gi);
  
  for (const match of chapterMatches) {
    const chapterNum = match[1];
    const chapterTitle = match[2].trim();
    const chapterContent = match[3];
    
    const keywords = [];
    const kwMatch = chapterContent.match(/\*\*Keywords:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
    if (kwMatch) {
      const lines = kwMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
      lines.forEach(line => {
        const kw = line.replace(/^-\s*/, '').trim();
        if (kw) keywords.push(kw);
      });
    }
    
    const summaryMatch = chapterContent.match(/\*\*Summary for SEO:\*\*\s*(.+)/i);
    const summary = summaryMatch ? summaryMatch[1].trim() : '';
    
    chapters[chapterNum] = {
      title: chapterTitle,
      keywords,
      summary
    };
  }
  
  return chapters;
}

function extractBookSpecInfo(bookSpecContent) {
  const info = {
    title: '',
    type: '',
    targetReader: '',
    themes: [],
    narrativeStyle: '',
    emotionalTone: '',
    characters: []
  };
  
  const titleMatch = bookSpecContent.match(/\*\*书名\*\*[：:]\s*(.+)/);
  if (titleMatch) info.title = titleMatch[1].trim();
  
  const typeMatch = bookSpecContent.match(/\*\*类型\*\*[：:]\s*(.+)/);
  if (typeMatch) info.type = typeMatch[1].trim();
  
  const readerMatch = bookSpecContent.match(/\*\*目标读者\*\*[：:]\s*(.+)/);
  if (readerMatch) info.targetReader = readerMatch[1].trim();
  
  const themeMatch = bookSpecContent.match(/\*\*主题\*\*[：:]\s*(.+)/);
  if (themeMatch) info.themes = themeMatch[1].split(',').map(t => t.trim());
  
  return info;
}

function extractCharactersFromBookSpec(bookSpecContent) {
  const characters = [];
  
  const charSection = bookSpecContent.match(/###\s+(.+?)（(.+?)）[\s\S]*?(?=###|$)/g);
  if (charSection) {
    for (const section of charSection) {
      const nameMatch = section.match(/###\s+(.+?)（(.+?)）/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const roleType = nameMatch[2].trim();
        
        let personality = '';
        let speechStyle = '';
        
        const personalityMatch = section.match(/\*\*性格特征\*\*[：:]?\s*([\s\S]*?)(?=\*\*|$)/);
        if (personalityMatch) personality = personalityMatch[1].trim().replace(/\n/g, ' ');
        
        const speechMatch = section.match(/\*\*说话特点\*\*[：:]?\s*([\s\S]*?)(?=\*\*|$)/);
        if (speechMatch) speechStyle = speechMatch[1].trim().replace(/\n/g, ' ');
        
        characters.push({ name, roleType, personality, speechStyle });
      }
    }
  }
  
  return characters;
}

function readBook(bookDir) {
  const bookPath = path.join(COO_ROOT, bookDir);
  
  if (!fs.existsSync(bookPath)) {
    throw new Error(`Book directory not found: ${bookPath}`);
  }
  
  const bookData = {
    dirName: bookDir,
    bookId: `preset-coo-${bookDir}`,
    title: '',
    type: '',
    language: 'en',
    chapters: [],
    characters: [],
    keywords: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      categories: [],
      targetAudience: [],
      philosophicalThemes: []
    },
    chapterSEO: {},
    bookSpec: {}
  };
  
  const chaptersDir = path.join(bookPath, 'chapters');
  if (fs.existsSync(chaptersDir)) {
    const chapterFiles = fs.readdirSync(chaptersDir)
      .filter(f => f.endsWith('.md'))
      .map((f, index) => {
        const numMatch = f.match(/chapter-(\d+)/);
        const chapterNum = numMatch ? parseInt(numMatch[1]) : (index + 1);
        return { file: f, chapterNum, originalIndex: index };
      })
      .sort((a, b) => a.chapterNum - b.chapterNum || a.originalIndex - b.originalIndex);
    
    for (const { file, chapterNum } of chapterFiles) {
      const chapterPath = path.join(chaptersDir, file);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const title = extractTitleFromChapter(content);
      
      bookData.chapters.push({
        chapterId: `chapter-coo-${bookDir}-${String(chapterNum).padStart(2, '0')}`,
        orderNum: chapterNum,
        title,
        content
      });
      
      if (!bookData.title && chapterNum === 1) {
        const titleMatch = content.match(/^#\s+Chapter\s+\d+:\s*(.+)$/m);
        if (titleMatch) {
          bookData.title = titleMatch[1].trim();
        }
      }
    }
  }
  
  const seoMetaPath = path.join(bookPath, '.progress', 'seo-meta.md');
  if (fs.existsSync(seoMetaPath)) {
    const seoContent = fs.readFileSync(seoMetaPath, 'utf-8');
    
    bookData.keywords = extractKeywordsFromSEO(seoContent);
    bookData.seo.metaTitle = extractMetaTitle(seoContent);
    bookData.seo.metaDescription = extractMetaDescription(seoContent);
    bookData.seo.categories = extractCategories(seoContent);
    bookData.seo.targetAudience = extractTargetAudience(seoContent);
    bookData.seo.philosophicalThemes = extractPhilosophicalThemes(seoContent);
    bookData.chapterSEO = extractChapterSEO(seoContent);
    
    const seoChars = extractCharactersFromSEO(seoContent);
    if (seoChars.length > 0) {
      bookData.characters = seoChars;
    }
    
    if (!bookData.title) {
      const titleMatch = seoContent.match(/#\s+SEO Metadata:\s*(.+)/);
      if (titleMatch) {
        bookData.title = titleMatch[1].trim();
      }
    }
  }
  
  const bookSpecPath = path.join(bookPath, '.progress', 'book-spec.md');
  if (fs.existsSync(bookSpecPath)) {
    const bookSpecContent = fs.readFileSync(bookSpecPath, 'utf-8');
    bookData.bookSpec = extractBookSpecInfo(bookSpecContent);
    
    if (!bookData.title && bookData.bookSpec.title) {
      bookData.title = bookData.bookSpec.title;
    }
    
    const specChars = extractCharactersFromBookSpec(bookSpecContent);
    if (specChars.length > 0 && bookData.characters.length === 0) {
      bookData.characters = specChars;
    }
  }
  
  if (!bookData.title) {
    const parts = bookDir.split('-');
    bookData.title = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }
  
  return bookData;
}

function listAvailableBooks() {
  const books = [];
  const entries = fs.readdirSync(COO_ROOT, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'operate') {
      const chaptersPath = path.join(COO_ROOT, entry.name, 'chapters');
      if (fs.existsSync(chaptersPath)) {
        books.push(entry.name);
      }
    }
  }
  
  return books;
}

async function main() {
  const args = process.argv.slice(2);
  
  let booksToProcess = [];
  
  if (args.length > 0) {
    booksToProcess = args;
  } else {
    booksToProcess = listAvailableBooks();
  }
  
  console.log('📚 读取书籍内容...\n');
  console.log(`找到 ${booksToProcess.length} 本书:\n`);
  
  const results = [];
  
  for (const bookDir of booksToProcess) {
    try {
      console.log(`📖 处理: ${bookDir}`);
      const bookData = readBook(bookDir);
      
      console.log(`   标题: ${bookData.title}`);
      console.log(`   章节: ${bookData.chapters.length}`);
      console.log(`   角色: ${bookData.characters.length}`);
      console.log(`   关键词: ${bookData.keywords.length}`);
      console.log('');
      
      results.push(bookData);
    } catch (error) {
      console.error(`   ❌ 错误: ${error.message}`);
      console.log('');
    }
  }
  
  const outputPath = path.join(__dirname, '..', 'logs', 'book-data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ 完成！数据已保存到: ${outputPath}`);
  
  return results;
}

main().catch(console.error);
