import React, { useState, useRef, useEffect, useCallback } from 'react';
import { findLastIndex, last, noop } from 'lodash';
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
/// activityIndex
let wa = -1;
/**
 * 暂停状态
 */
let isPaused = false;
let loadedTime = -1;

let renderingProgress = 0;

// let activities = activities;

// tmp
let containerWidth = 330;
let containerHeight = 537;

//
let storeOnExecuteEvent;

const activities = new Activities();
let player: Player;

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
    const [onExecuteEvent, fireExecuteEvent]: any = useState();

    const addActivities = (as: IActivity[]) => {
        activities.push(as);
    };

    const start = () => {
        player.jumpToTime(0);
    };

    const play = () => {
        player.play(timelineValue);
    };
    const pause = () => {
        player.pause();
    };

    const onRepeat = () => {
        start();
    };

    const onTogglePlaying = playing => {
        if (playing) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    // fixed:
    const updateExecuteEventState = newValue => {
        storeOnExecuteEvent = newValue;
        fireExecuteEvent(newValue);
    };

    useEffect(() => {
        const lastRenderedActivity = { playerIndex: -1, time: 0 };
        const render = {
            _onTabHiddenCallback: noop,
            isTabHidden: false,
            lastRenderedActivity,
            reset: function() {
                this.isTabHidden = false;
                this.lastRenderedActivity = lastRenderedActivity;
            },
            onTabHidden: function(callback) {
                this._onTabHiddenCallback = callback;
            },
            render: function(activities, d) {
                updateExecuteEventState(activities);

                activities.forEach((activity: IActivity) => {
                    // bug: 批量更新数据会丢失
                    // bug：data嵌套数据会丢失

                    if (
                        Activity.isTabVisibilityChange(activity) ||
                        (Activity.isTopLevel(activity) && Activity.isSnapshot(activity))
                    ) {
                        this.isTabHidden = activity.data.visibilityState == TAB_VISIBILITY.HIDDEN;
                    }
                });

                this.lastRenderedActivity = last(activities);
                this.isTabHidden && setTimeout(this._onTabHiddenCallback, 0);
            },
        };
        render.onTabHidden(function() {
            if (render.isTabHidden) {
                player.skipToTabShown(timelineValue);
            }
        });

        player = new Player(activities, render, PLAYER_CONFIG);
        player.onTimeChanged(time => {
            // console.log('onTimeChanged', time);
            setTimelineValue(time);
        });
        player.onBuffering(() => {
            console.log('onBuffering');
        });
        player.onRendering(() => {
            console.log('onRendering');
            setHasFinished(false);
        });
        player.onPlaying(() => {
            console.log('onPlaying');
        });
        player.onPaused(() => {
            console.log('onPaused');
        });
        player.onFinished(() => {
            console.log('onFinished');
            setHasFinished(true);
        });

        addActivities(mock.activities);
        activities.setSessionLength(session.length);
        activities.finishLoading();

        start();
    }, [session]);

    // console.log(storeOnExecuteEvent);

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
                {onExecuteEvent ? (
                    <Viewer
                        maxWidth={containerWidth}
                        maxHeight={containerHeight}
                        sessionScreenWidth={session.screenWidth}
                        sessionScreenHeight={session.screenHeight}
                        className="viewer-container"
                        isCreated={true}
                        renderingProgress={renderingProgress}
                        initialVisibilityState={session.visibilityState}
                        sessionId={session.id}
                        handleConsoleResize={true}
                        currentActivity={storeOnExecuteEvent}
                        fireClear={fireClear}
                        fireAttach={fireAttach}
                    ></Viewer>
                ) : null}
            </div>

            <Controls
                hasFinished={hasFinished}
                isStreamingLive={isStreamingLive}
                isPlaying={isPlaying}
                arePlayerButtonsEnabled={arePlayerButtonsEnabled}
                isLive={isLive}
                sessionWasInitiallyLive={sessionWasInitiallyLive}
                onRepeat={onRepeat}
                onTogglePlaying={onTogglePlaying}
            >
                <Timelline
                    min={timelineMin}
                    max={timelineMax}
                    value={timelineValue}
                    activities={mock.activities}
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
