import re

migration_file = 'd:/trae_job/storyBook/migrations/0700_add_23_ai_preset_books.sql'

with open(migration_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

seen_cards = set()
unique_lines = []
duplicates = 0

for line in lines:
    if 'INSERT INTO "plot_cards"' in line and 'preset-ai-' in line:
        match = re.search(r"'(card-ai\d+-\w+)'", line)
        if match:
            card_id = match.group(1)
            if card_id in seen_cards:
                duplicates += 1
                continue
            seen_cards.add(card_id)
    unique_lines.append(line)

print(f'发现重复的情节卡牌: {duplicates}')

with open(migration_file, 'w', encoding='utf-8') as f:
    f.writelines(unique_lines)

print('已清理重复数据')
