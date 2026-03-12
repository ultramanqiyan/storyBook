@echo off
chcp 65001 >nul
REM ========================================
REM 卡牌互动小说网站 - 线上部署脚本
REM ========================================

echo.
echo ========================================
echo   StoryBook 线上部署脚本
echo ========================================
echo.

:: 检查wrangler是否安装
echo [步骤1/6] 检查 wrangler 安装...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [错误] wrangler 未安装，正在安装...
    npm install -g wrangler
)

:: 检查是否已登录Cloudflare
echo.
echo [步骤2/6] 检查 Cloudflare 登录状态...
wrangler whoami >nul 2>&1
if errorlevel 1 (
    echo [提示] 请先登录 Cloudflare...
    wrangler login
    if errorlevel 1 (
        echo [错误] 登录失败！
        pause
        exit /b 1
    )
)

:: 运行测试（可选）
echo.
echo [步骤3/6] 运行测试...
echo [提示] 跳过测试，如需运行测试请手动执行: npm run test
REM npm run test
REM if errorlevel 1 (
REM     echo [错误] 测试失败！
REM     pause
REM     exit /b 1
REM )

:: 执行线上数据库迁移
echo.
echo [步骤4/6] 执行线上数据库迁移...
wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql
if errorlevel 1 (
    echo [警告] 数据库迁移可能已存在，继续...
)

:: 植入预设数据
echo.
echo [步骤5/6] 植入预设数据...
wrangler d1 execute storybook_database --remote --file=./migrations/0002_seed_data.sql
if errorlevel 1 (
    echo [警告] 预设数据可能已存在，继续...
)

:: 部署前端到 Cloudflare Pages
echo.
echo [步骤6/6] 部署前端到 Cloudflare Pages...
wrangler pages deploy src/frontend --project-name=storybook
if errorlevel 1 (
    echo [错误] 前端部署失败！
    pause
    exit /b 1
)

echo.
echo ========================================
echo   部署完成！
echo ========================================
echo.
echo   网站地址: https://storybook.pages.dev
echo   管理后台: https://dash.cloudflare.com
echo.
echo ========================================
echo.

pause
