export class HttpRequest {
    public url: string = window.location.origin;
    public apiKey: string = 'stbui';
    public payloadVersion: string = '1';

    constructor(client?: any) {}

    sendReport(report) {
        const req = new XMLHttpRequest();
        req.open('POST', this.url);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Apm-Api-Key', 'stbui');
        req.setRequestHeader('Apm-Payload-Version', '1');
        req.send(JSON.stringify(report));
    }
}
