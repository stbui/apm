import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AngularErrorHandler extends ErrorHandler {
    public kernel;

    constructor(kernel?) {
        super();

        this.kernel = kernel;
    }

    public handleError(error: any): void {
        const event = {
            errorClass: error.name,
            errorMessage: error.message,
            type: 'unhandledException',
        };

        this.kernel.hooks.trigger('notify', event);

        ErrorHandler.prototype.handleError.call(this, error);
    }
}

export class AngularPlugin {
    static pluginName: string = 'AngularPlugin';

    constructor(public kernel) {}

    apply() {
        new AngularErrorHandler(this);
    }
}
