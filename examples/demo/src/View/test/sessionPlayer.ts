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
import { Activity, IActivity } from './Activity';
import { InitialSettings } from './InitialSettings';
import { IRender, ISessionPlayerApi } from './interface';

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
    api: ISessionPlayerApi;
    speedOptions: object;
    isLive: boolean;
    startTime: number;
    pauseActivity: any;
    initialSettings: InitialSettings;
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
        function ($interval, $timeout) {
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
                link: function ($scope: IScope, $element, t) {
                    function onTimeChanged(timelineValue) {
                        $scope.$apply(function () {
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
                    function A(activity: IActivity) {
                        return (
                            [
                                EVENT_TYPE.CONSOLE_ERROR,
                                EVENT_TYPE.CONSOLE_WARN,
                                EVENT_TYPE.CONSOLE_DEBUG,
                                EVENT_TYPE.CONSOLE_LOG,
                            ].indexOf(activity.type) > -1
                        );
                    }
                    function B(activity: IActivity) {
                        return activity.type === EVENT_TYPE.NETWORK_REQUEST;
                    }
                    function C(activity: IActivity) {
                        if (!activity.data) return false;

                        var b =
                            0 === activity.time && 0 === activity.index && activity.type === EVENT_TYPE.DOM_SNAPSHOT;
                        if (b) return false;

                        var c = activity.type === EVENT_TYPE.MOUSE_CLICK,
                            d = !!activity.data.frameElementId,
                            e = !!activity.data.hostElementId,
                            f = !d && !e,
                            g = f && U.indexOf(activity.type) >= 0;

                        return (c && !e) || g;
                    }

                    // type: 'console_warn';
                    function D(activity: IActivity) {
                        var b = {};
                        b[EVENT_TYPE.CONSOLE_LOG] = 'info';
                        b[EVENT_TYPE.CONSOLE_ERROR] = 'error';
                        b[EVENT_TYPE.CONSOLE_WARN] = 'warn';
                        b[EVENT_TYPE.CONSOLE_DEBUG] = 'debug';
                        var c: any = { id: activity.id, level: b[activity.type] };
                        if ('exception' === activity.data.type) {
                            var d = activity.data.exception;
                            c.message = d.type ? d.type + ': ' : '';
                            c.message += d.message;
                            c.isMessageTrimmed = false;
                            c.stackFrames = (d.stackFrames || []).map(function (a) {
                                return a.source || '';
                            });
                        } else {
                            var e = activity.data;
                            c.message = e.message;
                            c.isMessageTrimmed = e.isMessageTrimmed;
                            c.stackFrames = null;
                        }

                        // data= object
                        // extension: null
                        // isMessageTrimmed: false
                        // isTrimmed: false
                        // level: "warn"
                        // message: "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.↵↵* Move data fetching code or side effects to componentDidUpdate.↵* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state↵* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.↵↵Please update the following components: %s"
                        // type: "string"
                        return c;
                    }
                    function E(activity: IActivity) {
                        var b = activity.data;
                        switch (activity.type) {
                            case EVENT_TYPE.CONSOLE_LOG:
                                return D(activity);
                            case EVENT_TYPE.CONSOLE_ERROR:
                                return D(activity);
                            case EVENT_TYPE.CONSOLE_WARN:
                                return D(activity);
                            case EVENT_TYPE.CONSOLE_DEBUG:
                                return D(activity);
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
                    function F(activity: IActivity) {
                        return {
                            message: activity.data.message,
                            level: activity.data.level,
                            request: activity.data,
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

                    function I(activities: IActivity[]) {
                        $scope.activities.push(activities);
                        // activities增加了playerIndex

                        var newSteps: any = [],
                            newLogs: any = [],
                            newNetworkRequests: any = [];

                        activities.forEach((activity: IActivity) => {
                            var b: any = {
                                time: activity.time,
                                activityIndex: activity.playerIndex,
                                playerIndex: activity.playerIndex,
                                type: activity.type,
                                isLog: A(activity),
                            };

                            if (C(activity)) {
                                b.details = E(activity);
                                newSteps.push(b);
                            }

                            if (A(activity)) {
                                b.details = D(activity);
                                newLogs.push(b);
                            }

                            if (B(activity)) {
                                b.details = F(activity);
                                newNetworkRequests.push(b);
                            }
                        });

                        $scope.addNewSteps(newSteps);
                        $scope.addNewLogs(newLogs);
                        $scope.addNewNetworkRequests(newNetworkRequests);
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
                        if (status) {
                            $scope.activeTool = activeTool;

                            if (auth.isCurrentUserLoaded()) {
                                var currentUser = auth.getCurrentUser();

                                analytics.trackEvent(currentUser.id, ANALYTICS_EVENT_TYPES.SUPPORT_TOOLKIT_ENABLED, {
                                    active_tool: activeTool,
                                });
                            }
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

                        var render: IRender = {
                            _onTabHiddenCallback: lodash.noop,
                            isTabHidden: false,
                            lastRenderedActivity: lastRenderedActivity,
                            reset: function () {
                                this.isTabHidden = false;
                                this.lastRenderedActivity = lastRenderedActivity;
                            },
                            // d:normalPlayback
                            render: function (activities: IActivity[], d) {
                                // var f = this;
                                activities.forEach(activity => {
                                    // window.ss_debug && console.log(d, b);
                                    if (!A(activity)) {
                                        // 668 sessionViewer.onExecuteEvent()
                                        player.fireExecuteEvent($scope, activity);
                                    }

                                    if (
                                        Activity.isTabVisibilityChange(activity) ||
                                        (Activity.isTopLevel(activity) && Activity.isSnapshot(activity))
                                    ) {
                                        this.isTabHidden = activity.data.visibilityState == TAB_VISIBILITY.HIDDEN;
                                    }
                                });

                                this.lastRenderedActivity = lodash.last(activities);
                                $scope.updateStepsTimeline(this.lastRenderedActivity.playerIndex);
                                $scope.updateConsole(this.lastRenderedActivity.playerIndex);
                                this.isTabHidden && setTimeout(this._onTabHiddenCallback, 0);
                            },
                            onTabHidden: function (callback) {
                                this._onTabHiddenCallback = callback;
                            },
                        };

                        render.onTabHidden(function () {
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
                        $scope.settings.playback.speedOption = function (b) {
                            return arguments.length > 0
                                ? ($scope.settings.playback.speed = b.value)
                                : lodash.find($scope.speedOptions, function (b) {
                                      return b.value === $scope.settings.playback.speed;
                                  });
                        };
                        $scope.$watch('initialSettings', function (initialSettings) {
                            if (initialSettings) {
                                // 639
                                $scope.api.loadSession(initialSettings);
                            }
                        });
                        // 初始化组件完毕
                        // test:1
                        $scope.$watch(H, function (inited: boolean) {
                            if (inited) {
                                // 初始化数据
                                // playerController.onPlayerIsInitialized
                                player.firePlayerIsInitialized($scope);
                                $scope.hideUserDetailsMask();
                                $scope.hideStepsTimelineMask();
                                $scope.shouldShowLoadingOverlay = false;
                                $scope.enableTimeline();
                            }
                        });
                        $scope.$watch(
                            function () {
                                return $scope.viewerIsCreated && !!$scope.session;
                            },
                            function (b) {
                                if (b) {
                                    $scope.viewerApi.setSessionScreenWidth($scope.session.screenWidth);
                                    $scope.viewerApi.setSessionScreenHeight($scope.session.screenHeight);
                                    $scope.viewerApi.setInitialSettings($scope.initialSettings);
                                    player.fireVisualizeClicks($scope, $scope.settings.playback.shouldVisualizeClicks);
                                }
                            }
                        );
                        $scope.$watch('isTimelineSelectionInProgress', function (b) {
                            H() && b && $scope.pause();
                        });
                        $scope.$watch('timelineSelectedValue', function (time) {
                            if (H()) {
                                // window.ss_debug && console.log('jump to', b);
                                $scope.player.jumpToTime(time);
                                G();
                                $scope.isPlaying = true;
                                $scope.hasFinished = false;
                                $scope.api.setUserHasGoneOffline(false);
                            }
                        });
                        $scope.$watch('settings.playback.shouldSkipProlongedInactivity', function (
                            shouldSkipProlongedInactivity: boolean
                        ) {
                            $scope.player.changeProlongedInactivitySetting(
                                shouldSkipProlongedInactivity,
                                $scope.timelineValue
                            );
                        });
                        $scope.$watch('settings.playback.speed', function (speed: number) {
                            $scope.player.changeSpeedSetting(speed, $scope.timelineValue);
                        });
                        $scope.$watch('settings.playback.shouldPauseOnMarker', function (shouldPauseOnMarker) {
                            shouldPauseOnMarker && $scope.pauseActivity
                                ? $scope.player.changePauseMarker($scope.pauseActivity.time, $scope.timelineValue)
                                : $scope.player.changePauseMarker(null, $scope.timelineValue);
                        });
                        $scope.$watch('settings.playback.shouldVisualizeClicks', function (shouldVisualizeClicks) {
                            player.fireVisualizeClicks($scope, shouldVisualizeClicks);
                        });
                        $scope.togglePlaying = function () {
                            $scope.isPlaying ? $scope.pause() : $scope.play();
                        };
                        $scope.start = function () {
                            // window.ss_debug && console.log('firststart activities');
                            $scope.player.jumpToTime($scope.startTime);
                            $scope.isStreamingLive = false;
                            $scope.isPlaying = true;
                            $scope.hasFinished = false;
                            $scope.timelineValue = $scope.startTime;
                            $scope.api.setUserHasGoneOffline(false);
                        };
                        $scope.play = function () {
                            // window.ss_debug && console.log('play activities');
                            $scope.player.play($scope.timelineValue);
                            $scope.isStreamingLive = false;
                            $scope.isPlaying = true;
                            $scope.hasFinished = false;
                        };
                        $scope.pause = function () {
                            // window.ss_debug && console.log('pause activities');
                            var isStreamingLive = $scope.isStreamingLive;
                            $scope.player.pause();
                            G();
                            $scope.isPlaying = false;
                            $scope.hasFinished = isStreamingLive;
                        };
                        $scope.repeat = function () {
                            $scope.start();
                        };
                        $scope.goLive = function () {
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
                        $scope.showSessionDetails = function (b) {
                            sessionstackManager.log("Clicked on 'Details'");
                            $scope.pause();
                            sessionDetailsModal.open(b);
                        };
                        $scope.onSelectedActivity = function (selectedActivity: {
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
                            isApproved: function () {
                                return this.ignore || 'approved' === this.state;
                            },
                            send: function () {
                                'awaiting-response' != this.state &&
                                    ((this.state = 'awaiting-response'), player.fireUserPermissionRequestSend($scope));
                            },
                            cancel: function () {
                                'canceled' != this.state &&
                                    ((this.state = 'canceled'), player.fireUserPermissionRequestCanceled($scope));
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
                        $scope.getLiveState = function () {
                            return $scope.showGoLiveButton
                                ? $scope.isStreamingLive
                                    ? 'streaming'
                                    : $scope.isUserOffline
                                    ? 'offline'
                                    : 'online'
                                : 'none';
                        };
                        $scope.playUserRecordedSession = function () {
                            $scope.playRecordedSession();
                        };

                        $scope.api = {
                            loadSession: function (initialSettings: InitialSettings) {
                                $scope.userPermissionRequest.ignore = !initialSettings.shouldWaitUserConfirmation();
                                $scope.session = initialSettings.getSession();
                                $scope.isLive = initialSettings.isLive();
                                $scope.showGoLiveButton = initialSettings.shouldShowGoLiveButton();
                                $scope.startTime = initialSettings.getStartTime();
                                $scope.pauseActivity = initialSettings.getPauseActivity();
                                $scope.initialSettings = initialSettings;
                                $scope.sessionId = $scope.session.id;
                                $scope.pauseActivity &&
                                    $scope.settings.playback.shouldPauseOnMarker &&
                                    $scope.player.changePauseMarker($scope.pauseActivity.time);
                            },
                            // session.length 的总时长
                            setSessionLength: function (timelineMax: number) {
                                $scope.timelineMax = timelineMax;
                                $scope.activities.setSessionLength(timelineMax);
                            },
                            finishLoadingActivities: function () {
                                $scope.activities.finishLoading();
                                $scope.refreshTimeline(true, []);
                                $scope.stepsTimelineLoaded();
                            },
                            // PlayerController
                            addActivities: function (activities: IActivity[]) {
                                I(activities);
                                $scope.refreshTimeline(false, activities);
                            },
                            denyStreamingRequest: function () {
                                $scope.userPermissionRequest.deny();
                            },
                            interruptStreamingRequest: function () {
                                $scope.userPermissionRequest.interrupt();
                            },
                            resetStreamingRequest: function () {
                                $scope.userPermissionRequest.reset();
                            },
                            approveStreamingRequest: function () {
                                $scope.userPermissionRequest.approve();
                                this.startLiveStreaming();
                            },
                            startPlayback: function () {
                                $scope.start();
                            },
                            startLiveStreaming: function () {
                                $scope.isStreamingLive || $scope.goLive();
                            },
                            stopLiveStreaming: function () {
                                $scope.isStreamingLive && $scope.pause();
                            },
                            setFeatureFlags: function (featureFlags) {
                                S = featureFlags;
                            },
                            setBrokerClient: function (client) {
                                brokerClient = client;
                                brokerClient.onControlTakeOverRequestApproved(function () {
                                    L(X, true);
                                    O(true);
                                    $scope.endUserPermissionAwaiting = false;
                                });
                                brokerClient.onControlTakeOverRequestDenied(function () {
                                    $scope.endUserPermissionAwaiting = false;
                                    $scope.endUserDeniedControlTakeOver = true;
                                });
                                brokerClient.onControlTakeOverRequestStopped(function () {
                                    $scope.exitCollaborativeMode();
                                });
                            },
                            setUserHasGoneOffline: function (status) {
                                status && ($scope.isUserOffline = true);
                                $scope.setIsOffline(status);
                            },
                        };

                        // fireUserDetailsResize
                        player.onUserDetailsResize($scope, function (b, outerHeight: number) {
                            $scope.handleUserDetailsResize(outerHeight);
                        });
                        player.onConsoleResize($scope, function (b, c: number) {
                            $scope.handleResize(c);
                        });
                        player.onOpenConsole($scope, function (b, c) {
                            $scope.openConsole(c);
                        });
                        $scope.toggleConsole = function () {
                            if ($scope.isConsoleExpanded) {
                                $scope.closeConsole();
                            } else {
                                K();
                                $scope.openConsole(null);
                            }
                        };
                        $scope.updateUrl = function (url) {
                            J(url) || ($scope.url = url);
                        };
                        $scope.toggleTool = function (activeTool) {
                            if (
                                activeTool !== $scope.CONTROL_TAKEOVER ||
                                X !== $scope.CONTROL_TAKEOVER ||
                                !$scope.endUserPermissionAwaiting
                            ) {
                                if ($scope.isCollaborativeMode) {
                                    var c = activeTool !== $scope.activeTool;
                                    M();

                                    if (!c) return;

                                    if (activeTool !== $scope.CONTROL_TAKEOVER) {
                                        L(activeTool, true);
                                        $scope.endUserPermissionAwaiting = false;
                                    } else {
                                        X = activeTool;
                                        N();
                                    }
                                } else {
                                    X = activeTool;
                                    $scope.isConfirmationVisible = true;
                                    $scope.endUserPermissionAwaiting = false;
                                }
                                $scope.endUserDeniedControlTakeOver = false;
                            }
                        };
                        $scope.exitCollaborativeMode = function () {
                            M();
                            O(false);
                            $scope.isConfirmationVisible = false;
                        };
                        $scope.goToCollaborativeMode = function () {
                            $scope.isConfirmationVisible = false;

                            if (X !== $scope.CONTROL_TAKEOVER) {
                                L(X, true);
                                O(true);
                            } else {
                                N();
                            }
                        };
                        $scope.cancelCollaborativeConfirmation = function () {
                            $scope.isConfirmationVisible = false;
                            X = null;
                        };
                    }
                },
            };
        },
    ]);
