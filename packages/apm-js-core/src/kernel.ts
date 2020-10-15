/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { Dispatcher } from './dispatcher';

import { PluginContainer } from './container';
import { PluginsScanner } from './scanner';
import { Injector } from './injector';

export class Kernal {
    private static container = new PluginContainer();
    private static pluginsScanner = new PluginsScanner(Kernal.container);
    private static injector = new Injector(Kernal.container);

    public readonly hooks: Dispatcher = new Dispatcher();
    public options: any;

    public static use(plugins) {
        this.pluginsScanner.scan(plugins);
        this.injector.createInstances();
        return this;
    }

    public static create(plugins) {
        this.initialize(plugins);
        return this.use(plugins);
    }

    private static initialize(plugins) {}

    constructor(options) {
        this.options = options;
    }
}
