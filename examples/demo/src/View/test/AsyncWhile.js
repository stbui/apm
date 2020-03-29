angular.module('playerApp').factory('AsyncWhile', [
    '$timeout',
    function(a) {
        function b(c, d) {
            var e = this;
            if (!(e.config.maxIterations && c >= e.config.maxIterations)) {
                if (!e.condition()) return void (angular.isFunction(d) && d());
                e.body(),
                    (e.queuedLoop = a(function() {
                        b.call(e, c + 1, d);
                    }, e.config.waitTime));
            }
        }
        var c = function(a, b, c) {
            (this.condition = a), (this.body = b), (this.config = c);
        };
        return (
            (c.prototype.start = function(a) {
                b.call(this, 0, a);
            }),
            (c.prototype.cancel = function() {
                return a.cancel(this.queuedLoop);
            }),
            c
        );
    },
]);
