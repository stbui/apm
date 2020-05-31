import { Timer } from './Timer';

const noop = function () {};

class Frames {
    private _millisecondsPerFrame;
    private _maxLag;
    private _activities;

    constructor(_activities, _millisecondsPerFrame, _maxLag) {
        this._millisecondsPerFrame = _millisecondsPerFrame;
        this._maxLag = _maxLag;
        this._activities = _activities;
    }

    next(a) {
        var b = this;
        b._activities.next(function (c) {
            if (c.done) return { done: true };
            var d = c.value,
                e = d.time + b._getNextFrameLength(d);
            return d === b._getLastLoadedActivity() ? a({ done: false, value: [d] }) : void b._getNextFrame(e, [d], a);
        });
    }
    _getLastLoadedActivity() {
        return this._activities.peekLast();
    }
    _getNextFrameLength(a) {
        var b = this._activities.peekLast(),
            c = b.time - a.time;
        return c > this._maxLag ? 500 : this._millisecondsPerFrame * Math.ceil(c / 100);
    }
    _getNextFrame(a, b, c) {
        var d = this;
        d._activities.peek(function (e) {
            if (e.done) return c({ done: false, value: b });
            var f = e.value;
            return f.time > a
                ? c({ done: false, value: b })
                : (b.push(f),
                  void d._activities.next(function (e) {
                      d._getNextFrame(a, b, c);
                  }));
        });
    }
}

export class LivePlayback {
    private _maxLag: number;
    private _activities;
    private _frames: Frames;
    private _render;
    private _stopped: boolean;
    private _delay: number;
    private _speed: number;
    private _timer: Timer;
    private _onBuffering: Function;
    private _onRendering: Function;
    private _onTimeChanged: Function;

    private _frameExecutor: NodeJS.Timer;

    constructor(time, _activities, _render, config) {
        this._maxLag = config.maxLag;
        this._activities = _activities;
        this._frames = new Frames(_activities, config.millisecondsPerFrame, this._maxLag);
        this._render = _render;
        this._stopped = true;
        this._delay = 0;
        this._speed = 4;
        this._timer = new Timer(time, config.millisecondsPerFrame);
        this._timer.changeSpeed(4);
        this._onBuffering = noop;
        this._onRendering = noop;
        this._onTimeChanged = noop;

        var h = this;
        var timeChanged = function (a) {
            h._onTimeChanged(a);
        };
        this._timer.onTimeChanged(timeChanged);
    }

    stop() {
        this._stopped = true;
        this._timer.stopTicking();
        this._timer.onTimeChanged(noop);
        clearTimeout(this._frameExecutor);
    }
    onBuffering(a) {
        this._onBuffering = a;
    }
    onRendering(a) {
        this._onRendering = a;
    }
    onTimeChanged(a) {
        this._onTimeChanged = a;
    }
    replay(callback = noop) {
        this._stopped = false;
        this._onBuffering();
        this._replayLoop(callback);
    }
    _replayLoop(a) {
        var b = this;
        b._frames.next(function (c) {
            if (c.done) return a();
            var d,
                e = c.value,
                f = e[0],
                g = e[e.length - 1],
                h = b._activities.peekLast().time - b._timer.time;
            f.isFirstLiveActivity || h > b._maxLag
                ? (d = 0)
                : ((d = (f.time - b._timer.time) / b._speed), (d = Math.max(0, d - b._delay)));
            var i = Date.now() + d;
            b._onRendering(),
                b._timer.tickTo(g.time),
                (b._frameExecutor = setTimeout(function () {
                    b._stopped ||
                        (b._render.render(e, 'livePlayback'),
                        b._timer.finishTicking(),
                        (b._delay = i - Date.now()),
                        b._replayLoop(a));
                }, d));
        });
    }
}
