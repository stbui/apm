/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { Kernal } from '@stbui/apmjs-core';
import { OnErroExcaption } from '@stbui/apmjs-plugin-onerror';
import { mergeConfig } from './util';
import config from './config';

export class Client {
    private kernal = Kernal;

    constructor(options) {
        this.kernal.use([OnErroExcaption]);
    }

    use(p) {
        return this.kernal.use(p);
    }

    // 入口
    static start(options) {
        const o = mergeConfig(options, config);
        return new Client(o);
    }
}
