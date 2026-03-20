import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// 1. 可读性分析
function analyzeReadability(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  // 平均句子长度
  const avgSentenceLength = words.length / sentences.length;
  
  // 平均段落长度
  const avgParagraphLength = words.length / paragraphs.length;
  
  // 复杂词比例（3 音节以上的词）
  const complexWords = words.filter(w => w.replace(/[^a-zA-Z]/g, '').split(/[aeiouAEIOU]+/).length >= 3);
  const complexWordRatio = complexWords.length / words.length;
  
  // Flesch Reading Ease (简化版)
  const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * complexWordRatio);
  
  // 可读性评级
  let readabilityGrade;
  if (fleschScore >= 80) readabilityGrade = '很容易 (小学水平)';
  else if (fleschScore >= 70) readabilityGrade = '容易 (初中水平)';
  else if (fleschScore >= 60) readabilityGrade = '标准 (高中水平)';
  else if (fleschScore >= 50) readabilityGrade = '较难 (大学水平)';
  else readabilityGrade = '很难 (专业水平)';
  
  const issues = [];
  
  if (avgSentenceLength > 25) {
    issues.push({
      type: '句子过长',
      severity: 'medium',
      detail: `平均句子长度 ${avgSentenceLength.toFixed(1)} 词，建议控制在 20 词以内`
    });
  }
  
  if (avgParagraphLength > 150) {
    issues.push({
      type: '段落过长',
      severity: 'low',
      detail: `平均段落长度 ${avgParagraphLength.toFixed(0)} 词，建议拆分`
    });
  }
  
  if (fleschScore < 60) {
    issues.push({
      type: '可读性偏低',
      severity: 'medium',
      detail: `Flesch 评分 ${fleschScore.toFixed(1)}，建议简化句式`
    });
  }
  
  return {
    score: Math.max(0, Math.min(100, fleschScore)),
    grade: readabilityGrade,
    issues,
    stats: {
      avgSentenceLength: avgSentenceLength.toFixed(1),
      avgParagraphLength: avgParagraphLength.toFixed(0),
      complexWordRatio: (complexWordRatio * 100).toFixed(1) + '%'
    }
  };
}

// 2. 词汇丰富度分析
function analyzeVocabularyRichness(content) {
  const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 3 && /^[a-z]+$/.test(w));
  const totalWords = words.length;
  const uniqueWords = new Set(words);
  const uniqueWordCount = uniqueWords.size;
  
  // 词汇多样性 (Type-Token Ratio)
  const ttr = uniqueWordCount / totalWords;
  
  // 检测重复用词
  const wordFrequency = {};
  words.forEach(w => {
    wordFrequency[w] = (wordFrequency[w] || 0) + 1;
  });
  
  const overusedWords = Object.entries(wordFrequency)
    .filter(([_, count]) => count > totalWords * 0.02) // 出现频率超过 2%
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  // 常用动词检测
  const commonVerbs = ['said', 'was', 'had', 'did', 'went', 'came', 'saw', 'felt', 'thought', 'knew'];
  const verbUsage = commonVerbs.filter(v => wordFrequency[v] && wordFrequency[v] > totalWords * 0.01);
  
  const issues = [];
  
  if (ttr < 0.4) {
    issues.push({
      type: '词汇重复度高',
      severity: 'medium',
      detail: `词汇多样性 ${ (ttr * 100).toFixed(1) }%，建议增加词汇变化`
    });
  }
  
  if (overusedWords.length > 5) {
    issues.push({
      type: '过度使用某些词汇',
      severity: 'low',
      detail: `前 3 个高频词：${overusedWords.slice(0, 3).map(([w, c]) => `${w}(${c}次)`).join(', ')}`
    });
  }
  
  if (verbUsage.length > 3) {
    issues.push({
      type: '动词单一',
      severity: 'low',
      detail: `过度使用常见动词：${verbUsage.join(', ')}`
    });
  }
  
  return {
    score: Math.min(10, ttr * 15),
    issues,
    stats: {
      totalWords,
      uniqueWords: uniqueWordCount,
      ttr: (ttr * 100).toFixed(1) + '%',
      overusedWords: overusedWords.slice(0, 5),
      verbVariety: commonVerbs.length - verbUsage.length
    }
  };
}

