const LOG_OFFSET = 5e3;

function c(a, b) {
    return b ? ((b = Math.max(b, 0)), (b = Math.min(b, a.length))) : null;
}

export class InitialSettings {
    public session;
    public selectedLog;
    public askUserForStreamingPermission;
    public customOrigin;
    public generalSettings;
    public analytics;
    public featureFlags;
    public pauseAt;
    public playFrom;

    constructor(
        session,
        selectedLog,
        askUserForStreamingPermission,
        customOrigin,
        generalSettings,
        analytics,
        featureFlags
    ) {
        this.session = session;
        this.selectedLog = selectedLog;
        this.askUserForStreamingPermission = askUserForStreamingPermission;
        this.customOrigin = customOrigin;
        this.generalSettings = generalSettings;
        this.analytics = analytics;
        this.featureFlags = featureFlags;
        this.pauseAt = c(this.session, this.generalSettings.pauseAt);
        this.playFrom = c(this.session, this.generalSettings.playFrom);
    }

    getSession() {
        return this.session;
    }
    shouldShowGoLiveButton(): boolean {
        return !!this.featureFlags.captureMetadataOnly && this.generalSettings.playLive && this.session.isLive;
    }
    isLive(): boolean {
        return this.session.isLive;
    }
    getPauseActivity() {
        return this.pauseAt ? { time: this.pauseAt } : this.selectedLog ? this.selectedLog : null;
    }
    getStartTime(): number {
        return this.playFrom
            ? this.playFrom
            : this.getPauseActivity()
            ? Math.max(0, this.getPauseActivity().time - LOG_OFFSET)
            : 0;
    }
    shouldStartStreaming(): boolean {
        return this.isLive() && this.generalSettings.playLive;
    }
    shouldWaitUserConfirmation(): boolean {
        return (
            this.featureFlags.captureMetadataOnly && this.generalSettings.playLive && this.askUserForStreamingPermission
        );
    }
    isAssureCoWorkaroundEnabled(): boolean {
        return this.generalSettings.isAssureCoWorkaroundEnabled || this.featureFlags.isAssureCoWorkaroundEnabled;
    }
    getCustomOrigin() {
        return this.customOrigin;
    }
    ignoreFormsAutofill() {
        return this.featureFlags.ignoreFormsAutofill;
    }
    getAccessToken() {
        return this.generalSettings.accessToken;
    }
    getSource() {
        return this.analytics.source;
    }
}
