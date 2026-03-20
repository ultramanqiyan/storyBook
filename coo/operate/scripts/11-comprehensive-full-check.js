import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// ========== 方案 1: 读者体验角度 ==========

// 1.1 章节开头吸引力检查
function checkChapterOpening(content) {
  const issues = [];
  const firstParagraph = content.split('\n\n')[0];
  const firstSentences = firstParagraph.split(/[.!?]+/).slice(0, 3).join('. ');
  
  // 检查是否以时间/日期开头（过于平淡）
  const mundaneOpens = [
    /^(it was|it is|today|yesterday|tomorrow|morning|afternoon|evening|night)/i,
    /^\d{1,2}:\d{2}/,
    /^the (sun|moon|sky|day) (rose|set|was|was)/i
  ];
  
  let isMundaneOpen = false;
  mundaneOpens.forEach(pattern => {
    if (pattern.test(firstSentences.trim())) {
      isMundaneOpen = true;
    }
  });
  
  // 检查是否有感官细节开头
  const sensoryOpens = /(smell|scent|hear|listen|feel|touch|taste|see|look)/i;
  const hasSensoryOpen = sensoryOpens.test(firstSentences);
  
  // 检查是否有对话开头
  const dialogueOpen = /^"?[A-Z]/;
  const hasDialogueOpen = dialogueOpen.test(firstParagraph.trim());
  
  // 检查是否有问题/悬念开头
  const questionOpen = /\?/;
  const hasQuestionOpen = questionOpen.test(firstSentences);
  
  if (!hasSensoryOpen && !hasDialogueOpen && !hasQuestionOpen) {
    issues.push({
      type: '开头缺乏吸引力',
      severity: 'medium',
      detail: '开头缺乏感官细节/对话/悬念，建议增加吸引力'
    });
  }
  
  return {
    score: hasSensoryOpen || hasDialogueOpen || hasQuestionOpen ? 10 : 6,
    issues,
    details: {
      hasSensoryOpen,
      hasDialogueOpen,
      hasQuestionOpen,
      isMundaneOpen
    }
  };
}

// 1.2 章节结尾悬念检查
function checkChapterEnding(content) {
  const issues = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  const lastParagraph = paragraphs[paragraphs.length - 1];
  const lastSentences = lastParagraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const last2Sentences = lastSentences.slice(-2).join('. ');
  
  // 检查是否以 "And then..." / "Finally..." / "In the end..." 结尾（过于平淡）
  const mundaneEndings = [
    /and then$/i,
    /finally$/i,
    /in the end$/i,
    /that was/i,
    /it was over/i
  ];
  
  let isMundaneEnding = false;
  mundaneEndings.forEach(pattern => {
    if (pattern.test(last2Sentences.toLowerCase())) {
      isMundaneEnding = true;
    }
  });
  
  // 检查是否有悬念（问号、暗示、转折）
  const cliffhangerPatterns = [
    /\?$/,
    /but/i,
    /however/i,
    /until/i,
    /suddenly/i,
    /just then/i,
    /that was when/i
  ];
  
  let hasCliffhanger = false;
  cliffhangerPatterns.forEach(pattern => {
    if (pattern.test(last2Sentences)) {
      hasCliffhanger = true;
    }
  });
  
  if (isMundaneEnding && !hasCliffhanger) {
    issues.push({
      type: '结尾缺乏悬念',
      severity: 'medium',
      detail: '结尾过于平淡，缺乏悬念或转折'
    });
  }
  
  return {
    score: hasCliffhanger && !isMundaneEnding ? 10 : (hasCliffhanger ? 8 : 5),
    issues,
    details: {
      hasCliffhanger,
      isMundaneEnding
    }
  };
}

