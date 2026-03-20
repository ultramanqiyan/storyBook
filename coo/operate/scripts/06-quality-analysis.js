import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// AI 写作痕迹检测规则
const AI_PATTERNS = [
  { pattern: /And somewhere\.\.\./gi, issue: 'AI 结尾模板', severity: 'high' },
  { pattern: /Neither of them knew\.\.\./gi, issue: 'AI 叙事模板', severity: 'high' },
  { pattern: /will never be the same/gi, issue: '陈词滥调', severity: 'medium' },
  { pattern: /just the beginning/gi, issue: '陈词滥调', severity: 'medium' },
  { pattern: /heart raced/gi, issue: '过度使用短语', severity: 'low' },
  { pattern: /something cracked inside/gi, issue: '重复表达', severity: 'medium' },
  { pattern: /\b\w+\b, \b\w+\b, and \b\w+\b/g, issue: 'Rule of Three 结构', severity: 'low' },
  { pattern: /END OF CHAPTER/gi, issue: '模板化结尾', severity: 'medium' },
];

// 感官细节检测
const SENSORY_PATTERNS = {
  smell: /(?:smell|scent|odor|fragrance|aroma|reek|stink|nose)/gi,
  touch: /(?:touch|feel|texture|warm|cold|soft|hard|rough|smooth|pressure)/gi,
  sound: /(?:sound|hear|noise|listen|echo|ring|buzz|whisper|roar)/gi,
  sight: /(?:see|look|watch|view|sight|visual|bright|dark|color)/gi,
  taste: /(?:taste|flavor|sweet|bitter|sour|salty|tongue)/gi,
};

// 情感层次检测
const EMOTIONAL_DEPTH_PATTERNS = {
  surface: /(?:stood|sat|lay|felt|appeared|seemed)/gi,
  inner: /(?:thought|wondered|questioned|realized|understood|knew)/gi,
  deep: /(?:feared|hoped|believed|doubted|wanted|needed|desired)/gi,
};

// 章节字数建议
const WORD_COUNT_TARGETS = {
  min: 2000,
  ideal: 3000,
  max: 5000,
};

function countWords(text) {
  return text.trim().split(/\s+/).length;
}

function analyzeAIPatterns(content) {
  const issues = [];
  
  for (const { pattern, issue, severity } of AI_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      issues.push({
        type: 'ai_pattern',
        issue,
        severity,
        count: matches.length,
        examples: matches.slice(0, 3),
      });
    }
  }
  
  return issues;
}

function analyzeSensoryDetails(content) {
  const results = {};
  
  for (const [sense, pattern] of Object.entries(SENSORY_PATTERNS)) {
    const matches = content.match(pattern);
    results[sense] = {
      count: matches ? matches.length : 0,
      has: matches && matches.length > 0,
    };
  }
  
  const totalSenses = Object.values(results).filter(r => r.has).length;
  results.score = totalSenses;
  results.grade = totalSenses >= 4 ? 'A' : totalSenses >= 3 ? 'B' : totalSenses >= 2 ? 'C' : 'D';
  
  return results;
}

function analyzeEmotionalDepth(content) {
  const results = {};
  
  for (const [layer, pattern] of Object.entries(EMOTIONAL_DEPTH_PATTERNS)) {
    const matches = content.match(pattern);
    results[layer] = {
      count: matches ? matches.length : 0,
      has: matches && matches.length > 0,
    };
  }
  
  const hasAllLayers = Object.values(results).every(r => r.has);
  results.complete = hasAllLayers;
  results.grade = hasAllLayers ? 'A' : results.inner.has && results.deep.has ? 'B' : results.inner.has ? 'C' : 'D';
  
  return results;
}

function analyzeChapterStructure(content) {
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  const dialogue = content.match(/"[^"]+"/g) || [];
  const innerThoughts = content.match(/\*[^*]+\*/g) || [];
  
  return {
    paragraphs: paragraphs.length,
    avgParagraphLength: Math.round(content.length / (paragraphs.length || 1)),
    dialogue: {
      count: dialogue.length,
      percentage: Math.round((dialogue.join(' ').length / content.length) * 100) || 0,
    },
    innerThoughts: {
      count: innerThoughts.length,
      percentage: Math.round((innerThoughts.join(' ').length / content.length) * 100) || 0,
    },
  };
}

