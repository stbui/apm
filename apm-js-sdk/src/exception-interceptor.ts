import { Report } from './report';

export class ExceptionInterceptorHandler {
  constructor() {}

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
    const report = new Report();
    report.push(config);
  }

  notify() {
    console.log('notify: ');
  }
}
