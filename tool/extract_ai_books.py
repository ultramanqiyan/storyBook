import re

backup_file = 'd:/trae_job/storyBook/backups/local_storybook_database_backup.sql'
migration_file = 'd:/trae_job/storyBook/migrations/0700_add_23_ai_preset_books.sql'

with open(backup_file, 'r', encoding='utf-8') as f:
    content = f.read()

plot_cards = re.findall(r"INSERT INTO \"plot_cards\" VALUES\('card-ai\d+-\w+',.*?\);", content, re.DOTALL)
print(f'Found {len(plot_cards)} plot_cards for AI series')

chapters = re.findall(r"INSERT INTO \"chapters\" VALUES\('chapter-ai\d+-\d+',.*?\);", content, re.DOTALL)
print(f'Found {len(chapters)} chapters for AI series')

with open(migration_file, 'a', encoding='utf-8') as f:
    f.write('\n\n-- ============================================\n')
    f.write('-- 第三部分: 情节卡牌数据 (完整)\n')
    f.write('-- ============================================\n\n')
    for card in plot_cards:
        f.write(card + '\n')
    
    f.write('\n-- ============================================\n')
    f.write('-- 第四部分: 章节数据 (完整)\n')
    f.write('-- ============================================\n\n')
    for chapter in chapters:
        f.write(chapter + '\n')

print('Migration script updated successfully!')
