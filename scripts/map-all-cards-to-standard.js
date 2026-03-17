import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const standardCards = {
  en: {
    adventure: {
      weather: ["Sunny", "Rainbow", "Breezy", "Light Rain", "Snowy", "Starry Night", "Rainbow Rain", "Golden Sunshine", "Blue Sky", "White Clouds", "Sunset", "Morning Mist", "Thunderstorm", "Cloudy", "Dust Storm", "Fog", "Meteor Shower", "Aurora", "Lunar Eclipse", "Solar Eclipse"],
      terrain: ["Forest", "Grassland", "Beach", "Cave", "Treehouse", "Garden", "Stream", "Rainbow Valley", "Lake", "Mountain Peak", "Canyon", "Island", "Wetland", "Castle", "Ruins", "Cavern", "Waterfall", "Desert", "Snow Mountain", "Rainforest"],
      adventure: ["Treasure Hunt", "Exploration", "Help Friends", "Discover Secrets", "Competition", "Camping", "Animal Watching", "Planting", "Fishing", "Cycling", "Hiking", "Mountain Climbing", "Diving", "Skiing", "Hot Air Balloon", "Maze", "Puzzle Solving", "Chase", "Rescue", "Survival"],
      equipment: ["Magnifying Glass", "Compass", "Backpack", "Flashlight", "Notebook", "Telescope", "Map", "Water Bottle", "Camera", "Sleeping Bag", "Tent", "Cookware", "First Aid Kit", "Rope", "Knife", "Lantern", "Speaker", "Drone", "Microscope", "Astronomical Telescope"]
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
    },
    business: {
      weather: ["Sunny", "Cloudy", "Rainy", "Smog", "Thunderstorm", "Windy", "Sandstorm", "Clear Night", "Rainbow", "Partly Cloudy", "Light Rain", "Snowy", "Frost", "Lightning", "Typhoon", "Fog", "Tornado", "Storm", "Blizzard", "Clearing Up"],
      terrain: ["Office", "Meeting Room", "Client Company", "Airport", "Hotel", "Restaurant", "Exhibition", "Headquarters", "Factory", "Warehouse", "Laboratory", "Office Building", "Lobby", "Reception Area", "Break Room", "Training Room", "Parking Lot", "Rooftop", "Park", "Coffee Shop"],
      adventure: ["Negotiation", "Bidding", "Crisis Management", "Team Management", "Project Launch", "Product Launch", "Layoff Crisis", "Merger", "IPO", "Financing", "Expansion", "Contraction", "Transformation", "Upgrade", "Crossover", "Innovation", "Breakthrough", "Persistence", "Achievement", "Rise"],
      equipment: ["Laptop", "Business Card", "Contract", "Projector", "Whiteboard", "Coffee Cup", "Suitcase", "Trophy", "Seal", "Pen", "Planner", "Tablet", "Headset", "Smart Watch", "Translator", "Scanner", "Printer", "Safe", "Display Board", "Directory"]
    }
  },
  zh: {
    adventure: {
      weather: ["晴天", "彩虹", "微风", "小雨", "雪天", "星空", "彩虹雨", "金色阳光", "蓝天", "白云", "日落", "晨雾", "雷雨", "阴天", "沙尘暴", "雾霾", "流星雨", "极光", "月食", "日食"],
      terrain: ["森林", "草原", "海滩", "洞穴", "树屋", "花园", "小溪", "彩虹谷", "湖泊", "山峰", "峡谷", "岛屿", "湿地", "城堡", "遗迹", "岩洞", "瀑布", "沙漠", "雪山", "雨林"],
      adventure: ["寻宝", "探险", "帮助朋友", "发现秘密", "比赛", "露营", "观察动物", "种植", "钓鱼", "骑行", "徒步", "登山", "潜水", "滑雪", "热气球", "迷宫", "解谜", "追逐", "救援", "生存"],
      equipment: ["放大镜", "指南针", "背包", "手电筒", "笔记本", "望远镜", "地图", "水壶", "相机", "睡袋", "帐篷", "炊具", "急救包", "绳索", "刀具", "灯笼", "音箱", "无人机", "显微镜", "天文望远镜"]
    },
    fantasy: {
      weather: ["魔法风暴", "血月", "极光", "元素涌动", "时空裂隙", "陨星", "永恒黄昏", "灵魂之雾", "流星火雨", "黑暗降临", "神圣之光", "元素风暴", "魔法之雨", "精灵之光", "恶魔之雾", "龙息之云", "传送门之光", "觉醒之光", "末日预兆", "创世曙光"],
      terrain: ["魔法森林", "浮空岛", "深渊", "龙巢", "古老遗迹", "水晶洞穴", "暗影沼泽", "天空之城", "魔法塔", "精灵村落", "矮人矿坑", "兽人领地", "亡灵墓地", "神殿", "异世界", "镜中世界", "时间裂隙", "元素位面", "封印之地", "神秘之海"],
      adventure: ["屠龙", "神器寻找", "诅咒解除", "魔法对决", "召唤仪式", "维度旅行", "恶魔封印", "力量觉醒", "元素觉醒", "血脉传承", "神器锻造", "魔法研究", "精灵联盟", "矮人联盟", "元素融合", "时间旅行", "灵魂救赎", "魔法试炼", "元素试炼", "守护使命"],
      equipment: ["魔法杖", "魔法书", "水晶球", "传送卷轴", "魔法药水", "护身符", "召唤石", "元素宝石", "龙鳞甲", "精灵弓", "矮人锤", "巫师帽", "魔法靴", "传送符文", "封印卷轴", "灵魂石", "元素法杖", "魔法斗篷", "精灵戒指", "龙之心"]
    },
    romance: {
      weather: ["樱花雨", "初雪", "夕阳", "雨后", "星空", "晨光", "月光", "霓虹", "薄雾", "流星", "黄昏", "黎明", "阴天", "雨天", "晴天", "雪天", "多云", "霜降", "雷雨", "彩虹"],
      terrain: ["咖啡馆", "公园", "图书馆", "海边", "山顶", "地铁站", "商场", "老街", "校园", "办公室", "天台", "桥上", "火车站", "机场", "医院", "学校", "餐厅", "酒吧", "书店", "画廊"],
      adventure: ["初遇", "告白", "误会", "和解", "陪伴", "离别", "重逢", "求婚", "约会", "同居", "见家长", "表白", "追求", "暧昧", "冷战", "热恋", "订婚", "结婚", "离婚", "复合"],
      equipment: ["手机", "咖啡", "书籍", "雨伞", "项链", "信纸", "相机", "音乐盒", "耳机", "手表", "钱包", "香水", "戒指", "鲜花", "蛋糕", "巧克力", "红酒", "钢琴", "吉他", "画布"]
    },
    business: {
      weather: ["晴天", "阴天", "雨天", "雾霾", "雷雨", "大风", "沙尘暴", "晴夜", "彩虹", "多云", "小雨", "雪天", "霜冻", "闪电", "台风", "大雾", "龙卷风", "暴风雨", "暴雪", "转晴"],
      terrain: ["办公室", "会议室", "客户公司", "机场", "酒店", "餐厅", "展会", "总部", "工厂", "仓库", "实验室", "写字楼", "大厅", "接待区", "休息室", "培训室", "停车场", "天台", "公园", "咖啡厅"],
      adventure: ["谈判", "竞标", "危机处理", "团队管理", "项目启动", "产品发布", "裁员危机", "并购", "上市", "融资", "扩张", "收缩", "转型", "升级", "跨界", "创新", "突破", "坚守", "成就", "崛起"],
      equipment: ["笔记本电脑", "名片", "合同", "投影仪", "白板", "咖啡杯", "公文包", "奖杯", "印章", "签字笔", "记事本", "平板电脑", "耳机", "智能手表", "翻译器", "扫描仪", "打印机", "保险箱", "展示板", "通讯录"]
    }
  }
};

