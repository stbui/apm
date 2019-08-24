export const Interceptor = {
    init: apm => {
        let open = XMLHttpRequest.prototype.open,
            send = XMLHttpRequest.prototype.send;

        // @ts-ignore
        XMLHttpRequest.prototype.open = function(method, url) {
            console.log({
                type: 'xhr',
                url: joinUrl(url),
                method,
                status: 200,
            });

            // apm.notify({
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
    },
};

function joinUrl(url) {
    let regular = /^http|https/g;
    if (regular.test(url)) {
        return url;
    } else {
        return window.location.origin + url;
    }
}
