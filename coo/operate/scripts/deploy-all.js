import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPERATE_ROOT = path.join(__dirname, '..');
const PROJECT_ROOT = path.join(__dirname, '..', '..', '..');
const CONFIG_PATH = path.join(OPERATE_ROOT, 'config.json');
const LOGS_PATH = path.join(OPERATE_ROOT, 'logs');

const SQL_OUTPUT = path.join(OPERATE_ROOT, 'sql');
const FRONTEND_OUTPUT = path.join(OPERATE_ROOT, 'frontend');
const MIGRATIONS_TARGET = path.join(PROJECT_ROOT, 'migrations');
const FRONTEND_TARGET = path.join(PROJECT_ROOT, 'src', 'frontend');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  const logFile = path.join(LOGS_PATH, 'deploy.log');
  fs.mkdirSync(LOGS_PATH, { recursive: true });
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
    case 'step':
      console.log(`\n🔷 ${message}`);
      break;
    default:
      console.log(`ℹ️ ${message}`);
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    log(`源目录不存在: ${src}`, 'warn');
    return false;
  }
  
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  
  return true;
}

function copySQLFiles() {
  log('复制SQL文件到migrations目录...', 'step');
  
  if (!fs.existsSync(SQL_OUTPUT)) {
    log('SQL输出目录不存在，请先运行生成脚本', 'error');
    return false;
  }
  
  const bookDirs = fs.readdirSync(SQL_OUTPUT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  if (bookDirs.length === 0) {
    log('没有找到SQL文件', 'warn');
    return false;
  }
  
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const migrationFile = path.join(MIGRATIONS_TARGET, `${timestamp}_coo_books.sql`);
  
  let allSQL = `-- ============================================
-- COO Books Migration
-- Generated: ${new Date().toISOString()}
-- ============================================

`;
  
  for (const bookId of bookDirs) {
    const sqlDir = path.join(SQL_OUTPUT, bookId);
    const completeSQL = path.join(sqlDir, 'complete.sql');
    
    if (fs.existsSync(completeSQL)) {
      const content = fs.readFileSync(completeSQL, 'utf-8');
      allSQL += content + '\n\n';
      log(`  添加: ${bookId}`);
    }
  }
  
  fs.writeFileSync(migrationFile, allSQL);
  log(`SQL迁移文件已创建: ${migrationFile}`, 'success');
  
  return true;
}

function copyFrontendFiles() {
  log('复制静态文件到src/frontend目录...', 'step');
  
  const booksSrc = path.join(FRONTEND_OUTPUT, 'books');
  const chaptersSrc = path.join(FRONTEND_OUTPUT, 'chapters');
  
  let copied = 0;
  
  if (fs.existsSync(booksSrc)) {
    const booksDest = path.join(FRONTEND_TARGET, 'books');
    fs.mkdirSync(booksDest, { recursive: true });
    
    const bookFiles = fs.readdirSync(booksSrc).filter(f => f.endsWith('.html'));
    for (const file of bookFiles) {
      fs.copyFileSync(path.join(booksSrc, file), path.join(booksDest, file));
      copied++;
    }
    log(`  复制 ${bookFiles.length} 个书籍页面`);
  }
  
  if (fs.existsSync(chaptersSrc)) {
    const chaptersDest = path.join(FRONTEND_TARGET, 'chapters');
    fs.mkdirSync(chaptersDest, { recursive: true });
    
    const chapterFiles = fs.readdirSync(chaptersSrc).filter(f => f.endsWith('.html'));
    for (const file of chapterFiles) {
      fs.copyFileSync(path.join(chaptersSrc, file), path.join(chaptersDest, file));
      copied++;
    }
    log(`  复制 ${chapterFiles.length} 个章节页面`);
  }
  
  if (copied === 0) {
    log('没有找到静态文件', 'warn');
    return false;
  }
  
  log(`共复制 ${copied} 个静态文件`, 'success');
  return true;
}

function importToDatabase(options = {}) {
  log('导入数据到数据库...', 'step');
  
  const { database = 'storybook_database', local = true } = options;
  const localFlag = local ? '--local' : '';
  
  const bookDirs = fs.readdirSync(SQL_OUTPUT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  if (bookDirs.length === 0) {
    log('没有找到SQL文件', 'warn');
    return false;
  }
  
  for (const bookId of bookDirs) {
    const sqlFile = path.join(SQL_OUTPUT, bookId, 'complete.sql');
    
    if (!fs.existsSync(sqlFile)) {
      log(`SQL文件不存在: ${bookId}`, 'warn');
      continue;
    }
    
    try {
      log(`  导入: ${bookId}`);
      execSync(
        `npx wrangler d1 execute ${database} ${localFlag} --file="${sqlFile}"`,
        { cwd: PROJECT_ROOT, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
      );
      log(`  成功: ${bookId}`, 'success');
    } catch (error) {
      log(`  失败: ${bookId} - ${error.message}`, 'error');
      return false;
    }
  }
  
  return true;
}

async function runAllSteps(bookDir, options = {}) {
  const { skipDB = false, skipFrontend = false, local = true, overwrite = false } = options;
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║       COO 书籍一键部署工具                 ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  log(`目标书籍: ${bookDir || '所有书籍'}`);
  log(`模式: ${local ? '本地' : '远程'}`);
  log(`覆盖: ${overwrite ? '是' : '否'}`);
  
  const scriptsDir = path.join(OPERATE_ROOT, 'scripts');
  
  log('Step 1: 读取书籍内容', 'step');
  try {
    const readCmd = `node "${path.join(scriptsDir, '01-read-book.js')}"${bookDir ? ` ${bookDir}` : ''}`;
    execSync(readCmd, { cwd: OPERATE_ROOT, encoding: 'utf-8', stdio: 'inherit' });
  } catch (error) {
    log('读取书籍内容失败', 'error');
    return false;
  }
  
  log('Step 2: 分析书籍类型', 'step');
  try {
    execSync(`node "${path.join(scriptsDir, '02-analyze-type.js')}"`, { cwd: OPERATE_ROOT, encoding: 'utf-8', stdio: 'inherit' });
  } catch (error) {
    log('分析书籍类型失败', 'error');
    return false;
  }
  
  log('Step 3: 生成SQL文件', 'step');
  try {
    execSync(`node "${path.join(scriptsDir, '03-generate-sql.js')}"`, { cwd: OPERATE_ROOT, encoding: 'utf-8', stdio: 'inherit' });
  } catch (error) {
    log('生成SQL文件失败', 'error');
    return false;
  }
  
  if (!skipDB) {
    log('Step 4: 导入数据库', 'step');
    const importOptions = { local, overwrite };
    if (!importToDatabase(importOptions)) {
      log('导入数据库失败', 'error');
      return false;
    }
  } else {
    log('Step 4: 跳过数据库导入', 'warn');
  }
  
  if (!skipFrontend) {
    log('Step 5: 生成静态文件', 'step');
    try {
      const bookId = bookDir ? `preset-coo-${bookDir}` : '';
      execSync(`node "${path.join(scriptsDir, '05-generate-static.js')}"${bookId ? ` ${bookId}` : ''}`, { cwd: OPERATE_ROOT, encoding: 'utf-8', stdio: 'inherit' });
    } catch (error) {
      log('生成静态文件失败', 'error');
      return false;
    }
    
    log('Step 6: 复制文件到目标目录', 'step');
    copySQLFiles();
    copyFrontendFiles();
  } else {
    log('Step 5-6: 跳过静态文件生成', 'warn');
  }
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║           🎉 部署完成！                    ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  return true;
}

function showHelp() {
  console.log(`
用法: node deploy-all.js [选项] [书籍目录名]

选项:
  --help, -h           显示帮助信息
  --skip-db            跳过数据库导入
  --skip-frontend      跳过静态文件生成
  --remote             使用远程数据库（默认本地）
  --overwrite, -o      覆盖已存在的书籍

示例:
  node deploy-all.js the-unconditional
  node deploy-all.js --overwrite the-unconditional
  node deploy-all.js --skip-db the-unconditional
  node deploy-all.js                  # 处理所有书籍
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }
  
  const options = {
    skipDB: false,
    skipFrontend: false,
    local: true,
    overwrite: false
  };
  
  let bookDir = null;
  
  for (const arg of args) {
    if (arg === '--skip-db') {
      options.skipDB = true;
    } else if (arg === '--skip-frontend') {
      options.skipFrontend = true;
    } else if (arg === '--remote') {
      options.local = false;
    } else if (arg === '--overwrite' || arg === '-o') {
      options.overwrite = true;
    } else if (!arg.startsWith('-')) {
      bookDir = arg;
    }
  }
  
  await runAllSteps(bookDir, options);
}

main().catch(console.error);
