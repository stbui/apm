angular.module('playerApp').directive('stepsTimeline', [
    '$timeout',
    'player',
    'playerSettings',
    'utils',
    'sessionstackManager',
    'lodash',
    'EVENT_TYPE',
    'USER_DETAILS_ANIMATION_TIME',
    function (
        $timeout,
        player,
        playerSettings,
        utils,
        sessionstackManager,
        lodash,
        EVENT_TYPE,
        USER_DETAILS_ANIMATION_TIME
    ) {
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
            link: function (b, i, j) {
                function k(a?, c?) {
                    if (((A = a), c || b.isEnabled)) {
                        for (var d, e = 0; e < b.filteredSteps.length && b.filteredSteps[e].activityIndex < A; ) e++;
                        (d = b.selectedStep !== e), d && ((b.selectedStep = e), l());
                    }
                }
                function l() {
                    if (!v.is(':hover')) {
                        var a = i.find('.steps-section .step').outerHeight();
                        if (a) {
                            var c = b.selectedStep * a,
                                d = (v.height() - v.offset().top + w.height()) / 3;
                            v.stop().animate({ scrollTop: c - d }, 300);
                        }
                    }
                }
                function m(a, c: boolean) {
                    utils.forEach(a, function (a, d) {
                        b.activityTypeStatuses[a] = c;
                    });
                }
                function n(a?, time = 0) {
                    var d = w.outerHeight();

                    // void 0 === a && (a = y.outerHeight());
                    if (0 === a) {
                        a = y.outerHeight();
                    }

                    var height = b.containerHeight - d - a;

                    x.stop().animate({ height: height }, time);

                    l();

                    b.$broadcast('$md-resize');
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
                            return 'visible' === b.visibilityState
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
                            utils.forEach(utils.reverse(a), function (a, c) {
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
                    b.hideFilters();
                    m(C, !0);
                }
                var v = i.find('.md-virtual-repeat-container').children().eq(0),
                    w = i.find('.filter-sections'),
                    x = i.find('.steps-section'),
                    y = i.parent().find('user-identity-details');

                n();
                b.isEnabled = !0;
                b.isLoaded = !1;
                b.shouldShowMask = !0;
                b.transformedSteps = [];
                b.filteredSteps = [];
                b.activityTypeStatuses = {};
                b.EVENT_TYPE = EVENT_TYPE;
                b.expandedStepIndex = null;
                b.scrollbarConfig = {
                    autoHideScrollbar: !1,
                    theme: 'light',
                    advanced: { updateOnContentResize: !0 },
                    callbacks: {
                        onBeforeUpdate: function () {
                            $('.step.is-open').is(':nth-last-of-type(-n+4)') && b.updateScrollbar('scrollTo', 'bottom');
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
                        i[a.activityIndex] = !0;
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
                })(b.transformedSteps, p);

                var A = -1;
                var B = [
                    EVENT_TYPE.MOUSE_CLICK,
                    EVENT_TYPE.WINDOW_RESIZE,
                    EVENT_TYPE.DOM_SNAPSHOT,
                    EVENT_TYPE.VISIBILITY_CHANGE,
                    EVENT_TYPE.CONSOLE_ERROR,
                ];
                var C = playerSettings.getActivitiesFilterFromUrl();

                b.updateStepsTimeline = function (a, b) {
                    k(a, b);
                };
                b.setLastPlayedActivity = function (a) {
                    k(a);
                };
                b.addNewSteps = function (a) {
                    utils.isArray(a) && lodash.forEach(a, z.addNewStep);
                };
                b.updateSelectedStep = function () {
                    $timeout(function () {
                        k(A);
                    }, 0);
                };
                b.selectStep = function (a) {
                    if (!(b.selectedStep === a || a < 0 || a >= b.filteredSteps.length)) {
                        var c = b.filteredSteps[a];
                        b.onSelectedStep(c), (b.selectedStep = a), l();
                    }
                };
                b.selectNextStep = function () {
                    b.selectStep(b.selectedStep + 1);
                };
                b.enable = function () {
                    b.isEnabled = !0;
                };
                b.disable = function () {
                    b.isEnabled = !1;
                };
                b.loaded = function () {
                    b.isLoaded = !0;
                };
                b.hasInactiveFilters = function () {
                    var a = !1;
                    return (
                        utils.forEach(b.activityTypeStatuses, function (b, c) {
                            b || (a = !0);
                        }),
                        a
                    );
                };
                b.toggleFilter = function (a) {
                    b.activityTypeStatuses[a] = !b.activityTypeStatuses[a];
                    b.updateSelectedStep();
                };
                b.showFilters = function () {
                    m(B, !0);
                    b.updateSelectedStep();
                };
                b.hideFilters = function () {
                    m(B, !1);
                    b.updateSelectedStep();
                };
                b.$watch('containerHeight', function (a) {
                    a && n();
                });
                b.handleUserDetailsResize = function (a) {
                    n(a, USER_DETAILS_ANIMATION_TIME);
                };
                b.onStepExpand = function (a) {
                    b.expandedStepIndex === a ? (b.expandedStepIndex = null) : (b.expandedStepIndex = a);
                };
                b.hideMask = function () {
                    b.shouldShowMask = !1;
                };
                u();
                b.isCreated = !0;
            },
        };
    },
]);
