export class Timer {
    public time: number;
    private _tickStep: number;
    private _end: number;
    private _speed: number;
    private _interval;
    private _stopped: boolean;

    private _onTimeChanged: (time: number) => void;

    constructor(time: number, tickStep: number) {
        this.time = time;
        this._tickStep = tickStep;
        this._end = time;
        this._speed = 1;
        this._interval = null;
        this._stopped = false;
    }

    tickTo(time: number) {
        this._end = time;
        this._startInterval();
    }
    finishTicking() {
        this._updateTime(this._end);
        this._stopInterval();
    }
    stopTicking() {
        this._stopInterval();
    }
    onTimeChanged(callback: (time: number) => void) {
        this._onTimeChanged = callback;
    }
    changeSpeed(speed: number) {
        this._speed = speed;
    }
    private _updateTime(time: number) {
        if (time !== this.time) {
            this.time = time;
            this._onTimeChanged(time);
        }
    }
    private _startInterval() {
        if (!this._interval) {
            this._interval = setInterval(() => {
                if (this.time < this._end) {
                    let time = this.time + this._tickStep * this._speed;
                    time = Math.min(time, this._end);
                    this._updateTime(time);
                } else {
                    this._stopInterval();
                }
            }, this._tickStep);
        }
    }
    private _stopInterval() {
        clearInterval(this._interval);
        this._interval = null;
    }
}
