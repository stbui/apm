import { Injectable } from '../../packages/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('service');
  }

  send() {
    console.log('service send')
  }
}
