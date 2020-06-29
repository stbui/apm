import React, { useState, useRef, useEffect } from 'react';
import {
    FULL_SCREEN_CLASS,
    VIEWER_MARGINS,
    SCROLL_POSITION_CHANGE,
    EVENT_TYPE,
    SESSIONSTACK_HOVER_CLASS,
    ELEMENTS,
} from '../test/constant';
import { AsyncWhile } from '../test/AsyncWhile';
import { utils } from '../test/common';
// import {InitialSettings} './test/InitialSettings'

import { DocumentNode } from '../Player/DocumentNode';
import { angular } from '../Player/angular';
import ViewerOverlay from '../ViewerOverlay';
import { timeout } from '../Player/timeout';

const STYLESHEETS_SELECTOR = 'style, link[rel="stylesheet"]';
const KEYSTROKE_OPTIONS = { END_USER_TYPE_DELAY_SECONDS: 2 };

let documentNode: DocumentNode;
let Da;

let Aa = {};
let Ea = {};
let Ga = {};
let Fa: any = {};
let Ba = {};
let Ca = {};

let screenWidth;
let screenHeight;

function ia(a) {
    var b;

    a.parentId
        ? (b = documentNode.getNode(a.parentId))
        : a.previousSiblingId && (b = documentNode.getNode(a.previousSiblingId));

    if (b) {
        return documentNode.getNodePropertyObject(b);
    }
}

function t(a) {
    return Aa[a];
}

/**
 * x
 * 滚动位置
 * @param position { top, left }
 */
function C(a) {
    var b = t(EVENT_TYPE.SCROLL_POSITION_CHANGE);
    b(a);
}

function traverseNodeByScrollPosition(a: Element) {
    documentNode.traverseNode(a, function (a) {
        var b = documentNode.getNodePropertyObject(a);
        if (b.top || b.left) {
            var c = { id: b.nodeId, top: b.top, left: b.left };
            Ga[c.id] || C(c);
        }
    });
}

function strategy(key, value) {
    Aa[key] = value;
}

function N(a) {
    if (!Da) return false;

    var b = Date.now() - Da,
        c = utils.millisecondsToSeconds(b);

    return Math.floor(c) <= a;
}

function domElementValueChange(data) {
    if (!N(KEYSTROKE_OPTIONS.END_USER_TYPE_DELAY_SECONDS)) {
        var b = angular.element(documentNode.getNode(data.id));
        b.val(data.value);
    }
}

/**
 * 添加或移除节点
 * @param  data
 */
function addedOrMoved(data: any[]) {
    if (data) {
        angular.forEach(data, a => {
            var b;
            if (a.node) {
                var c: any = ia(a),
                    d = c ? c.hostElementId : null,
                    e = c ? c.frameElementId : null;
                b = documentNode.createElement(a.node, d, e);
            } else {
                b = documentNode.getNode(a.id);
            }

            if (a.frameElementId) {
                a.node && a.node.nodeType !== Node.ELEMENT_NODE
                    ? a.node.nodeType === Node.DOCUMENT_TYPE_NODE &&
                      documentNode.replaceDocType(a.node.docTypeString, a.frameElementId)
                    : documentNode.replaceDocumentElement(b, a.frameElementId);
            } else if (a.previousSiblingId) {
                var f = documentNode.getNode(a.previousSiblingId);
                // 元素后面插入
                documentNode.insertAfter(f, b);
                // 滚动
                traverseNodeByScrollPosition(b);
            } else if (a.parentId) {
                var g = documentNode.getNode(a.parentId);
                if (g) {
                    // 元素前面插入
                    documentNode.prepend(g, b);
                    // 滚动
                    traverseNodeByScrollPosition(b);
                    // ka(g, b) && fa(g);
                }
            }
            // a.node && 'STYLE' === a.node.tagName && a.node.styleRules && fa(b);
        });
    }
}

/**
 * removed
 * @param {*} elements
 */
function removed(data: any[]) {
    if (data) {
        data.forEach(item => {
            const element = documentNode.getNode(item.id);
            // 删除所有节点
            documentNode.removeNode(element);
        });
    }
}

/**
 * characterData
 */
function characterData(data: any[]) {
    if (data) {
        data.forEach(item => {
            const element = documentNode.getNode(item.id);
            if (element) {
                element.textContent = item.value;
            }
        });
    }
}

