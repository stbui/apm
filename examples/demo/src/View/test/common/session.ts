import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';
import { utils } from './utils';
import { angular } from './angular';

function getSession(sessionId: string) {
    const url = restSettings.buildUrl('sessions/' + sessionId + '.json');
    return fetch(url).then(res => res.json());
}
function getSessionLog(sessionId: string, logId) {
    const url = restSettings.buildUrl(`sessions/${sessionId}/logs/${logId}`);
    return fetch(url).then(res => res.json());
}
function getSessionDetails(sessionId: string) {
    const url = restSettings.buildUrl(`sessions/${sessionId}/details`);
    return fetch(url).then(res => res.json());
}
function getSessionLogs(sessionId: string, params) {
    const url = restSettings.buildUrl(
        `sessions/${sessionId}/logs?skip=${params.skip}&limit=${params.limit}&search=${params.search}`
    );
    return fetch(url).then(res => res.json());
}
function getActivities(sessionId: string, params) {
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
function getSessions(websiteId: string, params) {
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
function deleteSession(websiteId: string, sessionId: string) {
    return deleteSessions(websiteId, [sessionId]);
}
function deleteSessions(websiteId: string, sessionIds: string[]) {
    const url = restSettings.buildUrl(`websites/${websiteId}/sessions?session_ids=${sessionIds}`);
    return fetch(url, { method: 'DELETE' }).then(res => res.json());
}
function sessionCanBeDownloaded(sessionId: string) {
    const url = restSettings.buildUrl(`sessions/${sessionId}/canbedownloaded`);
    return fetch(url).then(res => res.json());
}
function getActivitiesCount(sessionId: string) {
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
