-- 更新现有预设书籍的language字段

-- 更新中文版书籍
UPDATE books SET language = 'zh' WHERE book_id LIKE 'preset-%' AND book_id NOT LIKE '%-en';

-- 更新英文版书籍
UPDATE books SET language = 'en' WHERE book_id LIKE 'preset-%-en';
