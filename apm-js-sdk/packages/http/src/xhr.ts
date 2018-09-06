/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { HttpBackend } from './backend';

export abstract class XhrFactory {
  abstract build();
}

export class BrowserXhr implements XhrFactory {
  build() {
    return new XMLHttpRequest();
  }
}

export class HttpXhrBackend implements HttpBackend {
  handle(req) {
    const xhr = new BrowserXhr().build();
    xhr.open(req.method, req.urlWithParams);

    // xhr.setRequestHeader('Content-type', 'text/json');

    // const reqBody = req.serializeBody();
    const reqBody = JSON.stringify(req.body);
    xhr.send(reqBody);
  }
}