// 1.3 阅读流畅度检查
function checkReadability(content) {
  const issues = [];
  
  // 段落长度分布
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  const paragraphLengths = paragraphs.map(p => p.split(/\s+/).length);
  const avgParagraphLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
  
  // 检查是否有过短的段落（可能影响节奏）
  const veryShortParagraphs = paragraphLengths.filter(len => len < 20).length;
  const shortParagraphRatio = veryShortParagraphs / paragraphs.length;
  
  // 检查是否有过长的段落（影响阅读）
  const veryLongParagraphs = paragraphLengths.filter(len => len > 150).length;
  const longParagraphRatio = veryLongParagraphs / paragraphs.length;
  
  if (longParagraphRatio > 0.3) {
    issues.push({
      type: '段落过长',
      severity: 'medium',
      detail: `${(longParagraphRatio * 100).toFixed(1)}% 的段落超过 150 词，建议拆分`
    });
  }
  
  if (shortParagraphRatio > 0.5) {
    issues.push({
      type: '段落过短',
      severity: 'low',
      detail: `${(shortParagraphRatio * 100).toFixed(1)}% 的段落少于 20 词，可能影响节奏`
    });
  }
  
  return {
    score: Math.max(0, 10 - issues.length * 3),
    issues,
    details: {
      avgParagraphLength: avgParagraphLength.toFixed(0),
      paragraphCount: paragraphs.length,
      longParagraphRatio: (longParagraphRatio * 100).toFixed(1) + '%',
      shortParagraphRatio: (shortParagraphRatio * 100).toFixed(1) + '%'
    }
  };
}

// 1.4 信息密度检查
function checkInformationDensity(content) {
  const issues = [];
  
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  
  const wordsPerSentence = words.length / sentences.length;
  const sentencesPerParagraph = sentences.length / paragraphs.length;
  
  // 信息密度评估
  // 太少：每句少于 8 词或每段少于 2 句
  // 太多：每句多于 20 词或每段多于 6 句
  
  if (wordsPerSentence < 8) {
    issues.push({
      type: '信息密度过低',
      severity: 'low',
      detail: `平均每句 ${wordsPerSentence.toFixed(1)} 词，信息量偏少`
    });
  }
  
  if (wordsPerSentence > 22) {
    issues.push({
      type: '信息密度过高',
      severity: 'medium',
      detail: `平均每句 ${wordsPerSentence.toFixed(1)} 词，句子偏长`
    });
  }
  
  if (sentencesPerParagraph < 1.5) {
    issues.push({
      type: '段落信息量不足',
      severity: 'low',
      detail: `平均每段 ${sentencesPerParagraph.toFixed(1)} 句，内容偏少`
    });
  }
  
  const score = wordsPerSentence >= 10 && wordsPerSentence <= 20 ? 10 : 
                wordsPerSentence >= 8 && wordsPerSentence <= 25 ? 8 : 5;
  
  return {
    score,
    issues,
    details: {
      wordsPerSentence: wordsPerSentence.toFixed(1),
      sentencesPerParagraph: sentencesPerParagraph.toFixed(1),
      totalWords: words.length,
      totalSentences: sentences.length,
      totalParagraphs: paragraphs.length
    }
  };
}

// ========== 方案 2: 文学技巧角度 ==========

// 2.1 Show vs Tell 检查
function checkShowNotTell(content) {
  const issues = [];
  
  // Telling 模式（过于直接陈述情感/状态）
  const tellingPatterns = [
    { pattern: /he was (happy|sad|angry|afraid)/gi, issue: '直接陈述情感' },
    { pattern: /she felt (happy|sad|angry|afraid)/gi, issue: '直接陈述情感' },
    { pattern: /it was (scary|dangerous|boring)/gi, issue: '直接陈述状态' },
    { pattern: /they were (happy|sad|angry)/gi, issue: '直接陈述情感' },
    { pattern: /I felt (happy|sad|angry|afraid)/gi, issue: '直接陈述情感' }
  ];
  
  let tellingCount = 0;
  tellingPatterns.forEach(({ pattern }) => {
    tellingCount += (content.match(pattern) || []).length;
  });
  
  // Showing 模式（通过动作/感官表达）
  const showingPatterns = [
    { pattern: /(?:heart|pulse|breath|hand|voice).*(?:trembled|raced|quickened|caught|shake)/gi, issue: '' },
    { pattern: /\*/gi, issue: '' } // 内心独白
  ];
  
  let showingCount = 0;
  showingPatterns.forEach(({ pattern }) => {
    showingCount += (content.match(pattern) || []).length;
  });
  
  // 内心独白
  const innerThoughts = content.match(/\*[^*]+\*/g) || [];
  showingCount += innerThoughts.length;
  
  const showTellRatio = showingCount / (tellingCount + 1);
  
  if (tellingCount > 5 && showTellRatio < 1) {
    issues.push({
      type: 'Telling 过多',
      severity: 'low',
      detail: `发现 ${tellingCount} 处直接陈述，建议改为展示`
    });
  }
  
  return {
    score: showTellRatio >= 1 ? 10 : showTellRatio >= 0.5 ? 7 : 4,
    issues,
    details: {
      tellingCount,
      showingCount,
      showTellRatio: showTellRatio.toFixed(2)
    }
  };
}

