'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const apperror =await this.viewapperror();
        const apppajax =await this.viewajax();
        const appinfo =await this.viewappinfo();

        let json=[];

        for(var i=0;i<appinfo;i++) {
            json.push({error:apperror,ajax:apppajax});
        }

        this.assign('data',json)

        // this.json(apperror)
        return this.display();
    }

    viewapperror() {
        const data = this.model('apperror').count();

        return data;
    }

    viewajax() {
        const data = this.model('appajax').count();

        return data;
    }

    viewappinfo() {
        const data = this.model('appinfo').count();

        return data;
    }
}