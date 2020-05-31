angular
    .module('playerApp')
    .constant('CONSOLE_CONSTANTS', {
        ANIMATION_TIME: 300,
        HEIGHT: 300,
        STEP_HEIGHT: 32,
    })
    .directive('console', [
        '$timeout',
        'player',
        'sessionstackManager',
        'utils',
        'lodash',
        'auth',
        'analytics',
        'CONSOLE_CONSTANTS',
        'EVENT_TYPE',
        'ANALYTICS_EVENT_TYPES',
        function (
            $timeout,
            player,
            sessionstackManager,
            utils,
            lodash,
            auth,
            analytics,
            CONSOLE_CONSTANTS,
            EVENT_TYPE,
            ANALYTICS_EVENT_TYPES
        ) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: 'templates/console.html',
                scope: {
                    openConsole: '=',
                    closeConsole: '=',
                    isExpanded: '=',
                    addNewLogs: '=',
                    addNewNetworkRequests: '=',
                    updateConsole: '=',
                    onSelectedLog: '=',
                    selectActivity: '=',
                },
                link: function (k, l, m) {
                    function n() {
                        v && ($timeout.cancel(v), (v = null));
                        v = $timeout(function () {
                            sessionstackManager.log('Console search used');
                        }, 2e3);
                    }
                    function o(activityIndex) {
                        if (!x.is(':hover') && k.isExpanded) {
                            var b = lodash.findIndex(k.filteredLogs, ['activityIndex', activityIndex]);
                            if (!(b < 0)) {
                                var c = q(activityIndex),
                                    d = 2 * CONSOLE_CONSTANTS.STEP_HEIGHT,
                                    f = c - d;
                                z.stop().animate({ scrollTop: f }, 300);
                            }
                        }
                    }
                    function p(activityIndex) {
                        if (!y.is(':hover') && k.isExpanded) {
                            var b = lodash.findIndex(k.filteredNetworkRequests, ['activityIndex', activityIndex]);
                            if (!(b < 0)) {
                                var c = r(activityIndex),
                                    d = 2 * CONSOLE_CONSTANTS.STEP_HEIGHT,
                                    f = c - d;
                                A.stop().animate({ scrollTop: f }, 300);
                            }
                        }
                    }
                    function q(activityIndex) {
                        if (isNaN(activityIndex)) return 0;
                        var b = 0;

                        k.filteredLogs.forEach(function (c) {
                            if (c.activityIndex < activityIndex) {
                                var d = w[c.activityIndex] || 0;
                                b += d;
                            }
                        });

                        return b;
                    }
                    function r(activityIndex) {
                        if (isNaN(activityIndex)) return 0;
                        var b = 0;

                        k.filteredNetworkRequests.forEach(function (c) {
                            c.activityIndex < activityIndex && (b += CONSOLE_CONSTANTS.STEP_HEIGHT);
                        });

                        return b;
                    }
                    function s() {
                        l.animate({ height: 0 }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                        k.isExpanded = !1;
                        $timeout(function () {
                            player.fireConsoleResize(k, 0);
                        }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                    }
                    function t() {
                        l.animate({ height: CONSOLE_CONSTANTS.HEIGHT }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                        player.fireConsoleResize(k, CONSOLE_CONSTANTS.HEIGHT);
                        k.isExpanded = !0;
                        k.$broadcast('$md-resize');
                        o(k.lastPlayedActivityIndex);
                    }

                    k.EVENT_TYPE = EVENT_TYPE;
                    k.TAB_INDEX = { CONSOLE: 0, NETWORK: 1 };
                    k.isExpanded = !1;
                    k.selectedTab = 0;
                    k.transformedLogs = [];
                    k.logTypes = {};
                    k.logTypes[EVENT_TYPE.CONSOLE_LOG] = !0;
                    k.logTypes[EVENT_TYPE.CONSOLE_DEBUG] = !0;
                    k.logTypes[EVENT_TYPE.CONSOLE_WARN] = !0;
                    k.logTypes[EVENT_TYPE.CONSOLE_ERROR] = !0;
                    k.networkTypes = { xhr: !0 };
                    k.networkRequests = [];
                    k.networkRequestDetails, (k.lastPlayedActivityIndex = 0);
                    k.selectedLogIndex = null;
                    k.areGeneralDetailsExpanded = !0;
                    k.areResponseHeadersExpanded = !0;
                    k.areRequestHeadersExpanded = !0;

                    var u,
                        v,
                        w = {},
                        x = l.find('.logs-container'),
                        y = l.find('.network-requests-container'),
                        z = x.children().eq(0),
                        A = y.children().eq(0);

                    k.openConsole = function (a) {
                        k.isExpanded || t();
                        a && k.selectLog(a);
                    };
                    k.closeConsole = function () {
                        s();
                    };
                    k.selectTab = function (a) {
                        if (((k.selectedTab = a), a === k.TAB_INDEX.NETWORK)) {
                            var b = auth.getCurrentUser();
                            analytics.trackEvent(b.id, ANALYTICS_EVENT_TYPES.NETWORK_TAB_OPENED);
                        }
                    };
                    k.toggleFilter = function (a) {
                        k.logTypes[a] = !k.logTypes[a];
                        o(k.lastPlayedActivityIndex);
                        n();
                    };
                    k.searchChanged = function () {
                        n();
                    };
                    k.addNewLogs = function (a) {
                        a.forEach(function (a) {
                            if (
                                (k.transformedLogs.length > 0 && (u = k.transformedLogs[k.transformedLogs.length - 1]),
                                utils.isDifferentActivity(a, u))
                            )
                                k.transformedLogs.push(a);
                            else {
                                var b = k.transformedLogs[k.transformedLogs.length - 1];
                                b.activityIndex = a.activityIndex;
                                b.count++;
                            }
                            w[a.activityIndex] = CONSOLE_CONSTANTS.STEP_HEIGHT;
                        });
                    };
                    k.addNewNetworkRequests = function (a) {
                        utils.forEach(a, function (a) {
                            k.networkRequests.push(a);
                        });
                    };
                    k.updateConsole = function (activityIndex) {
                        k.lastPlayedActivityIndex = activityIndex;
                        k.selectedLogIndex || (o(activityIndex), p(activityIndex));
                        k.selectedLogIndex < activityIndex && (o(activityIndex), p(activityIndex));
                        activityIndex >= k.selectedLogIndex && (k.selectedLogIndex = null);
                    };
                    k.selectLog = function (a) {
                        k.selectedLogIndex = a.activityIndex;
                        k.onSelectedLog(a);
                        o(a.activityIndex);
                    };
                    k.selectNetworkRequest = function (a) {
                        k.selectedLogIndex = a.activityIndex;
                        k.onSelectedLog(a);
                        p(a.activityIndex);
                    };
                    k.selectActivity = function (a) {
                        k.selectedLogIndex = a.activityIndex;
                        o(a.activityIndex);
                        p(a.activityIndex);
                    };
                    k.onLogToggle = function (a, b) {
                        w[a] = w[a] || 0;
                        w[a] += b;
                    };
                    k.showNetworkRequestDetails = function (a) {
                        k.networkRequestDetails = a.details.request;
                    };
                    k.closeExpandedNetworkRequest = function () {
                        k.networkRequestDetails = null;
                    };
                    k.toggleGeneralDetails = function () {
                        k.areGeneralDetailsExpanded = !k.areGeneralDetailsExpanded;
                    };
                    k.toggleResponseHeaders = function () {
                        k.areResponseHeadersExpanded = !k.areResponseHeadersExpanded;
                    };
                    k.toggleRequestHeaders = function () {
                        k.areRequestHeadersExpanded = !k.areRequestHeadersExpanded;
                    };
                },
            };
        },
    ]);
