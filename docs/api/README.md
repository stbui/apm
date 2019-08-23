# 关键概念

API 相关的关键概念和术语：

- RESTful
- URL
- 请求
- 响应

## RESTful

API 采用 RESTful 作为 API 标准，其具体实现遵循四个基本设计原则：

- 显式地使用 HTTP 方法（GET、PUT、POST 、DELETE）
- 无状态
- 公开目录结构式的 URI
- 传输 JavaScript Object Notation (JSON)

## URL

URL 是访问 API 的最终地址，URL 由域名 + api + 版本 + 路径组成，访问不同的 URL 将获取或修改不同的数据。

例如，通过 URL http://example.com/api/v1/node 可以获取到站点的列表，其中域名为 http://example.com/ ，版本为 v1，路径为/node。

## 请求

可以向 API 发起 GET, POST, PUT, 以及 DELETE 四种不同的请求，每种请求的含义如下：

| 功能 | 类型   |
| ---- | ------ |
| 读取 | GET    |
| 创建 | POST   |
| 更新 | PUT    |
| 删除 | DELETE |

请求就像是动词，而 URL 就像是名词，把两者相关联就形成了对行为的逻辑表达 — 例如， GET 这个记录，DELETE 那条记录。

# 响应

响应是你从 REST API 返回的数据，响应可以返回所需的数据，也可以用来返回错误。
