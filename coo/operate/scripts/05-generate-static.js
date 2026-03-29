import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const LOGS_PATH = path.join(__dirname, '..', 'logs');
const FRONTEND_OUTPUT = path.join(__dirname, '..', 'frontend');
const COO_ROOT = path.join(__dirname, '..', '..');

const TYPE_NAMES = {
  zh: { adventure: '冒险', fantasy: '奇幻', romance: '言情', business: '职场' },
  en: { adventure: 'Adventure', fantasy: 'Fantasy', romance: 'Romance', business: 'Business' }
};

const TYPE_ICONS = {
  adventure: '🗺️',
  fantasy: '🧙',
  romance: '💕',
  business: '💼'
};

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function extractSEOKeywords(seoContent) {
  const keywords = [];
  
  // 格式1: 数字编号格式（英文）
  // 1. keyword (search volume: xxx)
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
  
  // 格式1b: 数字编号格式（中文）- 匹配"主要关键词"或"核心关键词"
  // **主要关键词**: 或 **核心关键词**:
  const primaryMatchZh = seoContent.match(/\*\*(?:主要|核心)关键词\*\*[:：]\s*[\s\S]*?(?=\*\*长尾|\*\*次要|###|$)/i);
  if (primaryMatchZh) {
    const lines = primaryMatchZh[0].split('\n');
    lines.forEach(line => {
      const numMatch = line.match(/^\d+\.\s*(.+?)(?:\s*\(|$)/);
      if (numMatch) {
        const kw = numMatch[1].trim();
        if (kw) keywords.push(kw);
      }
    });
  }
  
  // 长尾关键词（英文）
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
  
  // 长尾关键词（中文）
  const longtailMatchZh = seoContent.match(/\*\*长尾关键词\*\*[:：]\s*[\s\S]*?(?=###|$)/i);
  if (longtailMatchZh) {
    const lines = longtailMatchZh[0].split('\n');
    lines.forEach(line => {
      const numMatch = line.match(/^\d+\.\s*(.+?)(?:\s*\(|$)/);
      if (numMatch) {
        const kw = numMatch[1].trim();
        if (kw) keywords.push(kw);
      }
    });
  }
  
  // 格式2: 列表格式（如 the-blame-game）
  // - keyword
  const listMatch = seoContent.match(/###\s*Primary Keywords[\s\S]*?(?=###|##|$)/i);
  if (listMatch) {
    const lines = listMatch[0].split('\n');
    lines.forEach(line => {
      const listKeywordMatch = line.match(/^-\s*(.+)/);
      if (listKeywordMatch) {
        const kw = listKeywordMatch[1].trim();
        if (kw && !kw.includes(':')) keywords.push(kw);
      }
    });
  }
  
  // 格式3: 直接 keywords 列表（如 the-unconditional）
  // - **Keywords**: keyword1, keyword2...
  const directKeywordsMatch = seoContent.match(/-\s*\*\*Keywords\*\*:\s*(.+)/i);
  if (directKeywordsMatch) {
    const kwList = directKeywordsMatch[1].split(',').map(k => k.trim()).filter(k => k);
    keywords.push(...kwList);
  }
  
  return [...new Set(keywords)];
}

function extractSEOMetaDescription(seoContent) {
  // 格式1: 代码块格式（有 ```）
  const codeBlockMatch = seoContent.match(/###\s*\d*\.\s*Meta Description[^`]*```\s*\n?([\s\S]*?)```/i);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  
  // 格式2: 列表格式（如 the-unconditional）
  // - **Meta Description**: xxx
  const listMatch = seoContent.match(/-\s*\*\*Meta Description\*\*:\s*([^\n]+)/i);
  if (listMatch) {
    return listMatch[1].trim();
  }
  
  // 格式3: 标题+内容格式（如 the-blame-game）
  // ### Meta Description (160 chars max)
  // When an AI trading error...
  const headerMatch = seoContent.match(/###\s*Meta Description[^\n]*\n+([^#\n][^\n]+)/i);
  if (headerMatch) {
    return headerMatch[1].trim();
  }
  
  return '';
}

function extractSEOMetaTitle(seoContent) {
  const mainTitleMatch = seoContent.match(/\*\*Main Title\*\*:\s*(.+)/i);
  if (mainTitleMatch) {
    const subtitleMatch = seoContent.match(/\*\*Subtitle\*\*:\s*(.+)/i);
    if (subtitleMatch) {
      return mainTitleMatch[1].trim() + ': ' + subtitleMatch[1].trim();
    }
    return mainTitleMatch[1].trim();
  }
  return '';
}

function loadSEOData(bookId) {
  const bookDirName = bookId.replace('preset-coo-', '');
  const seoPath = path.join(COO_ROOT, bookDirName, '.progress', 'seo-meta.md');
  
  if (!fs.existsSync(seoPath)) {
    return null;
  }
  
  const seoContent = fs.readFileSync(seoPath, 'utf-8');
  
  return {
    keywords: extractSEOKeywords(seoContent),
    metaDescription: extractSEOMetaDescription(seoContent),
    metaTitle: extractSEOMetaTitle(seoContent),
    chapterSEO: extractChapterSEO(seoContent)
  };
}

function extractChapterSEO(seoContent) {
  const chapterSEO = {};
  
  // 格式1: 代码块格式（有 ```）
  const chapterPatternWithCode = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*Meta Description\*\*:\s*```\n?([\s\S]*?)```\n\n\*\*Keywords\*\*:\s*([^\n]+)/gi;
  
  let match;
  while ((match = chapterPatternWithCode.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const metaDescription = match[3].trim();
    const keywords = match[4].trim();
    
    chapterSEO[chapterNum] = {
      title: chapterTitle,
      metaDescription: metaDescription,
      keywords: keywords
    };
  }
  
  // 格式2: 列表格式（无代码块，如 the-unconditional）
  // ### Chapter 1: Title
  // - **Meta Description**: xxx
  // - **Keywords**: xxx
  const chapterPatternList = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?-\s*\*\*Meta Description\*\*:\s*([^\n]+)\n[\s\S]*?-\s*\*\*Keywords\*\*:\s*([^\n]+)/gi;
  
  while ((match = chapterPatternList.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const metaDescription = match[3].trim();
    const keywords = match[4].trim();
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  // 格式3: The Neural Druid 格式
  // **Meta Description**:
  // ```
  // xxx
  // ```
  // **Keywords**: xxx
  const chapterPatternNeuralDruid = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*Meta Description\*\*:\s*```\s*\n?([\s\S]*?)```\s*\n[\s\S]*?\*\*Keywords\*\*:\s*([^\n]+)/gi;
  
  while ((match = chapterPatternNeuralDruid.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const metaDescription = match[3].trim();
    const keywords = match[4].trim();
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  // 格式4: The Blame Game 格式（关键词是列表）
  // **Keywords:**
  // - keyword1
  // - keyword2
  const chapterPatternBlameGame = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*Meta Description\*\*:\s*```\s*\n?([\s\S]*?)```\s*\n[\s\S]*?\*\*Keywords:\*\*\s*\n((?:-\s*[^\n]+\n?)+)/gi;
  
  while ((match = chapterPatternBlameGame.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const metaDescription = match[3].trim();
    const keywordList = match[4].trim();
    const keywords = keywordList.split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(k => k)
      .join(', ');
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  // 格式5: The Blame Game 格式变体（无代码块的Meta Description）
  // **Meta Description:**
  // xxx
  // **Keywords:**
  // - keyword1
  const chapterPatternBlameGame2 = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*Meta Description:\*\*\s*\n([^\n]+)\n[\s\S]*?\*\*Keywords:\*\*\s*\n((?:-\s*[^\n]+\n?)+)/gi;
  
  while ((match = chapterPatternBlameGame2.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const metaDescription = match[3].trim();
    const keywordList = match[4].trim();
    const keywords = keywordList.split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(k => k)
      .join(', ');
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  // 格式6: The Blame Game 实际格式（Keywords在前，Meta Description在后）
  // **Keywords:**
  // - keyword1
  // - keyword2
  // **Meta Description:**
  // xxx
  const chapterPatternKeywordsFirst = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*Keywords:\*\*\s*\n((?:-\s*[^\n]+\n?)+)[\s\S]*?\*\*Meta Description:\*\*\s*\n([^\n]+)/gi;
  
  while ((match = chapterPatternKeywordsFirst.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const keywordList = match[3].trim();
    const metaDescription = match[4].trim();
    const keywords = keywordList.split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(k => k)
      .join(', ');
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  // 格式7: The Whispering Network 格式（中文关键词）
  // **关键词**: xxx
  // 或
  // **Keywords**: xxx
  const chapterPatternSimpleKeywords = /### Chapter (\d+): ([^\n]+)\n[\s\S]*?\*\*(?:Keywords|关键词)\*\*:\s*([^\n]+)/gi;
  
  while ((match = chapterPatternSimpleKeywords.exec(seoContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterTitle = match[2].trim();
    const keywords = match[3].trim();
    
    // 提取Meta Description
    const metaDescMatch = seoContent.match(new RegExp(`### Chapter ${chapterNum}:[^\\n]*\\n[\\s\\S]*?\\*\\*Meta Description\\*\\*:\\s*\\n?\`\`\`\\s*\\n?([\\s\\S]*?)\`\`\``, 'i'));
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';
    
    if (!chapterSEO[chapterNum]) {
      chapterSEO[chapterNum] = {
        title: chapterTitle,
        metaDescription: metaDescription,
        keywords: keywords
      };
    }
  }
  
  return chapterSEO;
}

function getRoleIcon(roleType, config) {
  if (!roleType) return config.roleTypeIcons.default || '👤';
  if (config.roleTypeIcons[roleType]) return config.roleTypeIcons[roleType];
  
  const lowerRole = roleType.toLowerCase();
  
  // 优先匹配英文关键词
  const roleKeywords = {
    'protagonist': '🧑',
    'main character': '🧑',
    'ai': '🤖',
    'robot': '🤖',
    'dog': '🐕',
    'pet': '🐕',
    'animal': '🐕',
    'human': '🧑',
    'owner': '🧑',
    'master': '🧑',
    'scientist': '🔬',
    'researcher': '🧑‍💼',
    'doctor': '👨‍⚕️',
    'detective': '🕵️',
    'teacher': '👨‍🏫',
    'student': '🎓'
  };
  
  // 检查是否包含英文关键词
  for (const [keyword, icon] of Object.entries(roleKeywords)) {
    if (lowerRole.includes(keyword)) {
      return icon;
    }
  }
  
  // 尝试匹配中文关键词
  const zhKeywords = {
    '主角': '🧑',
    '人类': '🧑',
    '狗': '🐕',
    '宠物': '🐕',
    '动物': '🐕',
    'ai': '🤖',
    '机器人': '🤖',
    '科学家': '🔬'
  };
  
  for (const [keyword, icon] of Object.entries(zhKeywords)) {
    if (roleType.includes(keyword)) {
      return icon;
    }
  }
  
  // 最后尝试 config 中的模糊匹配
  for (const [key, icon] of Object.entries(config.roleTypeIcons)) {
    if (key.toLowerCase().includes(lowerRole) || lowerRole.includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  return config.roleTypeIcons.default || '👤';
}

function getPlotCardIcon(subType, name) {
  if (!subType) return '🎭';
  
  const PLOT_CARD_ICONS = {
    'weather': '☁️',
    'terrain': '🏗️',
    'adventure': '🎵',
    'equipment': '📦'
  };
  
  const PLOT_CARD_NAME_ICONS = {
    'weather': {
      'dawn': '🌅', 'sunrise': '🌅', 'morning': '🌅',
      'sun': '☀️', 'sunny': '☀️', 'sunshine': '☀️',
      'cloud': '☁️', 'cloudy': '☁️', 'overcast': '☁️',
      'rain': '🌧️', 'rainy': '🌧️', 'storm': '⛈️', 'stormy': '⛈️',
      'snow': '❄️', 'snowy': '❄️', 'winter': '❄️',
      'wind': '🌬️', 'windy': '🌬️', 'fog': '🌫️', 'foggy': '🌫️',
      'night': '🌙', 'moon': '🌙', 'star': '⭐', 'stars': '⭐',
      'clear': '🌤️', 'digital': '📱', 'emotion': '💔',
      'understanding': '🧠', 'wedding': '💒'
    },
    'terrain': {
      'forest': '🌲', 'woods': '🌲', 'tree': '🌳',
      'mountain': '⛰️', 'mountains': '⛰️', 'hill': '⛰️',
      'valley': '🏔️', 'river': '🌊', 'stream': '💧',
      'lake': '🏞️', 'ocean': '🌊', 'sea': '🌊',
      'beach': '🏖️', 'island': '🏝️', 'desert': '🏜️',
      'cave': '🎪', 'castle': '🏰', 'palace': '🏰',
      'tower': '🏭', 'city': '🏙️', 'town': '🏘️',
      'village': '🏘️', 'house': '🏠', 'home': '🏡',
      'apartment': '🏢', 'building': '🏢', 'office': '🏢',
      'shop': '🏪', 'store': '🏪', 'market': '🏬',
      'school': '🏫', 'university': '🎓', 'library': '🏛️',
      'hospital': '🏥', 'church': '⛪', 'temple': '🛕',
      'bridge': '🌉', 'road': '🛣️', 'path': '🛣️',
      'garden': '🌻', 'park': '🏞️', 'farm': '🌾',
      'phone': '📱', 'smartphone': '📱', 'computer': '💻',
      'lab': '🔬', 'laboratory': '🔬', 'factory': '🏭',
      'restaurant': '🍽️', 'cafe': '☕', 'bar': '🍺',
      'hotel': '🏨', 'room': '🏠', 'bedroom': '🛏️',
      'kitchen': '🍳', 'date': '💑', 'night': '🌃', 'venue': '🏢'
    },
    'adventure': {
      'quest': '🎯', 'journey': '🚴', 'travel': '✈️',
      'adventure': '🎵', 'battle': '⚔️', 'fight': '🥊',
      'war': '⚔️', 'duel': '🥊', 'challenge': '🎯',
      'race': '🏃', 'chase': '🏃', 'escape': '🚴',
      'rescue': '🚑', 'mission': '💯', 'discovery': '🔍',
      'secret': '🔐', 'mystery': '❓', 'puzzle': '🧩',
      'trap': '🔧', 'danger': '⚠️', 'crisis': '🚨',
      'emergency': '🚨', 'surprise': '🎉', 'twist': '💫',
      'revelation': '💡', 'betrayal': '🗡️', 'alliance': '🤝',
      'friendship': '🤝', 'love': '💔', 'romance': '💕',
      'wedding': '💒', 'marriage': '💍', 'proposal': '💍',
      'kiss': '💋', 'embrace': '🤗', 'meeting': '🤝',
      'reunion': '🤗', 'farewell': '👋', 'departure': '👋',
      'arrival': '📅', 'return': '🏠', 'glitch': '💥',
      'confession': '💬', 'evolution': '🤖', 'choice': '🧮',
      'decision': '🧮', 'test': '📝', 'trial': '⚖️',
      'verdict': '⚖️', 'justice': '⚖️', 'truth': '💯',
      'lie': '🤥', 'deception': '🤥', 'confrontation': '😤',
      'argument': '💬', 'negotiation': '🤝', 'agreement': '🤝',
      'contract': '📝', 'deal': '🤝', 'investment': '💰',
      'opportunity': '💡', 'risk': '🎲', 'success': '🏆',
      'failure': '💩', 'victory': '🏆', 'defeat': '😔',
      'ending': '🎭', 'beginning': '🎭', 'awakening': '💡',
      'transformation': '🦋', 'rebirth': '🐣', 'healing': '💖',
      'recovery': '💖', 'growth': '🌱', 'learning': '📚',
      'teaching': '🏫', 'research': '🔬', 'experiment': '🧪',
      'invention': '💡', 'creation': '🎨', 'destruction': '💥',
      'chaos': '💥', 'order': '⚖️', 'peace': '📝',
      'harmony': '🎭', 'balance': '⚖️'
    },
    'equipment': {
      'sword': '⚔️', 'weapon': '🗡️', 'shield': '🛡️',
      'armor': '🛡️', 'helmet': '🛡️', 'bow': '🏹',
      'arrow': '🏹', 'staff': '🧙', 'wand': '✨',
      'magic': '✨', 'spell': '✨', 'potion': '⚗️',
      'elixir': '⚗️', 'poison': '☠️', 'antidote': '💊',
      'medicine': '💊', 'healing': '💖', 'food': '🍔',
      'drink': '🍺', 'water': '💧', 'bread': '🍞',
      'meat': '🍖', 'fruit': '🍎', 'gold': '💰',
      'money': '💰', 'coin': '🪙', 'treasure': '💼',
      'gem': '💎', 'jewel': '💎', 'ring': '💍',
      'crown': '👑', 'key': '🔑', 'lock': '🔒',
      'door': '🚪', 'gate': '🚪', 'map': '🗺️',
      'compass': '🧭', 'book': '📖', 'scroll': '📜',
      'letter': '📧', 'message': '📧', 'phone': '📱',
      'smartphone': '📱', 'computer': '💻', 'laptop': '💻',
      'tablet': '💻', 'camera': '📷', 'tool': '🔧',
      'hammer': '🔨', 'axe': '🪓', 'pickaxe': '⛏️',
      'rope': '🪢', 'ladder': '🪜', 'torch': '🔦',
      'lamp': '💡', 'light': '💡', 'candle': '🕯️',
      'fire': '🔥', 'flame': '🔥', 'ice': '❄️',
      'crystal': '💎', 'stone': '🪨', 'rock': '🪨',
      'wood': '🪵', 'metal': '⛓️', 'fabric': '🪢',
      'cloth': '🪢', 'clothing': '👕', 'cloak': '🧥',
      'boots': '👢', 'gloves': '🧤', 'hat': '🎩',
      'necklace': '📿', 'bracelet': '📿', 'earring': '💎',
      'watch': '⌚', 'clock': '🕐', 'time': '⏳',
      'hourglass': '⏳', 'calendar': '📅', 'date': '📅',
      'pen': '📝', 'pencil': '✏️', 'paper': '📄',
      'note': '📝', 'diary': '📓', 'journal': '📓',
      'photo': '📷', 'picture': '🎨', 'painting': '🎨',
      'drawing': '🎨', 'music': '🎵', 'song': '🎵',
      'instrument': '🎸', 'guitar': '🎸', 'piano': '🎹',
      'violin': '🎻', 'drum': '🥁', 'honesty': '💯',
      'acceptance': '🤝', 'love': '❤️', 'courage': '💖',
      'wisdom': '📜', 'hope': '🌟', 'faith': '🌟',
      'trust': '🤝', 'loyalty': '💯', 'honor': '🏆',
      'freedom': '📝', 'joy': '😄', 'happiness': '😃',
      'sadness': '😢', 'anger': '😠', 'fear': '😨',
      'strength': '💪', 'power': '⚡', 'energy': '⚡',
      'spirit': '👻', 'soul': '👻', 'heart': '❤️',
      'mind': '🧠', 'body': '🦴', 'life': '🌱',
      'death': '☠️', 'immortality': '☠️', 'eternity': '♾️',
      'infinity': '♾️', 'memory': '🧠', 'knowledge': '📚',
      'skill': '💪', 'talent': '✨', 'gift': '🎁',
      'present': '🎁', 'surprise': '🎉', 'mystery': '❓',
      'riddle': '❓', 'clue': '🔍', 'evidence': '📄',
      'proof': '📄', 'document': '📄', 'file': '📄',
      'folder': '📂', 'case': '💼', 'bag': '👜',
      'backpack': '🎒', 'suitcase': '🧳', 'luggage': '🧳',
      'vehicle': '🚗', 'car': '🚗', 'truck': '🚚',
      'bus': '🚌', 'train': '🚄', 'plane': '✈️',
      'boat': '⛵', 'ship': '🚢', 'bicycle': '🚲',
      'motorcycle': '🏍️', 'horse': '🐴', 'pet': '🐕',
      'dog': '🐕', 'cat': '🐱', 'bird': '🐦',
      'fish': '🐟', 'dragon': '🐉', 'unicorn': '🦄',
      'phoenix': '🔥', 'wolf': '🐺', 'lion': '🦁',
      'bear': '🐻', 'fox': '🦊', 'owl': '🦉',
      'snake': '🐍', 'spider': '🕷️', 'bat': '🦇',
      'rat': '🐀', 'mouse': '🐭', 'rabbit': '🐰',
      'deer': '🦌', 'eagle': '🦅', 'hawk': '🦅',
      'raven': '🐦', 'crow': '🐦'
    }
  };
  
  const nameIcons = PLOT_CARD_NAME_ICONS[subType];
  if (nameIcons && name) {
    const lowerName = name.toLowerCase();
    for (const [keyword, icon] of Object.entries(nameIcons)) {
      if (lowerName.includes(keyword)) {
        return icon;
      }
    }
  }
  
  return PLOT_CARD_ICONS[subType] || '🎭';
}

function extractKeywordsFromContent(content, characters, bookType, isZh) {
  const keywords = new Set();
  
  const THEME_KEYWORDS = {
    en: {
      'AI': ['artificial intelligence', 'AI', 'machine learning', 'algorithm', 'automation', 'robot', 'technology'],
      'creativity': ['creativity', 'art', 'writing', 'music', 'painting', 'story', 'novel', 'book'],
      'consciousness': ['consciousness', 'mind', 'awareness', 'dream', 'memory', 'thought'],
      'human': ['human', 'humanity', 'person', 'people', 'relationship', 'love', 'family'],
      'work': ['work', 'job', 'career', 'profession', 'business', 'company', 'economy'],
      'future': ['future', 'tomorrow', 'change', 'evolution', 'progress', 'technology'],
      'justice': ['justice', 'law', 'court', 'rights', 'ethics', 'fairness', 'truth'],
      'memory': ['memory', 'remember', 'forget', 'past', 'history', 'experience']
    },
    zh: {
      'AI': ['人工智能', 'AI', '机器学习', '算法', '自动化', '机器人', '科技'],
      'creativity': ['创造力', '艺术', '写作', '音乐', '绘画', '故事', '小说', '书籍'],
      'consciousness': ['意识', '思维', '觉醒', '梦境', '记忆', '思想'],
      'human': ['人类', '人性', '人', '关系', '爱', '家庭'],
      'work': ['工作', '职业', '事业', '商业', '公司', '经济'],
      'future': ['未来', '明天', '变化', '进化', '进步', '科技'],
      'justice': ['正义', '法律', '法庭', '权利', '伦理', '公平', '真相'],
      'memory': ['记忆', '回忆', '遗忘', '过去', '历史', '经历']
    }
  };
  
  // 不再将角色名字作为keywords，因为角色名字没有SEO价值
  // characters.forEach(c => {
  //   if (c.name && c.name.length > 1) {
  //     keywords.add(c.name);
  //   }
  // });
  
  const lowerContent = content.toLowerCase();
  
  Object.entries(THEME_KEYWORDS[isZh ? 'zh' : 'en']).forEach(([theme, words]) => {
    words.forEach(word => {
      if (lowerContent.includes(word.toLowerCase())) {
        keywords.add(theme);
      }
    });
  });
  
  const typeKeywords = {
    en: { adventure: 'adventure', fantasy: 'fantasy', romance: 'romance', business: 'business' },
    zh: { adventure: '冒险', fantasy: '奇幻', romance: '言情', business: '职场' }
  };
  if (bookType && typeKeywords[isZh ? 'zh' : 'en'][bookType]) {
    keywords.add(typeKeywords[isZh ? 'zh' : 'en'][bookType]);
  }
  
  keywords.add(isZh ? 'AI故事' : 'AI story');
  keywords.add(isZh ? '互动故事' : 'interactive story');
  
  return Array.from(keywords).slice(0, 8).join(', ');
}

function formatParagraph(text, isZh) {
  let formatted = text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  const dialoguePattern = /^([^:]+):\s*"([^"]+)"$/;
  const match = formatted.match(dialoguePattern);
  
  if (match) {
    return `<div class="dialogue-block"><div class="speaker">${match[1]}:</div><div class="speech">"${match[2]}"</div></div>`;
  }
  
  return formatted;
}

function formatSingleChapterContent(chapter, isZh, romanNumerals) {
  if (!chapter) {
    return `<p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 本章完 —' : '— End of Chapter —'}</p>`;
  }
  
  const content = chapter.content || '';
  const paragraphs = content.split(/\n\n|\n/).filter(p => p.trim());
  
  // 从章节标题中移除 "Chapter XX:" 前缀
  let chapterName = chapter.title || '';
  chapterName = chapterName.replace(/^Chapter\s+\d+:\s*/i, '').trim();
  
  let html = `<div class="manuscript-title">
    <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[chapter.orderNum - 1] || chapter.orderNum}</div>
    <div class="chapter-name">${chapterName}</div>
  </div>
  <div class="manuscript-text">`;
  
  paragraphs.forEach((p, i) => {
    if (i === 0) {
      html += `<p><span class="drop-cap">${p.charAt(0)}</span>${formatParagraph(p.slice(1), isZh)}</p>\n`;
    } else {
      html += `<p>${formatParagraph(p, isZh)}</p>\n`;
    }
  });
  
  html += '</div>';
  return html;
}

function generateBookHTML(book, characters, chapters, plotCards, seoData) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const typeName = (TYPE_NAMES[lang] && TYPE_NAMES[lang][book.type]) || book.type;
  const typeIcon = TYPE_ICONS[book.type] || '📖';
  
  const bookPlotCards = plotCards.filter(p => p.bookId === book.bookId);
  
  const allContent = chapters.map(c => c.content).join(' ');
  const fallbackKeywords = extractKeywordsFromContent(allContent, characters, book.type, isZh);
  
  const keywords = seoData?.keywords?.length > 0 ? seoData.keywords.join(', ') : fallbackKeywords;
  const metaDescription = seoData?.metaDescription || (isZh ? book.title + ' - AI互动故事' : book.title + ' - AI Interactive Story');
  
  const characterSchema = characters.map(c => ({
    '@type': 'Person',
    name: c.name,
    description: `${c.roleType} - ${c.personality}`
  }));
  
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  const baseUrl = 'https://storybook-adventures.com';
  const bookUrl = `${baseUrl}/books/${book.bookId}`;
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${book.title} - StoryBook</title>
  <meta name="description" content="${metaDescription}">
  <meta name="keywords" content="${keywords}">
  <meta property="og:title" content="${book.title} - StoryBook">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:type" content="book">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
  <meta property="og:locale:alternate" content="${isZh ? 'en_US' : 'zh_CN'}">
  <link rel="alternate" hreflang="en" href="${bookUrl}?lang=en">
  <link rel="alternate" hreflang="zh" href="${bookUrl}?lang=zh">
  <link rel="alternate" hreflang="x-default" href="${bookUrl}">
  <link rel="canonical" href="${bookUrl}">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/themes.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "${book.title}",
    "genre": "${typeName}",
    "inLanguage": "${isZh ? 'zh' : 'en'}",
    "author": { "@type": "Organization", "name": "StoryBook" },
    "character": ${JSON.stringify(characterSchema)},
    "numberOfPages": "${chapters.length}"
  }
  </script>
  <style>
    .book-opening-page {
      height: 100vh;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 2000px;
      overflow: hidden;
    }
    
    .book-container {
      position: relative;
      width: 90%;
      max-width: 1200px;
      height: 80vh;
      min-height: 600px;
      display: flex;
      justify-content: center;
    }
    
    .book-spine {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 100%;
      background: linear-gradient(90deg, 
        #2a1a0a 0%, 
        #4a3a2a 20%, 
        #3a2a1a 50%, 
        #4a3a2a 80%, 
        #2a1a0a 100%);
      border-radius: 5px;
      z-index: 10;
      box-shadow: 
        0 0 20px rgba(0, 0, 0, 0.5),
        inset 0 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .book-spine::before {
      content: '';
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 80%;
      background: linear-gradient(180deg, 
        #8B4513 0%, 
        #A0522D 50%, 
        #8B4513 100%);
      border-radius: 2px;
    }
    
    .book-spine-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      white-space: nowrap;
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #D4AF37;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      letter-spacing: 2px;
    }
    
    .book-page {
      position: absolute;
      width: calc(50% - 30px);
      height: 100%;
      background: #f4e4bc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    }
    
    .book-page.left {
      left: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .book-page.right {
      right: 0;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
    .parchment-texture {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(ellipse at top left, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at center, transparent 0%, rgba(139, 90, 43, 0.05) 100%);
      pointer-events: none;
    }
    
    .page-edge {
      position: absolute;
      pointer-events: none;
    }
    
    .page-edge.top {
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(180deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(0deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.left {
      top: 0;
      left: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.right {
      top: 0;
      right: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(270deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-content {
      position: relative;
      height: 100%;
      padding: 30px;
      overflow-y: auto;
      color: #2a1810;
      z-index: 1;
    }
    
    .view-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(139, 90, 43, 0.3);
    }
    
    .view-tab {
      padding: 8px 20px;
      background: rgba(139, 90, 43, 0.1);
      border: 2px solid rgba(139, 90, 43, 0.3);
      border-radius: 8px;
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #4a3a2a;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .view-tab:hover {
      background: rgba(139, 90, 43, 0.2);
      border-color: #8B4513;
    }
    
    .view-tab.active {
      background: rgba(139, 90, 43, 0.3);
      border-color: #8B4513;
      color: #2a1810;
    }
    
    .book-info-header {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: rgba(139, 90, 43, 0.1);
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .book-cover-small {
      width: 80px;
      height: 110px;
      background: linear-gradient(135deg, #2a4a2a 0%, #1a2a1a 100%);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    
    .book-cover-small span {
      font-size: 36px;
    }
    
    .book-meta-info h2 {
      font-family: 'MedievalSharp', cursive;
      font-size: 20px;
      color: #2a1810;
      margin-bottom: 5px;
    }
    
    .book-meta-info .type-badge {
      display: inline-block;
      padding: 3px 10px;
      background: #8B4513;
      color: #f4e4bc;
      border-radius: 4px;
      font-size: 10px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    
    .book-meta-info .stats {
      display: flex;
      gap: 15px;
      font-size: 12px;
      color: #4a3a2a;
    }
    
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    .action-btn {
      padding: 10px 20px;
      background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
      border: 2px solid #D4AF37;
      border-radius: 8px;
      font-family: 'MedievalSharp', cursive;
      font-size: 13px;
      color: #f4e4bc;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
    }
    
    .action-btn-secondary {
      background: transparent;
      border: 2px solid #8B4513;
      color: #4a3a2a;
    }
    
    .action-btn-secondary:hover {
      background: rgba(139, 69, 19, 0.1);
    }
    
    .action-btn-primary {
      background: linear-gradient(180deg, #D4AF37 0%, #B8860B 100%);
      border: 2px solid #FFD700;
      color: #1a1008;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 20px;
      min-width: 160px;
    }
    
    .action-btn-primary:hover {
      background: linear-gradient(180deg, #FFD700 0%, #D4AF37 100%);
      box-shadow: 0 4px 20px rgba(212, 175, 55, 0.5);
    }
    
    .action-btn-primary .btn-main {
      font-size: 13px;
      font-weight: bold;
      line-height: 1.3;
    }
    
    .action-btn-primary .btn-sub {
      font-size: 10px;
      opacity: 0.8;
      font-weight: normal;
      line-height: 1.2;
    }
    
    .chapter-toc {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .chapter-toc-item {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: rgba(139, 90, 43, 0.1);
      border: 1px solid rgba(139, 90, 43, 0.2);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      color: #2a1810;
      margin-bottom: 8px;
      width: 100%;
    }
    
    .chapter-toc-item:hover {
      background: rgba(139, 90, 43, 0.2);
      transform: translateX(5px);
    }
    
    .chapter-toc-item .chapter-number {
      font-family: 'MedievalSharp', cursive;
      font-size: 12px;
      color: #8B4513;
      min-width: 60px;
      flex-shrink: 0;
    }
    
    .chapter-toc-item .chapter-dots {
      display: none !important;
    }
    
    .chapter-toc-item .chapter-title {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      white-space: nowrap;
      flex-shrink: 0;
      flex-grow: 0;
      max-width: none;
    }
    
    .character-grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      justify-items: center;
      padding: 15px 0;
    }
    
    .plot-grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      justify-items: center;
      padding: 15px 0;
    }
    
    .hs-card-mini {
      width: 130px;
      height: 170px;
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      border: 2px solid #D4AF37;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hs-card-mini:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    }
    
    @media (max-width: 768px) {
      .book-opening-page {
        height: auto;
        min-height: 100vh;
        padding-top: 0;
        padding-bottom: 80px;
        overflow-x: hidden;
      }
      
      .book-container {
        width: 100%;
        height: auto;
        min-height: auto;
        flex-direction: column;
        padding-top: 0;
      }
      
      .book-spine {
        display: none;
      }
      
      .book-page {
        position: relative;
        width: 100%;
        height: auto;
        min-height: auto;
        margin-bottom: 0;
        border-radius: 0;
        box-shadow: none;
        padding-top: 50px;
      }
      
      .book-page.left,
      .book-page.right {
        border-radius: 0;
      }
      
      .book-page.left {
        display: block;
      }
      
      .book-page.right {
        display: none;
      }
      
      .page-content {
        padding: 15px 12px;
        padding-bottom: 35px;
      }
      
      .book-info-header {
        flex-direction: row;
        gap: 12px;
        padding: 12px;
        margin-bottom: 15px;
      }
      
      .book-cover-small {
        width: 60px;
        height: 80px;
        flex-shrink: 0;
      }
      
      .book-cover-small span {
        font-size: 28px;
      }
      
      .book-meta-info h2 {
        font-size: 16px;
        margin-bottom: 4px;
      }
      
      .book-meta-info .stats {
        flex-wrap: wrap;
        gap: 8px;
        font-size: 11px;
      }
      
      .action-buttons {
        flex-wrap: nowrap;
        gap: 6px;
        margin-top: 10px;
      }
      
      .action-btn {
        padding: 4px 8px;
        font-size: 9px;
        min-height: 28px;
        white-space: nowrap;
      }
      
      .action-btn-primary .btn-main {
        font-size: 9px;
      }
      
      .action-btn-primary .btn-sub {
        font-size: 7px;
      }
      
      .view-tabs {
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 15px;
        padding-bottom: 10px;
      }
      
      .view-tab {
        padding: 6px 12px;
        font-size: 11px;
      }
      
      .chapter-toc-item {
        flex-wrap: wrap;
      }
      
      .chapter-toc-item .chapter-dots {
        display: none;
      }
      
      .chapter-toc-item .chapter-title {
        max-width: 100%;
      }
      
      .hs-card-mini {
        width: 120px;
        height: 160px;
      }
      
      .character-grid-view,
      .plot-grid-view {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 10px 0;
      }
    }
  </style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9288060233934481" crossorigin="anonymous"></script>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
      <a href="../how-to-play" class="navbar-link">${isZh ? '玩法说明' : 'How to Play'}</a>
    </div>
  </nav>
  
  <div class="book-opening-page">
    <div class="book-container">
      <div class="book-spine">
        <span class="book-spine-title">${book.title}</span>
      </div>
      
      <div class="book-page left">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="page-content">
          <div class="book-info-header">
            <div class="book-cover-small">
              <span>${typeIcon}</span>
            </div>
            <div class="book-meta-info">
              <span class="type-badge">${typeName}</span>
              <h2>${book.title}</h2>
              <div class="stats">
                <span>📜 ${chapters.length} ${isZh ? '章节' : 'Chapters'}</span>
                <span>👥 ${characters.length} ${isZh ? '角色' : 'Characters'}</span>
              </div>
              <div class="action-buttons">
                ${chapters.length > 0 ? `<a href="../chapters/${chapters[0].chapterId}" class="action-btn action-btn-secondary">${isZh ? '开始阅读' : 'Start Reading'}</a>` : ''}
                <button class="action-btn action-btn-primary" onclick="importPresetBook()">
                  <span class="btn-main">${isZh ? '续写这个故事' : 'Continue This Story'}</span>
                  <span class="btn-sub">${isZh ? '用卡牌创作新章节' : 'Add chapters with cards'}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="view-tabs">
            <button class="view-tab active" onclick="switchView('chapters', event)">📜 ${isZh ? '章节' : 'Chapters'}</button>
            <button class="view-tab" onclick="switchView('characters', event)">👥 ${isZh ? '角色' : 'Characters'}</button>
            <button class="view-tab" onclick="switchView('plotcards', event)">🃏 ${isZh ? '情节卡牌' : 'Plot Cards'}</button>
          </div>
          
          <div id="leftPageContent">
            <div class="chapter-toc">
              ${chapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => {
                const idx = Math.floor((ch.orderNum - 1) / 2) * 2;
                const pageChapterId = chapters[idx] ? chapters[idx].chapterId : ch.chapterId;
                return `<a href="../chapters/${pageChapterId}" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${i * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <div class="book-page right">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="page-content">
          <div id="rightPageContent">
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="cardModal" class="modal-overlay" onclick="closeCardModal(event)">
    <div class="modal-card-content">
      <button class="modal-close-btn" onclick="closeCardModal()">&times;</button>
      <div class="modal-card-display"></div>
    </div>
  </div>
  
  <script src="../js/api.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
  <script>
    const bookData = {
      bookId: '${book.bookId}',
      title: ${JSON.stringify(book.title)},
      type: '${book.type}',
      chapters: ${JSON.stringify(chapters.map(ch => ({ chapterId: ch.chapterId, title: ch.title, orderNum: ch.orderNum })))},
      characters: ${JSON.stringify(characters.map(c => ({ charId: c.charId, name: c.name, roleType: c.roleType, personality: c.personality, avatar: c.avatar, isProtagonist: c.isProtagonist })))},
      plotCards: ${JSON.stringify(bookPlotCards.map(p => ({ card_id: p.cardId, sub_type: p.sub_type, name: p.name, icon: p.icon, description: p.description })))}
    };
    
    let currentView = 'chapters';
    
    document.addEventListener('DOMContentLoaded', function() {
      document.body.className = 'theme-${book.type}';
      createParticles(document.getElementById('particles'), 30);
      
      renderChaptersOnInit();
    });
    
    function switchView(view, evt) {
      if (view === currentView) return;
      currentView = view;
      
      document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      if (evt && evt.target) {
        evt.target.classList.add('active');
      }
      
      if (view === 'chapters') {
        renderChapters();
      } else if (view === 'characters') {
        renderCharacters();
      } else if (view === 'plotcards') {
        renderPlotCards();
      }
    }
    
    function isMobile() {
      return window.innerWidth <= 768;
    }

    function renderChapters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const chapters = bookData.chapters.sort((a, b) => a.orderNum - b.orderNum);
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const isZh = '${lang}' === 'zh';
      
      function getPageChapterId(chapterOrder) {
        const pageIndex = Math.floor((chapterOrder - 1) / 2);
        return chapters[pageIndex * 2].chapterId;
      }
      
      if (isMobile()) {
        leftContent.innerHTML = '<div class="chapter-toc">' + chapters.map((ch, i) => 
          '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
            '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
            '<span class="chapter-dots"></span>' +
            '<span class="chapter-title">' + ch.title + '</span>' +
          '</a>'
        ).join('') + '</div>';
        rightContent.innerHTML = '';
      } else {
        const half = Math.ceil(chapters.length / 2);
        leftContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(0, half).map((ch, i) => 
          '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
            '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
            '<span class="chapter-dots"></span>' +
            '<span class="chapter-title">' + ch.title + '</span>' +
          '</a>'
        ).join('') + '</div>';
        rightContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(half).map((ch, i) => 
          '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
            '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
            '<span class="chapter-dots"></span>' +
            '<span class="chapter-title">' + ch.title + '</span>' +
          '</a>'
        ).join('') + '</div>';
      }
    }
    
    function renderChaptersOnInit() {
      if (!isMobile()) {
        renderChapters();
      }
    }
    
    function renderPlotCards() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const allCards = bookData.plotCards || [];
      
      const validSubTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      const cards = allCards.filter(c => validSubTypes.includes(c.sub_type));
      
      function renderPlotCard(card, index) {
        return '<div class="hs-card-mini plot-card" onclick="showPlotCardDetail(\\'' + card.card_id + '\\')" style="animation: fadeIn 0.5s ease-out ' + (index * 0.1) + 's backwards;">' +
          '<div style="font-size: 36px;">' + (card.icon || '🎭') + '</div>' +
          '<div style="color: #f4e4bc; font-family: Cinzel, serif; font-size: 13px; margin-top: 10px; text-align: center;">' + card.name + '</div>' +
          '<div style="color: #ccc; font-size: 11px; margin-top: 5px; text-align: center; padding: 0 10px;">' + (card.description || '') + '</div>' +
        '</div>';
      }
      
      if (isMobile()) {
        leftContent.innerHTML = '<div class="plot-grid-view">' + cards.map((card, i) => renderPlotCard(card, i)).join('') + '</div>';
        rightContent.innerHTML = '';
      } else {
        const half = Math.ceil(cards.length / 2);
        leftContent.innerHTML = '<div class="plot-grid-view">' + cards.slice(0, half).map((card, i) => renderPlotCard(card, i)).join('') + '</div>';
        rightContent.innerHTML = '<div class="plot-grid-view">' + cards.slice(half).map((card, i) => renderPlotCard(card, i + half)).join('') + '</div>';
      }
    }
    
    function showPlotCardDetail(cardId) {
      const card = bookData.plotCards.find(c => c.card_id === cardId);
      if (!card) return;
      
      const modal = document.getElementById('cardModal');
      const content = modal.querySelector('.modal-card-display');
      
      content.innerHTML = 
        '<div class="hs-card-mini plot-card" style="transform: none; margin: 0 auto;">' +
          '<div style="font-size: 48px;">' + (card.icon || '🎭') + '</div>' +
          '<div style="color: #f4e4bc; font-family: Cinzel, serif; font-size: 18px; margin-top: 15px;">' + card.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 12px; margin-top: 8px;">' + card.sub_type + '</div>' +
          '<div style="color: #ccc; font-size: 13px; margin-top: 10px; padding: 0 20px; line-height: 1.5;">' + (card.description || '') + '</div>' +
        '</div>';
      
      modal.classList.add('active');
    }
    
    function renderCharacters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const characters = bookData.characters;
      
      if (isMobile()) {
        leftContent.innerHTML = '<div class="character-grid-view">' + characters.map((c, i) => 
          '<div class="hs-card-mini" onclick="showCharacterDetail(' + i + ')" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
            '<div style="font-size: 48px;">' + (c.avatar || '👤') + '</div>' +
            '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 14px; margin-top: 10px;">' + c.name + '</div>' +
            '<div style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">' + c.roleType + '</div>' +
          '</div>'
        ).join('') + '</div>';
        rightContent.innerHTML = '';
      } else {
        const half = Math.ceil(characters.length / 2);
        leftContent.innerHTML = '<div class="character-grid-view">' + characters.slice(0, half).map((c, i) => 
          '<div class="hs-card-mini" onclick="showCharacterDetail(' + i + ')" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
            '<div style="font-size: 48px;">' + (c.avatar || '👤') + '</div>' +
            '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 14px; margin-top: 10px;">' + c.name + '</div>' +
            '<div style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">' + c.roleType + '</div>' +
          '</div>'
        ).join('') + '</div>';
        rightContent.innerHTML = '<div class="character-grid-view">' + characters.slice(half).map((c, i) => 
          '<div class="hs-card-mini" onclick="showCharacterDetail(' + (i + half) + ')" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
            '<div style="font-size: 48px;">' + (c.avatar || '👤') + '</div>' +
            '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 14px; margin-top: 10px;">' + c.name + '</div>' +
            '<div style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">' + c.roleType + '</div>' +
          '</div>'
        ).join('') + '</div>';
      }
    }
    
    function showCharacterDetail(index) {
      const char = bookData.characters[index];
      const modal = document.getElementById('cardModal');
      const content = modal.querySelector('.modal-card-display');
      
      content.innerHTML = 
        '<div class="hs-card-mini" style="transform: none; margin: 0 auto;">' +
          '<div style="font-size: 64px;">' + (char.avatar || '👤') + '</div>' +
          '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 18px; margin-top: 15px;">' + char.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 14px; margin-top: 8px;">' + char.roleType + '</div>' +
          (char.personality ? '<div style="color: #ccc; font-size: 12px; margin-top: 10px; padding: 0 20px;">' + char.personality + '</div>' : '') +
        '</div>';
      
      modal.classList.add('active');
    }
    
    function closeCardModal(event) {
      if (!event || event.target.classList.contains('modal-overlay')) {
        document.getElementById('cardModal').classList.remove('active');
      }
    }
    
    async function importPresetBook() {
      const btn = event.target;
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        window.location.href = '../login?redirect=' + encodeURIComponent(window.location.href);
        return;
      }
      
      btn.disabled = true;
      btn.innerHTML = '<span class="btn-main">' + '${isZh ? '处理中...' : 'Processing...'}' + '</span>';
      
      try {
        const response = await fetch('/api/books/' + bookData.bookId + '/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });
        
        if (response.ok) {
          const result = await response.json();
          btn.innerHTML = '<span class="btn-main">' + '${isZh ? '已添加到书架！' : 'Added to Shelf!'}' + '</span>';
          setTimeout(() => {
            window.location.href = '../book?id=' + result.data.new_book_id;
          }, 1000);
        } else {
          throw new Error('Import failed');
        }
      } catch (error) {
        btn.innerHTML = '<span class="btn-main">' + '${isZh ? '操作失败' : 'Failed'}' + '</span>';
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = '<span class="btn-main">${isZh ? '续写这个故事' : 'Continue This Story'}</span><span class="btn-sub">${isZh ? '用卡牌创作新章节' : 'Add chapters with cards'}</span>';
        }, 2000);
      }
    }
  </script>
</body>
</html>`;
}

function generateChapterHTML(book, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, characters, totalChapters, currentPage, totalPages, seoData) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  const leftContent = formatSingleChapterContent(leftChapter, isZh, romanNumerals);
  const rightContent = rightChapter 
    ? formatSingleChapterContent(rightChapter, isZh, romanNumerals)
    : `<div class="manuscript-text"><p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 未完待续 —' : '— To Be Continued —'}</p></div>`;
  
  const prevUrl = prevPageFirstChapter 
    ? `${prevPageFirstChapter.chapterId}`
    : `../books/${book.bookId}`;
  const prevLabel = prevPageFirstChapter 
    ? (isZh ? '上一页' : 'Previous')
    : (isZh ? '目录' : 'Contents');
  
  const nextUrl = nextPageFirstChapter 
    ? `${nextPageFirstChapter.chapterId}`
    : null;
  const nextLabel = isZh ? '下一页' : 'Next';
  
  const chapterContent = (leftChapter?.content || '') + ' ' + (rightChapter?.content || '');
  const fallbackKeywords = extractKeywordsFromContent(chapterContent, characters, book.type, isZh);
  
  let chapterKeywords = fallbackKeywords;
  let chapterDescription = `${isZh ? '阅读' : 'Read'} ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}`;
  
  if (seoData?.chapterSEO) {
    const leftChapterSEO = seoData.chapterSEO[leftChapter.orderNum];
    const rightChapterSEO = rightChapter ? seoData.chapterSEO[rightChapter.orderNum] : null;
    
    if (leftChapterSEO?.keywords) {
      chapterKeywords = leftChapterSEO.keywords + (rightChapterSEO?.keywords ? ', ' + rightChapterSEO.keywords : '');
    }
    if (leftChapterSEO?.metaDescription) {
      chapterDescription = leftChapterSEO.metaDescription;
    }
  }
  
  const baseUrl = 'https://storybook-adventures.com';
  const chapterUrl = `${baseUrl}/chapters/${leftChapter.chapterId}`;
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isZh ? '第' : 'Chapter '}${romanNumerals[leftChapter.orderNum - 1] || leftChapter.orderNum}${rightChapter ? (isZh ? '、' : ' & ') + (romanNumerals[rightChapter.orderNum - 1] || rightChapter.orderNum) : ''}: ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title} - StoryBook</title>
  <meta name="description" content="${chapterDescription}">
  <meta name="keywords" content="${chapterKeywords}">
  <meta property="og:title" content="${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}">
  <meta property="og:description" content="${chapterDescription}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
  <meta property="og:locale:alternate" content="${isZh ? 'en_US' : 'zh_CN'}">
  <link rel="alternate" hreflang="en" href="${chapterUrl}?lang=en">
  <link rel="alternate" hreflang="zh" href="${chapterUrl}?lang=zh">
  <link rel="alternate" hreflang="x-default" href="${chapterUrl}">
  <link rel="canonical" href="${chapterUrl}">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/themes.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "name": "${leftChapter.title}",
    "isPartOf": {
      "@type": "Book",
      "name": "${book.title}",
      "genre": "${TYPE_NAMES[lang][book.type] || book.type}"
    },
    "position": ${leftChapter.orderNum},
    "inLanguage": "${isZh ? 'zh' : 'en'}"
  }
  </script>
  <style>
    .book-reader-page {
      height: 100vh;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      perspective: 2000px;
      overflow: hidden;
    }
    
    .reading-book-container {
      position: relative;
      width: 95%;
      max-width: 1400px;
      height: calc(100vh - 160px);
      min-height: 500px;
      display: flex;
      justify-content: center;
    }
    
    .reading-spine {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 100%;
      background: linear-gradient(90deg, 
        #1a0a00 0%, 
        #3a2a1a 15%, 
        #2a1a0a 50%, 
        #3a2a1a 85%, 
        #1a0a00 100%);
      border-radius: 5px;
      z-index: 10;
      box-shadow: 
        0 0 30px rgba(0, 0, 0, 0.6),
        inset 0 0 15px rgba(0, 0, 0, 0.4);
    }
    
    .reading-spine::before {
      content: '';
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 90%;
      background: linear-gradient(180deg, 
        #654321 0%, 
        #8B4513 30%,
        #A0522D 50%,
        #8B4513 70%,
        #654321 100%);
      border-radius: 3px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
    
    .reading-page {
      position: absolute;
      width: calc(50% - 35px);
      height: 100%;
      background: #f4e4bc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    }
    
    .reading-page.left {
      left: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .reading-page.right {
      right: 0;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
    .parchment-texture {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(ellipse at top left, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at center, transparent 0%, rgba(139, 90, 43, 0.05) 100%);
      pointer-events: none;
    }
    
    .page-edge {
      position: absolute;
      pointer-events: none;
    }
    
    .page-edge.top {
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(180deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(0deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.left {
      top: 0;
      left: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.right {
      top: 0;
      right: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(270deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .reading-content {
      position: relative;
      height: 100%;
      padding: 40px 35px;
      overflow-y: auto;
      overflow-x: hidden;
      color: #1a1008;
      z-index: 1;
      scroll-behavior: smooth;
    }
    
    .reading-content::-webkit-scrollbar {
      width: 10px;
    }
    
    .reading-content::-webkit-scrollbar-track {
      background: rgba(139, 90, 43, 0.12);
      border-radius: 5px;
      border: 1px solid rgba(139, 90, 43, 0.15);
      margin: 10px 0;
    }
    
    .reading-content::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
      border-radius: 5px;
      border: 2px solid rgba(244, 228, 188, 0.4);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .reading-content::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #A0522D 0%, #8B4513 100%);
    }
    
    .reading-content::-webkit-scrollbar-corner {
      background: transparent;
    }
    
    .manuscript-title {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(139, 90, 43, 0.4);
    }
    
    .manuscript-title .chapter-num {
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #8B4513;
      letter-spacing: 4px;
      margin-bottom: 8px;
    }
    
    .manuscript-title .chapter-name {
      font-family: 'MedievalSharp', cursive;
      font-size: 28px;
      color: #2a1810;
      text-shadow: 1px 1px 0 rgba(139, 90, 43, 0.2);
    }
    
    .manuscript-title::before,
    .manuscript-title::after {
      content: '❧';
      display: block;
      font-size: 24px;
      color: #8B4513;
      opacity: 0.7;
    }
    
    .manuscript-title::after {
      margin-top: 10px;
    }
    
    .manuscript-text {
      font-family: 'Spectral', serif;
      font-size: 18px;
      line-height: 1.9;
      color: #1a1008;
    }
    
    .manuscript-text p {
      margin-bottom: 20px;
      text-align: justify;
    }
    
    .drop-cap {
      font-family: 'Pirata One', cursive;
      font-size: 4.5em;
      float: left;
      line-height: 0.8;
      padding-right: 12px;
      padding-top: 8px;
      color: #8B4513;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .dialogue-block {
      margin: 25px 0;
      padding: 15px 20px;
      background: rgba(139, 90, 43, 0.08);
      border-left: 4px solid #8B4513;
      border-radius: 0 8px 8px 0;
    }
    
    .dialogue-block .speaker {
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #8B4513;
      margin-bottom: 8px;
    }
    
    .dialogue-block .speech {
      font-style: italic;
      color: #2a1810;
    }
    
    .section-divider {
      text-align: center;
      margin: 30px 0;
      color: #8B4513;
      font-size: 20px;
      letter-spacing: 10px;
    }
    
    .section-divider::before {
      content: '═══';
    }
    
    .reading-nav-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, rgba(15, 15, 35, 0.95) 0%, rgba(10, 10, 25, 0.98) 100%);
      backdrop-filter: blur(10px);
      border-top: 2px solid rgba(255, 215, 0, 0.3);
      padding: 15px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
    }
    
    .scroll-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 25px;
      background: linear-gradient(180deg, #f4e4bc 0%, #d4c4a0 100%);
      border: 2px solid #8B4513;
      border-radius: 8px;
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #2a1810;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 3px 0 #654321,
        0 5px 10px rgba(0, 0, 0, 0.2);
      text-decoration: none;
    }
    
    .scroll-nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 5px 0 #654321,
        0 8px 15px rgba(0, 0, 0, 0.3);
    }
    
    .nav-info {
      color: #a0a0a0;
      font-family: 'Cinzel', serif;
    }
    
    .nav-info a {
      color: #FFD700;
      text-decoration: none;
    }
    
    .nav-info a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .book-reader-page {
        height: auto;
        min-height: 100vh;
        padding-top: 0;
        padding-bottom: 70px;
        overflow-x: hidden;
      }
      
      .reading-book-container {
        width: 100%;
        height: auto;
        min-height: auto;
        flex-direction: column;
        padding-top: 0;
      }
      
      .reading-spine {
        display: none;
      }
      
      .reading-page {
        position: relative;
        width: 100%;
        min-height: auto;
        margin-bottom: 0;
        border-radius: 0;
        box-shadow: none;
        padding-top: 50px;
      }
      
      .reading-page.left {
        display: block;
      }
      
      .reading-page.left::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 25px;
        background: linear-gradient(180deg, 
          #1a0a00 0%, 
          #3a2a1a 15%, 
          #2a1a0a 50%, 
          #3a2a1a 85%, 
          #1a0a00 100%);
        box-shadow: 
          0 5px 15px rgba(0, 0, 0, 0.5),
          inset 0 2px 4px rgba(0, 0, 0, 0.3);
        z-index: 5;
      }
      
      .reading-page.left::before {
        content: '';
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, 
          #654321 0%, 
          #8B4513 30%,
          #A0522D 50%,
          #8B4513 70%,
          #654321 100%);
        border-radius: 2px;
        z-index: 6;
      }
      
      .reading-page.right {
        display: none;
      }
      
      .reading-page.right.active {
        display: block;
      }
      
      .reading-content {
        padding: 15px 12px;
        padding-bottom: 35px;
        font-size: 14px;
      }
      
      .manuscript-title {
        margin-bottom: 15px;
        padding-bottom: 10px;
      }
      
      .manuscript-title .chapter-num {
        font-size: 12px;
        margin-bottom: 4px;
      }
      
      .manuscript-title .chapter-name {
        font-size: 18px;
      }
      
      .manuscript-title::before,
      .manuscript-title::after {
        font-size: 18px;
      }
      
      .manuscript-text {
        font-size: 14px;
        line-height: 1.7;
      }
      
      .manuscript-text p {
        margin-bottom: 12px;
      }
      
      .drop-cap {
        font-size: 2.8em;
        padding-right: 8px;
        padding-top: 4px;
      }
      
      .dialogue-block {
        margin: 15px 0;
        padding: 10px 12px;
      }
      
      .dialogue-block .speaker {
        font-size: 12px;
        margin-bottom: 4px;
      }
      
      .section-divider {
        margin: 15px 0;
        font-size: 14px;
        letter-spacing: 5px;
      }
      
      .reading-nav-bar {
        padding: 8px 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(10px);
        z-index: 100;
      }
      
      .scroll-nav-btn {
        padding: 8px 14px;
        font-size: 11px;
        min-height: 40px;
      }
      
      .nav-info {
        font-size: 10px;
      }
    }
    
    @media (max-width: 600px) {
      .reading-content {
        padding: 12px 10px;
        padding-bottom: 15px;
      }
      
      .manuscript-text {
        font-size: 14px;
      }
      
      .manuscript-text p {
        margin-bottom: 10px;
      }
      
      .drop-cap {
        font-size: 2.5em;
        padding-right: 6px;
        padding-top: 2px;
      }
    }
  </style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9288060233934481" crossorigin="anonymous"></script>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
      <a href="../how-to-play" class="navbar-link">${isZh ? '玩法说明' : 'How to Play'}</a>
    </div>
  </nav>
  
  <div class="book-reader-page">
    <div class="reading-book-container">
      <div class="reading-spine"></div>
      
      <div class="reading-page left" id="leftPage">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          ${leftContent}
        </div>
      </div>
      
      <div class="reading-page right" id="rightPage">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          ${rightContent}
        </div>
      </div>
    </div>
  </div>
  
  <div class="reading-nav-bar">
    <a href="${prevUrl}" class="scroll-nav-btn">← ${prevLabel}</a>
    <div class="nav-info">
      <a href="../books/${book.bookId}">${book.title}</a>
      <span style="margin: 0 10px;">|</span>
      ${isZh ? '第' : 'Page '}${currentPage} ${isZh ? '页' : ''} ${isZh ? '' : 'of '}${totalPages}
    </div>
    ${nextUrl 
      ? `<a href="${nextUrl}" class="scroll-nav-btn">${nextLabel} →</a>`
      : `<span class="scroll-nav-btn" style="opacity: 0.5; cursor: default;">${isZh ? '已完结' : 'The End'}</span>`
    }
  </div>
  
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.body.className = 'theme-${book.type}';
      if (typeof createParticles === 'function') {
        createParticles(document.getElementById('particles'), 20);
      }
      
      initMobileNavigation();
    });
    
    function isMobile() {
      return window.innerWidth <= 768;
    }
    
    function initMobileNavigation() {
      if (!isMobile()) return;
      
      const rightPage = document.getElementById('rightPage');
      if (rightPage) {
        rightPage.classList.remove('active');
      }
    }
    
    function toggleRightPage() {
      const rightPage = document.getElementById('rightPage');
      if (!rightPage) return;
      
      if (rightPage.classList.contains('active')) {
        rightPage.classList.remove('active');
        document.getElementById('leftPage').scrollIntoView({ behavior: 'smooth' });
      } else {
        rightPage.classList.add('active');
        rightPage.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    document.addEventListener('click', function(e) {
      if (!isMobile()) return;
      
      const navBtn = e.target.closest('.scroll-nav-btn');
      if (!navBtn) return;
      
      const text = navBtn.textContent.trim();
      const rightPage = document.getElementById('rightPage');
      const isRightVisible = rightPage && rightPage.classList.contains('active');
      
      if (text.includes('${nextLabel}') || text.includes('Next') || text.includes('下一页')) {
        if (isRightVisible) {
          return;
        } else if (rightPage && !isRightVisible) {
          e.preventDefault();
          e.stopPropagation();
          rightPage.classList.add('active');
          rightPage.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (text.includes('${prevLabel}') || text.includes('Previous') || text.includes('上一页')) {
        if (isRightVisible) {
          e.preventDefault();
          e.stopPropagation();
          rightPage.classList.remove('active');
          document.getElementById('leftPage').scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, true);
  </script>
</body>
</html>`;
}

function runQuery(query) {
  const result = execSync(
    `npx wrangler d1 execute storybook_database --local --command "${query.replace(/"/g, '\\"')}" --json`,
    { cwd: path.join(__dirname, '..', '..', '..'), encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  try {
    return JSON.parse(result);
  } catch {
    return null;
  }
}

function parseQueryResult(jsonResult) {
  if (!jsonResult || !jsonResult[0] || !jsonResult[0].results) return [];
  return jsonResult[0].results;
}

async function main() {
  const args = process.argv.slice(2);
  const config = loadConfig();
  
  let bookId = null;
  
  if (args.length > 0) {
    bookId = args[0];
  }
  
  console.log('📚 从数据库生成静态页面...\n');
  console.log(`目标书籍: ${bookId || '所有COO书籍'}\n`);
  
  let booksQuery = `SELECT book_id, title, type, language FROM books WHERE book_id LIKE 'preset-coo-%'`;
  if (bookId) {
    booksQuery = `SELECT book_id, title, type, language FROM books WHERE book_id = '${bookId}'`;
  }
  
  const booksResult = runQuery(booksQuery);
  const books = parseQueryResult(booksResult);
  console.log(`找到 ${books.length} 本书籍\n`);
  
  const booksOutputDir = path.join(FRONTEND_OUTPUT, 'books');
  const chaptersOutputDir = path.join(FRONTEND_OUTPUT, 'chapters');
  
  fs.mkdirSync(booksOutputDir, { recursive: true });
  fs.mkdirSync(chaptersOutputDir, { recursive: true });
  
  let bookCount = 0;
  let chapterCount = 0;
  
  for (const book of books) {
    console.log(`处理: ${book.book_id} - ${book.title}`);
    
    const charsResult = runQuery(`SELECT char_id, name, role_type, personality, avatar, is_protagonist FROM characters WHERE book_id = '${book.book_id}'`);
    const characters = parseQueryResult(charsResult).map(c => ({
      charId: c.char_id,
      name: c.name,
      roleType: c.role_type,
      personality: c.personality,
      avatar: c.avatar || getRoleIcon(c.role_type, config),
      isProtagonist: c.is_protagonist
    }));
    
    const chaptersResult = runQuery(`SELECT chapter_id, title, content, order_num FROM chapters WHERE book_id = '${book.book_id}' ORDER BY order_num`);
    const chapters = parseQueryResult(chaptersResult).map(ch => ({
      chapterId: ch.chapter_id,
      title: ch.title,
      content: ch.content,
      orderNum: ch.order_num
    }));
    
    const plotCardsResult = runQuery(`SELECT card_id, sub_type, name, icon, description FROM plot_cards WHERE book_id = '${book.book_id}'`);
    const plotCards = parseQueryResult(plotCardsResult).map(p => ({
      cardId: p.card_id,
      bookId: book.book_id,
      sub_type: p.sub_type,
      name: p.name,
      icon: p.icon || getPlotCardIcon(p.sub_type, p.name),
      description: p.description
    }));
    
    console.log(`  角色: ${characters.length}, 章节: ${chapters.length}, 情节卡牌: ${plotCards.length}`);
    
    const seoData = loadSEOData(book.book_id);
    if (seoData) {
      console.log(`  SEO: 关键词 ${seoData.keywords.length} 个, 描述 ${seoData.metaDescription.length} 字符`);
    }
    
    const bookData = {
      bookId: book.book_id,
      title: book.title,
      type: book.type,
      language: book.language
    };
    
    const bookHTML = generateBookHTML(bookData, characters, chapters, plotCards, seoData);
    fs.writeFileSync(path.join(booksOutputDir, `${book.book_id}.html`), bookHTML);
    console.log(`  ✓ 生成书籍页面: ${book.book_id}.html`);
    bookCount++;
    
    const totalPages = Math.ceil(chapters.length / 2);
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const leftIndex = pageIndex * 2;
      const rightIndex = leftIndex + 1;
      
      const leftChapter = chapters[leftIndex];
      const rightChapter = rightIndex < chapters.length ? chapters[rightIndex] : null;
      const prevPageFirstChapter = pageIndex > 0 ? chapters[(pageIndex - 1) * 2] : null;
      const nextPageFirstChapter = pageIndex < totalPages - 1 ? chapters[(pageIndex + 1) * 2] : null;
      
      const chapterHTML = generateChapterHTML(bookData, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, characters, chapters.length, pageIndex + 1, totalPages, seoData);
      const filename = `${leftChapter.chapterId}.html`;
      
      fs.writeFileSync(path.join(chaptersOutputDir, filename), chapterHTML);
      console.log(`  ✓ 生成章节: ${filename}`);
      chapterCount++;
      
      if (rightChapter) {
        const rightChapterHTML = generateChapterHTML(bookData, rightChapter, null, leftChapter ? chapters[leftIndex] : null, nextPageFirstChapter, characters, chapters.length, pageIndex + 1, totalPages, seoData);
        const rightFilename = `${rightChapter.chapterId}.html`;
        fs.writeFileSync(path.join(chaptersOutputDir, rightFilename), rightChapterHTML);
        console.log(`  ✓ 生成章节: ${rightFilename}`);
        chapterCount++;
      }
    }
    
    console.log('');
  }
  
  console.log(`========================================`);
  console.log(`完成！共生成 ${bookCount} 个书籍页面, ${chapterCount} 个章节页面`);
  console.log(`========================================`);
  console.log(`输出目录: ${FRONTEND_OUTPUT}`);
}

main().catch(console.error);
