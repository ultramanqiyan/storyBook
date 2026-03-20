import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// 叙事连贯性检查
function checkNarrativeConsistency(content, chapterNum) {
  const issues = [];
  
  // 检查时态一致性
  const pastTense = (content.match(/\b(was|were|had|did|said|felt|thought)\b/gi) || []).length;
  const presentTense = (content.match(/\b(is|are|has|does|says|feels|thinks)\b/gi) || []).length;
  const tenseRatio = pastTense / (pastTense + presentTense);
  
  if (tenseRatio < 0.3 || tenseRatio > 0.7) {
    issues.push({
      type: '时态不一致',
      severity: 'medium',
      detail: `过去时：${pastTense}, 现在时：${presentTense}, 比例失衡`
    });
  }
  
  // 检查角色名称一致性
  const characterNames = ['Sarah', 'Emma', 'Alex', 'Maya', 'David', 'Dr. Chen', 'Marcus'];
  const foundCharacters = [];
  characterNames.forEach(name => {
    if (content.includes(name)) foundCharacters.push(name);
  });
  
  // 检查人称代词一致性
  const firstPerson = (content.match(/\b(I|me|my|mine|myself)\b/gi) || []).length;
  const thirdPerson = (content.match(/\b(he|she|it|his|her|its|him)\b/gi) || []).length;
  
  if (firstPerson > 0 && thirdPerson > 0 && Math.abs(firstPerson - thirdPerson) < 20) {
    issues.push({
      type: '人称视角混乱',
      severity: 'high',
      detail: `第一人称：${firstPerson}, 第三人称：${thirdPerson}, 可能存在视角跳跃`
    });
  }
  
  // 检查时间线标记
  const timeMarkers = [
    /(?:morning|afternoon|evening|night|dawn|dusk)/gi,
    /(?:yesterday|today|tomorrow)/gi,
    /(?:days|weeks|months|years) (?:later|ago|passed)/gi
  ];
  
  let timeMarkerCount = 0;
  timeMarkers.forEach(pattern => {
    timeMarkerCount += (content.match(pattern) || []).length;
  });
  
  if (timeMarkerCount < 2 && content.length > 1000) {
    issues.push({
      type: '时间线模糊',
      severity: 'low',
      detail: `时间标记词过少 (${timeMarkerCount}个)，可能影响叙事连贯性`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues
  };
}

// 对话质量检查
function checkDialogueQuality(content) {
  const issues = [];
  const dialogueLines = content.match(/"[^"]*"/g) || [];
  
  if (dialogueLines.length === 0) {
    return {
      score: 5,
      issues: [{ type: '无对话', severity: 'medium', detail: '章节完全没有对话' }],
      stats: { totalDialogues: 0, avgLength: 0, variety: 0 }
    };
  }
  
  // 检查对话长度变化
  const dialogueLengths = dialogueLines.map(d => d.length);
  const avgLength = dialogueLengths.reduce((a, b) => a + b, 0) / dialogueLengths.length;
  const lengthVariance = dialogueLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / dialogueLengths.length;
  
  if (lengthVariance < 50) {
    issues.push({
      type: '对话长度单一',
      severity: 'low',
      detail: `对话长度变化过小 (方差：${lengthVariance.toFixed(1)}), 缺乏节奏感`
    });
  }
  
  // 检查对话标签多样性
  const dialogueTags = [
    'said', 'asked', 'replied', 'responded', 'continued',
    'whispered', 'shouted', 'murmured', 'cried', 'exclaimed'
  ];
  
  let foundTags = 0;
  dialogueTags.forEach(tag => {
    if (new RegExp(`\\b${tag}\\b`, 'gi').test(content)) foundTags++;
  });
  
  if (foundTags < 3 && dialogueLines.length > 5) {
    issues.push({
      type: '对话标签单一',
      severity: 'low',
      detail: `对话标签种类过少 (${foundTags}种), 建议增加变化`
    });
  }
  
  // 检查对话占比
  const dialogueRatio = dialogueLines.join(' ').length / content.length;
  
  if (dialogueRatio < 0.1 && content.length > 1000) {
    issues.push({
      type: '对话过少',
      severity: 'low',
      detail: `对话占比仅 ${(dialogueRatio * 100).toFixed(1)}%`
    });
  } else if (dialogueRatio > 0.8) {
    issues.push({
      type: '对话过多',
      severity: 'low',
      detail: `对话占比 ${(dialogueRatio * 100).toFixed(1)}%, 缺乏描述`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues,
    stats: {
      totalDialogues: dialogueLines.length,
      avgLength: avgLength.toFixed(1),
      variety: foundTags,
      ratio: (dialogueRatio * 100).toFixed(1) + '%'
    }
  };
}

// 节奏和张力检查
function checkPacingAndTension(content) {
  const issues = [];
  
  // 检查句子长度变化
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  
  const shortSentences = sentenceLengths.filter(len => len < 10).length;
  const longSentences = sentenceLengths.filter(len => len > 30).length;
  
  const shortRatio = shortSentences / sentences.length;
  const longRatio = longSentences / sentences.length;
  
  if (shortRatio < 0.15) {
    issues.push({
      type: '短句过少',
      severity: 'medium',
      detail: `短句占比 ${(shortRatio * 100).toFixed(1)}%, 节奏可能过于缓慢`
    });
  }
  
  if (longRatio > 0.4) {
    issues.push({
      type: '长句过多',
      severity: 'medium',
      detail: `长句占比 ${(longRatio * 100).toFixed(1)}%, 可能影响可读性`
    });
  }
  
  // 检查张力词汇
  const tensionWords = [
    'suddenly', 'immediately', 'quickly', 'fast', 'urgent',
    'heart', 'breath', 'pulse', 'tension', 'fear',
    'wait', 'listen', 'watch', 'silence', 'still'
  ];
  
  let tensionCount = 0;
  tensionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    tensionCount += (content.match(regex) || []).length;
  });
  
  const tensionRatio = tensionCount / content.length * 1000;
  
  if (tensionRatio < 5) {
    issues.push({
      type: '张力不足',
      severity: 'medium',
      detail: `张力词汇密度 ${(tensionRatio).toFixed(1)}/千词，可能缺乏紧张感`
    });
  }
  
  // 检查段落长度变化
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphLengths = paragraphs.map(p => p.split(/\s+/).length);
  const avgParagraphLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
  
  if (avgParagraphLength > 150) {
    issues.push({
      type: '段落过长',
      severity: 'low',
      detail: `平均段落长度 ${avgParagraphLength.toFixed(0)} 词，建议拆分`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues,
    stats: {
      avgSentenceLength: avgSentenceLength.toFixed(1),
      shortSentenceRatio: (shortRatio * 100).toFixed(1) + '%',
      longSentenceRatio: (longRatio * 100).toFixed(1) + '%',
      tensionDensity: tensionRatio.toFixed(1) + '/k',
      avgParagraphLength: avgParagraphLength.toFixed(0)
    }
  };
}

// 主题深度检查
function checkThematicDepth(content) {
  const issues = [];
  
  // 检查哲学性词汇
  const philosophicalWords = [
    'meaning', 'purpose', 'truth', 'reality', 'existence',
    'consciousness', 'identity', 'memory', 'choice', 'freedom',
    'love', 'death', 'time', 'change', 'understand'
  ];
  
  let philosophicalCount = 0;
  philosophicalWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    philosophicalCount += (content.match(regex) || []).length;
  });
  
  const philoRatio = philosophicalCount / content.length * 1000;
  
  if (philoRatio < 3) {
    issues.push({
      type: '哲学深度不足',
      severity: 'low',
      detail: `哲学词汇密度 ${(philoRatio).toFixed(1)}/千词`
    });
  }
  
  // 检查内心独白
  const innerThoughts = content.match(/\*[^*]*\*/g) || [];
  const thoughtRatio = innerThoughts.length / (content.split(/\s+/).length / 100);
  
  if (thoughtRatio < 1) {
    issues.push({
      type: '内心活动过少',
      severity: 'low',
      detail: `每百词仅 ${(thoughtRatio).toFixed(1)} 处内心独白`
    });
  }
  
  // 检查象征和隐喻
  const metaphorPatterns = [
    /like \w+ (?:that|as)/gi,
    /as \w+ as/gi,
    /was a/gi,
    /were (?:like|a)/gi
  ];
  
  let metaphorCount = 0;
  metaphorPatterns.forEach(pattern => {
    metaphorCount += (content.match(pattern) || []).length;
  });
  
  if (metaphorCount < 2) {
    issues.push({
      type: '缺乏修辞',
      severity: 'low',
      detail: `仅发现 ${metaphorCount} 处比喻/象征`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 1.5),
    issues,
    stats: {
      philosophicalDensity: philoRatio.toFixed(1) + '/k',
      innerThoughts: innerThoughts.length,
      thoughtRatio: thoughtRatio.toFixed(1) + '/100 词',
      metaphors: metaphorCount
    }
  };
}

// 场景转换检查
function checkSceneTransitions(content) {
  const issues = [];
  
  // 检查过渡词
  const transitionWords = [
    'then', 'next', 'after', 'before', 'while',
    'meanwhile', 'suddenly', 'finally', 'eventually',
    'when', 'as', 'until', 'once', 'since'
  ];
  
  let transitionCount = 0;
  transitionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    transitionCount += (content.match(regex) || []).length;
  });
  
  const transitionRatio = transitionCount / content.length * 1000;
  
  if (transitionRatio < 8) {
    issues.push({
      type: '过渡词不足',
      severity: 'medium',
      detail: `过渡词密度 ${(transitionRatio).toFixed(1)}/千词，场景转换可能生硬`
    });
  }
  
  // 检查空间指示词
  const spatialWords = [
    'here', 'there', 'where', 'near', 'far',
    'above', 'below', 'inside', 'outside', 'across',
    'through', 'around', 'behind', 'beside', 'between'
  ];
  
  let spatialCount = 0;
  spatialWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    spatialCount += (content.match(regex) || []).length;
  });
  
  if (spatialCount < 5) {
    issues.push({
      type: '空间感不足',
      severity: 'low',
      detail: `空间指示词仅 ${spatialCount} 处`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues,
    stats: {
      transitionDensity: transitionRatio.toFixed(1) + '/k',
      spatialWords: spatialCount
    }
  };
}

// 综合评分
function calculateOverallScore(scores) {
  const weights = {
    narrative: 0.25,
    dialogue: 0.20,
    pacing: 0.20,
    thematic: 0.15,
    transitions: 0.20
  };
  
  const weightedSum = 
    scores.narrative * weights.narrative +
    scores.dialogue * weights.dialogue +
    scores.pacing * weights.pacing +
    scores.thematic * weights.thematic +
    scores.transitions * weights.transitions;
  
  return Math.round(weightedSum * 10) / 10;
}

// 主函数
async function deepQualityCheck() {
  console.log('🔍 开始深度质量检查...\n');
  
  const books = fs.readdirSync(COO_ROOT)
    .filter(item => {
      const fullPath = path.join(COO_ROOT, item);
      return fs.statSync(fullPath).isDirectory() && item !== 'operate';
    });
  
  console.log(`📚 发现 ${books.length} 本书籍\n`);
  
  const results = [];
  const globalStats = {
    totalChapters: 0,
    narrativeIssues: 0,
    dialogueIssues: 0,
    pacingIssues: 0,
    thematicIssues: 0,
    transitionIssues: 0
  };
  
  for (const bookDir of books) {
    const bookPath = path.join(COO_ROOT, bookDir);
    const chaptersPath = path.join(bookPath, 'chapters');
    
    if (!fs.existsSync(chaptersPath)) continue;
    
    const chapterFiles = fs.readdirSync(chaptersPath)
      .filter(f => f.endsWith('.md'))
      .sort();
    
    if (chapterFiles.length === 0) continue;
    
    console.log(`📖 检查：${bookDir}`);
    
    const bookResults = {
      bookDir,
      chapters: [],
      totalIssues: 0,
      avgScore: 0
    };
    
    let bookTotalScore = 0;
    
    for (const chapterFile of chapterFiles) {
      const chapterPath = path.join(chaptersPath, chapterFile);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const chapterNum = parseInt(chapterFile.match(/\d+/)?.[0] || '0');
      
      const narrative = checkNarrativeConsistency(content, chapterNum);
      const dialogue = checkDialogueQuality(content);
      const pacing = checkPacingAndTension(content);
      const thematic = checkThematicDepth(content);
      const transitions = checkSceneTransitions(content);
      
      const overallScore = calculateOverallScore({
        narrative: narrative.score,
        dialogue: dialogue.score,
        pacing: pacing.score,
        thematic: thematic.score,
        transitions: transitions.score
      });
      
      bookResults.chapters.push({
        chapterNum,
        title: chapterFile,
        overallScore,
        narrative,
        dialogue,
        pacing,
        thematic,
        transitions
      });
      
      bookTotalScore += overallScore;
      bookResults.totalIssues += 
        narrative.issues.length +
        dialogue.issues.length +
        pacing.issues.length +
        thematic.issues.length +
        transitions.issues.length;
      
      globalStats.totalChapters++;
      globalStats.narrativeIssues += narrative.issues.length;
      globalStats.dialogueIssues += dialogue.issues.length;
      globalStats.pacingIssues += pacing.issues.length;
      globalStats.thematicIssues += thematic.issues.length;
      globalStats.transitionIssues += transitions.issues.length;
    }
    
    bookResults.avgScore = Math.round((bookTotalScore / chapterFiles.length) * 10) / 10;
    results.push(bookResults);
    
    console.log(`   章节：${chapterFiles.length} | 均分：${bookResults.avgScore}/10 | 问题：${bookResults.totalIssues}处`);
  }
  
  // 生成报告
  console.log('\n📊 生成报告...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    totalBooks: results.length,
    globalStats,
    books: results,
    summary: {
      avgScoreAcrossBooks: Math.round(
        (results.reduce((sum, b) => sum + b.avgScore, 0) / results.length) * 10
      ) / 10,
      totalIssues: Object.values(globalStats).reduce((a, b) => a + b, 0),
      issuesByType: {
        narrative: globalStats.narrativeIssues,
        dialogue: globalStats.dialogueIssues,
        pacing: globalStats.pacingIssues,
        thematic: globalStats.thematicIssues,
        transitions: globalStats.transitionIssues
      }
    }
  };
  
  const logsDir = path.join(COO_ROOT, 'operate', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // JSON 报告
  const jsonReportPath = path.join(logsDir, 'deep-quality-check.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
  
  // Markdown 报告
  let mdReport = `# COO 书籍深度质量检查报告\n\n`;
  mdReport += `**生成时间:** ${new Date().toISOString().split('T')[0]}\n\n`;
  mdReport += `## 执行摘要\n\n`;
  mdReport += `| 指标 | 数值 |\n|------|------|\n`;
  mdReport += `| 总书籍数 | ${report.totalBooks} |\n`;
  mdReport += `| 总章节数 | ${globalStats.totalChapters} |\n`;
  mdReport += `| 平均质量分 | ${report.summary.avgScoreAcrossBooks}/10 |\n`;
  mdReport += `| 总问题数 | ${report.summary.totalIssues} |\n\n`;
  
  mdReport += `### 问题分布\n\n`;
  mdReport += `| 问题类型 | 数量 | 占比 |\n|------|------|------|\n`;
  const totalIssues = report.summary.totalIssues;
  mdReport += `| 叙事连贯性 | ${report.summary.issuesByType.narrative} | ${((report.summary.issuesByType.narrative / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 对话质量 | ${report.summary.issuesByType.dialogue} | ${((report.summary.issuesByType.dialogue / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 节奏张力 | ${report.summary.issuesByType.pacing} | ${((report.summary.issuesByType.pacing / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 主题深度 | ${report.summary.issuesByType.thematic} | ${((report.summary.issuesByType.thematic / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 场景转换 | ${report.summary.issuesByType.transitions} | ${((report.summary.issuesByType.transitions / totalIssues) * 100).toFixed(1)}% |\n\n`;
  
  mdReport += `## 书籍详情\n\n`;
  
  results.sort((a, b) => b.avgScore - a.avgScore).forEach((book, index) => {
    mdReport += `### ${index + 1}. ${book.bookDir}\n\n`;
    mdReport += `**平均评分:** ${book.avgScore}/10\n\n`;
    mdReport += `**总问题数:** ${book.totalIssues}处\n\n`;
    
    if (book.totalIssues > 0) {
      mdReport += `**主要问题:**\n\n`;
      
      const allIssues = [];
      book.chapters.forEach(ch => {
        ['narrative', 'dialogue', 'pacing', 'thematic', 'transitions'].forEach(type => {
          ch[type].issues.forEach(issue => {
            allIssues.push({
              chapter: ch.chapterNum,
              type,
              ...issue
            });
          });
        });
      });
      
      // 按严重程度排序
      allIssues.sort((a, b) => {
        const severityOrder = { high: 0, medium: 1, low: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });
      
      allIssues.slice(0, 10).forEach(issue => {
        const severityIcon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        mdReport += `- ${severityIcon} **第${issue.chapter}章**: ${issue.type} - ${issue.detail}\n`;
      });
      
      if (allIssues.length > 10) {
        mdReport += `- ... 还有 ${allIssues.length - 10} 处问题\n`;
      }
    } else {
      mdReport += `✅ 无明显问题，质量优秀\n`;
    }
    
    mdReport += `\n---\n\n`;
  });
  
  mdReport += `## 建议\n\n`;
  mdReport += `### 高优先级\n\n`;
  
  const highPriorityBooks = results.filter(b => b.avgScore < 7);
  if (highPriorityBooks.length > 0) {
    highPriorityBooks.forEach(book => {
      mdReport += `- **${book.bookDir}** (${book.avgScore}/10): 需要全面审查和修改\n`;
    });
  } else {
    mdReport += `✅ 所有书籍均分在 7 分以上，无需紧急处理\n`;
  }
  
  mdReport += `\n### 中优先级\n\n`;
  
  const mediumPriorityBooks = results.filter(b => b.avgScore >= 7 && b.avgScore < 8.5);
  if (mediumPriorityBooks.length > 0) {
    mediumPriorityBooks.forEach(book => {
      mdReport += `- **${book.bookDir}** (${book.avgScore}/10): 建议针对性改进\n`;
    });
  } else {
    mdReport += `✅ 所有书籍均分在 8.5 分以上，质量良好\n`;
  }
  
  mdReport += `\n### 低优先级\n\n`;
  mdReport += `1. 保持优秀书籍的质量水准\n`;
  mdReport += `2. 定期运行深度质量检查\n`;
  mdReport += `3. 建立质量标准和最佳实践库\n`;
  
  const mdReportPath = path.join(logsDir, 'deep-quality-check.md');
  fs.writeFileSync(mdReportPath, mdReport);
  
  console.log(`✅ 深度检查完成！\n`);
  console.log(`📄 JSON 报告：${jsonReportPath}`);
  console.log(`📝 Markdown 报告：${mdReportPath}\n`);
  
  console.log(`📈 质量摘要:\n`);
  console.log(`   总书籍：${report.totalBooks}`);
  console.log(`   总章节：${globalStats.totalChapters}`);
  console.log(`   平均评分：${report.summary.avgScoreAcrossBooks}/10`);
  console.log(`   总问题数：${report.summary.totalIssues}处\n`);
  
  return report;
}

deepQualityCheck().catch(console.error);
