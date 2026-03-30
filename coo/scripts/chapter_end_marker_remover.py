#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
章节结束标记移除脚本
移除章节末尾的 "END OF CHAPTER xx" 或 "End of Chapter xx" 标记
"""

import os
import re
import glob
import shutil
from pathlib import Path
from datetime import datetime

def remove_end_markers(content):
    patterns = [
        r'\n?\*\*END OF CHAPTER \d+\*\*\s*$',
        r'\n?\*\*End of Chapter \d+\*\*\s*$',
        r'\n?\*End of Chapter \d+\*\s*$',
        r'\n?END OF CHAPTER \d+\s*$',
        r'\n?End of Chapter \d+\s*$',
        r'\n?\*End of Chapter\*\s*$',
        r'\n?\*\*End of Chapter\*\*\s*$',
    ]
    
    changes = []
    result = content
    
    for pattern in patterns:
        matches = list(re.finditer(pattern, result, re.IGNORECASE | re.MULTILINE))
        for match in reversed(matches):
            original_text = match.group(0)
            changes.append({
                'original': original_text.strip(),
                'position': match.start()
            })
            result = result[:match.start()] + result[match.end():]
    
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
    
    new_content, change_count, changes = remove_end_markers(content)
    
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
        "# 章节结束标记移除报告",
        "",
        f"**处理日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"**处理文件数**: {total_files}",
        f"**总移除数**: {total_changes}",
        "",
        "---",
        "",
        "## 移除详情",
        "",
    ]
    
    current_file = None
    for change in all_changes:
        if change['file'] != current_file:
            current_file = change['file']
            rel_path = Path(current_file).relative_to(Path(current_file).parents[2])
            report_lines.append(f"### {rel_path}")
            report_lines.append("")
        
        report_lines.append(f"- 移除: `{change['original']}`")
        report_lines.append("")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
    
    return total_files, total_changes

def main():
    base_dir = Path(__file__).parent.parent
    chapters_pattern = str(base_dir / '*' / 'chapters' / '*.md')
    chapter_files = glob.glob(chapters_pattern)
    chapter_files = [f for f in chapter_files if 'chapter-' in f]
    
    backup_dir = base_dir / 'backup' / datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    report_path = base_dir / 'docs' / 'chapter-end-marker-removal-report.md'
    
    print(f"找到 {len(chapter_files)} 个章节文件")
    print(f"备份目录: {backup_dir}")
    print()
    
    results = []
    for i, file_path in enumerate(chapter_files):
        print(f"处理 [{i+1}/{len(chapter_files)}]: {Path(file_path).name}")
        changes, change_details = process_file(file_path, backup_dir)
        results.append((changes, change_details))
        if changes > 0:
            print(f"  - 移除 {changes} 处结束标记")
    
    print()
    print("生成报告...")
    total_files, total_changes = generate_report(results, report_path)
    
    print()
    print("=" * 50)
    print(f"处理完成!")
    print(f"  文件数: {total_files}")
    print(f"  移除数: {total_changes}")
    print(f"  报告位置: {report_path}")
    print(f"  备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
