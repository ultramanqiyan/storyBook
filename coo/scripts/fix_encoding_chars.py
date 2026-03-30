#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检测和修复编码错误的字符
"""

import re
from pathlib import Path

def detect_encoding_issues(content):
    issues = []
    
    # 常见的编码错误模式
    patterns = [
        (r'鈥', '—'),  # 破折号编码错误
        (r'茅', 'é'),  # café 中的 é
        (r'鈥攍ust', '—just'),
        (r'鈥攕ounds', '—sounds'),
        (r'鈥攖he', '—the'),
        (r'鈥攁', '—a'),
        (r'鈥擨', '—I'),
    ]
    
    for pattern, expected in patterns:
        if re.search(pattern, content):
            issues.append((pattern, expected))
    
    return issues

def fix_encoding_issues(content):
    # 修复常见的编码错误
    replacements = [
        ('鈥攍ust', '—just'),
        ('鈥攕ounds', '—sounds'),
        ('鈥攖he', '—the'),
        ('鈥攁', '—a'),
        ('鈥擨', '—I'),
        ('鈥?', '—"'),
        ('鈥', '—'),
        ('茅', 'é'),
    ]
    
    result = content
    for old, new in replacements:
        result = result.replace(old, new)
    
    return result

def main():
    base_dir = Path('d:/trae_job/storyBook/coo/the-prompt-mage/chapters')
    
    for chapter_file in sorted(base_dir.glob('chapter-*.md')):
        if 'improved' in chapter_file.name:
            continue
        
        with open(chapter_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检测编码问题
        issues = detect_encoding_issues(content)
        
        if issues:
            print(f"{chapter_file.name}: 发现编码问题")
            for pattern, expected in issues:
                print(f"  - {pattern} -> {expected}")
            
            # 修复
            fixed_content = fix_encoding_issues(content)
            
            # 写入
            with open(chapter_file, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            print(f"  - 已修复")
        else:
            print(f"{chapter_file.name}: OK")

if __name__ == '__main__':
    main()
