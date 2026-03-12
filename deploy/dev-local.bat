@echo off
chcp 65001 >nul
REM ========================================
REM 卡牌互动小说网站 - 本地开发脚本
REM ========================================

echo.
echo ========================================
echo   StoryBook 本地开发环境
echo ========================================
echo.

:: 检查wrangler是否安装
echo [步骤1/4] 检查 wrangler 安装...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [提示] wrangler 未安装，正在安装...
    npm install -g wrangler
)

:: 检查是否已登录（本地开发可选）
echo.
echo [步骤2/4] 检查 Cloudflare 登录状态...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo [提示] 未登录 Cloudflare，本地开发可以继续
    echo [提示] 如需部署到线上，请运行: wrangler login
)

:: 执行本地数据库迁移
echo.
echo [步骤3/4] 执行本地数据库迁移...
wrangler d1 execute storybook_database --local --file=./migrations/0001_init.sql
if errorlevel 1 (
    echo [警告] 本地数据库迁移可能已存在，继续...
)

:: 植入预设数据
echo.
echo [步骤4/4] 植入预设数据...
wrangler d1 execute storybook_database --local --file=./migrations/0002_seed_data.sql
if errorlevel 1 (
    echo [警告] 预设数据可能已存在，继续...
)

:: 启动本地开发服务器
echo.
echo ========================================
echo   启动本地开发服务器...
echo ========================================
echo.
echo   访问地址: http://localhost:8788
echo   API地址: http://localhost:8788/api/version
echo.
echo   按 Ctrl+C 停止服务器
echo ========================================
echo.

wrangler pages dev src/frontend --compatibility-flag nodejs_compat
