import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '../src/frontend/books');

const dbBooks = [
  'preset-adventure-003', 'preset-adventure-003-en',
  'preset-adventure-004', 'preset-adventure-004-en',
  'preset-ai-001', 'preset-ai-002', 'preset-ai-003', 'preset-ai-004',
  'preset-ai-005', 'preset-ai-006', 'preset-ai-007', 'preset-ai-008',
  'preset-ai-009', 'preset-ai-010', 'preset-ai-011', 'preset-ai-012',
  'preset-ai-013', 'preset-ai-014', 'preset-ai-015', 'preset-ai-016',
  'preset-ai-017', 'preset-ai-018', 'preset-ai-019', 'preset-ai-020',
  'preset-ai-021', 'preset-ai-022', 'preset-ai-023',
  'preset-business-003', 'preset-business-003-en',
  'preset-business-004', 'preset-business-004-en',
  'preset-fantasy-003', 'preset-fantasy-003-en',
  'preset-fantasy-004', 'preset-fantasy-004-en',
  'preset-romance-003', 'preset-romance-003-en',
  'preset-romance-004', 'preset-romance-004-en'
];

const standardEmojis = {
  adventure: {
    weather: [
      { name: "Sunny", icon: "☀️" }, { name: "Rainbow", icon: "🌈" }, { name: "Breezy", icon: "🌬️" },
      { name: "Light Rain", icon: "🌧️" }, { name: "Snowy", icon: "❄️" }, { name: "Starry Night", icon: "🌙" },
      { name: "Rainbow Rain", icon: "🌦️" }, { name: "Golden Sunshine", icon: "🌅" }, { name: "Blue Sky", icon: "🌤️" },
      { name: "White Clouds", icon: "☁️" }, { name: "Sunset", icon: "🌇" }, { name: "Morning Mist", icon: "🌫️" },
      { name: "Thunderstorm", icon: "⛈️" }, { name: "Cloudy", icon: "🌥️" }, { name: "Dust Storm", icon: "🌪️" },
      { name: "Fog", icon: "😷" }, { name: "Meteor Shower", icon: "🌠" }, { name: "Aurora", icon: "🌌" },
      { name: "Lunar Eclipse", icon: "🌚" }, { name: "Solar Eclipse", icon: "🌑" }
    ],
    terrain: [
      { name: "Forest", icon: "🌲" }, { name: "Grassland", icon: "🌿" }, { name: "Beach", icon: "🏖️" },
      { name: "Cave", icon: "🕳️" }, { name: "Treehouse", icon: "🏡" }, { name: "Garden", icon: "🌻" },
      { name: "Stream", icon: "💧" }, { name: "Rainbow Valley", icon: "🌈" }, { name: "Lake", icon: "🏞️" },
      { name: "Mountain Peak", icon: "⛰️" }, { name: "Canyon", icon: "🏔️" }, { name: "Island", icon: "🏝️" },
      { name: "Wetland", icon: "🌾" }, { name: "Castle", icon: "🏰" }, { name: "Ruins", icon: "🏚️" },
      { name: "Cavern", icon: "🪨" }, { name: "Waterfall", icon: "💦" }, { name: "Desert", icon: "🏜️" },
      { name: "Snow Mountain", icon: "🗻" }, { name: "Rainforest", icon: "🌴" }
    ],
    adventure: [
      { name: "Treasure Hunt", icon: "🗺️" }, { name: "Exploration", icon: "🧭" }, { name: "Help Friends", icon: "🤝" },
      { name: "Discover Secrets", icon: "🔮" }, { name: "Competition", icon: "🏆" }, { name: "Camping", icon: "⛺" },
      { name: "Animal Watching", icon: "🦋" }, { name: "Planting", icon: "🌱" }, { name: "Fishing", icon: "🎣" },
      { name: "Cycling", icon: "🚴" }, { name: "Hiking", icon: "🚶" }, { name: "Mountain Climbing", icon: "🧗" },
      { name: "Diving", icon: "🤿" }, { name: "Skiing", icon: "⛷️" }, { name: "Hot Air Balloon", icon: "🎈" },
      { name: "Maze", icon: "🌀" }, { name: "Puzzle Solving", icon: "🧩" }, { name: "Chase", icon: "🏃" },
      { name: "Rescue", icon: "🆘" }, { name: "Survival", icon: "🏕️" }
    ],
    equipment: [
      { name: "Magnifying Glass", icon: "🔍" }, { name: "Compass", icon: "🧭" }, { name: "Backpack", icon: "🎒" },
      { name: "Flashlight", icon: "🔦" }, { name: "Notebook", icon: "📓" }, { name: "Telescope", icon: "🔭" },
      { name: "Map", icon: "🗺️" }, { name: "Water Bottle", icon: "🥤" }, { name: "Camera", icon: "📷" },
      { name: "Sleeping Bag", icon: "🛏️" }, { name: "Tent", icon: "⛺" }, { name: "Cookware", icon: "🍳" },
      { name: "First Aid Kit", icon: "🩹" }, { name: "Rope", icon: "🪢" }, { name: "Knife", icon: "🔪" },
      { name: "Lantern", icon: "💡" }, { name: "Speaker", icon: "🔊" }, { name: "Drone", icon: "🛸" },
      { name: "Microscope", icon: "🔬" }, { name: "Astronomical Telescope", icon: "🌌" }
    ]
  },
  business: {
    weather: [
      { name: "Sunny", icon: "☀️" }, { name: "Cloudy", icon: "☁️" }, { name: "Rainy", icon: "🌧️" },
      { name: "Smog", icon: "🌫️" }, { name: "Thunderstorm", icon: "⛈️" }, { name: "Windy", icon: "💨" },
      { name: "Sandstorm", icon: "🌪️" }, { name: "Clear Night", icon: "🌙" }, { name: "Rainbow", icon: "🌈" },
      { name: "Partly Cloudy", icon: "⛅" }, { name: "Light Rain", icon: "🌦️" }, { name: "Snowy", icon: "❄️" },
      { name: "Frost", icon: "🌨️" }, { name: "Lightning", icon: "⚡" }, { name: "Typhoon", icon: "🌀" },
      { name: "Fog", icon: "🌫️" }, { name: "Tornado", icon: "🌪️" }, { name: "Storm", icon: "🌧️" },
      { name: "Blizzard", icon: "🌨️" }, { name: "Clearing Up", icon: "🌤️" }
    ],
    terrain: [
      { name: "Office", icon: "🏢" }, { name: "Meeting Room", icon: "📋" }, { name: "Client Company", icon: "🏛️" },
      { name: "Airport", icon: "✈️" }, { name: "Hotel", icon: "🏨" }, { name: "Restaurant", icon: "🍽️" },
      { name: "Exhibition", icon: "🎪" }, { name: "Headquarters", icon: "🏙️" }, { name: "Factory", icon: "🏭" },
      { name: "Warehouse", icon: "📦" }, { name: "Laboratory", icon: "🔬" }, { name: "Office Building", icon: "🏬" },
      { name: "Lobby", icon: "🏛️" }, { name: "Reception Area", icon: "🛋️" }, { name: "Break Room", icon: "☕" },
      { name: "Training Room", icon: "📚" }, { name: "Parking Lot", icon: "🅿️" }, { name: "Rooftop", icon: "🌃" },
      { name: "Park", icon: "🌳" }, { name: "Coffee Shop", icon: "☕" }
    ],
    adventure: [
      { name: "Negotiation", icon: "🤝" }, { name: "Bidding", icon: "📊" }, { name: "Crisis Management", icon: "🚨" },
      { name: "Team Management", icon: "👥" }, { name: "Project Launch", icon: "🚀" }, { name: "Product Launch", icon: "🎉" },
      { name: "Layoff Crisis", icon: "😔" }, { name: "Merger", icon: "🏢" }, { name: "IPO", icon: "📈" },
      { name: "Financing", icon: "💰" }, { name: "Expansion", icon: "🌍" }, { name: "Contraction", icon: "📉" },
      { name: "Transformation", icon: "🔄" }, { name: "Upgrade", icon: "⬆️" }, { name: "Crossover", icon: "🌐" },
      { name: "Innovation", icon: "💡" }, { name: "Breakthrough", icon: "🎯" }, { name: "Persistence", icon: "🛡️" },
      { name: "Achievement", icon: "🚀" }, { name: "Rise", icon: "📈" }
    ],
    equipment: [
      { name: "Laptop", icon: "💻" }, { name: "Business Card", icon: "💳" }, { name: "Contract", icon: "📄" },
      { name: "Projector", icon: "📽️" }, { name: "Whiteboard", icon: "📋" }, { name: "Coffee Cup", icon: "☕" },
      { name: "Suitcase", icon: "🧳" }, { name: "Trophy", icon: "🏆" }, { name: "Seal", icon: "📛" },
      { name: "Pen", icon: "🖊️" }, { name: "Planner", icon: "📓" }, { name: "Tablet", icon: "📱" },
      { name: "Headset", icon: "🎧" }, { name: "Smart Watch", icon: "⌚" }, { name: "Translator", icon: "🗣️" },
      { name: "Scanner", icon: "📠" }, { name: "Printer", icon: "🖨️" }, { name: "Safe", icon: "🔒" },
      { name: "Display Board", icon: "🖼️" }, { name: "Directory", icon: "📒" }
    ]
  },
  fantasy: {
    weather: [
      { name: "Magic Storm", icon: "🌀" }, { name: "Blood Moon", icon: "🔴" }, { name: "Aurora", icon: "🌌" },
      { name: "Elemental Turbulence", icon: "⚡" }, { name: "Time Rift", icon: "🕳️" }, { name: "Falling Stars", icon: "💫" },
      { name: "Eternal Dusk", icon: "🌆" }, { name: "Soul Fog", icon: "👻" }, { name: "Meteor Fire Rain", icon: "☄️" },
      { name: "Darkness Falls", icon: "🌑" }, { name: "Divine Light", icon: "✨" }, { name: "Elemental Storm", icon: "🌪️" },
      { name: "Magic Rain", icon: "💧" }, { name: "Fairy Light", icon: "🧚" }, { name: "Demon Fog", icon: "😈" },
      { name: "Dragon Breath Cloud", icon: "🐉" }, { name: "Portal Light", icon: "🚪" }, { name: "Awakening Light", icon: "🌟" },
      { name: "Apocalypse Vision", icon: "🌋" }, { name: "Genesis Dawn", icon: "🌅" }
    ],
    terrain: [
      { name: "Magic Forest", icon: "🌳" }, { name: "Floating Island", icon: "🏝️" }, { name: "Abyss", icon: "🕳️" },
      { name: "Dragon's Lair", icon: "🐉" }, { name: "Ancient Ruins", icon: "🏛️" }, { name: "Crystal Cave", icon: "💎" },
      { name: "Shadow Swamp", icon: "🌑" }, { name: "Sky City", icon: "🏰" }, { name: "Magic Tower", icon: "🗼" },
      { name: "Fairy Village", icon: "🧚" }, { name: "Dwarf Mine", icon: "⛏️" }, { name: "Orc Territory", icon: "👹" },
      { name: "Undead Cemetery", icon: "💀" }, { name: "Temple", icon: "⛩️" }, { name: "Otherworld", icon: "🌐" },
      { name: "Mirror Dimension", icon: "🪞" }, { name: "Time Fissure", icon: "⏳" }, { name: "Elemental Plane", icon: "🔥" },
      { name: "Sealed Land", icon: "🔒" }, { name: "Mystic Sea", icon: "🌊" }
    ],
    adventure: [
      { name: "Dragon Slaying", icon: "🐉" }, { name: "Artifact Hunt", icon: "⚔️" }, { name: "Curse Breaking", icon: "🔮" },
      { name: "Magic Duel", icon: "⚡" }, { name: "Summoning Ritual", icon: "🌀" }, { name: "Dimension Travel", icon: "🌀" },
      { name: "Demon Sealing", icon: "😈" }, { name: "Power Awakening", icon: "💫" }, { name: "Elemental Awakening", icon: "🔥" },
      { name: "Bloodline Inheritance", icon: "🩸" }, { name: "Artifact Forging", icon: "🔨" }, { name: "Magic Research", icon: "📚" },
      { name: "Fairy Alliance", icon: "🧚" }, { name: "Dwarf Alliance", icon: "⛏️" }, { name: "Element Fusion", icon: "🌈" },
      { name: "Time Travel", icon: "⏳" }, { name: "Soul Redemption", icon: "👼" }, { name: "Magic Trial", icon: "📝" },
      { name: "Elemental Trial", icon: "🔥" }, { name: "Guardian Mission", icon: "🛡️" }
    ],
    equipment: [
      { name: "Magic Wand", icon: "🪄" }, { name: "Grimoire", icon: "📖" }, { name: "Crystal Ball", icon: "🔮" },
      { name: "Teleport Scroll", icon: "📜" }, { name: "Magic Potion", icon: "🧪" }, { name: "Amulet", icon: "🧿" },
      { name: "Summoning Stone", icon: "💎" }, { name: "Elemental Gem", icon: "💠" }, { name: "Dragon Scale Armor", icon: "🛡️" },
      { name: "Fairy Bow", icon: "🏹" }, { name: "Dwarf Hammer", icon: "🔨" }, { name: "Wizard Hat", icon: "🎩" },
      { name: "Magic Boots", icon: "👢" }, { name: "Portal Rune", icon: "🌀" }, { name: "Sealing Scroll", icon: "📜" },
      { name: "Soul Stone", icon: "💜" }, { name: "Elemental Staff", icon: "🔥" }, { name: "Magic Cloak", icon: "🧥" },
      { name: "Fairy Ring", icon: "💍" }, { name: "Dragon Heart", icon: "❤️" }
    ]
  },
  romance: {
    weather: [
      { name: "Cherry Blossom Rain", icon: "🌸" }, { name: "First Snow", icon: "❄️" }, { name: "Sunset", icon: "🌇" },
      { name: "After Rain", icon: "🌈" }, { name: "Starry Sky", icon: "⭐" }, { name: "Morning Light", icon: "🌅" },
      { name: "Moonlight", icon: "🌙" }, { name: "Neon Lights", icon: "🌃" }, { name: "Misty", icon: "🌫️" },
      { name: "Shooting Star", icon: "🌠" }, { name: "Twilight", icon: "🌆" }, { name: "Dawn", icon: "🌤️" },
      { name: "Cloudy", icon: "☁️" }, { name: "Rainy Day", icon: "🌧️" }, { name: "Sunny Day", icon: "☀️" },
      { name: "Snowy Day", icon: "🌨️" }, { name: "Partly Cloudy", icon: "⛅" }, { name: "Frost", icon: "🍂" },
      { name: "Thunderstorm", icon: "⛈️" }, { name: "Rainbow", icon: "🌈" }
    ],
    terrain: [
      { name: "Cafe", icon: "☕" }, { name: "Park", icon: "🌳" }, { name: "Library", icon: "📚" },
      { name: "Seaside", icon: "🏖️" }, { name: "Mountain Top", icon: "⛰️" }, { name: "Subway Station", icon: "🚇" },
      { name: "Shopping Mall", icon: "🛒" }, { name: "Old Street", icon: "🏘️" }, { name: "Campus", icon: "🏫" },
      { name: "Office", icon: "🏢" }, { name: "Rooftop", icon: "🌃" }, { name: "Bridge", icon: "🌉" },
      { name: "Train Station", icon: "🚉" }, { name: "Airport", icon: "✈️" }, { name: "Hospital", icon: "🏥" },
      { name: "School", icon: "🎓" }, { name: "Restaurant", icon: "🍽️" }, { name: "Bar", icon: "🍸" },
      { name: "Bookstore", icon: "📖" }, { name: "Gallery", icon: "🖼️" }
    ],
    adventure: [
      { name: "First Meeting", icon: "💫" }, { name: "Confession", icon: "💕" }, { name: "Misunderstanding", icon: "😔" },
      { name: "Reconciliation", icon: "🤝" }, { name: "Companionship", icon: "👫" }, { name: "Separation", icon: "😢" },
      { name: "Reunion", icon: "🎉" }, { name: "Proposal", icon: "💍" }, { name: "Date", icon: "🌹" },
      { name: "Living Together", icon: "🏠" }, { name: "Meeting Parents", icon: "👨‍👩‍👧" }, { name: "Expression", icon: "💌" },
      { name: "Pursuit", icon: "💝" }, { name: "Ambiguity", icon: "💗" }, { name: "Cold War", icon: "💔" },
      { name: "Passionate Love", icon: "❤️" }, { name: "Engagement", icon: "💎" }, { name: "Marriage", icon: "💒" },
      { name: "Divorce", icon: "💔" }, { name: "Getting Back Together", icon: "💕" }
    ],
    equipment: [
      { name: "Phone", icon: "📱" }, { name: "Coffee", icon: "☕" }, { name: "Book", icon: "📚" },
      { name: "Umbrella", icon: "☂️" }, { name: "Necklace", icon: "📿" }, { name: "Letter Paper", icon: "✉️" },
      { name: "Camera", icon: "📷" }, { name: "Music Box", icon: "🎵" }, { name: "Headphones", icon: "🎧" },
      { name: "Watch", icon: "⌚" }, { name: "Wallet", icon: "👛" }, { name: "Perfume", icon: "🧴" },
      { name: "Ring", icon: "💍" }, { name: "Flowers", icon: "💐" }, { name: "Cake", icon: "🎂" },
      { name: "Chocolate", icon: "🍫" }, { name: "Wine", icon: "🍷" }, { name: "Piano", icon: "🎹" },
      { name: "Guitar", icon: "🎸" }, { name: "Canvas", icon: "🎨" }
    ]
  }
};

