#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查文件中的乱码字符
"""

from pathlib import Path

def check_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    for i, char in enumerate(content):
        # 检查中文字符范围
        if 0x4E00 <= ord(char) <= 0x9FFF:
            issues.append((i, char, content[max(0,i-10):i+10]))
        # 检查其他非ASCII非常见标点
        elif ord(char) > 127 and char not in 'éèêëàâäùûüôöîïç—–""''…❧→←═':
            issues.append((i, char, content[max(0,i-10):i+10]))
    
    return issues

def main():
    base_dir = Path('d:/trae_job/storyBook/coo/the-prompt-mage/chapters')
    
    for f in sorted(base_dir.glob('chapter-*.md')):
        if 'improved' in f.name:
            continue
        
        issues = check_file(f)
        
        if issues:
            print(f'{f.name}: 发现 {len(issues)} 个问题字符')
            for pos, char, context in issues[:5]:
                print(f'  位置 {pos}: {repr(char)} ({ord(char):04X}) - {repr(context)}')
        else:
            print(f'{f.name}: OK')

if __name__ == '__main__':
    main()
