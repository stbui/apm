import React, { useState, useRef, useEffect } from 'react';

import { SessionDataClient } from './Player/session';

import { InitialSettings } from './Player/InitialSettings';
import { playerSettings } from './test/playerSettings';
import SessionPlayer from './SessionPlayer';

import mock from './Player/mock';
import { a } from './Player/mock2';

// const activitiesMock = a;
const activitiesMock = mock.activities;

export default () => {
    let sessionWasInitiallyLive;

    let pauseActivity;
    let selectedLogId;
    let requestProgress;
    let isCatchingUpWithLive = false;

    const [session, setSession] = useState();
    const [isLive, setIsLive] = useState(false);
    const [activities, setActivities] = useState(activitiesMock);

    // this
    let autostart = true;
    let startTime = 0;
    let errors = {};

    // 从url上获取;
    // this.sessionId
    const sessionId = '5dda91504aea244982de72d1';
    let logId;

    const settings = {};

    useEffect(() => {
        playerSettings.init(settings);
        // 实例
        const sessionDataClient = new SessionDataClient(sessionId, logId, settings.settings.general.playLive);

        sessionDataClient.loadSession().then(res => {
            setSession(res.session);
            setIsLive(res.session.isLive);
        });
    }, []);

    return (
        <div>
            {session ? (
                <SessionPlayer
                    session={session}
                    activitiesData={activities}
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