const zhStandardEmojis = {
  adventure: {
    weather: [
      { name: "晴天", icon: "☀️" }, { name: "彩虹", icon: "🌈" }, { name: "微风", icon: "🌬️" },
      { name: "小雨", icon: "🌧️" }, { name: "雪天", icon: "❄️" }, { name: "星空", icon: "🌙" },
      { name: "彩虹雨", icon: "🌦️" }, { name: "金色阳光", icon: "🌅" }, { name: "蓝天", icon: "🌤️" },
      { name: "白云", icon: "☁️" }, { name: "日落", icon: "🌇" }, { name: "晨雾", icon: "🌫️" },
      { name: "雷雨", icon: "⛈️" }, { name: "阴天", icon: "🌥️" }, { name: "沙尘暴", icon: "🌪️" },
      { name: "雾霾", icon: "😷" }, { name: "流星雨", icon: "🌠" }, { name: "极光", icon: "🌌" },
      { name: "月食", icon: "🌚" }, { name: "日食", icon: "🌑" }
    ],
    terrain: [
      { name: "森林", icon: "🌲" }, { name: "草原", icon: "🌿" }, { name: "海滩", icon: "🏖️" },
      { name: "洞穴", icon: "🕳️" }, { name: "树屋", icon: "🏡" }, { name: "花园", icon: "🌻" },
      { name: "小溪", icon: "💧" }, { name: "彩虹谷", icon: "🌈" }, { name: "湖泊", icon: "🏞️" },
      { name: "山峰", icon: "⛰️" }, { name: "峡谷", icon: "🏔️" }, { name: "岛屿", icon: "🏝️" },
      { name: "湿地", icon: "🌾" }, { name: "城堡", icon: "🏰" }, { name: "遗迹", icon: "🏚️" },
      { name: "岩洞", icon: "🪨" }, { name: "瀑布", icon: "💦" }, { name: "沙漠", icon: "🏜️" },
      { name: "雪山", icon: "🗻" }, { name: "雨林", icon: "🌴" }
    ],
    adventure: [
      { name: "寻宝", icon: "🗺️" }, { name: "探险", icon: "🧭" }, { name: "帮助朋友", icon: "🤝" },
      { name: "发现秘密", icon: "🔮" }, { name: "比赛", icon: "🏆" }, { name: "露营", icon: "⛺" },
      { name: "观察动物", icon: "🦋" }, { name: "种植", icon: "🌱" }, { name: "钓鱼", icon: "🎣" },
      { name: "骑行", icon: "🚴" }, { name: "徒步", icon: "🚶" }, { name: "登山", icon: "🧗" },
      { name: "潜水", icon: "🤿" }, { name: "滑雪", icon: "⛷️" }, { name: "热气球", icon: "🎈" },
      { name: "迷宫", icon: "🌀" }, { name: "解谜", icon: "🧩" }, { name: "追逐", icon: "🏃" },
      { name: "救援", icon: "🆘" }, { name: "生存", icon: "🏕️" }
    ],
    equipment: [
      { name: "放大镜", icon: "🔍" }, { name: "指南针", icon: "🧭" }, { name: "背包", icon: "🎒" },
      { name: "手电筒", icon: "🔦" }, { name: "笔记本", icon: "📓" }, { name: "望远镜", icon: "🔭" },
      { name: "地图", icon: "🗺️" }, { name: "水壶", icon: "🥤" }, { name: "相机", icon: "📷" },
      { name: "睡袋", icon: "🛏️" }, { name: "帐篷", icon: "⛺" }, { name: "炊具", icon: "🍳" },
      { name: "急救包", icon: "🩹" }, { name: "绳索", icon: "🪢" }, { name: "刀具", icon: "🔪" },
      { name: "灯笼", icon: "💡" }, { name: "音箱", icon: "🔊" }, { name: "无人机", icon: "🛸" },
      { name: "显微镜", icon: "🔬" }, { name: "天文望远镜", icon: "🌌" }
    ]
  },
  business: {
    weather: [
      { name: "晴天", icon: "☀️" }, { name: "阴天", icon: "☁️" }, { name: "雨天", icon: "🌧️" },
      { name: "雾霾", icon: "🌫️" }, { name: "雷雨", icon: "⛈️" }, { name: "大风", icon: "💨" },
      { name: "沙尘暴", icon: "🌪️" }, { name: "晴夜", icon: "🌙" }, { name: "彩虹", icon: "🌈" },
      { name: "多云", icon: "⛅" }, { name: "小雨", icon: "🌦️" }, { name: "雪天", icon: "❄️" },
      { name: "霜冻", icon: "🌨️" }, { name: "闪电", icon: "⚡" }, { name: "台风", icon: "🌀" },
      { name: "大雾", icon: "🌫️" }, { name: "龙卷风", icon: "🌪️" }, { name: "暴风雨", icon: "🌧️" },
      { name: "暴雪", icon: "🌨️" }, { name: "转晴", icon: "🌤️" }
    ],
    terrain: [
      { name: "办公室", icon: "🏢" }, { name: "会议室", icon: "📋" }, { name: "客户公司", icon: "🏛️" },
      { name: "机场", icon: "✈️" }, { name: "酒店", icon: "🏨" }, { name: "餐厅", icon: "🍽️" },
      { name: "展会", icon: "🎪" }, { name: "总部", icon: "🏙️" }, { name: "工厂", icon: "🏭" },
      { name: "仓库", icon: "📦" }, { name: "实验室", icon: "🔬" }, { name: "写字楼", icon: "🏬" },
      { name: "大厅", icon: "🏛️" }, { name: "接待区", icon: "🛋️" }, { name: "休息室", icon: "☕" },
      { name: "培训室", icon: "📚" }, { name: "停车场", icon: "🅿️" }, { name: "天台", icon: "🌃" },
      { name: "公园", icon: "🌳" }, { name: "咖啡厅", icon: "☕" }
    ],
    adventure: [
      { name: "谈判", icon: "🤝" }, { name: "竞标", icon: "📊" }, { name: "危机处理", icon: "🚨" },
      { name: "团队管理", icon: "👥" }, { name: "项目启动", icon: "🚀" }, { name: "产品发布", icon: "🎉" },
      { name: "裁员危机", icon: "😔" }, { name: "并购", icon: "🏢" }, { name: "上市", icon: "📈" },
      { name: "融资", icon: "💰" }, { name: "扩张", icon: "🌍" }, { name: "收缩", icon: "📉" },
      { name: "转型", icon: "🔄" }, { name: "升级", icon: "⬆️" }, { name: "跨界", icon: "🌐" },
      { name: "创新", icon: "💡" }, { name: "突破", icon: "🎯" }, { name: "坚守", icon: "🛡️" },
      { name: "成就", icon: "🚀" }, { name: "崛起", icon: "📈" }
    ],
    equipment: [
      { name: "笔记本电脑", icon: "💻" }, { name: "名片", icon: "💳" }, { name: "合同", icon: "📄" },
      { name: "投影仪", icon: "📽️" }, { name: "白板", icon: "📋" }, { name: "咖啡杯", icon: "☕" },
      { name: "公文包", icon: "🧳" }, { name: "奖杯", icon: "🏆" }, { name: "印章", icon: "📛" },
      { name: "签字笔", icon: "🖊️" }, { name: "记事本", icon: "📓" }, { name: "平板电脑", icon: "📱" },
      { name: "耳机", icon: "🎧" }, { name: "智能手表", icon: "⌚" }, { name: "翻译器", icon: "🗣️" },
      { name: "扫描仪", icon: "📠" }, { name: "打印机", icon: "🖨️" }, { name: "保险箱", icon: "🔒" },
      { name: "展示板", icon: "🖼️" }, { name: "通讯录", icon: "📒" }
    ]
  },
  fantasy: {
    weather: [
      { name: "魔法风暴", icon: "🌀" }, { name: "血月", icon: "🔴" }, { name: "极光", icon: "🌌" },
      { name: "元素涌动", icon: "⚡" }, { name: "时空裂隙", icon: "🕳️" }, { name: "陨星", icon: "💫" },
      { name: "永恒黄昏", icon: "🌆" }, { name: "灵魂之雾", icon: "👻" }, { name: "流星火雨", icon: "☄️" },
      { name: "黑暗降临", icon: "🌑" }, { name: "神圣之光", icon: "✨" }, { name: "元素风暴", icon: "🌪️" },
      { name: "魔法之雨", icon: "💧" }, { name: "精灵之光", icon: "🧚" }, { name: "恶魔之雾", icon: "😈" },
      { name: "龙息之云", icon: "🐉" }, { name: "传送门之光", icon: "🚪" }, { name: "觉醒之光", icon: "🌟" },
      { name: "末日预兆", icon: "🌋" }, { name: "创世曙光", icon: "🌅" }
    ],
    terrain: [
      { name: "魔法森林", icon: "🌳" }, { name: "浮空岛", icon: "🏝️" }, { name: "深渊", icon: "🕳️" },
      { name: "龙巢", icon: "🐉" }, { name: "古老遗迹", icon: "🏛️" }, { name: "水晶洞穴", icon: "💎" },
      { name: "暗影沼泽", icon: "🌑" }, { name: "天空之城", icon: "🏰" }, { name: "魔法塔", icon: "🗼" },
      { name: "精灵村落", icon: "🧚" }, { name: "矮人矿坑", icon: "⛏️" }, { name: "兽人领地", icon: "👹" },
      { name: "亡灵墓地", icon: "💀" }, { name: "神殿", icon: "⛩️" }, { name: "异世界", icon: "🌐" },
      { name: "镜中世界", icon: "🪞" }, { name: "时间裂隙", icon: "⏳" }, { name: "元素位面", icon: "🔥" },
      { name: "封印之地", icon: "🔒" }, { name: "神秘之海", icon: "🌊" }
    ],
    adventure: [
      { name: "屠龙", icon: "🐉" }, { name: "神器寻找", icon: "⚔️" }, { name: "诅咒解除", icon: "🔮" },
      { name: "魔法对决", icon: "⚡" }, { name: "召唤仪式", icon: "🌀" }, { name: "穿越异界", icon: "🌀" },
      { name: "恶魔封印", icon: "😈" }, { name: "力量觉醒", icon: "💫" }, { name: "元素觉醒", icon: "🔥" },
      { name: "血脉传承", icon: "🩸" }, { name: "神器锻造", icon: "🔨" }, { name: "魔法研究", icon: "📚" },
      { name: "精灵结盟", icon: "🧚" }, { name: "矮人结盟", icon: "⛏️" }, { name: "元素融合", icon: "🌈" },
      { name: "时空穿梭", icon: "⏳" }, { name: "灵魂救赎", icon: "👼" }, { name: "魔法试炼", icon: "📝" },
      { name: "元素试炼", icon: "🔥" }, { name: "守护使命", icon: "🛡️" }
    ],
    equipment: [
      { name: "魔法杖", icon: "🪄" }, { name: "魔法书", icon: "📖" }, { name: "水晶球", icon: "🔮" },
      { name: "传送卷轴", icon: "📜" }, { name: "魔法药水", icon: "🧪" }, { name: "护身符", icon: "🧿" },
      { name: "召唤石", icon: "💎" }, { name: "元素宝石", icon: "💠" }, { name: "龙鳞甲", icon: "🛡️" },
      { name: "精灵弓", icon: "🏹" }, { name: "矮人锤", icon: "🔨" }, { name: "巫师帽", icon: "🎩" },
      { name: "魔法靴", icon: "👢" }, { name: "传送符文", icon: "🌀" }, { name: "封印卷轴", icon: "📜" },
      { name: "灵魂石", icon: "💜" }, { name: "元素法杖", icon: "🔥" }, { name: "魔法斗篷", icon: "🧥" },
      { name: "精灵戒指", icon: "💍" }, { name: "龙之心", icon: "❤️" }
    ]
  },
  romance: {
    weather: [
      { name: "樱花雨", icon: "🌸" }, { name: "初雪", icon: "❄️" }, { name: "夕阳", icon: "🌇" },
      { name: "雨后", icon: "🌈" }, { name: "星空", icon: "⭐" }, { name: "晨光", icon: "🌅" },
      { name: "月光", icon: "🌙" }, { name: "霓虹", icon: "🌃" }, { name: "薄雾", icon: "🌫️" },
      { name: "流星", icon: "🌠" }, { name: "黄昏", icon: "🌆" }, { name: "黎明", icon: "🌤️" },
      { name: "阴天", icon: "☁️" }, { name: "雨天", icon: "🌧️" }, { name: "晴天", icon: "☀️" },
      { name: "雪天", icon: "🌨️" }, { name: "多云", icon: "⛅" }, { name: "霜降", icon: "🍂" },
      { name: "雷雨", icon: "⛈️" }, { name: "彩虹", icon: "🌈" }
    ],
    terrain: [
      { name: "咖啡馆", icon: "☕" }, { name: "公园", icon: "🌳" }, { name: "图书馆", icon: "📚" },
      { name: "海边", icon: "🏖️" }, { name: "山顶", icon: "⛰️" }, { name: "地铁站", icon: "🚇" },
      { name: "商场", icon: "🛒" }, { name: "老街", icon: "🏘️" }, { name: "校园", icon: "🏫" },
      { name: "办公室", icon: "🏢" }, { name: "天台", icon: "🌃" }, { name: "桥上", icon: "🌉" },
      { name: "火车站", icon: "🚉" }, { name: "机场", icon: "✈️" }, { name: "医院", icon: "🏥" },
      { name: "学校", icon: "🎓" }, { name: "餐厅", icon: "🍽️" }, { name: "酒吧", icon: "🍸" },
      { name: "书店", icon: "📖" }, { name: "画廊", icon: "🖼️" }
    ],
    adventure: [
      { name: "初遇", icon: "💫" }, { name: "告白", icon: "💕" }, { name: "误会", icon: "😔" },
      { name: "和解", icon: "🤝" }, { name: "陪伴", icon: "👫" }, { name: "离别", icon: "😢" },
      { name: "重逢", icon: "🎉" }, { name: "求婚", icon: "💍" }, { name: "约会", icon: "🌹" },
      { name: "同居", icon: "🏠" }, { name: "见家长", icon: "👨‍👩‍👧" }, { name: "表白", icon: "💌" },
      { name: "追求", icon: "💝" }, { name: "暧昧", icon: "💗" }, { name: "冷战", icon: "💔" },
      { name: "热恋", icon: "❤️" }, { name: "订婚", icon: "💎" }, { name: "结婚", icon: "💒" },
      { name: "离婚", icon: "💔" }, { name: "复合", icon: "💕" }
    ],
    equipment: [
      { name: "手机", icon: "📱" }, { name: "咖啡", icon: "☕" }, { name: "书籍", icon: "📚" },
      { name: "雨伞", icon: "☂️" }, { name: "项链", icon: "📿" }, { name: "信纸", icon: "✉️" },
      { name: "相机", icon: "📷" }, { name: "音乐盒", icon: "🎵" }, { name: "耳机", icon: "🎧" },
      { name: "手表", icon: "⌚" }, { name: "钱包", icon: "👛" }, { name: "香水", icon: "🧴" },
      { name: "戒指", icon: "💍" }, { name: "鲜花", icon: "💐" }, { name: "蛋糕", icon: "🎂" },
      { name: "巧克力", icon: "🍫" }, { name: "红酒", icon: "🍷" }, { name: "钢琴", icon: "🎹" },
      { name: "吉他", icon: "🎸" }, { name: "画布", icon: "🎨" }
    ]
  }
};

