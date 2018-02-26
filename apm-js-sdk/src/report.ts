/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */
import { Http } from './http/client';
export class Report {
  constructor(options?) {}

  push(options) {
    const url = 'http://stbui.com/';
    const http = new Http();
    http.post(url,options);
  }
}
