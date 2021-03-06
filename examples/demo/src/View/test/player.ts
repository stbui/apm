import { InstantPlayback } from './InstantPlayback';
import { NormalPlayback } from './NormalPlayback';
import { NullPlayback } from './NullPlayback';
import { LivePlayback } from './LivePlayback';
import { Activities, IteratorFromClosestSnapshotToTime } from './Activities';
import { AsyncSliceIterator } from './AsyncSliceIterator';
import { IRender } from './interface';

const noop = function () {};

export class Player {
    private _activities: Activities;
    private _render: IRender;
    private _skippingToTabShown;
    private _pauseAt: number | null;
    private _config;
    private _playback: NormalPlayback | NullPlayback | InstantPlayback | LivePlayback;
    private _onBuffering: Function;
    private _onRendering: Function;
    private _onPlaying: Function;
    private _onFinished: Function;
    private _onPaused: Function;
    private _onTimeChanged: Function;

    private _replayFinished;

    constructor(activities: Activities, render: IRender, config) {
        this._activities = activities;
        this._render = render;
        this._skippingToTabShown = false;
        this._pauseAt = null;
        this._config = {
            batchSize: config.EVENTS_BATCH_SIZE,
            maxProlongedInactivityTime: config.MAX_INACTIVITY_TIME,
            millisecondsPerFrame: config.MILLISECONDS_PER_FRAME,
            maxLag: config.LAG_TIME,
            tabHiddenMessageTime: config.TAB_HIDDEN_MESSAGE_TIME,
            speed: 1,
            maxInactivityTime: config.MAX_INACTIVITY_TIME,
            skipProlongedInactivity: true,
        };

        this._playback = this._createNullPlayback(0);

        this._onBuffering = noop;
        this._onRendering = noop;
        this._onPlaying = noop;
        this._onFinished = noop;
        this._onPaused = noop;
        this._onTimeChanged = noop;

        this._replayFinished = () => {
            this._stop();
            var lastRenderedActivity = this._render.lastRenderedActivity;
            this._activities.isLastActivity(lastRenderedActivity) ? this._onFinished() : this._onPaused();
        };
    }

