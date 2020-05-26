import React, { useState, useRef, useEffect, useCallback } from 'react';
import { findLastIndex } from 'lodash';
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

import mock from './mock';
const activities = mock.activities;

let storeTimelineValue;
let ra;
let time;
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
let LogStepOnRange: number = -1;

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
    const [currentActivity, setCurrentActivity] = useState({});
    const [fireClear, setFireClear] = useState(false);
    const [fireAttach, setFireAttach]: any = useState();

    /**
     * 重复播放
     */
    const repeat = () => {
        wa = -1;

        resetPlayered(startTime, playerStarted);
    };

    const shouldSkipProlongedInactivity = (_timelineValue, _timelineMax) => {
        let lagTime = _timelineMax - _timelineValue;

        if (settings.playback.shouldSkipProlongedInactivity) {
            lagTime = Math.min(lagTime, PLAYER_CONFIG.MAX_INACTIVITY_TIME);
        }

        return lagTime;
    };

    const calcRate = (timeLimit, timeLimitNext, c) => {
        const lagTime = shouldSkipProlongedInactivity(timeLimit, timeLimitNext);
        const rate = lagTime / settings.playback.speed;

        if (isStreamingLive) {
            const _timelineValue = activities[activities.length - 1].time;
            const lagTime = _timelineValue - timeLimitNext;

            if (lagTime > PLAYER_CONFIG.LAG_TIME) {
                return 0;
            }
        }
        return rate + c;
    };

    /**
     *
     * @param {*} a
     * @param {*} date
     */
    function timeoutExecution(a, date) {
        if (!date) {
            return 0;
        }

        const now = new Date();
        timeoutExecutionError += now.getTime() - date.getTime();

        if (timeoutExecutionError > 0) {
            if (timeoutExecutionError > a) {
                timeoutExecutionError = timeoutExecutionError - a;
                a = 0;
            } else {
                a -= timeoutExecutionError;
                timeoutExecutionError = 0;
            }
        }

        return a;
    }

    const cancelRa = () => {
        if (ra) {
            clearTimeout(ra);
            // timeout.cancel();
            ra = null;
        }
    };

    // ca
    const cancelWhileActivites = () => {
        if (time) {
            clearInterval(time);
            time = null;
        }
    };

    /**
     * da(
     * 取消计时器
     */
    function cancelAll() {
        cancelRa();
        cancelWhileActivites();
        // isPlaying = false;
        setIsPlaying(false);
    }

    /**
     * V
     * 播放结束
     */
    const playFinished = () => {
        if (activities.length > 0) {
            setTimelineValue(activities[activities.length - 1].time);
        }

        // 取消计时器
        cancelAll();

        // 标记播放完成
        if (!isStreamingLive) {
            // hasFinished = true;
            setHasFinished(true);
        }
    };

    /**
     * 播放进步需要的数值
     * 如果是直播，则返回MILLISECONDS_PER_FRAME
     * @param {number} timeline activities 索引
     * @returns {number} 返回播放进步需要的数值
     */
    const getLogStep = activityIndex => {
        // 不是直播
        if (!isStreamingLive) {
            return PLAYER_CONFIG.MILLISECONDS_PER_FRAME;
        }

        // 当前activities索引
        activityIndex = Math.min(activityIndex, activities.length - 1);

        const _timelineValue = activities[activityIndex].time;
        const _timelineMax = activities[activityIndex.length - 1].time;
        const lagTime = _timelineMax - _timelineValue;

        return lagTime > PLAYER_CONFIG.LAG_TIME ? 500 : PLAYER_CONFIG.MILLISECONDS_PER_FRAME;
    };

    /**
     * 是否在播放进步范围
     * @param {number} timeline
     * @param {number} _timelineValue
     */
    const shouldLogStepOnRange = (activityIndex, _timelineValue) => {
        // 播放进步的数值
        const _logStep = getLogStep(activityIndex);

        return (
            activityIndex < activities.length &&
            activities[activityIndex].time >= _timelineValue &&
            activities[activityIndex].time <= _timelineValue + _logStep
        );
    };

    /**
     *
     * @param {*} timeline
     * @param {*} status
     */
    const shouldPauseOnMarker = (index, status) => {
        if (!status && settings.playback.shouldPauseOnMarker && pauseActivity) {
            return pauseActivity.id === activities[index].id;
        }
    };

    const isPasuseAtActivityId = activity => {
        return !!activity.id && activity.id !== 'pause_at_activity_id';
    };

    /**
     * aa
     * @param {*} timeline
     */
    const updateActivity = index => {
        const activity = activities[index];

        if (!isPasuseAtActivityId(activity)) {
            // todo: sessionViewer
            // e.fireExecuteEvent(s, activity);
            // console.log(activity);
            // setCurrentActivity(activity);
        }

        wa = index;
    };

    /**
     *
     * @param {*} timeline activityIndex
     * @param {*} status
     */
    function refreshCurrentActivity(timeline, status?) {
        const now = new Date();
        const time = activities[timeline].time;
        const __timelineValue = time;

        setTimelineValue(time);

        while (shouldLogStepOnRange(timeline, __timelineValue)) {
            if (shouldPauseOnMarker(timeline, status)) {
                // s.pause();

                if (settings.general.isDemo && selectedLogId) {
                    logStep = 1;
                }

                return;
            }

            updateActivity(timeline);
            timeline++;
        }

        R(activities[timeline - 1].time - time, now);
    }

    // R
    // 循环播放
    const R = (a = 0, date) => {
        const timeLimit = wa + 1;

        if (timeLimit < activities.length) {
            const oldTimeLimit = activities[wa].time;
            const newTimeLimit = activities[timeLimit].time;

            let speed = calcRate(oldTimeLimit, newTimeLimit, a);
            speed = timeoutExecution(speed, date);

            ra = setTimeout(() => {
                refreshCurrentActivity(timeLimit);
            }, speed);
        } else {
            // 播放结束
            playFinished();
        }
    };

    /**
     * F
     * 取消计时器
     */
    function reset() {
        // 取消计时器
        if (asyncWhile) {
            asyncWhile.cancel();
        }
    }

    /**
     * ba
     * 更新循环 timelineValue 值
     */
    const whileActivites = () => {
        // sa;
        if (!time) {
            time = setInterval(() => {
                // fixed: timelineValue 异步没有得到最新值
                // const value = timelineValue + PLAYER_CONFIG.PLAY_SPEED;
                const value = storeTimelineValue + PLAYER_CONFIG.PLAY_SPEED;
                const activitie = activities[wa + 1];
                if (activitie) {
                    // console.log('=======>', value);
                    // timelineValue = Math.min(value, activitie.time);
                    setTimelineValue(Math.min(value, activitie.time));
                }
            }, PLAYER_CONFIG.PLAY_SPEED / settings.playback.speed);
        }
    };

    /**
     *
     * @param {*} isPlaying
     */
    const onTogglePlaying = status => {
        console.log('onTogglePlaying', status);
    };

    const onRepeat = () => {
        console.log('onRepeat');
        repeat();
    };

    const onSelectNextStep = index => {
        console.log('onSelectNextStep');
    };

    /// viewer event
    // G
    const onFireAttach = callback => {
        if (typeof callback === 'function') {
            callback();
        }
    };

    const update = () => {
        if (LogStepOnRange < activities.length) {
            LogStepOnRange++;
            setCurrentActivity(activities[LogStepOnRange]);
        }
    };

    // ===========================
    /**
     * G
     * @param {*} callback time/function
     */
    function loadSyncStorage(callback) {
        // callback = playerStarted
        // setFireAttach({ callback });

        callback();
    }

    /**
     * _
     * @param {*} a time
     * @param {*} b callback
     */
    function queuedLoop(time: number, callback?) {
        // 取消计时器;
        reset();

        if (wa > time || wa === -1) {
            visibilityState = false;
            // e.fireClear(s,snapshotData);
            // 清楚viewer
            setFireClear(true);
        }

        let start = 0;
        if (wa <= time) {
            start = wa + 1;
        } else {
            wa = -1;
        }
        time = Math.min(time, activities.length - 1);

        let i = start;

        const condition = () => {
            return i <= time;
        };

        const body = () => {
            let endIndex = Math.min(time, i + PLAYER_CONFIG.EVENTS_BATCH_SIZE);
            // todo;
            for (; i <= endIndex; i++) {
                updateActivity(i);
            }
        };

        // 每次执行时间间隔
        const waitTime = { waitTime: PLAYER_CONFIG.EVENTS_BATCH_WAIT_TIME };

        asyncWhile = new AsyncWhile(condition, body, waitTime);

        asyncWhile.start(() => {
            if (wa === -1) {
                // loadSyncStorage(callback);
                return;
            }
        });
    }

    // status undefined
    function M(status) {
        if (!ra) {
            const activityIndex = wa + 1;

            if (activityIndex < activities.length) {
                const inActivity = shouldSkipProlongedInactivity(timelineValue, activities[activityIndex].time);

                ra = setTimeout(() => {
                    refreshCurrentActivity(activityIndex, status);
                }, inActivity / settings.playback.speed);
            } else {
                playFinished();
            }
        }
    }

    /**
     * ea
     * @param {*} a
     */
    function ea(status) {
        console.log('started');
        M(status);

        // 循环更新 timelineValue 值
        whileActivites();
    }

    /**
     * K
     * @param {*} status
     */
    const playerStarted = (status?) => {
        ea(status);
    };

    /**
     * E
     * 重置
     * @param {*} time
     * @param {*} fn
     */
    function resetPlayered(time: number, callback) {
        // 取消计时器
        cancelAll();

        const lastActivityIndex = findLastIndex(activities, activity => {
            return activity.time <= time;
        });

        console.log('resetPlayered', lastActivityIndex, time);

        //
        queuedLoop(lastActivityIndex, callback);
    }

    useEffect(() => {
        // playerStarted();
        // 自动播放开始
        // resetPlayered(storeTimelineValue, playerStarted);

        setInterval(() => {
            update();
        }, 48);
    }, [session]);

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
                    onFireAttach={onFireAttach}
                ></Viewer>
            </div>

            <Controls
                hasFinished={hasFinished}
                isStreamingLive={isStreamingLive}
                isPlaying={isPlaying}
                arePlayerButtonsEnabled={arePlayerButtonsEnabled}
                isLive={isLive}
                sessionWasInitiallyLive={sessionWasInitiallyLive}
                onTogglePlaying={onTogglePlaying}
                onRepeat={onRepeat}
                onSelectNextStep={onSelectNextStep}
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
