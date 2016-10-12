'use strict';

import Base from './base.js';

export default class extends Base {
    __before() {
        this.navType = 'perf';
    }

    indexAction() {
        const {num} = this.get();
        const data = this.model('apppef').getPage(num);
        this.assign({data: data});
        return this.display();
    }
}