'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        const {num} = this.get();
        const data = this.model('appajax').getPage(num);
        this.assign({data: data});

        return this.display();
    }
}