'use strict';

import Base from './base.js';

export default class extends Base {
    __before() {
        this.navType = 'collection';
    }

    indexAction() {
        const {num} = this.get();
        const data = this.model('appajax').order('id desc').getPage(num);
        this.assign({data: data});
        return this.display();
    }
}