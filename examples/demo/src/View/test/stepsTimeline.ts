import lodash from 'lodash';
import { utils, sessionstackManager } from './common';
import { EVENT_TYPE, USER_DETAILS_ANIMATION_TIME } from './constant';
import { playerSettings } from './playerSettings';

interface IScope {
    addNewSteps: any;
    updateStepsTimeline: any;
    onSelectedStep: boolean;
    selectNextStep: any;

    isCreated: boolean;
    handleUserDetailsResize: boolean;
    hideMask: boolean;
    loaded: boolean;
    [key: string]: any;
}

angular.module('playerApp').directive('stepsTimeline', [
    '$timeout',
    'player',
    'playerSettings',
    'utils',
    'sessionstackManager',
    'lodash',
    'EVENT_TYPE',
    'USER_DETAILS_ANIMATION_TIME',
    function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/stepsTimeline.html',
            scope: {
                addNewSteps: '=',
                updateStepsTimeline: '=',
                onSelectedStep: '=',
                selectNextStep: '=',
                disable: '=',
                enable: '=',
                isCreated: '=',
                handleUserDetailsResize: '=',
                hideMask: '=',
                loaded: '=',
            },
            link: function ($scope: IScope, $element, j) {
                function k(playerIndex?, c?) {
                    if (((A = playerIndex), c || $scope.isEnabled)) {
                        for (
                            var d, e = 0;
                            e < $scope.filteredSteps.length && $scope.filteredSteps[e].activityIndex < A;

                        )
                            e++;
                        (d = $scope.selectedStep !== e), d && (($scope.selectedStep = e), l());
                    }
                }
                function l() {
                    if (!v.is(':hover')) {
                        var a = $element.find('.steps-section .step').outerHeight();
                        if (a) {
                            var c = $scope.selectedStep * a,
                                d = (v.height() - v.offset().top + w.height()) / 3;
                            v.stop().animate({ scrollTop: c - d }, 300);
                        }
                    }
                }
                function m(a, c: boolean) {
                    utils.forEach(a, function (a, d) {
                        $scope.activityTypeStatuses[a] = c;
                    });
                }
                function n(outerHeight?, time = 0) {
                    var d = w.outerHeight();

                    // void 0 === a && (a = y.outerHeight());
                    if (0 === outerHeight) {
                        outerHeight = y.outerHeight();
                    }

                    var height = $scope.containerHeight - d - outerHeight;

                    x.stop().animate({ height: height }, time);

                    l();

                    $scope.$broadcast('$md-resize');
                }
                function o(type) {
                    switch (type) {
                        case EVENT_TYPE.MOUSE_CLICK:
                        case EVENT_TYPE.WINDOW_RESIZE:
                        case EVENT_TYPE.VISIBILITY_CHANGE:
                            return 'sm';
                        default:
                            return 'lg';
                    }
                }
                function p(a) {
                    var b = o(a.type),
                        c: any = q(a.type, a.details, a.isLog);
                    c.summary = r(a.type, a.details);

                    var d = c.title + ' ' + (c.summary || '');

                    a.modalSize = b;
                    a.stepStyle = c;
                    a.searchLabel = d;
                    a.count = 1;

                    return a;
                }
                function q(type, details, isLog) {
                    switch (type) {
                        case EVENT_TYPE.MOUSE_CLICK:
                            return s('Click', 'ion-mouse', 'black', isLog);
                        case EVENT_TYPE.DOM_SNAPSHOT:
                            return s('Visit', 'ion-navigate', 'black', isLog);
                        case EVENT_TYPE.WINDOW_RESIZE:
                            return s('Resize', 'ion-arrow-expand', 'black', isLog);
                        case EVENT_TYPE.CONSOLE_LOG:
                            return s('Info', 'ion-information-circled', '#2a6ce7', isLog);
                        case EVENT_TYPE.CONSOLE_ERROR:
                            return s('Error', 'ion-android-alert', '#ff0944', isLog);
                        case EVENT_TYPE.CONSOLE_WARN:
                            return s('Warn', 'ion-alert-circled', '#f0ad4e', isLog);
                        case EVENT_TYPE.CONSOLE_DEBUG:
                            return s('Debug', 'ion-bug', '#2a6ce7', isLog);
                        case EVENT_TYPE.VISIBILITY_CHANGE:
                            return 'visible' === $scope.visibilityState
                                ? s('Tab displayed', 'ion-ios-albums', 'black', isLog)
                                : s('Tab hidden', 'ion-ios-albums-outline', 'black', isLog);
                    }
                }
                function r(
                    type,
                    details: {
                        absoluteLeft: 83;
                        absoluteTop: 283;
                        left: 83;
                        top: 283;
                        selector: any | object;
                    }
                ) {
                    switch (type) {
                        case EVENT_TYPE.MOUSE_CLICK:
                            return t(details.selector);
                        case EVENT_TYPE.WINDOW_RESIZE:
                            return details.width + ' x ' + details.height;
                        case EVENT_TYPE.DOM_SNAPSHOT:
                            return details.pageUrl;
                        case EVENT_TYPE.CONSOLE_LOG:
                            return details.message;
                        case EVENT_TYPE.CONSOLE_ERROR:
                            return details.message;
                        case EVENT_TYPE.CONSOLE_WARN:
                            return details.message;
                        case EVENT_TYPE.CONSOLE_DEBUG:
                            return details.message;
                        case EVENT_TYPE.VISIBILITY_CHANGE:
                            return '';
                    }
                }
                function s(title: string, icon: string, color: string, showTitle: boolean) {
                    return { title: title, showTitle: !showTitle, icon: icon, color: color };
                }
                function t(a) {
                    var b = '';

                    if (utils.isArray(a)) {
                        utils.forEach(utils.reverse(a), function (a, c) {
                            if ((c > 0 && (b += ' '), a.id)) {
                                b += '#' + a.id;
                            } else {
                                if (!a.tagName) {
                                    // sessionstackManager.warn(
                                    //     'Element node does not have a tag name. Element index: ' + c
                                    // );
                                    return;
                                }

                                b += a.tagName.toLowerCase();
                                a.classes && a.classes.length > 0 && (b += '.' + utils.join(a.classes, '.'));
                            }
                        });
                    }

                    return b;
                }
                function u() {
                    $scope.hideFilters();
                    m(C, true);
                }
                var v = $element.find('.md-virtual-repeat-container').children().eq(0),
                    w = $element.find('.filter-sections'),
                    x = $element.find('.steps-section'),
                    y = $element.parent().find('user-identity-details');

                n();
                $scope.isEnabled = true;
                $scope.isLoaded = false;
                $scope.shouldShowMask = true;
                $scope.transformedSteps = [];
                $scope.filteredSteps = [];
                $scope.activityTypeStatuses = {};
                $scope.EVENT_TYPE = EVENT_TYPE;
                $scope.expandedStepIndex = null;
                $scope.scrollbarConfig = {
                    autoHideScrollbar: false,
                    theme: 'light',
                    advanced: { updateOnContentResize: true },
                    callbacks: {
                        onBeforeUpdate: function () {
                            $('.step.is-open').is(':nth-last-of-type(-n+4)') &&
                                $scope.updateScrollbar('scrollTo', 'bottom');
                        },
                    },
                    mouseWheel: { scrollAmount: 100 },
                    setHeight: 200,
                    scrollInertia: 0,
                };
                var z = (function (a, b) {
                    function c(a) {
                        return !i[a.activityIndex];
                    }
                    function e(a) {
                        if (a.isLog) {
                            var b = g(a),
                                c = j[b] || [];
                            c.push(a);
                            j[b] = c;
                        }
                        i[a.activityIndex] = true;
                    }
                    function g(a) {
                        return Math.floor(utils.millisecondsToSeconds(a.time));
                    }
                    function h(a) {
                        if (a.isLog) {
                            var b = g(a),
                                c = j[b] || [];

                            return lodash.find(c, function (b) {
                                return (
                                    b.details.message === a.details.message &&
                                    b.details.level === a.details.level &&
                                    b.details.stackFrames === a.details.stackFrames
                                );
                            });
                        }
                    }
                    var i = {},
                        j = {},
                        k = a;
                    return {
                        addNewStep: function (a) {
                            if (a && c(a)) {
                                var d = h(a);
                                if (d) (d.activityIndex = a.activityIndex), d.count++;
                                else {
                                    var f = b(a);
                                    k.push(f);
                                }
                                e(a);
                            }
                        },
                    };
                })($scope.transformedSteps, p);

                var A = -1;
                var B = [
                    EVENT_TYPE.MOUSE_CLICK,
                    EVENT_TYPE.WINDOW_RESIZE,
                    EVENT_TYPE.DOM_SNAPSHOT,
                    EVENT_TYPE.VISIBILITY_CHANGE,
                    EVENT_TYPE.CONSOLE_ERROR,
                ];
                var C = playerSettings.getActivitiesFilterFromUrl();

                $scope.updateStepsTimeline = function (playerIndex, b?) {
                    k(playerIndex, b);
                };
                $scope.setLastPlayedActivity = function (a) {
                    k(a);
                };
                $scope.addNewSteps = function (
                    a: {
                        time: any;
                        activityIndex: any;
                        playerIndex: any;
                        type: any;
                        isLog: any;
                        details: any;
                    }[]
                ) {
                    utils.isArray(a) && lodash.forEach(a, z.addNewStep);
                };
                $scope.updateSelectedStep = function () {
                    $timeout(function () {
                        k(A);
                    }, 0);
                };
                $scope.selectStep = function (selectedStep) {
                    if (
                        !(
                            $scope.selectedStep === selectedStep ||
                            selectedStep < 0 ||
                            selectedStep >= $scope.filteredSteps.length
                        )
                    ) {
                        var c = $scope.filteredSteps[selectedStep];
                        $scope.onSelectedStep(c);
                        $scope.selectedStep = selectedStep;
                        l();
                    }
                };
                $scope.selectNextStep = function () {
                    $scope.selectStep($scope.selectedStep + 1);
                };
                $scope.enable = function () {
                    $scope.isEnabled = true;
                };
                $scope.disable = function () {
                    $scope.isEnabled = false;
                };
                $scope.loaded = function () {
                    $scope.isLoaded = true;
                };
                $scope.hasInactiveFilters = function () {
                    var a = false;

                    utils.forEach($scope.activityTypeStatuses, function (b, c) {
                        b || (a = true);
                    });

                    return a;
                };
                $scope.toggleFilter = function (a) {
                    $scope.activityTypeStatuses[a] = !$scope.activityTypeStatuses[a];
                    $scope.updateSelectedStep();
                };
                $scope.showFilters = function () {
                    m(B, true);
                    $scope.updateSelectedStep();
                };
                $scope.hideFilters = function () {
                    m(B, false);
                    $scope.updateSelectedStep();
                };
                $scope.$watch('containerHeight', function (a) {
                    a && n();
                });
                $scope.handleUserDetailsResize = function (outerHeight) {
                    n(outerHeight, USER_DETAILS_ANIMATION_TIME);
                };
                $scope.onStepExpand = function (a) {
                    $scope.expandedStepIndex === a ? ($scope.expandedStepIndex = null) : ($scope.expandedStepIndex = a);
                };
                $scope.hideMask = function () {
                    $scope.shouldShowMask = false;
                };
                u();
                $scope.isCreated = true;
            },
        };
    },
]);
