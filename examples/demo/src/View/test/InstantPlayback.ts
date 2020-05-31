const noop = function () {};

export class Batches {
    private _activities;
    private _size;

    constructor(activities, size) {
        this._activities = activities;
        this._size = size;
    }

    next(a) {
        this._activities.next(c => {
            if (c.done) {
                return a({ done: true });
            }

            var d = c.value;
            this._getNextBatch([d], a);
        });
    }

    _getNextBatch(a, b) {
        var c = this;

        if (a.length === c._size) {
            return b({ done: false, value: a });
        } else {
            c._activities.next(function (d) {
                if (d.done) return b({ done: false, value: a });
                var e = d.value;
                a.push(e);
                c._getNextBatch(a, b);
            });

            return;
        }

        // return a.length === c._size
        //     ? b({ done: false, value: a })
        //     : void c._activities.next(function (d) {
        //           if (d.done) return b({ done: false, value: a });
        //           var e = d.value;
        //           a.push(e);
        //           c._getNextBatch(a, b);
        //       });
    }
}

export class InstantPlayback {
    private _activities;
    private _render;
    private _stopped: boolean;
    private _batches: Batches;
    private _onBuffering: Function;
    private _onRendering: Function;

    private _batchExecutor: NodeJS.Timer;

    constructor(_activities, _render, config) {
        this._activities = _activities;
        this._render = _render;
        this._stopped = true;
        this._batches = new Batches(_activities, config.batchSize);
        this._onBuffering = noop;
        this._onRendering = noop;

        var f = this;
        const buffering = function () {
            f._onBuffering();
        };
        this._activities.onPending(buffering);
    }

    onBuffering(a) {
        this._onBuffering = a;
    }
    onRendering(a) {
        this._onRendering = a;
    }
    stop() {
        this._stopped = true;
        this._activities.onPending(noop);
        clearTimeout(this._batchExecutor);
    }
    replay(callback = noop) {
        this._stopped = false;
        this._replayLoop(callback);
    }
    private _replayLoop(a) {
        var b = this;
        b._batches.next(function (c) {
            if (c.done) return a();
            var d = c.value;
            b._onRendering();
            b._batchExecutor = setTimeout(function () {
                b._stopped || (b._render.render(d, 'instantPlayback'), b._replayLoop(a));
            }, 0);
        });
    }
}