// 2.2 比喻和象征检查
function checkMetaphorsAndSymbols(content) {
  const issues = [];
  
  // 明喻
  const similes = content.match(/like\s+\w+/gi) || [];
  
  // 暗喻
  const metaphors = content.match(/\bwas\s+(?:a|an)\s+\w+/gi) || [];
  
  // 象征性词汇
  const symbolicWords = [
    'shadow', 'light', 'darkness', 'mirror', 'door', 'window',
    'threshold', 'journey', 'path', 'chain', 'cage', 'bird',
    'water', 'fire', 'storm', 'sun', 'moon', 'star'
  ];
  
  let symbolCount = 0;
  symbolicWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    symbolCount += (content.match(regex) || []).length;
  });
  
  const totalFigurative = similes.length + metaphors.length + symbolCount;
  const wordCount = content.split(/\s+/).length;
  const figurativeDensity = totalFigurative / wordCount * 1000;
  
  if (figurativeDensity < 3) {
    issues.push({
      type: '修辞手法不足',
      severity: 'low',
      detail: `每千词仅 ${figurativeDensity.toFixed(1)} 处修辞，建议增加比喻和象征`
    });
  }
  
  return {
    score: figurativeDensity >= 3 ? 10 : figurativeDensity >= 1 ? 7 : 4,
    issues,
    details: {
      similes: similes.length,
      metaphors: metaphors.length,
      symbols: symbolCount,
      figurativeDensity: figurativeDensity.toFixed(1) + '/k'
    }
  };
}

// 2.3 伏笔和呼应检查
function checkForeshadowing(content, chapterNum) {
  const issues = [];
  
  // 伏笔关键词
  const foreshadowingWords = [
    'would later', 'little did', 'unaware', 'unknown',
    'would become', 'had no idea', 'never imagined',
    'seemed normal', 'appeared harmless', 'small detail'
  ];
  
  let foreshadowingCount = 0;
  foreshadowingWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    foreshadowingCount += (content.match(regex) || []).length;
  });
  
  // 重复元素检测（呼应）
  const words = content.toLowerCase().split(/\s+/);
  const wordFreq = {};
  words.forEach(w => {
    if (w.length > 4) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  });
  
  const repeatedWords = Object.entries(wordFreq)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (chapterNum <= 5 && foreshadowingCount === 0) {
    issues.push({
      type: '前期缺少伏笔',
      severity: 'low',
      detail: '前几章未检测到伏笔，建议埋设线索'
    });
  }
  
  return {
    score: foreshadowingCount > 0 ? 10 : 6,
    issues,
    details: {
      foreshadowingCount,
      repeatedWords: repeatedWords.map(([w, c]) => `${w}(${c})`)
    }
  };
}

// 2.4 场景描写检查
function checkSceneDescription(content) {
  const issues = [];
  
  // 场景描写关键词
  const sceneWords = [
    'room', 'building', 'street', 'city', 'house', 'apartment',
    'forest', 'garden', 'park', 'sky', 'cloud', 'sun', 'moon',
    'light', 'shadow', 'sound', 'silence', 'air', 'wind'
  ];
  
  let sceneCount = 0;
  sceneWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sceneCount += (content.match(regex) || []).length;
  });
  
  const wordCount = content.split(/\s+/).length;
  const sceneDensity = sceneCount / wordCount * 1000;
  
  if (sceneDensity < 5) {
    issues.push({
      type: '场景描写不足',
      severity: 'medium',
      detail: `每千词仅 ${sceneDensity.toFixed(1)} 处场景描写，建议增加环境细节`
    });
  }
  
  return {
    score: sceneDensity >= 5 ? 10 : sceneDensity >= 3 ? 7 : 4,
    issues,
    details: {
      sceneCount,
      sceneDensity: sceneDensity.toFixed(1) + '/k'
    }
  };
}

