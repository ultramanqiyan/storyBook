@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   Preset Books Deployment Script
echo ========================================
echo.

for /f "delims=" %%i in ('dir /b /o-d migrations\production_preset_books_*.sql 2^>nul') do (
    set SQL_FILE=%%i
    goto :found
)
echo [ERROR] SQL file not found!
pause
exit /b 1
:found

echo SQL File: migrations\!SQL_FILE!
echo.

echo [Step 1/7] Checking wrangler...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] wrangler not installed!
    pause
    exit /b 1
)

echo.
echo [Step 2/7] Checking Cloudflare login...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo [INFO] Please login to Cloudflare...
    wrangler login
    if errorlevel 1 (
        echo [ERROR] Login failed!
        pause
        exit /b 1
    )
)

echo.
echo [Step 3/7] Deploying frontend to Cloudflare Pages...
wrangler pages deploy src/frontend --project-name=storybook --commit-dirty=true
if errorlevel 1 (
    echo [ERROR] Frontend deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Code deployed successfully!
echo ========================================
echo.
echo   Please verify the following in browser:
echo   1. Website is accessible
echo   2. Preset books list displays correctly
echo   3. User login works
echo.
echo   URL: https://storybook.pages.dev
echo.
echo ========================================
echo.

pause

echo.
echo [Step 4/7] Backing up online preset books data...
set BACKUP_FILE=backups\online_preset_books_backup_%date:~0,4%%date:~5,2%%date:~8,2%.sql
if not exist backups mkdir backups
wrangler d1 execute storybook_database --remote --command "SELECT * FROM books WHERE is_preset = 1" --json > !BACKUP_FILE!.json
echo Backup file: !BACKUP_FILE!.json

echo.
echo [Step 5/7] Deleting online preset books...
wrangler d1 execute storybook_database --remote --file=./migrations/delete_preset_books.sql
if errorlevel 1 (
    echo [ERROR] Delete failed!
    pause
    exit /b 1
)

echo.
echo [Step 6/7] Importing new preset books...
wrangler d1 execute storybook_database --remote --file=./migrations/!SQL_FILE!
if errorlevel 1 (
    echo [ERROR] Import failed! Please restore from backup!
    pause
    exit /b 1
)

echo.
echo [Step 7/7] Verifying import result...
wrangler d1 execute storybook_database --remote --command "SELECT language, COUNT(*) as count FROM books WHERE is_preset = 1 GROUP BY language"

echo.
echo ========================================
echo   Deployment completed!
echo ========================================
echo.
echo   Preset books updated:
echo   - English: 31 books
echo   - Chinese: 8 books
echo.
echo   URL: https://storybook.pages.dev
echo.
echo ========================================

pause
