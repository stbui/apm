# 身份认证

除少数接口外，对 REST API 发起的任何请求都必须通过身份验证，未验证的请求将返回 401 Unauthorized 错误。

## 获取 API 密钥

所有的 REST API 调用均通过专门的 API 密钥完成，该密钥是一串字符串

## 使用 API 密钥进行身份认证

获取 API 密钥之后需要在调用 REST API 时将密钥通过请求发送给服务器，目前系统支持两种方式发送 API 密钥：

- 通过 Header 发送 API 密钥
- 通过传参发送 API 密钥

如果身份认证成功，返回 HTTP 200，如果身份验证失败，返回 HTTP 401。

### 通过 Header 发送 API 密钥

使用 Header 方法送 API 密钥需要在发起请求时将密钥放到 X-SS-API-KEY Header 中：

请求

```
GET https://example.com/api/v1/node
```

请求 Header

```
X-SS-API-KEY: 5c32ea3a-adbb-4434-aa3f-dc49a40d07e8

```

响应

```
200
```

### 通过传参发送 API 密钥

使用传参方法发送 API 密钥需要在发起请求时将密钥放到 apiKey 的请求参数中：

请求

```
GET https://example.com/api/v1/node?apiKey=5c32ea3a-adbb-4434-aa3f-dc49a40d07e8
```

响应

```
200
```

# 无需认证的 API 接口

| 操作 | 请求 | 地址          | 说明 |
| ---- | ---- | ------------- | ---- |
| xxx  | GET  | v1/users/{id} | xxx  |
