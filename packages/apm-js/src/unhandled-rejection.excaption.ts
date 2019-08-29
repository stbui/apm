export class UnnHanndledRejectionExcaption {
    private instance: any;

    constructor(client) {
        this.instance = client;

        this.catch();
    }

    catch() {
        window.addEventListener('unhandledrejection', event => {
            let error = event.reason;

            const handledState = {
                severity: 'error',
                unhandled: true,
                severityReason: { type: 'unhandledPromiseRejection' },
            };

            let report;
            if (error) {
                report = this.instance.report.create(
                    error.name,
                    error.message,
                    [],
                    handledState,
                    error
                );
            } else {
                const msg =
                    'Rejection reason was not an Error. See "Promise" tab for more detail.';
                report = this.instance.report.create(
                    error && error.name ? error.name : 'UnhandledRejection',
                    error && error.message ? error.message : msg,
                    [],
                    handledState,
                    error
                );

                // report.updateMetaData('promise', 'rejection reason', )
            }

            this.instance.notify(report);
        });
    }
}
