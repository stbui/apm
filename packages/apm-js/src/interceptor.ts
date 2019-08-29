export class Interceptor {
    // @ts-ignore
    private instance: any;

    constructor(client) {
        this.instance = client;

        this.catch();
    }

    catch() {
        let open = XMLHttpRequest.prototype.open;
        // send = XMLHttpRequest.prototype.send;

        // @ts-ignore
        XMLHttpRequest.prototype.open = (method, url) => {
            console.log({
                type: 'xhr',
                url: joinUrl(url),
                method,
                status: 200,
            });

            // this.instance.notify({
            //     type: 'xhr',
            //     url: joinUrl(url),
            //     method,
            //     status: 200,
            // });

            return open.apply(this, arguments);
        };

        // XMLHttpRequest.prototype.send = function(data) {
        //     return send.apply(this, arguments);
        // };
    }
}

function joinUrl(url) {
    let regular = /^http|https/g;
    if (regular.test(url)) {
        return url;
    } else {
        return window.location.origin + url;
    }
}
