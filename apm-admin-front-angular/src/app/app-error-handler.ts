
import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven
    .config('http://2a4c17b3f26048fc8405775f5cb388c5@127.0.0.1:9000/2')
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        Raven.captureException(err);
    }
}