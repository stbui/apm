/**
 * window.performance.timing
 * domainLookupStart -> domainLookupEnd -> connectStart -> connectEnd -> requestStart -> responseStart -> responseEnd -> dom -> load
 */
declare var window;

export class Performance {
  private perf;

  constructor() {
    this.perf = window.performance.timing;
  }

  connect() {
    return this.perf.connectEnd - this.perf.connectStart;
  }
  /**
   * 页面加载耗时
   */
  loadTime() {
    return this.perf.loadEventEnd - this.perf.navigationStart;
  }
  /**
   * 域名解析载耗时
   */
  domainTime() {
    return this.perf.domainLookupEnd - this.perf.domainLookupStart;
  }
  /**
   * TCP连接耗时
   */
  tcpTime() {
    return this.perf.connectEnd - this.perf.connectStart;
  }
  /**
   * 读取页面第一个字节之前耗时
   */
  ttfb() {
    return this.perf.responseStart - this.perf.navigationStart;
  }

  requestTime() {
    return this.perf.responseStart - this.perf.requestStart;
  }

  responseTime() {
    return this.perf.responseEnd - this.perf.responseStart;
  }

  domTime() {
    return this.perf.domInteractive - this.perf.domLoading;
  }

  domContentTime() {
    return this.perf.domContentLoadedEventStart - this.perf.domLoading;
  }

  domCompleteTime() {
    return this.perf.domComplete - this.perf.domLoading;
  }

  // 解析dom树耗时
  domTreeTime() {
    return (this.perf.domComplete = this.perf.domInteractive);
  }

  // 白屏时间
  blackWaitingTime() {
    return this.perf.domLoading - this.perf.navigationStart;
  }

  redirecTime() {
    return this.perf.redirectEnd - this.perf.redirectStart;
  }

  collection() {
    if (window.performance === 'undefined') {
      return false;
    }

    let time = window.performance.timing;

    var payload = {
      url: window.location.href,
      connect: time.connectEnd - time.connectStart,
      pageloadtime: time.loadEventStart - time.navigationStart,
      ttfb: time.responseStart - time.navigationStart,
      request: time.responseStart - time.requestStart,
      response: time.responseEnd - time.responseStart,
      dom: time.domContentLoadedEventStart - time.domLoading,
      domReady: '',
      load: time.loadEventStart - time.domLoading,
      tcp: time.connectEnd - time.connectStart,
      dns: time.domainLookupEnd - time.domainLookupStart,
      black_waiting_time: time.responseStart - time.navigationStart,
      fist_page_time: time.responseStart - time.navigationStart,
      operation_time: 0,
      total_time: time.loadEventEnd - time.navigationStart,
      last_unload: time.unloadEventEnd - time.unloadEventStart,
      redirect: time.redirectEnd - time.redirectStart
    };

    console.log(payload);

    return payload;
  }

  test() {
    if (window.performance === 'undefined') {
      return false;
    }

    let time = window.performance.timing;

    var payload = {
      url: window.location.href,
      connect: time.connectEnd - time.connectStart,
      pageloadtime: time.loadEventStart - time.navigationStart,
      ttfb: time.responseStart - time.navigationStart,
      request: time.responseStart - time.requestStart,
      response: time.responseEnd - time.responseStart,
      dom: time.domContentLoadedEventStart - time.domLoading,
      domReady: '',
      load: time.loadEventStart - time.domLoading,
      tcp: time.connectEnd - time.connectStart,
      dns: time.domainLookupEnd - time.domainLookupStart,
      black_waiting_time: time.responseStart - time.navigationStart,
      fist_page_time: time.responseStart - time.navigationStart,
      operation_time: 0,
      total_time: time.loadEventEnd - time.navigationStart,
      last_unload: time.unloadEventEnd - time.unloadEventStart,
      redirect: time.redirectEnd - time.redirectStart
    };

    console.log(payload);
  }
}
