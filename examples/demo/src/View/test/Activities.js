angular
    .module('playerApp')
    .constant('TAB_VISIBILITY', { VISIBLE: 'visible', HIDDEN: 'hidden' })
    .factory('Activities', [
        'lodash',
        'AsyncSliceIterator',
        'Activity',
        function(a, b, c) {
            function d() {
                this._snapshots = [];
            }
            function e(a, b) {
                (this._iterator = a), (this._predicate = b), (this._done = !1);
            }
            function f() {
                (this._activities = []),
                    (this._asyncIterator = new b(this._activities, 0, -1)),
                    (this._snapshots = new d());
            }
            return (
                (d.prototype = {
                    add: function(a) {
                        this._snapshots.push(a);
                    },
                    findBetween: function(b, c) {
                        return a.findLast(this._snapshots, function(a) {
                            return a.playerIndex >= b && a.time < c;
                        });
                    },
                    findBetweenActivities: function(b, c) {
                        return a.findLast(this._snapshots, function(a) {
                            return a.playerIndex >= b && a.playerIndex < c;
                        });
                    },
                    findBefore: function(b) {
                        return a.findLast(this._snapshots, function(a) {
                            return a.time < b;
                        });
                    },
                    findBeforeAcivity: function(b) {
                        return a.findLast(this._snapshots, function(a) {
                            return a.playerIndex < b;
                        });
                    },
                }),
                (e.prototype = {
                    onPending: function(a) {
                        this._iterator.onPending(a);
                    },
                    next: function(a) {
                        var b = this;
                        return b._done
                            ? a({ done: !0 })
                            : void b.peek(function(c) {
                                  return c.done
                                      ? a({ done: !0 })
                                      : void b._iterator.next(function(b) {
                                            a(c);
                                        });
                              });
                    },
                    peek: function(a) {
                        var b = this;
                        return b._done
                            ? a({ done: !0 })
                            : void b._iterator.peek(function(c) {
                                  return c.done
                                      ? a({ done: !0 })
                                      : b._predicate(c.value)
                                      ? void a({ done: !1, value: c.value })
                                      : ((b._done = !0), a({ done: !0 }));
                              });
                    },
                }),
                (f.prototype = {
                    getSessionLength: function() {
                        return this._sessionLength;
                    },
                    setSessionLength: function(a) {
                        this._sessionLength = a;
                    },
                    push: function(b) {
                        var d = this;
                        if (
                            (b.forEach(function(a) {
                                (a.playerIndex = d._activities.length),
                                    d._asyncIterator.push(a),
                                    c.isTopLevel(a) && c.isSnapshot(a) && d._snapshots.add(a);
                            }),
                            b.length > 0)
                        ) {
                            var e = Math.max(d.getSessionLength(), a.last(b).time);
                            d.setSessionLength(e);
                        }
                    },
                    isLastActivity: function(a) {
                        return !!this._asyncIterator.isFinished() && a === this._asyncIterator.peekLast();
                    },
                    finishLoading: function() {
                        this._asyncIterator.finish();
                    },
                    resetLoading: function() {
                        this._asyncIterator.unfinish();
                    },
                    getIteratorFromStart: function() {
                        return this._asyncIterator.rewind(0), this._asyncIterator;
                    },
                    getIteratorFromClosestSnapshotToTime: function(a) {
                        var b = this._snapshots.findBefore(a),
                            c = b ? b.playerIndex : 0;
                        return (
                            this._asyncIterator.rewind(c),
                            new e(this._asyncIterator, function(b) {
                                return b.time < a;
                            })
                        );
                    },
                    getIteratorFromClosestSnapshotToActivity: function(a) {
                        var b = this._snapshots.findBeforeAcivity(a.playerIndex),
                            c = b ? b.playerIndex : 0;
                        return (
                            this._asyncIterator.rewind(c),
                            new e(this._asyncIterator, function(b) {
                                return b.playerIndex < a.playerIndex;
                            })
                        );
                    },
                    getIteratorAfter: function(a) {
                        return this._asyncIterator.rewind(a.playerIndex + 1), this._asyncIterator;
                    },
                    getIteratorAfterEnd: function() {
                        var a = this._asyncIterator.peekLast(),
                            b = a ? a.playerIndex : -1;
                        return this._asyncIterator.rewind(b + 1), this._asyncIterator;
                    },
                    getIteratorBetween: function(a, b) {
                        return (
                            this._asyncIterator.rewind(a.playerIndex + 1),
                            new e(this._asyncIterator, function(a) {
                                return a.time < b;
                            })
                        );
                    },
                    getIteratorFromClosestSnapshotBetween: function(a, b) {
                        var c = a.playerIndex + 1,
                            d = this._snapshots.findBetween(c, b),
                            f = d ? d.playerIndex : c;
                        return (
                            this._asyncIterator.rewind(f),
                            new e(this._asyncIterator, function(a) {
                                return a.time < b;
                            })
                        );
                    },
                    getIteratorFromClosestSnapshotBetweenActivities: function(a, b) {
                        var c = a.playerIndex + 1,
                            d = this._snapshots.findBetweenActivities(c, b.playerIndex),
                            f = d ? d.playerIndex : c;
                        return (
                            this._asyncIterator.rewind(f),
                            new e(this._asyncIterator, function(a) {
                                return a.playerIndex < b.playerIndex;
                            })
                        );
                    },
                    getIteratorFromClosestSnapshotToFirstTabShown: function(a, b) {
                        var d = a.playerIndex + 1,
                            f = this._snapshots.findBetween(d, b);
                        f ? f.playerIndex : d;
                        this._asyncIterator.rewind(a.playerIndex + 1);
                        var g = !1;
                        return new e(this._asyncIterator, function(a) {
                            return (
                                !g &&
                                ((g = c.isTabVisible(a) || (c.isTopLevel(a) && c.isVisibleSnapshot(a))), a.time < b)
                            );
                        });
                    },
                }),
                f
            );
        },
    ]);
