@echo off
chcp 65001 >nul
echo ========================================
echo   StoryBook 远程部署
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

:: 显示当前账户
echo.
echo 当前登录账户:
wrangler whoami

:: 创建D1数据库
echo.
echo [步骤2] 创建D1数据库（如果不存在）...
wrangler d1 create storybook_database 2>nul
if errorlevel 1 (
    echo [提示] 数据库可能已存在，继续...
)

:: 提示用户更新database_id
echo.
echo [重要] 请检查上面的输出，获取database_id
echo 然后更新 wrangler.toml 文件中的 database_id 字段
echo.
set /p confirm="已更新database_id? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo 请先更新 wrangler.toml 中的 database_id
    pause
    exit /b 1
)

:: 执行远程数据库迁移
echo.
echo [步骤3] 执行远程数据库迁移...
wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql
if errorlevel 1 (
    echo [警告] 远程数据库迁移可能已存在，继续...
)

:: 部署到Cloudflare Pages
echo.
echo [步骤4] 部署到Cloudflare Pages...
wrangler pages deploy src/frontend --project-name=storybook

echo.
echo ========================================
echo   部署完成！
echo ========================================
echo.
echo [后续步骤]
echo 1. 访问 Cloudflare 控制台
echo 2. 进入 Pages 项目设置
echo 3. 在 Functions 设置中绑定 D1 数据库
echo    - 变量名: DB
echo    - 数据库: storybook_database
echo.
pause
