import { Plugin } from './plugin';

/**
 * ajax请求拦截
 */
export class Interceptor extends Plugin {
    static pluginName: string = 'Interceptor';

    constructor(kernel) {
        super(kernel);
    }

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

                self.dispatcher.dispatch('notify', event);
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
