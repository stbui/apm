import { Plugin } from './plugin';

export class OnErroExcaption extends Plugin {
    pluginName: string = 'OnErroExcaption';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        window.onerror = (messageOrEvent: any, url: string, lineNo, charNo, error) => {
            if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
                console.log('cross-domain');
            } else {
                const event = {
                    stacktrace: {
                        file: url,
                        method: 'running',
                        lineNumber: lineNo,
                        columnNumber: charNo,
                    },
                    errorClass: error ? error.name : '',
                    errorMessage: error ? error.message : '',
                    severity: 'error',
                    unhandled: true,
                    severityReason: { type: 'unhandledException' },
                };

                this.dispatcher.dispatch('notify', event);
            }
        };
    }
}
