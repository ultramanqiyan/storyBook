const mockData = {
  user: {
    id: 1,
    name: 'Sir Galahad',
    email: 'galahad@camelot.com',
    avatar: '🧙‍♂️'
  },
  
  books: [
    {
      id: 1,
      title: 'The Dragon\'s Quest',
      type: 'adventure',
      typeIcon: '🗺️',
      cover: null,
      chapters: 12,
      progress: 75,
      description: 'A brave knight embarks on a perilous journey to defeat an ancient dragon.',
      characters: ['Sir Galahad', 'Lady Elara', 'The Dragon']
    },
    {
      id: 2,
      title: 'Shadows of the Realm',
      type: 'fantasy',
      typeIcon: '🧙',
      cover: null,
      chapters: 8,
      progress: 30,
      description: 'Magic and mystery collide in this epic tale of power and redemption.',
      characters: ['Archmage Theron', 'Princess Lyra', 'Dark Lord Malachar']
    },
    {
      id: 3,
      title: 'Hearts Entwined',
      type: 'romance',
      typeIcon: '💕',
      cover: null,
      chapters: 15,
      progress: 100,
      description: 'A tale of forbidden love between a noble and a commoner.',
      characters: ['Lord Edmund', 'Lady Rosalind', 'Duke Frederick']
    },
    {
      id: 4,
      title: 'The Corporate Crown',
      type: 'business',
      typeIcon: '💼',
      cover: null,
      chapters: 10,
      progress: 50,
      description: 'In the cutthroat world of business, only the cunning survive.',
      characters: ['CEO Victoria', 'Rival Marcus', 'Mentor James']
    }
  ],
  
  presetBooks: [
    {
      id: 101,
      title: 'The Lost Kingdom',
      type: 'adventure',
      typeIcon: '🗺️',
      cover: null,
      chapters: 20,
      description: 'Discover the secrets of a forgotten realm.',
      characters: ['Explorer Alex', 'Guide Marina', 'Ancient Spirit']
    },
    {
      id: 102,
      title: 'Mystic Academy',
      type: 'fantasy',
      typeIcon: '🧙',
      cover: null,
      chapters: 25,
      description: 'A young wizard\'s journey through magical education.',
      characters: ['Student Nora', 'Professor Eldrin', 'Rival Victor']
    },
    {
      id: 103,
      title: 'The Merchant\'s Daughter',
      type: 'romance',
      typeIcon: '💕',
      cover: null,
      chapters: 18,
      description: 'Love blooms in the bustling markets of a medieval city.',
      characters: ['Merchant\'s Daughter Elena', 'Knight Captain Roland', 'Rival Merchant Tomas']
    }
  ],
  
  characters: [
    {
      id: 1,
      name: 'Sir Galahad',
      type: 'protagonist',
      avatar: '🧙‍♂️',
      description: 'A noble knight on a quest for redemption.',
      attributes: { power: 8, wisdom: 6, charisma: 7 }
    },
    {
      id: 2,
      name: 'Lady Elara',
      type: 'supporter',
      avatar: '👸',
      description: 'A mysterious sorceress with hidden powers.',
      attributes: { power: 5, wisdom: 9, charisma: 8 }
    },
    {
      id: 3,
      name: 'The Dragon',
      type: 'antagonist',
      avatar: '🐉',
      description: 'An ancient beast guarding untold treasures.',
      attributes: { power: 10, wisdom: 7, charisma: 3 }
    },
    {
      id: 4,
      name: 'Village Elder',
      type: 'npc',
      avatar: '👴',
      description: 'A wise old man who knows many secrets.',
      attributes: { power: 2, wisdom: 10, charisma: 5 }
    },
    {
      id: 5,
      name: 'Dark Knight',
      type: 'antagonist',
      avatar: '⚔️',
      description: 'A fallen warrior serving the dark lord.',
      attributes: { power: 9, wisdom: 4, charisma: 2 }
    },
    {
      id: 6,
      name: 'Princess Lyra',
      type: 'supporter',
      avatar: '👑',
      description: 'The kingdom\'s hope lies in her hands.',
      attributes: { power: 3, wisdom: 7, charisma: 10 }
    }
  ],
  
  chapters: [
    {
      id: 1,
      title: 'The Beginning',
      content: `In the ancient realm of Eldoria, where dragons soared through crimson skies and magic flowed like rivers through the land, there lived a young knight named Sir Galahad. His heart was pure, his blade was sharp, and his destiny was yet to be written.

The morning sun cast long shadows across the cobblestone streets of Camelot as Galahad made his way to the grand hall. The kingdom had been in turmoil ever since the Dragon of the North had awakened from its century-long slumber.

"Young knight," spoke the King, his voice echoing through the hall, "you have been chosen for a quest of utmost importance. The Dragon threatens our very existence, and only one bearing the ancient sword of light can hope to defeat it."

Galahad knelt before the throne, his heart pounding with a mixture of fear and excitement. This was the moment he had trained for all his life.`,
      read: true,
      hasPuzzle: false
    },
    {
      id: 2,
      title: 'The Journey Begins',
      content: `With the ancient sword strapped to his back and provisions for the journey, Galahad set forth from Camelot at dawn. The road ahead was long and fraught with danger, but his resolve was unshakeable.

As he traveled through the Whispering Woods, he encountered a mysterious figure cloaked in silver robes. "I am Lady Elara," she spoke, her voice like wind chimes in a gentle breeze. "I have been waiting for you, young knight. The path you seek is not one you can walk alone."

Together, they ventured deeper into the unknown, their fates intertwined by threads of destiny neither could yet see.`,
      read: true,
      hasPuzzle: true,
      puzzle: {
        question: 'What element does Lady Elara represent in this tale?',
        options: ['Fire', 'Water', 'Wisdom', 'Darkness'],
        correctAnswer: 2
      }
    },
    {
      id: 3,
      title: 'The Mountain Pass',
      content: `The path to the Dragon\'s lair led through treacherous mountain passes, where the wind howled like lost souls and the ground trembled with each step.

"We must be careful," warned Lady Elara, her eyes scanning the rocky terrain. "These mountains are home to creatures far older than the Dragon itself."

As if summoned by her words, a massive shadow descended from the peaks above. The Dark Knight, a fallen warrior bound to serve the Dragon, blocked their path with his obsidian blade drawn.

"Turn back," he growled, his voice like grinding stone. "None shall pass while I draw breath."`,
      read: false,
      hasPuzzle: false
    }
  ],
  
  cards: {
    characters: [
      { id: 1, name: 'Sir Galahad', avatar: '🧙‍♂️', type: 'protagonist', role: 'protagonist' },
      { id: 2, name: 'Lady Elara', avatar: '👸', type: 'supporter', role: 'supporting' },
      { id: 3, name: 'Dark Knight', avatar: '⚔️', type: 'antagonist', role: 'supporting' },
      { id: 4, name: 'Village Elder', avatar: '👴', type: 'npc', role: 'supporting' },
      { id: 5, name: 'Princess Lyra', avatar: '👑', type: 'supporter', role: 'supporting' },
      { id: 6, name: 'Dragon Slayer', avatar: '🗡️', type: 'protagonist', role: 'protagonist' },
      { id: 7, name: 'Forest Spirit', avatar: '🧚', type: 'npc', role: 'supporting' },
      { id: 8, name: 'Shadow Mage', avatar: '🧛', type: 'antagonist', role: 'supporting' }
    ],
    weather: [
      { id: 101, name: 'Storm', icon: '⛈️', effect: 'Lightning strikes' },
      { id: 102, name: 'Fog', icon: '🌫️', effect: 'Mystery deepens' },
      { id: 103, name: 'Sunset', icon: '🌅', effect: 'Romantic mood' },
      { id: 104, name: 'Snow', icon: '❄️', effect: 'Cold encounter' },
      { id: 105, name: 'Rain', icon: '🌧️', effect: 'Melancholy' },
      { id: 106, name: 'Clear Sky', icon: '☀️', effect: 'Peaceful day' }
    ],
    terrain: [
      { id: 201, name: 'Forest', icon: '🌲', effect: 'Hidden paths' },
      { id: 202, name: 'Castle', icon: '🏰', effect: 'Royal intrigue' },
      { id: 203, name: 'Mountain', icon: '⛰️', effect: 'Perilous climb' },
      { id: 204, name: 'Village', icon: '🏘️', effect: 'Local secrets' },
      { id: 205, name: 'Cave', icon: '🕳️', effect: 'Dark mysteries' },
      { id: 206, name: 'Lake', icon: '🏞️', effect: 'Tranquil waters' }
    ],
    adventure: [
      { id: 301, name: 'Battle', icon: '⚔️', effect: 'Epic combat' },
      { id: 302, name: 'Puzzle', icon: '🧩', effect: 'Mind challenge' },
      { id: 303, name: 'Chase', icon: '🏃', effect: 'Thrilling pursuit' },
      { id: 304, name: 'Discovery', icon: '🔍', effect: 'Hidden truth' },
      { id: 305, name: 'Rescue', icon: '🛡️', effect: 'Heroic mission' },
      { id: 306, name: 'Mystery', icon: '🔮', effect: 'Unravel secrets' }
    ],
    equipment: [
      { id: 401, name: 'Sword', icon: '🗡️', effect: 'Combat boost' },
      { id: 402, name: 'Potion', icon: '🧪', effect: 'Healing power' },
      { id: 403, name: 'Map', icon: '🗺️', effect: 'Path revealed' },
      { id: 404, name: 'Amulet', icon: '📿', effect: 'Magic protection' },
      { id: 405, name: 'Shield', icon: '🛡️', effect: 'Defense boost' },
      { id: 406, name: 'Scroll', icon: '📜', effect: 'Ancient wisdom' }
    ]
  },
  
  avatars: [
    '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️',
    '🧟‍♂️', '🧟‍♀️', '🧚‍♂️', '🧚‍♀️', '🧜‍♂️', '🧜‍♀️',
    '🧑‍🎤', '🧑‍🎨', '🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️',
    '👸', '🤴', '👑', '🧛', '🧙', '🧝'
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = mockData;
}