// 3. 情感曲线分析
function analyzeEmotionalArc(content) {
  // 情感词汇库
  const positiveWords = [
    'love', 'happy', 'joy', 'hope', 'peace', 'light', 'warm', 'soft', 'gentle',
    'smile', 'laugh', 'comfort', 'safe', 'trust', 'believe', 'wonderful', 'beautiful'
  ];
  
  const negativeWords = [
    'fear', 'pain', 'dark', 'cold', 'hard', 'anger', 'hate', 'sad', 'cry',
    'danger', 'threat', 'violence', 'death', 'loss', 'grief', 'despair', 'terror'
  ];
  
  const tensionWords = [
    'suddenly', 'quickly', 'immediately', 'urgent', 'fast', 'rush', 'panic',
    'heart', 'breath', 'pulse', 'tension', 'wait', 'listen', 'watch'
  ];
  
  const words = content.toLowerCase().split(/\s+/);
  
  let positiveCount = 0, negativeCount = 0, tensionCount = 0;
  
  words.forEach(w => {
    if (positiveWords.includes(w)) positiveCount++;
    if (negativeWords.includes(w)) negativeCount++;
    if (tensionWords.includes(w)) tensionCount++;
  });
  
  const totalEmotionalWords = positiveCount + negativeCount + tensionCount;
  const positiveRatio = positiveCount / totalEmotionalWords;
  const negativeRatio = negativeCount / totalEmotionalWords;
  const tensionRatio = tensionCount / totalEmotionalWords;
  
  // 情感极性
  let emotionalTone;
  if (positiveRatio > 0.6) emotionalTone = '积极正面';
  else if (negativeRatio > 0.6) emotionalTone = '消极负面';
  else if (tensionRatio > 0.5) emotionalTone = '紧张悬疑';
  else emotionalTone = '中性平衡';
  
  // 情感强度
  const emotionalDensity = totalEmotionalWords / words.length * 100;
  let emotionalIntensity;
  if (emotionalDensity > 5) emotionalIntensity = '强烈';
  else if (emotionalDensity > 3) emotionalIntensity = '中等';
  else emotionalIntensity = '平淡';
  
  const issues = [];
  
  if (emotionalDensity < 2) {
    issues.push({
      type: '情感色彩不足',
      severity: 'medium',
      detail: `情感词汇密度 ${(emotionalDensity).toFixed(1)}%，建议增加情感描写`
    });
  }
  
  if (positiveRatio > 0.8 || negativeRatio > 0.8) {
    issues.push({
      type: '情感单一',
      severity: 'low',
      detail: `情感过于偏向${positiveRatio > 0.8 ? '正面' : '负面'}，建议增加情感层次`
    });
  }
  
  return {
    score: Math.min(10, emotionalDensity * 2),
    tone: emotionalTone,
    intensity: emotionalIntensity,
    issues,
    stats: {
      positiveCount,
      negativeCount,
      tensionCount,
      positiveRatio: (positiveRatio * 100).toFixed(1) + '%',
      negativeRatio: (negativeRatio * 100).toFixed(1) + '%',
      tensionRatio: (tensionRatio * 100).toFixed(1) + '%',
      emotionalDensity: emotionalDensity.toFixed(2) + '%'
    }
  };
}

