import { SliceIterator } from './SliceIterator';
import { IActivity } from './Activity';

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

    next(callback: Function) {
        this._isPending() ? this._scheduleOperation('next', callback) : callback(this._syncSlice.next());
    }
    peek(callback: Function) {
        this._isPending() ? this._scheduleOperation('peek', callback) : callback(this._syncSlice.peek());
    }
    peekLast() {
        return this._syncSlice.peekLast();
    }
    push(activity: IActivity) {
        this._syncSlice.array.push(activity);
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
    private _isPending(): boolean {
        var peek = this._syncSlice.peek();

        return !this._finished && void 0 === peek.value;
    }
    private _scheduleOperation(type: 'next' | 'peek', callback: Function) {
        this._pendingOperations.push({ type: type, callback: callback });

        if (this._pendingOperations.length === 1) {
            this._onPending();
        }
    }
    private _retryPendingOperations() {
        const _pendingOperations = this._pendingOperations;
        this._pendingOperations = [];

        _pendingOperations.forEach(b => {
            if (b.type === 'next') {
                this.next(b.callback);
            } else if (b.type === 'peek') {
                this.peek(b.callback);
            }
        });
    }
}
