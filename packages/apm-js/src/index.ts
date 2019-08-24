import { Client } from './client';
import { WindowOnError } from './window-on-error';
import { BrowserDevice } from './browser-device';
import { HttpRequest } from './http-request';
import { WindowUnhandledRejection } from './window-unhandled-rejection';
import { WindowPerformance } from './window-performance';
import { Interceptor } from './interceptor';

export default options => {
    const client = new Client();

    client.delivery(HttpRequest);

    client.use(BrowserDevice);
    client.use(WindowOnError);
    client.use(WindowUnhandledRejection);
    client.use(WindowPerformance);
    client.use(Interceptor);
};