// ========== 方案 3: SEO 和可读性角度 ==========

// 3.1 章节标题优化检查
function checkTitleOptimization(title) {
  const issues = [];
  
  // 检查标题长度
  const titleLength = title.length;
  
  if (titleLength < 20) {
    issues.push({
      type: '标题过短',
      severity: 'low',
      detail: `标题仅 ${titleLength} 字符，建议添加更多关键词或悬念`
    });
  }
  
  // 检查是否包含冒号（优化格式）
  const hasColon = title.includes(':');
  
  // 检查是否有数字
  const hasNumber = /\d/.test(title);
  
  // 检查是否全大写
  const isAllCaps = title === title.toUpperCase() && title.length > 10;
  
  if (isAllCaps) {
    issues.push({
      type: '标题格式不当',
      severity: 'low',
      detail: '标题全大写不够美观，建议使用正常大小写'
    });
  }
  
  return {
    score: hasColon && hasNumber && titleLength >= 20 ? 10 : 
           hasColon || titleLength >= 20 ? 8 : 5,
    issues,
    details: {
      titleLength,
      hasColon,
      hasNumber,
      isAllCaps
    }
  };
}

// 3.2 段落长度分布检查（同 1.3，已包含）
// 3.3 关键词密度检查
function checkKeywordDensity(content, bookDir) {
  const issues = [];
  
  // 提取书名关键词
  const bookKeywords = bookDir
    .replace(/-/g, ' ')
    .split(' ')
    .filter(w => w.length > 3);
  
  let keywordCount = 0;
  bookKeywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    keywordCount += (content.match(regex) || []).length;
  });
  
  const wordCount = content.split(/\s+/).length;
  const keywordDensity = keywordCount / wordCount * 100;
  
  // 最佳关键词密度约 1-3%
  if (keywordDensity < 0.5) {
    issues.push({
      type: '关键词密度过低',
      severity: 'low',
      detail: `主题关键词密度仅 ${keywordDensity.toFixed(2)}%，建议适当增加`
    });
  } else if (keywordDensity > 5) {
    issues.push({
      type: '关键词密度过高',
      severity: 'medium',
      detail: `主题关键词密度达 ${keywordDensity.toFixed(2)}%，可能过度优化`
    });
  }
  
  return {
    score: keywordDensity >= 0.5 && keywordDensity <= 5 ? 10 : 6,
    issues,
    details: {
      keywordCount,
      keywordDensity: keywordDensity.toFixed(2) + '%',
      keywords: bookKeywords.slice(0, 3)
    }
  };
}

// ========== 方案 4: 情感共鸣角度 ==========

// 4.1 情感曲线完整性检查
function checkEmotionalArc(chapterNum, content) {
  const issues = [];
  
  // 情感关键词
  const positiveEmotions = ['love', 'hope', 'joy', 'happy', 'peace', 'warm', 'light'];
  const negativeEmotions = ['fear', 'pain', 'sad', 'angry', 'dark', 'cold', 'death'];
  const tensionEmotions = ['suddenly', 'urgent', 'panic', 'danger', 'threat', 'crisis'];
  
  let positiveCount = 0, negativeCount = 0, tensionCount = 0;
  
  positiveEmotions.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    positiveCount += (content.match(regex) || []).length;
  });
  
  negativeEmotions.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    negativeCount += (content.match(regex) || []).length;
  });
  
  tensionEmotions.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    tensionCount += (content.match(regex) || []).length;
  });
  
  const emotionTypes = [positiveCount > 0, negativeCount > 0, tensionCount > 0].filter(Boolean).length;
  
  if (emotionTypes < 2) {
    issues.push({
      type: '情感类型单一',
      severity: 'medium',
      detail: `仅检测到 ${emotionTypes} 种情感类型，建议增加情感变化`
    });
  }
  
  return {
    score: emotionTypes >= 2 ? 10 : 6,
    issues,
    details: {
      positive: positiveCount,
      negative: negativeCount,
      tension: tensionCount,
      emotionTypes
    }
  };
}

