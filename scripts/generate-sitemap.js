import Database from 'better-sqlite3';
import fs from 'fs';

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

function generateBookUrlEntry(bookId, priority, changefreq) {
  const url = `${baseUrl}/books/${bookId}`;
  return generateUrlEntry(url, priority, changefreq, [
    { lang: 'en', href: `${url}?lang=en` },
    { lang: 'zh', href: `${url}?lang=zh` },
    { lang: 'x-default', href: url }
  ]);
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

sitemap += generateUrlEntry(`${baseUrl}/library`, '0.8', 'weekly', [
  { lang: 'zh', href: `${baseUrl}/library?lang=zh` },
  { lang: 'en', href: `${baseUrl}/library?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/library` }
]);

sitemap += generateUrlEntry(`${baseUrl}/how-to-play`, '0.8', 'monthly', [
  { lang: 'zh', href: `${baseUrl}/how-to-play?lang=zh` },
  { lang: 'en', href: `${baseUrl}/how-to-play?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/how-to-play` }
]);

sitemap += generateUrlEntry(`${baseUrl}/privacy`, '0.3', 'yearly');
sitemap += generateUrlEntry(`${baseUrl}/terms`, '0.3', 'yearly');

const presetBooks = db.prepare(`
  SELECT book_id, title, type, language 
  FROM books 
  WHERE book_id LIKE 'preset-%' 
  ORDER BY book_id
`).all();

const englishBooks = presetBooks.filter(book => !book.book_id.includes('-zh'));

englishBooks.forEach(book => {
  const bookId = book.book_id;
  const isAi = bookId.startsWith('preset-ai-');
  const isCoo = bookId.startsWith('preset-coo-');
  const priority = (isAi || isCoo) ? '0.9' : '0.5';
  
  sitemap += generateBookUrlEntry(bookId, priority, 'monthly');
});

sitemap += `</urlset>\n`;

fs.writeFileSync('src/frontend/sitemap.xml', sitemap);
console.log('✅ sitemap.xml 已更新');
console.log(`   英文书籍数量: ${englishBooks.length}`);
