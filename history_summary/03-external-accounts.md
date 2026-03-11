# 乐高故事书项目外部账号配置

## 一、账号清单

### 1.1 必需账号

| 服务商 | 用途 | 注册地址 | 费用 |
|--------|------|----------|------|
| Cloudflare | Pages托管、D1数据库 | https://dash.cloudflare.com/sign-up | 免费 |
| 火山引擎(豆包) | AI故事生成、图片生成 | https://console.volcengine.com/ | 按量付费 |
| SiliconFlow | 语音识别服务 | https://cloud.siliconflow.cn/ | 按量付费 |
| GitHub | 代码托管(可选) | https://github.com/signup | 免费 |

---

## 二、Cloudflare 配置

### 2.1 账号创建

1. 访问 https://dash.cloudflare.com/sign-up
2. 输入邮箱和密码注册
3. 验证邮箱地址
4. 登录Cloudflare控制台

### 2.2 创建D1数据库

```bash
# 安装Wrangler CLI
npm install -g wrangler

# 登录Cloudflare
wrangler login

# 创建D1数据库
wrangler d1 create lego-story-db

# 记录返回的database_id，填入wrangler.toml
```

### 2.3 环境变量配置

在Cloudflare Pages项目设置中添加以下环境变量：

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| DOUBAO_API_KEY | 豆包故事生成API密钥 | 火山引擎控制台 |
| SEEDREAM_API_KEY | 豆包图片生成API密钥 | 火山引擎控制台 |
| SILICONFLOW_API_KEY | SiliconFlow语音识别密钥 | SiliconFlow控制台 |

---

## 三、火山引擎(豆包)配置

### 3.1 账号创建

1. 访问 https://console.volcengine.com/
2. 使用手机号注册
3. 完成实名认证
4. 开通"方舟"大模型服务

### 3.2 API密钥获取

1. 进入火山引擎控制台
2. 选择"方舟" -> "API Key管理"
3. 创建新的API Key
4. 复制保存API Key

### 3.3 模型配置

| 功能 | 模型名称 | API端点 |
|------|----------|---------|
| 故事生成 | doubao-1-5-pro-32k-250115 | https://ark.cn-beijing.volces.com/api/v3/chat/completions |
| 图片生成 | doubao-seedream-4-0-250828 | https://ark.cn-beijing.volces.com/api/v3/images/generations |

### 3.4 费用说明

| 服务 | 价格 | 免费额度 |
|------|------|----------|
| 故事生成 | 约0.008元/千tokens | 新用户有试用额度 |
| 图片生成 | 约0.05元/张 | 新用户有试用额度 |

---

## 四、SiliconFlow配置

### 4.1 账号创建

1. 访问 https://cloud.siliconflow.cn/
2. 使用手机号或GitHub注册
3. 完成账号验证

### 4.2 API密钥获取

1. 登录SiliconFlow控制台
2. 进入"API密钥"页面
3. 创建新的API Key
4. 复制保存API Key

### 4.3 模型配置

| 功能 | 模型名称 | API端点 |
|------|----------|---------|
| 语音识别 | FunAudioLLM/SenseVoiceSmall | https://api.siliconflow.cn/v1/audio/transcriptions |

### 4.4 费用说明

| 服务 | 价格 | 免费额度 |
|------|------|----------|
| 语音识别 | 约0.005元/分钟 | 新用户有试用额度 |

---

## 五、GitHub配置(可选)

### 5.1 仓库创建

1. 登录GitHub
2. 创建新仓库
3. 推送代码到仓库

### 5.2 Cloudflare Pages关联

1. 在Cloudflare Pages创建项目
2. 选择"连接Git仓库"
3. 授权GitHub访问
4. 选择对应仓库

---

## 六、安全注意事项

### 6.1 密钥管理

| 规则 | 说明 |
|------|------|
| 不要硬编码 | API密钥不要写入代码文件 |
| 使用环境变量 | 通过Cloudflare环境变量注入 |
| 定期轮换 | 建议每3个月更换一次密钥 |
| 权限最小化 | 只授予必要的API权限 |

### 6.2 费用控制

| 措施 | 说明 |
|------|------|
| 设置预算提醒 | 在各平台设置费用预警 |
| 监控使用量 | 定期检查API调用量 |
| 添加请求限制 | 防止恶意调用消耗额度 |

---

## 七、配置检查清单

### 7.1 部署前检查

- [ ] Cloudflare账号已创建
- [ ] D1数据库已创建
- [ ] 火山引擎账号已创建并充值
- [ ] 豆包API Key已获取
- [ ] SiliconFlow账号已创建
- [ ] SiliconFlow API Key已获取
- [ ] wrangler.toml中database_id已配置
- [ ] Cloudflare环境变量已配置

### 7.2 部署后验证

- [ ] 用户登录功能正常
- [ ] 故事生成功能正常
- [ ] 图片生成功能正常
- [ ] 语音识别功能正常
- [ ] 数据库读写正常
