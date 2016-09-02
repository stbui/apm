前端数据异常采集系统
================

# 介绍
前端开发越来越复杂，一般项目会在多个地方进行发布，比如线上环境、内网环境、本地环境，每个环境都有着特殊性在里面，前端工程师需要在每个环境循环进行自测，受制某些场景无法验证线上环境，很难保证代码和数据的可靠性。为此需要能帮助前端工程师快速定位和排除问题的辅助工具。

![image](https://raw.githubusercontent.com/stbui/apm/master/docs/1.jpg)
![image](https://raw.githubusercontent.com/stbui/apm/master/docs/2.jpg)
![image](https://raw.githubusercontent.com/stbui/apm/master/docs/3.jpg)

# 快速开始

下载本项目到本地
```
git clone https://github.com/stbui/apm
```

进入到项目目录里，执行命名
```
npm install
npm run start
```


# 探测代码
将下面的代码拷贝到你要监听的html文件里

```
<script src="http://127.0.0.1:8360/static/js/tongji.js" data-autoNotify="true" data-apikey="61e19fe93e5dcd255178a9b94d12c2cf"></script>
```
```
data-aipkey：业务类型唯一标示
data-autoNotify：
```

方式二：
```
<script>
function createScript(){
    var script =  document.createElement('script');
    script.type='text/script';
    script.scr='http://127.0.0.1:8360/static/js/tongji.js';
    script.setAttribute('data-apiKey','61e19fe93e5dcd255178a9b94d12c2cf');
    script.setAttribute('data-autoNotify','true');

    document.getElementsByTagName("head")[ 0 ].appendChild(script);
}
createScript();
</script>
```
打开浏览器访问
```
http://127.0.0.1:8360/
```
查看采集到的数据

# 相关技术
- [x] thinkjs
- [x] boostrap
- [x] stbui
- [x] mysql
- [x] pm2



# 扩展
### 性能分析

当前页面加载相关的性能信息
```
// DNS查询耗时
domainLookupEnd - domainLookupStart
// TCP链接耗时
connectEnd - connectStart
// request请求耗时
responseEnd - responseStart
// 解析dom树耗时
domComplete- domInteractive
// 白屏时间
responseStart - navigationStart
// domready时间
domContentLoadedEventEnd - navigationStart
// onload时间
loadEventEnd - navigationStart
//网络时间:
performance.timing.responseEnd - performance.timing.navigationStart
//白屏时间(请求完毕到DOM加载完成):
performance.timing.domInteractive - performance.timing.responseEnd
//load事件的耗时:
performance.timing.loadEventEnd - performance.timing.loadEventStart
//总下载时间:
performance.timing.loadEventEnd - performance.timing.navigationStart
```

### 捕捉脚本异常
```
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
   console.log("错误信息：" , errorMessage);
   console.log("出错文件：" , scriptURI);
   console.log("出错行号：" , lineNumber);
   console.log("出错列号：" , columnNumber);
   console.log("错误详情：" , errorObj);
}
```

### 数据分析

```
document.documentElement.outerHTML  // 获取当前页面html结构
document.documentElement            // 获取当前页面DOM结构
document.referrer                   // 访问来源
document.URL
document.title
windows.screen
document.cookie
document.domain
window.screen.colorDepth
navigator.language
```
```
document.querySelectorAll('script')
document.documentElement.querySelectorAll('*')
document.querySelectorAll('link[rel="stylesheet"]')
document.querySelectorAll('img[src]')
document.querySelectorAll('style')
```

# 参考资料

- http://w3c.github.io/navigation-timing/
- http://www.alloyteam.com/2014/03/front-end-data-monitoring/
- http://fex.baidu.com/blog/2014/08/sensitive-data-sniffer/
- http://fex.baidu.com/blog/2014/05/front_end-data/
- http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=400023974&idx=1&sn=12658409ddc4a56d4381ad9322fbd4a8&scene=1&srcid=1020NgATVsXLudFoN6Lpd9wi&key=b410d3164f5f798e6f765418b59f2c5ca4ad8d92f002223cdaada282f3c9f4f94889ce1e05e580f7dc6223c422a503d4&ascene=0&uin=Mjg1NTY1OTY2MA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.10.4+build(14E46)&version=11020201&pass_ticket=QZ3ZC%2BOgTYgxkormhPhCBIc3hXXCX%2FtWWCcOU7nhBgUnedppYUyiO3Yr%2BZyv%2F3%2BI
- http://www.aliued.cn/2012/10/27/%E6%9E%84%E5%BB%BAweb%E5%89%8D%E7%AB%AF%E5%BC%82%E5%B8%B8%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F-fdsafe.html
- http://blog.codinglabs.org/articles/how-web-analytics-data-collection-system-work.html
- https://segmentfault.com/q/1010000005927442
- http://www.w3cin.com/2016/01/11/javascript%E5%AE%9E%E7%8E%B0%E7%BB%9F%E8%AE%A1%E5%B9%BF%E5%91%8A%E4%BF%A1%E6%81%AF/
