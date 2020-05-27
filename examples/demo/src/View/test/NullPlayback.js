angular.module('playerApp').factory('NullPlayback', [
    'lodash',
    function(a) {
        function b(a, b) {
            (this._wait = a), (this._lastPlayedActivity = b);
        }
        return (
            (b.prototype = {
                stop: function() {
                    clearTimeout(this._executor);
                },
                replay: function(b) {
                    (b = b || a.noop), (this._executor = setTimeout(b, this._wait));
                },
                getLastPlayedActivity: function() {
                    return this._lastPlayedActivity;
                },
            }),
            b
        );
    },
]);
