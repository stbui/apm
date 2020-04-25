/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class HttpRequest<T> {
    readonly body: T | null = null;
    readonly headers;
    readonly reportProgress: boolean = false;
    readonly withCredentials: boolean = false;
    readonly reponseType: 'json' | 'text' = 'json';
    readonly method: string;
    readonly params;
    readonly urlWithParams: string;

    constructor(
        method: 'GET',
        url: string,
        third?:
            | T
            | {
                  params?;
                  withCrendentials: boolean;
              },
        init?: {
            headers?;
            reportProgress?: boolean;
            params;
            reponseType: 'json' | 'text';
            withCredentials: boolean;
        }
    ) {
        this.method = method.toUpperCase();
        this.urlWithParams = url;
        this.body = third ? (third as T) : null;
    }

    serializeBody() {
        if (this.body === null) {
            return null;
        }

        return JSON.stringify(this.body);
    }
}
