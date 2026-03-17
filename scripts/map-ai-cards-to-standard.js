import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const standardCards = {
  en: {
    business: {
      weather: ["Sunny", "Cloudy", "Rainy", "Smog", "Thunderstorm", "Windy", "Sandstorm", "Clear Night", "Rainbow", "Partly Cloudy", "Light Rain", "Snowy", "Frost", "Lightning", "Typhoon", "Fog", "Tornado", "Storm", "Blizzard", "Clearing Up"],
      terrain: ["Office", "Meeting Room", "Client Company", "Airport", "Hotel", "Restaurant", "Exhibition", "Headquarters", "Factory", "Warehouse", "Laboratory", "Office Building", "Lobby", "Reception Area", "Break Room", "Training Room", "Parking Lot", "Rooftop", "Park", "Coffee Shop"],
      adventure: ["Negotiation", "Bidding", "Crisis Management", "Team Management", "Project Launch", "Product Launch", "Layoff Crisis", "Merger", "IPO", "Financing", "Expansion", "Contraction", "Transformation", "Upgrade", "Crossover", "Innovation", "Breakthrough", "Persistence", "Achievement", "Rise"],
      equipment: ["Laptop", "Business Card", "Contract", "Projector", "Whiteboard", "Coffee Cup", "Suitcase", "Trophy", "Seal", "Pen", "Planner", "Tablet", "Headset", "Smart Watch", "Translator", "Scanner", "Printer", "Safe", "Display Board", "Directory"]
    },
    romance: {
      weather: ["Cherry Blossom Rain", "First Snow", "Sunset", "After Rain", "Starry Sky", "Morning Light", "Moonlight", "Neon Lights", "Misty", "Shooting Star", "Twilight", "Dawn", "Cloudy", "Rainy Day", "Sunny Day", "Snowy Day", "Partly Cloudy", "Frost", "Thunderstorm", "Rainbow"],
      terrain: ["Cafe", "Park", "Library", "Seaside", "Mountain Top", "Subway Station", "Shopping Mall", "Old Street", "Campus", "Office", "Rooftop", "Bridge", "Train Station", "Airport", "Hospital", "School", "Restaurant", "Bar", "Bookstore", "Gallery"],
      adventure: ["First Meeting", "Confession", "Misunderstanding", "Reconciliation", "Companionship", "Separation", "Reunion", "Proposal", "Date", "Living Together", "Meeting Parents", "Expression", "Pursuit", "Ambiguity", "Cold War", "Passionate Love", "Engagement", "Marriage", "Divorce", "Getting Back Together"],
      equipment: ["Phone", "Coffee", "Book", "Umbrella", "Necklace", "Letter Paper", "Camera", "Music Box", "Headphones", "Watch", "Wallet", "Perfume", "Ring", "Flowers", "Cake", "Chocolate", "Wine", "Piano", "Guitar", "Canvas"]
    }
  }
};

