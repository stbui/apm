angular
    .module('playerApp')
    .constant('ACTIVITIES_POLL_WAIT_TIME', 0)
    .constant('NO_ACTIVITIES_POLL_WAIT_TIME', 500)
    .factory('SessionDataClient', [
        '$timeout',
        '$q',
        'session',
        'featureFlags',
        'utils',
        'lodash',
        'ACTIVITIES_POLL_WAIT_TIME',
        'NO_ACTIVITIES_POLL_WAIT_TIME',
        function(a, b, c, d, e, f, g, h) {
            function i(a) {
                var d = this,
                    e = b.defer();
                return (
                    (function f() {
                        return d.lastEventTimestamp >= d.timeLimit
                            ? e.resolve([])
                            : void c
                                  .getActivities(d.sessionId, {
                                      eventsTimestamp: d.lastEventTimestamp,
                                      eventsIndex: d.lastEventIndex,
                                  })
                                  .then(
                                      function(b) {
                                          var c = k(b, d.timeLimit);
                                          return 0 === c.activities.length
                                              ? e.resolve(c.activities)
                                              : ((d.lastEventTimestamp = c.lastEventTimestamp),
                                                (d.lastEventIndex = c.lastEventIndex),
                                                a(c.activities),
                                                void f());
                                      },
                                      function(a) {
                                          e.reject(a);
                                      }
                                  );
                    })(),
                    e.promise
                );
            }
            function j(a) {
                var b = f.last(a);
                return b ? b.time : null;
            }
            function k(a, b) {
                var c = a.activities,
                    d = j(c);
                return d && d > b ? l(c, b) : a;
            }
            function l(a, b) {
                var c,
                    d,
                    e = [];
                return (
                    f.forEach(a, function(a, f) {
                        return !(a.time > b) && (e.push(a), (c = a.timestamp), void (d = a.index));
                    }),
                    { activities: e, lastEventTimestamp: c, lastEventIndex: d }
                );
            }
            var m = function(a, b, c) {
                (this.sessionId = a),
                    (this.logId = b),
                    (this.isLiveStream = c),
                    (this.lastEventTimestamp = -1),
                    (this.lastEventIndex = -1),
                    (this.timeLimit = null),
                    this.loadingActivitiesPromise;
            };
            return (
                (m.prototype.loadSession = function() {
                    var a,
                        e = this,
                        f = b.defer(),
                        g = d.getSessionFeatureFlags(e.sessionId);
                    return (
                        (a = e.logId ? c.getSessionLog(e.sessionId, e.logId) : c.getSession(e.sessionId)),
                        b.all([g, a]).then(
                            function(a) {
                                var b = { featureFlags: a[0], sessionData: a[1] };
                                (e.isLive = b.sessionData.session.isLive), f.resolve(b);
                            },
                            function(a) {
                                f.reject(a);
                            }
                        ),
                        f.promise
                    );
                }),
                (m.prototype.loadActivitiesUntil = function(a, b) {
                    var c = this;
                    return (
                        (c.timeLimit = b),
                        c.loadingActivitiesPromise ||
                            (c.loadingActivitiesPromise = i.call(c, a).then(function(b) {
                                (c.loadingActivitiesPromise = null), a(b);
                            })),
                        c.loadingActivitiesPromise
                    );
                }),
                m
            );
        },
    ]);
