#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
破折号批量修复脚本
移除所有破折号，替换为逗号
"""

import os
import re
import glob
import shutil
from pathlib import Path
from datetime import datetime

EM_DASH = '\u2014'

def count_em_dashes(text):
    return text.count(EM_DASH)

def fix_paragraph(paragraph):
    count = count_em_dashes(paragraph)
    if count == 0:
        return paragraph, 0, []
    
    changes = []
    result = paragraph
    
    while EM_DASH in result:
        pos = result.index(EM_DASH)
        original_context = get_context(result, pos)
        
        before = result[:pos]
        after = result[pos + 1:]
        
        if after and after[0] == ' ':
            result = before + ',' + after
        elif before and before[-1] == ' ':
            result = before[:-1] + ', ' + after
        else:
            result = before + ', ' + after
        
        changes.append({
            'original': original_context,
            'fixed': get_context(result, pos),
            'position': pos
        })
    
    return result, count, changes

def get_context(text, pos, window=30):
    start = max(0, pos - window)
    end = min(len(text), pos + window + 1)
    return '...' + text[start:end] + '...'

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
    
    original_content = content
    lines = content.split('\n')
    
    total_changes = 0
    all_changes = []
    
    in_paragraph = False
    paragraph_start = 0
    paragraph_lines = []
    
    for line_num, line in enumerate(lines):
        stripped = line.strip()
        
        if stripped:
            if not in_paragraph:
                in_paragraph = True
                paragraph_start = line_num
                paragraph_lines = [line]
            else:
                paragraph_lines.append(line)
        else:
            if in_paragraph and paragraph_lines:
                paragraph = '\n'.join(paragraph_lines)
                fixed_para, change_count, changes = fix_paragraph(paragraph)
                
                if change_count > 0:
                    for change in changes:
                        change['line'] = paragraph_start + 1
                        change['file'] = str(file_path)
                        all_changes.append(change)
                    total_changes += change_count
                    
                    fixed_lines = fixed_para.split('\n')
                    for i, fl in enumerate(fixed_lines):
                        lines[paragraph_start + i] = fl
            
            in_paragraph = False
            paragraph_lines = []
    
    if in_paragraph and paragraph_lines:
        paragraph = '\n'.join(paragraph_lines)
        fixed_para, change_count, changes = fix_paragraph(paragraph)
        
        if change_count > 0:
            for change in changes:
                change['line'] = paragraph_start + 1
                change['file'] = str(file_path)
                all_changes.append(change)
            total_changes += change_count
            
            fixed_lines = fixed_para.split('\n')
            for i, fl in enumerate(fixed_lines):
                lines[paragraph_start + i] = fl
    
    new_content = '\n'.join(lines)
    
    if total_changes > 0:
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
    
    return total_changes, all_changes

def generate_report(results, output_path):
    total_files = sum(1 for r in results if r[0] > 0)
    total_changes = sum(r[0] for r in results)
    all_changes = [change for r in results for change in r[1]]
    
    report_lines = [
        "# 破折号修复报告",
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
        
        report_lines.append(f"| 行号 | 原文 | 修改后 |")
        report_lines.append(f"|------|------|--------|")
        report_lines.append(f"| {change['line']} | `{change['original']}` | `{change['fixed']}` |")
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
    
    report_path = base_dir / 'docs' / 'em-dash-fix-report.md'
    
    print(f"找到 {len(chapter_files)} 个章节文件")
    print(f"备份目录: {backup_dir}")
    print()
    
    results = []
    for i, file_path in enumerate(chapter_files):
        print(f"处理 [{i+1}/{len(chapter_files)}]: {Path(file_path).name}")
        changes, change_details = process_file(file_path, backup_dir)
        results.append((changes, change_details))
        if changes > 0:
            print(f"  - 修改 {changes} 处破折号")
    
    print()
    print("生成报告...")
    total_files, total_changes = generate_report(results, report_path)
    
    print()
    print("=" * 50)
    print(f"处理完成!")
    print(f"  文件数: {total_files}")
    print(f"  修改数: {total_changes}")
    print(f"  报告位置: {report_path}")
    print(f"  备份位置: {backup_dir}")
    print("=" * 50)

if __name__ == '__main__':
    main()
