import { auth, utils, sessionstackManager, intercomManager, analytics, navigation, pendoManager } from './common';
import { HTTP_STATUS, FRONTEND_URL } from './common';
import { SessionDataClient } from './SessionDataClient';
import { InitialSettings } from './InitialSettings';
import { player, Player } from './player';
import { playerSettings } from './playerSettings';
import { BrokerClient } from './BrokerClient';
import { BrokerWebSocketClient } from './BrokerWebSocketClient';
import { LiveConnectionMonitor } from './LiveConnectionMonitor';
import { IRender, ISessionPlayerApi } from './interface';

const LIVE_MODE_CONFIGS = {
    GO_LIVE_OFFSET_TIME: 1000,
    MAX_ATTEMPTS: 3,
};
const DEMO_USER_ROLE = 'demo';
const PLAN_EXPIRED = 'PLAN_EXPIRED';
const CONNECTION_STATUSES = { ONLINE: 'online', OFFLINE: 'offline' };

interface IScope {
    // sessionPlayer.ts -> sessionPlayerApi
    sessionPlayerApi: ISessionPlayerApi;
    initialSettings: InitialSettings;
    // settings: playerSettings;
}
const $stateParams: any = {};
let $scope: IScope;

//

function loadActivitiesUntil(timeLimit: number) {
    // timeLimit:1591025627881
    // test: 循环拉取数据
    sessionDataClient.loadActivitiesUntil(addActivities, timeLimit).then(activities => {
        // b: undefined
        addActivities(activities);
        $scope.sessionPlayerApi.finishLoadingActivities();
    }, B);
}

// {
//     data: object;
//     index: -1;
//     playerIndex: 0;
//     time: 0;
//     timestamp: 1591025539170;
//     type: 'dom_snapshot';
// }
function addActivities(
    activities: {
        data: object;
        index: number;
        time: number;
        timestamp: number;
        type: string;
    }[]
) {
    if (activities && 0 !== activities.length) {
        timestamp = timestamp || activities[0].timestamp;
        A(activities);
        time = activities[activities.length - 1].time;

        // sessionPlayer.ts -> addActivities
        // test:3
        $scope.sessionPlayerApi.addActivities(activities);
    }

    // activities &&
    //     0 !== activities.length &&
    //     ((timestamp = timestamp || activities[0].timestamp),
    //     A(activities),
    //     (O = activities[activities.length - 1].time),
    //     $scope.sessionPlayerApi.addActivities(activities));
}
function A(activities) {
    angular.forEach(activities, function (activity) {
        activity.time = activity.timestamp - timestamp;
    });
}

// promise reject
function B(err) {
    if (err)
        switch (err.status) {
            case HTTP_STATUS.FORBIDDEN:
                F(err) || (window.location.href = FRONTEND_URL + '#/login');
                break;
            case HTTP_STATUS.UNAUTHORIZED:
                window.location.href = FRONTEND_URL + '#/login';
                break;
            case HTTP_STATUS.BAD_REQUEST:
                $scope.errors.invalidSessionId = true;
                break;
            case HTTP_STATUS.NOT_FOUND:
                $scope.errors.sessionNotFound = true;
        }
}
function C() {
    var b,
        accessToken = initialSettings.getAccessToken(),
        source = initialSettings.getSource();

    auth.loadCurrentUser()
        .then(function (a) {
            b = a.id;
        })
        ['finally'](function () {
            analytics.trackSessionOpened(b, $scope.sessionId, accessToken, source);
        });
}
function D() {
    auth.loadCurrentUser().then(function (b) {
        analytics.trackLiveSessionOpened(b.id, $scope.sessionId);
    });
}
function loadCurrentUser() {
    auth.loadCurrentUser().then(function (b) {
        analytics.trackLiveSessionStopped(b.id, $scope.sessionId);
    });
}

function F(err) {
    // 当前用户使用已过期
    return err.data && err.data.message === PLAN_EXPIRED;
}

$scope.isBrowserNotSupported = utils.isBrowserNotSupported();

