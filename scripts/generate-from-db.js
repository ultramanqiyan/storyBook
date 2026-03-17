import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TYPE_NAMES = {
  zh: { adventure: '冒险', fantasy: '奇幻', romance: '言情', business: '职场' },
  en: { adventure: 'Adventure', fantasy: 'Fantasy', romance: 'Romance', business: 'Business' }
};

const TYPE_ICONS = {
  adventure: '\u{1F5FA}\u{FE0F}',
  fantasy: '\u{1F9D9}',
  romance: '\u{1F495}',
  business: '\u{1F4BC}'
};

const ROLE_TYPE_ICONS = {
  'protagonist': '\u{1F9D1}',
  'Protagonist': '\u{1F9D1}',
  'Main Character': '\u{1F9D1}',
  'AI Assistant': '\u{1F916}',
  'AI': '\u{1F916}',
  'Robot': '\u{1F916}',
  'Scientist': '\u{1F52C}',
  'Researcher': '\u{1F9D1}\u{200D}\u{1F4BC}',
  'Doctor': '\u{1F468}\u{200D}\u{2695}\u{FE0F}',
  'Detective': '\u{1F575}\u{FE0F}',
  'Teacher': '\u{1F468}\u{200D}\u{1F3EB}\u{FE0F}',
  'Student': '\u{1F393}',
  'Artist': '\u{1F3A8}',
  'Musician': '\u{1F3B5}',
  'Writer': '\u{1F4DD}',
  'Journalist': '\u{1F4F0}',
  'Lawyer': '\u{2696}\u{FE0F}',
  'Judge': '\u{2696}\u{FE0F}',
  'Business Owner': '\u{1F4BC}',
  'Entrepreneur': '\u{1F4BC}',
  'Manager': '\u{1F4BC}',
  'CEO': '\u{1F4BC}',
  'Employee': '\u{1F465}',
  'Software Developer': '\u{1F4BB}',
  'Programmer': '\u{1F4BB}',
  'Engineer': '\u{1F4BB}',
  'Marketing Manager': '\u{1F4CA}',
  'default': '\u{1F464}'
};

const PLOT_CARD_ICONS = {
  'weather': '\u{2601}\u{FE0F}',
  'terrain': '\u{1F3D7}\u{FE0F}',
  'adventure': '\u{1F3B5}',
  'equipment': '\u{1F4E6}'
};

