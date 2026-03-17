import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const db = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

const today = new Date().toISOString().split('T')[0];
const baseUrl = 'https://storybook-adventures.com';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateUrlEntry(url, priority, changefreq, alternates = []) {
  let entry = `  <url>\n`;
  entry += `    <loc>${url}</loc>\n`;
  entry += `    <lastmod>${today}</lastmod>\n`;
  entry += `    <changefreq>${changefreq}</changefreq>\n`;
  entry += `    <priority>${priority}</priority>\n`;
  
  for (const alt of alternates) {
    entry += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>\n`;
  }
  
  entry += `  </url>\n`;
  return entry;
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

`;

sitemap += generateUrlEntry(`${baseUrl}/`, '1.0', 'weekly', [
  { lang: 'zh', href: `${baseUrl}/?lang=zh` },
  { lang: 'en', href: `${baseUrl}/?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/` }
]);

sitemap += generateUrlEntry(`${baseUrl}/library.html`, '0.9', 'weekly', [
  { lang: 'zh', href: `${baseUrl}/library.html?lang=zh` },
  { lang: 'en', href: `${baseUrl}/library.html?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/library.html` }
]);

sitemap += generateUrlEntry(`${baseUrl}/how-to-play.html`, '0.7', 'monthly', [
  { lang: 'zh', href: `${baseUrl}/how-to-play.html?lang=zh` },
  { lang: 'en', href: `${baseUrl}/how-to-play.html?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/how-to-play.html` }
]);

sitemap += generateUrlEntry(`${baseUrl}/privacy.html`, '0.3', 'yearly');
sitemap += generateUrlEntry(`${baseUrl}/terms.html`, '0.3', 'yearly');

const presetBooks = db.prepare(`
  SELECT book_id, title, type, language 
  FROM books 
  WHERE book_id LIKE 'preset-%' 
  ORDER BY book_id
`).all();

const booksBySeries = {};
presetBooks.forEach(book => {
  const match = book.book_id.match(/preset-(ai|adventure|business|fantasy|romance)-(\d+)/);
  if (match) {
    const series = match[1];
    const num = parseInt(match[2]);
    if (!booksBySeries[series]) booksBySeries[series] = [];
    booksBySeries[series].push({ ...book, num });
  }
});

Object.keys(booksBySeries).sort().forEach(series => {
  const books = booksBySeries[series].sort((a, b) => a.num - b.num);
  
  books.forEach(book => {
    const bookId = book.book_id;
    const isZh = book.language === 'zh';
    
    if (series === 'ai') {
      const enId = bookId;
      const zhId = `${bookId}-zh`;
      
      if (isZh) {
        sitemap += generateUrlEntry(`${baseUrl}/books/${enId}.html`, '0.8', 'monthly', [
          { lang: 'en', href: `${baseUrl}/books/${enId}.html` },
          { lang: 'zh', href: `${baseUrl}/books/${zhId}.html` }
        ]);
        sitemap += generateUrlEntry(`${baseUrl}/books/${zhId}.html`, '0.8', 'monthly', [
          { lang: 'en', href: `${baseUrl}/books/${enId}.html` },
          { lang: 'zh', href: `${baseUrl}/books/${zhId}.html` }
        ]);
      }
    } else {
      const baseId = bookId.replace(/-en$/, '').replace(/-zh$/, '');
      const hasEn = books.some(b => b.book_id === `${baseId}-en`);
      const hasZh = books.some(b => b.book_id === `${baseId}-zh`);
      
      if (bookId === baseId) {
        const alternates = [];
        if (hasEn) alternates.push({ lang: 'en', href: `${baseUrl}/books/${baseId}-en.html` });
        if (hasZh) alternates.push({ lang: 'zh', href: `${baseUrl}/books/${baseId}.html` });
        sitemap += generateUrlEntry(`${baseUrl}/books/${baseId}.html`, '0.8', 'monthly', alternates);
      } else if (bookId === `${baseId}-en`) {
        const alternates = [];
        if (hasZh) alternates.push({ lang: 'zh', href: `${baseUrl}/books/${baseId}.html` });
        alternates.push({ lang: 'en', href: `${baseUrl}/books/${baseId}-en.html` });
        sitemap += generateUrlEntry(`${baseUrl}/books/${baseId}-en.html`, '0.8', 'monthly', alternates);
      }
    }
  });
});

const chapters = db.prepare(`
  SELECT DISTINCT 
    SUBSTR(chapter_id, 1, LENGTH(chapter_id) - 3) as book_prefix,
    chapter_id
  FROM chapters 
  WHERE chapter_id LIKE 'chapter-%'
  ORDER BY chapter_id
`).all();

const chapterFiles = fs.readdirSync('src/frontend/chapters')
  .filter(f => f.endsWith('.html'))
  .sort();

const addedChapters = new Set();

chapterFiles.forEach(file => {
  const chapterId = file.replace('.html', '');
  if (addedChapters.has(chapterId)) return;
  addedChapters.add(chapterId);
  
  const isZh = chapterId.endsWith('-zh');
  const baseChapterId = isZh ? chapterId.replace('-zh', '') : chapterId;
  
  const enFile = `${baseChapterId}.html`;
  const zhFile = `${baseChapterId}-zh.html`;
  
  const hasEn = fs.existsSync(`src/frontend/chapters/${enFile}`);
  const hasZh = fs.existsSync(`src/frontend/chapters/${zhFile}`);
  
  if (isZh) {
    const alternates = [];
    if (hasEn) alternates.push({ lang: 'en', href: `${baseUrl}/chapters/${enFile}` });
    alternates.push({ lang: 'zh', href: `${baseUrl}/chapters/${zhFile}` });
    sitemap += generateUrlEntry(`${baseUrl}/chapters/${zhFile}`, '0.6', 'monthly', alternates);
  } else {
    const alternates = [];
    alternates.push({ lang: 'en', href: `${baseUrl}/chapters/${enFile}` });
    if (hasZh) alternates.push({ lang: 'zh', href: `${baseUrl}/chapters/${zhFile}` });
    sitemap += generateUrlEntry(`${baseUrl}/chapters/${enFile}`, '0.6', 'monthly', alternates);
  }
});

sitemap += `</urlset>\n`;

fs.writeFileSync('src/frontend/sitemap.xml', sitemap);
console.log('✅ sitemap.xml 已更新');
console.log(`   书籍数量: ${presetBooks.length}`);
console.log(`   章节数量: ${addedChapters.size}`);
