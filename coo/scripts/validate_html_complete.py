#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面验证静态网页
检查乱码字符和编码错误字符
"""

import re
from pathlib import Path

# 编码错误的中文字符范围 (这些是破折号+字母编码错误导致的)
ENCODING_ERROR_CHARS = set()
for code in range(0x6400, 0x6600):  # 常见的编码错误字符范围
    ENCODING_ERROR_CHARS.add(chr(code))

def check_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # 检查乱码字符
    if '\ufffd' in content:
        pos = content.find('\ufffd')
        issues.append({
            'type': '乱码字符',
            'context': content[max(0, pos-30):pos+30]
        })
    
    # 检查编码错误字符
    for i, char in enumerate(content):
        if char in ENCODING_ERROR_CHARS:
            issues.append({
                'type': '编码错误字符',
                'char': char,
                'code': hex(ord(char)),
                'context': content[max(0, i-20):i+20]
            })
    
    # 检查章节结束标记
    end_marker_patterns = [
        r'\*\*Chapter \d+ Complete\*\*',
        r'\*\*End of Chapter \d+\*\*',
        r'\*\*END OF CHAPTER \d+\*\*',
    ]
    for pattern in end_marker_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            issues.append({
                'type': '章节结束标记',
                'pattern': pattern
            })
            break
    
    return issues

def main():
    base_dir = Path('d:/trae_job/storyBook/src/frontend/chapters')
    
    coo_books = [
        'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
        'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
        'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
    ]
    
    print("=" * 50)
    print("全面验证静态网页")
    print("=" * 50)
    print()
    
    total_issues = 0
    
    for book in coo_books:
        pattern = f'chapter-coo-{book}-*.html'
        files = list(base_dir.glob(pattern))
        
        for f in sorted(files):
            issues = check_file(f)
            
            if issues:
                total_issues += len(issues)
                print(f"❌ {f.name}: 发现 {len(issues)} 个问题")
                for issue in issues[:3]:
                    if issue['type'] == '编码错误字符':
                        print(f"   - {issue['type']}: {issue['char']} ({issue['code']})")
                    else:
                        print(f"   - {issue['type']}")
            else:
                print(f"✅ {f.name}")
    
    print()
    print("=" * 50)
    if total_issues == 0:
        print("✅ 所有文件验证通过!")
    else:
        print(f"❌ 发现 {total_issues} 个问题")
    print("=" * 50)

if __name__ == '__main__':
    main()
