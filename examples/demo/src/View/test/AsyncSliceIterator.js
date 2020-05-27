angular.module('playerApp').factory('AsyncSliceIterator', [
    'lodash',
    'SliceIterator',
    function(a, b) {
        function c(c, d, e) {
            (this._syncSlice = new b(c, d, e)),
                (this._finished = !1),
                (this._pendingOperations = []),
                (this._onPending = a.noop);
        }
        return (
            (c.prototype = {
                next: function(a) {
                    this._isPending() ? this._scheduleOperation('next', a) : a(this._syncSlice.next());
                },
                peek: function(a) {
                    this._isPending() ? this._scheduleOperation('peek', a) : a(this._syncSlice.peek());
                },
                peekLast: function() {
                    return this._syncSlice.peekLast();
                },
                push: function(a) {
                    this._syncSlice.array.push(a), this._retryPendingOperations();
                },
                finish: function() {
                    (this._finished = !0), this._retryPendingOperations();
                },
                unfinish: function() {
                    (this._finished = !1), this._retryPendingOperations();
                },
                isFinished: function() {
                    return this._finished;
                },
                rewind: function(a) {
                    (this._pendingOperations = []), this._syncSlice.rewind(a);
                },
                onPending: function(a) {
                    this._onPending = a;
                },
                _isPending: function() {
                    var a = this._syncSlice.peek();
                    return !this._finished && void 0 === a.value;
                },
                _scheduleOperation: function(a, b) {
                    this._pendingOperations.push({ type: a, callback: b }),
                        1 === this._pendingOperations.length && this._onPending();
                },
                _retryPendingOperations: function() {
                    var a = this,
                        b = a._pendingOperations;
                    (a._pendingOperations = []),
                        b.forEach(function(b) {
                            'next' === b.type ? a.next(b.callback) : 'peek' === b.type && a.peek(b.callback);
                        });
                },
            }),
            c
        );
    },
]);
