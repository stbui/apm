import lodash from 'lodash';
import { session, featureFlags } from './common';

const ACTIVITIES_POLL_WAIT_TIME = 0;
const NO_ACTIVITIES_POLL_WAIT_TIME = 500;

//
const $q: any = {};

//

function i(addActivities) {
    var d = this,
        e = $q.defer();

    (function f() {
        return d.lastEventTimestamp >= d.timeLimit
            ? e.resolve([])
            : void session
                  .getActivities(d.sessionId, {
                      eventsTimestamp: d.lastEventTimestamp,
                      eventsIndex: d.lastEventIndex,
                  })
                  .then(
                      function(b) {
                          // c = b
                          var c = k(b, d.timeLimit);

                          if (0 === c.activities.length) {
                              return e.resolve(c.activities);
                          }

                          d.lastEventTimestamp = c.lastEventTimestamp;
                          d.lastEventIndex = c.lastEventIndex;

                          // PlayerController.z(c.activities)
                          addActivities(c.activities);

                          f();

                          return;

                          //   return 0 === c.activities.length
                          //       ? e.resolve(c.activities)
                          //       : ((d.lastEventTimestamp = c.lastEventTimestamp),
                          //         (d.lastEventIndex = c.lastEventIndex),
                          //         a(c.activities),
                          //         void f());
                      },
                      function(a) {
                          e.reject(a);
                      }
                  );
    })();

    return e.promise;
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

    lodash.forEach(activities, function(a, f) {
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
    public sessionId;
    public logId;
    public isLiveStream: boolean;
    public lastEventTimestamp;
    public lastEventIndex;
    public timeLimit;
    public loadingActivitiesPromise;

    isLive;

    constructor(sessionId, logId, isLiveStream: boolean) {
        this.sessionId = sessionId;
        this.logId = logId;
        this.isLiveStream = isLiveStream;
        this.lastEventTimestamp = -1;
        this.lastEventIndex = -1;
        this.timeLimit = null;
        this.loadingActivitiesPromise;
    }

    loadSession() {
        var a,
            e = this,
            f = $q.defer(),
            g = featureFlags.getSessionFeatureFlags(e.sessionId);

        a = e.logId ? session.getSessionLog(e.sessionId, e.logId) : session.getSession(e.sessionId);

        $q.all([g, a]).then(
            function(a) {
                var b = { featureFlags: a[0], sessionData: a[1] };
                e.isLive = b.sessionData.session.isLive;
                f.resolve(b);
            },
            function(a) {
                f.reject(a);
            }
        );

        return f.promise;
    }

    // callback = PlayerController.z(c.activities)
    loadActivitiesUntil(addActivities, timeLimit) {
        this.timeLimit = timeLimit;

        if (!this.loadingActivitiesPromise) {
            this.loadingActivitiesPromise = i.call(this, addActivities).then(b => {
                this.loadingActivitiesPromise = null;
                addActivities(b);
            });
        }

        return this.loadingActivitiesPromise;
    }
}
