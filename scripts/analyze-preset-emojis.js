import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');

const presetBooks = fs.readdirSync(BOOKS_DIR)
  .filter(f => f.startsWith('preset-') && f.endsWith('.html'))
  .map(f => f.replace('.html', ''));

const standardEmojis = {
  adventure: {
    weather: [
      { name: "Sunny", icon: "☀️" },
      { name: "Rainbow", icon: "🌈" },
      { name: "Breezy", icon: "🌬️" },
      { name: "Light Rain", icon: "🌧️" },
      { name: "Snowy", icon: "❄️" },
      { name: "Starry Night", icon: "🌙" },
      { name: "Rainbow Rain", icon: "🌦️" },
      { name: "Golden Sunshine", icon: "🌅" },
      { name: "Blue Sky", icon: "🌤️" },
      { name: "White Clouds", icon: "☁️" },
      { name: "Sunset", icon: "🌇" },
      { name: "Morning Mist", icon: "🌫️" },
      { name: "Thunderstorm", icon: "⛈️" },
      { name: "Cloudy", icon: "🌥️" },
      { name: "Dust Storm", icon: "🌪️" },
      { name: "Fog", icon: "😷" },
      { name: "Meteor Shower", icon: "🌠" },
      { name: "Aurora", icon: "🌌" },
      { name: "Lunar Eclipse", icon: "🌚" },
      { name: "Solar Eclipse", icon: "🌑" }
    ],
    terrain: [
      { name: "Forest", icon: "🌲" },
      { name: "Grassland", icon: "🌿" },
      { name: "Beach", icon: "🏖️" },
      { name: "Cave", icon: "🕳️" },
      { name: "Treehouse", icon: "🏡" },
      { name: "Garden", icon: "🌻" },
      { name: "Stream", icon: "💧" },
      { name: "Rainbow Valley", icon: "🌈" },
      { name: "Lake", icon: "🏞️" },
      { name: "Mountain Peak", icon: "⛰️" },
      { name: "Canyon", icon: "🏔️" },
      { name: "Island", icon: "🏝️" },
      { name: "Wetland", icon: "🌾" },
      { name: "Castle", icon: "🏰" },
      { name: "Ruins", icon: "🏚️" },
      { name: "Cavern", icon: "🪨" },
      { name: "Waterfall", icon: "💦" },
      { name: "Desert", icon: "🏜️" },
      { name: "Snow Mountain", icon: "🗻" },
      { name: "Rainforest", icon: "🌴" }
    ],
    adventure: [
      { name: "Treasure Hunt", icon: "🗺️" },
      { name: "Exploration", icon: "🧭" },
      { name: "Help Friends", icon: "🤝" },
      { name: "Discover Secrets", icon: "🔮" },
      { name: "Competition", icon: "🏆" },
      { name: "Camping", icon: "⛺" },
      { name: "Animal Watching", icon: "🦋" },
      { name: "Planting", icon: "🌱" },
      { name: "Fishing", icon: "🎣" },
      { name: "Cycling", icon: "🚴" },
      { name: "Hiking", icon: "🚶" },
      { name: "Mountain Climbing", icon: "🧗" },
      { name: "Diving", icon: "🤿" },
      { name: "Skiing", icon: "⛷️" },
      { name: "Hot Air Balloon", icon: "🎈" },
      { name: "Maze", icon: "🌀" },
      { name: "Puzzle Solving", icon: "🧩" },
      { name: "Chase", icon: "🏃" },
      { name: "Rescue", icon: "🆘" },
      { name: "Survival", icon: "🏕️" }
    ],
    equipment: [
      { name: "Magnifying Glass", icon: "🔍" },
      { name: "Compass", icon: "🧭" },
      { name: "Backpack", icon: "🎒" },
      { name: "Flashlight", icon: "🔦" },
      { name: "Notebook", icon: "📓" },
      { name: "Telescope", icon: "🔭" },
      { name: "Map", icon: "🗺️" },
      { name: "Water Bottle", icon: "🥤" },
      { name: "Camera", icon: "📷" },
      { name: "Sleeping Bag", icon: "🛏️" },
      { name: "Tent", icon: "⛺" },
      { name: "Cookware", icon: "🍳" },
      { name: "First Aid Kit", icon: "🩹" },
      { name: "Rope", icon: "🪢" },
      { name: "Knife", icon: "🔪" },
      { name: "Lantern", icon: "💡" },
      { name: "Speaker", icon: "🔊" },
      { name: "Drone", icon: "🛸" },
      { name: "Microscope", icon: "🔬" },
      { name: "Astronomical Telescope", icon: "🌌" }
    ]
  },
  fantasy: {
    weather: [
      { name: "Magic Storm", icon: "🌀" },
      { name: "Blood Moon", icon: "🔴" },
      { name: "Aurora", icon: "🌌" },
      { name: "Elemental Turbulence", icon: "⚡" },
      { name: "Time Rift", icon: "🕳️" },
      { name: "Falling Stars", icon: "💫" },
      { name: "Eternal Dusk", icon: "🌆" },
      { name: "Soul Fog", icon: "👻" },
      { name: "Meteor Fire Rain", icon: "☄️" },
      { name: "Darkness Falls", icon: "🌑" },
      { name: "Divine Light", icon: "✨" },
      { name: "Elemental Storm", icon: "🌪️" },
      { name: "Magic Rain", icon: "💧" },
      { name: "Fairy Light", icon: "🧚" },
      { name: "Demon Fog", icon: "😈" },
      { name: "Dragon Breath Cloud", icon: "🐉" },
      { name: "Portal Light", icon: "🚪" },
      { name: "Awakening Light", icon: "🌟" },
      { name: "Apocalypse Vision", icon: "🌋" },
      { name: "Genesis Dawn", icon: "🌅" }
    ],
    terrain: [
      { name: "Magic Forest", icon: "🌳" },
      { name: "Floating Island", icon: "🏝️" },
      { name: "Abyss", icon: "🕳️" },
      { name: "Dragon's Lair", icon: "🐉" },
      { name: "Ancient Ruins", icon: "🏛️" },
      { name: "Crystal Cave", icon: "💎" },
      { name: "Shadow Swamp", icon: "🌑" },
      { name: "Sky City", icon: "🏰" },
      { name: "Magic Tower", icon: "🗼" },
      { name: "Fairy Village", icon: "🧚" },
      { name: "Dwarf Mine", icon: "⛏️" },
      { name: "Orc Territory", icon: "👹" },
      { name: "Undead Cemetery", icon: "💀" },
      { name: "Temple", icon: "⛩️" },
      { name: "Otherworld", icon: "🌐" },
      { name: "Mirror Dimension", icon: "🪞" },
      { name: "Time Fissure", icon: "⏳" },
      { name: "Elemental Plane", icon: "🔥" },
      { name: "Sealed Land", icon: "🔒" },
      { name: "Mystic Sea", icon: "🌊" }
    ],
    adventure: [
      { name: "Dragon Slaying", icon: "🐉" },
      { name: "Artifact Hunt", icon: "⚔️" },
      { name: "Curse Breaking", icon: "🔮" },
      { name: "Magic Duel", icon: "⚡" },
      { name: "Summoning Ritual", icon: "🌀" },
      { name: "Dimension Travel", icon: "🌀" },
      { name: "Demon Sealing", icon: "😈" },
      { name: "Power Awakening", icon: "💫" },
      { name: "Elemental Awakening", icon: "🔥" },
      { name: "Bloodline Inheritance", icon: "🩸" },
      { name: "Artifact Forging", icon: "🔨" },
      { name: "Magic Research", icon: "📚" },
      { name: "Fairy Alliance", icon: "🧚" },
      { name: "Dwarf Alliance", icon: "⛏️" },
      { name: "Element Fusion", icon: "🌈" },
      { name: "Time Travel", icon: "⏳" },
      { name: "Soul Redemption", icon: "👼" },
      { name: "Magic Trial", icon: "📝" },
      { name: "Elemental Trial", icon: "🔥" },
      { name: "Guardian Mission", icon: "🛡️" }
    ],
    equipment: [
      { name: "Magic Wand", icon: "🪄" },
      { name: "Grimoire", icon: "📖" },
      { name: "Crystal Ball", icon: "🔮" },
      { name: "Teleport Scroll", icon: "📜" },
      { name: "Magic Potion", icon: "🧪" },
      { name: "Amulet", icon: "🧿" },
      { name: "Summoning Stone", icon: "💎" },
      { name: "Elemental Gem", icon: "💠" },
      { name: "Dragon Scale Armor", icon: "🛡️" },
      { name: "Fairy Bow", icon: "🏹" },
      { name: "Dwarf Hammer", icon: "🔨" },
      { name: "Wizard Hat", icon: "🎩" },
      { name: "Magic Boots", icon: "👢" },
      { name: "Portal Rune", icon: "🌀" },
      { name: "Sealing Scroll", icon: "📜" },
      { name: "Soul Stone", icon: "💜" },
      { name: "Elemental Staff", icon: "🔥" },
      { name: "Magic Cloak", icon: "🧥" },
      { name: "Fairy Ring", icon: "💍" },
      { name: "Dragon Heart", icon: "❤️" }
    ]
  },
  romance: {
    weather: [
      { name: "Cherry Blossom Rain", icon: "🌸" },
      { name: "First Snow", icon: "❄️" },
      { name: "Sunset", icon: "🌇" },
      { name: "After Rain", icon: "🌈" },
      { name: "Starry Sky", icon: "⭐" },
      { name: "Morning Light", icon: "🌅" },
      { name: "Moonlight", icon: "🌙" },
      { name: "Neon Lights", icon: "🌃" },
      { name: "Misty", icon: "🌫️" },
      { name: "Shooting Star", icon: "🌠" },
      { name: "Twilight", icon: "🌆" },
      { name: "Dawn", icon: "🌤️" },
      { name: "Cloudy", icon: "☁️" },
      { name: "Rainy Day", icon: "🌧️" },
      { name: "Sunny Day", icon: "☀️" },
      { name: "Snowy Day", icon: "🌨️" },
      { name: "Partly Cloudy", icon: "⛅" },
      { name: "Frost", icon: "🍂" },
      { name: "Thunderstorm", icon: "⛈️" },
      { name: "Rainbow", icon: "🌈" }
    ],
    terrain: [
      { name: "Cafe", icon: "☕" },
      { name: "Park", icon: "🌳" },
      { name: "Library", icon: "📚" },
      { name: "Seaside", icon: "🏖️" },
      { name: "Mountain Top", icon: "⛰️" },
      { name: "Subway Station", icon: "🚇" },
      { name: "Shopping Mall", icon: "🛒" },
      { name: "Old Street", icon: "🏘️" },
      { name: "Campus", icon: "🏫" },
      { name: "Office", icon: "🏢" },
      { name: "Rooftop", icon: "🌃" },
      { name: "Bridge", icon: "🌉" },
      { name: "Train Station", icon: "🚉" },
      { name: "Airport", icon: "✈️" },
      { name: "Hospital", icon: "🏥" },
      { name: "School", icon: "🎓" },
      { name: "Restaurant", icon: "🍽️" },
      { name: "Bar", icon: "🍸" },
      { name: "Bookstore", icon: "📖" },
      { name: "Gallery", icon: "🖼️" }
    ],
    adventure: [
      { name: "First Meeting", icon: "💫" },
      { name: "Confession", icon: "💕" },
      { name: "Misunderstanding", icon: "😔" },
      { name: "Reconciliation", icon: "🤝" },
      { name: "Companionship", icon: "👫" },
      { name: "Separation", icon: "😢" },
      { name: "Reunion", icon: "🎉" },
      { name: "Proposal", icon: "💍" },
      { name: "Date", icon: "🌹" },
      { name: "Living Together", icon: "🏠" },
      { name: "Meeting Parents", icon: "👨‍👩‍👧" },
      { name: "Expression", icon: "💌" },
      { name: "Pursuit", icon: "💝" },
      { name: "Ambiguity", icon: "💗" },
      { name: "Cold War", icon: "💔" },
      { name: "Passionate Love", icon: "❤️" },
      { name: "Engagement", icon: "💎" },
      { name: "Marriage", icon: "💒" },
      { name: "Divorce", icon: "💔" },
      { name: "Getting Back Together", icon: "💕" }
    ],
    equipment: [
      { name: "Phone", icon: "📱" },
      { name: "Coffee", icon: "☕" },
      { name: "Book", icon: "📚" },
      { name: "Umbrella", icon: "☂️" },
      { name: "Necklace", icon: "📿" },
      { name: "Letter Paper", icon: "✉️" },
      { name: "Camera", icon: "📷" },
      { name: "Music Box", icon: "🎵" },
      { name: "Headphones", icon: "🎧" },
      { name: "Watch", icon: "⌚" },
      { name: "Wallet", icon: "👛" },
      { name: "Perfume", icon: "🧴" },
      { name: "Ring", icon: "💍" },
      { name: "Flowers", icon: "💐" },
      { name: "Cake", icon: "🎂" },
      { name: "Chocolate", icon: "🍫" },
      { name: "Wine", icon: "🍷" },
      { name: "Piano", icon: "🎹" },
      { name: "Guitar", icon: "🎸" },
      { name: "Canvas", icon: "🎨" }
    ]
  },
  business: {
    weather: [
      { name: "Sunny", icon: "☀️" },
      { name: "Cloudy", icon: "☁️" },
      { name: "Rainy", icon: "🌧️" },
      { name: "Smog", icon: "🌫️" },
      { name: "Thunderstorm", icon: "⛈️" },
      { name: "Windy", icon: "💨" },
      { name: "Sandstorm", icon: "🌪️" },
      { name: "Clear Night", icon: "🌙" },
      { name: "Rainbow", icon: "🌈" },
      { name: "Partly Cloudy", icon: "⛅" },
      { name: "Light Rain", icon: "🌦️" },
      { name: "Snowy", icon: "❄️" },
      { name: "Frost", icon: "🌨️" },
      { name: "Lightning", icon: "⚡" },
      { name: "Typhoon", icon: "🌀" },
      { name: "Fog", icon: "🌫️" },
      { name: "Tornado", icon: "🌪️" },
      { name: "Storm", icon: "🌧️" },
      { name: "Blizzard", icon: "🌨️" },
      { name: "Clearing Up", icon: "🌤️" }
    ],
    terrain: [
      { name: "Office", icon: "🏢" },
      { name: "Meeting Room", icon: "📋" },
      { name: "Client Company", icon: "🏛️" },
      { name: "Airport", icon: "✈️" },
      { name: "Hotel", icon: "🏨" },
      { name: "Restaurant", icon: "🍽️" },
      { name: "Exhibition", icon: "🎪" },
      { name: "Headquarters", icon: "🏙️" },
      { name: "Factory", icon: "🏭" },
      { name: "Warehouse", icon: "📦" },
      { name: "Laboratory", icon: "🔬" },
      { name: "Office Building", icon: "🏬" },
      { name: "Lobby", icon: "🏛️" },
      { name: "Reception Area", icon: "🛋️" },
      { name: "Break Room", icon: "☕" },
      { name: "Training Room", icon: "📚" },
      { name: "Parking Lot", icon: "🅿️" },
      { name: "Rooftop", icon: "🌃" },
      { name: "Park", icon: "🌳" },
      { name: "Coffee Shop", icon: "☕" }
    ],
    adventure: [
      { name: "Negotiation", icon: "🤝" },
      { name: "Bidding", icon: "📊" },
      { name: "Crisis Management", icon: "🚨" },
      { name: "Team Management", icon: "👥" },
      { name: "Project Launch", icon: "🚀" },
      { name: "Product Launch", icon: "🎉" },
      { name: "Layoff Crisis", icon: "😔" },
      { name: "Merger", icon: "🏢" },
      { name: "IPO", icon: "📈" },
      { name: "Financing", icon: "💰" },
      { name: "Expansion", icon: "🌍" },
      { name: "Contraction", icon: "📉" },
      { name: "Transformation", icon: "🔄" },
      { name: "Upgrade", icon: "⬆️" },
      { name: "Crossover", icon: "🌐" },
      { name: "Innovation", icon: "💡" },
      { name: "Breakthrough", icon: "🎯" },
      { name: "Persistence", icon: "🛡️" },
      { name: "Achievement", icon: "🚀" },
      { name: "Rise", icon: "📈" }
    ],
    equipment: [
      { name: "Laptop", icon: "💻" },
      { name: "Business Card", icon: "💳" },
      { name: "Contract", icon: "📄" },
      { name: "Projector", icon: "📽️" },
      { name: "Whiteboard", icon: "📋" },
      { name: "Coffee Cup", icon: "☕" },
      { name: "Suitcase", icon: "🧳" },
      { name: "Trophy", icon: "🏆" },
      { name: "Seal", icon: "📛" },
      { name: "Pen", icon: "🖊️" },
      { name: "Planner", icon: "📓" },
      { name: "Tablet", icon: "📱" },
      { name: "Headset", icon: "🎧" },
      { name: "Smart Watch", icon: "⌚" },
      { name: "Translator", icon: "🗣️" },
      { name: "Scanner", icon: "📠" },
      { name: "Printer", icon: "🖨️" },
      { name: "Safe", icon: "🔒" },
      { name: "Display Board", icon: "🖼️" },
      { name: "Directory", icon: "📒" }
    ]
  }
};

