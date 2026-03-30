#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复编码问题的文件
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

BOOKS = [
    'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
    'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
    'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
]

def read_file_any_encoding(file_path):
    encodings = ['utf-8', 'utf-8-sig', 'gbk', 'gb2312', 'latin-1', 'cp1252']
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read(), encoding
        except (UnicodeDecodeError, UnicodeError):
            continue
    with open(file_path, 'rb') as f:
        content = f.read()
        return content.decode('utf-8', errors='replace'), 'utf-8-replace'

def fix_file(file_path, backup_dir):
    content, encoding = read_file_any_encoding(file_path)
    original_content = content
    
    # 修复乱码字符
    if '\ufffd' in content:
        content = content.replace('\ufffd', '')
        print(f"  - 修复乱码: {file_path.name}")
    
    # 移除章节结束标记
    patterns = [
        r'\n---\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n---\n\n\*\*Chapter \d+ complete\*\*\s*$',
        r'\n---\n\n\*Chapter \d+ Complete\*\s*$',
        r'\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\n\*Chapter \d+ Complete\*\s*$',
        r'\n---\n\n\*\*End of Chapter \d+\*\*\s*$',
        r'\n---\n\n\*\*END OF CHAPTER \d+\*\*\s*$',
    ]
    
    for pattern in patterns:
        if re.search(pattern, content, re.IGNORECASE | re.MULTILINE):
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.MULTILINE)
            print(f"  - 移除章节结束标记: {file_path.name}")
    
    # 移除破折号
    if '—' in content:
        content = content.replace('—', ', ')
        print(f"  - 移除破折号: {file_path.name}")
    
    if content != original_content:
        # 备份
        rel_path = file_path.relative_to(file_path.parents[2])
        backup_path = backup_dir / rel_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, backup_path)
        
        # 写入修复后的内容 (UTF-8)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    base_dir = Path(__file__).parent.parent
    backup_dir = base_dir / 'backup' / datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    total_fixed = 0
    
    print("=" * 50)
    print("修复编码问题文件")
    print("=" * 50)
    print()
    
    for book in BOOKS:
        chapters_dir = base_dir / book / 'chapters'
        if not chapters_dir.exists():
            continue
        
        chapter_files = list(chapters_dir.glob('chapter-*.md'))
        chapter_files = [f for f in chapter_files if 'improved' not in f.name]
        
        if not chapter_files:
            continue
        
        print(f"处理: {book}")
        
        for chapter_file in chapter_files:
            if fix_file(chapter_file, backup_dir):
                total_fixed += 1
        
        print()
    
    print("=" * 50)
    print(f"修复完成! 共修复 {total_fixed} 个文件")
    print(f"备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
