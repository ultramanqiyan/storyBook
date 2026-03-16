-- 修复预设书籍的情节卡牌数据 - 第三部分
-- 包含：职场风云类书籍

-- ============================================
-- 职场风云 - 周报战争（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus001-w01', 'preset-business-001', 'plot', 'weather', '阴天', '☁️', '阴沉的天空'),
('card-bus001-w02', 'preset-business-001', 'plot', 'weather', '雾霾', '🌫️', '雾霾天气'),
('card-bus001-w03', 'preset-business-001', 'plot', 'weather', '多云', '⛅', '多云天气'),
('card-bus001-w04', 'preset-business-001', 'plot', 'weather', '晴天', '☀️', '晴朗的天气'),
('card-bus001-w05', 'preset-business-001', 'plot', 'weather', '雷阵雨', '⛈️', '雷雨交加'),
('card-bus001-w06', 'preset-business-001', 'plot', 'weather', '小雨', '🌦️', '绵绵细雨'),
('card-bus001-w07', 'preset-business-001', 'plot', 'weather', '阴转晴', '🌤️', '天气转好'),
('card-bus001-w08', 'preset-business-001', 'plot', 'weather', '大风', '💨', '大风天气'),
('card-bus001-w09', 'preset-business-001', 'plot', 'weather', '彩虹', '🌈', '雨后彩虹'),
('card-bus001-w10', 'preset-business-001', 'plot', 'weather', '晴朗夜空', '🌙', '晴朗的夜晚'),
-- terrain
('card-bus001-t01', 'preset-business-001', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室'),
('card-bus001-t02', 'preset-business-001', 'plot', 'terrain', '会议室', '📋', '严肃的会议室'),
('card-bus001-t03', 'preset-business-001', 'plot', 'terrain', '咖啡馆', '☕', '商务洽谈'),
('card-bus001-t04', 'preset-business-001', 'plot', 'terrain', '休息室', '☕', '员工休息'),
('card-bus001-t05', 'preset-business-001', 'plot', 'terrain', '总部', '🏙️', '公司总部'),
('card-bus001-t06', 'preset-business-001', 'plot', 'terrain', '大堂', '🏛️', '公司大堂'),
('card-bus001-t07', 'preset-business-001', 'plot', 'terrain', '楼顶', '🌃', '天台风景'),
-- adventure
('card-bus001-a01', 'preset-business-001', 'plot', 'adventure', '团队管理', '👥', '管理团队'),
('card-bus001-a02', 'preset-business-001', 'plot', 'adventure', '危机处理', '🚨', '处理危机'),
('card-bus001-a03', 'preset-business-001', 'plot', 'adventure', '创新', '💡', '技术创新'),
('card-bus001-a04', 'preset-business-001', 'plot', 'adventure', '突破', '🚀', '取得突破'),
('card-bus001-a05', 'preset-business-001', 'plot', 'adventure', '谈判', '🤝', '商务谈判'),
('card-bus001-a06', 'preset-business-001', 'plot', 'adventure', '坚守', '🛡️', '坚守阵地'),
('card-bus001-a07', 'preset-business-001', 'plot', 'adventure', '竞标', '📊', '项目竞标'),
('card-bus001-a08', 'preset-business-001', 'plot', 'adventure', '崛起', '📈', '快速崛起'),
('card-bus001-a09', 'preset-business-001', 'plot', 'adventure', '升级', '⬆️', '业务升级'),
-- equipment
('card-bus001-e01', 'preset-business-001', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-bus001-e02', 'preset-business-001', 'plot', 'equipment', '白板', '📋', '会议白板'),
('card-bus001-e03', 'preset-business-001', 'plot', 'equipment', '手账', '📓', '工作记录'),
('card-bus001-e04', 'preset-business-001', 'plot', 'equipment', '投影仪', '📽️', '演示设备'),
('card-bus001-e05', 'preset-business-001', 'plot', 'equipment', '咖啡杯', '☕', '提神咖啡'),
('card-bus001-e06', 'preset-business-001', 'plot', 'equipment', '合同', '📄', '商务合同'),
('card-bus001-e07', 'preset-business-001', 'plot', 'equipment', '名册', '📒', '客户名单'),
('card-bus001-e08', 'preset-business-001', 'plot', 'equipment', '奖杯', '🏆', '荣誉象征'),
('card-bus001-e09', 'preset-business-001', 'plot', 'equipment', '钢笔', '🖊️', '签字用笔');

-- ============================================
-- 职场风云 - 周报战争（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus001-w01-en', 'preset-business-001-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky'),
('card-bus001-w02-en', 'preset-business-001-en', 'plot', 'weather', 'Fog', '🌫️', 'Foggy weather'),
('card-bus001-w03-en', 'preset-business-001-en', 'plot', 'weather', 'Partly Cloudy', '⛅', 'Partly cloudy'),
('card-bus001-w04-en', 'preset-business-001-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather'),
('card-bus001-w05-en', 'preset-business-001-en', 'plot', 'weather', 'Thunderstorm', '⛈️', 'Thunder and rain'),
('card-bus001-w06-en', 'preset-business-001-en', 'plot', 'weather', 'Light Rain', '🌦️', 'Light drizzle'),
('card-bus001-w07-en', 'preset-business-001-en', 'plot', 'weather', 'Clearing', '🌤️', 'Weather improving'),
('card-bus001-w08-en', 'preset-business-001-en', 'plot', 'weather', 'Windy', '💨', 'Strong wind'),
('card-bus001-w09-en', 'preset-business-001-en', 'plot', 'weather', 'Rainbow', '🌈', 'Rainbow after rain'),
('card-bus001-w10-en', 'preset-business-001-en', 'plot', 'weather', 'Clear Night', '🌙', 'Clear night'),
-- terrain
('card-bus001-t01-en', 'preset-business-001-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office'),
('card-bus001-t02-en', 'preset-business-001-en', 'plot', 'terrain', 'Meeting Room', '📋', 'Serious meeting room'),
('card-bus001-t03-en', 'preset-business-001-en', 'plot', 'terrain', 'Cafe', '☕', 'Business meeting'),
('card-bus001-t04-en', 'preset-business-001-en', 'plot', 'terrain', 'Break Room', '☕', 'Employee rest'),
('card-bus001-t05-en', 'preset-business-001-en', 'plot', 'terrain', 'Headquarters', '🏙️', 'Company HQ'),
('card-bus001-t06-en', 'preset-business-001-en', 'plot', 'terrain', 'Lobby', '🏛️', 'Company lobby'),
('card-bus001-t07-en', 'preset-business-001-en', 'plot', 'terrain', 'Rooftop', '🌃', 'Rooftop view'),
-- adventure
('card-bus001-a01-en', 'preset-business-001-en', 'plot', 'adventure', 'Team Management', '👥', 'Manage team'),
('card-bus001-a02-en', 'preset-business-001-en', 'plot', 'adventure', 'Crisis', '🚨', 'Handle crisis'),
('card-bus001-a03-en', 'preset-business-001-en', 'plot', 'adventure', 'Innovation', '💡', 'Technical innovation'),
('card-bus001-a04-en', 'preset-business-001-en', 'plot', 'adventure', 'Breakthrough', '🚀', 'Achieve breakthrough'),
('card-bus001-a05-en', 'preset-business-001-en', 'plot', 'adventure', 'Negotiation', '🤝', 'Business negotiation'),
('card-bus001-a06-en', 'preset-business-001-en', 'plot', 'adventure', 'Hold Ground', '🛡️', 'Hold position'),
('card-bus001-a07-en', 'preset-business-001-en', 'plot', 'adventure', 'Bidding', '📊', 'Project bidding'),
('card-bus001-a08-en', 'preset-business-001-en', 'plot', 'adventure', 'Rise', '📈', 'Rapid rise'),
('card-bus001-a09-en', 'preset-business-001-en', 'plot', 'adventure', 'Upgrade', '⬆️', 'Business upgrade'),
-- equipment
('card-bus001-e01-en', 'preset-business-001-en', 'plot', 'equipment', 'Laptop', '💻', 'Work essential'),
('card-bus001-e02-en', 'preset-business-001-en', 'plot', 'equipment', 'Whiteboard', '📋', 'Meeting whiteboard'),
('card-bus001-e03-en', 'preset-business-001-en', 'plot', 'equipment', 'Journal', '📓', 'Work record'),
('card-bus001-e04-en', 'preset-business-001-en', 'plot', 'equipment', 'Projector', '📽️', 'Presentation device'),
('card-bus001-e05-en', 'preset-business-001-en', 'plot', 'equipment', 'Coffee Cup', '☕', 'Energy coffee'),
('card-bus001-e06-en', 'preset-business-001-en', 'plot', 'equipment', 'Contract', '📄', 'Business contract'),
('card-bus001-e07-en', 'preset-business-001-en', 'plot', 'equipment', 'Client List', '📒', 'Client roster'),
('card-bus001-e08-en', 'preset-business-001-en', 'plot', 'equipment', 'Trophy', '🏆', 'Honor symbol'),
('card-bus001-e09-en', 'preset-business-001-en', 'plot', 'equipment', 'Pen', '🖊️', 'Signing pen');

-- ============================================
-- 职场风云 - 副业狂想曲（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus002-w01', 'preset-business-002', 'plot', 'weather', '晴天', '☀️', '晴朗的天气'),
('card-bus002-w02', 'preset-business-002', 'plot', 'weather', '多云', '⛅', '多云天气'),
('card-bus002-w03', 'preset-business-002', 'plot', 'weather', '阴天', '☁️', '阴沉的天空'),
('card-bus002-w04', 'preset-business-002', 'plot', 'weather', '小雨', '🌦️', '绵绵细雨'),
('card-bus002-w05', 'preset-business-002', 'plot', 'weather', '彩虹', '🌈', '雨后彩虹'),
('card-bus002-w06', 'preset-business-002', 'plot', 'weather', '雷阵雨', '⛈️', '雷雨交加'),
('card-bus002-w07', 'preset-business-002', 'plot', 'weather', '雾霾', '🌫️', '雾霾天气'),
('card-bus002-w08', 'preset-business-002', 'plot', 'weather', '晨光', '🌅', '温暖的晨光'),
('card-bus002-w09', 'preset-business-002', 'plot', 'weather', '晴朗夜空', '🌙', '晴朗的夜晚'),
-- terrain
('card-bus002-t01', 'preset-business-002', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室'),
('card-bus002-t02', 'preset-business-002', 'plot', 'terrain', '咖啡馆', '☕', '商务洽谈'),
('card-bus002-t03', 'preset-business-002', 'plot', 'terrain', '会议室', '📋', '严肃的会议室'),
('card-bus002-t04', 'preset-business-002', 'plot', 'terrain', '餐厅', '🍽️', '商务宴请'),
('card-bus002-t05', 'preset-business-002', 'plot', 'terrain', '公司', '🏢', '忙碌的公司'),
('card-bus002-t06', 'preset-business-002', 'plot', 'terrain', '大堂', '🏛️', '公司大堂'),
('card-bus002-t07', 'preset-business-002', 'plot', 'terrain', '写字楼', '🏬', '现代化写字楼'),
('card-bus002-t08', 'preset-business-002', 'plot', 'terrain', '展会', '🎪', '行业展会'),
('card-bus002-t09', 'preset-business-002', 'plot', 'terrain', '楼顶', '🌃', '天台风景'),
-- adventure
('card-bus002-a01', 'preset-business-002', 'plot', 'adventure', '创新', '💡', '技术创新'),
('card-bus002-a02', 'preset-business-002', 'plot', 'adventure', '谈判', '🤝', '商务谈判'),
('card-bus002-a03', 'preset-business-002', 'plot', 'adventure', '危机处理', '🚨', '处理危机'),
('card-bus002-a04', 'preset-business-002', 'plot', 'adventure', '团队管理', '👥', '管理团队'),
('card-bus002-a05', 'preset-business-002', 'plot', 'adventure', '扩张', '🌍', '业务扩张'),
('card-bus002-a06', 'preset-business-002', 'plot', 'adventure', '转型', '🔄', '战略转型'),
('card-bus002-a07', 'preset-business-002', 'plot', 'adventure', '突破', '🚀', '取得突破'),
('card-bus002-a08', 'preset-business-002', 'plot', 'adventure', '坚守', '🛡️', '坚守阵地'),
('card-bus002-a09', 'preset-business-002', 'plot', 'adventure', '崛起', '📈', '快速崛起'),
-- equipment
('card-bus002-e01', 'preset-business-002', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-bus002-e02', 'preset-business-002', 'plot', 'equipment', '手机', '📱', '联系的工具'),
('card-bus002-e03', 'preset-business-002', 'plot', 'equipment', '白板', '📋', '会议白板'),
('card-bus002-e04', 'preset-business-002', 'plot', 'equipment', '咖啡杯', '☕', '提神咖啡'),
('card-bus002-e05', 'preset-business-002', 'plot', 'equipment', '平板电脑', '📱', '移动办公'),
('card-bus002-e06', 'preset-business-002', 'plot', 'equipment', '合同', '📄', '商务合同'),
('card-bus002-e07', 'preset-business-002', 'plot', 'equipment', '钢笔', '🖊️', '签字用笔'),
('card-bus002-e08', 'preset-business-002', 'plot', 'equipment', '相机', '📷', '拍摄设备'),
('card-bus002-e09', 'preset-business-002', 'plot', 'equipment', '名片', '💳', '商务名片'),
('card-bus002-e10', 'preset-business-002', 'plot', 'equipment', '奖杯', '🏆', '荣誉象征');

-- ============================================
-- 职场风云 - 副业狂想曲（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus002-w01-en', 'preset-business-002-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather'),
('card-bus002-w02-en', 'preset-business-002-en', 'plot', 'weather', 'Partly Cloudy', '⛅', 'Partly cloudy'),
('card-bus002-w03-en', 'preset-business-002-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky'),
('card-bus002-w04-en', 'preset-business-002-en', 'plot', 'weather', 'Light Rain', '🌦️', 'Light drizzle'),
('card-bus002-w05-en', 'preset-business-002-en', 'plot', 'weather', 'Rainbow', '🌈', 'Rainbow after rain'),
('card-bus002-w06-en', 'preset-business-002-en', 'plot', 'weather', 'Thunderstorm', '⛈️', 'Thunder and rain'),
('card-bus002-w07-en', 'preset-business-002-en', 'plot', 'weather', 'Fog', '🌫️', 'Foggy weather'),
('card-bus002-w08-en', 'preset-business-002-en', 'plot', 'weather', 'Morning Light', '🌅', 'Warm morning light'),
('card-bus002-w09-en', 'preset-business-002-en', 'plot', 'weather', 'Clear Night', '🌙', 'Clear night'),
-- terrain
('card-bus002-t01-en', 'preset-business-002-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office'),
('card-bus002-t02-en', 'preset-business-002-en', 'plot', 'terrain', 'Cafe', '☕', 'Business meeting'),
('card-bus002-t03-en', 'preset-business-002-en', 'plot', 'terrain', 'Meeting Room', '📋', 'Serious meeting room'),
('card-bus002-t04-en', 'preset-business-002-en', 'plot', 'terrain', 'Restaurant', '🍽️', 'Business dining'),
('card-bus002-t05-en', 'preset-business-002-en', 'plot', 'terrain', 'Company', '🏢', 'Busy company'),
('card-bus002-t06-en', 'preset-business-002-en', 'plot', 'terrain', 'Lobby', '🏛️', 'Company lobby'),
('card-bus002-t07-en', 'preset-business-002-en', 'plot', 'terrain', 'Office Building', '🏬', 'Modern office building'),
('card-bus002-t08-en', 'preset-business-002-en', 'plot', 'terrain', 'Exhibition', '🎪', 'Industry exhibition'),
('card-bus002-t09-en', 'preset-business-002-en', 'plot', 'terrain', 'Rooftop', '🌃', 'Rooftop view'),
-- adventure
('card-bus002-a01-en', 'preset-business-002-en', 'plot', 'adventure', 'Innovation', '💡', 'Technical innovation'),
('card-bus002-a02-en', 'preset-business-002-en', 'plot', 'adventure', 'Negotiation', '🤝', 'Business negotiation'),
('card-bus002-a03-en', 'preset-business-002-en', 'plot', 'adventure', 'Crisis', '🚨', 'Handle crisis'),
('card-bus002-a04-en', 'preset-business-002-en', 'plot', 'adventure', 'Team Management', '👥', 'Manage team'),
('card-bus002-a05-en', 'preset-business-002-en', 'plot', 'adventure', 'Expansion', '🌍', 'Business expansion'),
('card-bus002-a06-en', 'preset-business-002-en', 'plot', 'adventure', 'Pivot', '🔄', 'Strategic pivot'),
('card-bus002-a07-en', 'preset-business-002-en', 'plot', 'adventure', 'Breakthrough', '🚀', 'Achieve breakthrough'),
('card-bus002-a08-en', 'preset-business-002-en', 'plot', 'adventure', 'Hold Ground', '🛡️', 'Hold position'),
('card-bus002-a09-en', 'preset-business-002-en', 'plot', 'adventure', 'Rise', '📈', 'Rapid rise'),
-- equipment
('card-bus002-e01-en', 'preset-business-002-en', 'plot', 'equipment', 'Laptop', '💻', 'Work essential'),
('card-bus002-e02-en', 'preset-business-002-en', 'plot', 'equipment', 'Phone', '📱', 'Communication tool'),
('card-bus002-e03-en', 'preset-business-002-en', 'plot', 'equipment', 'Whiteboard', '📋', 'Meeting whiteboard'),
('card-bus002-e04-en', 'preset-business-002-en', 'plot', 'equipment', 'Coffee Cup', '☕', 'Energy coffee'),
('card-bus002-e05-en', 'preset-business-002-en', 'plot', 'equipment', 'Tablet', '📱', 'Mobile office'),
('card-bus002-e06-en', 'preset-business-002-en', 'plot', 'equipment', 'Contract', '📄', 'Business contract'),
('card-bus002-e07-en', 'preset-business-002-en', 'plot', 'equipment', 'Pen', '🖊️', 'Signing pen'),
('card-bus002-e08-en', 'preset-business-002-en', 'plot', 'equipment', 'Camera', '📷', 'Filming equipment'),
('card-bus002-e09-en', 'preset-business-002-en', 'plot', 'equipment', 'Business Card', '💳', 'Business card'),
('card-bus002-e10-en', 'preset-business-002-en', 'plot', 'equipment', 'Trophy', '🏆', 'Honor symbol');
