import { utils } from './common';
import {
    FULL_SCREEN_CLASS,
    VIEWER_MARGINS,
    SCROLL_POSITION_CHANGE,
    EVENT_TYPE,
    SESSIONSTACK_HOVER_CLASS,
} from './constant';
import { DocumentNode } from './DocumentNode';
import { AsyncWhile } from './AsyncWhile';
import { player } from './player';
import { IActivity } from './Activity';

const STYLESHEETS_SELECTOR = 'style, link[rel="stylesheet"]';
const KEYSTROKE_OPTIONS = { END_USER_TYPE_DELAY_SECONDS: 2 };

const angular: any = {};

interface IScope {
    sessionScreenWidth: number;
    sessionScreenHeight: number;
    maxWidth: number;
    maxHeight: number;
    scale: number;
    marginLeft: number;
    marginTop: number;
    viewerOverlay: object;
    initialSettings: object;
    visibilityState: boolean;
    sessionId: number;
    isCreated: boolean;
    [key: string]: any;
}

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
        function($timeout, $interval, sessionstackManager, PROCESS_HOVER_STYLES_CONFIG, ELEMENTS) {
            return {
                restrict: 'E',
                templateUrl: 'templates/viewer.html',
                replace: true,
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
                link: function($scope: IScope, $element, l) {
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
                                        !g || documentNode.getNodeId(d) === documentNode.getNodeId(g))
                                    )
                                        break;
                                    d = g;
                                }
                                return d;
                            }
                        }
                    }
                    function setSessionScreenWidth(sessionScreenWidth) {
                        $scope.sessionScreenWidth = sessionScreenWidth;
                        var height = $element.parent().height();
                        u($scope.maxWidth, height, sessionScreenWidth, $scope.sessionScreenWidth);

                        if (!ta) {
                            ta = sessionScreenWidth;
                        }
                    }
                    function setSessionScreenHeight(sessionScreenHeight) {
                        $scope.sessionScreenHeight = sessionScreenHeight;
                        var height = $element.parent().height();
                        u($scope.maxWidth, height, $scope.sessionScreenWidth, sessionScreenHeight);

                        if (!ua) {
                            ua = sessionScreenHeight;
                        }
                        // ua || (ua = sessionScreenHeight);
                    }
                    function s(a, b) {
                        Aa[a] = b;
                    }
                    function t(a) {
                        return Aa[a];
                    }
                    function u(maxWidth, maxHeight, sessionScreenWidth, sessionScreenHeight) {
                        var f = maxWidth - 2 * VIEWER_MARGINS.HORIZONTAL,
                            g = maxHeight - 2 * VIEWER_MARGINS.VERTICAL,
                            i = 1,
                            j = 1;

                        0 !== sessionScreenWidth && (i = sessionScreenWidth < f ? 1 : f / sessionScreenWidth);
                        0 !== sessionScreenHeight && (j = $element < g ? 1 : g / sessionScreenHeight);
                        $scope.scale = Math.min(i, j);

                        var k = sessionScreenWidth * $scope.scale,
                            l = sessionScreenHeight * $scope.scale;

                        f > k
                            ? ($scope.marginLeft = (maxWidth - k) / 2)
                            : ($scope.marginLeft = VIEWER_MARGINS.HORIZONTAL);

                        g > l ? ($scope.marginTop = (maxHeight - l) / 2) : ($scope.marginTop = VIEWER_MARGINS.VERTICAL);

                        xa.css({ width: sessionScreenWidth, height: sessionScreenHeight });
                    }
                    function v() {
                        if (documentNode.isAttached) {
                            documentNode && va.cancel();
                            documentNode.detach();
                        }
                    }
                    function w() {
                        if (ja()) {
                            var a = viewer.contents().find('#glassboard-splash-screen');
                            a.length > 0 && a.attr('style', 'z-index:-10');
                        }
                    }
                    function x(a, b) {
                        documentNode.isAttached ||
                            documentNode.attach(function() {
                                w();
                                y();
                                z();
                                ca();
                                da();
                                angular.isFunction(b) && b();
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
                        if (documentNode.isAttached) {
                            documentNode.traverseDocuments(za, function(a) {
                                D(a.documentElement);
                            });
                        }
                    }
                    function A(b) {
                        var c = Ca[b.id],
                            d = angular.element(E(b.id));

                        if (c) {
                            c.cancel();
                            delete Ca[b.id];
                        }

                        var condition = function() {
                                return d.scrollLeft() !== b.left || d.scrollTop() !== b.top;
                            },
                            body = function() {
                                $timeout(function() {
                                    d.scrollTop(b.top);
                                    d.scrollLeft(b.left);
                                });
                            },
                            waitTimeConfig = {
                                maxIterations: SCROLL_POSITION_CHANGE.MAX_RETRIES,
                                waitTime: SCROLL_POSITION_CHANGE.TIMEOUT,
                            };

                        Ca[b.id] = new AsyncWhile(condition, body, waitTimeConfig);
                        Ca[b.id].start();
                    }
                    function B(b) {
                        var c = Ba[b.id],
                            d = angular.element(documentNode.getNode(b.id));

                        if (d && !d.is(ELEMENTS.HTML)) {
                            c && (c.cancel(), delete Ba[b.id]);
                            var e = function() {
                                    return d.scrollTop() !== b.top || d.scrollLeft() !== b.left;
                                },
                                f = function() {
                                    $timeout(function() {
                                        d.scrollTop(b.top), d.scrollLeft(b.left);
                                    });
                                },
                                h = {
                                    maxIterations: SCROLL_POSITION_CHANGE.MAX_RETRIES,
                                    waitTime: SCROLL_POSITION_CHANGE.TIMEOUT,
                                };

                            Ba[b.id] = new AsyncWhile(e, f, h);
                            Ba[b.id].start();
                        }
                    }
                    function C(a) {
                        var b = t(EVENT_TYPE.SCROLL_POSITION_CHANGE);
                        b(a);
                    }
                    function D(a) {
                        documentNode.traverseNode(a, function(a) {
                            var b = documentNode.getNodePropertyObject(a);
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
                    function F(a?) {
                        return angular.isDefined(a) ? documentNode.getNode(a) : viewer[0];
                    }
                    function G(top, left?, id?) {
                        var e = { id: id, top: top, left: left, windowScroll: true };

                        if (documentNode.isAttached) {
                            A(e);
                            angular.isUndefined(id) &&
                                $scope.viewerOverlay &&
                                $scope.viewerOverlay.setScrollPosition(top, left);
                        }

                        if (angular.isUndefined(id)) {
                            Fa = { top: top || 0, left: left || 0 };
                        } else {
                            Ga[id] = e;
                        }
                    }
                    function H(a, b) {
                        M(b);
                    }
                    function I(a, activity: IActivity) {
                        var c = activity.type,
                            d = activity.data,
                            e = t(c);
                        e && d && e(d);
                    }
                    function J(visibilityState) {
                        if ($scope.viewerOverlay) {
                            if ('prerender' === visibilityState || 'hidden' === visibilityState) {
                                $scope.viewerOverlay.showVisibilityOverlay(visibilityState);
                            } else {
                                $scope.viewerOverlay.hideVisibilityOverlay();
                            }

                            $scope.visibilityState = visibilityState;
                        }
                    }
                    function K(data) {
                        M(data);
                    }
                    function L(data) {
                        $scope.updateUrl(data.url);
                    }
                    function M(data) {
                        if (documentNode && data) {
                            var e = !data.hostElementId && !data.frameElementId;
                            if (e) {
                                $scope.updateUrl(data.pageUrl);
                                Ea = {};
                                Ga = {};
                                Fa = { top: data.top, left: data.left };

                                if (
                                    utils.isDefined(data.visibilityState) &&
                                    $scope.visibilityState !== data.visibilityState
                                ) {
                                    J(data.visibilityState);
                                }

                                if (data.nestedSnapshots) {
                                    data.nestedSnapshots.forEach(function(a) {
                                        M(a);
                                    });
                                }

                                var screenWidth = data.screenWidth || ta,
                                    screenHeight = data.screenHeight || ua;

                                if (documentNode.isAttached) {
                                    setSessionScreenWidth(screenWidth);
                                    setSessionScreenHeight(screenHeight);
                                    $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left);
                                } else {
                                    Ea[EVENT_TYPE.WINDOW_RESIZE] = { width: screenWidth, height: screenHeight };
                                }

                                // documentNode.isAttached
                                //     ? (setSessionScreenWidth(screenWidth),
                                //       setSessionScreenHeight(screenHeight),
                                //       $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left))
                                //     : (Ea[EVENT_TYPE.WINDOW_RESIZE] = { width: screenWidth, height: screenHeight });
                            }

                            var customOrigin = $scope.initialSettings.getCustomOrigin();
                            documentNode.write(c, customOrigin, $scope.sessionId);
                            w();
                            G(c.top, c.left, c.hostElementId || c.frameElementId);

                            if (c.nodesScrollPositions) {
                                angular.forEach(c.nodesScrollPositions, function(a, b) {
                                    Ga[b] = { id: b, top: a.top, left: a.left };
                                });
                            }

                            $timeout(z);
                            ea(c.frameElementId, c.hostElementId);
                        }
                    }
                    function N(a) {
                        if (!Da) return false;

                        var b = Date.now() - Da,
                            c = utils.millisecondsToSeconds(b);

                        return Math.floor(c) <= a;
                    }
                    function O(data) {
                        if (!N(KEYSTROKE_OPTIONS.END_USER_TYPE_DELAY_SECONDS)) {
                            var b = angular.element(documentNode.getNode(data.id));
                            b.val(data.value);
                        }
                    }
                    function P(data) {
                        if (documentNode.isAttached && $scope.viewerOverlay) {
                            var c = $scope.getFrameElementOffset(data.frameElementId),
                                top = data.y + c.top,
                                left = data.x + c.left;
                            $scope.viewerOverlay.setCursorPosition({ top: top, left: left });
                        } else {
                            Ea[EVENT_TYPE.MOUSE_MOVE] = data;
                        }
                    }
                    function Q(data: { pageX: 84; pageY: 183; selector: any; x: 84; y: 183 }) {
                        P(data);
                        if (documentNode.isAttached && $scope.viewerOverlay) {
                            var c = $scope.getFrameElementOffset(data.frameElementId),
                                d = Fa.top + data.y + c.top,
                                e = Fa.left + data.x + c.left;

                            $scope.viewerOverlay.registerClick(d, e);
                        }
                    }
                    function R(data: { id: 11780 }) {
                        var b = angular.element(documentNode.getNode(data.id));
                        if (b) {
                            b.addClass(SESSIONSTACK_HOVER_CLASS);
                            b.parents().addClass(SESSIONSTACK_HOVER_CLASS);
                        }
                    }
                    function S(data: { id: 11780 }) {
                        var b = angular.element(documentNode.getNode(data.id));
                        if (b) {
                            b.removeClass(SESSIONSTACK_HOVER_CLASS);
                            b.parents().removeClass(SESSIONSTACK_HOVER_CLASS);
                        }
                    }
                    function T(data: { id?: number; left: 0; top: 1; windowScroll: true }) {
                        if (data.id) {
                            Ga[data.id] = data;
                        } else {
                            Fa = { top: data.top || 0, left: data.left || 0 };
                        }

                        if (documentNode.isAttached) {
                            data.id
                                ? data.windowScroll
                                    ? G(data.top, data.left, data.id)
                                    : B(data)
                                : G(data.top, data.left);
                        }
                    }
                    function U(data: { height: 679; width: 1623 }) {
                        if (documentNode.isAttached) {
                            setSessionScreenWidth(data.width);
                            setSessionScreenHeight(data.height);
                            $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left);
                        } else {
                            Ea[EVENT_TYPE.WINDOW_RESIZE] = data;
                        }
                    }
                    function V(data) {
                        var b = angular.element(documentNode.getNode(data.id));
                        b.prop('checked', data.state);
                    }
                    function W(data) {
                        var b = angular.element(documentNode.getNode(data.id));
                        b.prop('checked', data.state);
                    }
                    function X(data) {
                        ha(data.addedOrMoved);
                        la(data.removed);
                        na(data.characterData);
                        ma(data.attributes);
                    }
                    function Y(data: { visibilityState: 'hidden' }) {
                        J(data.visibilityState);
                    }
                    function Z(data) {
                        var b;
                        b =
                            void 0 === data.nodeId
                                ? documentNode.documentContainer.contentDocument
                                : documentNode.getNode(data.nodeId);

                        documentNode.adoptedStyleSheetNodes[data.nodeId] = b;
                        var c = documentNode.getNodePropertyObject(b);
                        c.adoptedStyleSheets = data.styles;
                        documentNode.isAttached && utils.addAdoptedStyleSheets(b, data.styles);
                    }
                    function $(data) {
                        var b = documentNode.getNode(data.nodeId),
                            c = documentNode.getNodePropertyObject(b);

                        documentNode.styleRuleNodes[data.nodeId] = b;
                        c.styleRules = c.styleRules || [];
                        isNaN(data.index)
                            ? c.styleRules.push(data.rule)
                            : c.styleRules.splice(data.index, 0, data.rule);

                        if (documentNode.isAttached) {
                            try {
                                var d = isNaN(data.index) ? b.sheet.cssRules.length : data.index;
                                b.sheet.insertRule(data.rule, d);
                            } catch (e) {}
                        }
                    }
                    function _(data) {
                        var b = documentNode.getNode(data.nodeId),
                            c = documentNode.getNodePropertyObject(b);

                        documentNode.styleRuleNodes[data.nodeId] = b;
                        c.styleRules = c.styleRules || [];
                        c.styleRules.length > data.index && c.styleRules.splice(data.index, 1);

                        if (documentNode.isAttached) {
                            try {
                                b.sheet.deleteRule(data.index);
                            } catch (d) {}
                        }
                    }
                    function aa(data) {
                        var b = angular.element(documentNode.getNode(data.nodeId));
                        b.addClass(FULL_SCREEN_CLASS);
                        documentNode.addFullScreenNode(data.nodeId);
                    }
                    function ba(data) {
                        documentNode.traverseFullScreenNodes(function(a) {
                            angular.element(a).removeClass(FULL_SCREEN_CLASS);
                        });
                    }
                    function ca() {
                        utils.forEach(documentNode.styleRuleNodes, fa);
                    }
                    function da() {
                        utils.forEach(documentNode.adoptedStyleSheetNodes, function(a) {
                            var b = documentNode.getNodePropertyObject(a);
                            utils.addAdoptedStyleSheets(a, b.adoptedStyleSheets);
                        });
                    }
                    function ea(frameElementId, hostElementId) {
                        utils.forEach(documentNode.styleRuleNodes, function(c) {
                            var d = documentNode.getNodePropertyObject(c);
                            d.frameElementId === frameElementId && d.hostElementId === hostElementId && fa(c);
                        });
                    }
                    function fa(a) {
                        if (a && a.sheet) {
                            var b = documentNode.getNodePropertyObject(a);

                            if (b.styleRuleNodes) {
                                ga(a);
                                b.styleRules.forEach(function(b, c) {
                                    try {
                                        b.indexOf('inset:') >= 0 && (b = utils.replaceInsetStyleRule(b));
                                        a.sheet.insertRule(b, c);
                                    } catch (e) {}
                                });
                            }
                        }
                    }
                    function ga(a) {
                        for (; a.sheet.cssRules.length > 0; ) a.sheet.deleteRule(0);
                    }
                    function ha(addedOrMoved) {
                        if (addedOrMoved) {
                            angular.forEach(addedOrMoved, function(a) {
                                var b;
                                if (a.node) {
                                    var c = ia(a),
                                        d = c ? c.hostElementId : null,
                                        e = c ? c.frameElementId : null;
                                    b = documentNode.createElement(a.node, d, e);
                                } else b = documentNode.getNode(a.id);
                                if (a.frameElementId)
                                    a.node && a.node.nodeType !== Node.ELEMENT_NODE
                                        ? a.node.nodeType === Node.DOCUMENT_TYPE_NODE &&
                                          documentNode.replaceDocType(a.node.docTypeString, a.frameElementId)
                                        : documentNode.replaceDocumentElement(b, a.frameElementId);
                                else if (a.previousSiblingId) {
                                    var f = documentNode.getNode(a.previousSiblingId);
                                    documentNode.insertAfter(f, b), D(b);
                                } else if (a.parentId) {
                                    var g = documentNode.getNode(a.parentId);
                                    g && (documentNode.prepend(g, b), D(b), ka(g, b) && fa(g));
                                }
                                a.node && 'STYLE' === a.node.tagName && a.node.styleRules && fa(b);
                            });
                        }
                    }
                    function ia(a) {
                        var b;

                        a.parentId
                            ? (b = documentNode.getNode(a.parentId))
                            : a.previousSiblingId && (b = documentNode.getNode(a.previousSiblingId));

                        if (b) {
                            return documentNode.getNodePropertyObject(b);
                        }
                    }
                    function ja() {
                        return $scope.initialSettings && $scope.initialSettings.isAssureCoWorkaroundEnabled();
                    }
                    function ka(a, b) {
                        return (
                            'STYLE' === a.tagName &&
                            utils.isWhitespaceString(a.textContent) &&
                            b.nodeType === Node.TEXT_NODE &&
                            utils.isWhitespaceString(b.textContent)
                        );
                    }
                    function la(removed) {
                        removed &&
                            angular.forEach(removed, function(a) {
                                var id = documentNode.getNode(a.id);
                                documentNode.removeNode(id);
                            });
                    }
                    function ma(attributes) {
                        if (attributes) {
                            angular.forEach(attributes, function(attribute) {
                                var b = documentNode.getNode(attribute.id);
                                documentNode.setAttribute(b, attribute.name, attribute.value);
                            });
                        }
                    }
                    function na(characterData) {
                        if (characterData) {
                            angular.forEach(characterData, function(a) {
                                var b = documentNode.getNode(a.id);
                                b && (b.textContent = a.value);
                            });
                        }
                    }
                    function oa() {
                        if (viewer[0]) return viewer[0].contentDocument;
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
                    function setInitialSettings(initialSettings) {
                        $scope.initialSettings = initialSettings;
                        documentNode.setSettings(initialSettings);
                    }
                    var ta,
                        ua, // sessionScreenHeight
                        va,
                        viewer = angular.element('#viewer'),
                        xa = angular.element('#viewer-container'),
                        // ya = new DocumentNode(viewer[0]),
                        documentNode = new DocumentNode(viewer[0]),
                        za = void 0,
                        Aa = {},
                        Ba = {},
                        Ca = {},
                        Da: any = null,
                        Ea = {},
                        Fa = { top: 0, left: 0 },
                        Ga = {};

                    $scope.scale = 1;
                    $scope.marginLeft = SCROLL_POSITION_CHANGE.HORIZONTAL;
                    $scope.marginTop = SCROLL_POSITION_CHANGE.VERTICAL;
                    $scope.sessionScreenWidth = 0;
                    $scope.sessionScreenHeight = 0;
                    s(EVENT_TYPE.DOM_ELEMENT_VALUE_CHANGE, O);
                    s(EVENT_TYPE.DOM_SNAPSHOT, K);
                    s(EVENT_TYPE.URL_CHANGE, L);
                    s(EVENT_TYPE.MOUSE_MOVE, P);
                    s(EVENT_TYPE.MOUSE_CLICK, Q);
                    s(EVENT_TYPE.MOUSE_OVER, R);
                    s(EVENT_TYPE.MOUSE_OUT, S);
                    s(EVENT_TYPE.SCROLL_POSITION_CHANGE, T);
                    s(EVENT_TYPE.WINDOW_RESIZE, U);
                    s(EVENT_TYPE.RADIO_BUTTON_CHANGE, V);
                    s(EVENT_TYPE.CHECKBOX_CHANGE, W);
                    s(EVENT_TYPE.DOM_MUTATION, X);
                    s(EVENT_TYPE.VISIBILITY_CHANGE, Y);
                    s(EVENT_TYPE.CSS_RULE_INSERT, $);
                    s(EVENT_TYPE.CSS_RULE_DELETE, _);
                    s(EVENT_TYPE.ADOPTED_STYLE_SHEET_CHANGE, Z);
                    s(EVENT_TYPE.FULL_SCREEN_ENTER, aa);
                    s(EVENT_TYPE.FULL_SCREEN_LEAVE, ba);

                    $scope.$watch('maxWidth', function(maxWidth) {
                        maxWidth &&
                            u(maxWidth, $scope.maxHeight, $scope.sessionScreenWidth, $scope.sessionScreenHeight);
                    });
                    $scope.$watch('maxHeight', function(maxHeight) {
                        maxHeight &&
                            u($scope.maxWidth, maxHeight, $scope.sessionScreenWidth, $scope.sessionScreenHeight);
                    });
                    $scope.$watch('renderingProgress', function(a) {
                        $scope.viewerOverlay && $scope.viewerOverlay.setRenderingProgress(a);
                    });
                    $scope.$watch('showLoadingAnimation', function(a) {
                        $scope.viewerOverlay && $scope.viewerOverlay.showLoadingAnimation(a);
                    });

                    player.onExecuteEvent($scope, I);
                    player.onClear($scope, H);
                    player.onPlayerSpeedChange($scope, function(a, c) {
                        $scope.viewerOverlay && $scope.viewerOverlay.setPlayerSpeed(c);
                    });
                    player.onVisualizeClicks($scope, function(a, c) {
                        $scope.viewerOverlay && $scope.viewerOverlay.setShouldVisualizeClicks(c);
                    });
                    player.onPlayerStarted($scope, function(a) {
                        $scope.viewerOverlay && $scope.viewerOverlay.startClicksAnimation();
                    });
                    player.onPlayerStopped($scope, function(a) {
                        $scope.viewerOverlay && $scope.viewerOverlay.stopClicksAnimation();
                    });
                    player.onAttach($scope, x);
                    player.onDetach($scope, v);
                    player.onShowViewerOverlay($scope, function() {
                        $scope.viewerOverlay && $scope.viewerOverlay.showRenderingOverlay();
                    });
                    player.onHideViewerOverlay($scope, function() {
                        $scope.viewerOverlay && $scope.viewerOverlay.hideRenderingOverlay();
                    });
                    player.onShowBuffering($scope, function() {
                        $scope.viewerOverlay && $scope.viewerOverlay.showBufferingOverlay();
                    });
                    player.onHideBuffering($scope, function() {
                        $scope.viewerOverlay && $scope.viewerOverlay.hideBufferingOverlay();
                    });
                    player.onHideHiddenTabOverlay($scope, function() {
                        $scope.viewerOverlay && $scope.viewerOverlay.hideVisibilityOverlay();
                    });

                    $scope.api = {
                        setSessionScreenWidth: setSessionScreenWidth,
                        setSessionScreenHeight: setSessionScreenHeight,
                        setInitialSettings: setInitialSettings,
                    };
                    $scope.playRecordedSession = function() {
                        $scope.playUserRecordedSession();
                    };
                    $scope.focusNodeByNodeId = function(a) {
                        var b = documentNode.getNode(a);
                        b && b.focus();
                    };
                    $scope.getNodeFromPoint = function(a, b) {
                        var c = m(a, b);
                        if (c) {
                            var d = documentNode.getNodePropertyObject(c);
                            return {
                                nodeId: d.nodeId,
                                frameElementId: d.frameElementId,
                                hostElementId: d.hostElementId,
                                node: c,
                            };
                        }
                    };
                    $scope.getScrollableNodeFromPoint = function(a, b, c, e) {
                        for (var f = m(a, b); ; ) {
                            var g = angular.element(f),
                                h = g.scrollTop(),
                                i = g.scrollLeft(),
                                j = Math.floor(h + e),
                                k = Math.floor(i + c);

                            g.scrollTop(j);
                            g.scrollLeft(k);

                            var l = Math.floor(g.scrollTop()) === j,
                                n = Math.floor(g.scrollLeft()) === k;

                            if ((g.scrollTop(h), g.scrollLeft(i), l && n)) break;

                            f = utils.getParentElement(f);
                            if (f === g[0] || f === viewer[0]) break;
                        }
                        var o = documentNode.getNodePropertyObject(f);
                        return {
                            nodeId: o.nodeId,
                            frameElementId: o.frameElementId,
                            hostElementId: o.hostElementId,
                        };
                    };
                    $scope.getOwnerFrameElementId = function(a) {
                        var b = documentNode.getNode(a),
                            c = b.ownerDocument.defaultView.frameElement;
                        return documentNode.getNodePropertyObject(c).nodeId;
                    };
                    $scope.updateLastTypingTime = function(a) {
                        Da = a;
                    };
                    $scope.getFrameElementOffset = function(frameElementId) {
                        var b;

                        if (angular.isDefined(frameElementId)) {
                            b = documentNode.getNode(frameElementId);
                        }

                        return documentNode.getNodeOffset(b);
                    };
                    $scope.handleResize = function(height) {
                        var parentHeight = $element.parent().height(),
                            maxHeight = parentHeight - height;
                        u($scope.maxWidth, maxHeight, $scope.sessionScreenWidth, $scope.sessionScreenHeight);
                    };
                    $scope.setToolIsActive = function(activeTool, status) {
                        $scope.viewerOverlay.setToolIsActive(activeTool, status);
                    };
                    $scope.enableToolkit = function(brokerClient) {
                        $scope.viewerOverlay.enableDrawing(brokerClient);
                    };
                    $scope.setIsCollaborativeMode = function(isCollaborativeMode) {
                        $scope.isCollaborativeMode = isCollaborativeMode;
                    };
                    $scope.setIsOffline = function(status) {
                        if (status) {
                            $scope.viewerOverlay.showOfflineOverlay();
                        } else {
                            $scope.viewerOverlay.hideOfflineOverlay();
                        }
                    };
                    $scope.$watch(pa, function(height) {
                        $scope.viewerOverlay && $scope.viewerOverlay.setOverlayHeight(height);
                    });
                    $scope.$watch(qa, function(width) {
                        $scope.viewerOverlay && $scope.viewerOverlay.setOverlayWidth(width);
                    });
                    $scope.$watch('viewerOverlayIsCreated', function(isCreated) {
                        $scope.isCreated = isCreated;
                    });
                },
            };
        },
    ]);
