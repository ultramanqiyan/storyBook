# BUG-004 CSS点击区域Bug

## 问题现象

按钮部分区域无法点击，点击按钮边缘时没有响应。

## 根本原因

CSS z-index层级设计不当。底部操作栏的z-index设置过低，被其他元素遮挡。同时缺少pointer-events设置。

## 解决方案

```css
/* 修复前 */
.bottom-bar { z-index: 10; }

/* 修复后 */
.bottom-bar { 
  z-index: 100; 
  pointer-events: auto; 
}
```

## 预防措施

1. CSS层级设计应有明确规范
2. 交互元素z-index应高于装饰元素
3. 固定定位元素需要设置pointer-events

## 相关代码

- `css/styles.css`

## 发现时间

2026-02-23

## 影响范围

所有包含底部操作栏的页面

## 规则提炼

> **CSS-001**: 交互元素z-index > 100
> **CSS-002**: 装饰元素z-index < 50
> **CSS-003**: 固定定位元素需要pointer-events设置
