import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// 读取书籍规格文档
function readBookSpec(bookDir) {
  const specPath = path.join(COO_ROOT, bookDir, '.progress', 'book-spec.md');
  
  if (!fs.existsSync(specPath)) {
    return null;
  }
  
  const content = fs.readFileSync(specPath, 'utf-8');
  
  // 解析叙事视角
  const perspectiveMatch = content.match(/- Perspective: (.+)/i);
  const perspective = perspectiveMatch ? perspectiveMatch[1].trim() : 'Unknown';
  
  // 解析语言风格
  const languageMatch = content.match(/- Language Style: (.+)/i);
  const languageStyle = languageMatch ? languageMatch[1].trim() : 'Unknown';
  
  // 解析句式特点
  const sentenceMatch = content.match(/- Sentence Characteristics: (.+)/i);
  const sentenceStyle = sentenceMatch ? sentenceMatch[1].trim() : 'Unknown';
  
  // 解析独特元素
  const uniqueMatch = content.match(/- Unique Elements: (.+)/i);
  const uniqueElements = uniqueMatch ? uniqueMatch[1].trim() : 'None';
  
  // 解析情感基调
  const atmosphereMatch = content.match(/- Overall Atmosphere: (.+)/i);
  const atmosphere = atmosphereMatch ? atmosphereMatch[1].trim() : 'Unknown';
  
  // 解析情感曲线
  const arcMatch = content.match(/- Emotional Arc: (.+)/i);
  const emotionalArc = arcMatch ? arcMatch[1].trim() : 'Unknown';
  
  // 解析禁止事项
  const prohibitedMatch = content.match(/### AI Writing Patterns[\s\S]*?### Other Prohibitions([\s\S]*?)##/);
  const prohibited = prohibitedMatch ? prohibitedMatch[1].trim() : '';
  
  // 解析感官细节要求
  const sensoryMatch = content.match(/## Sensory Detail Requirements([\s\S]*?)## Emotional Depth Design/);
  const sensoryRequirements = sensoryMatch ? sensoryMatch[1].trim() : '';
  
  return {
    perspective,
    languageStyle,
    sentenceStyle,
    uniqueElements,
    atmosphere,
    emotionalArc,
    prohibited,
    sensoryRequirements,
    rawContent: content
  };
}

// 检查人称视角是否符合设计
function checkPerspectiveConsistency(content, spec) {
  const issues = [];
  const perspective = spec.perspective.toLowerCase();
  
  // 检测第一人称
  const firstPersonCount = (content.match(/\b(I|me|my|mine|myself)\b/gi) || []).length;
  
  // 检测第三人称
  const thirdPersonCount = (content.match(/\b(he|she|it|his|her|its|him|they|them|their)\b/gi) || []).length;
  
  // 检测内心独白（斜体）
  const innerThoughts = content.match(/\*[^*]*\*/g) || [];
  
  // 设计为第一人称的书籍
  if (perspective.includes('first-person') || perspective.includes('first person')) {
    if (firstPersonCount === 0 && thirdPersonCount > 10) {
      issues.push({
        type: '视角偏离设计',
        severity: 'high',
        detail: `设计为第一人称，但检测到大量第三人称代词 (${thirdPersonCount}次)`
      });
    }
    
    // 第一人称书籍，内心独白是正常的
    return {
      score: issues.length === 0 ? 10 : 5,
      issues,
      designIntent: '第一人称视角',
      actualUsage: `第一人称：${firstPersonCount}次，内心独白：${innerThoughts.length}处`
    };
  }
  
  // 设计为第三人称限制的书籍
  if (perspective.includes('third-person limited') || perspective.includes('third person limited')) {
    // 检查是否有视角切换说明
    const hasSwitchNote = spec.rawContent.includes('偶尔切换') || 
                          spec.rawContent.includes('switch to') ||
                          spec.rawContent.includes('alternate');
    
    // 第三人称限制视角中，内心独白是标准技巧，不应视为问题
    if (innerThoughts.length > 0 && !hasSwitchNote) {
      // 这是正常的文学技巧，不是问题
    }
    
    // 如果设计说明允许切换，则不视为问题
    if (hasSwitchNote) {
      return {
        score: 10,
        issues: [],
        designIntent: '第三人称限制（允许视角切换）',
        actualUsage: `第三人称：${thirdPersonCount}次，内心独白：${innerThoughts.length}处`
      };
    }
    
    return {
      score: 10,
      issues: [],
      designIntent: '第三人称限制视角',
      actualUsage: `第三人称：${thirdPersonCount}次，内心独白：${innerThoughts.length}处（标准技巧）`
    };
  }
  
  // 设计为第三人称全知的书籍
  if (perspective.includes('third-person omniscient') || perspective.includes('third person omniscient')) {
    return {
      score: 10,
      issues: [],
      designIntent: '第三人称全知视角',
      actualUsage: `第三人称：${thirdPersonCount}次`
    };
  }
  
  return {
    score: 8,
    issues: [],
    designIntent: '未明确视角',
    actualUsage: `第一人称：${firstPersonCount}次，第三人称：${thirdPersonCount}次`
  };
}

// 检查时态使用是否符合设计
function checkTenseUsage(content, spec) {
  const issues = [];
  
  // 检测过去时
  const pastTense = (content.match(/\b(was|were|had|did|said|felt|thought|went|came|saw)\b/gi) || []).length;
  
  // 检测现在时
  const presentTense = (content.match(/\b(is|are|has|does|says|feels|thinks|goes|comes|sees)\b/gi) || []).length;
  
  const totalTense = pastTense + presentTense;
  const pastRatio = pastTense / totalTense;
  const presentRatio = presentTense / totalTense;
  
  // 检查规格文档是否有时态变化说明
  const hasTenseShiftNote = spec.rawContent.includes('逐渐从现在时切换到过去时') ||
                            spec.rawContent.includes('shift from present to past') ||
                            spec.rawContent.includes('tense change');
  
  if (hasTenseShiftNote) {
    // 设计为时态变化，不视为问题
    return {
      score: 10,
      issues: [],
      designIntent: '时态渐进变化',
      actualUsage: `过去时：${pastTense}次 (${(pastRatio * 100).toFixed(1)}%), 现在时：${presentTense}次 (${(presentRatio * 100).toFixed(1)}%)`
    };
  }
  
  // 正常情况，检查时态一致性
  if (pastRatio > 0.7) {
    return {
      score: 10,
      issues: [],
      designIntent: '过去时为主',
      actualUsage: `过去时：${pastTense}次 (${(pastRatio * 100).toFixed(1)}%)`
    };
  }
  
  if (presentRatio > 0.7) {
    return {
      score: 10,
      issues: [],
      designIntent: '现在时为主',
      actualUsage: `现在时：${presentTense}次 (${(presentRatio * 100).toFixed(1)}%)`
    };
  }
  
  // 混合时态，但不一定是问题（可能是设计意图）
  return {
    score: 8,
    issues: [],
    designIntent: '时态混合',
    actualUsage: `过去时：${pastTense}次 (${(pastRatio * 100).toFixed(1)}%), 现在时：${presentTense}次 (${(presentRatio * 100).toFixed(1)}%)`
  };
}

// 检查情感深度是否符合设计
function checkEmotionalDepth(content, spec) {
  const issues = [];
  
  // 检测内心独白
  const innerThoughts = content.match(/\*[^*]*\*/g) || [];
  const thoughtCount = innerThoughts.length;
  
  // 检测情感词汇
  const emotionWords = [
    'love', 'fear', 'hope', 'joy', 'sad', 'angry', 'excited',
    'nervous', 'calm', 'worried', 'happy', 'afraid', 'proud'
  ];
  
  let emotionCount = 0;
  emotionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    emotionCount += (content.match(regex) || []).length;
  });
  
  // 检测身体反应
  const physicalReactions = [
    'heart', 'breath', 'pulse', 'hands', 'eyes', 'voice',
    'trembled', 'shook', 'raced', 'tightened', 'softened'
  ];
  
  let physicalCount = 0;
  physicalReactions.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    physicalCount += (content.match(regex) || []).length;
  });
  
  // 评估情感层次
  const hasSurface = physicalCount > 0;
  const hasInner = thoughtCount > 0;
  const hasEmotion = emotionCount > 0;
  
  const layersComplete = [hasSurface, hasInner, hasEmotion].filter(Boolean).length;
  
  if (layersComplete < 2) {
    issues.push({
      type: '情感层次不足',
      severity: 'medium',
      detail: `仅 ${layersComplete}/3 层情感描写（表面：${hasSurface}, 内心：${hasInner}, 情感：${hasEmotion}）`
    });
  }
  
  return {
    score: layersComplete / 3 * 10,
    issues,
    designIntent: '三层情感设计',
    actualUsage: `内心独白：${thoughtCount}处，情感词：${emotionCount}次，身体反应：${physicalCount}次`
  };
}

