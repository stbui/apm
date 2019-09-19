import { Client } from './client';
import { HttpRequest } from './http-request';
import { BrowserDevice } from './browser-device';
import { OnErroExcaption } from './onerror.excaption';
import { UnnHanndledRejectionExcaption } from './unhandled-rejection.excaption';
import { WindowPerformance } from './window-performance';
import { Interceptor } from './interceptor';

export default options => {
    const client = new Client(options);

    client.delivery(HttpRequest);

    client.register(BrowserDevice);
    client.register(OnErroExcaption);
    client.register(UnnHanndledRejectionExcaption);
    client.register(WindowPerformance);
    client.register(Interceptor);

    return client;
};
