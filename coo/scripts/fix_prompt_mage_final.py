#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面修复 the-prompt-mage 的编码问题
1. 移除所有破折号
2. 修复编码错误字符
"""

import re
from pathlib import Path

def fix_content(content):
    # 先修复编码错误的字符（这些是乱码）
    replacements = [
        ('鈥攍ust', ', just'),
        ('鈥攕ounds', ', sounds'),
        ('鈥攖he', ', the'),
        ('鈥攁', ', a'),
        ('鈥擨', ', I'),
        ('鈥?', '..."'),
        ('鈥', ', '),
        ('茅', 'é'),
    ]
    
    result = content
    for old, new in replacements:
        result = result.replace(old, new)
    
    # 然后移除所有破折号
    result = result.replace('—', ', ')
    result = result.replace('–', ', ')
    
    return result

def main():
    base_dir = Path('d:/trae_job/storyBook/coo/the-prompt-mage/chapters')
    
    print("=" * 50)
    print("修复 the-prompt-mage 编码问题")
    print("=" * 50)
    print()
    
    for chapter_file in sorted(base_dir.glob('chapter-*.md')):
        if 'improved' in chapter_file.name:
            continue
        
        with open(chapter_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        fixed_content = fix_content(content)
        
        if fixed_content != content:
            with open(chapter_file, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"✅ 修复: {chapter_file.name}")
        else:
            print(f"OK: {chapter_file.name}")
    
    print()
    print("=" * 50)
    print("修复完成!")
    print("=" * 50)

if __name__ == '__main__':
    main()
