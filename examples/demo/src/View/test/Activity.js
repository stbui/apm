angular
    .module('playerApp')
    .constant('TAB_VISIBILITY', { VISIBLE: 'visible', HIDDEN: 'hidden' })
    .factory('Activity', [
        'EVENT_TYPE',
        'TAB_VISIBILITY',
        function(a, b) {
            return {
                isTopLevel: function(a) {
                    return a.data && !a.data.frameElementId && !a.data.hostElementId;
                },
                isSnapshot: function(b) {
                    return b.type === a.DOM_SNAPSHOT;
                },
                isVisibleSnapshot: function(a) {
                    return this.isSnapshot(a) && a.data.visibilityState === b.VISIBLE;
                },
                isTabVisible: function(c) {
                    return c.type === a.VISIBILITY_CHANGE && c.data.visibilityState === b.VISIBLE;
                },
                isTabVisibilityChange: function(b) {
                    return b.type === a.VISIBILITY_CHANGE;
                },
            };
        },
    ]);