const standardIcons = {
  en: {
    adventure: {
      weather: { "Sunny": "☀️", "Rainbow": "🌈", "Breezy": "🌬️", "Light Rain": "🌧️", "Snowy": "❄️", "Starry Night": "🌙", "Rainbow Rain": "🌦️", "Golden Sunshine": "🌅", "Blue Sky": "🌤️", "White Clouds": "☁️", "Sunset": "🌇", "Morning Mist": "🌫️", "Thunderstorm": "⛈️", "Cloudy": "🌥️", "Dust Storm": "🌪️", "Fog": "😷", "Meteor Shower": "🌠", "Aurora": "🌌", "Lunar Eclipse": "🌚", "Solar Eclipse": "🌑" },
      terrain: { "Forest": "🌲", "Grassland": "🌿", "Beach": "🏖️", "Cave": "🕳️", "Treehouse": "🏡", "Garden": "🌻", "Stream": "💧", "Rainbow Valley": "🌈", "Lake": "🏞️", "Mountain Peak": "⛰️", "Canyon": "🏔️", "Island": "🏝️", "Wetland": "🌾", "Castle": "🏰", "Ruins": "🏚️", "Cavern": "🪨", "Waterfall": "💦", "Desert": "🏜️", "Snow Mountain": "🗻", "Rainforest": "🌴" },
      adventure: { "Treasure Hunt": "🗺️", "Exploration": "🧭", "Help Friends": "🤝", "Discover Secrets": "🔮", "Competition": "🏆", "Camping": "⛺", "Animal Watching": "🦋", "Planting": "🌱", "Fishing": "🎣", "Cycling": "🚴", "Hiking": "🚶", "Mountain Climbing": "🧗", "Diving": "🤿", "Skiing": "⛷️", "Hot Air Balloon": "🎈", "Maze": "🌀", "Puzzle Solving": "🧩", "Chase": "🏃", "Rescue": "🆘", "Survival": "🏕️" },
      equipment: { "Magnifying Glass": "🔍", "Compass": "🧭", "Backpack": "🎒", "Flashlight": "🔦", "Notebook": "📓", "Telescope": "🔭", "Map": "🗺️", "Water Bottle": "🥤", "Camera": "📷", "Sleeping Bag": "🛏️", "Tent": "⛺", "Cookware": "🍳", "First Aid Kit": "🩹", "Rope": "🪢", "Knife": "🔪", "Lantern": "💡", "Speaker": "🔊", "Drone": "🛸", "Microscope": "🔬", "Astronomical Telescope": "🌌" }
    },
    fantasy: {
      weather: { "Magic Storm": "🌀", "Blood Moon": "🔴", "Aurora": "🌌", "Elemental Turbulence": "⚡", "Time Rift": "🕳️", "Falling Stars": "💫", "Eternal Dusk": "🌆", "Soul Fog": "👻", "Meteor Fire Rain": "☄️", "Darkness Falls": "🌑", "Divine Light": "✨", "Elemental Storm": "🌪️", "Magic Rain": "💧", "Fairy Light": "🧚", "Demon Fog": "😈", "Dragon Breath Cloud": "🐉", "Portal Light": "🚪", "Awakening Light": "🌟", "Apocalypse Vision": "🌋", "Genesis Dawn": "🌅" },
      terrain: { "Magic Forest": "🌳", "Floating Island": "🏝️", "Abyss": "🕳️", "Dragon's Lair": "🐉", "Ancient Ruins": "🏛️", "Crystal Cave": "💎", "Shadow Swamp": "🌑", "Sky City": "🏰", "Magic Tower": "🗼", "Fairy Village": "🧚", "Dwarf Mine": "⛏️", "Orc Territory": "👹", "Undead Cemetery": "💀", "Temple": "⛩️", "Otherworld": "🌐", "Mirror Dimension": "🪞", "Time Fissure": "⏳", "Elemental Plane": "🔥", "Sealed Land": "🔒", "Mystic Sea": "🌊" },
      adventure: { "Dragon Slaying": "🐉", "Artifact Hunt": "⚔️", "Curse Breaking": "🔮", "Magic Duel": "⚡", "Summoning Ritual": "🌀", "Dimension Travel": "🌀", "Demon Sealing": "😈", "Power Awakening": "💫", "Elemental Awakening": "🔥", "Bloodline Inheritance": "🩸", "Artifact Forging": "🔨", "Magic Research": "📚", "Fairy Alliance": "🧚", "Dwarf Alliance": "⛏️", "Element Fusion": "🌈", "Time Travel": "⏳", "Soul Redemption": "👼", "Magic Trial": "📝", "Elemental Trial": "🔥", "Guardian Mission": "🛡️" },
      equipment: { "Magic Wand": "🪄", "Grimoire": "📖", "Crystal Ball": "🔮", "Teleport Scroll": "📜", "Magic Potion": "🧪", "Amulet": "🧿", "Summoning Stone": "💎", "Elemental Gem": "💠", "Dragon Scale Armor": "🛡️", "Fairy Bow": "🏹", "Dwarf Hammer": "🔨", "Wizard Hat": "🎩", "Magic Boots": "👢", "Portal Rune": "🌀", "Sealing Scroll": "📜", "Soul Stone": "💜", "Elemental Staff": "🔥", "Magic Cloak": "🧥", "Fairy Ring": "💍", "Dragon Heart": "❤️" }
    },
    romance: {
      weather: { "Cherry Blossom Rain": "🌸", "First Snow": "❄️", "Sunset": "🌇", "After Rain": "🌈", "Starry Sky": "⭐", "Morning Light": "🌅", "Moonlight": "🌙", "Neon Lights": "🌃", "Misty": "🌫️", "Shooting Star": "🌠", "Twilight": "🌆", "Dawn": "🌤️", "Cloudy": "☁️", "Rainy Day": "🌧️", "Sunny Day": "☀️", "Snowy Day": "🌨️", "Partly Cloudy": "⛅", "Frost": "🍂", "Thunderstorm": "⛈️", "Rainbow": "🌈" },
      terrain: { "Cafe": "☕", "Park": "🌳", "Library": "📚", "Seaside": "🏖️", "Mountain Top": "⛰️", "Subway Station": "🚇", "Shopping Mall": "🛒", "Old Street": "🏘️", "Campus": "🏫", "Office": "🏢", "Rooftop": "🌃", "Bridge": "🌉", "Train Station": "🚉", "Airport": "✈️", "Hospital": "🏥", "School": "🎓", "Restaurant": "🍽️", "Bar": "🍸", "Bookstore": "📖", "Gallery": "🖼️" },
      adventure: { "First Meeting": "💫", "Confession": "💕", "Misunderstanding": "😔", "Reconciliation": "🤝", "Companionship": "👫", "Separation": "😢", "Reunion": "🎉", "Proposal": "💍", "Date": "🌹", "Living Together": "🏠", "Meeting Parents": "👨‍👩‍👧", "Expression": "💌", "Pursuit": "💝", "Ambiguity": "💗", "Cold War": "💔", "Passionate Love": "❤️", "Engagement": "💎", "Marriage": "💒", "Divorce": "💔", "Getting Back Together": "💕" },
      equipment: { "Phone": "📱", "Coffee": "☕", "Book": "📚", "Umbrella": "☂️", "Necklace": "📿", "Letter Paper": "✉️", "Camera": "📷", "Music Box": "🎵", "Headphones": "🎧", "Watch": "⌚", "Wallet": "👛", "Perfume": "🧴", "Ring": "💍", "Flowers": "💐", "Cake": "🎂", "Chocolate": "🍫", "Wine": "🍷", "Piano": "🎹", "Guitar": "🎸", "Canvas": "🎨" }
    },
    business: {
      weather: { "Sunny": "☀️", "Cloudy": "☁️", "Rainy": "🌧️", "Smog": "🌫️", "Thunderstorm": "⛈️", "Windy": "💨", "Sandstorm": "🌪️", "Clear Night": "🌙", "Rainbow": "🌈", "Partly Cloudy": "⛅", "Light Rain": "🌦️", "Snowy": "❄️", "Frost": "🌨️", "Lightning": "⚡", "Typhoon": "🌀", "Fog": "🌫️", "Tornado": "🌪️", "Storm": "🌧️", "Blizzard": "🌨️", "Clearing Up": "🌤️" },
      terrain: { "Office": "🏢", "Meeting Room": "📋", "Client Company": "🏛️", "Airport": "✈️", "Hotel": "🏨", "Restaurant": "🍽️", "Exhibition": "🎪", "Headquarters": "🏙️", "Factory": "🏭", "Warehouse": "📦", "Laboratory": "🔬", "Office Building": "🏬", "Lobby": "🏛️", "Reception Area": "🛋️", "Break Room": "☕", "Training Room": "📚", "Parking Lot": "🅿️", "Rooftop": "🌃", "Park": "🌳", "Coffee Shop": "☕" },
      adventure: { "Negotiation": "🤝", "Bidding": "📊", "Crisis Management": "🚨", "Team Management": "👥", "Project Launch": "🚀", "Product Launch": "🎉", "Layoff Crisis": "😔", "Merger": "🏢", "IPO": "📈", "Financing": "💰", "Expansion": "🌍", "Contraction": "📉", "Transformation": "🔄", "Upgrade": "⬆️", "Crossover": "🌐", "Innovation": "💡", "Breakthrough": "🎯", "Persistence": "🛡️", "Achievement": "🚀", "Rise": "📈" },
      equipment: { "Laptop": "💻", "Business Card": "💳", "Contract": "📄", "Projector": "📽️", "Whiteboard": "📋", "Coffee Cup": "☕", "Suitcase": "🧳", "Trophy": "🏆", "Seal": "📛", "Pen": "🖊️", "Planner": "📓", "Tablet": "📱", "Headset": "🎧", "Smart Watch": "⌚", "Translator": "🗣️", "Scanner": "📠", "Printer": "🖨️", "Safe": "🔒", "Display Board": "🖼️", "Directory": "📒" }
    }
  },
  zh: {
    adventure: {
      weather: { "晴天": "☀️", "彩虹": "🌈", "微风": "🌬️", "小雨": "🌧️", "雪天": "❄️", "星空": "🌙", "彩虹雨": "🌦️", "金色阳光": "🌅", "蓝天": "🌤️", "白云": "☁️", "日落": "🌇", "晨雾": "🌫️", "雷雨": "⛈️", "阴天": "🌥️", "沙尘暴": "🌪️", "雾霾": "😷", "流星雨": "🌠", "极光": "🌌", "月食": "🌚", "日食": "🌑" },
      terrain: { "森林": "🌲", "草原": "🌿", "海滩": "🏖️", "洞穴": "🕳️", "树屋": "🏡", "花园": "🌻", "小溪": "💧", "彩虹谷": "🌈", "湖泊": "🏞️", "山峰": "⛰️", "峡谷": "🏔️", "岛屿": "🏝️", "湿地": "🌾", "城堡": "🏰", "遗迹": "🏚️", "岩洞": "🪨", "瀑布": "💦", "沙漠": "🏜️", "雪山": "🗻", "雨林": "🌴" },
      adventure: { "寻宝": "🗺️", "探险": "🧭", "帮助朋友": "🤝", "发现秘密": "🔮", "比赛": "🏆", "露营": "⛺", "观察动物": "🦋", "种植": "🌱", "钓鱼": "🎣", "骑行": "🚴", "徒步": "🚶", "登山": "🧗", "潜水": "🤿", "滑雪": "⛷️", "热气球": "🎈", "迷宫": "🌀", "解谜": "🧩", "追逐": "🏃", "救援": "🆘", "生存": "🏕️" },
      equipment: { "放大镜": "🔍", "指南针": "🧭", "背包": "🎒", "手电筒": "🔦", "笔记本": "📓", "望远镜": "🔭", "地图": "🗺️", "水壶": "🥤", "相机": "📷", "睡袋": "🛏️", "帐篷": "⛺", "炊具": "🍳", "急救包": "🩹", "绳索": "🪢", "刀具": "🔪", "灯笼": "💡", "音箱": "🔊", "无人机": "🛸", "显微镜": "🔬", "天文望远镜": "🌌" }
    },
    fantasy: {
      weather: { "魔法风暴": "🌀", "血月": "🔴", "极光": "🌌", "元素涌动": "⚡", "时空裂隙": "🕳️", "陨星": "💫", "永恒黄昏": "🌆", "灵魂之雾": "👻", "流星火雨": "☄️", "黑暗降临": "🌑", "神圣之光": "✨", "元素风暴": "🌪️", "魔法之雨": "💧", "精灵之光": "🧚", "恶魔之雾": "😈", "龙息之云": "🐉", "传送门之光": "🚪", "觉醒之光": "🌟", "末日预兆": "🌋", "创世曙光": "🌅" },
      terrain: { "魔法森林": "🌳", "浮空岛": "🏝️", "深渊": "🕳️", "龙巢": "🐉", "古老遗迹": "🏛️", "水晶洞穴": "💎", "暗影沼泽": "🌑", "天空之城": "🏰", "魔法塔": "🗼", "精灵村落": "🧚", "矮人矿坑": "⛏️", "兽人领地": "👹", "亡灵墓地": "💀", "神殿": "⛩️", "异世界": "🌐", "镜中世界": "🪞", "时间裂隙": "⏳", "元素位面": "🔥", "封印之地": "🔒", "神秘之海": "🌊" },
      adventure: { "屠龙": "🐉", "神器寻找": "⚔️", "诅咒解除": "🔮", "魔法对决": "⚡", "召唤仪式": "🌀", "维度旅行": "🌀", "恶魔封印": "😈", "力量觉醒": "💫", "元素觉醒": "🔥", "血脉传承": "🩸", "神器锻造": "🔨", "魔法研究": "📚", "精灵联盟": "🧚", "矮人联盟": "⛏️", "元素融合": "🌈", "时间旅行": "⏳", "灵魂救赎": "👼", "魔法试炼": "📝", "元素试炼": "🔥", "守护使命": "🛡️" },
      equipment: { "魔法杖": "🪄", "魔法书": "📖", "水晶球": "🔮", "传送卷轴": "📜", "魔法药水": "🧪", "护身符": "🧿", "召唤石": "💎", "元素宝石": "💠", "龙鳞甲": "🛡️", "精灵弓": "🏹", "矮人锤": "🔨", "巫师帽": "🎩", "魔法靴": "👢", "传送符文": "🌀", "封印卷轴": "📜", "灵魂石": "💜", "元素法杖": "🔥", "魔法斗篷": "🧥", "精灵戒指": "💍", "龙之心": "❤️" }
    },
    romance: {
      weather: { "樱花雨": "🌸", "初雪": "❄️", "夕阳": "🌇", "雨后": "🌈", "星空": "⭐", "晨光": "🌅", "月光": "🌙", "霓虹": "🌃", "薄雾": "🌫️", "流星": "🌠", "黄昏": "🌆", "黎明": "🌤️", "阴天": "☁️", "雨天": "🌧️", "晴天": "☀️", "雪天": "🌨️", "多云": "⛅", "霜降": "🍂", "雷雨": "⛈️", "彩虹": "🌈" },
      terrain: { "咖啡馆": "☕", "公园": "🌳", "图书馆": "📚", "海边": "🏖️", "山顶": "⛰️", "地铁站": "🚇", "商场": "🛒", "老街": "🏘️", "校园": "🏫", "办公室": "🏢", "天台": "🌃", "桥上": "🌉", "火车站": "🚉", "机场": "✈️", "医院": "🏥", "学校": "🎓", "餐厅": "🍽️", "酒吧": "🍸", "书店": "📖", "画廊": "🖼️" },
      adventure: { "初遇": "💫", "告白": "💕", "误会": "😔", "和解": "🤝", "陪伴": "👫", "离别": "😢", "重逢": "🎉", "求婚": "💍", "约会": "🌹", "同居": "🏠", "见家长": "👨‍👩‍👧", "表白": "💌", "追求": "💝", "暧昧": "💗", "冷战": "💔", "热恋": "❤️", "订婚": "💎", "结婚": "💒", "离婚": "💔", "复合": "💕" },
      equipment: { "手机": "📱", "咖啡": "☕", "书籍": "📚", "雨伞": "☂️", "项链": "📿", "信纸": "✉️", "相机": "📷", "音乐盒": "🎵", "耳机": "🎧", "手表": "⌚", "钱包": "👛", "香水": "🧴", "戒指": "💍", "鲜花": "💐", "蛋糕": "🎂", "巧克力": "🍫", "红酒": "🍷", "钢琴": "🎹", "吉他": "🎸", "画布": "🎨" }
    },
    business: {
      weather: { "晴天": "☀️", "阴天": "☁️", "雨天": "🌧️", "雾霾": "🌫️", "雷雨": "⛈️", "大风": "💨", "沙尘暴": "🌪️", "晴夜": "🌙", "彩虹": "🌈", "多云": "⛅", "小雨": "🌦️", "雪天": "❄️", "霜冻": "🌨️", "闪电": "⚡", "台风": "🌀", "大雾": "🌫️", "龙卷风": "🌪️", "暴风雨": "🌧️", "暴雪": "🌨️", "转晴": "🌤️" },
      terrain: { "办公室": "🏢", "会议室": "📋", "客户公司": "🏛️", "机场": "✈️", "酒店": "🏨", "餐厅": "🍽️", "展会": "🎪", "总部": "🏙️", "工厂": "🏭", "仓库": "📦", "实验室": "🔬", "写字楼": "🏬", "大厅": "🏛️", "接待区": "🛋️", "休息室": "☕", "培训室": "📚", "停车场": "🅿️", "天台": "🌃", "公园": "🌳", "咖啡厅": "☕" },
      adventure: { "谈判": "🤝", "竞标": "📊", "危机处理": "🚨", "团队管理": "👥", "项目启动": "🚀", "产品发布": "🎉", "裁员危机": "😔", "并购": "🏢", "上市": "📈", "融资": "💰", "扩张": "🌍", "收缩": "📉", "转型": "🔄", "升级": "⬆️", "跨界": "🌐", "创新": "💡", "突破": "🎯", "坚守": "🛡️", "成就": "🚀", "崛起": "📈" },
      equipment: { "笔记本电脑": "💻", "名片": "💳", "合同": "📄", "投影仪": "📽️", "白板": "📋", "咖啡杯": "☕", "公文包": "🧳", "奖杯": "🏆", "印章": "📛", "签字笔": "🖊️", "记事本": "📓", "平板电脑": "📱", "耳机": "🎧", "智能手表": "⌚", "翻译器": "🗣️", "扫描仪": "📠", "打印机": "🖨️", "保险箱": "🔒", "展示板": "🖼️", "通讯录": "📒" }
    }
  }
};

