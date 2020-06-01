const INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX = 'sessionstack-inaccessible-resource-detected-';

interface IScope {
    sessionId: number;
    isCreated: boolean;
    // [key: string]: any;
}

angular
    .module('playerApp')
    .constant('INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX', 'sessionstack-inaccessible-resource-detected-')
    .directive('inaccessibleResourcesWarning', [
        '$window',
        '$cookies',
        '$timeout',
        'CookieChangeListener',
        'INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX',
        function($window, $cookies, $timeout) {
            return {
                templateUrl: 'templates/inaccessibleResourcesWarning.html',
                replace: !0,
                scope: { sessionId: '=' },
                link: function($scope: IScope, $element, h) {
                    function i() {
                        j || k || $element.addClass('is-visible');
                    }
                    var j = !1,
                        k = 'http:' === $window.location.protocol;

                    $scope.$watch('sessionId', function(sessionId) {
                        if (sessionId) {
                            var f = INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX + sessionId,
                                g = new CookieChangeListener(f, function(a) {
                                    a &&
                                        ($timeout(function() {
                                            i();
                                        }, 2e3),
                                        $cookies.remove(f));
                                });

                            g.listen();
                        }
                    });
                    $scope.closeWarning = function() {
                        j = !0;
                        $element.removeClass('is-visible');
                    };
                    $scope.switchToHttp = function() {
                        $window.location.protocol = 'http:';
                    };
                },
            };
        },
    ]);