function getBookType(bookId) {
  if (bookId.includes('adventure')) return 'adventure';
  if (bookId.includes('business')) return 'business';
  if (bookId.includes('fantasy')) return 'fantasy';
  if (bookId.includes('romance')) return 'romance';
  if (bookId.includes('ai')) return 'ai';
  return null;
}

function isChineseBook(bookId) {
  return !bookId.endsWith('-en');
}

const results = [];

for (const bookId of dbBooks) {
  const htmlFile = path.join(BOOKS_DIR, `${bookId}.html`);
  
  if (!fs.existsSync(htmlFile)) {
    console.log(`[WARN] HTML file not found: ${bookId}`);
    continue;
  }
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  const bookType = getBookType(bookId);
  const isChinese = isChineseBook(bookId);
  
  const plotCardsMatch = htmlContent.match(/plotCards:\s*(\[[\s\S]*?\])\s*\}/);
  if (!plotCardsMatch) continue;
  
  try {
    const plotCards = JSON.parse(plotCardsMatch[1]);
    
    const analysis = {
      bookId,
      bookType,
      isChinese,
      totalCards: plotCards.length,
      matchedCards: [],
      unmatchedCards: [],
      duplicateEmojis: []
    };
    
    const iconCounts = {};
    const standardConfig = isChinese ? zhStandardEmojis[bookType] : standardEmojis[bookType];
    
    for (const card of plotCards) {
      const subType = card.sub_type;
      const cardName = card.name;
      const currentIcon = card.icon || '';
      
      if (!iconCounts[currentIcon]) iconCounts[currentIcon] = [];
      iconCounts[currentIcon].push(cardName);
      
      if (standardConfig && standardConfig[subType]) {
        const standardCard = standardConfig[subType].find(c => 
          c.name === cardName
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
          reason: !standardConfig ? 'No standard config for book type (AI)' : 'No config for sub type'
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

console.log(`\n=== 数据库预设书籍Emoji分析报告 ===\n`);
console.log(`总计: ${results.length} 本预设书籍\n`);

const aiBooks = results.filter(r => r.bookType === 'ai');
const enBooks = results.filter(r => !r.isChinese && r.bookType !== 'ai');
const zhBooks = results.filter(r => r.isChinese);

console.log(`=== 书籍分类 ===`);
console.log(`AI系列书籍: ${aiBooks.length} 本 (英文)`);
console.log(`其他英文书籍: ${enBooks.length} 本`);
console.log(`中文书籍: ${zhBooks.length} 本`);

const booksWithDuplicates = results.filter(r => r.duplicateEmojis.length > 0);
console.log(`\n=== 有重复emoji的书籍: ${booksWithDuplicates.length} 本 ===`);

for (const book of booksWithDuplicates) {
  console.log(`\n${book.bookId} (${book.bookType}${book.isChinese ? ', 中文' : ', 英文'})`);
  for (const { icon, count, cards } of book.duplicateEmojis) {
    console.log(`  ${icon} (${count}x): ${cards.slice(0, 3).join(', ')}${cards.length > 3 ? '...' : ''}`);
  }
}

const summary = {
  totalBooks: results.length,
  aiBooks: aiBooks.length,
  enBooks: enBooks.length,
  zhBooks: zhBooks.length,
  booksWithDuplicates: booksWithDuplicates.length,
  totalMatchedCards: results.reduce((sum, r) => sum + r.matchedCards.length, 0),
  totalUnmatchedCards: results.reduce((sum, r) => sum + r.unmatchedCards.length, 0),
  cardsNeedingUpdate: results.reduce((sum, r) => 
    sum + r.matchedCards.filter(c => c.needsUpdate).length, 0)
};

console.log(`\n\n=== 汇总统计 ===`);
console.log(`总书籍数: ${summary.totalBooks}`);
console.log(`AI系列: ${summary.aiBooks}`);
console.log(`其他英文: ${summary.enBooks}`);
console.log(`中文: ${summary.zhBooks}`);
console.log(`有重复emoji: ${summary.booksWithDuplicates}`);
console.log(`匹配标准的卡牌: ${summary.totalMatchedCards}`);
console.log(`不匹配标准的卡牌: ${summary.totalUnmatchedCards}`);
console.log(`需要更新emoji的卡牌: ${summary.cardsNeedingUpdate}`);

const jsonOutput = path.join(__dirname, 'db-preset-emoji-analysis.json');
fs.writeFileSync(jsonOutput, JSON.stringify(results, null, 2));
console.log(`\n详细分析已保存到: ${jsonOutput}`);
