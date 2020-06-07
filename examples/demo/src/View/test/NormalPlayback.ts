import { Timer } from './Timer';
import { AsyncSliceIterator } from './AsyncSliceIterator';
import { IRender, IActivity } from './interface';
export class Frames {
    private _activities: AsyncSliceIterator;
    private _millisecondsPerFrame: number;

    constructor(activities: AsyncSliceIterator, millisecondsPerFrame: number) {
        this._activities = activities;
        this._millisecondsPerFrame = millisecondsPerFrame;
    }

    next(callback) {
        this._activities.next(activity => {
            if (activity.done) {
                return callback({ done: true });
            }

            var value = activity.value;
            var time = value.time + this._millisecondsPerFrame;
            this._getNextFrame(time, [value], callback);
        });
    }

    private _getNextFrame(time: number, value: IActivity[], callback: Function) {
        this._activities.peek(activity => {
            if (activity.done) {
                return callback({ done: false, value: value });
            }

            var val = activity.value;
            if (val.time > time) {
                return callback({ done: false, value: value });
            }

            value.push(val);
            this._activities.next(e => {
                this._getNextFrame(time, value, callback);
            });

            return;
        });
    }
}

export class NormalPlayback {
    private _timer: Timer;
    private _endTime;
    private _activities;
    private _frames: Frames;
    private _render: IRender;
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

    constructor(time: number, endTime: number, activities: AsyncSliceIterator, render: IRender, config) {
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

        this._activities.onPending(() => {
            this._onBuffering();
        });

        this._timer.onTimeChanged(time => {
            this._onTimeChanged(time);
        });
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
    replay(callback = function () {}) {
        this._stopped = false;
        this._onRendering();
        this._replayLoop(callback);
    }
    private _replayLoop(callback: Function) {
        this._frames.next(c => {
            if (c.done) {
                return this._finish(callback);
            }

            var activities = c.value;
            var activity = activities[0];
            var lastActivities = activities[activities.length - 1];

            var speed = 0;

            if (activity.isFirstLiveActivity) {
                speed = 0;
            } else {
                var speed = activity.time - this._timer.time;
                speed = Math.min(speed, this._maxInactivityTime);

                var h = speed - this._delay;
                if (h < 0) {
                    this._delay -= speed;
                    speed = 0;
                } else {
                    this._delay = 0;
                    speed = h;
                }

                speed /= this._speed;

                if (this._skipPrologedInactivity && this._render.isTabHidden) {
                    speed = Math.min(speed, this._tabHiddenMessageTime);
                }
            }

            let i = Date.now() + speed;
            this._onRendering();
            this._timer.tickTo(lastActivities.time);
            this._frameExecutor = setTimeout(() => {
                if (!this._stopped) {
                    // sessionnPlayer.render.render
                    this._render.render(activities, 'normalPlayback');
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
