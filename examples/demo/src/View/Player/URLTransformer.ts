const SERVER_URL = '';
const resources_url = SERVER_URL + 'resources';

function getQueryString(name) {}

function wasUrl(baseUrl) {
    return baseUrl && SERVER_URL && isLocalUrl(baseUrl) && !isServerUrl(baseUrl);
}

function isLocalUrl(baseUrl) {
    return !baseUrl.startsWith('data:') && !baseUrl.startsWith('file:');
}

function isServerUrl(baseUrl) {
    return baseUrl.startsWith(resources_url);
}

export class URLTransformer {
    constructor(baseUrl, sessionId) {
        this.encodedBaseUrl = encodeURIComponent(baseUrl);
        this.sessionId = sessionId;
    }

    transform(baseUrl) {
        if (!wasUrl(baseUrl)) {
            return baseUrl;
        }

        const url = resources_url;

        const queryObject = {
            url: encodeURIComponent(baseUrl),
            base: this.encodedBaseUrl,
            session_id: this.sessionId,
        };

        url += getQueryString(queryObject);

        return url;
    }
}
