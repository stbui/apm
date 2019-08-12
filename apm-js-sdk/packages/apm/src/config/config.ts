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

  _exception: ConfigException;
  _http: ConfigException;

  constructor(type?, config?) {
    if (type && config) {
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

  get() {}

  exception(config: ConfigException) {
    this._exception = new ConfigException(config);
  }

  http(config) {
    this._http = new ConfigHttp(config);
  }
}

export class configUrl {
  DATA = 'http://127.0.0.1:3000/api/session/{id}/data?server_session_id={ssid}';
  GET_IDENTITY_ROOT_DOMAIN =
    'http://127.0.0.1:3000/api/identity/domain?host={host}';
  PING = 'http://127.0.0.1:3000/api/session/{id}/ping?server_session_id={ssid}';
  SESSION = 'http://127.0.0.1:3000/api/session';
  SESSION_ACTIVE = 'http://127.0.0.1:3000/api/session/{id}/active';
  SESSION_INITIAL_DATA = 'http://127.0.0.1:3000/api/session/{id}';
  SETTINGS = 'http://127.0.0.1:3000/api/settings?url={url}';
  SET_SESSION_IDENTITY = 'http://127.0.0.1:3000/api/session/{id}/identity';
  UPDATE_SERVER_SESSION =
    'http://127.0.0.1:3000/api/session/{id}/server_session/';

  SHOULD_RESOLVE_SOURCE_MAPS = true;
  VERSION = 61;
  WEBSOCKET_URLS =
    'wss://127.0.0.1:3000/api/session/{id}/data?server_session_id={ssid}';

  buildHttpUrl(path) {
    return this.serverUrl() + '/' + path;
  }

  formatUrl(a, b) {}

  getServerUrl() {}

  serverUrl() {
    return '127.0.0.1:3000/api';
  }
}
