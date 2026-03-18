const Database = require('better-sqlite3');
const db = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

const books = db.prepare(`
  SELECT book_id, title, type, language 
  FROM books 
  WHERE book_id LIKE 'preset-%' 
  ORDER BY book_id
`).all();

console.log('Total preset books:', books.length);

console.log('\nBy language:');
const byLang = {};
books.forEach(b => {
  byLang[b.language] = (byLang[b.language] || 0) + 1;
});
console.log(byLang);

console.log('\nBy type:');
const byType = {};
books.forEach(b => {
  byType[b.type] = (byType[b.type] || 0) + 1;
});
console.log(byType);

console.log('\nBooks list:');
books.forEach(b => console.log(b.book_id, '-', b.title.substring(0, 40), '-', b.language));

db.close();