    play(timelineValue: number) {
        this._stop();
        var lastRenderedActivity = this._render.lastRenderedActivity;

        var sessionLength;
        var asyncSliceIterator;
        if (this._pauseAt && timelineValue < this._pauseAt) {
            sessionLength = this._pauseAt;
            asyncSliceIterator = this._activities.getIteratorBetween(lastRenderedActivity, this._pauseAt);
        } else {
            sessionLength = this._activities.getSessionLength() + 1;
            asyncSliceIterator = this._activities.getIteratorAfter(lastRenderedActivity);
        }

        this._playback = this._createNormalPlayback(timelineValue, sessionLength, asyncSliceIterator);
        this._playback.replay(this._replayFinished);
    }
    pause() {
        this._stop();
        this._replayFinished();
    }
    jumpToTime(timelineSelectedValue: number) {
        this._stop();
        var lastRenderedActivity = this._render.lastRenderedActivity;

        var activities;
        if (timelineSelectedValue < lastRenderedActivity.time) {
            // 回退
            this._render.reset();
            activities = this._activities.getIteratorFromClosestSnapshotToTime(timelineSelectedValue);
        } else {
            // 前进
            activities = this._activities.getIteratorFromClosestSnapshotBetween(
                lastRenderedActivity,
                timelineSelectedValue
            );
        }

        this._playback = this._createInstantPlayback(activities);
        this._playback.replay(this.play.bind(this, timelineSelectedValue));
    }
    jumpToActivity(selectedActivity) {
        this._stop();
        var lastRenderedActivity = this._render.lastRenderedActivity;

        if (selectedActivity.time < lastRenderedActivity.time) {
            this._render.reset();
            var activities = this._activities.getIteratorFromClosestSnapshotToActivity(selectedActivity);
        } else
            var activities = this._activities.getIteratorFromClosestSnapshotBetweenActivities(
                lastRenderedActivity,
                selectedActivity
            );

        this._playback = this._createInstantPlayback(activities);
        this._playback.replay(this._replayFinished);
    }
    goLive(time: number) {
        this._stop();
        var activities = this._activities.getIteratorAfterEnd();

        this._playback = this._createLivePlayback(time, activities);
        this._playback.replay();
    }
    /**
     *
     * @param a timelineValue
     */
    skipToTabShown(a) {
        var b = this;
        if (this._isPlayingNormal() && this._config.skipProlongedInactivity && !this._skippingToTabShown) {
            this._stop();
            this._skippingToTabShown = true;

            var lastRenderedActivity = b._render.lastRenderedActivity,
                endTime = this._pauseAt || Number.POSITIVE_INFINITY,
                e = b._activities.getSessionLength(),
                f = Math.min(a + b._config.tabHiddenMessageTime, e);

            if (a < endTime && endTime <= f) {
                var activities = this._activities.getIteratorBetween(lastRenderedActivity, endTime);
                this._playback = this._createNormalPlayback(a, endTime, activities);
                b._playback.replay(b._replayFinished);

                return;
            }

            var g = b._activities.getIteratorBetween(lastRenderedActivity, f);
            b._playback = b._createNormalPlayback(a, f, g);

            b._playback.replay(function () {
                b._stop();
                b._skippingToTabShown = true;

                if (!b._render.isTabHidden) {
                    return b.play(f);
                }

                var lastRenderedActivity = b._render.lastRenderedActivity;
                if (b._pauseAt && b._pauseAt > a.time) {
                    var c = b._pauseAt;
                } else {
                    var c = Number.POSITIVE_INFINITY;
                }

                var activities = b._activities.getIteratorFromClosestSnapshotToFirstTabShown(lastRenderedActivity, c);

                b._playback = b._createInstantPlayback(activities);
                b._playback.replay(function () {
                    var a = b._render.lastRenderedActivity,
                        c = Math.max(f, a.time);

                    b.play(c);
                });
            });
        }
    }
    changeProlongedInactivitySetting(shouldSkipProlongedInactivity: boolean, timelineValue: number) {
        if (shouldSkipProlongedInactivity) {
            this._config.skipProlongedInactivity = true;
            this._config.maxInactivityTime = this._config.maxProlongedInactivityTime;
        } else {
            this._config.skipProlongedInactivity = false;
            this._config.maxInactivityTime = Number.POSITIVE_INFINITY;
        }

        this._isPlayingNormal() && this.play(timelineValue);
    }
    changeSpeedSetting(speed: number, timelineValue: number) {
        this._config.speed = speed;
        this._isPlayingNormal() && this.play(timelineValue);
    }
    changePauseMarker(time: number, timelineValue: number) {
        this._pauseAt = time;
        this._isPlayingNormal() && this.play(timelineValue);
    }
    onBuffering(callback: Function) {
        this._onBuffering = callback;
    }
    onRendering(callback: Function) {
        this._onRendering = callback;
    }
    onPlaying(callback: Function) {
        this._onPlaying = callback;
    }
    onFinished(callback: Function) {
        this._onFinished = callback;
    }
    onPaused(callback: Function) {
        this._onPaused = callback;
    }
    onTimeChanged(callback: Function) {
        this._onTimeChanged = callback;
    }
    _stop() {
        this._playback.stop();
        this._playback = this._createNullPlayback(0);
        this._skippingToTabShown = false;
    }
    _createNormalPlayback(
        time: number,
        endTime: number,
        iterator: AsyncSliceIterator | IteratorFromClosestSnapshotToTime
    ): NormalPlayback {
        const normalPlayback = new NormalPlayback(time, endTime, iterator, this._render, this._config);

        normalPlayback.onBuffering(this._onBuffering);
        normalPlayback.onRendering(this._onPlaying);
        normalPlayback.onTimeChanged(this._onTimeChanged);

        return normalPlayback;
    }
    private _createInstantPlayback(activities): InstantPlayback {
        const instantPlayback = new InstantPlayback(activities, this._render, this._config);

        instantPlayback.onBuffering(this._onBuffering);
        instantPlayback.onRendering(this._onRendering);

        return instantPlayback;
    }
    private _createLivePlayback(time: number, activities): LivePlayback {
        const livePlayback = new LivePlayback(time, activities, this._render, this._config);

        livePlayback.onBuffering(this._onBuffering);
        livePlayback.onRendering(this._onPlaying);
        livePlayback.onTimeChanged(this._onTimeChanged);

        return livePlayback;
    }
    private _createNullPlayback(wait: number): NullPlayback {
        return new NullPlayback(wait, this._render.lastRenderedActivity);
    }
    private _isPlayingNormal() {
        return this._playback instanceof NormalPlayback;
    }
}
