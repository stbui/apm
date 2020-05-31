angular
    .module('playerApp')
    .constant('INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX', 'sessionstack-inaccessible-resource-detected-')
    .directive('inaccessibleResourcesWarning', [
        '$window',
        '$cookies',
        '$timeout',
        'CookieChangeListener',
        'INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX',
        function ($window, $cookies, $timeout, CookieChangeListenerd, INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX) {
            return {
                templateUrl: 'templates/inaccessibleResourcesWarning.html',
                replace: !0,
                scope: { sessionId: '=' },
                link: function (f, g, h) {
                    function i() {
                        j || k || g.addClass('is-visible');
                    }
                    var j = !1,
                        k = 'http:' === $window.location.protocol;

                    f.$watch('sessionId', function (sessionId) {
                        if (sessionId) {
                            var f = INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX + sessionId,
                                g = new CookieChangeListener(f, function (a) {
                                    a &&
                                        ($timeout(function () {
                                            i();
                                        }, 2e3),
                                        $cookies.remove(f));
                                });

                            g.listen();
                        }
                    });
                    f.closeWarning = function () {
                        j = !0;
                        g.removeClass('is-visible');
                    };
                    f.switchToHttp = function () {
                        $window.location.protocol = 'http:';
                    };
                },
            };
        },
    ]);
