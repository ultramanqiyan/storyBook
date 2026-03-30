#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
乱码修复脚本
修复因编码问题导致的乱码字符（\ufffd）
"""

import os
import re
import glob
import shutil
from pathlib import Path
from datetime import datetime

REPLACEMENT_CHAR = '\ufffd'

def fix_mojibake(content):
    patterns = [
        (r'([a-zA-Z])\ufffd\?', r'\1... "'),
        (r'([a-zA-Z])\ufffd\s', r'\1, '),
        (r'\ufffd\?', r'..."'),
        (r'\s\ufffd\s', r', '),
        (r'([a-zA-Z])\ufffd([a-zA-Z])', r'\1...\2'),
        (r'"\s*\ufffd', r'..."'),
        (r'\ufffd\s*"', r'..."'),
        (r'I\ufffd\s', r'I... '),
        (r'([a-z])\ufffd', r'\1..."'),
    ]
    
    changes = []
    result = content
    
    for pattern, replacement in patterns:
        matches = list(re.finditer(pattern, result))
        for match in reversed(matches):
            original = match.group(0)
            new_text = re.sub(pattern, replacement, original)
            changes.append({
                'original': original,
                'fixed': new_text,
                'position': match.start()
            })
        result = re.sub(pattern, replacement, result)
    
    return result, len(changes), changes

def read_file_with_encoding(file_path):
    encodings = ['utf-8', 'utf-8-sig', 'gbk', 'gb2312', 'latin-1']
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read(), encoding
        except (UnicodeDecodeError, UnicodeError):
            continue
    with open(file_path, 'rb') as f:
        return f.read().decode('utf-8', errors='replace'), 'utf-8-replace'

def process_file(file_path, backup_dir):
    try:
        content, encoding = read_file_with_encoding(file_path)
    except Exception as e:
        print(f"  - 跳过: 无法读取文件 ({e})")
        return 0, []
    
    if REPLACEMENT_CHAR not in content:
        return 0, []
    
    new_content, change_count, changes = fix_mojibake(content)
    
    if REPLACEMENT_CHAR in new_content:
        lines_with_mojibake = []
        for i, line in enumerate(new_content.split('\n')):
            if REPLACEMENT_CHAR in line:
                lines_with_mojibake.append((i + 1, line[:100]))
        if lines_with_mojibake:
            print(f"  - 警告: 仍有乱码未修复:")
            for line_num, line_content in lines_with_mojibake[:3]:
                print(f"    行 {line_num}: {line_content}...")
    
    if change_count > 0:
        for change in changes:
            change['file'] = str(file_path)
        
        rel_path = Path(file_path).relative_to(Path(file_path).parents[2])
        backup_path = backup_dir / rel_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, backup_path)
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        except Exception as e:
            print(f"  - 警告: 写入失败 ({e})")
            return 0, []
    
    return change_count, changes

def generate_report(results, output_path):
    total_files = sum(1 for r in results if r[0] > 0)
    total_changes = sum(r[0] for r in results)
    all_changes = [change for r in results for change in r[1]]
    
    report_lines = [
        "# 乱码修复报告",
        "",
        f"**处理日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"**处理文件数**: {total_files}",
        f"**总修改数**: {total_changes}",
        "",
        "---",
        "",
        "## 修改详情",
        "",
    ]
    
    current_file = None
    for change in all_changes:
        if change['file'] != current_file:
            current_file = change['file']
            rel_path = Path(current_file).relative_to(Path(current_file).parents[2])
            report_lines.append(f"### {rel_path}")
            report_lines.append("")
        
        report_lines.append(f"| 原文 | 修改后 |")
        report_lines.append(f"|------|--------|")
        report_lines.append(f"| `{change['original']}` | `{change['fixed']}` |")
        report_lines.append("")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
    
    return total_files, total_changes

def main():
    base_dir = Path(__file__).parent.parent
    chapters_pattern = str(base_dir / '*' / 'chapters' / '*.md')
    chapter_files = glob.glob(chapters_pattern)
    chapter_files = [f for f in chapter_files if 'chapter-' in f and 'backup' not in f and 'improved' not in f]
    
    backup_dir = base_dir / 'backup' / datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    report_path = base_dir / 'docs' / 'mojibake-fix-report.md'
    
    print(f"找到 {len(chapter_files)} 个章节文件")
    print(f"备份目录: {backup_dir}")
    print()
    
    results = []
    for i, file_path in enumerate(chapter_files):
        print(f"处理 [{i+1}/{len(chapter_files)}]: {Path(file_path).name}")
        changes, change_details = process_file(file_path, backup_dir)
        results.append((changes, change_details))
        if changes > 0:
            print(f"  - 修复 {changes} 处乱码")
    
    print()
    print("生成报告...")
    total_files, total_changes = generate_report(results, report_path)
    
    print()
    print("=" * 50)
    print(f"处理完成!")
    print(f"  文件数: {total_files}")
    print(f"  修复数: {total_changes}")
    print(f"  报告位置: {report_path}")
    print(f"  备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
