angular.module('playerApp').directive('stepsTimeline', [
    '$timeout',
    'player',
    'playerSettings',
    'utils',
    'sessionstackManager',
    'lodash',
    'EVENT_TYPE',
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
                isCreated: '=',
                handleUserDetailsResize: '=',
                hideMask: '=',
                loaded: '=',
            },
            link: function(b, i, j) {
                function k(a, c) {
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
                function m(a, c) {
                    d.forEach(a, function(a, d) {
                        b.activityTypeStatuses[a] = c;
                    });
                }
                function n(a, c) {
                    c = c || 0;
                    var d = w.outerHeight();
                    void 0 === a && (a = y.outerHeight());
                    var e = b.containerHeight - d - a;
                    x.stop().animate({ height: e }, c), l(), b.$broadcast('$md-resize');
                }
                function o(a) {
                    switch (a) {
                        case g.MOUSE_CLICK:
                        case g.WINDOW_RESIZE:
                        case g.VISIBILITY_CHANGE:
                            return 'sm';
                        default:
                            return 'lg';
                    }
                }
                function p(a) {
                    var b = o(a.type),
                        c = q(a.type, a.details, a.isLog);
                    c.summary = r(a.type, a.details);
                    var d = c.title + ' ' + (c.summary || '');
                    return (a.modalSize = b), (a.stepStyle = c), (a.searchLabel = d), (a.count = 1), a;
                }
                function q(a, b, c) {
                    switch (a) {
                        case g.MOUSE_CLICK:
                            return s('Click', 'ion-mouse', 'black', c);
                        case g.DOM_SNAPSHOT:
                            return s('Visit', 'ion-navigate', 'black', c);
                        case g.WINDOW_RESIZE:
                            return s('Resize', 'ion-arrow-expand', 'black', c);
                        case g.CONSOLE_LOG:
                            return s('Info', 'ion-information-circled', '#2a6ce7', c);
                        case g.CONSOLE_ERROR:
                            return s('Error', 'ion-android-alert', '#ff0944', c);
                        case g.CONSOLE_WARN:
                            return s('Warn', 'ion-alert-circled', '#f0ad4e', c);
                        case g.CONSOLE_DEBUG:
                            return s('Debug', 'ion-bug', '#2a6ce7', c);
                        case g.VISIBILITY_CHANGE:
                            return 'visible' === b.visibilityState
                                ? s('Tab displayed', 'ion-ios-albums', 'black', c)
                                : s('Tab hidden', 'ion-ios-albums-outline', 'black', c);
                    }
                }
                function r(a, b) {
                    switch (a) {
                        case g.MOUSE_CLICK:
                            return t(b.selector);
                        case g.WINDOW_RESIZE:
                            return b.width + ' x ' + b.height;
                        case g.DOM_SNAPSHOT:
                            return b.pageUrl;
                        case g.CONSOLE_LOG:
                            return b.message;
                        case g.CONSOLE_ERROR:
                            return b.message;
                        case g.CONSOLE_WARN:
                            return b.message;
                        case g.CONSOLE_DEBUG:
                            return b.message;
                        case g.VISIBILITY_CHANGE:
                            return '';
                    }
                }
                function s(a, b, c, d) {
                    return { title: a, showTitle: !d, icon: b, color: c };
                }
                function t(a) {
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
                function u() {
                    b.hideFilters(), m(C, !0);
                }
                var v = i
                        .find('.md-virtual-repeat-container')
                        .children()
                        .eq(0),
                    w = i.find('.filter-sections'),
                    x = i.find('.steps-section'),
                    y = i.parent().find('user-identity-details');
                n(),
                    (b.isEnabled = !0),
                    (b.isLoaded = !1),
                    (b.shouldShowMask = !0),
                    (b.transformedSteps = []),
                    (b.filteredSteps = []),
                    (b.activityTypeStatuses = {}),
                    (b.EVENT_TYPE = g),
                    (b.expandedStepIndex = null),
                    (b.scrollbarConfig = {
                        autoHideScrollbar: !1,
                        theme: 'light',
                        advanced: { updateOnContentResize: !0 },
                        callbacks: {
                            onBeforeUpdate: function() {
                                $('.step.is-open').is(':nth-last-of-type(-n+4)') &&
                                    b.updateScrollbar('scrollTo', 'bottom');
                            },
                        },
                        mouseWheel: { scrollAmount: 100 },
                        setHeight: 200,
                        scrollInertia: 0,
                    });
                var z = (function(a, b) {
                        function c(a) {
                            return !i[a.activityIndex];
                        }
                        function e(a) {
                            if (a.isLog) {
                                var b = g(a),
                                    c = j[b] || [];
                                c.push(a), (j[b] = c);
                            }
                            i[a.activityIndex] = !0;
                        }
                        function g(a) {
                            return Math.floor(d.millisecondsToSeconds(a.time));
                        }
                        function h(a) {
                            if (a.isLog) {
                                var b = g(a),
                                    c = j[b] || [];
                                return f.find(c, function(b) {
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
                    })(b.transformedSteps, p),
                    A = -1,
                    B = [g.MOUSE_CLICK, g.WINDOW_RESIZE, g.DOM_SNAPSHOT, g.VISIBILITY_CHANGE, g.CONSOLE_ERROR],
                    C = c.getActivitiesFilterFromUrl();
                (b.updateStepsTimeline = function(a, b) {
                    k(a, b);
                }),
                    (b.setLastPlayedActivity = function(a) {
                        k(a);
                    }),
                    (b.addNewSteps = function(a) {
                        d.isArray(a) && f.forEach(a, z.addNewStep);
                    }),
                    (b.updateSelectedStep = function() {
                        a(function() {
                            k(A);
                        }, 0);
                    }),
                    (b.selectStep = function(a) {
                        if (!(b.selectedStep === a || a < 0 || a >= b.filteredSteps.length)) {
                            var c = b.filteredSteps[a];
                            b.onSelectedStep(c), (b.selectedStep = a), l();
                        }
                    }),
                    (b.selectNextStep = function() {
                        b.selectStep(b.selectedStep + 1);
                    }),
                    (b.enable = function() {
                        b.isEnabled = !0;
                    }),
                    (b.disable = function() {
                        b.isEnabled = !1;
                    }),
                    (b.loaded = function() {
                        b.isLoaded = !0;
                    }),
                    (b.hasInactiveFilters = function() {
                        var a = !1;
                        return (
                            d.forEach(b.activityTypeStatuses, function(b, c) {
                                b || (a = !0);
                            }),
                            a
                        );
                    }),
                    (b.toggleFilter = function(a) {
                        (b.activityTypeStatuses[a] = !b.activityTypeStatuses[a]), b.updateSelectedStep();
                    }),
                    (b.showFilters = function() {
                        m(B, !0), b.updateSelectedStep();
                    }),
                    (b.hideFilters = function() {
                        m(B, !1), b.updateSelectedStep();
                    }),
                    b.$watch('containerHeight', function(a) {
                        a && n();
                    }),
                    (b.handleUserDetailsResize = function(a) {
                        n(a, h);
                    }),
                    (b.onStepExpand = function(a) {
                        b.expandedStepIndex === a ? (b.expandedStepIndex = null) : (b.expandedStepIndex = a);
                    }),
                    (b.hideMask = function() {
                        b.shouldShowMask = !1;
                    }),
                    u(),
                    (b.isCreated = !0);
            },
        };
    },
]);