function analyzeSEOQuality(content, chapterTitle, chapterNum) {
  const score = {
    hasKeywordInTitle: chapterTitle && chapterTitle.length > 3,
    hasOpeningHook: content.slice(0, 200).match(/^(The|A|An|It|She|He|I|We|They)/i),
    hasClosingImpact: content.slice(-200).match(/[.!?]\s*$/),
    hasUniqueVoice: content.match(/\b(I|me|my|we|us|our)\b/i) !== null,
  };
  
  score.total = Object.values(score).filter(Boolean).length;
  score.grade = score.total >= 4 ? 'A' : score.total >= 3 ? 'B' : score.total >= 2 ? 'C' : 'D';
  
  return score;
}

function analyzeChapter(chapterPath, chapterNum, bookDir) {
  const content = fs.readFileSync(chapterPath, 'utf-8');
  const wordCount = countWords(content);
  
  const aiIssues = analyzeAIPatterns(content);
  const sensoryDetails = analyzeSensoryDetails(content);
  const emotionalDepth = analyzeEmotionalDepth(content);
  const structure = analyzeChapterStructure(content);
  
  const chapterTitle = content.match(/^#\s+(.+)/)?.[1] || `Chapter ${chapterNum}`;
  const seoQuality = analyzeSEOQuality(content, chapterTitle, chapterNum);
  
  // 计算综合评分
  let qualityScore = 10;
  
  // AI 痕迹扣分
  aiIssues.forEach(issue => {
    if (issue.severity === 'high') qualityScore -= 2;
    else if (issue.severity === 'medium') qualityScore -= 1;
    else qualityScore -= 0.5;
  });
  
  // 感官细节评分
  if (sensoryDetails.grade === 'A') qualityScore += 0.5;
  else if (sensoryDetails.grade === 'D') qualityScore -= 1;
  
  // 情感深度评分
  if (emotionalDepth.grade === 'A') qualityScore += 0.5;
  else if (emotionalDepth.grade === 'D') qualityScore -= 1;
  
  // 字数评分
  if (wordCount < WORD_COUNT_TARGETS.min) qualityScore -= 1;
  else if (wordCount > WORD_COUNT_TARGETS.max) qualityScore -= 0.5;
  
  // SEO 评分
  if (seoQuality.grade === 'A') qualityScore += 0.5;
  else if (seoQuality.grade === 'D') qualityScore -= 0.5;
  
  qualityScore = Math.max(0, Math.min(10, qualityScore));
  
  return {
    chapterNum,
    title: chapterTitle,
    wordCount,
    qualityScore: Math.round(qualityScore * 10) / 10,
    aiIssues,
    sensoryDetails,
    emotionalDepth,
    structure,
    seoQuality,
    recommendations: generateRecommendations(aiIssues, sensoryDetails, emotionalDepth, wordCount, seoQuality),
  };
}

function generateRecommendations(aiIssues, sensoryDetails, emotionalDepth, wordCount, seoQuality) {
  const recommendations = [];
  
  if (aiIssues.length > 0) {
    const highSeverity = aiIssues.filter(i => i.severity === 'high');
    if (highSeverity.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'AI 痕迹',
        action: `移除 ${highSeverity.length} 处 AI 写作模板`,
      });
    }
  }
  
  if (sensoryDetails.grade === 'C' || sensoryDetails.grade === 'D') {
    const missing = Object.entries(sensoryDetails)
      .filter(([key, value]) => key !== 'score' && key !== 'grade' && !value.has)
      .map(([key]) => key);
    
    if (missing.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: '感官细节',
        action: `增加${missing.join('、')}描写`,
      });
    }
  }
  
  if (!emotionalDepth.complete) {
    recommendations.push({
      priority: 'medium',
      category: '情感深度',
      action: '补充三层情感设计（表面反应、内心活动、深层动机）',
    });
  }
  
  if (wordCount < WORD_COUNT_TARGETS.min) {
    recommendations.push({
      priority: 'medium',
      category: '内容长度',
      action: `扩展内容至${WORD_COUNT_TARGETS.min}词以上（当前：${wordCount}词）`,
    });
  }
  
  if (seoQuality.grade === 'C' || seoQuality.grade === 'D') {
    recommendations.push({
      priority: 'low',
      category: 'SEO 优化',
      action: '优化章节标题和开篇/结尾',
    });
  }
  
  return recommendations;
}

