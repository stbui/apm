angular.module('playerApp').factory('NormalPlayback', [
    'lodash',
    'Timer',
    function(a, b) {
        function c(a, b) {
            (this._activities = a), (this._millisecondsPerFrame = b);
        }
        function d(d, e, f, g, h) {
            (this._timer = new b(d, h.millisecondsPerFrame)),
                (this._endTime = e),
                (this._activities = f),
                (this._frames = new c(this._activities, h.millisecondsPerFrame)),
                (this._render = g),
                (this._delay = 0),
                (this._stopped = !0),
                (this._skipPrologedInactivity = h.skipProlongedInactivity),
                (this._maxInactivityTime = h.maxInactivityTime),
                (this._tabHiddenMessageTime = h.tabHiddenMessageTime),
                (this._speed = h.speed),
                this._timer.changeSpeed(this._speed),
                (this._onBuffering = a.noop),
                (this._onRendering = a.noop),
                (this._onTimeChanged = a.noop);
            var i = this,
                j = function() {
                    i._onBuffering();
                },
                k = function(a) {
                    i._onTimeChanged(a);
                };
            this._activities.onPending(j), this._timer.onTimeChanged(k);
        }
        return (
            (c.prototype = {
                next: function(a) {
                    var b = this;
                    b._activities.next(function(c) {
                        if (c.done) return a({ done: !0 });
                        var d = c.value,
                            e = d.time + b._millisecondsPerFrame;
                        b._getNextFrame(e, [d], a);
                    });
                },
                _getNextFrame: function(a, b, c) {
                    var d = this;
                    d._activities.peek(function(e) {
                        if (e.done) return c({ done: !1, value: b });
                        var f = e.value;
                        return f.time > a
                            ? c({ done: !1, value: b })
                            : (b.push(f),
                              void d._activities.next(function(e) {
                                  d._getNextFrame(a, b, c);
                              }));
                    });
                },
            }),
            (d.prototype = {
                onBuffering: function(a) {
                    this._onBuffering = a;
                },
                onRendering: function(a) {
                    this._onRendering = a;
                },
                onTimeChanged: function(a) {
                    this._onTimeChanged = a;
                },
                stop: function() {
                    (this._stopped = !0),
                        this._activities.onPending(a.noop),
                        this._timer.onTimeChanged(a.noop),
                        this._timer.stopTicking(),
                        clearTimeout(this._frameExecutor);
                },
                replay: function(b) {
                    (this._stopped = !1), this._onRendering(), this._replayLoop(b || a.noop);
                },
                _replayLoop: function(a) {
                    var b = this;
                    b._frames.next(function(c) {
                        if (c.done) return b._finish(a);
                        var d = c.value,
                            e = d[0],
                            f = d[d.length - 1];
                        if (e.isFirstLiveActivity) var g = 0;
                        else {
                            var g = e.time - b._timer.time;
                            g = Math.min(g, b._maxInactivityTime);
                            var h = g - b._delay;
                            h < 0 ? ((b._delay -= g), (g = 0)) : ((b._delay = 0), (g = h)),
                                (g /= b._speed),
                                b._skipPrologedInactivity &&
                                    b._render.isTabHidden &&
                                    (g = Math.min(g, b._tabHiddenMessageTime));
                        }
                        var i = Date.now() + g;
                        b._onRendering(),
                            b._timer.tickTo(f.time),
                            (b._frameExecutor = setTimeout(function() {
                                b._stopped ||
                                    (b._render.render(d, 'normalPlayback'),
                                    b._timer.finishTicking(),
                                    (b._delay += Date.now() - i),
                                    b._replayLoop(a));
                            }, g));
                    });
                },
                _finish: function(a) {
                    var b = this,
                        c = b._endTime - b._timer.time;
                    (c = Math.max(0, c - b._delay)),
                        b._timer.tickTo(b._endTime),
                        setTimeout(function() {
                            b._timer.finishTicking(), b._stopped || (a(), b.stop());
                        }, c);
                },
                changeSpeed: function(a) {
                    (this._speed = a), this._timer.changeSpeed(a);
                },
            }),
            d
        );
    },
]);
