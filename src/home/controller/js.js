'use strict';

import Base from './base.js';
import fs from 'fs';

let data = [];

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        // let method = this.http.method.toLowerCase();
        // if (method === "options") {
        //     this.header("Access-Control-Allow-Origin", "*");
        //     this.header("Access-Control-Allow-Headers", "x-requested-with");
        //     this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        //     this.end();
        // }


        const param = this.get();
        const {apiKey} = param;

        if (param.apiKey == '61e19fe93e5dcd255178a9b94d12c2cf') {
            param.apiKey = 'yqb';
        }

        param.cb = this.datetime(parseInt(param.cb));

        // let filePath = `${think.ROOT_PATH}/data/js.json`;
        // if(param['name'] == 'pef') {
        //     filePath = `${think.ROOT_PATH}/data/js.json`;
        // } else {
        //     filePath = `${think.ROOT_PATH}/data/error.json`;
        // }
        // fs.writeFile(filePath,JSON.stringify(param), {flag:'a'});

        // 存入数据库中
        if (param['name'] == 'pef') {
            this.model('appPef').add(param);
        } else if (param.name == 'ajax') {
            this.model('appAjax').add(param);
        } else {
            this.model('appError').add(param);
        }


        this.json('');
    }

    async viewAction() {
        const param = this.get();
        const {type} = param;


        let  appPerData;
        if(!think.isEmpty(type) && type =='pef') {
            appPerData = await this.model('appPef').select();
        } else if(type =='ajax') {
            appPerData = await this.model('appAjax').select();
        } else {
            appPerData = await this.model('appError').select();
        }



        // this.assign('data',appPerData);
        this.success(appPerData);

        // return this.display();
    }

    datetime(time) {
        const cb = new Date(time);

        let month = cb.getMonth() + 1;
        month = month <= 9 ? '0' + month : month;

        return cb.getFullYear() + '-' + month + '-' + cb.getDate() + ' ' + cb.getHours() + ':' + cb.getMinutes() + ':' + cb.getSeconds();
    }

}