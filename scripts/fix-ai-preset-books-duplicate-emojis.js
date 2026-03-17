import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');
const MIGRATIONS_DIR = path.join(__dirname, '../migrations');

const aiBooks = fs.readdirSync(BOOKS_DIR)
  .filter(f => f.startsWith('preset-ai-') && f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

console.log(`Found ${aiBooks.length} AI preset books to fix\n`);

const allFixes = [];

for (const bookId of aiBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  if (!plotCardsMatch) continue;
  
  try {
    const plotCards = JSON.parse(plotCardsMatch[1]);
    
    for (const card of plotCards) {
      const newIcon = getUniqueIcon(card.card_id, card.sub_type, card.name);
      allFixes.push({
        bookId,
        cardId: card.card_id,
        subType: card.sub_type,
        name: card.name,
        oldIcon: card.icon,
        newIcon
      });
    }
  } catch (e) {
    console.log(`[ERROR] Failed to parse ${bookId}: ${e.message}`);
  }
}

const outputFile = path.join(MIGRATIONS_DIR, '0704_fix_ai_preset_books_duplicate_emojis.sql');
const header = `-- 修复AI预设书籍重复emoji问题
-- 执行时间: ${new Date().toISOString()}
-- 总计: ${allFixes.length} 条修复语句

`;

for (const fix of allFixes) {
  header += `-- ${fix.bookId}: ${fix.cardId} (${fix.sub_type})\n`;
  header += `UPDATE plot_cards SET icon = '${fix.newIcon}' WHERE card_id = '${fix.cardId}';\n`;
}

fs.writeFileSync(outputFile, header + footer);
console.log(`Generated ${allFixes.length} SQL statements`);
console.log(`Output: ${outputFile}`);
