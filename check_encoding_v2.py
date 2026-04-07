# -*- coding: utf-8 -*-
from pathlib import Path
from collections import defaultdict

def scan_encoding_status(base_path):
    results = {
        'utf8_ok': [],
        'other_encoding': []
    }
    exclude_dirs = {'scripts', 'backup', 'docs', 'operate', '.templates'}
    
    for book_dir in sorted(Path(base_path).iterdir()):
        if not book_dir.is_dir():
            continue
        if book_dir.name in exclude_dirs:
            continue
        
        chapters_dir = book_dir / 'chapters'
        if not chapters_dir.exists():
            continue
        
        for chapter_file in sorted(chapters_dir.glob('*.md')):
            filepath = chapter_file
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # 检查是否有乱码替换字符
                if '\ufffd' in content:
                    results['other_encoding'].append({
                        'book': book_dir.name,
                        'chapter': chapter_file.name,
                        'reason': 'has_replacement_char'
                    })
                else:
                    results['utf8_ok'].append({
                        'book': book_dir.name,
                        'chapter': chapter_file.name
                    })
            except UnicodeDecodeError as e:
                results['other_encoding'].append({
                    'book': book_dir.name,
                    'chapter': chapter_file.name,
                    'reason': str(e)
                })
    
    return results

results = scan_encoding_status(r'd:\trae_job\storyBook\coo')

print(f'UTF-8 Files: {len(results["utf8_ok"])}')
print(f'Non-UTF-8 Files: {len(results["other_encoding"])}')

if results['other_encoding']:
    print('\nFiles needing conversion:')
    books = defaultdict(list)
    for item in results['other_encoding']:
        books[item['book']].append(item['chapter'])
    for book, chapters in sorted(books.items()):
        print(f'  {book}: {len(chapters)} chapters')
        for ch in chapters:
            print(f'    - {ch}')
