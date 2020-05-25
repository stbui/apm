import { Plugin } from '@apm/js';

export class VuejsPlugin extends Plugin {
    static pluginName: string = 'VuejsPlugin';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        // @ts-ignore
        if (!window.Vue) {
            throw new Error('Error');
        }

        // @ts-ignore
        window.Vue.config.errorHandler = (error, vm, info) => {
            const event = {
                errorClass: error ? error.name : '',
                errorMessage: error ? error.message : '',
                severity: 'error',
                unhandled: true,
                type: 'unhandledException',
            };

            this.dispatcher.dispatch('notify', event);
        };
    }
}
