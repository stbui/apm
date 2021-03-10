import React, { useState, useEffect } from 'react';

import { angular } from './test/common/angular';
import { InitialSettings } from './test/InitialSettings';
import { playerSettings } from './test/playerSettings';
import { SessionDataClient } from './test/SessionDataClient';
import SessionPlayer from './SessionPlayer';

interface ISession {
    isLive?: any;
    length?: any;
    clientStartMilliseconds?: any;
}

let initialSettings: InitialSettings;
let sessionDataClient: SessionDataClient;
const settings: any = {};

let startTime = 0;
let errors = {};
let isLive = false;
let showGoLiveButton = false;
let pauseActivity;

let timestamp;
let time: number = -1;

export default ({ sessionId, logId }) => {
    const [session, setSession] = useState<ISession>();
    const [activities, setActivities] = useState([]);
    const [finishLoadingStatus, setFinishLoadingStatus] = useState(false);

    //
    const sessionPlayerApi = {
        loadSession: settings => {
            //    userPermissionRequest.ignore = !initialSettings.shouldWaitUserConfirmation();
            const session = initialSettings.getSession();
            isLive = settings.isLive();
            showGoLiveButton = settings.shouldShowGoLiveButton();
            startTime = settings.getStartTime();
            pauseActivity = settings.getPauseActivity();
            // sessionId = session.id;
            // pauseActivity &&
            //     settings.playback.shouldPauseOnMarker &&
            //     player.changePauseMarker(pauseActivity.time);

            setSession(session);
        },
        setSessionLength: length => {
            console.log('setSessionLength', length);
        },
        finishLoadingActivities: () => {
            setFinishLoadingStatus(true);
        },
        addActivities: activities => {
            setActivities(activities);
        },
        startPlayback: () => {
            console.log('start');
        },
    };

    function A(activities) {
        angular.forEach(activities, function (activity) {
            activity.time = activity.timestamp - timestamp;
        });
    }

    function addActivities(activities) {
        if (activities && activities.length !== 0) {
            timestamp = timestamp || activities[0].timestamp;
            A(activities);
            time = activities[activities.length - 1].time;

            sessionPlayerApi.addActivities(activities);
        } else {
            // 可能数据加载完成
            // 数据加载完毕
            sessionPlayerApi.finishLoadingActivities();
        }
    }

    const loadActivitiesUntil = timeLimit => {
        sessionDataClient.loadActivitiesUntil(addActivities, timeLimit);
    };

    useEffect(() => {
        playerSettings.init(settings);
        // 实例
        sessionDataClient = new SessionDataClient(sessionId, logId, settings.settings.general.playLive);

        // 页面快照
        sessionDataClient
            .loadSession()
            .then(data => {
                // 初始化配置参数
                initialSettings = new InitialSettings(
                    data.sessionData.session,
                    data.sessionData.log,
                    data.sessionData.askUserForStreamingPermission,
                    data.sessionData.customOrigin,
                    settings.settings.general,
                    settings.settings.analytics,
                    data.featureFlags
                );

                sessionPlayerApi.loadSession(initialSettings);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (session) {
            sessionPlayerApi.setSessionLength(session.length);
            sessionPlayerApi.startPlayback();
            loadActivitiesUntil(session.clientStartMilliseconds + session.length);
        }
    }, [session]);

    return (
        <React.Fragment>
            {activities.length ? (
                <SessionPlayer
                    session={session}
                    activitiesData={activities}
                    startTime={startTime}
                    pauseActivity={pauseActivity}
                    isLive={isLive}
                    settings={settings.settings}
                    errors={errors}
                    api={sessionPlayerApi}
                    finishLoadingStatus={finishLoadingStatus}
                ></SessionPlayer>
            ) : null}
        </React.Fragment>
    );
};
