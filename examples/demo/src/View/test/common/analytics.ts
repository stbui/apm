import { restSettings } from './restSettings';
import { ANALYTICS_EVENT_TYPES } from './constant';

function trackEvent(userId, eventType, eventProperties, userProperties?, time?) {
    const url = restSettings.buildUrl('analytics');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            eventType: eventType,
            eventProperties: eventProperties,
            userProperties: userProperties,
            time: time,
        }),
    }).then(res => res.json());
}
function trackSessionOpened(userId, session_id, access_token, source) {
    const url = restSettings.buildUrl('analytics/sessions/:session_id');
    return fetch(url, {
        method: 'POST',
        headers: {
            session_id: session_id,
            access_token: access_token,
        },
        body: JSON.stringify({
            userId: userId,
            eventType: ANALYTICS_EVENT_TYPES.SESSION_OPENED,
            eventProperties: {
                session_id: session_id,
                access_token: access_token,
                source: source,
            },
        }),
    }).then(res => res.json());
}
function trackLiveSessionOpened(userId, sessionId) {
    const url = restSettings.buildUrl('analytics/live_sessions');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_OPENED,
            eventProperties: {
                session_id: sessionId,
            },
        }),
    }).then(res => res.json());
}
function trackLiveSessionStopped(userId, sessionId) {
    const url = restSettings.buildUrl('analytics/live_sessions');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            eventType: ANALYTICS_EVENT_TYPES.LIVE_SESSION_STOPPED,
            eventProperties: {
                session_id: sessionId,
            },
        }),
    }).then(res => res.json());
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
