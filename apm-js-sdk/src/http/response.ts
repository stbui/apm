/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
export abstract class HttpResponseBase {
  readonly header;
  readonly status: number;
  readonly statusText: string;
  readonly url: string | null;
  readonly ok: boolean;
  readonly type;
  constructor(
    init: { header?; status?: number; statusText?: string; url?: string },
    defaultStatus: number = 200,
    defaultStatusText: string = "OK"
  ) {
    this.header = init.header;
    this.status = init.status || defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;
    this.ok = this.status >= 200 && this.status <= 300;
  }
}

export class HttpResponse<T> extends HttpResponseBase {
  readonly body: T | null;
  readonly type;

  constructor(
    init: {
      body?: T | null;
      header?;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
  }
}
