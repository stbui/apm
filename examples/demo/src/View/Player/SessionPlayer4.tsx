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

let LogStepOnRange = -1;

let ra;
let interval;

let timeoutExecutionError;

let store = {
    timelineValue: 0,
};

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
    const timelineMin = 0;
    const timelineMax = 9329;
    const timelineValue = 1000;

    // 返回视频的长度
    const duration = 0;
    // 返回表示视频已缓冲部分
    const buffered = 0;
    // 设置或返回视频中的当前播放位置
    const currentTime = 0;
    // 返回视频的播放是否已结束
    const ended = 0;
    // 设置或返回视频播放的速度
    const playbackRate = 0;
    // 返回表示视频已播放部分
    const played = 0;
    // 返回视频当前的就绪状态
    const readyState = 0;

    const [currentActivity, setCurrentActivity] = useState({});

    // 开始播放视频
    const playerStarted = () => {
        M();

        polling();
    };
    // 暂停当前播放的视频
    const playerPause = () => {};
    //
    const playerSeek = () => {};
    //
    const playerStopped = () => {};
    const playerFinished = () => {};

    // 重新加载视频元素
    const resetPlayered = (value, fn) => {};

    /**
     *
     * @param currentTime
     * @param nextTime
     */
    const shouldSkipProlongedInactivity = (currentTime, nextTime) => {
        let lagTime = nextTime - currentTime;

        return lagTime;
    };

    /**
     * 播放进步需要的数值
     * 如果是直播，则返回MILLISECONDS_PER_FRAME
     * @param {number} timeline activities 索引
     * @returns {number} 返回播放进步需要的数值
     */
    const getLogStep = activityIndex => {
        return PLAYER_CONFIG.MILLISECONDS_PER_FRAME;
    };

    /**
     * 是否在播放进步范围
     * @param {number} timeline
     * @param {number} time
     */
    const shouldLogStepOnRange = (activityIndex, time) => {
        // 播放进步的数值
        const _logStep = getLogStep(activityIndex);

        return (
            activityIndex < activities.length &&
            activities[activityIndex].time >= time &&
            activities[activityIndex].time <= time + _logStep
        );
    };

    // 播放速度
    const playerRate = (time, nextTime, offset) => {
        const lagTime = shouldSkipProlongedInactivity(time, nextTime);
        const rate = lagTime / settings.playback.speed;

        return rate + offset;
    };

    /**
     *
     * @param {*} a
     * @param {*} date
     */
    function timeoutExecution(speed, date) {
        if (!date) {
            return 0;
        }

        const now = new Date();
        timeoutExecutionError += now.getTime() - date.getTime();

        if (timeoutExecutionError > 0) {
            if (timeoutExecutionError > speed) {
                timeoutExecutionError = timeoutExecutionError - speed;
                speed = 0;
            } else {
                speed -= timeoutExecutionError;
                timeoutExecutionError = 0;
            }
        }

        return speed;
    }

    // 循环播放
    const R = (offset = 0, date) => {
        const timeLimit = LogStepOnRange + 1;

        if (timeLimit < activities.length) {
            const oldTimeLimit = activities[LogStepOnRange].time;
            const newTimeLimit = activities[timeLimit].time;

            let speed = playerRate(oldTimeLimit, newTimeLimit, offset);
            speed = timeoutExecution(speed, date);

            ra = setTimeout(() => {
                refreshCurrentActivity(timeLimit);
            }, speed);
        } else {
            // 播放结束
            playerFinished();
        }
    };

    /**
     *
     * @param {*} timeline activityIndex
     * @param {*} status
     */
    function refreshCurrentActivity(timeline) {
        const now = new Date();
        const time = activities[timeline].time;
        const __timelineValue = time;

        // setTimelineValue(time);
        console.log(timeline);

        while (shouldLogStepOnRange(timeline, __timelineValue)) {
            timeline++;
        }

        R(activities[timeline - 1].time - time, now);
    }

    function M() {
        if (!ra) {
            const activityIndex = LogStepOnRange + 1;

            if (activityIndex < activities.length) {
                // 活动时间间隔
                const inActivity = shouldSkipProlongedInactivity(timelineValue, activities[activityIndex].time);

                ra = setTimeout(() => {
                    refreshCurrentActivity(activityIndex);
                }, inActivity / settings.playback.speed);
            } else {
                playerFinished();
            }
        }
    }

    const cancelPolling = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

    const polling = () => {
        // sa;
        if (!interval) {
            interval = setInterval(() => {
                const value = store.timelineValue + PLAYER_CONFIG.PLAY_SPEED;
                const activitie = activities[LogStepOnRange + 1];
                if (activitie) {
                    store.timelineValue = Math.min(value, activitie.time);
                    console.log('=======>', store.timelineValue);
                }
            }, PLAYER_CONFIG.PLAY_SPEED / settings.playback.speed);
        }
    };

    const update = () => {
        if (LogStepOnRange < activities.length) {
            LogStepOnRange++;
            setCurrentActivity(activities[LogStepOnRange]);
        }
    };

    useEffect(() => {
        // setInterval(() => {
        //     update();
        // }, 48);

        playerStarted();
    }, [session]);

    return (
        <div>
            <div style="overflow: hidden;background: #242628;">
                <Viewer
                    maxWidth={330}
                    maxHeight={537}
                    sessionScreenWidth={session.screenWidth}
                    sessionScreenHeight={session.screenHeight}
                    className="viewer-container"
                    // isCreated={viewerIsCreated}
                    // renderingProgress={renderingProgress}
                    initialVisibilityState={session.visibilityState}
                    sessionId={session.id}
                    // handleConsoleResize={handleConsoleResize}
                    currentActivity={currentActivity}
                    // snapshotData={{
                    //     snapshot: session.snapshot,
                    //     origin: session.origin,
                    //     docType: session.docType,
                    //     top: session.top,
                    //     left: session.left,
                    // }}
                    // fireClear={fireClear}
                    // fireAttach={fireAttach}
                    // onFireAttach={onFireAttach}
                ></Viewer>
            </div>

            <Controls
                hasFinished={false}
                isStreamingLive={false}
                isPlaying={false}
                arePlayerButtonsEnabled={false}
                isLive={false}
                sessionWasInitiallyLive={false}
                // onTogglePlaying={onTogglePlaying}
                // onRepeat={onRepeat}
                // onSelectNextStep={onSelectNextStep}
            >
                <Timelline
                    min={timelineMin}
                    max={timelineMax}
                    value={timelineValue}
                    activities={activities}
                    // refresh={refreshTimeline}
                    // pauseActivity={pauseActivity}
                    // isCreated={timelineIsCreated}
                ></Timelline>
            </Controls>
        </div>
    );
};