const standardIcons = {
  en: {
    business: {
      weather: { "Sunny": "☀️", "Cloudy": "☁️", "Rainy": "🌧️", "Smog": "🌫️", "Thunderstorm": "⛈️", "Windy": "💨", "Sandstorm": "🌪️", "Clear Night": "🌙", "Rainbow": "🌈", "Partly Cloudy": "⛅", "Light Rain": "🌦️", "Snowy": "❄️", "Frost": "🌨️", "Lightning": "⚡", "Typhoon": "🌀", "Fog": "🌫️", "Tornado": "🌪️", "Storm": "🌧️", "Blizzard": "🌨️", "Clearing Up": "🌤️" },
      terrain: { "Office": "🏢", "Meeting Room": "📋", "Client Company": "🏛️", "Airport": "✈️", "Hotel": "🏨", "Restaurant": "🍽️", "Exhibition": "🎪", "Headquarters": "🏙️", "Factory": "🏭", "Warehouse": "📦", "Laboratory": "🔬", "Office Building": "🏬", "Lobby": "🏛️", "Reception Area": "🛋️", "Break Room": "☕", "Training Room": "📚", "Parking Lot": "🅿️", "Rooftop": "🌃", "Park": "🌳", "Coffee Shop": "☕" },
      adventure: { "Negotiation": "🤝", "Bidding": "📊", "Crisis Management": "🚨", "Team Management": "👥", "Project Launch": "🚀", "Product Launch": "🎉", "Layoff Crisis": "😔", "Merger": "🏢", "IPO": "📈", "Financing": "💰", "Expansion": "🌍", "Contraction": "📉", "Transformation": "🔄", "Upgrade": "⬆️", "Crossover": "🌐", "Innovation": "💡", "Breakthrough": "🎯", "Persistence": "🛡️", "Achievement": "🚀", "Rise": "📈" },
      equipment: { "Laptop": "💻", "Business Card": "💳", "Contract": "📄", "Projector": "📽️", "Whiteboard": "📋", "Coffee Cup": "☕", "Suitcase": "🧳", "Trophy": "🏆", "Seal": "📛", "Pen": "🖊️", "Planner": "📓", "Tablet": "📱", "Headset": "🎧", "Smart Watch": "⌚", "Translator": "🗣️", "Scanner": "📠", "Printer": "🖨️", "Safe": "🔒", "Display Board": "🖼️", "Directory": "📒" }
    },
    romance: {
      weather: { "Cherry Blossom Rain": "🌸", "First Snow": "❄️", "Sunset": "🌇", "After Rain": "🌈", "Starry Sky": "⭐", "Morning Light": "🌅", "Moonlight": "🌙", "Neon Lights": "🌃", "Misty": "🌫️", "Shooting Star": "🌠", "Twilight": "🌆", "Dawn": "🌤️", "Cloudy": "☁️", "Rainy Day": "🌧️", "Sunny Day": "☀️", "Snowy Day": "🌨️", "Partly Cloudy": "⛅", "Frost": "🍂", "Thunderstorm": "⛈️", "Rainbow": "🌈" },
      terrain: { "Cafe": "☕", "Park": "🌳", "Library": "📚", "Seaside": "🏖️", "Mountain Top": "⛰️", "Subway Station": "🚇", "Shopping Mall": "🛒", "Old Street": "🏘️", "Campus": "🏫", "Office": "🏢", "Rooftop": "🌃", "Bridge": "🌉", "Train Station": "🚉", "Airport": "✈️", "Hospital": "🏥", "School": "🎓", "Restaurant": "🍽️", "Bar": "🍸", "Bookstore": "📖", "Gallery": "🖼️" },
      adventure: { "First Meeting": "💫", "Confession": "💕", "Misunderstanding": "😔", "Reconciliation": "🤝", "Companionship": "👫", "Separation": "😢", "Reunion": "🎉", "Proposal": "💍", "Date": "🌹", "Living Together": "🏠", "Meeting Parents": "👨‍👩‍👧", "Expression": "💌", "Pursuit": "💝", "Ambiguity": "💗", "Cold War": "💔", "Passionate Love": "❤️", "Engagement": "💎", "Marriage": "💒", "Divorce": "💔", "Getting Back Together": "💕" },
      equipment: { "Phone": "📱", "Coffee": "☕", "Book": "📚", "Umbrella": "☂️", "Necklace": "📿", "Letter Paper": "✉️", "Camera": "📷", "Music Box": "🎵", "Headphones": "🎧", "Watch": "⌚", "Wallet": "👛", "Perfume": "🧴", "Ring": "💍", "Flowers": "💐", "Cake": "🎂", "Chocolate": "🍫", "Wine": "🍷", "Piano": "🎹", "Guitar": "🎸", "Canvas": "🎨" }
    }
  }
};

