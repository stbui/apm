import { ANALYTICS_EVENT_TYPES, analytics, sessionstackManager, utils, auth } from './common';
import { player } from './Player';

interface IScope {
    message: any;
    log: boolean;
    // [key: string]: any;
}

angular.module('playerApp').directive('logDetails', [
    'player',
    'auth',
    'analytics',
    'sessionstackManager',
    'ANALYTICS_EVENT_TYPES',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/logDetails.html',
            replace: !0,
            scope: { log: '=' },
            link: function($scope: IScope) {
                function g() {
                    var currentUser = auth.getCurrentUser(),
                        f = { opened_from: 'step_details' };

                    analytics.trackEvent(currentUser.id, ANALYTICS_EVENT_TYPES.CONSOLE_OPENED, f);
                    sessionstackManager.log('Console opened from step details');
                }

                $scope.message = '';

                $scope.$watch('log', function(a) {
                    $scope.message = (a && a.details.message) || '';
                });

                $scope.openConsole = function() {
                    g();
                    player.fireOpenConsole($scope, $scope.log);
                };
            },
        };
    },
]);
