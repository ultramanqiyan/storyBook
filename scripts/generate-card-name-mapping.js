import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const analysisFile = path.join(__dirname, 'all-preset-emoji-analysis.json');
const analysis = JSON.parse(fs.readFileSync(analysisFile, 'utf-8'));

const standardEmojis = {
  en: {
    adventure: {
      weather: ["Sunny", "Rainbow", "Breezy", "Light Rain", "Snowy", "Starry Night", "Rainbow Rain", "Golden Sunshine", "Blue Sky", "White Clouds", "Sunset", "Morning Mist", "Thunderstorm", "Cloudy", "Dust Storm", "Fog", "Meteor Shower", "Aurora", "Lunar Eclipse", "Solar Eclipse"],
      terrain: ["Forest", "Grassland", "Beach", "Cave", "Treehouse", "Garden", "Stream", "Rainbow Valley", "Lake", "Mountain Peak", "Canyon", "Island", "Wetland", "Castle", "Ruins", "Cavern", "Waterfall", "Desert", "Snow Mountain", "Rainforest"],
      adventure: ["Treasure Hunt", "Exploration", "Help Friends", "Discover Secrets", "Competition", "Camping", "Animal Watching", "Planting", "Fishing", "Cycling", "Hiking", "Mountain Climbing", "Diving", "Skiing", "Hot Air Balloon", "Maze", "Puzzle Solving", "Chase", "Rescue", "Survival"],
      equipment: ["Magnifying Glass", "Compass", "Backpack", "Flashlight", "Notebook", "Telescope", "Map", "Water Bottle", "Camera", "Sleeping Bag", "Tent", "Cookware", "First Aid Kit", "Rope", "Knife", "Lantern", "Speaker", "Drone", "Microscope", "Astronomical Telescope"]
    },
    business: {
      weather: ["Sunny", "Cloudy", "Rainy", "Smog", "Thunderstorm", "Windy", "Sandstorm", "Clear Night", "Rainbow", "Partly Cloudy", "Light Rain", "Snowy", "Frost", "Lightning", "Typhoon", "Fog", "Tornado", "Storm", "Blizzard", "Clearing Up"],
      terrain: ["Office", "Meeting Room", "Client Company", "Airport", "Hotel", "Restaurant", "Exhibition", "Headquarters", "Factory", "Warehouse", "Laboratory", "Office Building", "Lobby", "Reception Area", "Break Room", "Training Room", "Parking Lot", "Rooftop", "Park", "Coffee Shop"],
      adventure: ["Negotiation", "Bidding", "Crisis Management", "Team Management", "Project Launch", "Product Launch", "Layoff Crisis", "Merger", "IPO", "Financing", "Expansion", "Contraction", "Transformation", "Upgrade", "Crossover", "Innovation", "Breakthrough", "Persistence", "Achievement", "Rise"],
      equipment: ["Laptop", "Business Card", "Contract", "Projector", "Whiteboard", "Coffee Cup", "Suitcase", "Trophy", "Seal", "Pen", "Planner", "Tablet", "Headset", "Smart Watch", "Translator", "Scanner", "Printer", "Safe", "Display Board", "Directory"]
    },
    fantasy: {
      weather: ["Magic Storm", "Blood Moon", "Aurora", "Elemental Turbulence", "Time Rift", "Falling Stars", "Eternal Dusk", "Soul Fog", "Meteor Fire Rain", "Darkness Falls", "Divine Light", "Elemental Storm", "Magic Rain", "Fairy Light", "Demon Fog", "Dragon Breath Cloud", "Portal Light", "Awakening Light", "Apocalypse Vision", "Genesis Dawn"],
      terrain: ["Magic Forest", "Floating Island", "Abyss", "Dragon's Lair", "Ancient Ruins", "Crystal Cave", "Shadow Swamp", "Sky City", "Magic Tower", "Fairy Village", "Dwarf Mine", "Orc Territory", "Undead Cemetery", "Temple", "Otherworld", "Mirror Dimension", "Time Fissure", "Elemental Plane", "Sealed Land", "Mystic Sea"],
      adventure: ["Dragon Slaying", "Artifact Hunt", "Curse Breaking", "Magic Duel", "Summoning Ritual", "Dimension Travel", "Demon Sealing", "Power Awakening", "Elemental Awakening", "Bloodline Inheritance", "Artifact Forging", "Magic Research", "Fairy Alliance", "Dwarf Alliance", "Element Fusion", "Time Travel", "Soul Redemption", "Magic Trial", "Elemental Trial", "Guardian Mission"],
      equipment: ["Magic Wand", "Grimoire", "Crystal Ball", "Teleport Scroll", "Magic Potion", "Amulet", "Summoning Stone", "Elemental Gem", "Dragon Scale Armor", "Fairy Bow", "Dwarf Hammer", "Wizard Hat", "Magic Boots", "Portal Rune", "Sealing Scroll", "Soul Stone", "Elemental Staff", "Magic Cloak", "Fairy Ring", "Dragon Heart"]
    },
    romance: {
      weather: ["Cherry Blossom Rain", "First Snow", "Sunset", "After Rain", "Starry Sky", "Morning Light", "Moonlight", "Neon Lights", "Misty", "Shooting Star", "Twilight", "Dawn", "Cloudy", "Rainy Day", "Sunny Day", "Snowy Day", "Partly Cloudy", "Frost", "Thunderstorm", "Rainbow"],
      terrain: ["Cafe", "Park", "Library", "Seaside", "Mountain Top", "Subway Station", "Shopping Mall", "Old Street", "Campus", "Office", "Rooftop", "Bridge", "Train Station", "Airport", "Hospital", "School", "Restaurant", "Bar", "Bookstore", "Gallery"],
      adventure: ["First Meeting", "Confession", "Misunderstanding", "Reconciliation", "Companionship", "Separation", "Reunion", "Proposal", "Date", "Living Together", "Meeting Parents", "Expression", "Pursuit", "Ambiguity", "Cold War", "Passionate Love", "Engagement", "Marriage", "Divorce", "Getting Back Together"],
      equipment: ["Phone", "Coffee", "Book", "Umbrella", "Necklace", "Letter Paper", "Camera", "Music Box", "Headphones", "Watch", "Wallet", "Perfume", "Ring", "Flowers", "Cake", "Chocolate", "Wine", "Piano", "Guitar", "Canvas"]
    }
  },
  zh: {
    adventure: {
      weather: ["晴天", "彩虹", "微风", "小雨", "雪天", "星空", "彩虹雨", "金色阳光", "蓝天", "白云", "日落", "晨雾", "雷雨", "阴天", "沙尘暴", "雾霾", "流星雨", "极光", "月食", "日食"],
      terrain: ["森林", "草原", "海滩", "洞穴", "树屋", "花园", "小溪", "彩虹谷", "湖泊", "山峰", "峡谷", "岛屿", "湿地", "城堡", "遗迹", "岩洞", "瀑布", "沙漠", "雪山", "雨林"],
      adventure: ["寻宝", "探险", "帮助朋友", "发现秘密", "比赛", "露营", "观察动物", "种植", "钓鱼", "骑行", "徒步", "登山", "潜水", "滑雪", "热气球", "迷宫", "解谜", "追逐", "救援", "生存"],
      equipment: ["放大镜", "指南针", "背包", "手电筒", "笔记本", "望远镜", "地图", "水壶", "相机", "睡袋", "帐篷", "炊具", "急救包", "绳索", "刀具", "灯笼", "音箱", "无人机", "显微镜", "天文望远镜"]
    },
    business: {
      weather: ["晴天", "阴天", "雨天", "雾霾", "雷雨", "大风", "沙尘暴", "晴夜", "彩虹", "多云", "小雨", "雪天", "霜冻", "闪电", "台风", "大雾", "龙卷风", "暴风雨", "暴雪", "转晴"],
      terrain: ["办公室", "会议室", "客户公司", "机场", "酒店", "餐厅", "展会", "总部", "工厂", "仓库", "实验室", "写字楼", "大厅", "接待区", "休息室", "培训室", "停车场", "天台", "公园", "咖啡厅"],
      adventure: ["谈判", "竞标", "危机处理", "团队管理", "项目启动", "产品发布", "裁员危机", "并购", "上市", "融资", "扩张", "收缩", "转型", "升级", "跨界", "创新", "突破", "坚守", "成就", "崛起"],
      equipment: ["笔记本电脑", "名片", "合同", "投影仪", "白板", "咖啡杯", "公文包", "奖杯", "印章", "签字笔", "记事本", "平板电脑", "耳机", "智能手表", "翻译器", "扫描仪", "打印机", "保险箱", "展示板", "通讯录"]
    },
    fantasy: {
      weather: ["魔法风暴", "血月", "极光", "元素涌动", "时空裂隙", "陨星", "永恒黄昏", "灵魂之雾", "流星火雨", "黑暗降临", "神圣之光", "元素风暴", "魔法之雨", "精灵之光", "恶魔之雾", "龙息之云", "传送门之光", "觉醒之光", "末日预兆", "创世曙光"],
      terrain: ["魔法森林", "浮空岛", "深渊", "龙巢", "古老遗迹", "水晶洞穴", "暗影沼泽", "天空之城", "魔法塔", "精灵村落", "矮人矿坑", "兽人领地", "亡灵墓地", "神殿", "异世界", "镜中世界", "时间裂隙", "元素位面", "封印之地", "神秘之海"],
      adventure: ["屠龙", "神器寻找", "诅咒解除", "魔法对决", "召唤仪式", "穿越异界", "恶魔封印", "力量觉醒", "元素觉醒", "血脉传承", "神器锻造", "魔法研究", "精灵结盟", "矮人结盟", "元素融合", "时空穿梭", "灵魂救赎", "魔法试炼", "元素试炼", "守护使命"],
      equipment: ["魔法杖", "魔法书", "水晶球", "传送卷轴", "魔法药水", "护身符", "召唤石", "元素宝石", "龙鳞甲", "精灵弓", "矮人锤", "巫师帽", "魔法靴", "传送符文", "封印卷轴", "灵魂石", "元素法杖", "魔法斗篷", "精灵戒指", "龙之心"]
    },
    romance: {
      weather: ["樱花雨", "初雪", "夕阳", "雨后", "星空", "晨光", "月光", "霓虹", "薄雾", "流星", "黄昏", "黎明", "阴天", "雨天", "晴天", "雪天", "多云", "霜降", "雷雨", "彩虹"],
      terrain: ["咖啡馆", "公园", "图书馆", "海边", "山顶", "地铁站", "商场", "老街", "校园", "办公室", "天台", "桥上", "火车站", "机场", "医院", "学校", "餐厅", "酒吧", "书店", "画廊"],
      adventure: ["初遇", "告白", "误会", "和解", "陪伴", "离别", "重逢", "求婚", "约会", "同居", "见家长", "表白", "追求", "暧昧", "冷战", "热恋", "订婚", "结婚", "离婚", "复合"],
      equipment: ["手机", "咖啡", "书籍", "雨伞", "项链", "信纸", "相机", "音乐盒", "耳机", "手表", "钱包", "香水", "戒指", "鲜花", "蛋糕", "巧克力", "红酒", "钢琴", "吉他", "画布"]
    }
  }
};

