export abstract class HttpHander {
  abstract handle(req);
}

export abstract class HttpBackend implements HttpHander {
  abstract handle(req);
}
