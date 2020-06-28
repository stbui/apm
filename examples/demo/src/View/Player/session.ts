import { tokenManager } from './tokenManager';

import mock from './mock';

function toAccessToken(obj) {
    var accessToken = tokenManager.getAccessToken();
    if (accessToken && typeof obj === 'object') {
        return Object.assign(obj, { access_token: accessToken });
    }

    return obj;
}
export const session = {
    getSession: sessionId => {
        const accessToken = toAccessToken({ session_id: sessionId });

        return new Promise((revolve, reject) => {
            revolve({
                log: null,
                customOrigin: null,
                askUserForStreamingPermission: false,
                lastActivityIndex: 83,
                session: {
                    log: null,
                    session: {
                        isLive: false,
                        isWatched: true,
                        id: '5dda91504aea244982de72d1',
                        browserName: 'Chrome',
                        browserVersion: '78.0.3904.70',
                        docType: '<!DOCTYPE html>',
                        layoutName: 'Blink',
                        origin: 'http://127.0.0.1:8081/test.html',
                        os: 'OS X 10.14.6 64-bit',
                        pageUrl: 'http://127.0.0.1:8081/test.html',
                        screenWidth: 1623,
                        screenHeight: 426,
                        timestamp: 1574605136262,
                        left: 0,
                        top: 0,
                        sensitiveInputFields: false,
                        version: '61',
                        visibilityState: 'visible',
                        hostname: '127.0.0.1',
                        start: 1574605136262,
                        lastActive: 1574605145591,
                        clientStartMilliseconds: 1574605136262,
                        length: 9329,
                    },
                    customOrigin: null,
                    askUserForStreamingPermission: false,
                    lastActivityIndex: 83,
                },
            });
        });
    },
    getSessionLog: (sessionId, logId) => {
        return new Promise((revolve, reject) => {
            revolve({});
        });
    },
    getSessionDetails: () => {},
    getSessionLogs: () => {},
    getSessions: () => {},
    deleteSession: () => {},
    deleteSessions: () => {},
    sessionCanBeDownloaded: () => {},
    getActivities: (sessionId, lastEvent) => {
        return new Promise((revolve, reject) => {
            revolve({});
        });
    },
    getActivitiesCount: () => {},
    getSessionStatus: () => {},
};

export class SessionDataClient {
    sessionId: string | number;
    logId: string | number;
    lastEventTimestamp: number;
    lastEventIndex: number;
    lastLogTimestamp: number;
    timeLimit;
    lastLoadedActivityTime: number;
    loadingActivitiesPromise;
    activitiesPollerIsCanceled: boolean;

    ACTIVITIES_POLL_WAIT_TIME: number = 0;
    SESSION_STATUS_POLL_WAIT_TIME: number = 30000;
    NO_ACTIVITIES_POLL_WAIT_TIME: number = 500;

    isLive;

    constructor(sessionId, logId,aaa) {
        this.sessionId = sessionId;
        this.logId = logId;
        this.lastEventTimestamp = 0;
        this.lastEventIndex = 0;
        this.lastLogTimestamp = 0;
        this.timeLimit = null;
        this.lastLoadedActivityTime = 0;
        this.activitiesPollerIsCanceled = true;
    }

