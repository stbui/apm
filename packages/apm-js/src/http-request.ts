export abstract class HttpRequestFactory {
    abstract sendReport(data: object);
}

export class HttpRequest implements HttpRequestFactory {
    public url: string = window.location.origin;
    public apiKey: string = 'stbui';
    public payloadVersion: string = '1';

    constructor(url: string, apiKey: string, payloadVersion: string) {
        this.url = url;
        this.apiKey = apiKey;
        this.payloadVersion = payloadVersion;
    }

    sendReport(data: object) {
        const req = new XMLHttpRequest();
        req.open('POST', this.url);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Apm-Api-Key', this.apiKey);
        req.setRequestHeader('Apm-Payload-Version', '1');
        req.send(JSON.stringify(data));
    }
}
