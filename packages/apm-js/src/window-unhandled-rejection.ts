export const WindowUnhandledRejection = {
    init: apm => {
        window.addEventListener('unhandledrejection', event => {
            let error = event.reason;

            const handledState = {
                severity: 'error',
                unhandled: true,
                severityReason: { type: 'unhandledPromiseRejection' },
            };

            let report;
            report = new apm.report(
                error.name,
                error.message,
                [],
                handledState,
                error
            );

            apm.notify(report);
        });
    },
};
