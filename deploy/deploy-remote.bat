@echo off
REM 自动部署到Cloudflare线上环境

echo ========================================
echo 开始部署卡牌互动小说网站...
echo ========================================

echo.
echo [1/4] 正在执行数据库迁移...
wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql

if %errorlevel% neq 0 (
    echo 数据库迁移失败！
    pause
    exit /b 1
)

echo.
echo [2/4] 正在植入预设数据...
wrangler d1 execute storybook_database --remote --file=./migrations/0002_seed_data.sql

if %errorlevel% neq 0 (
    echo 预设数据植入失败！
    pause
    exit /b 1
)

echo.
echo [3/4] 正在部署前端...
wrangler pages deploy src/frontend --project-name=storybook

if %errorlevel% neq 0 (
    echo 前端部署失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 网站地址: https://storybook.pages.dev
echo.
pause
