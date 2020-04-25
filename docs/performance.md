# Performance

区间阶段耗时

DNS 解析耗时

```
timing.domainLookupEnd - timing.domainLookupStart
```

TCP 连接耗时

```
timing.connectEnd - timing.connectStart
```

SSL 安全连接耗时

```
timing.connectEnd - timing.secureConnectionStart
```

Time to First Byte（TTFB），网络请求耗时 TTFB 有多种计算方式，ARMS 以 Google Development 定义为准

```
timing.responseStart - timing.requestStart
```

数据传输耗时

```
timing.responseEnd - timing.responseStart
```

DOM 解析耗时

```
timing.domInteractive - timing.responseEnd
```

资源加载耗时

```
timing.loadEventStart - timing.domContentLoadedEventEnd
```

关键性能指标

首包时间

timing.responseStart - timing.domainLookupStart

First Paint Time, 首次渲染时间 / 白屏时间

timing.responseEnd - timing.fetchStart

Time to Interact，首次可交互时间

timing.domInteractive - timing.fetchStart

HTML 加载完成时间， 即 DOM Ready 时间

timing.domContentLoadedEventEnd - timing.fetchStart

页面完全加载时间

timing.loadEventEnd - timing.fetchStart

