export const WindowOnError = {
    init: apm => {
        function onerror(messageOrEvent, url, lineNo, charNo, error) {
            if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
                console.log('cross-domain');
            } else {
                const handledState = {
                    severity: 'error',
                    unhandled: true,
                    severityReason: { type: 'unhandledException' },
                };

                let report;

                if (error) {
                    if (error.name && error.message) {
                        report = new apm.report(
                            error.name,
                            error.message,
                            [
                                {
                                    file: 'http://192.168.0.109:8080/',
                                    method: 'running',
                                    lineNumber: 28,
                                    columnNumber: 17,
                                },
                            ],
                            handledState,
                            error
                        );
                    } else {
                        report = new apm.report(
                            'window.onerror',
                            String(error),
                            [],
                            handledState,
                            error
                        );

                        report.updateMetaData('window onerror', { error });
                    }
                } else if (
                    typeof messageOrEvent === 'object' &&
                    messageOrEvent !== null &&
                    (!url || typeof url !== 'string') &&
                    !lineNo &&
                    !charNo &&
                    !error
                ) {
                    const name = messageOrEvent.type
                        ? `Event: ${messageOrEvent.type}`
                        : 'window.onerror';
                    const message =
                        messageOrEvent.message || messageOrEvent.detail || '';
                    report = new apm.report(
                        name,
                        message,
                        [],
                        handledState,
                        messageOrEvent
                    );

                    report.updateMetaData('window onerror', {
                        event: messageOrEvent,
                        extraParameters: url,
                    });
                } else {
                    report = new apm.report(
                        'window.onerror',
                        String(messageOrEvent),
                        [],
                        handledState,
                        messageOrEvent
                    );
                }

                apm.notify(report);
            }

            if (typeof prevOnError === 'function')
                prevOnError.apply(this, arguments);
        }

        const prevOnError = window.onerror;
        window.onerror = onerror;
    },
};
