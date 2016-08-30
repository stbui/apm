'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    const {num} = this.get();

    const data = await this.model('apppef').getPage(num);
    const pageSize = await this.model('apppef').count();

    this.assign('data',data);
    this.assign('page',pageSize);

    return this.display();
  }
}