const PLOT_CARD_NAME_ICONS = {
  'weather': {
    'dawn': '\u{1F305}',
    'sunrise': '\u{1F305}',
    'morning': '\u{1F305}',
    'sun': '\u{2600}\u{FE0F}',
    'sunny': '\u{2600}\u{FE0F}',
    'sunshine': '\u{2600}\u{FE0F}',
    'cloud': '\u{2601}\u{FE0F}',
    'cloudy': '\u{2601}\u{FE0F}',
    'overcast': '\u{2601}\u{FE0F}',
    'rain': '\u{1F327}\u{FE0F}',
    'rainy': '\u{1F327}\u{FE0F}',
    'storm': '\u{26C8}\u{FE0F}',
    'stormy': '\u{26C8}\u{FE0F}',
    'thunder': '\u{26A1}\u{FE0F}',
    'lightning': '\u{26A1}\u{FE0F}',
    'snow': '\u{2744}\u{FE0F}',
    'snowy': '\u{2744}\u{FE0F}',
    'winter': '\u{2744}\u{FE0F}',
    'wind': '\u{1F32C}\u{FE0F}',
    'windy': '\u{1F32C}\u{FE0F}',
    'fog': '\u{1F32B}\u{FE0F}',
    'foggy': '\u{1F32B}\u{FE0F}',
    'mist': '\u{1F32B}\u{FE0F}',
    'night': '\u{1F319}',
    'moon': '\u{1F319}',
    'star': '\u{2B50}',
    'stars': '\u{2B50}',
    'clear': '\u{1F323}\u{FE0F}',
    'digital': '\u{1F4F1}',
    'emotion': '\u{1F494}',
    'understanding': '\u{1F9E0}',
    'wedding': '\u{1F49D}'
  },
  'terrain': {
    'forest': '\u{1F332}',
    'woods': '\u{1F332}',
    'tree': '\u{1F333}',
    'mountain': '\u{26F0}\u{FE0F}',
    'mountains': '\u{26F0}\u{FE0F}',
    'hill': '\u{26F0}\u{FE0F}',
    'valley': '\u{1F3D4}\u{FE0F}',
    'river': '\u{1F30A}',
    'stream': '\u{1F4A7}',
    'lake': '\u{1F3CA}',
    'ocean': '\u{1F30A}',
    'sea': '\u{1F30A}',
    'beach': '\u{1F3D6}\u{FE0F}',
    'island': '\u{1F3DD}\u{FE0F}',
    'desert': '\u{1F3DC}\u{FE0F}',
    'cave': '\u{1F3AA}',
    'castle': '\u{1F3F0}',
    'palace': '\u{1F3F0}',
    'tower': '\u{1F3ED}',
    'city': '\u{1F3D9}\u{FE0F}',
    'town': '\u{1F3D8}\u{FE0F}',
    'village': '\u{1F3D8}\u{FE0F}',
    'house': '\u{1F3E0}',
    'home': '\u{1F3E1}',
    'apartment': '\u{1F3E2}',
    'building': '\u{1F3EC}',
    'office': '\u{1F3E2}',
    'shop': '\u{1F3EA}',
    'store': '\u{1F3EA}',
    'market': '\u{1F3EC}',
    'school': '\u{1F3EB}',
    'university': '\u{1F393}',
    'library': '\u{1F3DA}\u{FE0F}',
    'hospital': '\u{1F3E5}',
    'church': '\u{26EA}',
    'temple': '\u{1F3DB}\u{FE0F}',
    'bridge': '\u{1F309}',
    'road': '\u{1F6E3}\u{FE0F}',
    'path': '\u{1F6E3}\u{FE0F}',
    'street': '\u{1F6E3}\u{FE0F}',
    'garden': '\u{1F33E}',
    'park': '\u{1F3DE}\u{FE0F}',
    'farm': '\u{1F3D4}\u{FE0F}',
    'field': '\u{1F33E}',
    'meadow': '\u{1F33F}',
    'phone': '\u{1F4F1}',
    'smartphone': '\u{1F4F1}',
    'computer': '\u{1F4BB}',
    'lab': '\u{1F52C}',
    'laboratory': '\u{1F52C}',
    'factory': '\u{1F3ED}',
    'restaurant': '\u{1F37D}\u{FE0F}',
    'cafe': '\u{2615}',
    'bar': '\u{1F37B}',
    'hotel': '\u{1F3E8}',
    'room': '\u{1F3E0}',
    'bedroom': '\u{1F6CF}\u{FE0F}',
    'kitchen': '\u{1F373}',
    'date': '\u{1F493}',
    'night': '\u{1F303}',
    'venue': '\u{1F3E2}'
  },
  'adventure': {
    'quest': '\u{1F3AF}',
    'journey': '\u{1F6B4}',
    'travel': '\u{2708}\u{FE0F}',
    'adventure': '\u{1F3B5}',
    'battle': '\u{2694}\u{FE0F}',
    'fight': '\u{1F94A}',
    'war': '\u{2694}\u{FE0F}',
    'duel': '\u{1F94A}',
    'challenge': '\u{1F3AF}',
    'race': '\u{1F3C3}',
    'chase': '\u{1F3C3}',
    'escape': '\u{1F6B4}',
    'rescue': '\u{1F691}',
    'mission': '\u{1F4AF}',
    'discovery': '\u{1F50D}',
    'secret': '\u{1F510}',
    'mystery': '\u{2753}',
    'puzzle': '\u{1F9E9}',
    'trap': '\u{1F527}',
    'danger': '\u{26A0}\u{FE0F}',
    'crisis': '\u{1F6A8}',
    'emergency': '\u{1F6A8}',
    'surprise': '\u{1F389}',
    'twist': '\u{1F4AB}',
    'revelation': '\u{1F4A1}',
    'betrayal': '\u{1F5E1}\u{FE0F}',
    'alliance': '\u{1F91D}',
    'friendship': '\u{1F91D}',
    'love': '\u{1F494}',
    'romance': '\u{1F498}',
    'wedding': '\u{1F492}',
    'marriage': '\u{1F48D}',
    'proposal': '\u{1F48D}',
    'kiss': '\u{1F48B}',
    'embrace': '\u{1F917}',
    'meeting': '\u{1F91D}',
    'reunion': '\u{1F917}',
    'farewell': '\u{1F44B}',
    'departure': '\u{1F44B}',
    'arrival': '\u{1F4C5}',
    'return': '\u{1F3E0}',
    'glitch': '\u{1F4A5}',
    'confession': '\u{1F4AC}',
    'evolution': '\u{1F916}',
    'choice': '\u{1F9EE}',
    'decision': '\u{1F9EE}',
    'test': '\u{1F4DD}',
    'trial': '\u{2696}\u{FE0F}',
    'verdict': '\u{2696}\u{FE0F}',
    'justice': '\u{2696}\u{FE0F}',
    'truth': '\u{1F4AF}',
    'lie': '\u{1F925}',
    'deception': '\u{1F925}',
    'confrontation': '\u{1F621}',
    'argument': '\u{1F4AC}',
    'negotiation': '\u{1F91D}',
    'agreement': '\u{1F91D}',
    'contract': '\u{1F4DD}',
    'deal': '\u{1F91D}',
    'investment': '\u{1F4B0}',
    'opportunity': '\u{1F4A1}',
    'risk': '\u{1F3B2}',
    'success': '\u{1F3C6}',
    'failure': '\u{1F4A9}',
    'victory': '\u{1F3C6}',
    'defeat': '\u{1F614}',
    'ending': '\u{1F3AD}',
    'beginning': '\u{1F3AD}',
    'awakening': '\u{1F4A1}',
    'transformation': '\u{1F9AB}',
    'rebirth': '\u{1F423}',
    'healing': '\u{1F497}',
    'recovery': '\u{1F497}',
    'growth': '\u{1F331}',
    'learning': '\u{1F4DA}',
    'teaching': '\u{1F3EB}',
    'research': '\u{1F52C}',
    'experiment': '\u{1F9EA}',
    'invention': '\u{1F4A1}',
    'creation': '\u{1F3A8}',
    'destruction': '\u{1F4A5}',
    'chaos': '\u{1F4A5}',
    'order': '\u{2696}\u{FE0F}',
    'peace': '\u{1F524}',
    'harmony': '\u{1F3AD}',
    'balance': '\u{2696}\u{FE0F}'
  },
  'equipment': {
    'sword': '\u{2694}\u{FE0F}',
    'weapon': '\u{1F5E1}\u{FE0F}',
    'shield': '\u{1F6E1}\u{FE0F}',
    'armor': '\u{1F6E1}\u{FE0F}',
    'helmet': '\u{1F6E1}\u{FE0F}',
    'bow': '\u{1F3F9}',
    'arrow': '\u{1F3F9}',
    'staff': '\u{1F9D9}',
    'wand': '\u{2728}',
    'magic': '\u{2728}',
    'spell': '\u{2728}',
    'potion': '\u{2697}\u{FE0F}',
    'elixir': '\u{2697}\u{FE0F}',
    'poison': '\u{2620}\u{FE0F}',
    'antidote': '\u{1F48A}',
    'medicine': '\u{1F48A}',
    'healing': '\u{1F497}',
    'food': '\u{1F354}',
    'drink': '\u{1F37B}',
    'water': '\u{1F4A7}',
    'bread': '\u{1F35E}',
    'meat': '\u{1F356}',
    'fruit': '\u{1F34F}',
    'gold': '\u{1F4B0}',
    'money': '\u{1F4B0}',
    'coin': '\u{1FA99}',
    'treasure': '\u{1F4BC}',
    'gem': '\u{1F48E}',
    'jewel': '\u{1F48E}',
    'ring': '\u{1F48D}',
    'crown': '\u{1F451}',
    'key': '\u{1F511}',
    'lock': '\u{1F512}',
    'door': '\u{1F6AA}',
    'gate': '\u{1F6AA}',
    'map': '\u{1F5FA}\u{FE0F}',
    'compass': '\u{1F9ED}',
    'book': '\u{1F4D6}',
    'scroll': '\u{1F4DC}',
    'letter': '\u{1F4E7}',
    'message': '\u{1F4E7}',
    'phone': '\u{1F4F1}',
    'smartphone': '\u{1F4F1}',
    'computer': '\u{1F4BB}',
    'laptop': '\u{1F4BB}',
    'tablet': '\u{1F4BB}',
    'camera': '\u{1F4F7}',
    'tool': '\u{1F527}',
    'hammer': '\u{1F528}',
    'axe': '\u{1FA93}',
    'pickaxe': '\u{26CF}\u{FE0F}',
    'rope': '\u{1F9F5}',
    'ladder': '\u{1FA9C}',
    'torch': '\u{1F526}',
    'lamp': '\u{1F4A1}',
    'light': '\u{1F4A1}',
    'candle': '\u{1F56F}\u{FE0F}',
    'fire': '\u{1F525}',
    'flame': '\u{1F525}',
    'ice': '\u{2744}\u{FE0F}',
    'crystal': '\u{1F48E}',
    'stone': '\u{1FAA8}',
    'rock': '\u{1FAA8}',
    'wood': '\u{1FAB5}',
    'metal': '\u{26D3}\u{FE0F}',
    'fabric': '\u{1F9F5}',
    'cloth': '\u{1F9F5}',
    'clothing': '\u{1F455}',
    'armor': '\u{1F6E1}\u{FE0F}',
    'cloak': '\u{1F9E5}',
    'boots': '\u{1F462}',
    'gloves': '\u{1F9E4}',
    'hat': '\u{1F3A9}',
    'crown': '\u{1F451}',
    'jewelry': '\u{1F48E}',
    'necklace': '\u{1F4FF}',
    'bracelet': '\u{1F4FF}',
    'earring': '\u{1F48E}',
    'watch': '\u{231A}',
    'clock': '\u{1F550}',
    'time': '\u{23F3}',
    'hourglass': '\u{23F3}',
    'calendar': '\u{1F4C5}',
    'date': '\u{1F4C5}',
    'pen': '\u{1F4DD}',
    'pencil': '\u{270F}\u{FE0F}',
    'paper': '\u{1F4C4}',
    'note': '\u{1F4DD}',
    'diary': '\u{1F4D3}',
    'journal': '\u{1F4D3}',
    'photo': '\u{1F4F7}',
    'picture': '\u{1F3A8}',
    'painting': '\u{1F3A8}',
    'drawing': '\u{1F3A8}',
    'music': '\u{1F3B5}',
    'song': '\u{1F3B5}',
    'instrument': '\u{1F3B8}',
    'guitar': '\u{1F3B8}',
    'piano': '\u{1F3B9}',
    'violin': '\u{1F3BB}',
    'drum': '\u{1F941}',
    'honesty': '\u{1F4AF}',
    'acceptance': '\u{1F91D}',
    'love': '\u{2764}\u{FE0F}',
    'truth': '\u{1F4AF}',
    'courage': '\u{1F49E}',
    'wisdom': '\u{1F4DC}',
    'hope': '\u{1F31F}',
    'faith': '\u{1F31F}',
    'trust': '\u{1F91D}',
    'loyalty': '\u{1F4AF}',
    'honor': '\u{1F3C6}',
    'justice': '\u{2696}\u{FE0F}',
    'freedom': '\u{1F524}',
    'peace': '\u{1F524}',
    'joy': '\u{1F604}',
    'happiness': '\u{1F603}',
    'sadness': '\u{1F622}',
    'anger': '\u{1F621}',
    'fear': '\u{1F628}',
    'courage': '\u{1F49E}',
    'strength': '\u{1F4AA}',
    'power': '\u{26A1}',
    'energy': '\u{26A1}',
    'magic': '\u{2728}',
    'spirit': '\u{1F47B}',
    'soul': '\u{1F47B}',
    'heart': '\u{2764}\u{FE0F}',
    'mind': '\u{1F9E0}',
    'body': '\u{1F9B4}',
    'life': '\u{1F331}',
    'death': '\u{2620}\u{FE0F}',
    'rebirth': '\u{1F423}',
    'immortality': '\u{2620}\u{FE0F}',
    'eternity': '\u{267E}\u{FE0F}',
    'infinity': '\u{267E}\u{FE0F}',
    'memory': '\u{1F9E0}',
    'knowledge': '\u{1F4DA}',
    'skill': '\u{1F4AA}',
    'talent': '\u{2728}',
    'gift': '\u{1F381}',
    'present': '\u{1F381}',
    'surprise': '\u{1F389}',
    'secret': '\u{1F510}',
    'mystery': '\u{2753}',
    'puzzle': '\u{1F9E9}',
    'riddle': '\u{2753}',
    'clue': '\u{1F50D}',
    'evidence': '\u{1F4C4}',
    'proof': '\u{1F4C4}',
    'document': '\u{1F4C4}',
    'file': '\u{1F4C4}',
    'folder': '\u{1F4C2}',
    'case': '\u{1F4BC}',
    'bag': '\u{1F45C}',
    'backpack': '\u{1F392}',
    'suitcase': '\u{1F6C5}',
    'luggage': '\u{1F6C5}',
    'vehicle': '\u{1F697}',
    'car': '\u{1F697}',
    'truck': '\u{1F69A}',
    'bus': '\u{1F68C}',
    'train': '\u{1F685}',
    'plane': '\u{2708}\u{FE0F}',
    'boat': '\u{26F5}',
    'ship': '\u{1F6A2}',
    'bicycle': '\u{1F6B2}',
    'motorcycle': '\u{1F3CD}\u{FE0F}',
    'horse': '\u{1F40E}',
    'pet': '\u{1F415}',
    'dog': '\u{1F415}',
    'cat': '\u{1F408}',
    'bird': '\u{1F426}',
    'fish': '\u{1F41F}',
    'dragon': '\u{1F409}',
    'unicorn': '\u{1F984}',
    'phoenix': '\u{1F525}',
    'wolf': '\u{1F43A}',
    'lion': '\u{1F981}',
    'bear': '\u{1F43B}',
    'fox': '\u{1F98A}',
    'owl': '\u{1F989}',
    'snake': '\u{1F40D}',
    'spider': '\u{1F577}\u{FE0F}',
    'bat': '\u{1F987}',
    'rat': '\u{1F400}',
    'mouse': '\u{1F401}',
    'rabbit': '\u{1F407}',
    'deer': '\u{1F98C}',
    'eagle': '\u{1F985}',
    'hawk': '\u{1F985}',
    'raven': '\u{1F426}',
    'crow': '\u{1F426}'
  }
};

