angular
    .module('playerApp')
    .constant('STYLESHEETS_SELECTOR', 'style, link[rel="stylesheet"]')
    .directive('sessionViewer', [
        '$timeout',
        '$interval',
        'player',
        'utils',
        'sessionstackManager',
        'DocumentNode',
        'AsyncWhile',
        'VIEWER_MARGINS',
        'SCROLL_POSITION_CHANGE',
        'EVENT_TYPE',
        'SESSIONSTACK_HOVER_CLASS',
        'STYLESHEETS_SELECTOR',
        'PROCESS_HOVER_STYLES_CONFIG',
        'ELEMENTS',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
            return {
                restrict: 'E',
                templateUrl: 'templates/viewer.html',
                replace: !0,
                scope: {
                    sessionScreenWidth: '=',
                    sessionScreenHeight: '=',
                    maxWidth: '=',
                    maxHeight: '=',
                    isCreated: '=',
                    renderingProgress: '=',
                    initialVisibilityState: '=',
                    showLoadingAnimation: '=',
                    sessionId: '=',
                    handleConsoleResize: '=',
                },
                link: function(b, l, m) {
                    function o(a, b) {
                        fa[a] = b;
                    }
                    function p(a) {
                        return fa[a];
                    }
                    function q(a, c, d, e) {
                        var f = a - 2 * h.HORIZONTAL,
                            g = c - 2 * h.VERTICAL,
                            i = 1,
                            j = 1;
                        0 !== d && (i = d < f ? 1 : f / d),
                            0 !== e && (j = e < g ? 1 : g / e),
                            (b.scale = Math.min(i, j));
                        var k = d * b.scale,
                            l = e * b.scale;
                        f > k ? (b.marginLeft = (a - k) / 2) : (b.marginLeft = h.HORIZONTAL),
                            g > l ? (b.marginTop = (c - l) / 2) : (b.marginTop = h.VERTICAL),
                            ca.css({ width: d, height: e });
                    }
                    function r() {
                        aa && aa.cancel(), da.detach();
                    }
                    function s(a, b) {
                        da.attach(function() {
                            t(), u(), V(), angular.isFunction(b) && b();
                        });
                    }
                    function t() {
                        x({ top: ja.top, left: ja.left }),
                            angular.forEach(ia, function(a, b) {
                                var c = p(b);
                                c(a);
                            }),
                            angular.forEach(Object.keys(ka), function(a) {
                                x(ka[a]);
                            });
                    }
                    function u() {
                        da.traverseDocuments(ea, y);
                    }
                    function v(b) {
                        var c = ha[b.id],
                            d = angular.element(z(b.id));
                        c && (c.cancel(), delete ha[b.id]);
                        var e = function() {
                                return d.scrollLeft() !== b.left || d.scrollTop() !== b.top;
                            },
                            f = function() {
                                a(function() {
                                    d.scrollTop(b.top), d.scrollLeft(b.left);
                                });
                            },
                            h = {
                                maxIterations: i.MAX_RETRIES,
                                waitTime: i.TIMEOUT,
                            };
                        (ha[b.id] = new g(e, f, h)), ha[b.id].start();
                    }
                    function w(b) {
                        var c = ga[b.id],
                            d = angular.element(da.getNode(b.id));
                        if (d && !d.is(n.HTML)) {
                            c && (c.cancel(), delete ga[b.id]);
                            var e = function() {
                                    return d.scrollTop() !== b.top || d.scrollLeft() !== b.left;
                                },
                                f = function() {
                                    a(function() {
                                        d.scrollTop(b.top), d.scrollLeft(b.left);
                                    });
                                },
                                h = {
                                    maxIterations: i.MAX_RETRIES,
                                    waitTime: i.TIMEOUT,
                                };
                            (ga[b.id] = new g(e, f, h)), ga[b.id].start();
                        }
                    }
                    function x(a) {
                        var b = p(j.SCROLL_POSITION_CHANGE);
                        b(a);
                    }
                    function y(a) {
                        da.traverseNode(a, function(a) {
                            var b = da.getNodePropertyObject(a);
                            if (b.top || b.left) {
                                var c = {
                                    id: b.nodeId,
                                    top: b.top,
                                    left: b.left,
                                };
                                ka[c.id] || x(c);
                            }
                        });
                    }
                    function z(a) {
                        var b = A(a);
                        return (b && b.contentWindow) || (b = A()), b.contentWindow;
                    }
                    function A(a) {
                        return angular.isDefined(a) ? da.getNode(a) : ba[0];
                    }
                    function B(a, c, d) {
                        var e = {
                            id: d,
                            top: a,
                            left: c,
                            windowScroll: !0,
                        };
                        da.isAttached &&
                            (v(e),
                            angular.isUndefined(d) && b.viewerOverlay && b.viewerOverlay.setScrollPosition(a, c)),
                            angular.isUndefined(d) ? (ja = { top: a || 0, left: c || 0 }) : (ka[d] = e);
                    }
                    function C(a, c) {
                        c &&
                            ((ia = {}),
                            (ka = {}),
                            (ja = { top: 0, left: 0 }),
                            E(b.initialVisibilityState),
                            G(c),
                            (b.sessionScreenWidth = $),
                            (b.sessionScreenHeight = _));
                    }
                    function D(a, b) {
                        var c = b.type,
                            d = b.data,
                            e = p(c);
                        e && d && e(d);
                    }
                    function E(a) {
                        b.viewerOverlay &&
                            ('prerender' === a || 'hidden' === a
                                ? b.viewerOverlay.showVisibilityOverlay(a)
                                : b.viewerOverlay.hideVisibilityOverlay(),
                            (b.visibilityState = a));
                    }
                    function F(a) {
                        d.isDefined(a.visibilityState) &&
                            b.visibilityState !== a.visibilityState &&
                            E(a.visibilityState),
                            G(a);
                    }
                    function G(a) {
                        da && (da.write(a, b.sessionId), B(a.top, a.left, a.frameElementId));
                    }
                    function H(a) {
                        var b = angular.element(da.getNode(a.id));
                        b.val(a.value);
                    }
                    function I(a) {
                        if (da.isAttached && b.viewerOverlay) {
                            var c = M(a.frameElementId),
                                d = a.y + c.top,
                                e = a.x + c.left;
                            b.viewerOverlay.setCursorPosition({
                                top: d,
                                left: e,
                            });
                        } else ia[j.MOUSE_MOVE] = a;
                    }
                    function J(a) {
                        if ((I(a), da.isAttached && b.viewerOverlay)) {
                            var c = M(a.frameElementId),
                                d = ja.top + a.y + c.top,
                                e = ja.left + a.x + c.left;
                            b.viewerOverlay.registerClick(d, e);
                        }
                    }
                    function K(a) {
                        var b = angular.element(da.getNode(a.id));
                        b && (b.addClass(k), b.parents().addClass(k));
                    }
                    function L(a) {
                        var b = angular.element(da.getNode(a.id));
                        b && (b.removeClass(k), b.parents().removeClass(k));
                    }
                    function M(a) {
                        var b;
                        return angular.isDefined(a) && (b = da.getNode(a)), da.getNodeOffset(b);
                    }
                    function N(a) {
                        a.id ? (ka[a.id] = a) : (ja = { top: a.top || 0, left: a.left || 0 }),
                            da.isAttached &&
                                (a.id ? (a.windowScroll ? B(a.top, a.left, a.id) : w(a)) : B(a.top, a.left));
                    }
                    function O(a) {
                        da.isAttached
                            ? ((b.sessionScreenWidth = a.width),
                              (b.sessionScreenHeight = a.height),
                              b.viewerOverlay && b.viewerOverlay.setScrollPosition(ja.top, ja.left))
                            : (ia[j.WINDOW_RESIZE] = a);
                    }
                    function P(a) {
                        var b = angular.element(da.getNode(a.id));
                        b.prop('checked', a.state);
                    }
                    function Q(a) {
                        var b = angular.element(da.getNode(a.id));
                        b.prop('checked', a.state);
                    }
                    function R(a) {
                        W(a.addedOrMoved), X(a.removed), Z(a.characterData), Y(a.attributes);
                    }
                    function S(a) {
                        E(a.visibilityState);
                    }
                    function T(a) {
                        var b = da.getNode(a.nodeId),
                            c = da.getNodePropertyObject(b);
                        if (
                            ((da.styleRuleNodes[a.nodeId] = b),
                            (c.styleRules = c.styleRules || []),
                            isNaN(a.index) ? c.styleRules.push(a.rule) : c.styleRules.splice(a.index, 0, a.rule),
                            da.isAttached)
                        )
                            try {
                                b.sheet.insertRule(a.rule);
                            } catch (d) {}
                    }
                    function U(a) {
                        var b = da.getNode(a.nodeId),
                            c = da.getNodePropertyObject(b);
                        if (
                            ((da.styleRuleNodes[a.nodeId] = b),
                            (c.styleRules = c.styleRules || []),
                            c.styleRules.length > a.index && c.styleRules.splice(a.index, 1),
                            da.isAttached)
                        )
                            try {
                                b.sheet.deleteRule(a.index);
                            } catch (d) {}
                    }
                    function V() {
                        d.forEach(da.styleRuleNodes, function(a) {
                            var b = da.getNodePropertyObject(a);
                            b.styleRules &&
                                b.styleRules.forEach(function(b) {
                                    try {
                                        a.sheet.insertRule(b);
                                    } catch (c) {}
                                });
                        });
                    }
                    function W(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b;
                                if (((b = a.node ? da.createElement(a.node) : da.getNode(a.id)), a.frameElementId))
                                    a.node.nodeType === Node.ELEMENT_NODE
                                        ? da.replaceDocumentElement(b, a.frameElementId)
                                        : a.node.nodeType === Node.DOCUMENT_TYPE_NODE &&
                                          da.replaceDocType(a.node.docTypeString, a.frameElementId);
                                else if (a.previousSiblingId) {
                                    var c = da.getNode(a.previousSiblingId);
                                    da.insertAfter(c, b), y(b);
                                } else if (a.parentId) {
                                    var d = da.getNode(a.parentId);
                                    d ? (da.prepend(d, b), y(b)) : e.warn('Missing parent node, id: ' + a.parentId);
                                }
                            });
                    }
                    function X(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = da.getNode(a.id);
                                da.removeNode(b);
                            });
                    }
                    function Y(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = da.getNode(a.id);
                                da.setAttribute(b, a.name, a.value);
                            });
                    }
                    function Z(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = da.getNode(a.id);
                                b && (b.textContent = a.value);
                            });
                    }
                    var $,
                        _,
                        aa,
                        ba = angular.element('#viewer'),
                        ca = angular.element('#viewer-container'),
                        da = new f(ba[0]),
                        ea = void 0,
                        fa = {},
                        ga = {},
                        ha = {},
                        ia = {},
                        ja = { top: 0, left: 0 },
                        ka = {};
                    (b.scale = 1),
                        (b.marginLeft = h.HORIZONTAL),
                        (b.marginTop = h.VERTICAL),
                        o(j.DOM_ELEMENT_VALUE_CHANGE, H),
                        o(j.DOM_SNAPSHOT, F),
                        o(j.MOUSE_MOVE, I),
                        o(j.MOUSE_CLICK, J),
                        o(j.MOUSE_OVER, K),
                        o(j.MOUSE_OUT, L),
                        o(j.SCROLL_POSITION_CHANGE, N),
                        o(j.WINDOW_RESIZE, O),
                        o(j.RADIO_BUTTON_CHANGE, P),
                        o(j.CHECKBOX_CHANGE, Q),
                        o(j.DOM_MUTATION, R),
                        o(j.VISIBILITY_CHANGE, S),
                        o(j.CSS_RULE_INSERT, T),
                        o(j.CSS_RULE_DELETE, U),
                        b.$watch('maxWidth', function(a) {
                            a && q(a, b.maxHeight, b.sessionScreenWidth, b.sessionScreenHeight);
                        }),
                        b.$watch('maxHeight', function(a) {
                            a && q(b.maxWidth, a, b.sessionScreenWidth, b.sessionScreenHeight);
                        }),
                        b.$watch('sessionScreenWidth', function(a) {
                            a && (q(b.maxWidth, b.maxHeight, a, b.sessionScreenHeight), $ || ($ = a));
                        }),
                        b.$watch('sessionScreenHeight', function(a) {
                            a && (q(b.maxWidth, b.maxHeight, b.sessionScreenWidth, a), _ || (_ = a));
                        }),
                        b.$watch('renderingProgress', function(a) {
                            b.viewerOverlay && b.viewerOverlay.setRenderingProgress(a);
                        }),
                        b.$watch('showLoadingAnimation', function(a) {
                            b.viewerOverlay && b.viewerOverlay.showLoadingAnimation(a);
                        }),
                        c.onExecuteEvent(b, D),
                        c.onClear(b, C),
                        c.onPlayerSpeedChange(b, function(a, c) {
                            b.viewerOverlay && b.viewerOverlay.setPlayerSpeed(c);
                        }),
                        c.onVisualizeClicks(b, function(a, c) {
                            b.viewerOverlay && b.viewerOverlay.setShouldVisualizeClicks(c);
                        }),
                        c.onPlayerStarted(b, function(a) {
                            b.viewerOverlay && b.viewerOverlay.startClicksAnimation();
                        }),
                        c.onPlayerStopped(b, function(a) {
                            b.viewerOverlay && b.viewerOverlay.stopClicksAnimation();
                        }),
                        c.onAttach(b, s),
                        c.onDetach(b, r),
                        c.onShowViewerOverlay(b, function() {
                            b.viewerOverlay && b.viewerOverlay.showRenderingOverlay();
                        }),
                        c.onHideViewerOverlay(b, function() {
                            b.viewerOverlay && b.viewerOverlay.hideRenderingOverlay();
                        }),
                        c.onShowBuffering(b, function() {
                            b.viewerOverlay && b.viewerOverlay.showBufferingOverlay();
                        }),
                        c.onHideBuffering(b, function() {
                            b.viewerOverlay && b.viewerOverlay.hideBufferingOverlay();
                        }),
                        c.onHideHiddenTabOverlay(b, function() {
                            b.viewerOverlay && b.viewerOverlay.hideVisibilityOverlay();
                        }),
                        b.$watchGroup(['initialVisibilityState', 'viewerOverlay'], function(a) {
                            var c = a[0],
                                e = a[1];
                            ((d.isDefined(e) && d.isDefined(c)) || null === c) && (b.isCreated = !0);
                        }),
                        (b.handleConsoleResize = function(a) {
                            var c = l.parent().height(),
                                d = c - a;
                            q(b.maxWidth, d, b.sessionScreenWidth, b.sessionScreenHeight);
                        });
                },
            };
        },
    ]);
