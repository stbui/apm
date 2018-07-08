/**
 * @license
 * Copyright stbui Inc. All Rights Reserved.
 */

import { Controller } from '../../../packages/common';
import { AppService } from '../app.service';

@Controller()
export class ExceptionInterceptorController {
  constructor(private service: AppService) {}

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
