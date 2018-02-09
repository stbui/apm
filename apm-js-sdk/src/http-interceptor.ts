import { Config } from "./config";
import { Report } from "./report";

declare var window;

const config = new Config({
  project: "dev",
  logger: "xhr",
  platform: "javascript",
  breadcrumbs: [
    {
      timestamp: 1516017703.995,
      type: "http",
      category: "xhr",
      data: {
        method: "GET",
        url: "http://127.0.0.1:4200/sockjs-node/info?t=1516017703989",
        status_code: 200
      }
    }
  ]
});

export class HttpInterceptorHandler {
  constructor() {}

  handle() {
    let open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send;

    window.XMLHttpRequest.prototype.open = function(
      method,
      url,
      async,
      user,
      password
    ) {
      config.breadcrumbs.push({
        timestamp: 1,
        type: "http",
        category: "xhr",
        data: {
          method,
          url: this.joinUrl(),
          status_code: 200
        }
      });
      // send
      return open.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function(data) {
      // send
      return send.apply(this, arguments);
    };
  }

  joinUrl(url) {
    let regular = /^http|https/g;
    if (regular.test(url)) {
      return url;
    } else {
      return window.location.origin + url;
    }
  }
}
