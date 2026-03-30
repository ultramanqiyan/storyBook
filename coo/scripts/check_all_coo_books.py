#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查所有coo书籍的原始markdown文件
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

def check_file(file_path):
    content, encoding = read_file_any_encoding(file_path)
    
    issues = []
    
    # 检查乱码字符
    if '\ufffd' in content:
        count = content.count('\ufffd')
        issues.append(f'乱码字符: {count}处')
    
    # 检查破折号
    if '—' in content:
        count = content.count('—')
        issues.append(f'破折号: {count}处')
    
    # 检查章节结束标记
    if re.search(r'\*\*Chapter \d+ Complete\*\*', content, re.IGNORECASE):
        issues.append('章节结束标记')
    
    # 检查书籍结束标记
    if re.search(r'\*\*END OF BOOK|\*\*Book Complete', content, re.IGNORECASE):
        issues.append('书籍结束标记')
    
    return issues, encoding

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
    
    print("=" * 60)
    print(f"检查所有coo书籍 ({len(books)}本)")
    print("=" * 60)
    print()
    
    books_with_issues = []
    total_issues = 0
    
    for book in books:
        chapters_dir = base_dir / book / 'chapters'
        chapter_files = list(chapters_dir.glob('chapter-*.md'))
        chapter_files = [f for f in chapter_files if 'improved' not in f.name]
        
        book_issues = []
        
        for chapter_file in sorted(chapter_files):
            issues, encoding = check_file(chapter_file)
            if issues:
                book_issues.append((chapter_file.name, issues, encoding))
        
        if book_issues:
            books_with_issues.append((book, book_issues))
            total_issues += len(book_issues)
            print(f"❌ {book}: {len(book_issues)}个章节有问题")
            for chapter_name, issues, enc in book_issues[:3]:
                print(f"   - {chapter_name} ({enc}): {', '.join(issues)}")
            if len(book_issues) > 3:
                print(f"   - ... 还有 {len(book_issues) - 3} 个章节")
        else:
            print(f"✅ {book}: OK")
    
    print()
    print("=" * 60)
    print(f"检查完成! {len(books_with_issues)}本书籍有问题, 共{total_issues}个章节")
    print("=" * 60)

if __name__ == '__main__':
    main()
