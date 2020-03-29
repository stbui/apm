angular
    .module('playerApp')
    .constant('MIN_ACTIVITY_BLOCK_WIDTH', 2)
    .directive('playerTimeline', [
        'MIN_ACTIVITY_BLOCK_WIDTH',
        'player',
        function(a, b) {
            return {
                templateUrl: 'templates/timeline.html',
                replace: !0,
                scope: {
                    min: '=',
                    max: '=',
                    value: '=',
                    isDirty: '=',
                    activities: '=',
                    enable: '=',
                    disable: '=',
                    pauseActivity: '=',
                    isLive: '=',
                    refresh: '=',
                    isCreated: '=',
                },
                restrict: 'E',
                link: function(a, c, d) {
                    function e(b) {
                        var c = p.offset(),
                            d = Math.max(b.pageX - c.left, a.min + 1),
                            e = k(d);
                        j(e);
                    }
                    function f(b) {
                        var c = a.timelineValueToPercentage(b);
                        l(c);
                    }
                    function g(b) {
                        a.activities[u] ? (w = a.timelineValueToPercentage(a.activities[u].time)) : b && (w = 100);
                        a.loadedBarWidth = w;
                    }
                    function h(a) {
                        for (var b, c, d = [], e = o / m(), f = 0, g = a.length; f < g; )
                            for (b = a[f], d.push(b), c = b.time + e, f++; f < g && a[f].time < c; ) f++;
                        return d;
                    }
                    function i(b) {
                        (a.isDirty = b), a.$apply();
                    }
                    function j(b) {
                        var c = Math.max(b, a.min);
                        (c = Math.min(c, a.max)), (a.value = c), a.$apply();
                    }
                    function k(b) {
                        var c = m(),
                            d = b / c;
                        return a.min + d * o;
                    }
                    function l(b) {
                        (b = Math.max(b, 0)), (b = Math.min(b, 100));
                        var c = a.timelineValueToPercentage(a.value);
                        a.timelineProgressBarWidth = Math.min(c, w);
                        var d = n(s / 2),
                            e = b - d;
                        a.timelineProgressHandleOffset = e;
                    }
                    function m() {
                        return p.width();
                    }
                    function n(a) {
                        var b = m();
                        return (a / b) * 100;
                    }
                    var o,
                        p = c.find('.timeline-clickable-wrapper'),
                        q = c.find('.timeline-progress-handle'),
                        r = c.find('.timeline-pause-activity-wrapper'),
                        s = (c.find('.timeline-buffering-bar'), q.width()),
                        t = !1,
                        u = -1,
                        v = !1,
                        w = 0;
                    (a.pauseActivityOffset = -1),
                        (a.timelineProgressHandleOffset = 0),
                        (a.timelineProgressBarWidth = 0),
                        (a.enable = function() {
                            (v = !0), a.enableTimelineHandle();
                        }),
                        (a.disable = function() {
                            (v = !1), a.disableTimelineHandle();
                        }),
                        a.$watch('[max, min]', function() {
                            angular.isUndefined(a.min) ||
                                angular.isUndefined(a.max) ||
                                ((o = a.max - a.min), a.refresh());
                        }),
                        q.on('drag', function(b, c) {
                            if (v) {
                                var d = Math.max(c.position.left, a.min + 1),
                                    e = k(d);
                                (t = !0), j(e), (t = !1);
                            }
                        }),
                        q.on('dragstart', function() {
                            v && i(!0);
                        }),
                        q.on('dragstop', function(a) {
                            e(a), i(!1);
                        }),
                        p.on('click', function(a) {
                            v && (i(!0), e(a), i(!1));
                        }),
                        a.$watch('value', function(a) {
                            t || f(a);
                        }),
                        a.$watch('pauseActivity', function() {
                            a.pauseActivity && a.refresh();
                        }),
                        (a.refresh = function(b) {
                            if (angular.isArray(a.activities)) {
                                var c = a.activities.slice(u + 1),
                                    d = a.activityBlocks || [];
                                angular.forEach(c, function(a) {
                                    d.push({ time: a.time });
                                }),
                                    (a.activityBlocks = h(d)),
                                    (u = a.activities.length - 1),
                                    g(b),
                                    f(a.value),
                                    a.pauseActivity
                                        ? (r.show(),
                                          (a.pauseActivityOffset = a.timelineValueToPercentage(
                                              Math.max(0, a.pauseActivity.time)
                                          )))
                                        : r.hide();
                            }
                        }),
                        a.$watch('activities.length', a.refresh),
                        (a.timelineValueToPercentage = function(a) {
                            return (a / o) * 100;
                        }),
                        b.onShowBuffering(a, function() {
                            a.isBuffering = !0;
                        }),
                        b.onHideBuffering(a, function() {
                            a.isBuffering = !1;
                        }),
                        (a.isCreated = !0);
                },
            };
        },
    ]);
