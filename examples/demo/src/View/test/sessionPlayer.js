angular
    .module('playerApp')
    .constant('PLAYER_CONFIG', {
        PLAY_SPEED: 50,
        MAX_INACTIVITY_TIME: 3e3,
        EVENTS_BATCH_SIZE: 50,
        EVENTS_BATCH_WAIT_TIME: 0,
        TAB_HIDDEN_MESSAGE_TIME: 1e3,
        GO_LIVE_DELAY_TIME: 1500,
        LAG_TIME: 500,
        MILLISECONDS_PER_FRAME: 33,
    })
    .constant('TAB_VISIBILITY', { VISIBLE: 'visible', HIDDEN: 'hidden' })
    .constant('UI_MODE', { SIMPLE: 'simple' })
    .directive('sessionPlayer', [
        '$interval',
        '$timeout',
        'lodash',
        'sessionDetailsModal',
        'player',
        'sessionstackManager',
        'analytics',
        'auth',
        'utils',
        'AsyncWhile',
        'PLAYER_CONFIG',
        'ANALYTICS_EVENT_TYPES',
        'BUILD_ENV',
        'EVENT_TYPE',
        'TAB_VISIBILITY',
        'PAUSE_AT_ACTIVITY_ID',
        'UI_MODE',
        'LOG_LEVEL',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: 'templates/player.html',
                scope: {
                    session: '=',
                    isLive: '=',
                    autostart: '=',
                    isTimelineDirty: '=?',
                    timelineValue: '=?',
                    startTime: '=',
                    selectedLogId: '=',
                    requestProgress: '=',
                    pauseActivity: '=',
                    settings: '=',
                    sessionWasInitiallyLive: '=',
                    errors: '=',
                    api: '=',
                    isCatchingUpWithLive: '=',
                },
                link: function(s, t, u) {
                    function v() {
                        return (
                            J() &&
                            !s.isPlaying &&
                            wa >= 0 &&
                            s.activities[s.activities.length - 1].time - s.activities[wa].time < k.GO_LIVE_DELAY_TIME
                        );
                    }
                    function w(a) {
                        return !!a.id && a.id !== p;
                    }
                    function x(a) {
                        var b = [],
                            d = [];
                        return (
                            angular.forEach(a, function(e, f) {
                                var g, h, i;
                                if (y(e)) {
                                    (h = A(e)), (g = D(e)), (i = s.activities.length - a.length + f);
                                    var j = {
                                        time: e.time,
                                        activityIndex: i,
                                        type: g,
                                        isLog: w(e),
                                        details: h,
                                    };
                                    j.isLog
                                        ? (d.push(c.cloneDeep(j)), j.details.level === r.ERROR && b.push(j))
                                        : b.push(j);
                                }
                            }),
                            { steps: b, logs: d }
                        );
                    }
                    function y(a) {
                        return w(a) || z(a);
                    }
                    function z(a) {
                        return (
                            !!a.data &&
                            (a.type === n.MOUSE_CLICK || (ua.indexOf(a.type) >= 0 && !a.data.frameElementId))
                        );
                    }
                    function A(a) {
                        return w(a) ? B(a) : C(a);
                    }
                    function B(a) {
                        return {
                            id: a.id,
                            message: a.message,
                            isMessageTrimmed: a.isMessageTrimmed,
                            stackFrames: a.stackFrames,
                            level: a.level,
                        };
                    }
                    function C(a) {
                        var b = a.data;
                        switch (a.type) {
                            case n.MOUSE_CLICK:
                                return {
                                    top: b.y,
                                    left: b.x,
                                    absoluteTop: b.pageY,
                                    absoluteLeft: b.pageX,
                                    selector: b.selector,
                                };
                            case n.DOM_SNAPSHOT:
                                return { pageUrl: b.pageUrl };
                            case n.WINDOW_RESIZE:
                                return { width: b.width, height: b.height };
                            case n.VISIBILITY_CHANGE:
                                return {
                                    visibilityState: b.visibilityState,
                                };
                        }
                    }
                    function D(a) {
                        return w(a) ? a.level : a.type;
                    }
                    function E(a, b) {
                        if (I()) {
                            (s.timelineValue = a), da();
                            var d = c.findLastIndex(s.activities, function(b) {
                                return b.time <= a;
                            });
                            _(d, b);
                        }
                    }
                    function F() {
                        ta && ta.cancel(),
                            s.isStreamingLive ? e.fireShowBuffering(s) : e.fireShowViewerOverlay(s),
                            s.disableStepsTimeline(),
                            (s.arePlayerButtonsEnabled = !1),
                            (s.isRendering = !0),
                            e.fireVisualizeClicks(s, !1),
                            e.fireDetach(s);
                    }
                    function G(a) {
                        e.fireAttach(s, function() {
                            e.fireVisualizeClicks(s, s.settings.playback.shouldVisualizeClicks),
                                s.isStreamingLive && !s.isCatchingUpWithLive && ma(!1),
                                e.fireHideViewerOverlay(s),
                                s.enableStepsTimeline(),
                                (s.isRendering = !1),
                                (s.arePlayerButtonsEnabled = !0),
                                pa(wa),
                                angular.isFunction(a) && a();
                        });
                    }
                    function H() {
                        ka(), da(), ea();
                    }
                    function I() {
                        return s.autostart && J();
                    }
                    function J() {
                        return s.viewerIsCreated && s.timelineIsCreated && s.stepsTimelineIsCreated && !!s.session;
                    }
                    function K(a) {
                        (s.hasFinished = !1), ea(a), e.firePlayerStarted(s);
                    }
                    function L() {
                        ka(), da(), e.firePlayerStopped(s);
                    }
                    function M(a) {
                        if (!ra) {
                            s.timeoutExecutionError = 0;
                            var c = wa + 1;
                            if (c < s.activities.length)
                                if (s.settings.playback.shouldSkipProlongedInactivity && ya && !s.isStreamingLive) O();
                                else {
                                    var d = $(s.timelineValue, s.activities[c].time);
                                    ra = b(function() {
                                        N(c, a);
                                    }, d / s.settings.playback.speed);
                                }
                            else V();
                        }
                    }
                    function N(a, b) {
                        var c = new Date(),
                            d = s.activities[a].time,
                            e = d;
                        for (s.timelineValue = d; Y(a, e); ) {
                            if (W(a, b))
                                return (
                                    s.pause(), void (s.settings.general.isDemo && s.selectedLogId && (s.logStep = 1))
                                );
                            aa(a), a++;
                        }
                        s.settings.playback.shouldSkipProlongedInactivity && ya && !s.isStreamingLive
                            ? O()
                            : R(s.activities[a - 1].time - d, c);
                    }
                    function O() {
                        if (P()) (ya = !1), e.fireHideHiddenTabOverlay(s), R();
                        else {
                            var a;
                            s.pauseActivity && !Q()
                                ? b(function() {
                                      E(s.pauseActivity.time, da);
                                  }, k.TAB_HIDDEN_MESSAGE_TIME)
                                : ((a = U()),
                                  b(function() {
                                      _(a, R);
                                  }, k.TAB_HIDDEN_MESSAGE_TIME));
                        }
                    }
                    function P() {
                        for (var a = U(), b = wa; b < a; b++) {
                            var d = s.activities[b].type;
                            if (c.includes(va, d)) return !0;
                        }
                        return !1;
                    }
                    function Q() {
                        if (s.pauseActivity) return s.timelineValue >= s.pauseActivity.time;
                    }
                    function R(a, c) {
                        a = a || 0;
                        var d = wa + 1;
                        if (d < s.activities.length) {
                            var e = s.activities[wa].time,
                                f = s.activities[d].time,
                                g = T(e, f, a);
                            (g = S(g, c)),
                                (ra = b(function() {
                                    N(d);
                                }, g));
                        } else V();
                    }
                    function S(a, b) {
                        if (!b) return 0;
                        var c = new Date();
                        return (
                            (s.timeoutExecutionError += c.getTime() - b.getTime()),
                            s.timeoutExecutionError > 0 &&
                                (s.timeoutExecutionError > a
                                    ? ((s.timeoutExecutionError = s.timeoutExecutionError - a), (a = 0))
                                    : ((a -= s.timeoutExecutionError), (s.timeoutExecutionError = 0))),
                            a
                        );
                    }
                    function T(a, b, c) {
                        var d = $(a, b),
                            e = d / s.settings.playback.speed;
                        if (s.isStreamingLive) {
                            var f = s.activities[s.activities.length - 1].time,
                                g = f - b;
                            if (g > k.LAG_TIME) return 0;
                        }
                        return e + c;
                    }
                    function U() {
                        for (var a = wa; a < s.activities.length; a++) {
                            var b = s.activities[a];
                            if (b.type === n.VISIBILITY_CHANGE && b.data.visibilityState === o.VISIBLE) return a;
                        }
                        return s.activities.length - 1;
                    }
                    function V() {
                        s.activities.length > 0 && (s.timelineValue = s.activities[s.activities.length - 1].time),
                            da(),
                            s.isStreamingLive || (s.hasFinished = !0);
                    }
                    function W(a, b) {
                        return (
                            !b &&
                            s.settings.playback.shouldPauseOnMarker &&
                            s.pauseActivity &&
                            s.pauseActivity.id === s.activities[a].id
                        );
                    }
                    function X() {
                        ra && (b.cancel(ra), (ra = null));
                    }
                    function Y(a, b) {
                        var c = Z(a);
                        return a < s.activities.length && s.activities[a].time >= b && s.activities[a].time <= b + c;
                    }
                    function Z(a) {
                        if (!s.isStreamingLive) return k.MILLISECONDS_PER_FRAME;
                        a = Math.min(a, s.activities.length - 1);
                        var b = s.activities[a].time,
                            c = s.activities[s.activities.length - 1].time,
                            d = c - b;
                        return d > k.LAG_TIME ? 500 : k.MILLISECONDS_PER_FRAME;
                    }
                    function $(a, b) {
                        var c = b - a;
                        return (
                            s.settings.playback.shouldSkipProlongedInactivity &&
                                (c = Math.min(c, k.MAX_INACTIVITY_TIME)),
                            c
                        );
                    }
                    function _(a, b) {
                        F(), (wa > a || wa === -1) && ((ya = !1), e.fireClear(s, s.snapshotData));
                        var c = 0;
                        wa <= a ? (c = wa + 1) : (wa = -1), (a = Math.min(a, s.activities.length - 1));
                        var d = c,
                            f = function() {
                                return d <= a;
                            },
                            g = function() {
                                for (var b = Math.min(a, d + k.EVENTS_BATCH_SIZE); d <= b; d++) aa(d);
                                s.renderingProgress = {
                                    current: d - c - 1,
                                    total: a - c,
                                };
                            },
                            h = { waitTime: k.EVENTS_BATCH_WAIT_TIME };
                        (ta = new j(f, g, h)),
                            ta.start(function() {
                                if (wa === -1 || !s.isStreamingLive) return void G(b);
                                var a = s.activities[wa].time;
                                s.isStreamingLive && s.timelineMax - a < k.GO_LIVE_DELAY_TIME && G(b);
                            });
                    }
                    function aa(a) {
                        var b = s.activities[a];
                        w(b) || e.fireExecuteEvent(s, b),
                            (wa = a),
                            pa(a),
                            b.type === n.VISIBILITY_CHANGE && (ya = b.data.visibilityState === o.HIDDEN);
                    }
                    function ba() {
                        sa ||
                            (sa = a(function() {
                                var a = s.timelineValue + k.PLAY_SPEED,
                                    b = s.activities[wa + 1];
                                b && (s.timelineValue = Math.min(a, b.time));
                            }, k.PLAY_SPEED / s.settings.playback.speed));
                    }
                    function ca() {
                        sa && (a.cancel(sa), (sa = null));
                    }
                    function da() {
                        X(), ca(), (s.isPlaying = !1);
                    }
                    function ea(a) {
                        (s.isPlaying = !0), M(a), ba();
                    }
                    function fa() {
                        if (s.isStreamingLive && s.isRendering) {
                            var a = s.activities[s.activities.length - 1].time;
                            (s.timelineValue = Math.max(s.timelineValue, a)), _(s.activities.length, ja);
                        } else if (xa && s.timelineValue > 0) {
                            var b = c.findLastIndex(s.activities, function(a) {
                                return a.time <= s.timelineValue;
                            });
                            _(b, ja);
                        }
                    }
                    function ga(a) {
                        (s.timelineValue = a), ha();
                    }
                    function ha() {
                        s.loadedTime < s.timelineValue
                            ? (ma(!0), (s.arePlayerButtonsEnabled = !1), da())
                            : s.loadedTime >= s.timelineValue && (ma(!1), (s.arePlayerButtonsEnabled = !0), ia());
                    }
                    function ia() {
                        if (Ba) (Ba = !1), E(s.timelineValue, ja);
                        else {
                            var a = !s.isStreamingLive && s.isRendering;
                            s.isPlaying || a || Aa || E(s.timelineValue, ja);
                        }
                    }
                    function ja() {
                        xa || s.isTimelineDirty || K();
                    }
                    function ka() {
                        s.isStreamingLive && ((s.isStreamingLive = !1), e.fireStopLiveStreaming(s));
                    }
                    function la() {
                        s.isStreamingLive || ((s.isStreamingLive = !0), e.fireStartLiveStreaming(s), ga(s.timelineMax));
                    }
                    function ma(a) {
                        (xa = a), a ? e.fireShowBuffering(s) : e.fireHideBuffering(s);
                    }
                    function na(a) {
                        if (i.isArray(a)) {
                            a.length > 0 &&
                                !za &&
                                s.pauseActivity &&
                                s.pauseActivity.id === p &&
                                s.pauseActivity.time < a[a.length - 1].time &&
                                ((a = i.mergeSortedArrays(a, [s.pauseActivity], 'time')), (za = !0)),
                                (s.activities = i.concatenateArrays(s.activities, a));
                            var b = x(a),
                                c = b.steps,
                                d = b.logs;
                            i.isArray(c) && c.length > 0 && s.addNewSteps(c),
                                i.isArray(d) && d.length > 0 && s.addNewLogs(d),
                                s.activities.length > 0
                                    ? (s.loadedTime = s.activities[s.activities.length - 1].time)
                                    : (s.loadedTime = s.timelineMax),
                                s.loadedTime > s.timelineMax && (s.timelineMax = s.loadedTime);
                            var f = s.loadedTime === s.timelineMax;
                            f && e.fireHideStepsBuffering(s), i.isFunction(s.refreshTimeline) && s.refreshTimeline(f);
                        }
                    }
                    function oa() {
                        i.isFunction(s.enableTimeline) && s.enableTimeline();
                    }
                    function pa(a) {
                        i.isFunction(s.updateStepsTimeline) && s.updateStepsTimeline(a),
                            i.isFunction(s.updateConsole) && s.updateConsole(a);
                    }
                    function qa() {
                        var a = h.getCurrentUser(),
                            b = { opened_from: 'timeline_controls' };
                        g.trackEvent(a.id, l.CONSOLE_OPENED, b), f.log('Console opened from time line controls');
                    }
                    var ra,
                        sa,
                        ta,
                        ua = [n.DOM_SNAPSHOT, n.WINDOW_RESIZE, n.VISIBILITY_CHANGE],
                        va = [n.MOUSE_CLICK, n.MOUSE_MOVE, n.WINDOW_RESIZE],
                        wa = -1,
                        xa = !1,
                        ya = !1,
                        za = !1,
                        Aa = !1,
                        Ba = !1;
                    (s.PLAYER_ONLINE_MODE = m.PLAYER_ONLINE_MODE),
                        (s.isPlaying = !1),
                        (s.timelineMin = 0),
                        (s.timelineMax = 0),
                        (s.timelineValue = 0),
                        (s.arePlayerButtonsEnabled = !0),
                        (s.sessionScreenWidth = 0),
                        (s.sessionScreenHeight = 0),
                        (s.renderingProgress = 0),
                        (s.speedOptions = [
                            { label: '0.25x', value: 0.25 },
                            { label: '0.5x', value: 0.5 },
                            { label: 'Normal', value: 1 },
                            { label: '2x', value: 2 },
                            { label: '4x', value: 4 },
                        ]),
                        (s.loadedTime = -1),
                        (s.steps = []),
                        (s.activities = []),
                        (s.detailsStep = 0),
                        (s.logStep = 0),
                        (s.isStreamingLive = !1),
                        (s.isSimpleUIMode = s.settings.general.uiMode === q.SIMPLE),
                        (s.shouldShowLoadingOverlay = !0),
                        (s.settings.playback.speedOption = function(a) {
                            return arguments.length > 0
                                ? (s.settings.playback.speed = a.value)
                                : c.find(s.speedOptions, function(a) {
                                      return a.value === s.settings.playback.speed;
                                  });
                        }),
                        s.$watch('session', function(a) {
                            a
                                ? ((wa = -1),
                                  (s.sessionId = a.id),
                                  (s.sessionScreenWidth = a.screenWidth),
                                  (s.sessionScreenHeight = a.screenHeight),
                                  (s.snapshotData = {
                                      snapshot: a.snapshot,
                                      origin: a.origin,
                                      docType: a.docType,
                                      top: a.top,
                                      left: a.left,
                                  }),
                                  s.settings.general.isDemo && !s.selectedLogId && (s.detailsStep = 1),
                                  (ya = a.visibilityState === o.HIDDEN))
                                : (s.arePlayerButtonsEnabled = !1);
                        }),
                        s.$watch(J, function(a) {
                            a &&
                                (oa(),
                                e.firePlayerIsInitialized(s),
                                s.hideUserDetailsMask(),
                                s.hideStepsTimelineMask(),
                                (s.shouldShowLoadingOverlay = !1));
                        }),
                        s.$watch('isTimelineDirty', function(a) {
                            a === !0
                                ? L()
                                : a === !1 && ((Ba = !0), da(), ka(), e.firePlayerStopped(s), ga(s.timelineValue));
                        }),
                        s.$on('$destroy', function() {
                            da();
                        }),
                        s.$watch('settings.playback.shouldSkipProlongedInactivity', function() {
                            J() && s.isPlaying && H();
                        }),
                        s.$watch('settings.playback.shouldVisualizeClicks', function(a) {
                            e.fireVisualizeClicks(s, a);
                        }),
                        s.$watch('settings.playback.speed', function(a) {
                            J() && s.isPlaying && (H(), e.firePlayerSpeedChange(s, a));
                        }),
                        (s.togglePlaying = function() {
                            v()
                                ? ((Aa = !0), ka())
                                : s.isPlaying || s.isStreamingLive
                                ? ((Aa = !0), L())
                                : ((Aa = !1), K(!0));
                        }),
                        (s.play = function() {
                            (Aa = !1), K(!0);
                        }),
                        (s.pause = function() {
                            (Aa = !0), L();
                        }),
                        (s.repeat = function() {
                            (wa = -1), E(s.startTime, K);
                        }),
                        (s.showSessionDetails = function(a) {
                            f.log("Clicked on 'Details'"), s.pause(), d.open(a);
                        }),
                        (s.onSelectedActivity = function(a) {
                            s.hasFinished = !1;
                            var b = s.activities[a];
                            (s.timelineValue = b.time), wa + 1 !== a && (s.pause(), _(a - 1));
                        }),
                        s.$watch('isLive', function(a) {
                            a || ka();
                        }),
                        (s.goLive = function() {
                            (Ba = !0), da(), e.firePlayerStopped(s), la();
                        }),
                        (s.api = {
                            setSessionLength: function(a) {
                                s.timelineMax = a;
                                var b = s.timelineValue || s.startTime;
                                s.isStreamingLive && (b = s.timelineMax), ga(b);
                            },
                            finishLoadingActivities: function() {
                                s.isStreamingLive && ga(s.timelineMax);
                            },
                            addActivities: function(a) {
                                var b = v() && !s.isRendering && s.isStreamingLive && !xa && a && a.length > 0;
                                na(a),
                                    (s.pauseActivity && s.pauseActivity.time === s.timelineValue) ||
                                        (fa(), b && ((s.timelineValue = a[0].time), K()), s.isStreamingLive || ha());
                            },
                            startLiveStreaming: la,
                        }),
                        e.onUserDetailsResize(s, function(a, b) {
                            s.handleUserDetailsResize(b);
                        }),
                        e.onConsoleResize(s, function(a, b) {
                            s.handleConsoleResize(b);
                        }),
                        e.onOpenConsole(s, function(a, b) {
                            s.openConsole(b);
                        }),
                        (s.toggleConsole = function() {
                            s.isConsoleExpanded ? s.closeConsole() : (qa(), s.openConsole());
                        });
                },
            };
        },
    ]);
