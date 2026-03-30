# Em Dash Fixer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Create a Python script to batch fix excessive em dash usage in all book chapter files.

**Architecture:** A Python script that scans all chapter markdown files, processes each paragraph, limits em dashes to 1 per paragraph, and generates a detailed modification report.

**Tech Stack:** Python 3, pathlib, re, glob

---

## Task 1: Create the Em Dash Fixer Script

**Files:**
- Create: `coo/scripts/em_dash_fixer.py`

**Step 1: Write the script with core functionality**

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
破折号批量修复脚本
每段最多保留1个破折号，多余的替换为逗号
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
    if count <= 1:
        return paragraph, 0, []
    
    changes = []
    result = paragraph
    dash_positions = [i for i, char in enumerate(paragraph) if char == EM_DASH]
    
    for i, pos in enumerate(dash_positions):
        if i == 0:
            continue
        
        original_context = get_context(paragraph, pos)
        
        before = result[:pos]
        after = result[pos + 1:]
        
        if after and after[0] == ' ':
            result = before + ',' + after
        elif before and before[-1] == ' ':
            result = before[:-1] + ', ' + after
        else:
            result = before + ',' + after
        
        dash_positions = update_positions(dash_positions, i, pos, result)
        
        changes.append({
            'original': original_context,
            'fixed': get_context(result, find_new_position(result, before)),
            'position': pos
        })
    
    return result, count - 1, changes

def get_context(text, pos, window=30):
    start = max(0, pos - window)
    end = min(len(text), pos + window + 1)
    return '...' + text[start:end] + '...'

def update_positions(positions, current_index, old_pos, new_text):
    new_positions = []
    for i, pos in enumerate(positions):
        if i <= current_index:
            continue
        new_positions.append(pos - 1)
    return new_positions

def find_new_position(text, before_part):
    return len(before_part)

def process_file(file_path, backup_dir):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    paragraphs = re.split(r'(\n\n+)', content)
    
    total_changes = 0
    all_changes = []
    line_number = 1
    
    for i, para in enumerate(paragraphs):
        if not para.strip() or re.match(r'\n\n+', para):
            line_number += para.count('\n')
            continue
        
        fixed_para, change_count, changes = fix_paragraph(para)
        
        if change_count > 0:
            for change in changes:
                change['line'] = line_number
                change['file'] = str(file_path)
                all_changes.append(change)
            total_changes += change_count
            paragraphs[i] = fixed_para
        
        line_number += para.count('\n')
    
    new_content = ''.join(paragraphs)
    
    if total_changes > 0:
        rel_path = Path(file_path).relative_to(Path(file_path).parents[2])
        backup_path = backup_dir / rel_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, backup_path)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return total_changes, all_changes

def generate_report(results, output_path):
    total_files = len(results)
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
```

**Step 2: Run the script to process all chapter files**

Run: `cd d:\trae_job\storyBook\coo && python scripts/em_dash_fixer.py`
Expected: Script processes all chapter files and generates report

**Step 3: Verify the report was generated**

Run: `ls d:\trae_job\storyBook\coo\docs\em-dash-fix-report.md`
Expected: Report file exists

**Step 4: Review a sample chapter to confirm changes**

Run: `head -100 d:\trae_job\storyBook\coo\algorithmic-self\chapters\chapter-01.md`
Expected: Em dashes reduced, no more than 1 per paragraph

**Step 5: Commit the changes**

```bash
git add coo/scripts/em_dash_fixer.py coo/docs/em-dash-fix-design.md
git commit -m "feat: add em dash fixer script and design doc"
```

---

## Task 2: Verify Results and Update Report

**Files:**
- Modify: `coo/docs/ai-writing-check-report.md`

**Step 1: Check the generated report**

Run: `cat d:\trae_job\storyBook\coo\docs\em-dash-fix-report.md`
Expected: Report shows all modifications with line numbers

**Step 2: Update the AI writing check report to reflect batch processing**

Add section to `coo/docs/ai-writing-check-report.md`:

```markdown
---

## 批量修复记录

### 破折号批量修复 (2026-03-30)

- **处理方式**: Python脚本自动处理
- **处理规则**: 每段最多保留1个破折号
- **详细报告**: [em-dash-fix-report.md](./em-dash-fix-report.md)

```

**Step 3: Commit the report updates**

```bash
git add coo/docs/ai-writing-check-report.md coo/docs/em-dash-fix-report.md
git commit -m "docs: update AI writing check report with batch fix results"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Create and run em dash fixer script | `coo/scripts/em_dash_fixer.py` |
| 2 | Verify and update reports | `coo/docs/ai-writing-check-report.md` |

**Estimated Changes:**
- ~1040 chapter files processed
- ~5000+ em dash replacements
- All files backed up automatically
