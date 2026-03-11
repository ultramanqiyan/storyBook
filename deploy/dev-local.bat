@echo off
chcp 65001 >nul
echo ========================================
echo   StoryBook 本地开发环境
echo ========================================
echo.

:: 检查wrangler是否安装
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [错误] wrangler未安装，正在安装...
    npm install -g wrangler
)

:: 检查是否已登录
echo [步骤1] 检查登录状态...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo [提示] 请先登录Cloudflare...
    wrangler login
)

:: 执行本地数据库迁移
echo.
echo [步骤2] 执行本地数据库迁移...
wrangler d1 execute storybook_database --local --file=./migrations/0001_init.sql
if errorlevel 1 (
    echo [警告] 本地数据库迁移可能已存在，继续...
)

:: 启动本地开发服务器
echo.
echo [步骤3] 启动本地开发服务器...
echo ========================================
echo   访问地址: http://localhost:8788
echo   API地址: http://localhost:8788/api/version
echo ========================================
echo.
echo 按 Ctrl+C 停止服务器
echo.

wrangler pages dev src/frontend --compatibility-flag nodejs_compat
