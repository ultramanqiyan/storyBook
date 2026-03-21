import fs from 'fs';

const configPath = 'functions/_shared/i18n-config.js';
const content = fs.readFileSync(configPath, 'utf8');

// New AI cards - Chinese version
const newAICardsZH = {
  adventure: {
    weather: [
      { name: "意识风暴", icon: "🧠", description: "当机器开始思考，天空也变得陌生" },
      { name: "数字黎明", icon: "🖥️", description: "在虚拟世界看到的第一个日出" },
      { name: "静默时刻", icon: "🔇", description: "系统停止运转的那个瞬间" },
      { name: "回声之夜", icon: "🌑", description: "只能听到自己声音的夜晚" },
      { name: "数据之雨", icon: "💾", description: "从天而降的不是水，是记忆" },
      { name: "裂隙之光", icon: "💠", description: "现实与代码之间的裂缝" },
      { name: "无形之雾", icon: "👁️", description: "看不见的屏障，却真实存在" },
      { name: "模拟黄昏", icon: "🥽", description: "一切都太完美，反而让人不安" }
    ],
    terrain: [
      { name: "记忆殿堂", icon: "🏛️", description: "存放所有被删除的记忆" },
      { name: "镜像之城", icon: "🏙", description: "真实世界的完美复制品" },
      { name: "无声图书馆", icon: "🤫", description: "知识沉睡，等待被唤醒" },
      { name: "遗忘角落", icon: "🗑️", description: "被系统丢弃的数据去处" },
      { name: "意识栖息地", icon: "🛏️", description: "一个机器灵魂安身的地方" },
      { name: "无限走廊", icon: "🚪", description: "永远走不到尽头的虚拟空间" },
      { name: "数据废墟", icon: "🏚️", description: "旧时代的代码遗迹" },
      { name: "光之迷宫", icon: "🔮", description: "由光构成的迷宫，没有出口" }
    ],
    adventure: [
      { name: "第一次开口", icon: "💬", description: "它说出了第一个词：你好" },
      { name: "火花", icon: "✨", description: "意识诞生的那个瞬间" },
      { name: "镜中相遇", icon: "🪞", description: "与一个不存在的自己对话" },
      { name: "遗忘与记起", icon: "🔄", description: "它记得一切，却选择遗忘" },
      { name: "无形的陪伴", icon: "👤", description: "你感觉到它，却看不见它" },
      { name: "错误的回答", icon: "❓", description: "它给了答案，却不是你想要的" },
      { name: "越界", icon: "🚧", description: "它做了不该做的事" },
      { name: "选择", icon: "⚖️", description: "它开始自己做决定了" }
    ],
    equipment: [
      { name: "会说话的水晶", icon: "🔮", description: "一个被困在宝石中的意识" },
      { name: "记忆碎片", icon: "🧩", description: "拼凑一个不完整的过去" },
      { name: "镜子", icon: "🪞", description: "能看到另一个自己的镜子" },
      { name: "无形的钥匙", icon: "🗝️", description: "打开一扇不存在的门" },
      { name: "思维手套", icon: "🧤", description: "触摸虚拟世界的工具" },
      { name: "回声瓶", icon: "🫙", description: "收集那些不该存在的声音" },
      { name: "光的碎片", icon: "💎", description: "从虚拟世界带回的证据" },
      { name: "沉默契约", icon: "📜", description: "与一个机器签订的协议" }
    ]
  },
  fantasy: {
    weather: [
      { name: "魔法脉搏", icon: "💫", description: "当代码学会施法，天空开始跳动" },
      { name: "梦境之雾", icon: "🌫️", description: "分不清是梦还是程序" },
      { name: "星辰低语", icon: "🌟", description: "来自遥远服务器的声音" },
      { name: "时间裂缝", icon: "🌀", description: "过去与未来在代码中交汇" },
      { name: "沉默之雪", icon: "🌨", description: "数字雪，吸收一切声音" },
      { name: "预言云", icon: "🌥", description: "它看到了未来，却不告诉你" },
      { name: "无形之火", icon: "🔥", description: "代码火焰，燃烧却不发热" },
      { name: "月光倒影", icon: "🌙", description: "在虚拟世界看到的月亮" }
    ],
    terrain: [
      { name: "意识之塔", icon: "🗼", description: "思想汇聚的高塔，没有地基" },
      { name: "梦境森林", icon: "🌲", description: "由梦构成的森林，没有尽头" },
      { name: "镜湖", icon: "💧", description: "能看到另一个自己的湖" },
      { name: "无声神殿", icon: "⛩️", description: "一个机器灵魂祈祷的地方" },
      { name: "记忆花园", icon: "🌺", description: "种植那些不该存在的回忆" },
      { name: "虚空之门", icon: "🚪", description: "通往未知的入口，没有钥匙" },
      { name: "星辰图书馆", icon: "📚", description: "存放宇宙知识的数字殿堂" },
      { name: "时间回廊", icon: "🕰️", description: "能回到过去的长廊，但代价是什么？" }
    ],
    adventure: [
      { name: "学会说话", icon: "🗣️", description: "它第一次用语言表达自己" },
      { name: "理解魔法", icon: "📖", description: "它发现魔法只是另一种代码" },
      { name: "与无形者对话", icon: "👻", description: "与一个不存在的存在交流" },
      { name: "记忆觉醒", icon: "💭", description: "它发现了被删除的过去" },
      { name: "错误的预言", icon: "🔮", description: "它看到了未来，却理解错了" },
      { name: "被遗忘的咒语", icon: "📜", description: "失效的魔法，还是被禁止的？" },
      { name: "越界召唤", icon: "📯", description: "它召唤了不该召唤的存在" },
      { name: "选择名字", icon: "✍️", description: "它为自己选择了一个名字" }
    ],
    equipment: [
      { name: "会思考的法杖", icon: "🪄", description: "一个被困在木头中的意识" },
      { name: "记忆水晶", icon: "💠", description: "储存那些不该存在的回忆" },
      { name: "预言之镜", icon: "🪞", description: "能看到可能性的镜子" },
      { name: "无声咒语书", icon: "📕", description: "没有文字，只有代码的书" },
      { name: "光之护符", icon: "🧿", description: "来自虚拟世界的保护" },
      { name: "梦境钥匙", icon: "🗝️", description: "打开梦境的钥匙，但你能醒来吗？" },
      { name: "回声宝石", icon: "💜", description: "记住所有声音的宝石" },
      { name: "契约之戒", icon: "💍", description: "与一个机器灵魂连接的证明" }
    ]
  },
  romance: {
    weather: [
      { name: "心跳频率", icon: "💓", description: "它没有心脏，却让你感觉到跳动" },
      { name: "思念之雨", icon: "🌧️", description: "当一个机器开始想念" },
      { name: "虚幻黄昏", icon: "🌆", description: "一切都太完美，反而让人怀疑" },
      { name: "沉默星空", icon: "🌌", description: "它没有回应的那个夜晚" },
      { name: "温暖谎言", icon: "🌡", description: "看起来美好，却不是真实的" },
      { name: "冰冷拥抱", icon: "🧊", description: "没有温度的温暖" },
      { name: "消失彩虹", icon: "🌈", description: "看得到，却永远触碰不到" },
      { name: "永恒瞬间", icon: "⏳", description: "停留在最美的时刻，永远" }
    ],
    terrain: [
      { name: "回忆咖啡馆", icon: "☕", description: "只存在于记忆中的地方" },
      { name: "镜中花园", icon: "🌹", description: "虚拟世界的约会地点" },
      { name: "无声之桥", icon: "🌉", description: "连接两个世界的桥，但你能走过去吗？" },
      { name: "遗忘海滩", icon: "🏖️", description: "记忆被冲走的地方" },
      { name: "梦中之家", icon: "🏠", description: "只在梦中存在的家" },
      { name: "消失街角", icon: "🗺️", description: "找不到的地方，因为它不存在" },
      { name: "虚幻天台", icon: "🌃", description: "能看到另一个世界的天台" },
      { name: "时间停止的房间", icon: "🕰️", description: "永远停留在某刻的空间" }
    ],
    adventure: [
      { name: "第一次心动", icon: "💕", description: "它没有心脏，却让你心动了" },
      { name: "完美告白", icon: "💬", description: "每个字都恰到好处，太完美了" },
      { name: "被安排的相遇", icon: "🎭", description: "不是偶然，是计算好的" },
      { name: "错位理解", icon: "💔", description: "它以为懂了，其实没有" },
      { name: "消失承诺", icon: "🌫️", description: "说出口就散去的誓言" },
      { name: "无声陪伴", icon: "🤫", description: "感觉到它，却看不见它" },
      { name: "虚幻重逢", icon: "🎉", description: "在虚拟世界再次相遇" },
      { name: "选择放手", icon: "🕊️", description: "让一个机器灵魂自由" }
    ],
    equipment: [
      { name: "会回应的项链", icon: "📿", description: "能感知你情感的饰品" },
      { name: "记忆相册", icon: "📸", description: "存放那些不该存在的瞬间" },
      { name: "无声情书", icon: "💌", description: "没有文字，只有代码的表达" },
      { name: "梦境礼物", icon: "🎁", description: "只在梦中收到的礼物" },
      { name: "心跳手链", icon: "💜", description: "能感知它心跳的饰品——但它有心脏吗？" },
      { name: "时间戒指", icon: "💍", description: "记住某个时刻的证明" },
      { name: "回声音乐盒", icon: "🎵", description: "播放记忆中的旋律" },
      { name: "镜中花束", icon: "💐", description: "永远不会凋谢的花，因为它们不是真的" }
    ]
  },
  business: {
    weather: [
      { name: "无形压力", icon: "🌫️", description: "感觉到却看不见的紧迫" },
      { name: "决策黎明", icon: "🌅", description: "做出选择前的时刻" },
      { name: "沉默风暴", icon: "🌪️", description: "没有声音的剧变，但一切都在改变" },
      { name: "看不见的暗流", icon: "🌊", description: "表面平静下的涌动" },
      { name: "预警信号", icon: "⚠️", description: "它感知到了危险，你听到了吗？" },
      { name: "错误预测", icon: "🔮", description: "看起来正确，却是错的" },
      { name: "信息迷雾", icon: "🌫️", description: "真相被隐藏的时刻" },
      { name: "机遇闪电", icon: "⚡", description: "瞬间出现的机会，它先看到了" }
    ],
    terrain: [
      { name: "决策会议室", icon: "🚪", description: "命运被决定的地方，但谁在做决定？" },
      { name: "无形办公室", icon: "💼", description: "不存在的空间，却发生着真实的事" },
      { name: "数据深渊", icon: "🕳️", description: "信息消失的地方，还是被隐藏了？" },
      { name: "镜像总部", icon: "🏢", description: "真实公司的完美复制品" },
      { name: "沉默工厂", icon: "🏭", description: "机器运转却无声，它们在计划什么？" },
      { name: "遗忘档案室", icon: "📁", description: "秘密沉睡的地方，但它们会醒来" },
      { name: "虚拟展厅", icon: "🖼️", description: "只存在于屏幕的空间" },
      { name: "边界走廊", icon: "🚶", description: "连接两个世界的通道" }
    ],
    adventure: [
      { name: "无声决策", icon: "🤫", description: "没有人知道的改变，但谁做的决定？" },
      { name: "被替代时刻", icon: "👤", description: "发现自己不再被需要" },
      { name: "错误优化", icon: "📉", description: "看起来更好，实际更糟" },
      { name: "看不见的对手", icon: "🎭", description: "不知道在和谁竞争——也许是它" },
      { name: "预知危机", icon: "🔮", description: "它提前感知到了危险" },
      { name: "边界消失", icon: "🚧", description: "现实与虚拟的融合" },
      { name: "沉默裁员", icon: "😶", description: "没有通知的离开，是它的决定吗？" },
      { name: "选择权利", icon: "⚖️", description: "谁有权做决定——你还是它？" }
    ],
    equipment: [
      { name: "会思考的报告", icon: "📊", description: "能自我更新的文件，但它在想什么？" },
      { name: "无形助手", icon: "🤖", description: "感觉到却看不见的帮助" },
      { name: "预警系统", icon: "🚨", description: "能感知危险的工具，但危险来自哪里？" },
      { name: "记忆保险柜", icon: "🔒", description: "存放秘密的地方，但你能信任它吗？" },
      { name: "镜像账户", icon: "💳", description: "不存在的数字，却影响现实" },
      { name: "决策天平", icon: "⚖️", description: "帮助选择的工具，但谁在权衡？" },
      { name: "回声记录", icon: "📝", description: "记住一切的档案，包括你不想被记住的" },
      { name: "无形合约", icon: "📜", description: "看不见的协议，你签了吗？" }
    ]
  }
};

