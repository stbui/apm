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
    const [fireExecuteEvent, setFireExecuteEvent]: any = useState();
    const [hasLogStepOnRange, setHasLogStepOnRange] = useState(false);

    function ja() {
        // if (!(xa || isTimelineDirty)) {
        //     playerStarted();
        // }

        playerStarted();
    }

    function ia() {
        if (Ba) {
            Ba = false;
            // fixed
            resetPlayered(storeTimelineValue, ja);
        } else {
            // var a = !isStreamingLive && isRendering;
            // isPlaying || a || isPaused || E(timelineValue, ja);

            // var screenSmallerThanEditor = !isStreamingLive;
            // if (!(isPlaying || screenSmallerThanEditor || isPaused)) {
            //     resetPlayered(storeTimelineValue, ja);
            // }

            resetPlayered(storeTimelineValue, ja);
        }
    }

    /**
     * ha
     */
    function ha() {
        // test:
        let _looadedTime = 9329;
        if (_looadedTime < timelineValue) {
            toggleBuffering(true);
            setArePlayerButtonsEnabled(false);
            // 取消计时器
            cancelAll();
        } else if (_looadedTime >= timelineValue) {
            toggleBuffering(false);
            setArePlayerButtonsEnabled(true);

            ia();
        }
    }

    /**
     *
     * 跳转
     * @param {*} value
     */
    function goTimelineValue(value) {
        // timelineValue = a;
        setTimelineValue(value);
        ha();
    }

    function la() {
        if (!isStreamingLive) {
            setIsStreamingLive(true);
        }

        // e.fireStartLiveStreaming(s);

        goTimelineValue(timelineMax);
    }

    const goLive = () => {
        Ba = true;

        cancelAll();

        // e.firePlayerStopped(s);
        la();
    };

    /**
     * v
     */
    function isReady() {
        return (
            isCreated() &&
            !isPlaying &&
            wa >= 0 &&
            activities[activities.length - 1].time - activities[wa].time < PLAYER_CONFIG.GO_LIVE_DELAY_TIME
        );
    }

    /**
     * ka
     * 停止直播流
     */
    const stopLiveStreaming = () => {
        if (isStreamingLive) {
            // isStreamingLive = false;
            setIsStreamingLive(false);
            // e.fireStopLiveStreaming(s);
        }
    };

    /**
     * L
     * 停止播放
     */
    const playerStopped = () => {
        // 停止直播
        stopLiveStreaming();
        // 取消计时器
        cancelAll();

        // todo: sessionViewer
        // e.firePlayerStopped(s);
    };

    /**
     * K
     * @param {*} status
     */
    const playerStarted = (status?) => {
        setHasFinished(false);

        ea(status);
        // todo sessionViewer
        // e.firePlayerStarted(s);
    };

    // this.function
    /**
     * 播放开始/停止
     */
    const togglePlaying = () => {
        if (isReady()) {
            isPaused = true;
            stopLiveStreaming();
        } else {
            if (isPlaying || isStreamingLive) {
                isPaused = true;

                playerStopped();
            } else {
                isPaused = false;
                playerStarted(true);
            }
        }
    };

    /**
     * 重复播放
     */
    const repeat = () => {
        wa = -1;

        resetPlayered(startTime, playerStarted);
    };

    const play = () => {
        isPaused = false;
        playerStarted(true);
    };

    const pause = () => {
        isPaused = true;
        playerStopped();
    };

    // 指定播放
    const onSelectedActivity = index => {
        // 设置播放没有结束
        setHasFinished(false);

        const activity = activities[index];
        // timelineValue = activity.time;
        setTimelineValue(activity.time);

        if (wa + 1 !== index) {
            pause();
            _(index - 1);
        }
    };

    /////////////////
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
    const cancelPolling = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

    /**
     * da(
     * 取消计时器
     */
    function cancelAll() {
        cancelRa();
        cancelPolling();
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
     * pa
     * 更新子组件
     * @param {*} timeline
     */
    const updateStepsTimelineAndConsole = timeline => {
        if (typeof updateStepsTimeline === 'function') {
            // component callback: stepstimelinne
            updateStepsTimeline(timeline);
        }

        if (typeof updateConsole === 'function') {
            // component callback: console
            updateConsole(timeline);
        }
    };

    const aa = () => {};
    /**
     * aa
     * @param {*} timeline
     */
    const updateActivity = index => {
        const activity = activities[index];

        if (!isPasuseAtActivityId(activity)) {
            // todo: sessionViewer
            // e.fireExecuteEvent(s, activity);
            setCurrentActivity(activity);
        }

        wa = index;
        updateStepsTimelineAndConsole(index);

        if (activity.type === EVENT_TYPE.VISIBILITY_CHANGE) {
            visibilityState = activity.data.visibilityState === TAB_VISIBILITY.HIDDEN;
        }
    };

    /**
     * U
     * 停留
     */
    const findActivitiesVisibleIndex = () => {
        for (let index = wa; index < activities.length; index++) {
            const activity = activities[index];

            if (
                activity.type === EVENT_TYPE.VISIBILITY_CHANGE &&
                activity.data.visibilityState === TAB_VISIBILITY.VISIBLE
            ) {
                return index;
            }
        }

        return activities.length - 1;
    };

    /**
     * P
     * TabOverlay
     * TAB_VISIBILITY类型
     */
    const isTabVisibility = () => {
        let visibleIndex = findActivitiesVisibleIndex();

        for (let b = wa; b < visibleIndex; b++) {
            const type = activities[b].type;

            if (Array.includes(MOUSE_TYPE, type)) {
                return true;
            }
        }

        return false;
    };

    // Q
    const isPauseActivity = () => {
        if (pauseActivity) {
            return timelineValue >= pauseActivity.time;
        }
    };

    /**
     * J
     * 组件是否已经创建
     */
    const isCreated = () => {
        return viewerIsCreated && timelineIsCreated && stepsTimelineIsCreated && !!session;
    };

    /**
     * I
     * 自动播放
     */
    const isAutoStart = () => {
        return autostart && isCreated();
    };

    /**
     * E
     * 重置
     * @param {*} time
     * @param {*} fn
     */
    function resetPlayered(time, callback) {
        if (isAutoStart()) {
            // timelineValue = time;
            setTimelineValue(time);

            // 取消计时器
            cancelAll();

            const lastActivityIndex = findLastIndex(activities, activity => {
                return activity.time <= time;
            });

            console.log('resetPlayered', lastActivityIndex, time);

            //
            _(lastActivityIndex, callback);
        }
    }

    /**
     * O
     *
     */
    function toggleHideHiddenTabOverlay() {
        if (isTabVisibility()) {
            visibilityState = false;
            // e.fireHideHiddenTabOverlay(s);
            // 循环播放
            R();
        } else {
            if (pauseActivity && !isPauseActivity()) {
                setTimeout(() => {
                    E(pauseActivity.time, cancelAll);
                }, PLAYER_CONFIG.TAB_HIDDEN_MESSAGE_TIME);
            } else {
                let visibleIndex = findActivitiesVisibleIndex();

                setTimeout(() => {
                    _(visibleIndex, R);
                }, PLAYER_CONFIG.TAB_HIDDEN_MESSAGE_TIME);
            }
        }
    }

    function N() {}
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

        if (settings.playback.shouldSkipProlongedInactivity && visibilityState && !isStreamingLive) {
            toggleHideHiddenTabOverlay();
        } else {
            R(activities[timeline - 1].time - time, now);
        }
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

        // 直播状态
        if (isStreamingLive) {
            // e.fireShowBuffering(s);
        } else {
            // e.fireShowViewerOverlay(s);
        }

        // s.disableStepsTimeline();
        // arePlayerButtonsEnabled = false;
        // isRendering = true;
        // e.fireVisualizeClicks(s, false);
        // e.fireDetach(s);

        setArePlayerButtonsEnabled(false);
    }

    /**
     * ma
     * 缓冲开关
     * @param {*} status true/false
     */
    const toggleBuffering = status => {
        xa = status;
        buffering = status;

        // status ? e.fireShowBuffering(s) : e.fireHideBuffering(s);
    };

    /**
     * G
     * @param {*} callback time/function
     */
    function loadSyncStorage(callback) {
        // e.fireAttach(s, function() {
        //     e.fireVisualizeClicks(s, s.settings.playback.shouldVisualizeClicks),
        //         s.isStreamingLive && !s.isCatchingUpWithLive && ma(!1),
        //         e.fireHideViewerOverlay(s),
        //         s.enableStepsTimeline(),
        //         (s.isRendering = !1),
        //         (s.arePlayerButtonsEnabled = !0),
        //         pa(wa),
        //         angular.isFunction(a) && a();
        // });

        setFireAttach({ callback });

        // if (isStreamingLive && !isCatchingUpWithLive) {
        //     toggleBuffering(false);
        // }

        // setArePlayerButtonsEnabled(true);
        // //
        // updateStepsTimelineAndConsole(wa);

        // if (typeof callback === 'function') {
        //     callback();
        // }
    }
    /**
     * _
     * @param {*} a time
     * @param {*} b callback
     */
    function _(time, callback?) {
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

            // s.renderingProgress = {
            //     current: i - newTime - 1,
            //     total: time - newTime,
            // };
        };

        const waitTime = { waitTime: PLAYER_CONFIG.EVENTS_BATCH_WAIT_TIME };

        asyncWhile = new AsyncWhile(condition, body, waitTime);

        asyncWhile.start(() => {
            if (wa === -1 || !isStreamingLive) {
                loadSyncStorage(callback);
                return;
            }

            const time = activities[wa].time;

            if (isStreamingLive && timelineMax - time < PLAYER_CONFIG.GO_LIVE_DELAY_TIME) {
                loadSyncStorage(callback);
            }
        });
    }

    ///
    // status undefined
    function M(status) {
        if (!ra) {
            timeoutExecutionError = 0;
            const activityIndex = wa + 1;
            if (activityIndex < activities.length)
                if (settings.playback.shouldSkipProlongedInactivity && visibilityState && !isStreamingLive) {
                    toggleHideHiddenTabOverlay();
                } else {
                    const inActivity = shouldSkipProlongedInactivity(timelineValue, activities[activityIndex].time);

                    ra = setTimeout(() => {
                        refreshCurrentActivity(activityIndex, status);
                    }, inActivity / settings.playback.speed);
                }
            else {
                playFinished();
            }
        }
    }

    /**
     * ba
     * 更新循环 timelineValue 值
     */
    const polling = () => {
        // sa;
        if (!interval) {
            interval = setInterval(() => {
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
     * @param {*} time
     */
    function ga(time) {
        setTimelineValue(time);
        ha();
    }

    /**
     * ea
     * @param {*} a
     */
    function ea(status) {
        setIsPlaying(true);
        // isPlaying = true;
        console.log('started');
        M(status);

        // 循环更新 timelineValue 值
        polling();
    }

    /**
     *
     * @param {*} isPlaying
     */
    const onTogglePlaying = status => {
        console.log('onTogglePlaying', status);
        togglePlaying();
    };

    const onRepeat = () => {
        console.log('onRepeat');
        repeat();
    };

    const onSelectNextStep = index => {
        console.log('onSelectNextStep');
        onSelectedActivity(22);
    };

    /// viewer event
    // G
    const onFireAttach = callback => {
        if (isStreamingLive && !isCatchingUpWithLive) {
            toggleBuffering(false);
        }

        setArePlayerButtonsEnabled(true);
        //
        updateStepsTimelineAndConsole(wa);

        if (typeof callback === 'function') {
            callback();
        }
    };

    // 实现不对
    const onTimelineSelect = value => {
        // console.log('onTimelineSelect', value);
        if (isTimelineDirty) {
            playerStopped();
        } else if (!isTimelineDirty) {
            Ba = true;
            // 取消所有计时器
            cancelAll();
            stopLiveStreaming();
            //
            // e.firePlayerStopped(s);
            // fixed: timelineValue
            ga(storeTimelineValue);
        }
    };

    // ===========================

    function addActivities(session) {
        ha();
    }

    useEffect(() => {
        // 自动播放开始
        addActivities(session);
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
                    onSelect={onTimelineSelect}
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
