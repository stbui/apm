import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ApmErrorHandler extends ErrorHandler {
    public Client;

    constructor(client?) {
        super();

        this.Client = client;
    }

    public handleError(error: any): void {
        const handledState = {
            severity: 'error',
            severityReason: { type: 'unhandledException' },
            unhandled: true,
        };

        const event = this.Client.Event.create(error, true, handledState, 'angular error handler', 1);

        if (error.ngDebugContext) {
            event.addMetadata('angular', {
                component: error.ngDebugContext.component,
                context: error.ngDebugContext.context,
            });
        }

        this.Client._notify(event);
        ErrorHandler.prototype.handleError.call(this, error);
    }
}

export default class AngularPlugin {
    apply(client) {
        new ApmErrorHandler(client);
    }
}
