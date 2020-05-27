angular.module('playerApp').factory('InstantPlayback', [
    'lodash',
    function(a) {
        function b(a, b) {
            (this._activities = a), (this._size = b);
        }
        function c(c, d, e) {
            (this._activities = c),
                (this._render = d),
                (this._stopped = !0),
                (this._batches = new b(c, e.batchSize)),
                (this._onBuffering = a.noop),
                (this._onRendering = a.noop);
            var f = this,
                g = function() {
                    f._onBuffering();
                };
            this._activities.onPending(g);
        }
        return (
            (b.prototype = {
                next: function(a) {
                    var b = this;
                    b._activities.next(function(c) {
                        if (c.done) return a({ done: !0 });
                        var d = c.value;
                        b._getNextBatch([d], a);
                    });
                },
                _getNextBatch: function(a, b) {
                    var c = this;
                    return a.length === c._size
                        ? b({ done: !1, value: a })
                        : void c._activities.next(function(d) {
                              if (d.done) return b({ done: !1, value: a });
                              var e = d.value;
                              a.push(e), c._getNextBatch(a, b);
                          });
                },
            }),
            (c.prototype = {
                onBuffering: function(a) {
                    this._onBuffering = a;
                },
                onRendering: function(a) {
                    this._onRendering = a;
                },
                stop: function() {
                    (this._stopped = !0), this._activities.onPending(a.noop), clearTimeout(this._batchExecutor);
                },
                replay: function(b) {
                    (this._stopped = !1), this._replayLoop(b || a.noop);
                },
                _replayLoop: function(a) {
                    var b = this;
                    b._batches.next(function(c) {
                        if (c.done) return a();
                        var d = c.value;
                        b._onRendering(),
                            (b._batchExecutor = setTimeout(function() {
                                b._stopped || (b._render.render(d, 'instantPlayback'), b._replayLoop(a));
                            }, 0));
                    });
                },
            }),
            c
        );
    },
]);
