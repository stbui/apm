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
    function($timeout) {
        return {
            restrict: 'E',
            replace: !0,
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
            link: function($scope: IScope, $element, j) {
                function k(a?, c?) {
                    if (((A = a), c || $scope.isEnabled)) {
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
                    utils.forEach(a, function(a, d) {
                        $scope.activityTypeStatuses[a] = c;
                    });
                }
                function n(a?, time = 0) {
                    var d = w.outerHeight();

                    // void 0 === a && (a = y.outerHeight());
                    if (0 === a) {
                        a = y.outerHeight();
                    }

                    var height = $scope.containerHeight - d - a;

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

                    return (a.modalSize = b), (a.stepStyle = c), (a.searchLabel = d), (a.count = 1), a;
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
                function r(type, details) {
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
                    return (
                        utils.isArray(a) &&
                            utils.forEach(utils.reverse(a), function(a, c) {
                                if ((c > 0 && (b += ' '), a.id)) b += '#' + a.id;
                                else {
                                    if (!a.tagName)
                                        return void sessionstackManager.warn(
                                            'Element node does not have a tag name. Element index: ' + c
                                        );
                                    (b += a.tagName.toLowerCase()),
                                        a.classes && a.classes.length > 0 && (b += '.' + utils.join(a.classes, '.'));
                                }
                            }),
                        b
                    );
                }
                function u() {
                    $scope.hideFilters();
                    m(C, !0);
                }
                var v = $element
                        .find('.md-virtual-repeat-container')
                        .children()
                        .eq(0),
                    w = $element.find('.filter-sections'),
                    x = $element.find('.steps-section'),
                    y = $element.parent().find('user-identity-details');

                n();
                $scope.isEnabled = !0;
                $scope.isLoaded = !1;
                $scope.shouldShowMask = !0;
                $scope.transformedSteps = [];
                $scope.filteredSteps = [];
                $scope.activityTypeStatuses = {};
                $scope.EVENT_TYPE = EVENT_TYPE;
                $scope.expandedStepIndex = null;
                $scope.scrollbarConfig = {
                    autoHideScrollbar: !1,
                    theme: 'light',
                    advanced: { updateOnContentResize: !0 },
                    callbacks: {
                        onBeforeUpdate: function() {
                            $('.step.is-open').is(':nth-last-of-type(-n+4)') &&
                                $scope.updateScrollbar('scrollTo', 'bottom');
                        },
                    },
                    mouseWheel: { scrollAmount: 100 },
                    setHeight: 200,
                    scrollInertia: 0,
                };
                var z = (function(a, b) {
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
                        i[a.activityIndex] = !0;
                    }
                    function g(a) {
                        return Math.floor(utils.millisecondsToSeconds(a.time));
                    }
                    function h(a) {
                        if (a.isLog) {
                            var b = g(a),
                                c = j[b] || [];
                            return lodash.find(c, function(b) {
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
                        addNewStep: function(a) {
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

                $scope.updateStepsTimeline = function(a, b) {
                    k(a, b);
                };
                $scope.setLastPlayedActivity = function(a) {
                    k(a);
                };
                $scope.addNewSteps = function(a) {
                    utils.isArray(a) && lodash.forEach(a, z.addNewStep);
                };
                $scope.updateSelectedStep = function() {
                    $timeout(function() {
                        k(A);
                    }, 0);
                };
                $scope.selectStep = function(a) {
                    if (!($scope.selectedStep === a || a < 0 || a >= $scope.filteredSteps.length)) {
                        var c = $scope.filteredSteps[a];
                        $scope.onSelectedStep(c), ($scope.selectedStep = a), l();
                    }
                };
                $scope.selectNextStep = function() {
                    $scope.selectStep($scope.selectedStep + 1);
                };
                $scope.enable = function() {
                    $scope.isEnabled = !0;
                };
                $scope.disable = function() {
                    $scope.isEnabled = !1;
                };
                $scope.loaded = function() {
                    $scope.isLoaded = !0;
                };
                $scope.hasInactiveFilters = function() {
                    var a = !1;
                    return (
                        utils.forEach($scope.activityTypeStatuses, function(b, c) {
                            b || (a = !0);
                        }),
                        a
                    );
                };
                $scope.toggleFilter = function(a) {
                    $scope.activityTypeStatuses[a] = !$scope.activityTypeStatuses[a];
                    $scope.updateSelectedStep();
                };
                $scope.showFilters = function() {
                    m(B, !0);
                    $scope.updateSelectedStep();
                };
                $scope.hideFilters = function() {
                    m(B, !1);
                    $scope.updateSelectedStep();
                };
                $scope.$watch('containerHeight', function(a) {
                    a && n();
                });
                $scope.handleUserDetailsResize = function(a) {
                    n(a, USER_DETAILS_ANIMATION_TIME);
                };
                $scope.onStepExpand = function(a) {
                    $scope.expandedStepIndex === a ? ($scope.expandedStepIndex = null) : ($scope.expandedStepIndex = a);
                };
                $scope.hideMask = function() {
                    $scope.shouldShowMask = !1;
                };
                u();
                $scope.isCreated = !0;
            },
        };
    },
]);
