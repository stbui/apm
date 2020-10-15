/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { Kernal, Plugin } from '@stbui/apmjs-core';

export class OnErroExcaption implements Plugin {
    static pluginName: string = 'OnErroExcaption';

    constructor(public kernel: Kernal) {}

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
                    type: 'unhandledException',
                };

                this.kernel.hooks.trigger('notify', event);
            }
        };
    }
}
