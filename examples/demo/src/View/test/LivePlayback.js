angular.module('playerApp').factory('LivePlayback', [
    'lodash',
    'Timer',
    function(a, b) {
        function c(a, b, c) {
            (this._millisecondsPerFrame = b), (this._maxLag = c), (this._activities = a);
        }
        function d(d, e, f, g) {
            (this._maxLag = g.maxLag),
                (this._activities = e),
                (this._frames = new c(e, g.millisecondsPerFrame, this._maxLag)),
                (this._render = f),
                (this._stopped = !0),
                (this._delay = 0),
                (this._speed = 4),
                (this._timer = new b(d, g.millisecondsPerFrame)),
                this._timer.changeSpeed(4),
                (this._onBuffering = a.noop),
                (this._onRendering = a.noop),
                (this._onTimeChanged = a.noop);
            var h = this,
                i = function(a) {
                    h._onTimeChanged(a);
                };
            this._timer.onTimeChanged(i);
        }
        return (
            (c.prototype = {
                next: function(a) {
                    var b = this;
                    b._activities.next(function(c) {
                        if (c.done) return { done: !0 };
                        var d = c.value,
                            e = d.time + b._getNextFrameLength(d);
                        return d === b._getLastLoadedActivity()
                            ? a({ done: !1, value: [d] })
                            : void b._getNextFrame(e, [d], a);
                    });
                },
                _getLastLoadedActivity: function() {
                    return this._activities.peekLast();
                },
                _getNextFrameLength: function(a) {
                    var b = this._activities.peekLast(),
                        c = b.time - a.time;
                    return c > this._maxLag ? 500 : this._millisecondsPerFrame * Math.ceil(c / 100);
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
                stop: function() {
                    (this._stopped = !0),
                        this._timer.stopTicking(),
                        this._timer.onTimeChanged(a.noop),
                        clearTimeout(this._frameExecutor);
                },
                onBuffering: function(a) {
                    this._onBuffering = a;
                },
                onRendering: function(a) {
                    this._onRendering = a;
                },
                onTimeChanged: function(a) {
                    this._onTimeChanged = a;
                },
                replay: function(b) {
                    (this._stopped = !1), this._onBuffering(), this._replayLoop(b || a.noop);
                },
                _replayLoop: function(a) {
                    var b = this;
                    b._frames.next(function(c) {
                        if (c.done) return a();
                        var d,
                            e = c.value,
                            f = e[0],
                            g = e[e.length - 1],
                            h = b._activities.peekLast().time - b._timer.time;
                        f.isFirstLiveActivity || h > b._maxLag
                            ? (d = 0)
                            : ((d = (f.time - b._timer.time) / b._speed), (d = Math.max(0, d - b._delay)));
                        var i = Date.now() + d;
                        b._onRendering(),
                            b._timer.tickTo(g.time),
                            (b._frameExecutor = setTimeout(function() {
                                b._stopped ||
                                    (b._render.render(e, 'livePlayback'),
                                    b._timer.finishTicking(),
                                    (b._delay = i - Date.now()),
                                    b._replayLoop(a));
                            }, d));
                    });
                },
            }),
            d
        );
    },
]);
