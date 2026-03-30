#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面修复所有书籍的编码问题
"""

import re
from pathlib import Path

BOOKS = [
    'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
    'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
    'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
]

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
    '攕ome': 'some',
    '攕he': 'she',
    '攕ound': 'sound',
    '攕oft': 'soft',
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
    '攅ven': 'even',
    '攅ach': 'each',
    '攅very': 'every',
    # 攑 (6511) -> —p -> p
    '攑rotecting': 'protecting',
    '攑eople': 'people',
    # 攖 (6516) -> —w -> w
    '攖hat': 'what',
    '攖ith': 'with',
    '攖as': 'was',
    '攖hen': 'when',
    '攖ere': 'were',
    # 攍 (650D) -> —l -> l
    '攍oved': 'loved',
    '攍ike': 'like',
    # 擴 (64F4) -> —u -> u
    '擴nmade': 'unmade',
    # 攂 (6502) -> —b -> b
    '攂ut': 'but',
    # 攁 (6501) -> —a -> a
    '攁nd': 'and',
    '攁bout': 'about',
    '攁cross': 'across',
    '攁way': 'away',
    '攁fter': 'after',
    # 攃 (6503) -> —c -> c
    '攃ould': 'could',
    '攃ame': 'came',
    # 攆 (6506) -> —f -> f
    '攆elt': 'felt',
    '攆or': 'for',
    '攆rom': 'from',
    '攆irst': 'first',
    # 攚 (651A) -> —w -> w
    '攚e': 'we',
    '攚e ': 'we ',
    # 攏 (650F) -> —n -> n
    '攏ot': 'not',
    '攏ot ': 'not ',
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
    ', 攁': ', a',
    ', 攃': ', c',
    ', 攆': ', f',
    # 鈥攁 模式
    '鈥攁': ', a',
    '鈥攃': ', c',
    '鈥攖': ', t',
    '鈥攕': ', s',
    '鈥攁 ': ', a ',
    '鈥攃 ': ', c ',
    '鈥攖 ': ', t ',
    '鈥攕 ': ', s ',
    # 更多编码错误字符
    '攚': 'w',
    '攚e': 'we',
    '攚ith': 'with',
    '攚as': 'was',
    '攐': 'r',
    '攐each': 'reach',
    '攐eal': 'real',
    '攐ight': 'right',
    '擨': 'I',
    "擨'": "I'",
    '擨t': 'It',
    '擨 can': 'I can',
    '擨 will': 'I will',
    '擨 was': 'I was',
    # 攂 (0x6502) -> b
    '攂ut': 'but',
    '攂een': 'been',
    '攂y': 'by',
    # 攆 (0x6506) -> f
    '攆elt': 'felt',
    '攆or': 'for',
    '攆rom': 'from',
    '攆irst': 'first',
    '攆ew': 'few',
    # 攅 (0x6505) -> e
    '攅specially': 'especially',
    '攅ven': 'even',
    '攅ach': 'each',
    '攅very': 'every',
    '攅nough': 'enough',
    # 攎 (0x650e) -> m
    '攎ore': 'more',
    '攎uch': 'much',
    '攎any': 'many',
    # 攈 (0x6508) -> h
    '攈ands': 'hands',
    '攈ere': 'here',
    '攈ave': 'have',
    '攈ad': 'had',
    # 鈥 (9225) -> 破折号编码错误
    '鈥': ', ',
    '鈥?': '..."',
    '鈥攁': ', a',
    '鈥攃': ', c',
    '鈥攖': ', t',
    '鈥攕': ', s',
    '鈥攂': ', b',
    '鈥攆': ', f',
    '鈥攎': ', m',
    '鈥攈': ', h',
    '鈥攅': ', e',
    '鈥攑': ', p',
    '鈥攖': ', w',
    # 单独的编码错误字符
    '攂': 'b',
    '攆': 'f',
    '攅': 'e',
    '攎': 'm',
    '攈': 'h',
    '攁': 'a',
    '攃': 'c',
    '攕': 's',
    '攊': 'i',
    '攜': 'y',
    '攋': 'j',
    '攇': 'g',
    '攍': 'l',
    '擴': 'u',
    '攑': 'p',
    '攖': 'w',
    '攐': 'r',
    '擨': 'I',
    '攏': 'n',
    '攚': 'w',
    '攄': 'd',
    '攗': 'u',
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
    base_dir = Path('d:/trae_job/storyBook/coo')
    
    print("=" * 50)
    print("全面修复所有书籍的编码问题")
    print("=" * 50)
    print()
    
    total_fixed = 0
    
    for book in BOOKS:
        chapters_dir = base_dir / book / 'chapters'
        if not chapters_dir.exists():
            continue
        
        book_fixed = 0
        
        for chapter_file in sorted(chapters_dir.glob('chapter-*.md')):
            if 'improved' in chapter_file.name:
                continue
            
            with open(chapter_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            fixed_content = fix_content(content)
            
            if fixed_content != content:
                with open(chapter_file, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                book_fixed += 1
        
        if book_fixed > 0:
            print(f"✅ {book}: 修复 {book_fixed} 个文件")
            total_fixed += book_fixed
        else:
            print(f"OK: {book}")
    
    print()
    print("=" * 50)
    print(f"修复完成! 共修复 {total_fixed} 个文件")
    print("=" * 50)

if __name__ == '__main__':
    main()