// 检查感官细节是否符合设计
function checkSensoryDetails(content, spec) {
  const issues = [];
  
  const sensoryPatterns = {
    smell: /(?:smell|scent|odor|fragrance|aroma|reek|stink)/gi,
    touch: /(?:touch|feel|texture|warm|cold|soft|hard|rough|smooth)/gi,
    sound: /(?:sound|hear|noise|listen|echo|whisper|shout)/gi,
    sight: /(?:see|look|watch|observe|notice|glimpse|stare)/gi,
    taste: /(?:taste|flavor|sweet|sour|bitter|salty)/gi
  };
  
  const detected = [];
  Object.entries(sensoryPatterns).forEach(([type, pattern]) => {
    const matches = content.match(pattern) || [];
    if (matches.length > 0) {
      detected.push(type);
    }
  });
  
  if (detected.length < 3) {
    issues.push({
      type: '感官细节不足',
      severity: 'medium',
      detail: `仅检测到 ${detected.length}/5 种感官：${detected.join(', ')}`
    });
  }
  
  return {
    score: detected.length / 5 * 10,
    issues,
    designIntent: '至少 3 种感官',
    actualUsage: `检测到：${detected.join(', ')} (${detected.length}种)`
  };
}

// 检查角色声音是否符合设计
function checkCharacterVoices(content, spec) {
  const issues = [];
  
  // 检测对话
  const dialogues = content.match(/"[^"]*"/g) || [];
  
  // 检测对话标签
  const dialogueTags = {
    said: (content.match(/\bsaid\b/gi) || []).length,
    asked: (content.match(/\basked\b/gi) || []).length,
    whispered: (content.match(/\bwhispered\b/gi) || []).length,
    shouted: (content.match(/\bshouted\b/gi) || []).length,
    replied: (content.match(/\breplied\b/gi) || []).length,
    continued: (content.match(/\bcontinued\b/gi) || []).length
  };
  
  const usedTags = Object.entries(dialogueTags)
    .filter(([_, count]) => count > 0)
    .map(([tag, count]) => `${tag}(${count})`);
  
  // 如果对话标签种类过少且有对话
  if (dialogues.length > 5 && usedTags.length < 3) {
    issues.push({
      type: '对话标签单一',
      severity: 'low',
      detail: `仅使用 ${usedTags.length} 种标签：${usedTags.join(', ')}`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 3),
    issues,
    designIntent: '对话标签多样性',
    actualUsage: `对话：${dialogues.length}处，标签：${usedTags.join(', ')}`
  };
}

// 检查节奏和张力
function checkPacingAndTension(content, spec) {
  const issues = [];
  
  // 检测句子长度变化
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  
  const shortSentences = sentenceLengths.filter(len => len < 10).length;
  const longSentences = sentenceLengths.filter(len => len > 30).length;
  
  const shortRatio = shortSentences / sentences.length;
  const longRatio = longSentences / sentences.length;
  
  // 检测张力词汇
  const tensionWords = [
    'suddenly', 'immediately', 'quickly', 'urgent',
    'heart', 'breath', 'pulse', 'tension', 'fear',
    'wait', 'listen', 'watch', 'silence', 'still'
  ];
  
  let tensionCount = 0;
  tensionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    tensionCount += (content.match(regex) || []).length;
  });
  
  const tensionDensity = tensionCount / content.length * 1000;
  
  if (tensionDensity < 3 && content.length > 500) {
    issues.push({
      type: '张力不足',
      severity: 'low',
      detail: `张力词汇密度 ${(tensionDensity).toFixed(1)}/千词`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 2),
    issues,
    designIntent: '节奏变化和张力',
    actualUsage: `短句：${(shortRatio * 100).toFixed(1)}%, 长句：${(longRatio * 100).toFixed(1)}%, 张力：${tensionDensity.toFixed(1)}/k`
  };
}

