function a(a, b) {
    a.$broadcast(T, b);
}
function b(a, b) {
    a.$on(T, b);
}
function c(a, b) {
    a.$broadcast(S, b);
}
function d(a, b) {
    a.$on(S, b);
}
function e(a, b) {
    a.$broadcast(U, b);
}
function f(a, b) {
    a.$on(U, b);
}
function g(a, b) {
    a.$broadcast(V, b);
}
function h(a, b) {
    a.$on(V, b);
}
function i(a) {
    a.$broadcast(X);
}
function j(a, b) {
    a.$on(X, b);
}
function k(a) {
    a.$broadcast(W);
}
function l(a, b) {
    a.$on(W, b);
}
function m(a, b) {
    a.$broadcast(Y, b);
}
function n(a, b) {
    a.$on(Y, b);
}
function o(a) {
    a.$broadcast(Z);
}
function p(a, b) {
    a.$on(Z, b);
}
function q(a) {
    a.$broadcast($);
}
function r(a, b) {
    a.$on($, b);
}
function s(a) {
    a.$broadcast(_);
}
function t(a, b) {
    a.$on(_, b);
}
function u(a) {
    a.$broadcast(ca);
}
function v(a, b) {
    a.$on(ca, b);
}
function w(a) {
    a.$broadcast(da);
}
function x(a, b) {
    a.$on(da, b);
}
function y(a, b) {
    a.$emit(aa, b);
}
function z(a, b) {
    a.$on(aa, b);
}
function A(a) {
    a.$emit(ba);
}
function B(a, b) {
    a.$on(ba, b);
}
function C(a) {
    a.$emit(ea);
}
function D(a, b) {
    a.$on(ea, b);
}
function E(a) {
    a.$broadcast(fa);
}
function F(a, b) {
    a.$on(fa, b);
}
function G(a) {
    a.$broadcast(ga);
}
function H(a, b) {
    a.$on(ga, b);
}
function I(a, b) {
    a.$emit(ha, b);
}
function J(a, b) {
    a.$on(ha, b);
}
function K(a, b) {
    a.$emit(ia, b);
}
function L(a, b) {
    a.$on(ia, b);
}
function M(a, b) {
    a.$emit(ja, b);
}
function N(a, b) {
    a.$on(ja, b);
}
function O(a, b) {
    a.$emit(ka, b);
}
function P(a, b) {
    a.$on(ka, b);
}
function Q(a, b) {
    a.$emit(la, b);
}
function R(a, b) {
    a.$on(la, b);
}
var S = 'execute',
    T = 'clear',
    U = 'playerSpeedChange',
    V = 'visualizeClicks',
    W = 'playerStopped',
    X = 'playerStarted',
    Y = 'attach',
    Z = 'detach',
    $ = 'showOverlay',
    _ = 'hideOverlay',
    aa = 'startLiveStreaming',
    ba = 'stopLiveSteaming',
    ca = 'showBuffering',
    da = 'hideBuffering',
    ea = 'playerIsInitialized',
    fa = 'hideStepsBuffering',
    ga = 'hideHiddenTabOverlay',
    ha = 'userDetailsResize',
    ia = 'consoleResize',
    ja = 'openConsole',
    ka = 'userPermissionRequestSend',
    la = 'userPermissionRequestCanceled';

export const player = {
    fireExecuteEvent: c,
    onExecuteEvent: d,
    fireClear: a,
    onClear: b,
    firePlayerSpeedChange: e,
    onPlayerSpeedChange: f,
    fireVisualizeClicks: g,
    onVisualizeClicks: h,
    firePlayerStarted: i,
    onPlayerStarted: j,
    firePlayerStopped: k,
    onPlayerStopped: l,
    fireAttach: m,
    onAttach: n,
    fireDetach: o,
    onDetach: p,
    fireShowViewerOverlay: q,
    onShowViewerOverlay: r,
    fireHideViewerOverlay: s,
    onHideViewerOverlay: t,
    fireStartLiveStreaming: y,
    onStartLiveStreaming: z,
    fireStopLiveStreaming: A,
    onStopLiveStreaming: B,
    fireShowBuffering: u,
    onShowBuffering: v,
    fireHideBuffering: w,
    onHideBuffering: x,
    firePlayerIsInitialized: C,
    onPlayerIsInitialized: D,
    fireHideStepsBuffering: E,
    onHideStepsBuffering: F,
    fireHideHiddenTabOverlay: G,
    onHideHiddenTabOverlay: H,
    fireUserDetailsResize: I,
    onUserDetailsResize: J,
    fireConsoleResize: K,
    onConsoleResize: L,
    fireOpenConsole: M,
    onOpenConsole: N,
    fireUserPermissionRequestSend: O,
    onUserPermissionRequestSend: P,
    fireUserPermissionRequestCanceled: Q,
    onUserPermissionRequestCanceled: R,
};

import { InstantPlayback } from './InstantPlayback';
import { NormalPlayback } from './NormalPlayback';
import { LivePlayback } from './LivePlayback';
import { Activities } from './Activities';

const noop = function() {};

export class Player {
    private _activities: Activities;
    private _render;
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

    constructor(activities: Activities, render, config) {
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

        var e = this;
        this._replayFinished = function() {
            e._stop();
            var lastRenderedActivity = e._render.lastRenderedActivity;
            e._activities.isLastActivity(lastRenderedActivity) ? e._onFinished() : e._onPaused();
        };
    }

    play(timelineValue: number) {
        this._stop();
        var lastRenderedActivity = this._render.lastRenderedActivity;

        if (this._pauseAt && timelineValue < this._pauseAt)
            var endTime = this._pauseAt,
                activities = this._activities.getIteratorBetween(lastRenderedActivity, this._pauseAt);
        else
            var endTime = this._activities.getSessionLength() + 1,
                activities = this._activities.getIteratorAfter(lastRenderedActivity);

        this._playback = this._createNormalPlayback(timelineValue, endTime, activities);
        this._playback.replay(this._replayFinished);
    }
    pause() {
        this._stop();
        this._replayFinished();
    }
    jumpToTime(timelineSelectedValue: number) {
        this._stop();
        var lastRenderedActivity = this._render.lastRenderedActivity;

        if (timelineSelectedValue < lastRenderedActivity.time) {
            this._render.reset();
            var activities = this._activities.getIteratorFromClosestSnapshotToTime(timelineSelectedValue);
        } else
            var activities = this._activities.getIteratorFromClosestSnapshotBetween(
                lastRenderedActivity,
                timelineSelectedValue
            );

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
                var activities = b._activities.getIteratorBetween(lastRenderedActivity, endTime);
                b._playback = b._createNormalPlayback(a, endTime, activities);
                b._playback.replay(b._replayFinished);

                return;
            }

            var g = b._activities.getIteratorBetween(lastRenderedActivity, f);
            b._playback = b._createNormalPlayback(a, f, g);

            b._playback.replay(function() {
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
                b._playback.replay(function() {
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
    _createNormalPlayback(time: number, endTime: number, activities): NormalPlayback {
        const normalPlayback = new NormalPlayback(time, endTime, activities, this._render, this._config);

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
