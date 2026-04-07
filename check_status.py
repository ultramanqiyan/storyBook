# -*- coding: utf-8 -*-
import os
from pathlib import Path
from collections import defaultdict

def scan_all_files(base_path):
    results = {
        'read_errors': [],
        'garbled_chars': []
    }
    exclude_dirs = {'scripts', 'backup', 'docs', 'operate', '.templates'}
    
    garbled_list = ['鈥', '銆', '锟', '斤', '拷', '烫', '屯']
    
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
            except UnicodeDecodeError as e:
                results['read_errors'].append({
                    'book': book_dir.name,
                    'chapter': chapter_file.name
                })
                continue
            
            for garbled in garbled_list:
                count = content.count(garbled)
                if count > 0:
                    results['garbled_chars'].append({
                        'book': book_dir.name,
                        'chapter': chapter_file.name,
                        'char': garbled,
                        'count': count
                    })
    
    return results

results = scan_all_files(r'd:\trae_job\storyBook\coo')

print('=' * 60)
print('SCAN REPORT')
print('=' * 60)

print(f'\n[1] UTF-8 Decode Errors: {len(results["read_errors"])} files')
if results['read_errors']:
    for item in results['read_errors'][:20]:
        print(f'  {item["book"]}/{item["chapter"]}')
    if len(results['read_errors']) > 20:
        print(f'  ... and {len(results["read_errors"]) - 20} more')

print(f'\n[2] Garbled Characters: {len(results["garbled_chars"])} files')
if results['garbled_chars']:
    for item in results['garbled_chars']:
        print(f'  {item["book"]}/{item["chapter"]}: {item["char"]} x{item["count"]}')

print('\n' + '=' * 60)
