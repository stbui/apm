/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class BrowserDevice {
    static pluginName: string = 'BrowserDevice';

    constructor(public kernel) {}

    onInit() {
        console.log('onInit');
    }

    onDestory() {
        console.log('onDestory');
    }

    apply() {
        const navigator: Navigator = window.navigator;
        const event = {
            local: navigator.language,
            userAgent: navigator.userAgent,
            time: new Date().toISOString(),
        };

        this.kernel.hooks.trigger('session', event);
    }
}
