#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复原始文件中的乱码字符
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

def fix_mojibake(content):
    result = content
    
    # 修复常见的乱码模式
    patterns = [
        (r'at\ufffd\?', 'at..."'),
        (r'ever\ufffd\?', 'ever..."'),
        (r'I\ufffd\?', 'I..."'),
        (r'risks\ufffd\?', 'risks..."'),
        (r'course\ufffd\?', 'course."'),
        (r'Holy\ufffd\?', 'Holy..."'),
        (r'who\ufffd\?', 'who..."'),
        (r'experiments\ufffd\?', 'experiments..."'),
        (r'promise\ufffd\?', 'promise,"'),
        (r'\ufffd\?', '..."'),
        (r'\ufffd', ''),
    ]
    
    for pattern, replacement in patterns:
        result = re.sub(pattern, replacement, result)
    
    return result

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

def fix_book_end_markers(content):
    patterns = [
        r'\n---\n\n\*\*END OF BOOK[^*]*\*\*\s*$',
        r'\n\n\*\*END OF BOOK[^*]*\*\*\s*$',
        r'\n---\n\n\*\*Book Complete[^*]*\*\*\s*$',
        r'\n\n\*\*Book Complete[^*]*\*\*\s*$',
        r'\n\*\*Book Complete\*\*\s*$',
        r'\n---\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\*\*Chapter \d+ Complete\*\*\s*$',
    ]
    
    result = content
    for pattern in patterns:
        result = re.sub(pattern, '', result, flags=re.IGNORECASE | re.MULTILINE)
    
    return result.strip() + '\n'

def main():
    base_dir = Path('d:/trae_job/storyBook/coo')
    backup_dir = base_dir / 'backup' / f'full_fix_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    print("=" * 50)
    print("修复原始乱码和破折号")
    print("=" * 50)
    print()
    
    for book in BOOKS:
        chapters_dir = base_dir / book / 'chapters'
        if not chapters_dir.exists():
            continue
        
        print(f"书籍: {book}")
        
        for chapter_file in sorted(chapters_dir.glob('chapter-*.md')):
            if 'improved' in chapter_file.name:
                continue
            
            with open(chapter_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否有问题
            has_mojibake = '\ufffd' in content
            has_dash = '—' in content
            has_book_end = bool(re.search(r'\*\*END OF BOOK|\*\*Book Complete|\*\*Chapter \d+ Complete', content, re.IGNORECASE))
            
            if not has_mojibake and not has_dash and not has_book_end:
                print(f"  {chapter_file.name}: OK")
                continue
            
            # 备份
            rel_path = chapter_file.relative_to(chapter_file.parents[2])
            backup_path = backup_dir / rel_path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(chapter_file, backup_path)
            
            # 修复
            fixed_content = content
            if has_mojibake:
                fixed_content = fix_mojibake(fixed_content)
            if has_dash:
                fixed_content = fix_dash(fixed_content)
            if has_book_end:
                fixed_content = fix_book_end_markers(fixed_content)
            
            with open(chapter_file, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            issues = []
            if has_mojibake:
                issues.append('乱码')
            if has_dash:
                issues.append('破折号')
            if has_book_end:
                issues.append('书籍结束标记')
            print(f"  {chapter_file.name}: 修复 {', '.join(issues)}")
        
        print()
    
    print("=" * 50)
    print(f"修复完成! 备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
