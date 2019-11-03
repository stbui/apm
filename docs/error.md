# JavaScript 执行错误

由于拼写失误，测试不完善，或者是意外的边界条件，JavaScript 代码在用户浏览器中执行时，有可能会出错。

下面的示例中，alert 被写成了 aler，因此会报 ReferenceError：

```js
aler('hello');
```

JavaScript 执行错误的 type 属性值分为 caught 或者 uncaught 两种，caught 为 notifyError 发送的错误，而 uncaught 为 自动捕获的错误。

# 资源加载错误

对于一个复杂的大型网站，所依赖的静态文件(js, css, jpg...)成千上万，因此出现加载错误，比如 404，也是很常见的一种错误。

下面的示例中，所引入的 test.jpg 并不存在，因此会报 404 错误：

```html
<img src="test.jpg" />
```

# HTTP 请求错误

前端通过大量的 API 与后端进行交互，这些 API 也有可能出错。

通常，后端会通过日志记录所有 HTTP 请求，但是查询起来非常不便，也不及时。捕获所有 HTTP 请求错误，同时记录用户行为，并实时提醒开发者，且不需要修改后端，也不需要搭建复杂的日志系统。

下面的示例中，登陆账户时密码错误，因此会报 403 错误。

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.stbui.com/login');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(
    JSON.stringify({
        email: 'stbui@stbui.com',
        password: '123456',
    })
);
```

# unhandledrejection

unhandledrejection，即未使用 catch 处理的 Promise 错误：

```js
Promise.reject('hello');
```

# WebSockect 连接错误

若 WebSocket 后端出现错误时，WebSockect 连接错误则有可能出错：

```js
var ws = new WebSocket('wss://ap.stbui.com/test');
```