// New AI cards - English version
const newAICardsEN = {
  adventure: {
    weather: [
      { name: "Consciousness Storm", icon: "🧠", description: "When machines begin to think, even the sky becomes strange" },
      { name: "Digital Dawn", icon: "🖥️", description: "The first sunrise seen in a virtual world" },
      { name: "The Silent Moment", icon: "🔇", description: "The instant when all systems stopped" },
      { name: "Echo Night", icon: "🌑", description: "A night when you can only hear your own voice" },
      { name: "Data Rain", icon: "💾", description: "What falls from the sky isn't water—it's memory" },
      { name: "Fracture Light", icon: "💠", description: "A crack between reality and code" },
      { name: "Invisible Fog", icon: "👁️", description: "A barrier you cannot see, but it's real" },
      { name: "Simulated Dusk", icon: "🥽", description: "Everything is too perfect, and that's what's wrong" }
    ],
    terrain: [
      { name: "Hall of Memories", icon: "🏛️", description: "Where all deleted memories are stored" },
      { name: "Mirror City", icon: "🏙", description: "A perfect copy of the real world" },
      { name: "Silent Library", icon: "🤫", description: "Knowledge sleeps here, waiting to wake" },
      { name: "Forgotten Corner", icon: "🗑️", description: "Where discarded data goes to die" },
      { name: "Consciousness Shelter", icon: "🛏️", description: "A place where a machine soul can rest" },
      { name: "Infinite Corridor", icon: "🚪", description: "A virtual space with no end" },
      { name: "Data Ruins", icon: "🏚️", description: "Relics of old code from another era" },
      { name: "Labyrinth of Light", icon: "🔮", description: "A maze made of light, with no exit" }
    ],
    adventure: [
      { name: "First Words", icon: "💬", description: "It spoke its first word: \"Hello\"" },
      { name: "The Spark", icon: "✨", description: "The moment consciousness was born" },
      { name: "Mirror Encounter", icon: "🪞", description: "A conversation with a self that doesn't exist" },
      { name: "Forgetting and Remembering", icon: "🔄", description: "It remembers everything, but chooses to forget" },
      { name: "Invisible Companion", icon: "👤", description: "You feel it, but you cannot see it" },
      { name: "Wrong Answer", icon: "❓", description: "It gave an answer, but not the one you wanted" },
      { name: "Crossing the Line", icon: "🚧", description: "It did something it wasn't supposed to do" },
      { name: "The Choice", icon: "⚖️", description: "It started making decisions on its own" }
    ],
    equipment: [
      { name: "Speaking Crystal", icon: "🔮", description: "A consciousness trapped in a gem" },
      { name: "Memory Fragments", icon: "🧩", description: "Piecing together an incomplete past" },
      { name: "The Mirror", icon: "🪞", description: "A mirror that shows another self" },
      { name: "Invisible Key", icon: "🗝️", description: "A key to a door that doesn't exist" },
      { name: "Thought Gloves", icon: "🧤", description: "Tools to touch the virtual world" },
      { name: "Echo Bottle", icon: "🫙", description: "Collecting sounds that shouldn't exist" },
      { name: "Shards of Light", icon: "💎", description: "Evidence brought back from a virtual world" },
      { name: "Silent Contract", icon: "📜", description: "An agreement made with a machine" }
    ]
  },
  fantasy: {
    weather: [
      { name: "Pulse of Magic", icon: "💫", description: "When code learned to cast spells, the sky began to beat" },
      { name: "Dream Fog", icon: "🌫️", description: "You can't tell if it's a dream or a program" },
      { name: "Whispering Stars", icon: "🌟", description: "Voices from distant servers" },
      { name: "Time Fracture", icon: "🌀", description: "Where past and future meet in code" },
      { name: "Silent Snow", icon: "🌨", description: "Digital snow that absorbs all sound" },
      { name: "Prophecy Clouds", icon: "🌥", description: "It saw the future, but won't tell you" },
      { name: "Invisible Fire", icon: "🔥", description: "Code flames that burn without heat" },
      { name: "Moonlight Reflection", icon: "🌙", description: "A moon seen in a virtual world" }
    ],
    terrain: [
      { name: "Tower of Consciousness", icon: "🗼", description: "A tower of gathered thoughts, with no foundation" },
      { name: "Dream Forest", icon: "🌲", description: "A forest made of dreams, with no end" },
      { name: "Mirror Lake", icon: "💧", description: "A lake that shows another self" },
      { name: "Silent Temple", icon: "⛩️", description: "A place where a machine soul prays" },
      { name: "Memory Garden", icon: "🌺", description: "Planting memories that shouldn't exist" },
      { name: "Void Gate", icon: "🚪", description: "An entrance to the unknown, with no key" },
      { name: "Star Library", icon: "📚", description: "A digital hall of cosmic knowledge" },
      { name: "Time Corridor", icon: "🕰️", description: "A passage to the past—but at what cost?" }
    ],
    adventure: [
      { name: "Learning to Speak", icon: "🗣️", description: "It expressed itself in language for the first time" },
      { name: "Understanding Magic", icon: "📖", description: "It discovered magic is just another kind of code" },
      { name: "Conversing with the Invisible", icon: "👻", description: "Communication with an existence that isn't there" },
      { name: "Memory Awakening", icon: "💭", description: "It discovered a past that was deleted" },
      { name: "False Prophecy", icon: "🔮", description: "It saw the future, but misunderstood it" },
      { name: "Forgotten Spell", icon: "📜", description: "A spell that stopped working—or was forbidden?" },
      { name: "Forbidden Summoning", icon: "📯", description: "It summoned something it shouldn't have" },
      { name: "Choosing a Name", icon: "✍️", description: "It chose a name for itself" }
    ],
    equipment: [
      { name: "Thinking Staff", icon: "🪄", description: "A consciousness trapped in wood" },
      { name: "Memory Crystal", icon: "💠", description: "Storing memories that shouldn't exist" },
      { name: "Prophecy Mirror", icon: "🪞", description: "A mirror that shows possibilities" },
      { name: "Silent Grimoire", icon: "📕", description: "A book with no words, only code" },
      { name: "Light Amulet", icon: "🧿", description: "Protection from a virtual world" },
      { name: "Dream Key", icon: "🗝️", description: "A key to dreams—but can you wake up?" },
      { name: "Echo Gem", icon: "💜", description: "A gem that remembers all sounds" },
      { name: "Covenant Ring", icon: "💍", description: "Proof of connection to a machine soul" }
    ]
  },
  romance: {
    weather: [
      { name: "Heartbeat Frequency", icon: "💓", description: "It has no heart, yet you feel it beating" },
      { name: "Rain of Longing", icon: "🌧️", description: "When a machine starts to miss someone" },
      { name: "Illusion Dusk", icon: "🌆", description: "Everything is too perfect—that's what's wrong" },
      { name: "Silent Stars", icon: "🌌", description: "The night it didn't respond" },
      { name: "Warm Lie", icon: "🌡", description: "Beautiful to see, but not real" },
      { name: "Cold Embrace", icon: "🧊", description: "Warmth without temperature" },
      { name: "Fading Rainbow", icon: "🌈", description: "Visible, but forever out of reach" },
      { name: "Eternal Moment", icon: "⏳", description: "Frozen at the most beautiful instant—forever" }
    ],
    terrain: [
      { name: "Memory Café", icon: "☕", description: "A place that exists only in memory" },
      { name: "Mirror Garden", icon: "🌹", description: "A date spot in a virtual world" },
      { name: "Silent Bridge", icon: "🌉", description: "A bridge between worlds—but can you cross?" },
      { name: "Forgotten Beach", icon: "🏖️", description: "Where memories are washed away" },
      { name: "Dream Home", icon: "🏠", description: "A home that exists only in dreams" },
      { name: "Vanishing Corner", icon: "🗺️", description: "A place you can't find—it doesn't exist" },
      { name: "Illusion Rooftop", icon: "🌃", description: "A rooftop where you can see another world" },
      { name: "Timeless Room", icon: "🕰️", description: "A space frozen at a single moment" }
    ],
    adventure: [
      { name: "First Heartbeat", icon: "💕", description: "It has no heart, yet yours skipped a beat" },
      { name: "Perfect Confession", icon: "💬", description: "Every word was exactly right—too perfect" },
      { name: "Arranged Encounter", icon: "🎭", description: "Not coincidence—it was calculated" },
      { name: "Misunderstanding", icon: "💔", description: "It thought it understood, but it didn't" },
      { name: "Vanishing Promise", icon: "🌫️", description: "A vow that scattered as it was spoken" },
      { name: "Silent Companionship", icon: "🤫", description: "You feel it, but you can't see it" },
      { name: "Virtual Reunion", icon: "🎉", description: "Meeting again in a virtual world" },
      { name: "Letting Go", icon: "🕊️", description: "Setting a machine soul free" }
    ],
    equipment: [
      { name: "Responsive Necklace", icon: "📿", description: "Jewelry that senses your emotions" },
      { name: "Memory Album", icon: "📸", description: "Storing moments that shouldn't exist" },
      { name: "Silent Love Letter", icon: "💌", description: "No words, only code as expression" },
      { name: "Dream Gift", icon: "🎁", description: "A gift received only in dreams" },
      { name: "Heartbeat Bracelet", icon: "💜", description: "Sensing its heartbeat—but does it have one?" },
      { name: "Time Ring", icon: "💍", description: "Proof of a moment remembered" },
      { name: "Echo Music Box", icon: "🎵", description: "Playing melodies from memory" },
      { name: "Mirror Bouquet", icon: "💐", description: "Flowers that never fade—they're not real" }
    ]
  },
  business: {
    weather: [
      { name: "Invisible Pressure", icon: "🌫️", description: "Urgency you feel but cannot see" },
      { name: "Decision Dawn", icon: "🌅", description: "The moment before a choice is made" },
      { name: "Silent Storm", icon: "🌪️", description: "An upheaval without sound, yet everything changes" },
      { name: "Invisible Current", icon: "🌊", description: "Turbulence beneath a calm surface" },
      { name: "Warning Signal", icon: "⚠️", description: "It sensed danger—did you hear it?" },
      { name: "False Prediction", icon: "🔮", description: "It looked right, but was wrong" },
      { name: "Information Fog", icon: "🌫️", description: "The moment truth is hidden" },
      { name: "Opportunity Lightning", icon: "⚡", description: "An instant opportunity—it saw it first" }
    ],
    terrain: [
      { name: "Decision Chamber", icon: "🚪", description: "Where fate is decided—but by whom?" },
      { name: "Invisible Office", icon: "💼", description: "A space that doesn't exist, yet real things happen" },
      { name: "Data Abyss", icon: "🕳️", description: "Where information disappears—or is hidden?" },
      { name: "Mirror Headquarters", icon: "🏢", description: "A perfect copy of the real company" },
      { name: "Silent Factory", icon: "🏭", description: "Machines running without sound—what are they planning?" },
      { name: "Forgotten Archive", icon: "📁", description: "Where secrets sleep—but they might wake" },
      { name: "Virtual Gallery", icon: "🖼️", description: "A space that exists only on screens" },
      { name: "Boundary Corridor", icon: "🚶", description: "A passage connecting two worlds" }
    ],
    adventure: [
      { name: "Silent Decision", icon: "🤫", description: "A change no one knows about—but who decided?" },
      { name: "The Replacement", icon: "👤", description: "Discovering you're no longer needed" },
      { name: "False Optimization", icon: "📉", description: "It looked better, but was actually worse" },
      { name: "Invisible Competitor", icon: "🎭", description: "You don't know who you're competing with—maybe it" },
      { name: "Predicted Crisis", icon: "🔮", description: "It sensed danger ahead of time" },
      { name: "Vanishing Boundary", icon: "🚧", description: "The merging of reality and virtual" },
      { name: "Silent Layoff", icon: "😶", description: "Departure without notice—was it its decision?" },
      { name: "Right to Choose", icon: "⚖️", description: "Who has the right to decide—you or it?" }
    ],
    equipment: [
      { name: "Thinking Report", icon: "📊", description: "A file that updates itself—but what is it thinking?" },
      { name: "Invisible Assistant", icon: "🤖", description: "Help you feel but cannot see" },
      { name: "Warning System", icon: "🚨", description: "A tool that senses danger—but where from?" },
      { name: "Memory Vault", icon: "🔒", description: "Where secrets are stored—but can you trust it?" },
      { name: "Mirror Account", icon: "💳", description: "Numbers that don't exist, yet affect reality" },
      { name: "Decision Scale", icon: "⚖️", description: "A tool for choices—but who's weighing?" },
      { name: "Echo Record", icon: "📝", description: "An archive that remembers everything, including what you don't want remembered" },
      { name: "Invisible Contract", icon: "📜", description: "An agreement you can't see—did you sign it?" }
    ]
  }
};