function getAllStandardCards(lang) {
  const all = { weather: new Set(), terrain: new Set(), adventure: new Set(), equipment: new Set() };
  const types = ['adventure', 'fantasy', 'romance', 'business'];
  for (const type of types) {
    for (const subType of ['weather', 'terrain', 'adventure', 'equipment']) {
      for (const card of standardCards[lang][type][subType]) {
        all[subType].add(card);
      }
    }
  }
  return all;
}

function isChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

function getBookType(bookId) {
  if (bookId.includes('adventure')) return 'adventure';
  if (bookId.includes('fantasy')) return 'fantasy';
  if (bookId.includes('romance')) return 'romance';
  if (bookId.includes('business')) return 'business';
  if (bookId.includes('ai')) return 'ai';
  return 'adventure';
}

function mapToStandardCard(name, subType, lang, bookType) {
  const allStandard = getAllStandardCards(lang);
  const standardList = Array.from(allStandard[subType]);
  
  if (allStandard[subType].has(name)) {
    return { newName: name, icon: standardIcons[lang][bookType]?.[subType]?.[name] || standardIcons[lang]['adventure'][subType][name] };
  }
  
  const nameLower = name.toLowerCase();
  const mappings = {
    en: {
      weather: {
        'sunny morning': 'Sunny', 'rainy afternoon': 'Light Rain', 'storm warning': 'Thunderstorm',
        'cold dawn': 'Morning Mist', 'digital dawn': 'Golden Sunshine', 'data storm': 'Thunderstorm',
        'clear output': 'Sunny', 'system fog': 'Fog', 'monday morning': 'Morning Mist',
        'rainy goodbye': 'Rainy Day', 'clear conscience': 'Sunny', 'storm of resignations': 'Thunderstorm',
        'blue screen morning': 'Cloudy', 'debug storm': 'Thunderstorm', 'clean compile': 'Sunny',
        'legacy sunset': 'Sunset', 'call center dawn': 'Morning Light', 'tears in the break room': 'Rainy Day',
        'clear future': 'Sunny', 'storm of change': 'Thunderstorm', 'rainy confession': 'Rainy Day',
        'clear revelation': 'Sunny', 'storm of emotion': 'Thunderstorm', 'algorithmic dawn': 'Golden Sunshine',
        'storm of doubt': 'Thunderstorm', 'wedding sunshine': 'Sunny', 'virtual storm': 'Thunderstorm',
        'clear connection': 'Sunny', 'eternal sunset': 'Sunset', 'clear understanding': 'Sunny',
        'cloudy night': 'Cloudy', 'eternal clouds': 'Cloudy', 'courtroom tension': 'Cloudy',
        'storm of evidence': 'Thunderstorm', 'clear justice': 'Sunny', 'new dawn': 'Dawn',
        'digital dreams': 'Starry Sky', 'storm of consciousness': 'Thunderstorm', 'storm of ethics': 'Thunderstorm',
        'clear purpose': 'Sunny', 'new horizon': 'Dawn', 'layoff storm': 'Thunderstorm',
        'protest rain': 'Rainy Day', 'human dawn': 'Dawn', 'laboratory dawn': 'Morning Light',
        'storm of debate': 'Thunderstorm', 'creative dawn': 'Dawn', 'clear authenticity': 'Sunny',
        'human voice': 'Sunny', 'studio light': 'Sunny', 'clear vision': 'Sunny',
        'human light': 'Sunny', 'research dawn': 'Dawn', 'storm of discovery': 'Thunderstorm',
        'singularity dawn': 'Dawn', 'clear partnership': 'Sunny', 'hybrid horizon': 'Dawn',
        'post-human dawn': 'Dawn', 'storm of choice': 'Thunderstorm', 'clear integration': 'Sunny',
        'continuum': 'Starry Sky', 'market dawn': 'Dawn', 'shared horizon': 'Dawn',
        'algorithm dawn': 'Dawn', 'storm of questions': 'Thunderstorm', 'clear synthesis': 'Sunny',
        'new generation': 'Dawn'
      },
      terrain: {
        'corporate office': 'Office', 'coffee shop': 'Cafe', 'home office': 'Office',
        'city rooftop': 'Rooftop', 'algorithm hq': 'Office', 'server room': 'Office',
        'rooftop garden': 'Garden', 'break room': 'Break Room', 'hr office': 'Office',
        'exit interview room': 'Office', 'rooftop': 'Rooftop', 'tech conference': 'Exhibition',
        'call center floor': 'Office', 'training room': 'Training Room', 'community center': 'Park',
        'apartment': 'Office', 'digital space': 'Office', 'new city': 'Park',
        'perfectmatch hq': 'Office', 'bookstore': 'Bookstore', 'hiking trail': 'Forest',
        'wedding venue': 'Restaurant', 'elysium': 'Park', 'virtual cliff': 'Mountain Peak',
        'real world': 'Park', 'smartphone': 'Office', 'date night': 'Restaurant',
        'meditation app': 'Park', 'the cloud': 'Park', 'courtroom': 'Office',
        'law office': 'Office', 'appeals court': 'Office', 'prison': 'Office',
        'research lab': 'Laboratory', 'conference hall': 'Meeting Room', 'dream space': 'Park',
        'ethics council': 'Meeting Room', 'server farm': 'Office', 'community': 'Park',
        'university': 'School', 'corporate hq': 'Office', 'support center': 'Office',
        'cooperative': 'Office', 'mind space': 'Park', 'recording studio': 'Office',
        'concert hall': 'Restaurant', 'art school': 'School', 'memory': 'Park',
        'art studio': 'Gallery', 'gallery': 'Gallery', 'writing room': 'Library',
        'writing school': 'School', 'the future': 'Park', 'digital realm': 'Office',
        'human space': 'Park', 'hybrid world': 'Park', 'research center': 'Laboratory',
        'integration clinic': 'Hospital', 'the network': 'Office', 'new existence': 'Park',
        'memory market': 'Shopping Mall', 'transfer clinic': 'Hospital', 'memory bank': 'Library',
        'shared mind': 'Park', 'optimized home': 'Office'
      },
      adventure: {
        'career crossroads': 'Decision', 'important meeting': 'Negotiation', 'late night work': 'Team Management',
        'unexpected encounter': 'First Meeting', 'the override': 'Crisis Management', 'data review': 'Team Management',
        'system update': 'Upgrade', 'the exception': 'Crisis Management', 'the list': 'Discovery',
        'the conversation': 'Negotiation', 'the resignation': 'Separation', 'the rewrite': 'Transformation',
        'code review': 'Team Management', 'the merge': 'Merger', 'open source': 'Innovation',
        'the last training': 'Team Management', 'career workshop': 'Training', 'the human premium': 'Negotiation',
        'new beginning': 'Project Launch', 'the download': 'Discovery', 'first real date': 'Date',
        'the move': 'Transformation', 'the wedding': 'Marriage', 'the questionnaire': 'Discovery',
        'the glitch': 'Crisis Management', 'the choice': 'Decision', 'first login': 'First Meeting',
        'the upload choice': 'Decision', 'integration': 'Merger', 'the confession': 'Confession',
        'the evolution': 'Transformation', 'first session': 'First Meeting', 'the upgrade': 'Upgrade',
        'the acceptance': 'Reconciliation', 'the lifetime': 'Marriage', 'the verdict': 'Decision',
        'the investigation': 'Discovery', 'the appeal': 'Negotiation', 'the reform': 'Transformation',
        'the first dream': 'Discovery', 'the partnership': 'Negotiation', 'the recommendation': 'Negotiation',
        'the legacy': 'Achievement', 'the layoff': 'Layoff Crisis', 'the movement': 'Team Management',
        'the cooperative': 'Team Management', 'the test': 'Discovery', 'the questions': 'Discovery',
        'the decision': 'Decision', 'the spectrum': 'Discovery', 'the last song': 'Achievement',
        'the challenge': 'Competition', 'the portrait': 'Discovery', 'the school': 'Training',
        'the last book': 'Achievement', 'the element': 'Discovery', 'the search': 'Discovery',
        'the discovery': 'Discovery', 'the synthesis': 'Innovation', 'the announcement': 'Product Launch',
        'the acceleration': 'Achievement', 'the post-human': 'Transformation', 'the research': 'Discovery',
        'the continuum': 'Achievement', 'the market': 'Negotiation', 'the request': 'Negotiation',
        'the transfer': 'Transformation', 'the children': 'Discovery', 'the study': 'Discovery'
      },
      equipment: {
        'laptop': 'Laptop', 'coffee cup': 'Coffee Cup', 'old notebook': 'Notebook',
        'smartphone': 'Phone', 'access badge': 'Business Card', 'encrypted drive': 'Contract',
        'coffee': 'Coffee', 'severance package': 'Contract', 'box of belongings': 'Suitcase',
        'id badge': 'Business Card', 'resignation letter': 'Contract', 'keyboard': 'Laptop',
        'legacy code': 'Contract', 'ai assistant': 'Tablet', 'headset': 'Headset',
        'training manual': 'Planner', 'empathy': 'Ring', 'hope': 'Flowers',
        'questions': 'Notebook', 'courage': 'Trophy', 'love': 'Ring',
        'algorithm': 'Contract', 'chance': 'Ring', 'growth': 'Trophy',
        'trust': 'Ring', 'vr headset': 'Tablet', 'connection': 'Phone',
        'digital heart': 'Ring', 'phone': 'Phone', 'honesty': 'Ring',
        'acceptance': 'Ring', 'meditation': 'Watch', 'legal brief': 'Contract',
        'evidence': 'Contract', 'gavel': 'Pen', 'justice': 'Trophy',
        'neural network': 'Tablet', 'dreams': 'Notebook', 'choice': 'Ring',
        'consciousness': 'Notebook', 'human factor': 'Ring', 'judgment': 'Pen',
        'values': 'Ring', 'protest sign': 'Contract', 'community': 'Ring',
        'humanity': 'Ring', 'test protocol': 'Contract', 'guitar': 'Guitar',
        'voice': 'Phone', 'authenticity': 'Ring', 'song': 'Music Box',
        'brush': 'Pen', 'canvas': 'Canvas', 'vision': 'Notebook',
        'pen': 'Pen', 'story': 'Notebook', 'research': 'Notebook',
        'human element': 'Ring', 'collaboration': 'Ring', 'neural interface': 'Tablet',
        'quantum computer': 'Laptop', 'human experience': 'Ring', 'balance': 'Ring',
        'transcendence': 'Trophy', 'memory chip': 'Contract', 'grief': 'Ring',
        'identity': 'Ring', 'future': 'Notebook'
      }
    },
    zh: {
      weather: {
        '星空夜': '星空', '丛林': '森林'
      },
      terrain: {
        '丛林': '森林', '咖啡馆': '咖啡馆', '科考站': '实验室'
      },
      adventure: {
        '解谜': '解谜'
      },
      equipment: {}
    }
  };
  
  const langMappings = mappings[lang]?.[subType] || {};
  
  if (langMappings[nameLower]) {
    const mappedName = langMappings[nameLower];
    const icon = standardIcons[lang][bookType]?.[subType]?.[mappedName] || standardIcons[lang]['adventure'][subType][mappedName];
    return { newName: mappedName, icon };
  }
  
  const subTypeDefaults = {
    weather: lang === 'zh' ? '晴天' : 'Sunny',
    terrain: lang === 'zh' ? '森林' : 'Forest',
    adventure: lang === 'zh' ? '探险' : 'Exploration',
    equipment: lang === 'zh' ? '地图' : 'Map'
  };
  
  const defaultName = subTypeDefaults[subType];
  const defaultIcon = standardIcons[lang][bookType]?.[subType]?.[defaultName] || standardIcons[lang]['adventure'][subType][defaultName];
  
  return { newName: defaultName, icon: defaultIcon };
}

