export class OnErroExcaption {
    private instance: any;

    constructor(client) {
        this.instance = client;

        this.catch();
    }

    catch() {
        window.onerror = (
            messageOrEvent: any,
            url: string,
            lineNo,
            charNo,
            error
        ) => {
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
                        report = this.instance.report.create(
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
                        report = this.instance.report.create(
                            error.name,
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

                    report = this.instance.report.create(
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
                    report = this.instance.report.create(
                        'window.onerror',
                        String(messageOrEvent),
                        [],
                        handledState,
                        messageOrEvent
                    );
                }

                this.instance.notify(report);
            }
        };
    }
}
