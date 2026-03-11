# BUG-003 DOM空值访问Bug

## 问题现象

点击"去解谜"按钮时报错：`Cannot read properties of null (reading 'style')`

## 根本原因

防御性编程缺失。代码直接访问DOM元素的属性，没有检查元素是否存在。当章节列表中有"还没有章节"提示时，该元素没有onclick属性，导致getAttribute返回null。

## 解决方案

```javascript
// 修复前
element.style.display = 'block';

// 修复后
if (element) {
  element.style.display = 'block';
}

// 或使用可选链
element?.classList.add('active');
```

## 预防措施

1. 所有DOM操作前必须进行空值检查
2. 使用可选链操作符 `?.`（如果支持）
3. 添加边界条件测试

## 相关代码

- `js/reader.js`
- `js/book.js`

## 发现时间

2026-02-23

## 影响范围

所有涉及DOM操作的页面

## 规则提炼

> **CODE-001**: 所有DOM操作前检查元素是否存在
