import { IActivity } from './Activity';
export class SliceIterator {
    public array: IActivity[];
    public start: number;
    public end: number;
    public index: number;

    constructor(activities: IActivity[], start: number, end: number, index: number) {
        this.array = activities;
        this.start = start;
        this.end = end;
        this.index = index;
    }

    next(): { done: boolean; value?: IActivity } {
        return this._isDone() ? { done: true } : { done: false, value: this.array[this.index++] };
    }
    peek(): { done: boolean; value?: IActivity } {
        return this._isDone() ? { done: true } : { done: false, value: this.array[this.index] };
    }
    peekLast(): IActivity {
        return this.end === -1 ? this.array[this.array.length - 1] : this.array[this.end - 1];
    }
    rewind(index: number) {
        this.index = index;
    }
    private _isDone(): boolean {
        return this.end === -1 ? this.index >= this.array.length : this.index >= this.end;
    }
}
