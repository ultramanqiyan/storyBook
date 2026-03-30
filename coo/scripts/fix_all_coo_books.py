#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复所有coo书籍的问题
"""

import re
import shutil
from pathlib import Path
from datetime import datetime

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

def fix_content(content):
    result = content
    
    # 修复乱码字符
    if '\ufffd' in result:
        result = result.replace('\ufffd', '')
    
    # 移除破折号
    if '—' in result:
        result = result.replace('—', ', ')
    
    # 移除章节结束标记
    patterns = [
        r'\n---\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\n\*\*Chapter \d+ Complete\*\*\s*$',
        r'\n\*\*Chapter \d+ Complete\*\*\s*$',
    ]
    for pattern in patterns:
        result = re.sub(pattern, '', result, flags=re.IGNORECASE | re.MULTILINE)
    
    # 移除书籍结束标记
    patterns = [
        r'\n---\n\n\*\*END OF BOOK[^*]*\*\*\s*$',
        r'\n\n\*\*END OF BOOK[^*]*\*\*\s*$',
        r'\n---\n\n\*\*Book Complete[^*]*\*\*\s*$',
        r'\n\n\*\*Book Complete[^*]*\*\*\s*$',
        r'\n\*\*Book Complete\*\*\s*$',
    ]
    for pattern in patterns:
        result = re.sub(pattern, '', result, flags=re.IGNORECASE | re.MULTILINE)
    
    return result.strip() + '\n'

def check_file(file_path):
    content, encoding = read_file_any_encoding(file_path)
    
    issues = []
    
    if '\ufffd' in content:
        count = content.count('\ufffd')
        issues.append(f'乱码字符: {count}处')
    
    if '—' in content:
        count = content.count('—')
        issues.append(f'破折号: {count}处')
    
    if re.search(r'\*\*Chapter \d+ Complete\*\*', content, re.IGNORECASE):
        issues.append('章节结束标记')
    
    if re.search(r'\*\*END OF BOOK|\*\*Book Complete', content, re.IGNORECASE):
        issues.append('书籍结束标记')
    
    return issues, content, encoding

def main():
    base_dir = Path('d:/trae_job/storyBook/coo')
    backup_dir = base_dir / 'backup' / f'all_books_fix_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    # 获取所有书籍目录
    books = []
    for item in base_dir.iterdir():
        if item.is_dir() and item.name not in ['backup', 'docs', 'operate', 'scripts', 'glitch']:
            chapters_dir = item / 'chapters'
            if chapters_dir.exists():
                books.append(item.name)
    
    books.sort()
    
    print("=" * 60)
    print(f"修复所有coo书籍 ({len(books)}本)")
    print("=" * 60)
    print()
    
    total_fixed = 0
    
    for book in books:
        chapters_dir = base_dir / book / 'chapters'
        chapter_files = list(chapters_dir.glob('chapter-*.md'))
        chapter_files = [f for f in chapter_files if 'improved' not in f.name]
        
        book_fixed = 0
        
        for chapter_file in sorted(chapter_files):
            issues, content, encoding = check_file(chapter_file)
            
            if issues:
                # 备份
                rel_path = chapter_file.relative_to(chapter_file.parents[2])
                backup_path = backup_dir / rel_path
                backup_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(chapter_file, backup_path)
                
                # 修复
                fixed_content = fix_content(content)
                
                with open(chapter_file, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                
                book_fixed += 1
        
        if book_fixed > 0:
            total_fixed += book_fixed
            print(f"✅ {book}: 修复 {book_fixed} 个章节")
        else:
            print(f"OK: {book}")
    
    print()
    print("=" * 60)
    print(f"修复完成! 共修复 {total_fixed} 个章节")
    print(f"备份位置: {backup_dir}")
    print("=" * 60)

if __name__ == '__main__':
    main()
