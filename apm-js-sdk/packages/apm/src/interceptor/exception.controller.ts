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
  }

  listener() {
    this.intercptor();
  }

  intercptor() {
    window.onerror = (message, url, line, col, stack) => {
      this.send({ type: 'error', message, line, col, stack });
    };
  }

  send(config) {
    console.log('exception: ', config);
  }

  notify() {
    console.log('notify: ');
  }
}
