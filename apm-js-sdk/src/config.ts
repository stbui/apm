/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
abstract class Base {
  abstract set(config);
}

export class ConfigException extends Base {
  filename?: string;
  message?: string;
  line?: string;
  col?: string;
  stack?: string;
  constructor(config: ConfigException) {
    super();
    this.set(config);
  }

  set(config) {
    if (config) {
      Object.keys(config).forEach(key => (this[key] = config[key]));
    }
  }
}

export class ConfigHttp extends Base {
  response;

  constructor(config: ConfigHttp) {
    super();
    this.set(config);
  }

  set(config) {
    if (config) {
      Object.keys(config).forEach(key => (this[key] = config[key]));
    }
  }
}

export class Config {
  project?: string | number;
  logger?: string;
  platform?;
  request?;
  culprit?: string;
  extra?;
  breadcrumbs?;
  event_id?: string | number;

  private _exception: ConfigException;
  private _http: ConfigException;

  constructor(type?, config?) {
    if(type && config) {
      this.set(type, config);
    }
  }

  set(type, config) {
    switch (type) {
      case 'exception':
        this.exception(config);
        break;
      case 'http':
        this.http(config);
        break;
      default:
        break;
    }
  }

  get() {
  }

  exception(config: ConfigException) {
    
    this._exception = new ConfigException(config);
  }

  http(config) {
    this._http = new ConfigHttp(config);
  }
  
}

var a = {
  project: '2',
  logger: 'javascript',
  platform: 'javascript',
  request: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
      Referer: 'http://127.0.0.1:4200/script'
    },
    url: 'http://127.0.0.1:4200/script'
  },
  exception: {
    values: [
      {
        type: 'TypeError',
        value: "Cannot read property 'cb' of undefined",
        stacktrace: {
          frames: [
            {
              filename: 'webpack-internal:///../../../core/esm5/core.js',
              lineno: 14924,
              colno: 21,
              function: 'Object.debugUpdateRenderer [as updateRenderer]',
              in_app: true
            }
          ]
        }
      }
    ]
  },
  culprit: 'webpack-internal:///../../../core/esm5/core.js',
  extra: { 'session:duration': 1641 },
  breadcrumbs: {
    values: [
      {
        timestamp: 1516017703.681,
        message:
          'Angular is running in the development mode. Call enableProdMode() to enable the production mode.',
        level: 'log',
        category: 'console'
      },
      {
        timestamp: 1516017703.995,
        type: 'http',
        category: 'xhr',
        data: {
          method: 'GET',
          url: 'http://127.0.0.1:4200/sockjs-node/info?t=1516017703989',
          status_code: 200
        }
      },
      {
        timestamp: 1516017704.415,
        category: 'navigation',
        data: { to: '/script', from: '/script' }
      },
      {
        timestamp: 1516017704.584,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: '6996fd57991c4962bdba8a0ddfc822b2',
        level: 'error'
      },
      {
        timestamp: 1516017704.593,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: 'e8db094100914b70bb2281cf7389e361',
        level: 'error'
      },
      {
        timestamp: 1516017704.6,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: '0df8bdfadfc346a08e20161240366cf9',
        level: 'error'
      },
      {
        timestamp: 1516017704.618,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: '7ee5abf22df546b2a1127a221c85f081',
        level: 'error'
      },
      {
        timestamp: 1516017704.624,
        type: 'http',
        category: 'xhr',
        data: {
          method: 'GET',
          url: '/assets/data/apm/script.json',
          status_code: 200
        }
      },
      {
        timestamp: 1516017704.627,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: '67d41f9ea2a04eba95474b6cb3e1a20a',
        level: 'error'
      },
      {
        timestamp: 1516017704.713,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: '5273705ad0b14a50905d659c64a683fa',
        level: 'error'
      },
      {
        timestamp: 1516017704.729,
        category: 'sentry',
        message: "TypeError: Cannot read property 'cb' of undefined",
        event_id: 'f78f30765f704cd59c53ce401034ef73',
        level: 'error'
      }
    ]
  },
  event_id: '30644f64b9b0414583b6e2dfe3f73a06'
};
