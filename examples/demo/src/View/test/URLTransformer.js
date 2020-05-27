angular.module('playerApp').factory('URLTransformer', [
    'lodash',
    'utils',
    'SERVER_URL',
    function(a, b, c) {
        function d(a) {
            return encodeURIComponent(encodeURIComponent(a));
        }
        function e(a) {
            return a && c && f(a) && !g(a);
        }
        function f(b) {
            return !a.startsWith(b, 'data:') && !a.startsWith(b, 'file:');
        }
        function g(b) {
            return a.startsWith(b, h);
        }
        var h = c + 'resources',
            i = function(a, b) {
                var c = this;
                (c.encodedBaseUrl = d(a)), (c.sessionId = b), (c.timestamp = 0);
            };
        return (
            (i.prototype.transform = function(a) {
                if (!e(a)) return a;
                var b = this,
                    c = h;
                return (
                    (c += '/' + b.sessionId), (c += '/' + b.timestamp), (c += '/' + b.encodedBaseUrl), (c += '/' + d(a))
                );
            }),
            i
        );
    },
]);
