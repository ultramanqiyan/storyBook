#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查JSON数据文件中的编码问题
"""

import json
from pathlib import Path

def main():
    json_file = Path('d:/trae_job/storyBook/coo/operate/logs/analyzed-data.json')
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 检查章节内容
    for book in data:
        book_id = book.get('bookId', '')
        for chapter in book.get('chapters', []):
            content = chapter.get('content', '')
            issues = []
            for i, char in enumerate(content):
                if 0x6400 <= ord(char) <= 0x6600:
                    issues.append((i, char, content[max(0,i-20):i+20]))
            if issues:
                print(f'{book_id} - Chapter {chapter.get("chapterNumber")}: 发现 {len(issues)} 个问题')
                for pos, char, context in issues[:3]:
                    print(f'  {repr(char)}: {repr(context[:40])}...')

if __name__ == '__main__':
    main()
