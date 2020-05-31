angular
    .module('commonApp')
    .constant('URL_PROTOCOL', {
        HTTP: 'http://',
        HTTPS: 'https://',
    })
    .factory('navigation', [
        '$window',
        '$location',
        'FRONTEND_URL',
        'URL_PROTOCOL',
        function (a, b, c, d) {
            function e() {
                return c + 'player';
            }
            function f(b, c, d) {
                var e = i({
                    sessionId: b,
                    forceHttp: c,
                });
                (e += j({
                    source: d,
                })),
                    a.open(e);
            }
            function g(b, c) {
                var d = i({
                    sessionId: b,
                    forceHttp: c,
                });
                (d += j({
                    play_live: !0,
                    source: 'online_users_dashboard',
                })),
                    a.open(d);
            }
            function h(b, c, d) {
                var e = k(b, c, d);
                (e += j({
                    source: 'events_and_errors_dashboard',
                })),
                    a.open(e);
            }
            function i(a) {
                var b = e() + '/#/sessions/' + a.sessionId;
                return a.forceHttp && b.startsWith(d.HTTPS) && (b = b.replace(d.HTTPS, d.HTTP)), b;
            }
            function j(a) {
                var b = '',
                    c = 0;
                for (var d in a) (b += 0 === c ? '?' : '&'), (b += d + '=' + a[d]), c++;
                return b;
            }
            function k(a, b, c) {
                var d = i({
                    sessionId: a,
                    forceHttp: c,
                });
                return (d += '/logs/' + b);
            }
            return {
                openSessionInNewWindow: f,
                openLiveSessionInNewWindow: g,
                openLogInNewWindow: h,
            };
        },
    ]);

export const navigation = {
    openSessionInNewWindow: function (a?, b?, c?) {},
    openLiveSessionInNewWindow: function () {},
    openLogInNewWindow: function () {},
};
