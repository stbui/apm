import lodash from 'lodash';
import { session, featureFlags } from './common';

const ACTIVITIES_POLL_WAIT_TIME = 0;
const NO_ACTIVITIES_POLL_WAIT_TIME = 500;

//
const $q: any = {};

//

function i(a) {
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
                          var c = k(b, d.timeLimit);
                          if (0 === c.activities.length) {
                              return e.resolve(c.activities);
                          } else {
                              d.lastEventTimestamp = c.lastEventTimestamp;
                              d.lastEventIndex = c.lastEventIndex;
                              a(c.activities);

                              f();
                              return;
                          }

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
function j(a) {
    var b = lodash.last(a);
    return b ? b.time : null;
}
function k(a, b) {
    var c = a.activities,
        d = j(c);
    return d && d > b ? l(c, b) : a;
}
function l(a, b) {
    var lastEventTimestamp,
        lastEventIndex,
        activities: any = [];

    lodash.forEach(a, function(a, f) {
        if (!(a.time > b)) {
            activities.push(a);
            lastEventTimestamp = a.timestamp;
            lastEventIndex = a.index;
            return;
        }

        // return (
        //     !(a.time > b) && (activities.push(a), (lastEventTimestamp = a.timestamp), void (lastEventIndex = a.index))
        // );
    });

    return { activities: activities, lastEventTimestamp: lastEventTimestamp, lastEventIndex: lastEventIndex };
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

    loadActivitiesUntil(callback, timeLimit) {
        var c = this;
        this.timeLimit = timeLimit;
        this.loadingActivitiesPromise ||
            (c.loadingActivitiesPromise = i.call(c, callback).then(function(b) {
                c.loadingActivitiesPromise = null;
                callback(b);
            }));
        return this.loadingActivitiesPromise;
    }
}
