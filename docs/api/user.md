# 用户管理

对用户进行增删改查等操作的 API

| 操作             | 请求   | 地址                           | 说明 |
| ---------------- | ------ | ------------------------------ | ---- |
| 新增用户         | POST   | v1/users                       |      |
| 修改用户         | PUT    | v1/users/{id}                  |      |
| 删除用户         | DELETE | v1/users/{id}                  |      |
| 获取用户         | GET    | v1/users/{id}                  |      |
| 获取用户列表     | GET    | v1/users                       |      |
| 用户登录         | POST   | v1/users/actions/login         |      |
| 退出登录         | POST   | v1/users/actions/logout        |      |
| 修改密码         | POST   | v1/users/actions/resetPassword |      |
| 新增用户操作日志 | POST   | v1/users/actions/{id}/logs     |      |
| 获取用户操作日志 | GET    | v1/users/{id}/logs             |      |
