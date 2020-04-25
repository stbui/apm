import { SDK_NAME, SDK_VERSION } from './version';

export const defaultConfig = {
    endpoint: 'http://stbui.com',
    apiKey: null,
    user: {},
    appVersion: undefined,
    releaseStage: 'production',
    logLevel: 'warn',
    logger: undefined,
    onError: true,
    onPromise: true,
    onConsole: true,
    appType: undefined,
    maxBreadcrumbs: 25,
    metadata: {},
    plugins: [],

    debug: false,
    autoCollection: false,
    duration: null,
    sdk_name: SDK_NAME,
    sdk_version: SDK_VERSION,
};

export default Config;
