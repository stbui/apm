export class Config {
  project?: string | number;
  logger?: string;
  platform?;
  request?;
  exception?;
  culprit?: string;
  extra?;
  breadcrumbs?;
  event_id?: string | number;

  constructor(config?: Config) {
    if (config) {
      Object.keys(config).forEach(key => (this[key] = config[key]));
    }
  }
}

var a = {
  project: "2",
  logger: "javascript",
  platform: "javascript",
  request: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
      Referer: "http://127.0.0.1:4200/script"
    },
    url: "http://127.0.0.1:4200/script"
  },
  exception: {
    values: [
      {
        type: "TypeError",
        value: "Cannot read property 'cb' of undefined",
        stacktrace: {
          frames: [
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 2040,
              colno: 29,
              function: "timer",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 488,
              colno: 48,
              function: "ZoneTask.invoke",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 499,
              colno: 34,
              function: "ZoneTask.invokeTask",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 192,
              colno: 47,
              function: "Zone.runTask",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 424,
              colno: 36,
              function: "ZoneDelegate.invokeTask",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4944,
              colno: 17,
              function: "Object.onInvokeTask",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4994,
              colno: 5,
              function: "onLeave",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4915,
              colno: 35,
              function: "checkStable",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4516,
              colno: 46,
              function: "EventEmitter.emit",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../rxjs/_esm5/Subject.js",
              lineno: 65,
              colno: 25,
              function: "EventEmitter.Subject.next",
              in_app: true
            },
            {
              filename:
                "webpack-internal:///../../../../rxjs/_esm5/Subscriber.js",
              lineno: 96,
              colno: 18,
              function: "Subscriber.next",
              in_app: true
            },
            {
              filename:
                "webpack-internal:///../../../../rxjs/_esm5/Subscriber.js",
              lineno: 132,
              colno: 26,
              function: "Subscriber._next",
              in_app: true
            },
            {
              filename:
                "webpack-internal:///../../../../rxjs/_esm5/Subscriber.js",
              lineno: 191,
              colno: 22,
              function: "SafeSubscriber.next",
              in_app: true
            },
            {
              filename:
                "webpack-internal:///../../../../rxjs/_esm5/Subscriber.js",
              lineno: 244,
              colno: 16,
              function: "SafeSubscriber.__tryOrUnsub",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4536,
              colno: 52,
              function: "SafeSubscriber.schedulerFn [as _next]",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 5938,
              colno: 81,
              function: "Object.next",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4767,
              colno: 69,
              function: "NgZone.run",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 142,
              colno: 43,
              function: "Zone.run",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 391,
              colno: 32,
              function: "ZoneDelegate.invoke",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 4950,
              colno: 33,
              function: "Object.onInvoke",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../../zone.js/dist/zone.js",
              lineno: 392,
              colno: 26,
              function: "ZoneDelegate.invoke",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 5938,
              colno: 105,
              function: "eval",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 6105,
              colno: 25,
              function: "ApplicationRef.tick",
              in_app: true
            },
            {
              filename: "<anonymous>",
              lineno: null,
              colno: null,
              function: "Array.forEach",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 6105,
              colno: 63,
              function: "eval",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 11798,
              colno: 22,
              function: "ViewRef_.detectChanges",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14824,
              colno: 12,
              function:
                "Object.debugCheckAndUpdateView [as checkAndUpdateView]",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 15287,
              colno: 42,
              function: "callWithDebugContext",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14039,
              colno: 5,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14316,
              colno: 13,
              function: "execComponentViewsAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14384,
              colno: 21,
              function: "callViewAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14034,
              colno: 5,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14342,
              colno: 17,
              function: "execEmbeddedViewsAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14384,
              colno: 21,
              function: "callViewAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14039,
              colno: 5,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14316,
              colno: 13,
              function: "execComponentViewsAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14384,
              colno: 21,
              function: "callViewAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14034,
              colno: 5,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14342,
              colno: 17,
              function: "execEmbeddedViewsAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14384,
              colno: 21,
              function: "callViewAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14039,
              colno: 5,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14316,
              colno: 13,
              function: "execComponentViewsAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14384,
              colno: 21,
              function: "callViewAction",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14038,
              colno: 14,
              function: "checkAndUpdateView",
              in_app: true
            },
            {
              filename: "webpack-internal:///../../../core/esm5/core.js",
              lineno: 14924,
              colno: 21,
              function: "Object.debugUpdateRenderer [as updateRenderer]",
              in_app: true
            }
          ]
        }
      }
    ]
  },
  culprit: "webpack-internal:///../../../core/esm5/core.js",
  extra: { "session:duration": 1641 },
  breadcrumbs: {
    values: [
      {
        timestamp: 1516017703.681,
        message:
          "Angular is running in the development mode. Call enableProdMode() to enable the production mode.",
        level: "log",
        category: "console"
      },
      {
        timestamp: 1516017703.995,
        type: "http",
        category: "xhr",
        data: {
          method: "GET",
          url: "http://127.0.0.1:4200/sockjs-node/info?t=1516017703989",
          status_code: 200
        }
      },
      {
        timestamp: 1516017704.415,
        category: "navigation",
        data: { to: "/script", from: "/script" }
      },
      {
        timestamp: 1516017704.584,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "6996fd57991c4962bdba8a0ddfc822b2",
        level: "error"
      },
      {
        timestamp: 1516017704.593,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "e8db094100914b70bb2281cf7389e361",
        level: "error"
      },
      {
        timestamp: 1516017704.6,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "0df8bdfadfc346a08e20161240366cf9",
        level: "error"
      },
      {
        timestamp: 1516017704.618,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "7ee5abf22df546b2a1127a221c85f081",
        level: "error"
      },
      {
        timestamp: 1516017704.624,
        type: "http",
        category: "xhr",
        data: {
          method: "GET",
          url: "/assets/data/apm/script.json",
          status_code: 200
        }
      },
      {
        timestamp: 1516017704.627,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "67d41f9ea2a04eba95474b6cb3e1a20a",
        level: "error"
      },
      {
        timestamp: 1516017704.713,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "5273705ad0b14a50905d659c64a683fa",
        level: "error"
      },
      {
        timestamp: 1516017704.729,
        category: "sentry",
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: "f78f30765f704cd59c53ce401034ef73",
        level: "error"
      }
    ]
  },
  event_id: "30644f64b9b0414583b6e2dfe3f73a06"
};
