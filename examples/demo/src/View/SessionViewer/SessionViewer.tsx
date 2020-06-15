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

const STYLESHEETS_SELECTOR = 'style, link[rel="stylesheet"]';
const KEYSTROKE_OPTIONS = { END_USER_TYPE_DELAY_SECONDS: 2 };

let documentNode: DocumentNode;
let Da;

let Aa = {};
let Ea = {};
let Ga = {};
let Fa = {};

function s(a, b) {
    Aa[a] = b;
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

        var customOrigin = initialSettings.getCustomOrigin();
        documentNode.write(data, customOrigin, sessionId);
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

/**
 * W
 * 添加或移除节点
 * @param  data
 */
function addedOrMoved(data: any[]) {
    if (data) {
        data.forEach(item => {
            const element = item.node ? documentNode.createElement(item.node) : documentNode.getNode(item.id);

            if (item.frameElementId) {
                if (item.node.nodeType === Node.ELEMENT_NODE) {
                    documentNode.replaceDocumentElement(element, item.frameElementId);
                } else if (item.node.nodeType === Node.DOCUMENT_TYPE_NODE) {
                    documentNode.replaceDocType(item.node.docTypeString, item.frameElementId);
                }
            } else if (item.previousSiblingId) {
                const previousSiblingElement = documentNode.getNode(item.previousSiblingId);
                // 元素后面插入
                documentNode.insertAfter(previousSiblingElement, element);
                // 滚动
                traverseNodeByScrollPosition(element);
            } else if (item.parentId) {
                const parentElement = documentNode.getNode(item.parentId);

                if (parentElement) {
                    // 元素前面插入
                    documentNode.prepend(parentElement, element);
                    // 滚动
                    traverseNodeByScrollPosition(element);
                } else {
                    // e.warn('Missing parent node, id: ' + item.parentId);
                    console.warn('Missing parent node, id: ' + item.parentId);
                }
            }
        });
    }
}

function domSnapshot(data) {
    M(data);
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
function setCssRuleInsert(data) {}
function deleteRule(data) {}

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
    useEffect(() => {
        if (viewerRef.current) {
            documentNode = new DocumentNode(viewerRef.current);
        }

        //
        s(EVENT_TYPE.DOM_ELEMENT_VALUE_CHANGE, domElementValueChange);
        s(EVENT_TYPE.DOM_SNAPSHOT, domSnapshot);
        s(EVENT_TYPE.MOUSE_MOVE, setCursorPosition);
        s(EVENT_TYPE.MOUSE_CLICK, registerClick);
        s(EVENT_TYPE.MOUSE_OVER, setMouseOver);
        s(EVENT_TYPE.MOUSE_OUT, setMouseOut);
        s(EVENT_TYPE.SCROLL_POSITION_CHANGE, setScrollPositionChange);
        s(EVENT_TYPE.WINDOW_RESIZE, setWindowResize);
        s(EVENT_TYPE.RADIO_BUTTON_CHANGE, setRadioButtonChange);
        s(EVENT_TYPE.CHECKBOX_CHANGE, setCheckboxChange);
        s(EVENT_TYPE.DOM_MUTATION, setDomMutation);
        s(EVENT_TYPE.VISIBILITY_CHANGE, setVisibilityChange);
        s(EVENT_TYPE.CSS_RULE_INSERT, setCssRuleInsert);
        s(EVENT_TYPE.CSS_RULE_DELETE, deleteRule);
    }, []);

    return (
        <div ng-style="{'margin-left': marginLeft, 'margin-top': marginTop}" style="margin-left: 20px;margin-top:50px">
            <div className="viewer-wrapper" style={{ transform: 'scale(0.7720271102895871)' }}>
                <div ref={viewerContainerRef} id="viewer-container" style="width: 1623px;height: 426px;">
                    <iframe ref={viewerRef} id="viewer" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Viewer;
