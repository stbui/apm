'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const data = await this.model('appinfo').select();
        this.assign('data', data);
        return this.display();
    }

    addAction() {
        if (this.isPost()) {
            var type = this.post();
            console.log(type);

            if (think.isEmpty(type.apiKey)) {
                return false;
            }

            type.createTime = +new Date();

            this.model('appinfo').add(type);
            this.redirect('/admin/app');
        }


        var host = this.http.host;
        var key = think.uuid();

        this.assign('data', {
            key: key,
            embed: '<script src="http://' + host + '/tongji.js" data-apikey="' + key + '"></script>'
        });

        return this.display();
    }
}