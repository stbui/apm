angular
    .module('playerApp')
    .constant('LIVE_MODE_CONFIGS', {
        GO_LIVE_OFFSET_TIME: 1e3,
        MAX_ATTEMPTS: 3,
    })
    .constant('DEMO_USER_ROLE', 'demo')
    .constant('PLAN_EXPIRED', 'PLAN_EXPIRED')
    .controller('PlayerController', [
        '$scope',
        '$stateParams',
        'SessionDataClient',
        'player',
        'playerSettings',
        'auth',
        'analytics',
        'sessionstackManager',
        'pendoManager',
        'intercomManager',
        'utils',
        'navigation',
        'BrokerWebSocketClient',
        'BrokerClient',
        'InitialSettings',
        'LiveConnectionMonitor',
        'FRONTEND_URL',
        'SERVER_URL',
        'HTTP_STATUS',
        'DEMO_USER_ROLE',
        'LIVE_MODE_CONFIGS',
        'CONNECTION_STATUSES',
        'ANALYTICS_EVENT_TYPES',
        'PLAN_EXPIRED',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
            function y(b) {
                J.loadActivitiesUntil(z, b).then(function(b) {
                    z(b), a.sessionPlayerApi.finishLoadingActivities();
                }, B);
            }
            function z(b) {
                b &&
                    0 !== b.length &&
                    ((H = H || b[0].timestamp), A(b), (O = b[b.length - 1].time), a.sessionPlayerApi.addActivities(b));
            }
            function A(a) {
                angular.forEach(a, function(a) {
                    a.time = a.timestamp - H;
                });
            }
            function B(b) {
                if (b)
                    switch (b.status) {
                        case s.FORBIDDEN:
                            F(b) || (window.location = q + '#/login');
                            break;
                        case s.UNAUTHORIZED:
                            window.location = q + '#/login';
                            break;
                        case s.BAD_REQUEST:
                            a.errors.invalidSessionId = !0;
                            break;
                        case s.NOT_FOUND:
                            a.errors.sessionNotFound = !0;
                    }
            }
            function C() {
                var b,
                    c = G.getAccessToken(),
                    d = G.getSource();
                f.loadCurrentUser()
                    .then(function(a) {
                        b = a.id;
                    })
                    ['finally'](function() {
                        g.trackSessionOpened(b, a.sessionId, c, d);
                    });
            }
            function D() {
                f.loadCurrentUser().then(function(b) {
                    g.trackLiveSessionOpened(b.id, a.sessionId);
                });
            }
            function E() {
                f.loadCurrentUser().then(function(b) {
                    g.trackLiveSessionStopped(b.id, a.sessionId);
                });
            }
            function F(a) {
                return a.data && a.data.message === x;
            }
            if (((a.isBrowserNotSupported = k.isBrowserNotSupported()), !a.isBrowserNotSupported)) {
                e.init(a),
                    (a.sessionId = b.sessionId),
                    (a.errors = {}),
                    (a.activities = []),
                    (a.playRecordedSession = function() {
                        var b = a.initialSettings.getSession();
                        l.openSessionInNewWindow(b.id, b.hasInaccessibleResources, 'player_offline_button');
                    });
                var G,
                    H,
                    I = b.logId,
                    J = new c(a.sessionId, I, a.settings.general.playLive),
                    K = new n(m.createStreamingClient(a.sessionId)),
                    L = new n(m.createChatClient(a.sessionId)),
                    M = new p(K),
                    N = new p(L),
                    O = -1;
                f.loadCurrentUser().then(function(b) {
                    (a.user = b), h.identify(b), i.initialize(b), b.role !== t && j.update(b);
                }, B),
                    J.loadSession().then(function(b) {
                        (G = new o(
                            b.sessionData.session,
                            b.sessionData.log,
                            b.sessionData.askUserForStreamingPermission,
                            b.sessionData.customOrigin,
                            a.settings.general,
                            a.settings.analytics,
                            b.featureFlags
                        )),
                            (a.initialSettings = G),
                            C(),
                            G.shouldStartStreaming() && D();
                    }, B),
                    M.onStatusChange(function(b) {
                        var c = b === v.OFFLINE;
                        a.sessionPlayerApi.setUserHasGoneOffline(c),
                            c ? a.sessionPlayerApi.stopLiveStreaming() : a.sessionPlayerApi.startLiveStreaming();
                    }),
                    N.onStatusChange(function(b) {
                        var c = b === v.OFFLINE;
                        a.sessionPlayerApi.setUserHasGoneOffline(c),
                            c && (L.discardPendingRequests(), a.sessionPlayerApi.resetStreamingRequest(c));
                    }),
                    d.onUserPermissionRequestSend(a, function() {
                        N.start(),
                            L.onStreamingRequestDenied(function() {
                                N.stop(), L.disconnect(), a.sessionPlayerApi.denyStreamingRequest();
                            }),
                            L.onStreamingRequestApproved(function() {
                                N.stop(), L.disconnect(), a.sessionPlayerApi.approveStreamingRequest();
                            }),
                            L.onRecorderDisconnected(function() {
                                N.stop(), L.disconnect(), a.sessionPlayerApi.interruptStreamingRequest();
                            }),
                            L.connect(function() {
                                L.sendStreamingRequest();
                            });
                    }),
                    d.onUserPermissionRequestCanceled(a, function() {
                        N.stop(), L.sendStreamingRequestCanceled(), L.disconnect();
                    }),
                    d.onPlayerIsInitialized(a, function() {
                        if (
                            (a.sessionPlayerApi.setFeatureFlags(G.featureFlags),
                            a.sessionPlayerApi.setBrokerClient(K),
                            !G.shouldWaitUserConfirmation())
                        )
                            if (G.shouldStartStreaming()) a.sessionPlayerApi.startLiveStreaming();
                            else {
                                var b = G.getSession();
                                a.sessionPlayerApi.setSessionLength(b.length),
                                    a.sessionPlayerApi.startPlayback(),
                                    y(b.clientStartMilliseconds + b.length);
                            }
                    }),
                    d.onStartLiveStreaming(a, function(b, c) {
                        M.start(),
                            K.onAddData(function(b) {
                                z(b), a.sessionPlayerApi.setSessionLength(O);
                            }),
                            K.connect(function() {
                                c();
                            });
                    }),
                    d.onStopLiveStreaming(a, function() {
                        K.disconnect(), M.stop(), a.sessionPlayerApi.finishLoadingActivities(), E();
                    });
            }
        },
    ]);
