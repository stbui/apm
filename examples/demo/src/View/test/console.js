angular
    .module('playerApp')
    .constant('CONSOLE_CONSTANTS', {
        ANIMATION_TIME: 300,
        HEIGHT: 300,
        STEP_HEIGHT: 32,
    })
    .directive('console', [
        '$timeout',
        'player',
        'sessionstackManager',
        'utils',
        'lodash',
        'CONSOLE_CONSTANTS',
        'LOG_LEVEL',
        function(a, b, c, d, e, f, g) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: 'templates/console.html',
                scope: {
                    openConsole: '=',
                    closeConsole: '=',
                    isExpanded: '=',
                    addNewLogs: '=',
                    updateConsole: '=',
                    onSelectedLog: '=',
                },
                link: function(h, i, j) {
                    function k() {
                        r && (a.cancel(r), (r = null)),
                            (r = a(function() {
                                c.log('Console search used');
                            }, 2e3));
                    }
                    function l(a) {
                        if (!t.is(':hover') && h.isExpanded) {
                            var b = e.findIndex(h.filteredLogs, ['activityIndex', a]);
                            if (!(b < 0)) {
                                var c = (t.outerHeight(), m(a)),
                                    d = 2 * f.STEP_HEIGHT,
                                    g = c - d;
                                u.stop().animate({ scrollTop: g }, 300);
                            }
                        }
                    }
                    function m(a) {
                        if (isNaN(a)) return 0;
                        var b = 0;
                        return (
                            h.filteredLogs.forEach(function(c) {
                                if (c.activityIndex < a) {
                                    var d = s[c.activityIndex] || 0;
                                    b += d;
                                }
                            }),
                            b
                        );
                    }
                    function n() {
                        i.animate({ height: 0 }, f.ANIMATION_TIME),
                            (h.isExpanded = !1),
                            a(function() {
                                b.fireConsoleResize(h, 0);
                            }, f.ANIMATION_TIME);
                    }
                    function o() {
                        i.animate({ height: f.HEIGHT }, f.ANIMATION_TIME),
                            b.fireConsoleResize(h, f.HEIGHT),
                            (h.isExpanded = !0),
                            h.$broadcast('$md-resize'),
                            l(h.lastPlayedActivityIndex);
                    }
                    function p() {
                        d.forEach(g, function(a) {
                            h.logTypes[a] = !0;
                        });
                    }
                    (h.isExpanded = !1),
                        (h.selectedTab = 0),
                        (h.transformedLogs = []),
                        (h.logTypes = {}),
                        (h.lastPlayedActivityIndex = 0),
                        (h.selectedLogIndex = null);
                    var q,
                        r,
                        s = {},
                        t = i.find('.logs-container'),
                        u = i
                            .find('.md-virtual-repeat-container')
                            .children()
                            .eq(0);
                    p(),
                        (h.openConsole = function(a) {
                            h.isExpanded || o(), d.isNumber(a) && h.selectLog(a);
                        }),
                        (h.closeConsole = function() {
                            n();
                        }),
                        (h.selectTab = function(a) {
                            h.selectedTab = a;
                        }),
                        (h.toggleFilter = function(a) {
                            (h.logTypes[a] = !h.logTypes[a]), l(h.lastPlayedActivityIndex), k();
                        }),
                        (h.searchChanged = function() {
                            k();
                        }),
                        (h.addNewLogs = function(a) {
                            d.isArray(a) &&
                                a.forEach(function(a) {
                                    if (a) {
                                        if (
                                            (h.transformedLogs.length > 0 &&
                                                (q = h.transformedLogs[h.transformedLogs.length - 1]),
                                            d.isDifferentActivity(a, q))
                                        )
                                            h.transformedLogs.push(a);
                                        else {
                                            var b = h.transformedLogs[h.transformedLogs.length - 1];
                                            (b.activityIndex = a.activityIndex), b.count++;
                                        }
                                        s[a.activityIndex] = f.STEP_HEIGHT;
                                    }
                                });
                        }),
                        (h.updateConsole = function(a) {
                            (h.lastPlayedActivityIndex = a),
                                h.selectedLogIndex || l(a),
                                h.selectedLogIndex < a && l(a),
                                a >= h.selectedLogIndex && (h.selectedLogIndex = null);
                        }),
                        (h.selectLog = function(a) {
                            (h.selectedLogIndex = a), h.onSelectedLog(a), l(a);
                        }),
                        (h.onLogToggle = function(a, b) {
                            (s[a] = s[a] || 0), (s[a] += b);
                        });
                },
            };
        },
    ]);
