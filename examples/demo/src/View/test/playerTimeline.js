angular
    .module('playerApp')
    .constant('MIN_ACTIVITY_BLOCK_WIDTH', 2)
    .directive('playerTimeline', [
        'MIN_ACTIVITY_BLOCK_WIDTH',
        'PLAYER_CONFIG',
        'lodash',
        '$timeout',
        function(a, b, c, d) {
            return {
                templateUrl: 'templates/timeline.html',
                replace: !0,
                scope: {
                    value: '=',
                    selectedValue: '=',
                    valueSelectionInProgress: '=',
                    max: '=',
                    enable: '=',
                    disable: '=',
                    pauseActivity: '=',
                    isLive: '=',
                    refresh: '=',
                    isCreated: '=',
                },
                restrict: 'E',
                link: function(a, b, d) {
                    function e() {
                        if (!a.isTimelineSelectionInProgress) {
                            var b = Math.min(a.value, a.loadedTime);
                            a.renderedTimePercentage = a.timelineValueToPercentage(b);
                        }
                    }
                    function f() {
                        return a.max - a.min;
                    }
                    function g(b) {
                        var c = j.offset(),
                            d = Math.max(b.pageX - c.left, a.min + 1);
                        return i(d);
                    }
                    function h(a) {
                        var b = [],
                            c = f() / j.width(),
                            d = { time: 0 },
                            e = 0;
                        return (
                            a.forEach(function(a) {
                                if (a.isFirstLiveActivity) {
                                    var f = {
                                        unknown: !0,
                                        time: d.time,
                                        duration: a.time - d.time,
                                    };
                                    b.push(f);
                                }
                                a.time >= e && (b.push(a), (e = a.time + c)), (d = a);
                            }),
                            b
                        );
                    }
                    function i(b) {
                        var c = b / j.width();
                        return a.min + c * f();
                    }
                    var j = b.find('.timeline-track'),
                        k = b.find('.timeline-progress-handle'),
                        l = b.find('.timeline-pause-activity-wrapper'),
                        m = (b.find('.timeline-buffering-bar'), k.width(), !1);
                    (a.value = 0),
                        (a.min = 0),
                        (a.max = 0),
                        (a.pauseActivityOffset = -1),
                        (a.loadedTime = 0),
                        (a.handleOffset = 0),
                        (a.renderedTimePercentage = 0),
                        (a.loadedTimePercentage = 0),
                        (a.enable = function() {
                            (m = !0), a.enableTimelineHandle();
                        }),
                        (a.disable = function() {
                            (m = !1), a.disableTimelineHandle();
                        }),
                        (a.timelineValueToPercentage = function(a) {
                            return (a / f()) * 100;
                        }),
                        a.$watch('value', function() {
                            var b = (k.width() / j.width()) * 100,
                                c = a.timelineValueToPercentage(a.value);
                            (a.handleOffset = c - b / 2), e();
                        }),
                        (a.activityWidthInPercents = function(a) {
                            var b = a.duration || 1;
                            return (b / f()) * 100;
                        }),
                        (a.refresh = function(b, d) {
                            var f = a.activityBlocks || [];
                            if (
                                (d.forEach(function(a) {
                                    var b = { time: a.time };
                                    a.isFirstLiveActivity && (b.isFirstLiveActivity = !0), f.push(b);
                                }),
                                (a.activityBlocks = h(f)),
                                b)
                            )
                                a.loadedTime = a.max;
                            else if (d.length > 0) {
                                var g = c.last(d);
                                (a.max = Math.max(a.max, g.time)), (a.loadedTime = g.time);
                            }
                            (a.loadedTimePercentage = a.timelineValueToPercentage(a.loadedTime)),
                                e(),
                                a.pauseActivity
                                    ? (l.show(),
                                      (a.pauseActivityOffset = a.timelineValueToPercentage(
                                          Math.max(0, a.pauseActivity.time)
                                      )))
                                    : l.hide();
                        }),
                        k.on('dragstart', function(b) {
                            a.$apply(function() {
                                (a.valueSelectionInProgress = !0), (a.draggedValue = null);
                            });
                        }),
                        k.on('drag', function(b) {
                            a.$apply(function() {
                                var c = j.offset(),
                                    d = Math.max(b.pageX - c.left, a.min + 1);
                                a.draggedValue = i(d);
                            });
                        }),
                        k.on('dragstop', function(b) {
                            a.$apply(function() {
                                (a.valueSelectionInProgress = !1),
                                    (a.draggedValue = null),
                                    (a.value = g(b)),
                                    (a.selectedValue = a.value);
                            });
                        }),
                        j.on('click', function(b) {
                            if (m) {
                                var c = angular.element(b.target),
                                    d = c.hasClass('timeline-unknown-activity');
                                d ||
                                    a.$apply(function() {
                                        (a.value = g(b)), (a.selectedValue = a.value);
                                    });
                            }
                        }),
                        (a.isCreated = !0);
                },
            };
        },
    ]);
