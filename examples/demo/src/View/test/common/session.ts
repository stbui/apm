import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';
import { utils } from './utils';
import { $resource } from './resource';

//

var r = restSettings.buildUrl('websites/:website_id/sessions'),
    s = restSettings.buildUrl('sessions/:session_id'),
    t = restSettings.buildUrl('sessions/:session_id/logs/:log_id'),
    u = restSettings.buildUrl('sessions/:session_id/details'),
    v = restSettings.buildUrl('sessions/:session_id/logs'),
    w = restSettings.buildUrl('sessions/:session_id/canbedownloaded'),
    x = restSettings.buildUrl('sessions/:session_id/activities'),
    y = restSettings.buildUrl('sessions/:session_id/activities/count'),
    z = $resource(r),
    A = $resource(s),
    B = $resource(t),
    C = $resource(u),
    D = $resource(v),
    E = $resource(w),
    F = $resource(y),
    G = $resource(x, null, {
        get: {
            shouldHideLoadingAnimation: !0,
        },
    });

function getSession(sessionId) {
    var b = l({
        session_id: sessionId,
    });
    return promise.execute(A.get, b);
}
function getSessionLog(sessionId, logId) {
    var c = l({
        session_id: sessionId,
        log_id: logId,
    });
    return promise.execute(B.get, c);
}
function getSessionDetails(sessionId) {
    return promise.execute(C.get, {
        session_id: sessionId,
    });
}
function getSessionLogs(sessionId, b) {
    return promise.execute(D.get, {
        session_id: sessionId,
        skip: b.skip,
        limit: b.limit,
        search: b.search || void 0,
    });
}
function getActivities(sessionId, b) {
    var c = l({
        session_id: sessionId,
        events_timestamp: b.eventsTimestamp,
        events_index: b.eventsIndex,
    });
    return promise.execute(G.get, c);
}
function l(a) {
    var b = tokenManager.getAccessToken();
    return b && angular.isObject(a)
        ? utils.mergeObjects(a, {
              access_token: b,
          })
        : a;
}
function getSessions(websiteId, b) {
    return promise.execute(z.get, {
        website_id: websiteId,
        skip: b.skip,
        limit: b.limit,
        search: b.search || void 0,
        sort: b.sort || void 0,
        order: b.order || void 0,
        start_date: b.startDate || void 0,
        end_date: b.endDate || void 0,
        active_sessions: b.activeSessions,
    });
}
function deleteSession(websiteId, sessionId) {
    return deleteSessions(websiteId, [sessionId]);
}
function deleteSessions(websiteId, sessionIds) {
    return promise.execute(z['delete'], {
        website_id: websiteId,
        session_ids: sessionIds,
    });
}
function sessionCanBeDownloaded(sessionId) {
    var b = l({
        session_id: sessionId,
    });
    return promise.execute(E.get, b);
}
function getActivitiesCount(sessionId) {
    return promise.execute(F.get, {
        session_id: sessionId,
    });
}

export const session = {
    getSession: getSession,
    getSessionLog: getSessionLog,
    getSessionDetails: getSessionDetails,
    getSessionLogs: getSessionLogs,
    getSessions: getSessions,
    deleteSession: deleteSession,
    deleteSessions: deleteSessions,
    sessionCanBeDownloaded: sessionCanBeDownloaded,
    getActivities: getActivities,
    getActivitiesCount: getActivitiesCount,
};
