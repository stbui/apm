angular.module('playerApp').directive('viewerOverlay', [
    'ClicksManager',
    function (ClicksManager) {
        return {
            restrict: 'E',
            templateUrl: 'templates/viewerOverlay.html',
            replace: !0,
            scope: {
                width: '=',
                height: '=',
                scale: '=',
                api: '=',
                getNode: '=',
                getScrollableNode: '=',
                focusNode: '=',
                updateLastTyping: '=',
                getFrameElementOffset: '=',
                isCreated: '=',
                playRecordedSession: '&',
            },
            link: function (b, c, d) {
                var e = new ClicksManager();
                var f = angular.element('.click-elements-overlay');
                var g = angular.element('.drawing-container');
                var h = angular.element('.cursor');

                b.getElement = function (a, c) {
                    return b.getNode(a, c);
                };
                b.getScrollableElement = function (a, c, d, e) {
                    return b.getScrollableNode(a, c, d, e);
                };
                b.getFrameOffset = function (a) {
                    return b.getFrameElementOffset(a);
                };
                b.updateLastTypingTime = function (a) {
                    return b.updateLastTyping(a);
                };
                b.focusElement = function (a) {
                    return b.focusNode(a);
                };
                b.api = {
                    setCursorPosition: function (a) {
                        a && h.css({ left: a.left, top: a.top });
                    },
                    registerClick: function (a, b) {
                        var c = e.registerClick(a, b);
                        c && f.append(c);
                    },
                    setScrollPosition: function (a, b) {
                        f.css({ top: -a, left: -b });
                        g.css({ top: -a, left: -b });
                    },
                    setRenderingProgress: function (a) {
                        if (a) {
                            var c = (a.current / a.total) * 100;
                            b.renderingProgressPercentage = Math.round(c);
                        }
                    },
                    showRenderingOverlay: function () {
                        b.shouldShowRenderingOverlay = !0;
                    },
                    hideRenderingOverlay: function () {
                        b.shouldShowRenderingOverlay = !1;
                    },
                    setPlayerSpeed: function (a) {
                        e.setPlayerSpeed(a);
                    },
                    setShouldVisualizeClicks: function (a) {
                        e.setShouldVisualizeClicks(a);
                    },
                    startClicksAnimation: function () {
                        e.startClicksAnimation();
                    },
                    stopClicksAnimation: function () {
                        e.stopClicksAnimation();
                    },
                    showVisibilityOverlay: function (a) {
                        b.visibilityState = a;
                        b.shouldShowVisibilityOverlay = !0;
                    },
                    hideVisibilityOverlay: function () {
                        b.shouldShowVisibilityOverlay = !1;
                    },
                    showBufferingOverlay: function () {
                        b.shouldShowBufferingOverlay = !0;
                    },
                    hideBufferingOverlay: function () {
                        b.shouldShowBufferingOverlay = !1;
                    },
                    enableDrawing: function (a) {
                        b.drawingApi.enableDrawing(a);
                    },
                    setToolIsActive: function (a, c) {
                        b.drawingApi.setToolIsActive(a, c);
                    },
                    setOverlayHeight: function (height) {
                        b.overlayHeight = height;
                    },
                    setOverlayWidth: function (width) {
                        b.overlayWidth = width;
                    },
                    showOfflineOverlay: function () {
                        b.shouldShowBufferingOverlay = !1;
                        b.shouldShowOfflineOverlay = !0;
                    },
                    hideOfflineOverlay: function () {
                        b.shouldShowOfflineOverlay = !1;
                    },
                };
                b.$watch('drawingOverlayIsCreated', function (a) {
                    b.isCreated = a;
                });
            },
        };
    },
]);
