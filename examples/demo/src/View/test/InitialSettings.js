angular
    .module('playerApp')
    .constant('LOG_OFFSET', 5e3)
    .factory('InitialSettings', [
        'LOG_OFFSET',
        function(a) {
            function b(a, b, d, e, f, g, h) {
                (this.session = a),
                    (this.selectedLog = b),
                    (this.askUserForStreamingPermission = d),
                    (this.customOrigin = e),
                    (this.generalSettings = f),
                    (this.analytics = g),
                    (this.featureFlags = h),
                    (this.pauseAt = c(this.session, this.generalSettings.pauseAt)),
                    (this.playFrom = c(this.session, this.generalSettings.playFrom));
            }
            function c(a, b) {
                return b ? ((b = Math.max(b, 0)), (b = Math.min(b, a.length))) : null;
            }
            return (
                (b.prototype = {
                    getSession: function() {
                        return this.session;
                    },
                    shouldShowGoLiveButton: function() {
                        return (
                            !!this.featureFlags.captureMetadataOnly &&
                            this.generalSettings.playLive &&
                            this.session.isLive
                        );
                    },
                    isLive: function() {
                        return this.session.isLive;
                    },
                    getPauseActivity: function() {
                        return this.pauseAt ? { time: this.pauseAt } : this.selectedLog ? this.selectedLog : null;
                    },
                    getStartTime: function() {
                        return this.playFrom
                            ? this.playFrom
                            : this.getPauseActivity()
                            ? Math.max(0, this.getPauseActivity().time - a)
                            : 0;
                    },
                    shouldStartStreaming: function() {
                        return this.isLive() && this.generalSettings.playLive;
                    },
                    shouldWaitUserConfirmation: function() {
                        return (
                            this.featureFlags.captureMetadataOnly &&
                            this.generalSettings.playLive &&
                            this.askUserForStreamingPermission
                        );
                    },
                    isAssureCoWorkaroundEnabled: function() {
                        return (
                            this.generalSettings.isAssureCoWorkaroundEnabled ||
                            this.featureFlags.isAssureCoWorkaroundEnabled
                        );
                    },
                    getCustomOrigin: function() {
                        return this.customOrigin;
                    },
                    ignoreFormsAutofill: function() {
                        return this.featureFlags.ignoreFormsAutofill;
                    },
                    getAccessToken: function() {
                        return this.generalSettings.accessToken;
                    },
                    getSource: function() {
                        return this.analytics.source;
                    },
                }),
                b
            );
        },
    ]);
