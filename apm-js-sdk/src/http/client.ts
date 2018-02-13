/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
import { HttpHander, HttpBackend } from './backend';
import { BrowserXhr } from './xhr';
import { HttpRequest } from './request';

export class HttpInterceptingHandle implements HttpHander {
  protected backend;

  constructor(parameters) {}

  handle(req) {}
}

export class Http {
  post(params) {}
  get(params) {}
  put(params) {}
  delete(params) {}
  request(params) {}
}
