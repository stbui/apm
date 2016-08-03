# 前端数据采集


# 插入代码到页面
```
<script>
function createScript(){
    var script =  document.createElement('script');
    script.type='text/script';
    script.scr='http://172.16.96.188:8360/static/js/tongji.js';
    script.setAttribute('data-apiKey','61e19fe93e5dcd255178a9b94d12c2cf');
    script.setAttribute('data-autoNotify','true');

    document.getElementsByTagName("head")[ 0 ].appendChild(script);
}
createScript();
</script>
```

# 性能分析

当前页面加载相关的性能信息
PerformanceTiming

DNS查询耗时 ：domainLookupEnd - domainLookupStart
TCP链接耗时 ：connectEnd - connectStart
request请求耗时 ：responseEnd - responseStart
解析dom树耗时 ： domComplete- domInteractive
白屏时间 ：responseStart - navigationStart
domready时间 ：domContentLoadedEventEnd - navigationStart
onload时间 ：loadEventEnd - navigationStart

//网络时间:
performance.timing.responseEnd - performance.timing.navigationStart

//白屏时间(请求完毕到DOM加载完成):
performance.timing.domInteractive - performance.timing.responseEnd

//load事件的耗时:
performance.timing.loadEventEnd - performance.timing.loadEventStart

//总下载时间:
performance.timing.loadEventEnd - performance.timing.navigationStart


# 捕捉脚本报错
```
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
   console.log("错误信息：" , errorMessage);
   console.log("出错文件：" , scriptURI);
   console.log("出错行号：" , lineNumber);
   console.log("出错列号：" , columnNumber);
   console.log("错误详情：" , errorObj);
}
```

# 拦截分析

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

- https://github.com/bugsnag/bugsnag-js

https://segmentfault.com/q/1010000005927442

http://blog.codinglabs.org/articles/how-web-analytics-data-collection-system-work.html

http://www.alloyteam.com/2014/03/front-end-data-monitoring/

http://w3c.github.io/navigation-timing/

http://fex.baidu.com/blog/2014/08/sensitive-data-sniffer/

https://github.com/acs1899/xssPro/blob/master/js/xss-protect.js

https://github.com/WPOTools/perfBar/blob/master/build/perfbar.js
https://github.com/121Room/Performance-Monitoring
https://github.com/saijs/sai.js
https://github.com/121Room/Performance-Monitoring
http://fex.baidu.com/blog/2014/05/front_end-data/
https://github.com/fex-team/alogs
https://github.com/saijs/sai.js/blob/master/doc/index.md
https://github.com/huanleguang/hlg-front/tree/master/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E7%9B%91%E6%8E%A7
http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=400023974&idx=1&sn=12658409ddc4a56d4381ad9322fbd4a8&scene=1&srcid=1020NgATVsXLudFoN6Lpd9wi&key=b410d3164f5f798e6f765418b59f2c5ca4ad8d92f002223cdaada282f3c9f4f94889ce1e05e580f7dc6223c422a503d4&ascene=0&uin=Mjg1NTY1OTY2MA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.10.4+build(14E46)&version=11020201&pass_ticket=QZ3ZC%2BOgTYgxkormhPhCBIc3hXXCX%2FtWWCcOU7nhBgUnedppYUyiO3Yr%2BZyv%2F3%2BI
http://www.aliued.cn/2012/10/27/%E6%9E%84%E5%BB%BAweb%E5%89%8D%E7%AB%AF%E5%BC%82%E5%B8%B8%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F-fdsafe.html
https://github.com/liangsenzhi/awesome-wpo-chinese

https://github.com/tjuking/performance-timing


https://github.com/BetterJS/badjs-report/blob/master/src/bj-report.js
http://blog.codinglabs.org/articles/how-web-analytics-data-collection-system-work.html
http://w3c.github.io/navigation-timing/
https://github.com/search?p=5&q=frontend+Monitor&ref=searchresults&type=Repositories&utf8=%E2%9C%93
https://github.com/fex-team/alogs
https://dwqs.gitbooks.io/frontenddevhandbook/content/tools/monitor.html
https://github.com/getsentry/raven-js/blob/master/dist/raven.js
https://github.com/tjuking/performance-timing/blob/master/performance-timing.js