import React, { useState, useEffect } from 'react';
import { last, noop } from 'lodash';
import { EVENT_TYPE, TAB_VISIBILITY, PLAYER_CONFIG } from '../test/constant';
import { Player } from '../test/player';
import { Activities } from '../test/Activities';
import { Activity, IActivity } from '../test/Activity';
import PlayerTimeline from '../PlayerTimeline';
import SessionViewer from '../SessionViewer';
import Controls from '../Controls';
import Console from '../Console';

//
import Devtools from '../../Devtools';
import Resize from '../Resize';

let renderingProgress = 0;
let containerWidth = 1000;
let containerHeight = 800;

//
const activities = new Activities();
let player: Player;

function eventIncludeAtConsole(activity: IActivity) {
    return (
        [EVENT_TYPE.CONSOLE_ERROR, EVENT_TYPE.CONSOLE_WARN, EVENT_TYPE.CONSOLE_DEBUG, EVENT_TYPE.CONSOLE_LOG].indexOf(
            activity.type
        ) > -1
    );
}

function eventIncludeAtNetwork(activity: IActivity) {
    return activity.type === EVENT_TYPE.NETWORK_REQUEST;
}

function networkEvent(activity: IActivity) {
    return {
        message: activity.data.message,
        level: activity.data.level,
        request: activity.data,
    };
}

function consoleEvent(activity: IActivity) {
    var level = {};
    level[EVENT_TYPE.CONSOLE_LOG] = 'info';
    level[EVENT_TYPE.CONSOLE_ERROR] = 'error';
    level[EVENT_TYPE.CONSOLE_WARN] = 'warn';
    level[EVENT_TYPE.CONSOLE_DEBUG] = 'debug';

    let obj: any = { id: activity.id, level: level[activity.type] };

    if ('exception' === activity.data.type) {
        const { exception } = activity.data;
        obj.message = exception.type ? exception.type + ': ' : '';
        obj.message += exception.message;
        obj.isMessageTrimmed = false;
        obj.stackFrames = (exception.stackFrames || []).map(function (stackFrame) {
            return stackFrame.source || '';
        });
    } else {
        const { data } = activity;
        obj.message = data.message;
        obj.isMessageTrimmed = data.isMessageTrimmed;
        obj.stackFrames = null;
    }

    // data= object
    // extension: null
    // isMessageTrimmed: false
    // isTrimmed: false
    // level: "warn"
    // message: "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.↵↵* Move data fetching code or side effects to componentDidUpdate.↵* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state↵* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.↵↵Please update the following components: %s"
    // type: "string"
    return obj;
}

export const SessionPlayer = ({ session, activitiesData, startTime, settings, finishLoadingStatus }) => {
    // viewer
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
    const [addNewLogs, setAddNewLogs] = useState([]);
    const [addNewNetworkRequests, setAddNewNetworkRequests] = useState([]);
    const [position, setPosition] = useState(600);
    const [mode, setMode] = useState(true);

    const addActivities = (alias: IActivity[]) => {
        activities.push(alias);

        // 事件类型log
        let newLogs: any = [];
        let newNetworkRequests: any = [];

        alias.forEach((activity: IActivity) => {
            let event: any = {
                time: activity.time,
                activityIndex: activity.playerIndex,
                playerIndex: activity.playerIndex,
                type: activity.type,
                isLog: eventIncludeAtConsole(activity),
            };

            if (eventIncludeAtConsole(activity)) {
                event.details = consoleEvent(activity);
                newLogs.push(event);
            }

            if (eventIncludeAtNetwork(activity)) {
                event.details = networkEvent(activity);
                newNetworkRequests.push(event);
            }
        });

        if (newLogs.length) {
            setAddNewLogs(addNewLogs.concat(newLogs));
        }
        if (newNetworkRequests.length) {
            setAddNewNetworkRequests(addNewNetworkRequests.concat(newNetworkRequests));
        }
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

    const onSelectNextStep = () => {};

    const updateExecuteEventState = newValue => {
        fireExecuteEvent(newValue);
    };

    //
    const onChangeMode = () => {
        setMode(!mode);
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
        // 结束加载
        if (finishLoadingStatus) {
            activities.finishLoading();
        }
    }, [finishLoadingStatus]);

    return (
        <React.Fragment>
            <Resize
                split={mode ? 'vertical' : 'horizontal'}
                minSize={mode ? 800 : 200}
                defaultSize={mode ? 1200 : 600}
                pane1ClassName="shadow-split-widget-sidebar vbox"
                pane2ClassName="shadow-split-widget-main vbox"
            >
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
                        onSelectNextStep={onSelectNextStep}
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
                        addNewLogs={addNewLogs}
                        on-selected-log="onSelectedActivity"
                        update-console="updateConsole"
                    ></Console>
                </div>

                <Devtools
                    addNewLogs={addNewLogs}
                    addNewNetworkRequests={addNewNetworkRequests}
                    onChangeMode={onChangeMode}
                />
            </Resize>
            {/* <SplitWidget direction={mode ? 'vertical' : 'hbox'}>
                <SplitWidget.Sidebar width={position}>1</SplitWidget.Sidebar>
                <SplitWidget.Main>2</SplitWidget.Main>
                <SplitWidget.Resizer x={position} onDrap={value => setPosition(value)}></SplitWidget.Resizer>
            </SplitWidget> */}
        </React.Fragment>
    );
};

export default SessionPlayer;
