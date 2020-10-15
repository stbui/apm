/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { HttpRequest } from './http-request';
import { Dispatcher } from './Dispatcher';

export class Config {
    apiKey: string;
    sdk_name: string;
    sdk_version;

    endpoint: string;
    payloadVersion: string;

    get() {
        return this;
    }
    set(key, value) {
        this[key] = value;
    }
}

export class Notifier {
    private config: Config;
    private httpRequest: HttpRequest;

    public readonly dispatcher: Dispatcher = new Dispatcher();

    constructor() {
        this.config = new Config();
        this.httpRequest = new HttpRequest(this.getFromConfigOfHttp());
    }

    public push(events) {
        return this.httpRequest.send({
            apiKey: this.config.apiKey,
            events: events,
            notifier: {
                name: this.config.sdk_name,
                version: this.config.sdk_version,
                url: 'https://github.com/stbui/apm',
            },
        });
    }

    private getFromConfigOfHttp() {
        return {
            endpoint: this.config.endpoint,
            apiKey: this.config.apiKey,
            payloadVersion: this.config.payloadVersion,
        };
    }

    addConfig(key, value) {
        this.config.set(key, value);
    }
}
