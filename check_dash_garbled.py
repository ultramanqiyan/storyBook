# -*- coding: utf-8 -*-
import os
from pathlib import Path
import re
from collections import defaultdict

def check_dash_and_garbled(base_path):
    results = {
        'dash_issues': [],
        'garbled_issues': [],
        'total_files': 0
    }
    
    exclude_dirs = {'scripts', 'backup', 'docs', 'operate', '.templates'}
    
    problematic_dashes = [
        '\u2014',  # em dash —
        '\u2013',  # en dash –
        '\u2015',  # horizontal bar ―
        '\u2212',  # minus sign −
    ]
    
    garbled_patterns = [
        r'[\uFFFD]',      
    ]
    
    for book_dir in sorted(Path(base_path).iterdir()):
        if not book_dir.is_dir():
            continue
        if book_dir.name in exclude_dirs:
            continue
        
        chapters_dir = book_dir / 'chapters'
        if not chapters_dir.exists():
            continue
        
        for chapter_file in sorted(chapters_dir.glob('*.md')):
            results['total_files'] += 1
            filepath = chapter_file
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                for dash in problematic_dashes:
                    if dash in content:
                        count = content.count(dash)
                        dash_name = {
                            '\u2014': 'em dash (—)',
                            '\u2013': 'en dash (–)',
                            '\u2015': 'horizontal bar (―)',
                            '\u2212': 'minus sign (−)',
                        }.get(dash, f'U+{ord(dash):04X}')
                        results['dash_issues'].append({
                            'file': str(filepath),
                            'book': book_dir.name,
                            'chapter': chapter_file.name,
                            'dash_type': dash_name,
                            'count': count
                        })
                        break
                
                for pattern in garbled_patterns:
                    matches = re.findall(pattern, content)
                    if matches:
                        results['garbled_issues'].append({
                            'file': str(filepath),
                            'book': book_dir.name,
                            'chapter': chapter_file.name,
                            'count': len(matches)
                        })
                        break
                        
            except UnicodeDecodeError as e:
                results['garbled_issues'].append({
                    'file': str(filepath),
                    'book': book_dir.name,
                    'chapter': chapter_file.name,
                    'error': str(e)
                })
            except Exception as e:
                results['garbled_issues'].append({
                    'file': str(filepath),
                    'book': book_dir.name,
                    'chapter': chapter_file.name,
                    'error': f'Unexpected error: {str(e)}'
                })
    
    return results

print("=" * 70)
print("检查破折号和乱码问题")
print("=" * 70)

results = check_dash_and_garbled(r'd:\trae_job\storyBook\coo')

print(f"\n总文件数: {results['total_files']}")

print(f"\n{'='*70}")
print("【破折号问题】")
print("=" * 70)
if results['dash_issues']:
    print(f"发现 {len(results['dash_issues'])} 个文件有破折号问题:\n")
    books = defaultdict(list)
    for item in results['dash_issues']:
        books[item['book']].append(item)
    for book, items in sorted(books.items()):
        print(f"  {book}: {len(items)} 个文件")
        for item in items:
            print(f"    - {item['chapter']}: {item['dash_type']} x {item['count']}")
else:
    print("没有发现破折号问题")

print(f"\n{'='*70}")
print("【乱码问题】")
print("=" * 70)
if results['garbled_issues']:
    print(f"发现 {len(results['garbled_issues'])} 个文件有乱码问题:\n")
    for item in results['garbled_issues']:
        print(f"  书名: {item['book']}")
        print(f"  文件: {item['chapter']}")
        if 'error' in item:
            print(f"  错误: {item['error']}")
        else:
            print(f"  乱码字符数: {item['count']}")
        print()
else:
    print("没有发现乱码问题")

print("=" * 70)
print("检查完成")
print("=" * 70)
