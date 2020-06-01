import lodash from 'lodash';
import { ANALYTICS_EVENT_TYPES, analytics, sessionstackManager, utils, auth } from './common';
import { EVENT_TYPE, CONSOLE_CONSTANTS } from './constant';
import { player } from './Player';
interface IScope {
    openConsole: any;
    closeConsole: any;
    isExpanded: any;
    addNewLogs: any;
    addNewNetworkRequests: any;
    updateConsole: any;
    onSelectedLog: any;
    selectActivity: any;
    filteredLogs: any;
    filteredNetworkRequests: any;
    lastPlayedActivityIndex: any;
    selectedTab: number;
    transformedLogs: any[];
    logTypes: object;
    networkTypes: object;
    networkRequests: any[];
    networkRequestDetails: number;
    selectedLogIndex: any;
    areGeneralDetailsExpanded: boolean;
    areResponseHeadersExpanded: boolean;
    areRequestHeadersExpanded: boolean;
    // [key: string]: any;
}

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
        function($timeout) {
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
                link: function($scope: IScope, $element, m) {
                    function n() {
                        v && ($timeout.cancel(v), (v = null));
                        v = $timeout(function() {
                            sessionstackManager.log('Console search used');
                        }, 2e3);
                    }
                    function o(activityIndex) {
                        if (!x.is(':hover') && $scope.isExpanded) {
                            var b = lodash.findIndex($scope.filteredLogs, ['activityIndex', activityIndex]);
                            if (!(b < 0)) {
                                var c = q(activityIndex),
                                    d = 2 * CONSOLE_CONSTANTS.STEP_HEIGHT,
                                    f = c - d;
                                z.stop().animate({ scrollTop: f }, 300);
                            }
                        }
                    }
                    function p(activityIndex) {
                        if (!y.is(':hover') && $scope.isExpanded) {
                            var b = lodash.findIndex($scope.filteredNetworkRequests, ['activityIndex', activityIndex]);
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

                        $scope.filteredLogs.forEach(function(c) {
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

                        $scope.filteredNetworkRequests.forEach(function(c) {
                            c.activityIndex < activityIndex && (b += CONSOLE_CONSTANTS.STEP_HEIGHT);
                        });

                        return b;
                    }
                    function s() {
                        $element.animate({ height: 0 }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                        $scope.isExpanded = !1;
                        $timeout(function() {
                            player.fireConsoleResize($scope, 0);
                        }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                    }
                    function t() {
                        $element.animate({ height: CONSOLE_CONSTANTS.HEIGHT }, CONSOLE_CONSTANTS.ANIMATION_TIME);
                        player.fireConsoleResize($scope, CONSOLE_CONSTANTS.HEIGHT);
                        $scope.isExpanded = !0;
                        $scope.$broadcast('$md-resize');
                        o($scope.lastPlayedActivityIndex);
                    }

                    $scope.EVENT_TYPE = EVENT_TYPE;
                    $scope.TAB_INDEX = { CONSOLE: 0, NETWORK: 1 };
                    $scope.isExpanded = !1;
                    $scope.selectedTab = 0;
                    $scope.transformedLogs = [];
                    $scope.logTypes = {};
                    $scope.logTypes[EVENT_TYPE.CONSOLE_LOG] = !0;
                    $scope.logTypes[EVENT_TYPE.CONSOLE_DEBUG] = !0;
                    $scope.logTypes[EVENT_TYPE.CONSOLE_WARN] = !0;
                    $scope.logTypes[EVENT_TYPE.CONSOLE_ERROR] = !0;
                    $scope.networkTypes = { xhr: !0 };
                    $scope.networkRequests = [];
                    $scope.networkRequestDetails;
                    $scope.lastPlayedActivityIndex = 0;
                    $scope.selectedLogIndex = null;
                    $scope.areGeneralDetailsExpanded = !0;
                    $scope.areResponseHeadersExpanded = !0;
                    $scope.areRequestHeadersExpanded = !0;

                    var u,
                        v,
                        w = {},
                        x = $element.find('.logs-container'),
                        y = $element.find('.network-requests-container'),
                        z = x.children().eq(0),
                        A = y.children().eq(0);

                    $scope.openConsole = function(a) {
                        $scope.isExpanded || t();
                        a && $scope.selectLog(a);
                    };
                    $scope.closeConsole = function() {
                        s();
                    };
                    $scope.selectTab = function(a) {
                        if ((($scope.selectedTab = a), a === $scope.TAB_INDEX.NETWORK)) {
                            var b = auth.getCurrentUser();
                            analytics.trackEvent(b.id, ANALYTICS_EVENT_TYPES.NETWORK_TAB_OPENED);
                        }
                    };
                    $scope.toggleFilter = function(a) {
                        $scope.logTypes[a] = !$scope.logTypes[a];
                        o($scope.lastPlayedActivityIndex);
                        n();
                    };
                    $scope.searchChanged = function() {
                        n();
                    };
                    $scope.addNewLogs = function(a) {
                        a.forEach(function(a) {
                            if (
                                ($scope.transformedLogs.length > 0 &&
                                    (u = $scope.transformedLogs[$scope.transformedLogs.length - 1]),
                                utils.isDifferentActivity(a, u))
                            )
                                $scope.transformedLogs.push(a);
                            else {
                                var b = $scope.transformedLogs[$scope.transformedLogs.length - 1];
                                b.activityIndex = a.activityIndex;
                                b.count++;
                            }
                            w[a.activityIndex] = CONSOLE_CONSTANTS.STEP_HEIGHT;
                        });
                    };
                    $scope.addNewNetworkRequests = function(a) {
                        utils.forEach(a, function(a) {
                            $scope.networkRequests.push(a);
                        });
                    };
                    $scope.updateConsole = function(activityIndex) {
                        $scope.lastPlayedActivityIndex = activityIndex;
                        $scope.selectedLogIndex || (o(activityIndex), p(activityIndex));
                        $scope.selectedLogIndex < activityIndex && (o(activityIndex), p(activityIndex));
                        activityIndex >= $scope.selectedLogIndex && ($scope.selectedLogIndex = null);
                    };
                    $scope.selectLog = function(a) {
                        $scope.selectedLogIndex = a.activityIndex;
                        $scope.onSelectedLog(a);
                        o(a.activityIndex);
                    };
                    $scope.selectNetworkRequest = function(a) {
                        $scope.selectedLogIndex = a.activityIndex;
                        $scope.onSelectedLog(a);
                        p(a.activityIndex);
                    };
                    $scope.selectActivity = function(a) {
                        $scope.selectedLogIndex = a.activityIndex;
                        o(a.activityIndex);
                        p(a.activityIndex);
                    };
                    $scope.onLogToggle = function(a, b) {
                        w[a] = w[a] || 0;
                        w[a] += b;
                    };
                    $scope.showNetworkRequestDetails = function(a) {
                        $scope.networkRequestDetails = a.details.request;
                    };
                    $scope.closeExpandedNetworkRequest = function() {
                        $scope.networkRequestDetails = null;
                    };
                    $scope.toggleGeneralDetails = function() {
                        $scope.areGeneralDetailsExpanded = !$scope.areGeneralDetailsExpanded;
                    };
                    $scope.toggleResponseHeaders = function() {
                        $scope.areResponseHeadersExpanded = !$scope.areResponseHeadersExpanded;
                    };
                    $scope.toggleRequestHeaders = function() {
                        $scope.areRequestHeadersExpanded = !$scope.areRequestHeadersExpanded;
                    };
                },
            };
        },
    ]);