// 4. 角色一致性检查
function analyzeCharacterConsistency(content, bookDir) {
  const issues = [];
  
  // 提取角色名称
  const characterPatterns = [
    /\b([A-Z][a-z]+)\b/g, // 首字母大写的单词
  ];
  
  const characterNames = new Set();
  characterPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const name = match[1];
      if (name.length > 2 && name.length < 15) {
        characterNames.add(name);
      }
    }
  });
  
  // 检查角色称呼一致性
  const pronouns = {
    'he': 0, 'she': 0, 'it': 0,
    'his': 0, 'her': 0, 'its': 0,
    'him': 0, 'her': 0
  };
  
  Object.keys(pronouns).forEach(pronoun => {
    const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      pronouns[pronoun] = matches.length;
    }
  });
  
  const totalPronouns = Object.values(pronouns).reduce((a, b) => a + b, 0);
  const heRatio = pronouns['he'] / totalPronouns;
  const sheRatio = pronouns['she'] / totalPronouns;
  
  // 检测对话中的角色声音
  const dialogues = content.match(/"[^"]*"/g) || [];
  const dialogueTags = {
    said: 0, asked: 0, whispered: 0, shouted: 0, replied: 0
  };
  
  dialogues.forEach(d => {
    const context = content.substring(
      content.indexOf(d) - 50,
      content.indexOf(d) + d.length + 50
    );
    
    Object.keys(dialogueTags).forEach(tag => {
      if (new RegExp(`\\b${tag}\\b`, 'gi').test(context)) {
        dialogueTags[tag]++;
      }
    });
  });
  
  const dialogueTagVariety = Object.values(dialogueTags).filter(c => c > 0).length;
  
  if (dialogueTagVariety < 3 && dialogues.length > 5) {
    issues.push({
      type: '对话标签单一',
      severity: 'low',
      detail: `仅使用 ${dialogueTagVariety} 种对话标签，建议增加变化`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues,
    stats: {
      detectedCharacters: Array.from(characterNames).slice(0, 10),
      pronounDistribution: {
        he: pronouns['he'],
        she: pronouns['she'],
        it: pronouns['it']
      },
      dialogueTagVariety,
      totalDialogues: dialogues.length
    }
  };
}

// 5. 世界构建一致性检查
function analyzeWorldBuildingConsistency(content, bookDir) {
  const issues = [];
  
  // 检测科幻/奇幻元素
  const sciFiTerms = [
    'AI', 'robot', 'android', 'cyborg', 'neural', 'quantum',
    'algorithm', 'digital', 'virtual', 'simulation', 'data'
  ];
  
  const fantasyTerms = [
    'magic', 'spell', 'wizard', 'witch', 'dragon', 'elf',
    'sorcerer', 'enchantment', 'mystical', 'ancient', 'prophecy'
  ];
  
  const sciFiCount = sciFiTerms.reduce((sum, term) => {
    return sum + (content.match(new RegExp(term, 'gi')) || []).length;
  }, 0);
  
  const fantasyCount = fantasyTerms.reduce((sum, term) => {
    return sum + (content.match(new RegExp(term, 'gi')) || []).length;
  }, 0);
  
  // 检测时间线一致性
  const timeReferences = [
    /(?:morning|afternoon|evening|night|midnight|dawn|dusk)/gi,
    /(?:yesterday|today|tomorrow)/gi,
    /(?:days?|weeks?|months?|years?) (?:ago|later|passed|went by)/gi
  ];
  
  let timeRefCount = 0;
  timeReferences.forEach(pattern => {
    timeRefCount += (content.match(pattern) || []).length;
  });
  
  // 检测地点描述
  const locationPatterns = [
    /(?:in|at|on|near|inside|outside) (?:the )?\w+/gi,
    /(?:room|building|street|city|house|apartment|office)/gi
  ];
  
  let locationCount = 0;
  locationPatterns.forEach(pattern => {
    locationCount += (content.match(pattern) || []).length;
  });
  
  if (timeRefCount < 3) {
    issues.push({
      type: '时间线模糊',
      severity: 'low',
      detail: `时间参考点过少 (${timeRefCount}处)，建议增加时间标记`
    });
  }
  
  if (locationCount < 5) {
    issues.push({
      type: '场景描述不足',
      severity: 'low',
      detail: `地点描述过少 (${locationCount}处)，建议增强场景感`
    });
  }
  
  const genre = sciFiCount > fantasyCount ? '科幻' : fantasyCount > sciFiCount ? '奇幻' : '混合';
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    genre,
    issues,
    stats: {
      sciFiElements: sciFiCount,
      fantasyElements: fantasyCount,
      timeReferences: timeRefCount,
      locationDescriptions: locationCount
    }
  };
}

// 综合评分
function calculateOverallScore(scores) {
  const weights = {
    readability: 0.25,
    vocabulary: 0.20,
    emotional: 0.20,
    character: 0.15,
    worldBuilding: 0.20
  };
  
  const normalizedReadability = scores.readability / 100 * 10;
  
  const weightedSum = 
    normalizedReadability * weights.readability +
    scores.vocabulary * weights.vocabulary +
    scores.emotional * weights.emotional +
    scores.character * weights.character +
    scores.worldBuilding * weights.worldBuilding;
  
  return Math.round(weightedSum * 10) / 10;
}

