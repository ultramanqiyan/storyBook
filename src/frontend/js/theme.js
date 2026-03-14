const translations = {
  en: {
    meta: {
      title: 'StoryBook - Create Your Interactive Stories',
      description: 'Create your own interactive stories with AI-powered storytelling',
      keywords: 'interactive story, story creator, AI storytelling, choose your own adventure',
      bookTitle: 'StoryBook - Book Details',
      chapterTitle: 'StoryBook - Chapter',
      directorTitle: 'Story Director - StoryBook',
      createTitle: 'Create New Story - StoryBook'
    },
    nav: {
      myLibrary: 'My Library',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      home: 'Home',
      library: 'Library',
      cancel: 'Cancel'
    },
    common: {
      required: 'Required',
      optional: 'Optional',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      custom: 'Custom',
      receive: 'Receive',
      continue: 'Continue'
    },
    genre: {
      adventure: 'Adventure',
      fantasy: 'Fantasy',
      romance: 'Romance',
      business: 'Business'
    },
    cardType: {
      weather: 'Weather Card',
      terrain: 'Terrain Card',
      adventure: 'Adventure Card',
      equipment: 'Equipment Card',
      plot: 'Plot Card'
    },
    intimacy: {
      hostile: 'Hostile',
      neutral: 'Neutral',
      friendly: 'Friendly'
    },
    home: {
      title: 'StoryBook',
      subtitle: 'Create Your Own Interactive Stories',
      beginJourney: 'Begin Your Journey',
      exploreStories: 'Explore Stories',
      featuresTitle: 'What Awaits You',
      characterCards: 'Character Cards',
      characterCardsDesc: 'Create unique heroes and villains with rich backstories',
      plotCards: 'Plot Cards',
      plotCardsDesc: 'Shape your story with weather, terrain, and adventure cards',
      interactivePuzzles: 'Interactive Puzzles',
      interactivePuzzlesDesc: 'Challenge your readers with engaging puzzles and choices',
      featuredStories: 'Featured Stories'
    },
    login: {
      welcome: 'Welcome, Traveler',
      quote: '"Every great story begins with a single step into the unknown."',
      beginJourney: 'Begin Thy Journey',
      email: 'Thy Email',
      emailPlaceholder: 'Enter thy email address',
      password: 'Thy Secret',
      passwordPlaceholder: 'Enter thy password',
      signIn: 'Sign In',
      newHere: 'New to our realm?',
      createAccount: 'Create thy account'
    },
    library: {
      pageTitle: 'Public Library',
      pageSubtitle: 'Explore ancient stories and bring them to your bookshelf',
      all: 'All',
      adventure: 'Adventure',
      fantasy: 'Fantasy',
      romance: 'Romance',
      business: 'Business',
      footer: 'May the stories guide your journey...',
      storyPreview: 'Story Preview',
      mainCharacters: 'Main Characters',
      cardPreview: 'Card Preview',
      type: 'Type',
      chapters: 'Chapters',
      importToBookshelf: 'Import to My Bookshelf',
      importSuccess: 'Import Successful!',
      importSuccessDesc: 'has been added to your bookshelf',
      goToBookshelf: 'Go to Bookshelf',
      continueExploring: 'Continue Exploring'
    },
    bookshelf: {
      title: 'My Library',
      createNew: 'Create New Story',
      allStories: 'All Stories',
      adventure: 'Adventure',
      fantasy: 'Fantasy',
      romance: 'Romance',
      business: 'Business',
      myCreations: 'My Creations',
      presetStories: 'Preset Stories',
      stories: 'stories',
      chapters: 'chapters',
      createNewStory: 'Create New',
      browseLibrary: 'Browse Public Library',
      lookingForMore: 'Looking for more stories?',
      confirmDelete: 'Confirm Delete',
      confirmDeleteMsg: 'Are you sure you want to delete',
      deleteWarning: 'Data cannot be recovered after deletion!',
      cancel: 'Cancel',
      confirmDeleteBtn: 'Confirm Delete',
      bookDeleted: 'Book deleted successfully',
      deleteFailed: 'Delete failed'
    },
    book: {
      chapters: 'Chapters',
      characters: 'Characters',
      storyCards: 'Story Cards',
      continueReading: 'Continue Reading',
      directNewChapter: 'Direct New Chapter',
      startReading: 'Start Reading',
      read: 'Read',
      current: 'Current',
      locked: 'Locked',
      progress: 'Progress',
      importToShelf: 'Import to My Shelf',
      plots: 'Plots',
      chaptersTab: 'Chapters',
      charactersTab: 'Characters',
      plotsTab: 'Plots',
      chaptersCount: 'Chapters',
      charactersCount: 'Characters',
      progressLabel: 'Progress',
      chapter: 'Chapter',
      completed: 'Completed',
      pending: 'Pending'
    },
    chapter: {
      chapter: 'Chapter',
      chapterOf: 'Chapter {0} of {1}',
      solveRiddle: 'Solve the Guardian\'s Riddle',
      previousChapter: 'Previous',
      nextChapter: 'Next',
      previous: 'Previous',
      next: 'Next',
      of: 'of',
      page: 'Page',
      characters: 'Characters',
      plots: 'Plots',
      noMoreContent: 'No more content',
      firstPage: 'This is the first page',
      lastPage: 'This is the last page',
      noPuzzle: 'No puzzle available',
      enterAnswer: 'Please enter your answer',
      selectAnswer: 'Please select an answer',
      selectOrEnter: 'Please select or enter an answer',
      correct: 'Correct! Puzzle solved!',
      wrongAnswer: 'Wrong answer, please try again',
      guardiansRiddle: 'Guardian\'s Riddle',
      backpackFull: 'Backpack Full',
      selectDiscard: 'This card type has reached the limit (8), please select one to discard',
      createCustomPlot: 'Create Custom Plot Card',
      fillCardInfo: 'Fill in card information to create your story element',
      cardType: 'Card Type',
      selectIcon: 'Select Icon',
      cardName: 'Card Name',
      cardNamePlaceholder: 'Enter card name (1-20 characters)',
      cardDesc: 'Card Description',
      cardDescPlaceholder: 'Enter card description (max 100 characters)',
      createCard: 'Create Card',
      createCustomCharacter: 'Create Custom Character',
      step: 'Step',
      basicInfo: 'Basic Info',
      selectAvatar: 'Select Avatar',
      characterName: 'Character Name',
      characterNamePlaceholder: 'Enter character name (1-20 characters)',
      roleType: 'Role Type',
      selectRoleType: 'Select role type...',
      customRoleType: 'Or enter custom type',
      personality: 'Personality',
      selectPersonality: 'Select personality...',
      customPersonality: 'Or enter custom personality',
      speechStyle: 'Speech Style',
      selectSpeechStyle: 'Select speech style...',
      customSpeechStyle: 'Or enter custom speech style',
      intimacy: 'Intimacy with Protagonist',
      createCharacter: 'Create Character',
      enterCardName: 'Please enter card name',
      selectAnIcon: 'Please select an icon',
      characterLimitReached: 'Character limit reached, please discard one before creating',
      enterCharacterName: 'Please enter character name',
      selectAnAvatar: 'Please select an avatar',
      selectOrEnterRoleType: 'Please select or enter role type',
      selectOrEnterPersonality: 'Please select or enter personality',
      selectOrEnterSpeechStyle: 'Please select or enter speech style'
    },
    director: {
      title: 'Story Director',
      subtitle: 'Select your cards and create a new chapter',
      backToBook: 'Back to Book',
      selected: 'Selected',
      deselected: 'Deselected',
      cards: 'cards',
      startProduction: 'Start Production',
      cardCollection: 'Card Collection',
      characters: 'Characters',
      weather: 'Weather',
      terrain: 'Terrain',
      adventure: 'Adventure',
      equipment: 'Equipment',
      creating: 'Creating Your Story...',
      protagonistRequired: 'Protagonist required, up to 3 supporting',
      required: 'Required',
      optional: 'Optional',
      supporting: 'Supporting',
      supporting1: 'Supporting 1',
      supporting2: 'Supporting 2',
      supporting3: 'Supporting 3',
      protagonist: 'Protagonist',
      stagePreview: 'Stage Preview',
      requiredItems: 'required items',
      noCardsAvailable: 'No cards available',
      pleaseSelect: 'Please select',
      adventureCard: 'Adventure Card',
      weatherCard: 'Weather Card',
      terrainCard: 'Terrain Card',
      maxSupportingCharacters: 'Maximum 3 supporting characters',
      chapterCreated: 'Chapter created successfully!',
      createFailed: 'Failed to create chapter',
      selectProtagonist: 'Please select a protagonist',
      selectAdventure: 'Please select an adventure card',
      selectWeather: 'Please select a weather card',
      selectTerrain: 'Please select a terrain card',
      loadDirectorFailed: 'Failed to load director data',
      createChapterFailed: 'Failed to create chapter'
    },
    create: {
      title: 'Create New Story',
      basicInfo: 'Basic Info',
      protagonist: 'Protagonist',
      companions: 'Companions',
      complete: 'Complete',
      storyBasics: 'Story Basics',
      storyTitle: 'Story Title',
      storyTitlePlaceholder: 'Enter your story\'s title...',
      genre: 'Genre',
      selectGenre: 'Select a genre...',
      description: 'Description',
      descriptionPlaceholder: 'Describe your story in a few sentences...',
      next: 'Next',
      nextProtagonist: 'Next: Protagonist',
      nextCompanions: 'Next: Companions',
      back: 'Back',
      yourProtagonist: 'Your Protagonist',
      characterName: 'Character Name',
      characterNamePlaceholder: 'Enter the hero\'s name...',
      selectAvatar: 'Select Avatar',
      characterBackground: 'Character Background',
      characterBackgroundPlaceholder: 'Tell us about your hero\'s past...',
      personality: 'Personality',
      selectPersonality: 'Select personality...',
      speechStyle: 'Speech Style',
      selectSpeechStyle: 'Select speech style...',
      roleType: 'Role Type',
      selectRoleType: 'Select role type...',
      companion: 'Companion',
      companionCharacters: 'Companion Characters',
      companionNamePlaceholder: 'Companion\'s name...',
      intimacyWithProtagonist: 'Intimacy with Protagonist',
      relationshipWithProtagonist: 'Relationship with Protagonist',
      selectRelationship: 'Select relationship...',
      customRelationshipPlaceholder: 'Enter custom relationship...',
      addCompanion: 'Add Another Companion',
      max: 'Max',
      createStory: 'Create Story',
      storyCreated: 'Story Created!',
      storyReady: 'Your story is ready to begin. Start writing your first chapter or let the Director guide you.',
      startWriting: 'Start Writing',
      useDirector: 'Use Director',
      viewStory: 'View Story',
      custom: 'Custom...',
      pleaseFillTitle: 'Please fill in title and genre',
      pleaseEnterName: 'Please enter protagonist name',
      pleaseSelectPersonality: 'Please select protagonist personality',
      pleaseSelectSpeechStyle: 'Please select protagonist speech style',
      pleaseSelectRoleType: 'Please select protagonist role type',
      pleaseSelectCompanionPersonality: 'Please select companion personality',
      pleaseSelectCompanionSpeechStyle: 'Please select companion speech style',
      pleaseSelectCompanionRoleType: 'Please select companion role type',
      creating: 'Creating story...',
      createSuccess: 'Story created successfully!',
      createFailed: 'Failed to create story'
    },
    stylePanel: {
      title: 'Select Style',
      adventure: 'Adventure',
      adventureDesc: 'Medieval Fantasy',
      fantasy: 'Fantasy',
      fantasyDesc: 'Fairy Tale',
      romance: 'Romance',
      romanceDesc: 'Modern Love',
      business: 'Business',
      businessDesc: 'British Gentleman'
    },
    footer: {
      tagline: 'StoryBook - Where Your Stories Come to Life',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact'
    },
    options: {
      personality: {
        brave: 'Brave',
        cautious: 'Cautious',
        optimistic: 'Optimistic',
        pessimistic: 'Pessimistic',
        calm: 'Calm',
        impulsive: 'Impulsive',
        kind: 'Kind',
        selfish: 'Selfish',
        humorous: 'Humorous',
        serious: 'Serious',
        gentle: 'Gentle',
        irritable: 'Irritable',
        curious: 'Curious',
        steady: 'Steady',
        lively: 'Lively',
        lazy: 'Lazy',
        extroverted: 'Extroverted',
        sinister: 'Sinister',
        easygoing: 'Easygoing',
        arrogant: 'Arrogant',
        cowardly: 'Cowardly',
        greedy: 'Greedy',
        suspicious: 'Suspicious',
        paranoid: 'Paranoid',
        indifferent: 'Indifferent'
      },
      speechStyle: {
        direct: 'Direct and Concise',
        verbose: 'Verbose and Detailed',
        polite: 'Polite and Courteous',
        sarcastic: 'Sarcastic and Sharp',
        humorous: 'Humorous and Witty',
        formal: 'Serious and Formal',
        gentle: 'Gentle and Caring',
        aggressive: 'Aggressive and Pushy',
        slow: 'Slow and Methodical',
        fast: 'Fast and Urgent',
        poetic: 'Poetic and Artistic',
        practical: 'Practical and Plain',
        exaggerated: 'Exaggerated and Vivid',
        passiveAggressive: 'Passive-Aggressive',
        enthusiastic: 'Enthusiastic and Expressive',
        cold: 'Cold and Distant',
        wise: 'Wise and Deep',
        innocent: 'Innocent and Naive',
        ironic: 'Ironic and Mocking',
        complaining: 'Complaining and Whiny',
        commanding: 'Commanding',
        dismissive: 'Dismissive',
        smooth: 'Smooth-talking',
        silent: 'Silent and Reticent',
        interrupting: 'Interrupting'
      },
      roleType: {
        adventurer: 'Adventurer',
        warrior: 'Warrior',
        mage: 'Mage',
        ranger: 'Ranger',
        priest: 'Priest',
        assassin: 'Assassin',
        druid: 'Druid',
        warlock: 'Warlock',
        paladin: 'Paladin',
        wizard: 'Wizard',
        rogue: 'Rogue',
        littleExplorer: 'Little Explorer',
        littleWarrior: 'Little Warrior',
        littleWise: 'Little Sage',
        littleAnimal: 'Little Animal',
        littleMage: 'Little Mage',
        littleInventor: 'Little Inventor',
        littleDetective: 'Little Detective',
        littleCaptain: 'Little Captain',
        whiteCollar: 'White Collar',
        student: 'Student',
        artist: 'Artist',
        doctor: 'Doctor',
        lawyer: 'Lawyer',
        journalist: 'Journalist',
        designer: 'Designer',
        programmer: 'Programmer',
        teacher: 'Teacher',
        entrepreneur: 'Entrepreneur',
        manager: 'Manager',
        specialist: 'Specialist',
        consultant: 'Consultant',
        director: 'Director',
        assistant: 'Assistant',
        sales: 'Sales',
        engineer: 'Engineer',
        analyst: 'Analyst',
        supervisor: 'Supervisor',
        explorer: 'Explorer',
        treasure_hunter: 'Treasure Hunter',
        traveler: 'Traveler',
        mage_apprentice: 'Mage Apprentice',
        summoner: 'Summoner',
        office_worker: 'Office Worker',
        investor: 'Investor'
      },
      intimacy: {
        hostile: 'Hostile',
        neutral: 'Neutral',
        friendly: 'Friendly'
      },
      relationship: {
        friend: 'Friend',
        lover: 'Lover',
        mentor: 'Mentor',
        rival: 'Rival',
        colleague: 'Colleague',
        partner: 'Partner',
        family: 'Family',
        stranger: 'Stranger'
      },
      cardType: {
        weather: 'Weather Card',
        terrain: 'Terrain Card',
        adventure: 'Adventure Card',
        equipment: 'Equipment Card'
      }
    },
    messages: {
      pleaseLogin: 'Please login first',
      inputTitle: 'Please enter book title',
      selectType: 'Please select book type',
      inputProtagonistName: 'Please enter protagonist name',
      loadConfigFailed: 'Failed to load config',
      loadRoleTypesFailed: 'Failed to load role types',
      loadBooksFailed: 'Failed to load books',
      bookNotFound: 'Book not found',
      chapterNotFound: 'Chapter not found',
      loadChapterFailed: 'Failed to load chapter',
      congratulations: 'Congratulations! You earned a card!',
      cardLimitExceeded: 'Card limit exceeded for this type (8 max), please select one to discard',
      customCardCreated: 'Custom card created successfully!',
      customCharacterCreated: 'Custom character created successfully!',
      cardReplaced: 'Card replaced successfully!',
      newCardDiscarded: 'New card discarded',
      characterLimitExceeded: 'Character limit exceeded, please discard one before creating',
      importSuccess: 'Book imported successfully! Redirecting...',
      importFailed: 'Import failed',
      cardReward: 'Congratulations! You got a card!',
      cardDiscarded: 'Card discarded',
      puzzleSolved: 'Correct! Puzzle solved!',
      plotCardCreated: 'Custom plot card created successfully!',
      characterCreated: 'Custom character created successfully!',
      chapterCreated: 'Chapter created successfully!',
      bookImported: 'Book imported successfully! Redirecting...',
      importBookFirst: 'Please import this book to your shelf first to add new chapters',
      noPuzzle: 'No puzzle available',
      firstPage: 'This is the first page',
      lastPage: 'This is the last page'
    },
    errors: {
      missingBookId: 'Missing book ID',
      missingChapterId: 'Missing chapter ID',
      puzzleNotFound: 'Puzzle not found',
      puzzleSolved: 'Puzzle already solved',
      pleaseProvideAnswer: 'Please provide an answer',
      unknownError: 'Unknown error',
      createChapterFailed: 'Failed to create chapter',
      createBookFailed: 'Failed to create book',
      deleteBookFailed: 'Failed to delete book',
      loadFailed: 'Failed to load data',
      loadBookFailed: 'Failed to load book',
      wrongAnswer: 'Wrong answer, please try again',
      createFailed: 'Failed to create',
      importFailed: 'Import failed',
      bookInfoNotFound: 'Book info not found'
    }
  },
  zh: {
    meta: {
      title: '故事书 - 创作你的互动故事',
      description: '使用AI驱动的叙事创作属于你的互动故事',
      keywords: '互动故事, 故事创作, AI叙事, 选择冒险'
    },
    nav: {
      myLibrary: '我的书架',
      signIn: '登录',
      signOut: '退出',
      home: '首页',
      library: '图书馆',
      cancel: '取消'
    },
    home: {
      title: '故事书',
      subtitle: '创作属于你的互动故事',
      beginJourney: '开启旅程',
      exploreStories: '探索故事',
      featuresTitle: '精彩功能',
      characterCards: '角色卡牌',
      characterCardsDesc: '创造独特的英雄和反派，赋予他们丰富的背景故事',
      plotCards: '情节卡牌',
      plotCardsDesc: '用天气、地形和冒险卡牌塑造你的故事',
      interactivePuzzles: '互动谜题',
      interactivePuzzlesDesc: '用引人入胜的谜题和选择挑战你的读者',
      featuredStories: '精选故事'
    },
    login: {
      welcome: '欢迎，旅行者',
      quote: '"每一个伟大的故事都始于踏入未知的第一步。"',
      beginJourney: '开始你的旅程',
      email: '你的邮箱',
      emailPlaceholder: '输入你的邮箱地址',
      password: '你的密码',
      passwordPlaceholder: '输入你的密码',
      signIn: '登录',
      newHere: '初次来到？',
      createAccount: '创建账号'
    },
    library: {
      pageTitle: '公共图书馆',
      pageSubtitle: '探索古老的故事，将它们带回你的书架',
      all: '全部',
      adventure: '冒险',
      fantasy: '奇幻',
      romance: '言情',
      business: '职场',
      footer: '愿故事指引你的旅程...',
      storyPreview: '故事预览',
      mainCharacters: '主要角色',
      cardPreview: '卡牌预览',
      type: '类型',
      chapters: '章节',
      importToBookshelf: '导入到我的书架',
      importSuccess: '导入成功！',
      importSuccessDesc: '已添加到你的书架',
      goToBookshelf: '前往书架',
      continueExploring: '继续探索'
    },
    bookshelf: {
      title: '我的书架',
      createNew: '创建新故事',
      allStories: '全部故事',
      adventure: '冒险',
      fantasy: '奇幻',
      romance: '言情',
      business: '职场',
      myCreations: '我的创作',
      presetStories: '预设故事',
      stories: '个故事',
      chapters: '章节',
      createNewStory: '创建新故事',
      browseLibrary: '浏览公共图书馆',
      lookingForMore: '寻找更多故事？',
      confirmDelete: '确认删除',
      confirmDeleteMsg: '确定要删除书籍',
      deleteWarning: '删除后数据不可恢复！',
      cancel: '取消',
      confirmDeleteBtn: '确认删除',
      bookDeleted: '书籍已删除',
      deleteFailed: '删除失败'
    },
    book: {
      chapters: '章节',
      characters: '角色',
      storyCards: '故事卡牌',
      continueReading: '继续阅读',
      directNewChapter: '导演新章节',
      startReading: '开始阅读',
      read: '已读',
      current: '当前',
      locked: '锁定',
      progress: '进度',
      importToShelf: '导入到我的书架',
      plots: '情节',
      chaptersTab: '章节',
      charactersTab: '角色',
      plotsTab: '情节',
      chaptersCount: '章节',
      charactersCount: '角色',
      progressLabel: '进度',
      chapter: '第',
      completed: '已完成',
      pending: '待完成'
    },
    chapter: {
      chapter: '第',
      chapterOf: '第 {0} 章，共 {1} 章',
      solveRiddle: '解开守护者的谜题',
      previousChapter: '上一章',
      nextChapter: '下一章',
      previous: '上一页',
      next: '下一页',
      of: '共',
      page: '页',
      characters: '角色',
      plots: '情节',
      noMoreContent: '没有更多内容',
      firstPage: '这是第一页',
      lastPage: '这是最后一页',
      noPuzzle: '没有可用的谜题',
      enterAnswer: '请输入答案',
      selectAnswer: '请选择一个答案',
      selectOrEnter: '请选择或输入答案',
      correct: '正确！谜题已解开！',
      wrongAnswer: '答案错误，请重试',
      guardiansRiddle: '守护者的谜题',
      backpackFull: '背包已满',
      selectDiscard: '该类型卡牌已达上限(8张)，请选择一张丢弃',
      createCustomPlot: '创建自定义情节卡牌',
      fillCardInfo: '填写卡牌信息，创造属于你的故事元素',
      cardType: '卡牌类型',
      selectIcon: '选择图标',
      cardName: '卡牌名称',
      cardNamePlaceholder: '输入卡牌名称（1-20字符）',
      cardDesc: '卡牌描述',
      cardDescPlaceholder: '输入卡牌描述（最多100字符）',
      createCard: '创建卡牌',
      createCustomCharacter: '创建自定义角色卡牌',
      step: '步骤',
      basicInfo: '基本信息',
      selectAvatar: '选择头像',
      characterName: '角色名称',
      characterNamePlaceholder: '输入角色名称（1-20字符）',
      roleType: '角色类型',
      selectRoleType: '选择角色类型...',
      customRoleType: '或输入自定义类型',
      personality: '性格',
      selectPersonality: '选择性格...',
      customPersonality: '或输入自定义性格',
      speechStyle: '说话方式',
      selectSpeechStyle: '选择说话方式...',
      customSpeechStyle: '或输入自定义说话方式',
      intimacy: '与主角亲密度',
      createCharacter: '创建角色',
      enterCardName: '请输入卡牌名称',
      selectAnIcon: '请选择一个图标',
      characterLimitReached: '角色卡牌已达上限，请丢弃一张后再创建',
      enterCharacterName: '请输入角色名称',
      selectAnAvatar: '请选择一个头像',
      selectOrEnterRoleType: '请选择或输入角色类型',
      selectOrEnterPersonality: '请选择或输入性格',
      selectOrEnterSpeechStyle: '请选择或输入说话方式'
    },
    director: {
      title: '故事导演',
      subtitle: '选择你的卡牌，创作新章节',
      backToBook: '返回书籍',
      selected: '已选择',
      deselected: '已取消选择',
      cards: '张卡牌',
      startProduction: '开始创作',
      cardCollection: '卡牌收藏',
      characters: '角色',
      weather: '天气',
      terrain: '地形',
      adventure: '冒险',
      equipment: '装备',
      creating: '正在创作你的故事...',
      protagonistRequired: '主角必选，最多3个配角',
      required: '必选',
      optional: '可选',
      supporting: '配角',
      supporting1: '配角 1',
      supporting2: '配角 2',
      supporting3: '配角 3',
      protagonist: '主角',
      stagePreview: '舞台预览',
      requiredItems: '个必选项',
      noCardsAvailable: '没有可用的卡牌',
      pleaseSelect: '请选择',
      adventureCard: '冒险卡牌',
      weatherCard: '天气卡牌',
      terrainCard: '地形卡牌',
      maxSupportingCharacters: '最多3个配角',
      chapterCreated: '章节创建成功！',
      createFailed: '创建章节失败',
      selectProtagonist: '请选择主角',
      selectAdventure: '请选择冒险卡牌',
      selectWeather: '请选择天气卡牌',
      selectTerrain: '请选择地形卡牌',
      loadDirectorFailed: '加载导演数据失败',
      createChapterFailed: '创建章节失败'
    },
    create: {
      title: '创建新故事',
      basicInfo: '基本信息',
      protagonist: '主角',
      companions: '伙伴',
      complete: '完成',
      storyBasics: '故事基本信息',
      storyTitle: '故事标题',
      storyTitlePlaceholder: '输入你的故事标题...',
      genre: '类型',
      selectGenre: '选择类型...',
      description: '描述',
      descriptionPlaceholder: '用几句话描述你的故事...',
      next: '下一步',
      nextProtagonist: '下一步：主角',
      nextCompanions: '下一步：伙伴',
      back: '上一步',
      yourProtagonist: '你的主角',
      characterName: '角色名称',
      characterNamePlaceholder: '输入主角的名字...',
      selectAvatar: '选择头像',
      characterBackground: '角色背景',
      characterBackgroundPlaceholder: '讲述主角的过去...',
      personality: '性格',
      selectPersonality: '选择性格...',
      speechStyle: '说话方式',
      selectSpeechStyle: '选择说话方式...',
      roleType: '角色类型',
      selectRoleType: '选择角色类型...',
      companion: '伙伴',
      companionCharacters: '伙伴角色',
      companionNamePlaceholder: '伙伴的名字...',
      intimacyWithProtagonist: '与主角亲密度',
      relationshipWithProtagonist: '与主角关系',
      selectRelationship: '选择关系...',
      customRelationshipPlaceholder: '输入自定义关系...',
      addCompanion: '添加更多伙伴',
      max: '最多',
      createStory: '创建故事',
      storyCreated: '故事创建成功！',
      storyReady: '你的故事已经准备就绪。开始创作第一章，或让导演引导你。',
      startWriting: '开始写作',
      useDirector: '使用导演',
      viewStory: '查看故事',
      custom: '自定义...',
      pleaseFillTitle: '请填写标题和类型',
      pleaseEnterName: '请输入主角名称',
      pleaseSelectPersonality: '请选择主角性格',
      pleaseSelectSpeechStyle: '请选择主角说话方式',
      pleaseSelectRoleType: '请选择主角角色类型',
      pleaseSelectCompanionPersonality: '请选择配角性格',
      pleaseSelectCompanionSpeechStyle: '请选择配角说话方式',
      pleaseSelectCompanionRoleType: '请选择配角角色类型',
      creating: '正在创建故事...',
      createSuccess: '故事创建成功！',
      createFailed: '创建故事失败'
    },
    stylePanel: {
      title: '选择风格',
      adventure: '冒险',
      adventureDesc: '中世纪魔幻',
      fantasy: '奇幻',
      fantasyDesc: '童话梦幻',
      romance: '言情',
      romanceDesc: '现代都市',
      business: '职场',
      businessDesc: '英伦绅士'
    },
    footer: {
      tagline: '故事书 - 让你的故事栩栩如生',
      about: '关于我们',
      privacy: '隐私政策',
      terms: '使用条款',
      contact: '联系我们'
    },
    options: {
      personality: {
        brave: '勇敢',
        cautious: '谨慎',
        optimistic: '乐观',
        pessimistic: '悲观',
        calm: '冷静',
        impulsive: '冲动',
        kind: '善良',
        selfish: '自私',
        humorous: '幽默',
        serious: '严肃',
        gentle: '温柔',
        irritable: '暴躁',
        curious: '好奇',
        steady: '沉稳',
        lively: '活泼',
        lazy: '懒惰',
        extroverted: '外向',
        sinister: '阴险',
        easygoing: '随和',
        arrogant: '傲慢',
        cowardly: '懦弱',
        greedy: '贪婪',
        suspicious: '多疑',
        paranoid: '偏执',
        indifferent: '冷漠'
      },
      speechStyle: {
        direct: '简洁直接',
        verbose: '啰嗦详细',
        polite: '礼貌客气',
        sarcastic: '尖酸刻薄',
        humorous: '幽默风趣',
        formal: '严肃正式',
        gentle: '温柔体贴',
        aggressive: '咄咄逼人',
        slow: '慢条斯理',
        fast: '快速急促',
        poetic: '诗意文艺',
        practical: '务实平淡',
        exaggerated: '夸张生动',
        passiveAggressive: '阴阳怪气',
        enthusiastic: '热情奔放',
        cold: '冷淡疏离',
        wise: '睿智深沉',
        innocent: '天真单纯',
        ironic: '讽刺挖苦',
        complaining: '抱怨连天',
        commanding: '命令式',
        dismissive: '敷衍了事',
        smooth: '油嘴滑舌',
        silent: '沉默寡言',
        interrupting: '爱打断人'
      },
      roleType: {
        adventurer: '冒险者',
        warrior: '战士',
        mage: '法师',
        ranger: '游侠',
        priest: '牧师',
        assassin: '刺客',
        druid: '德鲁伊',
        warlock: '术士',
        paladin: '圣骑士',
        wizard: '巫师',
        rogue: '盗贼',
        littleExplorer: '小探险家',
        littleWarrior: '小勇士',
        littleWise: '小智者',
        littleAnimal: '小动物',
        littleMage: '小魔法师',
        littleInventor: '小发明家',
        littleDetective: '小侦探',
        littleCaptain: '小船长',
        whiteCollar: '白领',
        student: '学生',
        artist: '艺术家',
        doctor: '医生',
        lawyer: '律师',
        journalist: '记者',
        designer: '设计师',
        programmer: '程序员',
        teacher: '教师',
        entrepreneur: '创业者',
        manager: '经理',
        specialist: '专员',
        consultant: '顾问',
        director: '总监',
        assistant: '助理',
        sales: '销售',
        engineer: '工程师',
        analyst: '分析师',
        supervisor: '主管',
        explorer: '探险家',
        treasure_hunter: '寻宝者',
        traveler: '旅行者',
        mage_apprentice: '魔法学徒',
        summoner: '召唤师',
        office_worker: '白领',
        investor: '投资人'
      },
      intimacy: {
        hostile: '敌对',
        neutral: '中立',
        friendly: '友好'
      },
      relationship: {
        friend: '朋友',
        lover: '恋人',
        mentor: '导师',
        rival: '竞争对手',
        colleague: '同事',
        partner: '合作伙伴',
        family: '家人',
        stranger: '陌生人'
      },
      cardType: {
        weather: '天气卡牌',
        terrain: '地形卡牌',
        adventure: '冒险卡牌',
        equipment: '装备卡牌'
      }
    },
    messages: {
      pleaseLogin: '请先登录',
      inputTitle: '请输入书籍标题',
      selectType: '请选择书籍类型',
      inputProtagonistName: '请输入主角名称',
      loadConfigFailed: '加载配置失败',
      loadRoleTypesFailed: '加载角色类型失败',
      loadBooksFailed: '加载书籍失败',
      bookNotFound: '未找到书籍',
      chapterNotFound: '未找到章节',
      loadChapterFailed: '加载章节失败',
      congratulations: '恭喜获得卡牌！',
      cardLimitExceeded: '该类型卡牌已达上限(8张)，请选择一张丢弃',
      customCardCreated: '自定义卡牌创建成功！',
      customCharacterCreated: '自定义角色创建成功！',
      cardReplaced: '卡牌已替换！',
      newCardDiscarded: '已放弃新卡牌',
      characterLimitExceeded: '角色卡牌已达上限，请丢弃一张后再创建',
      importSuccess: '书籍导入成功！正在跳转...',
      importFailed: '导入失败',
      cardReward: '恭喜获得卡牌！',
      cardDiscarded: '已放弃新卡牌',
      puzzleSolved: '正确！谜题已解开！',
      plotCardCreated: '自定义情节卡牌创建成功！',
      characterCreated: '自定义角色卡牌创建成功！',
      chapterCreated: '章节创建成功！',
      bookImported: '书籍导入成功！正在跳转...',
      importBookFirst: '请先将此书导入到您的书架才能添加新章节',
      noPuzzle: '没有可用的谜题',
      firstPage: '这是第一页',
      lastPage: '这是最后一页'
    },
    errors: {
      missingBookId: '缺少书籍ID',
      missingChapterId: '缺少章节ID',
      puzzleNotFound: '谜题不存在',
      puzzleSolved: '谜题已经解开了',
      pleaseProvideAnswer: '请提供答案',
      unknownError: '未知错误',
      createChapterFailed: '创建章节失败',
      createBookFailed: '创建书籍失败',
      deleteBookFailed: '删除书籍失败',
      loadFailed: '加载数据失败',
      loadBookFailed: '加载书籍失败',
      wrongAnswer: '答案错误，请重试',
      createFailed: '创建失败',
      importFailed: '导入失败',
      bookInfoNotFound: '无法获取书籍信息'
    }
  }
};

