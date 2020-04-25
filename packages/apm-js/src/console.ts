const noop = () => {};

export class Console {
    enabled: boolean = false;

    constructor(enabled) {
        this.enabled = window.console && enabled;

        if (this.enabled) {
            this.log('Debugging enabled');
        }
    }

    get log() {
        return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
    }

    get warn() {
        return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
    }

    get error() {
        return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
    }
}
