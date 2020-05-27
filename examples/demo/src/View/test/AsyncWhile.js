angular.module('playerApp').factory('AsyncWhile', [
    function() {
        function a(b, c) {
            var d = this;
            if (!(d.config.maxIterations && b >= d.config.maxIterations)) {
                if (!d.condition()) return void (angular.isFunction(c) && c());
                d.body(),
                    (d.queuedLoop = setTimeout(function() {
                        a.call(d, b + 1, c);
                    }, d.config.waitTime));
            }
        }
        var b = function(a, b, c) {
            (this.condition = a), (this.body = b), (this.config = c);
        };
        return (
            (b.prototype.start = function(b) {
                a.call(this, 0, b);
            }),
            (b.prototype.cancel = function() {
                return clearTimeout(this.queuedLoop);
            }),
            b
        );
    },
]);
