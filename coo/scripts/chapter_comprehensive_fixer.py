#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
章节文件综合修复脚本
1. 移除章节结束标记
2. 修复编码问题
3. 移除乱码
"""

import os
import re
import glob
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

def remove_chapter_markers(content):
    patterns = [
        r'\n---\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n---\n\n\*\*Chapter \d+ complete\*\*\s*$',
        r'\n---\n\n\*Chapter \d+ Complete\*\s*$',
        r'\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\n\*Chapter \d+ Complete\*\s*$',
        r'\n---\n\n\*\*End of Chapter \d+\*\*\s*$',
        r'\n---\n\n\*\*END OF CHAPTER \d+\*\*\s*$',
        r'\n---\s*$',
    ]
    
    result = content
    for pattern in patterns:
        result = re.sub(pattern, '', result, flags=re.IGNORECASE | re.MULTILINE)
    
    return result.strip() + '\n'

def fix_mojibake(content):
    patterns = [
        (r'([a-zA-Z])\ufffd\?', r'\1..."'),
        (r'([a-zA-Z])\ufffd\s', r'\1, '),
        (r'\ufffd\?', r'..."'),
        (r'\s\ufffd\s', r', '),
        (r'([a-zA-Z])\ufffd([a-zA-Z])', r'\1...\2'),
        (r'"\s*\ufffd', r'..."'),
        (r'\ufffd\s*"', r'..."'),
        (r'I\ufffd\s', r'I... '),
        (r'([a-z])\ufffd', r'\1..."'),
        (r'And then\ufffd', r'And then...'),
        (r'then\ufffd', r'then...'),
    ]
    
    result = content
    for pattern, replacement in patterns:
        result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
    
    return result

def process_file(file_path, backup_dir):
    try:
        content, encoding = read_file_any_encoding(file_path)
    except Exception as e:
        print(f"  - 跳过: 无法读取文件 ({e})")
        return False, 0
    
    original_content = content
    
    content = remove_chapter_markers(content)
    content = fix_mojibake(content)
    
    if content != original_content:
        rel_path = Path(file_path).relative_to(Path(file_path).parents[2])
        backup_path = backup_dir / rel_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, backup_path)
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, 1
        except Exception as e:
            print(f"  - 警告: 写入失败 ({e})")
            return False, 0
    
    return False, 0

def main():
    base_dir = Path(__file__).parent.parent
    backup_dir = base_dir / 'backup' / datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    total_fixed = 0
    
    print("=" * 50)
    print("章节文件综合修复脚本")
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
            fixed, count = process_file(chapter_file, backup_dir)
            if fixed:
                total_fixed += count
                print(f"  - 修复: {chapter_file.name}")
        
        print()
    
    print("=" * 50)
    print(f"修复完成! 共修复 {total_fixed} 个文件")
    print(f"备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
