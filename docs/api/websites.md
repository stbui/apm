# websites

| 操作 | 请求   | 地址                                     | 说明 |
| ---- | ------ | ---------------------------------------- | ---- |
| 列表 | GET    | api/websites                             |      |
| 新增 | POST   | api/websites                             |      |
| 修改 | PUT    | api/websites/{id}                        |      |
| 删除 | DELETE | api/websites/{id}                        |      |
| 获取 | GET    | api/websites/{id}                        |      |
|      | GET    | api/websites/{id}/name                   |      |
|      | GET    | api/websites/{id}/code                   |      |
|      | GET    | api/websites/{id}/settings/notifications |      |
|      | GET    | api/websites/{id}/settings/co_browsing   |      |
|      | GET    | api/websites/{id}/settings/recording     |      |
|      | GET    | api/websites/{id}/collaborators          |      |
|      | GET    | api/websites/{id}/online_users           |      |
|      | GET    | api/websites/{id}/sessions               |      |
|      | GET    | api/websites/{id}/logs/aggregated        |      |
|      | GET    | api/websites/{id}/logs/newest            |      |

### list

```bash
POST /api/websites HTTP/1.1
Content-Type: application/json
Authorization: Basic 7cd22002-27a7-4c5d-ba4d-a1c108a20eaf
```

```json
[
    { "sessionsCount": 0, "isOwner": true, "name": "stbui-0", "id": 0, "inactiveFor": 31844.36382 },
    { "sessionsCount": 1, "isOwner": true, "name": "stbui-1", "id": 1, "inactiveFor": 31844.36382 }
]
```

### list

```bash
POST /api/websites/1 HTTP/1.1
Content-Type: application/json
Authorization: Basic 7cd22002-27a7-4c5d-ba4d-a1c108a20eaf
```

```json
{
    "autoLogConsoleLog": true,
    "autoLogConsoleDebug": true,
    "autoLogErrors": true,
    "storeStaticResources": true,
    "name": "stbui-1",
    "sensitiveElements": [],
    "id": 1,
    "sensitiveInputFields": false,
    "origin": null,
    "autoLogConsoleInfo": true,
    "maxLogMessageLength": 1000,
    "autoLogConsoleWarn": true,
    "recordIp": true,
    "autoLogConsoleError": true,
    "ownerEmail": "stbui@stbui.com",
    "recordLocation": true,
    "autoLogNetworkRequests": "all"
}
```
