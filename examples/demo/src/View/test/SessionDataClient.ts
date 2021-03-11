import lodash from 'lodash';
import { session, featureFlags } from './common';

const ACTIVITIES_POLL_WAIT_TIME = 0;
const NO_ACTIVITIES_POLL_WAIT_TIME = 500;

function i(addActivities) {
    var that = this;

    (function f() {
        if (that.lastEventTimestamp >= that.timeLimit) {
            // finishLoadingActivities
            addActivities([]);
            return;
        }

        session
            .getActivities(that.sessionId, {
                eventsTimestamp: that.lastEventTimestamp,
                eventsIndex: that.lastEventIndex,
            })
            .then(data => {
                // 原始数据
                const newData = k(data, that.timeLimit);

                if (newData.activities.length === 0) {
                    // finishLoadingActivities
                    addActivities(newData.activities);
                    return;
                }

                that.lastEventTimestamp = newData.lastEventTimestamp;
                that.lastEventIndex = newData.lastEventIndex;

                addActivities(newData.activities);

                f();
            })
            .catch(error => {
                console.log(error);
            });
    })();
}
function getLastTime(activities) {
    const activity = lodash.last(activities);
    return activity ? activity.time : null;
}
function k(data, timeLimit: number) {
    const activities = data.activities;
    const time = getLastTime(activities);

    return time && time > timeLimit ? l(activities, timeLimit) : data;
}
function l(activities, timeLimit: number) {
    var lastEventTimestamp;
    var lastEventIndex;
    var newActivities: any = [];

    lodash.forEach(activities, function (activity, f) {
        return (
            !(activity.time > timeLimit) &&
            (newActivities.push(activity),
            (lastEventTimestamp = activity.timestamp),
            void (lastEventIndex = activity.index))
        );
    });

    return {
        activities: newActivities,
        lastEventTimestamp: lastEventTimestamp,
        lastEventIndex: lastEventIndex,
    };
}

export class SessionDataClient {
    public sessionId: string;
    public logId: string | undefined;
    public isLiveStream: boolean;
    public lastEventTimestamp: number;
    public lastEventIndex: number;
    public timeLimit;
    public loadingActivitiesPromise;

    public isLive;

    constructor(sessionId: string, logId: string, isLiveStream: boolean) {
        this.sessionId = sessionId;
        this.logId = logId;
        this.isLiveStream = isLiveStream;
        this.lastEventTimestamp = -1;
        this.lastEventIndex = -1;
        this.timeLimit = null;
    }

    loadSession() {
        const sessionFeatureFlags = featureFlags.getSessionFeatureFlags(this.sessionId);
        const sessions = this.logId
            ? session.getSessionLog(this.sessionId, this.logId)
            : session.getSession(this.sessionId);

        return Promise.all([sessionFeatureFlags, sessions]).then(([featureFlags, sessionData]) => {
            const session = { featureFlags, sessionData };
            this.isLive = sessionData.session.isLive;

            return session;
        });
    }

    // callback = PlayerController.z(c.activities)
    loadActivitiesUntil(addActivities, timeLimit) {
        this.timeLimit = timeLimit;

        // if (!this.loadingActivitiesPromise) {
        //     this.loadingActivitiesPromise = i.call(this, addActivities).then(b => {
        //         this.loadingActivitiesPromise = null;
        //         addActivities(b);
        //     });
        // }

        return i.call(this, addActivities);
    }
}
