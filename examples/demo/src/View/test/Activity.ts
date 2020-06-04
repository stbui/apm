const TAB_VISIBILITY = { VISIBLE: 'visible', HIDDEN: 'hidden' };
const EVENT_TYPE: any = {};

export interface IActivity {
    data: object;
    index: number;
    time: number;
    timestamp: number;
    // type: 'dom_snapshot';
    type: string;
    // Activities.push
    playerIndex?: number;
}

export const Activity = {
    isTopLevel: function(activity: IActivity) {
        return activity.data && !activity.data.frameElementId && !activity.data.hostElementId;
    },
    isSnapshot: function(activity: IActivity) {
        return activity.type === EVENT_TYPE.DOM_SNAPSHOT;
    },
    isVisibleSnapshot: function(a) {
        return this.isSnapshot(a) && a.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisible: function(c) {
        return c.type === EVENT_TYPE.VISIBILITY_CHANGE && c.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisibilityChange: function(b: IActivity) {
        return b.type === EVENT_TYPE.VISIBILITY_CHANGE;
    },
};
