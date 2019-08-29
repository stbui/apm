export class Vuejs {
    private instance: any;

    constructor(client) {
        this.instance = client;

        this.catch();
    }

    catch() {
        // @ts-ignore
        if (!window.Vue) {
            throw new Error('Error');
        }

        // @ts-ignore
        window.Vue.config.errorHandler = (error, vm, info) => {
            const handledState = {
                severity: 'error',
                unhandled: true,
                severityReason: { type: 'unhandledException' },
            };

            const report = this.instance.report.create(
                error.name,
                error.message,
                [],
                handledState,
                error
            );

            this.instance.notify(report);
        };
    }
}
