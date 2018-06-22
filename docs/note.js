new WebSockt()
jquery
cookie
browser
document.documentElement

MutationObserver
https://github.com/rafaelw/mutation-summary

http://javascript.ruanyifeng.com/#dom

/**
 * $.ROOT_ELEMENT document.documentElement 对象
 *  
 */
documentRecorder.processDocument($.ROOT_ELEMENT, documentRecorder, crossOriginFramesManager)



b = {
    isStart: true,
    recorderQueue: {},
    sessionDataClient: {
        logResolver: {},
        mappings: {},
        nrManager: {},
        restClient: {},
        scope: {},
        sendDataFunction: {},
        webSocketClient: {
            requests: [],
            socket: [],
            close: function () {},
            openNewSocket: function () {},
            send: function () {}
        }
    },
    sendPendingData: function () {},
    start: function () {},
    stop: function () {},
}

d = {
    autoLogFailedNetworkRequests: 1,
    isLogging: true,
    setSettings: function () {},
    networkRequestLogger: {
        recorderQueue: {
            events: [],
            logs: [],
        },
        log: function () {}
    },
    start: function () {},
    stop: function () {}
}

Z = {
    HTTP_URLS: {
        DATA: 'https://recorder.sessionstack.com/api/session/{id}/data?server_session_id={ssid}',
        GET_IDENTITY_ROOT_DOMAIN: '',
        PING: '',
        SESSION: '',
        SESSION_ACTIVE: '',
        SESSION_INITIAL_DATA: '',
        SETTINGS: '',
        SET_SESSION_IDENTITY: '',
        UPDATE_SERVER_SESSION: ''
    },
    SHOULD_RESOLVE_SOURCE_MAPS: true,
    VERSION: '61',
    WEBSOCKET_URLS: {
        DATA: 'wss://recorder.sessionstack.com/api/session/{id}/data?server_session_id={ssid}'
    },
    buildHttpUrl: function () {},
    formatUrl: function () {},
    getServerUrl: function () {}
}

H = {
    crossOriginFramesManager: {},
    documentRecorder: {},
    domSnapshot: {},
    host: {},
    initialState: {},
    isRecording: true,
    isSendingData: true,
    mappings: {},
    nrManager: {},
    pingService: {},
    recorderDataService: {},
    recorderQueue: {},
    restClient: {},
    scope: {},
    serverSessionId: '',
    sessionDataClient: {},
    sessionId: '',
    sessionManager: {},
    sessionRecordingStartedCallbacks: [],
    settings: {},
    continueRecording: function () {},
    continueRecordingToParentFrameSession: function () {},
    executeGetSessionIdCallbacks: function () {},
    fireSessionRecordingStarted: function () {},
    getRecorderQueue: function () {},
    getSessionId: function () {},
    hasLoadedSettings: function () {},
    onSessionRecordingStarted: function () {},
    recordEvent: function () {},
    recordLog: function () {},
    setSettings: function () {},
    start: function () {},
    startDataSendingComponents: function () {},
    startOnTabActivation: function () {},
    startRecording: function () {},
    startSendingData: function () {},
    startSendingDataTo: function () {},
    startSendingDataToParentFrameSession: function () {},
    stop: function () {},
    stopRecording: function () {},
    stopSendingData: function () {}
}


function $sessionstackjq() {}
$sessionstackjq.prototype = {
    each: function () {},
    isFunction: function () {}
}

function s() {}
s.prototype = {
    connect: function () {},

}