if (!$scope.isBrowserNotSupported) {
    // $scope.settings的值
    // $scope.settings.general
    // $scope.settings.analytics
    playerSettings.init($scope);
    $scope.sessionId = $stateParams.sessionId;
    $scope.errors = {};
    $scope.activities = [];
    $scope.playRecordedSession = function () {
        var session = $scope.initialSettings.getSession();
        navigation.openSessionInNewWindow(session.id, session.hasInaccessibleResources, 'player_offline_button');
    };

    var initialSettings: InitialSettings,
        timestamp,
        logId = $stateParams.logId,
        sessionDataClient = new SessionDataClient($scope.sessionId, logId, $scope.settings.general.playLive),
        brokerClient = new BrokerClient(BrokerWebSocketClient.createStreamingClient($scope.sessionId)),
        chatClient = new BrokerClient(BrokerWebSocketClient.createChatClient($scope.sessionId)),
        liveConnectionMonitor = new LiveConnectionMonitor(brokerClient),
        N = new LiveConnectionMonitor(chatClient),
        time: number = -1;

    auth.loadCurrentUser().then(function (user) {
        $scope.user = user;
        sessionstackManager.identify(user);
        pendoManager.initialize(user);
        user.role !== DEMO_USER_ROLE && intercomManager.update(user);
    }, B);

    // 页面快照
    // test:0
    sessionDataClient.loadSession().then(function (b) {
        initialSettings = new InitialSettings(
            b.sessionData.session,
            b.sessionData.log,
            b.sessionData.askUserForStreamingPermission,
            b.sessionData.customOrigin,
            $scope.settings.general,
            $scope.settings.analytics,
            b.featureFlags
        );
        // 变更： sessionPlayer.$watch('initialSettings')
        $scope.initialSettings = initialSettings;
        C();
        initialSettings.shouldStartStreaming() && D();
    }, B);

    liveConnectionMonitor.onStatusChange(function (b) {
        var c = b === CONNECTION_STATUSES.OFFLINE;
        $scope.sessionPlayerApi.setUserHasGoneOffline(c);
        c ? $scope.sessionPlayerApi.stopLiveStreaming() : $scope.sessionPlayerApi.startLiveStreaming();
    });
    N.onStatusChange(function (b) {
        var c = b === CONNECTION_STATUSES.OFFLINE;
        $scope.sessionPlayerApi.setUserHasGoneOffline(c);
        c && (chatClient.discardPendingRequests(), $scope.sessionPlayerApi.resetStreamingRequest(c));
    });
    player.onUserPermissionRequestSend($scope, function () {
        N.start();
        chatClient.onStreamingRequestDenied(function () {
            N.stop();
            chatClient.disconnect();
            $scope.sessionPlayerApi.denyStreamingRequest();
        });
        chatClient.onStreamingRequestApproved(function () {
            N.stop();
            chatClient.disconnect();
            $scope.sessionPlayerApi.approveStreamingRequest();
        });
        chatClient.onRecorderDisconnected(function () {
            N.stop();
            chatClient.disconnect();
            $scope.sessionPlayerApi.interruptStreamingRequest();
        });
        chatClient.connect(function () {
            chatClient.sendStreamingRequest();
        });
    });
    player.onUserPermissionRequestCanceled($scope, function () {
        N.stop();
        chatClient.sendStreamingRequestCanceled();
        chatClient.disconnect();
    });
    // firePlayerIsInitialized
    // test:2
    player.onPlayerIsInitialized($scope, function () {
        $scope.sessionPlayerApi.setFeatureFlags(initialSettings.featureFlags);
        $scope.sessionPlayerApi.setBrokerClient(brokerClient);

        if (!initialSettings.shouldWaitUserConfirmation())
            if (initialSettings.shouldStartStreaming()) {
                $scope.sessionPlayerApi.startLiveStreaming();
            } else {
                var session = initialSettings.getSession();
                $scope.sessionPlayerApi.setSessionLength(session.length);
                $scope.sessionPlayerApi.startPlayback();
                // 加载数据
                loadActivitiesUntil(session.clientStartMilliseconds + session.length);
            }
    });
    player.onStartLiveStreaming($scope, function (b, c) {
        liveConnectionMonitor.start();
        brokerClient.onAddData(function (b) {
            z(b);
            $scope.sessionPlayerApi.setSessionLength(time);
        });
        brokerClient.connect(function () {
            c();
        });
    });
    player.onStopLiveStreaming($scope, function () {
        brokerClient.disconnect();
        liveConnectionMonitor.stop();
        $scope.sessionPlayerApi.finishLoadingActivities();
        loadCurrentUser();
    });
}