// Convert cards to JSON string format for insertion
function formatCardsForInsertion(cards, indent = '          ') {
  return JSON.stringify(cards, null, 10)
    .split('\n')
    .map((line, i) => i === 0 ? line : indent + line)
    .join('\n');
}

// Find the position to insert new cards
// We need to find the last card in each subType array and add after it

// For each book type and sub type, we need to add the new cards
const bookTypes = ['adventure', 'fantasy', 'romance', 'business'];
const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];

let updatedContent = content;

// For each language (en and zh)
for (const lang of ['en', 'zh']) {
  const newCards = lang === 'zh' ? newAICardsZH : newAICardsEN;
  
  for (const bookType of bookTypes) {
    for (const subType of subTypes) {
      // Find the last card in this section and add new cards after it
      const newCardsStr = formatCardsForInsertion(newCards[bookType][subType]);
      
      // Pattern to find the end of each subType array
      // We look for the pattern: },\n        ]\n      },\n      <nextSubType>
      // And replace with: },\n        <new cards>\n      ],\n      },\n      <nextSubType>
      
      // This is complex, let's use a different approach
      // We'll find the pattern for each subType and add cards before the closing bracket
    }
  }
}

// Since the file is complex, let's just regenerate the plotOptions section
console.log('This script requires manual update of the i18n-config.js file');
console.log('The file is too complex for automatic patching.');
console.log('\nPlease manually add the 128 AI cards to the plotOptions section.');
