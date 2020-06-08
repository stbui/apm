import { restSettings } from './restSettings';
import { $resource, promise } from './resource';
import { ANALYTICS_EVENT_TYPES } from './constant';

var l = restSettings.buildUrl('analytics'),
    m = restSettings.buildUrl('analytics/sessions/:session_id'),
    n = restSettings.buildUrl('analytics/live_sessions'),
    o = $resource(l),
    p = $resource(m),
    q = $resource(n);

function f(a, b, d, e?, f?) {
    return promise.execute(o.save, {
        userId: a,
        eventType: b,
        eventProperties: d,
        userProperties: e,
        time: f,
    });
}
function g(a, b, d, f) {
    return promise.execute(
        p.save,
        {
            session_id: b,
            access_token: d,
        },
        {
            userId: a,
            eventType: ANALYTICS_EVENT_TYPES.SESSION_OPENED,
            eventProperties: {
                session_id: b,
                access_token: d,
                source: f,
            },
        }
    );
}
function h(a, b) {
    return promise.execute(q.save, {
        userId: a,
        eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_OPENED,
        eventProperties: {
            session_id: b,
        },
    });
}
function i(a, b) {
    return promise.execute(q.save, {
        userId: a,
        eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_STOPPED,
        eventProperties: {
            session_id: b,
        },
    });
}
function j(a, b, c) {
    return f(a, ANALYTICS_EVENT_TYPES.PROJECT_OPENED, {
        project_id: b,
        project_name: c,
    });
}
function k(a, b, c) {
    return f(a, ANALYTICS_EVENT_TYPES.PROJECT_SETTINGS_OPENED, {
        project_id: b,
        project_name: c,
    });
}

export const analytics = {
    trackEvent: f,
    trackSessionOpened: g,
    trackLiveSessionOpened: h,
    trackLiveSessionStopped: i,
    trackProjectOpened: j,
    trackProjectSettingsOpened: k,
};
