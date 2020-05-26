import React, { useState, useRef, useEffect } from 'react';

import { SessionDataClient } from './Player/session';
import { playerSettings } from './Player/settings';
import { auth } from './Player/auth';
import { SessionPlayer } from './Player/SessionPlayer';
import {
    PAUSE_AT_ACTIVITY_ID,
    USER_DETAILS_ANIMATION_TIME,
    EVENT_TYPE,
    SESSIONSTACK_HOVER_CLASS,
    PROCESS_HOVER_STYLES_CONFIG,
    ERRORS,
    VIEWER_MARGINS,
    SCROLL_POSITION_CHANGE,
    ELEMENTS,
    LIVE_MODE_CONFIGS,
    DEMO_USER_ROLE,
} from './Player/constant';

const player = {};

export default () => {
    let sessionWasInitiallyLive;

    let pauseActivity;
    let selectedLogId;
    let requestProgress;
    let isCatchingUpWithLive = false;

    const onStartLiveStreaming = () => {};
    const onStopLiveStreaming = () => {};

    //////////////////
    /// 2020.03.21
    playerSettings.init();
    // this.settings = {}
    const settings = {
        general: { isDemo: false, playFrom: undefined, pauseAt: undefined, playLive: undefined, uiMode: undefined },
        playback: {
            shouldSkipProlongedInactivity: true,
            shouldVisualizeClicks: true,
            shouldPauseOnMarker: true,
            speed: 1,
        },
    };

    const [session, setSession] = useState();
    const [isLive, setIsLive] = useState(false);
    const [activities, setActivities] = useState([]);

    // this
    let autostart = true;
    let startTime = 0;
    let errors = {};

    // 从url上获取;
    // this.sessionId
    const sessionId = '5dda91504aea244982de72d1';
    let logId;
    // 实例
    const sessionDataClient = new SessionDataClient(sessionId, logId);

    let pauseAt = settings.general.pauseAt;
    let playFrom = settings.general.playFrom;

    let _time;

    const sessionPlayerApi = {
        startLiveStreaming: function() {},
        setSessionLength: function(length) {
            // s.timelineMax = length;
            // var b = s.timelineValue || s.startTime;
        },
        addActivities: function(activities) {},
    };

    const _loadActivitiesUntilCallback = data => {
        if (data) {
            const activities = data.activities;
            if (activities.length > 0) {
                _time = activities[activities.length - 1].time;
            }

            sessionPlayerApi.addActivities(activities);
        }
    };

    const failCallback = b => {
        if (b)
            switch (b.status) {
                case 'HTTP_STATUS'.FORBIDDEN:
                case 'HTTP_STATUS'.UNAUTHORIZED:
                    window.location = 'FRONTEND_URL' + '#/login';
                    break;
                case 'HTTP_STATUS'.BAD_REQUEST:
                    errors.invalidSessionId = true;
                    break;
                case 'HTTP_STATUS'.NOT_FOUND:
                    errors.sessionNotFound = true;
            }
    };

    const onPlayerIsInitialized = () => {
        if (isLive && settings.general.playLive) {
            sessionPlayerApi.startLiveStreaming();
        } else {
            const length = session.length;
            sessionPlayerApi.setSessionLength(length);
            sessionDataClient
                .loadActivitiesUntil(_loadActivitiesUntilCallback, length)
                .then(_loadActivitiesUntilCallback, failCallback);
        }
    };

    useEffect(() => {
        // todo
        auth()
            .loadCurrentUser()
            .then(res => {});

        sessionDataClient.loadSession().then(res => {
            const log = res.log;

            setSession(res.session);
            setIsLive(res.session.isLive);

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
    }, []);

    // useEffect(() => {
    //     if (session) {
    //         //
    //         onPlayerIsInitialized();
    //     }
    // }, [session]);

    return (
        <div>
            {session ? (
                <SessionPlayer
                    session={session}
                    activities={activities}
                    startTime={startTime}
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
            ) : null}
        </div>
    );
};
