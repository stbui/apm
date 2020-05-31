const TAB_VISIBILITY = { VISIBLE: 'visible', HIDDEN: 'hidden' };
const EVENT_TYPE: any = {};

export const Activity = {
    isTopLevel: function (a) {
        return a.data && !a.data.frameElementId && !a.data.hostElementId;
    },
    isSnapshot: function (b) {
        return b.type === EVENT_TYPE.DOM_SNAPSHOT;
    },
    isVisibleSnapshot: function (a) {
        return this.isSnapshot(a) && a.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisible: function (c) {
        return c.type === EVENT_TYPE.VISIBILITY_CHANGE && c.data.visibilityState === TAB_VISIBILITY.VISIBLE;
    },
    isTabVisibilityChange: function (b) {
        return b.type === EVENT_TYPE.VISIBILITY_CHANGE;
    },
};
