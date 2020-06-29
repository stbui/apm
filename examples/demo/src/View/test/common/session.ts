import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';
import { utils } from './utils';
import { $resource } from './resource';
import { angular } from './angular';

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
            shouldHideLoadingAnimation: true,
        },
    });

function getSession(sessionId: string) {
    // var b = l({
    //     session_id: sessionId,
    // });
    // return promise.execute(A.get, b);

    const url = restSettings.buildUrl('sessions/' + sessionId + '.json');
    return fetch(url).then(res => res.json());
}
function getSessionLog(sessionId, logId) {
    // var c = l({
    //     session_id: sessionId,
    //     log_id: logId,
    // });
    // return promise.execute(B.get, c);

    const url = restSettings.buildUrl(`sessions/${sessionId}/logs/${logId}`);
    return fetch(url).then(res => res.json());
}
function getSessionDetails(sessionId) {
    // return promise.execute(C.get, {
    //     session_id: sessionId,
    // });

    const url = restSettings.buildUrl(`sessions/${sessionId}/details`);
    return fetch(url).then(res => res.json());
}
function getSessionLogs(sessionId, params) {
    // return promise.execute(D.get, {
    //     session_id: sessionId,
    //     skip: b.skip,
    //     limit: b.limit,
    //     search: b.search || undefined,
    // });

    const url = restSettings.buildUrl(
        `sessions/${sessionId}/logs?skip=${params.skip}&limit=${params.limit}&search=${params.search}`
    );
    return fetch(url).then(res => res.json());
}
function getActivities(sessionId, params) {
    // var c = l({
    //     session_id: sessionId,
    //     events_timestamp: b.eventsTimestamp,
    //     events_index: b.eventsIndex,
    // });
    // return promise.execute(G.get, c);

    const url = restSettings.buildUrl(
        `sessions/${sessionId}/activities.${params.eventsTimestamp}.json?events_timestamp=${params.eventsTimestamp}&events_index=${params.eventsIndex}`
    );
    return fetch(url).then(res => res.json());
}
function l(a: { session_id: string; events_timestamp?: number; events_index?: number }) {
    var accessToken = tokenManager.getAccessToken();
    return accessToken && angular.isObject(a)
        ? utils.mergeObjects(a, {
              access_token: accessToken,
          })
        : a;
}
function getSessions(websiteId, params) {
    // return promise.execute(z.get, {
    //     website_id: websiteId,
    //     skip: b.skip,
    //     limit: b.limit,
    //     search: b.search || undefined,
    //     sort: b.sort || undefined,
    //     order: b.order || undefined,
    //     start_date: b.startDate || undefined,
    //     end_date: b.endDate || undefined,
    //     active_sessions: b.activeSessions,
    // });

    const url = restSettings.buildUrl(`websites/${websiteId}/sessions?skip=${params.skip}&limit=${params.limit}`);
    return fetch(url).then(res => res.json());
}
function deleteSession(websiteId, sessionId) {
    return deleteSessions(websiteId, [sessionId]);
}
function deleteSessions(websiteId, sessionIds) {
    // return promise.execute(z['delete'], {
    //     website_id: websiteId,
    //     session_ids: sessionIds,
    // });

    const url = restSettings.buildUrl(`websites/${websiteId}/sessions?session_ids=${sessionIds}`);
    return fetch(url, { method: 'DELETE' }).then(res => res.json());
}
function sessionCanBeDownloaded(sessionId) {
    // var b = l({
    //     session_id: sessionId,
    // });
    // return promise.execute(E.get, b);

    const url = restSettings.buildUrl(`sessions/${sessionId}/canbedownloaded`);
    return fetch(url).then(res => res.json());
}
function getActivitiesCount(sessionId) {
    // return promise.execute(F.get, {
    //     session_id: sessionId,
    // });

    const url = restSettings.buildUrl(`sessions/${sessionId}/activities/count`);
    return fetch(url).then(res => res.json());
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
