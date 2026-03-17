import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');
const MIGRATIONS_DIR = path.join(__dirname, '../migrations');

const presetBooks = fs.readdirSync(BOOKS_DIR)
  .filter(f => f.startsWith('preset-') && f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

console.log(`Found ${presetBooks.length} preset books to check\n`);

const allMissingIcons = [];

for (const bookId of presetBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  if (!plotCardsMatch) {
    console.log(`[WARN] No plotCards found in ${bookId}`);
    continue;
  }
  
  try {
    const plotCards = JSON.parse(plotCardsMatch[1]);
    
    for (const card of plotCards) {
      if (!card.icon || card.icon === '') {
        allMissingIcons.push({
          bookId,
          cardId: card.card_id,
          name: card.name,
          icon: card.icon || ''
        });
      }
    }
  } catch (e) {
    console.log(`[ERROR] Failed to parse plotCards in ${bookId}: ${e.message}`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Total missing/empty icons: ${allMissingIcons.length}`);

if (allMissingIcons.length > 0) {
  console.log('\nMissing icons by book:');
  const byBook = {};
  for (const item of allMissingIcons) {
    if (!byBook[item.bookId]) byBook[item.bookId] = [];
    byBook[item.bookId].push(item);
  }
  
  for (const [bookId, cards] of Object.entries(byBook)) {
    console.log(`  ${bookId}: ${cards.length} cards`);
  }
} else {
  console.log('\n✅ All preset books have valid icons!');
}

const charactersMissing = [];
for (const bookId of presetBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const charactersMatch = htmlContent.match(/characters:\s*(\[[\s\S]*?\])\s*,\s*plotCards/);
  if (!charactersMatch) continue;
  
  try {
    const characters = JSON.parse(charactersMatch[1]);
    
    for (const char of characters) {
      if (!char.avatar || char.avatar === '') {
        charactersMissing.push({
          bookId,
          charId: char.char_id,
          name: char.name,
          avatar: char.avatar || ''
        });
      }
    }
  } catch (e) {
    console.log(`[ERROR] Failed to parse characters in ${bookId}: ${e.message}`);
  }
}

console.log(`\n=== Characters Check ===`);
console.log(`Total missing/empty avatars: ${charactersMissing.length}`);

if (charactersMissing.length > 0) {
  console.log('\nMissing avatars by book:');
  const byBook = {};
  for (const item of charactersMissing) {
    if (!byBook[item.bookId]) byBook[item.bookId] = [];
    byBook[item.bookId].push(item);
  }
  
  for (const [bookId, chars] of Object.entries(byBook)) {
    console.log(`  ${bookId}: ${chars.length} characters`);
  }
}
