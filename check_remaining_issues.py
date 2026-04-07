# -*- coding: utf-8 -*-
import os
import re
from pathlib import Path
from collections import defaultdict

def find_garbled_chars(content):
    """Find all garbled characters in content."""
    garbled = []
    # 鈥 is the most common garbled character
    if '鈥' in content:
        garbled.append(('鈥', content.count('鈥), line_num))
    
    # Also check for other potential garbled patterns
    # 鈥 (Chinese character for dash)
    if '——' in content:
        garbled.append(('——', line_num))
    
    # Check for replacement character
    if '�' in content:
        garbled.append(('�', line_num))
    
    return garbled

def scan_for_remaining_issues(base_path):
    """Scan all markdown files and find remaining garbled characters."""
    results = defaultdict(lambda: defaultdict(list))
    
    exclude_dirs = {'scripts', 'backup', 'docs', 'operate', '.templates'}
    
    for book_dir in sorted(Path(base_path).iterdir()):
        if not book_dir.is_dir():
            continue
        if book_dir.name in exclude_dirs:
            continue
        
        chapters_dir = book_dir / 'chapters'
        if not chapters_dir.exists():
            continue
        
        for chapter_file in sorted(chapters_dir.glob('*.md')):
            try:
                with open(chapter_file, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                continue
            
            issues = find_garbled_chars(content)
            
            if issues:
                results[book_dir.name].append({
                    'file': chapter_file.name,
                    'issues': issues
                })
    
    return dict(results)

def generate_report(results, output_file):
    """Generate a report of remaining issues."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("剩余乱码检查报告\n")
        f.write("=" * 80 + "\n\n")
        if not results:
            f.write("\n未发现任何剩余乱码问题。\n")
            return
        
        total_files = sum(len(v['issues']) for v in results.values())
        total_issues = sum(len(v['issues']) for v in results.values())
        
        f.write(f"\n检查文件总数: {total_files}\n")
        f.write(f"发现问题总数: {total_issues}\n")
        f.write(f"有问题的书籍数: {len(results)}\n\n")
        f.write("\n" + "-" * 80 + "\n")
        
        for book in sorted(results.keys()):
            chapters = results[book]
            f.write(f"\n书籍: {book}\n")
            
            for issue in issues:
                f.write(f"  文件: {issue['file']}\n")
                f.write(f"  问题数: {len(issues)}\n")
                
                for item in issues:
                    f.write(f"    行 {item['line']}: {item['type']}\n")
                    if item['type'] == 'chinese_dash':
                        f.write(f"      中文破折号 (——)\n")
                    elif item['type'] == 'chinese_character':
                        f.write(f"      中文字符: '{item['char']}'\n")
                    elif item['type'] == 'replacement_char':
                        f.write(f"      替换字符: �\n")
                    else:
                        f.write(f"      其他问题\n")
        
        f.write("\n")

if __name__ == '__main__':
    base_path = r'd:\trae_job\storyBook\coo'
    output_file = r'd:\trae_job\storyBook\remaining_issues_report.txt'
    results = scan_for_remaining_issues(base_path)
    generate_report(results, output_file)
    print(f"报告已生成: {output_file}")
