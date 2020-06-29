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
            .then(function (b) {
                // c = b
                var c = k(b, that.timeLimit);

                if (c.activities.length === 0) {
                    // finishLoadingActivities
                    addActivities(c.activities);
                    return;
                }

                that.lastEventTimestamp = c.lastEventTimestamp;
                that.lastEventIndex = c.lastEventIndex;

                addActivities(c.activities);

                f();
            })
            .catch(error => {
                console.log(error);
            });
    })();
}
function j(activities) {
    var b = lodash.last(activities);
    return b ? b.time : null;
}
function k(resove, timeLimit) {
    var activities = resove.activities,
        time = j(activities);
    return time && time > timeLimit ? l(activities, timeLimit) : resove;
}
function l(activities, timeLimit) {
    var lastEventTimestamp,
        lastEventIndex,
        newActivities: any = [];

    lodash.forEach(activities, function (a, f) {
        return (
            !(a.time > timeLimit) &&
            (newActivities.push(a), (lastEventTimestamp = a.timestamp), void (lastEventIndex = a.index))
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
    public logId: string;
    public isLiveStream: boolean;
    public lastEventTimestamp: number;
    public lastEventIndex: number;
    public timeLimit;
    public loadingActivitiesPromise;

    isLive;

    constructor(sessionId: string, logId: string, isLiveStream: boolean) {
        this.sessionId = sessionId;
        this.logId = logId;
        this.isLiveStream = isLiveStream;
        this.lastEventTimestamp = -1;
        this.lastEventIndex = -1;
        this.timeLimit = null;
        this.loadingActivitiesPromise;
    }

    loadSession() {
        // var a;
        // var e = this;
        // var f = $q.defer();
        // var f = Promise;
        //
        var sessionFeatureFlags = featureFlags.getSessionFeatureFlags(this.sessionId);
        var a = this.logId ? session.getSessionLog(this.sessionId, this.logId) : session.getSession(this.sessionId);

        // $q.all([g, a]).then(
        //     function (a) {
        //         var sessionData = { featureFlags: a[0], sessionData: a[1] };
        //         e.isLive = sessionData.sessionData.session.isLive;
        //         f.resolve(sessionData);
        //     },
        //     function (a) {
        //         f.reject(a);
        //     }
        // );

        // return f.promise;

        return Promise.all([sessionFeatureFlags, a]).then(values => {
            const sessionData = { featureFlags: values[0], sessionData: values[1] };
            this.isLive = sessionData.sessionData.session.isLive;

            return sessionData;
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