function analyzeBook(bookDir) {
  const bookPath = path.join(COO_ROOT, bookDir);
  const chaptersDir = path.join(bookPath, 'chapters');
  
  if (!fs.existsSync(chaptersDir)) {
    return null;
  }
  
  const chapterFiles = fs.readdirSync(chaptersDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const numMatch = f.match(/chapter-(\d+)/);
      return {
        file: f,
        chapterNum: numMatch ? parseInt(numMatch[1]) : 0,
      };
    })
    .sort((a, b) => a.chapterNum - b.chapterNum);
  
  const chapters = [];
  let totalWordCount = 0;
  let totalQualityScore = 0;
  const allIssues = {
    aiPatterns: 0,
    sensoryMissing: 0,
    emotionalIncomplete: 0,
    wordCountLow: 0,
  };
  
  for (const { file, chapterNum } of chapterFiles) {
    const chapterPath = path.join(chaptersDir, file);
    const analysis = analyzeChapter(chapterPath, chapterNum, bookDir);
    chapters.push(analysis);
    
    totalWordCount += analysis.wordCount;
    totalQualityScore += analysis.qualityScore;
    
    allIssues.aiPatterns += analysis.aiIssues.length;
    if (analysis.sensoryDetails.grade === 'C' || analysis.sensoryDetails.grade === 'D') {
      allIssues.sensoryMissing++;
    }
    if (!analysis.emotionalDepth.complete) {
      allIssues.emotionalIncomplete++;
    }
    if (analysis.wordCount < WORD_COUNT_TARGETS.min) {
      allIssues.wordCountLow++;
    }
  }
  
  const avgQualityScore = Math.round((totalQualityScore / chapters.length) * 10) / 10;
  
  // 生成书籍级别的建议
  const bookRecommendations = [];
  
  if (allIssues.aiPatterns > 5) {
    bookRecommendations.push({
      priority: 'high',
      category: 'AI 痕迹',
      action: `全书共有${allIssues.aiPatterns}处 AI 写作痕迹，建议批量清理`,
    });
  }
  
  if (allIssues.sensoryMissing > chapters.length / 2) {
    bookRecommendations.push({
      priority: 'high',
      category: '感官细节',
      action: `超过半数章节缺少感官细节，需系统性补充`,
    });
  }
  
  if (allIssues.emotionalIncomplete > chapters.length / 2) {
    bookRecommendations.push({
      priority: 'high',
      category: '情感深度',
      action: `超过半数章节情感层次不完整，需深化`,
    });
  }
  
  if (avgQualityScore >= 9) {
    bookRecommendations.push({
      priority: 'low',
      category: '整体质量',
      action: '质量优秀，保持当前水准',
    });
  } else if (avgQualityScore >= 7) {
    bookRecommendations.push({
      priority: 'medium',
      category: '整体质量',
      action: '质量良好，有提升空间',
    });
  } else {
    bookRecommendations.push({
      priority: 'high',
      category: '整体质量',
      action: '需要全面质量提升',
    });
  }
  
  return {
    bookDir,
    title: chapters[0]?.title?.split(':')[0] || bookDir,
    chapterCount: chapters.length,
    totalWordCount,
    avgQualityScore,
    chapters,
    issues: allIssues,
    recommendations: bookRecommendations,
  };
}

function generateReport(books) {
  const report = {
    summary: {
      totalBooks: books.length,
      totalChapters: books.reduce((sum, b) => sum + b.chapterCount, 0),
      totalWords: books.reduce((sum, b) => sum + b.totalWordCount, 0),
      avgQualityScore: Math.round((books.reduce((sum, b) => sum + b.avgQualityScore, 0) / books.length) * 10) / 10,
      qualityDistribution: {
        excellent: books.filter(b => b.avgQualityScore >= 9).length,
        good: books.filter(b => b.avgQualityScore >= 7 && b.avgQualityScore < 9).length,
        fair: books.filter(b => b.avgQualityScore >= 5 && b.avgQualityScore < 7).length,
        poor: books.filter(b => b.avgQualityScore < 5).length,
      },
    },
    books: books.map(book => ({
      ...book,
      grade: book.avgQualityScore >= 9 ? 'A' : book.avgQualityScore >= 7 ? 'B' : book.avgQualityScore >= 5 ? 'C' : 'D',
      ranking: 0, // Will be set later
    })).sort((a, b) => b.avgQualityScore - a.avgQualityScore)
      .map((book, index) => ({ ...book, ranking: index + 1 })),
    topIssues: {
      aiPatterns: books.reduce((sum, b) => sum + b.issues.aiPatterns, 0),
      sensoryMissing: books.reduce((sum, b) => sum + b.issues.sensoryMissing, 0),
      emotionalIncomplete: books.reduce((sum, b) => sum + b.issues.emotionalIncomplete, 0),
      wordCountLow: books.reduce((sum, b) => sum + b.issues.wordCountLow, 0),
    },
    actionItems: generateActionItems(books),
  };
  
  return report;
}

