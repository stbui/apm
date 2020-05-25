import { Client } from './client';
import { HttpRequest } from './http-request';
import { BrowserDevice } from './browser-device';
import { OnErroExcaption } from './onerror.excaption';
import { UnnHanndledRejectionExcaption } from './unhandled-rejection.excaption';
import { WindowPerformance } from './window-performance';
import { Interceptor } from './interceptor';
import { mergeConfig } from './util';
import { defaultConfig } from './config';

export default options => {
    const config = mergeConfig(defaultConfig, options);
    const client = new Client(config);

    client.delivery(HttpRequest);

    client
        .use(BrowserDevice) // 设备
        .use(OnErroExcaption) // js错误
        .use(UnnHanndledRejectionExcaption) // js错误
        .use(WindowPerformance) // 性能分析
        .use(Interceptor); // ajax 拦截器

    return client;
};
