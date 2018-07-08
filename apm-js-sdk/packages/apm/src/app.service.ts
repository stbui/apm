import { Injectable } from '@apm/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('service');
  }

  send() {
    console.log('service send')
  }
}