function t(key) {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      return key;
    }
  }
  return value;
}

function getOptionTranslation(category, key) {
  const lang = currentLanguage;
  if (translations[lang] && translations[lang].options && translations[lang].options[category]) {
    return translations[lang].options[category][key] || key;
  }
  return key;
}

let currentLanguage = localStorage.getItem('storybook-language') || 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('storybook-language', lang);
  document.documentElement.lang = lang;
  updateAllTranslations();
  updatePageTitle();
}

function updatePageTitle() {
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    document.title = t('meta.title');
  }
}

function updateAllTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

let currentTheme = localStorage.getItem('storybook-theme') || 'adventure';

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('storybook-theme', theme);
  
  document.body.className = '';
  document.body.classList.add(`theme-${theme}`);
  
  updateParticles();
  updateStylePanelSelection();
}

function updateParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const theme = getComputedStyle(document.body).getPropertyValue('--particle-color').trim();
  const count = parseInt(getComputedStyle(document.body).getPropertyValue('--particle-count')) || 0;
  
  if (count === 0 || theme === 'transparent') return;
  
  createParticles(container, count);
}

function createStylePanel() {
  const panel = document.createElement('div');
  panel.className = 'style-panel';
  panel.id = 'stylePanel';
  panel.innerHTML = `
    <button class="style-panel-toggle" onclick="toggleStylePanel()">
      <span class="toggle-icon">🎨</span>
    </button>
    <div class="style-panel-content">
      <div class="style-panel-header">
        <h3 data-i18n="stylePanel.title">Select Style</h3>
        <button class="close-btn" onclick="toggleStylePanel()">×</button>
      </div>
      <div class="style-options">
        <div class="style-option" data-theme="adventure" onclick="selectTheme('adventure')">
          <div class="style-preview adventure-preview">
            <span>⚔️</span>
          </div>
          <div class="style-info">
            <span class="style-name" data-i18n="stylePanel.adventure">Adventure</span>
            <span class="style-desc" data-i18n="stylePanel.adventureDesc">Medieval Fantasy</span>
          </div>
        </div>
        <div class="style-option" data-theme="fantasy" onclick="selectTheme('fantasy')">
          <div class="style-preview fantasy-preview">
            <span>✨</span>
          </div>
          <div class="style-info">
            <span class="style-name" data-i18n="stylePanel.fantasy">Fantasy</span>
            <span class="style-desc" data-i18n="stylePanel.fantasyDesc">Fairy Tale</span>
          </div>
        </div>
        <div class="style-option" data-theme="romance" onclick="selectTheme('romance')">
          <div class="style-preview romance-preview">
            <span>💕</span>
          </div>
          <div class="style-info">
            <span class="style-name" data-i18n="stylePanel.romance">Romance</span>
            <span class="style-desc" data-i18n="stylePanel.romanceDesc">Modern Love</span>
          </div>
        </div>
        <div class="style-option" data-theme="business" onclick="selectTheme('business')">
          <div class="style-preview business-preview">
            <span>🎩</span>
          </div>
          <div class="style-info">
            <span class="style-name" data-i18n="stylePanel.business">Business</span>
            <span class="style-desc" data-i18n="stylePanel.businessDesc">British Gentleman</span>
          </div>
        </div>
      </div>
      <div class="language-switcher">
        <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" onclick="switchLanguage('en')">EN</button>
        <button class="lang-btn ${currentLanguage === 'zh' ? 'active' : ''}" onclick="switchLanguage('zh')">中文</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(panel);
  
  addStylePanelStyles();
}

function addStylePanelStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .style-panel {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      font-family: var(--font-ui);
    }
    
    .style-panel-toggle {
      position: absolute;
      right: 0;
      width: 50px;
      height: 50px;
      border-radius: 10px 0 0 10px;
      background: var(--gradient-primary);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
    
    .style-panel-toggle:hover {
      width: 60px;
    }
    
    .style-panel-content {
      position: absolute;
      right: -320px;
      width: 300px;
      background: var(--gradient-card);
      border: 1px solid var(--color-primary);
      border-radius: 10px 0 0 10px;
      padding: 20px;
      transition: right 0.3s ease;
      box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    }
    
    .style-panel.open .style-panel-content {
      right: 50px;
    }
    
    .style-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .style-panel-header h3 {
      margin: 0;
      font-size: 16px;
      color: var(--color-primary);
    }
    
    .close-btn {
      background: none;
      border: none;
      color: var(--color-text-muted);
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    
    .close-btn:hover {
      color: var(--color-text);
    }
    
    .style-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .style-option {
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }
    
    .style-option:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--color-primary);
    }
    
    .style-option.active {
      border-color: var(--color-primary);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .style-preview {
      width: 50px;
      height: 50px;
      margin: 0 auto 8px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    .adventure-preview {
      background: linear-gradient(135deg, #1a1a2e 0%, #FFD700 100%);
    }
    
    .fantasy-preview {
      background: linear-gradient(135deg, #E8DAEF 0%, #9B59B6 100%);
    }
    
    .romance-preview {
      background: linear-gradient(135deg, #2a1a2e 0%, #FF6B9D 100%);
    }
    
    .business-preview {
      background: linear-gradient(135deg, #1B4D3E 0%, #C9A962 100%);
    }
    
    .style-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .style-name {
      font-size: 12px;
      font-weight: bold;
      color: var(--color-text);
    }
    
    .style-desc {
      font-size: 10px;
      color: var(--color-text-muted);
    }
    
    .language-switcher {
      display: flex;
      gap: 10px;
      justify-content: center;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .lang-btn {
      padding: 8px 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      color: var(--color-text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }
    
    .lang-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    
    .lang-btn.active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #1a1a2e;
    }
    
    @media (max-width: 768px) {
      .style-panel-content {
        width: 260px;
        right: -280px;
      }
      
      .style-panel.open .style-panel-content {
        right: 50px;
      }
      
      .style-options {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

function toggleStylePanel() {
  const panel = document.getElementById('stylePanel');
  panel.classList.toggle('open');
}

function selectTheme(theme) {
  setTheme(theme);
}

function updateStylePanelSelection() {
  document.querySelectorAll('.style-option').forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.theme === currentTheme) {
      opt.classList.add('active');
    }
  });
}

function switchLanguage(lang) {
  setLanguage(lang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === lang.toUpperCase() || btn.textContent === (lang === 'zh' ? '中文' : 'EN')) {
      btn.classList.add('active');
    }
  });
}

function initTheme() {
  setTheme(currentTheme);
  setLanguage(currentLanguage);
  updateAllTranslations();
}

window.translations = translations;
window.t = t;
window.getOptionTranslation = getOptionTranslation;
window.switchLanguage = switchLanguage;
window.currentLanguage = currentLanguage;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
