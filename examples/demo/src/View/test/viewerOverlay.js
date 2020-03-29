angular.module('playerApp').directive('viewerOverlay', [
    'ClicksManager',
    function(a) {
        return {
            restrict: 'E',
            templateUrl: 'templates/viewerOverlay.html',
            replace: !0,
            scope: { width: '=', height: '=', api: '=' },
            link: function(b, c, d) {
                var e = new a(),
                    f = angular.element('.click-elements-overlay'),
                    g = angular.element('.cursor');
                b.api = {
                    setCursorPosition: function(a) {
                        a && g.css({ left: a.left, top: a.top });
                    },
                    registerClick: function(a, b) {
                        var c = e.registerClick(a, b);
                        c && f.append(c);
                    },
                    setScrollPosition: function(a, b) {
                        f.css({ top: -a, left: -b });
                    },
                    setRenderingProgress: function(a) {
                        if (a) {
                            var c = (a.current / a.total) * 100;
                            b.renderingProgressPercentage = Math.round(c);
                        }
                    },
                    showRenderingOverlay: function() {
                        b.shouldShowRenderingOverlay = !0;
                    },
                    hideRenderingOverlay: function() {
                        b.shouldShowRenderingOverlay = !1;
                    },
                    setPlayerSpeed: function(a) {
                        e.setPlayerSpeed(a);
                    },
                    setShouldVisualizeClicks: function(a) {
                        e.setShouldVisualizeClicks(a);
                    },
                    startClicksAnimation: function() {
                        e.startClicksAnimation();
                    },
                    stopClicksAnimation: function() {
                        e.stopClicksAnimation();
                    },
                    showVisibilityOverlay: function(a) {
                        (b.visibilityState = a), (b.shouldShowVisibilityOverlay = !0);
                    },
                    hideVisibilityOverlay: function() {
                        b.shouldShowVisibilityOverlay = !1;
                    },
                    showBufferingOverlay: function() {
                        b.shouldShowBufferingOverlay = !0;
                    },
                    hideBufferingOverlay: function() {
                        b.shouldShowBufferingOverlay = !1;
                    },
                };
            },
        };
    },
]);
