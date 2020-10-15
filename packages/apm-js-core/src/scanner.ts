/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { PluginContainer } from './container';

export class PluginsScanner {
    constructor(private container: PluginContainer) {}

    scan(plugins: any[]) {
        plugins.forEach(plugin => {
            this.container.addPlugin(plugin);
        });
    }
}
