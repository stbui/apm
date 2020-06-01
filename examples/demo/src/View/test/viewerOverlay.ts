import { ClicksManager } from './ClicksManager';

interface IScope {
    width: any;
    height: any;
    scale: any;
    api: any;
    getNode: any;
    getScrollableNode: any;
    focusNode: any;
    updateLastTyping: any;
    getFrameElementOffset: any;
    isCreated: boolean;
    playRecordedSession: any;
    visibilityState: any;
    shouldShowVisibilityOverlay: any;
    shouldShowBufferingOverlay: any;
    drawingApi: object;
    overlayWidth: number;
    overlayHeight: number;
    shouldShowOfflineOverlay: boolean;
    // [key: string]: any;
}

angular.module('playerApp').directive('viewerOverlay', [
    'ClicksManager',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/viewerOverlay.html',
            replace: true,
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
            link: function($scope: IScope, $element, d) {
                var clicksManager = new ClicksManager();
                var f = angular.element('.click-elements-overlay');
                var g = angular.element('.drawing-container');
                var h = angular.element('.cursor');

                $scope.getElement = function(a, c) {
                    return $scope.getNode(a, c);
                };
                $scope.getScrollableElement = function(a, c, d, e) {
                    return $scope.getScrollableNode(a, c, d, e);
                };
                $scope.getFrameOffset = function(a) {
                    return $scope.getFrameElementOffset(a);
                };
                $scope.updateLastTypingTime = function(a) {
                    return $scope.updateLastTyping(a);
                };
                $scope.focusElement = function(a) {
                    return $scope.focusNode(a);
                };
                $scope.api = {
                    setCursorPosition: function(a) {
                        a && h.css({ left: a.left, top: a.top });
                    },
                    registerClick: function(a, b) {
                        var c = clicksManager.registerClick(a, b);
                        c && f.append(c);
                    },
                    setScrollPosition: function(a, b) {
                        f.css({ top: -a, left: -b });
                        g.css({ top: -a, left: -b });
                    },
                    setRenderingProgress: function(a) {
                        if (a) {
                            var c = (a.current / a.total) * 100;
                            $scope.renderingProgressPercentage = Math.round(c);
                        }
                    },
                    showRenderingOverlay: function() {
                        $scope.shouldShowRenderingOverlay = true;
                    },
                    hideRenderingOverlay: function() {
                        $scope.shouldShowRenderingOverlay = false;
                    },
                    setPlayerSpeed: function(playerSpeed) {
                        clicksManager.setPlayerSpeed(playerSpeed);
                    },
                    setShouldVisualizeClicks: function(a) {
                        clicksManager.setShouldVisualizeClicks(a);
                    },
                    startClicksAnimation: function() {
                        clicksManager.startClicksAnimation();
                    },
                    stopClicksAnimation: function() {
                        clicksManager.stopClicksAnimation();
                    },
                    showVisibilityOverlay: function(visibilityState) {
                        $scope.visibilityState = visibilityState;
                        $scope.shouldShowVisibilityOverlay = true;
                    },
                    hideVisibilityOverlay: function() {
                        $scope.shouldShowVisibilityOverlay = false;
                    },
                    showBufferingOverlay: function() {
                        $scope.shouldShowBufferingOverlay = true;
                    },
                    hideBufferingOverlay: function() {
                        $scope.shouldShowBufferingOverlay = false;
                    },
                    enableDrawing: function(a) {
                        $scope.drawingApi.enableDrawing(a);
                    },
                    setToolIsActive: function(a, c) {
                        $scope.drawingApi.setToolIsActive(a, c);
                    },
                    setOverlayHeight: function(height) {
                        $scope.overlayHeight = height;
                    },
                    setOverlayWidth: function(width) {
                        $scope.overlayWidth = width;
                    },
                    showOfflineOverlay: function() {
                        $scope.shouldShowBufferingOverlay = false;
                        $scope.shouldShowOfflineOverlay = true;
                    },
                    hideOfflineOverlay: function() {
                        $scope.shouldShowOfflineOverlay = false;
                    },
                };
                $scope.$watch('drawingOverlayIsCreated', function(a) {
                    $scope.isCreated = a;
                });
            },
        };
    },
]);
