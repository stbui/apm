angular.module('playerApp').directive('logDetails', [
    'player',
    'auth',
    'analytics',
    'sessionstackManager',
    'ANALYTICS_EVENT_TYPES',
    function(a, b, c, d, e) {
        return {
            restrict: 'E',
            templateUrl: 'templates/logDetails.html',
            replace: !0,
            scope: { log: '=' },
            link: function(f) {
                function g() {
                    var a = b.getCurrentUser(),
                        f = { opened_from: 'step_details' };
                    c.trackEvent(a.id, e.CONSOLE_OPENED, f), d.log('Console opened from step details');
                }
                (f.message = ''),
                    f.$watch('log', function(a) {
                        f.message = (a && a.details.message) || '';
                    }),
                    (f.openConsole = function() {
                        g(), a.fireOpenConsole(f, f.log);
                    });
            },
        };
    },
]);
