angular
    .module('playerApp')
    .constant('PLAYER_CONFIG', {
        MAX_INACTIVITY_TIME: 3e3,
        EVENTS_BATCH_SIZE: 250,
        EVENTS_BATCH_WAIT_TIME: 0,
        TAB_HIDDEN_MESSAGE_TIME: 1e3,
        GO_LIVE_DELAY_TIME: 1500,
        LAG_TIME: 500,
        MILLISECONDS_PER_FRAME: 33,
    })
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
        'Player',
        'Activity',
        'Activities',
        'PLAYER_CONFIG',
        'ANALYTICS_EVENT_TYPES',
        'BUILD_ENV',
        'EVENT_TYPE',
        'TAB_VISIBILITY',
        'UI_MODE',
        'SUPPORT_TOOLS',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: 'templates/player.html',
                scope: {
                    session: '=',
                    initialSettings: '=',
                    isLive: '=',
                    isTimelineSelectionInProgress: '=?',
                    timelineValue: '=?',
                    startTime: '=',
                    pauseActivity: '=',
                    settings: '=',
                    errors: '=',
                    api: '=',
                    playRecordedSession: '=',
                },
                link: function(a, b, t) {
                    function u(b) {
                        a.$apply(function() {
                            a.timelineValue = b;
                        });
                    }
                    function v() {
                        window.ss_debug && console.log('show buffering'),
                            (a.arePlayerButtonsEnabled = !1),
                            a.disableStepsTimeline(),
                            e.fireHideViewerOverlay(a),
                            e.fireShowBuffering(a);
                    }
                    function w() {
                        window.ss_debug && console.log('show rendering'), e.fireDetach(a), v();
                    }
                    function x() {
                        window.ss_debug && console.log('hide overlays'),
                            (a.arePlayerButtonsEnabled = !0),
                            a.enableStepsTimeline(),
                            e.fireHideViewerOverlay(a),
                            e.fireHideBuffering(a),
                            e.fireAttach(a);
                    }
                    function y() {
                        window.ss_debug && console.log('paused'),
                            (a.hasFinished = !1),
                            (a.isPlaying = !1),
                            (a.arePlayerButtonsEnabled = !0),
                            a.enableStepsTimeline(),
                            e.fireHideViewerOverlay(a),
                            e.fireHideBuffering(a),
                            e.fireAttach(a);
                    }
                    function z() {
                        window.ss_debug && console.log('finished'),
                            (a.hasFinished = !0),
                            (a.isPlaying = !1),
                            (a.arePlayerButtonsEnabled = !0),
                            a.enableStepsTimeline(),
                            e.fireHideViewerOverlay(a),
                            e.fireHideBuffering(a),
                            e.fireAttach(a);
                    }
                    function A(a) {
                        return [p.CONSOLE_ERROR, p.CONSOLE_WARN, p.CONSOLE_DEBUG, p.CONSOLE_LOG].indexOf(a.type) > -1;
                    }
                    function B(a) {
                        return a.type === p.NETWORK_REQUEST;
                    }
                    function C(a) {
                        if (!a.data) return !1;
                        var b = 0 === a.time && 0 === a.index && a.type === p.DOM_SNAPSHOT;
                        if (b) return !1;
                        var c = a.type === p.MOUSE_CLICK,
                            d = !!a.data.frameElementId,
                            e = !!a.data.hostElementId,
                            f = !d && !e,
                            g = f && U.indexOf(a.type) >= 0;
                        return (c && !e) || g;
                    }
                    function D(a) {
                        var b = {};
                        (b[p.CONSOLE_LOG] = 'info'),
                            (b[p.CONSOLE_ERROR] = 'error'),
                            (b[p.CONSOLE_WARN] = 'warn'),
                            (b[p.CONSOLE_DEBUG] = 'debug');
                        var c = { id: a.id, level: b[a.type] };
                        if ('exception' === a.data.type) {
                            var d = a.data.exception;
                            (c.message = d.type ? d.type + ': ' : ''),
                                (c.message += d.message),
                                (c.isMessageTrimmed = !1),
                                (c.stackFrames = (d.stackFrames || []).map(function(a) {
                                    return a.source || '';
                                }));
                        } else {
                            var e = a.data;
                            (c.message = e.message), (c.isMessageTrimmed = e.isMessageTrimmed), (c.stackFrames = null);
                        }
                        return c;
                    }
                    function E(a) {
                        var b = a.data;
                        switch (a.type) {
                            case p.CONSOLE_LOG:
                                return D(a);
                            case p.CONSOLE_ERROR:
                                return D(a);
                            case p.CONSOLE_WARN:
                                return D(a);
                            case p.CONSOLE_DEBUG:
                                return D(a);
                            case p.MOUSE_CLICK:
                                return {
                                    top: b.y,
                                    left: b.x,
                                    absoluteTop: b.pageY,
                                    absoluteLeft: b.pageX,
                                    selector: b.selector,
                                };
                            case p.DOM_SNAPSHOT:
                                return { pageUrl: b.pageUrl };
                            case p.WINDOW_RESIZE:
                                return { width: b.width, height: b.height };
                            case p.VISIBILITY_CHANGE:
                                return { visibilityState: b.visibilityState };
                        }
                    }
                    function F(a) {
                        return {
                            message: a.data.message,
                            level: a.data.level,
                            request: a.data,
                        };
                    }
                    function G() {
                        a.isStreamingLive && ((a.isStreamingLive = !1), Q(), e.fireStopLiveStreaming(a));
                    }
                    function H() {
                        return a.viewerIsCreated && a.timelineIsCreated && a.stepsTimelineIsCreated && !!a.session;
                    }
                    function I(b) {
                        a.activities.push(b);
                        var c = [],
                            d = [],
                            e = [];
                        b.forEach(function(a) {
                            var b = {
                                time: a.time,
                                activityIndex: a.playerIndex,
                                playerIndex: a.playerIndex,
                                type: a.type,
                                isLog: A(a),
                            };
                            C(a) && ((b.details = E(a)), c.push(b)),
                                A(a) && ((b.details = D(a)), d.push(b)),
                                B(a) && ((b.details = F(a)), e.push(b));
                        }),
                            a.addNewSteps(c),
                            a.addNewLogs(d),
                            a.addNewNetworkRequests(e);
                    }
                    function J(a) {
                        return 'about:blank' === a || a.indexOf('undefined') > -1;
                    }
                    function K() {
                        if (h.isCurrentUserLoaded()) {
                            var a = h.getCurrentUser(),
                                b = { opened_from: 'timeline_controls' };
                            g.trackEvent(a.id, n.CONSOLE_OPENED, b), f.log('Console opened from time line controls');
                        }
                    }
                    function L(b, c) {
                        if (c && ((a.activeTool = b), h.isCurrentUserLoaded())) {
                            var d = h.getCurrentUser();
                            g.trackEvent(d.id, n.SUPPORT_TOOLKIT_ENABLED, {
                                active_tool: b,
                            });
                        }
                        a.setToolIsActive(b, c);
                    }
                    function M() {
                        L(a.CURSOR, !1), L(a.PEN, !1), L(a.CONTROL_TAKEOVER, !1), (a.activeTool = null), (X = null);
                    }
                    function N() {
                        T.sendControlTakeOverRequest(),
                            (a.endUserPermissionAwaiting = !0),
                            (a.endUserDeniedControlTakeOver = !1);
                    }
                    function O(b) {
                        (a.isCollaborativeMode = b), a.setIsCollaborativeMode(a.isCollaborativeMode);
                    }
                    function P() {
                        if (S && S.isToolkitEnabled) {
                            a.enableToolkit(T),
                                (a.isToolkitEnabled = !0),
                                (a.isControlTakeoverEnabled = S.isControlTakeoverEnabled);
                            var b = R();
                            a.handleResize(b);
                        }
                    }
                    function Q() {
                        if (S && S.isToolkitEnabled) {
                            (a.isToolkitEnabled = !1), a.exitCollaborativeMode();
                            var b = R();
                            a.handleResize(-b);
                        }
                    }
                    function R() {
                        return b.find('.support-toolkit').height();
                    }
                    if (!i.isBrowserNotSupported()) {
                        var S,
                            T,
                            U = [p.DOM_SNAPSHOT, p.WINDOW_RESIZE, p.VISIBILITY_CHANGE, p.CONSOLE_ERROR];
                        (a.PLAYER_ONLINE_MODE = o.PLAYER_ONLINE_MODE),
                            (a.isPlaying = !1),
                            (a.timelineValue = 0),
                            (a.arePlayerButtonsEnabled = !0),
                            (a.renderingProgress = 0),
                            (a.url = null),
                            (a.speedOptions = [
                                { label: '0.25x', value: 0.25 },
                                { label: '0.5x', value: 0.5 },
                                { label: 'Normal', value: 1 },
                                { label: '2x', value: 2 },
                                { label: '4x', value: 4 },
                            ]),
                            (a.steps = []);
                        var V = { playerIndex: -1, time: 0 },
                            W = {
                                _onTabHiddenCallback: c.noop,
                                isTabHidden: !1,
                                lastRenderedActivity: V,
                                reset: function() {
                                    (this.isTabHidden = !1), (this.lastRenderedActivity = V);
                                },
                                render: function(b, d) {
                                    var f = this;
                                    b.forEach(function(b) {
                                        window.ss_debug && console.log(d, b),
                                            A(b) || e.fireExecuteEvent(a, b),
                                            (k.isTabVisibilityChange(b) || (k.isTopLevel(b) && k.isSnapshot(b))) &&
                                                (f.isTabHidden = b.data.visibilityState == q.HIDDEN);
                                    }),
                                        (f.lastRenderedActivity = c.last(b)),
                                        a.updateStepsTimeline(f.lastRenderedActivity.playerIndex),
                                        a.updateConsole(f.lastRenderedActivity.playerIndex),
                                        f.isTabHidden && setTimeout(f._onTabHiddenCallback, 0);
                                },
                                onTabHidden: function(a) {
                                    this._onTabHiddenCallback = a;
                                },
                            };
                        W.onTabHidden(function() {
                            W.isTabHidden && a.player.skipToTabShown(a.timelineValue);
                        }),
                            (a.activities = new l()),
                            (a.player = new j(a.activities, W, m)),
                            a.player.onTimeChanged(u),
                            a.player.onBuffering(v),
                            a.player.onRendering(w),
                            a.player.onPlaying(x),
                            a.player.onPaused(y),
                            a.player.onFinished(z),
                            (a.detailsStep = 0),
                            (a.logStep = 0),
                            (a.isStreamingLive = !1),
                            (a.isSimpleUIMode = a.settings.general.uiMode === r.SIMPLE),
                            (a.shouldShowLoadingOverlay = !0),
                            (a.isUserOffline = !1);
                        var X;
                        a.activeTool,
                            (a.endUserPermissionAwaiting = !1),
                            (a.endUserDeniedControlTakeOver = !1),
                            (a.isCollaborativeMode = !1),
                            (a.isConfirmationVisible = !1),
                            (a.CURSOR = s.CURSOR),
                            (a.PEN = s.PEN),
                            (a.CONTROL_TAKEOVER = s.CONTROL_TAKEOVER),
                            (a.settings.playback.speedOption = function(b) {
                                return arguments.length > 0
                                    ? (a.settings.playback.speed = b.value)
                                    : c.find(a.speedOptions, function(b) {
                                          return b.value === a.settings.playback.speed;
                                      });
                            }),
                            a.$watch('initialSettings', function(b) {
                                b && a.api.loadSession(b);
                            }),
                            a.$watch(H, function(b) {
                                b &&
                                    (e.firePlayerIsInitialized(a),
                                    a.hideUserDetailsMask(),
                                    a.hideStepsTimelineMask(),
                                    (a.shouldShowLoadingOverlay = !1),
                                    a.enableTimeline());
                            }),
                            a.$watch(
                                function() {
                                    return a.viewerIsCreated && !!a.session;
                                },
                                function(b) {
                                    b &&
                                        (a.viewerApi.setSessionScreenWidth(a.session.screenWidth),
                                        a.viewerApi.setSessionScreenHeight(a.session.screenHeight),
                                        a.viewerApi.setInitialSettings(a.initialSettings),
                                        e.fireVisualizeClicks(a, a.settings.playback.shouldVisualizeClicks));
                                }
                            ),
                            a.$watch('isTimelineSelectionInProgress', function(b) {
                                H() && b && a.pause();
                            }),
                            a.$watch('timelineSelectedValue', function(b) {
                                H() &&
                                    (window.ss_debug && console.log('jump to', b),
                                    a.player.jumpToTime(b),
                                    G(),
                                    (a.isPlaying = !0),
                                    (a.hasFinished = !1),
                                    a.api.setUserHasGoneOffline(!1));
                            }),
                            a.$watch('settings.playback.shouldSkipProlongedInactivity', function(b) {
                                a.player.changeProlongedInactivitySetting(b, a.timelineValue);
                            }),
                            a.$watch('settings.playback.speed', function(b) {
                                a.player.changeSpeedSetting(b, a.timelineValue);
                            }),
                            a.$watch('settings.playback.shouldPauseOnMarker', function(b) {
                                b && a.pauseActivity
                                    ? a.player.changePauseMarker(a.pauseActivity.time, a.timelineValue)
                                    : a.player.changePauseMarker(null, a.timelineValue);
                            }),
                            a.$watch('settings.playback.shouldVisualizeClicks', function(b) {
                                e.fireVisualizeClicks(a, b);
                            }),
                            (a.togglePlaying = function() {
                                a.isPlaying ? a.pause() : a.play();
                            }),
                            (a.start = function() {
                                window.ss_debug && console.log('firststart activities'),
                                    a.player.jumpToTime(a.startTime),
                                    (a.isStreamingLive = !1),
                                    (a.isPlaying = !0),
                                    (a.hasFinished = !1),
                                    (a.timelineValue = a.startTime),
                                    a.api.setUserHasGoneOffline(!1);
                            }),
                            (a.play = function() {
                                window.ss_debug && console.log('play activities'),
                                    a.player.play(a.timelineValue),
                                    (a.isStreamingLive = !1),
                                    (a.isPlaying = !0),
                                    (a.hasFinished = !1);
                            }),
                            (a.pause = function() {
                                window.ss_debug && console.log('pause activities');
                                var b = a.isStreamingLive;
                                a.player.pause(), G(), (a.isPlaying = !1), (a.hasFinished = b);
                            }),
                            (a.repeat = function() {
                                a.start();
                            }),
                            (a.goLive = function() {
                                window.ss_debug && console.log('go live'),
                                    a.activities.resetLoading(),
                                    a.player.goLive(a.timelineValue),
                                    (a.isStreamingLive = !0),
                                    (a.isPlaying = !0),
                                    (a.hasFinished = !1),
                                    (a.timelineValue = a.timelineMax),
                                    a.stepsTimelineLoaded(),
                                    e.fireStartLiveStreaming(a, c.noop),
                                    P();
                            }),
                            (a.showSessionDetails = function(b) {
                                f.log("Clicked on 'Details'"), a.pause(), d.open(b);
                            }),
                            (a.onSelectedActivity = function(b) {
                                window.ss_debug && console.log('selected activitiy', b),
                                    a.player.jumpToActivity(b),
                                    G(),
                                    (a.isPlaying = !1),
                                    (a.hasFinished = !1),
                                    (a.timelineValue = b.time),
                                    a.updateStepsTimeline(b.playerIndex, !0),
                                    a.selectActivity(b),
                                    a.api.setUserHasGoneOffline(!1);
                            }),
                            (a.userPermissionRequest = {
                                ignore: !0,
                                state: null,
                                isApproved: function() {
                                    return this.ignore || 'approved' === this.state;
                                },
                                send: function() {
                                    'awaiting-response' != this.state &&
                                        ((this.state = 'awaiting-response'), e.fireUserPermissionRequestSend(a));
                                },
                                cancel: function() {
                                    'canceled' != this.state &&
                                        ((this.state = 'canceled'), e.fireUserPermissionRequestCanceled(a));
                                },
                                deny: function() {
                                    'denied-request' != this.state && (this.state = 'denied-request');
                                },
                                approve: function() {
                                    'approved' != this.state && (this.state = 'approved');
                                },
                                interrupt: function() {
                                    'interrupted-request' != this.state && (this.state = 'interrupted-request');
                                },
                                reset: function() {
                                    this.state && (this.state = null);
                                },
                            }),
                            (a.getLiveState = function() {
                                return a.showGoLiveButton
                                    ? a.isStreamingLive
                                        ? 'streaming'
                                        : a.isUserOffline
                                        ? 'offline'
                                        : 'online'
                                    : 'none';
                            }),
                            (a.playUserRecordedSession = function() {
                                a.playRecordedSession();
                            }),
                            (a.api = {
                                loadSession: function(b) {
                                    (a.userPermissionRequest.ignore = !b.shouldWaitUserConfirmation()),
                                        (a.session = b.getSession()),
                                        (a.isLive = b.isLive()),
                                        (a.showGoLiveButton = b.shouldShowGoLiveButton()),
                                        (a.startTime = b.getStartTime()),
                                        (a.pauseActivity = b.getPauseActivity()),
                                        (a.initialSettings = b),
                                        (a.sessionId = a.session.id),
                                        a.pauseActivity &&
                                            a.settings.playback.shouldPauseOnMarker &&
                                            a.player.changePauseMarker(a.pauseActivity.time);
                                },
                                setSessionLength: function(b) {
                                    (a.timelineMax = b), a.activities.setSessionLength(b);
                                },
                                finishLoadingActivities: function() {
                                    a.activities.finishLoading(), a.refreshTimeline(!0, []), a.stepsTimelineLoaded();
                                },
                                addActivities: function(b) {
                                    I(b), a.refreshTimeline(!1, b);
                                },
                                denyStreamingRequest: function() {
                                    a.userPermissionRequest.deny();
                                },
                                interruptStreamingRequest: function() {
                                    a.userPermissionRequest.interrupt();
                                },
                                resetStreamingRequest: function() {
                                    a.userPermissionRequest.reset();
                                },
                                approveStreamingRequest: function() {
                                    a.userPermissionRequest.approve(), this.startLiveStreaming();
                                },
                                startPlayback: function() {
                                    a.start();
                                },
                                startLiveStreaming: function() {
                                    a.isStreamingLive || a.goLive();
                                },
                                stopLiveStreaming: function() {
                                    a.isStreamingLive && a.pause();
                                },
                                setFeatureFlags: function(a) {
                                    S = a;
                                },
                                setBrokerClient: function(b) {
                                    (T = b),
                                        T.onControlTakeOverRequestApproved(function() {
                                            L(X, !0), O(!0), (a.endUserPermissionAwaiting = !1);
                                        }),
                                        T.onControlTakeOverRequestDenied(function() {
                                            (a.endUserPermissionAwaiting = !1), (a.endUserDeniedControlTakeOver = !0);
                                        }),
                                        T.onControlTakeOverRequestStopped(function() {
                                            a.exitCollaborativeMode();
                                        });
                                },
                                setUserHasGoneOffline: function(b) {
                                    b && (a.isUserOffline = !0), a.setIsOffline(b);
                                },
                            }),
                            e.onUserDetailsResize(a, function(b, c) {
                                a.handleUserDetailsResize(c);
                            }),
                            e.onConsoleResize(a, function(b, c) {
                                a.handleResize(c);
                            }),
                            e.onOpenConsole(a, function(b, c) {
                                a.openConsole(c);
                            }),
                            (a.toggleConsole = function() {
                                a.isConsoleExpanded ? a.closeConsole() : (K(), a.openConsole(null));
                            }),
                            (a.updateUrl = function(b) {
                                J(b) || (a.url = b);
                            }),
                            (a.toggleTool = function(b) {
                                if (
                                    b !== a.CONTROL_TAKEOVER ||
                                    X !== a.CONTROL_TAKEOVER ||
                                    !a.endUserPermissionAwaiting
                                ) {
                                    if (a.isCollaborativeMode) {
                                        var c = b !== a.activeTool;
                                        if ((M(), !c)) return;
                                        b !== a.CONTROL_TAKEOVER
                                            ? (L(b, !0), (a.endUserPermissionAwaiting = !1))
                                            : ((X = b), N());
                                    } else (X = b), (a.isConfirmationVisible = !0), (a.endUserPermissionAwaiting = !1);
                                    a.endUserDeniedControlTakeOver = !1;
                                }
                            }),
                            (a.exitCollaborativeMode = function() {
                                M(), O(!1), (a.isConfirmationVisible = !1);
                            }),
                            (a.goToCollaborativeMode = function() {
                                (a.isConfirmationVisible = !1), X !== a.CONTROL_TAKEOVER ? (L(X, !0), O(!0)) : N();
                            }),
                            (a.cancelCollaborativeConfirmation = function() {
                                (a.isConfirmationVisible = !1), (X = null);
                            });
                    }
                },
            };
        },
    ]);