const missingCards = analysis.missingCards.filter(c => c.bookType !== 'ai');

const suggestions = [];

for (const card of missingCards) {
  const { bookType, subType, cardName, lang } = card;
  const standardList = standardEmojis[lang]?.[bookType]?.[subType] || [];
  
  let suggestion = null;
  
  for (const standard of standardList) {
    if (standard.toLowerCase() === cardName.toLowerCase()) {
      suggestion = { standardName: standard, matchType: 'exact' };
      break;
    }
  }
  
  if (!suggestion) {
    for (const standard of standardList) {
      if (standard.toLowerCase().includes(cardName.toLowerCase()) || 
          cardName.toLowerCase().includes(standard.toLowerCase())) {
        suggestion = { standardName: standard, matchType: 'partial' };
        break;
      }
    }
  }
  
  if (!suggestion) {
    const cardLower = cardName.toLowerCase();
    for (const standard of standardList) {
      const stdLower = standard.toLowerCase();
      const cardWords = cardLower.split(' ');
      const stdWords = stdLower.split(' ');
      const commonWords = cardWords.filter(w => stdWords.includes(w));
      if (commonWords.length > 0) {
        suggestion = { standardName: standard, matchType: 'similar', commonWords };
        break;
      }
    }
  }
  
  suggestions.push({
    ...card,
    suggestion,
    needsManualReview: !suggestion || suggestion.matchType !== 'exact'
  });
}