function getRoleIcon(roleType) {
  if (!roleType) return ROLE_TYPE_ICONS['default'];
  if (ROLE_TYPE_ICONS[roleType]) return ROLE_TYPE_ICONS[roleType];
  const lowerRole = roleType.toLowerCase();
  for (const [key, icon] of Object.entries(ROLE_TYPE_ICONS)) {
    if (key.toLowerCase().includes(lowerRole) || lowerRole.includes(key.toLowerCase())) {
      return icon;
    }
  }
  return ROLE_TYPE_ICONS['default'];
}

function getPlotCardIcon(subType, name) {
  if (!subType) return '\u{1F3B5}';
  const nameIcons = PLOT_CARD_NAME_ICONS[subType];
  if (nameIcons && name) {
    const lowerName = name.toLowerCase();
    for (const [keyword, icon] of Object.entries(nameIcons)) {
      if (lowerName.includes(keyword)) {
        return icon;
      }
    }
  }
  return PLOT_CARD_ICONS[subType] || '\u{1F3B5}';
}

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

function extractKeywordsFromContent(content, characters, bookType, isZh) {
  const keywords = new Set();
  const themeKeywords = THEME_KEYWORDS[isZh ? 'zh' : 'en'];
  
  characters.forEach(c => {
    if (c.name && c.name.length > 1) {
      keywords.add(c.name);
    }
  });
  
  const lowerContent = content.toLowerCase();
  
  Object.entries(themeKeywords).forEach(([theme, words]) => {
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

function runQuery(query) {
  const result = execSync(
    `npx wrangler d1 execute storybook_database --local --command "${query.replace(/"/g, '\\"')}" --json`,
    { cwd: path.join(__dirname, '..'), encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
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
  
  let html = `<div class="manuscript-title">
    <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[chapter.orderNum - 1] || chapter.orderNum}</div>
    <div class="chapter-name">${chapter.title}</div>
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

function generateBookHTML(book, characters, chapters, plotCards) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const typeName = (TYPE_NAMES[lang] && TYPE_NAMES[lang][book.type]) || book.type;
  const typeIcon = TYPE_ICONS[book.type] || '📖';
  
  const bookPlotCards = plotCards.filter(p => p.bookId === book.bookId);
  
  const allContent = chapters.map(c => c.content).join(' ');
  const keywords = extractKeywordsFromContent(allContent, characters, book.type, isZh);
  
  const characterSchema = characters.map(c => ({
    '@type': 'Person',
    name: c.name,
    description: `${c.roleType} - ${c.personality}`
  }));
  
  const protagonists = characters.filter(c => c.isProtagonist);
  const otherCharacters = characters.filter(c => !c.isProtagonist);
  
  const halfChapters = Math.ceil(chapters.length / 2);
  const leftChapters = chapters.slice(0, halfChapters);
  const rightChapters = chapters.slice(halfChapters);
  
  const halfChars = Math.ceil(characters.length / 2);
  const leftChars = characters.slice(0, halfChars);
  const rightChars = characters.slice(halfChars);
  
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? book.title + ' - AI互动故事' : book.title + ' - AI Interactive Story'}">
  <meta name="keywords" content="${keywords}">
  <meta property="og:title" content="${book.title} - StoryBook">
  <meta property="og:description" content="${isZh ? book.title + ' - AI互动故事' : book.title + ' - AI Interactive Story'}">
  <meta property="og:type" content="book">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
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
    }
    
    .chapter-toc-item .chapter-dots {
      flex: 1;
      border-bottom: 1px dotted rgba(139, 90, 43, 0.3);
      margin: 0 10px;
    }
    
    .chapter-toc-item .chapter-title {
      font-family: 'Cinzel', serif;
      font-size: 14px;
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
    
    @media (max-width: 900px) {
      .book-container {
        width: 95%;
        height: auto;
        min-height: auto;
        flex-direction: column;
      }
      
      .book-spine {
        display: none;
      }
      
      .book-page {
        position: relative;
        width: 100%;
        height: auto;
        min-height: 400px;
        margin-bottom: 20px;
      }
      
      .book-page.left,
      .book-page.right {
        border-radius: 8px;
      }
    }
  </style>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library.html" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf.html" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
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
                ${chapters.length > 0 ? `<a href="../chapters/${chapters[0].chapterId}.html" class="action-btn action-btn-secondary">${isZh ? '开始阅读' : 'Start Reading'}</a>` : ''}
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
              ${leftChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => {
                const idx = Math.floor((ch.orderNum - 1) / 2) * 2;
                const pageChapterId = chapters[idx] ? chapters[idx].chapterId : ch.chapterId;
                return `<a href="../chapters/${pageChapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${i * 0.1}s backwards;">
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
            <div class="chapter-toc">
              ${rightChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => {
                const idx = Math.floor((ch.orderNum - 1) / 2) * 2;
                const pageChapterId = chapters[idx] ? chapters[idx].chapterId : ch.chapterId;
                return `<a href="../chapters/${pageChapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${(i + halfChapters) * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>`;
              }).join('')}
            </div>
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
    
    function renderChapters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const chapters = bookData.chapters.sort((a, b) => a.orderNum - b.orderNum);
      const half = Math.ceil(chapters.length / 2);
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const isZh = '${lang}' === 'zh';
      
      function getPageChapterId(chapterOrder) {
        const pageIndex = Math.floor((chapterOrder - 1) / 2);
        return chapters[pageIndex * 2].chapterId;
      }
      
      leftContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(0, half).map((ch, i) => 
        '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
      
      rightContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(half).map((ch, i) => 
        '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
    }
    
    function renderPlotCards() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const allCards = bookData.plotCards || [];
      
      const validSubTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      const cards = allCards.filter(c => validSubTypes.includes(c.sub_type));
      
      const half = Math.ceil(cards.length / 2);
      const leftCards = cards.slice(0, half);
      const rightCards = cards.slice(half);
      
      function renderPlotCard(card, index) {
        return '<div class="hs-card-mini plot-card" onclick="showPlotCardDetail(\\'' + card.card_id + '\\')" style="animation: fadeIn 0.5s ease-out ' + (index * 0.1) + 's backwards;">' +
          '<div style="font-size: 36px;">' + (card.icon || '🎭') + '</div>' +
          '<div style="color: #f4e4bc; font-family: Cinzel, serif; font-size: 13px; margin-top: 10px; text-align: center;">' + card.name + '</div>' +
          '<div style="color: #ccc; font-size: 11px; margin-top: 5px; text-align: center; padding: 0 10px;">' + (card.description || '') + '</div>' +
        '</div>';
      }
      
      leftContent.innerHTML = '<div class="plot-grid-view">' + leftCards.map((card, i) => renderPlotCard(card, i)).join('') + '</div>';
      rightContent.innerHTML = '<div class="plot-grid-view">' + rightCards.map((card, i) => renderPlotCard(card, i + half)).join('') + '</div>';
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
        window.location.href = '../login.html?redirect=' + encodeURIComponent(window.location.href);
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
            window.location.href = '../book.html?id=' + result.data.new_book_id;
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

function generateChapterHTML(book, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, characters, totalChapters, currentPage, totalPages) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  const leftContent = formatSingleChapterContent(leftChapter, isZh, romanNumerals);
  const rightContent = rightChapter 
    ? formatSingleChapterContent(rightChapter, isZh, romanNumerals)
    : `<div class="manuscript-text"><p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 未完待续 —' : '— To Be Continued —'}</p></div>`;
  
  const prevUrl = prevPageFirstChapter 
    ? `${prevPageFirstChapter.chapterId}.html`
    : `../books/${book.bookId}.html`;
  const prevLabel = prevPageFirstChapter 
    ? (isZh ? '上一页' : 'Previous')
    : (isZh ? '目录' : 'Contents');
  
  const nextUrl = nextPageFirstChapter 
    ? `${nextPageFirstChapter.chapterId}.html`
    : null;
  const nextLabel = isZh ? '下一页' : 'Next';
  
  const chapterContent = (leftChapter?.content || '') + ' ' + (rightChapter?.content || '');
  const chapterKeywords = extractKeywordsFromContent(chapterContent, characters, book.type, isZh);
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isZh ? '第' : 'Chapter '}${romanNumerals[leftChapter.orderNum - 1] || leftChapter.orderNum}${rightChapter ? (isZh ? '、' : ' & ') + (romanNumerals[rightChapter.orderNum - 1] || rightChapter.orderNum) : ''}: ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? '阅读' : 'Read'} ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}">
  <meta name="keywords" content="${chapterKeywords}">
  <meta property="og:title" content="${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}">
  <meta property="og:description" content="${isZh ? '阅读' : 'Read'} ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
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
    
    @media (max-width: 1000px) {
      .reading-book-container {
        width: 100%;
        height: auto;
        min-height: auto;
      }
      
      .reading-spine {
        display: none;
      }
      
      .reading-page {
        position: relative;
        width: 100%;
        min-height: 500px;
        margin-bottom: 20px;
        border-radius: 8px;
      }
    }
    
    @media (max-width: 600px) {
      .reading-content {
        padding: 25px 20px;
      }
      
      .manuscript-text {
        font-size: 16px;
      }
      
      .drop-cap {
        font-size: 3.5em;
      }
    }
  </style>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library.html" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf.html" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
    </div>
  </nav>
  
  <div class="book-reader-page">
    <div class="reading-book-container">
      <div class="reading-spine"></div>
      
      <div class="reading-page left">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          ${leftContent}
        </div>
      </div>
      
      <div class="reading-page right">
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
      <a href="../books/${book.bookId}.html">${book.title}</a>
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
    });
  </script>
</body>
</html>`;
}

async function main() {
  const bookId = process.argv[2];
  
  console.log('📚 从数据库生成静态页面...');
  console.log(`目标书籍: ${bookId || '所有预设书籍'}`);
  
  let booksQuery = `SELECT book_id, title, type, language FROM books WHERE is_preset = 1`;
  if (bookId) {
    booksQuery = `SELECT book_id, title, type, language FROM books WHERE book_id = '${bookId}'`;
  }
  
  const booksResult = runQuery(booksQuery);
  const books = parseQueryResult(booksResult);
  console.log(`找到 ${books.length} 本书籍`);
  
  const booksOutputDir = path.join(__dirname, '../src/frontend/books');
  const chaptersOutputDir = path.join(__dirname, '../src/frontend/chapters');
  
  if (!fs.existsSync(booksOutputDir)) fs.mkdirSync(booksOutputDir, { recursive: true });
  if (!fs.existsSync(chaptersOutputDir)) fs.mkdirSync(chaptersOutputDir, { recursive: true });
  
  let bookCount = 0;
  let chapterCount = 0;
  
  for (const book of books) {
    console.log(`\n处理: ${book.book_id} - ${book.title}`);
    
    const charsResult = runQuery(`SELECT char_id, name, role_type, personality, avatar, is_protagonist FROM characters WHERE book_id = '${book.book_id}'`);
    const characters = parseQueryResult(charsResult).map(c => ({
      charId: c.char_id,
      name: c.name,
      roleType: c.role_type,
      personality: c.personality,
      avatar: c.avatar || getRoleIcon(c.role_type),
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
    
    const bookData = {
      bookId: book.book_id,
      title: book.title,
      type: book.type,
      language: book.language
    };
    
    const bookHTML = generateBookHTML(bookData, characters, chapters, plotCards);
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
      
      const chapterHTML = generateChapterHTML(bookData, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, characters, chapters.length, pageIndex + 1, totalPages);
      const filename = `${leftChapter.chapterId}.html`;
      
      fs.writeFileSync(path.join(chaptersOutputDir, filename), chapterHTML);
      console.log(`  ✓ 生成章节: ${filename}`);
      chapterCount++;
      
      // Also generate a file for the right chapter if it exists
      if (rightChapter) {
        const rightChapterHTML = generateChapterHTML(bookData, rightChapter, null, leftChapter ? chapters[leftIndex] : null, nextPageFirstChapter, characters, chapters.length, pageIndex + 1, totalPages);
        const rightFilename = `${rightChapter.chapterId}.html`;
        fs.writeFileSync(path.join(chaptersOutputDir, rightFilename), rightChapterHTML);
        console.log(`  ✓ 生成章节: ${rightFilename}`);
        chapterCount++;
      }
    }
  }
  
  console.log(`\n完成！共生成 ${bookCount} 个书籍页面, ${chapterCount} 个章节页面`);
}

main().catch(console.error);
