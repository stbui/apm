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
    const da = () => {
        s.isPlaying = false;
    };
    const isCreated = () => {
        return confg.viewerIsCreated && config.timelineIsCreated && config.stepsTimelineIsCreated && !!config.session;
    };

    const astart = () => {
        return autostart && isCreated();
    };

    const config = {
        togglePlaying: function() {},
        play: function() {},
        pause: function() {},
        repeat: function(timelineValue, b) {
            if (astart()) {
                config.timelineValue = timelineValue;
                const lastIndex = activities.findLastIndex(item => item.time <= timelineValue);
            }
        },
        showSessionDetails: function() {},
        onSelectedActivity: function() {},
        goLive: function() {},
        toggleConsole: function() {},
        api: {
            setSessionLength: function() {},
            finishLoadingActivities: function() {},
            addActivities: function() {},
            startLiveStreaming: 0,
        },
        viewerIsCreated: false,
        timelineIsCreated: false,
        stepsTimelineIsCreated: false,
    };

    const updateStepsTimeline = () => {};

    const refreshTimeline = () => {};
    const enableTimeline = () => {};

    useEffect(() => {
        if (session) {
            config.sessionId = session.id;
            config.sessionScreenWidth = session.screenWidth;
            config.sessionScreenHeight = session.screenHeight;
            config.snapshotData = {
                snapshot: session.snapshot,
                origin: session.origin,
                docType: session.docType,
                top: session.top,
                left: session.left,
            };
        } else {
            config.arePlayerButtonsEnabled = false;
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
