#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面修复 the-prompt-mage 的编码问题
"""

import re
from pathlib import Path

# 编码错误字符映射（这些是破折号+字母的编码错误）
ENCODING_FIXES = {
    # 攊 (650A) -> —j -> j
    '攊t': 'it',
    '攊t ': 'it ',
    # 攜 (651C) -> —Y -> y
    '攜ou': 'you',
    '攜ou ': 'you ',
    # 攕 (6515) -> —s -> s
    '攕ilicon': 'silicon',
    '攕ensors': 'sensors',
    # 攋 (650B) -> —j -> j
    '攋ust': 'just',
    # 攎 (650E) -> —m -> m
    '攎ore': 'more',
    # 攇 (6507) -> —g -> g
    '攇rainy': 'grainy',
    '攇overnment': 'government',
    '攇ive': 'give',
    # 攈 (6508) -> —h -> h
    '攈ands': 'hands',
    # 攅 (6505) -> —e -> e
    '攅specially': 'especially',
    # 攑 (6511) -> —p -> p
    '攑rotecting': 'protecting',
    # 攖 (6516) -> —w -> w
    '攖hat': 'what',
    # 攍 (650D) -> —l -> l
    '攍oved': 'loved',
    # 擴 (64F4) -> —u -> u
    '擴nmade': 'unmade',
    # 攂 (6502) -> —b -> b
    '攂ut': 'but',
    # 其他常见模式
    ', 攊': ', i',
    ', 攜': ', y',
    ', 攕': ', s',
    ', 攋': ', j',
    ', 攎': ', m',
    ', 攇': ', g',
    ', 攈': ', h',
    ', 攅': ', e',
    ', 攑': ', p',
    ', 攖': ', w',
    ', 攍': ', l',
    ', 擴': ', u',
    ', 攂': ', b',
    # 新增
    '攚e': 'we',
    '攚e ': 'we ',
    '攏ot': 'not',
    '攏ot ': 'not ',
}

def fix_content(content):
    result = content
    
    # 应用编码修复
    for old, new in ENCODING_FIXES.items():
        result = result.replace(old, new)
    
    # 移除所有破折号
    result = result.replace('—', ', ')
    result = result.replace('–', ', ')
    
    return result

def main():
    base_dir = Path('d:/trae_job/storyBook/coo/the-prompt-mage/chapters')
    
    print("=" * 50)
    print("全面修复 the-prompt-mage 编码问题")
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