// 主函数
async function multiDimensionCheck() {
  console.log('🔍 开始多维度质量检查...\n');
  
  const books = fs.readdirSync(COO_ROOT)
    .filter(item => {
      const fullPath = path.join(COO_ROOT, item);
      return fs.statSync(fullPath).isDirectory() && item !== 'operate';
    });
  
  console.log(`📚 发现 ${books.length} 本书籍\n`);
  
  const results = [];
  const globalStats = {
    totalChapters: 0,
    readabilityIssues: 0,
    vocabularyIssues: 0,
    emotionalIssues: 0,
    characterIssues: 0,
    worldBuildingIssues: 0
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
      
      const readability = analyzeReadability(content);
      const vocabulary = analyzeVocabularyRichness(content);
      const emotional = analyzeEmotionalArc(content);
      const character = analyzeCharacterConsistency(content, bookDir);
      const worldBuilding = analyzeWorldBuildingConsistency(content, bookDir);
      
      const overallScore = calculateOverallScore({
        readability: readability.score,
        vocabulary: vocabulary.score,
        emotional: emotional.score,
        character: character.score,
        worldBuilding: worldBuilding.score
      });
      
      bookResults.chapters.push({
        chapterNum,
        title: chapterFile,
        overallScore,
        readability,
        vocabulary,
        emotional,
        character,
        worldBuilding
      });
      
      bookTotalScore += overallScore;
      bookResults.totalIssues += 
        readability.issues.length +
        vocabulary.issues.length +
        emotional.issues.length +
        character.issues.length +
        worldBuilding.issues.length;
      
      globalStats.totalChapters++;
      globalStats.readabilityIssues += readability.issues.length;
      globalStats.vocabularyIssues += vocabulary.issues.length;
      globalStats.emotionalIssues += emotional.issues.length;
      globalStats.characterIssues += character.issues.length;
      globalStats.worldBuildingIssues += worldBuilding.issues.length;
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
        readability: globalStats.readabilityIssues,
        vocabulary: globalStats.vocabularyIssues,
        emotional: globalStats.emotionalIssues,
        character: globalStats.characterIssues,
        worldBuilding: globalStats.worldBuildingIssues
      }
    }
  };
  
  const logsDir = path.join(COO_ROOT, 'operate', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // JSON 报告
  const jsonReportPath = path.join(logsDir, 'multi-dimension-check.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
  
  // Markdown 报告
  let mdReport = `# COO 书籍多维度质量检查报告\n\n`;
  mdReport += `**生成时间:** ${new Date().toISOString().split('T')[0]}\n\n`;
  mdReport += `## 执行摘要\n\n`;
  mdReport += `| 指标 | 数值 |\n|------|------|\n`;
  mdReport += `| 总书籍数 | ${report.totalBooks} |\n`;
  mdReport += `| 总章节数 | ${globalStats.totalChapters} |\n`;
  mdReport += `| 平均质量分 | ${report.summary.avgScoreAcrossBooks}/10 |\n`;
  mdReport += `| 总问题数 | ${report.summary.totalIssues} |\n\n`;
  
  mdReport += `### 问题分布\n\n`;
  mdReport += `| 维度 | 问题数 | 占比 |\n|------|------|------|\n`;
  const totalIssues = report.summary.totalIssues;
  mdReport += `| 可读性 | ${report.summary.issuesByType.readability} | ${((report.summary.issuesByType.readability / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 词汇丰富度 | ${report.summary.issuesByType.vocabulary} | ${((report.summary.issuesByType.vocabulary / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 情感曲线 | ${report.summary.issuesByType.emotional} | ${((report.summary.issuesByType.emotional / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 角色一致性 | ${report.summary.issuesByType.character} | ${((report.summary.issuesByType.character / totalIssues) * 100).toFixed(1)}% |\n`;
  mdReport += `| 世界构建 | ${report.summary.issuesByType.worldBuilding} | ${((report.summary.issuesByType.worldBuilding / totalIssues) * 100).toFixed(1)}% |\n\n`;
  
  mdReport += `## 书籍详情\n\n`;
  
  results.sort((a, b) => b.avgScore - a.avgScore).forEach((book, index) => {
    mdReport += `### ${index + 1}. ${book.bookDir}\n\n`;
    mdReport += `**平均评分:** ${book.avgScore}/10\n\n`;
    mdReport += `**总问题数:** ${book.totalIssues}处\n\n`;
    
    if (book.totalIssues > 0) {
      mdReport += `**主要问题:**\n\n`;
      
      const allIssues = [];
      book.chapters.forEach(ch => {
        ['readability', 'vocabulary', 'emotional', 'character', 'worldBuilding'].forEach(type => {
          ch[type].issues.forEach(issue => {
            allIssues.push({
              chapter: ch.chapterNum,
              type,
              ...issue
            });
          });
        });
      });
      
      allIssues.sort((a, b) => {
        const severityOrder = { high: 0, medium: 1, low: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });
      
      allIssues.slice(0, 10).forEach(issue => {
        const severityIcon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        const typeLabel = {
          readability: '可读性',
          vocabulary: '词汇',
          emotional: '情感',
          character: '角色',
          worldBuilding: '世界构建'
        }[issue.type];
        mdReport += `- ${severityIcon} **第${issue.chapter}章**: ${typeLabel} - ${issue.detail}\n`;
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
    mdReport += `✅ 所有书籍均分在 8.5 分以上，质量优秀\n`;
  }
  
  mdReport += `\n### 低优先级\n\n`;
  mdReport += `1. 保持优秀书籍的质量水准\n`;
  mdReport += `2. 定期运行多维度质量检查\n`;
  mdReport += `3. 建立语言风格和词汇库\n`;
  
  const mdReportPath = path.join(logsDir, 'multi-dimension-check.md');
  fs.writeFileSync(mdReportPath, mdReport);
  
  console.log(`✅ 多维度检查完成！\n`);
  console.log(`📄 JSON 报告：${jsonReportPath}`);
  console.log(`📝 Markdown 报告：${mdReportPath}\n`);
  
  console.log(`📈 质量摘要:\n`);
  console.log(`   总书籍：${report.totalBooks}`);
  console.log(`   总章节：${globalStats.totalChapters}`);
  console.log(`   平均评分：${report.summary.avgScoreAcrossBooks}/10`);
  console.log(`   总问题数：${report.summary.totalIssues}处\n`);
  
  return report;
}

multiDimensionCheck().catch(console.error);
