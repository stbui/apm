import lodash from 'lodash';
import {
    utils,
    auth,
    sessionstackManager,
    analytics,
    BUILD_ENV,
    ANALYTICS_EVENT_TYPES,
    sessionDetailsModal,
} from './common';
import { SUPPORT_TOOLS, TAB_VISIBILITY, EVENT_TYPE } from './constant';
import { Activities } from './Activities';
import { Player, player } from './player';
import { Activity } from './Activity';

const PLAYER_CONFIG = {
    MAX_INACTIVITY_TIME: 3e3,
    EVENTS_BATCH_SIZE: 250,
    EVENTS_BATCH_WAIT_TIME: 0,
    TAB_HIDDEN_MESSAGE_TIME: 1e3,
    GO_LIVE_DELAY_TIME: 1500,
    LAG_TIME: 500,
    MILLISECONDS_PER_FRAME: 33,
};

const UI_MODE = { SIMPLE: 'simple' };

interface IScope {
    activities: Activities;
    player: Player;
    hasFinished: boolean;
    isPlaying: boolean;
    arePlayerButtonsEnabled: boolean;
    timelineValue: number;
    renderingProgress: number;
    endUserPermissionAwaiting: boolean;
    endUserDeniedControlTakeOver: boolean;
    isCollaborativeMode: boolean;
    isToolkitEnabled: boolean;
    isControlTakeoverEnabled: boolean;
    steps: any[];
    detailsStep: number;
    logStep: number;
    isStreamingLive: boolean;
    viewerIsCreated: boolean;
    timelineIsCreated: boolean;
    stepsTimelineIsCreated: boolean;
    shouldShowLoadingOverlay: boolean;
    isUserOffline: boolean;
    isConfirmationVisible: boolean;
    timelineMax: number;
    showGoLiveButton: boolean;
    userPermissionRequest: object;
    settings: object;
    viewerApi: object;
    api: object;
    speedOptions: object;
    isLive: boolean;
    startTime: number;
    pauseActivity: any;
    initialSettings: any;
    sessionId: number;
    url: string | null;
    session: any;
    isSimpleUIMode: any;
    activeTool: any;
    PLAYER_ONLINE_MODE: any;
    [key: string]: any;
}

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
        'auth',
        'utils',
        'Player',
        'Activity',
        'Activities',
        'ANALYTICS_EVENT_TYPES',
        'BUILD_ENV',
        'EVENT_TYPE',
        function($interval, $timeout) {
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
                link: function($scope: IScope, $element, t) {
                    function onTimeChanged(timelineValue) {
                        $scope.$apply(function() {
                            $scope.timelineValue = timelineValue;
                        });
                    }
                    function onBuffering() {
                        // window.ss_debug && console.log('show buffering');
                        $scope.arePlayerButtonsEnabled = false;
                        $scope.disableStepsTimeline();
                        player.fireHideViewerOverlay($scope);
                        player.fireShowBuffering($scope);
                    }
                    function onRendering() {
                        // window.ss_debug && console.log('show rendering');
                        player.fireDetach($scope);
                        onBuffering();
                    }
                    function onPlaying() {
                        // window.ss_debug && console.log('hide overlays');
                        $scope.arePlayerButtonsEnabled = true;
                        $scope.enableStepsTimeline();
                        player.fireHideViewerOverlay($scope);
                        player.fireHideBuffering($scope);
                        player.fireAttach($scope);
                    }
                    function onPaused() {
                        // window.ss_debug && console.log('paused');
                        $scope.hasFinished = false;
                        $scope.isPlaying = false;
                        $scope.arePlayerButtonsEnabled = true;
                        $scope.enableStepsTimeline();
                        player.fireHideViewerOverlay($scope);
                        player.fireHideBuffering($scope);
                        player.fireAttach($scope);
                    }
                    function onFinished() {
                        // window.ss_debug && console.log('finished');
                        $scope.hasFinished = true;
                        $scope.isPlaying = false;
                        $scope.arePlayerButtonsEnabled = true;
                        $scope.enableStepsTimeline();
                        player.fireHideViewerOverlay($scope);
                        player.fireHideBuffering($scope);
                        player.fireAttach($scope);
                    }
                    function A(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'dom_snapshot';
                    }) {
                        return (
                            [
                                EVENT_TYPE.CONSOLE_ERROR,
                                EVENT_TYPE.CONSOLE_WARN,
                                EVENT_TYPE.CONSOLE_DEBUG,
                                EVENT_TYPE.CONSOLE_LOG,
                            ].indexOf(a.type) > -1
                        );
                    }
                    function B(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'dom_snapshot';
                    }) {
                        return a.type === EVENT_TYPE.NETWORK_REQUEST;
                    }
                    function C(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'dom_snapshot';
                    }) {
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
                    // data= object
                    // extension: null
                    // isMessageTrimmed: false
                    // isTrimmed: false
                    // level: "warn"
                    // message: "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.↵↵* Move data fetching code or side effects to componentDidUpdate.↵* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state↵* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.↵↵Please update the following components: %s"
                    // type: "string"
                    function D(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'console_warn';
                    }) {
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
                            c.stackFrames = (d.stackFrames || []).map(function(a) {
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
                    function E(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'dom_snapshot';
                    }) {
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
                    function F(a: {
                        data: object;
                        index: number;
                        playerIndex: number;
                        time: number;
                        timestamp: number;
                        type: 'dom_snapshot';
                    }) {
                        return {
                            message: a.data.message,
                            level: a.data.level,
                            request: a.data,
                        };
                    }
                    function G() {
                        if ($scope.isStreamingLive) {
                            $scope.isStreamingLive = false;
                            Q();
                            player.fireStopLiveStreaming($scope);
                        }
                    }
                    function H() {
                        return (
                            $scope.viewerIsCreated &&
                            $scope.timelineIsCreated &&
                            $scope.stepsTimelineIsCreated &&
                            !!$scope.session
                        );
                    }
                    function I(activities) {
                        $scope.activities.push(activities);
                        var c: any = [],
                            d: any = [],
                            e: any = [];

                        activities.forEach(function(a) {
                            var b: any = {
                                time: a.time,
                                activityIndex: a.playerIndex,
                                playerIndex: a.playerIndex,
                                type: a.type,
                                isLog: A(a),
                            };

                            if (C(a)) {
                                b.details = E(a);
                                c.push(b);
                            }

                            if (A(a)) {
                                b.details = D(a);
                                d.push(b);
                            }

                            if (B(a)) {
                                b.details = F(a);
                                e.push(b);
                            }
                        });

                        $scope.addNewSteps(c);
                        $scope.addNewLogs(d);
                        $scope.addNewNetworkRequests(e);
                    }
                    function J(url) {
                        return 'about:blank' === url || url.indexOf('undefined') > -1;
                    }
                    function K() {
                        if (auth.isCurrentUserLoaded()) {
                            var currentUser = auth.getCurrentUser(),
                                b = { opened_from: 'timeline_controls' };

                            analytics.trackEvent(currentUser.id, ANALYTICS_EVENT_TYPES.CONSOLE_OPENED, b);
                            sessionstackManager.log('Console opened from time line controls');
                        }
                    }
                    function L(activeTool: string, status: boolean) {
                        if (status && (($scope.activeTool = activeTool), auth.isCurrentUserLoaded())) {
                            var currentUser = auth.getCurrentUser();

                            analytics.trackEvent(currentUser.id, ANALYTICS_EVENT_TYPES.SUPPORT_TOOLKIT_ENABLED, {
                                active_tool: activeTool,
                            });
                        }

                        $scope.setToolIsActive(activeTool, status);
                    }
                    function M() {
                        L($scope.CURSOR, false);
                        L($scope.PEN, false);
                        L($scope.CONTROL_TAKEOVER, false);
                        $scope.activeTool = null;
                        X = null;
                    }
                    function N() {
                        brokerClient.sendControlTakeOverRequest();
                        $scope.endUserPermissionAwaiting = true;
                        $scope.endUserDeniedControlTakeOver = false;
                    }
                    function O(isCollaborativeMode: boolean) {
                        $scope.isCollaborativeMode = isCollaborativeMode;
                        $scope.setIsCollaborativeMode($scope.isCollaborativeMode);
                    }
                    function P() {
                        if (S && S.isToolkitEnabled) {
                            $scope.enableToolkit(brokerClient);
                            $scope.isToolkitEnabled = true;
                            $scope.isControlTakeoverEnabled = S.isControlTakeoverEnabled;
                            var height = toolkitFromHeight();
                            $scope.handleResize(height);
                        }
                    }
                    function Q() {
                        if (S && S.isToolkitEnabled) {
                            $scope.isToolkitEnabled = false;
                            $scope.exitCollaborativeMode();
                            var height = toolkitFromHeight();
                            $scope.handleResize(-height);
                        }
                    }
                    function toolkitFromHeight() {
                        return $element.find('.support-toolkit').height();
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
                        $scope.PLAYER_ONLINE_MODE = BUILD_ENV.PLAYER_ONLINE_MODE;
                        $scope.isPlaying = false;
                        $scope.timelineValue = 0;
                        $scope.arePlayerButtonsEnabled = true;
                        $scope.renderingProgress = 0;
                        $scope.url = null;
                        $scope.speedOptions = [
                            { label: '0.25x', value: 0.25 },
                            { label: '0.5x', value: 0.5 },
                            { label: 'Normal', value: 1 },
                            { label: '2x', value: 2 },
                            { label: '4x', value: 4 },
                        ];
                        $scope.steps = [];
                        var lastRenderedActivity = { playerIndex: -1, time: 0 };

                        var render = {
                            _onTabHiddenCallback: lodash.noop,
                            isTabHidden: false,
                            lastRenderedActivity: lastRenderedActivity,
                            reset: function() {
                                this.isTabHidden = false;
                                this.lastRenderedActivity = lastRenderedActivity;
                            },
                            render: function(activities, d) {
                                var f = this;
                                activities.forEach(function(b) {
                                    // window.ss_debug && console.log(d, b);
                                    A(b) || player.fireExecuteEvent($scope, b);

                                    if (
                                        Activity.isTabVisibilityChange(b) ||
                                        (Activity.isTopLevel(b) && Activity.isSnapshot(b))
                                    ) {
                                        f.isTabHidden = b.data.visibilityState == TAB_VISIBILITY.HIDDEN;
                                    }
                                });

                                this.lastRenderedActivity = lodash.last(activities);
                                $scope.updateStepsTimeline(f.lastRenderedActivity.playerIndex);
                                $scope.updateConsole(f.lastRenderedActivity.playerIndex);
                                this.isTabHidden && setTimeout(f._onTabHiddenCallback, 0);
                            },
                            onTabHidden: function(callback) {
                                this._onTabHiddenCallback = callback;
                            },
                        };

                        render.onTabHidden(function() {
                            render.isTabHidden && $scope.player.skipToTabShown($scope.timelineValue);
                        });

                        $scope.activities = new Activities();
                        $scope.player = new Player($scope.activities, render, PLAYER_CONFIG);
                        $scope.player.onTimeChanged(onTimeChanged);
                        $scope.player.onBuffering(onBuffering);
                        $scope.player.onRendering(onRendering);
                        $scope.player.onPlaying(onPlaying);
                        $scope.player.onPaused(onPaused);
                        $scope.player.onFinished(onFinished);
                        $scope.detailsStep = 0;
                        $scope.logStep = 0;
                        $scope.isStreamingLive = false;
                        $scope.isSimpleUIMode = $scope.settings.general.uiMode === UI_MODE.SIMPLE;
                        $scope.shouldShowLoadingOverlay = true;
                        $scope.isUserOffline = false;
                        var X;
                        $scope.activeTool;
                        $scope.endUserPermissionAwaiting = false;
                        $scope.endUserDeniedControlTakeOver = false;
                        $scope.isCollaborativeMode = false;
                        $scope.isConfirmationVisible = false;
                        $scope.CURSOR = SUPPORT_TOOLS.CURSOR;
                        $scope.PEN = SUPPORT_TOOLS.PEN;
                        $scope.CONTROL_TAKEOVER = SUPPORT_TOOLS.CONTROL_TAKEOVER;
                        $scope.settings.playback.speedOption = function(b) {
                            return arguments.length > 0
                                ? ($scope.settings.playback.speed = b.value)
                                : lodash.find($scope.speedOptions, function(b) {
                                      return b.value === $scope.settings.playback.speed;
                                  });
                        };
                        $scope.$watch('initialSettings', function(b) {
                            b && $scope.api.loadSession(b);
                        });
                        $scope.$watch(H, function(b) {
                            b &&
                                (player.firePlayerIsInitialized($scope),
                                $scope.hideUserDetailsMask(),
                                $scope.hideStepsTimelineMask(),
                                ($scope.shouldShowLoadingOverlay = false),
                                $scope.enableTimeline());
                        });
                        $scope.$watch(
                            function() {
                                return $scope.viewerIsCreated && !!$scope.session;
                            },
                            function(b) {
                                b &&
                                    ($scope.viewerApi.setSessionScreenWidth($scope.session.screenWidth),
                                    $scope.viewerApi.setSessionScreenHeight($scope.session.screenHeight),
                                    $scope.viewerApi.setInitialSettings($scope.initialSettings),
                                    player.fireVisualizeClicks($scope, $scope.settings.playback.shouldVisualizeClicks));
                            }
                        );
                        $scope.$watch('isTimelineSelectionInProgress', function(b) {
                            H() && b && $scope.pause();
                        });
                        $scope.$watch('timelineSelectedValue', function(timelineSelectedValue) {
                            if (H()) {
                                // window.ss_debug && console.log('jump to', b);
                                $scope.player.jumpToTime(timelineSelectedValue);
                                G();
                                $scope.isPlaying = true;
                                $scope.hasFinished = false;
                                $scope.api.setUserHasGoneOffline(false);
                            }
                        });
                        $scope.$watch('settings.playback.shouldSkipProlongedInactivity', function(
                            shouldSkipProlongedInactivity: boolean
                        ) {
                            $scope.player.changeProlongedInactivitySetting(
                                shouldSkipProlongedInactivity,
                                $scope.timelineValue
                            );
                        });
                        $scope.$watch('settings.playback.speed', function(speed: number) {
                            $scope.player.changeSpeedSetting(speed, $scope.timelineValue);
                        });
                        $scope.$watch('settings.playback.shouldPauseOnMarker', function(shouldPauseOnMarker) {
                            shouldPauseOnMarker && $scope.pauseActivity
                                ? $scope.player.changePauseMarker($scope.pauseActivity.time, $scope.timelineValue)
                                : $scope.player.changePauseMarker(null, $scope.timelineValue);
                        });
                        $scope.$watch('settings.playback.shouldVisualizeClicks', function(shouldVisualizeClicks) {
                            player.fireVisualizeClicks($scope, shouldVisualizeClicks);
                        });
                        $scope.togglePlaying = function() {
                            $scope.isPlaying ? $scope.pause() : $scope.play();
                        };
                        $scope.start = function() {
                            // window.ss_debug && console.log('firststart activities');
                            $scope.player.jumpToTime($scope.startTime);
                            $scope.isStreamingLive = false;
                            $scope.isPlaying = true;
                            $scope.hasFinished = false;
                            $scope.timelineValue = $scope.startTime;
                            $scope.api.setUserHasGoneOffline(false);
                        };
                        $scope.play = function() {
                            // window.ss_debug && console.log('play activities');
                            $scope.player.play($scope.timelineValue);
                            $scope.isStreamingLive = false;
                            $scope.isPlaying = true;
                            $scope.hasFinished = false;
                        };
                        $scope.pause = function() {
                            // window.ss_debug && console.log('pause activities');
                            var isStreamingLive = $scope.isStreamingLive;
                            $scope.player.pause();
                            G();
                            $scope.isPlaying = false;
                            $scope.hasFinished = isStreamingLive;
                        };
                        $scope.repeat = function() {
                            $scope.start();
                        };
                        $scope.goLive = function() {
                            // window.ss_debug && console.log('go live');
                            $scope.activities.resetLoading();
                            $scope.player.goLive($scope.timelineValue);
                            $scope.isStreamingLive = true;
                            $scope.isPlaying = true;
                            $scope.hasFinished = false;
                            $scope.timelineValue = $scope.timelineMax;
                            $scope.stepsTimelineLoaded();
                            player.fireStartLiveStreaming($scope, lodash.noop);
                            P();
                        };
                        $scope.showSessionDetails = function(b) {
                            sessionstackManager.log("Clicked on 'Details'");
                            $scope.pause();
                            sessionDetailsModal.open(b);
                        };
                        $scope.onSelectedActivity = function(selectedActivity: {
                            activityIndex: number;
                            count: number;
                            details: object;
                            isLog: boolean;
                            modalSize: 'sm';
                            playerIndex: number;
                            searchLabel: string;
                            stepStyle: boolean;
                            time: number;
                            type: 'mouse_click';
                        }) {
                            // window.ss_debug && console.log('selected activitiy', b);
                            $scope.player.jumpToActivity(selectedActivity);
                            G();
                            $scope.isPlaying = false;
                            $scope.hasFinished = false;
                            $scope.timelineValue = selectedActivity.time;
                            $scope.updateStepsTimeline(selectedActivity.playerIndex, true);
                            $scope.selectActivity(selectedActivity);
                            $scope.api.setUserHasGoneOffline(false);
                        };
                        $scope.userPermissionRequest = {
                            ignore: true,
                            state: null,
                            isApproved: function() {
                                return this.ignore || 'approved' === this.state;
                            },
                            send: function() {
                                'awaiting-response' != this.state &&
                                    ((this.state = 'awaiting-response'), player.fireUserPermissionRequestSend($scope));
                            },
                            cancel: function() {
                                'canceled' != this.state &&
                                    ((this.state = 'canceled'), player.fireUserPermissionRequestCanceled($scope));
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
                        };
                        $scope.getLiveState = function() {
                            return $scope.showGoLiveButton
                                ? $scope.isStreamingLive
                                    ? 'streaming'
                                    : $scope.isUserOffline
                                    ? 'offline'
                                    : 'online'
                                : 'none';
                        };
                        $scope.playUserRecordedSession = function() {
                            $scope.playRecordedSession();
                        };
                        $scope.api = {
                            loadSession: function(b) {
                                $scope.userPermissionRequest.ignore = !b.shouldWaitUserConfirmation();
                                $scope.session = b.getSession();
                                $scope.isLive = b.isLive();
                                $scope.showGoLiveButton = b.shouldShowGoLiveButton();
                                $scope.startTime = b.getStartTime();
                                $scope.pauseActivity = b.getPauseActivity();
                                $scope.initialSettings = b;
                                $scope.sessionId = $scope.session.id;
                                $scope.pauseActivity &&
                                    $scope.settings.playback.shouldPauseOnMarker &&
                                    $scope.player.changePauseMarker($scope.pauseActivity.time);
                            },
                            setSessionLength: function(timelineMax) {
                                $scope.timelineMax = timelineMax;
                                $scope.activities.setSessionLength(timelineMax);
                            },
                            finishLoadingActivities: function() {
                                $scope.activities.finishLoading();
                                $scope.refreshTimeline(true, []);
                                $scope.stepsTimelineLoaded();
                            },
                            addActivities: function(activities: any[]) {
                                // {
                                //     data: object;
                                //     index: number;
                                //     playerIndex: number;
                                //     time: number;
                                //     timestamp: number;
                                //     type: 'dom_snapshot';
                                // }

                                I(activities);
                                $scope.refreshTimeline(false, activities);
                            },
                            denyStreamingRequest: function() {
                                $scope.userPermissionRequest.deny();
                            },
                            interruptStreamingRequest: function() {
                                $scope.userPermissionRequest.interrupt();
                            },
                            resetStreamingRequest: function() {
                                $scope.userPermissionRequest.reset();
                            },
                            approveStreamingRequest: function() {
                                $scope.userPermissionRequest.approve();
                                this.startLiveStreaming();
                            },
                            startPlayback: function() {
                                $scope.start();
                            },
                            startLiveStreaming: function() {
                                $scope.isStreamingLive || $scope.goLive();
                            },
                            stopLiveStreaming: function() {
                                $scope.isStreamingLive && $scope.pause();
                            },
                            setFeatureFlags: function(featureFlags) {
                                S = featureFlags;
                            },
                            setBrokerClient: function(client) {
                                brokerClient = client;
                                brokerClient.onControlTakeOverRequestApproved(function() {
                                    L(X, true);
                                    O(true);
                                    $scope.endUserPermissionAwaiting = false;
                                });
                                brokerClient.onControlTakeOverRequestDenied(function() {
                                    $scope.endUserPermissionAwaiting = false;
                                    $scope.endUserDeniedControlTakeOver = true;
                                });
                                brokerClient.onControlTakeOverRequestStopped(function() {
                                    $scope.exitCollaborativeMode();
                                });
                            },
                            setUserHasGoneOffline: function(status) {
                                status && ($scope.isUserOffline = true);
                                $scope.setIsOffline(status);
                            },
                        };
                        player.onUserDetailsResize($scope, function(b, c) {
                            $scope.handleUserDetailsResize(c);
                        });
                        player.onConsoleResize($scope, function(b, c) {
                            $scope.handleResize(c);
                        });
                        player.onOpenConsole($scope, function(b, c) {
                            $scope.openConsole(c);
                        });
                        $scope.toggleConsole = function() {
                            $scope.isConsoleExpanded ? $scope.closeConsole() : (K(), $scope.openConsole(null));
                        };
                        $scope.updateUrl = function(url) {
                            J(url) || ($scope.url = url);
                        };
                        $scope.toggleTool = function(b) {
                            if (
                                b !== $scope.CONTROL_TAKEOVER ||
                                X !== $scope.CONTROL_TAKEOVER ||
                                !$scope.endUserPermissionAwaiting
                            ) {
                                if ($scope.isCollaborativeMode) {
                                    var c = b !== $scope.activeTool;
                                    if ((M(), !c)) return;
                                    b !== $scope.CONTROL_TAKEOVER
                                        ? (L(b, true), ($scope.endUserPermissionAwaiting = false))
                                        : ((X = b), N());
                                } else
                                    (X = b),
                                        ($scope.isConfirmationVisible = true),
                                        ($scope.endUserPermissionAwaiting = false);
                                $scope.endUserDeniedControlTakeOver = false;
                            }
                        };
                        $scope.exitCollaborativeMode = function() {
                            M();
                            O(false);
                            $scope.isConfirmationVisible = false;
                        };
                        $scope.goToCollaborativeMode = function() {
                            $scope.isConfirmationVisible = false;
                            X !== $scope.CONTROL_TAKEOVER ? (L(X, true), O(true)) : N();
                        };
                        $scope.cancelCollaborativeConfirmation = function() {
                            $scope.isConfirmationVisible = false;
                            X = null;
                        };
                    }
                },
            };
        },
    ]);
