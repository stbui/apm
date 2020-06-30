import React, { useState, useEffect } from 'react';
import { last, noop } from 'lodash';
import PlayerTimeline from '../PlayerTimeline';
import Controls from '../Player/Controls';
import { PLAYER_CONFIG, TAB_VISIBILITY } from '../Player/constant';

import SessionViewer from '../SessionViewer';
import { Player } from '../test/player';
import { Activities } from '../test/Activities';
import { Activity, IActivity } from '../test/Activity';
import Console from '../Console';

let renderingProgress = 0;
let containerWidth = 1000;
let containerHeight = 800;

//
const activities = new Activities();
let player: Player;

export const SessionPlayer = ({ session, activitiesData, startTime, settings, finishLoadingStatus }) => {
    // viewer
    const [fireClear, setFireClear] = useState(false);
    const [fireAttach, setFireAttach]: any = useState();
    const [currentActivity, fireExecuteEvent]: any = useState();

    /**
     * timelineMax: 总时长
     * timelineMin：
     */
    const [timeline, setTimeline] = useState({ timelineMax: session.length, timelineMin: 0, timelineValue: startTime });
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
        player.jumpToTime(startTime);
        setPlayState({
            arePlayerButtonsEnabled: false,
            hasFinished: false,
            isPlaying: true,
            isLive: false,
            isStreamingLive: false,
        });
    };

    const play = () => {
        player.play(timeline.timelineValue);
        setPlayState({
            arePlayerButtonsEnabled: false,
            hasFinished: false,
            isPlaying: true,
            isLive: false,
            isStreamingLive: false,
        });
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

    const updateExecuteEventState = newValue => {
        fireExecuteEvent(newValue);
    };

    useEffect(() => {
        const lastRenderedActivity = { playerIndex: -1, time: 0 };
        const render = {
            _onTabHiddenCallback: noop,
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
                updateExecuteEventState(activities);

                activities.forEach((activity: IActivity) => {
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
        render.onTabHidden(function () {
            if (render.isTabHidden) {
                player.skipToTabShown(timelineValue);
            }
        });

        player = new Player(activities, render, PLAYER_CONFIG);
        player.onTimeChanged(time => {
            // console.log('onTimeChanged', time);
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
            // console.log('onPlaying');
            setPlayState({
                arePlayerButtonsEnabled: true,
                hasFinished: false,
                isPlaying: true,
                isLive: false,
                isStreamingLive: false,
            });
        });
        player.onPaused(() => {
            // console.log('onPaused');
            setPlayState({
                arePlayerButtonsEnabled: true,
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
    }, []);

    useEffect(() => {
        addActivities(activitiesData);
    }, activitiesData);

    useEffect(() => {
        activities.setSessionLength(session.length);

        start();
    }, [session]);

    useEffect(() => {
        // 结束加载activities
        if (finishLoadingStatus) {
            activities.finishLoading();
        }
    }, [finishLoadingStatus]);

    return (
        <div className="player-container _md layout-column flex">
            <div className="viewer-wrap _md layout-row flex">
                {currentActivity ? (
                    <SessionViewer
                        maxWidth={containerWidth}
                        maxHeight={containerHeight}
                        sessionScreenWidth={session.screenWidth}
                        sessionScreenHeight={session.screenHeight}
                        isCreated={true}
                        renderingProgress={renderingProgress}
                        initialVisibilityState={session.visibilityState}
                        sessionId={session.id}
                        handleConsoleResize={true}
                        currentActivity={currentActivity}
                        fireClear={fireClear}
                        fireAttach={fireAttach}
                        isPlaying={playState.isPlaying}
                    ></SessionViewer>
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
                    activities={activitiesData}
                    loadedTime={timeline.timelineMax}
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

export default SessionPlayer;
