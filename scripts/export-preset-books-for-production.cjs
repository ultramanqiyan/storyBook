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
