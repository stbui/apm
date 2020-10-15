export class VuejsPlugin {
    static pluginName: string = 'VuejsPlugin';

    constructor(public kernel) {}

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

            this.kernel.hooks.trigger('notify', event);
        };
    }
}
