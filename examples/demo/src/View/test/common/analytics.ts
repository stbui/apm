import { restSettings } from './restSettings';
import { $resource, promise } from './resource';
import { ANALYTICS_EVENT_TYPES } from './constant';

var l = restSettings.buildUrl('analytics');
var m = restSettings.buildUrl('analytics/sessions/:session_id');
var n = restSettings.buildUrl('analytics/live_sessions');
var o = $resource(l);
var p = $resource(m);
var q = $resource(n);

function trackEvent(userId, eventType, eventProperties, userProperties?, time?) {
    return promise.execute(o.save, {
        userId: userId,
        eventType: eventType,
        eventProperties: eventProperties,
        userProperties: userProperties,
        time: time,
    });
}
function trackSessionOpened(userId, session_id, access_token, source) {
    return promise.execute(
        p.save,
        {
            session_id: session_id,
            access_token: access_token,
        },
        {
            userId: userId,
            eventType: ANALYTICS_EVENT_TYPES.SESSION_OPENED,
            eventProperties: {
                session_id: session_id,
                access_token: access_token,
                source: source,
            },
        }
    );
}
function trackLiveSessionOpened(a, b) {
    return promise.execute(q.save, {
        userId: a,
        eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_OPENED,
        eventProperties: {
            session_id: b,
        },
    });
}
function trackLiveSessionStopped(userId, sessionId) {
    return promise.execute(q.save, {
        userId: userId,
        eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_STOPPED,
        eventProperties: {
            session_id: sessionId,
        },
    });
}
function trackProjectOpened(userId, projectId, projectName) {
    return trackEvent(userId, ANALYTICS_EVENT_TYPES.PROJECT_OPENED, {
        project_id: projectId,
        project_name: projectName,
    });
}
function trackProjectSettingsOpened(userId, projectId, projectName) {
    return trackEvent(userId, ANALYTICS_EVENT_TYPES.PROJECT_SETTINGS_OPENED, {
        project_id: projectId,
        project_name: projectName,
    });
}

export const analytics = {
    trackEvent: trackEvent,
    trackSessionOpened: trackSessionOpened,
    trackLiveSessionOpened: trackLiveSessionOpened,
    trackLiveSessionStopped: trackLiveSessionStopped,
    trackProjectOpened: trackProjectOpened,
    trackProjectSettingsOpened: trackProjectSettingsOpened,
};