function generateActionItems(books) {
  const actionItems = {
    immediate: [],
    shortTerm: [],
    longTerm: [],
  };
  
  // 高优先级问题
  books.forEach(book => {
    if (book.avgQualityScore < 7) {
      actionItems.immediate.push({
        book: book.bookDir,
        action: `质量提升（当前评分：${book.avgQualityScore}）`,
        priority: 'high',
      });
    }
    
    if (book.issues.aiPatterns > 5) {
      actionItems.immediate.push({
        book: book.bookDir,
        action: `清理 AI 痕迹（${book.issues.aiPatterns}处）`,
        priority: 'high',
      });
    }
  });
  
  // 中等优先级
  books.forEach(book => {
    if (book.issues.sensoryMissing > book.chapterCount / 2) {
      actionItems.shortTerm.push({
        book: book.bookDir,
        action: '补充感官细节',
        priority: 'medium',
      });
    }
    
    if (book.issues.emotionalIncomplete > book.chapterCount / 2) {
      actionItems.shortTerm.push({
        book: book.bookDir,
        action: '深化情感层次',
        priority: 'medium',
      });
    }
  });
  
  // 长期改进
  actionItems.longTerm.push({
    action: '建立自动化质量检查流程',
    priority: 'low',
  });
  
  actionItems.longTerm.push({
    action: '创建内容质量标准和模板',
    priority: 'low',
  });
  
  return actionItems;
}

