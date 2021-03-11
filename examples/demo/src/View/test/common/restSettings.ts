import { SERVER_URL } from './constant';

function buildUrl(path: string): string {
    return SERVER_URL + path;
}

function formatUrl(url, b, c) {
    var d = '{' + b + '}';
    return url.replace(d, c);
}

export const restSettings = {
    buildUrl: buildUrl,
    formatUrl: formatUrl,
};
