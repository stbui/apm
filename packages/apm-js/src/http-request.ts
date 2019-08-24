export const HttpRequest = apm => ({
    sendReport: (report, cb) => {
        const req = new XMLHttpRequest();
        req.open('POST', 'http://127.0.0.1');
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Apm-Api-Key', 'stbui');
        req.setRequestHeader('Apm-Payload-Version', '1');
        req.send(JSON.stringify(report));
    },
});
