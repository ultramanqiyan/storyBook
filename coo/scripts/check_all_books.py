#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查所有书籍源文件中的乱码字符
"""

from pathlib import Path

BOOKS = [
    'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
    'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
    'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
]

def check_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    for i, char in enumerate(content):
        # 检查中文字符范围（编码错误）
        if 0x6400 <= ord(char) <= 0x6600:
            issues.append((i, char, content[max(0,i-10):i+10]))
        # 检查其他非ASCII非常见标点
        elif ord(char) > 127 and char not in 'éèêëàâäùûüôöîïç—–""''…❧→←═':
            issues.append((i, char, content[max(0,i-10):i+10]))
    
    return issues

def main():
    base_dir = Path('d:/trae_job/storyBook/coo')
    
    print("=" * 50)
    print("检查所有书籍源文件")
    print("=" * 50)
    print()
    
    for book in BOOKS:
        chapters_dir = base_dir / book / 'chapters'
        if not chapters_dir.exists():
            continue
        
        book_issues = 0
        
        for f in sorted(chapters_dir.glob('chapter-*.md')):
            if 'improved' in f.name:
                continue
            
            issues = check_file(f)
            
            if issues:
                book_issues += len(issues)
                print(f"❌ {book}/{f.name}: 发现 {len(issues)} 个问题")
                for pos, char, context in issues[:3]:
                    print(f"   - {repr(char)} ({ord(char):04X}): {repr(context)}")
        
        if book_issues == 0:
            print(f"✅ {book}: OK")
    
    print()
    print("=" * 50)
    print("检查完成!")
    print("=" * 50)

if __name__ == '__main__':
    main()
