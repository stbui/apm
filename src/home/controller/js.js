'use strict';

import Base from './base.js';
import fs from 'fs';

export default class extends Base {

    indexAction() {
        let method = this.http.method.toLowerCase();
        if (method === "options") {
            this.header("Access-Control-Allow-Origin", "*");
            this.header("Access-Control-Allow-Headers", "x-requested-with");
            this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
            this.end();
        }

        const param = this.get();

        // 存入数据库中
        switch (param['name']) {
            case 'pef':
                this.model('apppef').add(param);
                break;
            case 'ajax':
                this.model('appajax').add(param);
                break;
            case 'error':
                this.model('appajax').add(param);
                break;
            default:
                this.model('apperror').add(param);
                break;
        }

        // 在使用new Image()打点请求的时候，如果请求的地址是一张不存在的图片资源的话，会导致浏览器反复请求这张图片，从而出现多次请求的情况。
        this.type('image/jpeg');
        this.write(new Buffer('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQAAAAA3bvkkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAQSURBVHjaYvgPAAAA//8DAAEBAQDMYzPLAAAAAElFTkSuQmCC','base64'));
        this.end();
    }
}