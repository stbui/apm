import React, { useState, useRef, useEffect } from 'react';

import { SessionDataClient } from './Player/session';
import { playerSettings } from './Player/settings';
import { auth } from './Player/auth';
import { SessionPlayer } from './Player/SessionPlayer';

const player = {};

export default () => {
    const PAUSE_AT_ACTIVITY_ID = 'pause_at_activity_id';
    const USER_DETAILS_ANIMATION_TIME = 500;

    const EVENT_TYPE = {
        DOM_MUTATION: 'dom_mutation',
        DOM_ELEMENT_VALUE_CHANGE: 'dom_element_value_change',
        DOM_SNAPSHOT: 'dom_snapshot',
        MOUSE_MOVE: 'mouse_move',
        MOUSE_CLICK: 'mouse_click',
        MOUSE_OVER: 'mouse_over',
        MOUSE_OUT: 'mouse_out',
        SCROLL_POSITION_CHANGE: 'scroll_position_change',
        WINDOW_RESIZE: 'window_resize',
        RADIO_BUTTON_CHANGE: 'radio_button_change',
        CHECKBOX_CHANGE: 'checkbox_change',
        VISIBILITY_CHANGE: 'visibility_change',
        CSS_RULE_INSERT: 'css_rule_insert',
        CSS_RULE_DELETE: 'css_rule_delete',
    };

    const SESSIONSTACK_HOVER_CLASS = '_ss-hover';
    const PROCESS_HOVER_STYLES_CONFIG = { DELAY: 100, TIMES_TO_REPEAT: 0 };
    const ERRORS = { SECURITY_ERROR: 'SecurityError' };
    const VIEWER_MARGINS = { HORIZONTAL: 20, VERTICAL: 20 };
    const SCROLL_POSITION_CHANGE = { MAX_RETRIES: 100, TIMEOUT: 50 };
    const ELEMENTS = { HTML: 'html' };
    // const CROSS_ORIGIN_FRAME_BACKGROUND

    const LOG_OFFSET = 5000;
    const LIVE_MODE_CONFIGS = { GO_LIVE_OFFSET_TIME: 1000, MAX_ATTEMPTS: 3 };
    const DEMO_USER_ROLE = 'demo';

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

    useEffect(() => {
        if (session) {
            //
            onPlayerIsInitialized();
        }
    }, [session]);

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
