# Playwright测试卡住不运行

## 问题现象
运行Playwright测试时，命令执行后没有任何输出，浏览器没有打开，测试一直处于等待状态。

## 根本原因
`playwright.config.js` 中配置了 `webServer` 选项：

```javascript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:8788',
  reuseExistingServer: !process.env.CI,
  timeout: 120000
}
```

Playwright会在运行测试前自动启动webServer中配置的命令，如果服务器启动失败或端口被占用，测试会一直等待直到超时。

## 解决方案

### 方案一：移除webServer配置（推荐用于手动启动服务器）
```javascript
// playwright.config.js
export default defineConfig({
  testDir: './test/e2e',
  // 移除 webServer 配置
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

手动启动开发服务器后，再运行测试：
```bash
# 终端1：启动开发服务器
npm run dev

# 终端2：运行测试
npx playwright test test/e2e/xxx.spec.js --project=chromium --headed
```

### 方案二：确保端口可用
如果需要使用webServer自动启动功能，确保配置的端口（如8788）没有被其他进程占用。

### 方案三：使用reuseExistingServer
设置 `reuseExistingServer: true`，如果服务器已经在运行，Playwright会复用现有服务器而不是重新启动。

## 注意事项
1. 运行测试前，先用 `npx playwright install chromium` 确保浏览器已安装
2. 使用 `--headed` 参数可以看到浏览器窗口打开
3. 使用 `--reporter=list` 可以看到实时测试输出

## 相关代码
- `playwright.config.js`

## 发现时间
2026-03-13

## 影响范围
所有E2E测试

---

# 端口残留连接导致服务器无响应

## 问题现象
开发服务器显示 "Ready on http://127.0.0.1:8788"，但请求超时无法访问。

## 根本原因
端口被残留的TCP连接占用（CLOSE_WAIT、FIN_WAIT_2等状态），导致新服务器虽然启动但无法正常响应请求。

## 解决方案

### 方案一：更换端口
使用不同的端口启动服务器：
```bash
npx wrangler pages dev src/frontend --port 8789 --compatibility-flag nodejs_compat
```

### 方案二：杀掉占用端口的进程
```bash
# Windows
netstat -ano | findstr :8788
taskkill /F /PID <PID>
```

### 方案三：等待连接释放
等待几分钟让TCP连接自然释放。

## 预防措施
1. 正常关闭开发服务器（Ctrl+C），避免强制终止
2. 定期检查并清理残留进程
3. 配置使用不常用的端口减少冲突

## 发现时间
2026-03-13

## 影响范围
本地开发环境
