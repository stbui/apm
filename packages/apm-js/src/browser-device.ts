import { Plugin } from './plugin';
export class BrowserDevice extends Plugin {
    static pluginName: string = 'BrowserDevice';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        const navigator: Navigator = window.navigator;
        const device = {
            local: navigator.language,
            userAgent: navigator.userAgent,
            time: new Date().toISOString(),
        };

        this.dispatcher.dispatch('session', device);
    }
}
