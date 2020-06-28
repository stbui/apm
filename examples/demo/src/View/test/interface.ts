export interface ILastRenderedActivity {
    playerIndex: number;
    time: number;
    data?: { visibilityState: 'hidden' };
    index?: number;
    timestamp?: number;
    type?: 'visibility_change' | 'childList';
}

export enum type {
    dom_snapshot = 'dom_snapshot',
}

export interface IActivity {
    data: object;
    index: number;
    time: number;
    timestamp: number;
    // type: 'dom_snapshot';
    type: string;
    // Activities.push
    playerIndex?: number;
}

export interface IRender {
    isTabHidden: boolean;
    lastRenderedActivity: IActivity;
    onTabHidden: (...a) => void;
    render: (b, d?) => void;
    reset: () => void;
    _onTabHiddenCallback: () => void;
}

export interface ISessionPlayerApi {
    finishLoadingActivities: Function;
    addActivities: Function;
    startLiveStreaming: Function;
    setSessionLength: Function;
    startPlayback: Function;
    setFeatureFlags: Function;
    setBrokerClient: Function;
    loadSession: Function;
    denyStreamingRequest: Function;
    interruptStreamingRequest: Function;
    resetStreamingRequest: Function;
    approveStreamingRequest: Function;
    stopLiveStreaming: Function;
    setUserHasGoneOffline: Function;
}

export interface ISettingsGeneral {
    playFrom?: number;
    pauseAt?: number;
    playLive?: any;
    uiMode?: string;
    accessToken?: string;
    isDemo?: boolean;
    domSnapshotsEnabled?: boolean;
    liveSeparatePipeline?: boolean;
    isAssureCoWorkaroundEnabled?: boolean;
}

export interface ISettingsAnalytics {
    source?: string;
}

export interface ISettingsPlayback {
    shouldPauseOnMarker: boolean;
    shouldSkipProlongedInactivity: boolean;
    shouldVisualizeClicks: boolean;
    speed: number;
}

export interface ISettingsFeatureFlags {
    isToolkitEnabled: boolean;
    isControlTakeoverEnabled: boolean;
    captureMetadataOnly: any;
    isAssureCoWorkaroundEnabled: boolean;
    ignoreFormsAutofill: any;
}
