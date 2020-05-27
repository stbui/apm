angular
    .module('playerApp')
    .constant('STYLESHEETS_SELECTOR', 'style, link[rel="stylesheet"]')
    .constant('KEYSTROKE_OPTIONS', { END_USER_TYPE_DELAY_SECONDS: 2 })
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
        'KEYSTROKE_OPTIONS',
        'FULL_SCREEN_CLASS',
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
            return {
                restrict: 'E',
                templateUrl: 'templates/viewer.html',
                replace: !0,
                scope: {
                    maxWidth: '=',
                    maxHeight: '=',
                    isCreated: '=',
                    renderingProgress: '=',
                    showLoadingAnimation: '=',
                    sessionId: '=',
                    handleResize: '=',
                    enableToolkit: '=',
                    setToolIsActive: '=',
                    setIsCollaborativeMode: '=',
                    setIsOffline: '=',
                    api: '=',
                    updateUrl: '=',
                    playUserRecordedSession: '=',
                },
                link: function(b, e, l) {
                    function m(a, b) {
                        var c = oa();
                        if (c) {
                            var d = c.elementFromPoint(a, b);
                            if (d) {
                                for (var e = a, f = b; d.contentDocument || d.shadowRoot; ) {
                                    var g;
                                    if (d.contentDocument) {
                                        var h = d.getBoundingClientRect();
                                        (e -= h.left), (f -= h.top), (g = d.contentDocument.elementFromPoint(e, f));
                                    }
                                    if (
                                        (d.shadowRoot && (g = d.shadowRoot.elementFromPoint(e, f)),
                                        !g || ya.getNodeId(d) === ya.getNodeId(g))
                                    )
                                        break;
                                    d = g;
                                }
                                return d;
                            }
                        }
                    }
                    function q(a) {
                        b.sessionScreenWidth = a;
                        var c = e.parent().height();
                        u(b.maxWidth, c, a, b.sessionScreenWidth), ta || (ta = a);
                    }
                    function r(a) {
                        b.sessionScreenHeight = a;
                        var c = e.parent().height();
                        u(b.maxWidth, c, b.sessionScreenWidth, a), ua || (ua = a);
                    }
                    function s(a, b) {
                        Aa[a] = b;
                    }
                    function t(a) {
                        return Aa[a];
                    }
                    function u(a, c, d, e) {
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
                            xa.css({ width: d, height: e });
                    }
                    function v() {
                        ya.isAttached && (va && va.cancel(), ya.detach());
                    }
                    function w() {
                        if (ja()) {
                            var a = wa.contents().find('#glassboard-splash-screen');
                            a.length > 0 && a.attr('style', 'z-index:-10');
                        }
                    }
                    function x(a, b) {
                        ya.isAttached ||
                            ya.attach(function() {
                                w(), y(), z(), ca(), da(), angular.isFunction(b) && b();
                            });
                    }
                    function y() {
                        C({ top: Fa.top, left: Fa.left }),
                            angular.forEach(Ea, function(a, b) {
                                var c = t(b);
                                c(a);
                            }),
                            angular.forEach(Object.keys(Ga), function(a) {
                                C(Ga[a]);
                            });
                    }
                    function z() {
                        ya.isAttached &&
                            ya.traverseDocuments(za, function(a) {
                                D(a.documentElement);
                            });
                    }
                    function A(b) {
                        var c = Ca[b.id],
                            d = angular.element(E(b.id));
                        c && (c.cancel(), delete Ca[b.id]);
                        var e = function() {
                                return d.scrollLeft() !== b.left || d.scrollTop() !== b.top;
                            },
                            f = function() {
                                a(function() {
                                    d.scrollTop(b.top), d.scrollLeft(b.left);
                                });
                            },
                            h = { maxIterations: i.MAX_RETRIES, waitTime: i.TIMEOUT };
                        (Ca[b.id] = new g(e, f, h)), Ca[b.id].start();
                    }
                    function B(b) {
                        var c = Ba[b.id],
                            d = angular.element(ya.getNode(b.id));
                        if (d && !d.is(n.HTML)) {
                            c && (c.cancel(), delete Ba[b.id]);
                            var e = function() {
                                    return d.scrollTop() !== b.top || d.scrollLeft() !== b.left;
                                },
                                f = function() {
                                    a(function() {
                                        d.scrollTop(b.top), d.scrollLeft(b.left);
                                    });
                                },
                                h = { maxIterations: i.MAX_RETRIES, waitTime: i.TIMEOUT };
                            (Ba[b.id] = new g(e, f, h)), Ba[b.id].start();
                        }
                    }
                    function C(a) {
                        var b = t(j.SCROLL_POSITION_CHANGE);
                        b(a);
                    }
                    function D(a) {
                        ya.traverseNode(a, function(a) {
                            var b = ya.getNodePropertyObject(a);
                            if (b.top || b.left) {
                                var c = { id: b.nodeId, top: b.top, left: b.left };
                                Ga[c.id] || C(c);
                            }
                        });
                    }
                    function E(a) {
                        var b = F(a);
                        return b && b.shadowRoot ? b : ((b && b.contentWindow) || (b = F()), b.contentWindow);
                    }
                    function F(a) {
                        return angular.isDefined(a) ? ya.getNode(a) : wa[0];
                    }
                    function G(a, c, d) {
                        var e = { id: d, top: a, left: c, windowScroll: !0 };
                        ya.isAttached &&
                            (A(e),
                            angular.isUndefined(d) && b.viewerOverlay && b.viewerOverlay.setScrollPosition(a, c)),
                            angular.isUndefined(d) ? (Fa = { top: a || 0, left: c || 0 }) : (Ga[d] = e);
                    }
                    function H(a, b) {
                        M(b);
                    }
                    function I(a, b) {
                        var c = b.type,
                            d = b.data,
                            e = t(c);
                        e && d && e(d);
                    }
                    function J(a) {
                        b.viewerOverlay &&
                            ('prerender' === a || 'hidden' === a
                                ? b.viewerOverlay.showVisibilityOverlay(a)
                                : b.viewerOverlay.hideVisibilityOverlay(),
                            (b.visibilityState = a));
                    }
                    function K(a) {
                        M(a);
                    }
                    function L(a) {
                        b.updateUrl(a.url);
                    }
                    function M(c) {
                        if (ya && c) {
                            var e = !c.hostElementId && !c.frameElementId;
                            if (e) {
                                b.updateUrl(c.pageUrl),
                                    (Ea = {}),
                                    (Ga = {}),
                                    (Fa = { top: c.top, left: c.left }),
                                    d.isDefined(c.visibilityState) &&
                                        b.visibilityState !== c.visibilityState &&
                                        J(c.visibilityState),
                                    c.nestedSnapshots &&
                                        c.nestedSnapshots.forEach(function(a) {
                                            M(a);
                                        });
                                var f = c.screenWidth || ta,
                                    g = c.screenHeight || ua;
                                ya.isAttached
                                    ? (q(f),
                                      r(g),
                                      b.viewerOverlay && b.viewerOverlay.setScrollPosition(Fa.top, Fa.left))
                                    : (Ea[j.WINDOW_RESIZE] = { width: f, height: g });
                            }
                            var h = b.initialSettings.getCustomOrigin();
                            ya.write(c, h, b.sessionId),
                                w(),
                                G(c.top, c.left, c.hostElementId || c.frameElementId),
                                c.nodesScrollPositions &&
                                    angular.forEach(c.nodesScrollPositions, function(a, b) {
                                        Ga[b] = { id: b, top: a.top, left: a.left };
                                    }),
                                a(z),
                                ea(c.frameElementId, c.hostElementId);
                        }
                    }
                    function N(a) {
                        if (!Da) return !1;
                        var b = Date.now() - Da,
                            c = d.millisecondsToSeconds(b);
                        return Math.floor(c) <= a;
                    }
                    function O(a) {
                        if (!N(o.END_USER_TYPE_DELAY_SECONDS)) {
                            var b = angular.element(ya.getNode(a.id));
                            b.val(a.value);
                        }
                    }
                    function P(a) {
                        if (ya.isAttached && b.viewerOverlay) {
                            var c = b.getFrameElementOffset(a.frameElementId),
                                d = a.y + c.top,
                                e = a.x + c.left;
                            b.viewerOverlay.setCursorPosition({ top: d, left: e });
                        } else Ea[j.MOUSE_MOVE] = a;
                    }
                    function Q(a) {
                        if ((P(a), ya.isAttached && b.viewerOverlay)) {
                            var c = b.getFrameElementOffset(a.frameElementId),
                                d = Fa.top + a.y + c.top,
                                e = Fa.left + a.x + c.left;
                            b.viewerOverlay.registerClick(d, e);
                        }
                    }
                    function R(a) {
                        var b = angular.element(ya.getNode(a.id));
                        b && (b.addClass(k), b.parents().addClass(k));
                    }
                    function S(a) {
                        var b = angular.element(ya.getNode(a.id));
                        b && (b.removeClass(k), b.parents().removeClass(k));
                    }
                    function T(a) {
                        a.id ? (Ga[a.id] = a) : (Fa = { top: a.top || 0, left: a.left || 0 }),
                            ya.isAttached &&
                                (a.id ? (a.windowScroll ? G(a.top, a.left, a.id) : B(a)) : G(a.top, a.left));
                    }
                    function U(a) {
                        ya.isAttached
                            ? (q(a.width),
                              r(a.height),
                              b.viewerOverlay && b.viewerOverlay.setScrollPosition(Fa.top, Fa.left))
                            : (Ea[j.WINDOW_RESIZE] = a);
                    }
                    function V(a) {
                        var b = angular.element(ya.getNode(a.id));
                        b.prop('checked', a.state);
                    }
                    function W(a) {
                        var b = angular.element(ya.getNode(a.id));
                        b.prop('checked', a.state);
                    }
                    function X(a) {
                        ha(a.addedOrMoved), la(a.removed), na(a.characterData), ma(a.attributes);
                    }
                    function Y(a) {
                        J(a.visibilityState);
                    }
                    function Z(a) {
                        var b;
                        (b = void 0 === a.nodeId ? ya.documentContainer.contentDocument : ya.getNode(a.nodeId)),
                            (ya.adoptedStyleSheetNodes[a.nodeId] = b);
                        var c = ya.getNodePropertyObject(b);
                        (c.adoptedStyleSheets = a.styles), ya.isAttached && d.addAdoptedStyleSheets(b, a.styles);
                    }
                    function $(a) {
                        var b = ya.getNode(a.nodeId),
                            c = ya.getNodePropertyObject(b);
                        if (
                            ((ya.styleRuleNodes[a.nodeId] = b),
                            (c.styleRules = c.styleRules || []),
                            isNaN(a.index) ? c.styleRules.push(a.rule) : c.styleRules.splice(a.index, 0, a.rule),
                            ya.isAttached)
                        )
                            try {
                                var d = isNaN(a.index) ? b.sheet.cssRules.length : a.index;
                                b.sheet.insertRule(a.rule, d);
                            } catch (e) {}
                    }
                    function _(a) {
                        var b = ya.getNode(a.nodeId),
                            c = ya.getNodePropertyObject(b);
                        if (
                            ((ya.styleRuleNodes[a.nodeId] = b),
                            (c.styleRules = c.styleRules || []),
                            c.styleRules.length > a.index && c.styleRules.splice(a.index, 1),
                            ya.isAttached)
                        )
                            try {
                                b.sheet.deleteRule(a.index);
                            } catch (d) {}
                    }
                    function aa(a) {
                        var b = angular.element(ya.getNode(a.nodeId));
                        b.addClass(p), ya.addFullScreenNode(a.nodeId);
                    }
                    function ba(a) {
                        ya.traverseFullScreenNodes(function(a) {
                            angular.element(a).removeClass(p);
                        });
                    }
                    function ca() {
                        d.forEach(ya.styleRuleNodes, fa);
                    }
                    function da() {
                        d.forEach(ya.adoptedStyleSheetNodes, function(a) {
                            var b = ya.getNodePropertyObject(a);
                            d.addAdoptedStyleSheets(a, b.adoptedStyleSheets);
                        });
                    }
                    function ea(a, b) {
                        d.forEach(ya.styleRuleNodes, function(c) {
                            var d = ya.getNodePropertyObject(c);
                            d.frameElementId === a && d.hostElementId === b && fa(c);
                        });
                    }
                    function fa(a) {
                        if (a && a.sheet) {
                            var b = ya.getNodePropertyObject(a);
                            b.styleRules &&
                                (ga(a),
                                b.styleRules.forEach(function(b, c) {
                                    try {
                                        b.indexOf('inset:') >= 0 && (b = d.replaceInsetStyleRule(b)),
                                            a.sheet.insertRule(b, c);
                                    } catch (e) {}
                                }));
                        }
                    }
                    function ga(a) {
                        for (; a.sheet.cssRules.length > 0; ) a.sheet.deleteRule(0);
                    }
                    function ha(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b;
                                if (a.node) {
                                    var c = ia(a),
                                        d = c ? c.hostElementId : null,
                                        e = c ? c.frameElementId : null;
                                    b = ya.createElement(a.node, d, e);
                                } else b = ya.getNode(a.id);
                                if (a.frameElementId)
                                    a.node && a.node.nodeType !== Node.ELEMENT_NODE
                                        ? a.node.nodeType === Node.DOCUMENT_TYPE_NODE &&
                                          ya.replaceDocType(a.node.docTypeString, a.frameElementId)
                                        : ya.replaceDocumentElement(b, a.frameElementId);
                                else if (a.previousSiblingId) {
                                    var f = ya.getNode(a.previousSiblingId);
                                    ya.insertAfter(f, b), D(b);
                                } else if (a.parentId) {
                                    var g = ya.getNode(a.parentId);
                                    g && (ya.prepend(g, b), D(b), ka(g, b) && fa(g));
                                }
                                a.node && 'STYLE' === a.node.tagName && a.node.styleRules && fa(b);
                            });
                    }
                    function ia(a) {
                        var b;
                        if (
                            (a.parentId
                                ? (b = ya.getNode(a.parentId))
                                : a.previousSiblingId && (b = ya.getNode(a.previousSiblingId)),
                            b)
                        )
                            return ya.getNodePropertyObject(b);
                    }
                    function ja() {
                        return b.initialSettings && b.initialSettings.isAssureCoWorkaroundEnabled();
                    }
                    function ka(a, b) {
                        return (
                            'STYLE' === a.tagName &&
                            d.isWhitespaceString(a.textContent) &&
                            b.nodeType === Node.TEXT_NODE &&
                            d.isWhitespaceString(b.textContent)
                        );
                    }
                    function la(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = ya.getNode(a.id);
                                ya.removeNode(b);
                            });
                    }
                    function ma(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = ya.getNode(a.id);
                                ya.setAttribute(b, a.name, a.value);
                            });
                    }
                    function na(a) {
                        a &&
                            angular.forEach(a, function(a) {
                                var b = ya.getNode(a.id);
                                b && (b.textContent = a.value);
                            });
                    }
                    function oa() {
                        if (wa[0]) return wa[0].contentDocument;
                    }
                    function pa() {
                        return ra().height;
                    }
                    function qa() {
                        return ra().width;
                    }
                    function ra() {
                        var a = oa();
                        return a && a.documentElement
                            ? {
                                  width: a.documentElement.scrollWidth,
                                  height: a.documentElement.scrollHeight,
                              }
                            : { width: 0, height: 0 };
                    }
                    function sa(a) {
                        (b.initialSettings = a), ya.setSettings(a);
                    }
                    var ta,
                        ua,
                        va,
                        wa = angular.element('#viewer'),
                        xa = angular.element('#viewer-container'),
                        ya = new f(wa[0]),
                        za = void 0,
                        Aa = {},
                        Ba = {},
                        Ca = {},
                        Da = null,
                        Ea = {},
                        Fa = { top: 0, left: 0 },
                        Ga = {};
                    (b.scale = 1),
                        (b.marginLeft = h.HORIZONTAL),
                        (b.marginTop = h.VERTICAL),
                        (b.sessionScreenWidth = 0),
                        (b.sessionScreenHeight = 0),
                        s(j.DOM_ELEMENT_VALUE_CHANGE, O),
                        s(j.DOM_SNAPSHOT, K),
                        s(j.URL_CHANGE, L),
                        s(j.MOUSE_MOVE, P),
                        s(j.MOUSE_CLICK, Q),
                        s(j.MOUSE_OVER, R),
                        s(j.MOUSE_OUT, S),
                        s(j.SCROLL_POSITION_CHANGE, T),
                        s(j.WINDOW_RESIZE, U),
                        s(j.RADIO_BUTTON_CHANGE, V),
                        s(j.CHECKBOX_CHANGE, W),
                        s(j.DOM_MUTATION, X),
                        s(j.VISIBILITY_CHANGE, Y),
                        s(j.CSS_RULE_INSERT, $),
                        s(j.CSS_RULE_DELETE, _),
                        s(j.ADOPTED_STYLE_SHEET_CHANGE, Z),
                        s(j.FULL_SCREEN_ENTER, aa),
                        s(j.FULL_SCREEN_LEAVE, ba),
                        b.$watch('maxWidth', function(a) {
                            a && u(a, b.maxHeight, b.sessionScreenWidth, b.sessionScreenHeight);
                        }),
                        b.$watch('maxHeight', function(a) {
                            a && u(b.maxWidth, a, b.sessionScreenWidth, b.sessionScreenHeight);
                        }),
                        b.$watch('renderingProgress', function(a) {
                            b.viewerOverlay && b.viewerOverlay.setRenderingProgress(a);
                        }),
                        b.$watch('showLoadingAnimation', function(a) {
                            b.viewerOverlay && b.viewerOverlay.showLoadingAnimation(a);
                        }),
                        c.onExecuteEvent(b, I),
                        c.onClear(b, H),
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
                        c.onAttach(b, x),
                        c.onDetach(b, v),
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
                        (b.api = {
                            setSessionScreenWidth: q,
                            setSessionScreenHeight: r,
                            setInitialSettings: sa,
                        }),
                        (b.playRecordedSession = function() {
                            b.playUserRecordedSession();
                        }),
                        (b.focusNodeByNodeId = function(a) {
                            var b = ya.getNode(a);
                            b && b.focus();
                        }),
                        (b.getNodeFromPoint = function(a, b) {
                            var c = m(a, b);
                            if (c) {
                                var d = ya.getNodePropertyObject(c);
                                return {
                                    nodeId: d.nodeId,
                                    frameElementId: d.frameElementId,
                                    hostElementId: d.hostElementId,
                                    node: c,
                                };
                            }
                        }),
                        (b.getScrollableNodeFromPoint = function(a, b, c, e) {
                            for (var f = m(a, b); ; ) {
                                var g = angular.element(f),
                                    h = g.scrollTop(),
                                    i = g.scrollLeft(),
                                    j = Math.floor(h + e),
                                    k = Math.floor(i + c);
                                g.scrollTop(j), g.scrollLeft(k);
                                var l = Math.floor(g.scrollTop()) === j,
                                    n = Math.floor(g.scrollLeft()) === k;
                                if ((g.scrollTop(h), g.scrollLeft(i), l && n)) break;
                                if (((f = d.getParentElement(f)), f === g[0] || f === wa[0])) break;
                            }
                            var o = ya.getNodePropertyObject(f);
                            return {
                                nodeId: o.nodeId,
                                frameElementId: o.frameElementId,
                                hostElementId: o.hostElementId,
                            };
                        }),
                        (b.getOwnerFrameElementId = function(a) {
                            var b = ya.getNode(a),
                                c = b.ownerDocument.defaultView.frameElement;
                            return ya.getNodePropertyObject(c).nodeId;
                        }),
                        (b.updateLastTypingTime = function(a) {
                            Da = a;
                        }),
                        (b.getFrameElementOffset = function(a) {
                            var b;
                            return angular.isDefined(a) && (b = ya.getNode(a)), ya.getNodeOffset(b);
                        }),
                        (b.handleResize = function(a) {
                            var c = e.parent().height(),
                                d = c - a;
                            u(b.maxWidth, d, b.sessionScreenWidth, b.sessionScreenHeight);
                        }),
                        (b.setToolIsActive = function(a, c) {
                            b.viewerOverlay.setToolIsActive(a, c);
                        }),
                        (b.enableToolkit = function(a) {
                            b.viewerOverlay.enableDrawing(a);
                        }),
                        (b.setIsCollaborativeMode = function(a) {
                            b.isCollaborativeMode = a;
                        }),
                        (b.setIsOffline = function(a) {
                            a ? b.viewerOverlay.showOfflineOverlay() : b.viewerOverlay.hideOfflineOverlay();
                        }),
                        b.$watch(pa, function(a) {
                            b.viewerOverlay && b.viewerOverlay.setOverlayHeight(a);
                        }),
                        b.$watch(qa, function(a) {
                            b.viewerOverlay && b.viewerOverlay.setOverlayWidth(a);
                        }),
                        b.$watch('viewerOverlayIsCreated', function(a) {
                            b.isCreated = a;
                        });
                },
            };
        },
    ]);
