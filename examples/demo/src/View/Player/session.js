export const session = {
    getSession: () => {},
    getSessionLog: (sessionId, logId) => {
        return new Promise(revolve => [], reject => {});
    },
    getSessionDetails: () => {},
    getSessionLogs: () => {},
    getSessions: () => {},
    deleteSession: () => {},
    deleteSessions: () => {},
    sessionCanBeDownloaded: () => {},
    getActivities: (sessionId, lastEvent) => {},
    getActivitiesCount: () => {},
    getSessionStatus: () => {},
};

export class SessionDataClient {
    ACTIVITIES_POLL_WAIT_TIME = 0;
    SESSION_STATUS_POLL_WAIT_TIME = 3e4;
    NO_ACTIVITIES_POLL_WAIT_TIME = 500;

    constructor(sessionId, logId) {
        this.sessionId = sessionId;
        this.logId = logId;
        this.lastEventTimestamp = 0;
        this.lastEventIndex = 0;
        this.lastLogTimestamp = 0;
        this.timeLimit = null;
        this.lastLoadedActivityTime = 0;
        this.loadingActivitiesPromise;
        this.activitiesPollerIsCanceled = true;
    }

    loadSession() {
        const promise = Promise;
        if (this.logId) {
            session.getSessionLog(this.sessionId, this.logId).then(res => {
                this.isLive = res.session.isLive;
                promise.resolve(res);
            });
        } else {
            session.getSession(this.sessionId).then(res => {
                this.isLive = res.session.isLive;
                promise.resolve(res);
            });
        }

        return new Promise();
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
    loadActivitiesUntil(a, b, c) {
        // var d = this;
        // d.loadingActivitiesPromise ||
        //     (d.loadingActivitiesPromise = i.call(d, a, c).then(function(b) {
        //         (d.loadingActivitiesPromise = null), a(b);
        //     }));

        if (!b || this.lastLoadedActivityTime < b) {
            this.timeLimit = b;
        }

        if (!this.loadingActivitiesPromise) {
            this.loadingActivitiesPromise = this._fetch(a, c).then(res => {
                d.loadingActivitiesPromise = null;
                a(b);
            });
        }

        return this.loadingActivitiesPromise;
    }

    _fetch(a, c) {
        const promise = Promise;

        function i() {
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
                const data = this._getActivitiesToTimeLimit(b, this.timeLimit);
                if (0 === data.activities.length) {
                    return promise.resolve({
                        activities: data.activities,
                    });
                }

                this.lastEventTimestamp = data.lastEventTimestamp || this.lastEventTimestamp;
                this.lastEventIndex = data.lastEventIndex || this.lastEventIndex;
                this.lastLogTimestamp = data.lastLogTimestamp || this.lastLogTimestamp;

                this.lastLoadedActivityTime = this.findActivityLastTime(data.activities);

                const d = {
                    activities: data.activities,
                    isLive: this.isLive,
                };

                a(d);
                i();
            });
        }

        i();

        return new promise();
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
