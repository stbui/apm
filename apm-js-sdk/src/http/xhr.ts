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
  constructor(parameters) {}

  handle(req) {
    const xhr = new BrowserXhr().build();
    xhr.open(req.method, req.urlWithParams);

    xhr.setRequestHeader('Content-Type', 'text/json');

    const reqBody = req.serializeBody();

    xhr.send(reqBody);
  }
}
