#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
静态网页验证脚本
检查HTML文件中是否有乱码字符和章节结束标记
"""

import os
import re
from pathlib import Path

def validate_html_files():
    base_dir = Path('d:/trae_job/storyBook/src/frontend/chapters')
    
    coo_books = [
        'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
        'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
        'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
    ]
    
    issues = []
    
    for book in coo_books:
        pattern = f'chapter-coo-{book}-*.html'
        files = list(base_dir.glob(pattern))
        
        for f in files:
            try:
                with open(f, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # 检查乱码字符
                if '\ufffd' in content:
                    pos = content.find('\ufffd')
                    context = content[max(0, pos-30):pos+30]
                    issues.append({
                        'file': f.name,
                        'type': '乱码字符',
                        'context': context
                    })
                
                # 检查章节结束标记（更精确的模式）
                end_marker_patterns = [
                    r'\*\*Chapter \d+ Complete\*\*',
                    r'\*\*End of Chapter \d+\*\*',
                    r'\*\*END OF CHAPTER \d+\*\*',
                    r'Chapter \d+ Complete',
                    r'End of Chapter \d+',
                    r'END OF CHAPTER \d+',
                ]
                for pattern in end_marker_patterns:
                    if re.search(pattern, content, re.IGNORECASE):
                        issues.append({
                            'file': f.name,
                            'type': '章节结束标记',
                            'context': f'发现: {pattern}'
                        })
                        break
                
                # 检查非正常字符（只允许常见标点）
                text_content = re.sub(r'<[^>]+>', '', content)  # 移除HTML标签
                abnormal = re.findall(r'[^\x00-\x7F\s.,!?;:\'"()\[\]{}@#$%^&*\-+=<>/\\|`~\d\w\u4e00-\u9fff]', text_content)
                abnormal = [c for c in abnormal if c not in ['—', '–', '"', '"', ''', ''', '…', '❧', '→', '←', '═']]
                if abnormal:
                    unique = set(abnormal)
                    issues.append({
                        'file': f.name,
                        'type': '非正常字符',
                        'context': f'发现字符: {unique}'
                    })
                    
            except Exception as e:
                issues.append({
                    'file': f.name,
                    'type': '读取错误',
                    'context': str(e)
                })
    
    return issues

if __name__ == '__main__':
    print("=" * 50)
    print("静态网页验证脚本")
    print("=" * 50)
    print()
    
    issues = validate_html_files()
    
    if issues:
        print(f"发现 {len(issues)} 个问题:")
        print()
        for issue in issues:
            print(f"文件: {issue['file']}")
            print(f"问题: {issue['type']}")
            print(f"详情: {issue['context']}")
            print("-" * 40)
    else:
        print("所有文件验证通过!")
    
    print()
    print("=" * 50)