const autoMapped = suggestions.filter(s => s.suggestion && s.suggestion.matchType === 'exact');
const partialMapped = suggestions.filter(s => s.suggestion && s.suggestion.matchType === 'partial');
const similarMapped = suggestions.filter(s => s.suggestion && s.suggestion.matchType === 'similar');
const noMatch = suggestions.filter(s => !s.suggestion);

console.log(`\n${'='.repeat(60)}`);
console.log(`卡牌名称映射建议`);
console.log(`${'='.repeat(60)}\n`);

console.log(`=== 统计 ===`);
console.log(`完全匹配: ${autoMapped.length} (可自动修改)`);
console.log(`部分匹配: ${partialMapped.length} (需确认)`);
console.log(`相似匹配: ${similarMapped.length} (需确认)`);
console.log(`无匹配: ${noMatch.length} (需手动处理)`);

console.log(`\n\n=== 完全匹配 (${autoMapped.length}) ===`);
const autoGrouped = {};
for (const s of autoMapped) {
  const key = `${s.bookType}|${s.subType}|${s.cardName}`;
  if (!autoGrouped[key]) autoGrouped[key] = [];
  autoGrouped[key].push(s);
}
for (const [key, items] of Object.entries(autoGrouped).slice(0, 10)) {
  const s = items[0];
  console.log(`  ${s.cardName} -> ${s.suggestion.standardName} (${items.length}本书)`);
}