const aiCardMappings = {
  weather: {
    'Sunny Morning': 'Sunny Day',
    'Rainy Afternoon': 'Rainy Day',
    'Storm Warning': 'Thunderstorm',
    'Cold Dawn': 'Dawn',
    'Digital Dawn': 'Dawn',
    'Data Storm': 'Thunderstorm',
    'Clear Output': 'Sunny Day',
    'System Fog': 'Fog',
    'Monday Morning': 'Morning Light',
    'Rainy Goodbye': 'Rainy Day',
    'Clear Conscience': 'Sunny Day',
    'Storm of Resignations': 'Thunderstorm',
    'Blue Screen Morning': 'Cloudy',
    'Debug Storm': 'Thunderstorm',
    'Clean Compile': 'Sunny Day',
    'Legacy Sunset': 'Sunset',
    'Call Center Dawn': 'Morning Light',
    'Tears in the Break Room': 'Rainy Day',
    'Clear Future': 'Sunny Day',
    'Storm of Change': 'Thunderstorm',
    'Rainy Confession': 'Rainy Day',
    'Clear Revelation': 'Sunny Day',
    'Storm of Emotion': 'Thunderstorm',
    'Algorithmic Dawn': 'Dawn',
    'Storm of Doubt': 'Thunderstorm',
    'Wedding Sunshine': 'Sunny Day',
    'Virtual Storm': 'Thunderstorm',
    'Clear Connection': 'Sunny Day',
    'Eternal Sunset': 'Sunset',
    'Clear Understanding': 'Sunny Day',
    'Cloudy Night': 'Cloudy',
    'Eternal Clouds': 'Cloudy',
    'Courtroom Tension': 'Cloudy',
    'Storm of Evidence': 'Thunderstorm',
    'Clear Justice': 'Sunny Day',
    'New Dawn': 'Dawn',
    'Digital Dreams': 'Starry Sky',
    'Storm of Consciousness': 'Thunderstorm',
    'Storm of Ethics': 'Thunderstorm',
    'Clear Purpose': 'Sunny Day',
    'New Horizon': 'Dawn',
    'Layoff Storm': 'Thunderstorm',
    'Protest Rain': 'Rainy Day',
    'Human Dawn': 'Dawn',
    'Laboratory Dawn': 'Morning Light',
    'Storm of Debate': 'Thunderstorm',
    'Creative Dawn': 'Dawn',
    'Clear Authenticity': 'Sunny Day',
    'Human Voice': 'Sunny Day',
    'Studio Light': 'Sunny Day',
    'Clear Vision': 'Sunny Day',
    'Human Light': 'Sunny Day',
    'Research Dawn': 'Dawn',
    'Storm of Discovery': 'Thunderstorm',
    'Singularity Dawn': 'Dawn',
    'Clear Partnership': 'Sunny Day',
    'Hybrid Horizon': 'Dawn',
    'Post-Human Dawn': 'Dawn',
    'Storm of Choice': 'Thunderstorm',
    'Clear Integration': 'Sunny Day',
    'Continuum': 'Starry Sky',
    'Market Dawn': 'Dawn',
    'Shared Horizon': 'Dawn',
    'Algorithm Dawn': 'Dawn',
    'Storm of Questions': 'Thunderstorm',
    'Clear Synthesis': 'Sunny Day',
    'New Generation': 'Dawn'
  },
  terrain: {
    'Corporate Office': 'Office',
    'Coffee Shop': 'Cafe',
    'Home Office': 'Office',
    'City Rooftop': 'Rooftop',
    'Algorithm HQ': 'Office',
    'Server Room': 'Office',
    'Rooftop Garden': 'Park',
    'Break Room': 'Break Room',
    'HR Office': 'Office',
    'Exit Interview Room': 'Meeting Room',
    'Rooftop': 'Rooftop',
    'Tech Conference': 'Exhibition',
    'Call Center Floor': 'Office',
    'Training Room': 'Training Room',
    'Community Center': 'Park',
    'Apartment': 'Office',
    'Digital Space': 'Office',
    'New City': 'Park',
    'PerfectMatch HQ': 'Office',
    'Bookstore': 'Bookstore',
    'Hiking Trail': 'Park',
    'Wedding Venue': 'Restaurant',
    'Elysium': 'Park',
    'Virtual Cliff': 'Mountain Top',
    'Real World': 'Park',
    'Smartphone': 'Office',
    'Date Night': 'Restaurant',
    'Meditation App': 'Park',
    'The Cloud': 'Park',
    'Courtroom': 'Office',
    'Law Office': 'Office',
    'Appeals Court': 'Office',
    'Prison': 'Office',
    'Research Lab': 'Laboratory',
    'Conference Hall': 'Meeting Room',
    'Dream Space': 'Park',
    'Ethics Council': 'Meeting Room',
    'Server Farm': 'Office',
    'Community': 'Park',
    'University': 'School',
    'Corporate HQ': 'Headquarters',
    'Support Center': 'Office',
    'Cooperative': 'Office',
    'Mind Space': 'Park',
    'Recording Studio': 'Office',
    'Concert Hall': 'Restaurant',
    'Art School': 'School',
    'Memory': 'Park',
    'Art Studio': 'Gallery',
    'Gallery': 'Gallery',
    'Writing Room': 'Library',
    'Writing School': 'School',
    'The Future': 'Park',
    'Digital Realm': 'Office',
    'Human Space': 'Park',
    'Hybrid World': 'Park',
    'Research Center': 'Laboratory',
    'Integration Clinic': 'Hospital',
    'The Network': 'Office',
    'New Existence': 'Park',
    'Memory Market': 'Shopping Mall',
    'Transfer Clinic': 'Hospital',
    'Memory Bank': 'Library',
    'Shared Mind': 'Park',
    'Optimized Home': 'Office'
  },
  adventure: {
    'Career Crossroads': 'Transformation',
    'Important Meeting': 'Negotiation',
    'Late Night Work': 'Team Management',
    'Unexpected Encounter': 'First Meeting',
    'The Override': 'Crisis Management',
    'Data Review': 'Team Management',
    'System Update': 'Upgrade',
    'The Exception': 'Crisis Management',
    'The List': 'Innovation',
    'The Conversation': 'Negotiation',
    'The Resignation': 'Separation',
    'The Rewrite': 'Transformation',
    'Code Review': 'Team Management',
    'The Merge': 'Merger',
    'Open Source': 'Innovation',
    'The Last Training': 'Team Management',
    'Career Workshop': 'Team Management',
    'The Human Premium': 'Negotiation',
    'New Beginning': 'Project Launch',
    'The Download': 'Innovation',
    'First Real Date': 'Date',
    'The Move': 'Transformation',
    'The Wedding': 'Marriage',
    'The Questionnaire': 'Innovation',
    'The Glitch': 'Crisis Management',
    'The Choice': 'Transformation',
    'First Login': 'First Meeting',
    'The Upload Choice': 'Transformation',
    'Integration': 'Merger',
    'The Confession': 'Confession',
    'The Evolution': 'Transformation',
    'First Session': 'First Meeting',
    'The Upgrade': 'Upgrade',
    'The Acceptance': 'Reconciliation',
    'The Lifetime': 'Marriage',
    'The Verdict': 'Negotiation',
    'The Investigation': 'Innovation',
    'The Appeal': 'Negotiation',
    'The Reform': 'Transformation',
    'The First Dream': 'Innovation',
    'The Partnership': 'Negotiation',
    'The Recommendation': 'Negotiation',
    'The Legacy': 'Achievement',
    'The Layoff': 'Layoff Crisis',
    'The Movement': 'Team Management',
    'The Cooperative': 'Team Management',
    'The Test': 'Innovation',
    'The Questions': 'Innovation',
    'The Decision': 'Transformation',
    'The Spectrum': 'Innovation',
    'The Last Song': 'Achievement',
    'The Challenge': 'Achievement',
    'The Portrait': 'Innovation',
    'The School': 'Team Management',
    'The Last Book': 'Achievement',
    'The Element': 'Innovation',
    'The Search': 'Innovation',
    'The Discovery': 'Innovation',
    'The Synthesis': 'Innovation',
    'The Announcement': 'Product Launch',
    'The Acceleration': 'Achievement',
    'The Post-Human': 'Transformation',
    'The Research': 'Innovation',
    'The Continuum': 'Achievement',
    'The Market': 'Negotiation',
    'The Request': 'Negotiation',
    'The Transfer': 'Transformation',
    'The Children': 'Innovation',
    'The Study': 'Innovation'
  },
  equipment: {
    'Laptop': 'Laptop',
    'Coffee Cup': 'Coffee Cup',
    'Old Notebook': 'Planner',
    'Smartphone': 'Phone',
    'Access Badge': 'Business Card',
    'Encrypted Drive': 'Contract',
    'Coffee': 'Coffee',
    'Severance Package': 'Contract',
    'Box of Belongings': 'Suitcase',
    'ID Badge': 'Business Card',
    'Resignation Letter': 'Contract',
    'Keyboard': 'Laptop',
    'Legacy Code': 'Contract',
    'AI Assistant': 'Tablet',
    'Headset': 'Headset',
    'Training Manual': 'Planner',
    'Empathy': 'Ring',
    'Hope': 'Flowers',
    'Questions': 'Planner',
    'Courage': 'Trophy',
    'Love': 'Ring',
    'Algorithm': 'Contract',
    'Chance': 'Ring',
    'Growth': 'Trophy',
    'Trust': 'Ring',
    'VR Headset': 'Tablet',
    'Connection': 'Phone',
    'Digital Heart': 'Ring',
    'Phone': 'Phone',
    'Honesty': 'Ring',
    'Acceptance': 'Ring',
    'Meditation': 'Watch',
    'Legal Brief': 'Contract',
    'Evidence': 'Contract',
    'Gavel': 'Pen',
    'Justice': 'Trophy',
    'Neural Network': 'Tablet',
    'Dreams': 'Planner',
    'Choice': 'Ring',
    'Consciousness': 'Planner',
    'Human Factor': 'Ring',
    'Judgment': 'Pen',
    'Values': 'Ring',
    'Protest Sign': 'Contract',
    'Community': 'Ring',
    'Humanity': 'Ring',
    'Test Protocol': 'Contract',
    'Guitar': 'Guitar',
    'Voice': 'Phone',
    'Authenticity': 'Ring',
    'Song': 'Music Box',
    'Brush': 'Pen',
    'Canvas': 'Canvas',
    'Vision': 'Planner',
    'Pen': 'Pen',
    'Story': 'Planner',
    'Research': 'Planner',
    'Human Element': 'Ring',
    'Collaboration': 'Ring',
    'Neural Interface': 'Tablet',
    'Quantum Computer': 'Laptop',
    'Human Experience': 'Ring',
    'Balance': 'Ring',
    'Transcendence': 'Trophy',
    'Memory Chip': 'Contract',
    'Grief': 'Ring',
    'Identity': 'Ring',
    'Future': 'Planner'
  }
};

