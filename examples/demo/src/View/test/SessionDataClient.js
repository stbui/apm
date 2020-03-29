angular
    .module('playerApp')
    .constant('ACTIVITIES_POLL_WAIT_TIME', 0)
    .constant('NO_ACTIVITIES_POLL_WAIT_TIME', 500)
    .constant('SESSION_STATUS_POLL_WAIT_TIME', 3e4)
    .factory('SessionDataClient', [
        '$timeout',
        '$q',
        'session',
        'utils',
        'lodash',
        'ACTIVITIES_POLL_WAIT_TIME',
        'SESSION_STATUS_POLL_WAIT_TIME',
        'NO_ACTIVITIES_POLL_WAIT_TIME',
        function(a, b, c, d, e, f, g, h) {
            function i(a, f) {
                var g = this,
                    h = b.defer();
                return (
                    (function i() {
                        if (
                            (d.isFunction(a) || (a = angular.noop),
                            g.timeLimit && g.lastLoadedActivityTime >= g.timeLimit)
                        )
                            return void h.resolve({ activities: [] });
                        var b = !!f || !e.isNumber(g.timeLimit),
                            l = {
                                eventsTimestamp: g.lastEventTimestamp,
                                eventsIndex: g.lastEventIndex,
                                logsTimestamp: g.lastLogTimestamp,
                                noCache: b,
                            };
                        c.getActivities(g.sessionId, l).then(
                            function(b) {
                                g.isPolling = !0;
                                var c = k(b, g.timeLimit);
                                if (0 === c.activities.length)
                                    return void h.resolve({
                                        activities: c.activities,
                                    });
                                (g.lastEventTimestamp = c.lastEventTimestamp || g.lastEventTimestamp),
                                    (g.lastEventIndex = c.lastEventIndex || g.lastEventIndex),
                                    (g.lastLogTimestamp = c.lastLogTimestamp || g.lastLogTimestamp),
                                    (g.lastLoadedActivityTime = j(c.activities));
                                var d = {
                                    activities: c.activities,
                                    isLive: g.isLive,
                                };
                                a(d), i();
                            },
                            function(a) {
                                h.reject(a);
                            }
                        );
                    })(),
                    h.promise
                );
            }
            function j(a) {
                var b = e.last(a);
                if (b) return b.time;
            }
            function k(a, b) {
                var c = a.activities,
                    d = j(c);
                return d && e.isNumber(b) && d > b ? l(c, b) : a;
            }
            function l(a, b) {
                var c,
                    d,
                    f,
                    g = [];
                return (
                    e.forEach(a, function(a) {
                        return (
                            !(a.time > b) &&
                            (g.push(a), void (a.id ? (f = a.timestamp) : ((c = a.timestamp), (d = a.index))))
                        );
                    }),
                    {
                        activities: g,
                        lastEventTimestamp: c,
                        lastEventIndex: d,
                        lastLogTimestamp: f,
                    }
                );
            }
            var m = function(a, b) {
                (this.sessionId = a),
                    (this.logId = b),
                    (this.lastEventTimestamp = 0),
                    (this.lastEventIndex = 0),
                    (this.lastLogTimestamp = 0),
                    (this.timeLimit = null),
                    (this.lastLoadedActivityTime = 0),
                    this.loadingActivitiesPromise,
                    (this.activitiesPollerIsCanceled = !0);
            };
            return (
                (m.prototype.loadSession = function() {
                    var a = this,
                        d = b.defer(),
                        e = function(b) {
                            (a.isLive = b.session.isLive), d.resolve(b);
                        },
                        f = function(a) {
                            d.reject(a);
                        };
                    return (
                        a.logId
                            ? c.getSessionLog(a.sessionId, a.logId).then(e, f)
                            : c.getSession(a.sessionId).then(e, f),
                        d.promise
                    );
                }),
                (m.prototype.startLoadingActivities = function(b, c) {
                    var e = this;
                    e.stopLoadingActivities(),
                        (e.activitiesPollerIsCanceled = !1),
                        d.isFunction(b) || (b = angular.noop),
                        (function g(d) {
                            !e.activitiesPollerIsCanceled &&
                                e.isLive &&
                                (e.activitiesPoller = a(function() {
                                    e.loadActivitiesUntil(b, null, c).then(function(a) {
                                        g(h);
                                    });
                                }, d));
                        })(f);
                }),
                (m.prototype.stopLoadingActivities = function() {
                    this.activitiesPollerIsCanceled = !0;
                }),
                (m.prototype.startLoadingSessionStatus = function(b) {
                    var e = this;
                    e.stopLoadingSessionStatus(),
                        (e.sessionStatusPollerIsCanceled = !1),
                        d.isFunction(b) || (b = angular.noop),
                        (function f() {
                            e.sessionStatusPollerIsCanceled ||
                                a(function() {
                                    c.getSessionStatus(e.sessionId).then(function(a) {
                                        b(a), f();
                                    });
                                }, g);
                        })();
                }),
                (m.prototype.stopLoadingSessionStatus = function() {
                    this.sessionStatusPollerIsCanceled = !0;
                }),
                (m.prototype.getSessionStatus = function() {
                    return c.getSessionStatus(this.sessionId);
                }),
                (m.prototype.loadActivitiesUntil = function(a, b, c) {
                    var d = this;
                    return (
                        (!b || d.lastLoadedActivityTime < b) && (d.timeLimit = b),
                        d.loadingActivitiesPromise ||
                            (d.loadingActivitiesPromise = i.call(d, a, c).then(function(b) {
                                (d.loadingActivitiesPromise = null), a(b);
                            })),
                        d.loadingActivitiesPromise
                    );
                }),
                m
            );
        },
    ]);
