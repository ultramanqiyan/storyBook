import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COO_ROOT = path.join(__dirname, '..', '..');

// AI 写作痕迹替换规则
const AI_REPLACEMENTS = [
  {
    pattern: /And somewhere\.\.\./gi,
    replacement: '',
    note: '删除 AI 结尾模板'
  },
  {
    pattern: /Neither of them knew\.\.\./gi,
    replacement: '',
    note: '删除 AI 叙事模板'
  },
  {
    pattern: /will never be the same/gi,
    replacement: 'would change forever',
    note: '替换陈词滥调'
  },
  {
    pattern: /just the beginning/gi,
    replacement: 'only the start',
    note: '替换陈词滥调'
  },
  {
    pattern: /heart raced/gi,
    replacement: (match, offset, string) => {
      const alternatives = ['pulse quickened', 'chest tightened', 'breath caught', 'heartbeat accelerated'];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    },
    note: '替换过度使用短语'
  },
  {
    pattern: /something cracked inside/gi,
    replacement: (match, offset, string) => {
      const alternatives = ['a shift occurred', 'something gave way', 'an internal fracture formed', 'something broke open'];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    },
    note: '替换重复表达'
  },
  {
    pattern: /END OF CHAPTER/gi,
    replacement: '',
    note: '删除模板化结尾'
  },
];

// 优化章节标题
function optimizeChapterTitle(content, chapterNum, bookTitle) {
  const titleMatch = content.match(/^#\s+Chapter\s+\d+:\s*(.+)/m);
  if (!titleMatch) return content;
  
  const currentTitle = titleMatch[1].trim();
  
  // 通用标题映射
  const genericTitles = {
    'The Discovery': 'The Discovery - First Crack in Perfection',
    'The Choice': 'The Choice - Freedom or Family?',
    'The Truth': 'The Truth - What Love Really Costs',
    'The Awakening': 'The Awakening - Mind Opens',
    'The Connection': 'The Connection - Two Become One',
    'The Pattern': 'The Pattern - Love Has Rules',
    'The Memory': 'The Memory - Past Reexamined',
    'The Evidence': 'The Evidence - Universal Truth',
    'The Goodbye': 'The Goodbye - Last Time Together',
    'The Crossroads': 'The Crossroads - Door Opens',
    'The Voice': 'The Voice - Something New Speaks',
    'The Waiting': 'The Waiting - Hours Alone',
    'The Return': 'The Return - Brief Joy',
  };
  
  let newTitle = currentTitle;
  
  // 检查是否是通用标题
  for (const [generic, optimized] of Object.entries(genericTitles)) {
    if (currentTitle.toLowerCase().includes(generic.toLowerCase())) {
      newTitle = optimized;
      break;
    }
  }
  
  // 如果标题没有改变，且长度小于 10 个字符，添加副标题
  if (newTitle === currentTitle && currentTitle.split(' ').length < 3) {
    const subtitles = [
      '- First Step',
      '- Turning Point',
      '- Hidden Truth',
      '- New Dawn',
      '- Critical Moment',
    ];
    newTitle = `${currentTitle} ${subtitles[chapterNum % subtitles.length]}`;
  }
  
  if (newTitle !== currentTitle) {
    content = content.replace(
      titleMatch[0],
      `# Chapter ${chapterNum}: ${newTitle}`
    );
  }
  
  return content;
}

// 优化开篇 Hook
function optimizeOpeningHook(content) {
  const lines = content.split('\n');
  
  // 找到第一个非空行
  let firstContentLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() && !lines[i].startsWith('#')) {
      firstContentLine = i;
      break;
    }
  }
  
  if (firstContentLine === -1) return content;
  
  const opening = lines[firstContentLine];
  
  // 检查是否是平淡开篇
  const blandOpenings = [
    /^It was a/i,
    /^The day/i,
    /^In the/i,
    /^She woke up/i,
    /^He woke up/i,
    /^They were/i,
  ];
  
  const isBland = blandOpenings.some(pattern => pattern.test(opening.trim()));
  
  if (isBland) {
    // 添加感官细节或动作
    const sensoryAdditions = [
      'The light came first. Then the sounds.',
      'Something was wrong. She could feel it.',
      'The smell hit him before he opened his eyes.',
      'Silence. Then a sound that shouldn\'t be there.',
    ];
    
    const addition = sensoryAdditions[Math.floor(Math.random() * sensoryAdditions.length)];
    lines.splice(firstContentLine, 0, addition);
    content = lines.join('\n');
  }
  
  return content;
}

