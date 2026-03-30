#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
逐章节检查所有coo书籍
检查：乱码、破折号、章节结束标记、书籍结束标记
"""

import re
from pathlib import Path

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

def check_content(content, file_path):
    issues = []
    
    # 检查乱码字符
    mojibake_count = content.count('\ufffd')
    if mojibake_count > 0:
        pos = content.find('\ufffd')
        context = content[max(0, pos-30):pos+30]
        issues.append(f'乱码字符: {mojibake_count}处 - 位置{pos}: {repr(context)}')
    
    # 检查破折号
    dash_count = content.count('—')
    if dash_count > 0:
        issues.append(f'破折号: {dash_count}处')
    
    # 检查章节结束标记
    chapter_end_patterns = [
        r'\*\*Chapter \d+ Complete\*\*',
        r'\*\*End of Chapter \d+\*\*',
        r'---\s*\n\*\*Chapter \d+ Complete\*\*',
    ]
    for pattern in chapter_end_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            issues.append(f'章节结束标记: {matches}')
    
    # 检查书籍结束标记
    book_end_patterns = [
        r'\*\*END OF BOOK[^*]*\*\*',
        r'\*\*Book Complete[^*]*\*\*',
        r'\*\*End of Book[^*]*\*\*',
    ]
    for pattern in book_end_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            issues.append(f'书籍结束标记: {matches}')
    
    return issues

def main():
    base_dir = Path('d:/trae_job/storyBook/coo')
    
    # 获取所有书籍目录
    books = []
    for item in base_dir.iterdir():
        if item.is_dir() and item.name not in ['backup', 'docs', 'operate', 'scripts', 'glitch']:
            chapters_dir = item / 'chapters'
            if chapters_dir.exists():
                books.append(item.name)
    
    books.sort()
    
    print("=" * 70)
    print("逐章节检查所有coo书籍")
    print("=" * 70)
    print()
    
    total_files = 0
    total_issues = 0
    
    for book in books:
        chapters_dir = base_dir / book / 'chapters'
        chapter_files = list(chapters_dir.glob('chapter-*.md'))
        chapter_files = [f for f in chapter_files if 'improved' not in f.name]
        chapter_files.sort()
        
        for chapter_file in chapter_files:
            total_files += 1
            content, encoding = read_file_any_encoding(chapter_file)
            issues = check_content(content, chapter_file)
            
            if issues:
                total_issues += 1
                print(f"❌ {book}/{chapter_file.name}")
                for issue in issues:
                    print(f"   - {issue}")
    
    print()
    print("=" * 70)
    print(f"检查完成! 共检查 {total_files} 个文件, 发现 {total_issues} 个问题")
    print("=" * 70)

if __name__ == '__main__':
    main()
