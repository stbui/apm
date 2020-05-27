angular.module('playerApp').factory('SliceIterator', [
    function() {
        function a(a, b, c) {
            (this.array = a), (this.start = b), (this.end = c), (this.index = b);
        }
        return (
            (a.prototype = {
                next: function() {
                    return this._isDone() ? { done: !0 } : { done: !1, value: this.array[this.index++] };
                },
                peek: function() {
                    return this._isDone() ? { done: !0 } : { done: !1, value: this.array[this.index] };
                },
                peekLast: function() {
                    return this.end === -1 ? this.array[this.array.length - 1] : this.array[end - 1];
                },
                rewind: function(a) {
                    this.index = a;
                },
                _isDone: function() {
                    return this.end === -1 ? this.index >= this.array.length : this.index >= this.end;
                },
            }),
            a
        );
    },
]);
