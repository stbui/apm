import React, { useState, useRef, useEffect } from 'react';
import Viewer from './Player/Viewer';
import Console from './Player/Console';
import UserIdentityDetails from './Player/UserIdentityDetails';
import UserIdentityDetails from './Player/UserIdentityDetails';
import InaccessibleResourcesWarning from './Player/InaccessibleResourcesWarning';
import StepsTimeline from './Player/StepsTimeline';
import Timelline from './Player/Timelline';
import Viewer from './Player/Viewer';

const PLAYER_CONFIG = {
    PLAY_SPEED: 50,
    MAX_INACTIVITY_TIME: 3e3,
    EVENTS_BATCH_SIZE: 50,
    EVENTS_BATCH_WAIT_TIME: 0,
    TAB_HIDDEN_MESSAGE_TIME: 1e3,
    GO_LIVE_DELAY_TIME: 1500,
    LAG_TIME: 500,
    MILLISECONDS_PER_FRAME: 33,
};

const TAB_VISIBILITY = { VISIBLE: 'visible', HIDDEN: 'hidden' };

const UI_MODE = { SIMPLE: 'simple' };

const Player = ({
    session,
    isLive,
    autostart,
    isTimelineDirty,
    timelineValue,
    startTime,
    selectedLogId,
    requestProgress,
    pauseActivity,
    settings,
    sessionWasInitiallyLive,
    errors,
    api,
    isCatchingUpWithLive,
}) => {
    const isPlaying = false;
    const timelineMin = 0;
    const timelineMax = 0;
    const arePlayerButtonsEnabled = 0;
    const sessionScreenWidth = 0;
    const sessionScreenHeight = 0;
    const renderingProgress = 0;
    const speedOptions = [
        { label: '0.25x', value: 0.25 },
        { label: '0.5x', value: 0.5 },
        { label: 'Normal', value: 1 },
        { label: '2x', value: 2 },
        { label: '4x', value: 4 },
    ];
    const loadedTime = -1;
    const steps = [];
    const activities = [];
    const detailsStep = 0;
    const logStep = 0;
    const isStreamingLive = false;
    const shouldShowLoadingOverlay = true;

    const [sessionId, setSessionId] = useState();

    const stopPlay = () => {
        isPlaying = false;
    };

    const isCreated = () => {
        return confg.viewerIsCreated && config.timelineIsCreated && config.stepsTimelineIsCreated && !!config.session;
    };

    const isAutoStartAndCreated = () => {
        return autostart && isCreated();
    };

    const togglePlaying = () => {};
    const play = () => {};
    const pause = () => {};
    const repeat = (timelineValue, b) => {
        if (isAutoStartAndCreated()) {
            config.timelineValue = timelineValue;
            const lastIndex = activities.findLastIndex(item => item.time <= timelineValue);
        }
    };
    const showSessionDetails = () => {};
    const onSelectedActivity = () => {};
    const goLive = () => {};
    const toggleConsole = () => {};

    const ha = () => {
        if (loadedTime < timelineValue) {
        } else {
        }
    };

    const ga = timeValue => {
        timelineValue = timeValue;
        ha();
    };

    const api = {
        setSessionLength: function(max) {
            timelineMax = max;
            const timeValue = timelineValue || startTime;
            if (isStreamingLive) {
                timeValue = timelineMax;
            }
            ga(timeValue);
        },
        finishLoadingActivities: function() {
            if (isStreamingLive) {
                ga(timelineMax);
            }
        },
        addActivities: function() {},
        startLiveStreaming: function() {},
    };

    const config = {
        viewerIsCreated: false,
        timelineIsCreated: false,
        stepsTimelineIsCreated: false,
    };

    const updateStepsTimeline = () => {};

    const refreshTimeline = () => {};
    const enableTimeline = () => {};

    useEffect(() => {
        if (session) {
            setSessionId(session.id);
            sessionScreenWidth = session.screenWidth;
            sessionScreenHeight = session.screenHeight;
            config.snapshotData = {
                snapshot: session.snapshot,
                origin: session.origin,
                docType: session.docType,
                top: session.top,
                left: session.left,
            };
        } else {
            arePlayerButtonsEnabled = false;
        }
    }, [session]);

    useEffect(() => {
        if (isTimelineDirty) {
        } else {
        }
    }, [isTimelineDirty]);

    useEffect(() => {}, [isLive]);

    return (
        <div>
            <UserIdentityDetails
                userIdentityData={session.userIdentity}
                hideMask={hideUserDetailsMask}
            ></UserIdentityDetails>
            <StepsTimeline
                add-new-steps="addNewSteps"
                update-steps-timeline="updateStepsTimeline"
                on-selected-step="onSelectedActivity"
                select-next-step="selectNextStep"
                enable="enableStepsTimeline"
                disable="disableStepsTimeline"
                selected-log-id="selectedLogId"
                is-created="stepsTimelineIsCreated"
                handle-user-details-resize="handleUserDetailsResize"
                hide-mask="hideStepsTimelineMask"
            ></StepsTimeline>
            <Viewer
                maxWidth={containerWidth}
                maxHeight={containerHeight}
                sessionScreenWidth={sessionScreenWidth}
                sessionScreenHeight={sessionScreenHeight}
                className="viewer-container"
                isCreated={viewerIsCreated}
                renderingProgress={renderingProgress}
                initialVisibilityState={session.visibilityState}
                sessionId={sessionId}
                handleConsoleResize={handleConsoleResize}
            ></Viewer>
            <Timelline
                min={0}
                max={timelineMax}
                value={timelineValue}
                isDirty={isTimelineDirty}
                isTimelineDirty={activities}
                refresh={refreshTimeline}
                enable={enableTimeline}
                disable={disable}
                disable={disable}
                pauseActivity={pauseActivity}
                isLive={isLive}
                isCreated={timelineIsCreated}
            ></Timelline>

            <Console
                open-console="openConsole"
                close-console="closeConsole"
                is-expanded="isConsoleExpanded"
                add-new-logs="addNewLogs"
                on-selected-log="onSelectedActivity"
                update-console="updateConsole"
            ></Console>
        </div>
    );
};

const session = {
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

class SessionDataClient {
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
        if (this.logId) {
            session.getSessionLog(this.sessionId, this.logId).then(res => {
                this.isLive = res.session.isLive;
            });
        } else {
            session.getSession(this.sessionId).then(res => {
                this.isLive = res.session.isLive;
            });
        }
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

export default () => {
    return (
        <div>
            <Player
                session="session"
                activities="activities"
                start-time="startTime"
                autostart="autostart"
                selected-log-id="selectedLogId"
                pause-activity="pauseActivity"
                request-progress="requestProgress"
                is-live="isLive"
                session-was-initially-live="sessionWasInitiallyLive"
                settings="settings"
                errors="errors"
                api="sessionPlayerApi"
                is-catching-up-with-live="isCatchingUpWithLive"
            ></Player>
        </div>
    );
};
