angular
    .module('playerApp')
    .constant('LOG_OFFSET', 5e3)
    .constant('LIVE_MODE_CONFIGS', {
        GO_LIVE_OFFSET_TIME: 1e3,
        MAX_ATTEMPTS: 3,
    })
    .constant('DEMO_USER_ROLE', 'demo')
    .controller('PlayerController', [
        '$scope',
        '$stateParams',
        'SessionDataClient',
        'player',
        'playerSettings',
        'auth',
        '$timeout',
        'utils',
        'sessionstackManager',
        'pendoManager',
        'intercomManager',
        'requestProgressHandlersManager',
        'LOG_OFFSET',
        'FRONTEND_URL',
        'SERVER_URL',
        'HTTP_STATUS',
        'DEMO_USER_ROLE',
        'PAUSE_AT_ACTIVITY_ID',
        'LIVE_MODE_CONFIGS',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
            function t(b) {
                y.loadActivitiesUntil(u, b, C).then(function() {
                    y.getSessionStatus().then(function(b) {
                        var c = b.length;
                        a.sessionPlayerApi.setSessionLength(c),
                            D < s.MAX_ATTEMPTS && c - s.GO_LIVE_OFFSET_TIME > w
                                ? (t(c), D++)
                                : B &&
                                  y.activitiesPollerIsCanceled &&
                                  ((a.isCatchingUpWithLive = !1), y.startLoadingActivities(u, C), (D = 0), (C = !0));
                    });
                });
            }
            function u(b) {
                if (b) {
                    var c = b.activities;
                    c.length > 0 && (w = c[c.length - 1].time), a.sessionPlayerApi.addActivities(c);
                }
            }
            function v(b) {
                if (b)
                    switch (b.status) {
                        case p.FORBIDDEN:
                        case p.UNAUTHORIZED:
                            window.location = n + '#/login';
                            break;
                        case p.BAD_REQUEST:
                            a.errors.invalidSessionId = !0;
                            break;
                        case p.NOT_FOUND:
                            a.errors.sessionNotFound = !0;
                    }
            }
            e.init(a), (a.sessionId = b.sessionId);
            var w,
                x = b.logId,
                y = new c(a.sessionId, x),
                z = a.settings.general.playFrom,
                A = a.settings.general.pauseAt,
                B = !1,
                C = !1,
                D = 0;
            (a.autostart = !0),
                (a.startTime = 0),
                (a.errors = {}),
                (a.activities = []),
                f.loadCurrentUser().then(function(a) {
                    i.identify(a), j.initialize(a), a.role !== q && k.update(a);
                }, v),
                y.loadSession().then(function(b) {
                    var c = b.log;
                    (a.session = b.session),
                        (a.isLive = b.session.isLive),
                        (a.sessionWasInitiallyLive = b.session.isLive && !a.settings.general.isDemo),
                        angular.isNumber(A)
                            ? ((A = Math.max(A, 0)),
                              (A = Math.min(A, a.session.length)),
                              (a.pauseActivity = { id: r, time: A }))
                            : c && !a.pauseActivity && ((a.selectedLogId = c.id), (a.pauseActivity = c)),
                        angular.isNumber(z)
                            ? ((z = Math.max(z, 0)), (z = Math.min(z, a.session.length)), (a.startTime = z))
                            : !c && a.pauseActivity
                            ? (a.startTime = Math.max(0, a.pauseActivity.time - m))
                            : c && c == a.pauseActivity && (a.startTime = Math.max(0, c.time - m));
                }, v),
                d.onPlayerIsInitialized(a, function() {
                    if (a.isLive && a.settings.general.playLive) a.sessionPlayerApi.startLiveStreaming();
                    else {
                        var b = a.session.length;
                        a.sessionPlayerApi.setSessionLength(b), y.loadActivitiesUntil(u, b).then(u, v);
                    }
                }),
                d.onStartLiveStreaming(a, function() {
                    (B = !0),
                        (a.isCatchingUpWithLive = !0),
                        y.getSessionStatus().then(function(b) {
                            var c = b.length;
                            a.sessionPlayerApi.setSessionLength(c), t(c);
                        });
                }),
                d.onStopLiveStreaming(a, function() {
                    (B = !1), y.stopLoadingActivities();
                }),
                y.startLoadingSessionStatus(function(b) {
                    (a.isLive = b.isLive), a.isLive || y.stopLoadingSessionStatus();
                }),
                l.registerProgressHandler(new RegExp(o + 'sessions/*'), function(b) {
                    a.requestProgress = b;
                });
        },
    ]);
