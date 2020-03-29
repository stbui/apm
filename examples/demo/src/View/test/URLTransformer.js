angular.module('playerApp').factory('URLTransformer', [
    'lodash',
    'utils',
    'SERVER_URL',
    function(a, b, c) {
        function d(a) {
            return a && c && e(a) && !f(a);
        }
        function e(b) {
            return !a.startsWith(b, 'data:') && !a.startsWith(b, 'file:');
        }
        function f(b) {
            return a.startsWith(b, g);
        }
        var g = c + 'resources',
            h = function(a, b) {
                var c = this;
                (c.encodedBaseUrl = encodeURIComponent(a)), (c.sessionId = b);
            };
        return (
            (h.prototype.transform = function(a) {
                if (!d(a)) return a;
                var c = this,
                    e = g,
                    f = {
                        url: encodeURIComponent(a),
                        base: c.encodedBaseUrl,
                        session_id: c.sessionId,
                    };
                return (e += b.getQueryString(f));
            }),
            h
        );
    },
]);
