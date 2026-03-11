# BP-001 Cloudflare Pages Functions API响应格式

## 适用场景

开发Cloudflare Pages Functions API时，统一响应格式。

## 实践内容

所有API应返回统一的响应格式，便于前端处理。

### 成功响应

```javascript
return new Response(JSON.stringify({
  success: true,
  data: { ... },
  error: null
}), {
  headers: { 'Content-Type': 'application/json' }
});
```

### 错误响应

```javascript
return new Response(JSON.stringify({
  success: false,
  data: null,
  error: '错误信息'
}), {
  status: 400,
  headers: { 'Content-Type': 'application/json' }
});
```

### 工具函数

```javascript
export function createSuccessResponse(data) {
  return new Response(JSON.stringify({
    success: true,
    data: data,
    error: null
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function createErrorResponse(message, status = 400) {
  return new Response(JSON.stringify({
    success: false,
    data: null,
    error: message
  }), {
    status: status,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
```

## 注意事项

1. 始终设置 `Content-Type: application/json`
2. 设置CORS头允许跨域
3. 错误响应设置正确的HTTP状态码
4. 错误信息对用户友好

## 参考资料

- [Cloudflare Pages Functions文档](https://developers.cloudflare.com/pages/functions/)
