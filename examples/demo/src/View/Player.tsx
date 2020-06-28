import React, { useState, useRef, useEffect } from 'react';

import { SessionDataClient } from './Player/session';

import { InitialSettings } from './test/InitialSettings';
import { playerSettings } from './test/playerSettings';
import SessionPlayer from './SessionPlayer';

import mock from './Player/mock';
import { a } from './Player/mock2';

// const activitiesMock = a;
const activitiesMock = mock.activities;

let initialSettings;
const settings: any = {};

// 从url上获取;
// this.sessionId
const sessionId = '5dda91504aea244982de72d1';
let logId;

// this
let autostart = true;
let startTime = 0;
let errors = {};
let isLive = false;
let showGoLiveButton = false;
let pauseActivity;

export default () => {
    const [session, setSession] = useState();
    const [activities, setActivities] = useState(activitiesMock);

    //
    const sessionPlayerApi = {
        loadSession: settings => {
            //    userPermissionRequest.ignore = !initialSettings.shouldWaitUserConfirmation();
            //    session = initialSettings.getSession();
            isLive = settings.isLive();
            // showGoLiveButton = settings.shouldShowGoLiveButton();
            startTime = settings.getStartTime();
            pauseActivity = settings.getPauseActivity();
            // sessionId = session.id;
            // pauseActivity &&
            //     settings.playback.shouldPauseOnMarker &&
            //     player.changePauseMarker(pauseActivity.time);
        },
        setSessionLength: () => {
            console.log('setSessionLength');
        },
        finishLoadingActivities: () => {},
        addActivities: () => {},
    };

    useEffect(() => {
        playerSettings.init(settings);
        // 实例
        const sessionDataClient = new SessionDataClient(sessionId, logId, settings.settings.general.playLive);

        // 页面快照
        sessionDataClient.loadSession().then(res => {
            // 初始化配置参数
            initialSettings = new InitialSettings(
                res.session,
                res.log,
                res.askUserForStreamingPermission,
                res.customOrigin,
                settings.settings.general,
                settings.settings.analytics,
                res.featureFlags
            );

            sessionPlayerApi.loadSession(initialSettings);

            setSession(res.session);
        });
    }, []);

    return (
        <React.Fragment>
            {session ? (
                <SessionPlayer
                    session={session}
                    activitiesData={activities}
                    startTime={startTime}
                    pauseActivity={pauseActivity}
                    isLive={isLive}
                    settings={settings.settings}
                    errors={errors}
                    api={sessionPlayerApi}
                ></SessionPlayer>
            ) : null}
        </React.Fragment>
    );
};
