# 预设书籍上线实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 创建预设书籍上线所需的脚本和SQL文件，包括导出、验证和上线流程。

**Architecture:** 使用Node.js脚本从本地D1数据库导出预设书籍数据，生成SQL文件后使用临时数据库验证，最后通过批处理脚本完成线上部署。

**Tech Stack:** Node.js, Wrangler CLI, D1 Database, Batch Script

---

## Task 1: 创建删除预设书籍SQL文件

**Files:**
- Create: `migrations/delete_preset_books.sql`

**Step 1: 创建删除SQL文件**

```sql
-- 删除预设书籍数据
-- 按外键依赖顺序删除，确保数据完整性

PRAGMA defer_foreign_keys=TRUE;

-- 删除预设书籍的谜题
DELETE FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%');

-- 删除预设书籍的章节
DELETE FROM chapters WHERE book_id LIKE 'preset-%';

-- 删除预设书籍的情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';

-- 删除预设书籍的角色
DELETE FROM characters WHERE book_id LIKE 'preset-%';

-- 删除预设书籍
DELETE FROM books WHERE is_preset = 1;
```

**Step 2: 验证文件创建成功**

Run: `type migrations\delete_preset_books.sql`
Expected: 显示SQL文件内容

**Step 3: Commit**

```bash
git add migrations/delete_preset_books.sql
git commit -m "feat: add delete preset books SQL for deployment"
```

---

## Task 2: 创建SQL导出脚本

**Files:**
- Create: `scripts/export-preset-books-for-production.js`

**Step 1: 创建导出脚本**

```javascript
const fs = require('fs');
const { execSync } = require('child_process');

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const outputFile = `./migrations/production_preset_books_${timestamp}.sql`;

function escapeSqlValue(val) {
    if (val === null) return 'NULL';
    if (typeof val === 'number') return val;
    return `'${String(val).replace(/'/g, "''")}'`;
}

function exportPresetBooks() {
    console.log('========================================');
    console.log('  预设书籍SQL导出工具（生产环境用）');
    console.log('========================================\n');
    
    let sqlContent = `-- 预设书籍数据（生产环境导入用）
-- 来源: 本地数据库
-- 生成时间: ${new Date().toISOString()}
-- 数据库: storybook_database
-- 书籍数量: 31本英文 + 8本中文 = 39本

PRAGMA defer_foreign_keys=TRUE;

`;

    const tables = [
        { name: 'books', query: "SELECT * FROM books WHERE is_preset = 1 ORDER BY language, book_id" },
        { name: 'characters', query: "SELECT * FROM characters WHERE book_id LIKE 'preset-%' ORDER BY book_id, char_id" },
        { name: 'plot_cards', query: "SELECT * FROM plot_cards WHERE book_id LIKE 'preset-%' ORDER BY book_id, card_id" },
        { name: 'chapters', query: "SELECT * FROM chapters WHERE book_id LIKE 'preset-%' ORDER BY book_id, order_num" },
        { name: 'puzzles', query: "SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%') ORDER BY chapter_id, puzzle_id" }
    ];
    
    const stats = {};
    
    for (const table of tables) {
        console.log(`导出表: ${table.name}...`);
        
        try {
            const result = execSync(
                `wrangler d1 execute storybook_database --local --command "${table.query}" --json`,
                { encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 }
            );
            
            const data = JSON.parse(result);
            const rows = data[0]?.results || [];
            stats[table.name] = rows.length;
            
            if (rows.length > 0) {
                sqlContent += `-- 表 ${table.name} (${rows.length} 条记录)\n`;
                
                for (const row of rows) {
                    const columns = Object.keys(row);
                    const values = columns.map(col => escapeSqlValue(row[col]));
                    sqlContent += `INSERT INTO "${table.name}" ("${columns.join('","')}") VALUES(${values.join(',')});\n`;
                }
                sqlContent += '\n';
            }
        } catch (error) {
            console.error(`导出表 ${table.name} 失败:`, error.message);
            process.exit(1);
        }
    }
    
    fs.writeFileSync(outputFile, sqlContent, 'utf8');
    
    console.log('\n----------------------------------------');
    console.log('导出统计:');
    console.log(`  - books: ${stats.books} 本`);
    console.log(`  - characters: ${stats.characters} 个`);
    console.log(`  - plot_cards: ${stats.plot_cards} 个`);
    console.log(`  - chapters: ${stats.chapters} 个`);
    console.log(`  - puzzles: ${stats.puzzles} 个`);
    console.log('----------------------------------------');
    
    const fileStats = fs.statSync(outputFile);
    console.log(`\n输出文件: ${outputFile}`);
    console.log(`文件大小: ${(fileStats.size / 1024).toFixed(2)} KB`);
    console.log('\n========================================');
    console.log('  导出完成！');
    console.log('========================================');
    
    return { outputFile, stats };
}

