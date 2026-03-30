#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
逐章节修复破折号脚本
"""

import re
import shutil
from pathlib import Path
from datetime import datetime

BOOKS = [
    'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
    'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
    'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
]

def fix_dash(content):
    patterns = [
        (r'\s—\s', r', '),
        (r'—\s', r', '),
        (r'\s—', r','),
        (r'—', r','),
    ]
    
    result = content
    for pattern, replacement in patterns:
        result = re.sub(pattern, replacement, result)
    
    return result

def find_dashes_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    dashes = []
    for i, char in enumerate(content):
        if char == '—':
            start = max(0, i - 20)
            end = min(len(content), i + 20)
            context = content[start:end]
            dashes.append({
                'position': i,
                'context': context,
                'line': content[:i].count('\n') + 1
            })
    
    return dashes

def fix_file(file_path, backup_dir):
    dashes = find_dashes_in_file(file_path)
    
    if not dashes:
        return 0, []
    
    rel_path = file_path.relative_to(file_path.parents[2])
    backup_path = backup_dir / rel_path
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(file_path, backup_path)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fixed_content = fix_dash(content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    return len(dashes), dashes

def main():
    base_dir = Path('d:/trae_job/storyBook/coo')
    backup_dir = base_dir / 'backup' / f'dash_fix_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    print("=" * 50)
    print("逐章节修复破折号")
    print("=" * 50)
    print()
    
    for book in BOOKS:
        chapters_dir = base_dir / book / 'chapters'
        if not chapters_dir.exists():
            continue
        
        print(f"\n书籍: {book}")
        print("-" * 40)
        
        for chapter_file in sorted(chapters_dir.glob('chapter-*.md')):
            if 'improved' in chapter_file.name:
                continue
            
            count, dashes = fix_file(chapter_file, backup_dir)
            
            if count > 0:
                print(f"  {chapter_file.name}: 修复 {count} 处破折号")
            else:
                print(f"  {chapter_file.name}: OK")
    
    print()
    print("=" * 50)
    print(f"修复完成! 备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