async function main() {
  const dbDir = path.join(__dirname, '..', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
  
  const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && !f.includes('-shm') && !f.includes('-wal'));
  if (files.length === 0) {
    console.error('未找到数据库文件');
    process.exit(1);
  }
  
  const sqlitePath = path.join(dbDir, files[0]);
  console.log('使用数据库:', sqlitePath);

  const { default: Database } = await import('better-sqlite3');
  const db = new Database(sqlitePath);
  
  const books = db.prepare(`
    SELECT id, title FROM books 
    WHERE id LIKE 'preset-%' 
    AND id NOT LIKE 'preset-ai-%'
    ORDER BY id
  `).all();
  
  console.log('=== 分析非AI预设书籍的卡牌 ===\n');
  console.log(`共 ${books.length} 本非AI预设书籍\n`);
  
  const allUpdates = [];
  const stats = { total: 0, needsUpdate: 0, alreadyStandard: 0 };
  
  for (const book of books) {
    const cards = db.prepare(`
      SELECT card_id, name, icon, sub_type FROM plot_cards 
      WHERE book_id = ? 
      ORDER BY sub_type, name
    `).all(book.id);
    
    const lang = isChinese(book.title) ? 'zh' : 'en';
    const bookType = getBookType(book.id);
    const allStandard = getAllStandardCards(lang);
    
    for (const card of cards) {
      stats.total++;
      
      const isStandard = allStandard[card.sub_type].has(card.name);
      
      if (!isStandard) {
        stats.needsUpdate++;
        const { newName, icon } = mapToStandardCard(card.name, card.sub_type, lang, bookType);
        allUpdates.push({
          bookId: book.id,
          cardId: card.card_id,
          oldName: card.name,
          newName: newName,
          newIcon: icon,
          subType: card.sub_type
        });
      } else {
        stats.alreadyStandard++;
      }
    }
  }
  
  console.log('=== 统计 ===');
  console.log(`总卡牌数: ${stats.total}`);
  console.log(`已是标准: ${stats.alreadyStandard}`);
  console.log(`需要更新: ${stats.needsUpdate}`);
  
  const grouped = {};
  for (const update of allUpdates) {
    const key = `${update.oldName} -> ${update.newName}`;
    if (!grouped[key]) {
      grouped[key] = { count: 0, subType: update.subType, icon: update.newIcon };
    }
    grouped[key].count++;
  }
  
  console.log('\n=== 需要更新的卡牌映射 ===');
  for (const [key, info] of Object.entries(grouped).sort((a, b) => b[1].count - a[1].count)) {
    console.log(`  [${info.subType}] ${key} (${info.count}张) -> ${info.icon}`);
  }
  
  const sqlStatements = [];
  sqlStatements.push('-- 将非标准卡牌映射到标准卡牌');
  sqlStatements.push(`-- 生成时间: ${new Date().toISOString()}`);
  sqlStatements.push('');
  
  for (const update of allUpdates) {
    sqlStatements.push(
      `UPDATE plot_cards SET name = '${update.newName.replace(/'/g, "''")}', icon = '${update.newIcon}' ` +
      `WHERE card_id = '${update.cardId}';`
    );
  }
  
  const outputPath = path.join(__dirname, '..', 'migrations', '0712_map_non_ai_cards_to_standard.sql');
  fs.writeFileSync(outputPath, sqlStatements.join('\n'));
  console.log(`\n迁移脚本已生成: ${outputPath}`);
  
  const jsonPath = path.join(__dirname, 'non-ai-card-mappings.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allUpdates, null, 2));
  console.log(`映射详情已保存: ${jsonPath}`);
  
  db.close();
}

main().catch(console.error);
