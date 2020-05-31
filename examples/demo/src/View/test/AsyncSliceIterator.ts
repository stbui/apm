import { SliceIterator } from './SliceIterator';

const noop = function () {};

export class AsyncSliceIterator {
    private _syncSlice: SliceIterator;
    private _finished: boolean;
    private _pendingOperations: any[];
    private _onPending: Function;

    constructor(activities, start: number, end: number) {
        this._syncSlice = new SliceIterator(activities, start, end);
        this._finished = false;
        this._pendingOperations = [];
        this._onPending = noop;
    }

    next(a) {
        this._isPending() ? this._scheduleOperation('next', a) : a(this._syncSlice.next());
    }
    peek(a) {
        this._isPending() ? this._scheduleOperation('peek', a) : a(this._syncSlice.peek());
    }
    peekLast() {
        return this._syncSlice.peekLast();
    }
    push(a) {
        this._syncSlice.array.push(a);
        this._retryPendingOperations();
    }
    finish() {
        this._finished = true;
        this._retryPendingOperations();
    }
    unfinish() {
        this._finished = false;
        this._retryPendingOperations();
    }
    isFinished() {
        return this._finished;
    }
    rewind(index: number) {
        this._pendingOperations = [];
        this._syncSlice.rewind(index);
    }
    onPending(callback: Function) {
        this._onPending = callback;
    }
    private _isPending() {
        var a = this._syncSlice.peek();

        return !this._finished && void 0 === a.value;
    }
    private _scheduleOperation(type, callback) {
        this._pendingOperations.push({ type: type, callback: callback });
        1 === this._pendingOperations.length && this._onPending();
    }
    private _retryPendingOperations() {
        var a = this,
            b = a._pendingOperations;
        a._pendingOperations = [];
        b.forEach(function (b) {
            'next' === b.type ? a.next(b.callback) : 'peek' === b.type && a.peek(b.callback);
        });
    }
}
