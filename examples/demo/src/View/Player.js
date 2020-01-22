import React, { useState, useRef, useEffect } from 'react';
import Viewer from './Player/Viewer';
import Console from './Player/Console';
import UserIdentityDetails from './Player/UserIdentityDetails';
import UserIdentityDetails from './Player/UserIdentityDetails';
import InaccessibleResourcesWarning from './Player/InaccessibleResourcesWarning';
import StepsTimeline from './Player/StepsTimeline';
import Timelline from './Player/Timelline';
import Viewer from './Player/Viewer';
import { SessionDataClient } from './Player/session';

const SessionPlayer = ({
    session,
    isLive,
    autostart,
    isTimelineDirty,
    // timelineValue,
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

    let isPlaying = false;
    let timelineMin = 0;
    let timelineMax = 0;
    let timelineValue = 0;

    let arePlayerButtonsEnabled = 0;
    let sessionScreenWidth = 0;
    let sessionScreenHeight = 0;
    let renderingProgress = 0;
    const speedOptions = [
        { label: '0.25x', value: 0.25 },
        { label: '0.5x', value: 0.5 },
        { label: 'Normal', value: 1 },
        { label: '2x', value: 2 },
        { label: '4x', value: 4 },
    ];
    let loadedTime = -1;
    let steps = [];
    let activities = [];
    let detailsStep = 0;
    let logStep = 0;
    let isStreamingLive = false;
    // let isSimpleUIMode = settings.general.uiMode ===
    let shouldShowLoadingOverlay = true;
    // settings.playback.speedOption = function() {};

    // parent
    const viewerIsCreated = false;
    const timelineIsCreated = false;
    const stepsTimelineIsCreated = false;

    const hasFinished = false;

    const [sessionId, setSessionId] = useState();

    const stopPlay = () => {
        isPlaying = false;
    };

    const isCreated = () => {
        return viewerIsCreated && timelineIsCreated && stepsTimelineIsCreated && !!session;
    };

    const isAutoStartAndCreated = () => {
        return autostart && isCreated();
    };

    const togglePlaying = () => {};

    const play = () => {};
    const pause = () => {};
    const repeat = (value, b) => {
        if (isAutoStartAndCreated()) {
            timelineValue = value;
            const lastIndex = activities.findLastIndex(item => item.time <= value);
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

    const updateStepsTimeline = () => {};

    const refreshTimeline = () => {};
    const enableTimeline = () => {};

    const poll = () => {
        setInterval(() => {
            const value = timelineValue + PLAYER_CONFIG.PLAY_SPEED;
            const activitie = activities[223 + 1];
            if (activities) {
                timelineValue = Math.min(value, activitie.time);
            }
        }, PLAYER_CONFIG.PLAY_SPEED / 1);
    };

    const getMilliseconds = activityIndex => {
        if (!isStreamingLive) {
            return PLAYER_CONFIG.MILLISECONDS_PER_FRAME;
        }

        activityIndex = Math.min(activityIndex, activities.length - 1);
        const time = activities[activityIndex].time;
        const lastTime = activities[activities.length - 1].time;
        const diff = lastTime - time;

        if (diff > PLAYER_CONFIG.LAG_TIME) {
            return 500;
        } else {
            return PLAYER_CONFIG.MILLISECONDS_PER_FRAME;
        }
    };

    const compare = (activityIndex, totalIndex) => {
        const ms = getMilliseconds(activityIndex);
        return (
            activityIndex < activities.length &&
            activities[activityIndex].time >= totalIndex &&
            activities[activityIndex].time <= totalIndex + ms
        );
    };

    const t = (activityIndex, status) => {
        const now = new Date();
        const activity = activities[activityIndex].time;

        for (timeValue = activity; compare(activityIndex, 1234543); ) {
            activityIndex++;
        }
    };

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
                selectedLogId="selectedLogId"
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
                min={timelineMin}
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

const player = {};

export default () => {
    const PAUSE_AT_ACTIVITY_ID = 'pause_at_activity_id';
    const USER_DETAILS_ANIMATION_TIME = 500;

    const EVENT_TYPE = {
        DOM_MUTATION: 'dom_mutation',
        DOM_ELEMENT_VALUE_CHANGE: 'dom_element_value_change',
        DOM_SNAPSHOT: 'dom_snapshot',
        MOUSE_MOVE: 'mouse_move',
        MOUSE_CLICK: 'mouse_click',
        MOUSE_OVER: 'mouse_over',
        MOUSE_OUT: 'mouse_out',
        SCROLL_POSITION_CHANGE: 'scroll_position_change',
        WINDOW_RESIZE: 'window_resize',
        RADIO_BUTTON_CHANGE: 'radio_button_change',
        CHECKBOX_CHANGE: 'checkbox_change',
        VISIBILITY_CHANGE: 'visibility_change',
        CSS_RULE_INSERT: 'css_rule_insert',
        CSS_RULE_DELETE: 'css_rule_delete',
    };

    const SESSIONSTACK_HOVER_CLASS = '_ss-hover';
    const PROCESS_HOVER_STYLES_CONFIG = { DELAY: 100, TIMES_TO_REPEAT: 0 };
    const ERRORS = { SECURITY_ERROR: 'SecurityError' };
    const VIEWER_MARGINS = { HORIZONTAL: 20, VERTICAL: 20 };
    const SCROLL_POSITION_CHANGE = { MAX_RETRIES: 100, TIMEOUT: 50 };
    const ELEMENTS = { HTML: 'html' };
    // const CROSS_ORIGIN_FRAME_BACKGROUND

    const LOG_OFFSET = 5000;
    const LIVE_MODE_CONFIGS = { GO_LIVE_OFFSET_TIME: 1000, MAX_ATTEMPTS: 3 };
    const DEMO_USER_ROLE = 'demo';

    let session;
    let isLive = false;
    let sessionWasInitiallyLive;
    let autostart = true;
    let startTime = 0;
    let errors = {};
    let activities = [];
    let pauseActivity;
    let selectedLogId;
    let requestProgress;
    let isCatchingUpWithLive;

    // 实例
    const sessionDataClient = new SessionDataClient('sessionId', 'logId');
    // const settings = new settings()
    // settings.init();
    const settings = {
        general: { isDemo: false, playFrom: undefined, pauseAt: undefined, playLive: undefined, uiMode: undefined },
        playback: {
            shouldSkipProlongedInactivity: true,
            shouldVisualizeClicks: true,
            shouldPauseOnMarker: true,
            speed: 1,
        },
    };

    let pauseAt = settings.general.pauseAt;
    let playFrom = settings.general.playFrom;

    sessionDataClient.loadSession().then(res => {
        const log = res.log;
        session = res.session;
        isLive = res.session.isLive;

        sessionWasInitiallyLive = res.session.isLive && !settings.general.isDemo;

        if (typeof pauseAt === 'number') {
            pauseAt = Math.max(pauseAt, 0);
            pauseAt = Math.min(pauseAt, session.length);
            pauseActivity = { id: r, time: pauseAt };
        } else {
            if (log && !pauseActivity) {
                selectedLogId = log.id;
            }

            pauseActivity = log;
        }

        if (typeof playFrom === 'number') {
            playFrom = Math.max(playFrom, 0);
            playFrom = Math.min(playFrom, session.length);
            startTime = playFrom;
        } else if (!log && pauseActivity) {
            startTime = Math.max(0, pauseActivity.time - LOG_OFFSET);
        } else {
            if (log && log == pauseActivity) {
                startTime = Math.max(0, log.time - LOG_OFFSET);
            }
        }
    });

    const onPlayerIsInitialized = () => {};
    const onStartLiveStreaming = () => {};
    const onStopLiveStreaming = () => {};

    return (
        <div>
            <SessionPlayer
                session={session}
                activities={activities}
                start-time={startTime}
                autostart={autostart}
                selectedLogId={selectedLogId}
                pauseActivity={pauseActivity}
                requestProgress={requestProgress}
                isLive={isLive}
                sessionWasInitiallyLive={sessionWasInitiallyLive}
                settings={settings}
                errors={errors}
                api="sessionPlayerApi"
                isCatchingUpWithLive={isCatchingUpWithLive}
            ></SessionPlayer>
        </div>
    );
};