// 优化结尾
function optimizeEnding(content) {
  const lines = content.split('\n');
  
  // 删除模板化结尾
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    return !trimmed.match(/^END OF CHAPTER$/i) &&
           !trimmed.match(/^To be continued/i) &&
           !trimmed.match(/^\*\*\*$/);
  });
  
  // 检查最后一段
  const lastParagraph = filteredLines.slice(-3).join('\n');
  
  // 如果是突然结尾，添加情感共鸣
  const abruptEndings = [
    /She fell asleep\./i,
    /He went to bed\./i,
    /The end\./i,
    /That was it\./i,
  ];
  
  const isAbrupt = abruptEndings.some(pattern => pattern.test(lastParagraph));
  
  if (isAbrupt) {
    // 添加反思或悬念
    const reflectiveEndings = [
      '\n\nTomorrow would bring new questions. But for now, there was only this moment.',
      '\n\nThe door remained open. What lay beyond, she would soon discover.',
      '\n\nSome choices change everything. This was one of them.',
      '\n\nThe silence held its breath. Waiting.',
    ];
    
    const addition = reflectiveEndings[Math.floor(Math.random() * reflectiveEndings.length)];
    filteredLines.push(addition);
  }
  
  return filteredLines.join('\n');
}

// 深化情感层次
function deepenEmotionalLayers(content) {
  // 查找简单的情感描述
  const simpleEmotions = [
    { pattern: /(\w+) felt scared\./gi, replacement: '$1\'s hands trembled. *This isn\'t right,* $1 thought. The fear of losing everything tightened $1\'s chest.' },
    { pattern: /(\w+) felt sad\./gi, replacement: '$1\'s shoulders slumped. *Why does it have to be this way?* A hollow ache settled in $1\'s stomach.' },
    { pattern: /(\w+) felt happy\./gi, replacement: '$1\'s face lit up. *Finally,* $1 thought. For the first time in days, the weight lifted.' },
    { pattern: /(\w+) felt angry\./gi, replacement: '$1\'s fists clenched. *Not again.* Heat rose in $1\'s chest, demanding action.' },
    { pattern: /(\w+) felt confused\./gi, replacement: '$1\'s brow furrowed. *I don\'t understand.* The pieces didn\'t fit, no matter how $1 turned them.' },
  ];
  
  let modifiedContent = content;
  
  for (const { pattern, replacement } of simpleEmotions) {
    modifiedContent = modifiedContent.replace(pattern, replacement);
  }
  
  return modifiedContent;
}

// 添加感官细节
function addSensoryDetails(content, chapterNum) {
  const sensoryTemplates = [
    // 嗅觉
    {
      type: 'smell',
      templates: [
        'The air carried the scent of ',
        'A smell of ',
        'The fragrance of ',
        'An odor of ',
      ]
    },
    // 触觉
    {
      type: 'touch',
      templates: [
        'The texture was ',
        'It felt ',
        'The surface was ',
        'Temperature: ',
      ]
    },
    // 听觉
    {
      type: 'sound',
      templates: [
        'A sound of ',
        'The noise from ',
        'A whisper of ',
        'An echo of ',
      ]
    },
  ];
  
  // 检查是否已有足够的感官细节
  const hasSmell = /(?:smell|scent|odor|fragrance|aroma)/gi.test(content);
  const hasTouch = /(?:touch|feel|texture|warm|cold|soft|hard)/gi.test(content);
  const hasSound = /(?:sound|hear|noise|listen|echo)/gi.test(content);
  
  let modifiedContent = content;
  
  // 如果缺少某种感官，在合适的位置添加
  if (!hasSmell && chapterNum % 2 === 0) {
    const smells = ['old paper', 'rain', 'coffee', 'metal', 'dust', 'flowers'];
    const smell = smells[chapterNum % smells.length];
    const insertion = `\nThe air carried the faint scent of ${smell}, lingering in the background.`;
    
    // 在场景描述后插入
    const sceneEnd = modifiedContent.search(/\n\n[A-Z][^.!?]*[.!?]\n\n/g);
    if (sceneEnd > 0) {
      modifiedContent = modifiedContent.slice(0, sceneEnd) + insertion + modifiedContent.slice(sceneEnd);
    }
  }
  
  if (!hasTouch && chapterNum % 3 === 0) {
    const textures = ['rough', 'smooth', 'cold', 'warm', 'soft'];
    const texture = textures[chapterNum % textures.length];
    const insertion = `\n${texture} to the touch, it grounded $1 in the present moment.`;
    
    const touchInsertion = insertion.replace('$1', 'them');
    const sceneEnd = modifiedContent.search(/\n\n[A-Z][^.!?]*[.!?]\n\n/g);
    if (sceneEnd > 0) {
      modifiedContent = modifiedContent.slice(0, sceneEnd) + touchInsertion + modifiedContent.slice(sceneEnd);
    }
  }
  
  return modifiedContent;
}

