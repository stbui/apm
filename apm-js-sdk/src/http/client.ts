/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
import { HttpHander, HttpBackend } from './backend';
import { BrowserXhr, HttpXhrBackend } from './xhr';
import { HttpRequest } from './request';

export class HttpInterceptingHandle implements HttpHander {
  protected backend;

  constructor(parameters) {}

  handle(req) {}
}

export class Http {
  post(url: string, params) {
    const req = {
      method: 'POST',
      urlWithParams:url,
      body: params
    };
    this.request(req);
  }
  get(url: string, params) {
    const req = {
      method: 'GET',
      urlWithParams:url,
      body: params
    };
    this.request(req);
  }
  put(url: string, params) {}
  delete(url: string, params) {}
  request(req) {
    const xhr = new HttpXhrBackend();
    xhr.handle(req);
  }
}
