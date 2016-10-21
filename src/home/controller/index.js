'use strict';

import Base from './base.js';

export default class extends Base {

    indexAction() {
        if (this.isPost()) {
            var type = this.post();
            console.log(type);

            if (think.isEmpty(type.apiKey) || think.isEmpty(type.name)) {
                return this.fail();
            }

            type.createTime = +new Date();

            this.model('appinfo').add(type);
            this.redirect('/admin/app');
        }


        var host = this.http.host;
        var key = think.uuid();

        this.assign('data', {
            key: key,
            embed: '<script src="http://' + host + '/static/js/tongji.js" data-apikey="' + key + '"></script>'
        });

        return this.display();
    }

    dataAction() {
        let data = this.post();

    }
}