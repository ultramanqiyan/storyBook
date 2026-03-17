import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');
const MIGRATIONS_DIR = path.join(__dirname, '../migrations');

const presetBooks = fs.readdirSync(BOOKS_DIR)
  .filter(f => f.startsWith('preset-') && f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

console.log(`Found ${presetBooks.length} preset books\n`);

const htmlData = {};
for (const bookId of presetBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  const charactersMatch = htmlContent.match(/characters:\s*(\[[\s\S]*?\])\s*,\s*plotCards/);
  
  if (plotCardsMatch) {
    try {
      htmlData[bookId] = {
        plotCards: JSON.parse(plotCardsMatch[1]),
        characters: charactersMatch ? JSON.parse(charactersMatch[1]) : []
      };
    } catch (e) {
      console.log(`[ERROR] Failed to parse ${bookId}: ${e.message}`);
    }
  }
}

const sqlStatements = [];

for (const [bookId, data] of Object.entries(htmlData)) {
  for (const card of data.plotCards) {
    if (card.icon && card.card_id) {
      sqlStatements.push(
        `UPDATE plot_cards SET icon = '${card.icon}' WHERE card_id = '${card.card_id}' AND (icon IS NULL OR icon = '');`
      );
    }
  }
  
  for (const char of data.characters) {
    if (char.avatar && char.char_id) {
      sqlStatements.push(
        `UPDATE characters SET avatar = '${char.avatar}' WHERE char_id = '${char.char_id}' AND (avatar IS NULL OR avatar = '');`
      );
    }
  }
}

const outputFile = path.join(MIGRATIONS_DIR, '0702_sync_all_preset_icons.sql');
const content = `-- 同步所有预设书籍的icon和avatar字段
-- 生成时间: ${new Date().toISOString()}
-- 总计: ${sqlStatements.length} 条更新语句

${sqlStatements.join('\n')}

-- 验证
SELECT '=== 空icon的情节卡牌 ===' as info;
SELECT COUNT(*) as count FROM plot_cards WHERE book_id LIKE 'preset-%' AND (icon IS NULL OR icon = '');

SELECT '=== 空avatar的角色 ===' as info;
SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-%' AND (avatar IS NULL OR avatar = '');
`;

fs.writeFileSync(outputFile, content);
console.log(`Generated ${sqlStatements.length} SQL statements`);
console.log(`Output: ${outputFile}`);
