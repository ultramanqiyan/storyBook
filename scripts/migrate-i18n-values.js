/**
 * 数据迁移脚本 - 将数据库中的中文值迁移为英文键值
 * 
 * 运行方式: node scripts/migrate-i18n-values.js
 * 
 * 需要迁移的字段:
 * - characters.personality: 中文 -> 英文键值
 * - characters.speech_style: 中文 -> 英文键值
 * - characters.role_type: 中文 -> 英文键值
 * - characters.relationship: 中文 -> 英文键值
 * - plot_cards.name: 中文名 -> 英文名
 */

const MIGRATIONS = {
  personality: {
    '勇敢': 'brave',
    '聪明': 'smart',
    '温柔': 'gentle',
    '活泼': 'lively',
    '冷静': 'calm',
    '乐观': 'optimistic',
    '善良': 'kind',
    '严肃': 'serious',
    '睿智': 'wise',
    '幽默': 'humorous',
    '谨慎': 'cautious',
    '悲观': 'pessimistic',
    '冲动': 'impulsive',
    '自私': 'selfish',
    '暴躁': 'irritable',
    '好奇': 'curious',
    '沉稳': 'steady',
    '懒惰': 'lazy',
    '外向': 'extroverted',
    '阴险': 'sinister',
    '随和': 'easygoing',
    '傲慢': 'arrogant',
    '懦弱': 'cowardly',
    '贪婪': 'greedy',
    '多疑': 'suspicious',
    '偏执': 'paranoid',
    '冷漠': 'indifferent'
  },
  speech_style: {
    '简洁直接': 'direct',
    '幽默风趣': 'humorous',
    '温柔体贴': 'gentle',
    '严肃正式': 'formal',
    '活泼热情': 'enthusiastic',
    '礼貌客气': 'polite',
    '深沉': 'deep',
    '诗意文艺': 'poetic',
    '温和': 'mild',
    '啰嗦详细': 'verbose',
    '尖酸刻薄': 'sarcastic',
    '咄咄逼人': 'aggressive',
    '慢条斯理': 'methodical',
    '快速急促': 'urgent',
    '务实平淡': 'practical',
    '夸张生动': 'exaggerated',
    '阴阳怪气': 'passive_aggressive',
    '冷淡疏离': 'distant',
    '天真单纯': 'naive',
    '讽刺挖苦': 'ironic',
    '抱怨连天': 'complaining',
    '命令式': 'commanding',
    '敷衍了事': 'dismissive',
    '油嘴滑舌': 'smooth_talking',
    '沉默寡言': 'reticent',
    '爱打断人': 'interrupting'
  },
  role_type: {
    '小探险家': 'littleExplorer',
    '小勇士': 'littleWarrior',
    '小智者': 'littleWise',
    '小动物': 'littleAnimal',
    '小魔法师': 'littleMage',
    '小发明家': 'littleInventor',
    '小侦探': 'littleDetective',
    '小船长': 'littleCaptain',
    '法师': 'mage',
    '战士': 'warrior',
    '游侠': 'ranger',
    '牧师': 'priest',
    '刺客': 'assassin',
    '德鲁伊': 'druid',
    '术士': 'warlock',
    '圣骑士': 'paladin',
    '巫师': 'wizard',
    '盗贼': 'rogue',
    '白领': 'office_worker',
    '学生': 'student',
    '艺术家': 'artist',
    '医生': 'doctor',
    '律师': 'lawyer',
    '记者': 'journalist',
    '设计师': 'designer',
    '程序员': 'programmer',
    '教师': 'teacher',
    '创业者': 'entrepreneur',
    '经理': 'manager',
    '专员': 'specialist',
    '顾问': 'consultant',
    '总监': 'director',
    '助理': 'assistant',
    '销售': 'sales',
    '工程师': 'engineer',
    '分析师': 'analyst',
    '主管': 'supervisor',
    '探险家': 'explorer',
    '向导': 'guide',
    '船长': 'captain',
    '考古学家': 'archaeologist',
    '摄影师': 'photographer',
    '动物学家': 'zoologist',
    '植物学家': 'botanist',
    '地质学家': 'geologist',
    '骑士': 'knight',
    '精灵': 'elf',
    '矮人': 'dwarf',
    '龙骑士': 'dragon_knight',
    '吟游诗人': 'bard',
    '企业家': 'entrepreneur',
    '音乐家': 'musician',
    '建筑师': 'architect',
    'CEO': 'ceo',
    '投资人': 'investor'
  },
  relationship: {
    '朋友': 'friend',
    '恋人': 'lover',
    '导师': 'mentor',
    '竞争对手': 'rival',
    '同事': 'colleague',
    '合作伙伴': 'partner',
    '家人': 'family',
    '陌生人': 'stranger'
  }
};