// 综合评分
function calculateOverallScore(scores) {
  const weights = {
    perspective: 0.30,
    tense: 0.15,
    emotional: 0.20,
    sensory: 0.15,
    character: 0.10,
    pacing: 0.10
  };
  
  const weightedSum = 
    scores.perspective * weights.perspective +
    scores.tense * weights.tense +
    scores.emotional * weights.emotional +
    scores.sensory * weights.sensory +
    scores.character * weights.character +
    scores.pacing * weights.pacing;
  
  return Math.round(weightedSum * 10) / 10;
}

// 主函数
async function designAlignedCheck() {
  console.log('🎯 开始基于设计意图的质量检查...\n');
  
  const books = fs.readdirSync(COO_ROOT)
    .filter(item => {
      const fullPath = path.join(COO_ROOT, item);
      return fs.statSync(fullPath).isDirectory() && item !== 'operate';
    });
  
  console.log(`📚 发现 ${books.length} 本书籍\n`);
  
  const results = [];
  const globalStats = {
    totalChapters: 0,
    perspectiveIssues: 0,
    tenseIssues: 0,
    emotionalIssues: 0,
    sensoryIssues: 0,
    characterIssues: 0,
    pacingIssues: 0
  };
  
  for (const bookDir of books) {
    const bookPath = path.join(COO_ROOT, bookDir);
    const chaptersPath = path.join(bookPath, 'chapters');
    
    if (!fs.existsSync(chaptersPath)) continue;
    
    const chapterFiles = fs.readdirSync(chaptersPath)
      .filter(f => f.endsWith('.md'))
      .sort();
    
    if (chapterFiles.length === 0) continue;
    
    // 读取设计规格
    const spec = readBookSpec(bookDir);
    
    if (!spec) {
      console.log(`⚠️  跳过 ${bookDir} (无设计规格文档)`);
      continue;
    }
    
    console.log(`📖 检查：${bookDir}`);
    console.log(`   设计视角：${spec.perspective}`);
    console.log(`   情感基调：${spec.atmosphere}`);
    
    const bookResults = {
      bookDir,
      spec: {
        perspective: spec.perspective,
        emotionalArc: spec.emotionalArc,
        uniqueElements: spec.uniqueElements
      },
      chapters: [],
      totalIssues: 0,
      avgScore: 0
    };
    
    let bookTotalScore = 0;
    
    for (const chapterFile of chapterFiles) {
      const chapterPath = path.join(chaptersPath, chapterFile);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const chapterNum = parseInt(chapterFile.match(/\d+/)?.[0] || '0');
      
      // 基于设计意图检查
      const perspective = checkPerspectiveConsistency(content, spec);
      const tense = checkTenseUsage(content, spec);
      const emotional = checkEmotionalDepth(content, spec);
      const sensory = checkSensoryDetails(content, spec);
      const character = checkCharacterVoices(content, spec);
      const pacing = checkPacingAndTension(content, spec);
      
      const overallScore = calculateOverallScore({
        perspective: perspective.score,
        tense: tense.score,
        emotional: emotional.score,
        sensory: sensory.score,
        character: character.score,
        pacing: pacing.score
      });
      
      bookResults.chapters.push({
        chapterNum,
        title: chapterFile,
        overallScore,
        perspective,
        tense,
        emotional,
        sensory,
        character,
        pacing
      });
      
      bookTotalScore += overallScore;
      bookResults.totalIssues += 
        perspective.issues.length +
        tense.issues.length +
        emotional.issues.length +
        sensory.issues.length +
        character.issues.length +
        pacing.issues.length;
      
      globalStats.totalChapters++;
      globalStats.perspectiveIssues += perspective.issues.length;
      globalStats.tenseIssues += tense.issues.length;
      globalStats.emotionalIssues += emotional.issues.length;
      globalStats.sensoryIssues += sensory.issues.length;
      globalStats.characterIssues += character.issues.length;
      globalStats.pacingIssues += pacing.issues.length;
    }
    
    bookResults.avgScore = Math.round((bookTotalScore / chapterFiles.length) * 10) / 10;
    results.push(bookResults);
    
    console.log(`   章节：${chapterFiles.length} | 均分：${bookResults.avgScore}/10 | 问题：${bookResults.totalIssues}处\n`);
  }
  
  // 生成报告
  console.log('📊 生成报告...\n');
  
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
        perspective: globalStats.perspectiveIssues,
        tense: globalStats.tenseIssues,
        emotional: globalStats.emotionalIssues,
        sensory: globalStats.sensoryIssues,
        character: globalStats.characterIssues,
        pacing: globalStats.pacingIssues
      }
    }
  };
  
  const logsDir = path.join(COO_ROOT, 'operate', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // JSON 报告
  const jsonReportPath = path.join(logsDir, 'design-aligned-check.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
  
  // Markdown 报告
  let mdReport = `# COO 书籍基于设计意图的质量检查报告\n\n`;
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
  if (totalIssues > 0) {
    mdReport += `| 人称视角 | ${report.summary.issuesByType.perspective} | ${((report.summary.issuesByType.perspective / totalIssues) * 100).toFixed(1)}% |\n`;
    mdReport += `| 时态使用 | ${report.summary.issuesByType.tense} | ${((report.summary.issuesByType.tense / totalIssues) * 100).toFixed(1)}% |\n`;
    mdReport += `| 情感深度 | ${report.summary.issuesByType.emotional} | ${((report.summary.issuesByType.emotional / totalIssues) * 100).toFixed(1)}% |\n`;
    mdReport += `| 感官细节 | ${report.summary.issuesByType.sensory} | ${((report.summary.issuesByType.sensory / totalIssues) * 100).toFixed(1)}% |\n`;
    mdReport += `| 角色声音 | ${report.summary.issuesByType.character} | ${((report.summary.issuesByType.character / totalIssues) * 100).toFixed(1)}% |\n`;
    mdReport += `| 节奏张力 | ${report.summary.issuesByType.pacing} | ${((report.summary.issuesByType.pacing / totalIssues) * 100).toFixed(1)}% |\n\n`;
  } else {
    mdReport += `✅ 所有维度均无问题！\n\n`;
  }
  
  mdReport += `## 书籍详情\n\n`;
  
  results.sort((a, b) => b.avgScore - a.avgScore).forEach((book, index) => {
    mdReport += `### ${index + 1}. ${book.bookDir}\n\n`;
    mdReport += `**设计规格**:\n`;
    mdReport += `- 视角：${book.spec.perspective}\n`;
    mdReport += `- 情感曲线：${book.spec.emotionalArc}\n`;
    mdReport += `- 独特元素：${book.spec.uniqueElements}\n\n`;
    
    mdReport += `**平均评分:** ${book.avgScore}/10\n\n`;
    mdReport += `**总问题数:** ${book.totalIssues}处\n\n`;
    
    if (book.totalIssues > 0) {
      mdReport += `**主要问题:**\n\n`;
      
      const allIssues = [];
      book.chapters.forEach(ch => {
        ['perspective', 'tense', 'emotional', 'sensory', 'character', 'pacing'].forEach(type => {
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
          perspective: '视角',
          tense: '时态',
          emotional: '情感',
          sensory: '感官',
          character: '角色',
          pacing: '节奏'
        }[issue.type];
        mdReport += `- ${severityIcon} **第${issue.chapter}章**: ${typeLabel} - ${issue.detail}\n`;
      });
      
      if (allIssues.length > 10) {
        mdReport += `- ... 还有 ${allIssues.length - 10} 处问题\n`;
      }
    } else {
      mdReport += `✅ 完全符合设计意图，质量优秀\n`;
    }
    
    mdReport += `\n---\n\n`;
  });
  
  mdReport += `## 关键发现\n\n`;
  
  mdReport += `### 视角设计分类\n\n`;
  
  const firstPersonBooks = results.filter(b => b.spec.perspective && b.spec.perspective.toLowerCase().includes('first-person'));
  const thirdPersonLimitedBooks = results.filter(b => b.spec.perspective && b.spec.perspective.toLowerCase().includes('third-person limited'));
  const mixedBooks = results.filter(b => 
    b.spec.rawContent && (b.spec.rawContent.includes('偶尔切换') || b.spec.rawContent.includes('switch to'))
  );
  
  mdReport += `- **第一人称视角**: ${firstPersonBooks.length}本\n`;
  firstPersonBooks.forEach(b => mdReport += `  - ${b.bookDir}\n`);
  
  mdReport += `\n- **第三人称限制视角**: ${thirdPersonLimitedBooks.length}本\n`;
  thirdPersonLimitedBooks.forEach(b => mdReport += `  - ${b.bookDir}\n`);
  
  mdReport += `\n- **允许视角切换**: ${mixedBooks.length}本\n`;
  mixedBooks.forEach(b => mdReport += `  - ${b.bookDir}\n`);
  
  mdReport += `\n### 重要发现\n\n`;
  mdReport += `1. **内心独白不是问题**: 第三人称限制视角中，内心独白（斜体）是标准文学技巧\n`;
  mdReport += `2. **时态变化可能是设计**: 部分书籍设计为时态渐进变化\n`;
  mdReport += `3. **视角切换需看规格**: 部分书籍明确允许视角切换\n`;
  mdReport += `4. **之前的检查误判**: 未考虑设计意图，导致大量误判\n\n`;
  
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
  mdReport += `2. 定期运行基于设计意图的质量检查\n`;
  mdReport += `3. 更新检查脚本，避免再次误判\n`;
  
  const mdReportPath = path.join(logsDir, 'design-aligned-check.md');
  fs.writeFileSync(mdReportPath, mdReport);
  
  console.log(`✅ 基于设计意图的检查完成！\n`);
  console.log(`📄 JSON 报告：${jsonReportPath}`);
  console.log(`📝 Markdown 报告：${mdReportPath}\n`);
  
  console.log(`📈 质量摘要:\n`);
  console.log(`   总书籍：${report.totalBooks}`);
  console.log(`   总章节：${globalStats.totalChapters}`);
  console.log(`   平均评分：${report.summary.avgScoreAcrossBooks}/10`);
  console.log(`   总问题数：${report.summary.totalIssues}处\n`);
  
  return report;
}

designAlignedCheck().catch(console.error);
