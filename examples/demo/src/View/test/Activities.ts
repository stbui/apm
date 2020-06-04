import lodash from 'lodash';
import { Activity, IActivity } from './Activity';
import { AsyncSliceIterator } from './AsyncSliceIterator';

class Snapshots {
    private _snapshots: IActivity[];

    constructor() {
        this._snapshots = [];
    }

    add(activity) {
        this._snapshots.push(activity);
    }
    findBetween(lastActivityIndex: number, timelineSelectedValue: number) {
        return lodash.findLast(this._snapshots, function(a) {
            return a.playerIndex >= lastActivityIndex && a.time < timelineSelectedValue;
        });
    }
    findBetweenActivities(lastActivityIndex: number, selectedActivityIndex: number) {
        return lodash.findLast(this._snapshots, function(a) {
            return a.playerIndex >= lastActivityIndex && a.playerIndex < selectedActivityIndex;
        });
    }
    findBefore(timelineSelectedValue: number) {
        return lodash.findLast(this._snapshots, function(a) {
            return a.time < timelineSelectedValue;
        });
    }
    findBeforeAcivity(playerIndex: number) {
        return lodash.findLast(this._snapshots, function(a) {
            return a.playerIndex < playerIndex;
        });
    }
}

class IteratorFromClosestSnapshotToTime {
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

    next(a) {
        var b = this;
        return b._done
            ? a({ done: true })
            : void b.peek(function(c) {
                  return c.done
                      ? a({ done: true })
                      : void b._iterator.next(function(b) {
                            a(c);
                        });
              });
    }
    peek(a) {
        var b = this;
        return b._done
            ? a({ done: true })
            : void b._iterator.peek(function(c) {
                  return c.done
                      ? a({ done: true })
                      : b._predicate(c.value)
                      ? void a({ done: false, value: c.value })
                      : ((b._done = true), a({ done: true }));
              });
    }
}

export class Activities {
    private _activities: any[];
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
            var length = Math.max(this.getSessionLength(), lodash.last(activities).time);
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
        var b = this._snapshots.findBefore(timelineSelectedValue);
        var playerIndex = b ? b.playerIndex : 0;

        this._asyncIterator.rewind(playerIndex);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(b) {
            return b.time < timelineSelectedValue;
        });
    }

    getIteratorFromClosestSnapshotToActivity(selectedActivity): IteratorFromClosestSnapshotToTime {
        var b = this._snapshots.findBeforeAcivity(selectedActivity.playerIndex),
            playerIndex = b ? b.playerIndex : 0;

        this._asyncIterator.rewind(playerIndex);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(b) {
            return b.playerIndex < selectedActivity.playerIndex;
        });
    }

    getIteratorAfter(lastRenderedActivity): AsyncSliceIterator {
        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);
        return this._asyncIterator;
    }
    getIteratorAfterEnd(): AsyncSliceIterator {
        var a = this._asyncIterator.peekLast(),
            b = a ? a.playerIndex : -1;

        this._asyncIterator.rewind(b + 1);
        return this._asyncIterator;
    }
    getIteratorBetween(lastRenderedActivity, endTime): IteratorFromClosestSnapshotToTime {
        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(a) {
            return a.time < endTime;
        });
    }

    getIteratorFromClosestSnapshotBetween(
        lastRenderedActivity,
        timelineSelectedValue: number
    ): IteratorFromClosestSnapshotToTime {
        var lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            d = this._snapshots.findBetween(lastActivityIndex, timelineSelectedValue),
            playerIndex = d ? d.playerIndex : lastActivityIndex;

        this._asyncIterator.rewind(playerIndex);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(a) {
            return a.time < timelineSelectedValue;
        });
    }

    getIteratorFromClosestSnapshotBetweenActivities(
        lastRenderedActivity,
        selectedActivity
    ): IteratorFromClosestSnapshotToTime {
        var lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            d = this._snapshots.findBetweenActivities(lastActivityIndex, selectedActivity.playerIndex),
            playerIndex = d ? d.playerIndex : lastActivityIndex;

        this._asyncIterator.rewind(playerIndex);

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(a) {
            return a.playerIndex < selectedActivity.playerIndex;
        });
    }

    getIteratorFromClosestSnapshotToFirstTabShown(
        lastRenderedActivity,
        timelineSelectedValue: number
    ): IteratorFromClosestSnapshotToTime {
        var lastActivityIndex = lastRenderedActivity.playerIndex + 1,
            f = this._snapshots.findBetween(lastActivityIndex, timelineSelectedValue);
        f ? f.playerIndex : lastActivityIndex;
        this._asyncIterator.rewind(lastRenderedActivity.playerIndex + 1);
        var g = false;

        return new IteratorFromClosestSnapshotToTime(this._asyncIterator, function(a) {
            return (
                !g &&
                ((g = Activity.isTabVisible(a) || (Activity.isTopLevel(a) && Activity.isVisibleSnapshot(a))),
                a.time < timelineSelectedValue)
            );
        });
    }
}
