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
