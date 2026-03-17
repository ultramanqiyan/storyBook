-- Migration: Remove incomplete preset books (no plot cards and no chapters)
-- Date: 2026-03-17
-- Description: Delete 16 preset books that have characters but missing plot cards and chapters

-- Books to delete:
-- preset-adventure-003, preset-adventure-003-en
-- preset-adventure-004, preset-adventure-004-en
-- preset-fantasy-003, preset-fantasy-003-en
-- preset-fantasy-004, preset-fantasy-004-en
-- preset-romance-003, preset-romance-003-en
-- preset-romance-004, preset-romance-004-en
-- preset-business-003, preset-business-003-en
-- preset-business-004, preset-business-004-en

-- Delete characters (these books have characters but no plot cards/chapters)
DELETE FROM characters WHERE book_id IN (
    'preset-adventure-003', 'preset-adventure-003-en',
    'preset-adventure-004', 'preset-adventure-004-en',
    'preset-fantasy-003', 'preset-fantasy-003-en',
    'preset-fantasy-004', 'preset-fantasy-004-en',
    'preset-romance-003', 'preset-romance-003-en',
    'preset-romance-004', 'preset-romance-004-en',
    'preset-business-003', 'preset-business-003-en',
    'preset-business-004', 'preset-business-004-en'
);

-- Delete books
DELETE FROM books WHERE book_id IN (
    'preset-adventure-003', 'preset-adventure-003-en',
    'preset-adventure-004', 'preset-adventure-004-en',
    'preset-fantasy-003', 'preset-fantasy-003-en',
    'preset-fantasy-004', 'preset-fantasy-004-en',
    'preset-romance-003', 'preset-romance-003-en',
    'preset-romance-004', 'preset-romance-004-en',
    'preset-business-003', 'preset-business-003-en',
    'preset-business-004', 'preset-business-004-en'
);
