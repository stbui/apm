/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
import { Config } from './config';
import { Http } from './http/client';
export class Report {
  constructor(options?) {}

  push(options) {
    const http = new Http();
    http.post(options);
  }
}
