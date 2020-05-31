class NullPlayback {
    private _wait: number;
    private _lastPlayedActivity;

    private _executor;

    constructor(wait: number, lastPlayedActivity) {
        this._wait = wait;
        this._lastPlayedActivity = lastPlayedActivity;
    }

    stop() {
        clearTimeout(this._executor);
    }
    replay(callback) {
        callback = callback || function () {};
        this._executor = setTimeout(callback, this._wait);
    }
    getLastPlayedActivity() {
        return this._lastPlayedActivity;
    }
}
