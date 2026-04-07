import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const COO_ROOT = path.join(__dirname, '..', '..');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function extractTitleFromChapter(content) {
  const firstLine = content.split(/\r?\n/)[0];
  const match = firstLine.match(/^#\s+(.+)$/);
  if (!match) return 'Untitled Chapter';
  
  let title = match[1].trim();
  title = title.replace(/^Chapter\s+\d+:\s*/i, '').trim();
  
  return title;
}

function extractChapterContent(content) {
  // 移除 markdown 标题行 (# Chapter XX: ...)
  const lines = content.split('\n');
  const contentLines = lines.filter((line, index) => {
    if (index === 0 && line.startsWith('#')) {
      return false;
    }
    return true;
  });
  return contentLines.join('\n').trim();
}

function extractKeywordsFromSEO(seoContent) {
  const keywords = [];
  
  // 匹配数字列表格式: 1. keyword (search volume: xxx)
  const primaryMatch = seoContent.match(/\*\*Primary Keywords\*\*:\s*[\s\S]*?(?=\*\*Long-tail|\*\*Secondary|###|$)/i);
  if (primaryMatch) {
    const lines = primaryMatch[0].split('\n');
    lines.forEach(line => {
      const numMatch = line.match(/^\d+\.\s*(.+?)(?:\s*\(|$)/);
      if (numMatch) {
        const kw = numMatch[1].trim();
        if (kw) keywords.push(kw);
      }
    });
  }
  
  // 匹配长尾关键词
  const longtailMatch = seoContent.match(/\*\*Long-tail Keywords\*\*:\s*[\s\S]*?(?=###|$)/i);
  if (longtailMatch) {
    const lines = longtailMatch[0].split('\n');
    lines.forEach(line => {
      const numMatch = line.match(/^\d+\.\s*(.+)/);
      if (numMatch) {
        const kw = numMatch[1].trim();
        if (kw) keywords.push(kw);
      }
    });
  }
  
  // 兼容旧的横线列表格式
  const secondaryMatch = seoContent.match(/### Secondary Keywords\s+([\s\S]*?)(?=###|$)/i);
  if (secondaryMatch) {
    const lines = secondaryMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const kw = line.replace(/^-\s*/, '').trim();
      if (kw) keywords.push(kw);
    });
  }
  
  return [...new Set(keywords)];
}

function extractCharactersFromSEO(seoContent) {
  const characters = [];
  
  const characterSection = seoContent.match(/## Characters[\s\S]*?(?=##|$)/i);
  if (characterSection) {
    const charMatches = characterSection[0].matchAll(/###\s+(.+?)\n([\s\S]*?)(?=###|$)/g);
    for (const match of charMatches) {
      const name = match[1].trim();
      const details = match[2];
      
      let roleType = 'Character';
      let personality = '';
      let speechStyle = '';
      
      const roleMatch = details.match(/\*\*Role:\*\*\s*(.+)/i);
      if (roleMatch) roleType = roleMatch[1].trim();
      
      const personalityMatch = details.match(/\*\*Personality:\*\*\s*(.+)/i);
      if (personalityMatch) personality = personalityMatch[1].trim();
      
      const speechMatch = details.match(/\*\*Speech Style:\*\*\s*(.+)/i);
      if (speechMatch) speechStyle = speechMatch[1].trim();
      
      characters.push({ name, roleType, personality, speechStyle });
    }
  }
  
  return characters;
}

function extractMetaDescription(seoContent) {
  // 尝试从代码块中提取 (```...\n...```)
  const codeBlockMatch = seoContent.match(/###\s*\d*\.\s*Meta Description[^`]*```\s*\n?([\s\S]*?)```/i);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  
  // 兼容旧格式
  const match = seoContent.match(/### Meta Description[^*]*\n\n(.+)/i);
  return match ? match[1].trim() : '';
}

function extractMetaTitle(seoContent) {
  // 尝试从 **Main Title** 格式提取
  const mainTitleMatch = seoContent.match(/\*\*Main Title\*\*:\s*(.+)/i);
  if (mainTitleMatch) {
    const subtitleMatch = seoContent.match(/\*\*Subtitle\*\*:\s*(.+)/i);
    if (subtitleMatch) {
      return `${mainTitleMatch[1].trim()}: ${subtitleMatch[1].trim()}`;
    }
    return mainTitleMatch[1].trim();
  }
  
  // 兼容旧格式
  const match = seoContent.match(/### Meta Title[^*]*\n\n(.+)/i);
  return match ? match[1].trim() : '';
}

function extractPhilosophicalThemes(seoContent) {
  const themes = [];
  const match = seoContent.match(/### Philosophical Themes\s+([\s\S]*?)(?=###|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const theme = line.replace(/^-\s*/, '').trim();
      if (theme) themes.push(theme);
    });
  }
  return themes;
}

function extractTargetAudience(seoContent) {
  const audiences = [];
  const match = seoContent.match(/### Target Audience\s+([\s\S]*?)(?=---|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const audience = line.replace(/^-\s*/, '').trim();
      if (audience) audiences.push(audience);
    });
  }
  return audiences;
}

function extractCategories(seoContent) {
  const categories = [];
  const match = seoContent.match(/### Categories\s+([\s\S]*?)(?=###|$)/i);
  if (match) {
    const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
    lines.forEach(line => {
      const cat = line.replace(/^-\s*/, '').trim();
      if (cat) categories.push(cat);
    });
  }
  return categories;
}

function extractChapterSEO(seoContent) {
  const chapters = {};
  const chapterMatches = seoContent.matchAll(/### Chapter (\d+): (.+?)\n([\s\S]*?)(?=### Chapter|---|$)/gi);
  
  for (const match of chapterMatches) {
    const chapterNum = match[1];
    const chapterTitle = match[2].trim();
    const chapterContent = match[3];
    
    const keywords = [];
    const kwMatch = chapterContent.match(/\*\*Keywords:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
    if (kwMatch) {
      const lines = kwMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
      lines.forEach(line => {
        const kw = line.replace(/^-\s*/, '').trim();
        if (kw) keywords.push(kw);
      });
    }
    
    const summaryMatch = chapterContent.match(/\*\*Summary for SEO:\*\*\s*(.+)/i);
    const summary = summaryMatch ? summaryMatch[1].trim() : '';
    
    chapters[chapterNum] = {
      title: chapterTitle,
      keywords,
      summary
    };
  }
  
  return chapters;
}

function extractBookSpecInfo(bookSpecContent) {
  const info = {
    title: '',
    type: '',
    targetReader: '',
    themes: [],
    narrativeStyle: '',
    emotionalTone: '',
    characters: []
  };
  
  // 支持多种格式：
  // 1. 列表格式: - **Title**: xxx 或 - **Book Title**: xxx
  // 2. 表格格式: | **Title** | xxx |
  // 3. 支持中英文
  
  // 标题提取 - 尝试多种格式
  let titleMatch = bookSpecContent.match(/\*\*(?:书名|Book Title|Title)\*\*[：:]\s*(.+)/i);
  if (!titleMatch) {
    // 尝试表格格式
    titleMatch = bookSpecContent.match(/\|\s*\*\*(?:书名|Book Title|Title)\*\*\s*\|\s*(.+?)\s*\|/i);
  }
  if (titleMatch) info.title = titleMatch[1].trim();
  
  // 类型/Genre提取 - 尝试多种格式
  let typeMatch = bookSpecContent.match(/\*\*(?:类型|Genre)\*\*[：:]\s*(.+)/i);
  if (!typeMatch) {
    typeMatch = bookSpecContent.match(/\|\s*\*\*(?:类型|Genre)\*\*\s*\|\s*(.+?)\s*\|/i);
  }
  if (typeMatch) info.type = typeMatch[1].trim();
  
  // 目标读者提取 - 尝试多种格式
  let readerMatch = bookSpecContent.match(/\*\*(?:目标读者|Target Readers?|Target Audience)\*\*[：:]\s*(.+)/i);
  if (!readerMatch) {
    readerMatch = bookSpecContent.match(/\|\s*\*\*(?:目标读者|Target Readers?|Target Audience)\*\*\s*\|\s*(.+?)\s*\|/i);
  }
  if (readerMatch) info.targetReader = readerMatch[1].trim();
  
  // 主题提取 - 尝试多种格式
  let themeMatch = bookSpecContent.match(/\*\*(?:主题|Theme|Themes|Core Themes?)\*\*[：:]\s*(.+)/i);
  if (!themeMatch) {
    themeMatch = bookSpecContent.match(/\|\s*\*\*(?:主题|Theme|Themes|Core Themes?)\*\*\s*\|\s*(.+?)\s*\|/i);
  }
  if (themeMatch) info.themes = themeMatch[1].split(',').map(t => t.trim());
  
  return info;
}

function extractCharactersFromBookSpec(bookSpecContent) {
  const characters = [];
  
  // 格式1: 匹配角色定义：### Dr. Elara Chen (Protagonist) 或 ### Elara（主角）
  // 支持英文和中文括号
  // 也支持两个括号的格式：### ARIA (Artificial Research Intelligence Assistant) (Protagonist)
  const charRegex = /###\s+([A-Za-z][A-Za-z0-9\s\-\.\'\/\d]*)\s*[\(（]([^)）]+)[\)）](?:\s*[\(（]([^)）]+)[\)）])?/g;
  let match;
  
  while ((match = charRegex.exec(bookSpecContent)) !== null) {
    const name = match[1].trim();
    // 如果有第二个括号，使用第二个括号的内容作为角色类型（通常是真正的角色类型）
    const roleType = (match[3] || match[2]).trim();
    
    // 跳过非角色内容（如章节标题等）
    // 检查是否包含角色类型的关键词（支持英文和中文）
    const roleKeywords = [
      // 英文
      'Protagonist', 'Antagonist', 'Mentor', 'AI', 'System', 'Human', 'Dog', 'Cat', 
      'Scientist', 'Doctor', 'Teacher', 'Student', 'Guide', 'Partner', 'Friend', 'Enemy', 
      'Master', 'Pet', 'Wizard', 'Mage', 'Warrior', 'Knight', 'Princess', 'Prince', 
      'King', 'Queen', 'Voice', 'Consciousness', 'Entity', 'Being', 'Robot', 'Animal',
      'Supporting Character', 'Minor Character', 'Villain', 'Supporting', 'Authority',
      'Brother', 'Sister', 'Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife',
      'Collective', 'Assistant', 'Judge', 'CEO', 'Activist',
      // 职场/商业角色
      'Boss', 'Manager', 'CEO', 'VP', 'Director', 'Colleague', 'Coworker',
      'HR', 'Legal', 'Counsel', 'Engineer', 'Reviewer', 'Analyst',
      // 中文
      '主角', '配角', '反派', 'AI', '系统', '人类', '狗', '猫', '科学家', '医生', 
      '老师', '学生', '导师', '伙伴', '朋友', '敌人', '主人', '宠物', '巫师', '法师', 
      '战士', '骑士', '公主', '王子', '国王', '女王', '声音', '意识', '实体',
      // 中文职场角色
      '老板', '经理', '同事', '工程师', '律师', '顾问'
    ];
    
    const isRole = roleKeywords.some(keyword => roleType.includes(keyword));
    
    if (!isRole) {
      continue; // 跳过非角色内容
    }
    
    let personality = '';
    let speechStyle = '';
    
    // 找到这个角色的完整章节内容（支持中文和英文括号）
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const charSectionRegex = new RegExp(`###\\s+${escapedName}\\s*[\(（][^)）]+[\)）][\\s\\S]*?(?=###|$)`, 'i');
    const charSectionMatch = bookSpecContent.match(charSectionRegex);
    
    if (charSectionMatch) {
      const section = charSectionMatch[0];
      
      // 尝试匹配性格特征（支持多种格式）
      const personalityPatterns = [
        /\*\*Personality\*\*[:\s]+([\s\S]*?)(?=\*\*|$)/i,
        /-\s*Personality[:\s]+([\s\S]*?)(?=\n\s*-\s*|$)/i,
        /\*\*性格特征\*\*[:：]\s*([\s\S]*?)(?=\*\*|$)/i,
        /-\s*性格特征 [:：]\s*([\s\S]*?)(?=\n\s*-\s*|$)/i
      ];
      
      for (const pattern of personalityPatterns) {
        const personalityMatch = section.match(pattern);
        if (personalityMatch) {
          personality = personalityMatch[1].trim().replace(/\n/g, ' ');
          break;
        }
      }
      
      // 尝试匹配说话特点（支持多种格式）
      const speechPatterns = [
        /\*\*Speech Pattern\*\*[:\s]+([\s\S]*?)(?=\*\*|$)/i,
        /\*\*Speech Style\*\*[:\s]+([\s\S]*?)(?=\*\*|$)/i,
        /\*\*说话特点\*\*[:：]\s*([\s\S]*?)(?=\*\*|$)/i,
        /-\s*Speech Pattern[:\s]+([\s\S]*?)(?=\n\s*-\s*|$)/i,
        /-\s*说话特点 [:：]\s*([\s\S]*?)(?=\n\s*-\s*|$)/i,
        /-\s*Vocabulary[:\s]+([\s\S]*?)(?=\n\s*-\s*|$)/i,
        /-\s*用词习惯[:：]\s*([\s\S]*?)(?=\n\s*-\s*|$)/i
      ];
      
      for (const pattern of speechPatterns) {
        const speechMatch = section.match(pattern);
        if (speechMatch) {
          speechStyle = speechMatch[1].trim().replace(/\n/g, ' ');
          break;
        }
      }
      
      // 如果还是没有提取到，尝试更宽松的匹配
      if (!personality && !speechStyle) {
        // 提取所有以"- "开头的行作为特征
        const lines = section.split('\n').filter(line => line.trim().startsWith('-'));
        const features = lines.map(line => line.replace(/^-\s*/, '').trim());
        
        if (features.length > 0) {
          // 前两个特征作为性格和说话风格
          if (features.length >= 1) personality = features[0];
          if (features.length >= 2) speechStyle = features[1];
        }
      }
    }
    
    characters.push({ name, roleType, personality, speechStyle });
  }
  
  //// 格式2: 表格格式角色定义（如 the-unconditional）
  // 匹配类似 "#### ARIA (Artificial Relationship Intelligence Assistant)" 后接表格
  const tableCharRegex = /####\s+([A-Za-z][A-Za-z\s\-\.\'\/]*)\s*\(([^)]+)\)[\s\S]*?\| Attribute \| Description \|[\s\S]*?(?=####|###|$)/gi;
  let tableMatch;
  
  while ((tableMatch = tableCharRegex.exec(bookSpecContent)) !== null) {
    const name = tableMatch[1].trim();
    const roleDesc = tableMatch[2].trim();
    
    // 从表格中提取信息
    const tableContent = tableMatch[0];
    let roleType = 'Supporting Character';
    let personality = '';
    let speechStyle = '';
    
    // 提取 Function/Role/Occupation
    const functionMatch = tableContent.match(/\|\s*\*\*Function\*\*\s*\|\s*(.+?)\s*\|/i);
    const roleMatch = tableContent.match(/\|\s*\*\*Role\*\*\s*\|\s*(.+?)\s*\|/i);
    const occupationMatch = tableContent.match(/\|\s*\*\*Occupation\*\*\s*\|\s*(.+?)\s*\|/i);
    if (functionMatch) {
      roleType = functionMatch[1].trim();
    } else if (roleMatch) {
      roleType = roleMatch[1].trim();
    } else if (occupationMatch) {
      roleType = occupationMatch[1].trim();
    }
    
    // 提取 Personality Traits
    const personalityMatch = tableContent.match(/\|\s*\*\*Personality Traits\*\*\s*\|\s*(.+?)\s*\|/i);
    if (personalityMatch) {
      personality = personalityMatch[1].trim();
    }
    
    // 提取 Speaking Style
    const speakingMatch = tableContent.match(/\|\s*\*\*Speaking Style\*\*\s*\|\s*(.+?)\s*\|/i);
    const speechMatch = tableContent.match(/\|\s*\*\*Speech Style\*\*\s*\|\s*(.+?)\s*\|/i);
    if (speakingMatch) {
      speechStyle = speakingMatch[1].trim();
    } else if (speechMatch) {
      speechStyle = speechMatch[1].trim();
    }
    
    // 检查是否已存在（避免重复）
    const exists = characters.some(c => c.name === name);
    if (!exists) {
      characters.push({ name, roleType, personality, speechStyle });
    }
  }
  
  return characters;
}

function convertRoleTypeToEnglish(roleTypeZh) {
  // 中文到英文的角色类型映射（扩展版）
  const roleTypeMap = {
    // 基本角色
    '主角': 'Protagonist',
    '配角': 'Supporting Character',
    '反派': 'Antagonist',
    '次要角色': 'Minor Character',
    
    // 职业角色
    '科学家': 'Scientist',
    '研究员': 'Researcher',
    '医生': 'Doctor',
    '老师': 'Teacher',
    '学生': 'Student',
    '工程师': 'Engineer',
    '程序员': 'Programmer',
    '设计师': 'Designer',
    '艺术家': 'Artist',
    '作家': 'Writer',
    '音乐家': 'Musician',
    '律师': 'Lawyer',
    '警察': 'Police Officer',
    '侦探': 'Detective',
    '记者': 'Journalist',
    '摄影师': 'Photographer',
    '厨师': 'Chef',
    '护士': 'Nurse',
    '教授': 'Professor',
    '商人': 'Businessman',
    '企业家': 'Entrepreneur',
    '经理': 'Manager',
    '秘书': 'Secretary',
    '服务员': 'Waiter',
    '司机': 'Driver',
    '飞行员': 'Pilot',
    '宇航员': 'Astronaut',
    '军人': 'Soldier',
    '警察': 'Police Officer',
    '消防员': 'Firefighter',
    
    // 身份角色
    '人类': 'Human',
    'AI': 'AI',
    '机器人': 'Robot',
    '人工智能': 'Artificial Intelligence',
    '系统': 'System',
    '意识': 'Consciousness',
    '灵魂': 'Soul',
    '幽灵': 'Ghost',
    '魔法': 'Magic',
    '巫师': 'Wizard',
    '法师': 'Mage',
    '战士': 'Warrior',
    '骑士': 'Knight',
    '公主': 'Princess',
    '王子': 'Prince',
    '国王': 'King',
    '女王': 'Queen',
    '皇帝': 'Emperor',
    '村民': 'Villager',
    '市民': 'Citizen',
    
    // 动物角色
    '狗': 'Dog',
    '猫': 'Cat',
    '鸟': 'Bird',
    '鱼': 'Fish',
    '龙': 'Dragon',
    '狼': 'Wolf',
    '狮子': 'Lion',
    '老虎': 'Tiger',
    '熊': 'Bear',
    '狐狸': 'Fox',
    '兔子': 'Rabbit',
    '马': 'Horse',
    '牛': 'Cow',
    '羊': 'Sheep',
    '猪': 'Pig',
    '猴': 'Monkey',
    '蛇': 'Snake',
    '鹰': 'Eagle',
    '猫头鹰': 'Owl',
    '乌鸦': 'Raven',
    '金毛犬': 'Golden Retriever',
    '拉布拉多': 'Labrador',
    '哈士奇': 'Husky',
    
    // 关系角色
    '主人': 'Owner',
    '朋友': 'Friend',
    '敌人': 'Enemy',
    '伙伴': 'Partner',
    '同事': 'Colleague',
    '同学': 'Classmate',
    '邻居': 'Neighbor',
    '陌生人': 'Stranger',
    '导师': 'Mentor',
    '学徒': 'Apprentice',
    '父亲': 'Father',
    '母亲': 'Mother',
    '儿子': 'Son',
    '女儿': 'Daughter',
    '兄弟': 'Brother',
    '姐妹': 'Sister',
    '祖父': 'Grandfather',
    '祖母': 'Grandmother',
    '叔叔': 'Uncle',
    '阿姨': 'Aunt',
    '表亲': 'Cousin',
    '恋人': 'Lover',
    '配偶': 'Spouse',
    '丈夫': 'Husband',
    '妻子': 'Wife',
    '男朋友': 'Boyfriend',
    '女朋友': 'Girlfriend',
    
    // 抽象角色
    '声音': 'Voice',
    '意识体': 'Consciousness',
    '实体': 'Entity',
    '存在': 'Being',
    '观察者': 'Observer',
    '引导者': 'Guide',
    '守护者': 'Guardian',
    '创造者': 'Creator',
    '毁灭者': 'Destroyer',
    '旅行者': 'Traveler',
    '探索者': 'Explorer',
    '学习者': 'Learner',
    '教导者': 'Teacher',
    '治疗者': 'Healer',
    '保护者': 'Protector',
    '拯救者': 'Savior',
    '背叛者': 'Traitor',
    '英雄': 'Hero',
    '反派': 'Villain'
  };
  
  // 如果包含连字符，分别翻译
  if (roleTypeZh.includes('-')) {
    const parts = roleTypeZh.split('-').map(part => part.trim());
    return parts.map(part => {
      for (const [zh, en] of Object.entries(roleTypeMap)) {
        if (part.includes(zh)) {
          return en;
        }
      }
      return part;
    }).join(' - ');
  }
  
  // 直接匹配
  for (const [zh, en] of Object.entries(roleTypeMap)) {
    if (roleTypeZh.includes(zh)) {
      return en;
    }
  }
  
  // 如果没有匹配到，返回原文（可能是已经是英文）
  return roleTypeZh;
}

function readBook(bookDir) {
  const bookPath = path.join(COO_ROOT, bookDir);
  
  if (!fs.existsSync(bookPath)) {
    throw new Error(`Book directory not found: ${bookPath}`);
  }
  
  const bookData = {
    dirName: bookDir,
    bookId: `preset-coo-${bookDir}`,
    title: '',
    type: '',
    language: 'en',
    chapters: [],
    characters: [],
    keywords: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      categories: [],
      targetAudience: [],
      philosophicalThemes: []
    },
    chapterSEO: {},
    bookSpec: {}
  };
  
  const chaptersDir = path.join(bookPath, 'chapters');
  if (fs.existsSync(chaptersDir)) {
    const chapterFiles = fs.readdirSync(chaptersDir)
      .filter(f => f.endsWith('.md') && /^chapter-\d+\.md$/.test(f))
      .map((f, index) => {
        const numMatch = f.match(/chapter-(\d+)/);
        const chapterNum = numMatch ? parseInt(numMatch[1]) : (index + 1);
        return { file: f, chapterNum, originalIndex: index };
      })
      .sort((a, b) => a.chapterNum - b.chapterNum || a.originalIndex - b.originalIndex);
    
    for (const { file, chapterNum } of chapterFiles) {
      const chapterPath = path.join(chaptersDir, file);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const title = extractTitleFromChapter(content);
      const chapterContent = extractChapterContent(content);
      
      bookData.chapters.push({
        chapterId: `chapter-coo-${bookDir}-${String(chapterNum).padStart(2, '0')}`,
        orderNum: chapterNum,
        title,
        content: chapterContent
      });
      
      if (!bookData.title && chapterNum === 1) {
        const titleMatch = content.match(/^#\s+Chapter\s+\d+:\s*(.+)$/m);
        if (titleMatch) {
          bookData.title = titleMatch[1].trim();
        }
      }
    }
  }
  
  const seoMetaPath = path.join(bookPath, '.progress', 'seo-meta.md');
  if (fs.existsSync(seoMetaPath)) {
    const seoContent = fs.readFileSync(seoMetaPath, 'utf-8');
    
    bookData.keywords = extractKeywordsFromSEO(seoContent);
    bookData.seo.metaTitle = extractMetaTitle(seoContent);
    bookData.seo.metaDescription = extractMetaDescription(seoContent);
    bookData.seo.categories = extractCategories(seoContent);
    bookData.seo.targetAudience = extractTargetAudience(seoContent);
    bookData.seo.philosophicalThemes = extractPhilosophicalThemes(seoContent);
    bookData.chapterSEO = extractChapterSEO(seoContent);
    
    const seoChars = extractCharactersFromSEO(seoContent);
    if (seoChars.length > 0) {
      bookData.characters = seoChars;
    }
    
    // 优先从SEO文档获取标题
    if (bookData.seo.metaTitle) {
      bookData.title = bookData.seo.metaTitle;
    } else {
      const titleMatch = seoContent.match(/#\s+(.+?)\s*-\s*SEO/i);
      if (titleMatch) {
        bookData.title = titleMatch[1].trim();
      }
    }
  }
  
  const bookSpecPath = path.join(bookPath, '.progress', 'book-spec.md');
  if (fs.existsSync(bookSpecPath)) {
    const bookSpecContent = fs.readFileSync(bookSpecPath, 'utf-8');
    bookData.bookSpec = extractBookSpecInfo(bookSpecContent);
    
    if (bookData.bookSpec.title) {
      bookData.title = bookData.bookSpec.title;
    }
    
    const specChars = extractCharactersFromBookSpec(bookSpecContent);
    if (specChars.length > 0 && bookData.characters.length === 0) {
      bookData.characters = specChars;
    }
  }
  
  if (!bookData.title) {
    const parts = bookDir.split('-');
    bookData.title = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }
  
  return bookData;
}

function listAvailableBooks() {
  const books = [];
  const entries = fs.readdirSync(COO_ROOT, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'operate') {
      const chaptersPath = path.join(COO_ROOT, entry.name, 'chapters');
      if (fs.existsSync(chaptersPath)) {
        books.push(entry.name);
      }
    }
  }
  
  return books;
}

async function main() {
  const args = process.argv.slice(2);
  
  let booksToProcess = [];
  
  if (args.length > 0) {
    booksToProcess = args;
  } else {
    booksToProcess = listAvailableBooks();
  }
  
  console.log('📚 读取书籍内容...\n');
  console.log(`找到 ${booksToProcess.length} 本书:\n`);
  
  const results = [];
  
  for (const bookDir of booksToProcess) {
    try {
      console.log(`📖 处理: ${bookDir}`);
      const bookData = readBook(bookDir);
      
      console.log(`   标题: ${bookData.title}`);
      console.log(`   章节: ${bookData.chapters.length}`);
      console.log(`   角色: ${bookData.characters.length}`);
      console.log(`   关键词: ${bookData.keywords.length}`);
      console.log('');
      
      results.push(bookData);
    } catch (error) {
      console.error(`   ❌ 错误: ${error.message}`);
      console.log('');
    }
  }
  
  const outputPath = path.join(__dirname, '..', 'logs', 'book-data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ 完成！数据已保存到: ${outputPath}`);
  
  return results;
}

main().catch(console.error);
