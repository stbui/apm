angular.module('commonApp').factory('analytics', [
    '$resource',
    '$q',
    'promise',
    'restSettings',
    'ANALYTICS_EVENT_TYPES',
    function (a, b, c, d, e) {
        function f(a, b, d, e, f) {
            return c.execute(o.save, {
                userId: a,
                eventType: b,
                eventProperties: d,
                userProperties: e,
                time: f,
            });
        }
        function g(a, b, d, f) {
            return c.execute(
                p.save,
                {
                    session_id: b,
                    access_token: d,
                },
                {
                    userId: a,
                    eventType: e.SESSION_OPENED,
                    eventProperties: {
                        session_id: b,
                        access_token: d,
                        source: f,
                    },
                }
            );
        }
        function h(a, b) {
            return c.execute(q.save, {
                userId: a,
                eventType: e.LIVE_SESSION_OPENED,
                eventProperties: {
                    session_id: b,
                },
            });
        }
        function i(a, b) {
            return c.execute(q.save, {
                userId: a,
                eventType: e.LIVE_SESSION_STOPPED,
                eventProperties: {
                    session_id: b,
                },
            });
        }
        function j(a, b, c) {
            return f(a, e.PROJECT_OPENED, {
                project_id: b,
                project_name: c,
            });
        }
        function k(a, b, c) {
            return f(a, e.PROJECT_SETTINGS_OPENED, {
                project_id: b,
                project_name: c,
            });
        }
        var l = d.buildUrl('analytics'),
            m = d.buildUrl('analytics/sessions/:session_id'),
            n = d.buildUrl('analytics/live_sessions'),
            o = a(l),
            p = a(m),
            q = a(n);
        return {
            trackEvent: f,
            trackSessionOpened: g,
            trackLiveSessionOpened: h,
            trackLiveSessionStopped: i,
            trackProjectOpened: j,
            trackProjectSettingsOpened: k,
        };
    },
]);

export const analytics = {
    trackEvent: function () {},
    trackSessionOpened: function (a?, b?, c?, d?) {},
    trackLiveSessionOpened: function (a?, b?, c?) {},
    trackLiveSessionStopped: function (a?, b?) {},
    trackProjectOpened: function () {},
    trackProjectSettingsOpened: function () {},
};
