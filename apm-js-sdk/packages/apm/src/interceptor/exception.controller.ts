/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */

import { Controller } from '@apm/common';
import { AppService } from '../app.service';

@Controller()
export class ExceptionInterceptorController {
  constructor(private service: AppService) {
    console.log('initialization controller:%c ExceptionInterceptorController', 'color:green', this.service);

    this.listener()
  }

  listener() {
    this.intercptor();
  }

  intercptor() {
    window.onerror = (message, url, line, col, stack) => {
      this.send({ type: 'error', message, line, col, stack });
    };

    window.addEventListener("error", (error) => {
      console.log(error)
    }, true);

    window.onunhandledrejection = (e) => {
      console.log(e)
      this.send({ type: 'error', message: e.reason, });
    }
  }

  send(data) {
    console.log('exception: ', data);
    const config = {
      version: '1.0.0',
      type: 'error',
      url: window.location.href,
      message: data,
      token: '1234'
    }

    this.service.report(config)
  }

  notify() {
    console.log('notify: ');
  }
}
