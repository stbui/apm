/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class Interceptor {
    static pluginName: string = 'Interceptor';

    constructor(public kernel) {}

    apply() {
        let self = this;
        let open = XMLHttpRequest.prototype.open;
        // send = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url) {
            if (url !== self.config.endpoint) {
                const event = {
                    type: 'xhr',
                    url: joinUrl(url),
                    method,
                    status: 200,
                };

                this.kernel.hooks.trigger('notify', event);
            }

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
