# 用户管理

| 操作             | 请求   | 地址                            | 说明 |
| ---------------- | ------ | ------------------------------- | ---- |
| 列表             | GET    | api/users                       |      |
| 新增             | POST   | api/users                       |      |
| 修改             | PUT    | api/users/{id}                  |      |
| 删除             | DELETE | api/users/{id}                  |      |
| 获取             | GET    | api/users/{id}                  |      |
| 用户登录         | POST   | api/users/actions/login         |      |
| 退出登录         | POST   | api/users/actions/logout        |      |
| 修改密码         | POST   | api/users/actions/resetPassword |      |
| 新增用户操作日志 | POST   | api/users/actions/{id}/logs     |      |
| 获取用户操作日志 | GET    | api/users/{id}/logs             |      |
