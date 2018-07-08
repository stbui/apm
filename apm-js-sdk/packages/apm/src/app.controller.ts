import { Controller } from '@apm/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private service: AppService) {
    console.log('controller', this);
  }

  go() {
    console.log('controller go')
  }
}
