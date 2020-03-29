angular.module('playerApp').directive('stepsTimeline', [
    '$timeout',
    'player',
    'playerSettings',
    'utils',
    'sessionstackManager',
    'EVENT_TYPE',
    'LOG_LEVEL',
    'USER_DETAILS_ANIMATION_TIME',
    function(a, b, c, d, e, f, g, h) {
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
                selectedLogId: '=',
                isCreated: '=',
                handleUserDetailsResize: '=',
                hideMask: '=',
            },
            link: function(i, j, k) {
                function l(a, b) {
                    return d.isDifferentActivity(a, b, m);
                }
                function m(a) {
                    return Math.floor(d.millisecondsToSeconds(a));
                }
                function n(a) {
                    if (((C = a), i.isEnabled)) {
                        for (var b, c = 0; c < i.filteredSteps.length && i.filteredSteps[c].activityIndex <= C; ) c++;
                        (b = i.selectedStep !== c), b && ((i.selectedStep = c), o());
                    }
                }
                function o() {
                    if (!y.is(':hover')) {
                        var a = j.find('.steps-section .step').outerHeight();
                        if (a) {
                            var b = i.selectedStep * a,
                                c = (y.height() - y.offset().top + z.height()) / 3;
                            y.stop().animate({ scrollTop: b - c }, 300);
                        }
                    }
                }
                function p(a, b) {
                    d.forEach(a, function(a, c) {
                        i.activityTypeStatuses[a] = b;
                    });
                }
                function q(a, b) {
                    b = b || 0;
                    var c = z.outerHeight();
                    void 0 === a && (a = B.outerHeight());
                    var d = i.containerHeight - c - a;
                    A.stop().animate({ height: d }, b), o(), i.$broadcast('$md-resize');
                }
                function r(a) {
                    switch (a) {
                        case f.MOUSE_CLICK:
                        case f.WINDOW_RESIZE:
                        case f.VISIBILITY_CHANGE:
                            return 'sm';
                        default:
                            return 'lg';
                    }
                }
                function s(a) {
                    var b = r(a.type),
                        c = t(a.type, a.details, a.isLog);
                    c.summary = u(a.type, a.details);
                    var d = c.title + ' ' + (c.summary || '');
                    return (a.modalSize = b), (a.stepStyle = c), (a.searchLabel = d), (a.count = 1), a;
                }
                function t(a, b, c) {
                    switch (a) {
                        case f.MOUSE_CLICK:
                            return v('Click', 'ion-mouse', 'black', c);
                        case f.DOM_SNAPSHOT:
                            return v('Visit', 'ion-navigate', 'black', c);
                        case f.WINDOW_RESIZE:
                            return v('Resize', 'ion-arrow-expand', 'black', c);
                        case g.INFO:
                            return v('Info', 'ion-information-circled', '#2a6ce7', c);
                        case g.ERROR:
                            return v('Error', 'ion-android-alert', '#ff0944', c);
                        case g.WARN:
                            return v('Warn', 'ion-alert-circled', '#f0ad4e', c);
                        case g.DEBUG:
                            return v('Debug', 'ion-bug', '#2a6ce7', c);
                        case f.VISIBILITY_CHANGE:
                            return 'visible' === b.visibilityState
                                ? v('Tab displayed', 'ion-ios-albums', 'black', c)
                                : v('Tab hidden', 'ion-ios-albums-outline', 'black', c);
                    }
                }
                function u(a, b) {
                    switch (a) {
                        case f.MOUSE_CLICK:
                            return w(b.selector);
                        case f.WINDOW_RESIZE:
                            return b.width + ' x ' + b.height;
                        case f.DOM_SNAPSHOT:
                            return b.pageUrl;
                        case g.INFO:
                        case g.ERROR:
                        case g.WARN:
                        case g.DEBUG:
                            return b.message;
                        case f.VISIBILITY_CHANGE:
                            return '';
                    }
                }
                function v(a, b, c, d) {
                    return { title: a, showTitle: !d, icon: b, color: c };
                }
                function w(a) {
                    var b = '';
                    return (
                        d.isArray(a) &&
                            d.forEach(d.reverse(a), function(a, c) {
                                if ((c > 0 && (b += ' '), a.id)) b += '#' + a.id;
                                else {
                                    if (!a.tagName)
                                        return void e.warn(
                                            'Element node does not have a tag name. Element index: ' + c
                                        );
                                    (b += a.tagName.toLowerCase()),
                                        a.classes && a.classes.length > 0 && (b += '.' + d.join(a.classes, '.'));
                                }
                            }),
                        b
                    );
                }
                function x() {
                    i.hideFilters(), p(E, !0);
                }
                var y = j
                        .find('.md-virtual-repeat-container')
                        .children()
                        .eq(0),
                    z = j.find('.filter-sections'),
                    A = j.find('.steps-section'),
                    B = j.parent().find('user-identity-details');
                q(),
                    (i.isEnabled = !0),
                    (i.shouldShowMask = !0),
                    (i.isBuffering = !0),
                    (i.transformedSteps = []),
                    (i.filteredSteps = []),
                    (i.activityTypeStatuses = {}),
                    (i.LOG_LEVEL = g),
                    (i.EVENT_TYPE = f),
                    (i.expandedStepIndex = null),
                    (i.scrollbarConfig = {
                        autoHideScrollbar: !1,
                        theme: 'light',
                        advanced: { updateOnContentResize: !0 },
                        callbacks: {
                            onBeforeUpdate: function() {
                                $('.step.is-open').is(':nth-last-of-type(-n+4)') &&
                                    i.updateScrollbar('scrollTo', 'bottom');
                            },
                        },
                        mouseWheel: { scrollAmount: 100 },
                        setHeight: 200,
                        scrollInertia: 0,
                    });
                var C = -1,
                    D = [f.MOUSE_CLICK, f.WINDOW_RESIZE, f.DOM_SNAPSHOT, f.VISIBILITY_CHANGE, g.ERROR],
                    E = c.getActivitiesFilterFromUrl();
                (i.updateStepsTimeline = function(a) {
                    n(a);
                }),
                    (i.setLastPlayedActivity = function(a) {
                        n(a);
                    }),
                    (i.addNewSteps = function(a) {
                        if (d.isArray(a)) {
                            var b;
                            a.forEach(function(a) {
                                if (a)
                                    if (
                                        (i.transformedSteps.length > 0 &&
                                            (b = i.transformedSteps[i.transformedSteps.length - 1]),
                                        a.isLog && !l(a, b))
                                    ) {
                                        var c = i.transformedSteps[i.transformedSteps.length - 1];
                                        (c.activityIndex = a.activityIndex), c.count++;
                                    } else {
                                        var d = s(a);
                                        i.transformedSteps.push(d);
                                    }
                            });
                        }
                    }),
                    (i.updateSelectedStep = function() {
                        a(function() {
                            n(C);
                        }, 0);
                    }),
                    (i.selectStep = function(a) {
                        if (!(i.selectedStep === a || a < 0 || a >= i.filteredSteps.length)) {
                            var b = i.filteredSteps[a];
                            angular.isFunction(i.onSelectedStep) && i.onSelectedStep(b.activityIndex),
                                (i.selectedStep = a),
                                o();
                        }
                    }),
                    (i.selectNextStep = function() {
                        i.selectStep(i.selectedStep + 1);
                    }),
                    (i.enable = function() {
                        i.isEnabled = !0;
                    }),
                    (i.disable = function() {
                        i.isEnabled = !1;
                    }),
                    b.onHideStepsBuffering(i, function() {
                        i.isBuffering = !1;
                    }),
                    (i.hasInactiveFilters = function() {
                        var a = !1;
                        return (
                            d.forEach(i.activityTypeStatuses, function(b, c) {
                                b || (a = !0);
                            }),
                            a
                        );
                    }),
                    (i.toggleFilter = function(a) {
                        (i.activityTypeStatuses[a] = !i.activityTypeStatuses[a]), i.updateSelectedStep();
                    }),
                    (i.showFilters = function() {
                        p(D, !0), i.updateSelectedStep();
                    }),
                    (i.hideFilters = function() {
                        p(D, !1), i.updateSelectedStep();
                    }),
                    i.$watch('containerHeight', function(a) {
                        a && q();
                    }),
                    (i.handleUserDetailsResize = function(a) {
                        q(a, h);
                    }),
                    (i.onStepExpand = function(a) {
                        i.expandedStepIndex === a ? (i.expandedStepIndex = null) : (i.expandedStepIndex = a);
                    }),
                    (i.hideMask = function() {
                        i.shouldShowMask = !1;
                    }),
                    x(),
                    (i.isCreated = !0);
            },
        };
    },
]);