/**
 * attributes
 * @param {*} data
 */
function setAttribute(data: any[]) {
    if (data) {
        data.forEach(item => {
            const element = documentNode.getNode(item.id);
            documentNode.setAttribute(element, item.name, item.value);
        });
    }
}

const getFrameElementOffset = function (frameElementId) {
    var b;

    if (angular.isDefined(frameElementId)) {
        b = documentNode.getNode(frameElementId);
    }

    return documentNode.getNodeOffset(b);
};

function registerClick(data) {}
function setMouseOver(data) {}
function setMouseOut(v) {}

function setRadioButtonChange(data) {}
function setCheckboxChange(data) {}
function setDomMutation(data) {
    // 添加或移除
    addedOrMoved(data.addedOrMoved);
    // 移除元素
    removed(data.removed);
    // 文本数据
    characterData(data.characterData);
    // 设置属性
    setAttribute(data.attributes);
}
function setVisibilityChange(data) {}
function setCssRuleInsert(data) {
    var b = documentNode.getNode(data.nodeId),
        c = documentNode.getNodePropertyObject(b);

    documentNode.styleRuleNodes[data.nodeId] = b;
    c.styleRules = c.styleRules || [];
    isNaN(data.index) ? c.styleRules.push(data.rule) : c.styleRules.splice(data.index, 0, data.rule);

    if (documentNode.isAttached) {
        try {
            var d = isNaN(data.index) ? b.sheet.cssRules.length : data.index;
            b.sheet.insertRule(data.rule, d);
        } catch (e) {}
    }
}
function deleteRule(data) {
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

function onExecuteEvent(activity: { type: string; data: any }) {
    const type = activity.type;
    const data = activity.data;
    const eventType = t(type);
    // console.log(type, data);
    // 执行事件类型
    if (eventType && data) {
        eventType(data);
    }
}

const Viewer = ({
    sessionScreenWidth,
    sessionScreenHeight,
    maxWidth,
    maxHeight,
    isCreated,
    renderingProgress,
    initialVisibilityState,
    showLoadingAnimation,
    sessionId,
    handleConsoleResize,
    currentActivity,
    snapshotData,
    fireClear,
    fireAttach,
    onFireAttach,
    isPlaying,
}) => {
    // iframe
    const ref: any = useRef();
    const viewerRef: any = useRef();
    const viewerContainerRef: any = useRef();

    const [cursorPosition, setCursorPosition] = useState();
    const [scrollPosition, setScrollPosition] = useState();
    const [sessionScreen, setSessionScreen] = useState({ width: sessionScreenWidth, height: sessionScreenHeight });
    const [viewerMargins, setViewerMargins] = useState({
        marginLeft: VIEWER_MARGINS.HORIZONTAL,
        marginTop: VIEWER_MARGINS.VERTICAL,
    });
    const [scale, setScale] = useState(1);

    /**
     *
     * @param data
     */
    function setWindowResize(data: { height: 679; width: 1623 }) {
        if (documentNode.isAttached) {
            // setSessionScreenWidth(data.width);
            // setSessionScreenHeight(data.height);
            // $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left);

            setSessionScreenWidthAndHeight(data.width, data.height);
            setScrollPosition(Fa);
        } else {
            Ea[EVENT_TYPE.WINDOW_RESIZE] = data;
        }
    }

    /**
     * 页面滚动
     * @param a
     */
    // ID 不存在返回当前根节点
    function F(a?) {
        return angular.isDefined(a) ? documentNode.getNode(a) : viewerRef.current;
    }
    function E(a) {
        var b = F(a);
        return b && b.shadowRoot ? b : ((b && b.contentWindow) || (b = F()), b.contentWindow);
    }
    function A(b) {
        var c = Ca[b.id],
            d = angular.element(E(b.id));

        if (c) {
            c.cancel();
            delete Ca[b.id];
        }

        var condition = function () {
                return d.scrollLeft() !== b.left || d.scrollTop() !== b.top;
            },
            body = function () {
                timeout(function () {
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
    // 元素滚动
    function B(b) {
        var c = Ba[b.id],
            d = angular.element(documentNode.getNode(b.id));

        if (d && !d.is(ELEMENTS.HTML)) {
            c && (c.cancel(), delete Ba[b.id]);

            var e = function () {
                    return d.scrollTop() !== b.top || d.scrollLeft() !== b.left;
                },
                f = function () {
                    timeout(function () {
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

    function G(top, left?, id?) {
        var e = { id: id, top: top, left: left, windowScroll: true };

        if (documentNode.isAttached) {
            A(e);

            // if (angular.isUndefined(id) && $scope.viewerOverlay) {
            //     $scope.viewerOverlay.setScrollPosition(top, left);
            // }
            if (angular.isUndefined(id)) {
                setScrollPosition({ top, left });
            }
        }

        if (angular.isUndefined(id)) {
            Fa = { top: top || 0, left: left || 0 };
        } else {
            Ga[id] = e;
        }
    }

    function setScrollPositionChange(data: { id?: number; left: 0; top: 1; windowScroll: true }) {
        if (data.id) {
            Ga[data.id] = data;
        } else {
            Fa = { top: data.top || 0, left: data.left || 0 };
        }

        if (documentNode.isAttached) {
            data.id ? (data.windowScroll ? G(data.top, data.left, data.id) : B(data)) : G(data.top, data.left);
        }
    }

    // 鼠标移动
    function setMouseMove(data) {
        if (documentNode.isAttached) {
            var c = getFrameElementOffset(data.frameElementId),
                top = data.y + c.top,
                left = data.x + c.left;

            setCursorPosition({ top: top, left: left });
        } else {
            Ea[EVENT_TYPE.MOUSE_MOVE] = data;
        }
    }

    /**
     *
     *
     */

    // 设置容器宽高
    function setViewerContainerWidthAndHeight(maxWidth, maxHeight, sessionScreenWidth, sessionScreenHeight) {
        var f = maxWidth - 2 * VIEWER_MARGINS.HORIZONTAL,
            g = maxHeight - 2 * VIEWER_MARGINS.VERTICAL,
            i = 1,
            j = 1;

        if (sessionScreenWidth !== 0) {
            i = sessionScreenWidth < f ? 1 : f / sessionScreenWidth;
        }
        if (sessionScreenHeight !== 0) {
            j = sessionScreenHeight < g ? 1 : g / sessionScreenHeight;
        }

        const _scale = Math.min(i, j);
        setScale(_scale);

        var k = sessionScreenWidth * _scale,
            l = sessionScreenHeight * _scale;

        let marginLeft;
        let marginTop;
        if (f > k) {
            marginLeft = (maxWidth - k) / 2;
        } else {
            marginLeft = VIEWER_MARGINS.HORIZONTAL;
        }

        if (g > l) {
            marginTop = (maxHeight - l) / 2;
        } else {
            marginTop = VIEWER_MARGINS.VERTICAL;
        }
        // 设置间距
        setViewerMargins({ marginLeft, marginTop });

        // 将dom_snapshot宽度和高度设置给view
        viewerContainerRef.current.style.width = sessionScreenWidth + 'px';
        viewerContainerRef.current.style.height = sessionScreenHeight + 'px';
    }

    function setSessionScreenWidthAndHeight(width: number, height: number) {
        setSessionScreen({ width, height });
        // 设置缩放
        const { clientHeight, clientWidth } = ref.current.parentNode;
        // console.log('clientHeight', clientHeight, clientWidth);

        if (!screenWidth) {
            screenWidth = width;
        }

        if (!screenHeight) {
            screenHeight = height;
        }

        // debug
        setViewerContainerWidthAndHeight(clientWidth, clientHeight, screenWidth, screenHeight);
    }

    function domSnapshot(data) {
        M(data);
    }

    function M(data) {
        if (documentNode && data) {
            var e = !data.hostElementId && !data.frameElementId;
            if (e) {
                // updateUrl(data.pageUrl);
                Ea = {};
                Ga = {};
                Fa = { top: data.top, left: data.left };

                // if (utils.isDefined(data.visibilityState) && visibilityState !== data.visibilityState) {
                //     J(data.visibilityState);
                // }

                if (data.nestedSnapshots) {
                    data.nestedSnapshots.forEach(function (a) {
                        M(a);
                    });
                }

                // debug:
                var screenWidth = data.screenWidth || screenWidth,
                    screenHeight = data.screenHeight || screenHeight;

                // 设置视窗口大小
                if (documentNode.isAttached) {
                    // setSessionScreenWidth(screenWidth);
                    // setSessionScreenHeight(screenHeight);
                    // $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left);

                    setSessionScreenWidthAndHeight(screenWidth, screenHeight);
                    setScrollPosition(Fa);
                } else {
                    Ea[EVENT_TYPE.WINDOW_RESIZE] = { width: screenWidth, height: screenHeight };
                }

                // documentNode.isAttached
                //     ? (setSessionScreenWidth(screenWidth),
                //       setSessionScreenHeight(screenHeight),
                //       $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left))
                //     : (Ea[EVENT_TYPE.WINDOW_RESIZE] = { width: screenWidth, height: screenHeight });
            }

            // var customOrigin = initialSettings.getCustomOrigin();
            // documentNode.write(data, customOrigin, sessionId);
            documentNode.write(data, sessionId);
            // w();
            G(data.top, data.left, data.hostElementId || data.frameElementId);

            if (data.nodesScrollPositions) {
                angular.forEach(data.nodesScrollPositions, function (a, b) {
                    Ga[b] = { id: b, top: a.top, left: a.left };
                });
            }

            // timeout(z);
            // ea(data.frameElementId, data.hostElementId);
        }
    }

    //
    useEffect(() => {
        if (viewerRef.current) {
            documentNode = new DocumentNode(viewerRef.current);
        }

        //
        strategy(EVENT_TYPE.DOM_ELEMENT_VALUE_CHANGE, domElementValueChange);
        strategy(EVENT_TYPE.DOM_SNAPSHOT, domSnapshot);
        strategy(EVENT_TYPE.MOUSE_MOVE, setMouseMove);
        strategy(EVENT_TYPE.MOUSE_CLICK, registerClick);
        strategy(EVENT_TYPE.MOUSE_OVER, setMouseOver);
        strategy(EVENT_TYPE.MOUSE_OUT, setMouseOut);
        strategy(EVENT_TYPE.SCROLL_POSITION_CHANGE, setScrollPositionChange);
        strategy(EVENT_TYPE.WINDOW_RESIZE, setWindowResize);
        strategy(EVENT_TYPE.RADIO_BUTTON_CHANGE, setRadioButtonChange);
        strategy(EVENT_TYPE.CHECKBOX_CHANGE, setCheckboxChange);
        strategy(EVENT_TYPE.DOM_MUTATION, setDomMutation);
        strategy(EVENT_TYPE.VISIBILITY_CHANGE, setVisibilityChange);
        strategy(EVENT_TYPE.CSS_RULE_INSERT, setCssRuleInsert);
        strategy(EVENT_TYPE.CSS_RULE_DELETE, deleteRule);
    }, []);

    useEffect(() => {
        if (currentActivity) {
            // console.log(currentActivity);
            currentActivity.map(d => {
                onExecuteEvent(d);
            });
        }
    }, [JSON.stringify(currentActivity)]);

    return (
        <div
            ng-style="{'margin-left': marginLeft, 'margin-top': marginTop}"
            style={{ marginLeft: viewerMargins.marginLeft, marginTop: viewerMargins.marginTop }}
            ref={ref}
        >
            <div
                className="viewer-wrapper"
                // style={{ transform: 'scale(0.7720271102895871)' }}
                style={{
                    transform: `scale(${scale})`,
                }}
            >
                <div
                    id="viewer-container"
                    ref={viewerContainerRef}
                    // style={{ width: sessionScreen.width, height: sessionScreen.height }}
                >
                    <ViewerOverlay
                        width={sessionScreen.width}
                        height={sessionScreen.height}
                        scale="scale"
                        get-node="getNodeFromPoint"
                        get-scrollable-node="getScrollableNodeFromPoint"
                        update-last-typing="updateLastTypingTime"
                        get-frame-element-offset="getFrameElementOffset"
                        focus-node="focusNodeByNodeId"
                        api="viewerOverlay"
                        is-created="viewerOverlayIsCreated"
                        play-recorded-session="playRecordedSession()"
                        cursorPosition={cursorPosition}
                        scrollPosition={scrollPosition}
                    ></ViewerOverlay>
                    <iframe id="viewer" sandbox="allow-scripts allow-same-origin" ref={viewerRef}></iframe>
                </div>
            </div>
        </div>
    );
};

export default Viewer;
