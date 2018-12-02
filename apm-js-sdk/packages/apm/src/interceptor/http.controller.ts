/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */

import { Controller } from '@apm/common';
import { AppService } from '../app.service';

declare var window;

@Controller()
export class HttpInterceptorController {
  constructor(private service: AppService) {
    console.log('initialization controller:%c HttpInterceptorController', 'color:green', this.service);
  }

  listener() {
    this.handle();
  }

  handle() {
    let open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send;
    let self = this;

    window.XMLHttpRequest.prototype.open = function(
      method,
      url,
      async,
      user,
      password
    ) {
      self.send({
        type: 'xhr',
        url: self.joinUrl(url),
        method,
        status: 200
      });
      // send
      return open.apply(this, arguments);
    };

    window.XMLHttpRequest.prototype.send = function(data) {
      // send
      return send.apply(this, arguments);
    };
  }

  send(config) {
    console.log('xhr: ', config);
  }

  joinUrl(url) {
    let regular = /^http|https/g;
    if (regular.test(url)) {
      return url;
    } else {
      return window.location.origin + url;
    }
  }
}