function cleanBook(bookDir) {
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
  
  let totalChanges = 0;
  const changes = [];
  
  for (const { file, chapterNum } of chapterFiles) {
    const chapterPath = path.join(chaptersDir, file);
    let content = fs.readFileSync(chapterPath, 'utf-8');
    const originalContent = content;
    
    let chapterChanges = 0;
    
    // 1. 清理 AI 痕迹
    for (const { pattern, replacement, note } of AI_REPLACEMENTS) {
      const matches = content.match(pattern);
      if (matches) {
        const count = matches.length;
        if (typeof replacement === 'function') {
          content = content.replace(pattern, replacement);
        } else {
          content = content.replace(pattern, replacement);
        }
        chapterChanges += count;
        totalChanges += count;
        changes.push({
          chapter: chapterNum,
          file,
          type: 'ai_pattern',
          issue: note,
          count,
        });
      }
    }
    
    // 2. 优化章节标题
    const titleBefore = content;
    content = optimizeChapterTitle(content, chapterNum, bookDir);
    if (content !== titleBefore) {
      changes.push({
        chapter: chapterNum,
        file,
        type: 'title_optimization',
        issue: '章节标题优化',
      });
    }
    
    // 3. 优化开篇（仅第 1 章）
    if (chapterNum === 1) {
      const openingBefore = content;
      content = optimizeOpeningHook(content);
      if (content !== openingBefore) {
        changes.push({
          chapter: chapterNum,
          file,
          type: 'opening_hook',
          issue: '开篇 Hook 优化',
        });
      }
    }
    
    // 4. 优化结尾
    const endingBefore = content;
    content = optimizeEnding(content);
    if (content !== endingBefore) {
      changes.push({
        chapter: chapterNum,
        file,
        type: 'ending_optimization',
        issue: '结尾优化',
      });
    }
    
    // 5. 深化情感层次
    const emotionBefore = content;
    content = deepenEmotionalLayers(content);
    if (content !== emotionBefore) {
      changes.push({
        chapter: chapterNum,
        file,
        type: 'emotional_depth',
        issue: '情感层次深化',
      });
    }
    
    // 6. 添加感官细节
    const sensoryBefore = content;
    content = addSensoryDetails(content, chapterNum);
    if (content !== sensoryBefore) {
      changes.push({
        chapter: chapterNum,
        file,
        type: 'sensory_details',
        issue: '感官细节补充',
      });
    }
    
    // 保存修改后的内容
    if (content !== originalContent) {
      fs.writeFileSync(chapterPath, content, 'utf-8');
    }
  }
  
  return {
    bookDir,
    totalChanges,
    changes,
  };
}

async function main() {
  console.log('🚀 开始自动执行所有改进...\n');
  
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
  
  console.log(`📚 将处理 ${booksToProcess.length} 本书籍\n`);
  
  const results = [];
  let totalChanges = 0;
  
  for (const bookDir of booksToProcess) {
    try {
      console.log(`📖 处理：${bookDir}`);
      const result = cleanBook(bookDir);
      if (result) {
        results.push(result);
        console.log(`   ✅ 修改：${result.totalChanges} 处`);
        totalChanges += result.totalChanges;
      }
    } catch (error) {
      console.error(`   ❌ 错误：${error.message}`);
    }
  }
  
  // 生成改进报告
  const outputDir = path.join(__dirname, '..', 'logs');
  fs.mkdirSync(outputDir, { recursive: true });
  
  const reportPath = path.join(outputDir, 'auto-improvement-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalBooks: results.length,
    totalChanges,
    results,
  }, null, 2));
  
  console.log('\n✅ 所有改进已完成！\n');
  console.log(`📊 总修改数：${totalChanges} 处`);
  console.log(`📄 报告已保存到：${reportPath}`);
  
  return { totalBooks: results.length, totalChanges, results };
}

main().catch(console.error);
