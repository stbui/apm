'use strict';

import Base from './base.js';

export default class extends Base {
    __before() {
        this.navType = 'script';
    }

    indexAction() {
        const {num} = this.get();
        const data = this.model('apperror').order('cb desc').getPage(num);
        this.assign({data: data});
        return this.display();
    }
}