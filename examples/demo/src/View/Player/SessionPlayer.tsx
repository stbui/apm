import React, { useState, useRef, useEffect, useCallback } from 'react';
import { findLastIndex, last, noop } from 'lodash';
import Viewer from './Viewer';
import Console from './Console';
import PlayerTimeline from './PlayerTimeline';
import { SessionDataClient } from './session';
import { playerSettings } from './settings';
import Controls from './Controls';
import { PLAYER_CONFIG, TAB_VISIBILITY, UI_MODE, EVENT_TYPE, MOUSE_TYPE } from './constant';

import { Player } from '../test/player';
import { Activities } from '../test/Activities';
import { Activity, IActivity } from '../test/Activity';

import mock from './mock';
// const activities = mock.activities;

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

export const SessionPlayer = ({ session }) => {
    // viewer
    const [fireClear, setFireClear] = useState(false);
    const [fireAttach, setFireAttach]: any = useState();
    const [onExecuteEvent, fireExecuteEvent]: any = useState();

    const [timeline, setTimeline] = useState({ timelineMax: 9329, timelineMin: 0, timelineValue: 0 });
    const [playState, setPlayState] = useState({
        hasFinished: false,
        isPlaying: false,
        isLive: false,
        isStreamingLive: false,
        arePlayerButtonsEnabled: false,
    });

    const addActivities = (as: IActivity[]) => {
        activities.push(as);
    };

    const start = () => {
        player.jumpToTime(0);
    };

    const play = () => {
        player.play(timeline.timelineValue);
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
        } else {
            play();
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
            // console.log('onTimeChanged', timelineMax);
            setTimeline({
                timelineValue: time,
                timelineMax: timeline.timelineMax,
                timelineMin: timeline.timelineMin,
            });
        });
        player.onBuffering(() => {
            console.log('onBuffering');
        });
        player.onRendering(() => {
            console.log('onRendering');
            setPlayState({
                arePlayerButtonsEnabled: false,
                hasFinished: false,
                isPlaying: false,
                isLive: false,
                isStreamingLive: false,
            });
        });
        player.onPlaying(() => {
            console.log('onPlaying');
            setPlayState({
                arePlayerButtonsEnabled: false,
                hasFinished: false,
                isPlaying: true,
                isLive: false,
                isStreamingLive: false,
            });
        });
        player.onPaused(() => {
            console.log('onPaused');
            setPlayState({
                arePlayerButtonsEnabled: false,
                hasFinished: false,
                isPlaying: false,
                isLive: false,
                isStreamingLive: false,
            });
        });
        player.onFinished(() => {
            console.log('onFinished');

            setPlayState({
                arePlayerButtonsEnabled: false,
                hasFinished: true,
                isPlaying: false,
                isLive: false,
                isStreamingLive: false,
            });
        });

        addActivities(mock.activities);
        activities.setSessionLength(session.length);
        activities.finishLoading();

        start();
    }, [session]);

    console.log(timeline.timelineValue);

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
                        isPlaying={playState.isPlaying}
                    ></Viewer>
                ) : null}
            </div>

            <Controls
                hasFinished={playState.hasFinished}
                isStreamingLive={playState.isStreamingLive}
                isPlaying={playState.isPlaying}
                arePlayerButtonsEnabled={playState.arePlayerButtonsEnabled}
                isLive={playState.isLive}
                sessionWasInitiallyLive={false}
                onRepeat={onRepeat}
                onTogglePlaying={onTogglePlaying}
            >
                <PlayerTimeline
                    min={timeline.timelineMin}
                    max={timeline.timelineMax}
                    value={timeline.timelineValue}
                    activities={mock.activities}
                    // refresh={refreshTimeline}
                    // pauseActivity={pauseActivity}
                    // isCreated={timelineIsCreated}
                ></PlayerTimeline>
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
