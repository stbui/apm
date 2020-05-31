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
        function (
            $interval,
            $timeout,
            lodash,
            sessionDetailsModal,
            player,
            sessionstackManager,
            analytics,
            auth,
            utils,
            Player,
            Activity,
            Activities,
            PLAYER_CONFIG,
            ANALYTICS_EVENT_TYPES,
            BUILD_ENV,
            EVENT_TYPE,
            TAB_VISIBILITY,
            UI_MODE,
            SUPPORT_TOOLS
        ) {
            return {
                restrict: 'E',
                replace: true,
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
                link: function (a, b, t) {
                    function onTimeChanged(timelineValue) {
                        a.$apply(function () {
                            a.timelineValue = timelineValue;
                        });
                    }
                    function onBuffering() {
                        // window.ss_debug && console.log('show buffering');
                        a.arePlayerButtonsEnabled = false;
                        a.disableStepsTimeline();
                        player.fireHideViewerOverlay(a);
                        player.fireShowBuffering(a);
                    }
                    function onRendering() {
                        // window.ss_debug && console.log('show rendering');
                        player.fireDetach(a);
                        onBuffering();
                    }
                    function onPlaying() {
                        // window.ss_debug && console.log('hide overlays');
                        a.arePlayerButtonsEnabled = true;
                        a.enableStepsTimeline();
                        player.fireHideViewerOverlay(a);
                        player.fireHideBuffering(a);
                        player.fireAttach(a);
                    }
                    function onPaused() {
                        // window.ss_debug && console.log('paused');
                        a.hasFinished = false;
                        a.isPlaying = false;
                        a.arePlayerButtonsEnabled = true;
                        a.enableStepsTimeline();
                        player.fireHideViewerOverlay(a);
                        player.fireHideBuffering(a);
                        player.fireAttach(a);
                    }
                    function onFinished() {
                        // window.ss_debug && console.log('finished');
                        a.hasFinished = true;
                        a.isPlaying = false;
                        a.arePlayerButtonsEnabled = true;
                        a.enableStepsTimeline();
                        player.fireHideViewerOverlay(a);
                        player.fireHideBuffering(a);
                        player.fireAttach(a);
                    }
                    function A(a) {
                        return (
                            [
                                EVENT_TYPE.CONSOLE_ERROR,
                                EVENT_TYPE.CONSOLE_WARN,
                                EVENT_TYPE.CONSOLE_DEBUG,
                                EVENT_TYPE.CONSOLE_LOG,
                            ].indexOf(a.type) > -1
                        );
                    }
                    function B(a) {
                        return a.type === EVENT_TYPE.NETWORK_REQUEST;
                    }
                    function C(a) {
                        if (!a.data) return false;
                        var b = 0 === a.time && 0 === a.index && a.type === EVENT_TYPE.DOM_SNAPSHOT;
                        if (b) return false;
                        var c = a.type === EVENT_TYPE.MOUSE_CLICK,
                            d = !!a.data.frameElementId,
                            e = !!a.data.hostElementId,
                            f = !d && !e,
                            g = f && U.indexOf(a.type) >= 0;
                        return (c && !e) || g;
                    }
                    function D(a) {
                        var b = {};
                        b[EVENT_TYPE.CONSOLE_LOG] = 'info';
                        b[EVENT_TYPE.CONSOLE_ERROR] = 'error';
                        b[EVENT_TYPE.CONSOLE_WARN] = 'warn';
                        b[EVENT_TYPE.CONSOLE_DEBUG] = 'debug';
                        var c: any = { id: a.id, level: b[a.type] };
                        if ('exception' === a.data.type) {
                            var d = a.data.exception;
                            c.message = d.type ? d.type + ': ' : '';
                            c.message += d.message;
                            c.isMessageTrimmed = false;
                            c.stackFrames = (d.stackFrames || []).map(function (a) {
                                return a.source || '';
                            });
                        } else {
                            var e = a.data;
                            c.message = e.message;
                            c.isMessageTrimmed = e.isMessageTrimmed;
                            c.stackFrames = null;
                        }
                        return c;
                    }
                    function E(a) {
                        var b = a.data;
                        switch (a.type) {
                            case EVENT_TYPE.CONSOLE_LOG:
                                return D(a);
                            case EVENT_TYPE.CONSOLE_ERROR:
                                return D(a);
                            case EVENT_TYPE.CONSOLE_WARN:
                                return D(a);
                            case EVENT_TYPE.CONSOLE_DEBUG:
                                return D(a);
                            case EVENT_TYPE.MOUSE_CLICK:
                                return {
                                    top: b.y,
                                    left: b.x,
                                    absoluteTop: b.pageY,
                                    absoluteLeft: b.pageX,
                                    selector: b.selector,
                                };
                            case EVENT_TYPE.DOM_SNAPSHOT:
                                return { pageUrl: b.pageUrl };
                            case EVENT_TYPE.WINDOW_RESIZE:
                                return { width: b.width, height: b.height };
                            case EVENT_TYPE.VISIBILITY_CHANGE:
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
                        a.isStreamingLive && ((a.isStreamingLive = false), Q(), player.fireStopLiveStreaming(a));
                    }
                    function H() {
                        return a.viewerIsCreated && a.timelineIsCreated && a.stepsTimelineIsCreated && !!a.session;
                    }
                    function I(b) {
                        a.activities.push(b);
                        var c = [],
                            d = [],
                            e = [];
                        b.forEach(function (a) {
                            var b: any = {
                                time: a.time,
                                activityIndex: a.playerIndex,
                                playerIndex: a.playerIndex,
                                type: a.type,
                                isLog: A(a),
                            };
                            C(a) && ((b.details = E(a)), c.push(b));
                            A(a) && ((b.details = D(a)), d.push(b));
                            B(a) && ((b.details = F(a)), e.push(b));
                        });
                        a.addNewSteps(c);
                        a.addNewLogs(d);
                        a.addNewNetworkRequests(e);
                    }
                    function J(url) {
                        return 'about:blank' === url || url.indexOf('undefined') > -1;
                    }
                    function K() {
                        if (auth.isCurrentUserLoaded()) {
                            var a = auth.getCurrentUser(),
                                b = { opened_from: 'timeline_controls' };
                            analytics.trackEvent(a.id, ANALYTICS_EVENT_TYPES.CONSOLE_OPENED, b);
                            sessionstackManager.log('Console opened from time line controls');
                        }
                    }
                    function L(b, c) {
                        if (c && ((a.activeTool = b), auth.isCurrentUserLoaded())) {
                            var d = auth.getCurrentUser();
                            analytics.trackEvent(d.id, ANALYTICS_EVENT_TYPES.SUPPORT_TOOLKIT_ENABLED, {
                                active_tool: b,
                            });
                        }
                        a.setToolIsActive(b, c);
                    }
                    function M() {
                        L(a.CURSOR, false);
                        L(a.PEN, false);
                        L(a.CONTROL_TAKEOVER, false);
                        a.activeTool = null;
                        X = null;
                    }
                    function N() {
                        brokerClient.sendControlTakeOverRequest();
                        a.endUserPermissionAwaiting = true;
                        a.endUserDeniedControlTakeOver = false;
                    }
                    function O(isCollaborativeMode: boolean) {
                        a.isCollaborativeMode = isCollaborativeMode;
                        a.setIsCollaborativeMode(a.isCollaborativeMode);
                    }
                    function P() {
                        if (S && S.isToolkitEnabled) {
                            a.enableToolkit(brokerClient);
                            a.isToolkitEnabled = true;
                            a.isControlTakeoverEnabled = S.isControlTakeoverEnabled;
                            var b = R();
                            a.handleResize(b);
                        }
                    }
                    function Q() {
                        if (S && S.isToolkitEnabled) {
                            a.isToolkitEnabled = false;
                            a.exitCollaborativeMode();
                            var b = R();
                            a.handleResize(-b);
                        }
                    }
                    function R() {
                        return b.find('.support-toolkit').height();
                    }
                    if (!utils.isBrowserNotSupported()) {
                        var S,
                            brokerClient,
                            U = [
                                EVENT_TYPE.DOM_SNAPSHOT,
                                EVENT_TYPE.WINDOW_RESIZE,
                                EVENT_TYPE.VISIBILITY_CHANGE,
                                EVENT_TYPE.CONSOLE_ERROR,
                            ];
                        a.PLAYER_ONLINE_MODE = BUILD_ENV.PLAYER_ONLINE_MODE;
                        a.isPlaying = false;
                        a.timelineValue = 0;
                        a.arePlayerButtonsEnabled = true;
                        a.renderingProgress = 0;
                        a.url = null;
                        a.speedOptions = [
                            { label: '0.25x', value: 0.25 },
                            { label: '0.5x', value: 0.5 },
                            { label: 'Normal', value: 1 },
                            { label: '2x', value: 2 },
                            { label: '4x', value: 4 },
                        ];
                        a.steps = [];
                        var lastRenderedActivity = { playerIndex: -1, time: 0 },
                            render = {
                                _onTabHiddenCallback: lodash.noop,
                                isTabHidden: false,
                                lastRenderedActivity: lastRenderedActivity,
                                reset: function () {
                                    this.isTabHidden = false;
                                    this.lastRenderedActivity = lastRenderedActivity;
                                },
                                render: function (b, d) {
                                    var f = this;
                                    b.forEach(function (b) {
                                        // window.ss_debug && console.log(d, b);
                                        A(b) || player.fireExecuteEvent(a, b);
                                        (Activity.isTabVisibilityChange(b) ||
                                            (Activity.isTopLevel(b) && Activity.isSnapshot(b))) &&
                                            (f.isTabHidden = b.data.visibilityState == TAB_VISIBILITY.HIDDEN);
                                    });
                                    this.lastRenderedActivity = lodash.last(b);
                                    a.updateStepsTimeline(f.lastRenderedActivity.playerIndex);
                                    a.updateConsole(f.lastRenderedActivity.playerIndex);
                                    this.isTabHidden && setTimeout(f._onTabHiddenCallback, 0);
                                },
                                onTabHidden: function (callback) {
                                    this._onTabHiddenCallback = callback;
                                },
                            };
                        render.onTabHidden(function () {
                            render.isTabHidden && a.player.skipToTabShown(a.timelineValue);
                        });
                        a.activities = new Activities();
                        a.player = new Player(a.activities, render, PLAYER_CONFIG);
                        a.player.onTimeChanged(onTimeChanged);
                        a.player.onBuffering(onBuffering);
                        a.player.onRendering(onRendering);
                        a.player.onPlaying(onPlaying);
                        a.player.onPaused(onPaused);
                        a.player.onFinished(onFinished);
                        a.detailsStep = 0;
                        a.logStep = 0;
                        a.isStreamingLive = false;
                        a.isSimpleUIMode = a.settings.general.uiMode === UI_MODE.SIMPLE;
                        a.shouldShowLoadingOverlay = true;
                        a.isUserOffline = false;
                        var X;
                        a.activeTool;
                        a.endUserPermissionAwaiting = false;
                        a.endUserDeniedControlTakeOver = false;
                        a.isCollaborativeMode = false;
                        a.isConfirmationVisible = false;
                        a.CURSOR = SUPPORT_TOOLS.CURSOR;
                        a.PEN = SUPPORT_TOOLS.PEN;
                        a.CONTROL_TAKEOVER = SUPPORT_TOOLS.CONTROL_TAKEOVER;
                        a.settings.playback.speedOption = function (b) {
                            return arguments.length > 0
                                ? (a.settings.playback.speed = b.value)
                                : lodash.find(a.speedOptions, function (b) {
                                      return b.value === a.settings.playback.speed;
                                  });
                        };
                        a.$watch('initialSettings', function (b) {
                            b && a.api.loadSession(b);
                        });
                        a.$watch(H, function (b) {
                            b &&
                                (player.firePlayerIsInitialized(a),
                                a.hideUserDetailsMask(),
                                a.hideStepsTimelineMask(),
                                (a.shouldShowLoadingOverlay = false),
                                a.enableTimeline());
                        });
                        a.$watch(
                            function () {
                                return a.viewerIsCreated && !!a.session;
                            },
                            function (b) {
                                b &&
                                    (a.viewerApi.setSessionScreenWidth(a.session.screenWidth),
                                    a.viewerApi.setSessionScreenHeight(a.session.screenHeight),
                                    a.viewerApi.setInitialSettings(a.initialSettings),
                                    player.fireVisualizeClicks(a, a.settings.playback.shouldVisualizeClicks));
                            }
                        );
                        a.$watch('isTimelineSelectionInProgress', function (b) {
                            H() && b && a.pause();
                        });
                        a.$watch('timelineSelectedValue', function (timelineSelectedValue) {
                            if (H()) {
                                // window.ss_debug && console.log('jump to', b);
                                a.player.jumpToTime(timelineSelectedValue);
                                G();
                                a.isPlaying = true;
                                a.hasFinished = false;
                                a.api.setUserHasGoneOffline(false);
                            }

                            // H() &&
                            //     (window.ss_debug && console.log('jump to', b),
                            //     a.player.jumpToTime(b),
                            //     G(),
                            //     (a.isPlaying = true),
                            //     (a.hasFinished = false),
                            //     a.api.setUserHasGoneOffline(false));
                        });
                        a.$watch('settings.playback.shouldSkipProlongedInactivity', function (
                            shouldSkipProlongedInactivity: boolean
                        ) {
                            a.player.changeProlongedInactivitySetting(shouldSkipProlongedInactivity, a.timelineValue);
                        });
                        a.$watch('settings.playback.speed', function (speed: number) {
                            a.player.changeSpeedSetting(speed, a.timelineValue);
                        });
                        a.$watch('settings.playback.shouldPauseOnMarker', function (shouldPauseOnMarker) {
                            shouldPauseOnMarker && a.pauseActivity
                                ? a.player.changePauseMarker(a.pauseActivity.time, a.timelineValue)
                                : a.player.changePauseMarker(null, a.timelineValue);
                        });
                        a.$watch('settings.playback.shouldVisualizeClicks', function (shouldVisualizeClicks) {
                            player.fireVisualizeClicks(a, shouldVisualizeClicks);
                        });
                        a.togglePlaying = function () {
                            a.isPlaying ? a.pause() : a.play();
                        };
                        a.start = function () {
                            // window.ss_debug && console.log('firststart activities');
                            a.player.jumpToTime(a.startTime);
                            a.isStreamingLive = false;
                            a.isPlaying = true;
                            a.hasFinished = false;
                            a.timelineValue = a.startTime;
                            a.api.setUserHasGoneOffline(false);
                        };
                        a.play = function () {
                            // window.ss_debug && console.log('play activities');
                            a.player.play(a.timelineValue);
                            a.isStreamingLive = false;
                            a.isPlaying = true;
                            a.hasFinished = false;
                        };
                        a.pause = function () {
                            // window.ss_debug && console.log('pause activities');
                            var isStreamingLive = a.isStreamingLive;
                            a.player.pause();
                            G();
                            a.isPlaying = false;
                            a.hasFinished = isStreamingLive;
                        };
                        a.repeat = function () {
                            a.start();
                        };
                        a.goLive = function () {
                            // window.ss_debug && console.log('go live');
                            a.activities.resetLoading();
                            a.player.goLive(a.timelineValue);
                            a.isStreamingLive = true;
                            a.isPlaying = true;
                            a.hasFinished = false;
                            a.timelineValue = a.timelineMax;
                            a.stepsTimelineLoaded();
                            player.fireStartLiveStreaming(a, lodash.noop);
                            P();
                        };
                        a.showSessionDetails = function (b) {
                            sessionstackManager.log("Clicked on 'Details'");
                            a.pause();
                            sessionDetailsModal.open(b);
                        };
                        a.onSelectedActivity = function (b) {
                            // window.ss_debug && console.log('selected activitiy', b);
                            a.player.jumpToActivity(b);
                            G();
                            a.isPlaying = false;
                            a.hasFinished = false;
                            a.timelineValue = b.time;
                            a.updateStepsTimeline(b.playerIndex, true);
                            a.selectActivity(b);
                            a.api.setUserHasGoneOffline(false);
                        };
                        a.userPermissionRequest = {
                            ignore: true,
                            state: null,
                            isApproved: function () {
                                return this.ignore || 'approved' === this.state;
                            },
                            send: function () {
                                'awaiting-response' != this.state &&
                                    ((this.state = 'awaiting-response'), player.fireUserPermissionRequestSend(a));
                            },
                            cancel: function () {
                                'canceled' != this.state &&
                                    ((this.state = 'canceled'), player.fireUserPermissionRequestCanceled(a));
                            },
                            deny: function () {
                                'denied-request' != this.state && (this.state = 'denied-request');
                            },
                            approve: function () {
                                'approved' != this.state && (this.state = 'approved');
                            },
                            interrupt: function () {
                                'interrupted-request' != this.state && (this.state = 'interrupted-request');
                            },
                            reset: function () {
                                this.state && (this.state = null);
                            },
                        };
                        a.getLiveState = function () {
                            return a.showGoLiveButton
                                ? a.isStreamingLive
                                    ? 'streaming'
                                    : a.isUserOffline
                                    ? 'offline'
                                    : 'online'
                                : 'none';
                        };
                        a.playUserRecordedSession = function () {
                            a.playRecordedSession();
                        };
                        a.api = {
                            loadSession: function (b) {
                                a.userPermissionRequest.ignore = !b.shouldWaitUserConfirmation();
                                a.session = b.getSession();
                                a.isLive = b.isLive();
                                a.showGoLiveButton = b.shouldShowGoLiveButton();
                                a.startTime = b.getStartTime();
                                a.pauseActivity = b.getPauseActivity();
                                a.initialSettings = b;
                                a.sessionId = a.session.id;
                                a.pauseActivity &&
                                    a.settings.playback.shouldPauseOnMarker &&
                                    a.player.changePauseMarker(a.pauseActivity.time);
                            },
                            setSessionLength: function (timelineMax) {
                                a.timelineMax = timelineMax;
                                a.activities.setSessionLength(timelineMax);
                            },
                            finishLoadingActivities: function () {
                                a.activities.finishLoading();
                                a.refreshTimeline(true, []);
                                a.stepsTimelineLoaded();
                            },
                            addActivities: function (b) {
                                I(b);
                                a.refreshTimeline(false, b);
                            },
                            denyStreamingRequest: function () {
                                a.userPermissionRequest.deny();
                            },
                            interruptStreamingRequest: function () {
                                a.userPermissionRequest.interrupt();
                            },
                            resetStreamingRequest: function () {
                                a.userPermissionRequest.reset();
                            },
                            approveStreamingRequest: function () {
                                a.userPermissionRequest.approve();
                                this.startLiveStreaming();
                            },
                            startPlayback: function () {
                                a.start();
                            },
                            startLiveStreaming: function () {
                                a.isStreamingLive || a.goLive();
                            },
                            stopLiveStreaming: function () {
                                a.isStreamingLive && a.pause();
                            },
                            setFeatureFlags: function (a) {
                                S = a;
                            },
                            setBrokerClient: function (client) {
                                brokerClient = client;
                                brokerClient.onControlTakeOverRequestApproved(function () {
                                    L(X, true);
                                    O(true);
                                    a.endUserPermissionAwaiting = false;
                                });
                                brokerClient.onControlTakeOverRequestDenied(function () {
                                    a.endUserPermissionAwaiting = false;
                                    a.endUserDeniedControlTakeOver = true;
                                });
                                brokerClient.onControlTakeOverRequestStopped(function () {
                                    a.exitCollaborativeMode();
                                });
                            },
                            setUserHasGoneOffline: function (b) {
                                b && (a.isUserOffline = true), a.setIsOffline(b);
                            },
                        };
                        player.onUserDetailsResize(a, function (b, c) {
                            a.handleUserDetailsResize(c);
                        });
                        player.onConsoleResize(a, function (b, c) {
                            a.handleResize(c);
                        });
                        player.onOpenConsole(a, function (b, c) {
                            a.openConsole(c);
                        });
                        a.toggleConsole = function () {
                            a.isConsoleExpanded ? a.closeConsole() : (K(), a.openConsole(null));
                        };
                        a.updateUrl = function (url) {
                            J(url) || (a.url = url);
                        };
                        a.toggleTool = function (b) {
                            if (b !== a.CONTROL_TAKEOVER || X !== a.CONTROL_TAKEOVER || !a.endUserPermissionAwaiting) {
                                if (a.isCollaborativeMode) {
                                    var c = b !== a.activeTool;
                                    if ((M(), !c)) return;
                                    b !== a.CONTROL_TAKEOVER
                                        ? (L(b, true), (a.endUserPermissionAwaiting = false))
                                        : ((X = b), N());
                                } else (X = b), (a.isConfirmationVisible = true), (a.endUserPermissionAwaiting = false);
                                a.endUserDeniedControlTakeOver = false;
                            }
                        };
                        a.exitCollaborativeMode = function () {
                            M();
                            O(false);
                            a.isConfirmationVisible = false;
                        };
                        a.goToCollaborativeMode = function () {
                            a.isConfirmationVisible = false;
                            X !== a.CONTROL_TAKEOVER ? (L(X, true), O(true)) : N();
                        };
                        a.cancelCollaborativeConfirmation = function () {
                            a.isConfirmationVisible = false;
                            X = null;
                        };
                    }
                },
            };
        },
    ]);