const plotCardNames = {
  '晴天': 'Sunny',
  '彩虹天': 'Rainbow',
  '微风天': 'Breezy',
  '小雨天': 'Light Rain',
  '雪天': 'Snowy',
  '星空夜': 'Starry Night',
  '彩虹雨': 'Rainbow Rain',
  '金色阳光': 'Golden Sunshine',
  '蓝天': 'Blue Sky',
  '白云': 'White Clouds',
  '夕阳': 'Sunset',
  '晨雾': 'Morning Mist',
  '雷电': 'Thunderstorm',
  '阴天': 'Cloudy',
  '沙尘': 'Dust Storm',
  '雾霾': 'Fog',
  '流星雨': 'Meteor Shower',
  '极光': 'Aurora',
  '月食': 'Lunar Eclipse',
  '日食': 'Solar Eclipse',
  '森林': 'Forest',
  '草原': 'Grassland',
  '海滩': 'Beach',
  '山洞': 'Cave',
  '树屋': 'Treehouse',
  '花园': 'Garden',
  '小溪': 'Stream',
  '彩虹谷': 'Rainbow Valley',
  '湖泊': 'Lake',
  '山顶': 'Mountain Peak',
  '峡谷': 'Canyon',
  '岛屿': 'Island',
  '湿地': 'Wetland',
  '古堡': 'Castle',
  '废墟': 'Ruins',
  '洞穴': 'Cavern',
  '瀑布': 'Waterfall',
  '沙漠': 'Desert',
  '雪山': 'Snow Mountain',
  '热带雨林': 'Rainforest',
  '寻宝': 'Treasure Hunt',
  '探险': 'Exploration',
  '帮助朋友': 'Help Friends',
  '发现秘密': 'Discover Secrets',
  '比赛': 'Competition',
  '露营': 'Camping',
  '观察动物': 'Animal Watching',
  '种植': 'Planting',
  '钓鱼': 'Fishing',
  '骑行': 'Cycling',
  '徒步': 'Hiking',
  '登山': 'Mountain Climbing',
  '潜水': 'Diving',
  '滑雪': 'Skiing',
  '乘坐热气球': 'Hot Air Balloon',
  '迷宫': 'Maze',
  '解谜': 'Puzzle Solving',
  '追逐': 'Chase',
  '救援': 'Rescue',
  '生存': 'Survival',
  '放大镜': 'Magnifying Glass',
  '指南针': 'Compass',
  '背包': 'Backpack',
  '手电筒': 'Flashlight',
  '笔记本': 'Notebook',
  '望远镜': 'Telescope',
  '地图': 'Map',
  '水壶': 'Water Bottle',
  '相机': 'Camera',
  '睡袋': 'Sleeping Bag',
  '帐篷': 'Tent',
  '炊具': 'Cookware',
  '急救箱': 'First Aid Kit',
  '绳子': 'Rope',
  '刀具': 'Knife',
  '灯具': 'Lantern',
  '音箱': 'Speaker',
  '无人机': 'Drone',
  '显微镜': 'Microscope',
  '天文望远镜': 'Astronomical Telescope'
};

function migrateValue(value, mapping) {
  if (!value) return value;
  return mapping[value] || value;
}

async function migrateCharacters(env) {
  console.log('Migrating characters...');
  
  const characters = await env.DB.prepare(
    'SELECT char_id, personality, speech_style, role_type, relationship FROM characters'
  ).all();
  
  for (const char of characters.results) {
    const newPersonality = migrateValue(char.personality, MIGRATIONS.personality);
    const newSpeechStyle = migrateValue(char.speech_style, MIGRATIONS.speech_style);
    const newRoleType = migrateValue(char.role_type, MIGRATIONS.role_type);
    const newRelationship = migrateValue(char.relationship, MIGRATIONS.relationship);
    
    await env.DB.prepare(
      'UPDATE characters SET personality = ?, speech_style = ?, role_type = ?, relationship = ? WHERE char_id = ?'
    ).bind(newPersonality, newSpeechStyle, newRoleType, newRelationship, char.char_id).run();
  }
  
  console.log(`Migrated ${characters.results.length} characters`);
}

async function migratePlotCards(env) {
  console.log('Migrating plot cards...');
  
  const cards = await env.DB.prepare(
    'SELECT card_id, name FROM plot_cards'
  ).all();
  
  for (const card of cards.results) {
    const newName = migrateValue(card.name, plotCardNames);
    
    await env.DB.prepare(
      'UPDATE plot_cards SET name = ? WHERE card_id = ?'
    ).bind(newName, card.card_id).run();
  }
  
  console.log(`Migrated ${cards.results.length} plot cards`);
}

async function main() {
  console.log('Starting i18n data migration...');
  console.log('Note: This script should be run manually when needed.');
  console.log('Please backup your database before running this migration.');
}

main();