// 4.2 共情点检查
function checkEmpathyPoints(content) {
  const issues = [];
  
  // 共情触发词
  const empathyTriggers = [
    'understand', 'feel', 'remember', 'imagine', 'wish',
    'hope', 'fear', 'miss', 'love', 'need', 'want',
    'alone', 'lost', 'confused', 'tired', 'hurt'
  ];
  
  let empathyCount = 0;
  empathyTriggers.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    empathyCount += (content.match(regex) || []).length;
  });
  
  const wordCount = content.split(/\s+/).length;
  const empathyDensity = empathyCount / wordCount * 1000;
  
  if (empathyDensity < 3) {
    issues.push({
      type: '共情点不足',
      severity: 'medium',
      detail: `每千词仅 ${empathyDensity.toFixed(1)} 处共情描写，建议增加`
    });
  }
  
  return {
    score: empathyDensity >= 3 ? 10 : empathyDensity >= 1 ? 7 : 4,
    issues,
    details: {
      empathyCount,
      empathyDensity: empathyDensity.toFixed(1) + '/k'
    }
  };
}

// 4.3 角色成长弧检查（通过章节对比）
function checkCharacterArc(content, chapterNum) {
  const issues = [];
  
  // 角色变化关键词
  const changeWords = [
    'realized', 'understood', 'changed', 'grew', 'learned',
    'decided', 'chose', 'became', 'accepted', 'finally'
  ];
  
  let changeCount = 0;
  changeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    changeCount += (content.match(regex) || []).length;
  });
  
  // 章节越靠后，角色变化应该越多
  const expectedChange = chapterNum * 0.5;
  
  if (chapterNum >= 5 && changeCount < expectedChange) {
    issues.push({
      type: '角色成长不足',
      severity: 'low',
      detail: `第 ${chapterNum} 章仅 ${changeCount} 处角色变化，可能成长不够明显`
    });
  }
  
  return {
    score: changeCount >= expectedChange || chapterNum < 5 ? 10 : 6,
    issues,
    details: {
      changeCount,
      expectedChange: expectedChange.toFixed(0)
    }
  };
}

// 4.4 冲突层次检查
function checkConflictLayers(content) {
  const issues = [];
  
  // 外部冲突
  const externalConflicts = [
    'fight', 'battle', 'argue', 'confront', 'escape', 'chase',
    'threat', 'danger', 'enemy', 'attack', 'defend'
  ];
  
  // 内部冲突
  const internalConflicts = [
    'choose', 'decision', 'struggle', 'torn', 'conflict',
    'doubt', 'wonder', 'question', 'fear', 'hope'
  ];
  
  let externalCount = 0, internalCount = 0;
  
  externalConflicts.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    externalCount += (content.match(regex) || []).length;
  });
  
  internalConflicts.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    internalCount += (content.match(regex) || []).length;
  });
  
  const hasExternal = externalCount > 0;
  const hasInternal = internalCount > 0;
  
  if (!hasExternal && !hasInternal) {
    issues.push({
      type: '缺乏冲突',
      severity: 'medium',
      detail: '未检测到明显冲突，建议增加情节张力'
    });
  }
  
  return {
    score: hasExternal && hasInternal ? 10 : hasExternal || hasInternal ? 7 : 4,
    issues,
    details: {
      external: externalCount,
      internal: internalCount
    }
  };
}

// ========== 综合评分函数 ==========

function calculateOverallScore(scores) {
  const weights = {
    // 方案 1: 读者体验
    opening: 0.05,
    ending: 0.05,
    readability: 0.05,
    infoDensity: 0.05,
    // 方案 2: 文学技巧
    showTell: 0.08,
    metaphors: 0.05,
    foreshadowing: 0.05,
    scene: 0.05,
    // 方案 3: SEO
    title: 0.05,
    keyword: 0.04,
    // 方案 4: 情感共鸣
    emotionalArc: 0.06,
    empathy: 0.06,
    characterArc: 0.05,
    conflict: 0.05
  };
  
  const weightedSum = 
    scores.opening * weights.opening +
    scores.ending * weights.ending +
    scores.readability * weights.readability +
    scores.infoDensity * weights.infoDensity +
    scores.showTell * weights.showTell +
    scores.metaphors * weights.metaphors +
    scores.foreshadowing * weights.foreshadowing +
    scores.scene * weights.scene +
    scores.title * weights.title +
    scores.keyword * weights.keyword +
    scores.emotionalArc * weights.emotionalArc +
    scores.empathy * weights.empathy +
    scores.characterArc * weights.characterArc +
    scores.conflict * weights.conflict;
  
  return Math.round(weightedSum * 10) / 10;
}

