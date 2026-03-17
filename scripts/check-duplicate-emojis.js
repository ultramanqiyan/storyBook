import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');

const presetBooks = fs.readdirSync(BOOKS_DIR)
  .filter(f => f.startsWith('preset-') && f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

console.log(`Checking ${presetBooks.length} preset books for duplicate emojis\n`);

const results = [];

for (const bookId of presetBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  if (!plotCardsMatch) continue;
  
  try {
    const plotCards = JSON.parse(plotCardsMatch[1]);
    
    const iconCounts = {};
    for (const card of plotCards) {
      const icon = card.icon || '';
      if (!iconCounts[icon]) iconCounts[icon] = [];
      iconCounts[icon].push(card.name);
    }
    
    const duplicates = Object.entries(iconCounts)
      .filter(([icon, cards]) => cards.length > 1)
      .map(([icon, cards]) => ({ icon, count: cards.length, cards }));
    
    if (duplicates.length > 0) {
      results.push({ bookId, duplicates, totalCards: plotCards.length });
    }
  } catch (e) {
    console.log(`[ERROR] Failed to parse ${bookId}: ${e.message}`);
  }
}

console.log(`=== Books with duplicate emojis: ${results.length} ===\n`);

for (const { bookId, duplicates, totalCards } of results) {
  console.log(`\n${bookId} (${totalCards} cards):`);
  for (const { icon, count, cards } of duplicates) {
    console.log(`  ${icon} (${count}x): ${cards.join(', ')}`);
  }
}

if (results.length === 0) {
  console.log('✅ All books have unique emojis!');
}
