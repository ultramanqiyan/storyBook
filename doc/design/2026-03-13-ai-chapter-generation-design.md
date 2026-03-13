# AI大模型章节生成接口设计

## 概述

本文档描述了使用AI大模型生成故事章节的接口设计，包括输入输出格式、数据流和Mock阶段实现方案。

---

## 一、大模型输入格式

### 1.1 输入文本结构

```
[系统提示词部分] + [用户数据部分]
```

### 1.2 系统提示词（固定模板）

```
你是互动故事章节生成专家。根据输入信息生成新一章节内容。

## 输出格式（仅JSON，无其他文字）
{
  "title": "章节标题",
  "content": "章节内容约300字",
  "puzzle": {
    "question": "谜题问题",
    "options": ["选项A", "选项B", "选项C", "选项D"],
    "answer": "正确答案"
  },
  "intimacy_changes": [
    { "char_name": "角色名字", "change": 5 }
  ]
}

## 创作要点
- 风格匹配书籍类型
- 角色行为符合性格
- 承接上章，使用卡牌元素
- 谜题相关且难度适中
- 亲密度变化-10到+10，有因果关系

## 解谜影响
- 上一章解谜成功：新章节内容偏向积极，配角亲密度倾向正向变化
- 上一章解谜失败：新章节内容偏向挑战，配角亲密度倾向负向变化
```

### 1.3 用户数据部分（动态构造）

```
书籍名称：{book.title}
书籍类型：{book.type}

主角：{protagonist.name}
角色类型：{protagonist.role_type}
性格：{protagonist.personality}
说话方式：{protagonist.speech_style}

配角：{supporting.name}
角色类型：{supporting.role_type}
性格：{supporting.personality}
说话方式：{supporting.speech_style}
与主角关系：{supporting.relationship}
与主角亲密度：{supporting.intimacy}

天气：{weather.name}
地形：{terrain.name}
冒险类型：{adventure.name}
装备：{equipment.name}

最近三章标题：{chapter1.title}、{chapter2.title}、{chapter3.title}
最近一章内容：{lastChapter.content}
最近一章谜题：{lastPuzzle.question}
正确答案：{lastPuzzle.answer}
是否解谜成功：{lastPuzzle.is_solved}
```

---

## 二、大模型输出格式

### 2.1 JSON格式

```json
{
  "title": "章节标题",
  "content": "章节内容约300字",
  "puzzle": {
    "question": "谜题问题",
    "options": ["选项A", "选项B", "选项C", "选项D"],
    "answer": "正确答案"
  },
  "intimacy_changes": [
    { "char_name": "角色名字", "change": 5 }
  ]
}
```

### 2.2 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 章节标题（不超过10字，不含"第X章"） |
| content | string | 章节内容（约300字） |
| puzzle.question | string | 谜题问题 |
| puzzle.options | string[] | 四个选项 |
| puzzle.answer | string | 正确答案（必须在options中） |
| intimacy_changes | array | 亲密度变化列表 |
| intimacy_changes[].char_name | string | 配角名字 |
| intimacy_changes[].change | number | 变化值（-10到+10） |

---

## 三、API接口设计

### 3.1 请求

**接口**: `POST /api/chapters`

**请求体**（不变）:
```json
{
  "user_id": "user-uuid-001",
  "book_id": "book-uuid-001",
  "selected_cards": {
    "protagonist_id": "char-uuid-001",
    "supporting_ids": ["char-uuid-002"],
    "weather_id": "card-uuid-001",
    "terrain_id": "card-uuid-002",
    "adventure_id": "card-uuid-003",
    "equipment_id": "card-uuid-004"
  }
}
```

### 3.2 响应

**响应体**（不变）:
```json
{
  "success": true,
  "data": {
    "chapter": {
      "chapter_id": "chapter-uuid-004",
      "title": "迷雾中的指引",
      "content": "...",
      "order_num": 4
    },
    "puzzle": {
      "puzzle_id": "puzzle-uuid-004",
      "question": "石门上的符文暗示了什么？",
      "puzzle_type": "choice"
    },
    "updated_intimacy": [
      { "char_id": "char-uuid-002", "intimacy": 55 }
    ]
  }
}
```

---

## 四、数据来源

### 4.1 输入字段来源

| 数据项 | 来源表 | 字段 |
|--------|--------|------|
| 书籍名称 | books | title |
| 书籍类型 | books | type |
| 主角信息 | characters | name, role_type, personality, speech_style |
| 配角信息 | characters | name, role_type, personality, speech_style, relationship, intimacy |
| 卡牌信息 | plot_cards | name |
| 最近三章标题 | chapters | title |
| 最近一章内容 | chapters | content |
| 最近一章谜题 | puzzles | question, answer, is_solved |

### 4.2 输出字段更新

| 字段 | 目标表 | 操作 |
|------|--------|------|
| title | chapters | INSERT |
| content | chapters | INSERT |
| puzzle.* | puzzles | INSERT |
| intimacy_changes | characters | UPDATE intimacy |

---

## 五、Mock阶段实现

### 5.1 Mock策略

| 阶段 | content内容 |
|------|-------------|
| Mock阶段 | 构造给大模型的输入文本（完整提示词+用户数据） |
| 真实AI阶段 | 大模型返回的章节内容（约300字故事） |

### 5.2 Mock返回样例

**输入**（构造给大模型的文本）:
```
你是互动故事章节生成专家。根据输入信息生成新一章节内容。
...（系统提示词）...

书籍名称：小明的冒险之旅
书籍类型：adventure

主角：小明
角色类型：小探险家
性格：勇敢
说话方式：简洁直接

配角：小红
角色类型：小精灵
性格：温柔
说话方式：可爱俏皮
与主角关系：朋友
与主角亲密度：50

天气：晴天
地形：森林
冒险类型：寻宝
装备：指南针

最近三章标题：神秘的开端、森林探险、山洞探秘
最近一章内容：阳光透过树叶洒下斑驳的光影...
最近一章谜题：在森林中，你发现了什么？
正确答案：宝藏
是否解谜成功：true
```

**输出**（Mock返回的JSON）:
```json
{
  "title": "迷雾中的指引",
  "content": "（Mock阶段：这里填入构造给大模型的输入文本）",
  "puzzle": {
    "question": "石门上的符文暗示了什么？",
    "options": ["推开石门", "寻找机关", "用指南针测量", "询问小红"],
    "answer": "寻找机关"
  },
  "intimacy_changes": [
    { "char_name": "小红", "change": 5 }
  ]
}
```

---

## 六、数据流图

```
┌─────────────────────────────────────────────────────────────┐
│                    前端请求                                  │
│  { user_id, book_id, selected_cards }                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    后端查询数据                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ 书籍信息  │  │ 角色信息  │  │ 卡牌信息  │  │ 章节历史  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    构造AI输入                                │
│  系统提示词（固定） + 用户数据（动态）                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    调用AI/Mock                               │
│  输入：完整文本                                              │
│  输出：JSON格式                                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    解析并写入数据库                           │
│  chapters表 / puzzles表 / characters表                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    返回给前端                                │
│  { chapter, puzzle, updated_intimacy }                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 七、后续工作

- [ ] 实现数据查询逻辑
- [ ] 实现AI输入构造函数
- [ ] 实现Mock AI返回函数
- [ ] 实现JSON解析和数据库写入
- [ ] 接入真实AI大模型API