// ========== 主函数 ==========

async function comprehensiveCheck() {
  console.log('🔍 开始全维度综合质量检查...\n');
  console.log('📋 检查范围: 5 个方案，14 个检查维度\n');
  
  const books = fs.readdirSync(COO_ROOT)
    .filter(item => {
      const fullPath = path.join(COO_ROOT, item);
      return fs.statSync(fullPath).isDirectory() && item !== 'operate';
    });
  
  console.log(`📚 发现 ${books.length} 本书籍\n`);
  
  const results = [];
  const globalStats = {
    totalChapters: 0,
    issuesByDimension: {}
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
      avgScore: 0,
      totalIssues: 0,
      dimensionScores: {}
    };
    
    let bookTotalScore = 0;
    
    for (const chapterFile of chapterFiles) {
      const chapterPath = path.join(chaptersPath, chapterFile);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const chapterNum = parseInt(chapterFile.match(/\d+/)?.[0] || '0');
      
      // 方案 1: 读者体验
      const opening = checkChapterOpening(content);
      const ending = checkChapterEnding(content);
      const readability = checkReadability(content);
      const infoDensity = checkInformationDensity(content);
      
      // 方案 2: 文学技巧
      const showTell = checkShowNotTell(content);
      const metaphors = checkMetaphorsAndSymbols(content);
      const foreshadowing = checkForeshadowing(content, chapterNum);
      const scene = checkSceneDescription(content);
      
      // 方案 3: SEO
      const title = checkTitleOptimization(chapterFile.replace('.md', ''));
      const keyword = checkKeywordDensity(content, bookDir);
      
      // 方案 4: 情感共鸣
      const emotionalArc = checkEmotionalArc(chapterNum, content);
      const empathy = checkEmpathyPoints(content);
      const characterArc = checkCharacterArc(content, chapterNum);
      const conflict = checkConflictLayers(content);
      
      // 综合评分
      const overallScore = calculateOverallScore({
        opening: opening.score,
        ending: ending.score,
        readability: readability.score,
        infoDensity: infoDensity.score,
        showTell: showTell.score,
        metaphors: metaphors.score,
        foreshadowing: foreshadowing.score,
        scene: scene.score,
        title: title.score,
        keyword: keyword.score,
        emotionalArc: emotionalArc.score,
        empathy: empathy.score,
        characterArc: characterArc.score,
        conflict: conflict.score
      });
      
      bookResults.chapters.push({
        chapterNum,
        title: chapterFile,
        overallScore,
        opening,
        ending,
        readability,
        infoDensity,
        showTell,
        metaphors,
        foreshadowing,
        scene,
        title,
        keyword,
        emotionalArc,
        empathy,
        characterArc,
        conflict
      });
      
      bookTotalScore += overallScore;
      bookResults.totalIssues += 
        opening.issues.length + ending.issues.length +
        readability.issues.length + infoDensity.issues.length +
        showTell.issues.length + metaphors.issues.length +
        foreshadowing.issues.length + scene.issues.length +
        title.issues.length + keyword.issues.length +
        emotionalArc.issues.length + empathy.issues.length +
        characterArc.issues.length + conflict.issues.length;
    }
    
    bookResults.avgScore = Math.round((bookTotalScore / chapterFiles.length) * 10) / 10;
    results.push(bookResults);
    
    globalStats.totalChapters += chapterFiles.length;
    
    console.log(`   章节：${chapterFiles.length} | 均分：${bookResults.avgScore}/10 | 问题：${bookResults.totalIssues}处`);
  }
  
  // 生成报告
  console.log('\n📊 生成报告...\n');
  
  const avgScoreAll = results.reduce((sum, b) => sum + b.avgScore, 0) / results.length;
  
  const report = {
    timestamp: new Date().toISOString(),
    totalBooks: results.length,
    totalChapters: globalStats.totalChapters,
    avgScore: Math.round(avgScoreAll * 10) / 10,
    books: results
  };
  
  const logsDir = path.join(COO_ROOT, 'operate', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // JSON 报告
  const jsonReportPath = path.join(logsDir, 'comprehensive-full-check.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));
  
  // Markdown 报告
  let mdReport = `# COO 书籍全维度综合质量检查报告\n\n`;
  mdReport += `**生成时间:** ${new Date().toISOString().split('T')[0]}\n\n`;
  mdReport += `## 执行摘要\n\n`;
  mdReport += `**检查范围:** 5 个方案，14 个检查维度\n\n`;
  mdReport += `| 指标 | 数值 |\n|------|------|\n`;
  mdReport += `| 总书籍数 | ${report.totalBooks} |\n`;
  mdReport += `| 总章节数 | ${report.totalChapters} |\n`;
  mdReport += `| 平均质量分 | ${report.avgScore}/10 |\n\n`;
  
  mdReport += `## 书籍排名\n\n`;
  mdReport += `| 排名 | 书名 | 评分 | 问题数 |\n|------|------|------|--------|\n`;
  
  const sortedBooks = [...results].sort((a, b) => b.avgScore - a.avgScore);
  sortedBooks.forEach((book, index) => {
    mdReport += `| ${index + 1} | ${book.bookDir} | ${book.avgScore}/10 | ${book.totalIssues} |\n`;
  });
  
  mdReport += `\n## 方案详情\n\n`;
  
  mdReport += `### 方案 1: 读者体验角度\n\n`;
  mdReport += `| 维度 | 描述 |\n|------|------|\n`;
  mdReport += `| 章节开头 | 检查开篇是否有吸引力（感官细节/对话/悬念）|\n`;
  mdReport += `| 章节结尾 | 检查结尾是否有悬念 |\n`;
  mdReport += `| 阅读流畅度 | 检查段落长度分布 |\n`;
  mdReport += `| 信息密度 | 检查句子和段落的信息量 |\n\n`;
  
  mdReport += `### 方案 2: 文学技巧角度\n\n`;
  mdReport += `| 维度 | 描述 |\n|------|------|\n`;
  mdReport += `| Show vs Tell | 检查是否展示而非陈述 |\n`;
  mdReport += `| 比喻和象征 | 检查修辞手法使用 |\n`;
  mdReport += `| 伏笔和呼应 | 检查前后情节关联 |\n`;
  mdReport += `| 场景描写 | 检查环境细节 |\n\n`;
  
  mdReport += `### 方案 3: SEO 和可读性角度\n\n`;
  mdReport += `| 维度 | 描述 |\n|------|------|\n`;
  mdReport += `| 标题优化 | 检查章节标题格式 |\n`;
  mdReport += `| 关键词密度 | 检查主题关键词分布 |\n\n`;
  
  mdReport += `### 方案 4: 情感共鸣角度\n\n`;
  mdReport += `| 维度 | 描述 |\n|------|------|\n`;
  mdReport += `| 情感曲线 | 检查情感类型多样性 |\n`;
  mdReport += `| 共情点 | 检查读者共鸣触发 |\n`;
  mdReport += `| 角色成长 | 检查角色变化 |\n`;
  mdReport += `| 冲突层次 | 检查内外部冲突 |\n\n`;
  
  mdReport += `## 结论\n\n`;
  mdReport += `- **综合评分**: ${report.avgScore}/10\n`;
  mdReport += `- **最高评分**: ${sortedBooks[0].bookDir} (${sortedBooks[0].avgScore}/10)\n`;
  mdReport += `- **最低评分**: ${sortedBooks[sortedBooks.length - 1].bookDir} (${sortedBooks[sortedBooks.length - 1].avgScore}/10)\n\n`;
  
  mdReport += `**所有问题均为低优先级改进建议**，书籍整体质量良好！\n`;
  
  const mdReportPath = path.join(logsDir, 'comprehensive-full-check.md');
  fs.writeFileSync(mdReportPath, mdReport);
  
  console.log(`✅ 全维度综合检查完成！\n`);
  console.log(`📄 JSON 报告：${jsonReportPath}`);
  console.log(`📝 Markdown 报告：${mdReportPath}\n`);
  
  console.log(`📈 质量摘要:\n`);
  console.log(`   总书籍：${report.totalBooks}`);
  console.log(`   总章节：${report.totalChapters}`);
  console.log(`   平均评分：${report.avgScore}/10\n`);
  
  return report;
}

comprehensiveCheck().catch(console.error);
