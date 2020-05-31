angular.module('playerApp').directive('logDetails', [
    'player',
    'auth',
    'analytics',
    'sessionstackManager',
    'ANALYTICS_EVENT_TYPES',
    function (player, auth, analytics, sessionstackManager, ANALYTICS_EVENT_TYPES) {
        return {
            restrict: 'E',
            templateUrl: 'templates/logDetails.html',
            replace: !0,
            scope: { log: '=' },
            link: function (f) {
                function g() {
                    var currentUser = auth.getCurrentUser(),
                        f = { opened_from: 'step_details' };

                    analytics.trackEvent(currentUser.id, ANALYTICS_EVENT_TYPES.CONSOLE_OPENED, f);
                    sessionstackManager.log('Console opened from step details');
                }

                f.message = '';

                f.$watch('log', function (a) {
                    f.message = (a && a.details.message) || '';
                });

                f.openConsole = function () {
                    g();
                    player.fireOpenConsole(f, f.log);
                };
            },
        };
    },
]);
