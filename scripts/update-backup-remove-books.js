import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_TO_DELETE = [
  'preset-adventure-003', 'preset-adventure-003-en',
  'preset-adventure-004', 'preset-adventure-004-en',
  'preset-fantasy-003', 'preset-fantasy-003-en',
  'preset-fantasy-004', 'preset-fantasy-004-en',
  'preset-romance-003', 'preset-romance-003-en',
  'preset-romance-004', 'preset-romance-004-en',
  'preset-business-003', 'preset-business-003-en',
  'preset-business-004', 'preset-business-004-en'
];

function main() {
  const sqlPath = path.join(__dirname, '../backups/local_storybook_database_backup.sql');
  
  console.log('📖 读取数据库备份文件...');
  let sql = fs.readFileSync(sqlPath, 'utf8');
  
  const lines = sql.split('\n');
  const newLines = [];
  let deletedBooks = 0;
  let deletedCharacters = 0;
  
  for (const line of lines) {
    let shouldDelete = false;
    
    if (line.includes('INSERT INTO "books"')) {
      for (const bookId of BOOKS_TO_DELETE) {
        if (line.includes(`'${bookId}'`)) {
          shouldDelete = true;
          deletedBooks++;
          console.log(`  删除书籍: ${bookId}`);
          break;
        }
      }
    }
    
    if (line.includes('INSERT INTO "characters"')) {
      for (const bookId of BOOKS_TO_DELETE) {
        if (line.includes(`'${bookId}'`)) {
          shouldDelete = true;
          deletedCharacters++;
          break;
        }
      }
    }
    
    if (!shouldDelete) {
      newLines.push(line);
    }
  }
  
  console.log(`\n📊 删除统计:`);
  console.log(`  - 书籍: ${deletedBooks}`);
  console.log(`  - 角色: ${deletedCharacters}`);
  
  const newSql = newLines.join('\n');
  fs.writeFileSync(sqlPath, newSql, 'utf8');
  
  console.log(`\n✅ 数据库备份文件已更新`);
}

main();
