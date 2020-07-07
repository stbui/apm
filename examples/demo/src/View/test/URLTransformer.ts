import lodash from 'lodash';
import { SERVER_URL } from './common/constant';

var h = SERVER_URL + 'resources';

function encodedBaseUrl(baseUrl: string): string {
    return encodeURIComponent(encodeURIComponent(baseUrl));
}
function e(a) {
    return a && SERVER_URL && f(a) && !g(a);
}
function f(b) {
    return !lodash.startsWith(b, 'data:') && !lodash.startsWith(b, 'file:');
}
function g(b) {
    return lodash.startsWith(b, h);
}

export class URLTransformer {
    public encodedBaseUrl: string;
    public sessionId: string;
    public timestamp;

    constructor(baseUrl: string, sessionId: string) {
        this.encodedBaseUrl = encodedBaseUrl(baseUrl);
        this.sessionId = sessionId;
        this.timestamp = 0;
    }

    transform = function (a) {
        if (!e(a)) return a;

        var b = this,
            c = h;

        c += '/' + b.sessionId;
        c += '/' + b.timestamp;
        c += '/' + b.encodedBaseUrl;

        c += '/' + encodedBaseUrl(a);

        return c;
    };
}