function main() {
  console.log('=== AI卡牌映射到标准卡牌 ===\n');
  
  const sqlStatements = [];
  sqlStatements.push('-- AI书籍卡牌映射到标准卡牌');
  sqlStatements.push(`-- 生成时间: ${new Date().toISOString()}`);
  sqlStatements.push('');
  
  let totalMappings = 0;
  const mappingStats = {};
  
  for (const [subType, mappings] of Object.entries(aiCardMappings)) {
    mappingStats[subType] = 0;
    for (const [oldName, newName] of Object.entries(mappings)) {
      const icon = standardIcons.en.business[subType][newName] || standardIcons.en.romance[subType][newName];
      if (icon) {
        sqlStatements.push(
          `UPDATE plot_cards SET name = '${newName.replace(/'/g, "''")}', icon = '${icon}' ` +
          `WHERE name = '${oldName.replace(/'/g, "''")}' AND sub_type = '${subType}' AND book_id LIKE 'preset-ai-%';`
        );
        totalMappings++;
        mappingStats[subType]++;
      }
    }
  }
  
  console.log('映射统计:');
  for (const [subType, count] of Object.entries(mappingStats)) {
    console.log(`  ${subType}: ${count} 种卡牌`);
  }
  console.log(`\n总计: ${totalMappings} 种卡牌映射`);
  
  const outputPath = path.join(__dirname, '..', 'migrations', '0712_map_ai_cards_to_standard.sql');
  fs.writeFileSync(outputPath, sqlStatements.join('\n'));
  console.log(`\n迁移脚本已生成: ${outputPath}`);
}

main();