    loadSession() {
        return new Promise((resolve, reject) => {
            if (this.logId) {
                session.getSessionLog(this.sessionId, this.logId).then(res => {
                    this.isLive = res.session.isLive;
                    resolve(res);
                });
            } else {
                session.getSession(this.sessionId).then(({ session }) => {
                    this.isLive = session.isLive;
                    resolve(session);
                });
            }
        });
    }
    startLoadingActivities(b, c) {
        this.stopLoadingActivities();
        this.activitiesPollerIsCanceled = false;

        // d.isFunction(b) || (b = angular.noop);

        function poll(time) {
            if (this.activitiesPollerIsCanceled && this.isLive) {
                activitiesPoller = setTimeout(() => {
                    this.loadActivitiesUntil(b, null, c).then(() => {
                        poll(this.NO_ACTIVITIES_POLL_WAIT_TIME);
                    });
                }, time);
            }
        }

        poll(this.ACTIVITIES_POLL_WAIT_TIME);
    }
    stopLoadingActivities() {
        this.activitiesPollerIsCanceled = true;
    }
    startLoadingSessionStatus(b) {
        this.stopLoadingSessionStatus();
        this.sessionStatusPollerIsCanceled = false;

        // d.isFunction(b) || (b = angular.noop)

        function poll() {
            this.sessionStatusPollerIsCanceled ||
                setTimeout(() => {
                    session.getSessionStatus(this.sessionId).then(res => {
                        b(res);
                        poll();
                    });
                }, this.SESSION_STATUS_POLL_WAIT_TIME);
        }
    }
    stopLoadingSessionStatus() {
        this.sessionStatusPollerIsCanceled = true;
    }
    getSessionStatus() {
        return session.getSessionStatus(this.sessionId);
    }
    loadActivitiesUntil(successCallback, length, c) {
        if (!length || this.lastLoadedActivityTime < length) {
            this.timeLimit = length;
        }

        // todo
        // if (!this.loadingActivitiesPromise) {
        //     this.loadingActivitiesPromise = this._fetch(successCallback, c).then(res => {
        //         this.loadingActivitiesPromise = null;
        //         successCallback(res);
        //     });
        // }

        return new Promise((resolve, reject) => {
            const dataActivity = {
                activities: mock,
                isLive: this.isLive,
            };
            successCallback(dataActivity);
        });
    }

    _fetch(callback, c) {
        const promise = Promise;

        const getActivities = () => {
            if (this.timeLimit && this.lastLoadedActivityTime >= this.timeLimit) {
                return promise.resolve({ activities: [] });
            }

            const noCache = !!this.ACTIVITIES_POLL_WAIT_TIME || !typeof this.timeLimit === 'number';
            const lastEvent = {
                eventsTimestamp: this.lastEventTimestamp,
                eventsIndex: this.lastEventIndex,
                logsTimestamp: this.lastLogTimestamp,
                noCache: noCache,
            };

            session.getActivities(this.sessionId, lastEvent).then(res => {
                this.isPolling = true;
                const data = this._getActivitiesToTimeLimit(noCache, this.timeLimit);
                if (data.activities.length === 0) {
                    return promise.resolve({
                        activities: data.activities,
                    });
                }

                this.lastEventTimestamp = data.lastEventTimestamp || this.lastEventTimestamp;
                this.lastEventIndex = data.lastEventIndex || this.lastEventIndex;
                this.lastLogTimestamp = data.lastLogTimestamp || this.lastLogTimestamp;

                this.lastLoadedActivityTime = this.findActivityLastTime(data.activities);

                const dataActivity = {
                    activities: data.activities,
                    isLive: this.isLive,
                };

                callback(dataActivity);
                getActivities();
            });
        };

        return new promise((resolve, reject) => {
            resolve(mock);
        });
    }

    _getActivitiesToTimeLimit(data, timeLimit) {
        const activities = data.activities;
        const lastTime = this.findActivityLastTime(activities);

        return lastTime && typeof timeLimit === 'number' && lastTime > timeLimit
            ? this._findAcitvitiesToTimeLimit(activities, timeLimit)
            : data;
    }

    findActivityLastTime(activities) {
        const activity = loadsh.last(activities);
        if (activity) {
            return activity.time;
        }
    }

    _findAcitvitiesToTimeLimit(activities, timeLimit) {
        let lastEventTimestamp;
        let lastEventIndex;
        let lastLogTimestamp;
        let newActivities = [];

        activities.forEach(activity => {
            if (!activity.time > timeLimit) {
                newActivities.push(activity);
            }

            if (activity.id) {
                lastLogTimestamp = activity.timestamp;
            } else {
                lastEventTimestamp = activity.timestamp;
                lastEventIndex = activity.index;
            }
        });

        return {
            activities: newActivities,
            lastEventTimestamp: lastEventTimestamp,
            lastEventIndex: lastEventIndex,
            lastLogTimestamp: lastLogTimestamp,
        };
    }
}
