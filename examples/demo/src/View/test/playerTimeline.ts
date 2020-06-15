import { IActivity } from './Activity';
const MIN_ACTIVITY_BLOCK_WIDTH = 2;

interface IScope {
    value: number;
    selectedValue: number;
    valueSelectionInProgress: boolean;
    max: number;
    min: number;
    enable: boolean;
    disable: boolean;
    pauseActivity: any;
    isLive: boolean;
    isCreated: boolean;
    isTimelineSelectionInProgress: boolean;
    loadedTime: number;
    renderedTimePercentage: any;
    pauseActivityOffset: number;
    handleOffset: number;
    loadedTimePercentage: number;
    duration: number;
    activityBlocks: any[];
    time: number;
    draggedValue: any;
    [key: string]: any;
}

angular
    .module('playerApp')
    .constant('MIN_ACTIVITY_BLOCK_WIDTH', 2)
    .directive('playerTimeline', [
        'MIN_ACTIVITY_BLOCK_WIDTH',
        'PLAYER_CONFIG',
        'lodash',
        '$timeout',
        function (MIN_ACTIVITY_BLOCK_WIDTH, PLAYER_CONFIG, lodash, $timeout) {
            return {
                templateUrl: 'templates/timeline.html',
                replace: true,
                scope: {
                    value: '=',
                    selectedValue: '=',
                    valueSelectionInProgress: '=',
                    max: '=',
                    enable: '=',
                    disable: '=',
                    pauseActivity: '=',
                    isLive: '=',
                    refresh: '=',
                    isCreated: '=',
                },
                restrict: 'E',
                link: function ($scope: IScope, $element, d) {
                    function e() {
                        if (!$scope.isTimelineSelectionInProgress) {
                            var b = Math.min($scope.value, $scope.loadedTime);
                            $scope.renderedTimePercentage = $scope.timelineValueToPercentage(b);
                        }
                    }
                    function f() {
                        return $scope.max - $scope.min;
                    }
                    function g(b) {
                        var c = j.offset(),
                            d = Math.max(b.pageX - c.left, $scope.min + 1);
                        return i(d);
                    }
                    function h(activityBlocks) {
                        var b: any = [],
                            c = f() / j.width(),
                            d = { time: 0 },
                            e = 0;

                        activityBlocks.forEach(function (activityBlock) {
                            if (activityBlock.isFirstLiveActivity) {
                                var f: any = {
                                    unknown: true,
                                    time: d.time,
                                    duration: activityBlock.time - d.time,
                                };
                                b.push(f);
                            }

                            if (activityBlock.time >= e) {
                                b.push(activityBlock);
                                e = activityBlock.time + c;
                            }

                            d = activityBlock;
                        });

                        return b;
                    }
                    function i(b) {
                        var c = b / j.width();
                        return $scope.min + c * f();
                    }
                    var j = $element.find('.timeline-track'),
                        k = $element.find('.timeline-progress-handle'),
                        l = $element.find('.timeline-pause-activity-wrapper'),
                        m = ($element.find('.timeline-buffering-bar'), k.width(), false);

                    $scope.value = 0;
                    $scope.min = 0;
                    $scope.max = 0;
                    $scope.pauseActivityOffset = -1;
                    $scope.loadedTime = 0;
                    $scope.handleOffset = 0;
                    $scope.renderedTimePercentage = 0;
                    $scope.loadedTimePercentage = 0;

                    $scope.enable = function () {
                        m = true;
                        $scope.enableTimelineHandle();
                    };
                    $scope.disable = function () {
                        m = false;
                        $scope.disableTimelineHandle();
                    };
                    $scope.timelineValueToPercentage = function (value) {
                        return (value / f()) * 100;
                    };
                    $scope.$watch('value', function () {
                        var b = (k.width() / j.width()) * 100,
                            c = $scope.timelineValueToPercentage($scope.value);
                        $scope.handleOffset = c - b / 2;
                        e();
                    });
                    $scope.activityWidthInPercents = function (a) {
                        var duration = $scope.duration || 1;
                        return (duration / f()) * 100;
                    };
                    // sessionPlayer.refreshTimeline(a,b)
                    // 有activities的时候，将调用该方法
                    $scope.refresh = function (isFinish: boolean, activities: IActivity[]) {
                        var activityBlocks = $scope.activityBlocks || [];

                        activities.forEach(function (activity: IActivity) {
                            var times: any = { time: activity.time };
                            $scope.isFirstLiveActivity && (isFinish.isFirstLiveActivity = true);
                            activityBlocks.push(times);
                        });

                        $scope.activityBlocks = h(activityBlocks);

                        if (isFinish) {
                            $scope.loadedTime = $scope.max;
                        } else if (d.length > 0) {
                            var g = lodash.last(d);
                            $scope.max = Math.max($scope.max, g.time);
                            $scope.loadedTime = g.time;
                        }

                        // d 是data，IActivity[]

                        $scope.loadedTimePercentage = $scope.timelineValueToPercentage($scope.loadedTime);
                        e();
                        $scope.pauseActivity
                            ? (l.show(),
                              ($scope.pauseActivityOffset = $scope.timelineValueToPercentage(
                                  Math.max(0, $scope.pauseActivity.time)
                              )))
                            : l.hide();
                    };
                    k.on('dragstart', function (b) {
                        $scope.$apply(function () {
                            $scope.valueSelectionInProgress = true;
                            $scope.draggedValue = null;
                        });
                    });
                    k.on('drag', function (b) {
                        $scope.$apply(function () {
                            var c = j.offset(),
                                d = Math.max(b.pageX - c.left, $scope.min + 1);
                            $scope.draggedValue = i(d);
                        });
                    });
                    k.on('dragstop', function (b) {
                        $scope.$apply(function () {
                            $scope.valueSelectionInProgress = false;
                            $scope.draggedValue = null;
                            $scope.value = g(b);
                            $scope.selectedValue = $scope.value;
                        });
                    });
                    j.on('click', function (b) {
                        if (m) {
                            var c = angular.element(b.target),
                                d = c.hasClass('timeline-unknown-activity');
                            d ||
                                $scope.$apply(function () {
                                    $scope.value = g(b);
                                    $scope.selectedValue = $scope.value;
                                });
                        }
                    });
                    $scope.isCreated = true;
                },
            };
        },
    ]);
