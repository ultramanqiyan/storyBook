#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查文件编码和乱码问题
"""

from pathlib import Path

def check_file_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw = f.read()
    
    # 查找特定文本附近的字节
    search = b'hasty decisions'
    idx = raw.find(search)
    if idx >= 0:
        print(f'文件: {file_path}')
        print(f'字节位置: {idx}')
        print(f'前后字节 (hex): {raw[idx:idx+60].hex()}')
        print(f'前后字节 (raw): {raw[idx:idx+60]}')
        
        # 尝试不同编码
        for enc in ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252']:
            try:
                decoded = raw[idx:idx+60].decode(enc)
                print(f'{enc}: {decoded}')
            except Exception as e:
                print(f'{enc}: 错误 - {e}')
    
    # 查找乱码字符
    try:
        content = raw.decode('utf-8')
        if '\ufffd' in content:
            pos = content.find('\ufffd')
            print(f'乱码位置: {pos}')
            print(f'乱码上下文: {content[max(0,pos-30):pos+30]}')
    except Exception as e:
        print(f'UTF-8解码错误: {e}')

if __name__ == '__main__':
    file_path = Path('d:/trae_job/storyBook/coo/the-neural-druid/chapters/chapter-03.md')
    check_file_encoding(file_path)
