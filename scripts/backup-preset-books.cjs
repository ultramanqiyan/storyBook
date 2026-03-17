const fs = require('fs');
const { execSync } = require('child_process');

const backupDir = './backups';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 10);

function generatePresetBooksSql(isRemote) {
    const location = isRemote ? 'remote' : 'local';
    const outputFile = `${backupDir}/${location}_preset_books_only_${timestamp}.sql`;
    
    console.log(`\n生成${isRemote ? '线上' : '本地'}预设书籍SQL备份...`);
    
    let sqlContent = `-- 预设书籍数据备份
-- 来源: ${isRemote ? '线上数据库' : '本地数据库'}
-- 生成时间: ${new Date().toISOString()}
-- 数据库: storybook_database

PRAGMA defer_foreign_keys=TRUE;

`;

    const tables = ['books', 'characters', 'plot_cards', 'chapters', 'puzzles'];
    
    for (const table of tables) {
        console.log(`导出表: ${table}...`);
        
        let query;
        if (table === 'books') {
            query = `SELECT * FROM ${table} WHERE is_preset = 1`;
        } else if (table === 'puzzles') {
            query = `SELECT * FROM ${table} WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%')`;
        } else {
            query = `SELECT * FROM ${table} WHERE book_id LIKE 'preset-%'`;
        }
        
        try {
            const result = execSync(
                `wrangler d1 execute storybook_database --${location} --command "${query}" --json`,
                { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
            );
            
            const data = JSON.parse(result);
            const rows = data[0]?.results || [];
            
            if (rows.length > 0) {
                sqlContent += `-- 表 ${table} (${rows.length} 条记录)\n`;
                
                for (const row of rows) {
                    const columns = Object.keys(row);
                    const values = columns.map(col => {
                        const val = row[col];
                        if (val === null) return 'NULL';
                        if (typeof val === 'number') return val;
                        return `'${String(val).replace(/'/g, "''")}'`;
                    });
                    
                    sqlContent += `INSERT INTO "${table}" ("${columns.join('","')}") VALUES(${values.join(',')});\n`;
                }
                sqlContent += '\n';
            }
        } catch (error) {
            console.error(`导出表 ${table} 失败:`, error.message);
        }
    }
    
    fs.writeFileSync(outputFile, sqlContent, 'utf8');
    console.log(`备份文件已生成: ${outputFile}`);
    
    const stats = fs.statSync(outputFile);
    console.log(`文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
    
    return outputFile;
}

console.log('========================================');
console.log('  预设书籍数据备份工具');
console.log('========================================');

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

generatePresetBooksSql(false);
generatePresetBooksSql(true);

console.log('\n========================================');
console.log('  备份完成！');
console.log('========================================');