const bookTypeMap = {
  'preset-ai-': 'ai',
  'preset-adventure-': 'adventure',
  'preset-fantasy-': 'fantasy',
  'preset-romance-': 'romance',
  'preset-business-': 'business'
};

function getBookType(bookId) {
  for (const [prefix, type] of Object.entries(bookTypeMap)) {
    if (bookId.startsWith(prefix)) return type;
  }
  return null;
}

const results = [];

for (const bookId of presetBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  
  const bookTypeMatch = htmlContent.match(/bookType:\s*['"](\w+)['"]/);
  const bookType = bookTypeMatch ? bookTypeMatch[1] : getBookType(bookId);
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  if (!plotCardsMatch) continue;
  
  try {
    const plotCards = JSON.parse(plotCardsMatch[1]);
    
    const analysis = {
      bookId,
      bookType,
      totalCards: plotCards.length,
      matchedCards: [],
      unmatchedCards: [],
      duplicateEmojis: []
    };
    
    const iconCounts = {};
    const standardConfig = standardEmojis[bookType];
    
    for (const card of plotCards) {
      const subType = card.sub_type;
      const cardName = card.name;
      const currentIcon = card.icon || '';
      
      if (!iconCounts[currentIcon]) iconCounts[currentIcon] = [];
      iconCounts[currentIcon].push(cardName);
      
      if (standardConfig && standardConfig[subType]) {
        const standardCard = standardConfig[subType].find(c => 
          c.name.toLowerCase() === cardName.toLowerCase()
        );
        
        if (standardCard) {
          analysis.matchedCards.push({
            cardId: card.card_id,
            subType,
            name: cardName,
            currentIcon,
            standardIcon: standardCard.icon,
            needsUpdate: currentIcon !== standardCard.icon
          });
        } else {
          analysis.unmatchedCards.push({
            cardId: card.card_id,
            subType,
            name: cardName,
            currentIcon
          });
        }
      } else {
        analysis.unmatchedCards.push({
          cardId: card.card_id,
          subType,
          name: cardName,
          currentIcon,
          reason: !standardConfig ? 'No standard config for book type' : 'No config for sub type'
        });
      }
    }
    
    for (const [icon, cards] of Object.entries(iconCounts)) {
      if (cards.length > 1) {
        analysis.duplicateEmojis.push({ icon, count: cards.length, cards });
      }
    }
    
    results.push(analysis);
  } catch (e) {
    console.log(`[ERROR] Failed to parse ${bookId}: ${e.message}`);
  }
}

console.log(`\n=== 预设书籍Emoji分析报告 ===\n`);
console.log(`总计: ${results.length} 本预设书籍\n`);

const booksWithIssues = results.filter(r => 
  r.duplicateEmojis.length > 0 || 
  r.matchedCards.some(c => c.needsUpdate) ||
  r.unmatchedCards.length > 0
);

console.log(`=== 需要修复的书籍: ${booksWithIssues.length} 本 ===\n`);

for (const book of booksWithIssues) {
  console.log(`\n${book.bookId} (type: ${book.bookType})`);
  console.log(`  总卡牌: ${book.totalCards}`);
  console.log(`  匹配标准: ${book.matchedCards.length}`);
  console.log(`  不匹配标准: ${book.unmatchedCards.length}`);
  console.log(`  重复emoji: ${book.duplicateEmojis.length}`);
  
  if (book.duplicateEmojis.length > 0) {
    console.log(`\n  重复emoji详情:`);
    for (const { icon, count, cards } of book.duplicateEmojis) {
      console.log(`    ${icon} (${count}x): ${cards.slice(0, 3).join(', ')}${cards.length > 3 ? '...' : ''}`);
    }
  }
  
  const needsUpdate = book.matchedCards.filter(c => c.needsUpdate);
  if (needsUpdate.length > 0) {
    console.log(`\n  需要更新emoji的卡牌 (前5个):`);
    for (const card of needsUpdate.slice(0, 5)) {
      console.log(`    ${card.name}: ${card.currentIcon} -> ${card.standardIcon}`);
    }
  }
}

const summary = {
  totalBooks: results.length,
  booksWithDuplicates: results.filter(r => r.duplicateEmojis.length > 0).length,
  booksWithUnmatched: results.filter(r => r.unmatchedCards.length > 0).length,
  totalMatchedCards: results.reduce((sum, r) => sum + r.matchedCards.length, 0),
  totalUnmatchedCards: results.reduce((sum, r) => sum + r.unmatchedCards.length, 0),
  totalCardsNeedingUpdate: results.reduce((sum, r) => 
    sum + r.matchedCards.filter(c => c.needsUpdate).length, 0)
};

console.log(`\n\n=== 汇总统计 ===`);
console.log(`总书籍数: ${summary.totalBooks}`);
console.log(`有重复emoji的书籍: ${summary.booksWithDuplicates}`);
console.log(`有不匹配卡牌的书籍: ${summary.booksWithUnmatched}`);
console.log(`匹配标准的卡牌: ${summary.totalMatchedCards}`);
console.log(`不匹配标准的卡牌: ${summary.totalUnmatchedCards}`);
console.log(`需要更新emoji的卡牌: ${summary.totalCardsNeedingUpdate}`);

const jsonOutput = path.join(__dirname, 'preset-emoji-analysis.json');
fs.writeFileSync(jsonOutput, JSON.stringify(results, null, 2));
console.log(`\n详细分析已保存到: ${jsonOutput}`);