exportPresetBooks();
```

**Step 2: 运行导出脚本**

Run: `node scripts/export-preset-books-for-production.js`
Expected: 显示导出统计，生成SQL文件

**Step 3: 验证生成的SQL文件**

Run: `type migrations\production_preset_books_*.sql | findstr /c:"INSERT INTO" | find /c "INSERT"`
Expected: 显示INSERT语句数量

**Step 4: Commit**

```bash
git add scripts/export-preset-books-for-production.js
git commit -m "feat: add preset books export script for production"
```

---

## Task 3: 创建SQL验证脚本

**Files:**
- Create: `scripts/verify-preset-books-sql.js`

**Step 1: 创建验证脚本**

```javascript
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const TEST_DB_NAME = 'storybook_test_verify';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

function findSqlFile() {
    const files = fs.readdirSync('./migrations')
        .filter(f => f.startsWith('production_preset_books_') && f.endsWith('.sql'))
        .sort()
        .reverse();
    
    if (files.length === 0) {
        console.error('未找到预设书籍SQL文件！');
        process.exit(1);
    }
    
    return `./migrations/${files[0]}`;
}

function runCommand(cmd, silent = false) {
    try {
        const result = execSync(cmd, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' });
        return { success: true, output: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function runQuery(query) {
    const result = execSync(
        `wrangler d1 execute ${TEST_DB_NAME} --local --command "${query}" --json`,
        { encoding: 'utf8' }
    );
    const data = JSON.parse(result);
    return data[0]?.results || [];
}

function validateBasicData() {
    console.log('\n【基础数据验证】');
    const errors = [];
    
    const books = runQuery('SELECT * FROM books WHERE is_preset = 1');
    const enBooks = books.filter(b => b.language === 'en');
    const zhBooks = books.filter(b => b.language === 'zh');
    
    console.log(`  书籍总数: ${books.length} (预期: 39)`);
    console.log(`  - 英文: ${enBooks.length} (预期: 31)`);
    console.log(`  - 中文: ${zhBooks.length} (预期: 8)`);
    
    if (books.length !== 39) errors.push(`书籍数量不正确: ${books.length}`);
    if (enBooks.length !== 31) errors.push(`英文书籍数量不正确: ${enBooks.length}`);
    if (zhBooks.length !== 8) errors.push(`中文书籍数量不正确: ${zhBooks.length}`);
    
    return errors;
}

function validateContent() {
    console.log('\n【内容验证】');
    const errors = [];
    
    const books = runQuery('SELECT book_id, title FROM books WHERE is_preset = 1');
    
    for (const book of books) {
        const characters = runQuery(`SELECT * FROM characters WHERE book_id = '${book.book_id}'`);
        const chapters = runQuery(`SELECT * FROM chapters WHERE book_id = '${book.book_id}' ORDER BY order_num`);
        const plotCards = runQuery(`SELECT * FROM plot_cards WHERE book_id = '${book.book_id}'`);
        
        if (characters.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有角色`);
        }
        
        if (chapters.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有章节`);
        }
        
        for (const chapter of chapters) {
            if (!chapter.title || chapter.title.trim() === '') {
                errors.push(`书籍 ${book.book_id} 章节 ${chapter.chapter_id} 标题为空`);
            }
            if (!chapter.content || chapter.content.trim() === '') {
                errors.push(`书籍 ${book.book_id} 章节 ${chapter.chapter_id} 内容为空`);
            }
        }
        
        if (plotCards.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有情节卡牌`);
        }
    }
    
    console.log(`  检查了 ${books.length} 本书的内容`);
    
    return errors;
}

function validateCharacters() {
    console.log('\n【角色卡牌验证】');
    const errors = [];
    
    const characters = runQuery(`SELECT * FROM characters WHERE book_id LIKE 'preset-%'`);
    
    for (const char of characters) {
        if (!char.name || char.name.trim() === '') {
            errors.push(`角色 ${char.char_id} 名称为空`);
        }
        if (!char.role_type || char.role_type.trim() === '') {
            errors.push(`角色 ${char.char_id} 角色类型为空`);
        }
        if (!char.personality || char.personality.trim() === '') {
            errors.push(`角色 ${char.char_id} 性格为空`);
        }
    }
    
    console.log(`  检查了 ${characters.length} 个角色`);
    
    return errors;
}

function validatePlotCards() {
    console.log('\n【情节卡牌验证】');
    const errors = [];
    
    const cards = runQuery(`SELECT * FROM plot_cards WHERE book_id LIKE 'preset-%'`);
    
    for (const card of cards) {
        if (!card.name || card.name.trim() === '') {
            errors.push(`卡牌 ${card.card_id} 名称为空`);
        }
        if (!card.type || card.type.trim() === '') {
            errors.push(`卡牌 ${card.card_id} 类型为空`);
        }
        if (!card.icon || card.icon.trim() === '') {
            errors.push(`卡牌 ${card.card_id} 图标为空`);
        }
    }
    
    console.log(`  检查了 ${cards.length} 个情节卡牌`);
    
    return errors;
}

function validateJsonFields() {
    console.log('\n【JSON格式验证】');
    const errors = [];
    
    const chapters = runQuery(`SELECT * FROM chapters WHERE book_id LIKE 'preset-%'`);
    
    for (const chapter of chapters) {
        if (chapter.selected_cards) {
            try {
                JSON.parse(chapter.selected_cards);
            } catch (e) {
                errors.push(`章节 ${chapter.chapter_id} selected_cards JSON格式错误`);
            }
        }
    }
    
    console.log(`  检查了 ${chapters.length} 个章节的JSON字段`);
    
    return errors;
}

function validateEmoji() {
    console.log('\n【Emoji验证】');
    const errors = [];
    
    const tables = [
        { name: 'books', fields: ['title'] },
        { name: 'chapters', fields: ['title', 'content'] },
        { name: 'characters', fields: ['name', 'personality', 'speech_style'] },
        { name: 'plot_cards', fields: ['name', 'description', 'icon'] }
    ];
    
    const brokenEmojiPattern = /[�]{2,}/;
    
    for (const table of tables) {
        const rows = runQuery(`SELECT * FROM ${table.name} WHERE book_id LIKE 'preset-%' OR is_preset = 1`);
        
        for (const row of rows) {
            for (const field of table.fields) {
                if (row[field] && brokenEmojiPattern.test(row[field])) {
                    errors.push(`${table.name} ${row.book_id || row.chapter_id || row.char_id || row.card_id} 字段 ${field} 包含损坏的emoji`);
                }
            }
        }
    }
    
    console.log(`  Emoji验证完成`);
    
    return errors;
}

function validateForeignKeys() {
    console.log('\n【外键关联验证】');
    const errors = [];
    
    const books = runQuery('SELECT book_id FROM books WHERE is_preset = 1');
    const bookIds = new Set(books.map(b => b.book_id));
    
    const characters = runQuery(`SELECT DISTINCT book_id FROM characters WHERE book_id LIKE 'preset-%'`);
    for (const c of characters) {
        if (!bookIds.has(c.book_id)) {
            errors.push(`角色表存在孤立book_id: ${c.book_id}`);
        }
    }
    
    const chapters = runQuery(`SELECT DISTINCT book_id FROM chapters WHERE book_id LIKE 'preset-%'`);
    for (const c of chapters) {
        if (!bookIds.has(c.book_id)) {
            errors.push(`章节表存在孤立book_id: ${c.book_id}`);
        }
    }
    
    const plotCards = runQuery(`SELECT DISTINCT book_id FROM plot_cards WHERE book_id LIKE 'preset-%'`);
    for (const c of plotCards) {
        if (!bookIds.has(c.book_id)) {
            errors.push(`卡牌表存在孤立book_id: ${c.book_id}`);
        }
    }
    
    console.log(`  外键关联验证完成`);
    
    return errors;
}

async function main() {
    console.log('========================================');
    console.log('  预设书籍SQL验证工具');
    console.log('========================================');
    
    const sqlFile = findSqlFile();
    console.log(`\n验证文件: ${sqlFile}`);
    
    console.log('\n创建临时测试数据库...');
    runCommand(`wrangler d1 create ${TEST_DB_NAME} 2>nul`, true);
    
    console.log('初始化表结构...');
    const initResult = runCommand(`wrangler d1 execute ${TEST_DB_NAME} --local --file=./migrations/0001_init.sql`);
    if (!initResult.success) {
        console.error('初始化表结构失败！');
        process.exit(1);
    }
    
    console.log('导入预设书籍数据...');
    const importResult = runCommand(`wrangler d1 execute ${TEST_DB_NAME} --local --file=${sqlFile}`);
    if (!importResult.success) {
        console.error('导入数据失败！');
        process.exit(1);
    }
    
    const allErrors = [];
    
    allErrors.push(...validateBasicData());
    allErrors.push(...validateContent());
    allErrors.push(...validateCharacters());
    allErrors.push(...validatePlotCards());
    allErrors.push(...validateJsonFields());
    allErrors.push(...validateEmoji());
    allErrors.push(...validateForeignKeys());
    
    console.log('\n========================================');
    if (allErrors.length === 0) {
        console.log('  验证通过！SQL文件可用于生产环境');
        console.log('========================================');
    } else {
        console.log('  验证失败！发现以下问题：');
        console.log('========================================');
        allErrors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
        process.exit(1);
    }
}

main();
```

**Step 2: 运行验证脚本**

Run: `node scripts/verify-preset-books-sql.js`
Expected: 显示验证结果，全部通过

**Step 3: Commit**

```bash
git add scripts/verify-preset-books-sql.js
git commit -m "feat: add preset books SQL verification script"
```

---

## Task 4: 创建上线部署脚本

**Files:**
- Create: `deploy/deploy-preset-books.bat`

**Step 1: 创建部署脚本**

```batch
@echo off
chcp 65001 >nul
REM ========================================
REM 预设书籍上线部署脚本
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   预设书籍上线部署脚本
echo ========================================
echo.

REM 获取最新的SQL文件
for /f "delims=" %%i in ('dir /b /o-d migrations\production_preset_books_*.sql 2^>nul') do (
    set SQL_FILE=%%i
    goto :found
)
echo [错误] 未找到预设书籍SQL文件！
pause
exit /b 1
:found

echo SQL文件: migrations\!SQL_FILE!
echo.

REM 检查wrangler
echo [步骤1/7] 检查 wrangler 安装...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [错误] wrangler 未安装！
    pause
    exit /b 1
)

REM 检查登录状态
echo.
echo [步骤2/7] 检查 Cloudflare 登录状态...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo [提示] 请先登录 Cloudflare...
    wrangler login
    if errorlevel 1 (
        echo [错误] 登录失败！
        pause
        exit /b 1
    )
)

REM 部署前端
echo.
echo [步骤3/7] 部署前端到 Cloudflare Pages...
wrangler pages deploy src/frontend --project-name=storybook --commit-dirty=true
if errorlevel 1 (
    echo [错误] 前端部署失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo   代码部署完成！
echo ========================================
echo.
echo   请在浏览器中确认以下内容：
echo   1. 网站能正常访问
echo   2. 预设书籍列表能正常显示
echo   3. 用户登录功能正常
echo.
echo   网站地址: https://storybook.pages.dev
echo.
echo ========================================
echo.

pause

echo.
echo [步骤4/7] 备份线上预设书籍数据...
set BACKUP_FILE=backups\online_preset_books_backup_%date:~0,4%%date:~5,2%%date:~8,2%.sql
if not exist backups mkdir backups
wrangler d1 execute storybook_database --remote --command "SELECT * FROM books WHERE is_preset = 1" --json > !BACKUP_FILE!.json
echo 备份文件: !BACKUP_FILE!.json

echo.
echo [步骤5/7] 删除线上预设书籍...
wrangler d1 execute storybook_database --remote --file=./migrations/delete_preset_books.sql
if errorlevel 1 (
    echo [错误] 删除失败！
    pause
    exit /b 1
)

echo.
echo [步骤6/7] 导入新预设书籍...
wrangler d1 execute storybook_database --remote --file=./migrations/!SQL_FILE!
if errorlevel 1 (
    echo [错误] 导入失败！请检查备份文件恢复数据！
    pause
    exit /b 1
)

echo.
echo [步骤7/7] 验证导入结果...
wrangler d1 execute storybook_database --remote --command "SELECT language, COUNT(*) as count FROM books WHERE is_preset = 1 GROUP BY language"

echo.
echo ========================================
echo   上线完成！
echo ========================================
echo.
echo   预设书籍已更新：
echo   - 英文: 31本
echo   - 中文: 8本
echo.
echo   网站地址: https://storybook.pages.dev
echo.
echo ========================================

pause
```

**Step 2: Commit**

```bash
git add deploy/deploy-preset-books.bat
git commit -m "feat: add preset books deployment script"
```

---

## Task 5: 执行准备阶段流程

**Step 1: 运行导出脚本**

Run: `node scripts/export-preset-books-for-production.js`
Expected: 生成SQL文件，显示导出统计

**Step 2: 运行验证脚本**

Run: `node scripts/verify-preset-books-sql.js`
Expected: 验证通过，无错误

**Step 3: 确认SQL文件**

Run: `dir migrations\production_preset_books_*.sql`
Expected: 显示生成的SQL文件

**Step 4: Commit生成的SQL文件**

```bash
git add migrations/production_preset_books_*.sql
git commit -m "chore: add production preset books SQL"
```

---

## 执行顺序总结

1. **Task 1**: 创建删除SQL文件
2. **Task 2**: 创建导出脚本
3. **Task 3**: 创建验证脚本
4. **Task 4**: 创建部署脚本
5. **Task 5**: 执行准备阶段流程（导出+验证）

完成后，运行 `deploy\deploy-preset-books.bat` 执行上线。
