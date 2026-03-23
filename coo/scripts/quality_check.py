#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
书籍质量检查脚本
基于完整质检标准对41本书籍进行全面检查
"""

import os
import re
import glob
from pathlib import Path
from collections import Counter

# 质检标准
QUALITY_STANDARD = {
    "content_quality": 0.20,  # 内容质量 20%
    "ai_detection": 0.20,     # AI痕迹检测 20%
    "language_quality": 0.15, # 语言质量 15%
    "emotional_depth": 0.15,  # 情感深度 15%
    "technical": 0.10,        # 技术实现 10%
    "format": 0.10,           # 格式规范 10%
    "reader_exp": 0.10,       # 读者体验 10%
}

# AI痕迹检测 - 禁止词汇
FORBIDDEN_WORDS = [
    "tapestry", "symphony", "dance", "mosaic", "kaleidoscope",
    "delve", "explore", "navigate", "unlock", "harness",
    "Furthermore", "Moreover", "Additionally", "Consequently"
]

# AI痕迹检测 - 禁止句式
FORBIDDEN_PATTERNS = [
    r"will never be the same",
    r"just the beginning",
    r"neither of them knew",
    r