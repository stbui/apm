const SERVER_URL = 'https://app.stbui.com/api/';

function buildUrl(path: string): string {
    return SERVER_URL + path;
}

function formatUrl(a, b, c) {
    var d = '{' + b + '}';
    return a.replace(d, c);
}

export const restSettings = {
    buildUrl: buildUrl,
    formatUrl: formatUrl,
};
