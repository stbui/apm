import lodash from 'lodash';
import { Activity, IActivity } from './Activity';
import { AsyncSliceIterator } from './AsyncSliceIterator';

class Snapshots {
    private _snapshots: IActivity[];

    constructor() {
        this._snapshots = [];
    }

    add(activity: IActivity) {
        this._snapshots.push(activity);
    }
    findBetween(lastActivityIndex: number, timelineSelectedValue: number): IActivity {
        return lodash.findLast(this._snapshots, activity => {
            return activity.playerIndex >= lastActivityIndex && activity.time < timelineSelectedValue;
        });
    }
    findBetweenActivities(lastActivityIndex: number, selectedActivityIndex: number): IActivity {
        return lodash.findLast(this._snapshots, activity => {
            return activity.playerIndex >= lastActivityIndex && activity.playerIndex < selectedActivityIndex;
        });
    }
    findBefore(timelineSelectedValue: number): IActivity {
        return lodash.findLast(this._snapshots, activity => {
            return activity.time < timelineSelectedValue;
        });
    }
    findBeforeAcivity(playerIndex: number): IActivity {
        return lodash.findLast(this._snapshots, activity => {
            return activity.playerIndex < playerIndex;
        });
    }
}

export class IteratorFromClosestSnapshotToTime {
    private _iterator: AsyncSliceIterator;
    private _predicate;
    private _done;

    constructor(_iterator: AsyncSliceIterator, _predicate: Function) {
        this._iterator = _iterator;
        this._predicate = _predicate;
        this._done = false;
    }

    onPending(callback: Function) {
        this._iterator.onPending(callback);
    }

    next(callback) {
        let b = this;

        // if (this._done) {
        //     return callback({ done: true });
        // }

        // this.peek(function (c) {
        //     if (c.done) {
        //         return callback({ done: true });
        //     }

        //     b._iterator.next(function (b) {
        //         callback(c);
        //     });
        // });

        return b._done
            ? callback({ done: true })
            : void b.peek(function (c) {
                  return c.done
                      ? callback({ done: true })
                      : void b._iterator.next(function (b) {
                            callback(c);
                        });
              });
    }
    peek(a) {
        let b = this;

        if (this._done) {
            return a({ done: true });
        }

        this._iterator.peek(function (c) {
            if (c.done) {
                return a({ done: true });
            } else if (b._predicate(c.value)) {
                a({ done: false, value: c.value });
                return;
            } else {
                b._done = true;
                a({ done: true });
            }
        });

        // return b._done
        //     ? a({ done: true })
        //     : void b._iterator.peek(function (c) {
        //           return c.done
        //               ? a({ done: true })
        //               : b._predicate(c.value)
        //               ? void a({ done: false, value: c.value })
        //               : ((b._done = true), a({ done: true }));
        //       });
    }
}

export class Activities {
    private _activities: IActivity[];
    private _asyncIterator: AsyncSliceIterator;
    private _snapshots: Snapshots;

    private _sessionLength: number;

    constructor() {
        this._activities = [];
        this._asyncIterator = new AsyncSliceIterator(this._activities, 0, -1);
        this._snapshots = new Snapshots();
    }

    getSessionLength(): number {
        return this._sessionLength;
    }
    setSessionLength(length: number) {
        this._sessionLength = length;
    }

    push(activities: IActivity[]) {
        activities.forEach((activity: IActivity) => {
            // 添加属性
            activity.playerIndex = this._activities.length;
            this._asyncIterator.push(activity);
            Activity.isTopLevel(activity) && Activity.isSnapshot(activity) && this._snapshots.add(activity);
        });

        if (activities.length > 0) {
            let length = Math.max(this.getSessionLength(), lodash.last(activities).time);
            this.setSessionLength(length);
        }
    }

    isLastActivity(lastRenderedActivity): boolean {
        return !!this._asyncIterator.isFinished() && lastRenderedActivity === this._asyncIterator.peekLast();
    }

    finishLoading() {
        this._asyncIterator.finish();
    }
    resetLoading() {
        this._asyncIterator.unfinish();
    }
    getIteratorFromStart(): AsyncSliceIterator {
        this._asyncIterator.rewind(0);
        return this._asyncIterator;
    }

    getIteratorFromClosestSnapshotToTime(timelineSelectedValue: number): IteratorFromClosestSnapshotToTime {
        let activity = this._snapshots.findBefore(timelineSelectedValue);
        let index = activity ? activity.playerIndex : 0;

        this._asyncIterator.rewind(index);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (b) {
            return b.time < timelineSelectedValue;
        });
    }

    getIteratorFromClosestSnapshotToActivity(selectedActivity): IteratorFromClosestSnapshotToTime {
        let b = this._snapshots.findBeforeAcivity(selectedActivity.playerIndex),
            index = b ? b.playerIndex : 0;

        this._asyncIterator.rewind(index);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (b) {
            return b.playerIndex < selectedActivity.playerIndex;
        });
    }

    getIteratorAfter(lastRenderedActivity): AsyncSliceIterator {
        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);
        return this._asyncIterator;
    }
    getIteratorAfterEnd(): AsyncSliceIterator {
        let a = this._asyncIterator.peekLast(),
            index = a ? a.playerIndex : -1;

        this._asyncIterator.rewind(index + 1);
        return this._asyncIterator;
    }
    getIteratorBetween(lastRenderedActivity, endTime): IteratorFromClosestSnapshotToTime {
        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (a) {
            return a.time < endTime;
        });
    }

    getIteratorFromClosestSnapshotBetween(
        lastRenderedActivity,
        timelineSelectedValue: number
    ): IteratorFromClosestSnapshotToTime {
        let lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            activity = this._snapshots.findBetween(lastActivityIndex, timelineSelectedValue),
            index = activity ? activity.playerIndex : lastActivityIndex;

        this._asyncIterator.rewind(index);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (a) {
            return a.time < timelineSelectedValue;
        });
    }

    getIteratorFromClosestSnapshotBetweenActivities(
        lastRenderedActivity,
        selectedActivity
    ): IteratorFromClosestSnapshotToTime {
        let lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            activity = this._snapshots.findBetweenActivities(lastActivityIndex, selectedActivity.playerIndex),
            index = activity ? activity.playerIndex : lastActivityIndex;

        this._asyncIterator.rewind(index);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (a) {
            return a.playerIndex < selectedActivity.playerIndex;
        });
    }

    getIteratorFromClosestSnapshotToFirstTabShown(
        lastRenderedActivity,
        timelineSelectedValue: number
    ): IteratorFromClosestSnapshotToTime {
        let lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            f = this._snapshots.findBetween(lastActivityIndex, timelineSelectedValue);

        f ? f.playerIndex : lastActivityIndex;

        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);
        let g = false;

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function (a) {
            return (
                !g &&
                ((g = Activity.isTabVisible(a) || (Activity.isTopLevel(a) && Activity.isVisibleSnapshot(a))),
                a.time < timelineSelectedValue)
            );
        });
    }
}
