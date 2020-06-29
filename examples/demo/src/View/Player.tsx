import React, { useState, useEffect } from 'react';

import { angular } from './test/common/angular';
import { InitialSettings } from './test/InitialSettings';
import { playerSettings } from './test/playerSettings';
import { SessionDataClient } from './test/SessionDataClient';
import SessionPlayer from './SessionPlayer';

import mock from './Player/mock';
import { a } from './Player/mock2';

// const activitiesMock = a;
const activitiesMock = mock.activities;

let initialSettings: InitialSettings;
let sessionDataClient: SessionDataClient;
const settings: any = {};

// 从url上获取;
// this.sessionId
const sessionId = '5ed51f8b33f0736bcdfd046a';
let logId;

let startTime = 0;
let errors = {};
let isLive = false;
let showGoLiveButton = false;
let pauseActivity;

var timestamp;
var time: number = -1;

export default () => {
    const [session, setSession] = useState();
    const [activities, setActivities] = useState([]);
    const [finishLoadingStatus, setFinishLoadingStatus] = useState(false);

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
        setSessionLength: length => {
            console.log('setSessionLength', length);
        },
        finishLoadingActivities: () => {
            setFinishLoadingStatus(true);
        },
        addActivities: () => {},
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

            setActivities(activities);
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
        sessionDataClient.loadSession().then(data => {
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
            sessionPlayerApi.setSessionLength(data.sessionData.session.length);
            sessionPlayerApi.startPlayback();
            setSession(data.sessionData.session);
        });
    }, []);

    useEffect(() => {
        if (session) {
            loadActivitiesUntil(session.clientStartMilliseconds + session.length);
        }
    }, [session]);

    // console.log(1,activities)

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
