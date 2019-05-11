# 节点管理

对节点进行增删改查等操作的 API

| 操作         | 请求   | 地址                    | 说明 |
| ------------ | ------ | ----------------------- | ---- |
| 新增节点     | POST   | v1/node                 |      |
| 修改节点     | PUT    | v1/node/{id}            |      |
| 删除节点     | DELETE | v1/node/{id}            |      |
| 获取节点     | GET    | v1/node/{id}            |      |
| 获取节点列表 | GET    | v1/node                 |      |
| 下线节点     | POST   | v1/node/actions/offline |      |
| 上线节点     | POST   | v1/node/actions/online  |      |

# Request 定义

| 字段   | 数据类型 | 数据大小 | 说明       |
| ------ | -------- | -------- | ---------- |
| \_id   | String   |          | 自增长主键 |
| name   | String   |          | 节点名称   |
| type   | Boolean  |          | 显示/隐藏  |
| server | Number   |          | 节点地址   |
| method | Number   |          | 加密方法   |

# 新增节点 API

添加新节点，使用 POST 发起请求，请求地址为/api/v1/node

```
POST /api/v1/administrators HTTP/1.1
```

# 请求 URI

| 参数名 | 位置  | 类型   | 必填 | 说明                     |
| ------ | ----- | ------ | ---- | ------------------------ |
| apiKey | query | 字符串 | 否   | API 密钥，请参考身份认证 |

# 请求 Body

| 参数名 | 类型   | 必填 | 说明     |
| ------ | ------ | ---- | -------- |
| name   | String | 是   | 节点名称 |
| server | Number | 是   | 节点地址 |

# 返回 Response

| 名称             | 类型  | 说明     |
| ---------------- | ----- | -------- |
| 200 OK           |       | 节点     |
| 401 Unauthorized | Error | 认证错误 |
| 400 BadRequest   | Error | 参数错误 |

# 示例

#### 请求示例

```bash
POST /api/v1/node HTTP/1.1
Content-Type: application/json
X-SS-API-KEY: 7cd22002-27a7-4c5d-ba4d-a1c108a20eaf

{
  "name": "test",
  "server": "127.0.0.1",
}
```

#### 返回示例

```json
{
  "name": "test",
  "server": "127.0.0.1"
}
```

# 修改节点

修改节点属性，使用 PUT 发起请求，请求地址为/api/v1/node/{id}

```
PUT /api/v1/node/{id} HTTP/1.
```

## 请求 URI

| 参数名 | 位置  | 类型   | 必填 | 说明                     |
| ------ | ----- | ------ | ---- | ------------------------ |
| id     | path  | 整数   | 是   | 节点 Id                  |
| apiKey | query | 字符串 | 否   | API 密钥，请参考身份认证 |

## 请求 Body

## 返回

## 示例

### 请求示例

### 返回示例
