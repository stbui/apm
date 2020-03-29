angular
    .module('playerApp')
    .constant('INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX', 'sessionstack-inaccessible-resource-detected-')
    .directive('inaccessibleResourcesWarning', [
        '$window',
        '$cookies',
        '$timeout',
        'CookieChangeListener',
        'INACCESSIBLE_RESOURCES_COOKIE_NAME_PREFIX',
        function(a, b, c, d, e) {
            return {
                templateUrl: 'templates/inaccessibleResourcesWarning.html',
                replace: !0,
                scope: { sessionId: '=' },
                link: function(f, g, h) {
                    function i() {
                        j || k || g.addClass('is-visible');
                    }
                    var j = !1,
                        k = 'http:' === a.location.protocol;
                    f.$watch('sessionId', function(a) {
                        if (a) {
                            var f = e + a,
                                g = new d(f, function(a) {
                                    a &&
                                        (c(function() {
                                            i();
                                        }, 2e3),
                                        b.remove(f));
                                });
                            g.listen();
                        }
                    }),
                        (f.closeWarning = function() {
                            (j = !0), g.removeClass('is-visible');
                        }),
                        (f.switchToHttp = function() {
                            a.location.protocol = 'http:';
                        });
                },
            };
        },
    ]);
