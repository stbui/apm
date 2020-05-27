angular.module('playerApp').factory('Timer', [
    function() {
        function a(a, b) {
            (this.time = a),
                (this._tickStep = b),
                (this._end = a),
                (this._speed = 1),
                (this._interval = null),
                (this._stopped = !1);
        }
        return (
            (a.prototype = {
                tickTo: function(a) {
                    (this._end = a), this._startInterval();
                },
                finishTicking: function() {
                    this._updateTime(this._end), this._stopInterval();
                },
                stopTicking: function() {
                    this._stopInterval();
                },
                onTimeChanged: function(a) {
                    this._onTimeChanged = a;
                },
                changeSpeed: function(a) {
                    this._speed = a;
                },
                _updateTime: function(a) {
                    a !== this.time && ((this.time = a), this._onTimeChanged(a));
                },
                _startInterval: function() {
                    var a = this;
                    a._interval ||
                        (a._interval = setInterval(function() {
                            if (a.time < a._end) {
                                var b = a.time + a._tickStep * a._speed;
                                (b = Math.min(b, a._end)), a._updateTime(b);
                            } else a._stopInterval();
                        }, a._tickStep));
                },
                _stopInterval: function() {
                    clearInterval(this._interval), (this._interval = null);
                },
            }),
            a
        );
    },
]);
