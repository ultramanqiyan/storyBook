# -*- coding: utf-8 -*-
import os
import re
from pathlib import Path
from collections import defaultdict
import json

def check_file(filepath):
    issues = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')
    except Exception as e:
        return [{'type': 'read_error', 'line': 0, 'content': str(e), 'file': str(filepath)}]
    
    for line_num, line in enumerate(lines, 1):
        # 检查破折号 (中文破折号 ——)
        if '——' in line:
            issues.append({
                'type': 'chinese_dash',
                'line': line_num,
                'content': line.strip()[:100]
            })
        
        # 检查连续两个减号作为破折号 (但排除markdown注释 <!-- -->)
        double_dash_pattern = r'(?<!<!)--(?!>)'
        if re.search(double_dash_pattern, line):
            # 排除正常的markdown注释
            if not re.search(r'<!--.*?-->', line):
                issues.append({
                    'type': 'double_dash',
                    'line': line_num,
                    'content': line.strip()[:100]
                })
        
        # 检查非ASCII字符 (排除常见的标点符号)
        for char in line:
            # 跳过ASCII字符
            if ord(char) < 128:
                continue
            
            # 跳过常见的Unicode标点符号
            if char in '—–…""''«»„"•·':
                continue
            
            # 检测中文字符
            if '\u4e00' <= char <= '\u9fff':
                issues.append({
                    'type': 'chinese_character',
                    'line': line_num,
                    'content': line.strip()[:100],
                    'char': char
                })
                break
            
            # 检测其他非英文字符 (如日文、韩文、俄文等)
            if ord(char) > 127:
                issues.append({
                    'type': 'non_ascii',
                    'line': line_num,
                    'content': line.strip()[:100],
                    'char': char,
                    'codepoint': hex(ord(char))
                })
                break
    
    return issues

def scan_directory(base_path):
    results = defaultdict(lambda: defaultdict(list))
    total_files = 0
    total_issues = 0
    
    # 排除的目录
    exclude_dirs = {'scripts', 'backup', 'docs', 'operate', '.templates'}
    
    # 遍历所有书籍目录
    for book_dir in sorted(Path(base_path).iterdir()):
        if not book_dir.is_dir():
            continue
        if book_dir.name in exclude_dirs:
            continue
        
        chapters_dir = book_dir / 'chapters'
        if not chapters_dir.exists():
            continue
        
        book_issues = defaultdict(list)
        
        # 检查所有章节文件
        for chapter_file in sorted(chapters_dir.glob('*.md')):
            total_files += 1
            issues = check_file(chapter_file)
            
            if issues:
                for issue in issues:
                    book_issues[chapter_file.name].append(issue)
                    total_issues += 1
        
        if book_issues:
            results[book_dir.name] = dict(book_issues)
    
    return results, total_files, total_issues

def generate_report(results, total_files, total_issues, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("COO目录书籍检查报告\n")
        f.write("=" * 80 + "\n")
        f.write(f"\n检查统计:\n")
        f.write(f"  - 检查文件总数: {total_files}\n")
        f.write(f"  - 发现问题总数: {total_issues}\n")
        f.write(f"  - 有问题的书籍数: {len(results)}\n")
        
        if not results:
            f.write("\n未发现任何问题！所有文件均符合要求。\n")
            return
        
        f.write("\n" + "=" * 80 + "\n")
        f.write("问题详情:\n")
        f.write("=" * 80 + "\n")
        
        # 按问题类型统计
        issue_types = defaultdict(int)
        for book, chapters in results.items():
            for chapter, issues in chapters.items():
                for issue in issues:
                    issue_types[issue['type']] += 1
        
        f.write("\n问题类型统计:\n")
        type_names = {
            'chinese_dash': '中文破折号 (——)',
            'double_dash': '双减号破折号 (--)',
            'chinese_character': '中文字符',
            'non_ascii': '非ASCII字符',
            'read_error': '读取错误'
        }
        for itype, count in sorted(issue_types.items()):
            f.write(f"  - {type_names.get(itype, itype)}: {count}处\n")
        
        f.write("\n" + "-" * 80 + "\n")
        f.write("详细问题列表:\n")
        f.write("-" * 80 + "\n")
        
        for book in sorted(results.keys()):
            chapters = results[book]
            f.write(f"\n[书籍] {book}\n")
            
            for chapter in sorted(chapters.keys()):
                issues = chapters[chapter]
                f.write(f"\n  [章节] {chapter}\n")
                
                for issue in issues:
                    issue_type = type_names.get(issue['type'], issue['type'])
                    line = issue['line']
                    content = issue['content'][:80] + ('...' if len(issue['content']) > 80 else '')
                    
                    if issue['type'] == 'chinese_character':
                        char = issue.get('char', '?')
                        f.write(f"    [!] 行{line}: [{issue_type}] 字符'{char}'\n")
                        f.write(f"        内容: {content}\n")
                    elif issue['type'] == 'non_ascii':
                        char = issue.get('char', '?')
                        codepoint = issue.get('codepoint', '?')
                        f.write(f"    [!] 行{line}: [{issue_type}] 字符'{char}' (Unicode: {codepoint})\n")
                        f.write(f"        内容: {content}\n")
                    elif issue['type'] == 'read_error':
                        f.write(f"    [!] 读取错误: {issue.get('content', 'unknown')}\n")
                    else:
                        f.write(f"    [!] 行{line}: [{issue_type}]\n")
                        f.write(f"        内容: {content}\n")

if __name__ == '__main__':
    base_path = r'd:\trae_job\storyBook\coo'
    output_file = r'd:\trae_job\storyBook\check_report.txt'
    results, total_files, total_issues = scan_directory(base_path)
    generate_report(results, total_files, total_issues, output_file)
    print(f"报告已生成: {output_file}")
    print(f"检查文件总数: {total_files}")
    print(f"发现问题总数: {total_issues}")
    print(f"有问题的书籍数: {len(results)}")
