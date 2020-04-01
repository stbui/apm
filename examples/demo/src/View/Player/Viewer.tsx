import React, { useState, useRef, useEffect } from 'react';
import { DocumentNode } from './DocumentNode';
import { angular } from './angular';
import { AsyncWhile } from './AsyncWhile';
import { timeout } from './timeout';
import { VIEWER_MARGINS, SCROLL_POSITION_CHANGE, SESSIONSTACK_HOVER_CLASS, EVENT_TYPE, ELEMENTS } from './constant';

import './Viewer.scss';

// this
let scale = 1;
let marginLeft = VIEWER_MARGINS.HORIZONTAL;
let marginTop = VIEWER_MARGINS.VERTICAL;

let documentNode: DocumentNode;

let eventType = {};

/**
 * ia {EVENT_TYPE.MOUSE_MOVE}
 */
let ia: {
    mouse_move?: any;
    window_resize?: any;
} = {};

/**
 * setScrollPosition
 */
let ja = { top: 0, left: 0 };
/**
 * 滚动数据
 * ka[id]=position
 */
let ka: { id?: number } = {};
let ea = undefined;
let fa = {};
/**
 * ga[id]=AsyncWhile
 */
let ga = {};
/**
 * ha[id]=AsyncWhile
 */
let ha = {};

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
}) => {
    // iframe
    const viewerRef: any = useRef();
    const viewerContainerRef: any = useRef();

    //
    const [viewerOverlay] = useState();
    // visibilityState: prerender, hidden;
    const [visibilityState] = useState();

    //
    const onVisualizeClicks = () => {};
    const onPlayerStarted = () => {};
    const onPlayerStopped = () => {};

    //
    function setEventType(key, value) {
        eventType[key] = value;
    }
    function getEventType(key) {
        return eventType[key];
    }

    /**
     * s
     * @param a
     * @param callback
     */
    function onAttach(callback) {
        documentNode.attach(() => {
            initialScrollPosition();
            traverseDocuments();
            // insertRule();

            if (typeof onFireAttach === 'function') {
                // onFireAttach();
                onFireAttach(callback);
            }
        });
    }

    /**
     * t
     */
    function initialScrollPosition() {
        // 滚动位置
        executeScrollPositionChange({ top: ja.top, left: ja.left });

        // resize && mouse_move
        for (let type in ia) {
            const evt = p(type);
            evt(type);
        }

        Object.keys(ka).map(id => {
            // 滚动位置
            executeScrollPositionChange(executeScrollPositionChange(ka[id]));
        });
    }

    /**
     * u
     */
    function traverseDocuments() {
        documentNode.traverseDocuments(ea, traverseNodeByScrollPosition);
    }

    /**
     * x
     * 滚动位置
     * @param position { top, left }
     */
    function executeScrollPositionChange(position: object) {
        const setScrollPositionChange = p(EVENT_TYPE.SCROLL_POSITION_CHANGE);
        setScrollPositionChange(position);
    }

    function y(element: Element) {}
    function traverseNodeByScrollPosition(element: Element) {
        documentNode.traverseNode(element, elem => {
            const property = documentNode.getNodePropertyObject(elem);

            if (property.top || property.left) {
                const position = {
                    id: property.nodeId,
                    top: property.top,
                    left: property.left,
                };

                ka[position.id] || executeScrollPositionChange(position);
            }
        });
    }

    /**
     * z
     * @param id
     */
    function z() {}
    function getContentWindow(id: number) {
        const element = getElementById(id);

        // (b && b.contentWindow) || (b = A());

        if (element && element.contentWindow) {
        } else {
            element = getElementById();
        }

        return element.contentWindow;
    }

    /**
     * A
     * ID 不存在返回当前根节点
     * @param id
     */
    function getElementById(id?) {
        return angular.isDefined(id) ? documentNode.getNode(id) : viewerRef.current;
    }

    /**
     * B
     * window 滚动
     * @param top
     * @param left
     * @param id
     */
    function B() {}
    function setScrollPosition(top: number, left: number, id?: any) {
        var position = {
            id: id,
            top: top,
            left: left,
            windowScroll: true,
        };

        if (documentNode.isAttached) {
            v(position);
            angular.isUndefined(id) && b.viewerOverlay && b.viewerOverlay.setScrollPosition(top, left);
        }

        if (angular.isUndefined(id)) {
            ja = { top: top || 0, left: left || 0 };
        } else {
            ka[id] = position;
        }
    }

    /**
     * 还原默认
     * @param a
     * @param c
     */
    function onClear(data) {
        if (data) {
            ia = {};
            ka = {};
            ja = { top: 0, left: 0 };
            toggleVisibilityOverlay(initialVisibilityState);
            G(data);

            // b.sessionScreenWidth = $;
            // b.sessionScreenHeight = _;
        }
    }

    /**
     *
     * @param activity
     */
    function onExecuteEvent(activity) {
        const type = activity.type;
        const data = activity.data;
        const eventType = p(type);
        // console.log(type, data);
        // 执行事件类型
        if (eventType && data) {
            eventType(data);
        }
    }

    /**
     * E
     * 更新visibilityState
     * @param {*} visibilityState
     */
    function toggleVisibilityOverlay(visibilityState: 'visible' | 'hidden' | 'prerender') {
        if (b.viewerOverlay) {
            if ('prerender' === visibilityState || 'hidden' === visibilityState) {
                b.viewerOverlay.showVisibilityOverlay(visibilityState);
            } else {
                b.viewerOverlay.hideVisibilityOverlay();
            }
            b.visibilityState = visibilityState;
        }
    }

    /**
     * F
     * DOM_SNAPSHOT
     * @param data
     */
    function domSnapshot(data) {
        if (angular.isDefined(data.visibilityState) && b.visibilityState !== data.visibilityState) {
            // 更新visibilityState
            toggleVisibilityOverlay(data.visibilityState);
            // 渲染snapshot
            G(data);
        }
    }

    function G(data) {
        if (documentNode) {
            documentNode.write(data, sessionId);
            // set scroll
            setScrollPosition(data.top, data.left, data.frameElementId);
        }
    }

    /**
     * H
     * dom_element_value_change
     * @param data
     */
    function domElementValueChange(data) {
        var element = document.getElementById(documentNode.getNode(data.id));
        element.val(data.value);
    }

    /**
     * K
     * MOUSE_OVER
     * @param data
     */
    function setMouseOver(data) {
        const element = angular.element(documentNode.getNode(data.id));
        if (element) {
            element.addClass(SESSIONSTACK_HOVER_CLASS);
            element.parents().addClass(SESSIONSTACK_HOVER_CLASS);
        }
    }

    /**
     * L
     * MOUSE_OUT
     * @param data
     */
    function setMouseOut(data) {
        var element = document.getElementById(documentNode.getNode(data.id));
        if (element) {
            element.removeClass(SESSIONSTACK_HOVER_CLASS);
            element.parents().removeClass(SESSIONSTACK_HOVER_CLASS);
        }
    }

    /**
     *
     * @param frameElementId
     */
    function getNodeOffset(frameElementId) {
        if (frameElementId === undefined) {
            const element = documentNode.getNode(frameElementId);
            return documentNode.getNodeOffset(element);
        }
    }

    /**
     * O
     * WINDOW_RESIZE
     * @param data
     */
    function setWindowResize(data) {
        if (documentNode.isAttached) {
            sessionScreenWidth = data.width;
            b.sessionScreenHeight = data.height;
            b.viewerOverlay && b.viewerOverlay.setScrollPosition(ja.top, ja.left);
        } else {
            ia[EVENT_TYPE.WINDOW_RESIZE] = data;
        }
    }

    /**
     * P
     * RADIO_BUTTON_CHANGE
     * @param data
     */
    function setRadioButtonChange(data) {
        const element = document.getElementById(documentNode.getNode(data.id));
        element.prop('checked', data.state);
    }
    /**
     * Q
     * CHECKBOX_CHANGE
     * @param data
     */
    function setCheckboxChange(data) {
        const element = document.getElementById(documentNode.getNode(data.id));
        element.prop('checked', data.state);
    }

    /**
     *
     * @param data
     */
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

    /**
     * S
     * VISIBILITY_CHANGE
     * @param data
     */
    function setVisibilityChange(data) {
        toggleVisibilityOverlay(data.visibilityState);
    }

    /**
     * T
     * CSS_RULE_INSERT
     * @param data
     */
    function setCssRuleInsert(data) {
        const element = documentNode.getNode(data.nodeId);
        const property = documentNode.getNodePropertyObject(element);

        documentNode.styleRuleNodes[data.nodeId] = element;
        property.styleRules = property.styleRules || [];

        if (isNaN(data.index)) {
            property.styleRules.push(data.rule);
        } else {
            property.styleRules.splice(data.index, 0, data.rule);
        }

        if (documentNode.isAttached) {
            try {
                element.sheet.insertRule(data.rule);
            } catch (d) {}
        }
    }

    /**
     * U
     * @param {*} data
     */
    function deleteRule(data) {
        const element = documentNode.getNode(data.nodeId);
        const property = documentNode.getNodePropertyObject(element);

        documentNode.styleRuleNodes[data.nodeId] = element;
        property.styleRules = property.styleRules || [];

        if (property.styleRules.length > data.index) {
            property.styleRules.splice(data.index, 1);
        }

        if (documentNode.isAttached) {
            try {
                b.sheet.deleteRule(data.index);
            } catch (d) {}
        }
    }

    /**
     * V
     */
    function insertRule() {
        documentNode.styleRuleNodes.forEach(styleRuleNode => {
            const property = documentNode.getNodePropertyObject(styleRuleNode);

            if (property.styleRules) {
                property.styleRules.forEach(rule => {
                    try {
                        styleRuleNode.sheet.insertRule(rule);
                    } catch (error) {}
                });
            }
        });
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

    /**
     * characterData
     * @param {*} nodes
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

    function o(key, val) {
        fa[key] = val;
    }

    function p(a) {
        return fa[a];
    }

    /**
     * q
     * 设置容器宽高
     * @param maxWidth
     * @param maxHeight
     * @param sessionScreenWidth
     * @param sessionScreenHeight
     */
    function setViewerContainerWidthAndHeight(maxWidth, maxHeight, sessionScreenWidth, sessionScreenHeight) {
        var f = maxWidth - 2 * VIEWER_MARGINS.HORIZONTAL;
        var g = maxHeight - 2 * VIEWER_MARGINS.VERTICAL;
        var i = 1;
        var j = 1;

        if (0 !== sessionScreenWidth) {
            i = sessionScreenWidth < f ? 1 : f / sessionScreenWidth;
        }

        if (0 !== sessionScreenHeight) {
            j = sessionScreenHeight < g ? 1 : g / sessionScreenHeight;
        }

        b.scale = Math.min(i, j);

        var k = sessionScreenWidth * b.scale;
        var l = sessionScreenHeight * b.scale;

        if (f > k) {
            b.marginLeft = (maxWidth - k) / 2;
        } else {
            b.marginLeft = VIEWER_MARGINS.HORIZONTAL;
        }

        if (g > l) {
            b.marginTop = (maxHeight - l) / 2;
        } else {
            b.marginTop = VIEWER_MARGINS.VERTICAL;
        }

        viewerContainerRef.current.style.width = sessionScreenWidth;
        viewerContainerRef.current.style.height = sessionScreenHeight;
        // ca.css({ width: sessionScreenWidth, height: sessionScreenHeight });
    }
    /**
     * r
     *
     */
    function onDetach() {
        aa && aa.cancel(), documentNode.detach();
    }

    /**
     * window 滚动
     * @param position
     */
    function v(position) {
        var queue: AsyncWhile = ha[position.id];
        // const element: any = angular.element(getContentWindow(position.id));
        const element = getContentWindow(position.id);
        console.log(1, element);
        if (queue) {
            queue.cancel();
            delete ha[position.id];
        }

        const condition = function() {
            return element.scrollLeft !== position.left || element.scrollTop !== position.top;
        };

        const body = function() {
            timeout(() => {
                // element.scrollTop(position.top), element.scrollLeft(position.left);
                element.scrollTop = position.top;
                element.scrollLeft = position.scrollLeft;
            });
        };

        const config = {
            maxIterations: SCROLL_POSITION_CHANGE.MAX_RETRIES,
            waitTime: SCROLL_POSITION_CHANGE.TIMEOUT,
        };

        ha[position.id] = new AsyncWhile(condition, body, config);
        ha[position.id].start();
    }

    /**
     * 元素滚动
     * @param data
     */
    function w(data) {
        const queue: AsyncWhile = ga[data.id];

        const element: any = angular.element(documentNode.getNode(b.id));

        if (element && !element.is(ELEMENTS.HTML)) {
            if (queue) {
                queue.cancel();
                delete ga[data.id];
            }

            const condition = () => {
                return element.scrollTop() !== data.top || element.scrollLeft() !== data.left;
            };

            const body = () => {
                timeout(() => {
                    element.scrollTop(data.top), element.scrollLeft(data.left);
                });
            };

            const config = {
                maxIterations: SCROLL_POSITION_CHANGE.MAX_RETRIES,
                waitTime: SCROLL_POSITION_CHANGE.TIMEOUT,
            };

            ga[data.id] = new AsyncWhile(condition, body, config);
            ga[data.id].start();
        }
    }

    /**
     * I
     * MOUSE_MOVE
     * setCursorPosition
     * @param data activities
     */
    function setCursorPosition(data) {
        if (documentNode.isAttached && b.viewerOverlay) {
            const offset: any = getNodeOffset(data.frameElementId);
            const offsetTop = data.y + offset.top;
            const offsetLeft = data.x + offset.left;

            // setCursorPosition
            // b.viewerOverlay.setCursorPosition({
            //     top: offsetTop,
            //     left: offsetLeft,
            // });
        } else {
            ia[EVENT_TYPE.MOUSE_MOVE] = data;
        }
    }

    /**
     * J
     * @param data activities
     */
    function registerClick(data) {
        setCursorPosition(data);

        if (documentNode.isAttached && b.viewerOverlay) {
            const offset: any = getNodeOffset(data.frameElementId);
            const offsetTop = ja.top + data.y + offset.top;
            const offsetLeft = ja.left + data.x + offset.left;

            b.viewerOverlay.registerClick(offsetTop, offsetLeft);
        }
    }

    /**
     * N
     * SCROLL_POSITION_CHANGE
     * @param position {left,top,id}
     */
    function setScrollPositionChange(position) {
        if (position.id) {
            ka[position.id] = position;
        } else {
            ja = { top: position.top || 0, left: position.left || 0 };
        }

        if (documentNode.isAttached) {
            if (position.id) {
                if (position.windowScroll) {
                    setScrollPosition(position.top, position.left, position.id);
                } else {
                    // 元素滚动
                    w(position);
                }
            } else {
                setScrollPosition(position.top, position.left);
            }
        }

        documentNode.isAttached &&
            (position.id
                ? position.windowScroll
                    ? setScrollPosition(position.top, position.left, position.id)
                    : w(position)
                : setScrollPosition(position.top, position.left));
    }

    //
    useEffect(() => {
        if (viewerRef.current) {
            documentNode = new DocumentNode(viewerRef.current);
        }

        //
        o(EVENT_TYPE.DOM_ELEMENT_VALUE_CHANGE, domElementValueChange);
        o(EVENT_TYPE.DOM_SNAPSHOT, domSnapshot);
        o(EVENT_TYPE.MOUSE_MOVE, setCursorPosition);
        o(EVENT_TYPE.MOUSE_CLICK, registerClick);
        o(EVENT_TYPE.MOUSE_OVER, setMouseOver);
        o(EVENT_TYPE.MOUSE_OUT, setMouseOut);
        o(EVENT_TYPE.SCROLL_POSITION_CHANGE, setScrollPositionChange);
        o(EVENT_TYPE.WINDOW_RESIZE, setWindowResize);
        o(EVENT_TYPE.RADIO_BUTTON_CHANGE, setRadioButtonChange);
        o(EVENT_TYPE.CHECKBOX_CHANGE, setCheckboxChange);
        o(EVENT_TYPE.DOM_MUTATION, setDomMutation);
        o(EVENT_TYPE.VISIBILITY_CHANGE, setVisibilityChange);
        o(EVENT_TYPE.CSS_RULE_INSERT, setCssRuleInsert);
        o(EVENT_TYPE.CSS_RULE_DELETE, deleteRule);

        // player

        // c.onAttach(b, onAttach);
        // c.onDetach(b, onDetach);
    }, []);

    // 设置容器宽高
    useEffect(() => {
        setViewerContainerWidthAndHeight(maxWidth, maxHeight, sessionScreenWidth, sessionScreenHeight);
    }, [maxWidth, maxHeight, sessionScreenWidth, sessionScreenHeight]);

    useEffect(() => {}, [renderingProgress]);
    useEffect(() => {}, [showLoadingAnimation]);

    useEffect(() => {
        if (currentActivity) {
            onExecuteEvent(currentActivity);
        }
    }, [currentActivity]);

    useEffect(() => {
        if (fireClear) {
            // onClear(snapshotData);
            // onFireAttach(fireAttach);
            // console.log(1,fireAttach)
        }
    }, [fireClear]);

    useEffect(() => {
        if (fireAttach) {
            onAttach(fireAttach[0]);
            // console.log('fireAttach', fireAttach);
        }
    }, [fireAttach]);

    if (currentActivity) {
        // console.log(currentActivity);
        // onExecuteEvent(currentActivity);
    }

    // 组件创建状态
    // useEffect(() => {
    //     if ((d.isDefined(viewerOverlay) && d.isDefined(initialVisibilityState)) || null === viewerOverlay) {
    //         b.isCreated = true;
    //     }
    // }, [initialVisibilityState, viewerOverlay]);

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
