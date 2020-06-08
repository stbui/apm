import React, { useState, useRef, useEffect, useCallback } from 'react';
import { findLastIndex, last } from 'lodash';
import Viewer from './Viewer';
import Console from './Console';
import UserIdentityDetails from './UserIdentityDetails';
import InaccessibleResourcesWarning from './InaccessibleResourcesWarning';
import StepsTimeline from './StepsTimeline';
import Timelline from './Timelline';
import { SessionDataClient } from './session';
import { playerSettings } from './settings';
import { auth } from './auth';
import Controls from './Controls';
import { AsyncWhile } from './AsyncWhile';
import { timeout } from './timeout';
import { PLAYER_CONFIG, TAB_VISIBILITY, UI_MODE, EVENT_TYPE, MOUSE_TYPE } from './constant';

import { Player } from '../test/player';
import { Activities } from '../test/Activities';
import { Activity, IActivity } from '../test/Activity';

import mock from './mock';
// const activities = mock.activities;

let storeTimelineValue;
let ra;
let interval;
/// activityIndex
let wa = -1;
/**
 * 暂停状态
 */
let isPaused = false;
let loadedTime = -1;
// ta
let asyncWhile;

let renderingProgress = 0;
const speedOptions = [
    { label: '0.25x', value: 0.25 },
    { label: '0.5x', value: 0.5 },
    { label: 'Normal', value: 1 },
    { label: '2x', value: 2 },
    { label: '4x', value: 4 },
];

let steps = [];
// let activities = activities;
let detailsStep = 0;
let logStep = 0;
let shouldShowLoadingOverlay = true;

const viewerIsCreated = true;
const timelineIsCreated = true;
const stepsTimelineIsCreated = true;

let Ba = false;
let timeoutExecutionError;
// ya
let visibilityState = false;
// buffering
let xa = false;
let buffering = false;

// tmp
let containerWidth = 330;
let containerHeight = 537;
let handleConsoleResize = 0;

let imitate;
let LogStepOnRange = 0;

//

const activities = new Activities();
let player;

export const SessionPlayer = ({
    session,
    // isLive,
    autostart,
    isTimelineDirty,
    startTime,
    selectedLogId,
    requestProgress,
    pauseActivity,
    settings,
    // sessionWasInitiallyLive,
    errors,
    isCatchingUpWithLive,
}) => {
    ///

    // let timelineMin = 0;
    // let timelineMax = 9329;
    // let timelineValue = 1000;

    const [timelineMax, setTimelineMax] = useState(9329);
    const [timelineMin, setTimelineMin] = useState(0);
    const [timelineValue, setTimelineValue] = useState(0);
    storeTimelineValue = timelineValue;

    const [hasFinished, setHasFinished] = useState(false);
    const [isStreamingLive, setIsStreamingLive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [arePlayerButtonsEnabled, setArePlayerButtonsEnabled] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [sessionWasInitiallyLive, setSessionWasInitiallyLive] = useState(false);
    // viewer
    const [currentActivity, setCurrentActivity] = useState();
    const [fireClear, setFireClear] = useState(false);
    const [fireAttach, setFireAttach]: any = useState();

    useEffect(() => {
        // 自动播放开始
        console.log(session);
    }, [session]);

    useEffect(() => {
        const lastRenderedActivity = { playerIndex: -1, time: 0 };
        const render = {
            _onTabHiddenCallback: () => {},
            isTabHidden: false,
            lastRenderedActivity,
            reset: function () {
                this.isTabHidden = false;
                this.lastRenderedActivity = lastRenderedActivity;
            },
            onTabHidden: function (callback) {
                this._onTabHiddenCallback = callback;
            },
            render: function (activities, d) {
                activities.forEach((activity: IActivity) => {
                    player.fireExecuteEvent($scope, activity);
                });

                this.lastRenderedActivity = last(activities);
            },
        };
        render.onTabHidden(function () {
            render.isTabHidden && $scope.player.skipToTabShown($scope.timelineValue);
        });

        new Player(activities, render, PLAYER_CONFIG);
    }, []);

    return (
        <div>
            {/*<UserIdentityDetails
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
            ></StepsTimeline>*/}
            <div style="overflow: hidden;background: #242628;">
                <Viewer
                    maxWidth={containerWidth}
                    maxHeight={containerHeight}
                    sessionScreenWidth={session.screenWidth}
                    sessionScreenHeight={session.screenHeight}
                    className="viewer-container"
                    isCreated={viewerIsCreated}
                    renderingProgress={renderingProgress}
                    initialVisibilityState={session.visibilityState}
                    sessionId={session.id}
                    handleConsoleResize={handleConsoleResize}
                    currentActivity={currentActivity}
                    snapshotData={{
                        snapshot: session.snapshot,
                        origin: session.origin,
                        docType: session.docType,
                        top: session.top,
                        left: session.left,
                    }}
                    fireClear={fireClear}
                    fireAttach={fireAttach}
                ></Viewer>
            </div>

            <Controls
                hasFinished={hasFinished}
                isStreamingLive={isStreamingLive}
                isPlaying={isPlaying}
                arePlayerButtonsEnabled={arePlayerButtonsEnabled}
                isLive={isLive}
                sessionWasInitiallyLive={sessionWasInitiallyLive}
            >
                <Timelline
                    min={timelineMin}
                    max={timelineMax}
                    value={storeTimelineValue}
                    activities={activities}
                    // refresh={refreshTimeline}
                    // pauseActivity={pauseActivity}
                    // isCreated={timelineIsCreated}
                ></Timelline>
            </Controls>

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
