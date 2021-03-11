const TAB_VISIBILITY = { VISIBLE: 'visible', HIDDEN: 'hidden' };
const EVENT_TYPE: any = {};

export interface IException {
    type?: string;
    message?: string;
    stackFrames?: string[];
}

export interface IActivityData {
    message: string;
    level: string;
    frameElementId: string;
    hostElementId: string;
    type: string;
    isMessageTrimmed: boolean;
    exception: IException;
    visibilityState: 'visible' | 'hidden';
}

export interface IActivity {
    data: IActivityData;
    index: number;
    time: number;
    timestamp: number;
    // type: 'dom_snapshot';
    type: string;
    // Activities.push
    playerIndex?: number;
    id?: any;
}

export const Activity = {
    isTopLevel: function (activity: IActivity) {
        return activity.data && !activity.data.frameElementId && !activity.data.hostElementId;
    },
    isSnapshot: function (activity: IActivity) {
        return activity.type === EVENT_TYPE.DOM_SNAPSHOT;
    },
    isVisibleSnapshot: function (a) {
        return this.isSnapshot(a) && a.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisible: function (c) {
        return c.type === EVENT_TYPE.VISIBILITY_CHANGE && c.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisibilityChange: function (activity: IActivity) {
        return activity.type === EVENT_TYPE.VISIBILITY_CHANGE;
    },
};
