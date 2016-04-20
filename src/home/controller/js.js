'use strict';

import Base from './base.js';

let data = [];

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {

    let method = this.http.method.toLowerCase();
    if (method === "options") {
      this.header("Access-Control-Allow-Origin", "*");
      this.header("Access-Control-Allow-Headers", "x-requested-with");
      this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
      this.end();
    }

    let param = this.get();

    let {
      apiKey
    } = param;

    let model = this.model('user');

    if (param.apiKey == '61e19fe93e5dcd255178a9b94d12c2cf') {
      param.apiKey = 'yqb';
    }

    param.cb = this.datetime(parseInt(param.cb));
    if (data.length > 100) {
      data = [];
    }

    data.push(param);

    this.json(param);
  }

  viewAction() {
    this.assign('data', data);

    this.json(data);
    return this.display();
  }

  datetime(time) {
    const cb = new Date(time);

    let month = cb.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;

    return cb.getFullYear() + '-' + month + '-' + cb.getDate() + ' ' + cb.getHours() + ':' + cb.getMinutes() + ':' + cb.getSeconds();
  }

}