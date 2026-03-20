import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const SQL_OUTPUT_PATH = path.join(__dirname, '..', 'sql');
const LOGS_PATH = path.join(__dirname, '..', 'logs');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  const logFile = path.join(LOGS_PATH, 'import-db.log');
  fs.appendFileSync(logFile, logMessage);
  
  switch (type) {
    case 'error':
      console.error(`❌ ${message}`);
      break;
    case 'warn':
      console.warn(`⚠️ ${message}`);
      break;
    case 'success':
      console.log(`✅ ${message}`);
      break;
    default:
      console.log(`ℹ️ ${message}`);
  }
}

function executeSQLFile(sqlPath, database = 'storybook_database', local = true) {
  const localFlag = local ? '--local' : '';
  const command = `npx wrangler d1 execute ${database} ${localFlag} --file="${sqlPath}"`;
  
  try {
    const result = execSync(command, {
      cwd: path.join(__dirname, '..', '..', '..'),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      stderr: error.stderr || ''
    };
  }
}

function executeSQLCommand(sql, database = 'storybook_database', local = true) {
  const localFlag = local ? '--local' : '';
  const escapedSql = sql.replace(/"/g, '\\"');
  const command = `npx wrangler d1 execute ${database} ${localFlag} --command="${escapedSql}"`;
  
  try {
    const result = execSync(command, {
      cwd: path.join(__dirname, '..', '..', '..'),
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      stderr: error.stderr || ''
    };
  }
}

function checkBookExists(bookId, database = 'storybook_database', local = true) {
  const sql = `SELECT book_id FROM books WHERE book_id = '${bookId}'`;
  const result = executeSQLCommand(sql, database, local);
  
  if (result.success && result.output) {
    try {
      const jsonResult = JSON.parse(result.output);
      return jsonResult[0]?.results?.length > 0;
    } catch {
      return false;
    }
  }
  
  return false;
}

function deleteBookData(bookId, database = 'storybook_database', local = true) {
  const statements = [
    `DELETE FROM chapters WHERE book_id = '${bookId}'`,
    `DELETE FROM plot_cards WHERE book_id = '${bookId}'`,
    `DELETE FROM characters WHERE book_id = '${bookId}'`,
    `DELETE FROM books WHERE book_id = '${bookId}'`
  ];
  
  for (const sql of statements) {
    const result = executeSQLCommand(sql, database, local);
    if (!result.success) {
      log(`删除数据失败: ${sql}`, 'error');
      return false;
    }
  }
  
  return true;
}

async function importBook(bookId, options = {}) {
  const { 
    overwrite = false, 
    database = 'storybook_database',
    local = true 
  } = options;
  
  const sqlDir = path.join(SQL_OUTPUT_PATH, bookId);
  
  if (!fs.existsSync(sqlDir)) {
    log(`SQL目录不存在: ${sqlDir}`, 'error');
    return { success: false, error: 'SQL directory not found' };
  }
  
  log(`开始导入书籍: ${bookId}`);
  
  const exists = checkBookExists(bookId, database, local);
  
  if (exists) {
    if (overwrite) {
      log(`书籍已存在，删除旧数据...`);
      if (!deleteBookData(bookId, database, local)) {
        return { success: false, error: 'Failed to delete existing data' };
      }
    } else {
      log(`书籍已存在，跳过导入（使用 --overwrite 覆盖）`, 'warn');
      return { success: false, error: 'Book already exists' };
    }
  }
  
  const sqlFiles = ['book.sql', 'characters.sql', 'plot-cards.sql', 'chapters.sql'];
  const results = [];
  
  for (const file of sqlFiles) {
    const filePath = path.join(sqlDir, file);
    
    if (!fs.existsSync(filePath)) {
      log(`文件不存在: ${file}`, 'warn');
      continue;
    }
    
    log(`导入: ${file}`);
    
    const result = executeSQLFile(filePath, database, local);
    
    if (result.success) {
      log(`成功: ${file}`, 'success');
      results.push({ file, success: true });
    } else {
      log(`失败: ${file} - ${result.error}`, 'error');
      results.push({ file, success: false, error: result.error });
      return { success: false, results, error: result.error };
    }
  }
  
  log(`导入完成: ${bookId}`, 'success');
  return { success: true, results };
}

async function main() {
  const args = process.argv.slice(2);
  
  let booksToImport = [];
  let options = {
    overwrite: false,
    database: 'storybook_database',
    local: true
  };
  
  for (const arg of args) {
    if (arg === '--overwrite' || arg === '-o') {
      options.overwrite = true;
    } else if (arg === '--remote' || arg === '-r') {
      options.local = false;
    } else if (arg.startsWith('--database=')) {
      options.database = arg.split('=')[1];
    } else if (arg !== '--help' && arg !== '-h') {
      booksToImport.push(arg);
    }
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
用法: node 04-import-db.js [选项] [书籍ID...]

选项:
  --overwrite, -o    覆盖已存在的书籍
  --remote, -r       导入到远程数据库（默认本地）
  --database=NAME    指定数据库名称
  --help, -h         显示帮助信息

示例:
  node 04-import-db.js preset-coo-the-unconditional
  node 04-import-db.js --overwrite preset-coo-the-unconditional
  node 04-import-db.js --remote preset-coo-the-unconditional
`);
    process.exit(0);
  }
  
  if (booksToImport.length === 0) {
    const sqlDirs = fs.readdirSync(SQL_OUTPUT_PATH, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    booksToImport = sqlDirs;
  }
  
  if (booksToImport.length === 0) {
    log('没有找到要导入的书籍', 'error');
    process.exit(1);
  }
  
  console.log('📦 导入书籍到数据库...\n');
  console.log(`数据库: ${options.database}`);
  console.log(`模式: ${options.local ? '本地' : '远程'}`);
  console.log(`覆盖: ${options.overwrite ? '是' : '否'}`);
  console.log(`书籍: ${booksToImport.join(', ')}\n`);
  
  const results = [];
  
  for (const bookId of booksToImport) {
    const result = await importBook(bookId, options);
    results.push({ bookId, ...result });
    console.log('');
  }
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log('========================================');
  console.log(`导入完成: ${successCount} 成功, ${failCount} 失败`);
  console.log('========================================');
  
  const summaryPath = path.join(LOGS_PATH, 'import-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  
  return results;
}

main().catch(console.error);
