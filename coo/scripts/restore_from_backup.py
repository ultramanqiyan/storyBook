#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从备份恢复原始文件
"""

import shutil
from pathlib import Path
from datetime import datetime

BOOKS = [
    'the-neural-druid', 'the-unconditional', 'the-blame-game', 'the-silent-partner',
    'the-whispering-network', 'the-synthetic-soul', 'the-hollow-heart',
    'the-silent-lab', 'the-quantum-witch', 'the-prompt-mage'
]

BACKUP_DIR = Path('d:/trae_job/storyBook/coo/backup/20260330_074052')
BASE_DIR = Path('d:/trae_job/storyBook/coo')

def main():
    print("=" * 50)
    print("从备份恢复原始文件")
    print("=" * 50)
    print()
    
    total_restored = 0
    
    for book in BOOKS:
        backup_chapters = BACKUP_DIR / book / 'chapters'
        target_chapters = BASE_DIR / book / 'chapters'
        
        if not backup_chapters.exists():
            print(f"跳过: {book} (无备份)")
            continue
        
        book_restored = 0
        
        for backup_file in sorted(backup_chapters.glob('chapter-*.md')):
            if 'improved' in backup_file.name:
                continue
            
            target_file = target_chapters / backup_file.name
            
            # 备份当前文件
            if target_file.exists():
                backup_current = BASE_DIR / 'backup' / f'before_restore_{datetime.now().strftime("%Y%m%d_%H%M%S")}' / book / 'chapters'
                backup_current.mkdir(parents=True, exist_ok=True)
                shutil.copy2(target_file, backup_current / backup_file.name)
            
            # 恢复原始文件
            shutil.copy2(backup_file, target_file)
            book_restored += 1
        
        if book_restored > 0:
            print(f"✅ {book}: 恢复 {book_restored} 个文件")
            total_restored += book_restored
        else:
            print(f"OK: {book}")
    
    print()
    print("=" * 50)
    print(f"恢复完成! 共恢复 {total_restored} 个文件")
    print("=" * 50)

if __name__ == '__main__':
    main()
