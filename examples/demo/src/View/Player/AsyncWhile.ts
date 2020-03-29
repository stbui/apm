function timeout(time, fn) {
    const that = this;
    if (!(that.config.maxIterations && time >= that.config.maxIterations)) {
        if (!that.condition()) {
            if (typeof fn === 'function') {
                fn();
                return;
            }
        }

        that.body();

        that.queuedLoop = setTimeout(() => {
            timeout.call(that, time + 1, fn);
        }, that.config.waitTime);
    }
}

export class AsyncWhile {
    condition;
    body;
    config;
    queuedLoop;

    constructor(condition, body, config) {
        this.condition = condition;
        this.body = body;
        this.config = config;
    }

    start(fn) {
        timeout.call(this, 0, fn);
    }

    cancel() {
        return clearTimeout(this.queuedLoop);
    }
}
