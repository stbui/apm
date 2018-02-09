import { Report } from "./report";

declare var window;


export function Performance() {
  if (window.performance === "undefined") {
    return false;
  }

  let time = window.performance.timing;

  var payload = {
    apiKey: 1,
    name: "pef",
    type: "pef",
    url: window.location.href,
    connect: time.connectEnd - time.connectStart,
    pageloadtime: time.loadEventStart - time.navigationStart,
    ttfb: time.responseStart - time.navigationStart,
    request: time.responseStart - time.requestStart,
    response: time.responseEnd - time.responseStart,
    dom: time.domContentLoadedEventStart - time.domLoading,
    domReady: "",
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


  Report(payload);
}
