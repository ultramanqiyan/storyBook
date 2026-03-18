const fs = require('fs');
const { execSync } = require('child_process');

const DB_NAME = 'storybook_database';

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

function runQuery(query) {
    const result = execSync(
        `wrangler d1 execute ${DB_NAME} --local --command "${query}" --json`,
        { encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 }
    );
    const data = JSON.parse(result);
    return data[0]?.results || [];
}

function validateSqlFile(sqlFile) {
    console.log('\n【SQL文件验证】');
    const errors = [];
    
    const content = fs.readFileSync(sqlFile, 'utf8');
    
    const insertMatches = content.match(/INSERT INTO "(\w+)"/g) || [];
    const tableCounts = {};
    for (const match of insertMatches) {
        const tableName = match.match(/"(\w+)"/)[1];
        tableCounts[tableName] = (tableCounts[tableName] || 0) + 1;
    }
    
    console.log(`  SQL文件INSERT语句统计:`);
    for (const [table, count] of Object.entries(tableCounts)) {
        console.log(`    - ${table}: ${count} 条`);
    }
    
    if (tableCounts.books !== 39) {
        errors.push(`SQL文件中books的INSERT语句数量不正确: ${tableCounts.books}`);
    }
    
    const brokenEmojiPattern = /[\uFFFD]{2,}/;
    if (brokenEmojiPattern.test(content)) {
        errors.push(`SQL文件包含损坏的emoji字符`);
    }
    
    return errors;
}

function validateAll() {
    console.log('\n【加载数据库数据...】');
    const errors = [];
    
    const books = runQuery('SELECT * FROM books WHERE is_preset = 1');
    const characters = runQuery(`SELECT * FROM characters WHERE book_id LIKE 'preset-%'`);
    const chapters = runQuery(`SELECT * FROM chapters WHERE book_id LIKE 'preset-%'`);
    const plotCards = runQuery(`SELECT * FROM plot_cards WHERE book_id LIKE 'preset-%'`);
    
    console.log(`  加载完成: books=${books.length}, characters=${characters.length}, chapters=${chapters.length}, plotCards=${plotCards.length}`);
    
    console.log('\n【基础数据验证】');
    const enBooks = books.filter(b => b.language === 'en');
    const zhBooks = books.filter(b => b.language === 'zh');
    
    console.log(`  书籍总数: ${books.length} (预期: 39)`);
    console.log(`  - 英文: ${enBooks.length} (预期: 31)`);
    console.log(`  - 中文: ${zhBooks.length} (预期: 8)`);
    
    if (books.length !== 39) errors.push(`书籍数量不正确: ${books.length}`);
    if (enBooks.length !== 31) errors.push(`英文书籍数量不正确: ${enBooks.length}`);
    if (zhBooks.length !== 8) errors.push(`中文书籍数量不正确: ${zhBooks.length}`);
    
    console.log('\n【内容验证】');
    const bookIds = new Set(books.map(b => b.book_id));
    const brokenEmojiPattern = /[\uFFFD]{2,}/;
    
    for (const book of books) {
        const bookCharacters = characters.filter(c => c.book_id === book.book_id);
        const bookChapters = chapters.filter(c => c.book_id === book.book_id).sort((a, b) => a.order_num - b.order_num);
        const bookPlotCards = plotCards.filter(c => c.book_id === book.book_id);
        
        if (bookCharacters.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有角色`);
        }
        
        if (bookChapters.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有章节`);
        }
        
        for (const chapter of bookChapters) {
            if (!chapter.title || chapter.title.trim() === '') {
                errors.push(`书籍 ${book.book_id} 章节 ${chapter.chapter_id} 标题为空`);
            }
            if (!chapter.content || chapter.content.trim() === '') {
                errors.push(`书籍 ${book.book_id} 章节 ${chapter.chapter_id} 内容为空`);
            }
        }
        
        if (bookPlotCards.length === 0) {
            errors.push(`书籍 ${book.book_id} 没有情节卡牌`);
        }
    }
    
    console.log(`  检查了 ${books.length} 本书的内容`);
    
    console.log('\n【角色卡牌验证】');
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
    
    console.log('\n【情节卡牌验证】');
    for (const card of plotCards) {
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
    console.log(`  检查了 ${plotCards.length} 个情节卡牌`);
    
    console.log('\n【JSON格式验证】');
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
    
    console.log('\n【Emoji验证】');
    let emojiErrors = 0;
    for (const row of books) {
        if (row.title && brokenEmojiPattern.test(row.title)) {
            errors.push(`books ${row.book_id} 字段 title 包含损坏的emoji`);
            emojiErrors++;
        }
    }
    for (const row of chapters) {
        if (row.title && brokenEmojiPattern.test(row.title)) {
            errors.push(`chapters ${row.chapter_id} 字段 title 包含损坏的emoji`);
            emojiErrors++;
        }
        if (row.content && brokenEmojiPattern.test(row.content)) {
            errors.push(`chapters ${row.chapter_id} 字段 content 包含损坏的emoji`);
            emojiErrors++;
        }
    }
    for (const row of characters) {
        if (row.name && brokenEmojiPattern.test(row.name)) {
            errors.push(`characters ${row.char_id} 字段 name 包含损坏的emoji`);
            emojiErrors++;
        }
        if (row.personality && brokenEmojiPattern.test(row.personality)) {
            errors.push(`characters ${row.char_id} 字段 personality 包含损坏的emoji`);
            emojiErrors++;
        }
        if (row.speech_style && brokenEmojiPattern.test(row.speech_style)) {
            errors.push(`characters ${row.char_id} 字段 speech_style 包含损坏的emoji`);
            emojiErrors++;
        }
    }
    for (const row of plotCards) {
        if (row.name && brokenEmojiPattern.test(row.name)) {
            errors.push(`plot_cards ${row.card_id} 字段 name 包含损坏的emoji`);
            emojiErrors++;
        }
        if (row.description && brokenEmojiPattern.test(row.description)) {
            errors.push(`plot_cards ${row.card_id} 字段 description 包含损坏的emoji`);
            emojiErrors++;
        }
        if (row.icon && brokenEmojiPattern.test(row.icon)) {
            errors.push(`plot_cards ${row.card_id} 字段 icon 包含损坏的emoji`);
            emojiErrors++;
        }
    }
    console.log(`  Emoji验证完成，发现 ${emojiErrors} 个问题`);
    
    console.log('\n【外键关联验证】');
    const charBookIds = new Set(characters.map(c => c.book_id));
    const chapterBookIds = new Set(chapters.map(c => c.book_id));
    const plotCardBookIds = new Set(plotCards.map(c => c.book_id));
    
    for (const id of charBookIds) {
        if (!bookIds.has(id)) {
            errors.push(`角色表存在孤立book_id: ${id}`);
        }
    }
    for (const id of chapterBookIds) {
        if (!bookIds.has(id)) {
            errors.push(`章节表存在孤立book_id: ${id}`);
        }
    }
    for (const id of plotCardBookIds) {
        if (!bookIds.has(id)) {
            errors.push(`卡牌表存在孤立book_id: ${id}`);
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
    
    const allErrors = [];
    
    allErrors.push(...validateSqlFile(sqlFile));
    allErrors.push(...validateAll());
    
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
