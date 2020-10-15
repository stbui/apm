/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class Dispatcher {
    private events: object;

    constructor() {
        this.events = {};
    }

    on(event: string, callback: Function) {
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }

        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }

        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: [],
            };
        }

        this.events[event].listeners.push(callback);
    }

    off(event?: string, callback?) {
        if (event === undefined) {
            return (this.events = {});
        }

        if (this.events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }

        this.events[event].listeners = this.events[event].listeners.filter(listener => {
            return listener.toString() !== callback.toString();
        });
    }

    trigger(event: string, details?: any) {
        if (this.events[event] === undefined) {
            console.warn(`This event: ${event} does not exist`);
            return false;
        }

        this.events[event].listeners.forEach(listener => {
            listener(details);
        });
    }
}
