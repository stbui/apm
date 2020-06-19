import React, { useState, useRef, useEffect } from 'react';
import {
    FULL_SCREEN_CLASS,
    VIEWER_MARGINS,
    SCROLL_POSITION_CHANGE,
    EVENT_TYPE,
    SESSIONSTACK_HOVER_CLASS,
} from '../test/constant';
import { AsyncWhile } from '../test/AsyncWhile';
import { utils } from '../test/common';
// import {InitialSettings} './test/InitialSettings'

import { DocumentNode } from '../Player/DocumentNode';
import { angular } from '../Player/angular';
import ViewerOverlay from '../ViewerOverlay';

const STYLESHEETS_SELECTOR = 'style, link[rel="stylesheet"]';
const KEYSTROKE_OPTIONS = { END_USER_TYPE_DELAY_SECONDS: 2 };

let documentNode: DocumentNode;
let Da;

let Aa = {};
let Ea = {};
let Ga = {};
let Fa = {};

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
        angular.forEach(addedOrMoved, function (a) {
            var b;
            if (a.node) {
                var c = ia(a),
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

function setCursorPosition(data) {}
function registerClick(data) {}
function setMouseOver(data) {}
function setMouseOut(v) {}
function setScrollPositionChange(data) {}
function setWindowResize(data) {}
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
    const viewerRef: any = useRef();
    const viewerContainerRef: any = useRef();

    //

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

                var screenWidth = data.screenWidth,
                    screenHeight = data.screenHeight;

                if (documentNode.isAttached) {
                    // setSessionScreenWidth(screenWidth);
                    // setSessionScreenHeight(screenHeight);
                    // $scope.viewerOverlay && $scope.viewerOverlay.setScrollPosition(Fa.top, Fa.left);
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
            // G(data.top, data.left, data.hostElementId || data.frameElementId);

            // if (data.nodesScrollPositions) {
            //     angular.forEach(data.nodesScrollPositions, function (a, b) {
            //         Ga[b] = { id: b, top: a.top, left: a.left };
            //     });
            // }

            // $timeout(z);
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
        strategy(EVENT_TYPE.MOUSE_MOVE, setCursorPosition);
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
            // console.log(currentActivity.type, currentActivity.data);
            currentActivity.map(d => {
                onExecuteEvent(d);
            });
            // onExecuteEvent(currentActivity);
        }
    }, [JSON.stringify(currentActivity)]);

    return (
        <div ng-style="{'margin-left': marginLeft, 'margin-top': marginTop}" style="margin-left: 20px;margin-top:50px">
            <div className="viewer-wrapper" style={{ transform: 'scale(0.7720271102895871)' }}>
                <div id="viewer-container" style="width: 1623px;height: 426px;" ref={viewerContainerRef}>
                    <ViewerOverlay
                        width="sessionScreenWidth"
                        height="sessionScreenHeight"
                        scale="scale"
                        get-node="getNodeFromPoint"
                        get-scrollable-node="getScrollableNodeFromPoint"
                        update-last-typing="updateLastTypingTime"
                        get-frame-element-offset="getFrameElementOffset"
                        focus-node="focusNodeByNodeId"
                        api="viewerOverlay"
                        is-created="viewerOverlayIsCreated"
                        play-recorded-session="playRecordedSession()"
                    ></ViewerOverlay>
                    <iframe id="viewer" sandbox="allow-scripts allow-same-origin" ref={viewerRef}></iframe>
                </div>
            </div>
        </div>
    );
};

export default Viewer;
