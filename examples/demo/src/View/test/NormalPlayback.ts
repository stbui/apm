import { Timer } from './Timer';

export class Frames {
    private _activities;
    private _millisecondsPerFrame;

    constructor(activities, millisecondsPerFrame) {
        this._activities = activities;
        this._millisecondsPerFrame = millisecondsPerFrame;
    }

    next(a) {
        this._activities.next(c => {
            if (c.done) {
                return a({ done: true });
            }

            var d = c.value;
            var e = d.time + this._millisecondsPerFrame;
            this._getNextFrame(e, [d], a);
        });
    }

    private _getNextFrame(a, b, c) {
        this._activities.peek(e => {
            if (e.done) return c({ done: false, value: b });
            var f = e.value;

            if (f.time > a) {
                return c({ done: false, value: b });
            } else {
                b.push(f);
                this._activities.next(e => {
                    this._getNextFrame(a, b, c);
                });

                return;
            }
        });
    }
}

export class NormalPlayback {
    private _timer: Timer;
    private _endTime;
    private _activities;
    private _frames: Frames;
    private _render;
    private _delay;
    private _stopped: boolean;
    private _skipPrologedInactivity;
    private _maxInactivityTime;
    private _tabHiddenMessageTime;
    private _speed: number;
    private _onBuffering: Function;
    private _onRendering: Function;
    private _onTimeChanged: Function;

    private _frameExecutor: NodeJS.Timeout;

    constructor(time: number, endTime: number, activities, render, config) {
        this._timer = new Timer(time, config.millisecondsPerFrame);
        this._endTime = endTime;
        this._activities = activities;
        this._frames = new Frames(this._activities, config.millisecondsPerFrame);
        this._render = render;
        this._delay = 0;
        this._stopped = true;
        this._skipPrologedInactivity = config.skipProlongedInactivity;
        this._maxInactivityTime = config.maxInactivityTime;
        this._tabHiddenMessageTime = config.tabHiddenMessageTime;
        this._speed = config.speed;
        this._timer.changeSpeed(this._speed);
        this._onBuffering = function () {};
        this._onRendering = function () {};
        this._onTimeChanged = function () {};

        var i = this;
        var buffering = function () {
            i._onBuffering();
        };
        var timeChanged = function (a) {
            i._onTimeChanged(a);
        };
        this._activities.onPending(buffering);
        this._timer.onTimeChanged(timeChanged);
    }

    onBuffering(callback: Function) {
        this._onBuffering = callback;
    }
    onRendering(callback: Function) {
        this._onRendering = callback;
    }
    onTimeChanged(callback: Function) {
        this._onTimeChanged = callback;
    }
    stop() {
        this._stopped = true;
        this._activities.onPending(function () {});
        this._timer.onTimeChanged(function () {});
        this._timer.stopTicking();
        clearTimeout(this._frameExecutor);
    }
    replay(b) {
        this._stopped = false;
        this._onRendering();
        this._replayLoop(b || function () {});
    }
    private _replayLoop(callback: Function) {
        var b = this;
        this._frames.next(c => {
            if (c.done) {
                return this._finish(callback);
            }

            var d = c.value;
            var e = d[0];
            var f = d[d.length - 1];

            var speed = 0;

            if (e.isFirstLiveActivity) {
                speed = 0;
            } else {
                var speed = e.time - b._timer.time;
                speed = Math.min(speed, b._maxInactivityTime);

                var h = speed - b._delay;
                if (h < 0) {
                    this._delay -= speed;
                    speed = 0;
                } else {
                    this._delay = 0;
                    speed = h;
                }

                speed /= this._speed;

                if (this._skipPrologedInactivity && this._render.isTabHidden) {
                    speed = Math.min(speed, b._tabHiddenMessageTime);
                }
            }

            let i = Date.now() + speed;
            this._onRendering();
            this._timer.tickTo(f.time);
            this._frameExecutor = setTimeout(() => {
                if (!this._stopped) {
                    this._render.render(d, 'normalPlayback');
                    this._timer.finishTicking();
                    this._delay += Date.now() - i;
                    this._replayLoop(callback);
                }
            }, speed);
        });
    }
    private _finish(callback: Function) {
        let waitTime = this._endTime - this._timer.time;
        waitTime = Math.max(0, waitTime - this._delay);

        this._timer.tickTo(this._endTime);

        setTimeout(() => {
            this._timer.finishTicking();

            if (!this._stopped) {
                callback();
                this.stop();
            }
        }, waitTime);
    }
    changeSpeed(speed: number) {
        this._speed = speed;
        this._timer.changeSpeed(speed);
    }
}
