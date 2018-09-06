/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export abstract class HttpHander {
  abstract handle(req);
}

export abstract class HttpBackend implements HttpHander {
  abstract handle(req);
}