console.log(`\n\n=== 部分匹配 (${partialMapped.length}) ===`);
for (const s of partialMapped.slice(0, 20)) {
  console.log(`  ${s.cardName} -> ${s.suggestion.standardName} [${s.lang}]`);
}

console.log(`\n\n=== 相似匹配 (${similarMapped.length}) ===`);
for (const s of similarMapped.slice(0, 20)) {
  console.log(`  ${s.cardName} -> ${s.suggestion.standardName} (共同词: ${s.suggestion.commonWords?.join(', ')}) [${s.lang}]`);
}

console.log(`\n\n=== 无匹配 (${noMatch.length}) ===`);
const noMatchGrouped = {};
for (const s of noMatch) {
  const key = `${s.bookType}|${s.subType}`;
  if (!noMatchGrouped[key]) noMatchGrouped[key] = [];
  noMatchGrouped[key].push(s.cardName);
}
for (const [key, names] of Object.entries(noMatchGrouped)) {
  const uniqueNames = [...new Set(names)];
  console.log(`  [${key}] (${uniqueNames.length}种):`);
  console.log(`    ${uniqueNames.slice(0, 5).join(', ')}${uniqueNames.length > 5 ? '...' : ''}`);
}

const mappingOutput = {
  summary: {
    total: suggestions.length,
    autoMapped: autoMapped.length,
    partialMapped: partialMapped.length,
    similarMapped: similarMapped.length,
    noMatch: noMatch.length
  },
  autoMapped: autoMapped.map(s => ({
    bookType: s.bookType,
    subType: s.subType,
    originalName: s.cardName,
    standardName: s.suggestion.standardName,
    lang: s.lang,
    books: [...new Set(suggestions.filter(x => x.cardName === s.cardName && x.bookType === s.bookType && x.subType === s.subType).map(x => x.bookId))]
  })),
  needsReview: [...partialMapped, ...similarMapped, ...noMatch]
};

const outputFile = path.join(__dirname, 'card-name-mapping-suggestions.json');
fs.writeFileSync(outputFile, JSON.stringify(mappingOutput, null, 2));
console.log(`\n\n映射建议已保存到: ${outputFile}`);
