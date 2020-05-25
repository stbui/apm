import { ErrorHandler, Injectable } from '@angular/core';
import { Plugin } from '@apm/js';

@Injectable()
export class AngularErrorHandler extends ErrorHandler {
    public client;

    constructor(client?) {
        super();

        this.client = client;
    }

    public handleError(error: any): void {
        const event = {
            errorClass: error.name,
            errorMessage: error.message,
            type: 'unhandledException',
        };

        this.client.dispatcher.dispatch('notify', event);

        ErrorHandler.prototype.handleError.call(this, error);
    }
}

export class AngularPlugin extends Plugin {
    static pluginName: string = 'AngularPlugin';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        new AngularErrorHandler(this);
    }
}
