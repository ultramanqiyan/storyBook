import re

migration_file = 'd:/trae_job/storyBook/migrations/0700_add_23_ai_preset_books.sql'
backup_file = 'd:/trae_job/storyBook/backups/local_storybook_database_backup.sql'

with open(migration_file, 'r', encoding='utf-8') as f:
    migration_content = f.read()

with open(backup_file, 'r', encoding='utf-8') as f:
    backup_content = f.read()

def extract_ids(content, table, id_pattern):
    matches = re.findall(f'INSERT INTO "{table}".*?preset-ai-\\d+', content)
    ids = set()
    for match in matches:
        m = re.search(id_pattern, match)
        if m:
            ids.add(m.group(1))
    return ids, len(matches)

print('=== 完整验证报告 ===\n')

books_mig, books_mig_count = extract_ids(migration_content, 'books', r"'(preset-ai-\d+)'")
books_bak, books_bak_count = extract_ids(backup_content, 'books', r"'(preset-ai-\d+)'")

chars_mig, chars_mig_count = extract_ids(migration_content, 'characters', r"'(char-ai\d+-\d+)'")
chars_bak, chars_bak_count = extract_ids(backup_content, 'characters', r"'(char-ai\d+-\d+)'")

cards_mig, cards_mig_count = extract_ids(migration_content, 'plot_cards', r"'(card-ai\d+-\w+)'")
cards_bak, cards_bak_count = extract_ids(backup_content, 'plot_cards', r"'(card-ai\d+-\w+)'")

chapters_mig, chapters_mig_count = extract_ids(migration_content, 'chapters', r"'(chapter-ai\d+-\d+)'")
chapters_bak, chapters_bak_count = extract_ids(backup_content, 'chapters', r"'(chapter-ai\d+-\d+)'")

print(f'书籍:')
print(f'  迁移脚本: {books_mig_count} 条, {len(books_mig)} 个唯一ID')
print(f'  备份文件: {books_bak_count} 条, {len(books_bak)} 个唯一ID')
print(f'  状态: {"OK" if books_mig == books_bak else "ERROR"}')

print(f'\n角色:')
print(f'  迁移脚本: {chars_mig_count} 条, {len(chars_mig)} 个唯一ID')
print(f'  备份文件: {chars_bak_count} 条, {len(chars_bak)} 个唯一ID')
print(f'  状态: {"OK" if chars_mig == chars_bak else "ERROR"}')

print(f'\n情节卡牌:')
print(f'  迁移脚本: {cards_mig_count} 条, {len(cards_mig)} 个唯一ID')
print(f'  备份文件: {cards_bak_count} 条, {len(cards_bak)} 个唯一ID')
print(f'  状态: {"OK" if cards_mig == cards_bak else "ERROR"}')

print(f'\n章节:')
print(f'  迁移脚本: {chapters_mig_count} 条, {len(chapters_mig)} 个唯一ID')
print(f'  备份文件: {chapters_bak_count} 条, {len(chapters_bak)} 个唯一ID')
print(f'  状态: {"OK" if chapters_mig == chapters_bak else "ERROR"}')

all_ok = (books_mig == books_bak and chars_mig == chars_bak and 
          cards_mig == cards_bak and chapters_mig == chapters_bak)

print(f'\n=== 最终结果: {"全部通过" if all_ok else "存在错误"} ===')

if not all_ok:
    if books_mig != books_bak:
        print(f'\n书籍差异:')
        print(f'  缺失: {books_bak - books_mig}')
        print(f'  多余: {books_mig - books_bak}')
    if chars_mig != chars_bak:
        print(f'\n角色差异:')
        print(f'  缺失: {chars_bak - chars_mig}')
        print(f'  多余: {chars_mig - chars_bak}')
    if cards_mig != cards_bak:
        print(f'\n卡牌差异:')
        print(f'  缺失: {cards_bak - cards_mig}')
        print(f'  多余: {cards_mig - cards_bak}')
    if chapters_mig != chapters_bak:
        print(f'\n章节差异:')
        print(f'  缺失: {chapters_bak - chapters_mig}')
        print(f'  多余: {chapters_mig - chapters_bak}')