function saveReport(report) {
  const outputDir = path.join(__dirname, '..', 'logs');
  fs.mkdirSync(outputDir, { recursive: true });
  
  // 保存完整报告
  const reportPath = path.join(outputDir, 'quality-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // 生成 Markdown 格式报告
  const markdownReport = generateMarkdownReport(report);
  const markdownPath = path.join(outputDir, 'quality-analysis-report.md');
  fs.writeFileSync(markdownPath, markdownReport);
  
  return { reportPath, markdownPath };
}

function generateMarkdownReport(report) {
  let md = '# COO 书籍质量分析报告\n\n';
  md += `**生成时间:** ${new Date().toISOString().split('T')[0]}\n\n`;
  
  md += '## 执行摘要\n\n';
  md += `| 指标 | 数值 |\n|------|------|\n`;
  md += `| 总书籍数 | ${report.summary.totalBooks} |\n`;
  md += `| 总章节数 | ${report.summary.totalChapters} |\n`;
  md += `| 总字数 | ${report.summary.totalWords.toLocaleString()} |\n`;
  md += `| 平均质量分 | ${report.summary.avgQualityScore}/10 |\n\n`;
  
  md += '### 质量分布\n\n';
  md += `| 等级 | 数量 | 百分比 |\n|------|------|------|\n`;
  md += `| 优秀 (9-10) | ${report.summary.qualityDistribution.excellent} | ${Math.round(report.summary.qualityDistribution.excellent / report.summary.totalBooks * 100)}% |\n`;
  md += `| 良好 (7-8.9) | ${report.summary.qualityDistribution.good} | ${Math.round(report.summary.qualityDistribution.good / report.summary.totalBooks * 100)}% |\n`;
  md += `| 一般 (5-6.9) | ${report.summary.qualityDistribution.fair} | ${Math.round(report.summary.qualityDistribution.fair / report.summary.totalBooks * 100)}% |\n`;
  md += `| 较差 (<5) | ${report.summary.qualityDistribution.poor} | ${Math.round(report.summary.qualityDistribution.poor / report.summary.totalBooks * 100)}% |\n\n`;
  
  md += '## 书籍排名\n\n';
  md += '| 排名 | 书名 | 章节数 | 总字数 | 质量评分 | 等级 |\n|------|------|--------|--------|----------|------|\n';
  
  report.books.forEach(book => {
    md += `| ${book.ranking} | ${book.title} | ${book.chapterCount} | ${book.totalWordCount.toLocaleString()} | ${book.avgQualityScore}/10 | ${book.grade} |\n`;
  });
  
  md += '\n## 主要问题\n\n';
  md += `| 问题类型 | 出现次数 |\n|------|------|\n`;
  md += `| AI 写作痕迹 | ${report.topIssues.aiPatterns} |\n`;
  md += `| 感官细节缺失 | ${report.topIssues.sensoryMissing} 章 |\n`;
  md += `| 情感层次不完整 | ${report.topIssues.emotionalIncomplete} 章 |\n`;
  md += `| 字数不足 | ${report.topIssues.wordCountLow} 章 |\n\n`;
  
  md += '## 行动项\n\n';
  
  md += '### 立即执行（高优先级）\n\n';
  report.actionItems.immediate.forEach((item, i) => {
    md += `${i + 1}. **${item.book || '全部书籍'}**: ${item.action}\n`;
  });
  
  md += '\n### 短期改进（中优先级）\n\n';
  report.actionItems.shortTerm.forEach((item, i) => {
    md += `${i + 1}. **${item.book || '全部书籍'}**: ${item.action}\n`;
  });
  
  md += '\n### 长期优化（低优先级）\n\n';
  report.actionItems.longTerm.forEach((item, i) => {
    md += `${i + 1}. ${item.action}\n`;
  });
  
  md += '\n## 详细书籍分析\n\n';
  
  report.books.forEach(book => {
    md += `### ${book.ranking}. ${book.title}\n\n`;
    md += `**评分:** ${book.avgQualityScore}/10 (${book.grade})\n\n`;
    md += `**统计:** ${book.chapterCount}章 | ${book.totalWordCount.toLocaleString()}词\n\n`;
    
    if (book.recommendations.length > 0) {
      md += '**改进建议:**\n\n';
      book.recommendations.forEach((rec, i) => {
        md += `${i + 1}. [${rec.priority.toUpperCase()}] ${rec.action}\n`;
      });
      md += '\n';
    }
    
    md += '---\n\n';
  });
  
  return md;
}

async function main() {
  console.log('🔍 开始分析 COO 目录下所有书籍...\n');
  
  const cooRoot = COO_ROOT;
  const entries = fs.readdirSync(cooRoot, { withFileTypes: true });
  
  const booksToProcess = [];
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'operate') {
      const chaptersPath = path.join(cooRoot, entry.name, 'chapters');
      if (fs.existsSync(chaptersPath)) {
        booksToProcess.push(entry.name);
      }
    }
  }
  
  console.log(`📚 发现 ${booksToProcess.length} 本书籍\n`);
  
  const books = [];
  for (const bookDir of booksToProcess) {
    try {
      console.log(`📖 分析：${bookDir}`);
      const bookAnalysis = analyzeBook(bookDir);
      if (bookAnalysis) {
        books.push(bookAnalysis);
        console.log(`   章节：${bookAnalysis.chapterCount} | 字数：${bookAnalysis.totalWordCount.toLocaleString()} | 评分：${bookAnalysis.avgQualityScore}/10`);
      }
    } catch (error) {
      console.error(`   ❌ 错误：${error.message}`);
    }
  }
  
  console.log('\n📊 生成报告...\n');
  const report = generateReport(books);
  const paths = saveReport(report);
  
  console.log('✅ 分析完成！\n');
  console.log(`📄 JSON 报告：${paths.reportPath}`);
  console.log(`📝 Markdown 报告：${paths.markdownPath}`);
  console.log('\n📈 质量摘要:\n');
  console.log(`   总书籍：${report.summary.totalBooks}`);
  console.log(`   总章节：${report.summary.totalChapters}`);
  console.log(`   总字数：${report.summary.totalWords.toLocaleString()}`);
  console.log(`   平均评分：${report.summary.avgQualityScore}/10`);
  console.log(`\n   优秀 (9-10): ${report.summary.qualityDistribution.excellent} 本`);
  console.log(`   良好 (7-8.9): ${report.summary.qualityDistribution.good} 本`);
  console.log(`   一般 (5-6.9): ${report.summary.qualityDistribution.fair} 本`);
  console.log(`   较差 (<5): ${report.summary.qualityDistribution.poor} 本`);
  
  return report;
}

main().catch(console.error);
